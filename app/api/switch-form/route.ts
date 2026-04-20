/* ─────────────────────────────────────────────────────────────
 * /api/switch-form — japanvillas リード登録 API への Server-side Proxy
 *
 * 設計意図:
 *   - ブラウザから japanvillas.kss-cloud.com を直接叩くと CORS に阻まれる
 *     （許可Originは本番ドメインのみ: sekaistay.com / www.sekaistay.com /
 *      lp-ten-gamma.vercel.app）
 *   - サーバー間通信なら CORS の対象外なので、ここで中継する
 *
 * 可観測性と耐障害性:
 *   - 各試行 15s タイムアウト
 *   - 上流 5xx のときは 1回だけリトライ（1秒後、合計2試行）
 *   - 各試行の結果をコンソール出力
 * ───────────────────────────────────────────────────────────── */

import { NextResponse } from 'next/server'

const UPSTREAM =
  'https://japanvillas.kss-cloud.com/api/lp/owner-lead'
const ATTEMPT_TIMEOUT_MS = 15_000
const RETRY_DELAY_MS = 1_000
const USER_AGENT = 'sekaistay-form-proxy/1.0 (+https://sekaistay.com)'

export const runtime = 'nodejs'

async function postOnce(
  bodyStr: string,
): Promise<{ status: number; text: string; contentType: string | null }> {
  const controller = new AbortController()
  const timeoutId = setTimeout(
    () => controller.abort(),
    ATTEMPT_TIMEOUT_MS,
  )
  try {
    const res = await fetch(UPSTREAM, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': USER_AGENT,
        Origin: 'https://sekaistay.com',
      },
      body: bodyStr,
      cache: 'no-store',
      signal: controller.signal,
    })
    const text = await res.text()
    return {
      status: res.status,
      text,
      contentType: res.headers.get('content-type'),
    }
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid json' },
      { status: 400 },
    )
  }

  const email = (body as { email?: unknown })?.email
  if (typeof email !== 'string' || email.trim() === '') {
    return NextResponse.json(
      { ok: false, error: 'email is required' },
      { status: 400 },
    )
  }

  const bodyStr = JSON.stringify(body)

  try {
    console.log('[switch-form proxy] attempt#1 → upstream POST')
    const t0 = Date.now()
    let result = await postOnce(bodyStr)
    console.log(
      `[switch-form proxy] attempt#1 ← ${result.status} in ${Date.now() - t0}ms`,
      result.text.slice(0, 200),
    )

    // 上流 5xx は一時障害の可能性 → 1回だけリトライ
    if (result.status >= 500 && result.status < 600) {
      await new Promise((r) => setTimeout(r, RETRY_DELAY_MS))
      console.log('[switch-form proxy] attempt#2 → retrying after 5xx')
      const t1 = Date.now()
      result = await postOnce(bodyStr)
      console.log(
        `[switch-form proxy] attempt#2 ← ${result.status} in ${Date.now() - t1}ms`,
        result.text.slice(0, 200),
      )
    }

    // 上流が HTML エラーページを返した場合は JSON で包み直す
    const ct = (result.contentType || '').toLowerCase()
    if (result.status >= 500 && !ct.includes('application/json')) {
      return NextResponse.json(
        {
          ok: false,
          error: `upstream ${result.status}`,
        },
        { status: 502 },
      )
    }

    return new NextResponse(result.text, {
      status: result.status,
      headers: {
        'Content-Type': result.contentType || 'application/json',
      },
    })
  } catch (e) {
    const aborted = e instanceof Error && e.name === 'AbortError'
    console.error(
      `[switch-form proxy] ${aborted ? 'timeout' : 'error'}`,
      e,
    )
    return NextResponse.json(
      {
        ok: false,
        error: aborted
          ? 'upstream timeout'
          : e instanceof Error
            ? e.message
            : 'upstream error',
      },
      { status: aborted ? 504 : 502 },
    )
  }
}
