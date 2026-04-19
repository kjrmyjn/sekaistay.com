import Link from 'next/link'
import Image from 'next/image'
import { HERO } from '@/content/home/copy'
import { IMG } from '@/content/home/images'
import { IconArrowRight } from '@/components/Icons'
import { JP } from '@/components/JP'

export default function Hero() {
  return (
    <section className="relative bg-ivory overflow-hidden">
      {/* Soft editorial wash */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[640px] h-[640px] rounded-full opacity-60 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #E8F2F3 0%, transparent 70%)' }}
      />

      <div className="container-edit relative section-hero">
        {/* Chapter label */}
        <div className="chapter-marker">
          <span className="rule-teal-sm" />
          <span className="eyebrow">Chapter Ⅰ · Vacation Rental Management</span>
        </div>

        <div className="hero-grid">
          {/* ── Left : headline + CTAs ── */}
          <div className="min-w-0 relative z-10 anim-fade-up">
            <h1 className="heading-display text-ink mb-10 jp-keep">
              <JP>{HERO.headline.line1}</JP>
              <br />
              <span className="font-sans font-light text-sekai-teal">
                <JP>{HERO.headline.line2}</JP>
              </span>
            </h1>

            <div className="rule-thin mb-8 max-w-[520px]" />

            <p className="lead mb-8 jp-break">
              {HERO.body}
            </p>

            {/* Fee one-liner */}
            <div className="mb-10 max-w-[560px] border-l-2 border-sekai-teal pl-5 py-2">
              <p className="text-body-sm text-ink jp-break">
                業界水準の手数料<span className="font-medium">15〜25%</span>に対し、
                SEKAI STAY は<span className="font-medium text-sekai-teal"> 8%＋月5,000円／室</span>。
                最低契約期間なし・初期費用0円。
              </p>
            </div>

            {/* Stats — editorial serif */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 mb-6 border-y border-rule py-7">
              {HERO.stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-sans text-[clamp(1.75rem,3vw,2.25rem)] font-light text-ink leading-none">
                    {s.value}
                  </span>
                  <span className="eyebrow-mono text-mid-gray mt-2">{s.label}</span>
                </div>
              ))}
            </div>
            <p className="text-caption text-mid-gray mb-10 leading-relaxed">
              ※ レビュー平均は Airbnb / Booking.com 掲載の管理物件（2024-2025）の加重平均。運用支援期間は株式会社セカイチの宿泊・運営事業実績に基づきます。
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-4">
              <Link href={HERO.primaryCta.href} className="btn btn-primary group">
                {HERO.primaryCta.label}
                <IconArrowRight size={14} className="group-hover:translate-x-1 transition" />
              </Link>
              <Link href={HERO.secondaryCta.href} className="btn-link">
                {HERO.secondaryCta.label}
                <IconArrowRight size={12} />
              </Link>
            </div>

            <p className="text-caption text-mid-gray">
              入力3分 · 無料 · 営業連絡なし
            </p>

            <Link
              href={HERO.textLink.href}
              className="mt-6 inline-flex items-center gap-2 text-[13px] text-ink/60 hover:text-sekai-teal transition group"
            >
              <span className="font-sans">すでに運用中の方は</span>
              <span className="underline-grow">無料診断へ</span>
              <IconArrowRight size={12} className="group-hover:translate-x-1 transition" />
            </Link>
          </div>

          {/* ── Right : editorial figure ── */}
          <div className="relative min-w-0 anim-fade-up" style={{ animationDelay: '0.15s' }}>
            {/* Frame caption */}
            <p className="eyebrow-mono text-mid-gray mb-4">
              Plate No.01 — Managed Property, Kyoto
            </p>

            {/* Main image */}
            <div className="figure-frame relative aspect-[4/5] w-full">
              <Image
                src={IMG.heroMain.src}
                alt={IMG.heroMain.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 530px"
                quality={80}
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(7,58,62,0) 45%, rgba(7,58,62,0.28) 100%)',
                }}
              />
              <div className="absolute top-5 left-5 right-5 flex justify-between items-start text-ivory">
                <p className="eyebrow-mono !text-[10px] tracking-[0.24em]">SEKAI STAY</p>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-ivory">
                <p className="font-sans text-[42px] leading-none font-light">★ 4.8</p>
                <p className="text-caption text-ivory/80 mt-2 tracking-wider uppercase">
                  Guest review · Airbnb / Booking.com
                </p>
              </div>
            </div>

            {/* Side caption card */}
            <div className="mt-8 border border-rule bg-paper p-6 lift">
              <p className="chapter mb-3">A note from the editor</p>
              <p className="heading-sub text-ink mb-2 jp-keep">
                <JP>{HERO.sideCard.title}</JP>
              </p>
              <p className="text-body-sm text-dark-gray mb-5 jp-break">
                {HERO.sideCard.body}
              </p>
              <Link href={HERO.sideCard.cta.href} className="btn-link">
                {HERO.sideCard.cta.label}
                <IconArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Giant ghost wordmark — bottom ornament */}
      <div aria-hidden className="relative overflow-hidden border-t border-rule">
        <p
          className="font-sans text-ink/5 leading-none whitespace-nowrap select-none py-4 text-center"
          style={{ fontSize: 'clamp(3rem, 11vw, 9rem)', letterSpacing: '0.12em', fontWeight: 300 }}
        >
          SEKAI — STAY — VACATION — RENTAL
        </p>
      </div>
    </section>
  )
}
