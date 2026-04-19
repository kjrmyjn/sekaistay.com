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
  IconLock,
  IconMail,
} from '@/components/Icons'

const WEB3FORMS_KEY = '85597b1f-b146-40b9-94af-7a8dc25dfe1b'

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

const inputCls = 'w-full bg-mist border border-rule px-5 py-4 text-[14px] font-sans focus:outline-none focus:border-sekai-teal transition disabled:opacity-40 disabled:bg-rule'
const selectCls = inputCls + ' appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22 fill=%22none%22%3E%3Cpath d=%22M2 4l4 4 4-4%22 stroke=%22%23167B81%22 stroke-width=%221.5%22/%3E%3C/svg%3E")] bg-[length:12px_12px] bg-[right_1.25rem_center] bg-no-repeat pr-10'

export default function DiagnosticPage() {
  const [step, setStep] = useState<Step>(1)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const [airbnbUrl, setAirbnbUrl] = useState('')
  const [bookingUrl, setBookingUrl] = useState('')
  const [noUrl, setNoUrl] = useState(false)

  const [peakRevenue, setPeakRevenue] = useState('')
  const [offpeakRevenue, setOffpeakRevenue] = useState('')
  const [feeMode, setFeeMode] = useState<FeeMode>('rate')
  const [feeRate, setFeeRate] = useState('')
  const [feeAmount, setFeeAmount] = useState('')
  const [experience, setExperience] = useState('')
  const [complaints, setComplaints] = useState('')
  const [showOptional, setShowOptional] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

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

  const goNext = () => setStep((s) => Math.min(s + 1, 3) as Step)
  const goBack = () => setStep((s) => Math.max(s - 1, 1) as Step)

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
        <main className="min-h-screen bg-ivory">
          <section className="container-narrow px-5 md:px-8 py-24 md:py-32">
            <div className="text-center">
              <div className="w-20 h-20 border-2 border-sekai-teal flex items-center justify-center mx-auto mb-10">
                <IconCheck size={28} color="#167B81" />
              </div>
              <p className="eyebrow-mono text-sekai-teal mb-4">Received</p>
              <h1 className="heading-display text-ink mb-6 !text-[clamp(1.75rem,3.8vw,2.5rem)] jp-keep">
                レポート作成を、
                <br />
                <span className="font-sans font-light text-sekai-teal">
                  承りました。
                </span>
              </h1>
              <p className="text-body text-dark-gray leading-relaxed mb-3 jp-break max-w-lg mx-auto">
                翌営業日までに、専任アナリストが作成した詳細レポートのリンクを
                <br className="hidden md:inline" />
                <span className="font-sans text-ink">{email}</span> 宛にメールでお届けします。
              </p>
              <p className="text-caption text-mid-gray mb-12 font-sans">
                届かない場合は迷惑メールフォルダをご確認ください。
              </p>

              <div className="bg-paper border border-rule p-8 md:p-10 mb-10 text-left max-w-md mx-auto">
                <p className="eyebrow text-sekai-teal mb-5">レポートに含まれる内容</p>
                <ul className="space-y-3">
                  {['物件の収益シミュレーション', 'リスティング改善ポイント', 'SEKAI STAY切り替え時の年間差額', 'エリア別の市場データ'].map((item, i) => (
                    <li key={i} className="flex items-baseline gap-3 text-body-sm text-ink">
                      <span className="font-sans text-[12px] text-sekai-teal tabular-nums flex-shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/" className="btn btn-primary">
                  トップページへ
                  <IconArrowRight size={14} />
                </a>
                <a href="/contact" className="btn btn-ghost">
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
      <main className="min-h-screen bg-ivory">
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
          <div className="relative container-narrow px-5 md:px-8 py-16 md:py-24">
            <div className="flex items-center gap-4 mb-10">
              <span className="chapter text-bright-teal">Chapter Ⅰ</span>
              <span className="w-6 h-px bg-bright-teal" />
              <span className="eyebrow !text-bright-teal">Free Revenue Report</span>
            </div>

            <h1 className="heading-display !font-sans text-ivory jp-keep !text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.15] mb-6">
              あなたの物件の、
              <br />
              <span className="font-sans font-light text-bright-teal">
                収益改善レポートを作成。
              </span>
            </h1>
            <p className="lead text-ivory/75 jp-break max-w-xl">
              4つの項目を入力するだけで、専任アナリストが物件の
              収益シミュレーションと改善提案をお届けします。
            </p>

            <div className="mt-10 pt-8 border-t border-ivory/15 flex flex-wrap gap-x-10 gap-y-3 text-caption text-ivory/60">
              <span className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-bright-teal" />
                暗号化通信で安全
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-bright-teal" />
                所要時間 約2分
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-bright-teal" />
                完全無料
              </span>
            </div>
          </div>
        </section>

        {/* Progress */}
        <div className="container-narrow px-5 md:px-8 pt-14 md:pt-16">
          <div className="flex items-baseline justify-between mb-4">
            <span className="eyebrow-mono text-sekai-teal">
              Step <span className="font-sans text-ink">{String(step).padStart(2, '0')}</span> / {String(totalSteps).padStart(2, '0')}
            </span>
            <span className="font-sans text-[14px] text-mid-gray">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full h-px bg-rule overflow-hidden">
            <div
              className="h-[2px] bg-sekai-teal transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Area */}
        <div className="container-narrow px-5 md:px-8 py-12 md:py-16">

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-5 mb-4">
                <span className="font-sans font-light text-[56px] text-sekai-teal leading-none tabular-nums">01</span>
                <div>
                  <p className="eyebrow-mono text-mid-gray mb-1">Listing URLs</p>
                  <h2 className="font-sans font-medium text-[22px] md:text-[26px] text-ink leading-snug">
                    物件のリスティングURL
                  </h2>
                </div>
              </div>
              <p className="text-body-sm text-dark-gray mb-10 jp-break">
                AirbnbやBooking.comのリスティングURLがあれば、より精度の高い分析が可能です。
              </p>

              <div className="space-y-6 bg-paper border border-rule p-6 md:p-8">
                <div>
                  <label className="eyebrow-mono text-mid-gray block mb-3">Airbnb リスティングURL</label>
                  <input
                    type="url"
                    value={airbnbUrl}
                    onChange={(e) => setAirbnbUrl(e.target.value)}
                    disabled={noUrl}
                    placeholder="https://www.airbnb.com/rooms/..."
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="eyebrow-mono text-mid-gray block mb-3">Booking.com リスティングURL</label>
                  <input
                    type="url"
                    value={bookingUrl}
                    onChange={(e) => setBookingUrl(e.target.value)}
                    disabled={noUrl}
                    placeholder="https://www.booking.com/hotel/..."
                    className={inputCls}
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer pt-3 border-t border-rule">
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
                    className="w-4 h-4 accent-sekai-teal"
                  />
                  <span className="font-sans text-body-sm text-dark-gray">
                    URLが分からない / まだ掲載していない
                  </span>
                </label>

                {noUrl && (
                  <div className="border-l-2 border-sekai-teal pl-5 py-2">
                    <p className="font-sans text-body-sm text-sekai-teal leading-relaxed">
                      URLがなくても診断可能です。売上データをもとに簡易的な分析レポートを作成します。
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-10 flex justify-end">
                <button onClick={goNext} className="btn btn-primary">
                  次へ進む
                  <IconArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-5 mb-4">
                <span className="font-sans font-light text-[56px] text-sekai-teal leading-none tabular-nums">02</span>
                <div>
                  <p className="eyebrow-mono text-mid-gray mb-1">Revenue & Fees</p>
                  <h2 className="font-sans font-medium text-[22px] md:text-[26px] text-ink leading-snug">
                    売上と手数料
                  </h2>
                </div>
              </div>
              <p className="text-body-sm text-dark-gray mb-10 jp-break">
                現在の売上規模と手数料から、切り替え時の差額を算出します。
              </p>

              <div className="space-y-6 bg-paper border border-rule p-6 md:p-8">
                <div>
                  <label className="eyebrow-mono text-mid-gray block mb-3">
                    ピーク月の月間売上 <span className="text-sekai-teal">*</span>
                  </label>
                  <select value={peakRevenue} onChange={(e) => setPeakRevenue(e.target.value)} className={selectCls}>
                    {REVENUE_OPTIONS.map((o) => (
                      <option key={`peak-${o.value}`} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="eyebrow-mono text-mid-gray block mb-3">
                    オフピーク月の月間売上 <span className="text-sekai-teal">*</span>
                  </label>
                  <select value={offpeakRevenue} onChange={(e) => setOffpeakRevenue(e.target.value)} className={selectCls}>
                    {REVENUE_OPTIONS.map((o) => (
                      <option key={`offpeak-${o.value}`} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="eyebrow-mono text-mid-gray block mb-3">
                    現在の代行手数料 <span className="text-sekai-teal">*</span>
                  </label>

                  <div className="inline-flex border border-rule mb-4">
                    <button
                      type="button"
                      onClick={() => { setFeeMode('rate'); setFeeAmount('') }}
                      className={`px-5 py-2.5 text-[12px] font-sans transition ${
                        feeMode === 'rate' ? 'bg-ink text-ivory' : 'bg-paper text-dark-gray hover:text-ink'
                      }`}
                    >
                      料率で入力
                    </button>
                    <button
                      type="button"
                      onClick={() => { setFeeMode('amount'); setFeeRate('') }}
                      className={`px-5 py-2.5 text-[12px] font-sans transition border-l border-rule ${
                        feeMode === 'amount' ? 'bg-ink text-ivory' : 'bg-paper text-dark-gray hover:text-ink'
                      }`}
                    >
                      月額で入力
                    </button>
                  </div>

                  {feeMode === 'rate' ? (
                    <select value={feeRate} onChange={(e) => setFeeRate(e.target.value)} className={selectCls}>
                      {FEE_RATE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 font-sans text-[14px] text-mid-gray">¥</span>
                      <input
                        type="number"
                        value={feeAmount}
                        onChange={(e) => setFeeAmount(e.target.value)}
                        placeholder="月額手数料を入力"
                        className={inputCls + ' pl-10'}
                      />
                      {feeAmount && avgRevenue > 0 && (
                        <p className="text-caption text-mid-gray mt-2 font-sans">
                          → 平均売上に対して約 {(currentFeeRate * 100).toFixed(1)}% に相当
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Live savings preview */}
                {canProceedStep2 && annualSavings > 0 && (
                  <div className="relative bg-ink overflow-hidden p-7 md:p-8">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-30"
                      style={{ background: 'radial-gradient(circle at 20% 50%, rgba(22,123,129,0.4) 0%, transparent 60%)' }}
                    />
                    <div className="relative">
                      <p className="eyebrow-mono text-bright-teal mb-5">Annual Cost Comparison</p>
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <p className="text-caption text-ivory/50 mb-2 font-sans">現在の年間代行手数料</p>
                          <p className="font-sans font-light text-[24px] text-ivory/80 tabular-nums line-through">
                            ¥{annualCurrentCost.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-caption text-ivory/50 mb-2 font-sans">SEKAI STAY（8%）の場合</p>
                          <p className="font-sans font-light text-[24px] text-bright-teal tabular-nums">
                            ¥{annualSekaiCost.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="border-t border-ivory/15 pt-5">
                        <p className="eyebrow-mono text-ivory/50 mb-3">年間削減額</p>
                        <div className="flex items-baseline gap-2">
                          <span className="font-sans text-[20px] text-bright-teal">−</span>
                          <span className="font-sans font-light text-[44px] md:text-[56px] text-ivory leading-none tabular-nums">
                            ¥{annualSavings.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Optional */}
                <div className="border-t border-rule pt-6">
                  <button
                    type="button"
                    onClick={() => setShowOptional(!showOptional)}
                    className="font-sans text-[14px] text-sekai-teal hover:text-teal-ink transition flex items-center gap-2"
                  >
                    <span className={`inline-block transition-transform ${showOptional ? 'rotate-90' : ''}`}>
                      <IconArrowRight size={12} />
                    </span>
                    より正確なレポートが欲しい方（任意）
                  </button>

                  {showOptional && (
                    <div className="mt-6 space-y-5">
                      <div>
                        <label className="eyebrow-mono text-mid-gray block mb-3">運用年数</label>
                        <select value={experience} onChange={(e) => setExperience(e.target.value)} className={selectCls}>
                          {EXPERIENCE_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="eyebrow-mono text-mid-gray block mb-3">今の代行業者への不満</label>
                        <textarea
                          value={complaints}
                          onChange={(e) => setComplaints(e.target.value)}
                          rows={4}
                          placeholder="（例）手数料が高い、レスポンスが遅い、稼働率が低い..."
                          className={inputCls + ' resize-none'}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button onClick={goBack} className="inline-flex items-center gap-2 font-sans text-body-sm text-dark-gray hover:text-ink transition">
                  <IconArrowLeft size={14} />
                  戻る
                </button>
                <button
                  onClick={goNext}
                  disabled={!canProceedStep2}
                  className="btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  次へ進む
                  <IconArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <div className="flex items-center gap-5 mb-4">
                <span className="font-sans font-light text-[56px] text-sekai-teal leading-none tabular-nums">03</span>
                <div>
                  <p className="eyebrow-mono text-mid-gray mb-1">Delivery</p>
                  <h2 className="font-sans font-medium text-[22px] md:text-[26px] text-ink leading-snug">
                    レポート送付先
                  </h2>
                </div>
              </div>

              <div className="bg-paper border-l-2 border-sekai-teal pl-5 py-4 my-8">
                <div className="flex items-start gap-3">
                  <IconMail size={18} color="#167B81" />
                  <p className="font-sans text-body-sm text-dark-gray leading-relaxed">
                    翌営業日に、専任アナリストが作成した詳細レポート（Web版+PDFダウンロード）のリンクをメールでお届けします。
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 bg-paper border border-rule p-6 md:p-8">
                <div>
                  <label className="eyebrow-mono text-mid-gray block mb-3">
                    お名前 <span className="text-sekai-teal">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="山田 太郎"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="eyebrow-mono text-mid-gray block mb-3">
                    メールアドレス <span className="text-sekai-teal">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="example@email.com"
                    className={inputCls}
                  />
                </div>

                {/* Summary */}
                {annualSavings > 0 && (
                  <div className="bg-mist border border-rule p-6">
                    <p className="eyebrow-mono text-sekai-teal mb-4">入力内容のサマリー</p>
                    <div className="space-y-3 font-sans">
                      <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-rule">
                        <span className="text-body-sm text-mid-gray">ピーク月売上</span>
                        <span className="text-body-sm text-ink">{REVENUE_OPTIONS.find(o => o.value === peakRevenue)?.label}</span>
                      </div>
                      <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-rule">
                        <span className="text-body-sm text-mid-gray">オフピーク月売上</span>
                        <span className="text-body-sm text-ink">{REVENUE_OPTIONS.find(o => o.value === offpeakRevenue)?.label}</span>
                      </div>
                      <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-rule">
                        <span className="text-body-sm text-mid-gray">現在の手数料</span>
                        <span className="text-body-sm text-ink">
                          {feeMode === 'rate' ? `${(Number(feeRate) * 100).toFixed(0)}%` : `¥${Number(feeAmount).toLocaleString()}/月`}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between gap-3 pt-2">
                        <span className="eyebrow text-sekai-teal">年間削減見込み</span>
                        <span className="font-sans text-[22px] text-sekai-teal tabular-nums">
                          ¥{annualSavings.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary w-full justify-center text-[15px] py-5 disabled:opacity-50"
                >
                  {submitting ? '送信中...' : (
                    <>
                      詳細レポートを作成する
                      <IconArrowRight size={14} />
                    </>
                  )}
                </button>

                <p className="text-caption text-mid-gray text-center leading-relaxed font-sans">
                  <IconLock size={10} className="inline-block mr-1 -mt-0.5" />
                  入力情報は暗号化され、レポート作成のみに使用されます。
                  <br />
                  送信により<a href="/privacy" className="text-sekai-teal border-b border-sekai-teal/40">プライバシーポリシー</a>に同意したものとみなします。
                </p>
              </form>

              <div className="mt-8">
                <button
                  onClick={goBack}
                  className="inline-flex items-center gap-2 font-sans text-body-sm text-dark-gray hover:text-ink transition"
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
