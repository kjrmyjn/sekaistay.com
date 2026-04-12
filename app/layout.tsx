import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
})

const GA_ID = 'G-B7M920RCGR'
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
    // Google Search Console verification — set in Vercel env
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Organization JSON-LD */}
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
        {/* GA4 — gtag.js loader */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        {/* GA4 — config + enhanced conversions */}
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              send_page_view: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `}
        </Script>
        {/* スクロール深度 & 滞在時間 & CTA クリック & フォームステップ トラッキング */}
        <Script id="engagement-tracking" strategy="afterInteractive">
          {`
            (function(){
              var maxScroll=0, tracked={};
              window.addEventListener('scroll',function(){
                var pct=Math.round(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100);
                if(pct>maxScroll) maxScroll=pct;
                [25,50,75,100].forEach(function(t){
                  if(maxScroll>=t&&!tracked[t]){tracked[t]=1;if(typeof gtag!=='undefined')gtag('event','scroll_depth',{depth_percentage:t});}
                });
              },{passive:true});
              var start=Date.now();
              window.addEventListener('beforeunload',function(){
                var sec=Math.round((Date.now()-start)/1000);
                if(sec>5&&typeof gtag!=='undefined')gtag('event','time_on_page',{duration_seconds:sec});
              });

              // UTM パラメータを sessionStorage に保持
              var params=new URLSearchParams(window.location.search);
              ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid'].forEach(function(k){
                var v=params.get(k);
                if(v) sessionStorage.setItem(k,v);
              });
            })();
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
