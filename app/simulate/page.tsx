'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import { IconArrowRight } from '@/components/Icons'

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
      <main className="bg-ivory pb-20">

        {/* Hero */}
        <section className="relative bg-ink text-ivory overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(22,123,129,0.4) 0%, transparent 70%)' }}
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(84,190,195,0.3) 0%, transparent 70%)' }}
          />

          <div className="relative container-edit pt-16 md:pt-24 pb-24 md:pb-32">
            <div className="flex items-center gap-4 mb-10">
              <span className="chapter text-bright-teal">Chapter Ⅰ</span>
              <span className="w-6 h-px bg-bright-teal" />
              <span className="eyebrow !text-bright-teal">Fee Savings Calculator</span>
            </div>

            <div className="grid lg:grid-cols-[0.6fr_0.4fr] gap-10 lg:gap-20 items-end">
              <h1 className="heading-display !font-sans text-ivory jp-keep !text-[clamp(2rem,5vw,4rem)] leading-[1.1]">
                管理報酬を変えるだけで、
                <br />
                <span className="font-sans font-light text-bright-teal">
                  いくら残せるか。
                </span>
              </h1>
              <p className="lead text-ivory/75 jp-break">
                現在の管理報酬率・物件数・稼働率を入力すると、
                SEKAI STAY（8%）との差額が月単位・年単位で即座に算出されます。
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-ivory/15 flex flex-wrap gap-x-10 gap-y-3 text-caption text-ivory/60">
              <span className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-bright-teal" />
                個人情報入力不要
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-bright-teal" />
                リアルタイム試算
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-bright-teal" />
                完全無料
              </span>
            </div>
          </div>
        </section>

        {/* Layout */}
        <div className="container-edit -mt-14 relative">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-4">

            {/* Left: Input Panel */}
            <div className="bg-paper border border-rule shadow-lift-lg p-7 md:p-10">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-rule">
                <span className="font-sans text-[14px] text-mid-gray">№ 01</span>
                <div>
                  <p className="eyebrow-mono text-mid-gray mb-1">Inputs</p>
                  <h2 className="font-sans font-medium text-[20px] text-ink">
                    物件情報と現状の手数料
                  </h2>
                </div>
              </div>

              <div className="space-y-10">
                {/* Compare Rate */}
                <div>
                  <div className="flex items-baseline justify-between mb-4">
                    <label className="eyebrow-mono text-mid-gray">現在の管理報酬率</label>
                    <span className="font-sans text-[11px] text-mid-gray">比較対象</span>
                  </div>
                  <div className="grid grid-cols-4 gap-px bg-rule border border-rule">
                    {RATE_PRESETS.map(preset => (
                      <button
                        key={preset.label}
                        onClick={() => {
                          setSelectedRate(preset.value)
                          if (preset.value !== null) setCustomRate('')
                        }}
                        className={`px-2 py-3 text-[13px] transition ${
                          selectedRate === preset.value
                            ? 'bg-ink text-ivory font-sans'
                            : 'bg-paper text-dark-gray hover:text-ink font-sans'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  {isCustom && (
                    <div className="mt-4 flex items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={customRate}
                        onChange={e => setCustomRate(e.target.value)}
                        placeholder="例: 18"
                        className="w-28 text-[14px] px-3 py-2.5 border border-rule bg-mist outline-none focus:border-sekai-teal text-center font-sans text-ink"
                      />
                      <span className="font-sans text-[13px] text-dark-gray">% を入力</span>
                    </div>
                  )}
                </div>

                {/* Properties */}
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <label className="eyebrow-mono text-mid-gray">物件数</label>
                    <span className="font-sans font-light text-[32px] text-sekai-teal leading-none tabular-nums">
                      {properties}
                      <span className="font-sans text-[12px] text-mid-gray ml-1">件</span>
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
                  <div className="flex justify-between text-[10px] text-mid-gray mt-2 font-mono tracking-wider">
                    <span>1</span>
                    <span>10</span>
                    <span>20</span>
                    <span>30+</span>
                  </div>
                  {properties === 30 && (
                    <p className="text-caption text-dark-gray mt-3 font-sans">
                      30件以上の場合は{' '}
                      <Link href="/contact" className="text-sekai-teal border-b border-sekai-teal/40">
                        無料相談
                      </Link>
                      {' '}にて直接ご案内いたします。
                    </p>
                  )}
                </div>

                {/* Occupancy */}
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <label className="eyebrow-mono text-mid-gray">稼働率</label>
                    <span className="font-sans font-light text-[32px] text-sekai-teal leading-none tabular-nums">
                      {occupancy}
                      <span className="font-sans text-[14px] text-mid-gray ml-1">%</span>
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
                  <div className="flex justify-between text-[10px] text-mid-gray mt-2 font-mono tracking-wider">
                    <span>20%</span>
                    <span>50%</span>
                    <span>80%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Nightly */}
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <label className="eyebrow-mono text-mid-gray">1泊あたりの平均単価</label>
                    <span className="font-sans font-light text-[28px] text-sekai-teal leading-none tabular-nums">
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
                  <div className="flex justify-between text-[10px] text-mid-gray mt-2 font-mono tracking-wider">
                    <span>¥3,000</span>
                    <span>¥50,000</span>
                    <span>¥100,000</span>
                    <span>¥200,000</span>
                  </div>
                </div>

                {/* Monthly revenue summary */}
                <div className="bg-mist border-t-2 border-sekai-teal pt-6 px-5 pb-5 -mx-2">
                  <p className="eyebrow-mono text-sekai-teal mb-2">Estimated Monthly Revenue</p>
                  <p className="font-sans font-light text-[36px] md:text-[44px] text-ink leading-none tabular-nums">
                    ¥{fmt(monthlyRevenue)}
                  </p>
                  <p className="text-caption text-mid-gray mt-2 font-sans">
                    {properties}件 × {nightsPerMonth}泊 × ¥{fmt(nightly)}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Results */}
            <div className="space-y-4">

              {/* Comparison Card */}
              <div className="bg-paper border border-rule shadow-lift-lg p-7 md:p-10">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-rule">
                  <span className="font-sans text-[14px] text-mid-gray">№ 02</span>
                  <div>
                    <p className="eyebrow-mono text-mid-gray mb-1">Comparison</p>
                    <h2 className="font-sans font-medium text-[20px] text-ink">
                      月間管理費の比較
                    </h2>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {/* Other */}
                  <div className="flex items-center justify-between gap-4 bg-mist px-5 py-4 border border-rule">
                    <div className="min-w-0">
                      <p className="eyebrow-mono text-mid-gray mb-1">現在の管理費</p>
                      <p className="font-sans text-[18px] text-mid-gray line-through tabular-nums">
                        ¥{fmt(compareFee)}
                      </p>
                    </div>
                    <span className="font-sans font-light text-[28px] text-mid-gray tabular-nums">
                      {compareLabel}
                    </span>
                  </div>

                  {/* Ours */}
                  <div className="flex items-center justify-between gap-4 bg-paper border-2 border-sekai-teal px-5 py-5">
                    <div className="min-w-0">
                      <p className="eyebrow text-sekai-teal mb-1">SEKAI STAY</p>
                      <p className="font-sans font-light text-[32px] md:text-[36px] text-ink leading-none tabular-nums">
                        ¥{fmt(ourFee)}
                      </p>
                    </div>
                    <span className="font-sans font-light text-[40px] text-sekai-teal tabular-nums">
                      8%
                    </span>
                  </div>
                </div>

                {/* Annual savings hero */}
                {monthlyDiff > 0 ? (
                  <div className="relative bg-ink overflow-hidden p-7 md:p-8">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-40"
                      style={{ background: 'radial-gradient(circle at 20% 50%, rgba(22,123,129,0.4) 0%, transparent 60%)' }}
                    />
                    <div className="relative">
                      <p className="eyebrow-mono text-bright-teal mb-4">Annual Savings</p>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="font-sans font-light text-[28px] text-bright-teal">+</span>
                        <span className="font-sans font-light text-[56px] md:text-[64px] text-ivory leading-none tabular-nums">
                          ¥{fmt(yearlyDiff)}
                        </span>
                      </div>
                      <p className="font-sans text-[15px] text-ivory/80 mb-2">年間で手元に残る</p>
                      <p className="text-caption text-ivory/60">
                        月あたり +¥{fmt(monthlyDiff)} の差
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-mist px-5 py-6 text-center border border-rule">
                    <p className="font-sans text-[14px] text-dark-gray">
                      比較対象の料率を設定してください
                    </p>
                  </div>
                )}
              </div>

              {/* Detailed Table */}
              <div className="bg-paper border border-rule shadow-lift p-7 md:p-8">
                <div className="mb-5">
                  <p className="eyebrow-mono text-mid-gray mb-1">Detailed Breakdown</p>
                  <h2 className="font-sans font-medium text-[18px] text-ink">
                    月次・年次の内訳
                  </h2>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-rule">
                      <th className="pb-3 text-left"></th>
                      <th className="pb-3 text-right eyebrow-mono text-mid-gray !text-[9px]">月額</th>
                      <th className="pb-3 text-right eyebrow-mono text-mid-gray !text-[9px]">年額</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-rule">
                      <td className="py-4 font-sans text-[13px] text-ink">売上</td>
                      <td className="py-4 text-right font-sans text-[14px] text-ink tabular-nums">¥{fmt(monthlyRevenue)}</td>
                      <td className="py-4 text-right font-sans text-[14px] text-ink tabular-nums">¥{fmt(monthlyRevenue * 12)}</td>
                    </tr>
                    <tr className="border-b border-rule">
                      <td className="py-4 font-sans text-[13px] text-mid-gray">現在の管理費 ({compareLabel})</td>
                      <td className="py-4 text-right font-sans text-[14px] text-mid-gray line-through tabular-nums">¥{fmt(compareFee)}</td>
                      <td className="py-4 text-right font-sans text-[14px] text-mid-gray line-through tabular-nums">¥{fmt(compareFee * 12)}</td>
                    </tr>
                    <tr className="border-b border-rule">
                      <td className="py-4 font-sans text-[13px] text-sekai-teal">SEKAI STAY (8%)</td>
                      <td className="py-4 text-right font-sans text-[16px] text-sekai-teal tabular-nums">¥{fmt(ourFee)}</td>
                      <td className="py-4 text-right font-sans text-[16px] text-sekai-teal tabular-nums">¥{fmt(ourFee * 12)}</td>
                    </tr>
                    <tr className="bg-mist">
                      <td className="py-4 pl-3 font-sans font-medium text-[13px] text-sekai-teal">差額（節約額）</td>
                      <td className="py-4 text-right font-sans text-[18px] text-sekai-teal tabular-nums">¥{fmt(monthlyDiff)}</td>
                      <td className="py-4 pr-3 text-right font-sans text-[18px] text-sekai-teal tabular-nums">¥{fmt(yearlyDiff)}</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-caption text-mid-gray mt-5 leading-relaxed jp-break">
                  ※ 管理報酬のみの比較です。清掃費・備品費・OTA手数料などは含みません。SEKAI STAYは固定管理費が別途 ¥5,000/月 かかります。
                </p>
              </div>

              {/* CTA */}
              <div className="relative bg-ink overflow-hidden p-8 md:p-10">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-50"
                  style={{ background: 'radial-gradient(circle at 80% 50%, rgba(22,123,129,0.4) 0%, transparent 60%)' }}
                />
                <div className="relative">
                  <p className="eyebrow-mono text-bright-teal mb-4">Next Step</p>
                  <p className="font-sans text-[20px] md:text-[22px] text-ivory mb-3 leading-snug">
                    年間 <span className="font-sans text-bright-teal">¥{fmt(yearlyDiff)}</span>、
                    <br />
                    残せるかもしれません。
                  </p>
                  <p className="text-body-sm text-ivory/70 mb-8 jp-break">
                    現状の運営状況を整理するだけでも、無料相談は十分お役に立てます。
                  </p>

                  <div className="flex flex-col gap-3">
                    <Link
                      href="/contact"
                      className="btn bg-ivory text-teal-ink hover:bg-bright-teal hover:text-ivory border-ivory justify-center"
                    >
                      無料相談を申し込む
                      <IconArrowRight size={14} />
                    </Link>
                    <Link
                      href="/diagnostic"
                      className="btn border-ivory/40 text-ivory hover:bg-ivory/10 hover:border-ivory justify-center"
                    >
                      無料収益診断をする
                    </Link>
                  </div>
                  <p className="text-caption text-bright-teal/80 mt-5 font-sans text-center">
                    完全無料・しつこい営業は一切いたしません。
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
