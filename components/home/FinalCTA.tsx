import Link from 'next/link'
import Image from 'next/image'
import { FINAL_CTA } from '@/content/home/copy'
import { IMG } from '@/content/home/images'
import { IconArrowRight } from '@/components/Icons'

export default function FinalCTA() {
  return (
    <section className="relative text-white overflow-hidden">
      {/* Background image */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src={IMG.finalCta.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* Gradient scrim — deep-teal rich, keeps text legible */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(22,123,129,0.95) 0%, rgba(22,123,129,0.85) 50%, rgba(45,45,45,0.88) 100%)',
        }}
      />
      {/* Accent radial glows */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(600px circle at 20% 30%, rgba(84,190,195,0.35), transparent 50%), radial-gradient(500px circle at 80% 70%, rgba(229,244,245,0.15), transparent 50%)',
        }}
      />

      <div className="relative max-w-[880px] mx-auto px-5 md:px-10 section-xl text-center">
        <div className="eyebrow text-bright-teal mb-5 flex justify-center">
          Start Here
        </div>
        <h2 className="heading-hero text-white mb-6 jp-keep">
          {FINAL_CTA.headline}
        </h2>
        <p className="text-body text-white/85 mb-10 max-w-[640px] mx-auto jp-break">
          {FINAL_CTA.body}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
          <Link
            href={FINAL_CTA.primaryCta.href}
            className="inline-flex items-center justify-center gap-2 bg-white text-deep-teal hover:bg-teal-tint font-bold px-7 py-3.5 rounded-btn transition text-[15px] shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
          >
            {FINAL_CTA.primaryCta.label}
            <IconArrowRight size={16} />
          </Link>
          <Link
            href={FINAL_CTA.secondaryCta.href}
            className="inline-flex items-center justify-center bg-transparent border border-white/40 text-white hover:bg-white/10 font-bold px-7 py-3.5 rounded-btn transition text-[15px] backdrop-blur-sm"
          >
            {FINAL_CTA.secondaryCta.label}
          </Link>
        </div>

        <Link
          href={FINAL_CTA.textLink.href}
          className="inline-flex items-center gap-1.5 text-[14px] text-white/85 hover:text-white font-bold transition underline underline-offset-4 decoration-white/30 hover:decoration-white"
        >
          {FINAL_CTA.textLink.label}
          <IconArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}
