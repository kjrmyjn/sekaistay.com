import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import { IMG } from '@/lib/images'
import { IconCheck, IconStar, IconArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: '民泊運営サービス',
  description: 'SEKAI STAYの民泊運用代行サービス。手数料8%で開業準備から運用管理・集客まで一括対応。運営実績・オーナー様の声・料金設計もご確認いただけます。',
  openGraph: {
    title: '民泊運営サービス | SEKAI STAY',
    description: '手数料8%で開業準備から運用管理・集客まで一括対応。9つのサービスをワンストップで提供。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://sekaistay.com/services',
    siteName: 'SEKAI STAY',
  },
  twitter: {
    card: 'summary_large_image',
    title: '民泊運営サービス | SEKAI STAY',
    description: '手数料8%で開業準備から運用管理・集客まで一括対応。9つのサービスをワンストップで提供。',
  },
  alternates: { canonical: 'https://sekaistay.com/services' },
}

const SERVICE_CARDS = [
  {
    title: '民泊運営代行',
    desc: '集客・インバウンド対応・清掃までワンストップ代行。AirbnbやBooking.comなどのOTA運用は専属チームが対応し、予約管理からゲスト対応まで一括で代行します。',
    details: ['複数OTAへの最適掲載', '24時間多言語ゲスト対応', '予約・売上管理', 'レビュー管理・改善'],
    image: IMG.svcManagement,
  },
  {
    title: 'マルチOTA掲載',
    desc: 'エリアや物件特性を活かし、Airbnb・Booking.com・Vrbo・Expedia等の複数OTAに最適な形で掲載。1つのOTAに留まらず、集客チャネルを最大化します。',
    details: ['物件特性に合ったOTA選定', 'エリア別の最適掲載戦略', '複数OTA間の在庫同期', '掲載コンテンツの継続最適化'],
    image: IMG.svcOta,
  },
  {
    title: 'マンスリー運営',
    desc: '民泊新法の180日規制外も逃さず稼働。マンスリー賃貸と民泊を柔軟に組み合わせ、年間の収益を最大化する戦略をご提案します。',
    details: ['民泊＋マンスリー併用戦略', '法令遵守の稼働日数管理', 'マンスリー専用OTA掲載', '年間収益シミュレーション'],
    image: IMG.svcMonthly,
  },
  {
    title: '開業支援',
    desc: '民泊開業に必要な集客戦略、インバウンド対応、オペレーション構築などを支援し最短で安定した運営を実現。初めての方でも安心してスタートできます。',
    details: ['事業計画・収益シミュレーション', 'オペレーション体制構築', 'OTA初期設定・掲載開始', '物件の差別化戦略立案'],
    image: IMG.svcStartup,
  },
  {
    title: '画像技術・掲載最適化',
    desc: 'プロカメラマン不要。お手持ちのスマホで撮影いただいた写真を、弊社の画像加工システムでトンマナを統一し、プロ品質のリスティングに仕上げます。',
    details: ['スマホ写真をプロ品質に加工', 'ブランドトンマナの自動統一', 'OTA最適サイズへのリサイズ', '掲載写真の継続的な改善提案'],
    image: IMG.svcPhoto,
  },
  {
    title: '清掃・メンテナンス',
    desc: 'ゲストの評価に直結するハイクオリティな清掃を徹底管理。専属スタッフがチェックリストに基づき品質を保証します。',
    details: ['チェックアウト後の清掃手配', 'リネン・アメニティ在庫管理', '設備の定期点検・修繕', '清掃品質チェックリスト検品'],
    image: IMG.svcCleaning,
  },
  {
    title: 'ダイナミックプライシング',
    desc: '周辺の競合価格、季節変動、イベント情報、予約動向をリアルタイムに分析。最適な価格を自動設定し、稼働率と売上の最大化を図ります。',
    details: ['競合物件の価格モニタリング', '需要予測に基づく価格自動調整', '長期滞在・直前割引の最適化', '月次収益レポート'],
    image: IMG.svcPricing,
  },
  {
    title: 'オーナーダッシュボード',
    desc: '24時間いつでもどこでもアクセス可能なオーナー専用ダッシュボード。リアルタイムで収益・稼働状況・レビューを確認。さらに月次の詳細レポートで、データに基づいた改善提案を実施。',
    details: ['リアルタイム収支・稼働率表示', '24h / PC・スマホ対応', '月次詳細レポート配信', 'データに基づく改善提案'],
    image: IMG.svcDashboard,
  },
  {
    title: 'コンサルティング',
    desc: '豊富な実績に基づき、開業前の事業コンセプトから成功を支援。物件の収益ポテンシャルを最大化するための戦略をご提案します。',
    details: ['物件診断・収益分析', '競合調査・エリア分析', '投資回収期間の試算', '運営改善提案'],
    image: IMG.svcConsulting,
  },
]

