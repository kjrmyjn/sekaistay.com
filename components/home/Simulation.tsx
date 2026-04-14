import Link from 'next/link'
import { SIMULATION } from '@/content/home/copy'
import { IconArrowRight, IconCheck, IconChart } from '@/components/Icons'

export default function Simulation() {
  return (
    <section className="relative bg-white">
      <div className="max-w-[1120px] mx-auto px-5 md:px-10 section-xl">
        <div className="max-w-[720px] mb-10 md:mb-14">
          <div className="eyebrow text-sekai-teal mb-4">Income Simulation</div>
          <h2 className="heading-section text-charcoal mb-4">
            {SIMULATION.headline.line1}
            <br />
            <span className="text-sekai-teal">{SIMULATION.headline.line2}</span>
          </h2>
          <p className="text-body text-dark-gray">
            {SIMULATION.body}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {/* ── Form preview card ── */}
          <div className="bg-white rounded-card border border-light-gray p-7 md:p-9">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-5 bg-sekai-teal rounded" />
              <span className="text-[13px] font-bold text-charcoal">
                {SIMULATION.formTitle}
              </span>
            </div>

            <div className="space-y-3">
              {SIMULATION.formFields.map((f, i) => (
                <div
                  key={f}
                  className="flex items-center justify-between bg-cloud-white border border-light-gray rounded-btn px-4 py-3 text-[13px]"
                >
                  <span className="text-dark-gray">
                    {String(i + 1).padStart(2, '0')}　{f}
                  </span>
                  <span className="text-mid-gray text-[12px]">入力</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Result preview card ── */}
          <div className="bg-gradient-to-br from-deep-teal to-sekai-teal rounded-card p-7 md:p-9 text-white flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                <IconChart size={18} color="#ffffff" />
              </div>
              <span className="eyebrow text-white/90">{SIMULATION.resultTitle}</span>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {SIMULATION.resultItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <IconCheck size={12} color="#ffffff" />
                  </span>
                  <span className="text-[15px] font-bold">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href={SIMULATION.cta.href}
              className="inline-flex items-center justify-center gap-2 bg-white text-deep-teal hover:bg-teal-tint font-bold py-3.5 rounded-btn transition text-[15px]"
            >
              {SIMULATION.cta.label}
              <IconArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
