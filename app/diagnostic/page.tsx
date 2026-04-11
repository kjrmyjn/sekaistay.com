'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'

type Step = 'property' | 'area' | 'size' | 'current' | 'goal' | 'result'

const PROPERTY_TYPES = [
  { value: 'mansion', label: 'マンション一室', icon: '🏢' },
  { value: 'house', label: '一棟貸し・戸建て', icon: '🏠' },
  { value: 'villa', label: 'ヴィラ・別荘', icon: '🏡' },
  { value: 'trailer', label: 'トレーラー・グランピング', icon: '🏕' },
  { value: 'other', label: 'その他', icon: '🏗' },
]

const AREA_OPTIONS = [
  { value: 'tokyo', label: '東京23区' },
  { value: 'osaka', label: '大阪市内' },
  { value: 'kyoto', label: '京都市内' },
  { value: 'okinawa', label: '沖縄' },
  { value: 'hokkaido', label: '北海道' },
  { value: 'resort', label: 'リゾートエリア（軽井沢・箱根・河口湖等）' },
  { value: 'other-city', label: 'その他の都市部' },
  { value: 'other-rural', label: 'その他の地方' },
]

const SIZE_OPTIONS = [
  { value: 'studio', label: 'ワンルーム〜1LDK（2名まで）' },
  { value: '2ldk', label: '2LDK〜3LDK（4名まで）' },
  { value: 'large', label: '4LDK以上（6名以上）' },
  { value: 'whole', label: '一棟（複数部屋）' },
]

const CURRENT_OPTIONS = [
  { value: 'not-started', label: 'まだ民泊を始めていない' },
  { value: 'self', label: '自分で運営している' },
  { value: 'other-company', label: '他社に委託している' },
  { value: 'idle', label: '空き家・使っていない物件' },
]

const GOAL_OPTIONS = [
  { value: 'maximize', label: '収益を最大化したい' },
  { value: 'reduce-cost', label: '運営コストを下げたい' },
  { value: 'hands-off', label: '手間をかけずに運営したい' },
  { value: 'start', label: 'まず民泊を始めてみたい' },
  { value: 'switch', label: '代行会社を乗り換えたい' },
]

