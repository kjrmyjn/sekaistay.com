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
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col">
      <Link
        href="/contact"
        className="bg-sekai-teal hover:bg-deep-teal text-white text-[12px] font-bold px-3 py-6 rounded-l-btn transition"
        style={{ writingMode: 'vertical-rl' }}
      >
        民泊運営のご相談
      </Link>
      <Link
        href="/diagnostic"
        className="bg-sekai-teal hover:bg-deep-teal text-white text-[12px] font-bold px-3 py-6 rounded-l-btn transition mt-px"
        style={{ writingMode: 'vertical-rl' }}
      >
        無料診断
      </Link>
    </div>
  )
}