const REVENUE_CASES = [
  {
    area: '京都の民泊実績',
    spec: '一棟貸し / 町家リノベーション / 最大8名',
    pctUp: '209',
    before: { monthly: '185,000', annual: '2,220,000' },
    after: { monthly: '387,000', annual: '4,644,000' },
  },
  {
    area: '湖畔エリアの実績',
    spec: '高級ヴィラ / 220㎡ / 1日1組限定',
    pctUp: '178',
    before: { monthly: '320,000', annual: '3,840,000' },
    after: { monthly: '570,000', annual: '6,840,000' },
  },
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

export default function ServicesPage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: '民泊運営サービス' }]} />
      <FloatingCTA />
      <main>
        {/* Hero */}
        <section className="bg-warm-gradient px-6 section-heavy">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3">Services</p>
            <h1 className="heading-display text-charcoal mb-6">
              <span className="text-deep-teal">民泊運営</span>を支える<br />ワンストップサービス
            </h1>
            <p className="text-base text-dark-gray leading-relaxed max-w-2xl mx-auto">
              SEKAI STAYは開業準備から運営代行、収益管理まで、すべてをワンストップでサポート。
              <strong className="text-deep-teal">手数料8%</strong>の業界革命価格で、高品質な運営を実現します。
            </p>
          </div>
        </section>

        {/* 8% Banner */}
        <section className="bg-deep-teal px-6 py-10 md:py-14">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6">
            <p className="flex items-baseline gap-1">
              <span className="text-sm text-white/85 font-bold">手数料</span>
              <span className="text-[80px] md:text-[100px] font-black text-white leading-none tracking-tighter">8</span>
              <span className="text-3xl md:text-4xl font-black text-amber-300">%</span>
            </p>
            <div className="w-px h-16 bg-white/20 hidden md:block" />
            <div className="text-center md:text-left">
              <p className="text-white font-bold text-lg mb-1">これだけのサービスが、すべて含まれています</p>
              <p className="text-white/80 text-sm">他社平均15〜25%、SEKAI STAYなら8%。初期費用は今なら0円。</p>
            </div>
          </div>
        </section>

        {/* Service Grid */}
        <section className="px-6 section-heavy">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {SERVICE_CARDS.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-light-gray overflow-hidden hover:shadow-lg hover:border-deep-teal/20 transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-deep-teal mb-3">{s.title}</h3>
                    <p className="text-sm text-dark-gray leading-relaxed mb-5">{s.desc}</p>
                    <div className="space-y-2">
                      {s.details.map((d, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm text-dark-gray">
                          <IconCheck size={14} className="text-sekai-teal mt-0.5 flex-shrink-0" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ 実績セクション ━━━ */}
        <section className="bg-pale-gray px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Results</p>
            <h2 className="heading-section text-charcoal text-center mb-4">
              民泊収益アップ実績
            </h2>
            <p className="text-sm text-dark-gray text-center mb-16 max-w-2xl mx-auto leading-relaxed">
              SEKAI STAYに切り替えたオーナー様の実際の収益改善データ。<strong className="text-deep-teal">8%の手数料</strong>だから、同じ売上でも手取りが圧倒的に違います。
            </p>

            {/* Quality Stats */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white border-2 border-light-gray rounded-2xl p-8 text-center">
                <p className="text-sm text-charcoal font-bold mb-2">Airbnb ホストレビュー平均</p>
                <p className="stat-number text-deep-teal">4.7<span className="text-3xl">点</span></p>
                <p className="text-xs text-dark-gray mt-3">5点満点中</p>
              </div>
              <div className="bg-white border-2 border-light-gray rounded-2xl p-8 text-center">
                <p className="text-sm text-charcoal font-bold mb-2">Booking.com 平均口コミスコア</p>
                <p className="stat-number text-deep-teal">4.8<span className="text-3xl">点</span></p>
                <p className="text-xs text-dark-gray mt-3">5点満点中</p>
              </div>
            </div>

            {/* Revenue Cases */}
            <div className="grid md:grid-cols-2 gap-6">
              {REVENUE_CASES.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl border border-light-gray p-6 md:p-8">
                  <h3 className="text-lg font-bold text-charcoal mb-1">{c.area}</h3>
                  <p className="text-xs text-dark-gray mb-6">{c.spec}</p>
                  <div className="text-center mb-6">
                    <p className="stat-number text-deep-teal">{c.pctUp}<span className="text-2xl">%</span></p>
                    <p className="text-xs text-dark-gray mt-1">収益改善率</p>
                  </div>
                  <div className="flex items-end gap-4 justify-center mb-6 h-28">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 bg-light-gray rounded-t" style={{ height: '45%' }} />
                      <p className="text-[10px] text-dark-gray">他社/自主運営</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 bg-deep-teal rounded-t" style={{ height: '90%' }} />
                      <p className="text-[10px] text-deep-teal font-bold">SEKAI STAY</p>
                    </div>
                  </div>
                  <div className="border-t border-light-gray pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-gray">粗利（月）</span>
                      <span className="text-dark-gray line-through text-xs">¥{c.before.monthly}</span>
                      <span className="text-deep-teal font-bold">¥{c.after.monthly}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-gray">粗利（年）</span>
                      <span className="text-dark-gray line-through text-xs">¥{c.before.annual}</span>
                      <span className="text-deep-teal font-bold">¥{c.after.annual}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/portfolio" className="group inline-flex items-center gap-2 text-sm font-bold text-deep-teal border-2 border-deep-teal px-8 py-3 rounded-lg hover:bg-teal-tint transition">
                実績をもっとみる
                <IconArrowRight size={14} className="group-hover:translate-x-0.5 transition" />
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ オーナー様からの声 ━━━ */}
        <section className="px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Voice</p>
            <h2 className="heading-section text-charcoal text-center mb-16">
              オーナー様からの声
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
                      <p className="text-xs text-dark-gray">{t.role}</p>
                    </div>
                    <span className="ml-auto inline-flex items-center gap-0.5 text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full">
                      <IconStar size={11} className="text-amber-400" />
                      {t.rating}
                    </span>
                  </div>
                  <p className="text-sm text-dark-gray leading-relaxed flex-1">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ 明確な料金設計 ━━━ */}
        <section className="bg-deep-teal px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-white/90 tracking-[0.2em] uppercase mb-3 text-center">Pricing</p>
            <h2 className="heading-section text-white text-center mb-6">
              明確な料金設計
            </h2>
            <p className="text-sm text-white/90 text-center max-w-2xl mx-auto mb-16 leading-relaxed">
              民泊運営代行サービスをご利用いただく際には、開業準備時の「初期費用」と、運営開始後の「月額運営費用」が発生します。
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Initial Cost */}
              <div className="bg-white/20 backdrop-blur rounded-2xl p-8 md:p-10 border border-white/10">
                <h3 className="text-2xl font-bold text-white text-center mb-6">初期費用</h3>
                <div className="text-center mb-6">
                  <p className="text-white/90 text-sm line-through mb-1">通常 ¥100,000</p>
                  <p className="stat-number text-white">0<span className="text-2xl">円</span></p>
                  <span className="inline-block mt-3 bg-amber-400/20 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-400/30">
                    キャンペーン中
                  </span>
                </div>
                <p className="text-sm text-white/90 text-center">OTA初期設定・画像加工・掲載開始まで含む</p>
              </div>

              {/* Running Cost */}
              <div className="bg-white/20 backdrop-blur rounded-2xl p-8 md:p-10 border border-white/10">
                <h3 className="text-2xl font-bold text-white text-center mb-6">運営費用</h3>
                <div className="space-y-4">
                  <div className="bg-white/[0.15] rounded-xl p-5">
                    <p className="text-xs text-white font-bold uppercase tracking-wider mb-2">固定管理費</p>
                    <p className="text-lg text-white font-bold">¥5,000<span className="text-sm font-normal text-white/90"> / 1部屋 / 月</span></p>
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

            {/* Comparison Table — 白背景で視認性を確保 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-3 text-center">
                <div className="p-4 border-b border-pale-gray bg-cloud-white" />
                <div className="p-4 border-b border-pale-gray bg-deep-teal">
                  <p className="text-white font-bold text-sm">SEKAI STAY</p>
                </div>
                <div className="p-4 border-b border-pale-gray bg-cloud-white">
                  <p className="text-dark-gray font-bold text-sm">他社平均</p>
                </div>
              </div>
              {[
                ['運営手数料', '8%', '15〜25%'],
                ['初期費用', '0円（キャンペーン）', '10〜30万円'],
                ['最低契約期間', 'なし', '6〜12ヶ月'],
                ['解約手数料', '0円', '1〜3ヶ月分'],
                ['オーナーダッシュボード', '24h対応', '月次報告のみ'],
                ['画像加工', 'スマホ写真OK', 'カメラマン手配別料金'],
                ['マルチOTA掲載', '標準対応', 'オプション料金'],
                ['清掃管理', '標準対応', '別途清掃費'],
              ].map(([label, sekai, other], i) => (
                <div key={i} className="grid grid-cols-3 text-center border-b border-pale-gray last:border-0">
                  <div className="p-4 text-left bg-cloud-white">
                    <p className="text-charcoal text-sm font-medium">{label}</p>
                  </div>
                  <div className="p-4 bg-teal-tint/40">
                    <p className="text-deep-teal font-bold text-sm">{sekai}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-dark-gray text-sm">{other}</p>
                  </div>
                </div>
              ))}
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

        {/* Process */}
        <section className="bg-pale-gray px-6 section-heavy">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3 text-center">Process</p>
            <h2 className="heading-section text-charcoal text-center mb-4">
              開業から運営までの流れ
            </h2>
            <p className="text-sm text-dark-gray text-center mb-16">
              ─ 「契約締結」から「開業」まで最短で二週間 ─
            </p>
            <div className="space-y-6">
              {[
                { step: '01', title: 'ヒアリング・物件診断', desc: 'お客様のご希望と物件の詳細をお伺いし、収益ポテンシャルを分析。最適な運営方法をご提案します。' },
                { step: '02', title: '収支シミュレーション・ご提案', desc: '物件の立地や特徴に応じた収支シミュレーションを作成。事業計画を明確にします。' },
                { step: '03', title: '契約締結', desc: '運営委託契約を締結。民泊管理全般をお任せいただける体制が整います。' },
                { step: '04', title: '開業準備', desc: '画像加工、OTA開設、オペレーション体制の構築を同時並行で進めます。' },
                { step: '05', title: '運営開始', desc: '集客と運営を開始。運営代行チームがサポートし、収益化を加速させます。' },
              ].map((f, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-deep-teal text-white flex items-center justify-center font-black text-base">
                    {f.step}
                  </div>
                  <div className="flex-1 bg-white rounded-2xl border border-light-gray p-6 md:p-8">
                    <h3 className="text-lg font-bold text-charcoal mb-2">{f.title}</h3>
                    <p className="text-sm text-dark-gray leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-14">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-deep-teal hover:bg-sekai-teal text-white font-bold px-12 py-4 rounded-lg transition shadow-lg text-sm"
              >
                無料で相談する
                <IconArrowRight size={14} className="group-hover:translate-x-0.5 transition" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
