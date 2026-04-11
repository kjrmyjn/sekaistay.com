import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import { getAllPosts } from '@/lib/blog'
import { IMG } from '@/lib/images'
import { getFeaturedCaseStudies } from '@/lib/case-studies'
import { getMediaAppearances, getTrustBadges, getTeamMembers } from '@/lib/media'

export const metadata: Metadata = {
  title: 'SEKAI STAY | 成果で選ばれる民泊運用代行',
  description:
    '管理物件レビュー平均4.8・Airbnbスーパーホスト認定。SEKAI STAYは稼働率と収益を上げる民泊運用代行です。全国7拠点・手数料8%・24時間オーナーダッシュボード。',
  openGraph: {
    title: 'SEKAI STAY | 成果で選ばれる民泊運用代行',
    description: '管理物件レビュー平均4.8。稼働率を上げ、収益を最大化する民泊運用代行サービス。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://sekaistay.com',
    siteName: 'SEKAI STAY',
  },
  alternates: { canonical: 'https://sekaistay.com' },
}

/* ─── Data ───────────────────────────────────────────── */

const SERVICES = [
  { title: '民泊運営代行', desc: '集客・インバウンド対応・清掃までワンストップ代行し、豊富な実績で民泊収益アップを実現。', image: IMG.svcManagement },
  { title: 'マルチOTA掲載', desc: 'Airbnb・Booking.com・Vrbo等の複数OTAに最適な形で掲載し、予約の取りこぼしをゼロに。', image: IMG.svcOta },
  { title: 'マンスリー運営', desc: '民泊新法の180日規制外も逃さず稼働させ、年間の収益を最大化する戦略をご提案。', image: IMG.svcMonthly },
  { title: '開業支援', desc: '民泊開業に必要な集客戦略、法令遵守、インバウンド対応などを支援し最短で安定した運営を実現。', image: IMG.svcStartup },
  { title: '画像技術・掲載最適化', desc: 'スマホ写真を弊社の画像加工システムでプロ品質に仕上げ。カメラマン不要で高品質なリスティングを実現。', image: IMG.svcPhoto },
  { title: '清掃・メンテナンス', desc: 'ゲストの評価に直結するハイクオリティな清掃を徹底管理。民泊代行業務の一部でご提供。', image: IMG.svcCleaning },
  { title: 'ダイナミックプライシング', desc: '周辺競合・季節変動・イベントを分析し、最適な価格を自動設定。稼働率と売上を最大化。', image: IMG.svcPricing },
  { title: 'オーナーダッシュボード', desc: '24時間いつでもどこでもアクセス可能。リアルタイムの収益・稼働状況確認＋月次レポーティング。', image: IMG.svcDashboard },
  { title: 'コンサルティング', desc: '豊富な実績に基づき開業前の事業コンセプトから成功を支援。', image: IMG.svcConsulting },
]

const FLOW = [
  { step: '01', title: 'お問い合わせ・ヒアリング', desc: '物件の詳細やご要望をお聞きし、収益ポテンシャルを無料で診断します。オンラインでも対面でも対応可能。' },
  { step: '02', title: '収支シミュレーション・ご提案', desc: 'エリアの市場データに基づいた収支シミュレーションを作成。物件に最適な運営プランをご提案します。' },
  { step: '03', title: '契約・運営移管', desc: '契約締結後、既存OTAアカウントの引き継ぎやリスティングの最適化を実施。移管費用は0円です。' },
  { step: '04', title: '開業準備', desc: '画像加工、OTA開設、ゲスト対応体制の構築を同時並行で進めます。最短2週間で稼働可能。' },
  { step: '05', title: '運営開始・ダッシュボード公開', desc: '運営を開始し、オーナーダッシュボードを公開。24時間いつでも収益・稼働率・レビューを確認できます。' },
]

