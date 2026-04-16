import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import {
  IconArrowRight,
  IconCheck,
  IconSparkles,
  IconShield,
  IconTarget,
  IconTrendingUp,
  IconStar,
  IconGlobe,
  IconChart,
} from '@/components/Icons'

const SITE_URL = 'https://sekaistay.com'

export const metadata: Metadata = {
  title: '私たちについて',
  description:
    'SEKAI STAYは、宿を管理するだけでなく、宿の価値そのものを伸ばす運用代行サービス。自社のインバウンド基盤・メディア基盤・約35名の運用体制で、稼働率・売上・レビュー評価まで一貫して改善します。',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: '私たちについて | SEKAI STAY',
    description:
      '宿を預かる会社ではなく、宿の価値を伸ばす会社。SEKAI STAYの考え方・創業背景・代表メッセージ・チーム体制をご紹介します。',
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/about`,
    siteName: 'SEKAI STAY',
  },
  twitter: {
    card: 'summary_large_image',
    title: '私たちについて | SEKAI STAY',
    description: '宿を預かる会社ではなく、宿の価値を伸ばす会社。',
  },
}

/* ─── Structured Data ─────────────────────────────────────────── */
function AboutJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `${SITE_URL}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: 'SEKAI STAY',
      legalName: '株式会社セカイチ',
      url: SITE_URL,
      logo: `${SITE_URL}/sekai_stay_03_03.png`,
      description: '民泊・宿泊施設の運用代行サービス。手数料8%で一括運用。',
      founder: [
        { '@type': 'Person', name: '劉 添毅' },
        { '@type': 'Person', name: '明神 洸次郎' },
      ],
      areaServed: 'JP',
      slogan: '宿を管理するのではない。宿の価値を伸ばす。',
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

/* ─── Section 4. Founder card ─────────────────────────────────── */
function FounderCard({
  initial,
  name,
  kana,
  quote,
  bio,
}: {
  initial: string
  name: string
  kana: string
  quote: string
  bio: string[]
}) {
  return (
    <div className="bg-white rounded-2xl border border-light-gray p-7 md:p-9 hover:shadow-lg transition">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-deep-teal to-sekai-teal flex items-center justify-center text-white font-black text-2xl flex-shrink-0">
          {initial}
        </div>
        <div>
          <p className="text-[11px] font-mono text-deep-teal tracking-wider mb-1">Co-Founder</p>
          <p className="text-lg font-black text-charcoal leading-tight">{name}</p>
          <p className="text-[11px] text-dark-gray mt-0.5">{kana}</p>
        </div>
      </div>
      <blockquote className="text-base font-bold text-charcoal leading-relaxed mb-5 pl-4 border-l-2 border-sekai-teal">
        「{quote}」
      </blockquote>
      <div className="space-y-2.5">
        {bio.map((line, i) => (
          <p key={i} className="text-sm text-dark-gray leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function AboutPage() {
  const stats = [
    { icon: IconTrendingUp, value: '1.4', unit: '倍', label: '稼働率', sub: '運用改善と見せ方の最適化によって、稼働率の向上を実現（平均改善倍率）。' },
    { icon: IconChart,      value: '+57', unit: '%',  label: '月間売上', sub: '価格設計、導線改善、集客強化を通じて、売上成長を支援。' },
    { icon: IconStar,       value: '4.8', unit: '/5', label: 'レビュー評価', sub: '管理物件において、高い顧客満足度を維持。' },
    { icon: IconShield,     value: '5',   unit: '年+', label: '運用支援', sub: '現場に根ざした運用改善を継続。' },
    { icon: IconSparkles,   value: '20',  unit: '万人+', label: '自社YouTube', sub: '発信力と見せ方の知見を、宿泊運用にも活用。' },
    { icon: IconGlobe,      value: '7',   unit: '拠点', label: '全国展開', sub: '地域ごとの特性を踏まえた運用支援が可能。' },
  ]

  const credo = [
    {
      num: '01',
      title: '透明に向き合う。',
      body:
        '何をしているのか分からない運用にはしません。料金も、判断も、改善の理由も、できる限りオーナーに見える形で共有します。宿泊運用において大切なのは、任せやすさだけではなく、納得できることだと考えています。',
    },
    {
      num: '02',
      title: 'オーナー目線で考える。',
      body:
        '私たちにとって大事なのは、管理件数ではなく、1件1件の成果です。"こちらの都合"ではなく、"オーナーにとって本当にいいか"を起点に判断します。短期的な効率だけではなく、長く信頼される運用を目指します。',
    },
    {
      num: '03',
      title: '管理で終わらせない。',
      body:
        '宿は、ただ回すだけでは伸びません。見せ方、伝え方、価格設計、集客導線まで整えて、宿の価値そのものを育てていきます。私たちは、宿を預かる会社ではなく、宿の価値を伸ばす会社でありたいと考えています。',
    },
  ]

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: '私たちについて' }]} />
      <AboutJsonLd />
      <FloatingCTA />

      <main>
        {/* ─────────── Section 1. Hero ─────────── */}
        <section className="relative bg-charcoal text-white overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full opacity-40 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(84,190,195,0.55), transparent 60%)' }}
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -left-40 w-[460px] h-[460px] rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(22,123,129,0.6), transparent 60%)' }}
          />

          <div className="relative max-w-[1080px] mx-auto px-6 md:px-10 py-20 md:py-32">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 mb-8">
              <IconSparkles size={13} color="#54BEC3" />
              <span className="text-[11px] font-bold text-white/90 tracking-[0.15em] uppercase">
                About SEKAI STAY
              </span>
            </div>
            <h1 className="text-3xl md:text-[52px] font-black tracking-tight leading-[1.25] mb-8">
              宿を管理するのではない。<br />
              <span className="text-bright-teal">宿の価値を伸ばす。</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
              SEKAI STAYは、ただ宿を預かるための会社ではありません。<br />
              宿の魅力を正しく伝え、売上まで伸ばす。<br />
              運用代行の枠を超えて、宿の価値そのものを育てることを目指しています。
            </p>
          </div>
        </section>

        {/* ─────────── Section 2. Mission ─────────── */}
        <section className="bg-white px-6 py-20 md:py-28">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] font-bold text-deep-teal tracking-[0.25em] uppercase mb-5 text-center">
              Our Mission
            </p>
            <h2 className="text-2xl md:text-[38px] font-black text-charcoal tracking-tight leading-tight text-center mb-12">
              まだ届いていない宿の価値を、<br className="hidden sm:inline" />
              きちんと世界に届ける。
            </h2>

            <div className="space-y-6 text-[15px] md:text-base text-dark-gray leading-[1.95]">
              <p>
                日本には、世界に届くべき宿がまだ数多くあります。<br />
                しかしこの業界では、宿を持つ人と、その価値を正しく伝えられる人が分かれすぎている。<br />
                さらに、テクノロジーや分析、マーケティングの活用も十分とは言えず、本来伸びるはずの物件が、伸びきらないまま埋もれている宿も少なくありません。
              </p>
              <p>
                SEKAI STAYは、ただ宿を管理するための会社ではありません。<br />
                オーナーに代わって、宿の魅力を磨き、伝え、売上まで伸ばす。<br />
                そんな&ldquo;宿の価値を伸ばす運用&rdquo;を、本質的に実装するために生まれました。
              </p>
            </div>

            {/* Mission pillars */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
              {['もっとわかりやすく。', 'もっと綺麗に。', 'もっと透明に。', '最小限の手数料で。'].map(t => (
                <div
                  key={t}
                  className="bg-teal-tint border border-deep-teal/15 rounded-xl px-4 py-5 text-center"
                >
                  <p className="text-sm font-black text-deep-teal leading-tight">{t}</p>
                </div>
              ))}
            </div>

            <p className="text-[15px] md:text-base text-dark-gray leading-[1.95] mt-12 text-center">
              宿泊運用のあり方そのものを、より健全で、より本質的なものへ変えていく。<br />
              <span className="text-charcoal font-bold">それが、SEKAI STAYの使命です。</span>
            </p>
          </div>
        </section>

        {/* ─────────── Section 3. Origin Story ─────────── */}
        <section className="bg-cloud-white px-6 py-20 md:py-28 border-y border-light-gray">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] font-bold text-deep-teal tracking-[0.25em] uppercase mb-5">
              Origin Story
            </p>
            <h2 className="text-2xl md:text-[36px] font-black text-charcoal tracking-tight leading-tight mb-10">
              この業界を、<br className="hidden sm:inline" />
              もっと本質的にできるはずだと思った。
            </h2>

            <div className="space-y-6 text-[15px] md:text-base text-dark-gray leading-[1.95]">
              <p>
                民泊事業を立ち上げてから6年間、現場で運用に向き合ってきました。<br />
                その中で強く感じたのは、<span className="text-charcoal font-bold">この業界にはまだ非効率と不透明さが多く残っている</span>ということでした。
              </p>
              <p>
                世界中の宿泊運用サービスを見ても、民泊という領域に対して、テクノロジー、分析力、マーケティングを本気で掛け合わせている会社は多くありません。本来はもっと良くできるのに、業界構造や慣習の中で、オーナーが見えないコストや、不明瞭な運用を受け入れざるを得ない場面も少なくない。伸ばせる余地がある宿が、その価値を十分に発揮できないまま終わっている。そんな現実に、何度も疑問を感じてきました。
              </p>
              <p>
                だからこそ私たちは、<span className="text-charcoal font-bold">運用の中身をできるだけ表面化し、オーナーが人に自慢できるくらい透明で、本質的なサービス</span>をつくろうと考えました。一定の自動化と仕組み化によって、一人あたりが管理できる物件数を圧倒的に伸ばしながら、コミュニケーションの質はむしろ高める。さらに、私たちが持つインバウンドへの強みや、メディア・マーケティングの知見まで掛け合わせることで、単なる代行では終わらない運用を実現しています。
              </p>
              <p className="pt-2 border-t border-light-gray text-base text-charcoal font-bold leading-relaxed">
                SEKAI STAYは、宿を回すためだけの会社ではありません。<br />
                宿の価値を、正しく伸ばすための会社です。
              </p>
            </div>
          </div>
        </section>

        {/* ─────────── Section 4. Founders ─────────── */}
        <section className="bg-white px-6 py-20 md:py-28">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-14">
              <p className="text-[11px] font-bold text-deep-teal tracking-[0.25em] uppercase mb-5">
                Founders
              </p>
              <h2 className="text-2xl md:text-[36px] font-black text-charcoal tracking-tight leading-tight mb-5">
                現場を知る会社だから、つくれた仕組みがあります。
              </h2>
              <p className="text-sm text-dark-gray leading-relaxed max-w-xl mx-auto">
                運用を知る視点と、伝え方を知る視点。<br />
                その両方があるからこそ、SEKAI STAYは&ldquo;ただの代行&rdquo;で終わりません。
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              <FounderCard
                initial="劉"
                name="劉 添毅"
                kana="Liu Tianyi"
                quote="仕組みで支え、運用を強くする。"
                bio={[
                  '米国大学卒業後、Amazon本社に入社。',
                  'その後独立し、明神と共にSEKAI STAYを設立。',
                  '海外ネットワークやオペレーション設計、システム開発や事業基盤づくりを担う。',
                ]}
              />
              <FounderCard
                initial="明"
                name="明神 洸次郎"
                kana="Myojin Kojiro"
                quote="伝え方を変えれば、宿の価値はもっと伸びる。"
                bio={[
                  '米国留学後、メディア事業を立ち上げ、発信・集客・見せ方の設計を現場で実践。YouTube累計再生回数は6億再生を超える。',
                  '飲食・メディア・マーケティング領域で事業を展開し、ブランドづくりと集客導線の構築を経験。',
                  '現在はSEKAI STAYにて、ブランディング、マーケティング、発信・集客導線の設計を担当。',
                ]}
              />
            </div>
          </div>
        </section>

        {/* ─────────── Section 5. Numbers ─────────── */}
        <section className="relative bg-charcoal text-white px-6 py-20 md:py-28 overflow-hidden">
          <div
            aria-hidden
            className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl pointer-events-none -translate-y-1/2"
            style={{ background: 'radial-gradient(circle, rgba(84,190,195,0.5), transparent 60%)' }}
          />

          <div className="relative max-w-[1080px] mx-auto">
            <div className="mb-12 md:mb-16">
              <p className="text-[11px] font-bold text-bright-teal tracking-[0.25em] uppercase mb-5">
                Numbers
              </p>
              <h2 className="text-2xl md:text-[36px] font-black tracking-tight leading-tight">
                数字で見る、<br className="hidden sm:inline" />
                SEKAI STAYの現在地
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {stats.map(s => (
                <div
                  key={s.label}
                  className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 md:p-7 backdrop-blur-sm hover:bg-white/[0.08] transition"
                >
                  <div className="w-9 h-9 rounded-full bg-bright-teal/15 flex items-center justify-center mb-4">
                    <s.icon size={16} color="#54BEC3" />
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl md:text-[40px] font-black tracking-tight tabular-nums leading-none">
                      {s.value}
                    </span>
                    <span className="text-sm md:text-base text-white/70 font-bold">{s.unit}</span>
                  </div>
                  <p className="text-[11px] md:text-[13px] font-bold text-bright-teal tracking-wider mb-2 uppercase">
                    {s.label}
                  </p>
                  <p className="text-[11px] md:text-xs text-white/60 leading-relaxed">
                    {s.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── Section 6. Team & Culture ─────────── */}
        <section className="bg-white px-6 py-20 md:py-28">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] font-bold text-deep-teal tracking-[0.25em] uppercase mb-5">
              Team & Culture
            </p>
            <h2 className="text-2xl md:text-[36px] font-black text-charcoal tracking-tight leading-tight mb-10">
              宿の運用は、<br className="hidden sm:inline" />
              ひとりの力ではなく、チームの力でつくる。
            </h2>

            <div className="space-y-6 text-[15px] md:text-base text-dark-gray leading-[1.95]">
              <p>
                SEKAI STAYの運用は、少人数の属人的な体制ではなく、分析を自動化し、そこに各領域の実務者を当てこむことで、全ての物件を同じクオリティで運用することを実現しています。<br />
                オペレーション、清掃、ゲスト対応、撮影、掲載改善まで、業務委託メンバーを含む<span className="text-charcoal font-bold">約35名の体制</span>で、現場品質と改善速度の両立を目指しています。
              </p>
              <p>
                宿泊運用は、表に見える仕事だけでは成立しません。<br />
                清潔さ、対応の速さ、掲載情報の整え方、写真の印象、ゲストとのコミュニケーション。<br />
                その一つひとつが積み重なって、レビューになり、売上になり、宿のブランドになっていきます。
              </p>
              <p>
                だからこそ私たちは、運用を単なる作業として扱いません。<br />
                <span className="text-charcoal font-bold">現場の質が、そのまま宿の価値になる。</span><br />
                そんな前提で、日々の改善を積み重ねています。
              </p>
            </div>

            {/* Team structure pill grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 mt-10">
              {['オペレーション', '清掃', 'ゲスト対応', '撮影・制作', '掲載改善'].map(t => (
                <div
                  key={t}
                  className="bg-cloud-white border border-light-gray rounded-xl px-3 py-4 text-center"
                >
                  <p className="text-[12px] md:text-[13px] font-bold text-charcoal">{t}</p>
                </div>
              ))}
            </div>

            <p className="text-[12px] text-mid-gray mt-6 leading-relaxed">
              属人的に回すのではなく、仕組みとチームで品質を支える。<br />
              それが、安定した運用改善につながります。
            </p>
          </div>
        </section>

        {/* ─────────── Section 7. Credo ─────────── */}
        <section className="bg-warm-gradient px-6 py-20 md:py-28">
          <div className="max-w-[1080px] mx-auto">
            <div className="text-center mb-14">
              <p className="text-[11px] font-bold text-deep-teal tracking-[0.25em] uppercase mb-5">
                Credo
              </p>
              <h2 className="text-2xl md:text-[36px] font-black text-charcoal tracking-tight leading-tight">
                私たちの、3つの約束。
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {credo.map(c => (
                <div
                  key={c.num}
                  className="bg-white rounded-2xl border border-light-gray p-7 md:p-8 hover:border-deep-teal/30 hover:shadow-md transition"
                >
                  <div className="flex items-baseline gap-3 mb-5">
                    <span className="text-[32px] font-black text-deep-teal tabular-nums leading-none">
                      {c.num}
                    </span>
                    <div className="flex-1 h-px bg-deep-teal/20" />
                  </div>
                  <h3 className="text-lg font-black text-charcoal mb-4 leading-tight">
                    {c.title}
                  </h3>
                  <p className="text-[13px] text-dark-gray leading-relaxed">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── Section 8. CTA ─────────── */}
        <section className="bg-white px-6 py-20 md:py-28">
          <div className="max-w-3xl mx-auto">
            <div className="relative overflow-hidden bg-charcoal rounded-3xl p-8 md:p-14 text-center">
              <div
                aria-hidden
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 20% 0%, rgba(84,190,195,0.5), transparent 50%), radial-gradient(circle at 80% 100%, rgba(22,123,129,0.45), transparent 55%)',
                }}
              />
              <div className="relative">
                <p className="text-[10px] font-bold text-bright-teal tracking-[0.3em] uppercase mb-5">
                  Let&rsquo;s Start
                </p>
                <h2 className="text-2xl md:text-[34px] font-black text-white leading-tight mb-5">
                  まずは、あなたの宿の<br className="md:hidden" />可能性を知るところから。
                </h2>
                <p className="text-sm md:text-base text-white/75 leading-relaxed mb-10 max-w-xl mx-auto">
                  運用を見直したい。今の委託先に違和感がある。もっと透明で、本質的な運用に切り替えたい。<br />
                  そんな方は、まずご相談ください。SEKAI STAYは、宿の現状を丁寧に見つめ、改善の余地を明確にしながら、最適な運用の形をご提案します。
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 bg-white text-deep-teal font-bold px-8 py-4 rounded-xl transition hover:bg-cloud-white text-sm shadow-lg"
                  >
                    無料で相談する
                    <IconArrowRight size={14} className="group-hover:translate-x-0.5 transition" />
                  </Link>
                  <Link
                    href="/simulate"
                    className="group inline-flex items-center gap-2 border border-white/30 text-white font-bold px-8 py-4 rounded-xl transition hover:bg-white/10 text-sm"
                  >
                    収益シミュレーションを試す
                    <IconArrowRight size={14} className="group-hover:translate-x-0.5 transition" />
                  </Link>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-8 text-[11px] text-white/60">
                  <span className="inline-flex items-center gap-1"><IconCheck size={12} color="#54BEC3" /> 初期費用0円</span>
                  <span className="inline-flex items-center gap-1"><IconCheck size={12} color="#54BEC3" /> 手数料8%</span>
                  <span className="inline-flex items-center gap-1"><IconCheck size={12} color="#54BEC3" /> 無理な営業はしません</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
