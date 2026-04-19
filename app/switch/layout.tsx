import type { Metadata } from 'next'

const TITLE = '民泊運用代行の乗り換えなら SEKAI STAY｜手数料8%'
const DESCRIPTION =
  '業界平均15〜25%の手数料を8%に。最短2週間で切り替え完了、解約金0円。限定10オーナーまで初期費用¥0。無料診断レポートを次営業日にお届け。'
const URL = 'https://sekaistay.com/switch'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'website',
    locale: 'ja_JP',
    siteName: 'SEKAI STAY',
    images: [{ url: 'https://sekaistay.com/og-image.jpg', width: 1200, height: 630, alt: 'SEKAI STAY 乗り換え' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['https://sekaistay.com/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function SwitchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
