import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import Breadcrumb from '@/components/Breadcrumb'
import { getAreaBySlug, getAllAreas } from '@/lib/areas'
import { getOfficeForArea, getHQOffice } from '@/lib/offices'

const SITE_URL = 'https://sekaistay.com'
const OUR_RATE = 0.08
const COMPETITOR_RATE = 0.20

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const areas = getAllAreas()
  return areas.map(area => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = getAreaBySlug(params.slug)
  if (!area) return {}

  const title = `${area.name}の民泊運用代行 | SEKAI STAY`
  const description = `${area.name}（${area.prefecture}）での民泊運用代行はSEKAI STAYにお任せ。手数料8%でOTA掲載管理・ゲスト対応・清掃手配・プライシング最適化を一括代行します。`
  const url = `${SITE_URL}/area/${area.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      siteName: 'SEKAI STAY',
      locale: 'ja_JP',
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

function LocalBusinessJsonLd({ area }: { area: { name: string; prefecture: string; slug: string } }) {
  const office = getOfficeForArea(area.slug) || getHQOffice()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `SEKAI STAY ${office.name}`,
    description: `${area.name}の民泊運用代行サービス`,
    url: `${SITE_URL}/area/${area.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressRegion: office.prefecture,
      addressLocality: office.addressShort,
      addressCountry: 'JP',
    },
    serviceArea: {
      '@type': 'AdministrativeArea',
      name: area.prefecture,
    },
    serviceType: '民泊運用代行',
    priceRange: '¥',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['ja', 'en', 'zh', 'ko'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function ServiceJsonLd({ area }: { area: { name: string; prefecture: string; slug: string } }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${area.name}の民泊運用代行`,
    description: `SEKAI STAYが${area.name}での民泊運営をサポートします`,
    provider: {
      '@type': 'Organization',
      name: 'SEKAI STAY',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: area.prefecture,
    },
    url: `${SITE_URL}/area/${area.slug}`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function AreaDetailPage({ params }: Props) {
  const area = getAreaBySlug(params.slug)
  if (!area) notFound()

  // Calculate revenue simulation
  const monthlyRevenue = area.avgRevenue
  const ourAnnualFee = monthlyRevenue * OUR_RATE * 12
  const competitorAnnualFee = monthlyRevenue * COMPETITOR_RATE * 12
  const yearlyDiff = competitorAnnualFee - ourAnnualFee

  // FAQ data for this area
  const faqs = [
    {
      question: `${area.name}での民泊運営、どの程度の収益が期待できますか？`,
      answer: `${area.name}での平均月間運営実績は約${(area.avgRevenue / 10000).toFixed(0)}万円です。物件の立地・グレード・稼働率によって異なりますが、手数料8%のSEKAI STAYなら、従来より大幅に利益を増やすことができます。まずは無料診断で、あなたの物件のポテンシャルを確認してみてください。`,
    },
    {
      question: `SEKAI STAYは${area.name}での実績がありますか？`,
      answer: `はい。${area.name}での民泊運営サポート実績が多数あります。地域の宿泊トレンド、季節変動、オーナー様の課題に対して、${area.name}に特化した最適な運営戦略をご提案できます。`,
    },
    {
      question: `${area.name}への移管手続きはどのように進みますか？`,
      answer: `現在ご利用中のOTA（Airbnb、Booking.com等）から弊社への管理移行は、最短2週間で完了します。既存ゲスト対応からの引継ぎまで、スムーズにサポートいたします。初期手数料や移管コストもかかりません。`,
    },
  ]

  return (
    <>
      <Header />
      <LocalBusinessJsonLd area={area} />
      <ServiceJsonLd area={area} />
      <Breadcrumb
        items={[
          { label: '対応エリア', href: '/area' },
          { label: `${area.name}の民泊運用代行` },
        ]}
      />

      <main className="pb-20">
        {/* ── Hero Section ────────────────────────────────── */}
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-black text-charcoal tracking-tight leading-tight mb-4">
              {area.name}
              <span className="block text-deep-teal mt-2">民泊運用代行ならSEKAI STAY</span>
            </h1>
            <p className="text-lg md:text-xl text-dark-gray leading-relaxed">
              {area.prefecture}でのOTA運営・ゲスト対応・清掃手配・プライシング最適化を、
              手数料8%で一括代行します。
            </p>
          </div>
        </section>

        {/* ── Why This Area Section ────────────────────── */}
        <section className="px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-charcoal mb-8">
              {area.name}で民泊運営が成功する理由
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {area.highlights.map((highlight, i) => (
                <div
                  key={i}
                  className="bg-teal-tint border border-deep-teal/20 rounded-2xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl font-black text-deep-teal shrink-0">
                      0{i + 1}
                    </div>
                    <p className="text-dark-gray leading-relaxed">{highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Revenue Simulation ─────────────────────────── */}
        <section className="px-6 py-12 bg-cloud-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-charcoal mb-8">
              {area.name}での収益シミュレーション
            </h2>

            <div className="bg-white rounded-2xl border border-light-gray overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-light-gray">
                {/* Monthly Revenue */}
                <div className="p-6 md:p-8">
                  <p className="text-sm text-mid-gray mb-2">月間運営実績（平均）</p>
                  <p className="text-3xl font-black text-charcoal">
                    ¥{(monthlyRevenue / 10000).toFixed(1)}万
                  </p>
                </div>

                {/* Annual with Competitor */}
                <div className="p-6 md:p-8">
                  <p className="text-sm text-mid-gray mb-2">年間手数料（20%の場合）</p>
                  <p className="text-3xl font-black text-dark-gray">
                    ¥{(competitorAnnualFee / 10000).toFixed(1)}万
                  </p>
                </div>

                {/* Annual with SEKAI STAY */}
                <div className="p-6 md:p-8 bg-teal-tint">
                  <p className="text-sm text-deep-teal font-semibold mb-2">
                    年間手数料（SEKAI STAY 8%）
                  </p>
                  <p className="text-3xl font-black text-deep-teal">
                    ¥{(ourAnnualFee / 10000).toFixed(1)}万
                  </p>
                </div>
              </div>

              {/* Savings Highlight */}
              <div className="bg-deep-teal text-white p-8 text-center border-t border-light-gray">
                <p className="text-sm mb-2">年間で節約できる手数料</p>
                <p className="text-4xl font-black mb-2">
                  ¥{(yearlyDiff / 10000).toFixed(1)}万
                </p>
                <p className="text-sm opacity-90">これはあくまで平均値です。物件の実績によってさらに大きな節約も可能です。</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/simulate"
                className="inline-block text-deep-teal font-semibold underline hover:no-underline transition"
              >
                詳細なシミュレーションを見る →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Services Overview ────────────────────────── */}
        <section className="px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-charcoal mb-8">SEKAI STAYの運用代行</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'OTA掲載管理',
                  description:
                    'Airbnb、Booking.com、楽天トラベル等の複数のOTA(オンライン旅行代理店)での掲載・最適化をまるごと代行。',
                },
                {
                  title: '24時間多言語ゲスト対応',
                  description:
                    '日本語、英語、中国語(簡体字・繁体字)、韓国語での対応体制。ゲストの問い合わせに24時間以内に返信。',
                },
                {
                  title: '清掃・メンテナンス手配',
                  description:
                    'チェックアウト後の清掃から、定期的なメンテナンスまで。全国のネットワークで対応します。',
                },
                {
                  title: 'プライシング最適化',
                  description:
                    '季節・曜日・イベント・競合物件など、複数の要因を加味した動的価格設定で、収益を最大化します。',
                },
              ].map((service, i) => (
                <div
                  key={i}
                  className="bg-cloud-white border border-light-gray rounded-2xl p-6 hover:border-deep-teal/30 transition"
                >
                  <h3 className="text-lg font-bold text-charcoal mb-2">{service.title}</h3>
                  <p className="text-sm text-dark-gray leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ Section ────────────────────────────── */}
        <section className="px-6 py-12 bg-cloud-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-charcoal mb-8">
              {area.name}の民泊運用について、よくあるご質問
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-xl border border-light-gray overflow-hidden"
                >
                  <summary className="flex items-center justify-between w-full p-6 cursor-pointer hover:bg-teal-tint transition">
                    <h3 className="text-base font-bold text-charcoal pr-4">{faq.question}</h3>
                    <span className="text-xl text-deep-teal shrink-0 group-open:rotate-180 transition">
                      ▼
                    </span>
                  </summary>
                  <div className="px-6 pb-6 border-t border-light-gray bg-teal-tint/30">
                    <p className="text-sm text-dark-gray leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Office Info Section ──────────────────────── */}
        {(() => {
          const office = getOfficeForArea(area.slug)
          if (!office) return null
          return (
            <section className="px-6 py-12">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl border border-light-gray p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-teal-tint flex items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#167B81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-charcoal mb-1">
                      {area.name}エリア担当：{office.name}
                    </h2>
                    <p className="text-sm text-dark-gray">{office.displayAddress}</p>
                    <p className="text-xs text-mid-gray mt-2">
                      地元スタッフが{area.name}の物件特性を熟知した運営をサポートします
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )
        })()}

        {/* ── CTA Section ────────────────────────────── */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-teal-tint rounded-2xl border border-deep-teal/20 p-8 md:p-12">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-charcoal mb-4">
                  {area.name}での民泊運営を
                  <span className="block">SEKAI STAYにお任せください</span>
                </h2>
                <p className="text-dark-gray mb-8 max-w-2xl mx-auto">
                  無料診断では、あなたの物件のポテンシャル、現在の手数料との比較、
                  最適な運営プランをご提案します。
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/diagnostic"
                    className="inline-block bg-white hover:bg-cloud-white text-deep-teal font-bold px-8 py-3.5 rounded-xl border-2 border-deep-teal transition text-base"
                  >
                    運営診断を受ける
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-block bg-deep-teal hover:bg-sekai-teal text-white font-bold px-8 py-3.5 rounded-xl transition text-base"
                  >
                    無料相談する
                  </Link>
                </div>
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
