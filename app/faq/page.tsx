import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

export const metadata: Metadata = {
  title: 'よくあるご質問（FAQ）',
  description: 'SEKAI STAYの民泊運営代行サービスに関するよくあるご質問をまとめました。料金、契約、サービス内容、写真、対応エリアなど。',
  openGraph: {
    title: 'よくあるご質問 | SEKAI STAY',
    description: '民泊運営代行に関するよくあるご質問。料金・契約・サービス内容・対応エリアなど。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://sekaistay.com/faq',
    siteName: 'SEKAI STAY',
  },
  alternates: { canonical: 'https://sekaistay.com/faq' },
}

const FAQ_CATEGORIES = [
  {
    category: '料金・費用について',
    items: [
      {
        q: '民泊運営代行の費用はどのくらいかかりますか？',
        a: '初期費用は現在キャンペーンで0円（通常10万円）。月額は固定管理費5,000円/室と売上の8%です。収支シミュレーションを無料で作成いたしますので、お気軽にお問い合わせください。',
      },
      {
        q: '宿泊がなかった月の費用はかかりますか？',
        a: '固定管理費（月額5,000円/室）のみとなります。変動運営委託費（8%）は売上に連動するため、宿泊がなければ発生しません。',
      },
      {
        q: '他社と比べて手数料が安いのはなぜですか？',
        a: 'SEKAI STAYでは独自の仕組みによりオペレーションコストを大幅に削減。その分をオーナー様に還元しています。8%の手数料でも高品質なサービスを維持できる体制を構築しています。',
      },
      {
        q: '初期費用0円キャンペーンはいつまでですか？',
        a: '現在実施中のキャンペーンです。終了時期は未定ですが、予告なく終了する場合がございます。お早めにお問い合わせください。',
      },
      {
        q: '清掃費用は別途かかりますか？',
        a: '清掃費用はゲスト負担（宿泊料金に含む）が基本です。清掃手配・品質管理は運営代行サービスに含まれており、オーナー様への追加請求はございません。',
      },
    ],
  },
  {
    category: '契約・手続きについて',
    items: [
      {
        q: '最低契約期間はありますか？',
        a: 'ありません。いつでも解約可能です。成果でお選びいただけるよう、縛りは設けていません。',
      },
      {
        q: '他社から乗り換える場合、移行コストはかかりますか？',
        a: '移行コストは無料です。OTAアカウントの引き継ぎや掲載情報の最適化も含めて対応します。',
      },
      {
        q: '解約手数料はかかりますか？',
        a: '解約手数料は0円です。解約のお申し出から1ヶ月で契約を終了できます。',
      },
      {
        q: '契約から開業までどのくらいかかりますか？',
        a: '最短2週間で開業可能です。物件の状況や必要な準備によりますが、通常1〜2ヶ月程度で運営を開始できます。',
      },
      {
        q: '法人でも個人でも契約できますか？',
        a: 'はい、法人・個人どちらでもご契約いただけます。',
      },
    ],
  },
  {
    category: 'サービス内容について',
    items: [
      {
        q: 'プロカメラマンによる撮影は必要ですか？',
        a: 'いいえ、不要です。お手持ちのスマートフォンで撮影いただいた写真を、弊社の画像加工システムでプロ品質に仕上げます。トンマナの統一も自動で行います。',
      },
      {
        q: 'どのOTAに掲載されますか？',
        a: 'Airbnb、Booking.com、Vrbo、Expediaなど、物件の特性やエリアに合わせて最適なOTAを選定し複数掲載します。在庫の同期管理も行います。',
      },
      {
        q: 'ゲスト対応は何語に対応していますか？',
        a: '日本語・英語・中国語・韓国語など、主要な言語に24時間対応しています。',
      },
      {
        q: 'オーナーダッシュボードではどんな情報が見られますか？',
        a: 'リアルタイムの収益・稼働率・予約状況・レビュースコアなどを24時間いつでもPC・スマホから確認可能です。さらに月次の詳細レポートも配信します。',
      },
      {
        q: 'マンスリー賃貸と民泊の併用はできますか？',
        a: 'はい、可能です。民泊新法の180日規制に対応するため、マンスリー賃貸と民泊を柔軟に組み合わせ、年間の収益を最大化する戦略をご提案します。',
      },
      {
        q: '清掃の品質はどのように管理されていますか？',
        a: '専属の清掃スタッフがチェックリストに基づき作業を実施。写真付きの検品報告を行い、高いレビュースコアの維持に貢献しています。',
      },
    ],
  },
  {
    category: '対応エリア・物件について',
    items: [
      {
        q: '遠方の物件でも対応可能ですか？',
        a: '全国対応しています。清掃パートナーネットワークと遠隔管理システムで、どの地域でも同品質のサービスを提供します。',
      },
      {
        q: 'どんな物件タイプに対応していますか？',
        a: 'マンション一室、一棟アパート、戸建て、ヴィラ、トレーラーハウスなど、幅広い物件タイプに対応しています。物件ごとに最適な運営戦略をご提案します。',
      },
      {
        q: '複数物件をまとめて任せることはできますか？',
        a: 'はい、複数物件の一括管理も可能です。物件数に応じた効率的な運営体制をご提案いたします。',
      },
      {
        q: '民泊の届出や許認可は取得済みである必要がありますか？',
        a: '開業支援の一環として、届出・許認可に関するご相談やサポートも行っております。まだ取得されていない場合でもお気軽にご相談ください。',
      },
    ],
  },
]

