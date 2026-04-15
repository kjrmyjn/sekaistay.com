'use client'

import { useEffect, useState } from 'react'
import { getAllSubmissions, type Submission } from '@/lib/storage'
import { calculateScore } from '@/lib/scoring'
import { CATEGORY_LABELS } from '@/data/questions'
import { IconMail, IconPhone, IconCalendar } from '@/components/Icons'

type SortKey = 'submittedAt' | 'totalScore'
type FilterMode = 'all' | 'consultation' | 'lowScore'

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('submittedAt')
  const [sortAsc, setSortAsc] = useState(false)
  const [filter, setFilter] = useState<FilterMode>('all')
  const [selected, setSelected] = useState<Submission | null>(null)

  useEffect(() => {
    setSubmissions(getAllSubmissions())
  }, [])

  // フィルタリング
  const filtered = submissions.filter(s => {
    if (filter === 'consultation') return s.wantsConsultation === 'はい、希望します'
    if (filter === 'lowScore') return s.totalScore < 50
    return true
  })

  // ソート
  const sorted = [...filtered].sort((a, b) => {
    let diff = 0
    if (sortKey === 'totalScore') diff = a.totalScore - b.totalScore
    else diff = new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
    return sortAsc ? diff : -diff
  })

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(a => !a)
    else { setSortKey(key); setSortAsc(false) }
  }

  // CSV出力
  function downloadCSV() {
    const headers = [
      '回答日時', '氏名', '施設名', 'メール', '電話番号',
      '運用形態', '総合スコア', '相談希望', '課題タグ',
      ...Object.values(CATEGORY_LABELS)
    ]
    const rows = sorted.map(s => {
      const catScores = calculateScore(s.answers).categories
      const catMap = Object.fromEntries(catScores.map(c => [c.label, c.score]))
      return [
        new Date(s.submittedAt).toLocaleString('ja-JP'),
        s.name, s.propertyName, s.email, s.tel,
        s.managementStyle, s.totalScore, s.wantsConsultation,
        s.issueTags.join(' / '),
        ...Object.values(CATEGORY_LABELS).map(l => catMap[l] ?? '')
      ]
    })
    const csv = [headers, ...rows]
      .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url
    a.download = `minpaku-audit-${new Date().toISOString().slice(0, 10)}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ── ヘッダー ─────────────────────────── */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <p className="text-sm font-bold text-deep-teal">管理画面</p>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">{sorted.length}件表示</span>
          <button
            onClick={downloadCSV}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg transition"
          >
            CSV出力
          </button>
        </div>
      </header>

      <div className="px-4 py-6 max-w-7xl mx-auto">
        {/* ── フィルタ ─────────────────────────── */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {(
            [
              { key: 'all', label: 'すべて' },
              { key: 'consultation', label: '相談希望' },
              { key: 'lowScore', label: 'スコア50点以下' },
            ] as { key: FilterMode; label: string }[]
          ).map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition ${
                filter === f.key
                  ? 'bg-deep-teal text-white border-deep-teal'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── テーブル ─────────────────────────── */}
        {sorted.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 px-6 py-16 text-center">
            <p className="text-slate-400 text-sm">回答データがありません</p>
            <p className="text-slate-400 text-xs mt-2">
              診断フォームからデータを送信すると、ここに表示されます。
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-x-auto shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left">
                  <Th onClick={() => toggleSort('submittedAt')} active={sortKey === 'submittedAt'} asc={sortAsc}>
                    回答日時
                  </Th>
                  <Th>氏名・施設</Th>
                  <Th>連絡先</Th>
                  <Th>運用形態</Th>
                  <Th onClick={() => toggleSort('totalScore')} active={sortKey === 'totalScore'} asc={sortAsc}>
                    総合スコア
                  </Th>
                  <Th>相談希望</Th>
                  <Th>課題タグ</Th>
                  <Th>詳細</Th>
                </tr>
              </thead>
              <tbody>
                {sorted.map(s => (
                  <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                    {/* 日時 */}
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                      {new Date(s.submittedAt).toLocaleString('ja-JP', {
                        month: 'numeric', day: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </td>
                    {/* 氏名・施設 */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="font-semibold text-slate-800">{s.name}</p>
                      <p className="text-xs text-slate-400">{s.propertyName}</p>
                    </td>
                    {/* 連絡先 */}
                    <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">
                      <p>{s.email}</p>
                      {s.tel && <p className="text-slate-400">{s.tel}</p>}
                    </td>
                    {/* 運用形態 */}
                    <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">
                      {s.managementStyle || '—'}
                    </td>
                    {/* 総合スコア */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <ScoreBadge score={s.totalScore} />
                    </td>
                    {/* 相談希望 */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <ConsultationBadge value={s.wantsConsultation} />
                    </td>
                    {/* 課題タグ */}
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {s.issueTags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    {/* 詳細 */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelected(s)}
                        className="text-xs text-sekai-teal hover:underline whitespace-nowrap"
                      >
                        詳細
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── 詳細モーダル ─────────────────────── */}
      {selected && (
        <DetailModal submission={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  )
}

// ── サブコンポーネント ───────────────────────────────────

function Th({
  children,
  onClick,
  active,
  asc,
}: {
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
  asc?: boolean
}) {
  return (
    <th
      onClick={onClick}
      className={`px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap
        ${onClick ? 'cursor-pointer select-none hover:text-slate-800' : ''}`}
    >
      {children}
      {active && <span className="ml-1">{asc ? '↑' : '↓'}</span>}
    </th>
  )
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80 ? 'bg-emerald-100 text-emerald-700' :
    score >= 60 ? 'bg-blue-100 text-blue-700' :
    score >= 40 ? 'bg-amber-100 text-amber-700' :
    'bg-red-100 text-red-700'
  return (
    <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${color}`}>
      {score}点
    </span>
  )
}

