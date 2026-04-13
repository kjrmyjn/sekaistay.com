import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import ScrollFade from '@/components/ScrollFade'
import { getAllPosts } from '@/lib/blog'
import { getFeaturedCaseStudies } from '@/lib/case-studies'
import { getMediaAppearances, getTrustBadges, getTeamMembers } from '@/lib/media'
import {
  IconTV, IconTrophy, IconPlane, IconBuilding,
  IconCoinZero, IconShield, IconRefresh, IconHeadset,
  IconChart, IconCheckCircle, IconDashboard,
  IconCheck, IconGlobe, IconArrowRight,
} from '@/components/Icons'

/* ─── SEO Meta ────────────────────────────────── */

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

/* ─── Data ────────────────────────────────────── */

const OWNER_PAIN = [
  { text: '稼働率が上がらず、空室コストが嵩んでいる', delay: '' },
  { text: 'ゲスト対応に追われ、本業に集中できない', delay: 'delay-100' },
  { text: '複数OTAの管理がバラバラで手が回らない', delay: 'delay-200' },
  { text: 'レビュー悪化が止まらない', delay: 'delay-300' },
]

const SERVICES = [
  { title: '民泊運営代行', desc: '集客・インバウンド対応・清掃までワンストップ代行し、豊富な実績で民泊収益アップを実現。', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=500&fit=crop&q=80&auto=format' },
  { title: 'マルチOTA掲載', desc: 'Airbnb・Booking.com・Vrbo等の複数OTAに最適な形で掲載し、予約の取りこぼしをゼロに。', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80&auto=format' },
  { title: 'マンスリー運営', desc: '民泊新法の180日規制外も逃さず稼働させ、年間の収益を最大化する戦略をご提案。', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop&q=80&auto=format' },
  { title: '開業支援', desc: '民泊開業に必要な集客戦略、法令遵守、インバウンド対応などを支援し最短で安定した運営を実現。', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop&q=80&auto=format' },
  { title: '画像技術・掲載最適化', desc: 'スマホ写真を弊社の画像加工システムでプロ品質に仕上げ。カメラマン不要で高品質なリスティングを実現。', image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=500&fit=crop&q=80&auto=format' },
  { title: 'ダイナミックプライシング', desc: '周辺競合・季節変動・イベントを分析し、最適な価格を自動設定。稼働率と売上を最大化。', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80&auto=format' },
]

const FLOW = [
  { step: '01', title: 'お問い合わせ', desc: '物件の詳細やご要望をヒアリング。オンラインでも対面でも対応可能です。' },
  { step: '02', title: '収支シミュレーション', desc: 'エリアの市場データに基づいた収支予測を無料で作成します。' },
  { step: '03', title: '契約・移管', desc: '既存OTAの引き継ぎやリスティング最適化を実施。移管費用は0円。' },
  { step: '04', title: '開業準備', desc: '画像加工、OTA開設、ゲスト対応体制を同時並行で構築。最短2週間。' },
  { step: '05', title: '運営開始', desc: 'ダッシュボードを公開。24時間いつでも収益・稼働率を確認できます。' },
]

const FAQ = [
  { q: '最低契約期間はありますか？', a: 'ありません。いつでも解約可能で、違約金も0円です。成果でお選びいただけるよう、縛りは設けていません。' },
  { q: '他社から乗り換える場合、費用はかかりますか？', a: '移行コストは無料です。OTAアカウントの引き継ぎ、ゲストの予約引き継ぎ、掲載情報の最適化もすべて対応します。' },
  { q: '遠方の物件でも対応可能ですか？', a: '全国7拠点（東京・京都・沖縄・北海道・長野・町田）で対応しています。清掃パートナーネットワークで、どの地域でも同品質のサービスを提供します。' },
  { q: '宿泊がなかった月の費用は？', a: '固定管理費（月額5,000円/室）のみとなります。変動運営委託費（8%）は売上連動なので、宿泊がなければ発生しません。' },
  { q: 'オーナーダッシュボードとは何ですか？', a: 'オーナー様専用の管理画面です。24時間いつでもどこでも、物件の収益・稼働率・ゲストレビュー・予約状況をリアルタイムで確認できます。' },
  { q: '初期費用はいくらですか？', a: '通常10万円の初期費用が、今なら0円キャンペーン中です。OTA初期設定・画像加工・掲載開始まですべて含みます。' },
]

const MEDIA_ICONS: Record<string, typeof IconTV> = {
  tv: IconTV, award: IconTrophy, platform: IconPlane,
}

/* ─── Page ────────────────────────────────────── */

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

        {/* ━━━ HERO — asymmetric, problem-first ━━━ */}
        <section className="relative bg-white overflow-hidden">
          <div className="max-w-[1080px] mx-auto px-5 md:px-10 pt-16 pb-12 md:pt-24 md:pb-20">
            <div className="grid md:grid-cols-[1fr_0.7fr] gap-10 md:gap-16 items-center">
              {/* Left — text dominant */}
              <div>
                <div className="eyebrow text-sekai-teal mb-4">Vacation Rental Management</div>
                <h1 className="heading-hero text-charcoal mb-6">
                  あなたの物件を、<br />
                  <span className="text-sekai-teal">最高の収益資産</span>に変える。
                </h1>
                <p className="text-body text-dark-gray max-w-[480px] mb-8">
                  SEKAI STAYは管理物件レビュー平均4.8、Airbnbスーパーホスト認定の民泊運用代行です。OTA運用・ゲスト対応・清掃・プライシング最適化を一括代行し、全国7拠点であなたの物件の収益を最大化します。
                </p>

                {/* Trust cluster — immediately */}
                <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-[22px] font-bold text-sekai-teal">4.8</span>
                    <span className="text-caption text-dark-gray">レビュー平均</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[22px] font-bold text-sekai-teal">7</span>
                    <span className="text-caption text-dark-gray">全国拠点</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[22px] font-bold text-sekai-teal">8%</span>
                    <span className="text-caption text-dark-gray">手数料</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="bg-sekai-teal hover:bg-deep-teal text-white font-bold px-7 py-3.5 rounded-btn transition text-[15px] text-center"
                  >
                    無料で収益診断する
                  </Link>
                  <Link
                    href="/case-studies"
                    className="bg-transparent border border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-cloud-white font-bold px-7 py-3.5 rounded-btn transition text-[15px] text-center"
                  >
                    導入事例を見る
                  </Link>
                </div>
              </div>

              {/* Right — visual (asymmetric, overlapping elements) */}
              <div className="relative hidden md:block">
                <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                  <Image
                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=750&fit=crop&q=80&auto=format"
                    alt="SEKAI STAYが管理する高級ヴィラの外観"
                    width={600}
                    height={750}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                {/* Floating stat card — overlapping */}
                <div className="absolute -bottom-6 -left-10 bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-pale-gray">
                  <p className="text-caption text-dark-gray mb-1">導入後の平均稼働率改善</p>
                  <p className="text-[28px] font-bold text-sekai-teal leading-none">+24<span className="text-[16px]">%</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ AUTHORITY BAR — subtle, horizontal ━━━ */}
        <section className="bg-pale-gray/60 border-y border-light-gray">
          <div className="max-w-[1080px] mx-auto px-5 md:px-10 py-6">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {mediaAppearances.map(m => {
                const Icon = MEDIA_ICONS[m.type] || IconBuilding
                return (
                  <div key={m.id} className="flex items-center gap-2.5 opacity-70 hover:opacity-100 transition">
                    <Icon size={16} color="#5F6368" />
                    <span className="text-[12px] text-charcoal font-bold whitespace-nowrap">{m.name}</span>
                  </div>
                )
              })}
              <div className="flex items-center gap-2.5 opacity-70 hover:opacity-100 transition">
                <IconBuilding size={16} color="#5F6368" />
                <span className="text-[12px] text-charcoal font-bold">国交大臣登録 第F05780号</span>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ PAIN POINTS → SOLUTION (empathy-first) ━━━ */}
        <ScrollFade>
        <section className="bg-white section-xl px-5 md:px-10">
          <div className="max-w-[1080px] mx-auto">
            <div className="grid md:grid-cols-[0.45fr_1fr] gap-10 md:gap-20">
              {/* Left — problem framing */}
              <div>
                <div className="eyebrow text-dark-gray mb-3">Owner&apos;s Challenge</div>
                <h2 className="heading-section text-charcoal mb-4">
                  こんなお悩み、<br />
                  ありませんか？
                </h2>
                <div className="divider-teal" />
              </div>
              {/* Right — pain list + solution */}
              <div>
                <div className="space-y-4 mb-10">
                  {OWNER_PAIN.map((p, i) => (
                    <div key={i} className="flex items-start gap-4 bg-cloud-white rounded-xl p-5">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-danger/10 flex items-center justify-center">
                        <span className="text-danger text-[13px] font-bold">{i + 1}</span>
                      </span>
                      <p className="text-[15px] text-charcoal leading-relaxed">{p.text}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-teal-tint rounded-xl p-6 md:p-8 border border-sekai-teal/20">
                  <p className="text-[15px] text-charcoal leading-relaxed">
                    <span className="font-bold text-sekai-teal">SEKAI STAYは、これらすべてを解決します。</span><br />
                    OTA最適化、ダイナミックプライシング、24時間ゲスト対応、プロ清掃管理。手数料8%のワンストップ代行で、あなたの物件の収益を最大化します。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        </ScrollFade>

        {/* ━━━ CASE STUDIES — editorial cards ━━━ */}
        <ScrollFade>
        <section className="bg-cloud-white section-xl px-5 md:px-10">
          <div className="max-w-[1080px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <div className="eyebrow text-sekai-teal mb-3">Case Studies</div>
                <h2 className="heading-section text-charcoal">
                  オーナー様の成果が、<br />私たちの実績です
                </h2>
              </div>
              <Link href="/case-studies" className="text-[14px] font-bold text-sekai-teal hover:text-deep-teal transition mt-4 md:mt-0 flex items-center gap-1">
                すべての導入事例 <IconArrowRight size={14} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6 stagger">
              {featuredCases.map(c => (
                <div key={c.id} className="bg-white rounded-2xl overflow-hidden lift card-accent group">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <Image
                      src={c.image}
                      alt={c.name}
                      width={480}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {c.tags.slice(0, 2).map((tag, j) => (
                        <span key={j} className="bg-white/90 backdrop-blur-sm text-deep-teal text-[11px] font-bold px-3 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-[16px] font-bold text-charcoal mb-1">{c.name}</h3>
                    <p className="text-body-sm text-dark-gray mb-5">{c.location} / {c.type}</p>
                    {/* Result metrics — horizontal */}
                    <div className="flex gap-4 border-t border-pale-gray pt-4">
                      {c.results.occupancyAfter && (
                        <div>
                          <p className="text-caption text-dark-gray">稼働率</p>
                          <p className="text-[15px] font-bold text-sekai-teal">{c.results.occupancyBefore} → {c.results.occupancyAfter}</p>
                        </div>
                      )}
                      {c.results.reviewScore && (
                        <div>
                          <p className="text-caption text-dark-gray">レビュー</p>
                          <p className="text-[15px] font-bold text-warning">{c.results.reviewScore}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </ScrollFade>

        {/* ━━━ THREE STRENGTHS — asymmetric layout ━━━ */}
        <ScrollFade>
        <section className="bg-white section-xl px-5 md:px-10">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-14">
              <div className="eyebrow text-sekai-teal mb-3">Why SEKAI STAY</div>
              <h2 className="heading-section text-charcoal">稼働率を上げる3つの仕組み</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: IconChart,
                  title: 'OTA最適化で\n予約を最大化',
                  desc: 'Airbnb・Booking.com・一休.com等の複数OTAに最適化されたリスティングを作成。ダイナミックプライシングで繁忙期の高単価運営と閑散期の稼働維持を両立します。',
                  highlights: ['マルチOTA掲載', 'ダイナミックプライシング', '検索順位最適化'],
                },
                {
                  icon: IconCheckCircle,
                  title: '高品質な運営で\nレビューを守る',
                  desc: 'プロ基準の清掃管理、24時間多言語ゲスト対応、トラブルの即時解決。ゲスト満足度を高め、4.8以上のレビュースコアを維持します。',
                  highlights: ['プロ清掃管理', '24時間対応', '多言語（日英中韓）'],
                },
                {
                  icon: IconDashboard,
                  title: '全部見える。\nオーナーダッシュボード',
                  desc: '24時間いつでもどこでも、収益・稼働率・予約状況・レビューをリアルタイムで確認。「何をやっているかわからない」という不安をゼロに。',
                  highlights: ['リアルタイム収益確認', '月次レポート自動生成', 'スマホ対応'],
                },
              ].map((f, i) => {
                const Icon = f.icon
                return (
                  <div key={i} className="bg-cloud-white rounded-2xl p-7 md:p-8 lift">
                    <div className="w-11 h-11 rounded-xl bg-teal-tint flex items-center justify-center mb-5">
                      <Icon size={22} color="#259DA3" />
                    </div>
                    <h3 className="text-[16px] font-bold text-charcoal mb-3 leading-snug whitespace-pre-line">{f.title}</h3>
                    <p className="text-body-sm text-dark-gray mb-5">{f.desc}</p>
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
        </ScrollFade>

        {/* ━━━ DASHBOARD — asymmetric 60/40 with mock ━━━ */}
        <ScrollFade>
        <section className="bg-charcoal text-white section-xl px-5 md:px-10 relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="max-w-[1080px] mx-auto relative">
            <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-14 items-center">
              <div>
                <div className="eyebrow text-bright-teal mb-3">Owner Dashboard</div>
                <h2 className="heading-section text-white mb-5 leading-snug">
                  24時間365日、<br />あなたの物件を見える化
                </h2>
                <p className="text-body text-white/90 mb-8 max-w-[420px]">
                  「代行会社に任せたけど、何をやっているかわからない」そんな不安を解消するのが、SEKAI STAY独自のオーナーダッシュボードです。
                </p>
                <div className="space-y-3 mb-8">
                  {['リアルタイムの収益・稼働率をいつでも確認', '予約状況・ゲストレビューを一元管理', '月次レポートが自動生成・ダウンロード可能', 'スマートフォンからもアクセス'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-bright-teal/20 flex items-center justify-center flex-shrink-0">
                        <IconCheck size={11} color="#54BEC3" />
                      </div>
                      <span className="text-[14px] text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="inline-block bg-sekai-teal hover:bg-bright-teal text-white font-bold px-7 py-3 rounded-btn transition text-[14px]">
                  デモを見る
                </Link>
              </div>
              {/* Dashboard Mock */}
              <div className="bg-white/[0.10] backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-white/10">
                <div className="bg-white/[0.10] rounded-lg p-5 mb-3">
<<<<<<< HEAD
                  <p className="eyebrow text-white/70 mb-3">月間サマリー</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div><p className="text-caption text-white/70">今月の収益</p><p className="text-[18px] font-bold text-white">¥1,340,000</p></div>
                    <div><p className="text-caption text-white/70">稼働率</p><p className="text-[18px] font-bold text-bright-teal">82%</p></div>
                    <div><p className="text-caption text-white/70">平均単価</p><p className="text-[18px] font-bold text-white">¥54,200</p></div>
                  </div>
                </div>
                <div className="bg-white/[0.10] rounded-lg p-5 mb-3">
                  <p className="eyebrow text-white/70 mb-3">直近の予約</p>
=======
                  <p className="eyebrow text-white/85 mb-3">月間サマリー</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div><p className="text-caption text-white/85">今月の収益</p><p className="text-[18px] font-bold text-white">¥1,340,000</p></div>
                    <div><p className="text-caption text-white/85">稼働率</p><p className="text-[18px] font-bold text-bright-teal">82%</p></div>
                    <div><p className="text-caption text-white/85">平均単価</p><p className="text-[18px] font-bold text-white">¥54,200</p></div>
                  </div>
                </div>
                <div className="bg-white/[0.10] rounded-lg p-5 mb-3">
                  <p className="eyebrow text-white/85 mb-3">直近の予約</p>
>>>>>>> design-system-redesign
                  {[
                    { guest: 'John S.', dates: '4/15–4/18', amount: '¥162,600', country: 'US' },
                    { guest: 'Tanaka Y.', dates: '4/20–4/22', amount: '¥108,400', country: 'JP' },
                    { guest: 'Kim M.', dates: '4/25–4/28', amount: '¥189,000', country: 'KR' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-bold text-white/80 bg-white/10 px-1.5 py-0.5 rounded">{r.country}</span>
                        <span className="text-[13px] text-white font-bold">{r.guest}</span>
                      </div>
<<<<<<< HEAD
                      <span className="text-caption text-white/70">{r.dates}</span>
=======
                      <span className="text-caption text-white/85">{r.dates}</span>
>>>>>>> design-system-redesign
                      <span className="text-[13px] font-bold text-bright-teal">{r.amount}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white/[0.10] rounded-lg p-5">
<<<<<<< HEAD
                  <p className="eyebrow text-white/70 mb-3">レビュースコア推移</p>
=======
                  <p className="eyebrow text-white/85 mb-3">レビュースコア推移</p>
>>>>>>> design-system-redesign
                  <div className="flex items-end gap-1 h-16">
                    {[4.5, 4.6, 4.7, 4.8, 4.7, 4.9, 4.8, 4.9, 5.0, 4.8, 4.9, 4.8].map((v, i) => (
                      <div key={i} className="flex-1 bg-bright-teal/30 rounded-t" style={{ height: `${(v - 4.0) * 100}%` }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
<<<<<<< HEAD
                    <span className="text-[10px] text-white/60 font-mono">1月</span>
                    <span className="text-[10px] text-white/60 font-mono">12月</span>
=======
                    <span className="text-[10px] text-white/80 font-mono">1月</span>
                    <span className="text-[10px] text-white/80 font-mono">12月</span>
>>>>>>> design-system-redesign
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </ScrollFade>

        {/* ━━━ ASSURANCE — risk reversal ━━━ */}
        <ScrollFade>
        <section className="bg-white section-lg px-5 md:px-10">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-12">
              <div className="eyebrow text-sekai-teal mb-3">Risk Free</div>
              <h2 className="heading-section text-charcoal">安心して始められる4つの理由</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: IconCoinZero, title: '初期費用0円', desc: '通常10万円の初期費用が今なら0円。OTA設定・画像加工・掲載まですべて含みます。', accent: true },
                { icon: IconShield, title: '違約金ゼロ', desc: 'いつでも解約可能。最低契約期間もなし。成果で選んでいただける自信があります。' },
                { icon: IconRefresh, title: '移管サポート無料', desc: '他社からの乗り換え・引き継ぎ対応もすべて無料。OTAアカウントもそのまま。' },
                { icon: IconHeadset, title: '24時間対応体制', desc: 'ゲストトラブルにも24時間対応。多言語（日英中韓）でインバウンドにも万全。' },
              ].map((a, i) => {
                const Icon = a.icon
                return (
                  <div key={i} className={`rounded-2xl p-6 lift ${a.accent ? 'bg-teal-tint border border-sekai-teal/20' : 'bg-cloud-white'}`}>
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm">
                      <Icon size={20} color="#259DA3" />
                    </div>
                    <h3 className="text-[15px] font-bold text-charcoal mb-2">{a.title}</h3>
                    <p className="text-body-sm text-dark-gray">{a.desc}</p>
                    {a.accent && <span className="inline-block mt-3 text-[11px] font-bold text-warning bg-[#FFFBEB] px-3 py-1 rounded-full">キャンペーン中</span>}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        </ScrollFade>

        {/* ━━━ PRICING — clean, transparent ━━━ */}
        <ScrollFade>
        <section className="bg-teal-tint section-xl px-5 md:px-10">
          <div className="max-w-[860px] mx-auto">
            <div className="text-center mb-12">
              <div className="eyebrow text-sekai-teal mb-3">Pricing</div>
              <h2 className="heading-section text-charcoal">ここまでのサービスを、この価格で</h2>
              <p className="text-body text-dark-gray mt-3 max-w-[480px] mx-auto">レビュー平均4.8の運営品質、24時間ダッシュボード、全国7拠点のサポート。すべて含んで、合理的な手数料です。</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Initial cost */}
              <div className="bg-white rounded-2xl p-8 text-center">
                <h3 className="heading-sub text-charcoal mb-5">初期費用</h3>
                <p className="text-dark-gray text-[14px] line-through mb-1">通常 ¥100,000</p>
                <p className="stat-number text-sekai-teal">0<span className="text-[18px] font-bold">円</span></p>
                <span className="inline-block mt-4 text-[11px] font-bold text-warning bg-[#FFFBEB] px-4 py-1.5 rounded-full">キャンペーン中</span>
                <p className="text-body-sm text-dark-gray mt-4">OTA初期設定・画像加工・掲載開始まで含む</p>
              </div>
              {/* Running cost */}
              <div className="bg-white rounded-2xl p-8">
                <h3 className="heading-sub text-charcoal text-center mb-5">運営費用</h3>
                <div className="space-y-4">
                  <div className="bg-cloud-white rounded-xl p-5">
                    <p className="eyebrow text-dark-gray mb-2">固定管理費</p>
                    <p className="text-[18px] text-charcoal font-bold">¥5,000<span className="text-[14px] font-normal text-dark-gray"> / 1部屋 / 月</span></p>
                  </div>
                  <div className="bg-teal-tint rounded-xl p-6 text-center border border-sekai-teal/20">
                    <p className="eyebrow text-sekai-teal mb-3">変動運営委託費</p>
                    <p className="flex items-baseline justify-center gap-1">
                      <span className="text-[14px] text-charcoal font-bold">売上の</span>
                      <span className="stat-lg text-sekai-teal">8</span>
                      <span className="text-[24px] font-bold text-sekai-teal">%</span>
                    </p>
                    <p className="text-body-sm text-dark-gray mt-2">他社平均: 15〜25%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 text-center">
              <Link href="/simulate" className="inline-block bg-sekai-teal hover:bg-deep-teal text-white font-bold px-7 py-3 rounded-btn transition text-[14px]">
                収支シミュレーションを試す
              </Link>
            </div>
          </div>
        </section>
        </ScrollFade>

        {/* ━━━ SERVICES — scrollable cards, editorial ━━━ */}
        <ScrollFade>
        <section className="bg-white section-xl px-5 md:px-10">
          <div className="max-w-[1080px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <div className="eyebrow text-sekai-teal mb-3">One-Stop Services</div>
                <h2 className="heading-section text-charcoal">民泊運営のすべてを、ワンストップで</h2>
              </div>
              <Link href="/services" className="text-[14px] font-bold text-sekai-teal hover:text-deep-teal transition mt-4 md:mt-0 flex items-center gap-1">
                サービス詳細 <IconArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s, i) => (
                <Link key={i} href="/services" className="bg-cloud-white rounded-2xl overflow-hidden lift card-accent group">
                  <div className="aspect-[16/10] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      width={480}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[15px] font-bold text-charcoal mb-1.5 group-hover:text-sekai-teal transition">{s.title}</h3>
                    <p className="text-body-sm text-dark-gray">{s.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        </ScrollFade>

        {/* ━━━ TEAM — warm, personal ━━━ */}
        <ScrollFade>
        <section className="bg-cloud-white section-lg px-5 md:px-10">
          <div className="max-w-[860px] mx-auto">
            <div className="text-center mb-12">
              <div className="eyebrow text-sekai-teal mb-3">Team</div>
              <h2 className="heading-section text-charcoal">運営チーム</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {teamMembers.map(m => (
                <div key={m.id} className="bg-white rounded-2xl p-8 flex flex-col items-center text-center lift">
                  <div className="w-20 h-20 rounded-full bg-pale-gray flex items-center justify-center mb-4 border-2 border-teal-tint">
                    <span className="text-2xl text-sekai-teal font-bold">{m.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-charcoal">{m.name}</h3>
                  <p className="text-caption text-dark-gray mb-1 font-mono">{m.nameEn}</p>
                  <p className="text-[14px] font-bold text-sekai-teal mb-3">{m.role}</p>
                  <p className="text-body-sm text-dark-gray">{m.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        </ScrollFade>

        {/* ━━━ FLOW — numbered timeline, clean ━━━ */}
        <ScrollFade>
        <section className="bg-white section-xl px-5 md:px-10">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-14">
              <div className="eyebrow text-sekai-teal mb-3">How It Works</div>
              <h2 className="heading-section text-charcoal">運営開始まで、最短2週間</h2>
              <p className="text-body text-dark-gray mt-3">お問い合わせから運営開始まで。移管コスト0円。</p>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[23px] top-0 bottom-0 w-px bg-light-gray hidden md:block" />
              <div className="space-y-6">
                {FLOW.map((f, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sekai-teal text-white flex items-center justify-center font-bold text-[14px] relative z-10 font-mono">
                      {f.step}
                    </div>
                    <div className="flex-1 bg-cloud-white rounded-xl p-5 md:p-6">
                      <h3 className="text-[15px] font-bold text-charcoal mb-1.5">{f.title}</h3>
                      <p className="text-body-sm text-dark-gray">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 text-center">
              <Link href="/contact" className="inline-block bg-sekai-teal hover:bg-deep-teal text-white font-bold px-7 py-3 rounded-btn transition text-[14px]">
                無料で相談する
              </Link>
            </div>
          </div>
        </section>
        </ScrollFade>

        {/* ━━━ FAQ — with FAQPage JSON-LD ━━━ */}
        <ScrollFade>
        <section className="bg-cloud-white section-lg px-5 md:px-10">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-12">
              <div className="eyebrow text-sekai-teal mb-3">FAQ</div>
              <h2 className="heading-section text-charcoal">よくあるご質問</h2>
            </div>
            <div className="space-y-3">
              {FAQ.map((f, i) => (
                <details key={i} className="group bg-white rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between w-full p-5 md:p-6 cursor-pointer hover:bg-teal-tint/30 transition">
                    <h3 className="text-[14px] font-bold text-charcoal pr-4 flex items-start gap-3">
                      <span className="text-sekai-teal font-bold flex-shrink-0 font-mono">Q.</span>
                      {f.q}
                    </h3>
                    <svg className="w-4 h-4 text-dark-gray shrink-0 group-open:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-pale-gray">
                    <p className="text-body-sm text-dark-gray pt-4 pl-7">{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/faq" className="text-[14px] font-bold text-sekai-teal hover:text-deep-teal transition">FAQをもっと見る →</Link>
            </div>
          </div>
          {/* FAQPage JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: FAQ.map(f => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: f.a,
                  },
                })),
              }),
            }}
          />
        </section>
        </ScrollFade>

        {/* ━━━ BLOG / NEWS ━━━ */}
        <ScrollFade>
        <section className="bg-white section-lg px-5 md:px-10">
          <div className="max-w-[1080px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
              <div>
                <div className="eyebrow text-dark-gray mb-3">News</div>
                <h2 className="heading-section text-charcoal">お知らせ</h2>
              </div>
              <Link href="/blog" className="text-[14px] font-bold text-sekai-teal hover:text-deep-teal transition mt-4 md:mt-0 flex items-center gap-1">
                すべてのコラム <IconArrowRight size={14} />
              </Link>
            </div>
            {posts.length > 0 ? (
              <div className="space-y-2">
                {posts.map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="block bg-cloud-white rounded-xl p-5 transition group hover:bg-teal-tint/30">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="bg-teal-tint text-deep-teal text-[11px] font-bold px-3 py-0.5 rounded-full">{post.category}</span>
                      <span className="text-caption text-dark-gray font-mono">{post.date}</span>
                    </div>
                    <h3 className="text-[14px] font-bold text-charcoal group-hover:text-sekai-teal transition">{post.title}</h3>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-body-sm text-dark-gray">最新のお知らせはまもなく公開されます。</p>
            )}
          </div>
        </section>
        </ScrollFade>

        {/* ━━━ FINAL CTA — warm, not aggressive ━━━ */}
        <section className="bg-charcoal text-white section-xl px-5 md:px-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="max-w-[640px] mx-auto text-center relative">
            <div className="eyebrow text-bright-teal mb-4">Get Started</div>
            <h2 className="heading-section text-white mb-4">あなたの物件のポテンシャル、<br />無料で診断します</h2>
            <p className="text-body text-white/90 mb-10">まずはお気軽にご相談ください。物件の収益ポテンシャル、現在の手数料との比較、最適な運営プランをご提案します。</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="bg-sekai-teal hover:bg-bright-teal text-white font-bold px-8 py-3.5 rounded-btn transition text-[15px]">
                無料で収益診断する
              </Link>
              <Link href="/diagnostic" className="bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 font-bold px-8 py-3.5 rounded-btn transition text-[15px]">
                運営診断を受ける
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ WebSite + Service JSON-LD ━━━ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'SEKAI STAY',
              url: 'https://sekaistay.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: { '@type': 'EntryPoint', urlTemplate: 'https://sekaistay.com/blog?q={search_term_string}' },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: '民泊運用代行',
              provider: {
                '@type': 'Organization',
                name: 'SEKAI STAY',
                url: 'https://sekaistay.com',
              },
              serviceType: '民泊運用代行・管理代行',
              areaServed: { '@type': 'Country', name: 'JP' },
              description: '管理物件レビュー平均4.8・Airbnbスーパーホスト認定。OTA運用・ゲスト対応・清掃・プライシング最適化を一括代行。全国7拠点・手数料8%。',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'JPY',
                description: '初期費用0円キャンペーン中。変動運営委託費は売上の8%。',
              },
            }),
          }}
        />
      </main>
      <Footer />
    </>
  )
}
