import { ECOSYSTEM } from '@/content/home/copy'
import {
  IconBuilding,
  IconGlobe,
  IconSparkle,
  IconChart,
  IconTV,
} from '@/components/Icons'

const PILLAR_ICONS = [IconChart, IconSparkle, IconTV, IconGlobe]

export default function Ecosystem() {
  return (
    <section className="bg-white">
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 section-xl">
        {/* ── Section header ── */}
        <div className="max-w-[720px] mb-12 md:mb-16">
          <div className="eyebrow text-sekai-teal mb-4">{ECOSYSTEM.eyebrow}</div>
          <h2 className="heading-section text-charcoal mb-5">
            {ECOSYSTEM.headline.line1}
            <br className="hidden sm:inline" />
            {ECOSYSTEM.headline.line2}
          </h2>
          <p className="text-body text-dark-gray">{ECOSYSTEM.body}</p>
        </div>

        {/* ── Block 1 : Hospitality / F&B ── */}
        <div className="relative rounded-card overflow-hidden bg-gradient-to-br from-teal-tint to-cloud-white border border-light-gray mb-6 md:mb-8">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-0">
            {/* Left: copy */}
            <div className="p-7 md:p-10 lg:p-12">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-light-gray">
                  <IconBuilding size={16} color="#167B81" />
                </div>
                <span className="eyebrow text-sekai-teal">
                  {ECOSYSTEM.hospitality.label}
                </span>
              </div>

              <h3 className="heading-sub text-charcoal mb-4">
                {ECOSYSTEM.hospitality.title}
              </h3>

              <p className="text-body text-dark-gray mb-4">
                {ECOSYSTEM.hospitality.body}
              </p>

              <p className="text-body-sm text-charcoal font-bold border-l-2 border-sekai-teal pl-4">
                {ECOSYSTEM.hospitality.supporting}
              </p>
            </div>

            {/* Right: spot list (visual anchor) */}
            <div className="bg-white/60 backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-light-gray p-7 md:p-10 lg:p-10">
              <div className="eyebrow text-dark-gray mb-5">Operating Spots</div>
              <ul className="space-y-4">
                {ECOSYSTEM.hospitality.spots.map((s) => (
                  <li
                    key={s.name}
                    className="flex items-start justify-between gap-3 pb-4 border-b border-light-gray last:border-b-0 last:pb-0"
                  >
                    <span className="text-[14px] font-bold text-charcoal">
                      {s.name}
                    </span>
                    <span className="text-[12px] text-dark-gray flex-shrink-0">
                      {s.area}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Block 2 : Media & Creative ── */}
        <div className="rounded-card overflow-hidden border border-light-gray">
          {/* Heading band */}
          <div className="bg-charcoal text-white p-7 md:p-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <IconGlobe size={16} color="#54BEC3" />
              </div>
              <span className="eyebrow text-bright-teal">
                {ECOSYSTEM.media.label}
              </span>
            </div>

            <h3 className="heading-sub text-white mb-4 max-w-[620px]">
              {ECOSYSTEM.media.title}
            </h3>

            <p className="text-body text-white/75 max-w-[720px]">
              {ECOSYSTEM.media.body}
            </p>
          </div>

          {/* Pillars grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 bg-light-gray gap-px">
            {ECOSYSTEM.media.pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i]
              return (
                <div
                  key={p.title}
                  className="bg-white p-6 md:p-7 flex flex-col"
                >
                  <div className="w-10 h-10 rounded-full bg-teal-tint flex items-center justify-center mb-4">
                    <Icon size={18} color="#167B81" />
                  </div>

                  <h4 className="text-[15px] font-bold text-charcoal mb-3 leading-snug">
                    {p.title}
                  </h4>

                  <p className="text-body-sm text-dark-gray">
                    {p.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
