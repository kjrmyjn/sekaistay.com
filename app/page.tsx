import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import { getAllPosts } from '@/lib/blog'
import { IMG } from '@/lib/images'

export const metadata: Metadata = {
  title: 'SEKAI STAY | 手数料8%の民泊運用代行サービス',
  description:
    '民泊運用代行の手数料、払いすぎていませんか？SEKAI STAYは手数料8%+月額5,000円/部屋で、OTA最適化・24時間多言語ゲスト対応・清掃管理・価格最適化を一括代行。全国対応・最短2週間で切り替え可能。',
  openGraph: {
    title: 'SEKAI STAY | 手数料8%の民泊運用代行サービス',
    description: '手数料8%で民泊運営を完全代行。OTA最適化・24時間ゲスト対応・清掃管理まで。初期費用0円キャンペーン中。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://sekaistay.com',
    siteName: 'SEKAI STAY',
  },
  alternates: { canonical: 'https://sekaistay.com' },
}

/* ─── Data ───────────────────────────────────────────── */

const FEATURES = [
  {
    title: '手間を完全カット！安心の民泊管理サービス',
    desc: '民泊の開業準備、運営代行、集客、法令対応をワンストップでサポート。豊富な経験で、初めての方でも安心して運営をスタート。手間を減らしつつ、高収益の民泊運営を実現します。',
    illust: '/illust-support.svg',
    highlights: ['開業準備', '運営代行', '集客', '法令対応'],
  },
  {
    title: 'インバウンドに強い！OTA運用もお任せ',
    desc: 'マーケットリサーチを徹底し、収益性の高い民泊プランをご提案。AirbnbやBooking.comなど複数OTAに最適な形で掲載し、集客から予約管理、ゲスト対応までまるっとお任せ。多言語対応で海外からの集客力を最大化します。',
    illust: '/illust-inbound.svg',
    highlights: ['Airbnb', 'Booking.com', '多言語対応', '予約管理'],
  },
  {
    title: '高品質・高収益！徹底した清掃管理も対応',
    desc: '清掃は専属スタッフがチェックリストに基づき徹底管理。定期メンテナンスで、ゲストに最高の滞在環境を提供します。高評価レビューで収益アップをしっかりサポート！',
    illust: '/illust-quality.svg',
    highlights: ['専属スタッフ', 'チェックリスト', '定期メンテナンス', '高評価レビュー'],
  },
]

const REVENUE_CASES = [
  {
    area: '京都の民泊実績',
    spec: '一棟貸し / 町家リノベーション / 最大8名',
    pctUp: '209',
    before: { label: '導入前（他社運用）', monthly: '185,000', annual: '2,220,000' },
    after: { label: 'SEKAI STAY 導入後', monthly: '387,000', annual: '4,644,000' },
  },
  {
    area: '湖畔エリアの民泊実績',
    spec: '高級ヴィラ / 220㎡ / 1日1組限定',
    pctUp: '178',
    before: { label: '導入前（自主運営）', monthly: '320,000', annual: '3,840,000' },
    after: { label: 'SEKAI STAY 導入後', monthly: '570,000', annual: '6,840,000' },
  },
  {
    area: '軽井沢の民泊実績',
    spec: 'トレーラーハウス / 全4棟 / ペットOK',
    pctUp: '156',
    before: { label: '導入前（自主運営）', monthly: '280,000', annual: '3,360,000' },
    after: { label: 'SEKAI STAY 導入後', monthly: '437,000', annual: '5,244,000' },
  },
]

