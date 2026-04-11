'use client'

// ─────────────────────────────────────────────────────────────────────
// SEKAI STAY — Landing Page v5
// 競合LP構成を完全再現: ストーリー駆動 + 診断フォーム + ダッシュボードモック
// 構成: Campaign → Hero → Simulator → Story → Pains → Services → Why8%
//       → Pricing → Portfolio → Testimonials → Flow → FAQ → Form → CTA → Company → Footer
// ─────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, ReactNode } from 'react'

const OUR_RATE = 0.08
const MONTHLY_FEE = 5000 // 部屋/月

// ── SVG Icon Components ────────────────────────────────────────────
function IconCheck({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
}
function IconArrowRight({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
}
function IconStar({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
function IconChevronDown({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
}

// ── Scroll Animation Hook ──────────────────────────────────────────
function useInView(threshold = 0.01) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // rootMargin: 画面外200px手前から発火 → 高速スクロールでも取りこぼさない
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold, rootMargin: '200px 0px' }
    )
    obs.observe(el)
    // フォールバック: 1.5秒後に未表示なら強制表示（アンカージャンプ対策）
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
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ── Animated Counter ───────────────────────────────────────────────
function Counter({ end, suffix = '', prefix = '', duration = 1500 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const { ref, visible } = useInView()
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!visible) return
    let start = 0
    const step = Math.ceil(end / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [visible, end, duration])
  return <span ref={ref}>{prefix}{count}{suffix}</span>
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
    <div className="min-h-screen bg-white text-charcoal overflow-x-hidden font-sans">
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
// Campaign Banner — 上部固定キャンペーンバー
// ─────────────────────────────────────────────────────────────────────
function CampaignBanner() {
  return (
    <div className="bg-charcoal text-white text-center py-2.5 px-4">
      <p className="text-xs md:text-sm">
        <span className="inline-block bg-amber-500 text-charcoal text-[10px] font-bold px-2 py-0.5 rounded mr-2">レビュー平均4.8</span>
        初期費用0円キャンペーン中 ─ Airbnbスーパーホスト認定の運営品質
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
    { href: '#voice', label: 'お客様の声' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#top" className="flex-shrink-0">
          <img
            src="/sekai_stay_03_03.png"
            alt="SEKAI STAY"
            className={`h-8 md:h-9 w-auto transition-all duration-300 ${scrolled ? '' : 'invert brightness-0 invert'}`}
            style={scrolled ? {} : { filter: 'brightness(0) invert(1)' }}
          />
        </a>
        {/* Desktop nav */}
        <nav className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors ${scrolled ? 'text-dark-gray' : 'text-white/80'}`}>
          {navLinks.map(l => <a key={l.href} href={l.href} className="hover:text-deep-teal transition">{l.label}</a>)}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#diagnostic"
            className="text-sm font-bold bg-amber-500 hover:bg-amber-600 text-charcoal px-5 py-2.5 rounded-lg transition shadow-sm"
          >
            無料診断
          </a>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className={`md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg transition ${scrolled ? 'text-charcoal' : 'text-white'}`}
            aria-label="メニュー"
          >
            <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4px]' : ''} ${scrolled ? 'bg-charcoal' : 'bg-white'}`} />
            <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[4px]' : ''} ${scrolled ? 'bg-charcoal' : 'bg-white'}`} />
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="bg-white border-t border-light-gray px-5 py-4 space-y-1">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm font-medium text-charcoal hover:text-deep-teal transition">{l.label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Hero — ストーリー駆動ヘッドライン
// ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" className="relative bg-gradient-to-br from-[#0e5a5f] via-[#167B81] to-[#1a8a91] text-white overflow-hidden -mt-16 pt-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#54BEC3]/[0.06] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative px-6 pt-20 pb-20 md:pt-28 md:pb-24 max-w-6xl mx-auto">
        <div className="md:grid md:grid-cols-[1fr_auto] md:gap-16 md:items-center">
          <div className="text-center md:text-left mb-12 md:mb-0">
            <p className="text-xs font-semibold tracking-[0.3em] text-amber-300 mb-6 uppercase">
              Trusted Minpaku Management
            </p>
            <h1 className="text-[32px] md:text-[48px] font-extrabold leading-[1.15] mb-6 tracking-tight">
              稼働率を上げる。<br />
              <span className="relative inline-block">
                レビューを上げる。
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-amber-400/70 rounded-full" />
              </span>
              <br className="md:hidden" />
              <span className="text-amber-300">収益</span>を上げる。
            </h1>

            {/* Trust stats */}
            <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start mb-6">
              <div className="text-center md:text-left">
                <span className="text-3xl md:text-4xl font-black text-white">4.8</span>
                <span className="text-xs text-white/50 block">レビュー平均</span>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center md:text-left">
                <span className="text-3xl md:text-4xl font-black text-amber-300">8<span className="text-xl">%</span></span>
                <span className="text-xs text-white/50 block">業界最安手数料</span>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center md:text-left">
                <span className="text-3xl md:text-4xl font-black text-white">7</span>
                <span className="text-xs text-white/50 block">全国拠点</span>
              </div>
            </div>

            <p className="text-base md:text-lg text-white/60 leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
              Airbnbスーパーホスト認定。成果で選ばれる民泊運用代行。
            </p>

            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start mb-8 text-sm text-white/70">
              <span className="flex items-center gap-1.5"><IconCheck className="w-4 h-4 text-amber-400" /> 初期費用0円</span>
              <span className="flex items-center gap-1.5"><IconCheck className="w-4 h-4 text-amber-400" /> 違約金ゼロ</span>
              <span className="flex items-center gap-1.5"><IconCheck className="w-4 h-4 text-amber-400" /> 最短2週間</span>
            </div>

            <a
              href="#simulator"
              className="group inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-charcoal text-sm font-bold py-4 px-8 rounded-xl transition shadow-lg shadow-black/10"
            >
              あなたの損失額を診断する
              <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-xs text-white/30 mt-3">10秒で完了</p>
          </div>

          <div className="hidden md:block text-right">
            <div className="inline-block relative">
              <span className="text-[180px] font-black leading-none text-white/[0.08] select-none block">8%</span>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[80px] font-black text-white leading-none">8<span className="text-amber-300">%</span></span>
                <span className="text-sm text-white/50 mt-2 tracking-wider">MANAGEMENT FEE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block w-full h-[30px] md:h-[50px]">
          <path d="M0,60 L0,20 Q360,60 720,30 Q1080,0 1440,30 L1440,60 Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Inline Simulator — スライダー+バー比較
// ─────────────────────────────────────────────────────────────────────
// ── Animated Number (smooth counting) ──────────────────────────────
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
      const ease = 1 - Math.pow(1 - t, 3) // ease-out cubic
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
    <section id="simulator" className="bg-cloud-white px-6 py-16 md:py-28">
      <div className="max-w-xl mx-auto text-center">
        <FadeIn>
          <p className="text-xs font-semibold text-deep-teal tracking-[0.2em] uppercase mb-3">Simulator</p>
          <h2 className="text-[22px] md:text-[30px] font-bold text-charcoal mb-2 tracking-tight">
            あなたの物件、いくら変わる？
          </h2>
          <p className="text-sm text-dark-gray mb-12">スライドして、年間の手取り差額をチェック</p>
        </FadeIn>

        <FadeIn delay={100}>
          {/* 月間売上 — 大きく表示 */}
          <p className="text-xs text-dark-gray mb-2">現在の月間売上</p>
          <p className="text-4xl md:text-5xl font-black text-charcoal tabular-nums tracking-tight mb-5">
            <AnimNum value={revenue} suffix="円" />
          </p>
          <input
            type="range" min={100000} max={4000000} step={50000}
            value={revenue}
            onChange={e => setRevenue(Number(e.target.value))}
            className="w-full accent-sekai-teal h-3 rounded-full cursor-pointer mb-2"
          />
          <div className="flex justify-between text-xs text-mid-gray mb-14">
            <span>10万円</span><span>400万円</span>
          </div>

          {/* Before → After 一行比較 */}
          <div className="flex items-center justify-center gap-3 md:gap-5 mb-6">
            <div className="text-right">
              <p className="text-[10px] text-mid-gray mb-1">現在の年間手取り</p>
              <p className="text-lg md:text-xl font-bold text-slate-400 tabular-nums"><AnimNum value={nowAnnual} suffix="円" /></p>
            </div>
            <div className="text-deep-teal text-2xl font-bold">→</div>
            <div className="text-left">
              <p className="text-[10px] text-deep-teal font-medium mb-1">SEKAI STAY なら</p>
              <p className="text-lg md:text-xl font-bold text-deep-teal tabular-nums"><AnimNum value={sekaiAnnual} suffix="円" /></p>
            </div>
          </div>

          {/* 差額 — ヒーロー */}
          <div className="bg-deep-teal rounded-2xl px-6 py-8 shadow-lg mb-4">
            <p className="text-white/60 text-xs mb-2">年間の手取り増加額</p>
            <p className="text-[40px] md:text-[56px] font-black text-white tabular-nums tracking-tighter leading-none">
              <AnimNum value={diff} prefix="+" suffix="円" />
            </p>
          </div>
          <p className="text-[10px] text-dark-gray mb-8">
            稼働率改善（+30%）と手数料削減（15%→8%）のダブル効果。弊社管理物件の平均実績に基づく試算です。
          </p>

          <a
            href="#diagnostic"
            className="group inline-flex items-center gap-2 bg-deep-teal hover:bg-deep-teal text-white text-sm font-bold py-3.5 px-7 rounded-xl transition shadow-md"
          >
            この差額を手に入れる
            <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </FadeIn>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Story Section — 田中さんのストーリー（共感パート）
// ─────────────────────────────────────────────────────────────────────
function StorySection() {
  return (
    <section className="bg-cloud-white px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="bg-white rounded-3xl border border-light-gray shadow-lg p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal leading-[1.6] mb-6">
              「<span className="text-red-500">15%</span>払ってるのに、この対応？」
            </h2>
            <p className="text-[15px] text-dark-gray leading-[2] mb-6">
              田中さん（56歳・仮名）。相続した物件を<strong className="text-charcoal">手数料15%</strong>で代行会社に委託。
              年間売上720万円のうち<strong className="text-red-500">108万円</strong>が手数料で消えていた。
              なのに月次レポートは来ない。清掃品質も見えない。
            </p>
            <p className="text-lg font-bold text-charcoal leading-relaxed">
              「年間<span className="text-red-500">100万円以上</span>払って、この対応か──」
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Pain Points — 3つの課題
// ─────────────────────────────────────────────────────────────────────
function Pains() {
  const pains = [
    {
      title: '手数料が重い',
      sub: '15%で利益が薄い',
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      ),
    },
    {
      title: '状況が見えない',
      sub: 'レポートが来ない・連絡が遅い・問い合わせに数日',
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      ),
    },
    {
      title: '品質が不透明',
      sub: 'ユーザー満足度が視覚化されていない',
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      ),
    },
  ]

  return (
    <section className="bg-cloud-white px-6 pb-16 md:pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-5">
          {pains.map((p, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="bg-white rounded-2xl border border-light-gray p-6 text-center hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-400 flex items-center justify-center mx-auto mb-4">
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-2">{p.title}</h3>
                <p className="text-sm text-dark-gray leading-relaxed">{p.sub}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Services — サービス詳細（6ブロック）
// ─────────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" className="bg-white px-6 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-xs font-semibold text-deep-teal text-center tracking-[0.2em] uppercase mb-3">Services</p>
          <h2 className="text-[26px] md:text-[34px] font-bold text-charcoal text-center mb-3 tracking-tight">
            「安い」だけじゃない。仕組みが違う。
          </h2>
          <p className="text-sm text-dark-gray text-center mb-16 max-w-lg mx-auto">
            コスト削減と品質向上を同時に実現する、SEKAI STAYのサービス体制。
          </p>
        </FadeIn>

        {/* OTA最適化 */}
        <FadeIn>
          <div className="mb-16">
            <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
              <div className="mb-8 md:mb-0">
                <p className="text-xs font-bold text-deep-teal tracking-wider uppercase mb-2">OTA最適化</p>
                <h3 className="text-xl md:text-2xl font-bold text-charcoal mb-4">
                  プロが作り込む掲載クオリティ
                </h3>
                <p className="text-sm text-dark-gray leading-[1.9] mb-5">
                  Airbnb・Booking.comなど主要OTAのアルゴリズムを熟知したチームが、タイトル・説明文・写真の順番まで最適化。
                </p>
                <ul className="space-y-2.5 text-sm text-charcoal">
                  <li className="flex items-start gap-2"><IconCheck className="w-4 h-4 text-deep-teal mt-0.5 flex-shrink-0" />SEO最適化されたタイトルと説明文</li>
                  <li className="flex items-start gap-2"><IconCheck className="w-4 h-4 text-deep-teal mt-0.5 flex-shrink-0" />ゲスト心理を捉えたコピーライティング</li>
                  <li className="flex items-start gap-2"><IconCheck className="w-4 h-4 text-deep-teal mt-0.5 flex-shrink-0" />多言語対応（日・英・中・韓）</li>
                  <li className="flex items-start gap-2"><IconCheck className="w-4 h-4 text-deep-teal mt-0.5 flex-shrink-0" />写真のクオリティ・並び順・枚数の最適化</li>
                </ul>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-teal-tint rounded-2xl p-5 text-center">
                  <p className="text-2xl font-black text-deep-teal">+42<span className="text-sm">%</span></p>
                  <p className="text-[11px] text-deep-teal font-medium mt-1">クリック率</p>
                </div>
                <div className="bg-teal-tint rounded-2xl p-5 text-center">
                  <p className="text-2xl font-black text-deep-teal">+28<span className="text-sm">%</span></p>
                  <p className="text-[11px] text-deep-teal font-medium mt-1">予約転換率</p>
                </div>
                <div className="bg-teal-tint rounded-2xl p-5 text-center">
                  <p className="text-2xl font-black text-deep-teal">Top3</p>
                  <p className="text-[11px] text-deep-teal font-medium mt-1">検索順位</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 価格最適化 */}
        <FadeIn>
          <div className="mb-16">
            <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
              <div className="mb-8 md:mb-0 md:order-2">
                <p className="text-xs font-bold text-deep-teal tracking-wider uppercase mb-2">価格最適化</p>
                <h3 className="text-xl md:text-2xl font-bold text-charcoal mb-4">
                  数万件のデータをもとに最適な価格を毎日設定
                </h3>
                <p className="text-sm text-dark-gray leading-[1.9] mb-5">
                  周辺エリアの競合・季節変動・イベント・曜日別需要をリアルタイムで分析。専任スタッフが最終確認し、収益を最大化する価格を設定します。
                </p>
                <ul className="space-y-2.5 text-sm text-charcoal">
                  <li className="flex items-start gap-2"><IconCheck className="w-4 h-4 text-deep-teal mt-0.5 flex-shrink-0" />数万件の過去宿泊データを学習</li>
                  <li className="flex items-start gap-2"><IconCheck className="w-4 h-4 text-deep-teal mt-0.5 flex-shrink-0" />競合物件の価格をリアルタイムモニタリング</li>
                  <li className="flex items-start gap-2"><IconCheck className="w-4 h-4 text-deep-teal mt-0.5 flex-shrink-0" />イベント・祝日・天候まで考慮した需要予測</li>
                  <li className="flex items-start gap-2"><IconCheck className="w-4 h-4 text-deep-teal mt-0.5 flex-shrink-0" />稼働率と単価のバランスを最適化</li>
                </ul>
              </div>
              {/* Price chart mockup */}
              <div className="md:order-1">
                <PriceChartMockup />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 管理画面 */}
        <FadeIn>
          <div className="mb-16">
            <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
              <div className="mb-8 md:mb-0">
                <p className="text-xs font-bold text-deep-teal tracking-wider uppercase mb-2">管理画面</p>
                <h3 className="text-xl md:text-2xl font-bold text-charcoal mb-4">
                  「今どうなってる？」がいつでもスマホで確認
                </h3>
                <p className="text-sm text-dark-gray leading-[1.9] mb-5">
                  月次レポートを待つ必要はありません。専用ダッシュボードで収益・稼働率・ゲスト評価・予約状況をリアルタイムで。
                </p>
                <ul className="space-y-2.5 text-sm text-charcoal">
                  <li className="flex items-start gap-2"><IconCheck className="w-4 h-4 text-deep-teal mt-0.5 flex-shrink-0" />収益・稼働率をリアルタイム表示</li>
                  <li className="flex items-start gap-2"><IconCheck className="w-4 h-4 text-deep-teal mt-0.5 flex-shrink-0" />予約カレンダーと価格推移</li>
                  <li className="flex items-start gap-2"><IconCheck className="w-4 h-4 text-deep-teal mt-0.5 flex-shrink-0" />ゲストレビュー・評価の一覧</li>
                </ul>
              </div>
              {/* Dashboard Mockup */}
              <div>
                <DashboardMockup />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 3つのミニサービスカード */}
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              title: '24時間ゲスト対応',
              body: '日・英・中・韓の4か国語で24時間対応。チェックインからトラブルまで全て代行。',
              icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ),
            },
            {
              title: '清掃・品質管理',
              body: '独自チェックリストに基づく清掃・点検。写真付きの完了報告で品質を見える化。',
              icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              ),
            },
            {
              title: '物件管理サポート',
              body: '備品補充、設備トラブル、近隣対応まで。物件に関わる雑務を全て引き受けます。',
              icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              ),
            },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="bg-cloud-white rounded-2xl border border-light-gray p-6 hover:shadow-lg hover:border-deep-teal/20 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-xl bg-teal-tint text-deep-teal flex items-center justify-center mb-4">
                  {s.icon}
                </div>
                <h3 className="text-base font-bold text-charcoal mb-2">{s.title}</h3>
                <p className="text-sm text-dark-gray leading-relaxed">{s.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
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
    <div className="bg-cloud-white rounded-2xl border border-light-gray p-5">
      <p className="text-xs font-bold text-dark-gray mb-3">価格推移イメージ（30日間）</p>
      <div className="flex items-end gap-[2px] h-32">
        {days.map((d, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-sekai-teal to-bright-teal rounded-t-sm transition-all duration-300 hover:opacity-80"
            style={{ height: `${((d - min) / (max - min)) * 80 + 20}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-mid-gray">
        <span>1日</span><span>15日</span><span>30日</span>
      </div>
    </div>
  )
}

// ── Dashboard Mockup ───────────────────────────────────────────────
function DashboardMockup() {
  return (
    <div className="bg-charcoal rounded-2xl p-5 shadow-xl text-white">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold tracking-wider">Owner Dashboard</span>
        <span className="flex items-center gap-1.5 text-[10px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          LIVE
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-[10px] text-white/50 mb-1">今月の収益</p>
          <p className="text-xl font-black tabular-nums">¥482K</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-[10px] text-white/50 mb-1">稼働率</p>
          <p className="text-xl font-black tabular-nums">67%</p>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-3 mb-3">
        <p className="text-[10px] text-white/50 mb-2">直近の予約</p>
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px]">
            <span>John D. (USA)</span><span className="text-white/50">4/5-4/8</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span>Kim S. (KOR)</span><span className="text-white/50">4/10-4/12</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white/5 rounded-lg p-2 text-center">
          <p className="text-sm font-bold text-amber-400">★4.95</p>
          <p className="text-[9px] text-white/40">評価</p>
        </div>
        <div className="bg-white/5 rounded-lg p-2 text-center">
          <p className="text-sm font-bold">23件</p>
          <p className="text-[9px] text-white/40">レビュー</p>
        </div>
        <div className="bg-white/5 rounded-lg p-2 text-center">
          <p className="text-sm font-bold">¥32.4K</p>
          <p className="text-[9px] text-white/40">平均単価</p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Why 8% — なぜ8%で実現できるのか
// ─────────────────────────────────────────────────────────────────────
function WhyEightPercent() {
  return (
    <section className="bg-cloud-white px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="text-xs font-semibold text-deep-teal text-center tracking-[0.2em] uppercase mb-3">Why 8%</p>
          <h2 className="text-[26px] md:text-[34px] font-bold text-charcoal text-center mb-4 tracking-tight">
            なぜ8%で実現できるのか
          </h2>
          <p className="text-sm text-dark-gray text-center mb-14 max-w-lg mx-auto">
            独自の仕組みで速く、人の力で深く。<br />
            コストと品質を両立する運営体制が、8%の手数料を実現する。
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: '効率化',
              body: '独自システムと専任チームの連携で、ムダなコストを徹底的に削減。',
              icon: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              ),
            },
            {
              title: '品質維持',
              body: '仕組み化で人的ミスを排除。コストを下げても品質は上がる。',
              icon: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              ),
            },
            {
              title: '適材適所',
              body: '人件費を大幅に削減しつつ、人手が必要な場面にはしっかりアサイン。仕組みと人の力の最適なバランス。',
              icon: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              ),
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="bg-white rounded-2xl border border-light-gray p-7 text-center hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-2xl bg-teal-tint text-deep-teal flex items-center justify-center mx-auto mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-3">{item.title}</h3>
                <p className="text-sm text-dark-gray leading-relaxed">{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Pricing — 料金セクション
// ─────────────────────────────────────────────────────────────────────
function Pricing() {
  return (
    <section id="pricing" className="relative bg-gradient-to-br from-[#0e5a5f] via-[#167B81] to-[#1a8a91] text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl" />
      </div>

      <div className="relative px-6 py-20 md:py-28 max-w-4xl mx-auto">
        <FadeIn>
          <p className="text-xs font-semibold text-amber-300 text-center tracking-[0.2em] uppercase mb-3">Pricing</p>
          <h2 className="text-[26px] md:text-[34px] font-bold text-center mb-3 tracking-tight">
            シンプルな料金。隠れた費用はゼロ。
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <p className="text-sm text-white/50 text-center mb-10">
            初期費用0円。必要なものは、すべて含まれています。
          </p>
        </FadeIn>

        {/* 料金カード */}
        <FadeIn delay={200}>
          <div className="max-w-md mx-auto bg-white rounded-3xl text-charcoal p-8 shadow-2xl">
            <p className="text-xs font-bold text-deep-teal tracking-wider uppercase mb-1">ALL INCLUSIVE</p>
            <h3 className="text-xl font-bold text-charcoal mb-1">スタンダード</h3>

            <div className="flex items-baseline gap-1 mb-6 mt-4">
              <span className="text-5xl font-black text-deep-teal">8</span>
              <span className="text-2xl font-black text-deep-teal">%</span>
              <span className="text-sm text-dark-gray ml-2">+ ¥5,000/部屋/月</span>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                '全OTA掲載管理・最適化',
                '多言語ゲスト対応（24h）',
                '清掃手配・品質管理',
                '価格の自動最適化',
                'オーナーダッシュボード',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-charcoal">
                  <IconCheck className="w-4 h-4 text-deep-teal mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#diagnostic"
              className="group block w-full bg-deep-teal hover:bg-deep-teal text-white text-sm font-bold py-4 rounded-xl transition text-center shadow-md"
            >
              私の物件を無料診断する
            </a>

            <div className="mt-5 space-y-1.5 text-xs text-dark-gray text-center">
              <p>解約手数料0円（2ヶ月前通知）</p>
              <p>移行コスト <span className="font-bold text-deep-teal">現在無料</span>（先着10オーナー）</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <p className="text-xs text-white/30 text-center mt-8">今後もオプションサービスを順次拡充予定</p>
        </FadeIn>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Portfolio — 管理実績 + 物件例
// ─────────────────────────────────────────────────────────────────────
function Portfolio() {
  return (
    <section id="portfolio" className="bg-white px-6 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-xs font-semibold text-deep-teal text-center tracking-[0.2em] uppercase mb-3">Track Record</p>
          <h2 className="text-[26px] md:text-[34px] font-bold text-charcoal text-center mb-4 tracking-tight">
            管理実績
          </h2>
          <p className="text-sm text-dark-gray text-center mb-14">数字が、実力を証明する。</p>
        </FadeIn>

        {/* Stats row */}
        <FadeIn delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {[
              { value: '4', suffix: '年', label: 'スタッフ平均運営歴' },
              { value: '4.8', suffix: '+', label: 'ゲスト満足度' },
              { value: '95', suffix: '%', label: '平均稼働率' },
              { value: '80', suffix: '%', label: 'オーナー継続率' },
            ].map((s, i) => (
              <div key={i} className="bg-cloud-white rounded-2xl border border-light-gray p-6 text-center">
                <p className="text-3xl md:text-4xl font-black text-deep-teal tabular-nums leading-none mb-2">
                  {s.value}<span className="text-lg">{s.suffix}</span>
                </p>
                <p className="text-xs text-dark-gray font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Portfolio cards */}
        <FadeIn delay={200}>
          <p className="text-xs font-bold text-deep-teal tracking-wider uppercase mb-5 text-center">PORTFOLIO</p>
          <p className="text-lg font-bold text-charcoal text-center mb-8">弊社管理物件例</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Property 1 — S様 */}
            <div className="bg-cloud-white rounded-2xl border border-light-gray overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=500&fit=crop&q=80&auto=format"
                  alt="S様の高級ヴィラ"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  <IconStar className="w-3 h-3 text-amber-300" /> 4.86
                </div>
                <div className="absolute top-3 right-3 bg-deep-teal/90 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  高級ヴィラ
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-charcoal text-lg mb-1">S様 — 湖畔の高級ヴィラ</h4>
                <p className="text-xs text-dark-gray mb-4">220㎡ / 1日1組限定</p>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-[10px] text-mid-gray">導入前稼働率</p>
                    <p className="text-lg font-bold text-slate-400">32%</p>
                  </div>
                  <div className="text-deep-teal font-bold text-lg">→</div>
                  <div>
                    <p className="text-[10px] text-deep-teal font-medium">導入後稼働率</p>
                    <p className="text-lg font-bold text-deep-teal">67% <span className="text-xs text-deep-teal">(+35pt)</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Property 2 — T様 */}
            <div className="bg-cloud-white rounded-2xl border border-light-gray overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=500&fit=crop&q=80&auto=format"
                  alt="T様のトレーラーハウス"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  <IconStar className="w-3 h-3 text-amber-300" /> 4.97
                </div>
                <div className="absolute top-3 right-3 bg-deep-teal/90 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  トレーラーハウス
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-charcoal text-lg mb-1">T様 — トレーラーハウス</h4>
                <p className="text-xs text-dark-gray mb-4">全4棟 / ペットOK</p>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-[10px] text-mid-gray">導入前レビュー</p>
                    <p className="text-lg font-bold text-slate-400">19件</p>
                  </div>
                  <div className="text-deep-teal font-bold text-lg">→</div>
                  <div>
                    <p className="text-[10px] text-deep-teal font-medium">導入後レビュー</p>
                    <p className="text-lg font-bold text-deep-teal">61件 <span className="text-xs text-deep-teal">(3倍↑)</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {[
              { text: 'Airbnb レビュー平均4.7点', color: 'text-amber-700 bg-amber-50 border-amber-200' },
              { text: 'Guest Favourite 物件あり', color: 'text-rose-600 bg-rose-50 border-rose-200' },
              { text: 'Best of Minpaku 受賞', color: 'text-blue-600 bg-blue-50 border-blue-200' },
              { text: '住宅宿泊管理業 国土交通大臣(01)第F05780号', color: 'text-deep-teal bg-teal-tint border-deep-teal/20' },
            ].map((b, i) => (
              <span key={i} className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-[12px] font-semibold ${b.color}`}>
                <IconStar className="w-3.5 h-3.5" />
                {b.text}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Testimonials — オーナー様の声（3人）
// ─────────────────────────────────────────────────────────────────────
function Testimonials() {
  const voices = [
    {
      name: '田中 様', age: '56歳', profile: '戸建て1棟 / 東京都 / オーナー歴3年',
      highlight: '+120万円/年', highlightLabel: '年間手取り増加額',
      quote: '前の会社は15%。それが当たり前だと思っていたから、8%と聞いて最初は疑った。でも管理画面で全部見える化されてるし、対応も早い。年間で120万円も手取りが増えて「なんで今まであんなに払ってたんだ」が正直な感想です。',
    },
    {
      name: '鈴木 様', age: '42歳', profile: 'マンション2室 / 大阪府 / オーナー歴1年',
      highlight: '月収3.2倍', highlightLabel: '8万円→26万円',
      quote: '副業で始めたけど、自分で運営する時間がなくて月8万円がやっとだった。SEKAI STAYに任せてからは予約サイトの掲載が見違えた。3ヶ月で月収26万円まで伸びて、正直もう1室増やそうかと考えています。',
    },
    {
      name: '佐藤 様', age: '61歳', profile: '一棟アパート / 福岡県 / オーナー歴5年',
      highlight: '★3.8→4.9', highlightLabel: 'レビュー改善で単価1.4倍',
      quote: '前の代行がひどくて、レビューに「清掃が汚い」と書かれたこともあった。切り替えてからはレビュー3.8→4.9まで改善し、1泊あたりの単価を1.4倍に上げられた。妻にも「任せてよかったね」と言われました。',
    },
  ]

  return (
    <section id="voice" className="bg-cloud-white px-6 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-xs font-semibold text-deep-teal text-center tracking-[0.2em] uppercase mb-3">
            Client Voice
          </p>
          <h2 className="text-[26px] md:text-[34px] font-bold text-charcoal text-center mb-3 tracking-tight">
            オーナー様の声
          </h2>
          <p className="text-sm text-dark-gray text-center mb-14">切り替えた人の、リアルな結果。</p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {voices.map((v, i) => (
            <FadeIn key={i} delay={i * 120}>
              <div className="bg-white rounded-2xl border border-light-gray p-6 hover:shadow-lg hover:border-deep-teal/20 transition-all duration-300 flex flex-col h-full">
                {/* Highlight badge */}
                <div className="mb-4">
                  <span className="inline-block bg-teal-tint text-deep-teal text-lg font-black px-3 py-1 rounded-lg">
                    {v.highlight}
                  </span>
                  <p className="text-[11px] text-deep-teal font-medium mt-1">{v.highlightLabel}</p>
                </div>

                {/* Quote */}
                <p className="text-[13px] text-charcoal leading-[1.9] flex-1 mb-5">
                  「{v.quote}」
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-light-gray">
                  <p className="font-bold text-charcoal text-sm">{v.name} <span className="text-dark-gray font-normal">({v.age})</span></p>
                  <p className="text-[11px] text-dark-gray mt-0.5">{v.profile}</p>
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
// Service Flow — ご利用の流れ（3ステップ）
// ─────────────────────────────────────────────────────────────────────
function ServiceFlow() {
  const steps = [
    {
      step: 1, duration: '30秒', title: '無料診断を申し込む',
      body: 'フォームから物件情報を入力するだけ。30秒で完了します。',
    },
    {
      step: 2, duration: '3〜5日', title: '物件確認・収益シミュレーション',
      body: '物件を確認し、収益予測と最適な運営プランをご提案。納得いただけなければ、ここで終了してOKです。',
    },
    {
      step: 3, duration: '1〜2週間', title: '契約・運営開始',
      body: '契約後、OTA掲載の最適化と運営体制の構築を行い、最短2週間で運営をスタートします。',
    },
  ]

  return (
    <section className="bg-white px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="text-xs font-semibold text-deep-teal text-center tracking-[0.2em] uppercase mb-3">Flow</p>
          <h2 className="text-[26px] md:text-[34px] font-bold text-charcoal text-center mb-3 tracking-tight">
            ご利用の流れ
          </h2>
          <p className="text-sm text-dark-gray text-center mb-14 max-w-lg mx-auto">
            最短2週間で切り替え完了。既存の予約・ゲスト対応も途切れなく移行します。
          </p>
        </FadeIn>

        <div className="space-y-6">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 120}>
              <div className="md:flex md:items-start md:gap-6 bg-cloud-white rounded-2xl border border-light-gray p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex-shrink-0 mb-4 md:mb-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-deep-teal to-sekai-teal text-white flex items-center justify-center text-lg font-black">
                    {s.step}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-bold text-deep-teal">STEP {s.step}</p>
                    <span className="text-xs bg-teal-tint text-deep-teal font-bold px-2 py-0.5 rounded">{s.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-2">{s.title}</h3>
                  <p className="text-sm text-dark-gray leading-relaxed">{s.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#diagnostic"
            className="group inline-flex items-center gap-2 bg-deep-teal hover:bg-deep-teal text-white text-sm font-bold py-4 px-8 rounded-xl transition shadow-md"
          >
            まずはStep 1から始める
            <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// FAQ — よくある質問（6問）
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
    <section id="faq" className="bg-cloud-white px-6 py-20 md:py-28">
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <p className="text-xs font-semibold text-deep-teal text-center tracking-[0.2em] uppercase mb-3">FAQ</p>
          <h2 className="text-[26px] md:text-[34px] font-bold text-charcoal text-center mb-3 tracking-tight">
            よくある質問
          </h2>
          <p className="text-sm text-dark-gray text-center mb-14">気になるポイントをまとめました。</p>
        </FadeIn>

        <div className="space-y-3">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 60}>
              <FAQItem q={item.q} a={item.a} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`rounded-2xl border transition-all duration-300 ${open ? 'border-deep-teal/30 shadow-md shadow-sekai-teal/5' : 'border-light-gray hover:border-deep-teal/20'}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-3"
      >
        <span className="text-[15px] font-semibold text-charcoal leading-relaxed">{q}</span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${open ? 'bg-deep-teal border-deep-teal text-white rotate-45' : 'border-deep-teal/30 text-deep-teal'}`}>
          +
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-5 text-[14px] text-dark-gray leading-relaxed border-t border-light-gray/50 pt-4">
          {a}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Blog Section — note.com記事との連携（SEO内部リンク）
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
    <section className="bg-white px-6 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-xs font-semibold text-deep-teal text-center tracking-[0.2em] uppercase mb-3">Blog</p>
          <h2 className="text-[26px] md:text-[34px] font-bold text-charcoal text-center mb-3 tracking-tight">
            民泊オーナーのためのお役立ち情報
          </h2>
          <p className="text-sm text-dark-gray text-center mb-14 max-w-lg mx-auto">
            200本以上の専門記事を公開中。民泊運営の悩みを解決するヒントが見つかります。
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-4">
          {articles.map((article, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div
                className="group flex items-start gap-4 p-5 rounded-2xl border border-light-gray bg-cloud-white/50 transition-all duration-300 h-full"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-tint text-deep-teal flex items-center justify-center text-xs font-bold group-hover:bg-deep-teal group-hover:text-white transition-colors">
                  {article.tag.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-bold text-charcoal leading-relaxed group-hover:text-deep-teal transition line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-[11px] text-deep-teal font-medium mt-1.5">
                    {article.tag}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-dark-gray">
            他にも<span className="font-bold text-deep-teal">200本以上</span>の民泊運営ノウハウ記事を公開中
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Diagnostic Form — マルチステップ無料診断フォーム
// ─────────────────────────────────────────────────────────────────────
function DiagnosticForm() {
  const [step, setStep] = useState(1)
  // Step 1: 物件情報
  const [propertyType, setPropertyType] = useState('')
  const [area, setArea] = useState('')
  const [rooms, setRooms] = useState('')
  // Step 2: 運営状況
  const [currentStatus, setCurrentStatus] = useState('')
  const [currentFee, setCurrentFee] = useState('')
  const [monthlyRevenue, setMonthlyRevenue] = useState('')
  // Step 3: 連絡先
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

  // GA4 フォームステップ トラッキング
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
          from_name: 'SEKAI STAY 無料診断フォーム',
          name,
          email,
          phone: phone || '未入力',
          property_type: propertyType,
          area: area || '未入力',
          rooms: rooms || '未入力',
          current_status: currentStatus || '未入力',
          current_fee: currentFee || '未入力',
          monthly_revenue: monthlyRevenue || '未入力',
          // UTM情報
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
      <section id="diagnostic" className="bg-white px-6 py-20 md:py-28">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-deep-teal text-white flex items-center justify-center mx-auto mb-6">
            <IconCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-charcoal mb-3">お申し込みありがとうございます</h2>
          <p className="text-sm text-dark-gray leading-relaxed mb-2">
            {name}様の物件について、担当者が確認の上<br />
            <strong className="text-charcoal">3営業日以内</strong>にご連絡いたします。
          </p>
          <p className="text-xs text-mid-gray mb-8">確認メールを {email} にお送りしました。</p>

          <div className="bg-teal-tint rounded-2xl border border-deep-teal/20 px-6 py-6">
            <p className="text-sm font-bold text-charcoal mb-2">お待ちの間に、サービス資料をご覧ください</p>
            <p className="text-xs text-dark-gray mb-4">料金・サービス内容・導入事例をまとめた営業資料をダウンロードいただけます。</p>
            <a
              href="/SEKAISTAY営業資料完成版.pptx"
              download
              className="inline-flex items-center gap-2 bg-deep-teal hover:bg-deep-teal text-white text-sm font-bold py-3 px-6 rounded-xl transition shadow-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              営業資料をダウンロード（PDF）
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="diagnostic" className="bg-cloud-white px-6 py-16 md:py-24">
      <div className="max-w-lg mx-auto">
        <FadeIn>
          <p className="text-xs font-semibold text-deep-teal text-center tracking-[0.2em] uppercase mb-3">
            無料診断
          </p>
          <h2 className="text-[26px] md:text-[34px] font-bold text-charcoal text-center mb-3 tracking-tight">
            私の物件の収益を診断する
          </h2>
          <p className="text-sm text-dark-gray text-center mb-3">30秒で完了。</p>
          <p className="text-xs text-mid-gray text-center mb-10">
            <span className="inline-block bg-amber-500 text-charcoal text-[10px] font-bold px-2 py-0.5 rounded mr-1">先着10オーナー</span>
            移行コスト無料キャンペーン中
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex-1">
                <div className={`h-1.5 rounded-full transition-all duration-300 ${s <= step ? 'bg-deep-teal' : 'bg-light-gray'}`} />
                <p className={`text-[10px] mt-1.5 ${s <= step ? 'text-deep-teal font-bold' : 'text-mid-gray'}`}>
                  {s === 1 ? '①物件情報' : s === 2 ? '②運営状況' : '③連絡先'}
                </p>
              </div>
            ))}
          </div>

          {/* Step 1: 物件情報（タイプ + エリア + 部屋数） */}
          {step === 1 && (
            <div>
              <p className="text-sm font-bold text-charcoal mb-4">物件について教えてください</p>

              {/* 物件タイプ */}
              <p className="text-xs text-dark-gray font-medium mb-2">物件タイプ</p>
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {['戸建て', 'マンション', 'アパート一棟', 'その他'].map(type => (
                  <button
                    key={type}
                    onClick={() => setPropertyType(type)}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                      propertyType === type
                        ? 'border-deep-teal bg-teal-tint text-deep-teal'
                        : 'border-light-gray bg-white text-charcoal hover:border-deep-teal/30'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* エリア（都道府県） */}
              <div className="mb-4">
                <label className="text-xs text-dark-gray font-medium block mb-1.5">エリア（都道府県）</label>
                <select
                  value={area} onChange={e => setArea(e.target.value)}
                  className="w-full border-2 border-light-gray rounded-xl px-4 py-3 text-sm focus:border-deep-teal outline-none transition bg-white"
                >
                  <option value="">選択してください</option>
                  {prefectures.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              {/* 部屋数 */}
              <div className="mb-6">
                <label className="text-xs text-dark-gray font-medium block mb-1.5">部屋数</label>
                <select
                  value={rooms} onChange={e => setRooms(e.target.value)}
                  className="w-full border-2 border-light-gray rounded-xl px-4 py-3 text-sm focus:border-deep-teal outline-none transition bg-white"
                >
                  <option value="">選択してください</option>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={`${n}部屋`}>{n}部屋</option>)}
                  <option value="10部屋以上">10部屋以上</option>
                </select>
              </div>

              <button
                onClick={() => { if (propertyType) { setStep(2); trackStep(2, '物件情報入力') } }}
                disabled={!propertyType}
                className={`w-full py-3.5 rounded-xl text-sm font-bold transition ${propertyType ? 'bg-deep-teal text-white hover:bg-deep-teal' : 'bg-light-gray text-mid-gray cursor-not-allowed'}`}
              >
                次へ
              </button>
            </div>
          )}

          {/* Step 2: 運営状況 */}
          {step === 2 && (
            <div>
              <p className="text-sm font-bold text-charcoal mb-4">現在の運営状況を教えてください</p>

              {/* 運営状況（3択ボタン） */}
              <p className="text-xs text-dark-gray font-medium mb-2">現在の状況</p>
              <div className="grid grid-cols-1 gap-2.5 mb-5">
                {[
                  { value: '他社に委託中', label: '他社に委託中', sub: '現在、他の代行会社を利用している' },
                  { value: '自主運営', label: '自分で運営中', sub: 'OTA掲載・ゲスト対応を自分でやっている' },
                  { value: 'これから始めたい', label: 'これから民泊を始めたい', sub: 'まだ運営していないが検討中' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setCurrentStatus(opt.value)}
                    className={`py-3.5 px-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      currentStatus === opt.value
                        ? 'border-deep-teal bg-teal-tint'
                        : 'border-light-gray bg-white hover:border-deep-teal/30'
                    }`}
                  >
                    <span className={`text-sm font-semibold block ${currentStatus === opt.value ? 'text-deep-teal' : 'text-charcoal'}`}>{opt.label}</span>
                    <span className="text-[11px] text-dark-gray">{opt.sub}</span>
                  </button>
                ))}
              </div>

              {/* 他社委託中の場合 → 手数料率 */}
              {currentStatus === '他社に委託中' && (
                <div className="mb-4">
                  <label className="text-xs text-dark-gray font-medium block mb-1.5">現在の手数料率</label>
                  <select
                    value={currentFee} onChange={e => setCurrentFee(e.target.value)}
                    className="w-full border-2 border-light-gray rounded-xl px-4 py-3 text-sm focus:border-deep-teal outline-none transition bg-white"
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

              {/* 運営中の場合 → 月間売上レンジ */}
              {(currentStatus === '他社に委託中' || currentStatus === '自主運営') && (
                <div className="mb-5">
                  <label className="text-xs text-dark-gray font-medium block mb-1.5">月間売上（目安）</label>
                  <select
                    value={monthlyRevenue} onChange={e => setMonthlyRevenue(e.target.value)}
                    className="w-full border-2 border-light-gray rounded-xl px-4 py-3 text-sm focus:border-deep-teal outline-none transition bg-white"
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

              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep(1)} className="flex-1 py-3 border-2 border-light-gray rounded-xl text-sm text-dark-gray font-medium hover:bg-cloud-white transition">戻る</button>
                <button
                  onClick={() => { if (currentStatus) { setStep(3); trackStep(3, '運営状況入力') } }}
                  disabled={!currentStatus}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition ${currentStatus ? 'bg-deep-teal text-white hover:bg-deep-teal' : 'bg-light-gray text-mid-gray cursor-not-allowed'}`}
                >
                  次へ
                </button>
              </div>
            </div>
          )}

          {/* Step 3: 連絡先 */}
          {step === 3 && (
            <div>
              <p className="text-sm font-bold text-charcoal mb-4">ご連絡先を教えてください</p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-dark-gray font-medium block mb-1.5">お名前 <span className="text-red-400">*</span></label>
                  <input
                    type="text" placeholder="田中 太郎" required
                    value={name} onChange={e => setName(e.target.value)}
                    className="w-full border-2 border-light-gray rounded-xl px-4 py-3 text-sm focus:border-deep-teal outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-xs text-dark-gray font-medium block mb-1.5">メールアドレス <span className="text-red-400">*</span></label>
                  <input
                    type="email" placeholder="tanaka@example.com" required
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full border-2 border-light-gray rounded-xl px-4 py-3 text-sm focus:border-deep-teal outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-xs text-dark-gray font-medium block mb-1.5">電話番号（任意）</label>
                  <input
                    type="tel" placeholder="090-1234-5678"
                    value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full border-2 border-light-gray rounded-xl px-4 py-3 text-sm focus:border-deep-teal outline-none transition"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 mt-3 text-center">{error}</p>
              )}

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(2)} className="flex-1 py-3 border-2 border-light-gray rounded-xl text-sm text-dark-gray font-medium hover:bg-cloud-white transition">戻る</button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-charcoal rounded-xl text-sm font-bold transition text-center shadow-md"
                >
                  {submitting ? '送信中...' : '収益シミュレーションを受け取る'}
                </button>
              </div>
            </div>
          )}

          <p className="text-[10px] text-mid-gray text-center mt-6">
            ※ 予告なく終了する場合があります
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Final CTA — 最後の追い込み
// ─────────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="relative bg-gradient-to-br from-[#0e5a5f] via-[#167B81] to-[#1a8a91] text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/[0.03] blur-3xl" />
      </div>

      <div className="relative px-6 py-20 md:py-28 text-center max-w-3xl mx-auto">
        <FadeIn>
          <p className="text-xs text-white/40 mb-4">
            <span className="inline-block bg-amber-500 text-charcoal text-[10px] font-bold px-2 py-0.5 rounded mr-1">先着10オーナー</span>
            移行コスト無料キャンペーン中
          </p>
          <h2 className="text-[24px] md:text-[34px] font-bold mb-4 leading-[1.5] tracking-tight">
            田中さんは、年間50万円を取り戻しました。<br />
            次は、あなたの番です。
          </h2>
          <p className="text-base text-white/60 mb-8">
            夏のハイシーズン前に切り替えて、今年の収益を最大化しませんか？
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#diagnostic"
              className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-charcoal text-sm font-bold py-4 px-8 rounded-xl transition shadow-lg shadow-black/10"
            >
              私の物件を無料診断する
              <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/SEKAISTAY営業資料完成版.pptx"
              download
              className="group inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white text-sm font-medium py-3.5 px-6 rounded-xl transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              まずは資料だけ見る
            </a>
          </div>
          <p className="text-xs text-white/30 mt-4">※ キャンペーンは予告なく終了する場合があります</p>
        </FadeIn>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Company Info — 運営会社
// ─────────────────────────────────────────────────────────────────────
function CompanyInfo() {
  return (
    <section className="bg-white px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <p className="text-xs font-semibold text-deep-teal text-center tracking-[0.2em] uppercase mb-3">Company</p>
          <h2 className="text-[22px] md:text-[28px] font-bold text-charcoal text-center mb-10 tracking-tight">
            運営会社
          </h2>

          <div className="bg-cloud-white rounded-2xl border border-light-gray overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-deep-teal to-sekai-teal">
              <p className="text-white font-bold text-lg">SEKAI STAY</p>
              <p className="text-white/60 text-xs">株式会社セカイチ（SEKAICHI Inc.）が運営</p>
            </div>

            <div className="divide-y divide-light-gray">
              {[
                { label: '会社名', value: '株式会社セカイチ（SEKAICHI Inc.）' },
                { label: '代表者', value: '劉 添毅（リュウ テンイチ）\n明神 洸次郎（ミョウジン コウジロウ）' },
                { label: '所在地', value: '〒150-0021\n東京都渋谷区恵比寿西2丁目14-7' },
                { label: '資本金(資本準備金含む)', value: '1,650万円' },
                { label: '法人番号', value: '4011001162956' },
                { label: '住宅宿泊管理業', value: '国土交通大臣(01)第F05780号' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr]">
                  <div className="px-5 py-4 text-xs font-bold text-dark-gray bg-pale-gray">{row.label}</div>
                  <div className="px-5 py-4 text-sm text-charcoal whitespace-pre-line">{row.value}</div>
                </div>
              ))}
            </div>
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
      <footer className="bg-charcoal text-white px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <img
                src="/sekai_stay_03_03.png"
                alt="SEKAI STAY"
                className="h-8 w-auto mb-3"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <p className="text-[13px] text-mid-gray leading-relaxed max-w-xs">
                独自の仕組みで、民泊運用のコスト構造を根本から変える運用代行サービス。
              </p>
            </div>
            <nav className="flex flex-col gap-2.5 text-[13px] text-mid-gray">
              <a href="#services" className="hover:text-white transition">サービスについて</a>
              <a href="#pricing" className="hover:text-white transition">料金</a>
              <a href="#portfolio" className="hover:text-white transition">管理実績</a>
              <a href="#voice" className="hover:text-white transition">お客様の声</a>
              <a href="#diagnostic" className="hover:text-white transition">無料診断</a>
              <button onClick={() => setPrivacyOpen(true)} className="text-left hover:text-white transition">プライバシーポリシー</button>
            </nav>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-[11px] text-mid-gray">&copy; 2026 SEKAI STAY / 株式会社セカイチ. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[11px] text-mid-gray">
              <button onClick={() => setPrivacyOpen(true)} className="hover:text-white transition">プライバシーポリシー</button>
              <span>手数料8%で、世界基準の民泊運営を。</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {privacyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setPrivacyOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-light-gray flex-shrink-0">
              <h2 className="text-lg font-bold text-charcoal">プライバシーポリシー</h2>
              <button
                onClick={() => setPrivacyOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-pale-gray flex items-center justify-center text-dark-gray hover:text-charcoal transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            {/* Body */}
            <div className="overflow-y-auto px-6 py-6 text-sm text-charcoal leading-relaxed space-y-6">
              <p>
                株式会社セカイチ（以下「当社」）は、SEKAI STAY（以下「本サービス」）において、
                お客様の個人情報の保護を重要な責務と認識し、以下のとおりプライバシーポリシーを定め、適切な管理・保護に努めます。
              </p>

              <div>
                <h3 className="font-bold text-charcoal mb-2">1. 事業者情報</h3>
                <p>
                  株式会社セカイチ（SEKAICHI Inc.）<br />
                  代表者: 劉 添毅、明神 洸次郎<br />
                  所在地: 〒150-0021 東京都渋谷区恵比寿西2丁目14-7<br />
                  住宅宿泊管理業: 国土交通大臣(01)第F05780号
                </p>
              </div>

              <div>
                <h3 className="font-bold text-charcoal mb-2">2. 収集する個人情報</h3>
                <p className="mb-2">当社は本サービスにおいて以下の個人情報を収集することがあります。</p>
                <p>氏名、メールアドレス、電話番号、物件に関する情報（物件タイプ、所在地域、部屋数、現在の運用状況、月間売上レンジ等）、お問い合わせ内容、ウェブサイトのアクセスログ情報（IPアドレス、ブラウザ情報、閲覧ページ、アクセス日時等）</p>
              </div>

              <div>
                <h3 className="font-bold text-charcoal mb-2">3. 個人情報の利用目的</h3>
                <p>お問い合わせへの対応および収益シミュレーションの提供、本サービスに関するご案内・ご提案、サービスの改善・新サービスの開発、統計データの作成（個人を特定できない形式）、法令に基づく対応。</p>
              </div>

              <div>
                <h3 className="font-bold text-charcoal mb-2">4. 個人情報の第三者提供</h3>
                <p>当社は、法令に基づく場合等を除き、お客様の同意なく個人情報を第三者に提供することはありません。</p>
              </div>

              <div>
                <h3 className="font-bold text-charcoal mb-2">5. 外部サービスの利用</h3>
                <p className="mb-2">
                  <span className="font-medium">Google Analytics:</span> ウェブサイトの利用状況把握のため使用。クッキーにより利用者情報を収集しますが、個人を特定する情報は含まれません。
                </p>
                <p>
                  <span className="font-medium">Web3Forms:</span> お問い合わせフォーム送信に利用。入力情報はWeb3Formsサーバーを経由して当社に送信されます。
                </p>
              </div>

              <div>
                <h3 className="font-bold text-charcoal mb-2">6. クッキーについて</h3>
                <p>サイトの利便性向上およびアクセス解析のためにクッキーを使用しています。ブラウザの設定により拒否可能ですが、一部機能がご利用いただけなくなることがあります。</p>
              </div>

              <div>
                <h3 className="font-bold text-charcoal mb-2">7. 個人情報の管理</h3>
                <p>個人情報への不正アクセス・紛失・破損・改ざん・漏洩を防止するため、セキュリティシステムの維持・管理体制の整備等、必要な措置を講じます。</p>
              </div>

              <div>
                <h3 className="font-bold text-charcoal mb-2">8. 開示・訂正・削除</h3>
                <p>お客様はご自身の個人情報について、開示・訂正・追加・削除・利用停止を請求できます。本人確認の上、合理的な期間内に対応いたします。</p>
              </div>

              <div>
                <h3 className="font-bold text-charcoal mb-2">9. ポリシーの変更</h3>
                <p>必要に応じて本ポリシーを変更することがあります。変更時は当ウェブサイトに掲載してお知らせいたします。</p>
              </div>

              <div>
                <h3 className="font-bold text-charcoal mb-2">10. お問い合わせ窓口</h3>
                <p>
                  株式会社セカイチ<br />
                  〒150-0021 東京都渋谷区恵比寿西2丁目14-7<br />
                  メール: info@sekaistay.com
                </p>
              </div>

              <p className="text-xs text-mid-gray">最終更新日: 2026年4月7日</p>
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
