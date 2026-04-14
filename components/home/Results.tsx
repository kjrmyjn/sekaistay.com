import Link from 'next/link'
import Image from 'next/image'
import { RESULTS } from '@/content/home/copy'
import { IMG } from '@/content/home/images'
import { IconArrowRight } from '@/components/Icons'

const CASE_IMGS = [IMG.caseNojiri, IMG.caseKyoto, IMG.caseNew]

export default function Results() {
  return (
    <section className="bg-white">
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 section-xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
          <div className="max-w-[640px]">
            <div className="eyebrow text-sekai-teal mb-4">Case Studies</div>
            <h2 className="heading-section text-charcoal mb-4 jp-keep">
              {RESULTS.headline}
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
                        'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)',
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] font-mono font-bold text-deep-teal">
                    CASE {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-[16px] md:text-[17px] font-bold text-white jp-keep leading-snug">
                      {c.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 md:p-7 flex flex-col flex-1">
                  {/* Metrics */}
                  <div className="space-y-3 mb-5 pb-5 border-b border-pale-gray">
                    {c.metrics.map((m, i) => (
                      <div key={i} className="min-w-0">
                        <div className="text-[11px] text-dark-gray mb-1">
                          {m.label}
                        </div>
                        {m.from ? (
                          <div className="flex items-baseline gap-2 text-charcoal flex-wrap">
                            <span className="text-[14px] text-mid-gray line-through">
                              {m.from}
                            </span>
                            <IconArrowRight size={12} color="#259DA3" />
                            <span className="text-[18px] font-bold text-sekai-teal">
                              {m.to}
                            </span>
                          </div>
                        ) : (
                          <div className="text-[14px] font-bold text-charcoal jp-keep">
                            {m.to}
                          </div>
                        )}
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
