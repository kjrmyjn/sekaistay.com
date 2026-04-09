import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '診断結果｜民泊運営セルフ診断',
  description:
    'あなたの民泊運営診断の結果を表示しています。カテゴリ別スコアと改善提案をご確認ください。',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://sekaistay.com/result',
  },
}

export default function ResultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
