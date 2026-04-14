import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

import Hero from '@/components/home/Hero'
import EntryPoints from '@/components/home/EntryPoints'
import Simulation from '@/components/home/Simulation'
import ValueProp from '@/components/home/ValueProp'
import Results from '@/components/home/Results'
import Dashboard from '@/components/home/Dashboard'
import Flow from '@/components/home/Flow'
import Pricing from '@/components/home/Pricing'
import FAQ from '@/components/home/FAQ'
import FinalCTA from '@/components/home/FinalCTA'
import FooterCatch from '@/components/home/FooterCatch'

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
        <EntryPoints />
        <Simulation />
        <ValueProp />
        <Results />
        <Dashboard />
        <Flow />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <FooterCatch />
      </main>
      <Footer />
    </>
  )
}
