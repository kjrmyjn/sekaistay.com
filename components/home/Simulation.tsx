'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { SIMULATION } from '@/content/home/copy'
import { IconArrowRight, IconCheck, IconChart } from '@/components/Icons'
import { JP } from '@/components/JP'

/* ─── Calculation constants ───────────────────────────────── */

type Area = 'tokyo' | 'kyoto' | 'osaka' | 'okinawa' | 'fukuoka' | 'other'
type PropertyType = 'house' | 'apartment' | 'villa'
type Status = 'running' | 'new'

const AREAS: { value: Area; label: string; mult: number }[] = [
  { value: 'tokyo',   label: '東京',       mult: 1.0  },
  { value: 'kyoto',   label: '京都',       mult: 1.1  },
  { value: 'osaka',   label: '大阪',       mult: 0.9  },
  { value: 'okinawa', label: '沖縄',       mult: 1.2  },
  { value: 'fukuoka', label: '福岡',       mult: 0.85 },
  { value: 'other',   label: 'その他',     mult: 0.75 },
]

const TYPES: { value: PropertyType; label: string; mult: number }[] = [
  { value: 'house',     label: '一戸建て', mult: 1.15 },
  { value: 'apartment', label: 'マンション', mult: 1.0  },
  { value: 'villa',     label: '貸別荘',   mult: 1.4  },
]

// Per-room base (¥). Base = 1 room, Tokyo, Apartment, running
const BASE_PER_ROOM = 180_000

// Rooms scaling (diminishing returns)
const ROOM_MULTS: Record<number, number> = {
  1: 1.0,
  2: 1.8,
  3: 2.5,
  4: 3.1,
  5: 3.6,
}

// Status multiplier
const STATUS_MULT: Record<Status, number> = {
  running: 1.0,
  new:     0.95, // slightly lower initial expectation
}

// Low/High spread
const LOW_SPREAD = 0.78
const HIGH_SPREAD = 1.22

/* ─── Helpers ─────────────────────────────────────────────── */

const yen = (n: number) => '¥' + Math.round(n).toLocaleString('ja-JP')

const manYen = (n: number) => {
  // → 85万 / 134万 etc.
  const man = Math.round(n / 10_000)
  return `¥${man.toLocaleString('ja-JP')}万`
}

const isValidEmail = (s: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim())

/* ─── Component ───────────────────────────────────────────── */

