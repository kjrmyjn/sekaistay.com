import Image from 'next/image'
import { ECOSYSTEM } from '@/content/home/copy'
import { IMG } from '@/content/home/images'
import {
  IconBuilding,
  IconGlobe,
  IconSparkle,
  IconChart,
  IconTV,
} from '@/components/Icons'

const SPOT_IMGS = [IMG.fbNojiri, IMG.fbKyoto, IMG.fbAmbient]
const PILLAR_ICONS = [IconChart, IconSparkle, IconTV, IconGlobe]

export default function Ecosystem() {
  return (
    <section className="bg-white">
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 section-xl">
        {/* ── Section header ── */}
        <div className="max-w-[720px] mb-12 md:mb-16">
          <div className="eyebrow text-sekai-teal mb-4">{ECOSYSTEM.eyebrow}</div>
          <h2 className="heading-section text-charcoal mb-5 jp-keep">
            {ECOSYSTEM.headline.line1}
            <br className="hidden sm:inline" />
            {ECOSYSTEM.headline.line2}
          </h2>
          <p className="text-body text-dark-gray jp-break">{ECOSYSTEM.body}</p>
        </div>

        {/* ── Block 1 : Hospitality / F&B ── */}
        <div className="relative rounded-card overflow-hidden border border-light-gray mb-6 md:mb-8 bg-cloud-white">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-0">
            {/* Left: copy */}
            <div className="p-7 md:p-10 lg:p-12 order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-light-gray">
                  <IconBuilding size={16} color="#167B81" />
                </div>
                <span className="eyebrow text-sekai-teal">
                  {ECOSYSTEM.hospitality.label}
                </span>
              </div>

              <h3 className="heading-sub text-charcoal mb-4 jp-keep">
                {ECOSYSTEM.hospitality.title}
              </h3>

              <p className="text-body text-dark-gray mb-4 jp-break">
                {ECOSYSTEM.hospitality.body}
              </p>

              <p className="text-body-sm text-charcoal font-bold border-l-2 border-sekai-teal pl-4 jp-break">
                {ECOSYSTEM.hospitality.supporting}
              </p>
            </div>

            {/* Right: photo grid of spots */}
            <div className="order-1 lg:order-2 relative bg-charcoal min-h-[320px] lg:min-h-[480px]">
              <div className="grid grid-cols-2 grid-rows-2 h-full gap-0">
                {/* Large spot */}
                <div className="relative row-span-2 overflow-hidden">
                  <Image
                    src={IMG.fbNojiri.src}
                    alt={IMG.fbNojiri.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)',
                    }}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-[10px] text-white/75 font-mono mb-0.5">SPOT 01</div>
                    <div className="text-[14px] font-bold text-white">The World Cafe</div>
                    <div className="text-[11px] text-white/80">長野・野尻湖</div>
                  </div>
                </div>
                {/* Small spot 1 */}
                <div className="relative overflow-hidden">
                  <Image
                    src={IMG.fbKyoto.src}
                    alt={IMG.fbKyoto.alt}
                    fill
                    sizes="(max-width: 1024px) 25vw, 15vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)',
                    }}
                  />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-[10px] text-white/75 font-mono mb-0.5">SPOT 02</div>
                    <div className="text-[12px] font-bold text-white">Kyoto F&amp;B</div>
                    <div className="text-[10px] text-white/80">京都</div>
                  </div>
                </div>
                {/* Small spot 2 */}
                <div className="relative overflow-hidden bg-deep-teal">
                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    <div className="text-[10px] text-white/75 font-mono">SPOT 03+</div>
                    <div>
                      <div className="text-[12px] font-bold text-white">Other Spots</div>
                      <div className="text-[10px] text-white/80">全国に展開</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Block 2 : Media & Creative ── */}
        <div className="rounded-card overflow-hidden border border-light-gray">
          {/* Heading band with image backdrop */}
          <div className="relative bg-charcoal text-white overflow-hidden">
            <div aria-hidden className="absolute inset-0 opacity-[0.18]">
              <Image
                src={IMG.mediaStudio.src}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(45,45,45,0.95) 0%, rgba(22,123,129,0.6) 100%)',
              }}
            />

            <div className="relative p-7 md:p-10 lg:p-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <IconGlobe size={16} color="#54BEC3" />
                </div>
                <span className="eyebrow text-bright-teal">
                  {ECOSYSTEM.media.label}
                </span>
              </div>

              <h3 className="heading-sub text-white mb-4 max-w-[620px] jp-keep">
                {ECOSYSTEM.media.title}
              </h3>

              <p className="text-body text-white/80 max-w-[720px] jp-break">
                {ECOSYSTEM.media.body}
              </p>
            </div>
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
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-teal-tint flex items-center justify-center">
                      <Icon size={18} color="#167B81" />
                    </div>
                    <span className="text-[10px] font-mono text-mid-gray">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h4 className="text-[15px] font-bold text-charcoal mb-3 leading-snug jp-keep">
                    {p.title}
                  </h4>

                  <p className="text-body-sm text-dark-gray jp-break">
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