/* FAQ JSON-LD schema */
function getFAQSchema() {
  const allQuestions = FAQ_CATEGORIES.flatMap(cat =>
    cat.items.map(item => ({
      '@type': 'Question' as const,
      name: item.q,
      acceptedAnswer: { '@type': 'Answer' as const, text: item.a },
    }))
  )
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allQuestions,
  }
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema()) }}
      />
      <Header />
      <Breadcrumb items={[{ label: 'FAQ' }]} />
      <FloatingCTA />
      <main>
        {/* Hero */}
        <section className="bg-warm-gradient px-6 section-heavy">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3">FAQ</p>
            <h1 className="heading-display text-charcoal mb-6">
              よくあるご質問
            </h1>
            <p className="text-base text-dark-gray leading-relaxed max-w-2xl mx-auto">
              SEKAI STAYの民泊運営代行サービスに関して、オーナー様からよくいただくご質問をまとめました。
            </p>
          </div>
        </section>

        {/* FAQ Categories */}
        {FAQ_CATEGORIES.map((cat, ci) => (
          <section key={ci} className={`px-6 section-medium ${ci % 2 === 1 ? 'bg-pale-gray' : ''}`}>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-8 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-deep-teal text-white flex items-center justify-center text-sm font-black flex-shrink-0">
                  {ci + 1}
                </span>
                {cat.category}
              </h2>
              <div className="space-y-4">
                {cat.items.map((f, i) => (
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
            </div>
          </section>
        ))}

        {/* Bottom CTA */}
        <section className="bg-teal-full px-6 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ご不明な点がございましたら、お気軽にお問い合わせください
            </h2>
            <p className="text-sm text-white/70 mb-10 leading-relaxed">
              FAQに掲載されていないご質問や、物件ごとの個別のご相談にも対応いたします。
              収支シミュレーションの作成も無料で承ります。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="bg-white text-deep-teal font-bold px-10 py-4 rounded-lg transition hover:bg-cloud-white text-sm shadow-lg"
              >
                無料で相談する →
              </Link>
              <Link
                href="/lp#diagnostic"
                className="border-2 border-white/40 text-white font-bold px-10 py-4 rounded-lg transition hover:bg-white/10 text-sm"
              >
                収支シミュレーション →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