export default function Simulation() {
  const [area, setArea] = useState<Area>('tokyo')
  const [propertyType, setPropertyType] = useState<PropertyType>('house')
  const [rooms, setRooms] = useState<number>(2)
  const [status, setStatus] = useState<Status>('running')
  const [revenueInput, setRevenueInput] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  /* ─── Derived values ─── */
  const result = useMemo(() => {
    const areaMult = AREAS.find(a => a.value === area)?.mult ?? 1
    const typeMult = TYPES.find(t => t.value === propertyType)?.mult ?? 1
    const roomMult = ROOM_MULTS[rooms] ?? 1
    const statusMult = STATUS_MULT[status]

    const base = BASE_PER_ROOM * roomMult * areaMult * typeMult * statusMult

    let low = base * LOW_SPREAD
    let high = base * HIGH_SPREAD

    const currentRev = revenueInput ? parseInt(revenueInput.replace(/[^\d]/g, ''), 10) || 0 : 0

    // If user provided current revenue, anchor the low end to their current (they know it's achievable).
    if (currentRev > 0) {
      low = Math.max(low, currentRev * 0.95)
      // Stretch high end if current already near our estimate
      if (currentRev > high * 0.9) {
        high = Math.max(high, currentRev * 1.25)
      }
    }

    // Improvement score: delta vs current (if given), else static based on area strength
    let improvement: number
    if (currentRev > 0) {
      improvement = Math.min(100, Math.max(0, Math.round(((high - currentRev) / currentRev) * 100)))
    } else {
      // No baseline — estimate based on area potential
      improvement = area === 'tokyo' || area === 'kyoto' || area === 'okinawa' ? 78 : 62
    }

    const scoreLabel =
      improvement >= 60 ? 'HIGH' : improvement >= 30 ? 'MEDIUM' : 'STABLE'

    // Priority actions — dynamic by area/type/status
    const actions: { n: string; t: string }[] = []
    if (status === 'new') {
      actions.push({ n: '01', t: '物件ポジショニングの設計' })
      actions.push({ n: '02', t: '初期ギャラリー撮影と見せ方' })
      actions.push({ n: '03', t: 'OTA掲載＋初月プロモ設計' })
    } else {
      actions.push({ n: '01', t: '週末・連休の価格設計' })
      if (propertyType === 'villa') {
        actions.push({ n: '02', t: 'ファミリー/団体向け訴求強化' })
      } else {
        actions.push({ n: '02', t: 'ギャラリー写真の差し替え' })
      }
      if (area === 'tokyo' || area === 'kyoto' || area === 'osaka') {
        actions.push({ n: '03', t: '多言語リスティング強化' })
      } else {
        actions.push({ n: '03', t: 'レビュー獲得導線の最適化' })
      }
    }

    // Bar position (for the low–high range bar) — scale against ¥200万 ceiling
    const CEILING = 2_000_000
    const lowPct = Math.min(95, Math.max(2, (low / CEILING) * 100))
    const highPct = Math.min(98, Math.max(lowPct + 4, (high / CEILING) * 100))

    return {
      low, high, lowPct, highPct,
      improvement, scoreLabel,
      actions,
      currentRev,
    }
  }, [area, propertyType, rooms, status, revenueInput])

  const revenueDigits = revenueInput.replace(/[^\d]/g, '')
  const revenueDisplay = revenueDigits
    ? parseInt(revenueDigits, 10).toLocaleString('ja-JP')
    : ''

  const emailValid = email === '' || isValidEmail(email)

  // Build prefilled URL so that when user clicks CTA, /simulate receives their inputs
  const ctaHref = `${SIMULATION.cta.href}?area=${area}&type=${propertyType}&rooms=${rooms}&status=${status}${
    revenueDigits ? `&rev=${revenueDigits}` : ''
  }${email && emailValid ? `&email=${encodeURIComponent(email)}` : ''}`

  return (
    <section className="relative bg-white">
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 section-xl">
        <div className="max-w-[720px] mb-10 md:mb-14">
          <div className="eyebrow text-sekai-teal mb-4">Income Simulation</div>
          <h2 className="heading-section text-charcoal mb-4 jp-keep">
            <JP>{SIMULATION.headline.line1}</JP>
            <br className="hidden sm:inline" />
            {' '}<span className="text-sekai-teal"><JP>{SIMULATION.headline.line2}</JP></span>
          </h2>
          <p className="text-body text-dark-gray jp-break">
            {SIMULATION.body}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-5 md:gap-6">
          {/* ── Form (interactive) ── */}
          <div className="bg-white rounded-card border border-light-gray p-6 md:p-8 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-sekai-teal rounded" />
                <span className="text-[13px] font-bold text-charcoal">
                  {SIMULATION.formTitle}
                </span>
              </div>
              <span className="text-[11px] font-mono text-dark-gray">
                LIVE PREVIEW
              </span>
            </div>

            <div className="space-y-4">
              {/* Area select */}
              <label className="block">
                <span className="block text-[12px] font-bold text-charcoal mb-1.5">エリア</span>
                <div className="relative">
                  <select
                    value={area}
                    onChange={e => setArea(e.target.value as Area)}
                    className="appearance-none w-full bg-cloud-white border border-light-gray rounded-btn px-4 py-3 text-[13px] text-charcoal font-medium pr-9 cursor-pointer hover:border-sekai-teal/40 focus:border-sekai-teal focus:outline-none transition"
                  >
                    {AREAS.map(a => (
                      <option key={a.value} value={a.value}>{a.label}</option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                  >
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="#5F6368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </label>

              {/* Property type — radio cards */}
              <div>
                <span className="block text-[12px] font-bold text-charcoal mb-1.5">物件タイプ</span>
                <div className="grid grid-cols-3 gap-2">
                  {TYPES.map(t => {
                    const selected = propertyType === t.value
                    return (
                      <button
                        type="button"
                        key={t.value}
                        onClick={() => setPropertyType(t.value)}
                        className={`text-center text-[12px] border rounded-btn py-2.5 transition font-bold ${
                          selected
                            ? 'border-sekai-teal bg-teal-tint text-deep-teal shadow-[0_2px_8px_rgba(22,123,129,0.12)]'
                            : 'border-light-gray text-dark-gray hover:border-sekai-teal/40'
                        }`}
                      >
                        {t.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Rooms + Status grid */}
              <div className="grid grid-cols-2 gap-3">
                <label>
                  <span className="block text-[12px] font-bold text-charcoal mb-1.5">部屋数</span>
                  <div className="relative">
                    <select
                      value={rooms}
                      onChange={e => setRooms(parseInt(e.target.value, 10))}
                      className="appearance-none w-full bg-cloud-white border border-light-gray rounded-btn px-4 py-3 text-[13px] text-charcoal font-medium pr-9 cursor-pointer hover:border-sekai-teal/40 focus:border-sekai-teal focus:outline-none transition"
                    >
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>{n === 5 ? '5+' : n}</option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                    >
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="#5F6368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </label>
                <label>
                  <span className="block text-[12px] font-bold text-charcoal mb-1.5">運営状況</span>
                  <div className="relative">
                    <select
                      value={status}
                      onChange={e => setStatus(e.target.value as Status)}
                      className="appearance-none w-full bg-cloud-white border border-light-gray rounded-btn px-4 py-3 text-[13px] text-charcoal font-medium pr-9 cursor-pointer hover:border-sekai-teal/40 focus:border-sekai-teal focus:outline-none transition"
                    >
                      <option value="running">運用中</option>
                      <option value="new">立ち上げ前</option>
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                    >
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="#5F6368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </label>
              </div>

              {/* Monthly revenue (optional) */}
              <label className="block">
                <span className="block text-[12px] font-bold text-charcoal mb-1.5">
                  現在の月商 <span className="text-mid-gray font-normal">（任意）</span>
                </span>
                <div className="flex items-center bg-cloud-white border border-light-gray rounded-btn px-4 py-3 text-[13px] focus-within:border-sekai-teal transition">
                  <span className="text-mid-gray mr-2">¥</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={revenueDisplay}
                    onChange={e => setRevenueInput(e.target.value)}
                    placeholder="600,000"
                    className="flex-1 bg-transparent outline-none text-charcoal font-medium"
                    aria-label="現在の月商"
                  />
                </div>
              </label>

              {/* Email (optional in preview) */}
              <label className="block">
                <span className="block text-[12px] font-bold text-charcoal mb-1.5">
                  メールアドレス <span className="text-mid-gray font-normal">（結果送付用・任意）</span>
                </span>
                <div className={`flex items-center bg-cloud-white border rounded-btn px-4 py-3 text-[13px] transition ${
                  emailValid ? 'border-light-gray focus-within:border-sekai-teal' : 'border-red-400'
                }`}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent outline-none text-charcoal font-medium"
                    aria-label="メールアドレス"
                  />
                </div>
                {!emailValid && (
                  <span className="block text-[11px] text-red-500 mt-1">
                    メールアドレスの形式をご確認ください
                  </span>
                )}
              </label>
            </div>

            <Link
              href={ctaHref}
              className="group mt-6 w-full inline-flex items-center justify-center gap-2 bg-sekai-teal hover:bg-deep-teal text-white font-bold py-3.5 rounded-btn transition text-[14px]"
            >
              詳しく試算する
              <IconArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
            </Link>
            <p className="text-[11px] text-mid-gray mt-3 text-center">
              上記の入力内容で詳細シミュレーションへ進みます
            </p>
          </div>

          {/* ── Live result card ── */}
          <div className="bg-gradient-to-br from-deep-teal to-sekai-teal rounded-card p-6 md:p-8 text-white flex flex-col min-w-0 relative overflow-hidden">
            {/* Decorative glow */}
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-bright-teal/25 blur-3xl pointer-events-none"
            />

            <div className="relative flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <IconChart size={16} color="#ffffff" />
                </div>
                <span className="eyebrow text-white/90">Live Estimate</span>
              </div>
              <span className="text-[10px] font-mono text-white/70 border border-white/25 rounded-full px-2.5 py-1">
                {result.currentRev > 0 ? 'WITH BASELINE' : 'QUICK ESTIMATE'}
              </span>
            </div>

            {/* Projected monthly revenue range */}
            <div className="relative mb-6">
              <div className="text-[11px] text-white/75 mb-2">想定月商レンジ</div>
              <div className="flex items-baseline gap-2 mb-3 transition-all duration-300">
                <span className="text-[28px] md:text-[34px] font-bold leading-none tabular-nums">
                  {manYen(result.low)}
                </span>
                <span className="text-white/70">〜</span>
                <span className="text-[28px] md:text-[34px] font-bold leading-none tabular-nums">
                  {manYen(result.high)}
                </span>
              </div>
              {/* Range bar */}
              <div className="relative h-2 bg-white/15 rounded-full">
                <div
                  className="absolute top-0 h-full bg-white rounded-full transition-all duration-500 ease-out"
                  style={{ left: `${result.lowPct}%`, right: `${100 - result.highPct}%` }}
                />
                <div
                  className="absolute -top-1 w-4 h-4 bg-white rounded-full border-2 border-deep-teal transition-all duration-500 ease-out"
                  style={{ left: `${result.lowPct}%`, transform: 'translateX(-50%)' }}
                />
                <div
                  className="absolute -top-1 w-4 h-4 bg-white rounded-full border-2 border-deep-teal transition-all duration-500 ease-out"
                  style={{ left: `${result.highPct}%`, transform: 'translateX(-50%)' }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-white/60 mt-1.5 font-mono">
                <span>¥0</span>
                <span>¥200万+</span>
              </div>
            </div>

            {/* Current baseline diff (only if provided) */}
            {result.currentRev > 0 && (
              <div className="relative bg-white/10 rounded-btn p-3 mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-white/70 mb-0.5">現状月商</div>
                  <div className="text-[14px] font-bold tabular-nums">{yen(result.currentRev)}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-bright-teal mb-0.5">上振れ余地</div>
                  <div className="text-[14px] font-bold text-bright-teal tabular-nums">
                    +{yen(Math.max(0, result.high - result.currentRev))}
                  </div>
                </div>
              </div>
            )}

            {/* Improvement score */}
            <div className="relative bg-white/10 rounded-btn p-4 mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-white/80">改善余地スコア</span>
                <span className="text-[11px] font-bold text-bright-teal tabular-nums">
                  {result.scoreLabel} · {result.improvement}%
                </span>
              </div>
              <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-bright-teal rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.max(8, result.improvement)}%` }}
                />
              </div>
            </div>

            {/* Priority actions */}
            <div className="relative mb-6">
              <div className="text-[11px] font-bold text-white/85 mb-3">優先して見直すべきポイント</div>
              <ul className="space-y-2">
                {result.actions.map(a => (
                  <li key={a.n} className="flex items-start gap-3 text-[13px]">
                    <span className="text-[10px] font-mono text-bright-teal mt-1 flex-shrink-0">
                      {a.n}
                    </span>
                    <span className="flex-1">{a.t}</span>
                    <IconCheck size={14} color="#54BEC3" />
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={ctaHref}
              className="group relative mt-auto inline-flex items-center justify-center gap-2 bg-white text-deep-teal hover:bg-teal-tint font-bold py-3.5 rounded-btn transition text-[14px]"
            >
              {SIMULATION.cta.label}
              <IconArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