const SERVICES = [
  { title: '民泊運営代行', desc: '集客・インバウンド対応・清掃までワンストップ代行し、豊富な実績で民泊収益アップを実現。', image: IMG.svcManagement },
  { title: 'マルチOTA掲載', desc: 'エリアや物件特性を活かし、Airbnb・Booking.com・Vrbo等の複数OTAに最適な形で掲載。', image: IMG.svcOta },
  { title: 'マンスリー運営', desc: '民泊新法の180日規制外も逃さず稼働させ、年間の収益を最大化する戦略をご提案。', image: IMG.svcMonthly },
  { title: '開業支援', desc: '民泊開業に必要な集客戦略、法令遵守、インバウンド対応などを支援し最短で安定した運営を実現。', image: IMG.svcStartup },
  { title: '画像技術・掲載最適化', desc: 'スマホ写真を弊社の画像加工システムでプロ品質に仕上げ。カメラマン不要で高品質なリスティングを実現。', image: IMG.svcPhoto },
  { title: '清掃・メンテナンス', desc: 'ゲストの評価に直結するハイクオリティな清掃を徹底管理。民泊代行業務の一部でご提供。', image: IMG.svcCleaning },
  { title: 'ダイナミックプライシング', desc: '周辺競合・季節変動・イベントを分析し、最適な価格を自動設定。稼働率と売上を最大化。', image: IMG.svcPricing },
  { title: 'オーナーダッシュボード', desc: '24時間いつでもどこでもアクセス可能。リアルタイムの収益・稼働状況確認＋月次レポーティング。', image: IMG.svcDashboard },
  { title: 'コンサルティング', desc: '豊富な実績に基づき開業前の事業コンセプトから成功を支援。', image: IMG.svcConsulting },
]

const PROPERTIES = [
  { name: 'Lakeview Villa Kawaguchi', area: '河口湖エリア', rooms: '1棟貸し', desc: '湖畔の高級ヴィラ。インバウンド観光客に人気の富士山ビューを活かした運営で高単価を実現。', image: IMG.propVilla },
  { name: 'Mountain Trailer Park', area: '軽井沢エリア', rooms: '全4棟', desc: 'ペットOKのトレーラーハウス。自然体験を求めるファミリー・カップル層をターゲットに高稼働。', image: IMG.propTrailer },
  { name: 'Kyoto Machiya Stay', area: '京都市東山区', rooms: '一棟貸し', desc: '町家をリノベーションした一棟貸し。インバウンド観光客に人気の和のテイストで高単価・高稼働を実現。', image: IMG.propKyoto },
]

const TESTIMONIALS = [
  {
    name: 'S様',
    role: '湖畔ヴィラオーナー',
    text: '前の代行会社では手数料20%で月の手取りが少なく不満でした。SEKAI STAYに切り替えてから手数料8%で手取りが大幅アップ。ダッシュボードでいつでも収益が確認できるのも安心です。',
    rating: '4.9',
  },
  {
    name: 'T様',
    role: 'トレーラーハウスオーナー',
    text: '自主運営に限界を感じていたところ、SEKAI STAYに相談。初期費用0円ですぐにスタートでき、スマホで撮った写真もプロ品質に仕上げてくれました。月次レポートも丁寧で信頼しています。',
    rating: '5.0',
  },
  {
    name: 'K様',
    role: '都心マンションオーナー',
    text: '他社から乗り換えました。移行コスト0円で、OTAアカウントの引き継ぎもスムーズ。ゲスト対応の質が上がりレビューも改善。8%の手数料は本当に革命的です。',
    rating: '4.8',
  },
]

const FLOW = [
  { step: '01', title: 'ヒアリング', desc: 'お客様のご希望をお聞きし、物件の詳細や現状、運営に対するご要望をしっかりと把握します。' },
  { step: '02', title: 'ご提案', desc: '初期費用の算出と収支シミュレーションを作成。物件の立地や特徴に応じた最適な民泊運営プランを提案します。' },
  { step: '03', title: '契約締結', desc: '事業計画や運営プランを確認し、運営委託契約を締結。民泊管理全般をお任せいただける体制が整います。' },
  { step: '04', title: '開業準備', desc: '画像加工、OTA開設、オペレーション体制の構築を同時並行で進めます。最短2週間で稼働可能。' },
  { step: '05', title: '運営開始', desc: '集客と運営を開始。運営代行チームがサポートし、収益化を加速させます。' },
]

