import Link from 'next/link'
import { PRICING } from '@/content/home/copy'
import { IconArrowRight, IconCheck } from '@/components/Icons'
import { JP } from '@/components/JP'

export default function Pricing() {
  return (
    <section className="bg-cloud-white">
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 section-xl">
        {/* ── Section header ── */}
        <div className="max-w-[720px] mb-12 md:mb-14">
          <div className="eyebrow text-sekai-teal mb-4">Pricing</div>
          <h2 className="heading-section text-charcoal mb-4 jp-keep">
            <JP>{PRICING.headline}</JP>
          </h2>
          <p className="text-body text-dark-gray jp-break">
            {PRICING.body}
          </p>
        </div>

        {/* ── Main plan card ── */}
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-5 md:gap-6">
          {/* Left: Hero price card (teal) */}
          <div className="relative bg-gradient-to-br from-deep-teal to-sekai-teal rounded-card p-7 md:p-9 text-white overflow-hidden flex flex-col">
            {/* Subtle radial glow */}
            <div
              aria-hidden
              className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-30 blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(229,244,245,0.8), transparent 70%)' }}
            />

            <div className="relative flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 text-white">
                  {PRICING.plan.badge}
                </span>
                <span className="text-[10px] font-mono text-white/60">01 / 01</span>
              </div>

              <h3 className="text-[18px] md:text-[19px] font-bold mb-6 jp-keep leading-snug">
                <JP>{PRICING.plan.title}</JP>
              </h3>

              <div className="mb-2">
                <div className="text-[12px] text-white/75 mb-2">
                  {PRICING.plan.feeLabel}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[72px] md:text-[88px] font-bold leading-none tracking-tight">
                    {PRICING.plan.feeValue}
                  </span>
                  <span className="text-[32px] md:text-[40px] font-bold leading-none">
                    {PRICING.plan.feeUnit}
                  </span>
                  <span className="text-[12px] text-white/75 ml-1">
                    {PRICING.plan.feeSub}
                  </span>
                </div>
              </div>

              <div className="text-[12px] text-white/70 mb-6">
                {PRICING.plan.compare}
              </div>

              {/* Comparison visual */}
              <div className="bg-white/10 backdrop-blur-sm rounded-btn p-4 mb-6">
                <div className="text-[11px] text-white/75 mb-3">
                  {PRICING.comparison.label}
                </div>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-[12px] font-bold text-white">
                        {PRICING.comparison.sekai.label}
                      </span>
                      <span className="text-[16px] font-bold text-white">
                        {PRICING.comparison.sekai.value}
                      </span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-[35%] bg-white rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-[12px] text-white/75">
                        {PRICING.comparison.industry.label}
                      </span>
                      <span className="text-[14px] font-bold text-white/75">
                        {PRICING.comparison.industry.value}
                      </span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-white/45 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[12px] text-white/65 mt-auto leading-relaxed">
                {PRICING.comparison.note}
              </p>
            </div>
          </div>

          {/* Right: Details breakdown */}
          <div className="bg-white rounded-card border border-light-gray p-7 md:p-9 flex flex-col">
            <div className="eyebrow text-sekai-teal mb-4">Plan Details</div>
            <h3 className="text-[17px] font-bold text-charcoal mb-5 jp-keep">
              <JP>料金の内訳と、含まれているもの</JP>
            </h3>

            {/* Line items */}
            <div className="divide-y divide-pale-gray mb-6">
              {PRICING.lines.map((line) => (
                <div key={line.label} className="py-3 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[13px] text-dark-gray mb-0.5">
                      {line.label}
                    </div>
                    <div className="text-[11px] text-mid-gray">
                      {line.note}
                    </div>
                  </div>
                  <div className="text-[15px] font-bold text-charcoal text-right whitespace-nowrap flex-shrink-0">
                    {line.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Included services */}
            <div className="bg-cloud-white rounded-btn p-5 mb-6">
              <div className="text-[12px] font-bold text-charcoal mb-3">
                {PRICING.included.title}
              </div>
              <ul className="space-y-2">
                {PRICING.included.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] text-charcoal">
                    <span className="flex-shrink-0 w-4 h-4 mt-0.5 rounded-full bg-teal-tint flex items-center justify-center">
                      <IconCheck size={10} color="#167B81" />
                    </span>
                    <span className="jp-break">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[12px] text-dark-gray mb-5 leading-relaxed jp-break">
              {PRICING.note}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <Link
                href={PRICING.cta.href}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-sekai-teal hover:bg-deep-teal text-white font-bold py-3.5 rounded-btn transition text-[14px]"
              >
                {PRICING.cta.label}
                <IconArrowRight size={16} />
              </Link>
              <Link
                href={PRICING.ctaSecondary.href}
                className="flex-1 inline-flex items-center justify-center bg-white border border-charcoal/20 text-charcoal hover:border-sekai-teal hover:text-sekai-teal font-bold py-3.5 rounded-btn transition text-[14px]"
              >
                {PRICING.ctaSecondary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
