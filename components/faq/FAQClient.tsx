'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import { IconArrowRight } from '@/components/Icons'

/* ─── Data ─── */

const FAQ_CATEGORIES = [
  { id: 'all', label: 'すべて' },
  { id: 'fee', label: '料金・費用' },
  { id: 'contract', label: '契約・手続き' },
  { id: 'service', label: 'サービス内容' },
  { id: 'area', label: '対応エリア・物件' },
]

const FAQ_ITEMS: { q: string; a: string; category: string }[] = [
  // ── 料金・費用 ──
  {
    q: '民泊運営代行の費用はどのくらいかかりますか？',
    a: '初期費用は現在キャンペーンで0円（通常10万円）。月額は固定管理費5,000円/室と売上の8%です。収支シミュレーションを無料で作成いたしますので、お気軽にお問い合わせください。',
    category: 'fee',
  },
  {
    q: '宿泊がなかった月の費用はかかりますか？',
    a: '固定管理費（月額5,000円/室）のみとなります。変動運営委託費（8%）は売上に連動するため、宿泊がなければ発生しません。',
    category: 'fee',
  },
  {
    q: '他社と比べて手数料が安いのはなぜですか？',
    a: 'SEKAI STAYでは独自の仕組みによりオペレーションコストを大幅に削減。その分をオーナー様に還元しています。8%の手数料でも高品質なサービスを維持できる体制を構築しています。',
    category: 'fee',
  },
  {
    q: '初期費用0円キャンペーンはいつまでですか？',
    a: '現在実施中のキャンペーンです。終了時期は未定ですが、予告なく終了する場合がございます。お早めにお問い合わせください。',
    category: 'fee',
  },
  {
    q: '清掃費用は別途かかりますか？',
    a: '清掃費用はゲスト負担（宿泊料金に含む）が基本です。清掃手配・品質管理は運営代行サービスに含まれており、オーナー様への追加請求はございません。',
    category: 'fee',
  },
  // ── 契約・手続き ──
  {
    q: '最低契約期間はありますか？',
    a: 'ありません。いつでも解約可能です。成果でお選びいただけるよう、縛りは設けていません。',
    category: 'contract',
  },
  {
    q: '他社から乗り換える場合、移行コストはかかりますか？',
    a: '移行コストは無料です。OTAアカウントの引き継ぎや掲載情報の最適化も含めて対応します。',
    category: 'contract',
  },
  {
    q: '解約手数料はかかりますか？',
    a: '解約手数料は0円です。解約のお申し出から1ヶ月で契約を終了できます。',
    category: 'contract',
  },
  {
    q: '契約から開業までどのくらいかかりますか？',
    a: '最短2週間で開業可能です。物件の状況や必要な準備によりますが、通常1〜2ヶ月程度で運営を開始できます。',
    category: 'contract',
  },
  {
    q: '法人でも個人でも契約できますか？',
    a: 'はい、法人・個人どちらでもご契約いただけます。',
    category: 'contract',
  },
  // ── サービス内容 ──
  {
    q: 'プロカメラマンによる撮影は必要ですか？',
    a: 'いいえ、不要です。お手持ちのスマートフォンで撮影いただいた写真を、弊社の画像加工システムでプロ品質に仕上げます。トンマナの統一も自動で行います。',
    category: 'service',
  },
  {
    q: 'どのOTAに掲載されますか？',
    a: 'Airbnb、Booking.com、Vrbo、Expediaなど、物件の特性やエリアに合わせて最適なOTAを選定し複数掲載します。在庫の同期管理も行います。',
    category: 'service',
  },
  {
    q: 'ゲスト対応は何語に対応していますか？',
    a: '日本語・英語・中国語・韓国語など、主要な言語に24時間対応しています。',
    category: 'service',
  },
  {
    q: 'オーナーダッシュボードではどんな情報が見られますか？',
    a: 'リアルタイムの収益・稼働率・予約状況・レビュースコアなどを24時間いつでもPC・スマホから確認可能です。さらに月次の詳細レポートも配信します。',
    category: 'service',
  },
  {
    q: 'マンスリー賃貸と民泊の併用はできますか？',
    a: 'はい、可能です。民泊新法の180日規制に対応するため、マンスリー賃貸と民泊を柔軟に組み合わせ、年間の収益を最大化する戦略をご提案します。',
    category: 'service',
  },
  {
    q: '清掃の品質はどのように管理されていますか？',
    a: '専属の清掃スタッフがチェックリストに基づき作業を実施。写真付きの検品報告を行い、高いレビュースコアの維持に貢献しています。',
    category: 'service',
  },
  // ── 対応エリア・物件 ──
  {
    q: '遠方の物件でも対応可能ですか？',
    a: '全国対応しています。清掃パートナーネットワークと遠隔管理システムで、どの地域でも同品質のサービスを提供します。',
    category: 'area',
  },
  {
    q: 'どんな物件タイプに対応していますか？',
    a: 'マンション一室、一棟アパート、戸建て、ヴィラ、トレーラーハウスなど、幅広い物件タイプに対応しています。物件ごとに最適な運営戦略をご提案します。',
    category: 'area',
  },
  {
    q: '複数物件をまとめて任せることはできますか？',
    a: 'はい、複数物件の一括管理も可能です。物件数に応じた効率的な運営体制をご提案いたします。',
    category: 'area',
  },
  {
    q: '民泊の届出や許認可は取得済みである必要がありますか？',
    a: '開業支援の一環として、届出・許認可に関するご相談やサポートも行っております。まだ取得されていない場合でもお気軽にご相談ください。',
    category: 'area',
  },
]

