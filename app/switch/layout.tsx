import type { Metadata, Viewport } from 'next'

/* ─────────────────────────────────────────────────────────────
 * /switch のメタデータ — 元LP (sekaistay-lp.vercel.app/switch) と一致させる
 * ページ本体は page.tsx でiframeミラーとして元LPを表示
 * ───────────────────────────────────────────────────────────── */

const TITLE = 'SEKAI STAY | 手数料8%の民泊運用代行'
const DESCRIPTION =
  '独自の仕組みで手数料8%を実現。OTA掲載管理・ゲスト対応・清掃手配・価格調整まで、民泊運営のすべてをお任せください。'
const URL = 'https://sekaistay.com/switch'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: '手数料、払いすぎていませんか。SEKAI STAYなら8%で高品質な運営を実現。',
    url: URL,
    type: 'website',
    locale: 'ja_JP',
    siteName: 'SEKAI STAY',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: '手数料、払いすぎていませんか。SEKAI STAYなら8%で高品質な運営を実現。',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function SwitchLayout({ children }: { children: React.ReactNode }) {
  // 親の root layout が <html><body> を提供。子レイアウトはパススルーのみ。
  return <>{children}</>
}
