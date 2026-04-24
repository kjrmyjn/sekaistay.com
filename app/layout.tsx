import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import Script from 'next/script'
import { Suspense } from 'react'
import AnalyticsRouteTracker from '@/components/AnalyticsRouteTracker'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBF9F4' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1A1A' },
  ],
}

// SEKAI STAY ブランドガイドライン準拠:
//   日本語: Noto Sans JP / 英語: Helvetica Neue
// 見出しBold(700) / 本文Regular(400) のみ使用
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
  preload: true,
  adjustFontFallback: true,
})

const GTM_ID = 'GTM-PW2KDRFF'
const SITE_URL = 'https://sekaistay.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SEKAI STAY | 成果で選ばれる民泊運用代行',
    template: '%s | SEKAI STAY',
  },
  description:
    '管理物件レビュー平均4.8・Airbnbスーパーホスト認定。SEKAI STAYは稼働率と収益を上げる民泊運用代行です。全国7拠点・手数料8%・24時間オーナーダッシュボード。最短2週間で切り替え可能。',
  keywords: [
    '民泊 運用代行',
    '民泊 管理代行',
    'Airbnb 管理代行',
    'Airbnb 運用代行',
    '民泊 代行 比較',
    '民泊 代行 費用',
    '民泊 稼働率 向上',
    '民泊 レビュー 改善',
    '民泊 運営 委託',
    'Booking.com 運用代行',
    'SEKAI STAY',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'SEKAI STAY | 成果で選ばれる民泊運用代行',
    description:
      '管理物件レビュー平均4.8。稼働率を上げ、収益を最大化する民泊運用代行サービス。全国7拠点・24時間オーナーダッシュボード。',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'SEKAI STAY',
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'SEKAI STAY — 成果で選ばれる民泊運用代行サービス',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEKAI STAY | 成果で選ばれる民泊運用代行',
    description:
      '管理物件レビュー平均4.8・Airbnbスーパーホスト認定。稼働率と収益を上げる民泊運用代行。全国7拠点。',
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    other: {
      'facebook-domain-verification': '1ip0d4p8opbk8hljxznqz7dhb14hcy',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'SEKAI STAY',
              alternateName: '株式会社セカイチ',
              url: SITE_URL,
              logo: `${SITE_URL}/sekai_stay_03_03.png`,
              description: '管理物件レビュー平均4.8・Airbnbスーパーホスト認定。稼働率と収益を上げる民泊運用代行サービス。全国7拠点。',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '恵比寿西2丁目14-7',
                addressLocality: '渋谷区',
                addressRegion: '東京都',
                postalCode: '150-0021',
                addressCountry: 'JP',
              },
              areaServed: { '@type': 'Country', name: 'JP' },
              priceRange: '¥¥',
              hasCredential: {
                '@type': 'EducationalOccupationalCredential',
                credentialCategory: '住宅宿泊管理業',
                recognizedBy: { '@type': 'GovernmentOrganization', name: '国土交通省' },
                name: '国土交通大臣(01)第F05780号',
              },
              sameAs: [],
            }),
          }}
        />
        {/* UTM パラメータの sessionStorage 保存（GTM から参照可能）— GA/Pixel は GTM(${GTM_ID}) 経由で管理 */}
        <Script id="utm-save" strategy="afterInteractive">
          {`var _p=new URLSearchParams(location.search);['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid'].forEach(function(k){var v=_p.get(k);if(v)sessionStorage.setItem(k,v)});`}
        </Script>
        {/* Google Tag Manager — GA4/Meta Pixel/他タグ の統合管理基盤 */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* GTM noscript: JavaScript無効環境でのフォールバック */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Suspense fallback={null}>
          <AnalyticsRouteTracker />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
