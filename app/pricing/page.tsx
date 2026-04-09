import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

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

const COMPARE = [
  { label: '手数料率', us: '8%', others: '15〜25%', highlight: true },
  { label: '月額固定費', us: '¥5,000/部屋', others: '¥15,000〜30,000', highlight: false },
  { label: '初期費用', us: '¥0', others: '¥50,000〜200,000', highlight: true },
  { label: '最低契約期間', us: 'なし', others: '6〜12ヶ月', highlight: false },
  { label: '多言語対応', us: '4言語', others: '日英のみが多い', highlight: false },
  { label: 'レポート頻度', us: '月次', others: '四半期 or なし', highlight: false },
  { label: 'OTA対応数', us: '主要5サイト+', others: 'Airbnbのみが多い', highlight: false },
  { label: 'ホストレビュー平均', us: '4.7点（5点満点）', others: '保証なし', highlight: true },
]

export default function PricingPage() {
  return (
    <>
      <Header />
      <FloatingCTA />
      <main>
        {/* Hero */}
        <section className="bg-warm-gradient px-6 section-heavy">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3">Pricing</p>
            <h1 className="heading-display text-charcoal mb-6">
              民泊運営代行の料金
            </h1>
            <p className="text-base text-dark-gray leading-relaxed max-w-2xl mx-auto">
              民泊運営代行サービスをご利用いただく際には、初期費用0円。
              月々の費用は「固定管理費」と「変動手数料」のシンプルな2段階構成です。
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="bg-teal-full px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Initial Cost */}
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl font-bold text-white text-center mb-6">初期費用</h2>
                <div className="text-center mb-6">
                  <p className="text-white/50 text-sm line-through mb-1">通常 ¥100,000</p>
                  <p className="stat-number text-white">0<span className="text-2xl">円</span></p>
                  <span className="inline-block mt-3 bg-amber-400/20 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-400/30">
                    キャンペーン中
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {['OTA初期設定', '画像加工・掲載', '掲載コンテンツ作成', 'オペレーション構築'].map((item, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-4 text-center">
                      <p className="text-xs text-white/80 font-medium">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/40 text-center">※物件状況により別途ご相談の場合あり</p>
              </div>

              {/* Running Cost */}
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl font-bold text-white text-center mb-6">運営費用</h2>
                <p className="text-sm text-white/70 text-center mb-8">
                  月々の費用は「固定管理費」と「変動運営委託費」の合計となります。
                </p>
                <div className="space-y-4 mb-8">
                  <div className="bg-white/10 rounded-xl p-6">
                    <p className="text-xs text-white/50 font-bold uppercase tracking-wider mb-3">固定管理費</p>
                    <p className="text-2xl text-white font-bold">
                      ¥5,000<span className="text-sm font-normal text-white/60 ml-1">/ 1部屋 / 月</span>
                    </p>
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

        {/* What's Included */}
        <section className="px-6 section-heavy">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-section text-charcoal text-center mb-16">運営費用に含まれるサービス</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {INCLUDES.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-cloud-white rounded-xl p-5 border border-light-gray">
                  <span className="w-8 h-8 rounded-full bg-deep-teal text-white flex items-center justify-center text-sm flex-shrink-0">✓</span>
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
                  <p className="text-mid-gray font-bold text-sm">他社平均</p>
                </div>
              </div>
              {/* Rows */}
              {COMPARE.map((row, i) => (
                <div key={i} className={`grid grid-cols-3 border-t border-light-gray ${row.highlight ? 'bg-teal-tint/30' : ''}`}>
                  <div className="px-6 py-5 text-sm text-dark-gray font-medium">{row.label}</div>
                  <div className="px-6 py-5 text-sm text-deep-teal font-bold text-center">{row.us}</div>
                  <div className="px-6 py-5 text-sm text-mid-gray text-center">{row.others}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — handled by Footer */}
      </main>
      <Footer />
    </>
  )
}
