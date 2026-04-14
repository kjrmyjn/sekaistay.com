import Link from 'next/link'
import { PRICING } from '@/content/home/copy'
import { IconArrowRight, IconCheck } from '@/components/Icons'

export default function Pricing() {
  return (
    <section className="bg-cloud-white">
      <div className="max-w-[1120px] mx-auto px-5 md:px-10 section-xl">
        <div className="max-w-[880px] mx-auto text-center mb-10">
          <div className="eyebrow text-sekai-teal mb-4 flex justify-center">
            Pricing
          </div>
          <h2 className="heading-section text-charcoal mb-5">
            {PRICING.headline}
          </h2>
          <p className="text-body text-dark-gray">
            {PRICING.body}
          </p>
        </div>

        <div className="max-w-[720px] mx-auto bg-white rounded-card border border-light-gray p-8 md:p-10">
          {/* Callout */}
          <div className="flex items-start gap-3 mb-8 p-5 bg-teal-tint rounded-btn">
            <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-sekai-teal flex items-center justify-center">
              <IconCheck size={12} color="#ffffff" />
            </span>
            <p className="text-body-sm text-charcoal">
              {PRICING.note}
            </p>
          </div>

          {/* Checklist — what's included in pricing discussion */}
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
            {[
              '手数料水準',
              '固定費・変動費の内訳',
              '代行範囲（清掃・対応・写真）',
              '最低契約期間',
              '初期コスト',
              '乗り換え時の費用',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-[14px] text-charcoal">
                <IconCheck size={14} color="#259DA3" />
                {item}
              </div>
            ))}
          </div>

          <Link
            href={PRICING.cta.href}
            className="w-full inline-flex items-center justify-center gap-2 bg-sekai-teal hover:bg-deep-teal text-white font-bold py-3.5 rounded-btn transition text-[15px]"
          >
            {PRICING.cta.label}
            <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
