'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS, STEPS, type Question } from '@/data/questions'
import { saveCurrentAnswers, submitAnswers, getCurrentAnswers } from '@/lib/storage'
import type { Answers } from '@/lib/scoring'
import { IconArrowRight, IconArrowLeft } from '@/components/Icons'

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

  useEffect(() => {
    const saved = getCurrentAnswers()
    if (Object.keys(saved).length > 0) setAnswers(saved)
  }, [])

  const currentStep = STEP_QUESTIONS.find(s => s.step === step)!
  const progress = Math.round(((step - 1) / TOTAL_STEPS) * 100)

  function handleAnswer(questionId: string, value: string) {
    const next = { ...answers, [questionId]: value }
    setAnswers(next)
    saveCurrentAnswers(next)
    if (errors[questionId]) {
      setErrors(prev => { const e = { ...prev }; delete e[questionId]; return e })
    }
  }

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
      const submission = submitAnswers(answers)
      router.push(`/result?id=${submission.id}`)
    }
  }

  function handleBack() {
    setStep(s => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-ivory pb-16">
      {/* Editorial progress header */}
      <header className="bg-paper border-b border-rule sticky top-0 z-10 backdrop-blur-sm">
        <div className="container-narrow px-5 md:px-8 py-5">
          <div className="flex items-baseline justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="rule-teal-sm" />
              <p className="eyebrow text-sekai-teal">無料診断</p>
            </div>
            <p className="eyebrow-mono text-mid-gray">
              Step <span className="font-sans text-ink">{String(step).padStart(2, '0')}</span> / {String(TOTAL_STEPS).padStart(2, '0')}
            </p>
          </div>
          <div className="h-px bg-rule overflow-hidden">
            <div
              className="h-[2px] bg-sekai-teal transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Question area */}
      <div className="container-narrow px-5 md:px-8 pt-12 md:pt-16">
        <div className="mb-10 md:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-sans font-light text-[44px] md:text-[56px] text-sekai-teal leading-none tabular-nums">
              {String(step).padStart(2, '0')}
            </span>
            <div className="flex-1">
              <p className="eyebrow-mono text-mid-gray mb-1">Chapter</p>
              <h1 className="font-sans font-medium text-[20px] md:text-[26px] text-ink leading-snug">
                {currentStep.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="space-y-5 md:space-y-6">
          {currentStep.questions.map(q => (
            <QuestionCard
              key={q.id}
              question={q}
              value={String(answers[q.id] ?? '')}
              error={errors[q.id]}
              onChange={v => handleAnswer(q.id, v)}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="pt-10 space-y-3">
          <button
            onClick={handleNext}
            className="btn btn-primary w-full justify-center text-[15px] py-4"
          >
            {step === TOTAL_STEPS ? '診断結果を見る' : '次へ進む'}
            <IconArrowRight size={14} />
          </button>
          {step > 1 && (
            <button
              onClick={handleBack}
              className="w-full inline-flex items-center justify-center gap-2 text-body-sm text-mid-gray hover:text-ink py-3 font-sans transition"
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

type CardProps = {
  question: Question
  value: string
  error?: string
  onChange: (value: string) => void
}

function QuestionCard({ question, value, error, onChange }: CardProps) {
  return (
    <div className="bg-paper border border-rule px-6 py-7 md:px-8 md:py-8">
      <p className="font-sans font-medium text-[15px] md:text-[17px] text-ink leading-snug mb-2">
        {question.text}
        {question.required && (
          <span className="text-sekai-teal ml-1 font-sans">*</span>
        )}
      </p>
      {question.subtext && (
        <p className="text-caption text-mid-gray mb-5 font-sans">{question.subtext}</p>
      )}
      {!question.subtext && <div className="mb-5" />}

      {question.type === 'single' && question.options && (
        <div className="space-y-2">
          {question.options.map(opt => (
            <button
              key={opt.label}
              onClick={() => onChange(opt.label)}
              className={`w-full text-left text-body-sm px-5 py-4 border transition ${
                value === opt.label
                  ? 'bg-ink text-ivory border-ink font-sans'
                  : 'bg-mist text-dark-gray border-rule hover:border-ink hover:text-ink font-sans'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

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
          className={`w-full text-body-sm px-5 py-4 border outline-none transition font-sans focus:border-sekai-teal ${
            error ? 'border-red-500/60 bg-red-50/30' : 'border-rule bg-mist'
          }`}
        />
      )}

      {error && (
        <p className="mt-3 text-caption text-red-600 font-sans">{error}</p>
      )}
    </div>
  )
}
