import Link from 'next/link'
import Image from 'next/image'
import { HERO } from '@/content/home/copy'
import { IMG } from '@/content/home/images'
import { IconArrowRight, IconSparkle } from '@/components/Icons'
import { JP } from '@/components/JP'

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Soft warm glow — upper right */}
      <div
        aria-hidden
        className="absolute -top-40 right-[-12%] w-[520px] h-[520px] rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #E5F4F5 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1120px] mx-auto px-5 md:px-10 pt-12 pb-14 md:pt-20 md:pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          {/* ── Left : headline + CTAs ── */}
          <div className="min-w-0 relative z-10">
            <div className="eyebrow text-sekai-teal mb-5">
              Vacation Rental Management
            </div>

            <h1 className="heading-hero text-charcoal mb-6 jp-keep">
              <JP>{HERO.headline.line1}</JP>
              <br className="hidden sm:inline" />
              {' '}<JP>{HERO.headline.line2}</JP>
            </h1>

            <p className="text-body text-dark-gray max-w-[540px] mb-8 jp-break">
              {HERO.body}
            </p>

            {/* Stats — horizontal trust cluster */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-9">
              {HERO.stats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5 whitespace-nowrap">
                  <span className="text-[18px] font-bold text-sekai-teal leading-none">
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
                className="inline-flex items-center justify-center gap-2 bg-sekai-teal hover:bg-deep-teal text-white font-bold px-6 py-3.5 rounded-btn transition text-[15px] shadow-[0_4px_16px_rgba(37,157,163,0.25)]"
              >
                {HERO.primaryCta.label}
                <IconArrowRight size={16} />
              </Link>
              <Link
                href={HERO.secondaryCta.href}
                className="inline-flex items-center justify-center bg-white border border-charcoal/20 text-charcoal hover:border-sekai-teal hover:text-sekai-teal font-bold px-6 py-3.5 rounded-btn transition text-[15px]"
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

          {/* ── Right : Property image + contained sim card ── */}
          <div className="relative min-w-0">
            {/* Main property image */}
            <div className="relative aspect-[4/5] w-full rounded-[20px] overflow-hidden">
              <Image
                src={IMG.heroMain.src}
                alt={IMG.heroMain.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Subtle teal tint overlay */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(22,123,129,0) 40%, rgba(22,123,129,0.22) 100%)',
                }}
              />
              {/* Reviewed badge */}
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
                <span className="text-[16px] font-bold text-sekai-teal leading-none">
                  ★ 4.8
                </span>
                <span className="text-[11px] text-dark-gray">管理物件レビュー平均</span>
              </div>
            </div>

            {/* Sim card — contained within right column, overlaps bottom at lg */}
            <div className="mt-5 lg:mt-0 lg:absolute lg:-bottom-14 lg:left-6 lg:right-6 bg-white rounded-card border border-light-gray shadow-[0_12px_40px_rgba(22,123,129,0.14)] p-5 lift">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-tint flex items-center justify-center flex-shrink-0 mt-0.5">
                  <IconSparkle size={18} color="#167B81" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="eyebrow text-sekai-teal">Free · 3 min</span>
                  </div>
                  <h2 className="text-[15px] font-bold text-charcoal mb-1 leading-snug jp-keep">
                    <JP>{HERO.sideCard.title}</JP>
                  </h2>
                  <p className="text-[12px] text-dark-gray leading-relaxed jp-break">
                    {HERO.sideCard.body}
                  </p>
                </div>
              </div>
              <Link
                href={HERO.sideCard.cta.href}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-deep-teal text-white font-bold py-2.5 rounded-btn transition text-[13px]"
              >
                {HERO.sideCard.cta.label}
                <IconArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
