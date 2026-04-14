import { VALUE } from '@/content/home/copy'

export default function ValueProp() {
  return (
    <section className="bg-cloud-white">
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 section-xl">
        <div className="max-w-[780px] mb-12 md:mb-16">
          <div className="divider-teal mb-5" />
          <h2 className="heading-section text-charcoal mb-5">
            {VALUE.headline}
          </h2>
          <p className="text-body text-dark-gray">
            {VALUE.body}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {VALUE.items.map((item) => (
            <div
              key={item.number}
              className="relative bg-white rounded-card border border-light-gray p-7 md:p-8"
            >
              <div className="flex items-baseline gap-3 mb-5">
                <span className="stat-number text-sekai-teal leading-none">
                  {item.number}
                </span>
                <span className="h-px flex-1 bg-light-gray" />
              </div>

              <h3 className="heading-sub text-charcoal mb-3">
                {item.title}
              </h3>

              <p className="text-body-sm text-dark-gray">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
