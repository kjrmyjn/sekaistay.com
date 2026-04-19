import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import { IconArrowRight } from '@/components/Icons'

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
  { q: 'SEKAI STAYの民泊運用代行の料金は？', a: '初期費用0円（キャンペーン中・通常10万円）、固定管理費5,000円/室/月、変動運営委託費は売上の8%です。月々の費用はこの2つの合計のみで、別途請求はありません。' },
  { q: '他社からの乗り換えに費用はかかりますか？', a: '乗り換え費用は0円です。Airbnb・Booking.com等のOTAアカウント引き継ぎ、掲載情報の最適化、ゲスト対応引き継ぎまで無料で対応します。最短2週間で移行完了です。' },
  { q: '他社は手数料15〜25%なのに、なぜ8%なのですか？', a: '自社運営のオペレーション基盤と、清掃パートナーネットワーク、多言語ゲスト対応センターを内製化することで、一般的な代行業者の運営コストを大幅に削減しているためです。その差分をオーナー様に還元しています。' },
  { q: '最低契約期間はありますか？', a: 'ありません。最低契約期間・解約手数料ともに0円です。成果でご判断いただけるよう、縛りは設けていません。' },
  { q: '宿泊予約がない月も費用はかかりますか？', a: '固定管理費（5,000円/室）のみ発生し、変動運営委託費（8%）は売上連動のため0円です。閑散期の固定費は1部屋で月5,000円に限定されます。' },
  { q: '清掃費や備品補充は別途請求されますか？', a: '清掃費はゲスト負担（宿泊料金に含む）が基本です。清掃手配と品質管理は運営代行サービスに含まれており、オーナー様への追加請求はありません。消耗品の実費のみ、別途ご相談のうえ精算します。' },
]

const COMPARE = [
  { label: '手数料率', us: '8%', others: '15〜25%', highlight: true },
  { label: '月額固定費', us: '¥5,000/部屋', others: '¥15,000〜30,000', highlight: false },
  { label: '初期費用', us: '¥0', others: '¥50,000〜200,000', highlight: true },
  { label: '最低契約期間', us: 'なし', others: '6〜12ヶ月', highlight: false },
  { label: '多言語対応', us: '4言語', others: '日英のみが多い', highlight: false },
  { label: 'レポート頻度', us: '月次', others: '四半期 or なし', highlight: false },
  { label: 'OTA対応数', us: '主要5サイト+', others: 'Airbnbのみが多い', highlight: false },
  { label: 'ホストレビュー平均', us: '4.7 / 5.0 ※', others: '保証なし', highlight: true },
]

