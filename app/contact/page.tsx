'use client'

import { useState, FormEvent } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import { IconCheck, IconArrowRight } from '@/components/Icons'

const WEB3FORMS_KEY = '85597b1f-b146-40b9-94af-7a8dc25dfe1b'

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
    data.append('from_name', 'SEKAI STAY Website')

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
      <main>
        <section className="bg-warm-gradient px-6 section-heavy">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3">Contact</p>
            <h1 className="heading-display text-charcoal mb-6">
              お問い合わせ
            </h1>
            <p className="text-base text-dark-gray leading-relaxed max-w-2xl mx-auto">
              民泊運用に関するご質問・ご相談はお気軽にどうぞ。<br />
              2営業日以内にご連絡いたします。
            </p>
          </div>
        </section>

        <section className="px-6 section-heavy">
          <div className="max-w-xl mx-auto">
            {done ? (
              <div className="bg-teal-tint rounded-2xl border border-deep-teal/20 p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-deep-teal to-sekai-teal flex items-center justify-center mx-auto mb-5 shadow-[0_8px_24px_rgba(22,123,129,0.25)]">
                  <IconCheck size={28} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-charcoal mb-3">送信完了</h2>
                <p className="text-sm text-dark-gray mb-8">お問い合わせありがとうございます。2営業日以内にご連絡いたします。</p>
                <p className="text-xs text-dark-gray">
                  物件の詳しい診断をご希望の方は、
                  <a href="/lp#diagnostic" className="text-deep-teal font-bold hover:underline">
                    無料診断フォーム
                  </a>
                  もご活用ください。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">お名前 <span className="text-red-500">*</span></label>
                  <input
                    type="text" name="name" required
                    className="w-full border border-light-gray rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal/30 focus:border-deep-teal transition"
                    placeholder="山田 太郎"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">メールアドレス <span className="text-red-500">*</span></label>
                  <input
                    type="email" name="email" required
                    className="w-full border border-light-gray rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal/30 focus:border-deep-teal transition"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">電話番号</label>
                  <input
                    type="tel" name="phone"
                    className="w-full border border-light-gray rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal/30 focus:border-deep-teal transition"
                    placeholder="090-1234-5678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">お問い合わせ内容 <span className="text-red-500">*</span></label>
                  <textarea
                    name="message" required rows={6}
                    className="w-full border border-light-gray rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-deep-teal/30 focus:border-deep-teal transition resize-none"
                    placeholder="お気軽にご記入ください"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full inline-flex items-center justify-center gap-2 bg-deep-teal hover:bg-sekai-teal text-white font-bold py-4 rounded-xl transition text-sm disabled:opacity-50 shadow-lg"
                >
                  {submitting ? '送信中...' : (
                    <>
                      送信する
                      <IconArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-dark-gray text-center">
                  送信により<a href="/privacy" className="text-deep-teal hover:underline">プライバシーポリシー</a>に同意したものとみなします。
                </p>
              </form>
            )}

            {/* LP Link */}
            {!done && (
              <div className="mt-12 bg-pale-gray rounded-2xl border border-light-gray p-8 text-center">
                <p className="text-base font-bold text-charcoal mb-2">物件の収益シミュレーションをご希望ですか？</p>
                <p className="text-sm text-dark-gray mb-6">詳しい物件情報をご入力いただくと、個別の収益シミュレーションをお届けします。</p>
                <a
                  href="/lp#diagnostic"
                  className="group inline-flex items-center gap-2 bg-deep-teal/10 border-2 border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-white font-bold px-8 py-3 rounded-lg transition text-sm"
                >
                  無料診断フォームへ
                  <IconArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
                </a>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
