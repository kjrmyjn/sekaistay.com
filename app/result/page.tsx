'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllSubmissions, type Submission } from '@/lib/storage'
import { calculateScore, type AuditScore } from '@/lib/scoring'
import { RESULT_COPIES, CATEGORY_ISSUE_COPY } from '@/data/resultCopy'
import { CATEGORY_LABELS } from '@/data/questions'

export default function ResultPage() {
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [score, setScore] = useState<AuditScore | null>(null)

  useEffect(() => {
    const all = getAllSubmissions()
    const latest = all[all.length - 1]
    if (latest) {
      setSubmission(latest)
      setScore(calculateScore(latest.answers))
    }
  }, [])

  if (!submission || !score) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center px-6">
          <p className="text-slate-500 mb-6">診断データが見つかりませんでした</p>
          <Link
            href="/audit"
            className="inline-block bg-deep-teal text-white text-sm font-semibold px-6 py-3 rounded-xl"
          >
            診断を始める
          </Link>
        </div>
      </main>
    )
  }

  const copy = RESULT_COPIES[score.rank]

  // 弱点カテゴリ上位3つを課題として表示
  const issueCategories = score.weakCategories
    .filter(cat => {
      const catScore = score.categories.find(c => c.category === cat)
      return catScore && catScore.score < 70
    })
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      {/* ── ヘッダー ─────────────────────────── */}
      <header className="bg-white border-b border-slate-100 px-6 py-4">
        <p className="text-sm font-semibold text-deep-teal">診断結果</p>
      </header>

      <div className="max-w-lg mx-auto px-5 pt-8 space-y-5">
        {/* ── 総合スコア ───────────────────────── */}
        <div className={`card px-6 py-7 text-center ${copy.rankBg}`}>
          <p className="text-xs font-semibold text-slate-500 mb-2 tracking-wide">
            {submission.name} さんの診断結果
          </p>
          <div className="mb-3">
            <span className="text-6xl font-bold text-deep-teal">{score.total}</span>
            <span className="text-xl text-slate-400 font-medium"> / 100</span>
          </div>
          <span
            className={`inline-block text-sm font-bold px-4 py-1.5 rounded-full border-2 ${copy.rankColor} border-current`}
          >
            {copy.rankLabel}
          </span>
          <p className="mt-4 text-sm text-slate-700 leading-relaxed">{copy.summary}</p>
        </div>

        {/* ── カテゴリ別スコア ────────────────── */}
        <div className="card px-5 py-5">
          <h2 className="text-sm font-bold text-deep-teal mb-4">項目別スコア</h2>
          <div className="space-y-3">
            {score.categories.map(cat => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-600">{cat.label}</span>
                  <span className="text-xs font-semibold text-slate-800">{cat.score}点</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getBarColor(cat.score)}`}
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 課題3つ ──────────────────────────── */}
        {issueCategories.length > 0 && (
          <div className="card px-5 py-5">
            <h2 className="text-sm font-bold text-deep-teal mb-4">改善が期待できるポイント</h2>
            <div className="space-y-3">
              {issueCategories.map((cat, i) => {
                const issueCopy = CATEGORY_ISSUE_COPY[cat]
                return (
                  <div key={cat} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-deep-teal text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{issueCopy.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{issueCopy.body}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── 強みと改善余地 ──────────────────── */}
        <div className="card px-5 py-5 space-y-4">
          <div>
            <p className="text-xs font-semibold text-emerald-700 mb-1">✓ 現状の強み</p>
            <p className="text-sm text-slate-700">{copy.strength}</p>
          </div>
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-amber-700 mb-1">△ 改善余地</p>
            <p className="text-sm text-slate-700">{copy.improvement}</p>
          </div>
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-blue-700 mb-1">→ 優先して見直すこと</p>
            <p className="text-sm text-slate-700">{copy.priority}</p>
          </div>
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-500 mb-1">改善した場合に期待できること</p>
            <p className="text-sm text-slate-700">{copy.expectation}</p>
          </div>
        </div>

        {/* ── 無料相談CTA ──────────────────────── */}
        <div className="card px-6 py-7 text-center bg-deep-teal text-white">
          <p className="text-base font-bold mb-2">{copy.ctaText}</p>
          <p className="text-xs text-bright-teal mb-5">{copy.ctaSubtext}</p>
          <a
            href="mailto:contact@example.com?subject=民泊運営の無料相談を希望します"
            className="block w-full bg-white text-deep-teal text-sm font-bold py-3.5 rounded-xl active:opacity-90 transition"
          >
            無料相談を申し込む
          </a>
          <p className="text-xs text-teal-tint mt-3">完全無料 ・ 営業は一切しません</p>
        </div>

        {/* 診断し直す */}
        <div className="text-center">
          <Link href="/audit" className="text-xs text-slate-400 underline underline-offset-2">
            もう一度診断する
          </Link>
        </div>
      </div>
    </main>
  )
}

// スコアに応じたバーカラー
function getBarColor(score: number): string {
  if (score >= 70) return 'bg-emerald-400'
  if (score >= 50) return 'bg-amber-400'
  return 'bg-red-400'
}
