'use client'

import { useState, FormEvent, useMemo } from 'react'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import {
  IconArrowRight,
  IconArrowLeft,
  IconCheck,
  IconShield,
  IconLock,
  IconSparkles,
  IconMail,
} from '@/components/Icons'

const WEB3FORMS_KEY = '85597b1f-b146-40b9-94af-7a8dc25dfe1b'

/* ── Revenue option mapping ── */
const REVENUE_OPTIONS = [
  { label: '選択してください', value: '' },
  { label: '〜10万円', value: '100000' },
  { label: '10〜20万円', value: '150000' },
  { label: '20〜30万円', value: '250000' },
  { label: '30〜50万円', value: '400000' },
  { label: '50〜80万円', value: '650000' },
  { label: '80〜120万円', value: '1000000' },
  { label: '120〜200万円', value: '1600000' },
  { label: '200万円以上', value: '2500000' },
]

const FEE_RATE_OPTIONS = [
  { label: '選択してください', value: '' },
  { label: '10%', value: '0.10' },
  { label: '15%', value: '0.15' },
  { label: '20%', value: '0.20' },
  { label: '25%', value: '0.25' },
  { label: '30%', value: '0.30' },
]

const EXPERIENCE_OPTIONS = [
  { label: '選択してください', value: '' },
  { label: '1年未満', value: '1年未満' },
  { label: '1〜2年', value: '1〜2年' },
  { label: '3〜5年', value: '3〜5年' },
  { label: '5年以上', value: '5年以上' },
]

const SEKAI_STAY_RATE = 0.08

type Step = 1 | 2 | 3
type FeeMode = 'rate' | 'amount'

