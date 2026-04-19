/* ─────────────────────────────────────────────────────────────
 * /switch フォーム送信プロキシ — Web3Forms 経由で通知メール配信
 *
 * LP（社内リポ）の /api/switch-form は createLead + sendThanksMail に
 * 依存した実装だが、Vercel のファイルシステム制限とメール基盤未整備
 * のためそのまま移植しない。メインサイトの /contact・/audit と同じ
 * Web3Forms パターンに差し替え、今すぐ Vercel で動くようにする。
 *
 * レスポンス仕様は LP と互換: 成功時 { hash } を返す。
 * ───────────────────────────────────────────────────────────── */

import { NextResponse } from 'next/server'

type SwitchFormBody = {
  name?: unknown
  email?: unknown
  phone?: unknown
  propertyName?: unknown
  propertyType?: unknown
  area?: unknown
  rooms?: unknown
  currentManager?: unknown
  currentFeeRate?: unknown
  monthlyRevenue?: unknown
  pastYears?: unknown
  futureYears?: unknown
  otaUrls?: unknown
  temperature?: unknown
  note?: unknown
  propertySource?: unknown
  airbnbUrl?: unknown
  bookingUrl?: unknown
  peakRevenue?: unknown
  offpeakRevenue?: unknown
}

function asString(v: unknown): string {
  if (v === undefined || v === null) return ''
  return String(v)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SwitchFormBody

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'name and email are required' },
        { status: 400 },
      )
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
    if (!accessKey) {
      console.error('[switch-form] NEXT_PUBLIC_WEB3FORMS_KEY is not set')
      return NextResponse.json({ error: 'form not configured' }, { status: 500 })
    }

    const name = asString(body.name)
    const area = asString(body.area) || '未入力'
    const propertyType = asString(body.propertyType) || '未入力'

    const payload: Record<string, unknown> = {
      access_key: accessKey,
      subject: `【SEKAI STAY /switch】${name}様 - ${area} / ${propertyType}`,
      from_name: 'SEKAI STAY /switch',
      replyto: 'contact@sekaistay.com',
      // 全フィールドを Web3Forms の通知メール本文に展開
      name,
      email: asString(body.email),
      phone: asString(body.phone),
      property_name: asString(body.propertyName),
      property_type: propertyType,
      area,
      rooms: asString(body.rooms),
      current_manager: asString(body.currentManager),
      current_fee_rate: asString(body.currentFeeRate),
      monthly_revenue: asString(body.monthlyRevenue),
      past_years: asString(body.pastYears),
      future_years: asString(body.futureYears),
      ota_urls: asString(body.otaUrls),
      temperature: asString(body.temperature),
      note: asString(body.note),
      property_source: asString(body.propertySource),
      airbnb_url: asString(body.airbnbUrl),
      booking_url: asString(body.bookingUrl),
      peak_revenue: asString(body.peakRevenue),
      offpeak_revenue: asString(body.offpeakRevenue),
    }

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = (await res.json().catch(() => ({}))) as { success?: boolean }

    if (!res.ok || !data.success) {
      console.error('[switch-form] Web3Forms submission failed', res.status, data)
      return NextResponse.json({ error: 'submission failed' }, { status: 502 })
    }

    // LP 互換: サンクスページへのリダイレクトキー
    const hash = Math.random().toString(36).slice(2, 10)
    return NextResponse.json({ hash })
  } catch (e) {
    console.error('[switch-form]', e)
    return NextResponse.json({ error: 'internal error' }, { status: 500 })
  }
}
