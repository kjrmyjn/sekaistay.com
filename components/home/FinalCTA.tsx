import Link from 'next/link'
import { FINAL_CTA } from '@/content/home/copy'
import { IconArrowRight } from '@/components/Icons'

export default function FinalCTA() {
  return (
    <section className="relative bg-deep-teal text-white overflow-hidden">
      {/* Background subtle pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(600px circle at 20% 30%, rgba(84,190,195,0.35), transparent 50%), radial-gradient(500px circle at 80% 70%, rgba(229,244,245,0.2), transparent 50%)',
        }}
      />

      <div className="relative max-w-[880px] mx-auto px-5 md:px-10 section-xl text-center">
        <div className="eyebrow text-bright-teal mb-5 flex justify-center">
          Start Here
        </div>
        <h2 className="heading-hero text-white mb-6">
          {FINAL_CTA.headline}
        </h2>
        <p className="text-body text-white/80 mb-10 max-w-[640px] mx-auto">
          {FINAL_CTA.body}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
          <Link
            href={FINAL_CTA.primaryCta.href}
            className="inline-flex items-center justify-center gap-2 bg-white text-deep-teal hover:bg-teal-tint font-bold px-7 py-3.5 rounded-btn transition text-[15px]"
          >
            {FINAL_CTA.primaryCta.label}
            <IconArrowRight size={16} />
          </Link>
          <Link
            href={FINAL_CTA.secondaryCta.href}
            className="inline-flex items-center justify-center bg-transparent border border-white/40 text-white hover:bg-white/10 font-bold px-7 py-3.5 rounded-btn transition text-[15px]"
          >
            {FINAL_CTA.secondaryCta.label}
          </Link>
        </div>

        <Link
          href={FINAL_CTA.textLink.href}
          className="inline-flex items-center gap-1.5 text-[14px] text-white/80 hover:text-white font-bold transition underline underline-offset-4 decoration-white/30 hover:decoration-white"
        >
          {FINAL_CTA.textLink.label}
          <IconArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}
