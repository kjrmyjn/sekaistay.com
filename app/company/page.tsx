import type { Metadata } from 'next'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import { getAllOffices } from '@/lib/offices'

export const metadata: Metadata = {
  title: '会社概要',
  description: 'SEKAI STAYを運営する株式会社セカイチの会社概要。住宅宿泊管理業 国土交通大臣(01)第F05780号。東京・沖縄・京都・北海道・長野に拠点。',
  openGraph: {
    title: '会社概要 | SEKAI STAY',
    description: '株式会社セカイチの会社概要。住宅宿泊管理業 国土交通大臣(01)第F05780号。全国7拠点。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://sekaistay.com/company',
    siteName: 'SEKAI STAY',
  },
  twitter: {
    card: 'summary_large_image',
    title: '会社概要 | SEKAI STAY',
    description: '株式会社セカイチの会社概要。住宅宿泊管理業 国土交通大臣(01)第F05780号。',
  },
  alternates: { canonical: 'https://sekaistay.com/company' },
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
              <div className="px-8 py-6 bg-deep-teal">
                <p className="text-white font-bold text-xl">SEKAI STAY</p>
                <p className="text-white/80 text-sm mt-1">株式会社セカイチ（SEKAICHI Inc.）が運営</p>
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

        {/* ── 拠点一覧 ────────────────────────────── */}
        <section className="px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-charcoal mb-8 text-center">全国拠点</h2>
            <p className="text-dark-gray text-center mb-10 max-w-2xl mx-auto">
              SEKAI STAYは全国7拠点のネットワークで、各地域のオーナー様をサポートしています。
              地元スタッフが物件の特性を熟知した運営をご提供します。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getAllOffices().map(office => (
                <div
                  key={office.id}
                  className={`rounded-2xl border p-6 ${
                    office.isHQ
                      ? 'bg-teal-tint border-deep-teal/30 ring-1 ring-deep-teal/10'
                      : 'bg-white border-light-gray'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${office.isHQ ? 'bg-deep-teal' : 'bg-sekai-teal'}`} />
                    <h3 className="font-bold text-charcoal">
                      {office.name}
                      {office.isHQ && (
                        <span className="ml-2 text-xs bg-deep-teal text-white px-2 py-0.5 rounded-full">本社</span>
                      )}
                    </h3>
                  </div>
                  <p className="text-sm text-dark-gray leading-relaxed">
                    {office.displayAddress}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — handled by Footer */}
      </main>
      <Footer />
    </>
  )
}
