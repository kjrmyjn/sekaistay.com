import { AUTHORITY } from '@/content/home/copy'
import { JP } from '@/components/JP'

export default function AuthorityBar() {
  return (
    <section
      aria-label="信頼できる運営体制"
      className="bg-white border-y border-light-gray"
    >
      <div className="max-w-[1120px] mx-auto px-5 md:px-10 py-6 md:py-7">
        {/* Label */}
        <div className="flex items-center gap-3 mb-5">
          <span className="w-6 h-px bg-sekai-teal" />
          <span className="eyebrow text-sekai-teal">
            {AUTHORITY.label}
          </span>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5">
          {AUTHORITY.items.map((item) => (
            <div
              key={item.metric}
              className="flex flex-col min-w-0"
            >
              <span className="text-[17px] md:text-[18px] font-bold text-charcoal leading-tight mb-0.5 jp-keep">
                <JP>{item.metric}</JP>
              </span>
              <span className="text-[11px] md:text-[12px] text-dark-gray leading-snug jp-keep">
                <JP>{item.label}</JP>
              </span>
            </div>
          ))}
        </div>

        {/* Compliance note */}
        <p className="mt-5 text-[11px] text-mid-gray leading-relaxed jp-break">
          {AUTHORITY.note}
        </p>
      </div>
    </section>
  )
}
