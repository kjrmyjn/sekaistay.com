'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import {
  IconArrowRight,
  IconDashboard,
  IconChart,
  IconStar,
  IconCalendar,
  IconCheckCircle,
  IconAlert,
  IconTrendingUp,
  IconSparkles,
} from '@/components/Icons'

/* ─── Sample property data ──────────────────────────────────── */

type Property = {
  id: string
  name: string
  area: string
  type: string
  monthlyRevenue: number
  occupancy: number
  occupancyDelta: number
  reviewAvg: number
  reviewCount: number
  upcomingBookings: number
  // 6-month chart series (low → recent)
  series: { m: string; rev: number; occ: number; rating: number }[]
}

const PROPERTIES: Property[] = [
  {
    id: 'nojiri',
    name: '野尻湖ビュー貸別荘',
    area: '長野・野尻湖',
    type: '貸別荘 / 1棟貸し',
    monthlyRevenue: 1_340_000,
    occupancy: 82,
    occupancyDelta: 24,
    reviewAvg: 4.8,
    reviewCount: 184,
    upcomingBookings: 19,
    series: [
      { m: '11月', rev:  68, occ: 58, rating: 4.3 },
      { m: '12月', rev:  82, occ: 64, rating: 4.4 },
      { m: '1月',  rev:  91, occ: 70, rating: 4.5 },
      { m: '2月',  rev: 105, occ: 74, rating: 4.6 },
      { m: '3月',  rev: 118, occ: 79, rating: 4.7 },
      { m: '4月',  rev: 134, occ: 82, rating: 4.8 },
    ],
  },
  {
    id: 'kyoto',
    name: '京都・町家ステイ',
    area: '京都市東山区',
    type: '町家 / インバウンド',
    monthlyRevenue: 980_000,
    occupancy: 88,
    occupancyDelta: 12,
    reviewAvg: 4.9,
    reviewCount: 312,
    upcomingBookings: 27,
    series: [
      { m: '11月', rev:  62, occ: 76, rating: 4.6 },
      { m: '12月', rev:  68, occ: 80, rating: 4.7 },
      { m: '1月',  rev:  74, occ: 82, rating: 4.7 },
      { m: '2月',  rev:  81, occ: 84, rating: 4.8 },
      { m: '3月',  rev:  90, occ: 86, rating: 4.8 },
      { m: '4月',  rev:  98, occ: 88, rating: 4.9 },
    ],
  },
  {
    id: 'okinawa',
    name: '恩納村オーシャンヴィラ',
    area: '沖縄・恩納村',
    type: 'ヴィラ / リゾート',
    monthlyRevenue: 1_780_000,
    occupancy: 76,
    occupancyDelta: 18,
    reviewAvg: 4.7,
    reviewCount: 96,
    upcomingBookings: 14,
    series: [
      { m: '11月', rev:  92, occ: 58, rating: 4.4 },
      { m: '12月', rev: 108, occ: 62, rating: 4.5 },
      { m: '1月',  rev: 124, occ: 66, rating: 4.5 },
      { m: '2月',  rev: 142, occ: 70, rating: 4.6 },
      { m: '3月',  rev: 160, occ: 73, rating: 4.6 },
      { m: '4月',  rev: 178, occ: 76, rating: 4.7 },
    ],
  },
]

type Metric = 'rev' | 'occ' | 'rating'

const METRIC_META: Record<Metric, { label: string; unit: string; color: string }> = {
  rev:    { label: '売上推移',     unit: '万円', color: '#167B81' },
  occ:    { label: '稼働率推移',   unit: '%',    color: '#259DA3' },
  rating: { label: 'レビュー推移', unit: '/5',   color: '#54BEC3' },
}

const ACTIONS = [
  { txt: '週末価格の見直し（+8%想定）',          tag: '優先',   pri: 1 },
  { txt: 'ギャラリー写真2枚の差し替え',          tag: '中',     pri: 2 },
  { txt: '多言語リスティング調整（英・繁・韓）', tag: '中',     pri: 2 },
  { txt: 'チェックイン動線の動画化',             tag: '低',     pri: 3 },
]

