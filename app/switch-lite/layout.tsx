import type { Metadata, Viewport } from 'next'

const TITLE = 'SEKAI STAY | 30秒で完了・民泊運用代行のご相談'
const DESCRIPTION =
  '物件情報の入力は不要。お名前・メール・電話番号だけで、24時間以内に担当者からご連絡。手数料8%の民泊運用代行 SEKAI STAY。'
const URL = 'https://sekaistay.com/switch-lite'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description:
      '物件情報の入力は不要。連絡先だけで24時間以内に担当者からご連絡します。',
    url: URL,
    type: 'website',
    locale: 'ja_JP',
    siteName: 'SEKAI STAY',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description:
      '物件情報の入力は不要。連絡先だけで24時間以内に担当者からご連絡します。',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function SwitchLiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
