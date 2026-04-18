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

            <p className="text-body text-dark-gray max-w-[540px] mb-5 jp-break">
              {HERO.body}
            </p>

            {/* ── 他社比較1行（AEO / 信頼の即提示） ── */}
            <div className="mb-8 max-w-[540px] rounded-card border border-light-gray bg-cloud-white px-3 py-2.5 sm:px-4 sm:py-3">
              <p className="text-[11.5px] sm:text-[12.5px] text-charcoal leading-relaxed jp-break">
                一般的な運用代行の手数料<span className="font-bold">15〜25%</span> に対し、
                SEKAI STAY は<span className="font-bold text-sekai-teal">8%＋月5,000円/室</span>。
                最低契約期間なし、初期費用0円。
              </p>
            </div>

            {/* Stats — horizontal trust cluster */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-3 mb-2">
              {HERO.stats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="text-[16px] sm:text-[18px] font-bold text-sekai-teal leading-none">
                    {s.value}
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-dark-gray">{s.label}</span>
                </div>
              ))}
            </div>
            <p className="text-[10.5px] text-mid-gray mb-9 leading-relaxed">
              ※ レビュー平均は Airbnb / Booking.com 掲載の管理物件（2024-2025）の加重平均。運用支援期間は株式会社セカイチの宿泊・運営事業実績に基づきます。
            </p>

            {/* CTAs — 階層：①試算が最速導線 / ②相談で深掘り / ③診断はテキスト */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
              <Link
                href={HERO.primaryCta.href}
                className="group inline-flex items-center justify-center gap-2 bg-sekai-teal hover:bg-deep-teal text-white font-bold px-7 py-4 rounded-btn transition text-[15.5px] shadow-[0_10px_28px_rgba(22,123,129,0.28)] hover:shadow-[0_14px_36px_rgba(22,123,129,0.38)]"
              >
                {HERO.primaryCta.label}
                <IconArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
              </Link>
              <Link
                href={HERO.secondaryCta.href}
                className="inline-flex items-center justify-center text-charcoal/80 hover:text-sekai-teal font-bold px-3 py-2 transition text-[14.5px] underline underline-offset-4 decoration-charcoal/20 hover:decoration-sekai-teal"
              >
                {HERO.secondaryCta.label}
              </Link>
            </div>

            <p className="text-[12.5px] text-dark-gray mb-4 leading-relaxed">
              入力3分・無料・営業連絡なし。迷ったら、まず「収益シミュレーション」から。
            </p>

            <Link
              href={HERO.textLink.href}
              className="inline-flex items-center gap-1.5 text-[13px] text-mid-gray hover:text-sekai-teal transition"
            >
              すでに運用中の方は、無料診断へ
              <IconArrowRight size={12} />
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
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 530px"
                quality={75}
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
              {/* Reviewed badge — 出典付き */}
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-sm max-w-[200px] sm:max-w-[220px]">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[16px] font-bold text-sekai-teal leading-none">
                    ★ 4.8
                  </span>
                  <span className="text-[11px] text-dark-gray leading-none">管理物件レビュー平均</span>
                </div>
                <p className="text-[9.5px] text-mid-gray leading-tight">
                  Airbnb / Booking.com 掲載物件／2024-2025
                </p>
              </div>
            </div>

            {/* Sim card — contained within right column, overlaps bottom at lg */}
            <div className="mt-5 lg:mt-0 lg:absolute lg:-bottom-14 lg:left-6 lg:right-6 bg-white rounded-card border border-light-gray shadow-[0_12px_40px_rgba(22,123,129,0.14)] p-4 sm:p-5 lift">
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
