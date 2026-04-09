import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'SEKAI STAY（株式会社セカイチ）のプライバシーポリシー。個人情報の取り扱いについて。',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <FloatingCTA />
      <main>
        <section className="bg-warm-gradient px-6 section-heavy">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3">Privacy Policy</p>
            <h1 className="heading-display text-charcoal mb-6">プライバシーポリシー</h1>
          </div>
        </section>
        <section className="px-6 section-heavy">
          <article className="max-w-3xl mx-auto">
            <p className="text-sm text-mid-gray mb-12 text-center">最終更新日: 2026年4月7日</p>

            <div className="space-y-8 text-sm text-charcoal leading-relaxed">
              <p>
                株式会社セカイチ（以下「当社」）は、SEKAI STAY（以下「本サービス」）において、
                お客様の個人情報の保護を重要な責務と認識し、以下のとおりプライバシーポリシーを定め、適切な管理・保護に努めます。
              </p>

              <div>
                <h2 className="text-base font-bold text-charcoal mb-2">1. 事業者情報</h2>
                <p>
                  株式会社セカイチ（SEKAICHI Inc.）/ 代表者: 劉 添毅、明神 洸次郎 /
                  所在地: 〒150-0021 東京都渋谷区恵比寿西2丁目14-7 /
                  住宅宿泊管理業: 国土交通大臣(01)第F05780号
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold text-charcoal mb-2">2. 収集する個人情報</h2>
                <p>氏名、メールアドレス、電話番号、物件に関する情報（物件タイプ、所在地域、部屋数、現在の運用状況、月間売上レンジ等）、お問い合わせ内容、ウェブサイトのアクセスログ情報（IPアドレス、ブラウザ情報、閲覧ページ、アクセス日時等）。</p>
              </div>

              <div>
                <h2 className="text-base font-bold text-charcoal mb-2">3. 利用目的</h2>
                <p>お問い合わせへの対応および収益シミュレーションの提供、本サービスに関するご案内・ご提案、サービスの改善・新サービスの開発、統計データの作成（個人を特定できない形式）、法令に基づく対応。</p>
              </div>

              <div>
                <h2 className="text-base font-bold text-charcoal mb-2">4. 第三者提供</h2>
                <p>法令に基づく場合等を除き、お客様の同意なく個人情報を第三者に提供することはありません。</p>
              </div>

              <div>
                <h2 className="text-base font-bold text-charcoal mb-2">5. 外部サービスの利用</h2>
                <p>
                  当サイトではGoogle Analyticsを使用しています。クッキーにより利用者情報を収集しますが、個人を特定する情報は含まれません。
                  お問い合わせフォームの送信にはWeb3Formsを利用しています。
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold text-charcoal mb-2">6. クッキーについて</h2>
                <p>サイトの利便性向上およびアクセス解析のためにクッキーを使用しています。ブラウザの設定により拒否可能ですが、一部機能がご利用いただけなくなることがあります。</p>
              </div>

              <div>
                <h2 className="text-base font-bold text-charcoal mb-2">7. 個人情報の管理</h2>
                <p>個人情報への不正アクセス・紛失・破損・改ざん・漏洩を防止するため、必要なセキュリティ対策を講じます。</p>
              </div>

              <div>
                <h2 className="text-base font-bold text-charcoal mb-2">8. 開示・訂正・削除</h2>
                <p>お客様はご自身の個人情報について、開示・訂正・追加・削除・利用停止を請求できます。本人確認の上、合理的な期間内に対応いたします。</p>
              </div>

              <div>
                <h2 className="text-base font-bold text-charcoal mb-2">9. ポリシーの変更</h2>
                <p>必要に応じて本ポリシーを変更することがあります。変更時は当ウェブサイトに掲載してお知らせいたします。</p>
              </div>

              <div>
                <h2 className="text-base font-bold text-charcoal mb-2">10. お問い合わせ窓口</h2>
                <p>
                  株式会社セカイチ / 〒150-0021 東京都渋谷区恵比寿西2丁目14-7 / メール: info@sekaistay.com
                </p>
              </div>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}
