import Link from 'next/link'
import { SIMULATION } from '@/content/home/copy'
import { IconArrowRight, IconCheck, IconChart } from '@/components/Icons'

export default function Simulation() {
  return (
    <section className="relative bg-white">
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 section-xl">
        <div className="max-w-[720px] mb-10 md:mb-14">
          <div className="eyebrow text-sekai-teal mb-4">Income Simulation</div>
          <h2 className="heading-section text-charcoal mb-4 jp-keep">
            {SIMULATION.headline.line1}
            <br />
            <span className="text-sekai-teal">{SIMULATION.headline.line2}</span>
          </h2>
          <p className="text-body text-dark-gray jp-break">
            {SIMULATION.body}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-5 md:gap-6">
          {/* ── Form preview card ── */}
          <div className="bg-white rounded-card border border-light-gray p-6 md:p-8 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-sekai-teal rounded" />
                <span className="text-[13px] font-bold text-charcoal">
                  {SIMULATION.formTitle}
                </span>
              </div>
              <span className="text-[11px] font-mono text-dark-gray">
                STEP 1 / 2
              </span>
            </div>

            <div className="space-y-4">
              {/* Area select */}
              <label className="block">
                <span className="block text-[12px] font-bold text-charcoal mb-1.5">エリア</span>
                <div className="flex items-center justify-between bg-cloud-white border border-light-gray rounded-btn px-4 py-3 text-[13px]">
                  <span className="text-charcoal">例：東京 / 京都 / 沖縄</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="#5F6368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </label>

              {/* Property type — radio cards */}
              <div>
                <span className="block text-[12px] font-bold text-charcoal mb-1.5">物件タイプ</span>
                <div className="grid grid-cols-3 gap-2">
                  {['一戸建て', 'マンション', '貸別荘'].map((t, i) => (
                    <div
                      key={t}
                      className={`text-center text-[12px] border rounded-btn py-2.5 ${
                        i === 0
                          ? 'border-sekai-teal bg-teal-tint text-deep-teal font-bold'
                          : 'border-light-gray text-dark-gray'
                      }`}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rooms + Status grid */}
              <div className="grid grid-cols-2 gap-3">
                <label>
                  <span className="block text-[12px] font-bold text-charcoal mb-1.5">部屋数</span>
                  <div className="flex items-center justify-between bg-cloud-white border border-light-gray rounded-btn px-4 py-3 text-[13px] text-dark-gray">
                    <span>1〜5</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="#5F6368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </label>
                <label>
                  <span className="block text-[12px] font-bold text-charcoal mb-1.5">運営状況</span>
                  <div className="flex items-center justify-between bg-cloud-white border border-light-gray rounded-btn px-4 py-3 text-[13px] text-dark-gray">
                    <span>運用中</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="#5F6368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </label>
              </div>

              {/* Monthly revenue */}
              <label className="block">
                <span className="block text-[12px] font-bold text-charcoal mb-1.5">現在の月商 <span className="text-mid-gray font-normal">（任意）</span></span>
                <div className="flex items-center bg-cloud-white border border-light-gray rounded-btn px-4 py-3 text-[13px]">
                  <span className="text-mid-gray mr-2">¥</span>
                  <span className="text-charcoal">600,000</span>
                </div>
              </label>

              {/* Email */}
              <label className="block">
                <span className="block text-[12px] font-bold text-charcoal mb-1.5">メールアドレス</span>
                <div className="flex items-center bg-cloud-white border border-light-gray rounded-btn px-4 py-3 text-[13px]">
                  <span className="text-charcoal">your@email.com</span>
                </div>
              </label>
            </div>

            <Link
              href={SIMULATION.cta.href}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-sekai-teal hover:bg-deep-teal text-white font-bold py-3.5 rounded-btn transition text-[14px]"
            >
              {SIMULATION.cta.label}
              <IconArrowRight size={16} />
            </Link>
            <p className="text-[11px] text-mid-gray mt-3 text-center">
              所要時間およそ3分・メールで結果受取
            </p>
          </div>

          {/* ── Result preview card ── */}
          <div className="bg-gradient-to-br from-deep-teal to-sekai-teal rounded-card p-6 md:p-8 text-white flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <IconChart size={16} color="#ffffff" />
                </div>
                <span className="eyebrow text-white/90">Preview of Result</span>
              </div>
              <span className="text-[10px] font-mono text-white/70 border border-white/25 rounded-full px-2.5 py-1">
                SAMPLE
              </span>
            </div>

            {/* Projected monthly revenue range */}
            <div className="mb-6">
              <div className="text-[11px] text-white/75 mb-2">想定月商レンジ</div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-[28px] md:text-[34px] font-bold leading-none">¥85万</span>
                <span className="text-white/70">〜</span>
                <span className="text-[28px] md:text-[34px] font-bold leading-none">¥134万</span>
              </div>
              {/* Range bar */}
              <div className="relative h-2 bg-white/15 rounded-full">
                <div
                  className="absolute top-0 left-[18%] right-[8%] h-full bg-white rounded-full"
                />
                <div className="absolute -top-1 left-[18%] w-4 h-4 bg-white rounded-full border-2 border-deep-teal" />
                <div className="absolute -top-1 right-[8%] w-4 h-4 bg-white rounded-full border-2 border-deep-teal" />
              </div>
              <div className="flex justify-between text-[10px] text-white/60 mt-1.5 font-mono">
                <span>¥0</span>
                <span>¥150万+</span>
              </div>
            </div>

            {/* Improvement score */}
            <div className="bg-white/10 rounded-btn p-4 mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-white/80">改善余地スコア</span>
                <span className="text-[11px] font-bold text-bright-teal">HIGH</span>
              </div>
              <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
                <div className="h-full w-[78%] bg-bright-teal rounded-full" />
              </div>
            </div>

            {/* Priority actions */}
            <div className="mb-6">
              <div className="text-[11px] font-bold text-white/85 mb-3">優先して見直すべきポイント</div>
              <ul className="space-y-2">
                {[
                  { n: '01', t: '週末・連休の価格設計' },
                  { n: '02', t: 'ギャラリー写真の差し替え' },
                  { n: '03', t: '多言語リスティング強化' },
                ].map((a) => (
                  <li key={a.n} className="flex items-start gap-3 text-[13px]">
                    <span className="text-[10px] font-mono text-bright-teal mt-1 flex-shrink-0">
                      {a.n}
                    </span>
                    <span className="flex-1">{a.t}</span>
                    <IconCheck size={14} color="#54BEC3" />
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={SIMULATION.cta.href}
              className="mt-auto inline-flex items-center justify-center gap-2 bg-white text-deep-teal hover:bg-teal-tint font-bold py-3.5 rounded-btn transition text-[14px]"
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
