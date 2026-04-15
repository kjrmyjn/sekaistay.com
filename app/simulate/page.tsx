'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import {
  IconArrowRight,
  IconCheck,
  IconSparkles,
  IconLock,
  IconShield,
  IconTrendingUp,
} from '@/components/Icons'

const OUR_RATE = 0.08

const RATE_PRESETS: { label: string; value: number | null }[] = [
  { label: '15%', value: 15 },
  { label: '20%', value: 20 },
  { label: '25%', value: 25 },
  { label: 'カスタム', value: null },
]

export default function SimulatePage() {
  const [properties, setProperties] = useState(3)
  const [occupancy, setOccupancy] = useState(65)
  const [nightly, setNightly] = useState(15000)
  const [selectedRate, setSelectedRate] = useState<number | null>(15)
  const [customRate, setCustomRate] = useState('')

  const isCustom = selectedRate === null
  const compareRate = isCustom
    ? Math.min(Math.max(Number(customRate) || 0, 0), 100) / 100
    : (selectedRate ?? 0) / 100

  const nightsPerMonth = Math.round(30 * (occupancy / 100))
  const monthlyRevenue = properties * nightsPerMonth * nightly
  const compareFee = monthlyRevenue * compareRate
  const ourFee = monthlyRevenue * OUR_RATE
  const monthlyDiff = compareFee - ourFee
  const yearlyDiff = monthlyDiff * 12

  const compareLabel = isCustom ? `${customRate || '?'}%` : `${selectedRate}%`

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: '収支シミュレーター' }]} />
      <main className="min-h-screen bg-cloud-white pb-20">

        {/* ─────────────────── Hero ─────────────────── */}
        <section className="relative bg-charcoal text-white overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(37,157,163,0.40) 0%, transparent 70%)' }}
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(84,190,195,0.30) 0%, transparent 70%)' }}
          />

          <div className="relative max-w-3xl mx-auto px-5 md:px-8 py-14 md:py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur mb-6">
              <IconSparkles size={14} className="text-bright-teal" />
              <span className="text-[11px] md:text-xs font-bold tracking-wider text-bright-teal uppercase">
                Fee Savings Calculator
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-5">
              管理報酬を変えるだけで、<br />
              <span className="text-bright-teal">年間いくら残せるか</span>を試算する。
            </h1>
            <p className="text-sm md:text-base text-white/75 leading-relaxed max-w-xl mx-auto">
              現在の管理報酬率・物件数・稼働率を入力すると、SEKAI STAY（8%）との差額が
              <br className="hidden md:inline" />
              月単位・年単位で即座に算出されます。
            </p>

            <div className="mt-8 flex items-center justify-center flex-wrap gap-x-6 gap-y-2 text-[11px] md:text-xs text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <IconLock size={12} className="text-bright-teal" />
                個人情報入力不要
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconShield size={12} className="text-bright-teal" />
                リアルタイム試算
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconCheck size={12} className="text-bright-teal" />
                完全無料
              </span>
            </div>
          </div>
        </section>

        {/* ─────────────────── Layout ─────────────────── */}
        <div className="max-w-5xl mx-auto px-5 md:px-8 -mt-10 md:-mt-14 relative">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-5 md:gap-6">

            {/* ── Left: Input Panel ── */}
            <div className="bg-white rounded-card shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-light-gray p-6 md:p-8">

              <div className="mb-6">
                <p className="eyebrow text-deep-teal mb-2">Inputs</p>
                <h2 className="text-lg md:text-xl font-bold text-charcoal leading-tight">
                  物件情報と現状の手数料を入力
                </h2>
              </div>

              <div className="space-y-7">
                {/* Compare Rate */}
                <div>
                  <label className="text-sm font-bold text-charcoal block mb-3">
                    現在の管理報酬率
                    <span className="text-xs font-normal text-mid-gray ml-2">（比較対象）</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {RATE_PRESETS.map(preset => (
                      <button
                        key={preset.label}
                        onClick={() => {
                          setSelectedRate(preset.value)
                          if (preset.value !== null) setCustomRate('')
                        }}
                        className={`px-2 py-2.5 rounded-btn text-sm font-bold border transition
                          ${
                            selectedRate === preset.value
                              ? 'bg-deep-teal text-white border-deep-teal shadow-[0_4px_12px_rgba(22,123,129,0.25)]'
                              : 'bg-cloud-white text-dark-gray border-light-gray hover:border-deep-teal/40'
                          }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  {isCustom && (
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={customRate}
                        onChange={e => setCustomRate(e.target.value)}
                        placeholder="例: 18"
                        className="w-28 text-sm px-3 py-2.5 rounded-btn border border-light-gray bg-cloud-white outline-none focus:border-deep-teal text-center font-bold text-charcoal"
                      />
                      <span className="text-sm text-dark-gray">% を入力</span>
                    </div>
                  )}
                </div>

                {/* Properties */}
                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <label className="text-sm font-bold text-charcoal">物件数</label>
                    <span className="text-xl font-bold text-deep-teal tracking-tight">
                      {properties}
                      <span className="text-xs font-normal text-mid-gray ml-1">件</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    step={1}
                    value={properties}
                    onChange={e => setProperties(Number(e.target.value))}
                    className="w-full accent-[#167B81]"
                  />
                  <div className="flex justify-between text-[10px] text-mid-gray mt-1 font-mono">
                    <span>1</span>
                    <span>10</span>
                    <span>20</span>
                    <span>30+</span>
                  </div>
                  {properties === 30 && (
                    <p className="text-xs text-dark-gray mt-2">
                      30件以上の場合は
                      <Link href="/contact" className="text-deep-teal underline font-bold mx-1">
                        無料相談
                      </Link>
                      にて直接ご案内いたします。
                    </p>
                  )}
                </div>

                {/* Occupancy */}
                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <label className="text-sm font-bold text-charcoal">稼働率</label>
                    <span className="text-xl font-bold text-deep-teal tracking-tight">
                      {occupancy}
                      <span className="text-xs font-normal text-mid-gray ml-1">%</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={100}
                    step={5}
                    value={occupancy}
                    onChange={e => setOccupancy(Number(e.target.value))}
                    className="w-full accent-[#167B81]"
                  />
                  <div className="flex justify-between text-[10px] text-mid-gray mt-1 font-mono">
                    <span>20%</span>
                    <span>50%</span>
                    <span>80%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Nightly */}
                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <label className="text-sm font-bold text-charcoal">1泊あたりの平均単価</label>
                    <span className="text-xl font-bold text-deep-teal tracking-tight">
                      ¥{fmt(nightly)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3000}
                    max={200000}
                    step={1000}
                    value={nightly}
                    onChange={e => setNightly(Number(e.target.value))}
                    className="w-full accent-[#167B81]"
                  />
                  <div className="flex justify-between text-[10px] text-mid-gray mt-1 font-mono">
                    <span>¥3,000</span>
                    <span>¥50,000</span>
                    <span>¥100,000</span>
                    <span>¥200,000</span>
                  </div>
                </div>

                {/* Monthly revenue summary */}
                <div className="bg-cloud-white rounded-card px-4 md:px-5 py-4 border border-light-gray">
                  <p className="text-[10px] font-mono tracking-widest text-mid-gray uppercase mb-1">
                    Estimated Monthly Revenue
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
                    ¥{fmt(monthlyRevenue)}
                  </p>
                  <p className="text-[11px] text-mid-gray mt-1">
                    {properties}件 × {nightsPerMonth}泊 × ¥{fmt(nightly)}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right: Results ── */}
            <div className="space-y-5 md:space-y-6">

              {/* Comparison Card */}
              <div className="bg-white rounded-card shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-light-gray p-6 md:p-8">
                <div className="mb-5">
                  <p className="eyebrow text-deep-teal mb-2">Comparison</p>
                  <h2 className="text-lg md:text-xl font-bold text-charcoal">月間管理費の比較</h2>
                </div>

                <div className="space-y-3">
                  {/* Comparison (other) */}
                  <div className="flex items-center justify-between gap-3 bg-cloud-white rounded-btn px-4 py-3.5 border border-light-gray">
                    <div className="min-w-0">
                      <p className="text-[10px] text-mid-gray font-mono tracking-wider uppercase mb-0.5">
                        現在の管理費
                      </p>
                      <p className="text-base md:text-lg font-bold text-mid-gray line-through tabular-nums">
                        ¥{fmt(compareFee)}
                      </p>
                    </div>
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-full bg-pale-gray text-dark-gray font-bold text-sm">
                      {compareLabel}
                    </span>
                  </div>

                  {/* Ours */}
                  <div className="flex items-center justify-between gap-3 bg-gradient-to-br from-teal-tint to-white rounded-btn px-4 py-3.5 border-2 border-deep-teal shadow-[0_8px_20px_rgba(22,123,129,0.12)]">
                    <div className="min-w-0">
                      <p className="text-[10px] text-deep-teal font-mono tracking-wider uppercase mb-0.5 font-bold">
                        SEKAI STAY
                      </p>
                      <p className="text-xl md:text-2xl font-bold text-deep-teal tabular-nums">
                        ¥{fmt(ourFee)}
                      </p>
                    </div>
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-full bg-deep-teal text-white font-bold text-sm shadow-[0_4px_12px_rgba(22,123,129,0.3)]">
                      8%
                    </span>
                  </div>
                </div>

                {/* Yearly savings hero */}
                {monthlyDiff > 0 ? (
                  <div className="relative mt-5 bg-charcoal rounded-card overflow-hidden p-5 md:p-6">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-40"
                      style={{
                        background: 'radial-gradient(circle at 20% 50%, rgba(37,157,163,0.35) 0%, transparent 60%)',
                      }}
                    />
                    <div className="relative text-center">
                      <div className="inline-flex items-center gap-1.5 mb-2">
                        <IconTrendingUp size={14} className="text-bright-teal" />
                        <p className="text-[10px] font-mono tracking-widest text-bright-teal uppercase font-bold">
                          Annual Savings
                        </p>
                      </div>
                      <p className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-1">
                        <span className="text-bright-teal">+</span>¥{fmt(yearlyDiff)}
                      </p>
                      <p className="text-sm text-white/80">年間で手元に残る</p>
                      <p className="text-[11px] text-white/60 mt-2">
                        月あたり +¥{fmt(monthlyDiff)} の差
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 bg-cloud-white rounded-card px-5 py-5 text-center border border-light-gray">
                    <p className="text-sm text-dark-gray">比較対象の料率を設定してください</p>
                  </div>
                )}
              </div>

              {/* Year Table */}
              <div className="bg-white rounded-card shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-light-gray p-6 md:p-7">
                <div className="mb-4">
                  <p className="eyebrow text-deep-teal mb-2">Detailed Breakdown</p>
                  <h2 className="text-lg md:text-xl font-bold text-charcoal">月次・年次の内訳</h2>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[10px] text-mid-gray font-mono uppercase tracking-wider border-b border-light-gray">
                      <th className="pb-2 text-left font-bold"></th>
                      <th className="pb-2 text-right font-bold">月額</th>
                      <th className="pb-2 text-right font-bold">年額</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pale-gray">
                    <tr>
                      <td className="py-3 text-xs text-dark-gray">売上</td>
                      <td className="py-3 text-right font-bold text-charcoal tabular-nums">
                        ¥{fmt(monthlyRevenue)}
                      </td>
                      <td className="py-3 text-right font-bold text-charcoal tabular-nums">
                        ¥{fmt(monthlyRevenue * 12)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-xs text-mid-gray">現在の管理費 ({compareLabel})</td>
                      <td className="py-3 text-right text-mid-gray line-through tabular-nums">
                        ¥{fmt(compareFee)}
                      </td>
                      <td className="py-3 text-right text-mid-gray line-through tabular-nums">
                        ¥{fmt(compareFee * 12)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-xs text-deep-teal font-bold">SEKAI STAY (8%)</td>
                      <td className="py-3 text-right font-bold text-deep-teal tabular-nums">
                        ¥{fmt(ourFee)}
                      </td>
                      <td className="py-3 text-right font-bold text-deep-teal tabular-nums">
                        ¥{fmt(ourFee * 12)}
                      </td>
                    </tr>
                    <tr className="bg-teal-tint/40">
                      <td className="py-3 pl-2 text-xs text-deep-teal font-bold">差額（節約額）</td>
                      <td className="py-3 text-right font-bold text-deep-teal tabular-nums">
                        ¥{fmt(monthlyDiff)}
                      </td>
                      <td className="py-3 pr-2 text-right font-bold text-deep-teal tabular-nums">
                        ¥{fmt(yearlyDiff)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-[10px] text-mid-gray mt-4 leading-relaxed">
                  ※ 管理報酬のみの比較です。清掃費・備品費・OTA手数料などは含みません。
                  SEKAI STAYは固定管理費が別途 ¥5,000/月 かかります。
                </p>
              </div>

              {/* CTA */}
              <div className="relative bg-charcoal rounded-card overflow-hidden p-6 md:p-8 text-center">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40"
                  style={{
                    background: 'radial-gradient(circle at 80% 50%, rgba(37,157,163,0.40) 0%, transparent 60%)',
                  }}
                />
                <div className="relative">
                  <p className="eyebrow text-bright-teal mb-2">Next Step</p>
                  <p className="text-base md:text-lg font-bold text-white mb-2 leading-snug">
                    年間 ¥{fmt(yearlyDiff)}、<br className="sm:hidden" />
                    残せるかもしれません。
                  </p>
                  <p className="text-xs text-white/70 mb-5 leading-relaxed">
                    現状の運営状況を整理するだけでも、無料相談は十分お役に立てます。
                  </p>

                  <div className="space-y-2.5">
                    <Link
                      href="/contact"
                      className="group inline-flex items-center justify-center gap-2 w-full bg-white text-charcoal hover:bg-teal-tint font-bold text-sm md:text-base py-4 rounded-btn transition"
                    >
                      無料相談を申し込む
                      <IconArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
                    </Link>
                    <Link
                      href="/diagnostic"
                      className="inline-flex items-center justify-center gap-2 w-full bg-white/10 border border-white/20 text-white hover:bg-white/15 font-bold text-sm py-3.5 rounded-btn transition"
                    >
                      無料収益診断をする
                    </Link>
                  </div>
                  <p className="text-[11px] text-bright-teal/90 mt-4">
                    完全無料・しつこい営業は一切いたしません
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString('ja-JP')
}
