'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import { IconArrowRight } from '@/components/Icons'

/* ─────────────────────────────────────────────────────────────
 * /simulate — 1 スライダー・年間手取り差額 シミュレーター
 * LP の #simulator セクションをベースに、メインサイトのページ骨格に統合。
 * - 現在 月商 → 年間手取り差額 を即時表示
 * - 前提: 稼働率改善 +30% / 手数料削減 15%→8%
 * - メイン導線: 無料物件診断 (/audit) / お問い合わせ (/contact)
 * ──────────────────────────────────────────────────────────── */

const OUR_RATE = 0.08
const CURRENT_RATE = 0.15
const BOOST = 1.30

// エリア別 目安月商（ホームの Simulation セクションからのクエリパラメータ用）
const AREA_REVENUE: Record<string, number> = {
  tokyo: 900000,
  kyoto: 850000,
  osaka: 700000,
  okinawa: 1200000,
  fukuoka: 600000,
  other: 500000,
}

const fmt = (n: number) => Math.round(n).toLocaleString('ja-JP')

/* 数字アニメーション（LP と同じイージング） */
function AnimNum({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(value)
  const prev = useRef(value)
  useEffect(() => {
    const from = prev.current
    const to = value
    prev.current = to
    if (from === to) return
    const duration = 350
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(from + (to - from) * ease))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value])
  return <>{prefix}{fmt(display)}{suffix}</>
}

/* クエリパラメータから初期値を同期 */
function PrefillSync({ onPrefill }: { onPrefill: (revenue: number) => void }) {
  const searchParams = useSearchParams()
  useEffect(() => {
    const rev = searchParams.get('rev')
    const area = searchParams.get('area')
    if (rev) {
      const n = parseInt(rev, 10)
      if (!isNaN(n) && n >= 100000 && n <= 4000000) {
        onPrefill(Math.round(n / 50000) * 50000)
        return
      }
    }
    if (area && AREA_REVENUE[area]) {
      onPrefill(AREA_REVENUE[area])
    }
  }, [searchParams, onPrefill])
  return null
}

function SimulatorCore() {
  const [revenue, setRevenue] = useState(500000)

  const nowAnnual = revenue * (1 - CURRENT_RATE) * 12
  const boosted = revenue * BOOST
  const sekaiAnnual = boosted * (1 - OUR_RATE) * 12
  const diff = sekaiAnnual - nowAnnual

  return (
    <>
      <Suspense fallback={null}>
        <PrefillSync onPrefill={setRevenue} />
      </Suspense>

      <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-start">
        {/* Controls */}
        <div>
          <p className="eyebrow-mono text-mid-gray mb-3">Current · Monthly Revenue</p>
          <p className="font-sans font-light text-[40px] sm:text-[56px] md:text-[80px] leading-none text-ink tabular-nums mb-6">
            ¥<AnimNum value={revenue} />
          </p>
          <input
            type="range" min={100000} max={4000000} step={50000}
            value={revenue}
            onChange={e => setRevenue(Number(e.target.value))}
            className="w-full accent-sekai-teal h-1 mb-3 cursor-pointer"
            aria-label="現在の月商"
          />
          <div className="flex justify-between eyebrow-mono text-mid-gray">
            <span>¥100K</span>
            <span>¥4,000K</span>
          </div>

          <p className="font-sans text-caption text-mid-gray mt-8 leading-[2]">
            — 稼働率改善（+30%）と手数料削減（15%→8%）のダブル効果。弊社管理物件の平均実績に基づく試算です。
          </p>
        </div>

        {/* Ledger output */}
        <div className="bg-ivory border border-rule">
          <div className="grid grid-cols-2 divide-x divide-rule border-b border-rule">
            <div className="p-6 md:p-7">
              <p className="eyebrow-mono text-mid-gray mb-3">Before · Annual Net</p>
              <p className="font-sans font-light text-[28px] md:text-[36px] leading-none text-mid-gray tabular-nums line-through decoration-[0.5px]">
                ¥<AnimNum value={nowAnnual} />
              </p>
            </div>
            <div className="p-6 md:p-7">
              <p className="eyebrow-mono text-sekai-teal mb-3">With SEKAI STAY</p>
              <p className="font-sans font-light text-[28px] md:text-[36px] leading-none text-sekai-teal tabular-nums">
                ¥<AnimNum value={sekaiAnnual} />
              </p>
            </div>
          </div>
          <div className="bg-ink text-ivory p-7 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-bright-teal" />
              <p className="eyebrow text-bright-teal">Annual Gain</p>
            </div>
            <p className="font-sans font-light text-[48px] md:text-[64px] leading-none text-bright-teal tabular-nums">
              +¥<AnimNum value={diff} />
            </p>
            <p className="font-sans text-caption text-ivory/60 mt-3">— 年間の手取り増加額</p>
          </div>
          <Link
            href={`/audit?rev=${revenue}`}
            className="group flex items-center justify-between gap-3 bg-paper border-t border-rule px-7 py-5 hover:bg-mist transition"
          >
            <span className="font-sans font-medium text-[14px] text-ink">この差額を手に入れる — 無料物件診断</span>
            <IconArrowRight className="w-4 h-4 text-sekai-teal group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </div>
    </>
  )
}

const ASSUMPTIONS: { label: string; value: string; note: string }[] = [
  { label: '現在の手数料', value: '15%', note: '業界平均相当（他社代行の中央値）' },
  { label: 'SEKAI STAY 手数料', value: '8%', note: '固定管理費 ¥10,000/室/月を除く実質比較' },
  { label: '稼働率の改善', value: '+30%', note: 'OTA最適化・ダイナミックプライシング導入後の平均実績' },
  { label: '比較期間', value: '12ヶ月', note: '通年ベース（季節変動を平準化）' },
]