const FAQ = [
  { q: '最低契約期間はありますか？', a: 'ありません。いつでも解約可能です。違約金も0円。成果でお選びいただけるよう、縛りは設けていません。' },
  { q: '他社から乗り換える場合、移行コストはかかりますか？', a: '移行コストは無料です。OTAアカウントの引き継ぎ、ゲストの予約引き継ぎ、掲載情報の最適化も含めてすべて対応します。' },
  { q: '遠方の物件でも対応可能ですか？', a: '全国7拠点（東京・京都・沖縄・北海道・長野・町田）で対応しています。清掃パートナーネットワークと遠隔管理システムで、どの地域でも同品質のサービスを提供します。' },
  { q: '宿泊がなかった月の費用はかかりますか？', a: '固定管理費（月額5,000円/室）のみとなります。変動運営委託費（8%）は売上に連動するため、宿泊がなければ発生しません。' },
  { q: '初期費用はいくらですか？', a: '通常10万円の初期費用が、今なら0円キャンペーン中です。OTA初期設定・画像加工・掲載開始まですべて含みます。' },
  { q: 'オーナーダッシュボードとは何ですか？', a: 'オーナー様専用の管理画面です。24時間いつでもどこでも、物件の収益・稼働率・ゲストレビュー・予約状況をリアルタイムで確認できます。月次レポートも自動生成されます。' },
]

/* ─── Page ───────────────────────────────────────────── */

