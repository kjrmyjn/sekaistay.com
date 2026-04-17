import Link from 'next/link'
import Image from 'next/image'
import { RESULTS } from '@/content/home/copy'
import { IMG } from '@/content/home/images'
import { IconArrowRight } from '@/components/Icons'
import { JP } from '@/components/JP'

const CASE_IMGS = [IMG.caseNojiri, IMG.caseKyoto, IMG.caseNew]

export default function Results() {
  return (
    <section className="bg-white">
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 section-xl">
        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
          <div className="max-w-[640px]">
            <div className="eyebrow text-sekai-teal mb-4">Case Studies</div>
            <h2 className="heading-section text-charcoal mb-4 jp-keep">
              <JP>{RESULTS.headline}</JP>
            </h2>
            <p className="text-body text-dark-gray jp-break">
              {RESULTS.body}
            </p>
          </div>

          <Link
            href={RESULTS.cta.href}
            className="hidden md:inline-flex items-center gap-1.5 text-[14px] font-bold text-sekai-teal hover:text-deep-teal transition flex-shrink-0"
          >
            {RESULTS.cta.label}
            <IconArrowRight size={16} />
          </Link>
        </div>

        {/* ── Summary strip ── */}
        <div className="bg-gradient-to-br from-teal-tint to-cloud-white rounded-card border border-light-gray p-4 sm:p-6 md:p-8 mb-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
            {RESULTS.summary.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col min-w-0 ${
                  i > 0 ? 'md:border-l md:border-light-gray md:pl-5' : 'md:pl-0'
                }`}
              >
                <div className="flex items-baseline gap-0.5 mb-1">
                  <span className="text-[26px] sm:text-[32px] md:text-[40px] font-bold text-deep-teal leading-none tracking-tight">
                    {s.value}
                  </span>
                  {s.unit && (
                    <span className="text-[12px] sm:text-[14px] md:text-[16px] font-bold text-sekai-teal">
                      {s.unit}
                    </span>
                  )}
                </div>
                <span className="text-[11px] md:text-[12px] text-dark-gray leading-snug jp-keep">
                  <JP>{s.label}</JP>
                </span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[11px] text-mid-gray mb-8 md:mb-10 leading-relaxed jp-break">
          {RESULTS.summarySource}
        </p>

        {/* ── Case cards ── */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {RESULTS.cases.map((c, idx) => {
            const img = CASE_IMGS[idx]
            return (
              <article
                key={idx}
                className="bg-white rounded-card border border-light-gray overflow-hidden lift flex flex-col group"
              >
                {/* Property image */}
                <div className="relative h-48 md:h-52 overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.65) 100%)',
                    }}
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] font-mono font-bold text-deep-teal">
                      CASE {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="bg-deep-teal/85 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] font-bold text-white">
                      {c.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-[16px] md:text-[17px] font-bold text-white jp-keep leading-snug">
                      <JP>{c.title}</JP>
                    </h3>
                  </div>
                </div>

                <div className="p-4 sm:p-6 md:p-7 flex flex-col flex-1">
                  {/* Metrics with visual bars */}
                  <div className="space-y-4 mb-5 pb-5 border-b border-pale-gray">
                    {c.metrics.map((m, i) => (
                      <div key={i} className="min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[11px] font-bold text-dark-gray">
                            {m.label}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-sekai-teal bg-teal-tint rounded-full px-2 py-0.5">
                            {m.delta}
                          </span>
                        </div>

                        {m.from ? (
                          <div className="flex items-baseline gap-1.5 sm:gap-2 text-charcoal flex-wrap mb-2">
                            <span className="text-[12px] sm:text-[13px] text-mid-gray line-through">
                              {m.from}
                            </span>
                            <IconArrowRight size={11} color="#259DA3" />
                            <span className="text-[15px] sm:text-[17px] md:text-[18px] font-bold text-deep-teal leading-none">
                              {m.to}
                            </span>
                          </div>
                        ) : (
                          <div className="text-[15px] font-bold text-deep-teal jp-keep mb-2">
                            {m.to}
                          </div>
                        )}

                        {/* Progress bar */}
                        <div className="h-1.5 bg-pale-gray rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-sekai-teal to-bright-teal rounded-full transition-all"
                            style={{ width: `${m.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-body-sm text-dark-gray jp-break">
                    {c.body}
                  </p>
                </div>
              </article>
            )
          })}
        </div>

        {/* ── Note + mobile CTA ── */}
        <p className="mt-6 text-[11px] text-mid-gray leading-relaxed jp-break">
          {RESULTS.ctaNote}
        </p>

        <div className="mt-6 md:hidden">
          <Link
            href={RESULTS.cta.href}
            className="inline-flex items-center gap-1.5 text-[14px] font-bold text-sekai-teal"
          >
            {RESULTS.cta.label}
            <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