// Simple revenue estimate
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
        {/* Hero */}
        <section className="bg-deep-teal px-6 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
              無料診断 — あなたの物件の収益ポテンシャル
            </h1>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              5つの質問に答えるだけで、あなたの物件の想定収益とSEKAI STAYの手数料8%による手取り額をシミュレーションします。
            </p>
          </div>
        </section>

        {/* Progress Bar */}
        {step !== 'result' && (
          <div className="max-w-2xl mx-auto px-6 pt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-deep-teal">STEP {stepNumber} / {totalSteps}</span>
            </div>
            <div className="w-full h-2 bg-pale-gray rounded-full overflow-hidden">
              <div
                className="h-full bg-deep-teal rounded-full transition-all duration-500"
                style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="max-w-2xl mx-auto px-6 py-10 md:py-16">

          {/* STEP 1: Property Type */}
          {step === 'property' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-2">物件のタイプを教えてください</h2>
              <p className="text-sm text-dark-gray mb-8">物件のタイプによって最適な運営戦略が変わります。</p>
              <div className="grid gap-3">
                {PROPERTY_TYPES.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => goNext('property', opt.value)}
                    className="flex items-center gap-4 w-full text-left bg-white border-2 border-light-gray rounded-xl px-6 py-5 hover:border-deep-teal hover:bg-teal-tint/30 transition-all group"
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="text-base font-bold text-charcoal group-hover:text-deep-teal transition">{opt.label}</span>
                    <span className="ml-auto text-mid-gray group-hover:text-deep-teal transition">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Area */}
          {step === 'area' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-2">物件のエリアを教えてください</h2>
              <p className="text-sm text-dark-gray mb-8">エリアごとの需要データに基づいて収益を算出します。</p>
              <div className="grid gap-3">
                {AREA_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => goNext('area', opt.value)}
                    className="flex items-center gap-4 w-full text-left bg-white border-2 border-light-gray rounded-xl px-6 py-4 hover:border-deep-teal hover:bg-teal-tint/30 transition-all group"
                  >
                    <span className="text-base font-bold text-charcoal group-hover:text-deep-teal transition">{opt.label}</span>
                    <span className="ml-auto text-mid-gray group-hover:text-deep-teal transition">→</span>
                  </button>
                ))}
              </div>
              <button onClick={goBack} className="mt-6 text-sm text-mid-gray hover:text-charcoal transition">← 戻る</button>
            </div>
          )}

          {/* STEP 3: Size */}
          {step === 'size' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-2">物件の広さ・定員を教えてください</h2>
              <p className="text-sm text-dark-gray mb-8">部屋のサイズと定員数に応じて宿泊単価を算出します。</p>
              <div className="grid gap-3">
                {SIZE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => goNext('size', opt.value)}
                    className="flex items-center gap-4 w-full text-left bg-white border-2 border-light-gray rounded-xl px-6 py-4 hover:border-deep-teal hover:bg-teal-tint/30 transition-all group"
                  >
                    <span className="text-base font-bold text-charcoal group-hover:text-deep-teal transition">{opt.label}</span>
                    <span className="ml-auto text-mid-gray group-hover:text-deep-teal transition">→</span>
                  </button>
                ))}
              </div>
              <button onClick={goBack} className="mt-6 text-sm text-mid-gray hover:text-charcoal transition">← 戻る</button>
            </div>
          )}

          {/* STEP 4: Current Status */}
          {step === 'current' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-2">現在の運営状況を教えてください</h2>
              <p className="text-sm text-dark-gray mb-8">最適なプランをご提案するための参考にさせていただきます。</p>
              <div className="grid gap-3">
                {CURRENT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => goNext('current', opt.value)}
                    className="flex items-center gap-4 w-full text-left bg-white border-2 border-light-gray rounded-xl px-6 py-4 hover:border-deep-teal hover:bg-teal-tint/30 transition-all group"
                  >
                    <span className="text-base font-bold text-charcoal group-hover:text-deep-teal transition">{opt.label}</span>
                    <span className="ml-auto text-mid-gray group-hover:text-deep-teal transition">→</span>
                  </button>
                ))}
              </div>
              <button onClick={goBack} className="mt-6 text-sm text-mid-gray hover:text-charcoal transition">← 戻る</button>
            </div>
          )}

          {/* STEP 5: Goal */}
          {step === 'goal' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-2">一番の目的を教えてください</h2>
              <p className="text-sm text-dark-gray mb-8">あなたのゴールに合わせた診断結果をお届けします。</p>
              <div className="grid gap-3">
                {GOAL_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => goNext('goal', opt.value)}
                    className="flex items-center gap-4 w-full text-left bg-white border-2 border-light-gray rounded-xl px-6 py-4 hover:border-deep-teal hover:bg-teal-tint/30 transition-all group"
                  >
                    <span className="text-base font-bold text-charcoal group-hover:text-deep-teal transition">{opt.label}</span>
                    <span className="ml-auto text-mid-gray group-hover:text-deep-teal transition">→</span>
                  </button>
                ))}
              </div>
              <button onClick={goBack} className="mt-6 text-sm text-mid-gray hover:text-charcoal transition">← 戻る</button>
            </div>
          )}

          {/* RESULT */}
          {step === 'result' && result && (
            <div>
              <div className="text-center mb-10">
                <div className="w-16 h-16 rounded-full bg-deep-teal text-white flex items-center justify-center mx-auto mb-4 text-2xl font-black">✓</div>
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-2">診断結果</h2>
                <p className="text-sm text-dark-gray">あなたの物件の想定収益シミュレーション</p>
              </div>

              {/* Revenue Card */}
              <div className="bg-white rounded-2xl border-2 border-deep-teal/20 p-6 md:p-8 mb-6">
                <div className="text-center mb-6">
                  <p className="text-xs text-mid-gray font-bold uppercase tracking-wider mb-1">想定月間売上</p>
                  <p className="text-4xl md:text-5xl font-black text-charcoal">¥{result.monthlyRevenue.toLocaleString()}</p>
                  <p className="text-xs text-mid-gray mt-2">宿泊単価 ¥{result.nightlyRate.toLocaleString()}/泊 × 稼働率 {result.occupancy}%</p>
                </div>

                <div className="border-t border-light-gray pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* SEKAI STAY */}
                    <div className="bg-teal-tint/50 rounded-xl p-5 border border-deep-teal/10">
                      <p className="text-xs font-bold text-deep-teal mb-4">SEKAI STAY（手数料8%）</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-dark-gray">変動手数料（8%）</span>
                          <span className="text-dark-gray">−¥{result.ourFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-gray">固定管理費</span>
                          <span className="text-dark-gray">−¥{result.fixedFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t border-deep-teal/10 pt-2 mt-2">
                          <span className="font-bold text-charcoal">オーナー手取り（月）</span>
                          <span className="font-black text-deep-teal text-lg">¥{result.ownerProfit.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Other company */}
                    <div className="bg-pale-gray rounded-xl p-5">
                      <p className="text-xs font-bold text-mid-gray mb-4">他社平均（手数料20%）</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-mid-gray">変動手数料（20%）</span>
                          <span className="text-mid-gray">−¥{Math.round(result.monthlyRevenue * 0.2).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-mid-gray">固定管理費</span>
                          <span className="text-mid-gray">−¥20,000</span>
                        </div>
                        <div className="flex justify-between border-t border-light-gray pt-2 mt-2">
                          <span className="font-bold text-mid-gray">オーナー手取り（月）</span>
                          <span className="font-bold text-mid-gray text-lg">¥{result.otherProfit.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Annual Difference */}
              <div className="bg-deep-teal rounded-2xl p-6 md:p-8 text-center mb-8">
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">SEKAI STAYなら年間</p>
                <p className="text-3xl md:text-4xl font-black text-white mb-1">+¥{result.annualDiff.toLocaleString()}</p>
                <p className="text-white/60 text-sm">他社平均と比較して手取りが増加</p>
              </div>

              {/* Note */}
              <p className="text-xs text-mid-gray text-center mb-10 leading-relaxed">
                ※ 上記はエリア平均データに基づく概算です。実際の収益は物件の状態・立地・季節等により変動します。<br />
                より正確なシミュレーションは無料相談にてご案内いたします。
              </p>

              {/* CTA */}
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href="/contact"
                  className="block bg-deep-teal hover:bg-deep-teal/90 text-white font-bold py-5 rounded-xl transition text-center text-sm"
                >
                  無料相談で詳しく聞く →
                </Link>
                <button
                  onClick={() => { setStep('property'); setData({ property: '', area: '', size: '', current: '', goal: '' }) }}
                  className="block bg-white border-2 border-deep-teal text-deep-teal font-bold py-5 rounded-xl transition hover:bg-teal-tint/30 text-center text-sm"
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