export default function Home() {
  const posts = getAllPosts().slice(0, 6)
  const featuredCases = getFeaturedCaseStudies()
  const mediaAppearances = getMediaAppearances()
  const trustBadges = getTrustBadges()
  const teamMembers = getTeamMembers()

  return (
    <>
      <Header />
      <FloatingCTA />
      <main>
        {/* ━━━ HERO — 信頼訴求ファースト ━━━ */}
        <section className="relative bg-warm-gradient px-6 py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <img
              src="/sekai_stay_02_03.png"
              alt="SEKAI STAY — 成果で選ばれる民泊運用代行サービス"
              className="h-12 md:h-16 lg:h-20 w-auto mb-6"
              width={320}
              height={64}
              loading="eager"
            />

            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-charcoal mb-6 leading-relaxed">
              稼働率を上げる。収益を上げる。<br />
              <span className="text-deep-teal">成果</span>で選ばれる民泊運用代行
            </h1>

            <p className="text-sm md:text-base text-dark-gray max-w-2xl mb-10 leading-relaxed">
              OTA運用・ゲスト対応・清掃管理・プライシング最適化を一括代行。<br className="hidden md:block" />
              全国7拠点のネットワークで、あなたの物件の収益を最大化します。
            </p>

            {/* Trust Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12">
              {trustBadges.map(b => (
                <div key={b.id} className="flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-black text-deep-teal">{b.value}</span>
                  <span className="text-[10px] md:text-xs text-dark-gray mt-1">{b.label}</span>
                </div>
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
                href="/case-studies"
                className="bg-deep-teal/5 border-2 border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-white font-bold px-10 py-4 rounded-lg transition text-sm text-center"
              >
                導入事例を見る →
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ AUTHORITY — メディア掲載・権威バー ━━━ */}
        <section className="bg-white border-y border-light-gray px-6 py-10">
          <div className="max-w-5xl mx-auto">
            <p className="text-[10px] text-mid-gray text-center uppercase tracking-[0.2em] mb-6">Media & Awards</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {mediaAppearances.map(m => (
                <div key={m.id} className="flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition">
                  {/* Placeholder icon based on type */}
                  <div className="w-10 h-10 rounded-full bg-pale-gray flex items-center justify-center">
                    {m.type === 'tv' && <span className="text-base">📺</span>}
                    {m.type === 'award' && <span className="text-base">🏆</span>}
                    {m.type === 'platform' && <span className="text-base">✈️</span>}
                  </div>
                  <span className="text-[10px] md:text-xs text-charcoal font-medium text-center whitespace-nowrap">
                    {m.name}
                  </span>
                </div>
              ))}
              {/* Government registration */}
              <div className="flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition">
                <div className="w-10 h-10 rounded-full bg-pale-gray flex items-center justify-center">
                  <span className="text-base">🏛️</span>
                </div>
                <span className="text-[10px] md:text-xs text-charcoal font-medium text-center">
                  国交大臣登録<br />第F05780号
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ CASE STUDIES — 導入事例（Evidence層） ━━━ */}
        <section className="px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Case Studies</p>
            <h2 className="heading-section text-charcoal text-center mb-4">
              導入事例
            </h2>
            <p className="text-sm text-dark-gray text-center mb-16 max-w-2xl mx-auto leading-relaxed">
              一棟貸しヴィラからトレーラーハウス、町家まで。多様な物件タイプで収益向上を実現しています。
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredCases.map(c => (
                <div key={c.id} className="bg-white rounded-2xl border border-light-gray overflow-hidden hover:shadow-lg transition-all group">
                  <div className="aspect-[16/10] overflow-hidden relative bg-pale-gray">
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {c.tags.slice(0, 2).map((tag, j) => (
                        <span key={j} className="bg-deep-teal/90 text-white text-[10px] font-bold px-2.5 py-1 rounded">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-bold text-charcoal mb-1">{c.name}</h3>
                    <p className="text-xs text-mid-gray mb-4">{c.location} / {c.type}</p>

                    {/* Results metrics */}
                    <div className="space-y-3">
                      {c.results.occupancyAfter && (
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-dark-gray">稼働率</span>
                          <span className="text-sm font-bold text-deep-teal">
                            {c.results.occupancyBefore} → {c.results.occupancyAfter}
                          </span>
                        </div>
                      )}
                      {c.results.revenueAfter && (
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-dark-gray">月間収益</span>
                          <span className="text-sm font-bold text-deep-teal">{c.results.revenueAfter}</span>
                        </div>
                      )}
                      {c.results.reviewScore && (
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-dark-gray">レビュー</span>
                          <span className="text-sm font-bold text-amber-500">★ {c.results.reviewScore}</span>
                        </div>
                      )}
                      {c.results.superhost && (
                        <div className="flex justify-end">
                          <span className="text-[10px] font-bold text-deep-teal bg-teal-tint px-2.5 py-1 rounded-full">Airbnb スーパーホスト</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm font-bold text-deep-teal border-2 border-deep-teal px-8 py-3 rounded-lg hover:bg-teal-tint transition">
                すべての導入事例を見る →
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ QUALITY — レビュー実績（Evidence層） ━━━ */}
        <section className="bg-pale-gray px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Quality</p>
            <h2 className="heading-section text-charcoal text-center mb-16">
              ゲストに選ばれ続ける品質
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border-2 border-light-gray rounded-2xl p-8 md:p-10 text-center">
                <p className="text-base text-charcoal font-bold mb-6">管理物件レビュー平均</p>
                <p className="stat-number text-deep-teal">4.8<span className="text-3xl">点</span></p>
                <p className="text-sm text-dark-gray mt-6 leading-relaxed">
                  全管理物件のOTAレビュー平均。ゲスト対応・清掃品質・施設管理の3軸で高評価を維持。
                </p>
              </div>
              <div className="bg-white border-2 border-light-gray rounded-2xl p-8 md:p-10 text-center">
                <p className="text-base text-charcoal font-bold mb-6">Airbnb スーパーホスト</p>
                <p className="stat-number text-deep-teal">認定</p>
                <p className="text-sm text-dark-gray mt-6 leading-relaxed">
                  全ホストの上位5%のみが取得できるステータス。年4回の厳正な審査を継続クリア。
                </p>
              </div>
              <div className="bg-white border-2 border-light-gray rounded-2xl p-8 md:p-10 text-center">
                <p className="text-base text-charcoal font-bold mb-6">Booking.com 評価</p>
                <p className="stat-number text-deep-teal">10<span className="text-3xl">点</span></p>
                <p className="text-sm text-dark-gray mt-6 leading-relaxed">
                  The Lake House Nojirikoが獲得した最高評価。ゲスト体験の質を追求し続けた結果です。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ FEATURES — サービスの特徴 ━━━ */}
        <section className="px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Features</p>
            <h2 className="heading-section text-charcoal text-center mb-4">
              稼働率を上げる<span className="text-deep-teal">3</span>つの強み
            </h2>
            <p className="text-sm text-dark-gray text-center mb-16 max-w-2xl mx-auto leading-relaxed">
              「安い」だけではない。質の高い運営で稼働率とレビュースコアを引き上げ、物件の価値を最大化します。
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'OTA最適化で予約を最大化',
                  desc: 'Airbnb・Booking.com・一休.comなど複数OTAに最適化されたリスティングを作成。ダイナミックプライシングで、繁忙期の高単価運営と閑散期の稼働維持を両立します。',
                  illust: '/illust-inbound.svg',
                  highlights: ['マルチOTA掲載', 'ダイナミックプライシング', '多言語対応', '検索順位最適化'],
                },
                {
                  title: '高品質な運営でレビューを守る',
                  desc: 'プロ基準の清掃管理、24時間多言語ゲスト対応、トラブルの即時解決。ゲスト満足度を高め、★4.8以上のレビュースコアを維持します。',
                  illust: '/illust-quality.svg',
                  highlights: ['プロ清掃管理', '24時間ゲスト対応', '多言語（日英中韓）', 'トラブル即対応'],
                },
                {
                  title: '全部見える。オーナーダッシュボード',
                  desc: '24時間いつでもどこでも、収益・稼働率・予約状況・レビューをリアルタイムで確認。「何をやっているかわからない」という不安をゼロにします。',
                  illust: '/illust-support.svg',
                  highlights: ['リアルタイム収益確認', '稼働率・予約状況', '月次レポート自動生成', 'スマホ対応'],
                },
              ].map((f, i) => (
                <div key={i} className="group bg-white rounded-2xl border border-light-gray overflow-hidden hover:shadow-xl hover:border-deep-teal/20 transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={f.illust} alt={f.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                  </div>
                  <div className="p-7">
                    <p className="text-xs font-bold text-deep-teal tracking-wider mb-2">0{i + 1}</p>
                    <h3 className="text-lg font-bold text-charcoal mb-3 leading-snug">{f.title}</h3>
                    <p className="text-sm text-dark-gray leading-relaxed mb-5">{f.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {f.highlights.map((h, j) => (
                        <span key={j} className="text-[11px] font-medium text-deep-teal bg-teal-tint px-3 py-1 rounded-full">{h}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ DASHBOARD — オーナーダッシュボード紹介 ━━━ */}
        <section className="bg-charcoal px-6 section-heavy overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-bold text-bright-teal tracking-[0.2em] uppercase mb-3">Owner Dashboard</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                  24時間365日、<br />
                  あなたの物件を<br />
                  <span className="text-bright-teal">見える化</span>
                </h2>
                <p className="text-sm text-white/70 leading-relaxed mb-8">
                  「代行会社に任せたけど、何をやっているかわからない」<br />
                  そんな不安を解消するのが、SEKAI STAY独自のオーナーダッシュボードです。
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    'リアルタイムの収益・稼働率をいつでも確認',
                    '予約状況・ゲストレビューを一元管理',
                    '月次レポートが自動生成・ダウンロード可能',
                    'スマートフォンからもアクセス可能',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-bright-teal/20 text-bright-teal flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="inline-block bg-bright-teal hover:bg-sekai-teal text-charcoal font-bold px-8 py-3.5 rounded-lg transition text-sm"
                >
                  デモを見る →
                </Link>
              </div>
              {/* Dashboard mockup */}
              <div className="relative">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6">
                  {/* Mock dashboard UI */}
                  <div className="bg-white rounded-xl p-5 mb-4">
                    <p className="text-xs text-mid-gray mb-3 font-bold">月間サマリー</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-[10px] text-mid-gray">今月の収益</p>
                        <p className="text-lg font-black text-charcoal">¥1,340,000</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-mid-gray">稼働率</p>
                        <p className="text-lg font-black text-deep-teal">82%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-mid-gray">平均単価</p>
                        <p className="text-lg font-black text-charcoal">¥54,200</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-5 mb-4">
                    <p className="text-xs text-mid-gray mb-3 font-bold">直近の予約</p>
                    <div className="space-y-2">
                      {[
                        { guest: 'John S.', dates: '4/15-4/18', amount: '¥162,600', flag: '🇺🇸' },
                        { guest: 'Tanaka Y.', dates: '4/20-4/22', amount: '¥108,400', flag: '🇯🇵' },
                        { guest: 'Kim M.', dates: '4/25-4/28', amount: '¥189,000', flag: '🇰🇷' },
                      ].map((r, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-light-gray last:border-0">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{r.flag}</span>
                            <span className="text-xs text-charcoal font-medium">{r.guest}</span>
                          </div>
                          <span className="text-[10px] text-mid-gray">{r.dates}</span>
                          <span className="text-xs font-bold text-deep-teal">{r.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-5">
                    <p className="text-xs text-mid-gray mb-3 font-bold">レビュースコア推移</p>
                    <div className="flex items-end gap-1 h-16">
                      {[4.5, 4.6, 4.7, 4.8, 4.7, 4.9, 4.8, 4.9, 5.0, 4.8, 4.9, 4.8].map((v, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-deep-teal/20 rounded-t"
                          style={{ height: `${(v - 4.0) * 100}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[8px] text-mid-gray">1月</span>
                      <span className="text-[8px] text-mid-gray">12月</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ ASSURANCE — 安心保証セクション ━━━ */}
        <section className="px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Assurance</p>
            <h2 className="heading-section text-charcoal text-center mb-4">
              安心して始められる理由
            </h2>
            <p className="text-sm text-dark-gray text-center mb-16 max-w-2xl mx-auto leading-relaxed">
              「試してみたいけど不安」を解消する、SEKAI STAYの安心設計。
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '💰', title: '初期費用0円', desc: '通常10万円の初期費用が今なら0円。OTA設定・画像加工・掲載まですべて含みます。', note: 'キャンペーン中' },
                { icon: '🔓', title: '違約金ゼロ', desc: 'いつでも解約可能。最低契約期間もなし。成果で選んでいただける自信があります。' },
                { icon: '🔄', title: '移管サポート無料', desc: '他社からの乗り換え・引き継ぎ対応もすべて無料で巻き取ります。OTAアカウントもそのまま。' },
                { icon: '📞', title: '24時間対応体制', desc: 'ゲストトラブルにも24時間対応。多言語（日英中韓）でインバウンドゲストにも万全。' },
              ].map((a, i) => (
                <div key={i} className="bg-white rounded-2xl border border-light-gray p-6 hover:border-deep-teal/30 hover:shadow-md transition-all">
                  <span className="text-3xl mb-4 block">{a.icon}</span>
                  <h3 className="text-base font-bold text-charcoal mb-2">{a.title}</h3>
                  <p className="text-sm text-dark-gray leading-relaxed">{a.desc}</p>
                  {a.note && (
                    <span className="inline-block mt-3 text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">{a.note}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ PRICING — 料金（信頼構築後に表示） ━━━ */}
        <section className="bg-teal-full px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-white/50 tracking-[0.2em] uppercase mb-3 text-center">Pricing</p>
            <h2 className="heading-section text-white text-center mb-4">
              ここまでのサービスを、この価格で
            </h2>
            <p className="text-sm text-white/60 text-center max-w-2xl mx-auto mb-16 leading-relaxed">
              レビュー平均4.8の運営品質、24時間オーナーダッシュボード、全国7拠点のサポート。<br className="hidden md:block" />
              すべて含んで、業界最安水準の手数料です。
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

        {/* ━━━ ONE-STOP SERVICES ━━━ */}
        <section className="bg-pale-gray px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">One-Stop Services</p>
            <h2 className="heading-section text-charcoal text-center mb-4">
              <span className="text-deep-teal">民泊運営</span>を支える<br />ワンストップサービス
            </h2>
            <p className="text-sm text-dark-gray text-center mb-16 max-w-2xl mx-auto leading-relaxed">
              開業準備から運営代行、収益管理まで。すべてをワンストップでサポートします。
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

        {/* ━━━ TEAM — 代表メンバー紹介 ━━━ */}
        <section className="px-6 section-heavy">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Team</p>
            <h2 className="heading-section text-charcoal text-center mb-16">
              運営チーム
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {teamMembers.map(m => (
                <div key={m.id} className="bg-white rounded-2xl border border-light-gray p-8 flex flex-col items-center text-center">
                  {/* Photo placeholder */}
                  <div className="w-24 h-24 rounded-full bg-pale-gray flex items-center justify-center mb-4 overflow-hidden">
                    {/* TODO: Replace with real photo */}
                    <span className="text-3xl text-mid-gray font-bold">{m.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-charcoal">{m.name}</h3>
                  <p className="text-xs text-mid-gray mb-1">{m.nameEn}</p>
                  <p className="text-sm font-medium text-deep-teal mb-4">{m.role}</p>
                  <p className="text-sm text-dark-gray leading-relaxed">{m.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ FLOW — 運営開始までの流れ ━━━ */}
        <section className="bg-pale-gray px-6 section-heavy">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Flow</p>
            <h2 className="heading-section text-charcoal text-center mb-4">
              運営開始までの流れ
            </h2>
            <p className="text-sm text-dark-gray text-center mb-16">
              お問い合わせから最短2週間で運営開始。移管コスト0円。
            </p>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-light-gray hidden md:block" />
              <div className="space-y-8">
                {FLOW.map((f, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-deep-teal text-white flex items-center justify-center font-black text-sm relative z-10">
                      {f.step}
                    </div>
                    <div className={`flex-1 rounded-2xl p-6 md:p-8 ${i % 2 === 0 ? 'bg-white' : 'bg-teal-tint/50'}`}>
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

        {/* ━━━ FAQ ━━━ */}
        <section className="px-6 section-heavy">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">FAQ</p>
            <h2 className="heading-section text-charcoal text-center mb-16">
              よくあるご質問
            </h2>
            <div className="space-y-4">
              {FAQ.map((f, i) => (
                <details key={i} className="group bg-white rounded-2xl border border-light-gray overflow-hidden">
                  <summary className="flex items-center justify-between w-full p-6 md:p-8 cursor-pointer hover:bg-teal-tint/30 transition">
                    <h3 className="text-base font-bold text-charcoal pr-4 flex items-start gap-3">
                      <span className="text-deep-teal font-black flex-shrink-0 text-lg">Q.</span>
                      {f.q}
                    </h3>
                    <span className="text-xl text-deep-teal shrink-0 group-open:rotate-180 transition">▼</span>
                  </summary>
                  <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-light-gray bg-teal-tint/20">
                    <p className="text-sm text-dark-gray leading-relaxed pt-4 pl-8">{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-bold text-deep-teal border-2 border-deep-teal px-8 py-3 rounded-lg hover:bg-teal-tint transition">
                FAQをもっと見る →
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ NEWS ━━━ */}
        <section className="bg-charcoal px-6 section-heavy">
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

        {/* ━━━ FINAL CTA ━━━ */}
        <section className="bg-teal-full px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              あなたの物件のポテンシャル、<br />無料で診断します
            </h2>
            <p className="text-base text-white/80 leading-relaxed mb-10">
              まずはお気軽にご相談ください。物件の収益ポテンシャル、<br className="hidden md:block" />
              現在の手数料との比較、最適な運営プランをご提案します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-deep-teal font-bold px-10 py-4 rounded-lg transition hover:bg-cloud-white text-sm shadow-lg"
              >
                無料で相談する →
              </Link>
              <Link
                href="/diagnostic"
                className="border-2 border-white/40 text-white font-bold px-10 py-4 rounded-lg transition hover:bg-white/10 text-sm"
              >
                運営診断を受ける →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