function ConsultationBadge({ value }: { value: string }) {
  if (value === 'はい、希望します') {
    return (
      <span className="inline-block text-xs font-semibold bg-sekai-teal text-white px-2.5 py-1 rounded-full">
        希望あり
      </span>
    )
  }
  return <span className="text-xs text-slate-400">{value || '—'}</span>
}

function DetailModal({
  submission,
  onClose,
}: {
  submission: Submission
  onClose: () => void
}) {
  const score = calculateScore(submission.answers)

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex justify-between items-center">
          <div>
            <p className="font-bold text-slate-800">{submission.name}</p>
            <p className="text-xs text-slate-400">{submission.propertyName}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 text-xl leading-none">×</button>
        </div>

        <div className="px-5 py-5 space-y-4">
          {/* スコア */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-deep-teal">{score.total}</p>
              <p className="text-xs text-slate-400">総合スコア</p>
            </div>
            <div className="flex-1 space-y-2">
              {score.categories.map(cat => (
                <div key={cat.category}>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-slate-500">{cat.label}</span>
                    <span className="font-semibold">{cat.score}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getBarColor(cat.score)}`}
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 回答一覧 */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-500 mb-3">回答内容</p>
            <div className="space-y-2">
              {Object.entries(submission.answers).map(([id, val]) => {
                if (id.startsWith('contact_')) return null
                return (
                  <div key={id} className="flex gap-2 text-xs">
                    <span className="text-slate-400 w-20 flex-shrink-0">{id}</span>
                    <span className="text-slate-700">{String(val)}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 連絡先 */}
          <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
            <p className="flex items-center gap-2">
              <IconMail size={13} className="text-slate-400" />
              <span>{submission.email}</span>
            </p>
            {submission.tel && (
              <p className="flex items-center gap-2">
                <IconPhone size={13} className="text-slate-400" />
                <span>{submission.tel}</span>
              </p>
            )}
            <p className="flex items-center gap-2">
              <IconCalendar size={13} className="text-slate-400" />
              <span>{new Date(submission.submittedAt).toLocaleString('ja-JP')}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function getBarColor(score: number): string {
  if (score >= 70) return 'bg-emerald-400'
  if (score >= 50) return 'bg-amber-400'
  return 'bg-red-400'
}
