'use client'

/* ─────────────────────────────────────────────────────────────
 * /switch — LP: 代行切り替え・カジュアル販促トーン
 *
 * 本サイトの editorial デザインとは別系統。Tailwind 標準クラスで
 * セールス LP らしいコントラスト・丸み・色面構成を作る。
 * Header / Footer / FloatingCTA は使わない（LP 自己完結）。
 * ──────────────────────────────────────────────────────────── */

import { useMemo, useState, useEffect } from 'react'

/* ── utils ──────────────────────────────────────────── */
const fmt = (n: number) => Math.round(n).toLocaleString('ja-JP')
const manFromYen = (yen: number) => Math.round(yen / 10000)

/* ── data ───────────────────────────────────────────── */

const PROPERTY_GALLERY: { label: string; img: string }[] = [
  {
    label: '北海道 一棟',
    img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80',
  },
  {
    label: '東京 マンション',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  },
  {
    label: '名古屋 マンション',
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  },
  {
    label: '沖縄 ヴィラ',
    img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
  },
]

const FEATURES: { no: string; title: string; body: string; metrics: { label: string; value: string }[] }[] = [
  {
    no: '01',
    title: 'オーナー専用ダッシュボード',
    body: '売上・予約・チャット・経費をリアルタイムに確認。ゲームのように売上の動きを追える。オーナー様・知人様のご予約も1タップでブロック。',
    metrics: [
      { label: '稼働率', value: '+11%' },
      { label: '満足度', value: '4.8/5' },
      { label: 'チャット返信', value: '<24h' },
      { label: '継続率', value: '97%' },
    ],
  },
  {
    no: '02',
    title: '数万件データによる自動価格調整',
    body: '需要・競合・イベント・曜日別需要を毎日分析。収益が最大になる価格を自動設定します。',
    metrics: [{ label: '平均稼働率', value: '+11%' }],
  },
  {
    no: '03',
    title: 'OTA掲載の最適化',
    body: 'Airbnb 等のタイトル・説明文・写真・色味補正まで見直し。稼働率が上がる構成に作り変えます。',
    metrics: [],
  },
  {
    no: '04',
    title: '24時間 4言語 ゲスト対応',
    body: '日・英・中・韓で24時間対応。チェックインから緊急トラブルまで、オーナー様を煩わせません。',
    metrics: [{ label: 'オーナー対応件数', value: '0件' }],
  },
  {
    no: '05',
    title: '独自100項目チェックリストの清掃・点検',
    body: '自社基準に基づく清掃・点検をマニュアル化。次のゲストにより満足いただける体制を整えます。',
    metrics: [{ label: 'レビュー平均', value: '4.8/5' }],
  },
  {
    no: '06',
    title: '物件の雑務、全部代行',
    body: '備品補充・設備トラブル・近隣対応・消耗品発注まで、運用に関わる雑務はすべて引き受けます。',
    metrics: [{ label: 'オーナー工数', value: '0h' }],
  },
  {
    no: '07',
    title: '3ヶ月に1回、専任スタッフとミーティング',
    body: '収益レビュー・改善提案・オーナー様のご要望反映をオンラインで定期開催します。',
    metrics: [{ label: 'オーナー満足度', value: '97%' }],
  },
]

const COMPARISON: { item: string; other: string; us: string }[] = [
  { item: '手数料率', other: '15〜25%', us: '8%' },
  { item: '月額固定費', other: '別途 数万円', us: '¥5,000/部屋 のみ' },
  { item: '隠れた費用', other: '清掃・広告・諸経費を別請求', us: '一切なし' },
  { item: 'オーナー向けダッシュボード', other: 'なし〜月次PDF', us: 'リアルタイム統合型' },
  { item: 'オーナー自身の予約機能', other: '毎度相談', us: 'ダッシュボードから1タップ' },
  { item: '税理士用データ書き出し', other: '手作業で数日', us: 'ワンタップで即時' },
  { item: '需要連動の自動価格調整', other: '手動 or なし', us: '数万件データで毎日自動' },
  { item: 'OTA 写真・文章最適化', other: '初回のみ', us: '毎月見直し' },
  { item: 'ゲスト対応言語', other: '日本語のみが多い', us: '日・英・中・韓 24時間' },
  { item: '専任スタッフとのミーティング', other: 'なし', us: '3ヶ月ごと' },
]

