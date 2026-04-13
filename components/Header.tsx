'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV = [
  { href: '/services', label: '民泊運営サービス' },
  { href: '/case-studies', label: '導入事例' },
  { href: '/pricing', label: '料金' },
  { href: '/area', label: '対応エリア' },
  { href: '/blog', label: 'コラム' },
  { href: '/faq', label: 'FAQ' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-charcoal text-white/85 text-[11px]">
        <div className="max-w-container mx-auto px-5 md:px-10 py-1.5 flex items-center justify-between">
          <span>住宅宿泊管理業 国土交通大臣(01)第F05780号</span>
          <span>受付 9:00〜18:00（土日祝除く）</span>
        </div>
      </div>

      {/* Main header — flat design, no shadow */}
      <header className="sticky top-0 z-50 bg-white border-b border-light-gray">
        <div className="max-w-container mx-auto px-5 md:px-10 h-[64px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <img src="/sekai_stay_03_03.png" alt="SEKAI STAY" className="h-7 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV.map(n => (
              <Link
                key={n.href}
                href={n.href}
                className="text-[13px] text-charcoal hover:text-sekai-teal font-bold transition"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA — DESIGN.md §4 Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/diagnostic"
              className="text-[13px] font-bold text-sekai-teal border border-sekai-teal px-5 py-2 rounded-btn hover:bg-teal-tint transition"
            >
              無料診断
            </Link>
            <Link
              href="/contact"
              className="text-[13px] font-bold text-white bg-sekai-teal hover:bg-deep-teal px-5 py-2 rounded-btn transition"
            >
              無料相談
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5"
            aria-label="メニュー"
          >
            <span className={`block w-5 h-0.5 bg-charcoal transition-all duration-300 ${open ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`block w-5 h-0.5 bg-charcoal transition-all duration-300 ${open ? '-rotate-45 -translate-y-1' : ''}`} />
          </button>
        </div>

        {/* Mobile Nav Panel */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-[500px] border-t border-light-gray' : 'max-h-0'}`}>
          <nav className="px-5 py-5 flex flex-col gap-1 bg-white">
            {NAV.map(n => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-[15px] text-charcoal hover:text-sekai-teal font-bold py-3 border-b border-pale-gray transition"
              >
                {n.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4">
              <Link
                href="/diagnostic"
                onClick={() => setOpen(false)}
                className="text-[15px] font-bold text-sekai-teal border border-sekai-teal text-center py-3 rounded-btn"
              >
                無料診断
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="text-[15px] font-bold text-white bg-sekai-teal text-center py-3 rounded-btn"
              >
                無料相談
              </Link>
            </div>
            <p className="text-[11px] text-dark-gray mt-3 text-center">
              住宅宿泊管理業 国土交通大臣(01)第F05780号
            </p>
          </nav>
        </div>
      </header>
    </>
  )
}
