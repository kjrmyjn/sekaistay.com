'use client'

import { useState } from 'react'
import Link from 'next/link'

const OUR_RATE = 0.08

// 比較レートのプリセット
const RATE_PRESETS = [
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
    : selectedRate / 100

  const nightsPerMonth = Math.round(30 * (occupancy / 100))
  const monthlyRevenue = properties * nightsPerMonth * nightly
  const compareFee = monthlyRevenue * compareRate
  const ourFee = monthlyRevenue * OUR_RATE
  const monthlyDiff = compareFee - ourFee
  const yearlyDiff = monthlyDiff * 12

  const compareLabel = isCustom
    ? `${customRate || '?'}%`
    : `${selectedRate}%`

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      {/* ── ヘッダー ─────────────────────────── */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-4">
        <Link href="/" className="text-slate-400 text-sm">← 戻る</Link>
        <p className="text-sm font-semibold text-deep-teal">料金シミュレーター</p>
      </header>

      <div className="max-w-lg mx-auto px-5 pt-8 space-y-5">

        {/* ── リード ──────────────────────────── */}
        <div className="text-center pb-2">
          <h1 className="text-xl font-bold text-deep-teal mb-2">
            管理報酬の差額を試算する
          </h1>
          <p className="text-sm text-slate-500">
            物件の情報を入力すると、<br />
            年間でいくら節約できるかがわかります。
          </p>
        </div>

        {/* ── 入力パネル ──────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-5 py-6 space-y-6">

          {/* 比較する管理報酬率 */}
          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-3">
              現在の管理報酬率（比較対象）
            </label>
            <div className="flex gap-2 flex-wrap">
              {RATE_PRESETS.map(preset => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setSelectedRate(preset.value)
                    if (preset.value !== null) setCustomRate('')
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition
                    ${(selectedRate === preset.value)
                      ? 'bg-deep-teal text-white border-deep-teal'
                      : 'bg-slate-50 text-slate-600 border-slate-200'}`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            {isCustom && (
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="number"
                  min={1} max={100}
                  value={customRate}
                  onChange={e => setCustomRate(e.target.value)}
                  placeholder="例: 18"
                  className="w-28 text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-deep-teal text-center font-bold"
                />
                <span className="text-sm text-slate-500">% を入力してください</span>
              </div>
            )}
          </div>

          {/* 物件数 */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-700">物件数</label>
              <span className="text-lg font-bold text-deep-teal">
                {properties}<span className="text-sm font-normal text-slate-400 ml-1">件</span>
              </span>
            </div>
            <input
              type="range"
              min={1} max={30} step={1}
              value={properties}
              onChange={e => setProperties(Number(e.target.value))}
              className="w-full accent-[#167B81]"
            />
            <div className="flex justify-between text-xs text-slate-300 mt-1">
              <span>1件</span>
              <span>10件</span>
              <span>20件</span>
              <span>30件</span>
            </div>
            {properties === 30 && (
              <p className="text-xs text-slate-400 mt-2">
                30件以上の場合は、直接
                <a href="mailto:contact@example.com" className="text-deep-teal underline mx-1">お問い合わせ</a>
                ください。
              </p>
            )}
          </div>

          {/* 稼働率 */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-700">稼働率</label>
              <span className="text-lg font-bold text-deep-teal">
                {occupancy}<span className="text-sm font-normal text-slate-400 ml-1">%</span>
              </span>
            </div>
            <input
              type="range"
              min={20} max={100} step={5}
              value={occupancy}
              onChange={e => setOccupancy(Number(e.target.value))}
              className="w-full accent-[#167B81]"
            />
            <div className="flex justify-between text-xs text-slate-300 mt-1">
              <span>20%</span><span>100%</span>
            </div>
          </div>

          {/* 平均単価 */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-700">1泊あたりの平均単価</label>
              <span className="text-lg font-bold text-deep-teal">
                {fmt(nightly)}<span className="text-sm font-normal text-slate-400 ml-1">円</span>
              </span>
            </div>
            <input
              type="range"
              min={3000} max={200000} step={1000}
              value={nightly}
              onChange={e => setNightly(Number(e.target.value))}
              className="w-full accent-[#167B81]"
            />
            <div className="flex justify-between text-xs text-slate-300 mt-1">
              <span>3,000円</span>
              <span>5万円</span>
              <span>10万円</span>
              <span>20万円</span>
            </div>
          </div>

          {/* 月間売上（参考） */}
          <div className="bg-slate-50 rounded-xl px-4 py-3 text-center border border-slate-100">
            <p className="text-xs text-slate-400 mb-1">月間売上（試算）</p>
            <p className="text-xl font-bold text-slate-700">
              {fmt(monthlyRevenue)}<span className="text-sm font-normal text-slate-400 ml-1">円</span>
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {properties}件 × {nightsPerMonth}泊 × {fmt(nightly)}円
            </p>
          </div>
        </div>

        {/* ── 結果カード ──────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-5 py-6">
          <h2 className="text-sm font-bold text-deep-teal mb-4">管理費の比較</h2>

          <div className="space-y-3 mb-5">
            {/* 比較対象 */}
            <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
              <div>
                <p className="text-xs text-slate-500 mb-0.5">現在の代行会社（{compareLabel}）</p>
                <p className="text-lg font-bold text-slate-500 line-through">
                  {fmt(compareFee)}<span className="text-xs font-normal ml-1">円/月</span>
                </p>
              </div>
              <span className="text-2xl font-bold text-slate-300">{compareLabel}</span>
            </div>
            {/* 弊社 */}
            <div className="flex items-center justify-between bg-teal-tint rounded-xl px-4 py-3 border-2 border-deep-teal">
              <div>
                <p className="text-xs text-deep-teal font-semibold mb-0.5">弊社（8%）</p>
                <p className="text-lg font-bold text-deep-teal">
                  {fmt(ourFee)}<span className="text-xs font-normal ml-1">円/月</span>
                </p>
              </div>
              <span className="text-2xl font-bold text-deep-teal">8%</span>
            </div>
          </div>

          {/* 差額ハイライト */}
          {monthlyDiff > 0 ? (
            <div className="bg-amber-50 rounded-2xl px-5 py-5 text-center border border-amber-200">
              <p className="text-xs font-semibold text-amber-700 mb-1">弊社に切り替えると</p>
              <p className="text-3xl font-bold text-amber-600 mb-1">
                +{fmt(yearlyDiff)}<span className="text-base font-normal ml-1">円</span>
              </p>
              <p className="text-sm text-amber-700 font-semibold">年間で手元に残る</p>
              <p className="text-xs text-amber-600 mt-2">（月あたり {fmt(monthlyDiff)}円 の差）</p>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl px-5 py-4 text-center border border-slate-200">
              <p className="text-sm text-slate-500">比較対象の料率を設定してください</p>
            </div>
          )}
        </div>

        {/* ── 年間比較テーブル ─────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-5 py-5">
          <h2 className="text-sm font-bold text-deep-teal mb-3">年間比較</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 border-b border-slate-100">
                <th className="pb-2 text-left font-medium"></th>
                <th className="pb-2 text-right font-medium">月間</th>
                <th className="pb-2 text-right font-medium">年間</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr>
                <td className="py-2.5 text-slate-500 text-xs">売上</td>
                <td className="py-2.5 text-right font-semibold text-slate-700">{fmt(monthlyRevenue)}</td>
                <td className="py-2.5 text-right font-semibold text-slate-700">{fmt(monthlyRevenue * 12)}</td>
              </tr>
              <tr>
                <td className="py-2.5 text-slate-400 text-xs">現在の管理費（{compareLabel}）</td>
                <td className="py-2.5 text-right text-slate-400 line-through">{fmt(compareFee)}</td>
                <td className="py-2.5 text-right text-slate-400 line-through">{fmt(compareFee * 12)}</td>
              </tr>
              <tr>
                <td className="py-2.5 text-deep-teal font-semibold text-xs">弊社管理費（8%）</td>
                <td className="py-2.5 text-right font-bold text-deep-teal">{fmt(ourFee)}</td>
                <td className="py-2.5 text-right font-bold text-deep-teal">{fmt(ourFee * 12)}</td>
              </tr>
              <tr className="bg-amber-50">
                <td className="py-2.5 text-amber-700 font-bold text-xs pl-2">差額（節約額）</td>
                <td className="py-2.5 text-right font-bold text-amber-600">{fmt(monthlyDiff)}</td>
                <td className="py-2.5 text-right font-bold text-amber-600 pr-2">{fmt(yearlyDiff)}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-slate-300 mt-3">※ 管理費以外の費用（清掃費等）は含みません。あくまで試算です。</p>
        </div>

        {/* ── CTA ─────────────────────────────── */}
        <div className="bg-deep-teal rounded-2xl px-6 py-7 text-center">
          <p className="text-base font-bold text-white mb-2">
            年間{fmt(yearlyDiff)}円、節約できるかもしれません。
          </p>
          <p className="text-xs text-bright-teal mb-5">
            まずは無料相談で、今の状況を一緒に整理しましょう。
          </p>
          <a
            href="mailto:contact@example.com?subject=民泊運営の無料相談を希望します"
            className="block w-full bg-amber-400 text-deep-teal text-sm font-bold py-4 rounded-xl active:opacity-90 transition mb-3"
          >
            無料相談を申し込む →
          </a>
          <Link
            href="/audit"
            className="block w-full bg-white/10 border border-white/30 text-white text-sm font-semibold py-3.5 rounded-xl active:opacity-90 transition"
          >
            運営状況を無料診断する
          </Link>
          <p className="text-xs text-teal-tint mt-3">完全無料・営業は一切しません</p>
        </div>

      </div>
    </main>
  )
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString('ja-JP')
}
