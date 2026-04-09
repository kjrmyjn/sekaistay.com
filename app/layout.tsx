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
    default: 'SEKAI STAY | 手数料8%の民泊運用代行',
    template: '%s | SEKAI STAY',
  },
  description:
    '民泊運用代行の手数料、払いすぎていませんか？SEKAI STAYは手数料8%+月額5,000円/部屋で、OTA最適化・24時間多言語ゲスト対応・清掃管理・価格最適化を一括代行。最短2週間で切り替え可能。',
  keywords: [
    '民泊 運用代行',
    '民泊 管理代行',
    '民泊 手数料 8%',
    'Airbnb 管理代行',
    'Airbnb 運用代行',
    '民泊 代行 比較',
    '民泊 代行 費用',
    '民泊 代行 安い',
    '民泊 手数料 安い',
    '民泊 運営 委託',
    'Booking.com 運用代行',
    'SEKAI STAY',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'SEKAI STAY | 手数料8%の民泊運用代行',
    description:
      '手数料8%で、OTA最適化・24時間ゲスト対応・清掃管理・価格最適化を一括代行。先着10オーナー移行コスト無料キャンペーン中。',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'SEKAI STAY',
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'SEKAI STAY — 手数料8%の民泊運用代行サービス',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEKAI STAY | 手数料8%の民泊運用代行',
    description:
      '手数料8%で民泊運営を完全代行。OTA最適化・24時間対応・清掃管理まで。先着10オーナー移行コスト無料。',
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
              description: '手数料8%で民泊運営を一括代行。OTA最適化・多言語ゲスト対応・清掃管理・ダイナミックプライシングをワンストップで提供。',
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
