'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import {
  IconApartment,
  IconHouse,
  IconVilla,
  IconTent,
  IconBlueprint,
  IconArrowRight,
  IconArrowLeft,
  IconCheck,
  IconShield,
  IconLock,
  IconSparkles,
} from '@/components/Icons'

type Step = 'property' | 'area' | 'size' | 'current' | 'goal' | 'result'
type IconCmp = (p: { size?: number; color?: string; className?: string }) => JSX.Element

const PROPERTY_TYPES: { value: string; label: string; sub: string; Icon: IconCmp }[] = [
  { value: 'mansion', label: 'マンション一室', sub: 'ワンルーム〜ファミリータイプ', Icon: IconApartment },
  { value: 'house', label: '一棟貸し・戸建て', sub: '都市部・住宅地の一棟物件', Icon: IconHouse },
  { value: 'villa', label: 'ヴィラ・別荘', sub: 'リゾート・郊外の貸切物件', Icon: IconVilla },
  { value: 'trailer', label: 'トレーラー・グランピング', sub: '屋外・アウトドア型宿泊施設', Icon: IconTent },
  { value: 'other', label: 'その他', sub: '町家・蔵・特殊物件など', Icon: IconBlueprint },
]

const AREA_OPTIONS = [
  { value: 'tokyo', label: '東京23区', sub: 'インバウンド需要が最も高いエリア' },
  { value: 'osaka', label: '大阪市内', sub: '関西インバウンドの中心' },
  { value: 'kyoto', label: '京都市内', sub: '歴史・文化需要が安定' },
  { value: 'okinawa', label: '沖縄', sub: 'リゾート需要・繁忙期の単価高' },
  { value: 'hokkaido', label: '北海道', sub: 'スキー・夏季ともに需要あり' },
  { value: 'resort', label: 'リゾートエリア', sub: '軽井沢・箱根・河口湖 ほか' },
  { value: 'other-city', label: 'その他の都市部', sub: '政令指定都市・中核市' },
  { value: 'other-rural', label: 'その他の地方', sub: '自然・観光地・地方都市' },
]

const SIZE_OPTIONS = [
  { value: 'studio', label: 'ワンルーム〜1LDK', sub: '定員2名まで' },
  { value: '2ldk', label: '2LDK〜3LDK', sub: '定員4名まで' },
  { value: 'large', label: '4LDK以上', sub: '定員6名以上' },
  { value: 'whole', label: '一棟（複数部屋）', sub: '貸切型物件' },
]

const CURRENT_OPTIONS = [
  { value: 'not-started', label: 'まだ民泊を始めていない', sub: '0から立ち上げを検討中' },
  { value: 'self', label: '自分で運営している', sub: '自主運営中・効率化を検討' },
  { value: 'other-company', label: '他社に委託している', sub: '乗り換えを検討中' },
  { value: 'idle', label: '空き家・遊休物件', sub: '活用方法を模索中' },
]

const GOAL_OPTIONS = [
  { value: 'maximize', label: '収益を最大化したい', sub: '手取りを増やしたい' },
  { value: 'reduce-cost', label: '運営コストを下げたい', sub: '手数料・固定費を見直したい' },
  { value: 'hands-off', label: '手間をかけずに運営したい', sub: '完全丸投げ希望' },
  { value: 'start', label: 'まず民泊を始めてみたい', sub: '立ち上げから相談したい' },
  { value: 'switch', label: '代行会社を乗り換えたい', sub: '現状に不満がある' },
]

function estimateRevenue(data: { property: string; area: string; size: string; current: string }) {
  const baseRates: Record<string, number> = {
    tokyo: 18000, osaka: 14000, kyoto: 16000, okinawa: 15000,
    hokkaido: 13000, resort: 20000, 'other-city': 11000, 'other-rural': 9000,
  }
  const sizeMultipliers: Record<string, number> = {
    studio: 1, '2ldk': 1.6, large: 2.2, whole: 3.0,
  }
  const propertyMultipliers: Record<string, number> = {
    mansion: 1, house: 1.3, villa: 1.8, trailer: 1.4, other: 1,
  }

  const base = baseRates[data.area] || 12000
  const sizeM = sizeMultipliers[data.size] || 1
  const propM = propertyMultipliers[data.property] || 1
  const nightlyRate = Math.round(base * sizeM * propM)
  const occupancy = data.area === 'tokyo' || data.area === 'osaka' || data.area === 'kyoto' ? 0.75 : 0.65
  const monthlyRevenue = Math.round(nightlyRate * 30 * occupancy)
  const ourFee = Math.round(monthlyRevenue * 0.08)
  const fixedFee = 5000
  const ownerProfit = monthlyRevenue - ourFee - fixedFee

  const otherFeeRate = 0.20
  const otherFee = Math.round(monthlyRevenue * otherFeeRate)
  const otherFixed = 20000
  const otherProfit = monthlyRevenue - otherFee - otherFixed

  return {
    nightlyRate,
    occupancy: Math.round(occupancy * 100),
    monthlyRevenue,
    ourFee,
    fixedFee,
    ownerProfit,
    otherProfit,
    annualDiff: (ownerProfit - otherProfit) * 12,
  }
}

