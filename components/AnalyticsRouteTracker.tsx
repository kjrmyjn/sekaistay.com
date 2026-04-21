'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Next.js の App Router はクライアント遷移で layout が再マウントされないため、
// Meta Pixel と GA4 の PageView は明示的に再発火する必要がある。
// 初回ロードの PageView は layout.tsx のインラインスクリプトが担当するので、
// ここでは「pathname が変わったとき」だけ追加発火する（初回は skip）。
export default function AnalyticsRouteTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const w = window as unknown as {
      fbq?: (...a: unknown[]) => void
      gtag?: (...a: unknown[]) => void
      dataLayer?: unknown[]
      __analyticsRouteInit?: boolean
    }
    // 初回レンダーは layout 側で既に送信済みなのでスキップ
    if (!w.__analyticsRouteInit) {
      w.__analyticsRouteInit = true
      return
    }

    const query = searchParams?.toString()
    const fullPath = query ? `${pathname}?${query}` : pathname

    // GA4 は lazyOnload で本体ロードが遅れても dataLayer に積んでおけば後から消化される。
    // gtag 関数が未定義でも dataLayer に config.js 互換のタプルを push できる。
    if (!w.dataLayer) w.dataLayer = []
    if (typeof w.gtag === 'function') {
      w.gtag('event', 'page_view', { page_path: fullPath })
    } else {
      w.dataLayer.push(['event', 'page_view', { page_path: fullPath }])
    }

    // Meta Pixel は layout の afterInteractive で `fbq` stub が早期生成される。
    // ここで独自 stub を作ると公式 bootstrap の `if(f.fbq)return` に引っ掛かり
    // fbevents.js が読み込まれなくなる。未定義時は send を諦める方が安全。
    if (typeof w.fbq === 'function') {
      w.fbq('track', 'PageView')
    }
  }, [pathname, searchParams])

  return null
}
