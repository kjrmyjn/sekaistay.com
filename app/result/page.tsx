'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllSubmissions, type Submission } from '@/lib/storage'
import { calculateScore, type AuditScore } from '@/lib/scoring'
import { RESULT_COPIES, CATEGORY_ISSUE_COPY } from '@/data/resultCopy'
import { IconCheck, IconAlert, IconTarget, IconArrowRight } from '@/components/Icons'

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
      <main className="min-h-screen bg-ivory flex items-center justify-center px-5">
        <div className="text-center max-w-md">
          <p className="eyebrow-mono text-mid-gray mb-3">Result · Not Found</p>
          <h1 className="font-sans font-medium text-[26px] md:text-[32px] text-ink leading-tight mb-3">
            診断データが
            <span className="block font-sans text-sekai-teal">見つかりませんでした。</span>
          </h1>
          <p className="font-sans text-body-sm text-dark-gray leading-[2] mb-8">
            もう一度診断をはじめから行っていただけますでしょうか。約3分で完了します。
          </p>
          <Link
            href="/audit"
            className="group inline-flex items-center gap-3 bg-ink text-ivory px-7 py-4 font-sans font-medium text-[14px] hover:bg-sekai-teal transition"
          >
            診断を始める
            <IconArrowRight size={14} className="group-hover:translate-x-1 transition" />
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
    <main className="bg-ivory pb-20">
      {/* Chapter Ⅰ — masthead */}
      <section className="bg-paper border-b border-rule">
        <div className="container-edit px-5 md:px-8 pt-16 md:pt-24 pb-14 md:pb-20 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="rule-teal-sm" />
            <p className="eyebrow text-sekai-teal">Chapter Ⅰ · Diagnostic Report</p>
          </div>

          <p className="eyebrow-mono text-mid-gray mb-3">
            Applicant · <span className="text-dark-gray">{submission.name}</span>
          </p>

          <h1 className="heading-display text-ink mb-10">
            診断結果<span className="block font-sans text-sekai-teal">Report № {String(submission.id).slice(-4) || '0001'}</span>
          </h1>

          {/* Score ledger */}
          <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-14 items-end pt-10 border-t border-rule">
            <div>
              <p className="eyebrow-mono text-mid-gray mb-3">Total Score</p>
              <div className="flex items-baseline gap-4">
                <span className="font-sans font-light text-[120px] md:text-[180px] leading-none text-sekai-teal tabular-nums">
                  {score.total}
                </span>
                <span className="font-sans text-mid-gray text-[20px] md:text-[24px]">/ 100</span>
              </div>
              <div className="mt-5 inline-flex items-center gap-3 border-t-2 border-sekai-teal pt-3">
                <p className="eyebrow-mono text-mid-gray">Grade</p>
                <p className="font-sans font-medium text-[18px] md:text-[22px] text-ink">{copy.rankLabel}</p>
              </div>
            </div>
            <div className="md:max-w-sm md:text-right">
              <p className="font-sans text-caption text-mid-gray mb-2">— Examiner's Note</p>
              <p className="font-sans text-body-sm md:text-[15px] text-dark-gray leading-[2]">
                {copy.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Ⅱ — category ledger */}
      <section className="section-xl">
        <div className="container-edit px-5 md:px-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="eyebrow-mono text-mid-gray">§ 02</span>
            <span className="h-px bg-rule flex-1" />
            <p className="eyebrow text-sekai-teal">Category Scores</p>
          </div>

          <div className="border-t border-b border-rule divide-y divide-rule">
            {score.categories.map((cat, i) => (
              <div key={cat.category} className="py-6 md:py-7 grid grid-cols-[auto_1fr_auto] gap-5 md:gap-8 items-center">
                <p className="eyebrow-mono text-mid-gray w-12">№ {String(i + 1).padStart(2, '0')}</p>
                <div>
                  <p className="font-sans font-medium text-[15px] md:text-[17px] text-ink mb-2">
                    {cat.label}
                  </p>
                  <div className="h-[2px] bg-rule relative overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ${getBarColor(cat.score)}`}
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-sans font-light text-[26px] md:text-[32px] text-ink leading-none tabular-nums">
                    {cat.score}
                  </p>
                  <p className="eyebrow-mono text-mid-gray mt-1">/ 100</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter Ⅲ — issues */}
      {issueCategories.length > 0 && (
        <section className="section-xl">
          <div className="container-edit px-5 md:px-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="rule-teal-sm" />
              <p className="eyebrow text-sekai-teal">Chapter Ⅲ · Room for Growth</p>
            </div>
            <h2 className="heading-section text-ink mb-10">
              改善が期待できる<span className="font-sans text-sekai-teal">3つ</span>のポイント
            </h2>

            <div className="bg-rule grid grid-cols-1 md:grid-cols-3 gap-px border border-rule">
              {issueCategories.map((cat, i) => {
                const issueCopy = CATEGORY_ISSUE_COPY[cat]
                return (
                  <div key={cat} className="bg-paper p-7 md:p-8 flex flex-col">
                    <p className="eyebrow-mono text-mid-gray mb-4">Issue № {String(i + 1).padStart(2, '0')}</p>
                    <p className="font-sans font-light text-[56px] md:text-[72px] text-sekai-teal leading-none mb-5 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="font-sans font-medium text-[17px] md:text-[19px] text-ink leading-snug mb-3">
                      {issueCopy.title}
                    </h3>
                    <p className="font-sans text-body-sm text-dark-gray leading-[1.95]">
                      {issueCopy.body}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Chapter Ⅳ — editorial analysis */}
      <section className="section-xl">
        <div className="container-edit px-5 md:px-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="eyebrow-mono text-mid-gray">§ 04</span>
            <span className="h-px bg-rule flex-1" />
            <p className="eyebrow text-sekai-teal">Editorial Analysis</p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-rule border border-rule">
            {/* 強み */}
            <div className="bg-paper p-8 md:p-10">
              <div className="flex items-center gap-2 mb-4">
                <IconCheck size={16} className="text-sekai-teal" />
                <p className="eyebrow text-sekai-teal">Strength</p>
              </div>
              <p className="font-sans text-caption text-mid-gray mb-3">— 現状の強み</p>
              <p className="font-sans text-body-sm md:text-[15px] text-dark-gray leading-[2]">
                {copy.strength}
              </p>
            </div>

            {/* 改善余地 */}
            <div className="bg-paper p-8 md:p-10">
              <div className="flex items-center gap-2 mb-4">
                <IconAlert size={16} className="text-mid-gray" />
                <p className="eyebrow text-mid-gray">Improvement</p>
              </div>
              <p className="font-sans text-caption text-mid-gray mb-3">— 改善余地</p>
              <p className="font-sans text-body-sm md:text-[15px] text-dark-gray leading-[2]">
                {copy.improvement}
              </p>
            </div>

            {/* 優先事項 */}
            <div className="bg-paper p-8 md:p-10">
              <div className="flex items-center gap-2 mb-4">
                <IconTarget size={16} className="text-sekai-teal" />
                <p className="eyebrow text-sekai-teal">Priority</p>
              </div>
              <p className="font-sans text-caption text-mid-gray mb-3">— 優先して見直すこと</p>
              <p className="font-sans text-body-sm md:text-[15px] text-dark-gray leading-[2]">
                {copy.priority}
              </p>
            </div>

            {/* 期待 */}
            <div className="bg-paper p-8 md:p-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="block w-4 h-px bg-sekai-teal" />
                <p className="eyebrow text-sekai-teal">Expectation</p>
              </div>
              <p className="font-sans text-caption text-mid-gray mb-3">— 改善後の姿</p>
              <p className="font-sans text-body-sm md:text-[15px] text-dark-gray leading-[2]">
                {copy.expectation}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Ⅴ — CTA */}
      <section className="section-xl">
        <div className="container-narrow px-5 md:px-8 max-w-4xl mx-auto">
          <div className="bg-ink text-ivory p-10 md:p-16 relative overflow-hidden">
            <div
              aria-hidden
              className="absolute -top-24 -right-24 w-[480px] h-[480px] bg-bright-teal/10 rounded-full blur-3xl pointer-events-none"
            />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-bright-teal" />
                <p className="eyebrow text-bright-teal">Chapter Ⅴ · Next Step</p>
              </div>
              <h2 className="font-sans font-bold text-[28px] md:text-[40px] leading-[1.3] mb-5">
                {copy.ctaText.split('。')[0]}
                <span className="block font-sans text-bright-teal mt-2">
                  無料相談で、次の一手を。
                </span>
              </h2>
              <p className="font-sans text-body-sm md:text-[15px] text-ivory/80 leading-[2] mb-10 max-w-lg">
                {copy.ctaSubtext}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8 max-w-xl">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-between gap-3 bg-ivory text-ink px-6 py-4 hover:bg-bright-teal transition"
                >
                  <div>
                    <p className="eyebrow-mono text-mid-gray mb-0.5">Path A</p>
                    <p className="font-sans font-medium text-[14px]">無料相談を申し込む</p>
                  </div>
                  <IconArrowRight size={14} className="group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  href="/simulate"
                  className="group inline-flex items-center justify-between gap-3 border border-ivory/30 px-6 py-4 hover:bg-ivory/5 transition"
                >
                  <div>
                    <p className="eyebrow-mono text-ivory/60 mb-0.5">Path B</p>
                    <p className="font-sans font-medium text-[14px] text-ivory">収益シミュレーション</p>
                  </div>
                  <IconArrowRight size={14} className="group-hover:translate-x-1 transition text-ivory" />
                </Link>
              </div>

              <div className="pt-6 border-t border-ivory/15 flex flex-wrap items-center gap-x-6 gap-y-2">
                <div className="flex items-center gap-2">
                  <IconCheck size={12} className="text-bright-teal" />
                  <span className="eyebrow-mono text-ivory/70">Free of Charge</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={12} className="text-bright-teal" />
                  <span className="eyebrow-mono text-ivory/70">No Hard Sell</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={12} className="text-bright-teal" />
                  <span className="eyebrow-mono text-ivory/70">30 Min Consultation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Re-take */}
          <div className="mt-10 text-center">
            <Link
              href="/audit"
              className="group inline-flex items-center gap-2 font-sans text-body-sm text-mid-gray hover:text-sekai-teal transition"
            >
              <span className="block w-6 h-px bg-rule group-hover:bg-sekai-teal group-hover:w-10 transition-[width,background-color]" />
              もう一度診断する
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

// スコアに応じたバーカラー（editorial luxury: muted tones）
function getBarColor(score: number): string {
  if (score >= 70) return 'bg-sekai-teal'
  if (score >= 50) return 'bg-dark-gray'
  return 'bg-ink/40'
}
