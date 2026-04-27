'use client'

// ─────────────────────────────────────────────────────────────────────
// SEKAI STAY — Landing Page v6 (Editorial Luxury)
// 構成: Campaign → Hero → Simulator → Story → Pains → Services → Why8%
//       → Pricing → Portfolio → Testimonials → Flow → FAQ → Blog
//       → Diagnostic Form → Final CTA → Company → Footer
// ─────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, ReactNode } from 'react'

const OUR_RATE = 0.08

// ── SVG Icon Components ────────────────────────────────────────────
function IconCheck({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
}
function IconArrowRight({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
}
function IconStar({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}

// ── Scroll Animation Hook ──────────────────────────────────────────
function useInView(threshold = 0.01) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold, rootMargin: '200px 0px' }
    )
    obs.observe(el)
    const timer = setTimeout(() => setVisible(true), 1500)
    return () => { obs.disconnect(); clearTimeout(timer) }
  }, [threshold])
  return { ref, visible }
}

function FadeIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ── Structured Data ───────────────────────────────────────────────
function StructuredData() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: '本当に手数料8%だけですか？隠れた費用はありませんか？', acceptedAnswer: { '@type': 'Answer', text: '手数料は売上の8%と、月額5,000円/部屋のみです。それ以外の費用は一切かかりません。清掃費はゲスト負担のため、オーナー様の負担には含まれません。' } },
      { '@type': 'Question', name: '途中で解約できますか？', acceptedAnswer: { '@type': 'Answer', text: 'はい、2ヶ月前にご連絡いただくだけで解約可能です。サービスに自信があるため解約手数料はかかりません。' } },
      { '@type': 'Question', name: '物件が遠方でも大丈夫ですか？', acceptedAnswer: { '@type': 'Answer', text: 'はい、対応可能です。現地パートナーと連携し、清掃・点検・緊急対応まで一貫してカバーします。' } },
      { '@type': 'Question', name: '既に他社に委託中ですが、切り替えできますか？', acceptedAnswer: { '@type': 'Answer', text: 'はい、最短2週間で切り替え可能です。予約の精算や引き継ぎ対応は弊社がすべて行います。' } },
      { '@type': 'Question', name: 'なぜ8%で実現できるのですか？', acceptedAnswer: { '@type': 'Answer', text: '予約管理やゲスト対応、価格調整などを独自の仕組みで効率化しているためです。中間マージンも排除し、オーナー様とダイレクトにつながる体制でコストを抑えています。' } },
      { '@type': 'Question', name: '管理物件が少なくても依頼できますか？', acceptedAnswer: { '@type': 'Answer', text: 'もちろんです。1物件からお受けしています。物件の規模やタイプを問わず、最適な運営プランをご提案します。' } },
    ],
  }
  const orgSchema = {
    '@context': 'https://schema.org', '@type': 'Organization',
    name: 'SEKAI STAY', url: 'https://sekaistay.com',
    description: '独自の仕組みで民泊運用のコスト構造を根本から変える運用代行サービス',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://sekaistay.com/contact',
      availableLanguage: ['Japanese', 'English'],
    },
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'SEKAI STAY 民泊運用代行',
    serviceType: '民泊運用代行・管理代行',
    provider: { '@type': 'Organization', name: 'SEKAI STAY', url: 'https://sekaistay.com' },
    url: 'https://sekaistay.com',
    description: '手数料8%で民泊運営を完全代行。OTA掲載管理・多言語ゲスト対応・清掃手配・価格最適化を一括でお任せいただけます。',
    areaServed: { '@type': 'Country', name: 'Japan' },
    offers: {
      '@type': 'Offer',
      description: '売上の8% + 月額5,000円/部屋',
      priceCurrency: 'JPY',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '民泊運用代行サービス',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'OTA掲載管理（Airbnb・Booking.com等）' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '24時間多言語ゲスト対応' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '清掃手配・品質管理' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ダイナミックプライシング（価格最適化）' } },
      ],
    },
  }
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SEKAI STAY',
    url: 'https://sekaistay.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://sekaistay.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen bg-ivory text-ink overflow-x-hidden">
      <StructuredData />
      <CampaignBanner />
      <Nav />
      <Hero />
      <InlineSimulator />
      <StorySection />
      <Pains />
      <Services />
      <WhyEightPercent />
      <Pricing />
      <Portfolio />
      <Testimonials />
      <ServiceFlow />
      <FAQ />
      <BlogSection />
      <DiagnosticForm />
      <FinalCTA />
      <CompanyInfo />
      <Footer />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Campaign Banner — editorial masthead tagline
