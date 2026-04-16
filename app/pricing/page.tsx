import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import { IconCheck, IconArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: '料金',
  description: 'SEKAI STAYの料金体系。手数料8%＋月額5,000円/部屋の明朗会計。初期費用0円。他社との比較もご確認いただけます。',
  openGraph: {
    title: '料金 | SEKAI STAY',
    description: '手数料8%＋月額5,000円/部屋の明朗会計。初期費用0円キャンペーン中。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://sekaistay.com/pricing',
    siteName: 'SEKAI STAY',
  },
  twitter: {
    card: 'summary_large_image',
    title: '料金 | SEKAI STAY',
    description: '手数料8%＋月額5,000円/部屋の明朗会計。初期費用0円キャンペーン中。',
  },
  alternates: { canonical: 'https://sekaistay.com/pricing' },
}

const INCLUDES = [
  'OTA掲載・リスティング最適化',
  '24時間多言語ゲスト対応',
  '清掃手配・品質管理',
  'ダイナミックプライシング',
  '月次収支レポート',
  '法令対応サポート',
  'レビュー管理・改善',
  '緊急時対応（24時間）',
]

const PRICING_FAQ = [
  {
    q: 'SEKAI STAYの民泊運用代行の料金は？',
    a: '初期費用0円（キャンペーン中・通常10万円）、固定管理費5,000円/室/月、変動運営委託費は売上の8%です。月々の費用はこの2つの合計のみで、別途請求はありません。',
  },
  {
    q: '他社からの乗り換えに費用はかかりますか？',
    a: '乗り換え費用は0円です。Airbnb・Booking.com等のOTAアカウント引き継ぎ、掲載情報の最適化、ゲスト対応引き継ぎまで無料で対応します。最短2週間で移行完了です。',
  },
  {
    q: '他社は手数料15〜25%なのに、なぜ8%なのですか？',
    a: '自社運営のオペレーション基盤と、清掃パートナーネットワーク、多言語ゲスト対応センターを内製化することで、一般的な代行業者の運営コストを大幅に削減しているためです。その差分をオーナー様に還元しています。',
  },
  {
    q: '最低契約期間はありますか？',
    a: 'ありません。最低契約期間・解約手数料ともに0円です。成果でご判断いただけるよう、縛りは設けていません。',
  },
  {
    q: '宿泊予約がない月も費用はかかりますか？',
    a: '固定管理費（5,000円/室）のみ発生し、変動運営委託費（8%）は売上連動のため0円です。閑散期の固定費は1部屋で月5,000円に限定されます。',
  },
  {
    q: '清掃費や備品補充は別途請求されますか？',
    a: '清掃費はゲスト負担（宿泊料金に含む）が基本です。清掃手配と品質管理は運営代行サービスに含まれており、オーナー様への追加請求はありません。消耗品の実費のみ、別途ご相談のうえ精算します。',
  },
]

const COMPARE = [
  { label: '手数料率', us: '8%', others: '15〜25%', highlight: true },
  { label: '月額固定費', us: '¥5,000/部屋', others: '¥15,000〜30,000', highlight: false },
  { label: '初期費用', us: '¥0', others: '¥50,000〜200,000', highlight: true },
  { label: '最低契約期間', us: 'なし', others: '6〜12ヶ月', highlight: false },
  { label: '多言語対応', us: '4言語', others: '日英のみが多い', highlight: false },
  { label: 'レポート頻度', us: '月次', others: '四半期 or なし', highlight: false },
  { label: 'OTA対応数', us: '主要5サイト+', others: 'Airbnbのみが多い', highlight: false },
  { label: 'ホストレビュー平均', us: '4.7点（5点満点）※', others: '保証なし', highlight: true },
]

