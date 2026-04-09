'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV = [
  { href: '/services', label: '民泊運営サービス' },
  { href: '/portfolio', label: '運営実績' },
  { href: '/pricing', label: '料金' },
  { href: '/blog', label: 'コラム' },
  { href: '/faq', label: 'FAQ' },
  { href: '/company', label: '会社概要' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-charcoal text-white/70 text-[11px]">
        <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center justify-between">
          <span>住宅宿泊管理業 国土交通大臣(01)第F05780号</span>
          <span className="flex items-center gap-4">
            <span>受付 9:00〜18:00（土日祝除く）</span>
          </span>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-white border-b border-light-gray shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <img src="/sekai_stay_03_03.png" alt="SEKAI STAY" className="h-8 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map(n => (
              <Link
                key={n.href}
                href={n.href}
                className="text-[13px] text-charcoal hover:text-deep-teal font-semibold transition"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/diagnostic"
              className="text-[13px] font-bold text-deep-teal border-2 border-deep-teal px-5 py-2.5 rounded-lg hover:bg-teal-tint transition"
            >
              無料診断
            </Link>
            <Link
              href="/contact"
              className="text-[13px] font-bold text-white bg-deep-teal hover:bg-deep-teal px-5 py-2.5 rounded-lg transition shadow-sm"
            >
              無料相談
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="メニュー"
          >
            <span className={`block w-6 h-0.5 bg-charcoal transition-all duration-300 ${open ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`block w-6 h-0.5 bg-charcoal transition-all duration-300 ${open ? '-rotate-45 -translate-y-1' : ''}`} />
          </button>
        </div>

        {/* Mobile Nav Panel */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-[500px] border-t border-light-gray' : 'max-h-0'}`}>
          <nav className="px-6 py-5 flex flex-col gap-1 bg-white">
            {NAV.map(n => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-sm text-charcoal hover:text-deep-teal font-semibold py-3 border-b border-pale-gray transition"
              >
                {n.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4">
              <Link
                href="/diagnostic"
                onClick={() => setOpen(false)}
                className="text-sm font-bold text-deep-teal border-2 border-deep-teal text-center py-3 rounded-lg"
              >
                無料診断
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="text-sm font-bold text-white bg-deep-teal text-center py-3 rounded-lg"
              >
                無料相談
              </Link>
            </div>
            <p className="text-[10px] text-mid-gray mt-3 text-center">
              住宅宿泊管理業 国土交通大臣(01)第F05780号
            </p>
          </nav>
        </div>
      </header>
    </>
  )
}
