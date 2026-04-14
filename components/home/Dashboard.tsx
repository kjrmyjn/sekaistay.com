import Link from 'next/link'
import { DASHBOARD } from '@/content/home/copy'
import { IconArrowRight, IconDashboard } from '@/components/Icons'
import { JP } from '@/components/JP'

export default function Dashboard() {
  return (
    <section className="bg-charcoal text-white relative overflow-hidden">
      {/* Subtle teal glow */}
      <div
        aria-hidden
        className="absolute -top-48 -right-48 w-[540px] h-[540px] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(37,157,163,0.35) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 section-xl">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 items-center">
          {/* ── Text ── */}
          <div className="min-w-0">
            <div className="eyebrow text-bright-teal mb-4">Owner Dashboard</div>
            <h2 className="heading-section text-white mb-5 jp-keep">
              <JP>{DASHBOARD.headline.line1}</JP>
              <br className="hidden sm:inline" />
              {' '}<span className="text-bright-teal"><JP>{DASHBOARD.headline.line2}</JP></span>
            </h2>
            <p className="text-body text-white/75 mb-8">
              {DASHBOARD.body}
            </p>

            <Link
              href={DASHBOARD.cta.href}
              className="inline-flex items-center gap-2 bg-white text-charcoal hover:bg-teal-tint font-bold px-6 py-3 rounded-btn transition text-[14px]"
            >
              {DASHBOARD.cta.label}
              <IconArrowRight size={16} />
            </Link>
          </div>

          {/* ── Dashboard mockup ── */}
          <div className="bg-white rounded-card p-5 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-pale-gray">
              <span className="w-2.5 h-2.5 rounded-full bg-light-gray" />
              <span className="w-2.5 h-2.5 rounded-full bg-light-gray" />
              <span className="w-2.5 h-2.5 rounded-full bg-light-gray" />
              <div className="ml-3 flex items-center gap-1.5 text-[11px] text-mid-gray min-w-0 truncate">
                <IconDashboard size={12} color="#9AA0A6" />
                <span className="truncate">owner.sekaistay.com</span>
              </div>
            </div>

            {/* Top KPIs */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
              <div className="bg-teal-tint rounded-btn p-2.5 md:p-3 min-w-0">
                <div className="text-[10px] text-dark-gray mb-1 truncate">今月の売上</div>
                <div className="text-[16px] md:text-[18px] font-bold text-deep-teal">¥1.34M</div>
                <div className="text-[10px] text-sekai-teal font-bold truncate">+18% MoM</div>
              </div>
              <div className="bg-cloud-white rounded-btn p-2.5 md:p-3 min-w-0">
                <div className="text-[10px] text-dark-gray mb-1">稼働率</div>
                <div className="text-[16px] md:text-[18px] font-bold text-charcoal">82%</div>
                <div className="text-[10px] text-sekai-teal font-bold">+24pt</div>
              </div>
              <div className="bg-cloud-white rounded-btn p-2.5 md:p-3 min-w-0">
                <div className="text-[10px] text-dark-gray mb-1 truncate">予約ペース</div>
                <div className="text-[16px] md:text-[18px] font-bold text-charcoal">順調</div>
                <div className="text-[10px] text-mid-gray truncate">vs 先月</div>
              </div>
            </div>

            {/* Bar chart */}
            <div className="bg-cloud-white rounded-btn p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[11px] font-bold text-charcoal">レビュー推移</div>
                <div className="text-[10px] text-dark-gray">6ヶ月</div>
              </div>
              <div className="flex items-end justify-between h-16 gap-1.5">
                {[35, 48, 55, 62, 78, 92].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-sm bg-sekai-teal"
                      style={{ height: `${h}%`, opacity: 0.4 + i * 0.1 }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Action list */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-charcoal mb-2">
                今後の改善アクション
              </div>
              {[
                { txt: '週末価格の見直し（+8%想定）', tag: '優先' },
                { txt: 'ギャラリー写真2枚の差し替え', tag: '中' },
                { txt: '多言語リスティング調整', tag: '低' },
              ].map((a, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2 text-[12px] bg-white border border-pale-gray rounded px-3 py-2 min-w-0"
                >
                  <span className="text-charcoal truncate">{a.txt}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0 ${
                    a.tag === '優先'
                      ? 'bg-teal-tint text-deep-teal'
                      : 'bg-pale-gray text-dark-gray'
                  }`}>
                    {a.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard item tags */}
        <div className="mt-10 flex flex-wrap gap-2 justify-center">
          {DASHBOARD.items.map((item) => (
            <span
              key={item}
              className="text-[12px] text-white/70 border border-white/15 rounded-full px-4 py-1.5"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