const BOOKINGS = [
  { date: '4/18 (土)', guest: 'L. Anderson',  nights: 3, total: 84_000,  src: 'Airbnb',     country: 'US' },
  { date: '4/22 (水)', guest: 'Tan Wei Ling', nights: 2, total: 56_000,  src: 'Booking.com', country: 'SG' },
  { date: '4/25 (土)', guest: '山田 健太',    nights: 1, total: 28_000,  src: 'VRBO',       country: 'JP' },
  { date: '5/02 (土)', guest: 'Park Min-jun', nights: 4, total: 112_000, src: 'Airbnb',     country: 'KR' },
]

/* ─── Helpers ──────────────────────────────────────────────── */

const fmtMan = (rev: number) => '¥' + (rev / 10_000).toFixed(0) + '万'
const fmtFull = (n: number) => '¥' + n.toLocaleString('ja-JP')

/* ─── Page ─────────────────────────────────────────────────── */

export default function DashboardDemoPage() {
  const [selectedId, setSelectedId] = useState<string>(PROPERTIES[0].id)
  const [metric, setMetric] = useState<Metric>('rev')

  const property = useMemo(
    () => PROPERTIES.find(p => p.id === selectedId) ?? PROPERTIES[0],
    [selectedId],
  )

  // Series for selected metric
  const series = property.series
  const values = series.map(s => s[metric])
  const seriesMax = Math.max(...values)

  // Booking calendar heatmap (4 weeks × 7 days)
  // Generate deterministic-ish density based on property + day
  const heatmap = useMemo(() => {
    const base = property.occupancy / 100
    const cells: number[] = []
    for (let i = 0; i < 28; i++) {
      // Weekend (5,6,12,13,19,20,26,27) → higher
      const isWeekend = i % 7 === 5 || i % 7 === 6
      const noise = ((i * 9301 + 49297) % 233280) / 233280
      let v = base * (isWeekend ? 1.15 : 0.85) + (noise - 0.5) * 0.25
      v = Math.max(0, Math.min(1, v))
      cells.push(v)
    }
    return cells
  }, [property])

  return (
    <>
      <Header />
      <Breadcrumb
        items={[
          { label: 'オーナーダッシュボード デモ' },
        ]}
      />

      <main>
        {/* ─────────── Hero ─────────── */}
        <section className="relative bg-charcoal text-white overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-40 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(84,190,195,0.5), transparent 60%)' }}
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(22,123,129,0.6), transparent 60%)' }}
          />

          <div className="relative max-w-[1080px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 mb-6">
              <IconSparkles size={13} color="#54BEC3" />
              <span className="text-[11px] font-bold text-white/90 tracking-[0.15em] uppercase">
                Owner Dashboard Demo
              </span>
            </div>
            <h1 className="text-3xl md:text-[44px] font-black tracking-tight leading-[1.25] mb-5">
              物件の状態が、<br />
              <span className="text-bright-teal">一画面でわかる。</span>
            </h1>
            <p className="text-base text-white/80 leading-relaxed max-w-2xl">
              SEKAI STAYのオーナーダッシュボードは、売上・稼働率・予約・レビュー・改善アクションまで、物件の動きを一望できる設計です。<br />
              下のサンプルは実データを匿名化したもの。物件を切り替えて、実際の使い心地を体験してください。
            </p>
          </div>
        </section>

        {/* ─────────── Demo Surface ─────────── */}
        <section className="bg-cloud-white px-6 py-10 md:py-16 border-b border-light-gray">
          <div className="max-w-[1080px] mx-auto">
            {/* Property selector */}
            <div className="bg-white rounded-2xl border border-light-gray p-4 md:p-5 mb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-mid-gray tracking-wider">SELECT PROPERTY</span>
                <span className="inline-block w-1 h-4 bg-deep-teal rounded-full" />
              </div>
              <div className="flex flex-wrap gap-2">
                {PROPERTIES.map(p => {
                  const active = p.id === selectedId
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedId(p.id)}
                      className={`text-[12px] md:text-[13px] font-bold px-3.5 py-2 rounded-btn border transition ${
                        active
                          ? 'bg-deep-teal text-white border-deep-teal shadow-[0_4px_12px_rgba(22,123,129,0.3)]'
                          : 'bg-white text-charcoal border-light-gray hover:border-deep-teal/40'
                      }`}
                    >
                      {p.name}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Dashboard frame */}
            <div className="bg-white rounded-2xl border border-light-gray overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-5 py-3 bg-cloud-white border-b border-light-gray">
                <span className="w-3 h-3 rounded-full bg-light-gray" />
                <span className="w-3 h-3 rounded-full bg-light-gray" />
                <span className="w-3 h-3 rounded-full bg-light-gray" />
                <div className="ml-3 flex items-center gap-1.5 text-[11px] text-mid-gray">
                  <IconDashboard size={12} color="#9AA0A6" />
                  <span className="truncate">owner.sekaistay.com / {property.area}</span>
                </div>
                <span className="ml-auto text-[10px] font-mono text-mid-gray hidden sm:inline">LIVE PREVIEW</span>
              </div>

              <div className="p-5 md:p-7">
                {/* Property header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
                  <div>
                    <p className="text-[10px] font-mono text-mid-gray tracking-wider mb-1">
                      {property.type}
                    </p>
                    <h2 className="text-xl md:text-2xl font-black text-charcoal leading-tight">
                      {property.name}
                    </h2>
                    <p className="text-[12px] text-dark-gray mt-1">{property.area}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sekai-teal bg-teal-tint px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-sekai-teal" />
                      運用中
                    </span>
                    <span className="text-[11px] text-mid-gray">最終更新 04/16 09:12</span>
                  </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  <KpiCard
                    label="今月の売上"
                    value={fmtMan(property.monthlyRevenue)}
                    delta="+18% MoM"
                    icon={<IconChart size={14} color="#167B81" />}
                    accent
                  />
                  <KpiCard
                    label="稼働率"
                    value={`${property.occupancy}%`}
                    delta={`+${property.occupancyDelta}pt`}
                    icon={<IconTrendingUp size={14} color="#167B81" />}
                  />
                  <KpiCard
                    label="レビュー"
                    value={`${property.reviewAvg}`}
                    sub={`/ 5.0  ・ ${property.reviewCount}件`}
                    icon={<IconStar size={14} color="#167B81" />}
                  />
                  <KpiCard
                    label="今後30日の予約"
                    value={`${property.upcomingBookings}件`}
                    delta="ペース順調"
                    icon={<IconCalendar size={14} color="#167B81" />}
                  />
                </div>

                {/* Chart + Heatmap */}
                <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4 mb-6">
                  {/* Chart panel */}
                  <div className="bg-cloud-white rounded-xl border border-light-gray p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                      <div>
                        <p className="text-[11px] font-bold text-charcoal mb-0.5">
                          {METRIC_META[metric].label}
                        </p>
                        <p className="text-[11px] text-mid-gray">過去6ヶ月のトレンド</p>
                      </div>
                      <div className="inline-flex items-center bg-white border border-light-gray rounded-btn p-1">
                        {(Object.keys(METRIC_META) as Metric[]).map(m => {
                          const active = m === metric
                          return (
                            <button
                              key={m}
                              onClick={() => setMetric(m)}
                              className={`text-[11px] font-bold px-3 py-1.5 rounded transition ${
                                active
                                  ? 'bg-deep-teal text-white'
                                  : 'text-dark-gray hover:text-charcoal'
                              }`}
                            >
                              {m === 'rev' ? '売上' : m === 'occ' ? '稼働率' : 'レビュー'}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Bar chart */}
                    <div className="flex items-end justify-between gap-2 h-32 mb-2">
                      {series.map((s, i) => {
                        const pct = (s[metric] / seriesMax) * 100
                        const isLast = i === series.length - 1
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full">
                            <div className="flex-1 w-full flex items-end relative group">
                              <div
                                className={`w-full rounded-md transition-all duration-500 ease-out ${
                                  isLast ? 'bg-deep-teal' : 'bg-sekai-teal'
                                }`}
                                style={{
                                  height: `${pct}%`,
                                  opacity: isLast ? 1 : 0.45 + i * 0.1,
                                }}
                              />
                              {/* Tooltip on hover */}
                              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                                <span className="text-[10px] font-mono text-white bg-charcoal px-1.5 py-0.5 rounded whitespace-nowrap">
                                  {s[metric].toFixed(metric === 'rating' ? 1 : 0)}
                                  {METRIC_META[metric].unit}
                                </span>
                              </div>
                            </div>
                            <span className="text-[10px] text-mid-gray leading-none">{s.m}</span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-mid-gray font-mono pt-3 border-t border-light-gray">
                      <span>最小 {Math.min(...values).toFixed(metric === 'rating' ? 1 : 0)}{METRIC_META[metric].unit}</span>
                      <span>最大 {seriesMax.toFixed(metric === 'rating' ? 1 : 0)}{METRIC_META[metric].unit}</span>
                    </div>
                  </div>

                  {/* Heatmap panel */}
                  <div className="bg-cloud-white rounded-xl border border-light-gray p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-[11px] font-bold text-charcoal mb-0.5">予約カレンダー</p>
                        <p className="text-[11px] text-mid-gray">向こう4週間の埋まり具合</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1.5 mb-3">
                      {['月', '火', '水', '木', '金', '土', '日'].map(d => (
                        <div key={d} className="text-[10px] text-center text-mid-gray font-bold">
                          {d}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1.5">
                      {heatmap.map((v, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded transition"
                          style={{
                            backgroundColor: `rgba(22, 123, 129, ${0.08 + v * 0.85})`,
                          }}
                          title={`${Math.round(v * 100)}%`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-[10px] text-mid-gray">
                      <span>低</span>
                      <div className="flex gap-1 flex-1">
                        {[0.1, 0.3, 0.5, 0.7, 0.9].map(v => (
                          <div
                            key={v}
                            className="flex-1 h-1.5 rounded"
                            style={{ backgroundColor: `rgba(22, 123, 129, ${0.08 + v * 0.85})` }}
                          />
                        ))}
                      </div>
                      <span>高</span>
                    </div>
                  </div>
                </div>

                {/* Bookings + Actions */}
                <div className="grid lg:grid-cols-2 gap-4">
                  {/* Upcoming bookings */}
                  <div className="bg-cloud-white rounded-xl border border-light-gray p-5">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[11px] font-bold text-charcoal">直近の予約</p>
                      <span className="text-[10px] font-mono text-mid-gray">UPCOMING</span>
                    </div>
                    <div className="divide-y divide-light-gray">
                      {BOOKINGS.map((b, i) => (
                        <div key={i} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                          <div className="min-w-0 flex-1">
                            <p className="text-[12px] font-bold text-charcoal truncate">
                              {b.guest}
                              <span className="ml-2 text-[10px] font-mono text-mid-gray">
                                {b.country}
                              </span>
                            </p>
                            <p className="text-[10px] text-mid-gray">
                              {b.date} · {b.nights}泊 · {b.src}
                            </p>
                          </div>
                          <span className="text-[12px] font-bold text-deep-teal tabular-nums">
                            {fmtFull(b.total)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Improvement actions */}
                  <div className="bg-cloud-white rounded-xl border border-light-gray p-5">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[11px] font-bold text-charcoal">改善アクション</p>
                      <span className="text-[10px] font-mono text-mid-gray">RECOMMENDED</span>
                    </div>
                    <div className="space-y-2">
                      {ACTIONS.map((a, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-2 bg-white border border-pale-gray rounded-btn px-3 py-2.5"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {a.pri === 1 ? (
                              <IconAlert size={13} color="#F59E0B" />
                            ) : (
                              <IconCheckCircle size={13} color="#54BEC3" />
                            )}
                            <span className="text-[12px] text-charcoal truncate">{a.txt}</span>
                          </div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0 ${
                              a.tag === '優先'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-pale-gray text-dark-gray'
                            }`}
                          >
                            {a.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-mid-gray text-center mt-5">
              ※ 上記は実運用画面を匿名化・簡略化したサンプルです。実際のダッシュボードはより詳細なデータを表示します。
            </p>
          </div>
        </section>

        {/* ─────────── Feature Strip ─────────── */}
        <section className="bg-white px-6 py-16 md:py-20">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-10">
              <p className="text-[11px] font-bold text-deep-teal tracking-[0.25em] uppercase mb-4">
                Dashboard Features
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-charcoal">
                毎日見たくなる、6つの機能
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { t: 'リアルタイム売上', d: '今月の売上・前月比・年間累計を、PC/スマホでいつでも確認。' },
                { t: '稼働率トラッキング', d: '日別・週別・月別の稼働状況を可視化。空室期間も一目で把握。' },
                { t: '予約カレンダー', d: '全OTAの予約を統合表示。ゲスト国籍・滞在日数まで把握できます。' },
                { t: 'レビュー集約', d: 'Airbnb / Booking / VRBO のレビューを横断的に確認。' },
                { t: '改善アクション', d: '運用チームが提案する改善施策を、優先度付きで提示。' },
                { t: 'エクスポート', d: '月次レポートをPDF/Excelで自動生成・ダウンロード可能。' },
              ].map(f => (
                <div
                  key={f.t}
                  className="bg-cloud-white border border-light-gray rounded-xl p-5 hover:border-deep-teal/30 hover:shadow-md transition"
                >
                  <p className="text-[14px] font-bold text-charcoal mb-2">{f.t}</p>
                  <p className="text-[12px] text-dark-gray leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── CTA ─────────── */}
        <section className="bg-white px-6 pb-20 md:pb-28">
          <div className="max-w-3xl mx-auto">
            <div className="relative overflow-hidden bg-charcoal rounded-3xl p-8 md:p-12 text-center">
              <div
                aria-hidden
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 20% 0%, rgba(84,190,195,0.45), transparent 50%), radial-gradient(circle at 80% 100%, rgba(22,123,129,0.4), transparent 55%)',
                }}
              />
              <div className="relative">
                <h2 className="text-2xl md:text-[32px] font-black text-white leading-tight mb-4">
                  あなたの物件も、<br className="md:hidden" />
                  この画面で見えるようになります。
                </h2>
                <p className="text-sm md:text-base text-white/75 leading-relaxed mb-8 max-w-xl mx-auto">
                  運用代行のお申し込みと同時に、オーナーダッシュボードのアカウントを発行します。<br />
                  まずはお気軽にご相談ください。
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 bg-white text-deep-teal font-bold px-8 py-4 rounded-xl transition hover:bg-cloud-white text-sm shadow-lg"
                  >
                    無料で相談する
                    <IconArrowRight size={14} className="group-hover:translate-x-0.5 transition" />
                  </Link>
                  <Link
                    href="/simulate"
                    className="group inline-flex items-center gap-2 border border-white/30 text-white font-bold px-8 py-4 rounded-xl transition hover:bg-white/10 text-sm"
                  >
                    収益シミュレーション
                    <IconArrowRight size={14} className="group-hover:translate-x-0.5 transition" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

/* ─── KPI Card ────────────────────────────────────────────── */
function KpiCard({
  label,
  value,
  delta,
  sub,
  icon,
  accent,
}: {
  label: string
  value: string
  delta?: string
  sub?: string
  icon: React.ReactNode
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-xl p-4 md:p-5 border transition ${
        accent
          ? 'bg-teal-tint border-deep-teal/20'
          : 'bg-cloud-white border-light-gray'
      }`}
    >
      <div className="flex items-center gap-1.5 mb-2">
        {icon}
        <span className="text-[10px] font-bold text-dark-gray tracking-wider uppercase">{label}</span>
      </div>
      <div className="text-xl md:text-[26px] font-black text-charcoal tracking-tight tabular-nums leading-none mb-1">
        {value}
      </div>
      {delta && (
        <div className="text-[11px] font-bold text-sekai-teal">{delta}</div>
      )}
      {sub && (
        <div className="text-[10px] text-mid-gray">{sub}</div>
      )}
    </div>
  )
}
