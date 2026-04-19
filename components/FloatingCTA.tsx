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
    <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-40 flex flex-col gap-2">
      <Link
        href="/contact"
        className="group bg-ink hover:bg-sekai-teal text-ivory border border-ink hover:border-sekai-teal transition-all px-5 py-3 flex items-center gap-3 shadow-lift"
      >
        <span className="eyebrow-mono text-bright-teal">Consult</span>
        <span className="text-[12.5px] font-medium tracking-wide">無料相談</span>
      </Link>
      <Link
        href="/audit"
        className="group bg-ivory hover:bg-ink border border-ink text-ink hover:text-ivory transition-all px-5 py-3 flex items-center gap-3 shadow-lift-sm"
      >
        <span className="eyebrow-mono text-sekai-teal">Audit</span>
        <span className="text-[12.5px] font-medium tracking-wide">無料運営診断</span>
      </Link>
    </div>
  )
}
