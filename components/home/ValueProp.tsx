import Image from 'next/image'
import { VALUE } from '@/content/home/copy'
import { IMG } from '@/content/home/images'

export default function ValueProp() {
  return (
    <section className="bg-cloud-white">
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 section-xl">
        <div className="grid lg:grid-cols-[0.42fr_0.58fr] gap-8 md:gap-12 mb-12 md:mb-16 items-end">
          <div>
            <div className="divider-teal mb-5" />
            <h2 className="heading-section text-charcoal jp-keep">
              {VALUE.headline}
            </h2>
          </div>
          <p className="text-body text-dark-gray jp-break">
            {VALUE.body}
          </p>
        </div>

        {/* Asymmetric layout: visual left, items right */}
        <div className="grid lg:grid-cols-[0.42fr_0.58fr] gap-8 md:gap-12">
          <div className="relative lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[4/5] rounded-card overflow-hidden">
              <Image
                src={IMG.valueAccent.src}
                alt={IMG.valueAccent.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              {/* Bottom gradient */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-32"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(22,123,129,0) 0%, rgba(22,123,129,0.7) 100%)',
                }}
              />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="eyebrow text-white/90 mb-1">Not just Management</div>
                <div className="text-[18px] font-bold text-white leading-snug">
                  宿は、設計で伸びる。
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-5">
            {VALUE.items.map((item) => (
              <article
                key={item.number}
                className="bg-white rounded-card border border-light-gray p-6 md:p-8"
              >
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-[22px] font-bold text-sekai-teal font-mono leading-none">
                    {item.number}
                  </span>
                  <span className="h-px flex-1 bg-light-gray" />
                </div>

                <h3 className="heading-sub text-charcoal mb-3 jp-keep">
                  {item.title}
                </h3>

                <p className="text-body-sm text-dark-gray jp-break">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