export default function DiagnosticPage() {
  const [step, setStep] = useState<Step>(1)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  // Step 1
  const [airbnbUrl, setAirbnbUrl] = useState('')
  const [bookingUrl, setBookingUrl] = useState('')
  const [noUrl, setNoUrl] = useState(false)

  // Step 2
  const [peakRevenue, setPeakRevenue] = useState('')
  const [offpeakRevenue, setOffpeakRevenue] = useState('')
  const [feeMode, setFeeMode] = useState<FeeMode>('rate')
  const [feeRate, setFeeRate] = useState('')
  const [feeAmount, setFeeAmount] = useState('')
  const [experience, setExperience] = useState('')
  const [complaints, setComplaints] = useState('')
  const [showOptional, setShowOptional] = useState(false)

  // Step 3
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  /* ── Fee calculation ── */
  const avgRevenue = useMemo(() => {
    const peak = Number(peakRevenue) || 0
    const offpeak = Number(offpeakRevenue) || 0
    if (peak === 0 && offpeak === 0) return 0
    if (peak === 0) return offpeak
    if (offpeak === 0) return peak
    return (peak + offpeak) / 2
  }, [peakRevenue, offpeakRevenue])

  const currentFeeRate = useMemo(() => {
    if (feeMode === 'rate') return Number(feeRate) || 0
    // Amount mode: derive rate from avg revenue
    const amt = Number(feeAmount) || 0
    if (avgRevenue === 0 || amt === 0) return 0
    return amt / avgRevenue
  }, [feeMode, feeRate, feeAmount, avgRevenue])

  const annualCurrentCost = useMemo(() => {
    return Math.round(avgRevenue * currentFeeRate * 12)
  }, [avgRevenue, currentFeeRate])

  const annualSekaiCost = useMemo(() => {
    return Math.round(avgRevenue * SEKAI_STAY_RATE * 12)
  }, [avgRevenue])

  const annualSavings = annualCurrentCost - annualSekaiCost

  const canProceedStep2 = peakRevenue !== '' && offpeakRevenue !== '' && (feeMode === 'rate' ? feeRate !== '' : feeAmount !== '')

  /* ── Navigation ── */
  const goNext = () => setStep((s) => Math.min(s + 1, 3) as Step)
  const goBack = () => setStep((s) => Math.max(s - 1, 1) as Step)

  /* ── Submit ── */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    const feeDisplay = feeMode === 'rate'
      ? `${(Number(feeRate) * 100).toFixed(0)}%`
      : `¥${Number(feeAmount).toLocaleString()}/月`

    const peakLabel = REVENUE_OPTIONS.find(o => o.value === peakRevenue)?.label || peakRevenue
    const offpeakLabel = REVENUE_OPTIONS.find(o => o.value === offpeakRevenue)?.label || offpeakRevenue

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `【無料診断】${name}様 - 収益改善レポート依頼`,
      from_name: 'SEKAI STAY',
      replyto: 'contact@sekaistay.com',
      name,
      email,
      airbnb_url: noUrl ? '（URLなし）' : (airbnbUrl || '未入力'),
      booking_url: noUrl ? '（URLなし）' : (bookingUrl || '未入力'),
      peak_revenue: peakLabel,
      offpeak_revenue: offpeakLabel,
      current_fee: feeDisplay,
      estimated_annual_savings: `¥${annualSavings.toLocaleString()}`,
      experience: experience || '未回答',
      complaints: complaints || '未回答',
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setDone(true)
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'generate_lead', {
            event_category: 'diagnostic',
            event_label: 'revenue_report_request',
          })
        }
      }
    } catch { /* ignore */ }
    setSubmitting(false)
  }

  const totalSteps = 3

  if (done) {
    return (
      <>
        <Header />
        <Breadcrumb items={[{ label: '無料収益診断' }]} />
        <main className="min-h-screen bg-cloud-white">
          <section className="px-5 md:px-6 py-20 md:py-28">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-deep-teal to-sekai-teal flex items-center justify-center mx-auto mb-6 shadow-[0_12px_32px_rgba(22,123,129,0.30)]">
                <IconCheck size={32} className="text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-charcoal mb-4">
                レポート作成を受け付けました
              </h1>
              <p className="text-sm md:text-base text-dark-gray leading-relaxed mb-3">
                翌営業日までに、専任アナリストが作成した詳細レポートのリンクを<br className="hidden md:inline" />
                <strong className="text-charcoal">{email}</strong> 宛にメールでお届けします。
              </p>
              <p className="text-xs text-mid-gray mb-10">
                届かない場合は迷惑メールフォルダをご確認ください。
              </p>

              <div className="bg-teal-tint rounded-2xl border border-deep-teal/15 p-8 mb-8">
                <p className="text-sm font-bold text-charcoal mb-2">レポートに含まれる内容</p>
                <div className="text-sm text-dark-gray leading-relaxed space-y-1.5 text-left max-w-xs mx-auto">
                  <p>・ 物件の収益シミュレーション</p>
                  <p>・ リスティング改善ポイント</p>
                  <p>・ SEKAI STAY切り替え時の年間差額</p>
                  <p>・ エリア別の市場データ</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-deep-teal hover:bg-sekai-teal text-white font-bold py-4 px-8 rounded-xl transition text-sm shadow-lg"
                >
                  トップページへ
                  <IconArrowRight size={16} />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-deep-teal text-deep-teal hover:bg-teal-tint/40 font-bold py-4 px-8 rounded-xl transition text-sm"
                >
                  お問い合わせ
                </a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: '無料収益診断' }]} />
      <FloatingCTA />
      <main className="min-h-screen bg-cloud-white">
        {/* ─────── Hero ─────── */}
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
                Free Revenue Report
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-5">
              あなたの物件の<br className="sm:hidden" />
              <span className="text-bright-teal">収益改善レポート</span>を作成
            </h1>
            <p className="text-sm md:text-base text-white/75 leading-relaxed max-w-xl mx-auto">
              4つの項目を入力するだけで、専任アナリストが物件の<br className="hidden md:inline" />
              収益シミュレーションと改善提案をお届けします。
            </p>

            <div className="mt-8 flex items-center justify-center flex-wrap gap-x-6 gap-y-2 text-[11px] md:text-xs text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <IconLock size={12} className="text-bright-teal" />
                暗号化通信で安全
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconShield size={12} className="text-bright-teal" />
                所要時間 約2分
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconCheck size={12} className="text-bright-teal" />
                完全無料
              </span>
            </div>
          </div>
        </section>

        {/* ─────── Progress ─────── */}
        <div className="max-w-2xl mx-auto px-5 md:px-6 pt-10 md:pt-12">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono tracking-wider text-deep-teal font-bold">
              STEP {String(step).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
            </span>
            <span className="text-[11px] text-mid-gray">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-pale-gray rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(step / totalSteps) * 100}%`,
                background: 'linear-gradient(90deg, #167B81 0%, #259DA3 50%, #54BEC3 100%)',
              }}
            />
          </div>
        </div>

        {/* ─────── Form Area ─────── */}
        <div className="max-w-2xl mx-auto px-5 md:px-6 py-10 md:py-14">

          {/* ══════ STEP 1: Listing URLs ══════ */}
          {step === 1 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-2">
                物件のリスティングURL
              </h2>
              <p className="text-sm text-dark-gray mb-8">
                AirbnbやBooking.comのリスティングURLがあれば、より精度の高い分析が可能です。
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">
                    Airbnb リスティングURL
                  </label>
                  <input
                    type="url"
                    value={airbnbUrl}
                    onChange={(e) => setAirbnbUrl(e.target.value)}
                    disabled={noUrl}
                    placeholder="https://www.airbnb.com/rooms/..."
                    className="w-full border border-light-gray rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal/30 focus:border-deep-teal transition disabled:opacity-40 disabled:bg-pale-gray"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">
                    Booking.com リスティングURL
                  </label>
                  <input
                    type="url"
                    value={bookingUrl}
                    onChange={(e) => setBookingUrl(e.target.value)}
                    disabled={noUrl}
                    placeholder="https://www.booking.com/hotel/..."
                    className="w-full border border-light-gray rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal/30 focus:border-deep-teal transition disabled:opacity-40 disabled:bg-pale-gray"
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer py-2">
                  <input
                    type="checkbox"
                    checked={noUrl}
                    onChange={(e) => {
                      setNoUrl(e.target.checked)
                      if (e.target.checked) {
                        setAirbnbUrl('')
                        setBookingUrl('')
                      }
                    }}
                    className="w-5 h-5 rounded border-light-gray text-deep-teal focus:ring-deep-teal/30"
                  />
                  <span className="text-sm text-dark-gray">URLが分からない / まだ掲載していない</span>
                </label>

                {noUrl && (
                  <div className="bg-teal-tint rounded-xl border border-deep-teal/15 px-5 py-4">
                    <p className="text-xs text-deep-teal leading-relaxed">
                      URLがなくても診断可能です。売上データをもとに簡易的な分析レポートを作成します。
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  onClick={goNext}
                  className="group inline-flex items-center gap-2 bg-deep-teal hover:bg-sekai-teal text-white font-bold py-4 px-10 rounded-xl transition text-sm shadow-lg"
                >
                  次へ
                  <IconArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
                </button>
              </div>
            </div>
          )}

          {/* ══════ STEP 2: Revenue & Fees ══════ */}
          {step === 2 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-2">
                売上と手数料
              </h2>
              <p className="text-sm text-dark-gray mb-8">
                現在の売上規模と手数料から、切り替え時の差額を算出します。
              </p>

              <div className="space-y-6">
                {/* Peak revenue */}
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">
                    ピーク月の月間売上 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={peakRevenue}
                    onChange={(e) => setPeakRevenue(e.target.value)}
                    className="w-full border border-light-gray rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal/30 focus:border-deep-teal transition bg-white appearance-none"
                  >
                    {REVENUE_OPTIONS.map((o) => (
                      <option key={`peak-${o.value}`} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {/* Off-peak revenue */}
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">
                    オフピーク月の月間売上 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={offpeakRevenue}
                    onChange={(e) => setOffpeakRevenue(e.target.value)}
                    className="w-full border border-light-gray rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal/30 focus:border-deep-teal transition bg-white appearance-none"
                  >
                    {REVENUE_OPTIONS.map((o) => (
                      <option key={`offpeak-${o.value}`} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {/* Fee mode toggle + input */}
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">
                    現在の代行手数料 <span className="text-red-500">*</span>
                  </label>

                  {/* Toggle */}
                  <div className="inline-flex bg-pale-gray rounded-lg p-1 mb-3">
                    <button
                      type="button"
                      onClick={() => { setFeeMode('rate'); setFeeAmount('') }}
                      className={`px-4 py-2 rounded-md text-xs font-bold transition ${
                        feeMode === 'rate'
                          ? 'bg-white text-deep-teal shadow-sm'
                          : 'text-dark-gray hover:text-charcoal'
                      }`}
                    >
                      料率で入力
                    </button>
                    <button
                      type="button"
                      onClick={() => { setFeeMode('amount'); setFeeRate('') }}
                      className={`px-4 py-2 rounded-md text-xs font-bold transition ${
                        feeMode === 'amount'
                          ? 'bg-white text-deep-teal shadow-sm'
                          : 'text-dark-gray hover:text-charcoal'
                      }`}
                    >
                      月額で入力
                    </button>
                  </div>

                  {feeMode === 'rate' ? (
                    <select
                      value={feeRate}
                      onChange={(e) => setFeeRate(e.target.value)}
                      className="w-full border border-light-gray rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal/30 focus:border-deep-teal transition bg-white appearance-none"
                    >
                      {FEE_RATE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-mid-gray">¥</span>
                      <input
                        type="number"
                        value={feeAmount}
                        onChange={(e) => setFeeAmount(e.target.value)}
                        placeholder="月額手数料を入力"
                        className="w-full border border-light-gray rounded-xl pl-10 pr-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal/30 focus:border-deep-teal transition"
                      />
                      {feeAmount && avgRevenue > 0 && (
                        <p className="text-xs text-mid-gray mt-1.5">
                          → 平均売上に対して約 {(currentFeeRate * 100).toFixed(1)}% に相当
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* ── Live savings preview ── */}
                {canProceedStep2 && annualSavings > 0 && (
                  <div className="relative bg-charcoal rounded-2xl overflow-hidden p-6 md:p-8">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-30"
                      style={{ background: 'radial-gradient(circle at 20% 50%, rgba(37,157,163,0.35) 0%, transparent 60%)' }}
                    />
                    <div className="relative">
                      <p className="text-[10px] md:text-[11px] font-mono tracking-widest text-bright-teal uppercase mb-1">
                        Annual Cost Comparison
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-4 mb-5">
                        <div>
                          <p className="text-[10px] text-white/50 mb-1">現在の年間代行手数料</p>
                          <p className="text-lg md:text-xl font-bold text-white/80">
                            ¥{annualCurrentCost.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-white/50 mb-1">SEKAI STAY（8%）の場合</p>
                          <p className="text-lg md:text-xl font-bold text-bright-teal">
                            ¥{annualSekaiCost.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="border-t border-white/10 pt-4 text-center">
                        <p className="text-[10px] text-white/50 mb-1">年間削減額</p>
                        <p className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                          <span className="text-bright-teal">−</span>¥{annualSavings.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Optional section */}
                <div className="border-t border-light-gray pt-6">
                  <button
                    type="button"
                    onClick={() => setShowOptional(!showOptional)}
                    className="text-sm text-deep-teal font-bold hover:text-sekai-teal transition flex items-center gap-1.5"
                  >
                    <span className={`inline-block transition-transform ${showOptional ? 'rotate-90' : ''}`}>
                      <IconArrowRight size={12} />
                    </span>
                    より正確なレポートが欲しい方（任意）
                  </button>

                  {showOptional && (
                    <div className="mt-5 space-y-5">
                      <div>
                        <label className="block text-sm font-bold text-charcoal mb-2">運用年数</label>
                        <select
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          className="w-full border border-light-gray rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal/30 focus:border-deep-teal transition bg-white appearance-none"
                        >
                          {EXPERIENCE_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-charcoal mb-2">今の代行業者への不満</label>
                        <textarea
                          value={complaints}
                          onChange={(e) => setComplaints(e.target.value)}
                          rows={4}
                          placeholder="（例）手数料が高い、レスポンスが遅い、稼働率が低い..."
                          className="w-full border border-light-gray rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal/30 focus:border-deep-teal transition resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-10 flex items-center justify-between">
                <button
                  onClick={goBack}
                  className="inline-flex items-center gap-1.5 text-sm text-dark-gray hover:text-charcoal transition"
                >
                  <IconArrowLeft size={14} />
                  戻る
                </button>
                <button
                  onClick={goNext}
                  disabled={!canProceedStep2}
                  className="group inline-flex items-center gap-2 bg-deep-teal hover:bg-sekai-teal text-white font-bold py-4 px-10 rounded-xl transition text-sm shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  次へ
                  <IconArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
                </button>
              </div>
            </div>
          )}

          {/* ══════ STEP 3: Contact ══════ */}
          {step === 3 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-2">
                レポート送付先
              </h2>

              <div className="bg-teal-tint rounded-xl border border-deep-teal/15 px-5 py-4 mb-8">
                <div className="flex items-start gap-3">
                  <IconMail size={18} className="text-deep-teal flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-deep-teal leading-relaxed">
                    翌営業日に、専任アナリストが作成した詳細レポート（Web版+PDFダウンロード）のリンクをメールでお届けします。
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="山田 太郎"
                    className="w-full border border-light-gray rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal/30 focus:border-deep-teal transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="example@email.com"
                    className="w-full border border-light-gray rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal/30 focus:border-deep-teal transition"
                  />
                </div>

                {/* Summary preview */}
                {annualSavings > 0 && (
                  <div className="bg-pale-gray rounded-xl p-5 border border-light-gray">
                    <p className="text-xs font-bold text-charcoal mb-3">入力内容のサマリー</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-dark-gray">
                      <span>ピーク月売上</span>
                      <span className="font-bold text-charcoal text-right">
                        {REVENUE_OPTIONS.find(o => o.value === peakRevenue)?.label}
                      </span>
                      <span>オフピーク月売上</span>
                      <span className="font-bold text-charcoal text-right">
                        {REVENUE_OPTIONS.find(o => o.value === offpeakRevenue)?.label}
                      </span>
                      <span>現在の手数料</span>
                      <span className="font-bold text-charcoal text-right">
                        {feeMode === 'rate'
                          ? `${(Number(feeRate) * 100).toFixed(0)}%`
                          : `¥${Number(feeAmount).toLocaleString()}/月`}
                      </span>
                      <span className="col-span-2 border-t border-light-gray pt-2 mt-1"></span>
                      <span className="font-bold text-deep-teal">年間削減見込み</span>
                      <span className="font-bold text-deep-teal text-right text-base">
                        ¥{annualSavings.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full inline-flex items-center justify-center gap-2 bg-deep-teal hover:bg-sekai-teal text-white font-bold py-5 rounded-xl transition text-sm md:text-base disabled:opacity-50 shadow-lg"
                >
                  {submitting ? '送信中...' : (
                    <>
                      詳細レポートを作成する
                      <IconArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-mid-gray text-center leading-relaxed">
                  <IconLock size={10} className="inline-block mr-1 -mt-0.5" />
                  入力情報は暗号化され、レポート作成のみに使用されます。
                  <br />
                  送信により<a href="/privacy" className="text-deep-teal hover:underline">プライバシーポリシー</a>に同意したものとみなします。
                </p>
              </form>

              {/* Back button */}
              <div className="mt-8">
                <button
                  onClick={goBack}
                  className="inline-flex items-center gap-1.5 text-sm text-dark-gray hover:text-charcoal transition"
                >
                  <IconArrowLeft size={14} />
                  戻る
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
