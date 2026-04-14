import Link from 'next/link'
import { HERO } from '@/content/home/copy'
import { IconArrowRight, IconSparkle } from '@/components/Icons'

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Soft decorative gradient — non-intrusive */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, #E5F4F5 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1120px] mx-auto px-5 md:px-10 pt-14 pb-16 md:pt-24 md:pb-24">
        <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-14 items-start">
          {/* ── Left : headline + CTAs ── */}
          <div>
            <div className="eyebrow text-sekai-teal mb-5">
              Vacation Rental Management
            </div>

            <h1 className="heading-hero text-charcoal mb-6">
              {HERO.headline.line1}
              <br />
              {HERO.headline.line2}
            </h1>

            <p className="text-body text-dark-gray max-w-[560px] mb-8">
              {HERO.body}
            </p>

            {/* Stats — horizontal trust cluster */}
            <div className="flex flex-wrap gap-x-7 gap-y-3 mb-9">
              {HERO.stats.map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="text-[20px] font-bold text-sekai-teal leading-none">
                    {s.value}
                  </span>
                  <span className="text-[12px] text-dark-gray">{s.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Link
                href={HERO.primaryCta.href}
                className="inline-flex items-center justify-center gap-2 bg-sekai-teal hover:bg-deep-teal text-white font-bold px-7 py-3.5 rounded-btn transition text-[15px]"
              >
                {HERO.primaryCta.label}
                <IconArrowRight size={16} />
              </Link>
              <Link
                href={HERO.secondaryCta.href}
                className="inline-flex items-center justify-center bg-white border border-charcoal/20 text-charcoal hover:border-sekai-teal hover:text-sekai-teal font-bold px-7 py-3.5 rounded-btn transition text-[15px]"
              >
                {HERO.secondaryCta.label}
              </Link>
            </div>

            <Link
              href={HERO.textLink.href}
              className="inline-flex items-center gap-1.5 text-[14px] text-dark-gray hover:text-sekai-teal font-bold transition underline underline-offset-4 decoration-light-gray hover:decoration-sekai-teal"
            >
              {HERO.textLink.label}
              <IconArrowRight size={14} />
            </Link>
          </div>

          {/* ── Right : Simulation side card ── */}
          <aside className="md:sticky md:top-24">
            <div className="bg-white rounded-card border border-light-gray shadow-[0_8px_32px_rgba(22,123,129,0.08)] p-7 md:p-8 lift">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-teal-tint flex items-center justify-center">
                  <IconSparkle size={18} color="#167B81" />
                </div>
                <span className="eyebrow text-sekai-teal">Free · 3 min</span>
              </div>

              <h2 className="heading-sub text-charcoal mb-3">
                {HERO.sideCard.title}
              </h2>

              <p className="text-body-sm text-dark-gray mb-6">
                {HERO.sideCard.body}
              </p>

              {/* Preview "form" — non-functional visual */}
              <div className="space-y-2.5 mb-6">
                {['エリア', '物件タイプ', '部屋数'].map((f) => (
                  <div
                    key={f}
                    className="flex items-center justify-between bg-pale-gray/60 border border-light-gray rounded-btn px-4 py-2.5 text-[13px] text-dark-gray"
                  >
                    <span>{f}</span>
                    <span className="text-mid-gray">選択する</span>
                  </div>
                ))}
              </div>

              <Link
                href={HERO.sideCard.cta.href}
                className="w-full inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-deep-teal text-white font-bold py-3.5 rounded-btn transition text-[14px]"
              >
                {HERO.sideCard.cta.label}
                <IconArrowRight size={16} />
              </Link>

              <p className="text-[11px] text-mid-gray mt-4 text-center">
                登録不要・メール受取のみ
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
