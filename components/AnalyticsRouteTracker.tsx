'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Next.js の App Router はクライアント遷移で layout が再マウントされないため、
// Meta Pixel と GA4 の PageView は明示的に再発火する必要がある。
//
// 初回ロード: layout.tsx のインラインスクリプトが完全な URL (UTM 含む) で既に PageView 発火済み。
// 当コンポーネントは「pathname が変わったとき」だけ追加発火する。
//
// 依存配列に searchParams を含めない理由:
//   useSearchParams() はハイドレーションで値が遅延してくるため、UTM 付きランディング URL では
//   useEffect が 2 回走り (空 → utm 付き)、後者で fullPath が変化したと誤判定して二重発火する。
//   pathname 変化のみで発火する設計に揃え、現在の URL の searchParams は発火時に snapshot 化する。
// 副作用: 同一 path 内での searchParams のみの変更 (例: /switch → /switch?utm=x) は track しない。
//   実用上ほぼ発生しないので許容。
export default function AnalyticsRouteTracker() {
  const pathname = usePathname()
  // searchParams は読み出すだけで依存にしない (ESLint 警告は意図的に無視)
  const searchParams = useSearchParams()
  const lastTrackedPath = useRef<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const w = window as unknown as {
      fbq?: (...a: unknown[]) => void
      gtag?: (...a: unknown[]) => void
      dataLayer?: unknown[]
    }

    if (lastTrackedPath.current === pathname) return
    const isInitial = lastTrackedPath.current === null
    lastTrackedPath.current = pathname
    if (isInitial) return // 初回は layout.tsx が UTM 込みで既に発火済み

    const query = searchParams?.toString()
    const fullPath = query ? `${pathname}?${query}` : pathname

    if (!w.dataLayer) w.dataLayer = []
    if (typeof w.gtag === 'function') {
      w.gtag('event', 'page_view', { page_path: fullPath })
    } else {
      w.dataLayer.push(['event', 'page_view', { page_path: fullPath }])
    }

    if (typeof w.fbq === 'function') {
      w.fbq('track', 'PageView')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return null
}
