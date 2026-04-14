'use client'

import { useState } from 'react'
import { FAQ as FAQ_DATA } from '@/content/home/copy'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-white">
      <div className="max-w-[880px] mx-auto px-5 md:px-10 section-xl">
        <div className="mb-10 md:mb-12">
          <div className="divider-teal mb-5" />
          <h2 className="heading-section text-charcoal">
            {FAQ_DATA.headline}
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.items.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className={`bg-white rounded-card border transition-colors ${
                  isOpen ? 'border-sekai-teal' : 'border-light-gray'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <span className="text-[13px] font-mono font-bold text-sekai-teal mt-0.5 flex-shrink-0">
                      Q{String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[15px] md:text-[16px] font-bold text-charcoal">
                      {item.q}
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
                      <p className="text-body-sm text-dark-gray">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
