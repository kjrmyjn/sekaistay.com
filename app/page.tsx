import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import { getAllPosts } from '@/lib/blog'
import { IMG } from '@/lib/images'
import { getFeaturedCaseStudies } from '@/lib/case-studies'
import { getMediaAppearances, getTrustBadges, getTeamMembers } from '@/lib/media'
import {
  IconTV, IconTrophy, IconPlane, IconBuilding,
  IconCoinZero, IconShield, IconRefresh, IconHeadset,
  IconChart, IconCheckCircle, IconDashboard,
  IconCheck, IconMail, IconBarChart,
} from '@/components/Icons'

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

const MEDIA_ICONS: Record<string, typeof IconTV> = {
  tv: IconTV,
  award: IconTrophy,
  platform: IconPlane,
}

const ASSURANCE = [
  { icon: IconCoinZero, title: '初期費用0円', desc: '通常10万円の初期費用が今なら0円。OTA設定・画像加工・掲載まですべて含みます。', note: 'キャンペーン中' },
  { icon: IconShield, title: '違約金ゼロ', desc: 'いつでも解約可能。最低契約期間もなし。成果で選んでいただける自信があります。' },
  { icon: IconRefresh, title: '移管サポート無料', desc: '他社からの乗り換え・引き継ぎ対応もすべて無料で巻き取ります。OTAアカウントもそのまま。' },
  { icon: IconHeadset, title: '24時間対応体制', desc: 'ゲストトラブルにも24時間対応。多言語（日英中韓）でインバウンドゲストにも万全。' },
]

/* ─── Page ───────────────────────────────────────────── */

