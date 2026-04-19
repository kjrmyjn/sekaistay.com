'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import { IconArrowRight, IconCheck } from '@/components/Icons'

/* ─────────────────────────────────────────────────────────────
 * /audit — 3ステップ 無料物件診断フォーム
 * レポート本体（sekai-stay-report-mock）の入力モデルに準拠。
 * - Step 1: リスティング情報（Airbnb URL / Booking.com URL）
 * - Step 2: 売上と手数料（ピーク / オフピーク / 手数料 / 運用年数 / 不満）
 * - Step 3: レポート送付先（名前・メール）→ Web3Forms に送信
 * - ?rev= で月商レンジを初期選択（/simulate からの遷移に対応）
 * ──────────────────────────────────────────────────────────── */

const REVENUE_BANDS = [
  '〜10万円',
  '10〜20万円',
  '20〜30万円',
  '30〜50万円',
  '50〜80万円',
  '80〜100万円',
  '100〜200万円',
  '200万円以上',
] as const

const FEE_RATES = ['10%', '15%', '20%', '25%', '30%以上', '月額固定（後記）', '自主運営（代行なし）'] as const

const YEARS_OPTIONS = ['1年未満', '1〜2年', '3〜5年', '5年以上', 'これから開始予定'] as const

/* /simulate から渡ってきた月商（円）を帯域に変換 */
function revenueToBand(yenPerMonth: number): string {
  if (yenPerMonth < 100000) return '〜10万円'
  if (yenPerMonth < 200000) return '10〜20万円'
  if (yenPerMonth < 300000) return '20〜30万円'
  if (yenPerMonth < 500000) return '30〜50万円'
  if (yenPerMonth < 800000) return '50〜80万円'
  if (yenPerMonth < 1000000) return '80〜100万円'
  if (yenPerMonth < 2000000) return '100〜200万円'
  return '200万円以上'
}

function PrefillSync({ onPrefill }: { onPrefill: (band: string) => void }) {
  const searchParams = useSearchParams()
  useEffect(() => {
    const rev = searchParams.get('rev')
    if (rev) {
      const n = parseInt(rev, 10)
      if (!isNaN(n) && n > 0) onPrefill(revenueToBand(n))
    }
  }, [searchParams, onPrefill])
  return null
}

