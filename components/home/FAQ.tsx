'use client'

import { useState, useMemo } from 'react'
import { FAQ as FAQ_DATA } from '@/content/home/copy'
import { JP } from '@/components/JP'

export default function FAQ() {
  const [activeCat, setActiveCat] = useState<string>('all')
  const [open, setOpen] = useState<number | null>(0)

  const visibleItems = useMemo(() => {
    return FAQ_DATA.items
      .map((item, originalIndex) => ({ ...item, originalIndex }))
      .filter((item) => activeCat === 'all' || item.category === activeCat)
  }, [activeCat])

  const handleCategoryChange = (cat: string) => {
    setActiveCat(cat)
    setOpen(null)
  }

  return (
    <section className="bg-white">
      <div className="max-w-[960px] mx-auto px-5 md:px-10 section-xl">
        {/* ── Header ── */}
        <div className="mb-10 md:mb-12 max-w-[720px]">
          <div className="eyebrow text-sekai-teal mb-4">FAQ</div>
          <h2 className="heading-section text-charcoal mb-4 jp-keep">
            <JP>{FAQ_DATA.headline}</JP>
          </h2>
          <p className="text-body text-dark-gray jp-break">
            {FAQ_DATA.body}
          </p>
        </div>

        {/* ── Category tabs ── */}
        <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
          {FAQ_DATA.categories.map((cat) => {
            const count =
              cat.id === 'all'
                ? FAQ_DATA.items.length
                : FAQ_DATA.items.filter((i) => i.category === cat.id).length
            const active = activeCat === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`inline-flex items-center gap-2 text-[13px] font-bold px-4 py-2 rounded-full border transition ${
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

        {/* ── Questions list ── */}
        <div className="space-y-3">
          {visibleItems.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.originalIndex}
                className={`bg-white rounded-card border transition-colors ${
                  isOpen ? 'border-sekai-teal' : 'border-light-gray'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <span className="text-[12px] font-mono font-bold text-sekai-teal mt-1 flex-shrink-0">
                      Q{String(item.originalIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[15px] md:text-[16px] font-bold text-charcoal jp-keep">
                      <JP>{item.q}</JP>
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition ${
                      isOpen
                        ? 'border-sekai-teal bg-sekai-teal text-white'
                        : 'border-light-gray text-dark-gray'
                    }`}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    >
                      <path
                        d="M1 3l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pl-[60px] md:pl-[68px]">
                      <p className="text-body-sm text-dark-gray jp-break">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {visibleItems.length === 0 && (
          <div className="text-center text-[13px] text-mid-gray py-10">
            該当する項目がありません。
          </div>
        )}
      </div>
    </section>
  )
}
