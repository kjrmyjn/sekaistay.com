import Link from 'next/link'
import { NAV_CARDS } from '@/content/home/copy'
import { JP } from '@/components/JP'
import { IconArrowRight } from '@/components/Icons'

export default function NavCards() {
  return (
    <section className="bg-ivory">
      <div className="container-edit section-xl">
        {/* Header */}
        <div className="heading-mb">
          <div className="chapter-marker">
            <span className="rule-teal-sm" />
            <span className="eyebrow">{NAV_CARDS.eyebrow}</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end">
            <h2 className="heading-hero text-ink jp-keep">
              <JP>{NAV_CARDS.headline}</JP>
            </h2>
            <p className="lead text-dark-gray jp-break">
              {NAV_CARDS.body}
            </p>
          </div>
        </div>

        {/* 3 cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {NAV_CARDS.cards.map((c, idx) => (
            <Link
              key={idx}
              href={c.cta.href}
              className="group bg-paper border border-rule hover:border-ink p-8 md:p-10 flex flex-col transition"
            >
              <p className="eyebrow-mono text-sekai-teal mb-5">{c.eyebrow}</p>
              <h3 className="font-sans font-medium text-[22px] md:text-[24px] text-ink mb-4 jp-keep leading-snug">
                <JP>{c.title}</JP>
              </h3>
              <p className="text-body-sm text-dark-gray jp-break mb-8 flex-1">
                {c.body}
              </p>
              <span className="inline-flex items-center gap-2 text-[13px] text-ink group-hover:text-sekai-teal transition">
                {c.cta.label}
                <IconArrowRight size={12} className="group-hover:translate-x-1 transition" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
