import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '民泊運営代行 手数料8% | キャンペーン実施中',
  description:
    '民泊運用代行の手数料、払いすぎていませんか？SEKAI STAYは手数料8%+月額5,000円/部屋。初期費用0円・解約手数料0円・最短2週間で切り替え可能。',
  openGraph: {
    title: '民泊運営代行 手数料8% | SEKAI STAY',
    description: '手数料8%で民泊運営を完全代行。初期費用0円キャンペーン中。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://sekaistay.com/lp',
    siteName: 'SEKAI STAY',
  },
  alternates: { canonical: 'https://sekaistay.com/lp' },
}

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