const OWNER_VOICES: {
  name: string
  age: string
  property: string
  location: string
  years: string
  result: string
  resultLabel: string
  quote: string
  img: string
}[] = [
  {
    name: '山本 様',
    age: '48歳',
    property: '戸建て2棟',
    location: '神奈川県',
    years: 'オーナー歴 2年',
    result: '−¥1,020,000',
    resultLabel: '年間手数料削減',
    quote:
      '前の代行は18%で、月次レポートも見づらくて…。SEKAI STAY に切り替えたら、手数料が半分以下になっただけじゃなく、ダッシュボードで毎日数字を確認できるのが本当に安心です。',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: '鈴木 様',
    age: '42歳',
    property: 'マンション2室',
    location: '大阪府',
    years: 'オーナー歴 1年',
    result: '稼働率 1.8倍',
    resultLabel: '32% → 58%',
    quote:
      '副業なので運営に時間をかけられず、稼働率も伸び悩んでいました。切り替えてからは価格調整もおまかせで、気づいたら予約が倍近く入るようになっていました。',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
  },
  {
    name: '佐藤 様',
    age: '61歳',
    property: '一棟アパート',
    location: '福岡県',
    years: 'オーナー歴 5年',
    result: 'レビュー 4.2 → 4.8',
    resultLabel: 'ゲスト評価改善',
    quote:
      '前の代行がひどくて、クレームが月に何件も来ていました。SEKAI STAY さんは清掃のチェックリストまで見せてくれて、ゲストからのレビューが一気に改善しました。',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
]

const FAQS: { q: string; a: string }[] = [
  {
    q: '本当に手数料8%だけですか？隠れた費用はありませんか？',
    a: '手数料8% ＋ 物件あたり月額 ¥5,000 のみです。初期費用・契約手数料・解約金・清掃費の別請求・広告費の別請求・レポート作成費など、その他の費用は一切いただきません。清掃費はゲスト宿泊料金内でカバーし、広告費・レポート費は8%内に含まれます。',
  },
  {
    q: '途中で解約できますか？',
    a: 'はい、解約金は一切いただきません。契約期間の縛りもありません。ご不満があればいつでも他社へ切り替えていただけます。オーナー様に選ばれ続けるサービスであることが私たちの責任だと考えています。',
  },
  {
    q: '物件が遠方でも大丈夫ですか？',
    a: '全国対応可能です。現地スタッフ・清掃パートナーのネットワークを活用して、北海道から沖縄まで運営実績があります。オーナー様が物件を訪れなくても、ダッシュボードで状況をすべて確認いただけます。',
  },
  {
    q: '既に他社に委託中ですが、切り替えできますか？',
    a: 'はい、切り替えの大半はお任せください。OTAアカウント連携・既存予約の引き継ぎ・清掃パートナーの手配まで弊社で対応します。並行運用で、予約が途切れることなく最短2週間で完全移行できます。',
  },
  {
    q: 'なぜ手数料8%で実現できるのですか？',
    a: '自社運営のオペレーション基盤、清掃パートナーネットワーク、多言語ゲスト対応センターを内製化することで、一般的な代行業者の運営コストを大幅に削減できています。数百物件の規模メリットを、オーナー様への還元に充てています。',
  },
  {
    q: '1部屋だけでも依頼できますか？',
    a: 'もちろん可能です。1部屋から大規模な一棟運営まで、同じ手数料8% ＋ ¥5,000/部屋の条件でお受けしています。部屋数による割増・割引はありません。',
  },
]

/* ── Chevron / small icons ─────────────────────────── */
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function Check({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function Cross({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

/* ── Page ────────────────────────────────────────────── */
export default function SwitchPage() {
  /* ── simulator state ── */
  const [feeRate, setFeeRate] = useState(20) // %
  const [monthlyRevenue, setMonthlyRevenue] = useState(600000) // 円
  const [yearsPast, setYearsPast] = useState(3)
  const [yearsFuture, setYearsFuture] = useState(5)

  const OUR_RATE = 8 // %

  const { pastLoss, futureLoss, switchSave, annualSave } = useMemo(() => {
    const diffRate = Math.max(0, feeRate - OUR_RATE) / 100
    const yearly = monthlyRevenue * 12
    const pastLoss = yearly * diffRate * yearsPast
    const futureLoss = yearly * diffRate * yearsFuture
    const switchSave = futureLoss
    const annualSave = yearly * diffRate
    return { pastLoss, futureLoss, switchSave, annualSave }
  }, [feeRate, monthlyRevenue, yearsPast, yearsFuture])

  /* ── FAQ accordion ── */
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  /* ── form state ── */
  const [page, setPage] = useState<1 | 2 | 3 | 'done'>(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const [propertyName, setPropertyName] = useState('')
  const [airbnbUrl, setAirbnbUrl] = useState('')
  const [bookingUrl, setBookingUrl] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [area, setArea] = useState('')
  const [rooms, setRooms] = useState(1)

  const [peakRev, setPeakRev] = useState(800000)
  const [offpeakRev, setOffpeakRev] = useState(400000)
  const [currentFee, setCurrentFee] = useState('')
  const [opYears, setOpYears] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [urgency, setUrgency] = useState('')
  const [note, setNote] = useState('')

  const yearlyEstimate = peakRev * 4 + offpeakRev * 8

  const page1Valid = propertyName.trim() !== '' && propertyType !== '' && area !== ''
  const page2Valid = currentFee !== '' && opYears !== ''
  const page3Valid = name.trim() !== '' && email.trim() !== ''

  const handleSubmit = async () => {
    if (!page3Valid) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ''
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `【/switch 診断】${name}様 - ${area} / ${propertyType} / ピーク¥${fmt(peakRev)}`,
          from_name: 'SEKAI STAY /switch',
          replyto: 'contact@sekaistay.com',
          name,
          email,
          phone: phone || '未入力',
          urgency: urgency || '未選択',
          property_name: propertyName,
          airbnb_url: airbnbUrl || '未入力',
          booking_url: bookingUrl || '未入力',
          property_type: propertyType,
          area,
          rooms,
          peak_revenue: `¥${fmt(peakRev)}`,
          offpeak_revenue: `¥${fmt(offpeakRev)}`,
          yearly_estimate: `¥${fmt(yearlyEstimate)}`,
          current_fee: currentFee,
          op_years: opYears,
          note: note || '未入力',
          source_page: '/switch',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setPage('done')
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          ;(window as any).gtag('event', 'generate_lead', {
            currency: 'JPY',
            value: 1,
            source_page: '/switch',
          })
        }
      } else {
        setSubmitError('送信に失敗しました。しばらくしてから再度お試しください。')
      }
    } catch {
      setSubmitError('通信エラーが発生しました。しばらくしてから再度お試しください。')
    } finally {
      setSubmitting(false)
    }
  }

  /* ── scroll to form helper ── */
  const scrollToForm = () => {
    if (typeof document !== 'undefined') {
      document.getElementById('free-diagnostic')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  /* Dynamic page title already set via layout metadata */
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('event', 'page_view', { page_title: '/switch LP', page_location: window.location.href })
    }
  }, [])

  return (
    <div className="bg-white text-slate-900">
      {/* ─── Header (LP 自前) ─────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <a href="/switch" className="flex items-center gap-2 font-bold text-slate-900">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600 text-white text-sm">S</span>
            <span className="text-sm sm:text-base leading-tight">
              SEKAI STAY <span className="text-slate-500 font-normal">民泊運用代行 · 手数料8%</span>
            </span>
          </a>
          <button
            onClick={scrollToForm}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 text-sm shadow-md shadow-teal-600/30 transition"
          >
            無料で診断レポートをもらう
            <span aria-hidden>→</span>
          </button>
          <button
            onClick={scrollToForm}
            className="sm:hidden inline-flex items-center gap-1 rounded-full bg-teal-600 text-white font-semibold px-3 py-2 text-xs"
          >
            無料診断
          </button>
        </div>
      </header>

      {/* ─── Hero ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-white to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 text-teal-800 px-4 py-1.5 text-xs font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
            民泊運用代行で「乗り換え」を検討中のオーナー様へ
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.25] text-slate-900 tracking-tight">
            民泊運用のぜんぶを、<br className="hidden sm:block" />
            <span className="text-teal-600">手数料8%で、まるっとお任せ。</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
            ＋ ¥5,000 / 部屋 / 月
            <span className="text-slate-900 font-semibold">その他の費用は一切なし</span>
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-4 text-base shadow-xl shadow-teal-600/30 transition"
            >
              まずは10秒で損失額を診断する
              <span aria-hidden>→</span>
            </button>
          </div>

          <p className="mt-4 text-xs text-slate-500">3分で入力 / 次営業日にレポート / 無理な勧誘なし</p>
        </div>

        {/* promo banner */}
        <div className="bg-amber-500 text-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm sm:text-base font-semibold">
            <span className="inline-flex items-center gap-2">
              <span className="rounded-full bg-slate-900 text-amber-400 px-2 py-0.5 text-xs">限定</span>
              先着10オーナー
            </span>
            <span>初期費用 ¥10万円 → <span className="text-rose-700 font-extrabold">¥0</span></span>
            <span className="text-xs sm:text-sm text-slate-800/80">〆切: 5/31</span>
          </div>
        </div>
      </section>

      {/* ─── Diagnostic section header ────────────────────── */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center leading-tight text-slate-900">
            まずは今の代行で<br className="sm:hidden" />
            <span className="text-teal-600">"いくら損しているか"</span>を診断
          </h2>

          {/* dashboard mockup placeholder */}
          <div className="mt-10 max-w-4xl mx-auto rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-6 sm:p-8 shadow-2xl">
            <div className="rounded-xl bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">owner.sekaistay.com</span>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-lg bg-teal-50 p-3 sm:p-4">
                  <p className="text-[10px] sm:text-xs text-teal-700 font-semibold mb-1">今月 売上</p>
                  <p className="text-lg sm:text-2xl font-extrabold text-slate-900">¥1.08M</p>
                  <p className="text-[10px] sm:text-xs text-emerald-600 font-semibold mt-1">+24% YoY</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3 sm:p-4">
                  <p className="text-[10px] sm:text-xs text-emerald-700 font-semibold mb-1">稼働率</p>
                  <p className="text-lg sm:text-2xl font-extrabold text-slate-900">74%</p>
                  <p className="text-[10px] sm:text-xs text-emerald-600 font-semibold mt-1">+8pt</p>
                </div>
                <div className="rounded-lg bg-slate-100 p-3 sm:p-4">
                  <p className="text-[10px] sm:text-xs text-slate-600 font-semibold mb-1">新規予約</p>
                  <p className="text-lg sm:text-2xl font-extrabold text-slate-900">9件</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-1">今週</p>
                </div>
              </div>
            </div>
          </div>

          {/* property gallery */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {PROPERTY_GALLERY.map((p) => (
              <div key={p.label} className="relative rounded-xl overflow-hidden shadow-md bg-slate-200 aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <p className="text-white text-xs sm:text-sm font-semibold">{p.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 text-rose-700 px-4 py-1.5 text-xs font-bold">
              <span>★</span> 日本初
            </span>
          </div>

          {/* stats bar */}
          <div className="mt-10 rounded-2xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-teal-300">97%</p>
                <p className="text-xs text-slate-300 mt-1">継続率</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-teal-300">4.8/5</p>
                <p className="text-xs text-slate-300 mt-1">満足度</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-teal-300">61%</p>
                <p className="text-xs text-slate-300 mt-1">稼働率</p>
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-teal-300 leading-tight">住宅宿泊管理業</p>
                <p className="text-xs text-slate-300 mt-1">第F05780号</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Simulator ────────────────────────────────────── */}
      <section className="bg-teal-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-10">
            <span className="inline-block rounded-full bg-teal-600 text-white px-4 py-1 text-xs font-bold mb-4">10秒で完了</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              あなたの物件、<br className="sm:hidden" />
              <span className="text-teal-600">SEKAI STAYでどう変わる？</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8">
            {/* sliders */}
            <div className="rounded-2xl bg-white shadow-xl p-6 sm:p-8 space-y-7">
              {/* fee */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">今の代行会社の手数料率</label>
                  <span className="text-2xl font-extrabold text-teal-600 tabular-nums">{feeRate}%</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={35}
                  step={1}
                  value={feeRate}
                  onChange={(e) => setFeeRate(Number(e.target.value))}
                  className="w-full accent-teal-600 h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>8%</span>
                  <span>35%</span>
                </div>
              </div>

              {/* revenue */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">物件の月間総売上</label>
                  <span className="text-2xl font-extrabold text-teal-600 tabular-nums">¥{fmt(monthlyRevenue)}</span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={5000000}
                  step={50000}
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full accent-teal-600 h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>¥10万</span>
                  <span>¥500万</span>
                </div>
              </div>

              {/* past years */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">これまでの運用期間</label>
                  <span className="text-2xl font-extrabold text-teal-600 tabular-nums">{yearsPast}年</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15}
                  step={1}
                  value={yearsPast}
                  onChange={(e) => setYearsPast(Number(e.target.value))}
                  className="w-full accent-teal-600 h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>0年</span>
                  <span>15年</span>
                </div>
              </div>

              {/* future years */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">今後あと何年運用する予定</label>
                  <span className="text-2xl font-extrabold text-teal-600 tabular-nums">{yearsFuture}年</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={yearsFuture}
                  onChange={(e) => setYearsFuture(Number(e.target.value))}
                  className="w-full accent-teal-600 h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>1年</span>
                  <span>20年</span>
                </div>
              </div>
            </div>

            {/* results */}
            <div className="rounded-2xl bg-slate-900 text-white shadow-2xl p-6 sm:p-8">
              <p className="text-xs font-mono text-teal-300 mb-4">Result · Estimated impact</p>

              <div className="space-y-4">
                <div className="rounded-xl bg-rose-500/10 border border-rose-400/30 p-4">
                  <p className="text-[11px] font-semibold text-rose-300 mb-1">現在の代行業者のままだと（過去 {yearsPast}年）</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-rose-400 tabular-nums">−¥{fmt(pastLoss)}</p>
                  <p className="text-[11px] text-slate-400 mt-1">= −{manFromYen(pastLoss).toLocaleString()}万円</p>
                </div>

                <div className="rounded-xl bg-rose-500/10 border border-rose-400/30 p-4">
                  <p className="text-[11px] font-semibold text-rose-300 mb-1">現在の代行業者のままだと（今後 {yearsFuture}年）</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-rose-400 tabular-nums">−¥{fmt(futureLoss)}</p>
                  <p className="text-[11px] text-slate-400 mt-1">= −{manFromYen(futureLoss).toLocaleString()}万円</p>
                </div>

                <div className="rounded-xl bg-emerald-500/10 border border-emerald-400/40 p-4">
                  <p className="text-[11px] font-semibold text-emerald-300 mb-1">SEKAI STAY 切り替え時（{yearsFuture}年間 削減額）</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tabular-nums">+¥{fmt(switchSave)}</p>
                  <p className="text-[11px] text-slate-400 mt-1">= +{manFromYen(switchSave).toLocaleString()}万円</p>
                </div>

                <div className="rounded-xl bg-teal-500/10 border border-teal-400/40 p-4">
                  <p className="text-[11px] font-semibold text-teal-300 mb-1">年間削減額</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-teal-300 tabular-nums">+¥{fmt(annualSave)}</p>
                  <p className="text-[11px] text-slate-400 mt-1">= +{manFromYen(annualSave).toLocaleString()}万円</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-4">※ 手数料8% ＋ 物件あたり月額 ¥5,000 で計算</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-4 text-base shadow-xl shadow-teal-600/30 transition"
            >
              もっと詳細なレポートを、無料で。
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── Detail report proposal ──────────────────────── */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            もっと詳細なレポートを、<br className="sm:hidden" />
            <span className="text-teal-600">無料で。</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            立地・稼働・OTA掲載まで分析し、詳細レポートを担当者が次営業日中にメールでお送りします。
            <br />
            無理な勧誘は致しません。
          </p>
          <button
            onClick={scrollToForm}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-4 text-base shadow-xl shadow-teal-600/30 transition"
          >
            無料で診断レポートをもらう
            <span aria-hidden>→</span>
          </button>
        </div>
      </section>

      {/* ─── Owner voice / persona story ──────────────────── */}
      <section className="bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight text-center">
            「20%も払ってるのに、<br className="sm:hidden" />この対応？」
          </h2>

          <div className="mt-10 rounded-2xl bg-white shadow-xl p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="shrink-0 w-20 h-20 rounded-full bg-slate-200 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80"
                  alt="松本さん"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">Case · 仮名</p>
                <p className="text-xl font-bold text-slate-900 mt-1">松本さん（56歳・東京）</p>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">
                  相続した戸建てを民泊運用。手数料 <span className="font-bold text-slate-900">20%</span> で委託中、
                  年間売上 <span className="font-bold text-slate-900">720万円</span> のうち
                  <span className="font-bold text-rose-600"> 144万円 </span>が手数料で消えている。
                </p>
              </div>
            </div>

            <ul className="mt-8 space-y-4">
              {[
                { h: '手数料がもったいない', b: '20%だと、せっかくの手取りが薄くなる。' },
                { h: '状況が見えない', b: '常に確認したいけど、月1のレポートだけで物足りない。' },
                { h: '稼働率をもっと上げたい', b: '休日や行事に合わせて、適切な値段を設定したい。' },
                { h: '物件の見せ方が微妙', b: 'OTA掲載が上位に上がってこず、予約が伸びない。' },
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-extrabold flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{item.h}</p>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{item.b}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-4 text-base shadow-xl shadow-teal-600/30 transition"
            >
              まずは無料の診断レポート・ご相談から
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── 7 features ──────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight text-center">
            「安い」だけじゃない。<br className="sm:hidden" />
            <span className="text-teal-600">透明性のある7つの仕組み。</span>
          </h2>
          <p className="mt-4 text-center text-slate-600 max-w-2xl mx-auto leading-relaxed">
            稼働率が上がり、オーナー様の手取りが自然に増えていくための、7つの仕組みがあります。
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-4 sm:gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.no}
                className="rounded-2xl bg-gradient-to-br from-white to-teal-50 border border-teal-100 shadow-lg p-6 sm:p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="shrink-0 w-11 h-11 rounded-xl bg-teal-600 text-white font-extrabold flex items-center justify-center shadow-md shadow-teal-600/30">
                    {f.no}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">{f.title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{f.body}</p>
                {f.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {f.metrics.map((m) => (
                      <span
                        key={m.label}
                        className="inline-flex items-center gap-1 rounded-full bg-white border border-teal-200 px-3 py-1 text-xs"
                      >
                        <span className="font-bold text-teal-700">{m.value}</span>
                        <span className="text-slate-500">{m.label}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* price reiteration */}
          <div className="mt-10 rounded-2xl bg-slate-900 text-white p-8 sm:p-10 text-center">
            <p className="text-sm text-teal-300 font-semibold mb-3">この7つ、すべてを</p>
            <p className="text-3xl sm:text-5xl font-extrabold leading-tight">
              手数料 <span className="text-teal-300">8%</span>
            </p>
            <p className="mt-3 text-slate-300 text-sm sm:text-base">
              ＋ 物件あたり月額 ¥5,000　｜　その他の費用は一切ありません
            </p>
          </div>

          {/* dashboard sample */}
          <div className="mt-10 rounded-2xl bg-white border border-slate-200 shadow-xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs font-mono text-slate-500">ダッシュボード サンプル</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-xs font-bold">
                LIVE
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-xl bg-teal-50 border border-teal-100 p-4">
                <p className="text-xs text-teal-700 font-semibold mb-1">今月売上</p>
                <p className="text-2xl font-extrabold text-slate-900">¥1.08M</p>
                <p className="text-xs text-emerald-600 font-semibold mt-1">+24% YoY</p>
              </div>
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
                <p className="text-xs text-emerald-700 font-semibold mb-1">稼働率</p>
                <p className="text-2xl font-extrabold text-slate-900">74%</p>
                <p className="text-xs text-emerald-600 font-semibold mt-1">+8pt</p>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs text-slate-500 font-semibold mb-1">新規予約</p>
                <p className="text-2xl font-extrabold text-slate-900">9件</p>
                <p className="text-xs text-slate-400 mt-1">今週</p>
              </div>
            </div>
            <div className="mt-5 divide-y divide-slate-100 border-t border-slate-100">
              {[
                { name: '北海道 一棟', rating: '4.83', occ: '74%' },
                { name: '名古屋 マンション', rating: '4.71', occ: '62%' },
                { name: '京都 町家', rating: '4.97', occ: '81%' },
              ].map((row) => (
                <div key={row.name} className="flex items-center justify-between py-3 text-sm">
                  <span className="font-semibold text-slate-800">{row.name}</span>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-amber-600 font-bold">★ {row.rating}</span>
                    <span className="text-teal-700 font-bold tabular-nums">{row.occ}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-4 text-base shadow-xl shadow-teal-600/30 transition"
            >
              無料で診断レポートをもらう
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── Comparison table ────────────────────────────── */}
      <section className="bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight text-center">
            他社と SEKAI STAY の<span className="text-teal-600">違い</span>
          </h2>
          <p className="mt-4 text-center text-slate-600 max-w-2xl mx-auto">
            同じ「民泊運用代行」でも、中身はこれだけ違います。
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="grid grid-cols-[1fr_1fr_1fr] bg-slate-900 text-white text-xs sm:text-sm font-bold">
              <div className="p-3 sm:p-4">項目</div>
              <div className="p-3 sm:p-4 bg-slate-700 text-center">一般的な他社</div>
              <div className="p-3 sm:p-4 bg-teal-600 text-center">SEKAI STAY</div>
            </div>
            <div className="divide-y divide-slate-100">
              {COMPARISON.map((row) => (
                <div key={row.item} className="grid grid-cols-[1fr_1fr_1fr] text-xs sm:text-sm">
                  <div className="p-3 sm:p-4 font-semibold text-slate-800 bg-slate-50">{row.item}</div>
                  <div className="p-3 sm:p-4 text-slate-600 border-l border-slate-100 flex items-start gap-2">
                    <Cross className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{row.other}</span>
                  </div>
                  <div className="p-3 sm:p-4 text-slate-900 border-l border-slate-100 flex items-start gap-2 bg-teal-50">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-semibold">{row.us}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-teal-600 text-white p-5 sm:p-6 text-center font-bold">
            10項目すべてで SEKAI STAY が優位
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">
            ※他社の相場は2026年4月時点で当社調べ。契約内容により異なります。
          </p>

          {/* 松本さんの差額 */}
          <div className="mt-10 rounded-2xl bg-white border border-slate-200 shadow-lg p-6 sm:p-8">
            <p className="text-xs text-slate-500 font-semibold">松本さんケース（年間売上 ¥720万円 / 1部屋想定）</p>
            <div className="mt-4 grid sm:grid-cols-3 gap-4 items-center">
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 text-center">
                <p className="text-xs text-rose-700 font-bold mb-1">他社 20%</p>
                <p className="text-xl sm:text-2xl font-extrabold text-rose-600 tabular-nums">¥1,440,000</p>
                <p className="text-[11px] text-slate-500 mt-1">年間手数料</p>
              </div>
              <div className="text-center text-3xl text-slate-400">→</div>
              <div className="rounded-xl bg-teal-50 border border-teal-200 p-4 text-center">
                <p className="text-xs text-teal-700 font-bold mb-1">SEKAI STAY 8%</p>
                <p className="text-xl sm:text-2xl font-extrabold text-teal-700 tabular-nums">¥636,000</p>
                <p className="text-[11px] text-slate-500 mt-1">年間手数料</p>
              </div>
            </div>
            <div className="mt-5 text-center rounded-xl bg-slate-900 text-white py-4 px-4">
              <p className="text-xs text-teal-300 font-semibold">年間削減額</p>
              <p className="mt-1 text-3xl sm:text-4xl font-extrabold text-teal-300 tabular-nums">¥804,000 / 年</p>
            </div>
            <p className="mt-3 text-center text-[11px] text-slate-500">※1部屋想定・月額固定費 ¥5,000/部屋 込みで試算</p>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-4 text-base shadow-xl shadow-teal-600/30 transition"
            >
              無料で診断レポートをもらう
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── Track record ──────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight text-center">
            数字が、<span className="text-teal-600">実力を証明する。</span>
          </h2>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: '5年+', l: 'スタッフ平均運営歴' },
              { v: '4.8', l: 'ゲスト満足度' },
              { v: '+30%', l: '稼働率の平均改善幅' },
              { v: '97%', l: 'オーナー継続率' },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-teal-50 border border-teal-100 p-5 text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-teal-700">{s.v}</p>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">{s.l}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {/* Lake House Nojiriko */}
            <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xl">
              <div className="aspect-[16/9] bg-slate-200 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1000&q=80"
                  alt="Lake House Nojiriko"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 text-amber-600 font-bold px-3 py-1 text-xs shadow">
                  ★ 4.86
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-extrabold text-slate-900">Lake House Nojiriko</h3>
                <p className="text-xs text-slate-500 mt-1">高級ヴィラ / 220㎡ / 1日1組限定</p>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-slate-500 text-sm">導入前 32%</span>
                  <span className="text-slate-400">→</span>
                  <span className="text-2xl font-extrabold text-teal-700">67%</span>
                  <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-xs font-bold">+35pt</span>
                </div>
              </div>
            </div>

            {/* The Lake Side INN */}
            <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xl">
              <div className="aspect-[16/9] bg-slate-200 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1501117716987-c8e1ecb2100b?w=1000&q=80"
                  alt="The Lake Side INN"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 text-amber-600 font-bold px-3 py-1 text-xs shadow">
                  ★ 4.97
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-extrabold text-slate-900">The Lake Side INN</h3>
                <p className="text-xs text-slate-500 mt-1">全4棟 / ペットOK</p>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-slate-500 text-sm">レビュー 19件</span>
                  <span className="text-slate-400">→</span>
                  <span className="text-2xl font-extrabold text-teal-700">61件</span>
                  <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-xs font-bold">3倍↑</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Owner voices ──────────────────────────────── */}
      <section className="bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight text-center">
            切り替えた人の、<span className="text-teal-600">リアルな結果。</span>
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {OWNER_VOICES.map((v) => (
              <div key={v.name} className="rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col">
                <div className="flex items-center gap-3 px-5 pt-5">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={v.img} alt={v.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{v.name}（{v.age}）</p>
                    <p className="text-[11px] text-slate-500">
                      {v.property}・{v.location}・{v.years}
                    </p>
                  </div>
                </div>
                <div className="mx-5 mt-5 rounded-xl bg-teal-600 text-white p-4 text-center">
                  <p className="text-[11px] text-teal-100 font-semibold">{v.resultLabel}</p>
                  <p className="text-2xl font-extrabold mt-1">{v.result}</p>
                </div>
                <p className="px-5 py-5 text-sm text-slate-600 leading-relaxed flex-1">「{v.quote}」</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing plan ──────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center">
            <span className="inline-block rounded-full bg-amber-100 text-amber-800 px-4 py-1 text-xs font-bold mb-4">
              業界でもっともシンプルな料金体系
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              料金は、<span className="text-teal-600">たったひとつ。</span>
            </h2>
            <p className="mt-4 text-slate-600">
              成果報酬 ＋ 物件固定費のみ。これ以外に、いただくお金はありません。
            </p>
          </div>

          <div className="mt-10 rounded-3xl bg-gradient-to-br from-teal-600 to-teal-700 text-white p-8 sm:p-12 text-center shadow-2xl shadow-teal-600/30">
            <p className="text-sm text-teal-100 font-semibold mb-3">SEKAI STAY 料金</p>
            <p className="text-4xl sm:text-6xl font-extrabold leading-tight">
              売上の <span className="text-amber-300">8%</span>
            </p>
            <p className="text-base sm:text-xl font-bold mt-2 text-teal-50">
              ＋ ¥5,000 / 部屋 / 月
            </p>

            <div className="mt-8 rounded-2xl bg-white/10 backdrop-blur px-5 py-5 inline-block">
              <p className="text-xs text-teal-100">例: 月100万円 売上</p>
              <p className="mt-1 text-sm text-teal-50">手数料 ¥80,000 ＋ 部屋固定 ¥5,000</p>
              <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-amber-300">= ¥85,000 / 月</p>
            </div>
          </div>

          {/* zero-fee list */}
          <div className="mt-10 rounded-2xl bg-slate-50 p-6 sm:p-8">
            <p className="text-center font-bold text-slate-900 text-lg mb-5">隠れ費用ゼロ</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                '初期費用',
                '契約手数料',
                '解約金',
                '清掃費の別請求',
                '広告費の別請求',
                'レポート作成費',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl bg-white border border-slate-200 px-3 py-3 flex items-center gap-2 text-sm"
                >
                  <span className="inline-flex items-center justify-center rounded-lg bg-emerald-500 text-white w-8 h-8 text-xs font-extrabold shrink-0">¥0</span>
                  <span className="font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-[11px] text-slate-500 leading-relaxed">
              ※ 清掃費はゲスト宿泊料金内でカバー。広告費・レポート費は8%内に含まれます。
            </p>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-4 text-base shadow-xl shadow-teal-600/30 transition"
            >
              無料で診断レポートをもらう
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── Flow ────────────────────────────────────── */}
      <section className="bg-teal-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight text-center">
            最短 <span className="text-teal-600">2週間</span> で切り替え完了。
          </h2>
          <p className="mt-4 text-center text-slate-600 max-w-2xl mx-auto">
            他社からの引き継ぎもお任せ。既存の予約・ゲスト対応も途切れなく移行します。
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {[
              { n: 'STEP 1', t: '30秒', b: '無料診断を申し込む' },
              { n: 'STEP 2', t: '3〜5日', b: '物件確認・収益シミュレーション' },
              { n: 'STEP 3', t: '1〜2週間', b: '契約・運営開始' },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl bg-white shadow-lg p-6 text-center">
                <p className="text-xs text-teal-600 font-mono font-bold">{s.n}</p>
                <p className="mt-1 text-2xl font-extrabold text-slate-900">{s.t}</p>
                <p className="mt-3 text-sm text-slate-600">{s.b}</p>
              </div>
            ))}
          </div>

          {/* 2-week breakdown */}
          <div className="mt-10 rounded-2xl bg-white shadow-lg p-6 sm:p-8">
            <p className="text-sm font-bold text-slate-900 mb-5">2週間の内訳</p>
            <div className="space-y-3">
              {[
                { d: '0〜2日', b: '契約書締結・OTAアカウント連携' },
                { d: '3〜7日', b: 'OTA掲載の写真・文章・価格を最適化' },
                { d: '8〜10日', b: '清掃パートナー手配・運営体制構築' },
                { d: '11〜14日', b: '並行運用で予約を途切れなく引き継ぎ' },
              ].map((r) => (
                <div key={r.d} className="grid grid-cols-[90px_1fr] gap-3 items-center">
                  <div className="text-xs font-bold text-teal-700 bg-teal-50 rounded-lg px-2 py-2 text-center">{r.d}</div>
                  <div className="text-sm text-slate-700">{r.b}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight text-center">
            ▼ よくあるご質問 ▼
          </h2>
          <p className="mt-3 text-center text-slate-600 text-sm">乗り換えで気になるポイント</p>

          <div className="mt-10 space-y-3">
            {FAQS.map((f, i) => {
              const open = openFaq === i
              return (
                <div key={i} className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left hover:bg-slate-50 transition"
                    aria-expanded={open}
                  >
                    <span className="flex items-start gap-3 min-w-0">
                      <span className="shrink-0 inline-flex items-center justify-center rounded-full bg-teal-100 text-teal-700 font-extrabold w-7 h-7 text-xs">
                        Q
                      </span>
                      <span className="font-semibold text-slate-900 text-sm sm:text-base leading-snug">{f.q}</span>
                    </span>
                    <span className="text-slate-400 shrink-0">
                      <Chevron open={open} />
                    </span>
                  </button>
                  {open && (
                    <div className="px-5 sm:px-6 pb-5 text-sm text-slate-700 leading-relaxed bg-slate-50/50">
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-700 font-extrabold w-7 h-7 text-xs">
                          A
                        </span>
                        <p>{f.a}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <p className="mt-8 text-center text-xs text-slate-500">
            ※その他のご質問は、無料診断フォームの備考欄からお気軽にお問い合わせください。
          </p>
        </div>
      </section>

      {/* ─── Contact form ─────────────────────────────── */}
      <section id="free-diagnostic" className="bg-gradient-to-b from-slate-900 to-slate-800 text-white scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center">
            <span className="inline-block rounded-full bg-teal-500/20 text-teal-300 px-4 py-1 text-xs font-bold mb-4 border border-teal-400/40">
              FREE · 無料
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              無料パーソナライズ<span className="text-teal-300">診断</span>
            </h2>
            <p className="mt-3 text-slate-300">3分で入力、次営業日にあなた専用レポートを送付</p>
            <p className="mt-2 text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
              民泊に強い専門の担当者が、診断レポートを作成します。無理な勧誘は致しません。
            </p>
          </div>

          {page !== 'done' && (
            <div className="mt-8 grid grid-cols-3 gap-2">
              {[
                { n: 1, l: '物件情報' },
                { n: 2, l: '売上情報' },
                { n: 3, l: '連絡先' },
              ].map((s) => {
                const active = s.n === page
                const done = s.n < page
                return (
                  <div
                    key={s.n}
                    className={`rounded-xl p-3 text-center text-xs font-semibold border transition ${
                      active
                        ? 'bg-teal-500 text-white border-teal-400'
                        : done
                        ? 'bg-teal-500/20 text-teal-200 border-teal-400/40'
                        : 'bg-white/5 text-slate-400 border-white/10'
                    }`}
                  >
                    <p className="font-mono text-[10px] opacity-80">STEP {s.n}</p>
                    <p className="mt-1">{s.l}</p>
                  </div>
                )
              })}
            </div>
          )}

          <div className="mt-6 rounded-2xl bg-white text-slate-900 shadow-2xl p-6 sm:p-8">
            {/* PAGE 1 */}
            {page === 1 && (
              <div className="space-y-5">
                <p className="text-xs font-mono text-teal-600 font-bold">STEP 1 / 3 · 物件情報</p>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    物件名 <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    placeholder="例: 青山テラス"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Airbnb URL（任意）</label>
                    <input
                      type="url"
                      value={airbnbUrl}
                      onChange={(e) => setAirbnbUrl(e.target.value)}
                      placeholder="https://airbnb.com/..."
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Booking.com URL（任意）</label>
                    <input
                      type="url"
                      value={bookingUrl}
                      onChange={(e) => setBookingUrl(e.target.value)}
                      placeholder="https://booking.com/..."
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      物件タイプ <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none bg-white"
                    >
                      <option value="">選択してください</option>
                      <option>戸建て</option>
                      <option>マンション</option>
                      <option>アパート一棟</option>
                      <option>別荘・ヴィラ</option>
                      <option>その他</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      エリア <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none bg-white"
                    >
                      <option value="">選択してください</option>
                      <option>東京都</option>
                      <option>大阪府</option>
                      <option>京都府</option>
                      <option>福岡県</option>
                      <option>北海道</option>
                      <option>沖縄県</option>
                      <option>その他</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <label className="block text-sm font-semibold text-slate-700">部屋数</label>
                    <span className="font-extrabold text-teal-600 text-lg tabular-nums">{rooms} 部屋</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="w-full accent-teal-600 h-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>1</span>
                    <span>10+</span>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => setPage(2)}
                    disabled={!page1Valid}
                    className="w-full rounded-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold px-6 py-4 text-base transition"
                  >
                    次へ（売上情報）→
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 2 */}
            {page === 2 && (
              <div className="space-y-6">
                <p className="text-xs font-mono text-teal-600 font-bold">STEP 2 / 3 · 売上情報</p>

                <div>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <label className="block text-sm font-semibold text-slate-700">ピーク月売上</label>
                    <span className="font-extrabold text-teal-600 text-lg tabular-nums">¥{fmt(peakRev)}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={5000000}
                    step={10000}
                    value={peakRev}
                    onChange={(e) => setPeakRev(Number(e.target.value))}
                    className="w-full accent-teal-600 h-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>¥0</span>
                    <span>¥500万</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <label className="block text-sm font-semibold text-slate-700">オフピーク月売上</label>
                    <span className="font-extrabold text-teal-600 text-lg tabular-nums">¥{fmt(offpeakRev)}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={5000000}
                    step={10000}
                    value={offpeakRev}
                    onChange={(e) => setOffpeakRev(Number(e.target.value))}
                    className="w-full accent-teal-600 h-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>¥0</span>
                    <span>¥500万</span>
                  </div>
                </div>

                <div className="rounded-xl bg-teal-50 border border-teal-200 p-4 text-center">
                  <p className="text-xs text-teal-700 font-bold">年間売上推定</p>
                  <p className="mt-1 text-2xl font-extrabold text-teal-700 tabular-nums">¥{fmt(yearlyEstimate)}</p>
                  <p className="mt-1 text-[11px] text-slate-500">ピーク×4 + オフピーク×8 で試算</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    現在の運営代行手数料 <span className="text-rose-600">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['8%以下', '10%', '15%', '20%', '25%以上', 'わからない'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setCurrentFee(opt)}
                        className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                          currentFee === opt
                            ? 'bg-teal-600 text-white border-teal-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-teal-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    運用年数 <span className="text-rose-600">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['新規', '1年以下', '1〜3年', '3〜5年', '5年以上'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setOpYears(opt)}
                        className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                          opYears === opt
                            ? 'bg-teal-600 text-white border-teal-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-teal-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    onClick={() => setPage(1)}
                    className="flex-1 rounded-full bg-white border border-slate-300 text-slate-700 font-bold px-6 py-4 hover:bg-slate-50 transition"
                  >
                    ← 戻る
                  </button>
                  <button
                    onClick={() => setPage(3)}
                    disabled={!page2Valid}
                    className="flex-[2] rounded-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold px-6 py-4 transition"
                  >
                    次へ（連絡先）→
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 3 */}
            {page === 3 && (
              <div className="space-y-5">
                <p className="text-xs font-mono text-teal-600 font-bold">STEP 3 / 3 · 連絡先</p>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    お名前 <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="山田 太郎"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    メールアドレス <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">電話番号（任意）</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="090-0000-0000"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">温度感</label>
                  <div className="grid gap-2">
                    {['すぐにでも切り替えたい', '1〜3ヶ月以内', 'まずは情報収集'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setUrgency(opt)}
                        className={`rounded-xl border px-4 py-3 text-sm font-semibold text-left transition ${
                          urgency === opt
                            ? 'bg-teal-600 text-white border-teal-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-teal-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    現状の課題・ご相談（任意）
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                    placeholder="例: 今の代行が遅くて困っている。稼働率が低い。"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none resize-none"
                  />
                </div>

                {submitError && (
                  <div className="rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm p-3">
                    {submitError}
                  </div>
                )}

                <div className="pt-3 flex gap-3">
                  <button
                    onClick={() => setPage(2)}
                    disabled={submitting}
                    className="flex-1 rounded-full bg-white border border-slate-300 text-slate-700 font-bold px-6 py-4 hover:bg-slate-50 transition"
                  >
                    ← 戻る
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!page3Valid || submitting}
                    className="flex-[2] rounded-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold px-6 py-4 transition shadow-lg shadow-teal-600/30"
                  >
                    {submitting ? '送信中...' : '無料で診断レポートをもらう'}
                  </button>
                </div>
              </div>
            )}

            {/* DONE */}
            {page === 'done' && (
              <div className="text-center py-6">
                <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mb-5">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  ありがとうございます！
                </h3>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  <span className="font-bold">{name} 様</span>のご申込みを確かに承りました。<br />
                  次営業日中に、担当者より <span className="font-bold">{email}</span> 宛てに
                  <br />
                  パーソナライズ診断レポートをお送りします。
                </p>
                <p className="mt-4 text-xs text-slate-500">※ 無理な勧誘は致しません。安心してお待ちください。</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Footer / Company ─────────────────────────── */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-xl font-extrabold text-white mb-8">Company / 会社概要</h2>

          <div className="grid md:grid-cols-2 gap-8 text-sm">
            <dl className="space-y-3">
              <div className="grid grid-cols-[110px_1fr] gap-3">
                <dt className="text-slate-500">会社名</dt>
                <dd className="text-slate-100">株式会社セカイチ（SEKAICHI Inc.）</dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-3">
                <dt className="text-slate-500">代表者</dt>
                <dd className="text-slate-100">
                  劉 添毅（リュウ テンイチ）
                  <br />
                  明神 洸次郎（ミョウジン コウジロウ）
                </dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-3">
                <dt className="text-slate-500">所在地</dt>
                <dd className="text-slate-100">〒150-0021 東京都渋谷区恵比寿西2丁目14-7</dd>
              </div>
            </dl>
            <dl className="space-y-3">
              <div className="grid grid-cols-[110px_1fr] gap-3">
                <dt className="text-slate-500">資本金</dt>
                <dd className="text-slate-100">3,200万円（資本準備金含む）</dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-3">
                <dt className="text-slate-500">法人番号</dt>
                <dd className="text-slate-100">4011001162956</dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-3">
                <dt className="text-slate-500">登録番号</dt>
                <dd className="text-slate-100">住宅宿泊管理業 第F05780号</dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs">
            <a href="/privacy" className="text-slate-400 hover:text-white transition">プライバシーポリシー</a>
            <a href="/company" className="text-slate-400 hover:text-white transition">特定商取引法に基づく表記</a>
            <a href="/company" className="text-slate-400 hover:text-white transition">会社概要</a>
            <button
              onClick={scrollToForm}
              className="text-teal-300 hover:text-teal-200 font-semibold transition"
            >
              無料で診断 →
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-500">
            © 2026 SEKAI STAY. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
