import Link from 'next/link'

const SERVICE_LINKS = [
  { href: '/services', label: '民泊運営代行' },
  { href: '/services#phase-1', label: '集客・予約管理' },
  { href: '/services#phase-2', label: '清掃・メンテナンス' },
  { href: '/services#phase-0', label: '開業準備サポート' },
  { href: '/diagnostic', label: '無料収益診断' },
]

const COMPANY_LINKS = [
  { href: '/company', label: '会社概要' },
  { href: '/portfolio', label: '運営実績' },
  { href: '/blog', label: 'コラム' },
  { href: '/pricing', label: '料金' },
  { href: '/faq', label: 'よくある質問' },
  { href: '/contact', label: 'お問い合わせ' },
  { href: '/privacy', label: 'プライバシーポリシー' },
]

const AREA_LINKS = [
  { href: '/area/tokyo', label: '東京' },
  { href: '/area/osaka', label: '大阪' },
  { href: '/area/kyoto', label: '京都' },
  { href: '/area/fukuoka', label: '福岡' },
  { href: '/area/okinawa', label: '沖縄' },
  { href: '/area/hokkaido', label: '北海道' },
  { href: '/area/hakone', label: '箱根' },
  { href: '/area/karuizawa', label: '軽井沢' },
  { href: '/area', label: 'すべてのエリア →' },
]

export default function Footer() {
  return (
    <>
      {/* Pre-footer CTA */}
      <section className="bg-teal-full px-6 section-heavy">
        <div className="max-w-5xl mx-auto text-center">
          <p className="heading-section text-white mb-4">
            民泊運営代行や集客についての不明な点は<br className="hidden md:inline" />
            お気軽にお問い合わせください
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mt-10">
            <Link
              href="/contact"
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition group"
            >
              <div className="w-12 h-12 rounded-full bg-teal-tint text-deep-teal flex items-center justify-center mx-auto mb-3 text-xl">
                ✉
              </div>
              <p className="text-sm text-dark-gray mb-3">
                民泊運営代行やサービスについて
              </p>
              <div className="bg-deep-teal text-white font-bold text-sm py-3 rounded-lg group-hover:bg-deep-teal transition">
                お問い合わせ →
              </div>
            </Link>
            <Link
              href="/lp#diagnostic"
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition group"
            >
              <div className="w-12 h-12 rounded-full bg-teal-tint text-deep-teal flex items-center justify-center mx-auto mb-3 text-xl">
                📊
              </div>
              <p className="text-sm text-dark-gray mb-3">
                所有している物件の収支シミュレーション
              </p>
              <div className="bg-deep-teal text-white font-bold text-sm py-3 rounded-lg group-hover:bg-deep-teal transition">
                収益シミュレーション →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1.2fr_auto_auto_auto] gap-10 md:gap-12 mb-12">
            {/* Brand */}
            <div>
              <img
                src="/sekai_stay_03_03.png"
                alt="SEKAI STAY — 民泊運営代行サービス"
                className="h-9 w-auto mb-5"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <p className="text-sm text-mid-gray leading-relaxed mb-4 max-w-sm">
                SEKAI STAYは、手数料8%で民泊運営をワンストップで代行するサービスです。
                OTA最適化・多言語ゲスト対応・清掃管理・ダイナミックプライシングで収益を最大化します。
              </p>
              <p className="text-xs text-mid-gray/60 mb-2">
                住宅宿泊管理業 国土交通大臣(01)第F05780号
              </p>
              <p className="text-xs text-mid-gray/60">
                運営: <a href="https://sekaichi.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition underline underline-offset-2">株式会社セカイチ（SEKAICHI Inc.）</a>
              </p>
            </div>

            {/* Service Links */}
            <div>
              <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">サービス</p>
              <nav className="flex flex-col gap-2.5">
                {SERVICE_LINKS.map(l => (
                  <Link key={l.href} href={l.href} className="text-[13px] text-mid-gray hover:text-white transition">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Company Links */}
            <div>
              <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">企業情報</p>
              <nav className="flex flex-col gap-2.5">
                {COMPANY_LINKS.map(l => (
                  <Link key={l.href} href={l.href} className="text-[13px] text-mid-gray hover:text-white transition">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Area Links */}
            <div>
              <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">対応エリア</p>
              <nav className="flex flex-col gap-2.5">
                {AREA_LINKS.map(l => (
                  <Link key={l.href} href={l.href} className="text-[13px] text-mid-gray hover:text-white transition">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-mid-gray/60">&copy; 2026 SEKAI STAY / 株式会社セカイチ（SEKAICHI Inc.）. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-xs text-mid-gray/60 hover:text-white transition">
                プライバシーポリシー
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
