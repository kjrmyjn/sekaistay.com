import Link from 'next/link'
import { IconMail, IconBarChart } from '@/components/Icons'

const SERVICE_LINKS = [
  { href: '/services', label: '民泊運営代行' },
  { href: '/services#phase-1', label: '集客・予約管理' },
  { href: '/services#phase-2', label: '清掃・メンテナンス' },
  { href: '/services#phase-0', label: '開業準備サポート' },
  { href: '/diagnostic', label: '無料収益診断' },
]

const COMPANY_LINKS = [
  { href: '/company', label: '会社概要' },
  { href: '/case-studies', label: '導入事例' },
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
      <section className="bg-teal-tint px-5 md:px-10 section-heavy">
        <div className="max-w-container mx-auto text-center">
          <p className="heading-section text-charcoal mb-3">
            民泊運営代行や集客についての不明な点は<br className="hidden md:inline" />
            お気軽にお問い合わせください
          </p>
          <div className="grid md:grid-cols-2 gap-5 max-w-[640px] mx-auto mt-10">
            <Link
              href="/contact"
              className="bg-white rounded-card p-6 text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-teal-tint flex items-center justify-center mx-auto mb-3">
                <IconMail size={22} color="#259DA3" />
              </div>
              <p className="text-[15px] text-dark-gray mb-3">
                民泊運営代行やサービスについて
              </p>
              <div className="bg-sekai-teal text-white font-bold text-[15px] py-3 rounded-btn group-hover:bg-deep-teal transition">
                お問い合わせ
              </div>
            </Link>
            <Link
              href="/lp#diagnostic"
              className="bg-white rounded-card p-6 text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-teal-tint flex items-center justify-center mx-auto mb-3">
                <IconBarChart size={22} color="#259DA3" />
              </div>
              <p className="text-[15px] text-dark-gray mb-3">
                所有している物件の収支シミュレーション
              </p>
              <div className="bg-sekai-teal text-white font-bold text-[15px] py-3 rounded-btn group-hover:bg-deep-teal transition">
                収益シミュレーション
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer — charcoal bg は DESIGN.md の Black 5% 枠内 */}
      <footer className="bg-charcoal text-white px-5 md:px-10 py-14">
        <div className="max-w-container mx-auto">
          <div className="grid md:grid-cols-[1.2fr_auto_auto_auto] gap-10 md:gap-10 mb-10">
            {/* Brand */}
            <div>
              <img
                src="/sekai_stay_03_03.png"
                alt="SEKAI STAY"
                className="h-8 w-auto mb-4"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <p className="text-[13px] text-light-gray leading-[1.8] mb-4 max-w-sm">
                SEKAI STAYは、手数料8%で民泊運営をワンストップで代行するサービスです。
                稼働率とレビュー品質を上げ、収益を最大化します。
              </p>
              <p className="text-[11px] text-light-gray/80 mb-2">
                住宅宿泊管理業 国土交通大臣(01)第F05780号
              </p>
              <p className="text-[11px] text-light-gray/80">
                運営: <a href="https://sekaichi.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition underline underline-offset-2">株式会社セカイチ（SEKAICHI Inc.）</a>
              </p>
            </div>

            {/* Service Links */}
            <div>
<<<<<<< HEAD
              <p className="text-label text-white/70 uppercase tracking-[0.08em] mb-4">サービス</p>
=======
              <p className="text-label text-white/85 uppercase tracking-[0.08em] mb-4">サービス</p>
>>>>>>> design-system-redesign
              <nav className="flex flex-col gap-2.5">
                {SERVICE_LINKS.map(l => (
                  <Link key={l.href} href={l.href} className="text-[13px] text-light-gray hover:text-white transition">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Company Links */}
            <div>
<<<<<<< HEAD
              <p className="text-label text-white/70 uppercase tracking-[0.08em] mb-4">企業情報</p>
=======
              <p className="text-label text-white/85 uppercase tracking-[0.08em] mb-4">企業情報</p>
>>>>>>> design-system-redesign
              <nav className="flex flex-col gap-2.5">
                {COMPANY_LINKS.map(l => (
                  <Link key={l.href} href={l.href} className="text-[13px] text-light-gray hover:text-white transition">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Area Links */}
            <div>
<<<<<<< HEAD
              <p className="text-label text-white/70 uppercase tracking-[0.08em] mb-4">対応エリア</p>
=======
              <p className="text-label text-white/85 uppercase tracking-[0.08em] mb-4">対応エリア</p>
>>>>>>> design-system-redesign
              <nav className="flex flex-col gap-2.5">
                {AREA_LINKS.map(l => (
                  <Link key={l.href} href={l.href} className="text-[13px] text-light-gray hover:text-white transition">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-[11px] text-light-gray/80">&copy; 2026 SEKAI STAY / 株式会社セカイチ（SEKAICHI Inc.）. All rights reserved.</p>
            <Link href="/privacy" className="text-[11px] text-light-gray/80 hover:text-white transition">
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
