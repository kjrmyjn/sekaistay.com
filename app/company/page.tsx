import type { Metadata } from 'next'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

export const metadata: Metadata = {
  title: '会社概要',
  description: 'SEKAI STAYを運営する株式会社セカイチの会社概要。住宅宿泊管理業 国土交通大臣(01)第F05780号。',
}

const INFO = [
  { label: '会社名', value: '株式会社セカイチ（SEKAICHI Inc.）' },
  { label: 'サービス名', value: 'SEKAI STAY' },
  { label: '代表者', value: '劉 添毅（リュウ テンイチ）\n明神 洸次郎（ミョウジン コウジロウ）' },
  { label: '所在地', value: '〒150-0021\n東京都渋谷区恵比寿西2丁目14-7' },
  { label: '資本金(資本準備金含む)', value: '1,650万円' },
  { label: '法人番号', value: '4011001162956' },
  { label: '住宅宿泊管理業', value: '国土交通大臣(01)第F05780号' },
  { label: '事業内容', value: '民泊運用代行事業\n宿泊施設コンサルティング事業\n不動産関連事業' },
]

export default function CompanyPage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: '会社概要' }]} />
      <FloatingCTA />
      <main>
        <section className="bg-warm-gradient px-6 section-heavy">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3">Company</p>
            <h1 className="heading-display text-charcoal mb-6">
              会社概要
            </h1>
          </div>
        </section>

        <section className="px-6 section-heavy">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-light-gray overflow-hidden shadow-sm">
              <div className="px-8 py-6 bg-teal-full">
                <p className="text-white font-bold text-xl">SEKAI STAY</p>
                <p className="text-white/60 text-sm mt-1">株式会社セカイチ（SEKAICHI Inc.）が運営</p>
              </div>
              <div className="divide-y divide-light-gray">
                {INFO.map((row, i) => (
                  <div key={i} className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr]">
                    <div className="px-6 py-5 text-sm font-bold text-dark-gray bg-pale-gray">{row.label}</div>
                    <div className="px-6 py-5 text-sm text-charcoal whitespace-pre-line leading-relaxed">{row.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA — handled by Footer */}
      </main>
      <Footer />
    </>
  )
}
