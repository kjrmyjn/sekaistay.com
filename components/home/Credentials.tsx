import Link from 'next/link'
import { CREDENTIALS } from '@/content/home/copy'
import { JP } from '@/components/JP'
import { IconShield, IconArrowRight } from '@/components/Icons'

type CredBlock = {
  label: string
  primary: string
  secondary: string
  href?: string
  external?: boolean
}

export default function Credentials() {
  const blocks = CREDENTIALS.blocks as readonly CredBlock[]
  return (
    <section
      aria-label="運営体制と法令・資格の裏付け"
      className="bg-white border-y border-light-gray"
    >
      <div className="max-w-[1120px] mx-auto px-5 md:px-10 section-xl">
        {/* ── Header ── */}
        <div className="max-w-[760px] mb-10 md:mb-14">
          <div className="eyebrow text-sekai-teal mb-4">{CREDENTIALS.eyebrow}</div>
          <h2 className="heading-section text-charcoal mb-5 jp-keep">
            <JP>{CREDENTIALS.headline.line1}</JP>
            <br className="hidden sm:inline" />
            <JP>{CREDENTIALS.headline.line2}</JP>
          </h2>
          <p className="text-body text-dark-gray jp-break">
            {CREDENTIALS.body}
          </p>
        </div>

        {/* ── Credential Grid (8 blocks) ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-14">
          {blocks.map((b) => {
            const inner = (
              <>
                <div className="eyebrow text-sekai-teal mb-2.5">
                  {b.label}
                </div>
                <div className="text-[15px] md:text-[16px] font-bold text-charcoal leading-tight mb-1.5 jp-keep">
                  <JP>{b.primary}</JP>
                </div>
                <div className="text-[11.5px] md:text-[12px] text-dark-gray leading-relaxed jp-break">
                  {b.secondary}
                </div>
              </>
            )
            const baseClass =
              'bg-cloud-white rounded-card border border-light-gray p-4 md:p-5 h-full transition hover:border-sekai-teal/50'
            if (b.href) {
              return (
                <a
                  key={b.label}
                  href={b.href}
                  target={b.external ? '_blank' : undefined}
                  rel={b.external ? 'noopener noreferrer' : undefined}
                  className={`${baseClass} group block`}
                >
                  {inner}
                  <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-sekai-teal font-bold opacity-0 group-hover:opacity-100 transition">
                    公式サイト <IconArrowRight size={10} />
                  </span>
                </a>
              )
            }
            return (
              <div key={b.label} className={baseClass}>
                {inner}
              </div>
            )
          })}
        </div>

        {/* ── Comparison One-Liner ── */}
        <div className="rounded-card border border-sekai-teal/25 bg-teal-tint/40 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white border border-sekai-teal/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <IconShield size={18} color="#167B81" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] md:text-[16px] font-bold text-charcoal mb-2 jp-keep">
                <JP>{CREDENTIALS.compareHeadline}</JP>
              </h3>
              <p className="text-[14px] md:text-[15px] text-charcoal leading-relaxed jp-break">
                {CREDENTIALS.compareOneLiner}
              </p>
              <Link
                href="/pricing"
                className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-sekai-teal hover:text-deep-teal font-bold transition"
              >
                料金と他社比較の詳細を見る
                <IconArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Compliance note ── */}
        <p className="mt-6 text-[11.5px] text-mid-gray leading-relaxed jp-break">
          {CREDENTIALS.note}
        </p>
      </div>
    </section>
  )
}
