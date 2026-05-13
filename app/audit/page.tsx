'use client'

import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import { ReportRequestForm } from '@/components/report-request/ReportRequestForm'

/* ─────────────────────────────────────────────────────────────
 * /audit — 無料物件診断フォーム (2026-05-14 LP と統一)
 *
 * Before (〜2026-05-13): 独自の 3ステップ editorial デザインフォーム + Web3Forms 経由
 * After (2026-05-14): LP (/switch/*) と同じ ReportRequestForm を使用。
 *   - Step 1: 手数料 (card grid + これから始める方 checkbox)
 *   - Step 2: 物件情報 (運用年数 / 売上スライダー / 物件名検索 / 物件数)
 *   - Step 3: ご連絡先 (氏名・メール・電話・課題)
 *   - lpVariant="audit" で /api/report-requests/submit へ POST
 *   - 送信後は timerex MTG 予約ページへリダイレクト (LP と同じ挙動)
 * ──────────────────────────────────────────────────────────── */

export default function AuditPage() {
  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="bg-ivory">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: '無料物件診断' }]} />

        {/* Hero / Masthead */}
        <section className="bg-paper border-b border-rule">
          <div className="container-edit section-hero">
            <div className="chapter-marker">
              <span className="rule-teal-sm" />
              <p className="eyebrow text-sekai-teal">Free Property Audit</p>
            </div>
            <h1 className="heading-display text-ink mb-5">
              無料物件診断
              <span className="block font-sans font-light text-mid-gray text-[0.6em] mt-3">3 minutes · personalized report</span>
            </h1>
            <p className="lead text-dark-gray max-w-2xl">
              あなたの物件の稼働率改善余地・手数料比較・運営ロードマップを、SEKAI STAY の担当アナリストが個別レポートとしてお届けします。最短24時間後にメールでご返送します。
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="section-xl">
          <div className="max-w-xl mx-auto px-5 md:px-8">
            <div className="bg-white border border-rule rounded-2xl p-4 sm:p-6 shadow-sm">
              <ReportRequestForm lpVariant="audit" embed={false} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
