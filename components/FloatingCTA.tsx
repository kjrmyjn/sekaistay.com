'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-40">
      <Link
        href="/audit"
        className="group bg-ink hover:bg-sekai-teal text-ivory border border-ink hover:border-sekai-teal transition-all px-5 py-3 flex items-center gap-3 shadow-lift"
      >
        <span className="eyebrow-mono text-bright-teal">Audit</span>
        <span className="text-[12.5px] font-medium tracking-wide">無料で物件診断を受ける</span>
      </Link>
    </div>
  )
}
