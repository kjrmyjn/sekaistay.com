"use client";

/* /switch/founder Hero — 信頼主導 (人・創業者型)
 * 仮説: スイッチング先の選定では「会社」より「人」を見る層がいる。商談化率も上がる。
 * 創業者ポートレートをヒーロービジュアルの主役に据える設計。
 */

import { useEffect, useState } from "react";

const TIMEREX_30MIN = "https://timerex.net/s/sekai-stay/d61b424d";

export default function SwitchHeroFounder() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(true), []);

  return (
    <section className="relative bg-paper text-ink overflow-hidden">
      {/* 微かな暖色グロー — 人間味を演出 */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-deep-teal/8 blur-[160px] rounded-full pointer-events-none" aria-hidden />
      <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] bg-deep-teal/6 blur-[160px] rounded-full pointer-events-none" aria-hidden />

      <div className="relative max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-24">
        <div
          className={`transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* キッカー */}
          <div className="text-center mb-8">
            <p className="text-[11px] sm:text-[12px] tracking-[0.4em] text-deep-teal/80 font-medium uppercase mb-2">
              From the Founders
            </p>
            <div className="inline-block w-12 h-px bg-deep-teal/40" />
          </div>

          {/* 中央寄せ大見出し */}
          <h1 className="text-center font-bold leading-[1.32] tracking-tight text-ink mb-6 sm:mb-8">
            <span className="block text-[28px] sm:text-[40px] lg:text-[52px]">
              民泊代行業界の不透明さを、
            </span>
            <span className="block text-[28px] sm:text-[40px] lg:text-[52px] mt-1.5">
              <span className="text-deep-teal italic font-serif">変えに来ました。</span>
            </span>
          </h1>

          <p className="text-center text-[14px] sm:text-[16px] lg:text-[17px] text-ink/75 leading-[1.95] tracking-wide max-w-2xl mx-auto mb-10 sm:mb-14">
            「業者に任せきりで、何が起きてるか分からない」
            <br className="hidden sm:block" />
            ——その業界の常識を、ひっくり返す会社をつくりました。
            <br className="hidden sm:block" />
            <strong className="text-ink">専門アナリストが、丁寧にお話を伺います。</strong>
          </p>

          {/* 創業者2名カード — 左: 明神 / 右: 劉（左右入替済み） */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-12 sm:mb-14">
            <FounderCard
              name="明神 洸次郎"
              nameRomaji="Kojiro Myojin"
              role="共同代表 Co-CEO"
              bio={
                <>
                  登録者数125万人超を誇った人気YouTubeグループ「<strong className="text-ink">カリスマブラザーズ</strong>」出身のクリエイター「<strong className="text-ink">ジロー</strong>」としても活動。プロダクト・運用設計を統括し、オーナーポータルと運用フローの設計者。SEKAI STAYの中身は彼がつくっている。
                </>
              }
              photoSrc="/images/switch/founder-koji.png"
              accent="from-amber-50 via-paper to-paper"
            />
            <FounderCard
              name="劉 添毅"
              nameRomaji="Tenichi Liu"
              role="代表取締役 CEO"
              bio={
                <>
                  <strong className="text-ink">SEKAI STAY創設者</strong>。<strong className="text-ink">Amazon米国本社</strong>で培った経験をもとに、日本の代行業界に世界基準の運用体験を提供することを目的に創業。民泊投資家として国内外の物件を運営してきた経験から、代行業界の不透明さに衝撃を受けた当事者でもある。
                </>
              }
              photoSrc="/images/switch/founder-tenichi.png"
              accent="from-slate-50 via-paper to-paper"
            />
          </div>

          {/* 主CTA + 副CTA */}
          <div className="flex flex-col items-center gap-3">
            <a
              href={TIMEREX_30MIN}
              target="_blank"
              rel="noreferrer"
              data-cta="founder-meeting"
              data-cta-label="founder-30min-primary"
              className="group inline-flex items-center justify-center bg-ink text-paper font-bold text-[15px] sm:text-base px-8 sm:px-10 py-4 rounded-md hover:bg-deep-teal transition-colors duration-300 shadow tracking-wide"
            >
              専門家に相談する
              <span className="mx-2 inline-block w-px h-4 bg-paper/30 align-middle" aria-hidden />
              <span className="text-paper/80 font-medium text-[13px] sm:text-[14px]">30分の無料面談</span>
              <svg className="ml-3 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact-form"
              data-cta="contact-form"
              data-cta-label="founder-secondary"
              className="text-[13px] text-ink/60 underline underline-offset-4 hover:text-ink transition-colors"
            >
              先にメールで診断レポートだけ受け取る
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FounderCard({
  name,
  nameRomaji,
  role,
  bio,
  photoSrc,
  accent,
}: {
  name: string;
  nameRomaji: string;
  role: string;
  bio: React.ReactNode;
  photoSrc: string;
  accent: string;
}) {
  return (
    <div className={`relative bg-gradient-to-br ${accent} border border-rule rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
      {/* 上部: ポートレート（背景としてカード全幅で配置） */}
      <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[360px] bg-gradient-to-b from-bone/30 to-paper">
        <img
          src={photoSrc}
          alt={`${name} ${role}`}
          className="absolute inset-0 w-full h-full object-contain object-bottom"
          loading="eager"
        />
        {/* 下端のフェード（テキスト境界をなじませる） */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-paper to-transparent pointer-events-none" aria-hidden />
      </div>

      {/* 下部: テキスト */}
      <div className="px-6 sm:px-7 pt-2 pb-6 sm:pb-7">
        <p className="text-[10px] sm:text-[11px] tracking-[0.2em] text-deep-teal/70 uppercase font-semibold mb-1">{role}</p>
        <h3 className="text-[20px] sm:text-[24px] font-bold text-ink leading-tight">{name}</h3>
        <p className="text-[10px] sm:text-[11px] text-ink/45 tracking-wider mb-3">{nameRomaji}</p>
        <p className="text-[12px] sm:text-[13px] text-ink/70 leading-relaxed">{bio}</p>
      </div>
    </div>
  );
}