const FAQ: { q: string; a: string }[] = [
  { q: 'この試算は誰にでも当てはまりますか？', a: '弊社が管理を行った物件の平均値をベースにした目安です。物件の立地・設備・現状の運営状況によって差は出ますが、手数料削減の効果はすべての物件で確実に得られます。' },
  { q: 'なぜ手数料8%で成立するのですか？', a: '自社運営のオペレーション基盤・清掃パートナーネットワーク・多言語ゲスト対応センターを内製化することで、一般的な代行業者の運営コストを大幅に削減しているためです。詳しくは料金ページをご覧ください。' },
  { q: '個別の収益試算を依頼できますか？', a: 'はい、無料物件診断では物件の状態に合わせた個別シミュレーションをお届けします。立地・築年数・稼働率の情報をいただければ、より精度の高い試算をご提示します。' },
  { q: '現在の月商がわからない場合は？', a: '過去3ヶ月の平均で結構です。オーナー様が把握されていない場合、物件診断の中で代行業者への開示請求のテンプレートもお渡ししています。' },
]

export default function SimulatePage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: '収益シミュレーション' }]} />
      <FloatingCTA />

      <main className="bg-ivory">
        {/* ─── Hero ─── */}
        <section className="bg-ivory border-b border-rule">
          <div className="container-edit section-xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="chapter">Chapter Ⅰ</span>
              <span className="h-px bg-rule flex-1" />
              <span className="eyebrow-mono text-mid-gray">Revenue Simulator</span>
            </div>
            <h1 className="heading-display text-ink mb-8 jp-keep">
              あなたの物件、<br className="hidden md:block" /><span className="text-sekai-teal">いくら変わる？</span>
            </h1>
            <p className="font-sans text-body md:text-body-lg text-dark-gray max-w-2xl leading-[2.2]">
              現在の月商を入力するだけ。稼働率改善と手数料削減を組み合わせた、
              SEKAI STAY に切り替えた場合の<span className="text-ink font-medium">年間手取り差額</span>をその場で可視化します。
            </p>
          </div>
        </section>

        {/* ─── Simulator ─── */}
        <section id="simulator" className="bg-paper border-b border-rule">
          <div className="container-edit section-xl max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="rule-teal-sm" />
              <p className="eyebrow text-sekai-teal">Chapter Ⅱ · Revenue Ledger</p>
            </div>
            <h2 className="heading-section text-ink mb-3">
              スライドして、<span className="font-sans text-sekai-teal">差額を確かめる</span>
            </h2>
            <p className="font-sans text-body-sm text-mid-gray mb-14">
              数字は即時に更新されます。
            </p>

            <SimulatorCore />
          </div>
        </section>

        {/* ─── Assumptions ─── */}
        <section className="bg-ivory border-b border-rule">
          <div className="container-edit section-xl max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="rule-teal-sm" />
              <p className="eyebrow text-sekai-teal">Chapter Ⅲ · Assumptions</p>
            </div>
            <h2 className="heading-section text-ink mb-10">
              試算の前提
            </h2>
            <div className="bg-paper border border-rule divide-y divide-rule">
              {ASSUMPTIONS.map(item => (
                <div key={item.label} className="grid grid-cols-[140px_120px_1fr] md:grid-cols-[180px_140px_1fr] items-baseline gap-4 px-6 md:px-8 py-5">
                  <p className="font-sans text-caption text-mid-gray">{item.label}</p>
                  <p className="font-sans font-medium text-[20px] md:text-[24px] text-sekai-teal tabular-nums leading-none">{item.value}</p>
                  <p className="font-sans text-body-sm text-dark-gray leading-[1.9]">{item.note}</p>
                </div>
              ))}
            </div>
            <p className="font-sans text-caption text-mid-gray mt-6 leading-[2]">
              — 上記はあくまで平均的な想定値です。物件ごとの詳細試算は無料物件診断でお渡しします。
            </p>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-paper border-b border-rule">
          <div className="container-edit section-xl max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="rule-teal-sm" />
              <p className="eyebrow text-sekai-teal">Chapter Ⅳ · Clarifications</p>
            </div>
            <h2 className="heading-section text-ink mb-10">
              よくあるご質問
            </h2>
            <div className="divide-y divide-rule border-y border-rule">
              {FAQ.map(item => (
                <div key={item.q} className="py-7">
                  <h3 className="font-sans font-medium text-body md:text-body-lg text-ink mb-3 leading-[1.7]">
                    Q. {item.q}
                  </h3>
                  <p className="font-sans text-body-sm text-dark-gray leading-[2.1]">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section className="bg-ink text-ivory">
          <div className="container-edit section-xl max-w-4xl mx-auto text-center">
            <p className="eyebrow text-bright-teal mb-6">Next Step</p>
            <h2 className="heading-section text-ivory mb-6 jp-keep">
              次は、<span className="text-bright-teal">物件の状態</span>を診断しましょう
            </h2>
            <p className="font-sans text-body-sm md:text-body text-ivory/70 leading-[2.1] max-w-2xl mx-auto mb-10">
              3分の無料物件診断で、立地・設備・現状の運営を加味した個別の改善提案をお届けします。
              シミュレーションの数値がそのまま実現可能か、担当者が直接ご説明します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/audit"
                className="btn bg-ivory text-teal-ink hover:bg-bright-teal hover:text-ivory border-ivory text-[14px]"
              >
                無料物件診断（3分）
                <IconArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="btn border-ivory/40 text-ivory hover:bg-ivory/10 hover:border-ivory text-[14px]"
              >
                直接相談する
                <IconArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
