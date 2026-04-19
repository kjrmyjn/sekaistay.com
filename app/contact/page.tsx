'use client'

import { useState, FormEvent } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import { IconCheck, IconArrowRight } from '@/components/Icons'

const WEB3FORMS_KEY = '85597b1f-b146-40b9-94af-7a8dc25dfe1b'

const inputCls =
  'w-full bg-mist border border-rule px-5 py-4 text-[15px] font-sans text-ink placeholder:text-mid-gray/70 outline-none transition focus:border-sekai-teal focus:bg-paper'

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const data = new FormData(form)
    data.append('access_key', WEB3FORMS_KEY)
    data.append('subject', '【SEKAI STAY】お問い合わせ')
    data.append('from_name', 'SEKAI STAY')
    data.append('replyto', 'contact@sekaistay.com')

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      if (res.ok) {
        setDone(true)
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'generate_lead', { event_category: 'contact', event_label: 'website_form' })
        }
      }
    } catch { /* ignore */ }
    setSubmitting(false)
  }

  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="bg-ivory">
        {/* Chapter Ⅰ — masthead */}
        <section className="bg-paper border-b border-rule">
          <div className="container-edit px-5 md:px-8 pt-20 md:pt-28 pb-14 md:pb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="rule-teal-sm" />
              <p className="eyebrow text-sekai-teal">Chapter Ⅰ · Contact</p>
            </div>
            <h1 className="heading-display text-ink mb-5">
              お問い合わせ
              <span className="block font-sans font-light text-mid-gray text-[0.6em] mt-3">Correspondence</span>
            </h1>
            <p className="lead text-dark-gray max-w-2xl">
              民泊運用に関するご質問・ご相談はお気軽にどうぞ。2営業日以内に担当より返信いたします。
            </p>
          </div>
        </section>

        {/* Chapter Ⅱ — form */}
        <section className="section-xl">
          <div className="container-narrow px-5 md:px-8 max-w-2xl">
            {done ? (
              <div className="bg-paper border border-rule">
                <div className="bg-ink text-ivory px-8 py-10 text-center">
                  <div className="w-14 h-14 border-[3px] border-bright-teal flex items-center justify-center mx-auto mb-5">
                    <IconCheck size={22} className="text-bright-teal" />
                  </div>
                  <p className="eyebrow-mono text-bright-teal mb-3">Dispatched</p>
                  <h2 className="font-sans text-[22px] md:text-[26px] mb-3">送信が完了しました</h2>
                  <span className="block w-10 h-px bg-bright-teal mx-auto mb-4" />
                  <p className="font-sans text-body-sm text-ivory/80 leading-[1.9]">
                    お問い合わせいただきありがとうございます。<br />
                    2営業日以内に担当より返信いたします。
                  </p>
                </div>
                <div className="px-8 py-8 text-center">
                  <p className="eyebrow-mono text-mid-gray mb-3">Next Step</p>
                  <p className="font-sans text-body-sm text-dark-gray mb-5">
                    物件の詳しい診断をご希望の方は
                  </p>
                  <a
                    href="/lp#diagnostic"
                    className="btn btn-primary text-[14px]"
                  >
                    無料診断フォームへ
                    <IconArrowRight size={14} />
                  </a>
                </div>
              </div>
            ) : (
              <div>
                {/* Ledger intro */}
                <div className="flex items-center gap-3 mb-10">
                  <span className="eyebrow-mono text-mid-gray">§ 02</span>
                  <span className="h-px bg-rule flex-1" />
                  <p className="eyebrow text-sekai-teal">Message Form</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-paper border border-rule p-6 md:p-10 space-y-7">
                  <Field number="01" label="お名前" required>
                    <input
                      type="text" name="name" required
                      className={inputCls}
                      placeholder="山田 太郎"
                    />
                  </Field>
                  <Field number="02" label="メールアドレス" required>
                    <input
                      type="email" name="email" required
                      className={inputCls}
                      placeholder="example@email.com"
                    />
                  </Field>
                  <Field number="03" label="電話番号">
                    <input
                      type="tel" name="phone"
                      className={inputCls}
                      placeholder="090-1234-5678"
                    />
                  </Field>
                  <Field number="04" label="お問い合わせ内容" required>
                    <textarea
                      name="message" required rows={6}
                      className={inputCls + ' resize-none'}
                      placeholder="お気軽にご記入ください"
                    />
                  </Field>

                  <div className="pt-4 space-y-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary w-full justify-center text-[15px] py-4 disabled:opacity-50"
                    >
                      {submitting ? '送信中...' : (
                        <>
                          送信する
                          <IconArrowRight size={14} />
                        </>
                      )}
                    </button>
                    <p className="text-caption text-mid-gray text-center font-sans">
                      送信により<a href="/privacy" className="text-sekai-teal hover:underline">プライバシーポリシー</a>に同意したものとみなします
                    </p>
                  </div>
                </form>

                {/* Alt lead-in — diagnostic */}
                <div className="mt-10 bg-bone border border-rule p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="rule-teal-sm" />
                    <p className="eyebrow text-sekai-teal">Alternative Path</p>
                  </div>
                  <h3 className="font-sans font-medium text-[20px] md:text-[24px] text-ink leading-snug mb-3">
                    物件の収益シミュレーションを<br className="hidden md:block" />ご希望ですか？
                  </h3>
                  <p className="font-sans text-body-sm text-dark-gray leading-[1.9] mb-6">
                    詳しい物件情報をご入力いただくと、個別の収益試算レポートをお届けします。
                  </p>
                  <a
                    href="/lp#diagnostic"
                    className="btn btn-ghost text-[14px]"
                  >
                    無料診断フォームへ
                    <IconArrowRight size={14} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Field({
  number,
  label,
  required,
  children,
}: {
  number: string
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-sans font-light text-[22px] text-sekai-teal leading-none tabular-nums">
          {number}
        </span>
        <label className="font-sans font-medium text-[14px] md:text-[15px] text-ink">
          {label}
          {required && <span className="text-sekai-teal ml-1 font-sans">*</span>}
        </label>
      </div>
      {children}
    </div>
  )
}
