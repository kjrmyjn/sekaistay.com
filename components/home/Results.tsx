import Link from 'next/link'
import { RESULTS } from '@/content/home/copy'
import { IconArrowRight } from '@/components/Icons'

export default function Results() {
  return (
    <section className="bg-white">
      <div className="max-w-[1120px] mx-auto px-5 md:px-10 section-xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
          <div className="max-w-[640px]">
            <div className="eyebrow text-sekai-teal mb-4">Case Studies</div>
            <h2 className="heading-section text-charcoal mb-4">
              {RESULTS.headline}
            </h2>
            <p className="text-body text-dark-gray">
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

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {RESULTS.cases.map((c, idx) => (
            <article
              key={idx}
              className="bg-white rounded-card border border-light-gray overflow-hidden lift flex flex-col"
            >
              {/* Visual header — gradient placeholder with case number */}
              <div
                className="h-32 md:h-36 relative flex items-end p-5"
                style={{
                  background:
                    idx === 0
                      ? 'linear-gradient(135deg, #167B81 0%, #259DA3 100%)'
                      : idx === 1
                      ? 'linear-gradient(135deg, #259DA3 0%, #54BEC3 100%)'
                      : 'linear-gradient(135deg, #2D2D2D 0%, #167B81 100%)',
                }}
              >
                <span className="text-white/90 text-[11px] font-mono tracking-wider">
                  CASE {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="p-6 md:p-7 flex flex-col flex-1">
                <h3 className="heading-sub text-charcoal mb-4">
                  {c.title}
                </h3>

                {/* Metrics */}
                <div className="space-y-3 mb-5 pb-5 border-b border-pale-gray">
                  {c.metrics.map((m, i) => (
                    <div key={i}>
                      <div className="text-[11px] text-dark-gray mb-1">
                        {m.label}
                      </div>
                      {m.from ? (
                        <div className="flex items-baseline gap-2 text-charcoal">
                          <span className="text-[14px] text-mid-gray line-through">
                            {m.from}
                          </span>
                          <IconArrowRight size={12} color="#259DA3" />
                          <span className="text-[18px] font-bold text-sekai-teal">
                            {m.to}
                          </span>
                        </div>
                      ) : (
                        <div className="text-[15px] font-bold text-charcoal">
                          {m.to}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-body-sm text-dark-gray">
                  {c.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 md:hidden">
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
