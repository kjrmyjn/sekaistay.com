import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '無料収益診断',
  description:
    '民泊物件の収益ポテンシャルを無料診断。物件タイプ・エリア・面積から、SEKAI STAYの運営代行による収益シミュレーションを即座に算出。',
  openGraph: {
    title: '無料収益診断 | SEKAI STAY',
    description: '民泊物件の収益ポテンシャルを無料診断。手数料8%の場合の収益を即座にシミュレーション。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://sekaistay.com/diagnostic',
    siteName: 'SEKAI STAY',
  },
  alternates: { canonical: 'https://sekaistay.com/diagnostic' },
}

export default function DiagnosticLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
