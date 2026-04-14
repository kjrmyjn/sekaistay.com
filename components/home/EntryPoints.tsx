import Link from 'next/link'
import Image from 'next/image'
import { ENTRY } from '@/content/home/copy'
import { IMG } from '@/content/home/images'
import { IconArrowRight, IconCheckCircle, IconSparkle, IconChart } from '@/components/Icons'

const ICONS = {
  existing: IconCheckCircle,
  starting: IconSparkle,
  exploring: IconChart,
} as const

const IMAGES = {
  existing: IMG.entryExisting,
  starting: IMG.entryStarting,
  exploring: IMG.entryExploring,
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
          <p className="text-body text-dark-gray jp-break">
            {ENTRY.body}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {ENTRY.cards.map((c) => {
            const Icon = ICONS[c.id as keyof typeof ICONS]
            const img = IMAGES[c.id as keyof typeof IMAGES]
            return (
              <Link
                key={c.id}
                href={c.cta.href}
                className="group bg-white rounded-card border border-light-gray overflow-hidden flex flex-col lift hover:border-sekai-teal"
              >
                {/* Image banner */}
                <div className="relative h-40 md:h-44 overflow-hidden">
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
                        'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)',
                    }}
                  />
                  {/* Icon badge floating on image */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center">
                    <Icon size={18} color="#167B81" />
                  </div>
                  <span className="absolute bottom-4 left-4 eyebrow text-white">
                    {c.label}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <h3 className="heading-sub text-charcoal mb-3 jp-keep">
                    {c.title}
                  </h3>

                  <p className="text-body-sm text-dark-gray mb-5 flex-1 jp-break">
                    {c.body}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-sekai-teal group-hover:text-deep-teal transition">
                    {c.cta.label}
                    <IconArrowRight size={16} />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
