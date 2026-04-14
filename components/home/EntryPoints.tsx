import Link from 'next/link'
import { ENTRY } from '@/content/home/copy'
import { IconArrowRight, IconCheckCircle, IconSparkle, IconChart } from '@/components/Icons'

const ICONS = {
  existing: IconCheckCircle,
  starting: IconSparkle,
  exploring: IconChart,
} as const

export default function EntryPoints() {
  return (
    <section className="bg-cloud-white">
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 section-lg">
        <div className="max-w-[720px] mb-12 md:mb-14">
          <div className="divider-teal mb-5" />
          <h2 className="heading-section text-charcoal mb-4">
            {ENTRY.headline}
          </h2>
          <p className="text-body text-dark-gray">
            {ENTRY.body}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {ENTRY.cards.map((c) => {
            const Icon = ICONS[c.id as keyof typeof ICONS]
            return (
              <Link
                key={c.id}
                href={c.cta.href}
                className="group bg-white rounded-card border border-light-gray p-7 md:p-8 flex flex-col lift hover:border-sekai-teal card-accent"
              >
                <div className="w-11 h-11 rounded-full bg-teal-tint flex items-center justify-center mb-5 group-hover:bg-sekai-teal transition-colors">
                  <Icon size={20} color="#167B81" className="group-hover:[&_*]:stroke-white" />
                </div>

                <div className="eyebrow text-mid-gray mb-3">{c.label}</div>

                <h3 className="heading-sub text-charcoal mb-3">
                  {c.title}
                </h3>

                <p className="text-body-sm text-dark-gray mb-6 flex-1">
                  {c.body}
                </p>

                <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-sekai-teal group-hover:text-deep-teal transition">
                  {c.cta.label}
                  <IconArrowRight size={16} />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