export default function PricingPage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: '料金' }]} />
      <FloatingCTA />
      <main>
        {/* Hero */}
        <section className="bg-warm-gradient px-6 section-heavy">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3">Pricing</p>
            <h1 className="heading-display text-charcoal mb-6">
              民泊運営代行の料金
            </h1>
            <p className="text-base text-dark-gray leading-relaxed max-w-2xl mx-auto mb-6">
              民泊運営代行サービスをご利用いただく際には、初期費用0円。
              月々の費用は「固定管理費」と「変動手数料」のシンプルな2段階構成です。
            </p>
            {/* 比較1文（AEO対応） */}
            <p className="text-sm text-charcoal max-w-3xl mx-auto leading-relaxed bg-white/60 border border-light-gray rounded-xl px-5 py-3">
              一般的な運用代行の手数料<span className="font-bold">15〜25%</span> に対し、SEKAI STAYは
              <span className="font-bold text-deep-teal"> 8%＋月5,000円/室</span>。
              最低契約期間なし・初期費用0円・解約手数料0円です。
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="bg-deep-teal px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Initial Cost */}
              <div className="bg-white/20 backdrop-blur rounded-2xl p-8 md:p-10 border border-white/10">
                <h2 className="text-2xl font-bold text-white text-center mb-6">初期費用</h2>
                <div className="text-center mb-6">
                  <p className="text-white/90 text-sm line-through mb-1">通常 ¥100,000</p>
                  <p className="stat-number text-white">0<span className="text-2xl">円</span></p>
                  <span className="inline-block mt-3 bg-amber-400/20 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-400/30">
                    キャンペーン中
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {['OTA初期設定', '画像加工・掲載', '掲載コンテンツ作成', 'オペレーション構築'].map((item, i) => (
                    <div key={i} className="bg-white/[0.15] rounded-xl p-4 text-center">
                      <p className="text-xs text-white font-medium">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/90 text-center">※物件状況により別途ご相談の場合あり</p>
              </div>

              {/* Running Cost */}
              <div className="bg-white/20 backdrop-blur rounded-2xl p-8 md:p-10 border border-white/10">
                <h2 className="text-2xl font-bold text-white text-center mb-6">運営費用</h2>
                <p className="text-sm text-white/90 text-center mb-8">
                  月々の費用は「固定管理費」と「変動運営委託費」の合計となります。
                </p>
                <div className="space-y-4 mb-8">
                  <div className="bg-white/[0.15] rounded-xl p-6">
                    <p className="text-xs text-white font-bold uppercase tracking-wider mb-3">固定管理費</p>
                    <p className="text-2xl text-white font-bold">
                      ¥5,000<span className="text-sm font-normal text-white/90 ml-1">/ 1部屋 / 月</span>
                    </p>
                  </div>
                  <div className="bg-white/[0.2] rounded-xl p-6 text-center border border-white/25">
                    <p className="text-xs text-white font-bold uppercase tracking-wider mb-3">変動運営委託費</p>
                    <p className="flex items-baseline justify-center gap-1">
                      <span className="text-sm text-white font-bold">売上の</span>
                      <span className="text-[80px] font-black text-white leading-none tracking-tighter">8</span>
                      <span className="text-3xl font-black text-white">%</span>
                    </p>
                    <p className="text-xs text-white/90 mt-2">他社平均: 15〜25%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link
                href="/simulate"
                className="group inline-flex items-center gap-2 bg-white text-deep-teal font-bold px-12 py-4 rounded-lg transition hover:bg-cloud-white text-sm shadow-lg"
              >
                収支シミュレーションはこちら
                <IconArrowRight size={14} className="group-hover:translate-x-0.5 transition" />
              </Link>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="px-6 section-heavy">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-section text-charcoal text-center mb-16">運営費用に含まれるサービス</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {INCLUDES.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-cloud-white rounded-xl p-5 border border-light-gray">
                  <span className="w-8 h-8 rounded-full bg-deep-teal text-white flex items-center justify-center flex-shrink-0">
                    <IconCheck size={14} className="text-white" />
                  </span>
                  <span className="text-base font-medium text-charcoal">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-pale-gray px-6 section-heavy">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-section text-charcoal text-center mb-16">他社との比較</h2>
            <div className="bg-white rounded-2xl border border-light-gray overflow-hidden shadow-sm">
              {/* Header */}
              <div className="grid grid-cols-3">
                <div className="px-6 py-4 bg-pale-gray" />
                <div className="px-6 py-4 bg-deep-teal text-center">
                  <p className="text-white font-bold text-sm">SEKAI STAY</p>
                </div>
                <div className="px-6 py-4 bg-pale-gray text-center">
                  <p className="text-dark-gray font-bold text-sm">他社平均</p>
                </div>
              </div>
              {/* Rows */}
              {COMPARE.map((row, i) => (
                <div key={i} className={`grid grid-cols-3 border-t border-light-gray ${row.highlight ? 'bg-teal-tint/30' : ''}`}>
                  <div className="px-6 py-5 text-sm text-dark-gray font-medium">{row.label}</div>
                  <div className="px-6 py-5 text-sm text-deep-teal font-bold text-center">{row.us}</div>
                  <div className="px-6 py-5 text-sm text-dark-gray text-center">{row.others}</div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[11px] text-mid-gray leading-relaxed">
              ※ ホストレビュー平均は SEKAI STAY 管理物件（Airbnb / Booking.com 掲載）の加重平均（2024-2025）。他社平均の料率・固定費・最低契約期間は各社公開情報からの一般的水準。実際の条件は契約形態により異なります。
            </p>
          </div>
        </section>

        {/* AEO FAQ — 料金編 */}
        <section className="px-6 section-heavy">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Pricing FAQ</p>
            <h2 className="heading-section text-charcoal text-center mb-10">料金に関するよくあるご質問</h2>
            <div className="space-y-4">
              {PRICING_FAQ.map((f, i) => (
                <div key={i} className="bg-white rounded-2xl border border-light-gray p-6 md:p-8">
                  <h3 className="text-base font-bold text-charcoal mb-3 flex items-start gap-3">
                    <span className="text-deep-teal font-black flex-shrink-0 text-lg">Q.</span>
                    {f.q}
                  </h3>
                  <div className="pl-8">
                    <p className="text-sm text-dark-gray leading-relaxed">{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-mid-gray text-center mt-6">
              さらに詳しいご質問は <Link href="/faq" className="text-deep-teal font-bold underline underline-offset-2">FAQページ</Link> をご覧ください。
            </p>
          </div>
        </section>

        {/* CTA — handled by Footer */}

        {/* FAQPage JSON-LD — 料金編 AEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: PRICING_FAQ.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }),
          }}
        />

        {/* Product JSON-LD for pricing rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: 'SEKAI STAY 民泊運用代行',
              description: '管理物件レビュー平均4.8の民泊運用代行サービス。OTA運用・ゲスト対応・清掃・プライシング最適化を一括代行。',
              brand: { '@type': 'Organization', name: 'SEKAI STAY' },
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: 'JPY',
                lowPrice: '0',
                highPrice: '5000',
                offerCount: '2',
                offers: [
                  {
                    '@type': 'Offer',
                    name: '初期費用',
                    price: '0',
                    priceCurrency: 'JPY',
                    description: 'OTA初期設定・画像加工・掲載開始まで含む。キャンペーン中。',
                    availability: 'https://schema.org/InStock',
                  },
                  {
                    '@type': 'Offer',
                    name: '月額固定管理費',
                    price: '5000',
                    priceCurrency: 'JPY',
                    description: '1部屋あたり月額5,000円。変動運営委託費は売上の8%。',
                    availability: 'https://schema.org/InStock',
                  },
                ],
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '47',
                bestRating: '5',
              },
            }),
          }}
        />
      </main>
      <Footer />
    </>
  )
}
