import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

/* ── Above-fold: static imports (critical path) ── */
import Hero from '@/components/home/Hero'
import AuthorityBar from '@/components/home/AuthorityBar'
import EntryPoints from '@/components/home/EntryPoints'

/* ── Below-fold: dynamic imports (reduce initial JS bundle ~69 KiB) ── */
const FloatingCTA = dynamic(() => import('@/components/FloatingCTA'), { ssr: false })
const Simulation = dynamic(() => import('@/components/home/Simulation'))
const ValueProp = dynamic(() => import('@/components/home/ValueProp'))
const Results = dynamic(() => import('@/components/home/Results'))
const Dashboard = dynamic(() => import('@/components/home/Dashboard'))
const Ecosystem = dynamic(() => import('@/components/home/Ecosystem'))
const Flow = dynamic(() => import('@/components/home/Flow'))
const Pricing = dynamic(() => import('@/components/home/Pricing'))
const Credentials = dynamic(() => import('@/components/home/Credentials'))
const FAQ = dynamic(() => import('@/components/home/FAQ'))
const FinalCTA = dynamic(() => import('@/components/home/FinalCTA'))
const FooterCatch = dynamic(() => import('@/components/home/FooterCatch'))

/* ─── SEO Meta ────────────────────────────────── */

export const metadata: Metadata = {
  title: 'SEKAI STAY | 民泊運営は、もう丸投げでいい。',
  description:
    'SEKAI STAYは、価格設計・OTA最適化・多言語対応・清掃・ゲスト対応まで一気通貫で支援する民泊運用代行サービス。既存物件の改善も、これから始める民泊の立ち上げも、まずは無料で物件の伸びしろを確認できます。',
  openGraph: {
    title: 'SEKAI STAY | 民泊運営は、もう丸投げでいい。',
    description:
      '既存物件の運用改善から、これから始める民泊の立ち上げまで。一気通貫で支援する民泊運用代行。',
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
        <EntryPoints />
        <Simulation />
        <ValueProp />
        <Results />
        <Dashboard />
        <Ecosystem />
        <Flow />
        <Pricing />
        <Credentials />
        <FAQ />
        <FinalCTA />
        <FooterCatch />
      </main>
      <Footer />
    </>
  )
}
