import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import { getCaseStudies } from '@/lib/case-studies'

export const metadata: Metadata = {
  title: '導入事例 | SEKAI STAY',
  description: '民泊運営で実績を上げたオーナー様の事例集。京都古民家から高級ヴィラ、都心アパートまで、SEKAI STAYの運営ノウハウで実現した収益向上・稼働率改善の事例をご紹介します。',
  openGraph: {
    title: '導入事例 | SEKAI STAY',
    description: 'オーナー様の実績事例を多数掲載。運営代行で実現した収益向上をご確認ください。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://sekaistay.com/case-studies',
    siteName: 'SEKAI STAY',
  },
  alternates: { canonical: 'https://sekaistay.com/case-studies' },
}

export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies()

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-teal-full min-h-96 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-bright-teal rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto px-6 py-20 relative z-10 text-center">
          <div className="mb-4 inline-block">
            <span className="text-xs uppercase tracking-widest font-semibold text-sekai-teal">
              Success Stories
            </span>
          </div>
          <h1 className="heading-section text-cloud-white mb-4">
            導入事例
          </h1>
          <p className="text-lg text-cloud-white opacity-90 max-w-2xl mx-auto">
            SEKAI STAYの運営ノウハウで実現した、オーナー様の成功事例をご紹介します。京都古民家から高級ヴィラ、都心アパートまで、多様な物件での実績をご確認ください。
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: '導入事例' }]} />

      {/* Case Studies Grid */}
      <section className="bg-cloud-white section-heavy">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <article
                key={caseStudy.id}
                className="rounded-2xl border border-light-gray bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <Image
                    src={caseStudy.image}
                    alt={caseStudy.name}
                    fill
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                  {/* Tags Overlay */}
                  {caseStudy.tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {caseStudy.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-deep-teal text-cloud-white text-xs font-semibold rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Header */}
                  <h3 className="text-lg font-bold text-charcoal mb-2">
                    {caseStudy.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-mid-gray">{caseStudy.location}</span>
                    <span className="text-xs px-2 py-1 bg-teal-tint text-deep-teal rounded-full font-medium">
                      {caseStudy.type}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-mid-gray mb-6 leading-relaxed">
                    {caseStudy.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {caseStudy.highlights.slice(0, 3).map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-charcoal"
                        >
                          <span className="inline-block w-5 h-5 flex-shrink-0 mt-0.5">
                            <svg
                              className="w-full h-full text-sekai-teal"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Results Metrics */}
                  <div className="border-t border-light-gray pt-6">
                    <div className="space-y-4">
                      {caseStudy.results.occupancyBefore && (
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs uppercase tracking-widest font-semibold text-mid-gray">
                              稼働率
                            </span>
                            <span className="text-sm font-bold text-sekai-teal">
                              {caseStudy.results.occupancyBefore} → {caseStudy.results.occupancyAfter}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-sekai-teal h-2 rounded-full"
                              style={{
                                width: `${parseInt(caseStudy.results.occupancyAfter || '0')}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {caseStudy.results.revenueBefore && (
                        <div>
                          <div className="text-xs uppercase tracking-widest font-semibold text-mid-gray mb-2">
                            月間収益
                          </div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-sm text-mid-gray line-through">
                              {caseStudy.results.revenueBefore}
                            </span>
                            <span className="text-lg font-bold text-deep-teal">
                              {caseStudy.results.revenueAfter}
                            </span>
                          </div>
                        </div>
                      )}

                      {caseStudy.results.reviewScore !== undefined && (
                        <div className="flex justify-between items-center">
                          <span className="text-xs uppercase tracking-widest font-semibold text-mid-gray">
                            平均評価
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-charcoal">
                              {caseStudy.results.reviewScore}
                            </span>
                            <span className="text-xs text-mid-gray">/5.0</span>
                          </div>
                        </div>
                      )}

                      {caseStudy.results.superhost && (
                        <div className="flex items-center gap-2 pt-2 border-t border-light-gray">
                          <svg
                            className="w-4 h-4 text-deep-teal"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs font-semibold text-deep-teal">
                            Superhost獲得
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="bg-teal-full relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-bright-teal rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="mb-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-sekai-teal">
              Start Growing
            </span>
          </div>
          <h2 className="heading-section text-cloud-white mb-4">
            あなたの物件も同じように成長させませんか？
          </h2>
          <p className="text-lg text-cloud-white opacity-90 mb-8 max-w-2xl mx-auto">
            SEKAI STAYの運営ノウハウは、すべてのオーナー様にご利用いただけます。京都古民家から都心アパート、高級ヴィラまで、多様な物件での実績があります。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-deep-teal hover:bg-sekai-teal text-cloud-white font-bold rounded-2xl transition-colors duration-300"
            >
              無料相談を申し込む
            </Link>
            <Link
              href="/services"
              className="inline-block px-8 py-4 bg-transparent border-2 border-cloud-white text-cloud-white hover:bg-cloud-white hover:text-deep-teal font-bold rounded-2xl transition-colors duration-300"
            >
              サービスを詳しく見る
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-cloud-white section-heavy">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-sekai-teal mb-2 inline-block">
              Frequently Asked
            </span>
            <h2 className="heading-section text-charcoal">
              導入事例について
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'どの事例が自分の物件に近いですか？',
                a: '各事例は地域・物件タイプ・賃貸形態で分類されています。タグから自分の物件に最も近い事例を見つけ、改善の参考にしてください。ご不明な点は無料相談でお答えします。',
              },
              {
                q: 'これらの成果は何ヶ月で実現できますか？',
                a: '通常、運営改善は1〜3ヶ月で効果が出始めます。ただし物件の立地・シーズン・初期設定状況により異なります。詳細はお問い合わせください。',
              },
              {
                q: '費用はいくらかかりますか？',
                a: 'SEKAI STAYの手数料は、民泊運営代行で月額売上の8%です。詳細な料金設定・シミュレーションは、無料相談でご説明いたします。',
              },
              {
                q: '今すぐ成果が出ない物件でも大丈夫ですか？',
                a: 'はい。どの物件にも改善の余地があります。市場調査・競合分析・運営最適化を通じて、あなたの物件のポテンシャルを最大限引き出すご提案をいたします。',
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group border border-light-gray rounded-2xl p-6 cursor-pointer hover:border-sekai-teal transition-colors"
              >
                <summary className="flex items-center justify-between font-bold text-charcoal text-base">
                  {faq.q}
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-teal-tint text-deep-teal rounded-full group-open:bg-deep-teal group-open:text-cloud-white transition-colors">
                    <svg
                      className="w-4 h-4 transform group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-mid-gray leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </>
  )
}
