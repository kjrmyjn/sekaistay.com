import Link from 'next/link'
import { FLOW } from '@/content/home/copy'
import { IconArrowRight } from '@/components/Icons'
import { JP } from '@/components/JP'

export default function Flow() {
  return (
    <section className="bg-white">
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 section-xl">
        <div className="max-w-[720px] mb-12 md:mb-14">
          <div className="divider-teal mb-5" />
          <h2 className="heading-section text-charcoal mb-4 jp-keep">
            <JP>{FLOW.headline}</JP>
          </h2>
          <p className="text-body text-dark-gray jp-break">
            {FLOW.body}
          </p>
        </div>

        {/* Timeline */}
        <ol className="relative">
          {/* Vertical line on desktop only */}
          <div
            aria-hidden
            className="hidden md:block absolute left-[28px] top-3 bottom-3 w-px bg-light-gray"
          />

          <div className="space-y-6 md:space-y-8">
            {FLOW.steps.map((s, i) => (
              <li
                key={s.num}
                className="relative grid md:grid-cols-[56px_1fr] gap-4 md:gap-8 items-start"
              >
                {/* Step number bubble */}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-sekai-teal flex items-center justify-center">
                    <span className="text-[14px] font-bold text-sekai-teal font-mono">
                      {s.num}
                    </span>
                  </div>
                </div>

                <div className="bg-cloud-white md:bg-white rounded-card md:border md:border-light-gray p-5 md:p-6 md:lift">
                  <h3 className="heading-sub text-charcoal mb-2 jp-keep">
                    <JP>{s.title}</JP>
                  </h3>
                  <p className="text-body-sm text-dark-gray jp-break">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </div>
        </ol>

        <div className="mt-12 flex justify-center">
          <Link
            href={FLOW.cta.href}
            className="inline-flex items-center gap-2 bg-sekai-teal hover:bg-deep-teal text-white font-bold px-7 py-3.5 rounded-btn transition text-[15px]"
          >
            {FLOW.cta.label}
            <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