function DiagnosticForm() {
  const [step, setStep] = useState(1)

  // Step 1 — Listings
  const [airbnbUrl, setAirbnbUrl] = useState('')
  const [bookingUrl, setBookingUrl] = useState('')
  const [noListing, setNoListing] = useState(false)

  // Step 2 — Revenue & Fee
  const [peakRevenue, setPeakRevenue] = useState('')
  const [offpeakRevenue, setOffpeakRevenue] = useState('')
  const [currentFee, setCurrentFee] = useState('')
  const [feeMonthly, setFeeMonthly] = useState('')
  const [years, setYears] = useState('')
  const [complaint, setComplaint] = useState('')

  // Step 3 — Contact
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const trackStep = (stepNum: number, label: string) => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'form_step', {
        step_number: stepNum,
        step_label: label,
        form_name: 'audit',
      })
    }
  }

  // Step 1 validation: 少なくとも1つのURL or 「まだ掲載していない」
  const step1Valid = noListing || airbnbUrl.trim() !== '' || bookingUrl.trim() !== ''
  // Step 2 validation: ピーク売上のみ必須（他は任意）
  const step2Valid = peakRevenue !== ''

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      setError('お名前とメールアドレスは必須です。')
      return
    }
    setError('')
    setSubmitting(true)

    const getUtm = (k: string) => {
      try { return sessionStorage.getItem(k) || '' } catch { return '' }
    }

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ''
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `【無料物件診断】${name}様 - ピーク:${peakRevenue || '未選択'} / 手数料:${currentFee || '未選択'}`,
          from_name: 'SEKAI STAY',
          replyto: 'contact@sekaistay.com',
          name,
          email,
          airbnb_url: airbnbUrl || '未入力',
          booking_url: bookingUrl || '未入力',
          no_listing: noListing ? 'はい' : 'いいえ',
          peak_revenue: peakRevenue || '未入力',
          offpeak_revenue: offpeakRevenue || '未入力',
          current_fee: currentFee || '未入力',
          fee_monthly: feeMonthly || '未入力',
          years_operated: years || '未入力',
          complaint: complaint || '未入力',
          source_page: '/audit',
          utm_source: getUtm('utm_source'),
          utm_medium: getUtm('utm_medium'),
          utm_campaign: getUtm('utm_campaign'),
          utm_term: getUtm('utm_term'),
          gclid: getUtm('gclid'),
          fbclid: getUtm('fbclid'),
        }),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'generate_lead', {
            currency: 'JPY',
            value: 1,
            source_page: '/audit',
            peak_revenue: peakRevenue,
            current_fee: currentFee,
          })
        }
      } else {
        setError('送信に失敗しました。しばらくしてから再度お試しください。')
      }
    } catch {
      setError('通信エラーが発生しました。しばらくしてから再度お試しください。')
    } finally {
      setSubmitting(false)
    }
  }

  /* ─── Thank You state ─── */
  if (submitted) {
    return (
      <section className="bg-paper border-y border-rule">
        <div className="container-edit section-xl max-w-3xl mx-auto">
          <div className="chapter-marker">
            <span className="rule-teal-sm" />
            <p className="eyebrow text-sekai-teal">Received · Thank You</p>
          </div>

          <div className="border-t border-rule pt-10">
            <div className="w-16 h-16 bg-ink flex items-center justify-center mb-8">
              <IconCheck className="w-7 h-7 text-bright-teal" />
            </div>
            <h2 className="font-sans font-bold text-[32px] md:text-[44px] text-ink leading-[1.3] mb-6 jp-keep">
              お申し込み<span className="font-sans text-sekai-teal">ありがとうございます。</span>
            </h2>
            <p className="font-sans text-body md:text-[17px] text-dark-gray leading-[2] mb-3 max-w-xl">
              <span className="text-ink font-medium">{name} 様</span>のリスティングを担当アナリストが精査し、
              <span className="text-ink font-medium"> 3営業日以内</span> に個別レポートを
              <span className="text-ink font-medium"> {email} </span>宛にお送りします。
            </p>
            <p className="font-sans text-caption text-mid-gray mb-10">
              — 稼働率改善余地・手数料比較・4週間のロードマップをまとめた個別診断レポートです。
            </p>

            <div className="bg-ivory border border-rule p-8 md:p-10 mb-8">
              <p className="eyebrow-mono text-mid-gray mb-3">Material № 01 · For your review</p>
              <h3 className="font-sans font-medium text-[20px] md:text-[22px] text-ink leading-snug mb-3">
                お待ちの間に、<span className="font-sans text-sekai-teal">サービス資料</span>をご覧ください。
              </h3>
              <p className="font-sans text-body-sm text-dark-gray leading-[1.95] mb-6">
                料金・サービス内容・導入事例をまとめた資料をダウンロードいただけます。
              </p>
              <a
                href="/SEKAISTAY営業資料完成版.pptx"
                download
                className="group inline-flex items-center gap-3 bg-ink text-ivory px-6 py-4 hover:bg-sekai-teal transition font-sans font-medium text-[14px]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                営業資料をダウンロード
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/services"
                className="btn btn-ghost justify-center text-[14px]"
              >
                サービス詳細を見る
                <IconArrowRight size={14} />
              </Link>
              <Link
                href="/case-studies"
                className="btn btn-ghost justify-center text-[14px]"
              >
                導入事例を見る
                <IconArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  /* ─── Form state ─── */
  return (
    <section className="bg-ivory">
      <div className="container-edit section-xl max-w-2xl mx-auto">
        <Suspense fallback={null}>
          <PrefillSync onPrefill={setPeakRevenue} />
        </Suspense>

        {/* Progress ledger */}
        <div className="bg-rule grid grid-cols-3 gap-px border border-rule mb-10">
          {[
            { n: 1, label: 'Listing' },
            { n: 2, label: 'Revenue & Fee' },
            { n: 3, label: 'Contact' },
          ].map(s => (
            <div key={s.n} className={`p-4 ${s.n <= step ? 'bg-ink text-ivory' : 'bg-paper text-mid-gray'}`}>
              <p className={`eyebrow-mono mb-1 ${s.n <= step ? 'text-bright-teal' : 'text-mid-gray'}`}>Step {String(s.n).padStart(2, '0')}</p>
              <p className={`font-sans text-[13px] ${s.n <= step ? 'text-ivory' : 'text-mid-gray'}`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Step 1 — Listing */}
        {step === 1 && (
          <div className="border-t border-b border-rule py-10">
            <p className="eyebrow-mono text-mid-gray mb-2">Step 01 · リスティング情報</p>
            <p className="font-sans text-body-sm text-dark-gray leading-[1.9] mb-8">
              担当アナリストが掲載ページを精査し、写真・タイトル・レビューの改善余地を採点します。
              <span className="block text-mid-gray mt-1">URLは公開ページをそのままコピーしてください。どちらか片方だけでも診断可能です。</span>
            </p>

            <div className="mb-6">
              <label className="font-sans text-body-sm font-medium text-ink block mb-3">
                Airbnb リスティングURL <span className="font-sans text-caption text-mid-gray">(任意)</span>
              </label>
              <input
                type="url"
                placeholder="https://www.airbnb.jp/rooms/..."
                value={airbnbUrl}
                onChange={e => { setAirbnbUrl(e.target.value); if (e.target.value) setNoListing(false) }}
                disabled={noListing}
                className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition disabled:bg-mist disabled:text-mid-gray"
              />
            </div>

            <div className="mb-6">
              <label className="font-sans text-body-sm font-medium text-ink block mb-3">
                Booking.com リスティングURL <span className="font-sans text-caption text-mid-gray">(任意)</span>
              </label>
              <input
                type="url"
                placeholder="https://www.booking.com/hotel/..."
                value={bookingUrl}
                onChange={e => { setBookingUrl(e.target.value); if (e.target.value) setNoListing(false) }}
                disabled={noListing}
                className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition disabled:bg-mist disabled:text-mid-gray"
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer mb-8 p-4 border border-rule bg-paper hover:bg-mist transition">
              <input
                type="checkbox"
                checked={noListing}
                onChange={e => {
                  setNoListing(e.target.checked)
                  if (e.target.checked) { setAirbnbUrl(''); setBookingUrl('') }
                }}
                className="mt-1 accent-sekai-teal w-4 h-4 cursor-pointer"
              />
              <span>
                <span className="font-sans font-medium text-[14px] text-ink block">まだ掲載していない（これから立ち上げ予定）</span>
                <span className="font-sans text-caption text-mid-gray block mt-1">物件情報のみで収益ポテンシャルを診断します。</span>
              </span>
            </label>

            <button
              type="button"
              onClick={() => { if (step1Valid) { setStep(2); trackStep(2, 'リスティング入力') } }}
              disabled={!step1Valid}
              className={`w-full py-4 font-sans font-medium text-[14px] transition flex items-center justify-center gap-3 ${
                step1Valid
                  ? 'bg-ink text-ivory hover:bg-sekai-teal'
                  : 'bg-mist text-mid-gray cursor-not-allowed'
              }`}
            >
              次へ
              <IconArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2 — Revenue & Fee */}
        {step === 2 && (
          <div className="border-t border-b border-rule py-10">
            <p className="eyebrow-mono text-mid-gray mb-2">Step 02 · 売上と手数料</p>
            <p className="font-sans text-body-sm text-dark-gray leading-[1.9] mb-8">
              現在の収益水準と手数料を把握することで、レポートに収益改善の試算表を盛り込めます。
              <span className="block text-mid-gray mt-1">わかる範囲でご入力ください。概算で大丈夫です。</span>
            </p>

            <div className="mb-6">
              <label className="font-sans text-body-sm font-medium text-ink block mb-3">
                ピーク月の月間売上 <span className="text-sekai-teal">*</span>
                <span className="font-sans text-caption text-mid-gray ml-2">— 過去1年でもっとも高かった月</span>
              </label>
              <select
                value={peakRevenue} onChange={e => setPeakRevenue(e.target.value)}
                className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition"
              >
                <option value="">選択してください</option>
                {REVENUE_BANDS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div className="mb-6">
              <label className="font-sans text-body-sm font-medium text-ink block mb-3">
                オフピーク月の月間売上 <span className="font-sans text-caption text-mid-gray">(任意)</span>
                <span className="font-sans text-caption text-mid-gray ml-2">— 過去1年でもっとも低かった月</span>
              </label>
              <select
                value={offpeakRevenue} onChange={e => setOffpeakRevenue(e.target.value)}
                className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition"
              >
                <option value="">選択してください</option>
                {REVENUE_BANDS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div className="mb-6">
              <label className="font-sans text-body-sm font-medium text-ink block mb-3">
                現在の代行手数料 <span className="font-sans text-caption text-mid-gray">(任意)</span>
              </label>
              <select
                value={currentFee} onChange={e => setCurrentFee(e.target.value)}
                className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition mb-3"
              >
                <option value="">選択してください</option>
                {FEE_RATES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              {currentFee === '月額固定（後記）' && (
                <input
                  type="text"
                  placeholder="例: 月5万円 / 室"
                  value={feeMonthly}
                  onChange={e => setFeeMonthly(e.target.value)}
                  className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition"
                />
              )}
            </div>

            <div className="mb-6">
              <label className="font-sans text-body-sm font-medium text-ink block mb-3">
                運用年数 <span className="font-sans text-caption text-mid-gray">(任意)</span>
              </label>
              <select
                value={years} onChange={e => setYears(e.target.value)}
                className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition"
              >
                <option value="">選択してください</option>
                {YEARS_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div className="mb-8">
              <label className="font-sans text-body-sm font-medium text-ink block mb-3">
                現在の運用への不満・課題 <span className="font-sans text-caption text-mid-gray">(任意)</span>
              </label>
              <textarea
                rows={4}
                placeholder="例: 稼働率が60%前後で伸びない／手数料が高い／レポートが雑で状況が見えない／レビュー平均が上がらない 等"
                value={complaint}
                onChange={e => setComplaint(e.target.value)}
                className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition resize-none leading-[1.8]"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-4 border border-rule bg-paper font-sans text-[14px] text-dark-gray hover:bg-mist transition"
              >
                戻る
              </button>
              <button
                type="button"
                onClick={() => { if (step2Valid) { setStep(3); trackStep(3, '売上・手数料入力') } }}
                disabled={!step2Valid}
                className={`flex-[2] py-4 font-sans font-medium text-[14px] transition flex items-center justify-center gap-3 ${
                  step2Valid
                    ? 'bg-ink text-ivory hover:bg-sekai-teal'
                    : 'bg-mist text-mid-gray cursor-not-allowed'
                }`}
              >
                次へ
                <IconArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Contact */}
        {step === 3 && (
          <div className="border-t border-b border-rule py-10">
            <p className="eyebrow-mono text-mid-gray mb-2">Step 03 · レポート送付先</p>
            <p className="font-sans text-body-sm text-dark-gray leading-[1.9] mb-8">
              診断レポートは PDF 形式でご入力のメールアドレスにお送りします。
              <span className="block text-mid-gray mt-1">営業の一斉送信リストには登録されません。</span>
            </p>

            <div className="space-y-5">
              <div>
                <label className="font-sans text-body-sm font-medium text-ink block mb-3">
                  お名前 <span className="text-sekai-teal">*</span>
                </label>
                <input
                  type="text" placeholder="田中 太郎" required
                  value={name} onChange={e => setName(e.target.value)}
                  className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition"
                />
              </div>
              <div>
                <label className="font-sans text-body-sm font-medium text-ink block mb-3">
                  メールアドレス <span className="text-sekai-teal">*</span>
                </label>
                <input
                  type="email" placeholder="tanaka@example.com" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition"
                />
              </div>
            </div>

            {error && (
              <p className="font-sans text-body-sm text-sekai-teal mt-4 text-center border-t border-rule pt-4">{error}</p>
            )}

            <p className="font-sans text-caption text-mid-gray mt-5 leading-[1.9]">
              送信により<Link href="/privacy" className="text-sekai-teal hover:underline">プライバシーポリシー</Link>に同意したものとみなします。
            </p>

            <div className="flex gap-3 mt-8">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 py-4 border border-rule bg-paper font-sans text-[14px] text-dark-gray hover:bg-mist transition"
              >
                戻る
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-[2] py-4 bg-ink text-ivory hover:bg-sekai-teal disabled:bg-mist disabled:text-mid-gray font-sans font-medium text-[14px] transition flex items-center justify-center gap-3"
              >
                {submitting ? '送信中…' : '無料診断レポートを受け取る'}
                {!submitting && <IconArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        <p className="font-sans text-caption text-mid-gray text-center mt-8">
          — 入力内容はSSL暗号化通信で送信されます
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────────────────── */
export default function AuditPage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: '無料物件診断' }]} />
      <FloatingCTA />

      <main className="bg-ivory">
        {/* Hero */}
        <section className="bg-ivory border-b border-rule">
          <div className="container-edit section-xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="chapter">Chapter Ⅰ</span>
              <span className="h-px bg-rule flex-1" />
              <span className="eyebrow-mono text-mid-gray">Complimentary Property Diagnostic</span>
            </div>
            <h1 className="heading-display text-ink mb-8 jp-keep">
              あなたの物件の<span className="text-sekai-teal">稼ぐ力</span>を、<br className="hidden md:block" />
              レポートで採点します。
            </h1>
            <p className="font-sans text-body md:text-body-lg text-dark-gray max-w-2xl leading-[2.2] mb-6">
              <span className="text-ink font-medium">3分</span>の入力で、担当アナリストが
              リスティング品質・稼働率改善余地・手数料比較・4週間のロードマップを
              <span className="text-ink font-medium">個別レポート</span>としてお届けします。
            </p>

            {/* レポートに含まれる内容 */}
            <div className="grid sm:grid-cols-2 gap-px bg-rule border border-rule mb-6 max-w-2xl">
              {[
                { title: '物件診断スコア', body: '4指標でリスティングを採点' },
                { title: 'キーファインディング', body: '改善インパクトの大きい3ポイント' },
                { title: '収益シミュレーション', body: '現状 → SEKAI STAY 切替後の比較' },
                { title: '改善ロードマップ', body: '4週間の具体アクションプラン' },
              ].map(item => (
                <div key={item.title} className="bg-paper p-5">
                  <p className="eyebrow-mono text-sekai-teal mb-2">Report Section</p>
                  <p className="font-sans font-medium text-[14px] text-ink leading-snug mb-1">{item.title}</p>
                  <p className="font-sans text-caption text-mid-gray leading-[1.8]">{item.body}</p>
                </div>
              ))}
            </div>

            <p className="font-sans text-caption text-sekai-teal">
              — 先着10オーナー：移行コスト無料キャンペーン実施中
            </p>
          </div>
        </section>

        {/* Form */}
        <DiagnosticForm />

        {/* Trust strip */}
        <section className="bg-paper border-y border-rule">
          <div className="container-edit section-lg max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="rule-teal-sm" />
              <p className="eyebrow text-sekai-teal">Why SEKAI STAY</p>
            </div>
            <div className="grid md:grid-cols-3 gap-px bg-rule border border-rule">
              {[
                { title: '手数料8%', body: '業界平均(15〜25%)の半分以下。明朗会計で、月次レポートもすべて開示します。' },
                { title: '稼働率 +30%', body: 'OTA最適化・ダイナミックプライシング導入後の、弊社管理物件の平均実績です。' },
                { title: '最短2週間', body: '他社からの乗り換え費用0円・最低契約期間なし。縛りのない運営パートナーです。' },
              ].map(item => (
                <div key={item.title} className="bg-paper p-8 md:p-10">
                  <p className="eyebrow-mono text-mid-gray mb-3">SEKAI STAY</p>
                  <h3 className="font-sans font-medium text-[22px] md:text-[24px] text-sekai-teal mb-4 leading-none">
                    {item.title}
                  </h3>
                  <p className="font-sans text-body-sm text-dark-gray leading-[2]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
