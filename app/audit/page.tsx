'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS, STEPS, type Question } from '@/data/questions'
import { saveCurrentAnswers, submitAnswers, getCurrentAnswers } from '@/lib/storage'
import type { Answers } from '@/lib/scoring'
import { IconArrowRight, IconArrowLeft } from '@/components/Icons'

// ステップごとの設問グループ
const STEP_QUESTIONS = STEPS.map(s => ({
  ...s,
  questions: QUESTIONS.filter(q => q.step === s.step),
}))

const TOTAL_STEPS = STEPS.length

export default function AuditPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Answers>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  // ページロード時に一時保存データを復元
  useEffect(() => {
    const saved = getCurrentAnswers()
    if (Object.keys(saved).length > 0) setAnswers(saved)
  }, [])

  const currentStep = STEP_QUESTIONS.find(s => s.step === step)!
  const progress = Math.round(((step - 1) / TOTAL_STEPS) * 100)

  // 回答を更新
  function handleAnswer(questionId: string, value: string) {
    const next = { ...answers, [questionId]: value }
    setAnswers(next)
    saveCurrentAnswers(next)
    // エラーをクリア
    if (errors[questionId]) {
      setErrors(prev => { const e = { ...prev }; delete e[questionId]; return e })
    }
  }

  // バリデーション
  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    for (const q of currentStep.questions) {
      if (!q.required && !q.scored && q.type === 'single') continue
      const val = answers[q.id]
      if (q.required && (!val || String(val).trim() === '')) {
        newErrors[q.id] = '入力してください'
      }
      if (q.type === 'single' && q.scored && !val) {
        newErrors[q.id] = '選択してください'
      }
      if (q.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val))) {
        newErrors[q.id] = '正しいメールアドレスを入力してください'
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleNext() {
    if (!validate()) return
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // 最終ステップ → 送信
      const submission = submitAnswers(answers)
      router.push(`/result?id=${submission.id}`)
    }
  }

  function handleBack() {
    setStep(s => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-12">
      {/* ── ヘッダー ─────────────────────────── */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <p className="text-sm font-semibold text-deep-teal">無料診断</p>
          <p className="text-xs text-slate-400">
            STEP {step} / {TOTAL_STEPS}
          </p>
        </div>
        {/* プログレスバー */}
        <div className="mt-3 max-w-lg mx-auto">
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-deep-teal rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* ── 設問エリア ───────────────────────── */}
      <div className="max-w-lg mx-auto px-5 pt-8 space-y-6">
        {/* ステップタイトル */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            {currentStep.title}
          </p>
        </div>

        {/* 設問カード */}
        {currentStep.questions.map(q => (
          <QuestionCard
            key={q.id}
            question={q}
            value={String(answers[q.id] ?? '')}
            error={errors[q.id]}
            onChange={v => handleAnswer(q.id, v)}
          />
        ))}

        {/* ナビゲーションボタン */}
        <div className="pt-4 space-y-3">
          <button
            onClick={handleNext}
            className="group w-full inline-flex items-center justify-center gap-2 bg-deep-teal text-white text-base font-semibold py-4 rounded-xl shadow-sm active:opacity-90 transition"
          >
            {step === TOTAL_STEPS ? '診断結果を見る' : '次へ'}
            <IconArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
          </button>
          {step > 1 && (
            <button
              onClick={handleBack}
              className="w-full inline-flex items-center justify-center gap-1.5 text-sm text-slate-400 py-2"
            >
              <IconArrowLeft size={14} />
              前に戻る
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

// ── 設問カードコンポーネント ─────────────────────────────

type CardProps = {
  question: Question
  value: string
  error?: string
  onChange: (value: string) => void
}

function QuestionCard({ question, value, error, onChange }: CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-5 py-5">
      {/* 質問文 */}
      <p className="text-base font-semibold text-slate-800 leading-snug mb-1">
        {question.text}
        {question.required && (
          <span className="text-red-500 ml-1 text-sm">*</span>
        )}
      </p>
      {question.subtext && (
        <p className="text-xs text-slate-400 mb-4">{question.subtext}</p>
      )}
      {!question.subtext && <div className="mb-4" />}

      {/* 選択式 */}
      {question.type === 'single' && question.options && (
        <div className="space-y-2">
          {question.options.map(opt => (
            <button
              key={opt.label}
              onClick={() => onChange(opt.label)}
              className={`w-full text-left text-sm px-4 py-3.5 rounded-xl border transition-all
                ${value === opt.label
                  ? 'bg-deep-teal text-white border-deep-teal font-semibold'
                  : 'bg-slate-50 text-slate-700 border-slate-200 active:bg-slate-100'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* テキスト入力 */}
      {(question.type === 'text' || question.type === 'email' || question.type === 'tel') && (
        <input
          type={question.type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={
            question.type === 'email' ? 'example@mail.com'
            : question.type === 'tel' ? '090-0000-0000'
            : ''
          }
          className={`w-full text-sm px-4 py-3.5 rounded-xl border outline-none transition
            focus:border-deep-teal focus:ring-2 focus:ring-teal-tint
            ${error ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
        />
      )}

      {/* エラー表示 */}
      {error && (
        <p className="mt-2 text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}
