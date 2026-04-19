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
 * /audit — 3ステップ 無料運営診断フォーム
 * LP (/lp#diagnostic) の DiagnosticForm をベースに、
 * メインサイトのページ骨格（Header / Breadcrumb / Footer / FloatingCTA）に統合。
 * - Step 1: 物件情報
 * - Step 2: 運営状況
 * - Step 3: 連絡先 → Web3Forms に送信
 * - ?rev= で月間売上を初期選択（/simulate からの遷移に対応）
 * ──────────────────────────────────────────────────────────── */

const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
  '岐阜県', '静岡県', '愛知県', '三重県',
  '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
  '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県',
  '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
]

const REVENUE_BANDS = ['〜30万円', '30〜50万円', '50〜100万円', '100〜200万円', '200万円以上', 'わからない'] as const

/* /simulate から渡ってきた月商（円）を帯域に変換 */
function revenueToBand(yenPerMonth: number): string {
  if (yenPerMonth < 300000) return '〜30万円'
  if (yenPerMonth < 500000) return '30〜50万円'
  if (yenPerMonth < 1000000) return '50〜100万円'
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

  // Step 1
  const [propertyType, setPropertyType] = useState('')
  const [area, setArea] = useState('')
  const [rooms, setRooms] = useState('')

  // Step 2
  const [currentStatus, setCurrentStatus] = useState('')
  const [currentFee, setCurrentFee] = useState('')
  const [monthlyRevenue, setMonthlyRevenue] = useState('')

  // Step 3
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

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
          subject: `【無料運営診断】${name}様 - ${propertyType || '未選択'} / ${area || '未選択'} / ${rooms || '未選択'}`,
          from_name: 'SEKAI STAY',
          replyto: 'contact@sekaistay.com',
          name,
          email,
          phone: phone || '未入力',
          property_type: propertyType || '未入力',
          area: area || '未入力',
          rooms: rooms || '未入力',
          current_status: currentStatus || '未入力',
          current_fee: currentFee || '未入力',
          monthly_revenue: monthlyRevenue || '未入力',
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
            property_type: propertyType,
            area,
            current_status: currentStatus,
            monthly_revenue: monthlyRevenue,
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
              <span className="text-ink font-medium">{name} 様</span>の物件について、担当者が確認の上
              <span className="text-ink font-medium"> 3営業日以内</span> にご連絡いたします。
            </p>
            <p className="font-sans text-caption text-mid-gray mb-10">
              — 確認メールを {email} にお送りしました。
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
          <PrefillSync onPrefill={setMonthlyRevenue} />
        </Suspense>

        {/* Progress ledger */}
        <div className="bg-rule grid grid-cols-3 gap-px border border-rule mb-10">
          {[
            { n: 1, label: 'Property' },
            { n: 2, label: 'Operation' },
            { n: 3, label: 'Contact' },
          ].map(s => (
            <div key={s.n} className={`p-4 ${s.n <= step ? 'bg-ink text-ivory' : 'bg-paper text-mid-gray'}`}>
              <p className={`eyebrow-mono mb-1 ${s.n <= step ? 'text-bright-teal' : 'text-mid-gray'}`}>Step {String(s.n).padStart(2, '0')}</p>
              <p className={`font-sans text-[13px] ${s.n <= step ? 'text-ivory' : 'text-mid-gray'}`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Step 1 — Property */}
        {step === 1 && (
          <div className="border-t border-b border-rule py-10">
            <p className="eyebrow-mono text-mid-gray mb-6">Step 01 · 物件情報を教えてください</p>

            <p className="font-sans text-body-sm font-medium text-ink mb-3">物件タイプ</p>
            <div className="grid grid-cols-2 gap-px bg-rule border border-rule mb-8">
              {['戸建て', 'マンション', 'アパート一棟', 'その他'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPropertyType(type)}
                  className={`py-4 px-4 font-sans text-[14px] transition ${
                    propertyType === type
                      ? 'bg-ink text-ivory'
                      : 'bg-paper text-ink hover:bg-mist'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="font-sans text-body-sm font-medium text-ink block mb-3">エリア(都道府県)</label>
              <select
                value={area} onChange={e => setArea(e.target.value)}
                className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition"
              >
                <option value="">選択してください</option>
                {PREFECTURES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="mb-8">
              <label className="font-sans text-body-sm font-medium text-ink block mb-3">部屋数</label>
              <select
                value={rooms} onChange={e => setRooms(e.target.value)}
                className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition"
              >
                <option value="">選択してください</option>
                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={`${n}部屋`}>{n}部屋</option>)}
                <option value="10部屋以上">10部屋以上</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => { if (propertyType) { setStep(2); trackStep(2, '物件情報入力') } }}
              disabled={!propertyType}
              className={`w-full py-4 font-sans font-medium text-[14px] transition flex items-center justify-center gap-3 ${
                propertyType
                  ? 'bg-ink text-ivory hover:bg-sekai-teal'
                  : 'bg-mist text-mid-gray cursor-not-allowed'
              }`}
            >
              次へ
              <IconArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2 — Operation */}
        {step === 2 && (
          <div className="border-t border-b border-rule py-10">
            <p className="eyebrow-mono text-mid-gray mb-6">Step 02 · 現在の運営状況</p>

            <p className="font-sans text-body-sm font-medium text-ink mb-3">現在の状況</p>
            <div className="bg-rule grid grid-cols-1 gap-px border border-rule mb-8">
              {[
                { value: '他社に委託中', label: '他社に委託中', sub: '現在、他の代行会社を利用している' },
                { value: '自主運営', label: '自分で運営中', sub: 'OTA掲載・ゲスト対応を自分でやっている' },
                { value: 'これから始めたい', label: 'これから民泊を始めたい', sub: 'まだ運営していないが検討中' },
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setCurrentStatus(opt.value)}
                  className={`p-5 text-left transition ${
                    currentStatus === opt.value
                      ? 'bg-ink text-ivory'
                      : 'bg-paper text-ink hover:bg-mist'
                  }`}
                >
                  <span className={`font-sans font-medium text-[15px] block ${currentStatus === opt.value ? 'text-ivory' : 'text-ink'}`}>{opt.label}</span>
                  <span className={`eyebrow-mono mt-1 block ${currentStatus === opt.value ? 'text-bright-teal' : 'text-mid-gray'}`}>— {opt.sub}</span>
                </button>
              ))}
            </div>

            {currentStatus === '他社に委託中' && (
              <div className="mb-6">
                <label className="font-sans text-body-sm font-medium text-ink block mb-3">現在の手数料率</label>
                <select
                  value={currentFee} onChange={e => setCurrentFee(e.target.value)}
                  className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition"
                >
                  <option value="">選択してください</option>
                  <option value="10%">10%</option>
                  <option value="15%">15%</option>
                  <option value="20%">20%</option>
                  <option value="25%以上">25%以上</option>
                  <option value="わからない">わからない</option>
                </select>
              </div>
            )}

            {(currentStatus === '他社に委託中' || currentStatus === '自主運営') && (
              <div className="mb-8">
                <label className="font-sans text-body-sm font-medium text-ink block mb-3">月間売上(目安)</label>
                <select
                  value={monthlyRevenue} onChange={e => setMonthlyRevenue(e.target.value)}
                  className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition"
                >
                  <option value="">選択してください</option>
                  {REVENUE_BANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            )}

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
                onClick={() => { if (currentStatus) { setStep(3); trackStep(3, '運営状況入力') } }}
                disabled={!currentStatus}
                className={`flex-[2] py-4 font-sans font-medium text-[14px] transition flex items-center justify-center gap-3 ${
                  currentStatus
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
            <p className="eyebrow-mono text-mid-gray mb-6">Step 03 · ご連絡先</p>

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
              <div>
                <label className="font-sans text-body-sm font-medium text-ink block mb-3">
                  電話番号 <span className="font-sans text-caption text-mid-gray">(任意)</span>
                </label>
                <input
                  type="tel" placeholder="090-1234-5678"
                  value={phone} onChange={e => setPhone(e.target.value)}
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
                {submitting ? '送信中…' : '無料診断を受け取る'}
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
      <Breadcrumb items={[{ label: '無料運営診断' }]} />
      <FloatingCTA />

      <main className="bg-ivory">
        {/* Hero */}
        <section className="bg-ivory border-b border-rule">
          <div className="container-edit section-xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="chapter">Chapter Ⅰ</span>
              <span className="h-px bg-rule flex-1" />
              <span className="eyebrow-mono text-mid-gray">Complimentary Diagnostic</span>
            </div>
            <h1 className="heading-display text-ink mb-8 jp-keep">
              私の物件の収益を、<br className="hidden md:block" /><span className="text-sekai-teal">診断する。</span>
            </h1>
            <p className="font-sans text-body md:text-body-lg text-dark-gray max-w-2xl leading-[2.2] mb-4">
              <span className="text-ink font-medium">3分</span>で完了。
              物件情報・運営状況・ご連絡先をお伺いし、担当者が個別にレポートをお届けします。
            </p>
            <p className="font-sans text-caption text-sekai-teal">
              — 先着10オーナー:移行コスト無料キャンペーン実施中
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
