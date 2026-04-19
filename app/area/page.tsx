import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import Breadcrumb from '@/components/Breadcrumb'
import { getAllAreas } from '@/lib/areas'
import { IconArrowRight } from '@/components/Icons'

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

      <main className="bg-ivory pb-20">
        {/* Chapter Ⅰ — masthead */}
        <section className="bg-paper border-b border-rule">
          <div className="container-edit px-5 md:px-8 pt-20 md:pt-28 pb-14 md:pb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="rule-teal-sm" />
              <p className="eyebrow text-sekai-teal">Chapter Ⅰ · Coverage</p>
            </div>
            <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-14 items-end">
              <h1 className="heading-display text-ink">
                全国<span className="font-sans text-sekai-teal">20</span>エリアで
                <span className="block">民泊運用代行に対応。</span>
              </h1>
              <div className="md:text-right">
                <p className="eyebrow-mono text-mid-gray mb-2">Regional Atlas · 2026</p>
                <p className="font-sans font-light text-[64px] md:text-[96px] text-sekai-teal leading-none tabular-nums">
                  {String(areas.length).padStart(2, '0')}
                </p>
                <p className="eyebrow-mono text-mid-gray mt-1">Areas Served</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mt-14 pt-10 border-t border-rule">
              <p className="font-sans text-body md:text-[17px] text-dark-gray leading-[2]">
                京都の町家から沖縄のリゾート、ニセコのスキーコンドミニアムまで。SEKAI STAYは各エリアの特性と市場動向に合わせた、最適な運営戦略をご提案します。
              </p>
              <p className="font-sans text-body md:text-[17px] text-dark-gray leading-[2]">
                手数料8%で、OTA掲載管理・ゲスト対応・清掃手配・プライシング最適化を一括代行。あなたの物件のポテンシャルを最大限に引き出します。
              </p>
            </div>
          </div>
        </section>

        {/* Chapter Ⅱ — area grid */}
        <section className="section-xl">
          <div className="container-edit px-5 md:px-8">
            <div className="flex items-center gap-3 mb-10">
              <span className="eyebrow-mono text-mid-gray">§ 02</span>
              <span className="h-px bg-rule flex-1" />
              <p className="eyebrow text-sekai-teal">Atlas of Areas</p>
            </div>

            <div className="bg-rule grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px border border-rule">
              {areas.map((area, i) => (
                <Link
                  key={area.slug}
                  href={`/area/${area.slug}`}
                  className="group block bg-paper p-7 md:p-8 transition hover:bg-mist relative"
                >
                  {/* Header band */}
                  <div className="flex items-start justify-between mb-5 pb-4 border-b border-rule">
                    <div>
                      <p className="eyebrow-mono text-mid-gray mb-2">Area № {String(i + 1).padStart(2, '0')}</p>
                      <h2 className="font-sans font-medium text-[22px] md:text-[26px] text-ink group-hover:text-sekai-teal transition leading-tight">
                        {area.name}
                      </h2>
                      <p className="font-sans text-caption text-mid-gray mt-1">{area.prefecture}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-body-sm text-dark-gray leading-[1.95] mb-6 line-clamp-3">
                    {area.description}
                  </p>

                  {/* Revenue Indicator — ledger */}
                  <div className="bg-mist border-l-2 border-sekai-teal pl-4 pr-4 py-3 mb-5">
                    <p className="eyebrow-mono text-mid-gray mb-1">Monthly Avg Revenue</p>
                    <p className="font-sans font-light text-[26px] text-ink leading-none tabular-nums">
                      ¥{(area.avgRevenue / 1000).toFixed(0)}
                      <span className="font-sans text-[14px] text-mid-gray ml-1">k</span>
                    </p>
                  </div>

                  {/* CTA Arrow */}
                  <div className="flex items-center gap-2 text-sekai-teal font-sans font-medium text-[13px] pt-2">
                    <span>詳しく見る</span>
                    <span className="block w-6 h-px bg-sekai-teal group-hover:w-10 transition-[width]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter Ⅲ — bottom note */}
        <section className="section-xl">
          <div className="container-narrow px-5 md:px-8 max-w-3xl">
            <div className="bg-ink text-ivory p-10 md:p-14 relative overflow-hidden">
              <div
                aria-hidden
                className="absolute -top-24 -right-24 w-96 h-96 bg-bright-teal/10 rounded-full blur-3xl pointer-events-none"
              />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-10 bg-bright-teal" />
                  <p className="eyebrow text-bright-teal">Chapter Ⅲ · Not Listed?</p>
                </div>
                <h2 className="font-sans font-medium text-[26px] md:text-[34px] leading-tight mb-6">
                  お住まいのエリアについて、
                  <span className="block font-sans text-bright-teal mt-1">お気軽にご相談ください。</span>
                </h2>
                <p className="font-sans text-body-sm text-ivory/80 leading-[1.95] mb-8 max-w-lg">
                  ご希望のエリアが上記にない場合でも対応可能です。全国各地での対応実績をもとに、最適なプランをご提案いたします。
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-ivory text-ink px-7 py-4 transition hover:bg-bright-teal font-sans font-medium text-[14px]"
                >
                  無料相談する
                  <IconArrowRight size={14} className="group-hover:translate-x-1 transition" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FloatingCTA />
      <Footer />
    </>
  )
}