const FAQ = [
  { q: '最低契約期間はありますか？', a: 'ありません。いつでも解約可能です。成果でお選びいただけるよう、縛りは設けていません。' },
  { q: '他社から乗り換える場合、移行コストはかかりますか？', a: '移行コストは無料です。OTAアカウントの引き継ぎや掲載情報の最適化も含めて対応します。' },
  { q: 'プロカメラマンによる撮影は必要ですか？', a: 'スマホで撮影いただいた写真を弊社の画像加工システムでプロ品質に仕上げます。プロカメラマンの手配は不要です。' },
  { q: '遠方の物件でも対応可能ですか？', a: '全国対応しています。清掃パートナーネットワークと遠隔管理システムで、どの地域でも同品質のサービスを提供します。' },
  { q: '宿泊がなかった月の費用はかかりますか？', a: '固定管理費（月額5,000円/室）のみとなります。変動運営委託費（8%）は売上に連動するため、宿泊がなければ発生しません。' },
  { q: '民泊運営代行の費用はどのくらいかかりますか？', a: '初期費用は現在キャンペーンで0円。月額は固定管理費5,000円/室と売上の8%です。収支シミュレーションを無料で作成いたしますので、お気軽にお問い合わせください。' },
]

/* ─── Page ───────────────────────────────────────────── */