// ─────────────────────────────────────────────────────────────────────
function CampaignBanner() {
  return (
    <div className="bg-ink text-ivory text-center py-2.5 px-4 border-b border-ivory/10">
      <p className="eyebrow-mono text-[10px] md:text-[11px] text-ivory/80">
        <span className="text-bright-teal">★ 4.8</span>
        <span className="mx-3 text-ivory/30">·</span>
        Airbnb Super-Host Certified
        <span className="mx-3 text-ivory/30">·</span>
        初期費用0円キャンペーン実施中
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navLinks = [
    { href: '#services', label: 'サービス' },
    { href: '#pricing', label: '料金' },
    { href: '#portfolio', label: '実績' },
    { href: '#voice', label: 'オーナー様の声' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-paper/95 backdrop-blur-md border-b border-rule' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 flex-shrink-0">
          <img
            src="/sekai_stay_03_03.png"
            alt="SEKAI STAY"
            width={95}
            height={36}
            className={`h-7 md:h-8 w-auto transition-all duration-300 ${scrolled ? '' : 'invert brightness-0 invert'}`}
            style={scrolled ? {} : { filter: 'brightness(0) invert(1)' }}
          />
        </a>

        {/* Desktop nav */}
        <nav className={`hidden md:flex items-center gap-8 font-sans text-[13px] transition-colors ${scrolled ? 'text-dark-gray' : 'text-ivory/80'}`}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="group relative hover:text-sekai-teal transition">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-sekai-teal group-hover:w-full transition-[width] duration-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#diagnostic"
            className={`hidden sm:inline-flex items-center gap-2 font-sans font-medium text-[13px] px-5 py-3 border transition ${scrolled ? 'bg-ink text-ivory border-ink hover:bg-sekai-teal hover:border-sekai-teal' : 'bg-ivory text-ink border-ivory hover:bg-bright-teal hover:border-bright-teal'}`}
          >
            無料診断
          </a>

          <button
            onClick={() => setMobileOpen(o => !o)}
            className={`md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 ${scrolled ? 'text-ink' : 'text-ivory'}`}
            aria-label="メニュー"
          >
            <span className={`block w-5 h-px transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[3px]' : ''} ${scrolled ? 'bg-ink' : 'bg-ivory'}`} />
            <span className={`block w-5 h-px transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[3px]' : ''} ${scrolled ? 'bg-ink' : 'bg-ivory'}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="bg-paper border-t border-rule px-5 py-4 space-y-1">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-4 py-3 border-b border-rule last:border-0 font-sans text-[14px] text-ink hover:text-sekai-teal transition"
            >
              <span className="eyebrow-mono text-mid-gray w-8">0{i + 1}</span>
              {l.label}
            </a>
          ))}
          <a
            href="#diagnostic"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between gap-4 bg-ink text-ivory px-5 py-4 mt-3 font-sans font-medium text-[14px]"
          >
            無料診断を始める
            <IconArrowRight className="w-4 h-4" />
          </a>
        </nav>
      </div>
    </header>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Hero — Editorial cover
// ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" className="relative bg-ink text-ivory overflow-hidden -mt-16 md:-mt-20 pt-16 md:pt-20">
      {/* Subtle teal wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-bright-teal/8 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-sekai-teal/8 blur-3xl" />
      </div>

      <div className="relative container-edit px-5 md:px-8 pt-16 md:pt-24 pb-20 md:pb-28 max-w-6xl mx-auto">
        {/* Top editorial marker */}
        <div className="chapter-marker">
          <span className="h-px w-10 bg-bright-teal" />
          <p className="eyebrow text-bright-teal">Chapter Ⅰ · Cover</p>
        </div>

        <div className="hero-grid">
          <div>
            <p className="eyebrow-mono text-bright-teal mb-5">Issue · 2026 Spring · No. 001</p>
            <h1 className="heading-masthead heading-mb-lg">
              稼働率を上げる。
              <span className="block">レビューを上げる。</span>
              <span className="block text-bright-teal">収益を上げる。</span>
            </h1>

            {/* Editorial stats ledger */}
            <div className="grid grid-cols-3 gap-px bg-ivory/15 border border-ivory/15 mb-10 max-w-xl">
              {[
                { num: '4.8', label: 'Review Average' },
                { num: '8%', label: 'Management Fee' },
                { num: '7', label: 'National Offices' },
              ].map((s, i) => (
                <div key={i} className="bg-ink p-5 text-center">
                  <p className="font-sans font-light text-[36px] md:text-[48px] leading-none text-bright-teal tabular-nums">
                    {s.num}
                  </p>
                  <p className="eyebrow-mono text-ivory/60 mt-2">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="font-sans text-caption text-ivory/70 mb-3">— Trusted Minpaku Management</p>
            <p className="font-sans text-body-sm md:text-[15px] text-ivory/85 leading-[2] mb-10 max-w-lg">
              Airbnbスーパーホスト認定。独自の仕組みで、民泊運用のコスト構造を根本から変える。手数料8%で、世界基準の運営を。
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-3 mb-10 font-sans text-[13px] text-ivory/80">
              <span className="flex items-center gap-2"><IconCheck className="w-3.5 h-3.5 text-bright-teal" /> 初期費用0円</span>
              <span className="flex items-center gap-2"><IconCheck className="w-3.5 h-3.5 text-bright-teal" /> 違約金ゼロ</span>
              <span className="flex items-center gap-2"><IconCheck className="w-3.5 h-3.5 text-bright-teal" /> 最短2週間で切替</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <a
                href="#simulator"
                className="group inline-flex items-center justify-between gap-3 bg-ivory text-ink px-6 py-4 hover:bg-bright-teal transition"
              >
                <div>
                  <p className="eyebrow-mono text-mid-gray mb-0.5">Path A</p>
                  <p className="font-sans font-medium text-[14px]">損失額を診断する</p>
                </div>
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </a>
              <a
                href="#diagnostic"
                className="group inline-flex items-center justify-between gap-3 border border-ivory/30 text-ivory px-6 py-4 hover:bg-ivory/5 transition"
              >
                <div>
                  <p className="eyebrow-mono text-ivory/60 mb-0.5">Path B</p>
                  <p className="font-sans font-medium text-[14px]">無料相談</p>
                </div>
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </a>
            </div>
          </div>

          {/* Right side — Plate No.001 ledger */}
          <div className="hidden md:block pl-10 border-l border-ivory/15">
            <p className="eyebrow-mono text-ivory/60 mb-3">Plate № 001 · Fee Structure</p>
            <p className="font-sans font-light text-[160px] leading-[0.85] text-bright-teal tabular-nums">
              8<span className="text-[80px] text-ivory/60">%</span>
            </p>
            <div className="mt-6 pt-6 border-t border-ivory/15 space-y-2">
              <div className="flex justify-between font-sans text-[13px] text-ivory/80">
                <span>Management Fee</span>
                <span className="font-medium text-ivory">8.00%</span>
              </div>
              <div className="flex justify-between font-sans text-[13px] text-ivory/80">
                <span>Monthly (per room)</span>
                <span className="font-medium text-ivory">¥5,000</span>
              </div>
              <div className="flex justify-between font-sans text-[13px] text-ivory/80">
                <span>Initial Cost</span>
                <span className="font-medium text-bright-teal">¥0</span>
              </div>
            </div>
            <p className="font-sans text-caption text-ivory/50 mt-6">
              — All inclusive. No hidden fees.
            </p>
          </div>
        </div>
      </div>

      {/* Page turn — hairline separator */}
      <div className="relative h-px bg-ivory/10" />
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Inline Simulator — Editorial revenue ledger
// ─────────────────────────────────────────────────────────────────────
function AnimNum({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(value)
  const prev = useRef(value)
  useEffect(() => {
    const from = prev.current
    const to = value
    prev.current = to
    if (from === to) return
    const duration = 350
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(from + (to - from) * ease))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value])
  return <>{prefix}{fmt(display)}{suffix}</>
}

function InlineSimulator() {
  const [revenue, setRevenue] = useState(500000)
  const BOOST = 1.30
  const CURRENT_RATE = 0.15

  const nowAnnual = revenue * (1 - CURRENT_RATE) * 12
  const boosted = revenue * BOOST
  const sekaiAnnual = boosted * (1 - OUR_RATE) * 12
  const diff = sekaiAnnual - nowAnnual

  return (
    <section id="simulator" className="bg-paper border-y border-rule">
      <div className="container-edit px-5 md:px-8 section-xl max-w-5xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-3">
            <span className="rule-teal-sm" />
            <p className="eyebrow text-sekai-teal">Chapter Ⅱ · Revenue Simulator</p>
          </div>
          <h2 className="heading-section text-ink mb-3">
            あなたの物件、<span className="font-sans text-sekai-teal">いくら変わる？</span>
          </h2>
          <p className="font-sans text-body-sm text-mid-gray mb-14">
            スライドして、年間の手取り差額をチェック
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-start">
            {/* Controls */}
            <div>
              <p className="eyebrow-mono text-mid-gray mb-3">Current · Monthly Revenue</p>
              <p className="font-sans font-light text-[40px] sm:text-[56px] md:text-[80px] leading-none text-ink tabular-nums mb-6">
                ¥<AnimNum value={revenue} />
              </p>
              <input
                type="range" min={100000} max={4000000} step={50000}
                value={revenue}
                onChange={e => setRevenue(Number(e.target.value))}
                className="w-full accent-sekai-teal h-1 mb-3 cursor-pointer"
              />
              <div className="flex justify-between eyebrow-mono text-mid-gray">
                <span>¥100K</span>
                <span>¥4,000K</span>
              </div>

              <p className="font-sans text-caption text-mid-gray mt-8 leading-[2]">
                — 稼働率改善（+30%）と手数料削減（15%→8%）のダブル効果。弊社管理物件の平均実績に基づく試算です。
              </p>
            </div>

            {/* Ledger output */}
            <div className="bg-ivory border border-rule">
              <div className="grid grid-cols-2 divide-x divide-rule border-b border-rule">
                <div className="p-6 md:p-7">
                  <p className="eyebrow-mono text-mid-gray mb-3">Before · Annual Net</p>
                  <p className="font-sans font-light text-[28px] md:text-[36px] leading-none text-mid-gray tabular-nums line-through decoration-[0.5px]">
                    ¥<AnimNum value={nowAnnual} />
                  </p>
                </div>
                <div className="p-6 md:p-7">
                  <p className="eyebrow-mono text-sekai-teal mb-3">With SEKAI STAY</p>
                  <p className="font-sans font-light text-[28px] md:text-[36px] leading-none text-sekai-teal tabular-nums">
                    ¥<AnimNum value={sekaiAnnual} />
                  </p>
                </div>
              </div>
              <div className="bg-ink text-ivory p-7 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-px w-6 bg-bright-teal" />
                  <p className="eyebrow text-bright-teal">Annual Gain</p>
                </div>
                <p className="font-sans font-light text-[48px] md:text-[64px] leading-none text-bright-teal tabular-nums">
                  +¥<AnimNum value={diff} />
                </p>
                <p className="font-sans text-caption text-ivory/60 mt-3">— 年間の手取り増加額</p>
              </div>
              <a
                href="#diagnostic"
                className="group flex items-center justify-between gap-3 bg-paper border-t border-rule px-7 py-5 hover:bg-mist transition"
              >
                <span className="font-sans font-medium text-[14px] text-ink">この差額を手に入れる</span>
                <IconArrowRight className="w-4 h-4 text-sekai-teal group-hover:translate-x-1 transition" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Story Section — Editorial pull-quote
// ─────────────────────────────────────────────────────────────────────
function StorySection() {
  return (
    <section className="bg-ivory">
      <div className="container-edit px-5 md:px-8 section-xl max-w-4xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-3">
            <span className="rule-teal-sm" />
            <p className="eyebrow text-sekai-teal">Chapter Ⅲ · A Silent Loss</p>
          </div>
          <p className="eyebrow-mono text-mid-gray mb-8">Editor's Note · Tanaka-san</p>

          <figure className="border-l-2 border-sekai-teal pl-8 md:pl-12">
            <p className="font-sans font-light text-[28px] md:text-[44px] leading-[1.4] text-ink mb-8">
              「<span className="text-sekai-teal">15%</span>払ってるのに、この対応？」
            </p>
            <p className="font-sans text-body md:text-[17px] text-dark-gray leading-[2.2] mb-8">
              田中さん（56歳・仮名）。相続した物件を<span className="text-ink font-medium">手数料15%</span>で代行会社に委託。
              年間売上720万円のうち<span className="text-sekai-teal font-medium">108万円</span>が手数料で消えていた。
              なのに月次レポートは来ない。清掃品質も見えない。
            </p>
            <figcaption className="font-sans text-caption text-mid-gray">
              — 年間100万円以上払って、この対応か。
            </figcaption>
          </figure>
        </FadeIn>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Pain Points — Three symptoms
// ─────────────────────────────────────────────────────────────────────
function Pains() {
  const pains = [
    { title: '手数料が重い', sub: '15%で利益が薄く、増収感が得られない。' },
    { title: '状況が見えない', sub: 'レポートが来ない、連絡が遅い、問い合わせに数日。' },
    { title: '品質が不透明', sub: 'ユーザー満足度が視覚化されておらず、改善の余地が読めない。' },
  ]

  return (
    <section className="bg-paper border-y border-rule">
      <div className="container-edit px-5 md:px-8 section-xl max-w-5xl mx-auto">
        <FadeIn>
          <div className="chapter-marker">
            <span className="eyebrow-mono text-mid-gray">§ 04</span>
            <span className="h-px bg-rule flex-1" />
            <p className="eyebrow text-sekai-teal">Three Symptoms</p>
          </div>
        </FadeIn>

        <div className="bg-rule grid grid-cols-1 md:grid-cols-3 gap-px border border-rule">
          {pains.map((p, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="bg-paper p-8 md:p-10 h-full flex flex-col">
                <p className="eyebrow-mono text-mid-gray mb-5">Symptom № {String(i + 1).padStart(2, '0')}</p>
                <p className="font-sans font-light text-[64px] md:text-[88px] leading-none text-sekai-teal mb-6 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-sans font-medium text-[20px] md:text-[24px] text-ink leading-snug mb-3">
                  {p.title}
                </h3>
                <p className="font-sans text-body-sm text-dark-gray leading-[1.95]">{p.sub}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Services — Editorial spreads
// ─────────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" className="bg-ivory">
      <div className="container-edit px-5 md:px-8 section-xl max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-3">
            <span className="rule-teal-sm" />
            <p className="eyebrow text-sekai-teal">Chapter Ⅴ · Services</p>
          </div>
          <h2 className="heading-section text-ink mb-5">
            「安い」だけじゃない。<span className="block font-sans text-sekai-teal">仕組みが違う。</span>
          </h2>
          <p className="font-sans text-body-sm md:text-[15px] text-dark-gray leading-[2] max-w-xl heading-mb-lg">
            コスト削減と品質向上を同時に実現する、SEKAI STAYのサービス体制。
          </p>
        </FadeIn>

        {/* OTA最適化 */}
        <FadeIn>
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 mb-20 md:mb-28 items-start">
            <div>
              <p className="eyebrow-mono text-mid-gray mb-4">Service № 01 · OTA Optimization</p>
              <h3 className="font-sans font-medium text-[24px] md:text-[32px] text-ink leading-tight mb-5">
                プロが作り込む<span className="block font-sans text-sekai-teal">掲載クオリティ。</span>
              </h3>
              <p className="font-sans text-body-sm md:text-[15px] text-dark-gray leading-[2] mb-6">
                Airbnb・Booking.comなど主要OTAのアルゴリズムを熟知したチームが、タイトル・説明文・写真の順番まで最適化。
              </p>
              <ul className="space-y-3 border-t border-rule pt-5">
                {[
                  'SEO最適化されたタイトルと説明文',
                  'ゲスト心理を捉えたコピーライティング',
                  '多言語対応（日・英・中・韓）',
                  '写真のクオリティ・並び順・枚数の最適化',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-body-sm text-dark-gray">
                    <span className="eyebrow-mono text-mid-gray mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rule grid grid-cols-3 gap-px border border-rule">
              {[
                { value: '+42', suffix: '%', label: 'Click Rate' },
                { value: '+28', suffix: '%', label: 'Conversion' },
                { value: 'Top', suffix: '3', label: 'Search Rank' },
              ].map((s, i) => (
                <div key={i} className="bg-paper p-5 md:p-6 text-center">
                  <p className="eyebrow-mono text-mid-gray mb-3">№ 0{i + 1}</p>
                  <p className="font-sans font-light text-[36px] md:text-[48px] leading-none text-sekai-teal tabular-nums">
                    {s.value}<span className="text-[20px] md:text-[24px]">{s.suffix}</span>
                  </p>
                  <p className="eyebrow-mono text-mid-gray mt-3">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* 価格最適化 */}
        <FadeIn>
          <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 mb-20 md:mb-28 items-start">
            <div className="md:order-2">
              <p className="eyebrow-mono text-mid-gray mb-4">Service № 02 · Dynamic Pricing</p>
              <h3 className="font-sans font-medium text-[24px] md:text-[32px] text-ink leading-tight mb-5">
                数万件のデータをもとに<span className="block font-sans text-sekai-teal">最適な価格を毎日設定。</span>
              </h3>
              <p className="font-sans text-body-sm md:text-[15px] text-dark-gray leading-[2] mb-6">
                周辺エリアの競合・季節変動・イベント・曜日別需要をリアルタイムで分析。専任スタッフが最終確認し、収益を最大化する価格を設定します。
              </p>
              <ul className="space-y-3 border-t border-rule pt-5">
                {[
                  '数万件の過去宿泊データを学習',
                  '競合物件の価格をリアルタイムモニタリング',
                  'イベント・祝日・天候まで考慮した需要予測',
                  '稼働率と単価のバランスを最適化',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-body-sm text-dark-gray">
                    <span className="eyebrow-mono text-mid-gray mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:order-1">
              <PriceChartMockup />
            </div>
          </div>
        </FadeIn>

        {/* 管理画面 */}
        <FadeIn>
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 mb-20 md:mb-24 items-start">
            <div>
              <p className="eyebrow-mono text-mid-gray mb-4">Service № 03 · Owner Dashboard</p>
              <h3 className="font-sans font-medium text-[24px] md:text-[32px] text-ink leading-tight mb-5">
                「今どうなってる？」が<span className="block font-sans text-sekai-teal">いつでもスマホで確認。</span>
              </h3>
              <p className="font-sans text-body-sm md:text-[15px] text-dark-gray leading-[2] mb-6">
                月次レポートを待つ必要はありません。専用ダッシュボードで収益・稼働率・ゲスト評価・予約状況をリアルタイムで。
              </p>
              <ul className="space-y-3 border-t border-rule pt-5">
                {[
                  '収益・稼働率をリアルタイム表示',
                  '予約カレンダーと価格推移',
                  'ゲストレビュー・評価の一覧',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-body-sm text-dark-gray">
                    <span className="eyebrow-mono text-mid-gray mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <DashboardMockup />
            </div>
          </div>
        </FadeIn>

        {/* 3つのミニサービス */}
        <FadeIn>
          <div className="bg-rule grid grid-cols-1 md:grid-cols-3 gap-px border border-rule">
            {[
              { title: '24時間ゲスト対応', body: '日・英・中・韓の4か国語で24時間対応。チェックインからトラブルまで全て代行。' },
              { title: '清掃・品質管理', body: '独自チェックリストに基づく清掃・点検。写真付きの完了報告で品質を見える化。' },
              { title: '物件管理サポート', body: '備品補充、設備トラブル、近隣対応まで。物件に関わる雑務を全て引き受けます。' },
            ].map((s, i) => (
              <div key={i} className="bg-paper p-7 md:p-8 h-full">
                <p className="eyebrow-mono text-mid-gray mb-4">Service № 0{i + 4}</p>
                <h3 className="font-sans font-medium text-[18px] md:text-[20px] text-ink leading-snug mb-3">{s.title}</h3>
                <p className="font-sans text-body-sm text-dark-gray leading-[1.95]">{s.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ── Price Chart Mockup ─────────────────────────────────────────────
function PriceChartMockup() {
  const days = Array.from({ length: 30 }, (_, i) => {
    const base = 15000 + Math.sin(i * 0.5) * 5000 + (i > 20 ? 3000 : 0)
    return Math.round(base / 100) * 100
  })
  const max = Math.max(...days)
  const min = Math.min(...days)

  return (
    <div className="bg-paper border border-rule p-6 md:p-7">
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-rule">
        <p className="eyebrow-mono text-mid-gray">Price Trend · 30 Days</p>
        <p className="font-sans text-caption text-sekai-teal">— Live</p>
      </div>
      <div className="flex items-end gap-[2px] h-32 md:h-40">
        {days.map((d, i) => (
          <div
            key={i}
            className="flex-1 bg-sekai-teal transition-all duration-300 hover:bg-ink"
            style={{ height: `${((d - min) / (max - min)) * 80 + 20}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-3 eyebrow-mono text-mid-gray">
        <span>Day 01</span><span>15</span><span>30</span>
      </div>
    </div>
  )
}

// ── Dashboard Mockup ───────────────────────────────────────────────
function DashboardMockup() {
  return (
    <div className="bg-ink text-ivory border border-ink">
      <div className="flex items-center justify-between px-5 py-4 border-b border-ivory/15">
        <p className="eyebrow-mono text-ivory/70">Owner Dashboard</p>
        <span className="flex items-center gap-2 eyebrow-mono text-bright-teal">
          <span className="w-1.5 h-1.5 rounded-full bg-bright-teal animate-pulse" />
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 divide-x divide-ivory/15 border-b border-ivory/15">
        <div className="p-5">
          <p className="eyebrow-mono text-ivory/60 mb-2">Monthly Revenue</p>
          <p className="font-sans font-light text-[32px] leading-none tabular-nums">¥482K</p>
        </div>
        <div className="p-5">
          <p className="eyebrow-mono text-ivory/60 mb-2">Occupancy</p>
          <p className="font-sans font-light text-[32px] leading-none tabular-nums">67<span className="text-[18px] text-ivory/60">%</span></p>
        </div>
      </div>

      <div className="p-5 border-b border-ivory/15">
        <p className="eyebrow-mono text-ivory/60 mb-3">Recent Bookings</p>
        <div className="space-y-2">
          <div className="flex justify-between font-sans text-[12px]">
            <span className="text-ivory">John D. <span className="text-ivory/60">(USA)</span></span>
            <span className="text-ivory/60">4/05 — 4/08</span>
          </div>
          <div className="flex justify-between font-sans text-[12px]">
            <span className="text-ivory">Kim S. <span className="text-ivory/60">(KOR)</span></span>
            <span className="text-ivory/60">4/10 — 4/12</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-ivory/15">
        <div className="p-4 text-center">
          <p className="font-sans font-light text-[22px] leading-none text-bright-teal tabular-nums">★ 4.95</p>
          <p className="eyebrow-mono text-ivory/60 mt-2">Rating</p>
        </div>
        <div className="p-4 text-center">
          <p className="font-sans font-light text-[22px] leading-none tabular-nums">23</p>
          <p className="eyebrow-mono text-ivory/60 mt-2">Reviews</p>
        </div>
        <div className="p-4 text-center">
          <p className="font-sans font-light text-[22px] leading-none tabular-nums">¥32K</p>
          <p className="eyebrow-mono text-ivory/60 mt-2">ADR</p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Why 8%
// ─────────────────────────────────────────────────────────────────────
function WhyEightPercent() {
  const reasons = [
    { title: '効率化', en: 'Efficiency', body: '独自システムと専任チームの連携で、ムダなコストを徹底的に削減。' },
    { title: '品質維持', en: 'Quality', body: '仕組み化で人的ミスを排除。コストを下げても品質は上がる。' },
    { title: '適材適所', en: 'Allocation', body: '人件費を大幅に削減しつつ、人手が必要な場面にはしっかりアサイン。仕組みと人の力の最適なバランス。' },
  ]

  return (
    <section className="bg-paper border-y border-rule">
      <div className="container-edit px-5 md:px-8 section-xl max-w-5xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-3">
            <span className="rule-teal-sm" />
            <p className="eyebrow text-sekai-teal">Chapter Ⅵ · Why 8%</p>
          </div>
          <h2 className="heading-section text-ink mb-5">
            なぜ8%で<span className="font-sans text-sekai-teal">実現できるのか。</span>
          </h2>
          <p className="font-sans text-body-sm md:text-[15px] text-dark-gray leading-[2] max-w-xl mb-14">
            独自の仕組みで速く、人の力で深く。コストと品質を両立する運営体制が、8%の手数料を実現する。
          </p>
        </FadeIn>

        <div className="bg-rule grid grid-cols-1 md:grid-cols-3 gap-px border border-rule">
          {reasons.map((item, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="bg-paper p-8 md:p-10 h-full flex flex-col">
                <p className="eyebrow-mono text-mid-gray mb-4">Reason № {String(i + 1).padStart(2, '0')}</p>
                <p className="font-sans text-caption text-sekai-teal mb-4">— {item.en}</p>
                <p className="font-sans font-light text-[72px] md:text-[96px] leading-none text-sekai-teal mb-6 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-sans font-medium text-[22px] md:text-[26px] text-ink leading-snug mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-body-sm text-dark-gray leading-[1.95]">{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Pricing — Editorial ledger
// ─────────────────────────────────────────────────────────────────────
function Pricing() {
  const inclusions = [
    '全OTA掲載管理・最適化',
    '多言語ゲスト対応（24h）',
    '清掃手配・品質管理',
    '価格の自動最適化',
    'オーナーダッシュボード',
  ]

  return (
    <section id="pricing" className="bg-ink text-ivory relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-bright-teal/6 blur-3xl" />
      </div>

      <div className="relative container-edit px-5 md:px-8 section-xl max-w-5xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-10 bg-bright-teal" />
            <p className="eyebrow text-bright-teal">Chapter Ⅶ · Pricing</p>
          </div>
          <h2 className="font-sans font-bold text-[34px] md:text-[52px] leading-[1.3] mb-5">
            シンプルな料金。
            <span className="block font-sans text-bright-teal">隠れた費用はゼロ。</span>
          </h2>
          <p className="font-sans text-body-sm md:text-[15px] text-ivory/75 leading-[2] mb-14">
            初期費用0円。必要なものは、すべて含まれています。
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-14 items-start">
            {/* Headline rate */}
            <div>
              <p className="eyebrow-mono text-ivory/60 mb-6">All-Inclusive Plan · Standard</p>
              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-sans font-light text-[160px] md:text-[220px] leading-[0.85] text-bright-teal tabular-nums">8</span>
                <span className="font-sans font-light text-[72px] md:text-[100px] leading-none text-ivory/80">%</span>
              </div>
              <div className="border-t border-ivory/15 pt-6 space-y-2">
                <div className="flex justify-between font-sans text-[14px]">
                  <span className="text-ivory/70">Management Fee</span>
                  <span className="text-ivory font-medium">売上の 8.00%</span>
                </div>
                <div className="flex justify-between font-sans text-[14px]">
                  <span className="text-ivory/70">Monthly · per room</span>
                  <span className="text-ivory font-medium">¥5,000</span>
                </div>
                <div className="flex justify-between font-sans text-[14px]">
                  <span className="text-ivory/70">Initial Cost</span>
                  <span className="text-bright-teal font-medium">¥0</span>
                </div>
                <div className="flex justify-between font-sans text-[14px]">
                  <span className="text-ivory/70">Cancellation Fee</span>
                  <span className="text-bright-teal font-medium">¥0</span>
                </div>
              </div>
            </div>

            {/* Inclusions + CTA */}
            <div className="bg-ivory text-ink p-8 md:p-10">
              <p className="eyebrow-mono text-mid-gray mb-5">Inclusions · All Standard</p>
              <ul className="space-y-3 border-t border-rule pt-5 mb-8">
                {inclusions.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-sans text-[14px] text-ink">
                    <span className="eyebrow-mono text-mid-gray w-8">{String(i + 1).padStart(2, '0')}</span>
                    <IconCheck className="w-3.5 h-3.5 text-sekai-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#diagnostic"
                className="group flex items-center justify-between gap-3 bg-ink text-ivory px-6 py-4 hover:bg-sekai-teal transition"
              >
                <span className="font-sans font-medium text-[14px]">私の物件を無料診断する</span>
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </a>
              <p className="font-sans text-caption text-mid-gray mt-6 leading-[2]">
                — 解約手数料0円（2ヶ月前通知）。移行コスト<span className="text-sekai-teal font-medium">現在無料</span>（先着10オーナー）。
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <p className="font-sans text-caption text-ivory/60 text-center mt-14">
            — 今後もオプションサービスを順次拡充予定
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Portfolio — Editorial plates
// ─────────────────────────────────────────────────────────────────────
function Portfolio() {
  const stats = [
    { value: '4', suffix: '年', label: 'Staff Tenure' },
    { value: '4.8', suffix: '+', label: 'Guest Rating' },
    { value: '95', suffix: '%', label: 'Occupancy Avg' },
    { value: '80', suffix: '%', label: 'Retention' },
  ]

  return (
    <section id="portfolio" className="bg-ivory">
      <div className="container-edit px-5 md:px-8 section-xl max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-3">
            <span className="rule-teal-sm" />
            <p className="eyebrow text-sekai-teal">Chapter Ⅷ · Track Record</p>
          </div>
          <h2 className="heading-section text-ink mb-5">
            管理実績。<span className="font-sans text-sekai-teal">数字が、実力を証明する。</span>
          </h2>
        </FadeIn>

        {/* Stats ledger */}
        <FadeIn delay={100}>
          <div className="bg-rule grid grid-cols-2 md:grid-cols-4 gap-px border border-rule mt-14 mb-20">
            {stats.map((s, i) => (
              <div key={i} className="bg-paper p-6 md:p-7">
                <p className="eyebrow-mono text-mid-gray mb-4">№ {String(i + 1).padStart(2, '0')}</p>
                <p className="font-sans font-light text-[48px] md:text-[64px] leading-none text-sekai-teal tabular-nums">
                  {s.value}<span className="text-[22px] md:text-[28px] text-ink">{s.suffix}</span>
                </p>
                <p className="eyebrow-mono text-mid-gray mt-4">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Portfolio cards */}
        <FadeIn delay={200}>
          <p className="eyebrow-mono text-mid-gray mb-3">Portfolio · Managed Properties</p>
          <h3 className="font-sans font-medium text-[24px] md:text-[32px] text-ink mb-12">
            弊社<span className="font-sans text-sekai-teal">管理物件例</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Property 1 */}
            <div className="group">
              <div className="relative overflow-hidden aspect-[4/3] mb-5">
                <img
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop&q=80&auto=format"
                  alt="S様の高級ヴィラ"
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.02] transition duration-700"
                />
                <div className="absolute top-4 left-4 bg-ink text-ivory px-3 py-1">
                  <p className="eyebrow-mono">Case № 001</p>
                </div>
                <div className="absolute bottom-4 right-4 bg-ivory text-ink px-3 py-1.5 font-sans text-caption">
                  ★ 4.86
                </div>
              </div>
              <p className="font-sans text-caption text-sekai-teal mb-2">— 高級ヴィラ</p>
              <h4 className="font-sans font-medium text-[22px] text-ink mb-2">S様 — 湖畔の高級ヴィラ</h4>
              <p className="font-sans text-body-sm text-mid-gray mb-5">220㎡ · 1日1組限定</p>

              <div className="border-t border-rule pt-5 grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                <div>
                  <p className="eyebrow-mono text-mid-gray mb-1">Before</p>
                  <p className="font-sans font-light text-[28px] text-mid-gray leading-none line-through decoration-[0.5px] tabular-nums">32%</p>
                </div>
                <IconArrowRight className="w-4 h-4 text-sekai-teal" />
                <div>
                  <p className="eyebrow-mono text-sekai-teal mb-1">After</p>
                  <p className="font-sans font-light text-[28px] text-sekai-teal leading-none tabular-nums">67<span className="text-[16px]">%</span></p>
                </div>
              </div>
              <p className="font-sans text-caption text-mid-gray mt-3">— 稼働率 約2.1倍</p>
            </div>

            {/* Property 2 */}
            <div className="group">
              <div className="relative overflow-hidden aspect-[4/3] mb-5">
                <img
                  src="https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop&q=80&auto=format"
                  alt="T様のトレーラーハウス"
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.02] transition duration-700"
                />
                <div className="absolute top-4 left-4 bg-ink text-ivory px-3 py-1">
                  <p className="eyebrow-mono">Case № 002</p>
                </div>
                <div className="absolute bottom-4 right-4 bg-ivory text-ink px-3 py-1.5 font-sans text-caption">
                  ★ 4.97
                </div>
              </div>
              <p className="font-sans text-caption text-sekai-teal mb-2">— トレーラーハウス</p>
              <h4 className="font-sans font-medium text-[22px] text-ink mb-2">T様 — トレーラーハウス</h4>
              <p className="font-sans text-body-sm text-mid-gray mb-5">全4棟 · ペットOK</p>

              <div className="border-t border-rule pt-5 grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                <div>
                  <p className="eyebrow-mono text-mid-gray mb-1">Before</p>
                  <p className="font-sans font-light text-[28px] text-mid-gray leading-none line-through decoration-[0.5px] tabular-nums">19件</p>
                </div>
                <IconArrowRight className="w-4 h-4 text-sekai-teal" />
                <div>
                  <p className="eyebrow-mono text-sekai-teal mb-1">After</p>
                  <p className="font-sans font-light text-[28px] text-sekai-teal leading-none tabular-nums">61<span className="text-[16px]">件</span></p>
                </div>
              </div>
              <p className="font-sans text-caption text-mid-gray mt-3">— レビュー 約3倍</p>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-14 pt-10 border-t border-rule">
            <p className="eyebrow-mono text-mid-gray mb-5">Credentials · Recognitions</p>
            <div className="flex flex-wrap gap-3">
              {[
                'Airbnb Review Avg 4.7',
                'Guest Favourite 認定',
                'Best of Minpaku 受賞',
                '住宅宿泊管理業 国土交通大臣(01)第F05780号',
              ].map((b, i) => (
                <span key={i} className="inline-flex items-center gap-2 bg-paper border border-rule px-4 py-2 font-sans text-[12px] text-dark-gray">
                  <IconStar className="w-3 h-3 text-sekai-teal" />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Testimonials
// ─────────────────────────────────────────────────────────────────────
function Testimonials() {
  const voices = [
    {
      name: '田中 様', age: '56歳', profile: '戸建て1棟 · 東京都 · オーナー歴3年',
      highlight: '+120万円', highlightLabel: '年間手取り増加額',
      quote: '前の会社は15%。それが当たり前だと思っていたから、8%と聞いて最初は疑った。でも管理画面で全部見える化されてるし、対応も早い。年間で120万円も手取りが増えて「なんで今まであんなに払ってたんだ」が正直な感想です。',
    },
    {
      name: '鈴木 様', age: '42歳', profile: 'マンション2室 · 大阪府 · オーナー歴1年',
      highlight: '3.2倍', highlightLabel: '月収 8万円→26万円',
      quote: '副業で始めたけど、自分で運営する時間がなくて月8万円がやっとだった。SEKAI STAYに任せてからは予約サイトの掲載が見違えた。3ヶ月で月収26万円まで伸びて、正直もう1室増やそうかと考えています。',
    },
    {
      name: '佐藤 様', age: '61歳', profile: '一棟アパート · 福岡県 · オーナー歴5年',
      highlight: '★4.9', highlightLabel: '3.8→4.9、単価1.4倍',
      quote: '前の代行がひどくて、レビューに「清掃が汚い」と書かれたこともあった。切り替えてからはレビュー3.8→4.9まで改善し、1泊あたりの単価を1.4倍に上げられた。妻にも「任せてよかったね」と言われました。',
    },
  ]

  return (
    <section id="voice" className="bg-paper border-y border-rule">
      <div className="container-edit px-5 md:px-8 section-xl max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-3">
            <span className="rule-teal-sm" />
            <p className="eyebrow text-sekai-teal">Chapter Ⅸ · Client Voice</p>
          </div>
          <h2 className="heading-section text-ink mb-5">
            オーナー様の声。<span className="font-sans text-sekai-teal">切り替えた人の、リアルな結果。</span>
          </h2>
        </FadeIn>

        <div className="bg-rule grid grid-cols-1 md:grid-cols-3 gap-px border border-rule mt-14">
          {voices.map((v, i) => (
            <FadeIn key={i} delay={i * 120}>
              <div className="bg-paper p-8 md:p-10 h-full flex flex-col">
                <p className="eyebrow-mono text-mid-gray mb-5">Voice № {String(i + 1).padStart(2, '0')}</p>

                <p className="font-sans font-light text-[44px] md:text-[56px] leading-none text-sekai-teal mb-2 tabular-nums">
                  {v.highlight}
                </p>
                <p className="font-sans text-caption text-mid-gray mb-7 pb-7 border-b border-rule">
                  — {v.highlightLabel}
                </p>

                <blockquote className="font-sans text-body-sm text-dark-gray leading-[2] flex-1 mb-7 border-l-2 border-sekai-teal pl-5">
                  「{v.quote}」
                </blockquote>

                <div className="pt-5 border-t border-rule">
                  <p className="font-sans font-medium text-[15px] text-ink">
                    {v.name} <span className="font-sans text-caption text-mid-gray">（{v.age}）</span>
                  </p>
                  <p className="eyebrow-mono text-mid-gray mt-2">{v.profile}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Service Flow — 3 steps
// ─────────────────────────────────────────────────────────────────────
function ServiceFlow() {
  const steps = [
    { step: 1, duration: '30秒', title: '無料診断を申し込む', body: 'フォームから物件情報を入力するだけ。30秒で完了します。' },
    { step: 2, duration: '3〜5日', title: '物件確認・収益シミュレーション', body: '物件を確認し、収益予測と最適な運営プランをご提案。納得いただけなければ、ここで終了してOKです。' },
    { step: 3, duration: '1〜2週間', title: '契約・運営開始', body: '契約後、OTA掲載の最適化と運営体制の構築を行い、最短2週間で運営をスタートします。' },
  ]

  return (
    <section className="bg-ivory">
      <div className="container-edit px-5 md:px-8 section-xl max-w-5xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-3">
            <span className="rule-teal-sm" />
            <p className="eyebrow text-sekai-teal">Chapter Ⅹ · Process</p>
          </div>
          <h2 className="heading-section text-ink mb-5">
            ご利用の流れ。<span className="font-sans text-sekai-teal">最短2週間で切替完了。</span>
          </h2>
          <p className="font-sans text-body-sm md:text-[15px] text-dark-gray leading-[2] max-w-xl mb-14">
            既存の予約・ゲスト対応も途切れなく移行します。
          </p>
        </FadeIn>

        <div className="border-t border-b border-rule divide-y divide-rule">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="grid grid-cols-[auto_auto_1fr] md:grid-cols-[auto_auto_1fr_auto] gap-5 md:gap-10 py-7 md:py-10 items-start">
                <p className="font-sans font-light text-[64px] md:text-[88px] leading-none text-sekai-teal tabular-nums">
                  {String(s.step).padStart(2, '0')}
                </p>
                <span className="hidden md:block h-24 w-px bg-rule mt-2" />
                <div>
                  <p className="eyebrow-mono text-mid-gray mb-2">Step № 0{s.step} · {s.duration}</p>
                  <h3 className="font-sans font-medium text-[22px] md:text-[26px] text-ink leading-snug mb-3">
                    {s.title}
                  </h3>
                  <p className="font-sans text-body-sm text-dark-gray leading-[1.95]">{s.body}</p>
                </div>
                <p className="hidden md:block font-sans text-caption text-mid-gray pt-2 w-24 text-right">
                  — {s.duration}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#diagnostic"
            className="group inline-flex items-center gap-3 bg-ink text-ivory px-7 py-4 hover:bg-sekai-teal transition font-sans font-medium text-[14px]"
          >
            まずはStep 01から始める
            <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// FAQ — Editorial accordion
// ─────────────────────────────────────────────────────────────────────
function FAQ() {
  const items = [
    { q: '本当に手数料8%だけですか？隠れた費用はありませんか？', a: '手数料は売上の8%と、月額5,000円/部屋のみです。それ以外の費用は一切かかりません。清掃費はゲスト負担のため、オーナー様の負担には含まれません。' },
    { q: '途中で解約できますか？', a: 'はい、2ヶ月前にご連絡いただくだけで解約可能です。サービスに自信があるため解約手数料はかかりません。予約済みのゲスト対応は最後まで責任を持って行います。' },
    { q: '物件が遠方でも大丈夫ですか？', a: 'はい、対応可能です。現地パートナーと連携し、清掃・点検・緊急対応まで一貫してカバーします。対応エリアについてはお気軽にご相談ください。' },
    { q: '既に他社に委託中ですが、切り替えできますか？', a: 'はい、最短2週間で切り替え可能です。解約手続きはオーナー様にお願いしますが、すでに入っている予約の精算や引き継ぎ対応は弊社がすべて行います。ゲスト対応の空白期間が生まれないよう、途切れなく移行しますのでご安心ください。' },
    { q: 'なぜ8%で実現できるのですか？', a: '予約管理やゲスト対応、価格調整などを独自の仕組みで効率化しているためです。大手にありがちな中間マージンも排除し、オーナー様とダイレクトにつながる体制でコストを抑えています。そもそも民泊運用代行業界は利益率が高く設定されすぎている側面があり、私たちはオーナー様にとって本当に適正な料金体系をつくりたいという想いで運営しています。' },
    { q: '管理物件が少なくても依頼できますか？', a: 'もちろんです。1物件からお受けしています。物件の規模やタイプを問わず、最適な運営プランをご提案します。' },
  ]

  return (
    <section id="faq" className="bg-paper border-y border-rule">
      <div className="container-edit px-5 md:px-8 section-xl max-w-3xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-3">
            <span className="rule-teal-sm" />
            <p className="eyebrow text-sekai-teal">Chapter Ⅺ · FAQ</p>
          </div>
          <h2 className="heading-section text-ink mb-5">
            よくある<span className="font-sans text-sekai-teal">ご質問。</span>
          </h2>
          <p className="font-sans text-body-sm md:text-[15px] text-dark-gray leading-[2] mb-14">
            気になるポイントをまとめました。
          </p>
        </FadeIn>

        <div className="border-t border-rule divide-y divide-rule">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 60}>
              <FAQItem q={item.q} a={item.a} index={i} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left py-6 md:py-7 grid grid-cols-[auto_1fr_auto] gap-5 items-start hover:text-sekai-teal transition"
      >
        <span className="font-sans font-light text-[24px] md:text-[28px] leading-none text-sekai-teal tabular-nums mt-1">
          Q.{String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-sans font-medium text-[15px] md:text-[17px] text-ink leading-snug pt-1">{q}</span>
        <span className={`mt-2 w-8 h-8 border border-rule flex items-center justify-center transition-all duration-300 ${open ? 'bg-ink border-ink text-ivory rotate-45' : 'text-ink'}`}>
          <span className="text-[16px] leading-none">+</span>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[400px] opacity-100 pb-7' : 'max-h-0 opacity-0'}`}>
        <div className="pl-16 md:pl-20 pr-12 border-l-2 border-sekai-teal ml-3">
          <p className="eyebrow-mono text-mid-gray mb-2">A.{String(index + 1).padStart(2, '0')} · Answer</p>
          <p className="font-sans text-body-sm md:text-[15px] text-dark-gray leading-[2]">{a}</p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Blog Section
// ─────────────────────────────────────────────────────────────────────
function BlogSection() {
  const articles = [
    { title: '民泊運用代行の費用相場は？手数料の仕組みを徹底解説', url: 'https://note.com/sekaistay/n/n1e6639834443', tag: '手数料' },
    { title: '民泊の始め方ガイド｜費用・届出・準備を初心者向けに解説', url: 'https://note.com/sekaistay/n/n49d3e9745fa7', tag: '始め方' },
    { title: 'Airbnb管理代行の手数料比較｜相場と選び方のポイント', url: 'https://note.com/sekaistay/n/nb29f918a76a2', tag: '比較' },
    { title: '民泊の稼働率が低い？今日からできる改善方法5選', url: 'https://note.com/sekaistay/n/n4f791cacc1ee', tag: '稼働率' },
    { title: '民泊代行業者の乗り換え手続き｜切り替えの流れと注意点', url: 'https://note.com/sekaistay/n/nede2a04b54da', tag: '乗り換え' },
    { title: '手数料が高い？民泊代行コストの見直しポイント', url: 'https://note.com/sekaistay/n/n6ed2f9f2c404', tag: 'コスト削減' },
  ]

  return (
    <section className="bg-ivory">
      <div className="container-edit px-5 md:px-8 section-xl max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-3">
            <span className="rule-teal-sm" />
            <p className="eyebrow text-sekai-teal">Chapter Ⅻ · Editorial Library</p>
          </div>
          <h2 className="heading-section text-ink mb-5">
            民泊オーナーのための<span className="font-sans text-sekai-teal">お役立ち情報。</span>
          </h2>
          <p className="font-sans text-body-sm md:text-[15px] text-dark-gray leading-[2] mb-14 max-w-xl">
            200本以上の専門記事を公開中。民泊運営の悩みを解決するヒントが見つかります。
          </p>
        </FadeIn>

        <div className="bg-rule grid grid-cols-1 md:grid-cols-2 gap-px border border-rule">
          {articles.map((article, i) => (
            <FadeIn key={i} delay={i * 50}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-paper p-6 md:p-7 h-full flex gap-5 items-start hover:bg-mist transition"
              >
                <p className="font-sans font-light text-[36px] md:text-[44px] leading-none text-sekai-teal tabular-nums w-14 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <div className="flex-1 min-w-0">
                  <p className="eyebrow-mono text-mid-gray mb-2">— {article.tag}</p>
                  <h3 className="font-sans font-medium text-[15px] md:text-[17px] text-ink leading-snug group-hover:text-sekai-teal transition line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        <p className="font-sans text-caption text-mid-gray text-center mt-10">
          — 他にも<span className="text-sekai-teal font-medium">200本以上</span>の民泊運営ノウハウ記事を公開中
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Diagnostic Form — Editorial multi-step
// ─────────────────────────────────────────────────────────────────────
function DiagnosticForm() {
  const [step, setStep] = useState(1)
  const [propertyType, setPropertyType] = useState('')
  const [area, setArea] = useState('')
  const [rooms, setRooms] = useState('')
  const [currentStatus, setCurrentStatus] = useState('')
  const [currentFee, setCurrentFee] = useState('')
  const [monthlyRevenue, setMonthlyRevenue] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const prefectures = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
    '岐阜県', '静岡県', '愛知県', '三重県',
    '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県',
    '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
  ]

  const trackStep = (stepNum: number, label: string) => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'form_step', {
        step_number: stepNum,
        step_label: label,
        form_name: 'diagnostic',
      })
    }
  }

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      setError('お名前とメールアドレスは必須です。')
      return
    }
    setError('')
    setSubmitting(true)

    const getUtm = (k: string) => {
      try { return sessionStorage.getItem(k) || '' } catch { return '' }
    }

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ''
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `【無料診断】${name}様 - ${propertyType} / ${area} / ${rooms}`,
          from_name: 'SEKAI STAY',
          replyto: 'contact@sekaistay.com',
          name,
          email,
          phone: phone || '未入力',
          property_type: propertyType,
          area: area || '未入力',
          rooms: rooms || '未入力',
          current_status: currentStatus || '未入力',
          current_fee: currentFee || '未入力',
          monthly_revenue: monthlyRevenue || '未入力',
          utm_source: getUtm('utm_source'),
          utm_medium: getUtm('utm_medium'),
          utm_campaign: getUtm('utm_campaign'),
          utm_term: getUtm('utm_term'),
          gclid: getUtm('gclid'),
          fbclid: getUtm('fbclid'),
        }),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'generate_lead', {
            currency: 'JPY',
            value: 1,
            property_type: propertyType,
            area,
            current_status: currentStatus,
            monthly_revenue: monthlyRevenue,
          })
        }
      } else {
        setError('送信に失敗しました。しばらくしてから再度お試しください。')
      }
    } catch {
      setError('通信エラーが発生しました。しばらくしてから再度お試しください。')
    } finally {
      setSubmitting(false)
    }
  }

  // 送信完了画面
  if (submitted) {
    return (
      <section id="diagnostic" className="bg-paper border-y border-rule">
        <div className="container-edit px-5 md:px-8 section-xl max-w-3xl mx-auto">
          <div className="chapter-marker">
            <span className="rule-teal-sm" />
            <p className="eyebrow text-sekai-teal">Received · Thank You</p>
          </div>

          <div className="border-t border-rule pt-10">
            <div className="w-16 h-16 bg-ink flex items-center justify-center mb-8">
              <IconCheck className="w-7 h-7 text-bright-teal" />
            </div>
            <h2 className="font-sans font-bold text-[32px] md:text-[44px] text-ink leading-[1.3] mb-6">
              お申し込み<span className="font-sans text-sekai-teal">ありがとうございます。</span>
            </h2>
            <p className="font-sans text-body md:text-[17px] text-dark-gray leading-[2] mb-3 max-w-xl">
              <span className="text-ink font-medium">{name} 様</span>の物件について、担当者が確認の上
              <span className="text-ink font-medium"> 3営業日以内</span> にご連絡いたします。
            </p>
            <p className="font-sans text-caption text-mid-gray mb-10">
              — 確認メールを {email} にお送りしました。
            </p>

            <div className="bg-ivory border border-rule p-8 md:p-10">
              <p className="eyebrow-mono text-mid-gray mb-3">Material № 01 · For your review</p>
              <h3 className="font-sans font-medium text-[20px] md:text-[22px] text-ink leading-snug mb-3">
                お待ちの間に、<span className="font-sans text-sekai-teal">サービス資料</span>をご覧ください。
              </h3>
              <p className="font-sans text-body-sm text-dark-gray leading-[1.95] mb-6">
                料金・サービス内容・導入事例をまとめた営業資料をダウンロードいただけます。
              </p>
              <a
                href="/SEKAISTAY営業資料完成版.pptx"
                download
                className="group inline-flex items-center gap-3 bg-ink text-ivory px-6 py-4 hover:bg-sekai-teal transition font-sans font-medium text-[14px]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                営業資料をダウンロード（PDF）
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="diagnostic" className="bg-ivory">
      <div className="container-edit px-5 md:px-8 section-xl max-w-2xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-3">
            <span className="rule-teal-sm" />
            <p className="eyebrow text-sekai-teal">Form · Complimentary Diagnostic</p>
          </div>
          <h2 className="heading-section text-ink mb-5">
            私の物件の収益を<span className="font-sans text-sekai-teal">診断する。</span>
          </h2>
          <p className="font-sans text-body-sm md:text-[15px] text-dark-gray leading-[2] mb-3">
            <span className="text-ink font-medium">30秒</span>で完了。
          </p>
          <p className="font-sans text-caption text-sekai-teal mb-10">
            — 先着10オーナー：移行コスト無料キャンペーン実施中
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          {/* Progress ledger */}
          <div className="bg-rule grid grid-cols-3 gap-px border border-rule mb-10">
            {[
              { n: 1, label: 'Property' },
              { n: 2, label: 'Operation' },
              { n: 3, label: 'Contact' },
            ].map(s => (
              <div key={s.n} className={`p-4 ${s.n <= step ? 'bg-ink text-ivory' : 'bg-paper text-mid-gray'}`}>
                <p className={`eyebrow-mono mb-1 ${s.n <= step ? 'text-bright-teal' : 'text-mid-gray'}`}>Step {String(s.n).padStart(2, '0')}</p>
                <p className={`font-sans text-[13px] ${s.n <= step ? 'text-ivory' : 'text-mid-gray'}`}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="border-t border-b border-rule py-10">
              <p className="eyebrow-mono text-mid-gray mb-6">Step 01 · 物件情報を教えてください</p>

              <p className="font-sans text-body-sm font-medium text-ink mb-3">物件タイプ</p>
              <div className="grid grid-cols-2 gap-px bg-rule border border-rule mb-8">
                {['戸建て', 'マンション', 'アパート一棟', 'その他'].map(type => (
                  <button
                    key={type}
                    onClick={() => setPropertyType(type)}
                    className={`py-4 px-4 font-sans text-[14px] transition ${
                      propertyType === type
                        ? 'bg-ink text-ivory'
                        : 'bg-paper text-ink hover:bg-mist'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="font-sans text-body-sm font-medium text-ink block mb-3">エリア（都道府県）</label>
                <select
                  value={area} onChange={e => setArea(e.target.value)}
                  className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition"
                >
                  <option value="">選択してください</option>
                  {prefectures.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div className="mb-8">
                <label className="font-sans text-body-sm font-medium text-ink block mb-3">部屋数</label>
                <select
                  value={rooms} onChange={e => setRooms(e.target.value)}
                  className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition"
                >
                  <option value="">選択してください</option>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={`${n}部屋`}>{n}部屋</option>)}
                  <option value="10部屋以上">10部屋以上</option>
                </select>
              </div>

              <button
                onClick={() => { if (propertyType) { setStep(2); trackStep(2, '物件情報入力') } }}
                disabled={!propertyType}
                className={`w-full py-4 font-sans font-medium text-[14px] transition flex items-center justify-center gap-3 ${
                  propertyType
                    ? 'bg-ink text-ivory hover:bg-sekai-teal'
                    : 'bg-mist text-mid-gray cursor-allowed'
                }`}
              >
                次へ
                <IconArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="border-t border-b border-rule py-10">
              <p className="eyebrow-mono text-mid-gray mb-6">Step 02 · 現在の運営状況</p>

              <p className="font-sans text-body-sm font-medium text-ink mb-3">現在の状況</p>
              <div className="bg-rule grid grid-cols-1 gap-px border border-rule mb-8">
                {[
                  { value: '他社に委託中', label: '他社に委託中', sub: '現在、他の代行会社を利用している' },
                  { value: '自主運営', label: '自分で運営中', sub: 'OTA掲載・ゲスト対応を自分でやっている' },
                  { value: 'これから始めたい', label: 'これから民泊を始めたい', sub: 'まだ運営していないが検討中' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setCurrentStatus(opt.value)}
                    className={`p-5 text-left transition ${
                      currentStatus === opt.value
                        ? 'bg-ink text-ivory'
                        : 'bg-paper text-ink hover:bg-mist'
                    }`}
                  >
                    <span className={`font-sans font-medium text-[15px] block ${currentStatus === opt.value ? 'text-ivory' : 'text-ink'}`}>{opt.label}</span>
                    <span className={`eyebrow-mono mt-1 block ${currentStatus === opt.value ? 'text-bright-teal' : 'text-mid-gray'}`}>— {opt.sub}</span>
                  </button>
                ))}
              </div>

              {currentStatus === '他社に委託中' && (
                <div className="mb-6">
                  <label className="font-sans text-body-sm font-medium text-ink block mb-3">現在の手数料率</label>
                  <select
                    value={currentFee} onChange={e => setCurrentFee(e.target.value)}
                    className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition"
                  >
                    <option value="">選択してください</option>
                    <option value="10%">10%</option>
                    <option value="15%">15%</option>
                    <option value="20%">20%</option>
                    <option value="25%以上">25%以上</option>
                    <option value="わからない">わからない</option>
                  </select>
                </div>
              )}

              {(currentStatus === '他社に委託中' || currentStatus === '自主運営') && (
                <div className="mb-8">
                  <label className="font-sans text-body-sm font-medium text-ink block mb-3">月間売上（目安）</label>
                  <select
                    value={monthlyRevenue} onChange={e => setMonthlyRevenue(e.target.value)}
                    className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition"
                  >
                    <option value="">選択してください</option>
                    <option value="〜30万円">〜30万円</option>
                    <option value="30〜50万円">30〜50万円</option>
                    <option value="50〜100万円">50〜100万円</option>
                    <option value="100〜200万円">100〜200万円</option>
                    <option value="200万円以上">200万円以上</option>
                    <option value="わからない">わからない</option>
                  </select>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 border border-rule bg-paper font-sans text-[14px] text-dark-gray hover:bg-mist transition"
                >
                  戻る
                </button>
                <button
                  onClick={() => { if (currentStatus) { setStep(3); trackStep(3, '運営状況入力') } }}
                  disabled={!currentStatus}
                  className={`flex-[2] py-4 font-sans font-medium text-[14px] transition flex items-center justify-center gap-3 ${
                    currentStatus
                      ? 'bg-ink text-ivory hover:bg-sekai-teal'
                      : 'bg-mist text-mid-gray cursor-allowed'
                  }`}
                >
                  次へ
                  <IconArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="border-t border-b border-rule py-10">
              <p className="eyebrow-mono text-mid-gray mb-6">Step 03 · ご連絡先</p>

              <div className="space-y-5">
                <div>
                  <label className="font-sans text-body-sm font-medium text-ink block mb-3">
                    お名前 <span className="text-sekai-teal">*</span>
                  </label>
                  <input
                    type="text" placeholder="田中 太郎" required
                    value={name} onChange={e => setName(e.target.value)}
                    className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition"
                  />
                </div>
                <div>
                  <label className="font-sans text-body-sm font-medium text-ink block mb-3">
                    メールアドレス <span className="text-sekai-teal">*</span>
                  </label>
                  <input
                    type="email" placeholder="tanaka@example.com" required
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition"
                  />
                </div>
                <div>
                  <label className="font-sans text-body-sm font-medium text-ink block mb-3">
                    電話番号 <span className="font-sans text-caption text-mid-gray">（任意）</span>
                  </label>
                  <input
                    type="tel" placeholder="090-1234-5678"
                    value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full border border-rule bg-paper px-4 py-3.5 font-sans text-[14px] focus:border-sekai-teal outline-none transition"
                  />
                </div>
              </div>

              {error && (
                <p className="font-sans text-body-sm text-sekai-teal mt-4 text-center border-t border-rule pt-4">{error}</p>
              )}

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 border border-rule bg-paper font-sans text-[14px] text-dark-gray hover:bg-mist transition"
                >
                  戻る
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-[2] py-4 bg-ink text-ivory hover:bg-sekai-teal disabled:bg-mist disabled:text-mid-gray font-sans font-medium text-[14px] transition flex items-center justify-center gap-3"
                >
                  {submitting ? '送信中…' : '収益シミュレーションを受け取る'}
                  {!submitting && <IconArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          <p className="font-sans text-caption text-mid-gray text-center mt-8">
            — 予告なく終了する場合があります
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Final CTA
// ─────────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="bg-ink text-ivory relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-bright-teal/8 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sekai-teal/8 blur-3xl" />
      </div>

      <div className="relative container-edit px-5 md:px-8 section-xl max-w-4xl mx-auto text-center">
        <FadeIn>
          <p className="eyebrow-mono text-bright-teal mb-6">
            ★ 先着10オーナー · 移行コスト無料キャンペーン実施中
          </p>
          <h2 className="font-sans font-bold text-[32px] md:text-[52px] leading-[1.3] mb-8">
            田中さんは、年間<span className="font-sans text-bright-teal">50万円</span>を取り戻しました。
            <span className="block mt-3">次は、あなたの番です。</span>
          </h2>
          <p className="font-sans text-body md:text-[17px] text-ivory/80 leading-[2] mb-10 max-w-xl mx-auto">
            夏のハイシーズン前に切り替えて、今年の収益を最大化しませんか？
          </p>

          <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-8">
            <a
              href="#diagnostic"
              className="group inline-flex items-center justify-between gap-3 bg-ivory text-ink px-6 py-4 hover:bg-bright-teal transition"
            >
              <div className="text-left">
                <p className="eyebrow-mono text-mid-gray mb-0.5">Path A</p>
                <p className="font-sans font-medium text-[14px]">無料診断</p>
              </div>
              <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
            <a
              href="/SEKAISTAY営業資料完成版.pptx"
              download
              className="group inline-flex items-center justify-between gap-3 border border-ivory/30 text-ivory px-6 py-4 hover:bg-ivory/5 transition"
            >
              <div className="text-left">
                <p className="eyebrow-mono text-ivory/60 mb-0.5">Path B</p>
                <p className="font-sans font-medium text-[14px]">資料を見る</p>
              </div>
              <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
          </div>

          <p className="font-sans text-caption text-ivory/60">
            — キャンペーンは予告なく終了する場合があります
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Company Info — Editorial ledger
// ─────────────────────────────────────────────────────────────────────
function CompanyInfo() {
  const rows = [
    { label: '会社名', value: '株式会社セカイチ（SEKAICHI Inc.）' },
    { label: '代表者', value: '劉 添毅（リュウ テンイチ）\n明神 洸次郎（ミョウジン コウジロウ）' },
    { label: '所在地', value: '〒153-0042\n東京都目黒区青葉台2-20-7 KM中目黒ビル1F' },
    { label: '資本金', value: '1,650万円（資本準備金含む）' },
    { label: '法人番号', value: '4011001162956' },
    { label: '住宅宿泊管理業', value: '国土交通大臣(01)第F05780号' },
  ]

  return (
    <section className="bg-paper border-y border-rule">
      <div className="container-edit px-5 md:px-8 section-xl max-w-4xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-3">
            <span className="rule-teal-sm" />
            <p className="eyebrow text-sekai-teal">Colophon · Company</p>
          </div>
          <h2 className="heading-section text-ink mb-10">
            運営会社 <span className="font-sans text-sekai-teal">Sekaichi Inc.</span>
          </h2>

          <div className="border-t border-rule divide-y divide-rule">
            {rows.map((row, i) => (
              <div key={i} className="grid grid-cols-[auto_120px_1fr] md:grid-cols-[auto_160px_1fr] gap-5 md:gap-10 py-5 md:py-6 items-start">
                <p className="eyebrow-mono text-mid-gray w-10">№ {String(i + 1).padStart(2, '0')}</p>
                <p className="font-sans text-caption text-mid-gray pt-0.5">— {row.label}</p>
                <p className="font-sans text-body-sm md:text-[15px] text-ink leading-[1.9] whitespace-pre-line">{row.value}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────
function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  return (
    <>
      <footer className="bg-ink text-ivory">
        <div className="container-edit px-5 md:px-8 pt-16 pb-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10 md:gap-14 pb-12 border-b border-ivory/15">
            <div>
              <img
                src="/sekai_stay_03_03.png"
                alt="SEKAI STAY"
                width={110}
                height={40}
                className="h-9 w-auto mb-6"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <p className="font-sans text-caption text-bright-teal mb-3">— Trusted Minpaku Management</p>
              <p className="font-sans text-body-sm text-ivory/75 leading-[2] max-w-sm">
                独自の仕組みで、民泊運用のコスト構造を根本から変える運用代行サービス。
              </p>
            </div>

            <div>
              <p className="eyebrow-mono text-ivory/50 mb-5">Navigation</p>
              <nav className="flex flex-col gap-3 font-sans text-[13px] text-ivory/80">
                <a href="#services" className="hover:text-bright-teal transition">サービスについて</a>
                <a href="#pricing" className="hover:text-bright-teal transition">料金</a>
                <a href="#portfolio" className="hover:text-bright-teal transition">管理実績</a>
                <a href="#voice" className="hover:text-bright-teal transition">オーナー様の声</a>
                <a href="#diagnostic" className="hover:text-bright-teal transition">無料診断</a>
              </nav>
            </div>

            <div>
              <p className="eyebrow-mono text-ivory/50 mb-5">Legal</p>
              <nav className="flex flex-col gap-3 font-sans text-[13px] text-ivory/80">
                <button onClick={() => setPrivacyOpen(true)} className="text-left hover:text-bright-teal transition">プライバシーポリシー</button>
                <span className="text-ivory/60 font-sans text-caption">— 国土交通大臣(01)第F05780号</span>
              </nav>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pt-8">
            <p className="eyebrow-mono text-ivory/50">© 2026 SEKAI STAY · 株式会社セカイチ · All Rights Reserved.</p>
            <p className="font-sans text-caption text-ivory/60">— 手数料8%で、世界基準の民泊運営を。</p>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {privacyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setPrivacyOpen(false)}>
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />
          <div
            className="relative bg-paper w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden border border-rule"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-rule flex-shrink-0">
              <div>
                <p className="eyebrow-mono text-mid-gray mb-1">Legal · Document 01</p>
                <h2 className="font-sans font-medium text-[20px] md:text-[22px] text-ink">プライバシーポリシー</h2>
              </div>
              <button
                onClick={() => setPrivacyOpen(false)}
                className="w-9 h-9 border border-rule hover:bg-mist flex items-center justify-center text-ink transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div className="overflow-y-auto px-6 md:px-8 py-8 font-sans text-body-sm text-dark-gray leading-[2] space-y-7">
              <p>
                株式会社セカイチ（以下「当社」）は、SEKAI STAY（以下「本サービス」）において、お客様の個人情報の保護を重要な責務と認識し、以下のとおりプライバシーポリシーを定め、適切な管理・保護に努めます。
              </p>

              {[
                { title: '事業者情報', body: '株式会社セカイチ（SEKAICHI Inc.）\n代表者: 劉 添毅、明神 洸次郎\n所在地: 〒153-0042 東京都目黒区青葉台2-20-7 KM中目黒ビル1F\n住宅宿泊管理業: 国土交通大臣(01)第F05780号' },
                { title: '収集する個人情報', body: '氏名、メールアドレス、電話番号、物件に関する情報（物件タイプ、所在地域、部屋数、現在の運用状況、月間売上レンジ等）、お問い合わせ内容、ウェブサイトのアクセスログ情報（IPアドレス、ブラウザ情報、閲覧ページ、アクセス日時等）を収集することがあります。' },
                { title: '個人情報の利用目的', body: 'お問い合わせへの対応および収益シミュレーションの提供、本サービスに関するご案内・ご提案、サービスの改善・新サービスの開発、統計データの作成（個人を特定できない形式）、法令に基づく対応。' },
                { title: '個人情報の第三者提供', body: '当社は、法令に基づく場合等を除き、お客様の同意なく個人情報を第三者に提供することはありません。' },
                { title: '外部サービスの利用', body: 'Google Analytics: ウェブサイトの利用状況把握のため使用。クッキーにより利用者情報を収集しますが、個人を特定する情報は含まれません。\n\nWeb3Forms: お問い合わせフォーム送信に利用。入力情報はWeb3Formsサーバーを経由して当社に送信されます。' },
                { title: 'クッキーについて', body: 'サイトの利便性向上およびアクセス解析のためにクッキーを使用しています。ブラウザの設定により拒否可能ですが、一部機能がご利用いただけなくなることがあります。' },
                { title: '個人情報の管理', body: '個人情報への不正アクセス・紛失・破損・改ざん・漏洩を防止するため、セキュリティシステムの維持・管理体制の整備等、必要な措置を講じます。' },
                { title: '開示・訂正・削除', body: 'お客様はご自身の個人情報について、開示・訂正・追加・削除・利用停止を請求できます。本人確認の上、合理的な期間内に対応いたします。' },
                { title: 'ポリシーの変更', body: '必要に応じて本ポリシーを変更することがあります。変更時は当ウェブサイトに掲載してお知らせいたします。' },
                { title: 'お問い合わせ窓口', body: '株式会社セカイチ\n〒153-0042 東京都目黒区青葉台2-20-7 KM中目黒ビル1F\nメール: contact@sekaistay.com' },
              ].map((item, i) => (
                <div key={i}>
                  <p className="eyebrow-mono text-mid-gray mb-2">Article № {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-sans font-medium text-[16px] text-ink mb-3">{item.title}</h3>
                  <p className="whitespace-pre-line">{item.body}</p>
                </div>
              ))}

              <p className="font-sans text-caption text-mid-gray pt-4 border-t border-rule">— 最終更新日: 2026年4月7日</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ── Utility ────────────────────────────────────────────────────────
function fmt(n: number): string {
  return Math.round(n).toLocaleString('ja-JP')
}
