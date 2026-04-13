import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import Breadcrumb from '@/components/Breadcrumb'
import { getAllAreas } from '@/lib/areas'

const SITE_URL = 'https://sekaistay.com'

export const metadata: Metadata = {
  title: '対応エリア | SEKAI STAY',
  description:
    'SEKAI STAYは全国20エリアで民泊運用代行に対応しています。京都・大阪・東京など主要観光地から地方リゾートまで、それぞれのエリアに最適化した運営戦略をご提案します。',
  alternates: {
    canonical: `${SITE_URL}/area`,
  },
  openGraph: {
    title: '対応エリア | SEKAI STAY',
    description:
      '京都・大阪・東京・福岡など全国20エリアで民泊運用代行に対応。各エリアの特性に合わせた最適な運営プランをご提案します。',
    type: 'website',
    url: `${SITE_URL}/area`,
    siteName: 'SEKAI STAY',
    locale: 'ja_JP',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AreaPage() {
  const areas = getAllAreas()

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: '対応エリア' }]} />

      <main className="pb-20">
        {/* ── Hero Section ────────────────────────────────── */}
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-black text-charcoal tracking-tight leading-tight mb-6">
              全国20エリアで民泊運用代行に対応
            </h1>
            <p className="text-lg text-dark-gray leading-relaxed mb-4">
              京都の町家から沖縄のリゾート、ニセコのスキーコンドミニアムまで。
              SEKAI
              STAYは各エリアの特性と市場動向に合わせた、最適な運営戦略をご提案します。
            </p>
            <p className="text-base text-dark-gray leading-relaxed">
              手数料8%で、OTA掲載管理・ゲスト対応・清掃手配・プライシング最適化を一括代行。
              あなたの物件のポテンシャルを最大限に引き出します。
            </p>
          </div>
        </section>

        {/* ── Area Cards Grid ─────────────────────────────── */}
        <section className="px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {areas.map(area => (
                <Link
                  key={area.slug}
                  href={`/area/${area.slug}`}
                  className="group block bg-cloud-white rounded-2xl border border-light-gray hover:border-deep-teal/30 hover:shadow-lg transition p-6"
                >
                  {/* Header */}
                  <div className="mb-4">
                    <h2 className="text-2xl font-black text-charcoal group-hover:text-deep-teal transition">
                      {area.name}
                    </h2>
                    <p className="text-sm text-dark-gray mt-1">{area.prefecture}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-dark-gray leading-relaxed mb-4 line-clamp-3">
                    {area.description}
                  </p>

                  {/* Revenue Indicator */}
                  <div className="bg-teal-tint rounded-lg px-4 py-2.5 mb-4">
                    <p className="text-[11px] text-dark-gray mb-1">月間運営実績（平均）</p>
                    <p className="text-lg font-bold text-deep-teal">
                      ¥{(area.avgRevenue / 1000).toFixed(0)}k
                    </p>
                  </div>

                  {/* CTA Arrow */}
                  <div className="flex items-center gap-2 text-deep-teal font-semibold text-sm group-hover:gap-3 transition">
                    <span>詳しく見る</span>
                    <span className="text-lg">→</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="bg-teal-tint rounded-2xl border border-deep-teal/20 p-8 md:p-12 text-center">
              <h2 className="text-2xl font-bold text-charcoal mb-3">
                お住まいのエリアについて
              </h2>
              <p className="text-dark-gray mb-8 max-w-2xl mx-auto">
                ご希望のエリアが上記にない場合でも、お気軽にお問い合わせください。
                全国各地での対応実績をもとに、最適なプランをご提案いたします。
              </p>
              <Link
                href="/contact"
                className="inline-block bg-deep-teal hover:bg-sekai-teal text-white font-bold px-8 py-3.5 rounded-xl transition text-base"
              >
                無料相談する
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FloatingCTA />
      <Footer />
    </>
  )
}