export default function Home() {
  const posts = getAllPosts().slice(0, 6)

  return (
    <>
      <Header />
      <FloatingCTA />
      <main>
        {/* ━━━ HERO ━━━ */}
        <section className="relative bg-warm-gradient px-6 py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            {/* Logo image — centered */}
            <img
              src="/sekai_stay_02_03.png"
              alt="SEKAI STAY"
              className="h-12 md:h-16 lg:h-20 w-auto mb-6"
            />

            {/* Tagline */}
            <p className="text-sm md:text-base text-dark-gray tracking-[0.15em] font-medium mb-8">
              民泊運営代行サービス
            </p>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-charcoal mb-10 leading-relaxed">
              <span className="text-deep-teal">民泊</span>のこと、<span className="text-deep-teal">まるっと</span>サポート
            </h1>

            {/* Check items */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
              {['全国対応可能', '手数料8%', 'レビュー平均4.7点'].map((t, i) => (
                <span key={i} className="flex items-center gap-2 text-sm md:text-base text-charcoal font-medium">
                  <span className="w-6 h-6 rounded-full bg-deep-teal text-white flex items-center justify-center text-[10px] flex-shrink-0">✓</span>
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="bg-deep-teal hover:bg-sekai-teal text-white font-bold px-10 py-4 rounded-lg transition shadow-lg text-sm text-center"
              >
                無料で相談する →
              </Link>
              <Link
                href="/lp#diagnostic"
                className="bg-deep-teal/5 border-2 border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-white font-bold px-10 py-4 rounded-lg transition text-sm text-center"
              >
                収益シミュレーション →
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ FEATURES — 3つの特徴 ━━━ */}
        <section className="px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Features</p>
            <h2 className="heading-section text-charcoal text-center mb-4">
              民泊運営代行<span className="text-deep-teal">3</span>つの特徴
            </h2>
            <p className="text-sm text-dark-gray text-center mb-16 max-w-2xl mx-auto leading-relaxed">
              民泊の開業から運営代行まで、SEKAI STAYがワンストップで支援。豊富な実績で収益最大化を目指します。
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {FEATURES.map((f, i) => (
                <div key={i} className="group bg-white rounded-2xl border border-light-gray overflow-hidden hover:shadow-xl hover:border-deep-teal/20 transition-all duration-300">
                  {/* Illustration */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={f.illust} alt={f.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                  </div>
                  <div className="p-7">
                    <p className="text-xs font-bold text-deep-teal tracking-wider mb-2">0{i + 1}</p>
                    <h3 className="text-lg font-bold text-charcoal mb-3 leading-snug">{f.title}</h3>
                    <p className="text-sm text-dark-gray leading-relaxed mb-5">{f.desc}</p>
                    {/* Highlight tags */}
                    <div className="flex flex-wrap gap-2">
                      {f.highlights.map((h, j) => (
                        <span key={j} className="text-[11px] font-medium text-deep-teal bg-teal-tint px-3 py-1 rounded-full">{h}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-14">
              <Link
                href="/contact"
                className="inline-block bg-deep-teal hover:bg-sekai-teal text-white font-bold px-12 py-4 rounded-lg transition shadow-lg text-sm"
              >
                無料で相談する →
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ REVENUE RESULTS — 収益アップ実績 ━━━ */}
        <section className="bg-pale-gray px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Results</p>
            <h2 className="heading-section text-charcoal text-center mb-4">
              民泊収益アップ実績
            </h2>
            <p className="text-sm text-dark-gray text-center mb-6 max-w-2xl mx-auto leading-relaxed">
              立地や物件の管理状態によっては、通常の賃貸運用よりも民泊運営のほうが高い収益を見込める場合があります。
              SEKAI STAYに切り替えたオーナー様の実際の収益改善データです。
            </p>
            <p className="text-xs text-mid-gray text-center mb-16">
              ※ 賃貸運用の管理手数料は7%で試算 ※ 民泊運用の粗利は、弊社への委託フィー、OTAサイトへの掲載フィー等の経費を差し引いた純粋な粗利額
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {REVENUE_CASES.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl border border-light-gray overflow-hidden">
                  {/* Header */}
                  <div className="bg-cloud-white px-6 py-5 border-b border-light-gray">
                    <h3 className="text-base font-bold text-charcoal">{c.area}</h3>
                    <p className="text-xs text-mid-gray mt-1">{c.spec}</p>
                  </div>
                  <div className="px-6 py-6">
                    {/* Revenue improvement badge */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className="bg-deep-teal text-white text-xl font-black px-4 py-2 rounded-xl">{c.pctUp}%</span>
                      <span className="text-sm text-charcoal font-medium">収益改善</span>
                    </div>
                    {/* Before */}
                    <div className="bg-cloud-white rounded-xl p-4 mb-3">
                      <p className="text-[10px] text-mid-gray font-bold uppercase tracking-wider mb-2">{c.before.label}</p>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-mid-gray">月間粗利</span>
                        <span className="text-base text-mid-gray">¥{c.before.monthly}</span>
                      </div>
                      <div className="flex justify-between items-baseline mt-1">
                        <span className="text-xs text-mid-gray">年間粗利</span>
                        <span className="text-base text-mid-gray">¥{c.before.annual}</span>
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="flex justify-center my-2">
                      <svg className="w-5 h-5 text-deep-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    </div>
                    {/* After */}
                    <div className="bg-teal-tint rounded-xl p-4 border border-deep-teal/15">
                      <p className="text-[10px] text-deep-teal font-bold uppercase tracking-wider mb-2">{c.after.label}</p>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-dark-gray">月間粗利</span>
                        <span className="text-base text-deep-teal font-bold">¥{c.after.monthly}</span>
                      </div>
                      <div className="flex justify-between items-baseline mt-1">
                        <span className="text-xs text-dark-gray">年間粗利</span>
                        <span className="text-lg text-deep-teal font-bold">¥{c.after.annual}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/lp#diagnostic"
                className="inline-block bg-deep-teal hover:bg-sekai-teal text-white font-bold px-12 py-4 rounded-lg transition shadow-lg text-sm"
              >
                収支シミュレーションはこちら →
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ PRICING — 料金シミュレーション ━━━ */}
        <section className="bg-teal-full px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-white/50 tracking-[0.2em] uppercase mb-3 text-center">Pricing</p>
            <h2 className="heading-section text-white text-center mb-6">
              民泊運営代行の料金
            </h2>
            <p className="text-sm text-white/60 text-center max-w-2xl mx-auto mb-16 leading-relaxed">
              民泊運営代行サービスをご利用いただく際には、開業準備時の「初期費用」と、運営開始後の「月額運営費用」が発生します。
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 md:p-10">
                <h3 className="text-2xl font-bold text-white text-center mb-6">初期費用</h3>
                <div className="text-center mb-6">
                  <p className="text-white/50 text-sm line-through mb-1">通常 ¥100,000</p>
                  <p className="stat-number text-white">0<span className="text-2xl">円</span></p>
                  <span className="inline-block mt-3 bg-amber-400/20 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-400/30">
                    キャンペーン中
                  </span>
                </div>
                <p className="text-sm text-white/60 text-center">OTA初期設定・画像加工・掲載開始まで含む</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 md:p-10">
                <h3 className="text-2xl font-bold text-white text-center mb-6">運営費用</h3>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-5">
                    <p className="text-xs text-white/50 font-bold uppercase tracking-wider mb-2">固定管理費</p>
                    <p className="text-lg text-white font-bold">¥5,000<span className="text-sm font-normal text-white/60"> / 1部屋 / 月</span></p>
                  </div>
                  <div className="bg-white/15 rounded-xl p-6 text-center border border-white/20">
                    <p className="text-xs text-white/50 font-bold uppercase tracking-wider mb-3">変動運営委託費</p>
                    <p className="flex items-baseline justify-center gap-1">
                      <span className="text-sm text-white font-bold">売上の</span>
                      <span className="text-[80px] font-black text-white leading-none tracking-tighter">8</span>
                      <span className="text-3xl font-black text-white">%</span>
                    </p>
                    <p className="text-xs text-white/50 mt-2">他社平均: 15〜25%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-10">
              <Link
                href="/lp#diagnostic"
                className="inline-block bg-white text-deep-teal font-bold px-12 py-4 rounded-lg transition hover:bg-cloud-white text-sm shadow-lg"
              >
                収支シミュレーションはこちら →
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ QUALITY — Superhost実績 ━━━ */}
        <section className="px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Quality</p>
            <h2 className="heading-section text-charcoal text-center mb-16">
              SEKAI STAYのハイクオリティな民泊運営
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-2 border-light-gray rounded-2xl p-8 md:p-10 text-center">
                <p className="text-base text-charcoal font-bold mb-6">Airbnb ホストレビュー平均</p>
                <p className="stat-number text-deep-teal">4.7<span className="text-3xl">点</span></p>
                <p className="text-sm text-dark-gray mt-6 leading-relaxed">
                  5点満点中、高い評価を獲得。きめ細やかなゲスト対応と清掃品質により、安定した高評価を維持しています。
                </p>
              </div>
              <div className="border-2 border-light-gray rounded-2xl p-8 md:p-10 text-center">
                <p className="text-base text-charcoal font-bold mb-6">Booking.com 平均口コミスコア</p>
                <p className="stat-number text-deep-teal">4.8<span className="text-3xl">点</span></p>
                <p className="text-sm text-dark-gray mt-6 leading-relaxed">
                  10点満点換算で9.6相当。多くのレビューを通じて、安定した高品質のサービスを提供している点が評価されています。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ ONE-STOP SERVICES — ワンストップサービス ━━━ */}
        <section className="bg-pale-gray px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">One-Stop Services</p>
            <h2 className="heading-section text-charcoal text-center mb-4">
              <span className="text-deep-teal">民泊運営</span>を支える<br />ワンストップサービス
            </h2>
            <p className="text-sm text-dark-gray text-center mb-16 max-w-2xl mx-auto leading-relaxed">
              民泊運営を成功に導くために、SEKAI STAYは開業準備から運営代行、収益管理まで、すべてをワンストップでサポートします。
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {SERVICES.map((s, i) => (
                <Link
                  key={i}
                  href="/services"
                  className="bg-white rounded-2xl border border-light-gray overflow-hidden hover:shadow-lg hover:border-deep-teal/30 transition-all group"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-deep-teal mb-2 group-hover:text-deep-teal transition">{s.title}</h3>
                    <p className="text-sm text-dark-gray leading-relaxed">{s.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ PROPERTIES — 実際の運用物件 ━━━ */}
        <section className="px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Properties</p>
            <h2 className="heading-section text-charcoal text-center mb-4">
              民泊運営代行の実績
            </h2>
            <p className="text-sm text-dark-gray text-center mb-16 max-w-2xl mx-auto leading-relaxed">
              都市部のマンション一室から湖畔の高級ヴィラまで、多様な物件タイプで実績があります。
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {PROPERTIES.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl border border-light-gray overflow-hidden hover:shadow-md transition-all">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-deep-teal/90 text-white text-[10px] font-bold px-2.5 py-1 rounded">{p.area}</span>
                      <span className="bg-white/90 text-charcoal text-[10px] font-bold px-2.5 py-1 rounded">{p.rooms}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-charcoal mb-2">{p.name}</h3>
                    <p className="text-sm text-dark-gray leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold text-deep-teal border-2 border-deep-teal px-8 py-3 rounded-lg hover:bg-teal-tint transition">
                実績をもっとみる →
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ TESTIMONIALS — お客様の声 ━━━ */}
        <section className="bg-pale-gray px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Voice</p>
            <h2 className="heading-section text-charcoal text-center mb-16">
              民泊代行の<span className="text-deep-teal">お客様の声</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl border border-light-gray p-6 md:p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-full bg-teal-tint flex items-center justify-center">
                      <span className="text-deep-teal font-bold text-lg">{t.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-charcoal">{t.name}</p>
                      <p className="text-xs text-mid-gray">{t.role}</p>
                    </div>
                    <span className="ml-auto text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full">★ {t.rating}</span>
                  </div>
                  <p className="text-sm text-dark-gray leading-relaxed flex-1">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ 8% REVOLUTION BANNER ━━━ */}
        <section className="bg-teal-full px-6 py-16 md:py-20">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="text-center md:text-left flex-shrink-0">
              <p className="text-white/60 text-sm font-bold uppercase tracking-wider mb-2">Management Fee</p>
              <p className="text-[100px] md:text-[140px] font-black text-white leading-none tracking-tighter">8<span className="text-amber-300 text-[60px] md:text-[80px]">%</span></p>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                業界に革命を起こす手数料
              </h2>
              <p className="text-base text-white/80 leading-relaxed mb-6">
                他社平均15〜25%の手数料を、SEKAI STAYは<strong className="text-amber-300">8%</strong>で実現。
                同じ売上でも手取りが大幅に増えます。
                初期費用は通常10万円のところ、<strong className="text-amber-300">今なら0円</strong>。
                最低契約期間もなし。始めやすく、やめやすい — 成果で選んでいただける自信があります。
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/pricing"
                  className="bg-white text-deep-teal font-bold px-8 py-3 rounded-lg transition hover:bg-cloud-white text-sm text-center"
                >
                  料金の詳細を見る →
                </Link>
                <Link
                  href="/lp#diagnostic"
                  className="border-2 border-white/40 text-white font-bold px-8 py-3 rounded-lg transition hover:bg-white/10 text-sm text-center"
                >
                  収支シミュレーション →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ FLOW — 開業までの流れ ━━━ */}
        <section className="px-6 section-heavy">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Flow</p>
            <h2 className="heading-section text-charcoal text-center mb-4">
              民泊開業までの流れ
            </h2>
            <p className="text-sm text-dark-gray text-center mb-16">
              ─ 「契約締結」から「開業」まで最短で二週間 ─
            </p>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-light-gray hidden md:block" />
              <div className="space-y-8">
                {FLOW.map((f, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-deep-teal text-white flex items-center justify-center font-black text-sm relative z-10">
                      {f.step}
                    </div>
                    <div className={`flex-1 rounded-2xl p-6 md:p-8 ${i % 2 === 0 ? 'bg-pale-gray' : 'bg-teal-tint/50'}`}>
                      <h3 className="text-lg font-bold text-charcoal mb-3">{f.title}</h3>
                      <p className="text-sm text-dark-gray leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-14">
              <Link
                href="/contact"
                className="inline-block bg-deep-teal hover:bg-sekai-teal text-white font-bold px-12 py-4 rounded-lg transition shadow-lg text-sm"
              >
                無料で相談する →
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ FAQ — よくあるご質問 ━━━ */}
        <section className="bg-pale-gray px-6 section-heavy">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">FAQ</p>
            <h2 className="heading-section text-charcoal text-center mb-16">
              よくあるご質問
            </h2>
            <div className="space-y-4">
              {FAQ.map((f, i) => (
                <div key={i} className="bg-white rounded-2xl border border-light-gray p-6 md:p-8">
                  <h3 className="text-base font-bold text-charcoal mb-3 flex items-start gap-3">
                    <span className="text-deep-teal font-black flex-shrink-0 text-lg">Q.</span>
                    {f.q}
                  </h3>
                  <p className="text-sm text-dark-gray leading-relaxed pl-8">{f.a}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-bold text-deep-teal border-2 border-deep-teal px-8 py-3 rounded-lg hover:bg-teal-tint transition">
                FAQをもっと見る →
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ NEWS — お知らせ ━━━ */}
        <section className="bg-teal-dark px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <h2 className="heading-section text-white mb-12">
              SEKAI STAYからのお知らせ
            </h2>
            {posts.length > 0 ? (
              <div className="space-y-4">
                {posts.slice(0, 3).map(post => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block bg-white/5 hover:bg-white/10 rounded-xl p-5 md:p-6 transition group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold text-bright-teal bg-white/10 px-2.5 py-1 rounded">{post.category}</span>
                      <span className="text-[11px] text-white/40">{post.date}</span>
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-white group-hover:text-bright-teal transition">
                      {post.title}
                    </h3>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/50">最新のお知らせはまもなく公開されます。</p>
            )}
            <div className="mt-10">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white transition">
                ニュースをもっと見る →
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ BLOG — お役立ち情報 ━━━ */}
        {posts.length > 0 && (
          <section className="px-6 section-heavy">
            <div className="max-w-5xl mx-auto">
              <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Column</p>
              <h2 className="heading-section text-charcoal text-center mb-16">
                民泊運営お役立ち情報
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {posts.slice(0, 6).map(post => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block bg-white rounded-2xl border border-light-gray overflow-hidden hover:shadow-lg hover:border-deep-teal/30 transition-all group"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={IMG.blogPlaceholder} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold text-deep-teal bg-teal-tint px-2 py-0.5 rounded">{post.category}</span>
                        <span className="text-[10px] text-mid-gray">{post.date}</span>
                      </div>
                      <h3 className="text-sm font-bold text-charcoal group-hover:text-deep-teal transition leading-relaxed">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-deep-teal border-2 border-deep-teal px-8 py-3 rounded-lg hover:bg-teal-tint transition">
                  もっと見る →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ━━━ BOTTOM CTA — お問い合わせ ━━━ */}
        <section className="bg-charcoal px-6 py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            <p className="text-white/50 text-sm text-center mb-6">民泊運営代行や集客についての不明な点はお気軽にお問い合わせください</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition">
                <div className="w-16 h-16 rounded-full bg-deep-teal/30 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-bright-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <p className="text-white font-bold mb-3">民泊の運営代行やサービスについて問い合わせする</p>
                <Link
                  href="/contact"
                  className="inline-block bg-deep-teal hover:bg-sekai-teal text-white font-bold px-10 py-4 rounded-lg transition text-sm mt-2"
                >
                  問い合わせ →
                </Link>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition">
                <div className="w-16 h-16 rounded-full bg-deep-teal/30 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-bright-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <p className="text-white font-bold mb-3">所有している物件の収支シミュレーションを希望する</p>
                <Link
                  href="/lp#diagnostic"
                  className="inline-block border-2 border-bright-teal text-bright-teal hover:bg-bright-teal/10 font-bold px-10 py-4 rounded-lg transition text-sm mt-2"
                >
                  収支シミュレーション →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
