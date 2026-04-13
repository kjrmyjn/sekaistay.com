import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

export const metadata: Metadata = {
  title: '運営実績',
  description: 'SEKAI STAYの運営実績。稼働率改善、レビュー評価向上、収益200%改善等の実績をご紹介。',
  openGraph: {
    title: '運営実績 | SEKAI STAY',
    description: '稼働率改善、レビュー評価向上、収益200%改善等の実績をご紹介。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://sekaistay.com/portfolio',
    siteName: 'SEKAI STAY',
  },
  twitter: {
    card: 'summary_large_image',
    title: '運営実績 | SEKAI STAY',
    description: '稼働率改善、レビュー評価向上、収益200%改善等の実績をご紹介。',
  },
  alternates: { canonical: 'https://sekaistay.com/portfolio' },
}

const CASES = [
  {
    area: 'S様 — 湖畔の高級ヴィラ',
    spec: '高級ヴィラ / 220㎡ / 1日1組限定',
    tag: '高級ヴィラ',
    rating: '4.86',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=500&fit=crop&q=80&auto=format',
    pctUp: '209',
    before: { occupancy: '32%', monthly: '185,000', annual: '2,220,000' },
    after: { occupancy: '67%', monthly: '387,000', annual: '4,644,000' },
    story: 'OTAのリスティング最適化と多言語対応により、海外富裕層の予約が大幅増加。ダイナミックプライシングで繁忙期の客単価を40%向上させ、年間収益を2倍以上に改善。',
  },
  {
    area: 'T様 — トレーラーハウス',
    spec: 'トレーラーハウス / 全4棟 / ペットOK',
    tag: 'トレーラーハウス',
    rating: '4.97',
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=500&fit=crop&q=80&auto=format',
    pctUp: '178',
    before: { occupancy: '45%', monthly: '320,000', annual: '3,840,000' },
    after: { occupancy: '82%', monthly: '570,000', annual: '6,840,000' },
    story: 'ペット可物件として差別化を図り、ペット旅行需要を開拓。レビュー数を3倍に増やし、Airbnbホストレビュー4.9を獲得。稼働率は45%から82%に改善。',
  },
]

const BADGES = [
  { text: 'Airbnb ホストレビュー平均 4.7点', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  { text: 'Guest Favourite 物件あり', color: 'text-rose-600 bg-rose-50 border-rose-200' },
  { text: 'Best of Minpaku 受賞', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { text: '住宅宿泊管理業 国土交通大臣(01)第F05780号', color: 'text-deep-teal bg-teal-tint border-deep-teal/20' },
]

const TESTIMONIALS = [
  {
    name: 'S様',
    property: '湖畔の高級ヴィラ（長野県）',
    text: '他社で稼働率30%台だった物件が、SEKAI STAYに切り替えてから67%まで改善しました。特に海外ゲストの取り込みが上手く、レビュー評価もみるみる上がっています。月次レポートも非常に詳細で、安心してお任せしています。',
  },
  {
    name: 'T様',
    property: 'トレーラーハウス（千葉県）',
    text: 'レビュー数が3倍に増え、ホストレビュー4.9も獲得できました。ペット可物件としてのブランディングも提案してくれて、他の施設との差別化ができています。手数料も安いので、手取りが大幅に増えました。',
  },
]

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: '運営実績' }]} />
      <FloatingCTA />
      <main>
        {/* Hero */}
        <section className="bg-warm-gradient px-6 section-heavy">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3">Track Record</p>
            <h1 className="heading-display text-charcoal mb-6">
              民泊運営代行の実績
            </h1>
            <p className="text-base text-dark-gray leading-relaxed max-w-2xl mx-auto">
              SEKAI STAYの運営代行で、収益が大幅に改善したオーナー様の実例をご紹介します。
            </p>
          </div>
        </section>

        {/* Quality Stats */}
        <section className="bg-charcoal px-6 py-14">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { value: '4年+', label: 'スタッフ平均運営歴' },
              { value: '4.7', label: 'Airbnbレビュー平均' },
              { value: '95%', label: '平均稼働率' },
              { value: '4.8+', label: '平均ゲスト評価' },
            ].map((s, i) => (
              <div key={i}>
                <p className="stat-number-sm text-bright-teal">{s.value}</p>
                <p className="text-xs text-white/80 font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Revenue Cases */}
        <section className="px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Revenue Results</p>
            <h2 className="heading-section text-charcoal text-center mb-16">民泊収益アップ実績</h2>

            <div className="space-y-12">
              {CASES.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl border border-light-gray overflow-hidden shadow-sm">
                  <div className="grid md:grid-cols-[1fr_1.2fr]">
                    {/* Image */}
                    <div className="relative h-64 md:h-auto">
                      <img src={c.image} alt={c.area} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="bg-black/60 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full">★ {c.rating}</span>
                        <span className="bg-deep-teal/90 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full">{c.tag}</span>
                      </div>
                    </div>

                    {/* Data */}
                    <div className="p-6 md:p-8">
                      <h3 className="text-xl font-bold text-charcoal mb-1">{c.area}</h3>
                      <p className="text-xs text-dark-gray mb-6">{c.spec}</p>

                      {/* Big percentage */}
                      <div className="text-center mb-6 py-4 bg-pale-gray rounded-xl">
                        <p className="stat-number text-deep-teal">{c.pctUp}<span className="text-2xl">%</span></p>
                        <p className="text-xs text-dark-gray mt-1">収益改善率</p>
                      </div>

                      {/* Before/After table */}
                      <div className="space-y-3 mb-6">
                        <div className="grid grid-cols-3 text-sm">
                          <span className="text-dark-gray" />
                          <span className="text-dark-gray text-center font-medium">導入前</span>
                          <span className="text-deep-teal text-center font-bold">SEKAI STAY</span>
                        </div>
                        <div className="grid grid-cols-3 text-sm border-t border-light-gray pt-2">
                          <span className="text-dark-gray">稼働率</span>
                          <span className="text-dark-gray text-center">{c.before.occupancy}</span>
                          <span className="text-deep-teal text-center font-bold">{c.after.occupancy}</span>
                        </div>
                        <div className="grid grid-cols-3 text-sm border-t border-light-gray pt-2">
                          <span className="text-dark-gray">粗利（月）</span>
                          <span className="text-dark-gray text-center">¥{c.before.monthly}</span>
                          <span className="text-deep-teal text-center font-bold">¥{c.after.monthly}</span>
                        </div>
                        <div className="grid grid-cols-3 text-sm border-t border-light-gray pt-2">
                          <span className="text-dark-gray">粗利（年）</span>
                          <span className="text-dark-gray text-center">¥{c.before.annual}</span>
                          <span className="text-deep-teal text-center font-bold">¥{c.after.annual}</span>
                        </div>
                      </div>

                      <p className="text-sm text-dark-gray leading-relaxed">{c.story}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="bg-pale-gray px-6 section-medium">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {BADGES.map((b, i) => (
                <span key={i} className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border text-[12px] font-semibold ${b.color}`}>
                  ★ {b.text}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-6 section-heavy">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Voice</p>
            <h2 className="heading-section text-charcoal text-center mb-16">お客様の声</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="bg-cloud-white rounded-2xl border border-light-gray p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-full bg-deep-teal text-white flex items-center justify-center font-bold text-lg">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-base font-bold text-charcoal">{t.name}</p>
                      <p className="text-xs text-dark-gray">{t.property}</p>
                    </div>
                  </div>
                  <p className="text-sm text-dark-gray leading-relaxed">{t.text}</p>
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