/* ─── Component ─── */

export default function FAQClient() {
  const [activeCat, setActiveCat] = useState('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const visibleItems = useMemo(() => {
    return FAQ_ITEMS
      .map((item, i) => ({ ...item, globalIndex: i }))
      .filter((item) => activeCat === 'all' || item.category === activeCat)
  }, [activeCat])

  const handleCategoryChange = (cat: string) => {
    setActiveCat(cat)
    setOpenIndex(null)
  }

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: 'FAQ' }]} />
      <FloatingCTA />
      <main>
        {/* ── Hero ── */}
        <section className="bg-warm-gradient px-5 md:px-10 section-heavy">
          <div className="max-w-[800px] mx-auto text-center">
            <p className="text-[11px] font-bold text-deep-teal tracking-[0.2em] uppercase mb-3">
              FAQ
            </p>
            <h1 className="heading-display text-charcoal mb-5">
              よくあるご質問
            </h1>
            <p className="text-[15px] md:text-base text-dark-gray leading-relaxed max-w-[600px] mx-auto">
              SEKAI STAYの民泊運営代行サービスに関して、
              オーナー様からよくいただくご質問をまとめました。
            </p>
          </div>
        </section>

        {/* ── Category tabs + Accordion ── */}
        <section className="px-5 md:px-10 section-xl bg-white">
          <div className="max-w-[800px] mx-auto">
            {/* Category filter */}
            <div className="flex gap-2 mb-8 md:mb-10 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
              {FAQ_CATEGORIES.map((cat) => {
                const count =
                  cat.id === 'all'
                    ? FAQ_ITEMS.length
                    : FAQ_ITEMS.filter((i) => i.category === cat.id).length
                const active = activeCat === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`inline-flex items-center gap-2 text-[13px] font-bold px-4 py-2.5 rounded-full border transition whitespace-nowrap flex-shrink-0 ${
                      active
                        ? 'bg-charcoal text-white border-charcoal'
                        : 'bg-white text-dark-gray border-light-gray hover:border-sekai-teal hover:text-sekai-teal'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] font-mono ${
                        active ? 'text-white/70' : 'text-mid-gray'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Accordion list */}
            <div className="space-y-3">
              {visibleItems.map((item, i) => {
                const isOpen = openIndex === i
                return (
                  <div
                    key={item.globalIndex}
                    className={`bg-white rounded-2xl border transition-colors ${
                      isOpen ? 'border-sekai-teal shadow-sm' : 'border-light-gray'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
                        <span className="text-[12px] font-mono font-bold text-sekai-teal mt-0.5 flex-shrink-0">
                          Q{String(item.globalIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[14px] md:text-[15px] font-bold text-charcoal leading-relaxed">
                          {item.q}
                        </span>
                      </div>
                      <span
                        aria-hidden
                        className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition mt-0.5 ${
                          isOpen
                            ? 'border-sekai-teal bg-sekai-teal text-white'
                            : 'border-light-gray text-mid-gray'
                        }`}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        >
                          <path
                            d="M1 3l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    {/* Animated answer panel */}
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 md:px-6 pb-5 md:pb-6 pl-[52px] md:pl-[64px]">
                          <div className="border-t border-light-gray pt-4">
                            <p className="text-[13px] md:text-[14px] text-dark-gray leading-[1.85]">
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {visibleItems.length === 0 && (
              <div className="text-center text-[13px] text-mid-gray py-12">
                該当する項目がありません。
              </div>
            )}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="bg-deep-teal px-5 md:px-10 py-16 md:py-20">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 leading-snug">
              ご不明な点がございましたら、<br className="hidden sm:inline" />
              お気軽にお問い合わせください
            </h2>
            <p className="text-[13px] md:text-[14px] text-white/80 mb-10 leading-relaxed">
              FAQに掲載されていないご質問や、物件ごとの個別のご相談にも対応いたします。
              収支シミュレーションの作成も無料で承ります。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-white text-deep-teal font-bold px-10 py-4 rounded-btn transition hover:bg-cloud-white text-[14px] shadow-lg"
              >
                無料で相談する
                <IconArrowRight size={14} className="group-hover:translate-x-0.5 transition" />
              </Link>
              <Link
                href="/simulate"
                className="group inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold px-10 py-4 rounded-btn transition hover:bg-white/10 text-[14px]"
              >
                収支シミュレーション
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