export default function PricingPage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: '料金' }]} />
      <FloatingCTA />
      <main className="bg-ivory">
        {/* Hero */}
        <section className="bg-ivory border-b border-rule">
          <div className="container-edit section-xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="chapter">Chapter Ⅰ</span>
              <span className="rule-teal-sm" />
              <span className="eyebrow">Pricing · The Clean Math</span>
            </div>
            <div className="grid lg:grid-cols-[0.6fr_0.4fr] gap-10 lg:gap-20 items-end">
              <h1 className="heading-display text-ink jp-keep !text-[clamp(2rem,5vw,4rem)] leading-[1.1]">
                運営代行の料金、
                <br />
                <span className="font-sans font-light text-sekai-teal">
                  ぜんぶ出します。
                </span>
              </h1>
              <p className="lead text-dark-gray jp-break">
                初期費用0円。月々の費用は「固定管理費」と「変動手数料」のシンプルな2段階構成です。
              </p>
            </div>

            {/* Summary strip */}
            <div className="mt-14 bg-paper border border-rule px-8 py-6">
              <p className="text-body text-ink jp-break leading-relaxed">
                一般的な運用代行の手数料 <span className="font-sans text-[20px] text-mid-gray">15〜25%</span> に対し、
                SEKAI STAY は <span className="font-sans text-[24px] text-sekai-teal">8%</span> ＋
                月 <span className="font-sans text-[20px] text-sekai-teal">¥5,000/室</span>。
                最低契約期間なし・初期費用0円・解約手数料0円です。
              </p>
            </div>
          </div>
        </section>

        {/* Pricing panels — dark */}
        <section className="bg-ink text-ivory relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(22,123,129,0.5) 0%, transparent 70%)' }}
          />
          <div className="relative container-edit section-xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="chapter text-bright-teal">Chapter Ⅱ</span>
              <span className="w-6 h-px bg-bright-teal" />
              <span className="eyebrow !text-bright-teal">Two-Tier Cost</span>
            </div>
            <h2 className="heading-display !font-sans text-ivory jp-keep !text-[clamp(1.75rem,3.8vw,3rem)] mb-14 max-w-3xl">
              月々の費用は、
              <span className="font-sans font-light text-bright-teal">2つだけ。</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-px bg-ivory/10 border border-ivory/10">
              {/* Initial */}
              <div className="bg-ink p-10 md:p-12">
                <div className="flex items-start justify-between mb-8">
                  <p className="eyebrow-mono text-ivory/50">01 — Initial Cost</p>
                  <span className="font-sans text-[14px] text-bright-teal">Campaign</span>
                </div>
                <p className="font-sans text-[14px] text-ivory/60 line-through mb-3">通常 ¥100,000</p>
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="font-sans font-light text-[120px] text-ivory leading-none tabular-nums">0</span>
                  <span className="font-sans text-[28px] text-bright-teal">円</span>
                </div>

                <div className="grid grid-cols-2 gap-px bg-ivory/10 border border-ivory/10">
                  {['OTA初期設定', '画像加工・掲載', '掲載コンテンツ作成', 'オペレーション構築'].map((item, i) => (
                    <div key={i} className="bg-ink/60 px-5 py-4">
                      <p className="eyebrow-mono text-ivory/50 !text-[9px] mb-1">{String(i + 1).padStart(2, '0')}</p>
                      <p className="text-body-sm text-ivory">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-caption text-ivory/40 mt-5 font-sans">※物件状況により別途ご相談の場合あり</p>
              </div>

              {/* Running */}
              <div className="bg-ink p-10 md:p-12">
                <div className="flex items-start justify-between mb-8">
                  <p className="eyebrow-mono text-ivory/50">02 — Running Cost</p>
                  <span className="font-sans text-[14px] text-ivory/40">monthly</span>
                </div>

                <div className="pb-8 border-b border-ivory/10 mb-8">
                  <p className="eyebrow text-bright-teal mb-3">固定管理費</p>
                  <p className="font-sans text-[24px] text-ivory">
                    ¥5,000
                    <span className="text-[14px] text-ivory/60 font-sans ml-2">/ 1部屋 / 月</span>
                  </p>
                </div>

                <p className="eyebrow text-bright-teal mb-3">変動運営委託費</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-sans text-[14px] text-ivory">売上の</span>
                  <span className="font-sans font-light text-[120px] text-ivory leading-none tabular-nums">8</span>
                  <span className="font-sans font-light text-[48px] text-bright-teal">%</span>
                </div>
                <p className="font-sans text-[13px] text-ivory/60">他社平均: 15〜25%</p>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                href="/simulate"
                className="btn bg-ivory text-teal-ink hover:bg-bright-teal hover:text-ivory border-ivory"
              >
                収支シミュレーション
                <IconArrowRight size={12} />
              </Link>
            </div>
          </div>
        </section>

        {/* Includes */}
        <section className="bg-paper">
          <div className="container-edit section-xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="chapter">Chapter Ⅲ</span>
              <span className="rule-teal-sm" />
              <span className="eyebrow">What's Included</span>
            </div>
            <h2 className="heading-section text-ink jp-keep mb-14 max-w-2xl">
              運営費用に含まれる
              <span className="font-sans font-light text-sekai-teal">サービス。</span>
            </h2>

            <div className="grid sm:grid-cols-2 bg-rule gap-px border border-rule">
              {INCLUDES.map((item, i) => (
                <div key={i} className="bg-paper px-6 py-7 flex items-baseline gap-5">
                  <span className="font-sans font-light text-[28px] text-sekai-teal leading-none tabular-nums flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-[15px] md:text-[16px] text-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="bg-mist">
          <div className="container-edit section-xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="chapter">Chapter Ⅳ</span>
              <span className="rule-teal-sm" />
              <span className="eyebrow">Side by Side</span>
            </div>
            <h2 className="heading-section text-ink jp-keep mb-14 max-w-2xl">
              他社との
              <span className="font-sans font-light text-sekai-teal">比較。</span>
            </h2>

            <div className="bg-paper border border-rule">
              <div className="grid grid-cols-3 border-b border-rule">
                <div className="p-5 bg-mist" />
                <div className="p-5 bg-ink text-center">
                  <p className="eyebrow !text-bright-teal">SEKAI STAY</p>
                </div>
                <div className="p-5 bg-mist text-center">
                  <p className="eyebrow text-mid-gray">業界平均</p>
                </div>
              </div>
              {COMPARE.map((row, i, arr) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 items-center ${i !== arr.length - 1 ? 'border-b border-rule' : ''}`}
                >
                  <div className="p-5 bg-mist">
                    <p className="font-sans text-[14px] text-ink">{row.label}</p>
                  </div>
                  <div className={`p-5 text-center ${row.highlight ? 'bg-[rgba(22,123,129,0.05)]' : ''}`}>
                    <p className="font-sans text-[20px] text-sekai-teal tabular-nums">{row.us}</p>
                  </div>
                  <div className="p-5 text-center">
                    <p className="font-sans text-[13px] text-mid-gray">{row.others}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-caption text-mid-gray leading-relaxed jp-break max-w-3xl">
              ※ ホストレビュー平均は SEKAI STAY 管理物件（Airbnb / Booking.com 掲載）の加重平均（2024-2025）。他社平均の料率・固定費・最低契約期間は各社公開情報からの一般的水準。実際の条件は契約形態により異なります。
            </p>
          </div>
        </section>

        {/* Pricing FAQ */}
        <section className="bg-bone">
          <div className="container-narrow section-xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="chapter">Chapter Ⅴ</span>
              <span className="rule-teal-sm" />
              <span className="eyebrow">Pricing FAQ</span>
            </div>
            <h2 className="heading-section text-ink jp-keep mb-14 max-w-2xl">
              料金に関する、
              <span className="font-sans font-light text-sekai-teal">よくあるご質問。</span>
            </h2>

            <div>
              {PRICING_FAQ.map((f, i, arr) => (
                <div
                  key={i}
                  className={`py-8 grid grid-cols-[auto_1fr] gap-6 md:gap-10 ${
                    i !== arr.length - 1 ? 'border-b border-rule' : ''
                  }`}
                >
                  <span className="font-sans font-light text-[32px] text-sekai-teal leading-none tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-sans font-medium text-[17px] md:text-[19px] text-ink mb-4 leading-snug">
                      {f.q}
                    </h3>
                    <p className="text-body text-dark-gray jp-break max-w-prose-jp">{f.a}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-caption text-mid-gray text-center mt-10">
              さらに詳しいご質問は{' '}
              <Link href="/faq" className="text-sekai-teal border-b border-sekai-teal/40 hover:border-sekai-teal pb-0.5 font-sans">
                FAQページ
              </Link>{' '}
              をご覧ください。
            </p>
          </div>
        </section>

        {/* FAQPage JSON-LD */}
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
                  { '@type': 'Offer', name: '初期費用', price: '0', priceCurrency: 'JPY', description: 'OTA初期設定・画像加工・掲載開始まで含む。キャンペーン中。', availability: 'https://schema.org/InStock' },
                  { '@type': 'Offer', name: '月額固定管理費', price: '5000', priceCurrency: 'JPY', description: '1部屋あたり月額5,000円。変動運営委託費は売上の8%。', availability: 'https://schema.org/InStock' },
                ],
              },
              aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '47', bestRating: '5' },
            }),
          }}
        />
      </main>
      <Footer />
    </>
  )
}