export default function Home() {
  const posts = getAllPosts().slice(0, 3)
  const featuredCases = getFeaturedCaseStudies()
  const mediaAppearances = getMediaAppearances()
  const trustBadges = getTrustBadges()
  const teamMembers = getTeamMembers()

  return (
    <>
      <Header />
      <FloatingCTA />
      <main>

        {/* ━━━ HERO ━━━ */}
        <section className="bg-white px-5 md:px-10 pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="max-w-container mx-auto flex flex-col items-center text-center">
            <img
              src="/sekai_stay_02_03.png"
              alt="SEKAI STAY"
              className="h-10 md:h-14 w-auto mb-8"
              width={280}
              height={56}
              loading="eager"
            />
            <h1 className="heading-display text-charcoal mb-5">
              稼働率を上げる。収益を上げる。<br />
              <span className="text-sekai-teal">成果</span>で選ばれる民泊運用代行
            </h1>
            <p className="text-[15px] text-dark-gray max-w-[560px] mb-10 leading-[1.8]">
              OTA運用・ゲスト対応・清掃管理・プライシング最適化を一括代行。
              全国7拠点のネットワークで、あなたの物件の収益を最大化します。
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-14 mb-12">
              {trustBadges.map(b => (
                <div key={b.id} className="flex flex-col items-center">
                  <span className="text-2xl md:text-[32px] font-bold text-sekai-teal leading-none">{b.value}</span>
                  <span className="text-[11px] font-bold tracking-[0.08em] text-mid-gray mt-2">{b.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="bg-sekai-teal hover:bg-deep-teal text-white font-bold px-8 py-3 rounded-btn transition text-[15px] text-center">
                無料で相談する
              </Link>
              <Link href="/case-studies" className="bg-transparent border border-charcoal text-charcoal hover:bg-cloud-white font-bold px-8 py-3 rounded-btn transition text-[15px] text-center">
                導入事例を見る
              </Link>
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* ━━━ AUTHORITY BAR ━━━ */}
        <section className="bg-white px-5 md:px-10 py-10">
          <div className="max-w-container mx-auto">
            <p className="section-label text-mid-gray text-center mb-6">Media & Awards</p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-14">
              {mediaAppearances.map(m => {
                const Icon = MEDIA_ICONS[m.type] || IconBuilding
                return (
                  <div key={m.id} className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition">
                    <div className="w-10 h-10 rounded-full bg-pale-gray flex items-center justify-center">
                      <Icon size={18} color="#5F6368" />
                    </div>
                    <span className="text-[11px] text-charcoal font-bold text-center whitespace-nowrap leading-tight">{m.name}</span>
                  </div>
                )
              })}
              <div className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition">
                <div className="w-10 h-10 rounded-full bg-pale-gray flex items-center justify-center">
                  <IconBuilding size={18} color="#5F6368" />
                </div>
                <span className="text-[11px] text-charcoal font-bold text-center leading-tight">国交大臣登録<br />第F05780号</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* ━━━ CASE STUDIES ━━━ */}
        <section className="bg-white px-5 md:px-10 section-heavy">
          <div className="max-w-container mx-auto">
            <p className="section-label text-sekai-teal mb-2">01 / Case Studies</p>
            <h2 className="heading-section text-charcoal mb-3">導入事例</h2>
            <p className="text-[15px] text-dark-gray mb-12 max-w-[560px] leading-[1.8]">
              一棟貸しヴィラからトレーラーハウス、町家まで。多様な物件タイプで収益向上を実現しています。
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {featuredCases.map(c => (
                <div key={c.id} className="bg-cloud-white rounded-xl overflow-hidden group">
                  <div className="aspect-[16/10] overflow-hidden relative bg-pale-gray">
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {c.tags.slice(0, 2).map((tag, j) => (
                        <span key={j} className="bg-teal-tint text-deep-teal text-[11px] font-bold px-3 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-[16px] font-bold text-charcoal mb-1">{c.name}</h3>
                    <p className="text-[13px] text-mid-gray mb-4">{c.location} / {c.type}</p>
                    <div className="space-y-2.5">
                      {c.results.occupancyAfter && (
                        <div className="flex justify-between items-center">
                          <span className="text-[13px] text-dark-gray">稼働率</span>
                          <span className="text-[14px] font-bold text-sekai-teal">{c.results.occupancyBefore} → {c.results.occupancyAfter}</span>
                        </div>
                      )}
                      {c.results.revenueAfter && (
                        <div className="flex justify-between items-center">
                          <span className="text-[13px] text-dark-gray">月間収益</span>
                          <span className="text-[14px] font-bold text-sekai-teal">{c.results.revenueAfter}</span>
                        </div>
                      )}
                      {c.results.reviewScore && (
                        <div className="flex justify-between items-center">
                          <span className="text-[13px] text-dark-gray">レビュー</span>
                          <span className="text-[14px] font-bold text-warning">★ {c.results.reviewScore}</span>
                        </div>
                      )}
                      {c.results.superhost && (
                        <div className="flex justify-end mt-1">
                          <span className="bg-teal-tint text-deep-teal text-[11px] font-bold px-3 py-1 rounded-full">Airbnb スーパーホスト</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/case-studies" className="text-[14px] font-bold text-sekai-teal hover:text-deep-teal transition">すべての導入事例を見る →</Link>
            </div>
          </div>
        </section>

        {/* ━━━ QUALITY ━━━ */}
        <section className="bg-cloud-white px-5 md:px-10 section-heavy">
          <div className="max-w-container mx-auto">
            <p className="section-label text-sekai-teal mb-2">02 / Quality</p>
            <h2 className="heading-section text-charcoal mb-12">ゲストに選ばれ続ける品質</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { label: '管理物件レビュー平均', value: '4.8', unit: '点', desc: '全管理物件のOTAレビュー平均。ゲスト対応・清掃品質・施設管理の3軸で高評価を維持。' },
                { label: 'Airbnb スーパーホスト', value: '認定', unit: '', desc: '全ホストの上位5%のみが取得できるステータス。年4回の厳正な審査を継続クリア。' },
                { label: 'Booking.com 評価', value: '10', unit: '点', desc: 'The Lake House Nojirikoが獲得した最高評価。ゲスト体験の質を追求し続けた結果です。' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-8 text-center">
                  <p className="text-[15px] text-charcoal font-bold mb-5">{item.label}</p>
                  <p className="stat-number text-sekai-teal">{item.value}<span className="text-[18px] font-bold">{item.unit}</span></p>
                  <p className="text-[14px] text-dark-gray mt-5 leading-[1.8]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ FEATURES ━━━ */}
        <section className="bg-white px-5 md:px-10 section-heavy">
          <div className="max-w-container mx-auto">
            <p className="section-label text-sekai-teal mb-2">03 / Features</p>
            <h2 className="heading-section text-charcoal mb-3">稼働率を上げる3つの強み</h2>
            <p className="text-[15px] text-dark-gray mb-12 max-w-[560px] leading-[1.8]">質の高い運営で稼働率とレビュースコアを引き上げ、物件の価値を最大化します。</p>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { icon: IconChart, title: 'OTA最適化で予約を最大化', desc: 'Airbnb・Booking.com・一休.comなど複数OTAに最適化されたリスティングを作成。ダイナミックプライシングで繁忙期の高単価運営と閑散期の稼働維持を両立。', highlights: ['マルチOTA掲載', 'ダイナミックプライシング', '多言語対応', '検索順位最適化'] },
                { icon: IconCheckCircle, title: '高品質な運営でレビューを守る', desc: 'プロ基準の清掃管理、24時間多言語ゲスト対応、トラブルの即時解決。ゲスト満足度を高め、★4.8以上のレビュースコアを維持。', highlights: ['プロ清掃管理', '24時間ゲスト対応', '多言語（日英中韓）', 'トラブル即対応'] },
                { icon: IconDashboard, title: '全部見える。オーナーダッシュボード', desc: '24時間いつでもどこでも、収益・稼働率・予約状況・レビューをリアルタイムで確認。「何をやっているかわからない」という不安をゼロに。', highlights: ['リアルタイム収益確認', '稼働率・予約状況', '月次レポート自動生成', 'スマホ対応'] },
              ].map((f, i) => {
                const Icon = f.icon
                return (
                  <div key={i} className="bg-cloud-white rounded-xl p-6 md:p-8">
                    <div className="w-10 h-10 rounded-lg bg-teal-tint flex items-center justify-center mb-5">
                      <Icon size={20} color="#259DA3" />
                    </div>
                    <h3 className="text-[16px] font-bold text-charcoal mb-3 leading-[1.4]">{f.title}</h3>
                    <p className="text-[14px] text-dark-gray leading-[1.8] mb-5">{f.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {f.highlights.map((h, j) => (
                        <span key={j} className="bg-teal-tint text-deep-teal text-[11px] font-bold px-3 py-1 rounded-full">{h}</span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ━━━ DASHBOARD ━━━ */}
        <section className="bg-pale-gray px-5 md:px-10 section-heavy">
          <div className="max-w-container mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="section-label text-sekai-teal mb-2">04 / Owner Dashboard</p>
                <h2 className="heading-section text-charcoal mb-5 leading-[1.4]">24時間365日、<br />あなたの物件を<br /><span className="text-sekai-teal">見える化</span></h2>
                <p className="text-[15px] text-dark-gray leading-[1.8] mb-8">「代行会社に任せたけど、何をやっているかわからない」そんな不安を解消するのが、SEKAI STAY独自のオーナーダッシュボードです。</p>
                <div className="space-y-3 mb-8">
                  {['リアルタイムの収益・稼働率をいつでも確認', '予約状況・ゲストレビューを一元管理', '月次レポートが自動生成・ダウンロード可能', 'スマートフォンからもアクセス可能'].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-teal-tint flex items-center justify-center flex-shrink-0 mt-0.5">
                        <IconCheck size={12} color="#259DA3" />
                      </div>
                      <span className="text-[14px] text-charcoal leading-[1.6]">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="inline-block bg-sekai-teal hover:bg-deep-teal text-white font-bold px-8 py-3 rounded-btn transition text-[14px]">デモを見る</Link>
              </div>
              <div className="bg-white rounded-xl p-5 md:p-6 border border-light-gray">
                <div className="bg-cloud-white rounded-lg p-5 mb-3">
                  <p className="section-label text-mid-gray mb-3">月間サマリー</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div><p className="text-[11px] text-mid-gray">今月の収益</p><p className="text-[18px] font-bold text-charcoal">¥1,340,000</p></div>
                    <div><p className="text-[11px] text-mid-gray">稼働率</p><p className="text-[18px] font-bold text-sekai-teal">82%</p></div>
                    <div><p className="text-[11px] text-mid-gray">平均単価</p><p className="text-[18px] font-bold text-charcoal">¥54,200</p></div>
                  </div>
                </div>
                <div className="bg-cloud-white rounded-lg p-5 mb-3">
                  <p className="section-label text-mid-gray mb-3">直近の予約</p>
                  {[
                    { guest: 'John S.', dates: '4/15–4/18', amount: '¥162,600', country: 'US' },
                    { guest: 'Tanaka Y.', dates: '4/20–4/22', amount: '¥108,400', country: 'JP' },
                    { guest: 'Kim M.', dates: '4/25–4/28', amount: '¥189,000', country: 'KR' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-light-gray last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-mid-gray bg-pale-gray px-1.5 py-0.5 rounded">{r.country}</span>
                        <span className="text-[13px] text-charcoal font-bold">{r.guest}</span>
                      </div>
                      <span className="text-[11px] text-mid-gray">{r.dates}</span>
                      <span className="text-[13px] font-bold text-sekai-teal">{r.amount}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-cloud-white rounded-lg p-5">
                  <p className="section-label text-mid-gray mb-3">レビュースコア推移</p>
                  <div className="flex items-end gap-1 h-16">
                    {[4.5, 4.6, 4.7, 4.8, 4.7, 4.9, 4.8, 4.9, 5.0, 4.8, 4.9, 4.8].map((v, i) => (
                      <div key={i} className="flex-1 bg-teal-tint rounded-t" style={{ height: `${(v - 4.0) * 100}%` }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-mid-gray font-mono">1月</span>
                    <span className="text-[10px] text-mid-gray font-mono">12月</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ ASSURANCE ━━━ */}
        <section className="bg-white px-5 md:px-10 section-heavy">
          <div className="max-w-container mx-auto">
            <p className="section-label text-sekai-teal mb-2">05 / Assurance</p>
            <h2 className="heading-section text-charcoal mb-3">安心して始められる理由</h2>
            <p className="text-[15px] text-dark-gray mb-12 max-w-[560px] leading-[1.8]">「試してみたいけど不安」を解消する、SEKAI STAYの安心設計。</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {ASSURANCE.map((a, i) => {
                const Icon = a.icon
                return (
                  <div key={i} className="bg-cloud-white rounded-xl p-6">
                    <div className="w-10 h-10 rounded-lg bg-teal-tint flex items-center justify-center mb-4">
                      <Icon size={20} color="#259DA3" />
                    </div>
                    <h3 className="text-[15px] font-bold text-charcoal mb-2">{a.title}</h3>
                    <p className="text-[14px] text-dark-gray leading-[1.8]">{a.desc}</p>
                    {a.note && <span className="inline-block mt-3 text-[11px] font-bold text-warning bg-[#FFFBEB] px-3 py-1 rounded-full">{a.note}</span>}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ━━━ PRICING ━━━ */}
        <section className="bg-teal-tint px-5 md:px-10 section-heavy">
          <div className="max-w-container mx-auto">
            <p className="section-label text-sekai-teal mb-2">06 / Pricing</p>
            <h2 className="heading-section text-charcoal mb-3">ここまでのサービスを、この価格で</h2>
            <p className="text-[15px] text-dark-gray max-w-[560px] mb-12 leading-[1.8]">レビュー平均4.8の運営品質、24時間オーナーダッシュボード、全国7拠点のサポート。すべて含んで、合理的な手数料です。</p>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white rounded-xl p-8 md:p-10 text-center">
                <h3 className="heading-sub text-charcoal mb-5">初期費用</h3>
                <p className="text-mid-gray text-[14px] line-through mb-1">通常 ¥100,000</p>
                <p className="stat-number text-sekai-teal">0<span className="text-[18px] font-bold">円</span></p>
                <span className="inline-block mt-4 text-[11px] font-bold text-warning bg-[#FFFBEB] px-4 py-1.5 rounded-full">キャンペーン中</span>
                <p className="text-[13px] text-dark-gray mt-4">OTA初期設定・画像加工・掲載開始まで含む</p>
              </div>
              <div className="bg-white rounded-xl p-8 md:p-10">
                <h3 className="heading-sub text-charcoal text-center mb-5">運営費用</h3>
                <div className="space-y-4">
                  <div className="bg-cloud-white rounded-lg p-5">
                    <p className="section-label text-mid-gray mb-2">固定管理費</p>
                    <p className="text-[18px] text-charcoal font-bold">¥5,000<span className="text-[14px] font-normal text-dark-gray"> / 1部屋 / 月</span></p>
                  </div>
                  <div className="bg-teal-tint rounded-lg p-6 text-center border border-[#C5E8E9]">
                    <p className="section-label text-sekai-teal mb-3">変動運営委託費</p>
                    <p className="flex items-baseline justify-center gap-1">
                      <span className="text-[14px] text-charcoal font-bold">売上の</span>
                      <span className="text-[64px] font-bold text-sekai-teal leading-none">8</span>
                      <span className="text-[24px] font-bold text-sekai-teal">%</span>
                    </p>
                    <p className="text-[13px] text-dark-gray mt-2">他社平均: 15〜25%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <Link href="/lp#diagnostic" className="inline-block bg-sekai-teal hover:bg-deep-teal text-white font-bold px-8 py-3 rounded-btn transition text-[14px]">収支シミュレーションはこちら</Link>
            </div>
          </div>
        </section>

        {/* ━━━ SERVICES ━━━ */}
        <section className="bg-cloud-white px-5 md:px-10 section-heavy">
          <div className="max-w-container mx-auto">
            <p className="section-label text-sekai-teal mb-2">07 / One-Stop Services</p>
            <h2 className="heading-section text-charcoal mb-3">民泊運営を支えるワンストップサービス</h2>
            <p className="text-[15px] text-dark-gray mb-12 max-w-[560px] leading-[1.8]">開業準備から運営代行、収益管理まで。すべてをワンストップでサポートします。</p>
            <div className="grid md:grid-cols-3 gap-5">
              {SERVICES.map((s, i) => (
                <Link key={i} href="/services" className="bg-white rounded-xl overflow-hidden group">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[15px] font-bold text-charcoal mb-1.5 group-hover:text-sekai-teal transition">{s.title}</h3>
                    <p className="text-[13px] text-dark-gray leading-[1.8]">{s.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ TEAM ━━━ */}
        <section className="bg-white px-5 md:px-10 section-heavy">
          <div className="max-w-container mx-auto">
            <p className="section-label text-sekai-teal mb-2">08 / Team</p>
            <h2 className="heading-section text-charcoal mb-12">運営チーム</h2>
            <div className="grid md:grid-cols-2 gap-5 max-w-[720px]">
              {teamMembers.map(m => (
                <div key={m.id} className="bg-cloud-white rounded-xl p-8 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-pale-gray flex items-center justify-center mb-4 overflow-hidden border border-light-gray">
                    <span className="text-2xl text-mid-gray font-bold">{m.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-charcoal">{m.name}</h3>
                  <p className="text-[12px] text-mid-gray mb-1 font-mono">{m.nameEn}</p>
                  <p className="text-[14px] font-bold text-sekai-teal mb-3">{m.role}</p>
                  <p className="text-[14px] text-dark-gray leading-[1.8]">{m.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ FLOW ━━━ */}
        <section className="bg-cloud-white px-5 md:px-10 section-heavy">
          <div className="max-w-container mx-auto">
            <p className="section-label text-sekai-teal mb-2">09 / Flow</p>
            <h2 className="heading-section text-charcoal mb-3">運営開始までの流れ</h2>
            <p className="text-[15px] text-dark-gray mb-12">お問い合わせから最短2週間で運営開始。移管コスト0円。</p>
            <div className="max-w-[720px]">
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-light-gray hidden md:block" />
                <div className="space-y-5">
                  {FLOW.map((f, i) => (
                    <div key={i} className="flex gap-5 items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sekai-teal text-white flex items-center justify-center font-bold text-[14px] relative z-10 font-mono">{f.step}</div>
                      <div className={`flex-1 rounded-xl p-6 ${i % 2 === 0 ? 'bg-white' : 'bg-teal-tint'}`}>
                        <h3 className="text-[15px] font-bold text-charcoal mb-2">{f.title}</h3>
                        <p className="text-[14px] text-dark-gray leading-[1.8]">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10">
                <Link href="/contact" className="inline-block bg-sekai-teal hover:bg-deep-teal text-white font-bold px-8 py-3 rounded-btn transition text-[14px]">無料で相談する</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ FAQ ━━━ */}
        <section className="bg-white px-5 md:px-10 section-heavy">
          <div className="max-w-container mx-auto max-w-[720px]">
            <p className="section-label text-sekai-teal mb-2">10 / FAQ</p>
            <h2 className="heading-section text-charcoal mb-12">よくあるご質問</h2>
            <div className="space-y-3">
              {FAQ.map((f, i) => (
                <details key={i} className="group bg-cloud-white rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between w-full p-6 cursor-pointer hover:bg-teal-tint/20 transition">
                    <h3 className="text-[14px] font-bold text-charcoal pr-4 flex items-start gap-3">
                      <span className="text-sekai-teal font-bold flex-shrink-0 font-mono">Q.</span>
                      {f.q}
                    </h3>
                    <svg className="w-4 h-4 text-mid-gray shrink-0 group-open:rotate-180 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <div className="px-6 pb-6 border-t border-light-gray">
                    <p className="text-[14px] text-dark-gray leading-[1.8] pt-4 pl-7">{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/faq" className="text-[14px] font-bold text-sekai-teal hover:text-deep-teal transition">FAQをもっと見る →</Link>
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* ━━━ NEWS ━━━ */}
        <section className="bg-white px-5 md:px-10 section-heavy">
          <div className="max-w-container mx-auto">
            <p className="section-label text-mid-gray mb-2">News</p>
            <h2 className="heading-section text-charcoal mb-8">お知らせ</h2>
            {posts.length > 0 ? (
              <div className="space-y-2">
                {posts.map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="block bg-cloud-white rounded-xl p-5 transition group hover:bg-teal-tint/20">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="bg-teal-tint text-deep-teal text-[11px] font-bold px-3 py-0.5 rounded-full">{post.category}</span>
                      <span className="text-[12px] text-mid-gray font-mono">{post.date}</span>
                    </div>
                    <h3 className="text-[14px] font-bold text-charcoal group-hover:text-sekai-teal transition">{post.title}</h3>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-[14px] text-mid-gray">最新のお知らせはまもなく公開されます。</p>
            )}
            <div className="mt-6">
              <Link href="/blog" className="text-[14px] font-bold text-sekai-teal hover:text-deep-teal transition">ニュースをもっと見る →</Link>
            </div>
          </div>
        </section>

        {/* ━━━ FINAL CTA ━━━ */}
        <section className="bg-teal-tint px-5 md:px-10 py-16 md:py-20">
          <div className="max-w-container mx-auto text-center">
            <h2 className="heading-section text-charcoal mb-4">あなたの物件のポテンシャル、<br />無料で診断します</h2>
            <p className="text-[15px] text-dark-gray leading-[1.8] mb-10 max-w-[480px] mx-auto">まずはお気軽にご相談ください。物件の収益ポテンシャル、現在の手数料との比較、最適な運営プランをご提案します。</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="bg-sekai-teal hover:bg-deep-teal text-white font-bold px-8 py-3 rounded-btn transition text-[14px]">無料で相談する</Link>
              <Link href="/diagnostic" className="bg-white border border-charcoal text-charcoal hover:bg-cloud-white font-bold px-8 py-3 rounded-btn transition text-[14px]">運営診断を受ける</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
