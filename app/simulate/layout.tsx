import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '民泊収益シミュレーター｜手数料8%で年間いくら変わる？',
  description:
    '現在の民泊売上と代行手数料を入力するだけで、SEKAI STAY（手数料8%）に切り替えた場合の年間収益差額を即座に計算。無料で何度でもお試しいただけます。',
  alternates: {
    canonical: 'https://sekaistay.com/simulate',
  },
  openGraph: {
    title: '民泊収益シミュレーター｜SEKAI STAY',
    description: '手数料8%で年間いくら変わる？無料シミュレーターで今すぐチェック。',
    url: 'https://sekaistay.com/simulate',
  },
}

export default function SimulateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