/* ── Shared UI ── */

function OptionCard({
  label,
  sub,
  onClick,
  Icon,
}: {
  label: string
  sub?: string
  onClick: () => void
  Icon?: IconCmp
}) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 w-full text-left bg-white border border-light-gray rounded-card px-5 py-4 md:px-6 md:py-5 hover:border-deep-teal hover:shadow-[0_8px_24px_rgba(22,123,129,0.10)] transition-all"
    >
      {Icon && (
        <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-teal-tint group-hover:bg-deep-teal transition flex items-center justify-center">
          <Icon size={24} color="currentColor" className="text-deep-teal group-hover:text-white transition" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[15px] md:text-base font-bold text-charcoal group-hover:text-deep-teal transition leading-tight">
          {label}
        </div>
        {sub && <div className="text-[11px] md:text-xs text-mid-gray mt-1 leading-snug">{sub}</div>}
      </div>
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cloud-white group-hover:bg-sekai-teal transition flex items-center justify-center">
        <IconArrowRight size={14} className="text-dark-gray group-hover:text-white transition" />
      </div>
    </button>
  )
}

export default function DiagnosticPage() {
  const [step, setStep] = useState<Step>('property')
  const [data, setData] = useState({
    property: '',
    area: '',
    size: '',
    current: '',
    goal: '',
  })

  const goNext = (key: string, value: string) => {
    setData(prev => ({ ...prev, [key]: value }))
    const steps: Step[] = ['property', 'area', 'size', 'current', 'goal', 'result']
    const currentIdx = steps.indexOf(step)
    setStep(steps[currentIdx + 1])
  }

  const goBack = () => {
    const steps: Step[] = ['property', 'area', 'size', 'current', 'goal', 'result']
    const currentIdx = steps.indexOf(step)
    if (currentIdx > 0) setStep(steps[currentIdx - 1])
  }

  const stepNumber = ['property', 'area', 'size', 'current', 'goal', 'result'].indexOf(step) + 1
  const totalSteps = 5

  const result = step === 'result' ? estimateRevenue(data) : null

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: '無料収益診断' }]} />
      <main className="min-h-screen bg-cloud-white">
        {/* ─────────────────── Hero ─────────────────── */}
        <section className="relative bg-charcoal text-white overflow-hidden">
          {/* Teal glow */}
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(37,157,163,0.40) 0%, transparent 70%)' }}
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(84,190,195,0.30) 0%, transparent 70%)' }}
          />

          <div className="relative max-w-3xl mx-auto px-5 md:px-8 py-14 md:py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur mb-6">
              <IconSparkles size={14} className="text-bright-teal" />
              <span className="text-[11px] md:text-xs font-bold tracking-wider text-bright-teal uppercase">
                Free Revenue Diagnosis
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-5">
              あなたの物件の<br className="sm:hidden" />
              <span className="text-bright-teal">収益ポテンシャル</span>を、<br />
              60秒で可視化する。
            </h1>
            <p className="text-sm md:text-base text-white/75 leading-relaxed max-w-xl mx-auto">
              5つの質問に答えるだけで、想定月商・手取り額・他社との差額まで自動で算出。
              <br className="hidden md:inline" />
              メール登録不要・完全匿名。
            </p>

            {/* Trust strip */}
            <div className="mt-8 flex items-center justify-center flex-wrap gap-x-6 gap-y-2 text-[11px] md:text-xs text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <IconLock size={12} className="text-bright-teal" />
                個人情報の入力なし
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconShield size={12} className="text-bright-teal" />
                所要時間 約60秒
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconCheck size={12} className="text-bright-teal" />
                完全無料
              </span>
            </div>
          </div>
        </section>

        {/* ─────────────────── Progress ─────────────────── */}
        {step !== 'result' && (
          <div className="max-w-2xl mx-auto px-5 md:px-6 pt-10 md:pt-12">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono tracking-wider text-deep-teal font-bold">
                STEP {String(stepNumber).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
              </span>
              <span className="text-[11px] text-mid-gray">
                {Math.round((stepNumber / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-pale-gray rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(stepNumber / totalSteps) * 100}%`,
                  background: 'linear-gradient(90deg, #167B81 0%, #259DA3 50%, #54BEC3 100%)',
                }}
              />
            </div>
          </div>
        )}

        {/* ─────────────────── Steps ─────────────────── */}
        <div className="max-w-2xl mx-auto px-5 md:px-6 py-10 md:py-14">

          {/* STEP 1: Property Type */}
          {step === 'property' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-2 leading-snug">
                物件のタイプを教えてください
              </h2>
              <p className="text-sm text-dark-gray mb-8">
                物件の種類によって、最適な運営戦略と想定収益が変わります。
              </p>
              <div className="grid gap-3">
                {PROPERTY_TYPES.map(opt => (
                  <OptionCard
                    key={opt.value}
                    label={opt.label}
                    sub={opt.sub}
                    Icon={opt.Icon}
                    onClick={() => goNext('property', opt.value)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Area */}
          {step === 'area' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-2 leading-snug">
                物件のエリアを教えてください
              </h2>
              <p className="text-sm text-dark-gray mb-8">
                エリア別の需要データに基づき、宿泊単価と稼働率を算出します。
              </p>
              <div className="grid gap-3">
                {AREA_OPTIONS.map(opt => (
                  <OptionCard
                    key={opt.value}
                    label={opt.label}
                    sub={opt.sub}
                    onClick={() => goNext('area', opt.value)}
                  />
                ))}
              </div>
              <button
                onClick={goBack}
                className="mt-8 inline-flex items-center gap-1.5 text-sm text-dark-gray hover:text-charcoal transition"
              >
                <IconArrowLeft size={14} />
                戻る
              </button>
            </div>
          )}

          {/* STEP 3: Size */}
          {step === 'size' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-2 leading-snug">
                物件の広さ・定員を教えてください
              </h2>
              <p className="text-sm text-dark-gray mb-8">
                部屋数と定員によって、宿泊単価の想定が変わります。
              </p>
              <div className="grid gap-3">
                {SIZE_OPTIONS.map(opt => (
                  <OptionCard
                    key={opt.value}
                    label={opt.label}
                    sub={opt.sub}
                    onClick={() => goNext('size', opt.value)}
                  />
                ))}
              </div>
              <button
                onClick={goBack}
                className="mt-8 inline-flex items-center gap-1.5 text-sm text-dark-gray hover:text-charcoal transition"
              >
                <IconArrowLeft size={14} />
                戻る
              </button>
            </div>
          )}

          {/* STEP 4: Current Status */}
          {step === 'current' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-2 leading-snug">
                現在の運営状況を教えてください
              </h2>
              <p className="text-sm text-dark-gray mb-8">
                状況に応じて、最適なご提案の方向性が変わります。
              </p>
              <div className="grid gap-3">
                {CURRENT_OPTIONS.map(opt => (
                  <OptionCard
                    key={opt.value}
                    label={opt.label}
                    sub={opt.sub}
                    onClick={() => goNext('current', opt.value)}
                  />
                ))}
              </div>
              <button
                onClick={goBack}
                className="mt-8 inline-flex items-center gap-1.5 text-sm text-dark-gray hover:text-charcoal transition"
              >
                <IconArrowLeft size={14} />
                戻る
              </button>
            </div>
          )}

          {/* STEP 5: Goal */}
          {step === 'goal' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-2 leading-snug">
                最優先にしたいゴールは?
              </h2>
              <p className="text-sm text-dark-gray mb-8">
                目的に合わせて、診断結果のメッセージをカスタマイズします。
              </p>
              <div className="grid gap-3">
                {GOAL_OPTIONS.map(opt => (
                  <OptionCard
                    key={opt.value}
                    label={opt.label}
                    sub={opt.sub}
                    onClick={() => goNext('goal', opt.value)}
                  />
                ))}
              </div>
              <button
                onClick={goBack}
                className="mt-8 inline-flex items-center gap-1.5 text-sm text-dark-gray hover:text-charcoal transition"
              >
                <IconArrowLeft size={14} />
                戻る
              </button>
            </div>
          )}

          {/* ─────────────────── RESULT ─────────────────── */}
          {step === 'result' && result && (
            <div>
              {/* Header */}
              <div className="text-center mb-10 md:mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-deep-teal to-sekai-teal mb-5 shadow-[0_12px_32px_rgba(22,123,129,0.30)]">
                  <IconCheck size={28} className="text-white" />
                </div>
                <div className="inline-block eyebrow text-deep-teal mb-2">Diagnosis Complete</div>
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal leading-tight mb-2">
                  あなたの物件の診断結果
                </h2>
                <p className="text-sm text-dark-gray">
                  ご入力内容に基づき、想定収益を算出しました
                </p>
              </div>

              {/* Main revenue card */}
              <div className="bg-white rounded-card overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-light-gray mb-6">
                {/* Top banner */}
                <div className="bg-charcoal text-white px-6 md:px-8 py-5 md:py-6 relative overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: 'radial-gradient(circle at 80% 50%, rgba(84,190,195,0.35) 0%, transparent 60%)',
                    }}
                  />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-[10px] md:text-[11px] font-mono tracking-widest text-bright-teal mb-1 uppercase">
                        Estimated Monthly Revenue
                      </p>
                      <p className="text-xs text-white/70">想定月間売上</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/60 font-mono">
                        ¥{result.nightlyRate.toLocaleString()}/泊 × {result.occupancy}%
                      </p>
                    </div>
                  </div>
                  <p className="relative text-3xl md:text-5xl font-bold text-white mt-3 tracking-tight">
                    ¥{result.monthlyRevenue.toLocaleString()}
                    <span className="text-sm md:text-base text-white/70 font-normal ml-2">/ 月</span>
                  </p>
                </div>

                {/* Comparison rows */}
                <div className="p-6 md:p-8">
                  <p className="text-[10px] md:text-[11px] font-mono tracking-widest text-mid-gray uppercase mb-4">
                    Owner Take-home Comparison
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* SEKAI STAY */}
                    <div className="relative rounded-card border-2 border-deep-teal bg-gradient-to-br from-teal-tint/60 to-white p-5 md:p-6">
                      <span className="absolute -top-2.5 left-4 bg-deep-teal text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                        Recommended
                      </span>
                      <p className="text-[11px] font-bold text-deep-teal mb-1 mt-1">SEKAI STAY</p>
                      <p className="text-[10px] text-dark-gray mb-4">手数料 8% + 固定 ¥5,000</p>

                      <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between text-xs text-dark-gray">
                          <span>変動手数料</span>
                          <span>−¥{result.ourFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs text-dark-gray">
                          <span>固定管理費</span>
                          <span>−¥{result.fixedFee.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-deep-teal/20">
                        <p className="text-[10px] text-dark-gray mb-0.5">オーナー手取り / 月</p>
                        <p className="text-2xl md:text-3xl font-bold text-deep-teal tracking-tight">
                          ¥{result.ownerProfit.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Other company */}
                    <div className="rounded-card border border-light-gray bg-cloud-white p-5 md:p-6 opacity-90">
                      <p className="text-[11px] font-bold text-mid-gray mb-1 mt-1">他社平均</p>
                      <p className="text-[10px] text-mid-gray mb-4">手数料 20% + 固定 ¥20,000</p>

                      <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between text-xs text-mid-gray">
                          <span>変動手数料</span>
                          <span>−¥{Math.round(result.monthlyRevenue * 0.2).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs text-mid-gray">
                          <span>固定管理費</span>
                          <span>−¥20,000</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-light-gray">
                        <p className="text-[10px] text-mid-gray mb-0.5">オーナー手取り / 月</p>
                        <p className="text-2xl md:text-3xl font-bold text-dark-gray tracking-tight">
                          ¥{result.otherProfit.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Annual diff hero */}
              <div className="relative bg-charcoal rounded-card overflow-hidden p-6 md:p-10 mb-6">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40"
                  style={{
                    background: 'radial-gradient(circle at 20% 50%, rgba(37,157,163,0.35) 0%, transparent 60%)',
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'radial-gradient(circle at 90% 80%, rgba(84,190,195,0.30) 0%, transparent 60%)',
                  }}
                />
                <div className="relative text-center">
                  <p className="eyebrow text-bright-teal mb-3">Annual Uplift</p>
                  <p className="text-white/70 text-xs md:text-sm mb-2">SEKAI STAYに切り替えた場合</p>
                  <p className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-2">
                    <span className="text-bright-teal">+</span>
                    ¥{result.annualDiff.toLocaleString()}
                  </p>
                  <p className="text-white/80 text-sm md:text-base">年間で手元に残るお金が増加</p>
                </div>
              </div>

              {/* Note */}
              <p className="text-[11px] text-mid-gray text-center mb-10 leading-relaxed">
                ※ 上記は エリア平均データ × 物件タイプ補正 に基づく概算値です。
                <br />
                実際の収益は物件の状態・立地・季節・写真品質等により変動します。
                <br />
                より精緻なシミュレーションは、無料相談にて実物件を踏まえてご案内いたします。
              </p>

              {/* CTA */}
              <div className="grid md:grid-cols-2 gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 bg-deep-teal hover:bg-sekai-teal text-white font-bold py-5 rounded-btn transition text-sm md:text-base shadow-[0_12px_24px_rgba(22,123,129,0.25)]"
                >
                  無料相談で詳しく聞く
                  <IconArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
                </Link>
                <button
                  onClick={() => {
                    setStep('property')
                    setData({ property: '', area: '', size: '', current: '', goal: '' })
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-deep-teal text-deep-teal hover:bg-teal-tint/40 font-bold py-5 rounded-btn transition text-sm md:text-base"
                >
                  もう一度診断する
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
