import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

/* ── Above-fold: static imports (critical path) ── */
import Hero from '@/components/home/Hero'
import AuthorityBar from '@/components/home/AuthorityBar'

/* ── Below-fold: dynamic imports (reduce initial JS bundle) ── */
const FloatingCTA = dynamic(() => import('@/components/FloatingCTA'), { ssr: false })
const Simulation = dynamic(() => import('@/components/home/Simulation'))
const PainPoints = dynamic(() => import('@/components/home/PainPoints'))
const MidCTA = dynamic(() => import('@/components/home/MidCTA'))
const Flow = dynamic(() => import('@/components/home/Flow'))
const Results = dynamic(() => import('@/components/home/Results'))
const NavCards = dynamic(() => import('@/components/home/NavCards'))
const FinalCTA = dynamic(() => import('@/components/home/FinalCTA'))

/* ─── SEO Meta ────────────────────────────────── */

export const metadata: Metadata = {
  title: 'SEKAI STAY | 民泊運営は、もう丸投げでいい。',
  description:
    'SEKAI STAYは、価格設計・OTA最適化・多言語対応・清掃・ゲスト対応まで一気通貫で支援する民泊運用代行サービス。運用中の物件の改善も、これから始める民泊の立ち上げも、まずは無料で物件の伸びしろを確認できます。',
  openGraph: {
    title: 'SEKAI STAY | 民泊運営は、もう丸投げでいい。',
    description:
      '運用中の物件の改善から、これから始める民泊の立ち上げまで。一気通貫で支援する民泊運用代行。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://sekaistay.com',
    siteName: 'SEKAI STAY',
  },
  alternates: { canonical: 'https://sekaistay.com' },
}

/* ─── Page ────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <Header />
      <FloatingCTA />
      <main>
        <Hero />
        <AuthorityBar />
        <Simulation />
        <PainPoints />
        <MidCTA />
        <Flow />
        <Results />
        <NavCards />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
