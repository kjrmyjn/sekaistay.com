"use client";

/* /switch/founder Hero — 信頼主導 (人・創業者型)
 * 仮説: スイッチング先の選定では「会社」より「人」を見る層がいる。商談化率も上がる。
 * 数字は控えめ・語りかけ調・代表写真ファースト。
 *
 * ⚠️ 写真の差替え:
 *   /public/images/switch/founder-tenichi.jpg / founder-koji.jpg を配置
 *   → 配置完了後に <FounderPhoto> の placeholder=true を false に変更
 */

import { useEffect, useState } from "react";

const TIMEREX_30MIN = "https://timerex.net/s/sekai-stay/d61b424d";
// TODO: 代表 30min 専用の Timerex リンクが用意されたら差替え

export default function SwitchHeroFounder() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(true), []);

  return (
    <section className="relative bg-paper text-ink overflow-hidden">
      {/* 微かな暖色グロー — 人間味を演出 */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-deep-teal/8 blur-[160px] rounded-full pointer-events-none" aria-hidden />

      <div className="relative max-w-6xl mx-auto px-6 py-20 sm:py-24 lg:py-28">
        <div
          className={`transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* キッカー */}
          <div className="text-center mb-10">
            <p className="text-[11px] sm:text-[12px] tracking-[0.4em] text-deep-teal/80 font-medium uppercase mb-2">
              From the Founders
            </p>
            <div className="inline-block w-12 h-px bg-deep-teal/40" />
          </div>

          {/* 中央寄せ大見出し */}
          <h1 className="text-center font-bold leading-[1.32] tracking-tight text-ink mb-8 sm:mb-10">
            <span className="block text-[28px] sm:text-[40px] lg:text-[52px]">
              民泊代行業界の不透明さを、
            </span>
            <span className="block text-[28px] sm:text-[40px] lg:text-[52px] mt-1.5">
              <span className="text-deep-teal italic font-serif">変えに来ました。</span>
            </span>
          </h1>

          <p className="text-center text-[15px] sm:text-[17px] lg:text-[18px] text-ink/75 leading-[2] tracking-wide max-w-2xl mx-auto mb-14 sm:mb-16">
            「業者に任せきりで、何が起きてるか分からない」
            <br className="hidden sm:block" />
            ——その業界の常識を、ひっくり返す会社をつくりました。
            <br className="hidden sm:block" />
            <strong className="text-ink">うちの代表が、必ず初回お話します。</strong>
          </p>

          {/* 創業者2名カード */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 max-w-3xl mx-auto mb-14 sm:mb-16">
            <FounderCard
              name="劉 添毅"
              nameRomaji="Tenichi Liu"
              role="代表取締役 CEO"
              bio="株式会社セカイチ創業者。前職は民泊投資家として複数物件を運営し、代行業界の不透明さに衝撃を受け創業。"
              photoSrc="/images/switch/founder-tenichi.jpg"
              placeholder
            />
            <FounderCard
              name="明神 洸次郎"
              nameRomaji="Kojiro Myojin"
              role="COO / プロダクト責任者"
              bio="プロダクト・運用設計を統括。オーナーポータルと運用フローの設計者。Sekai Stay の中身は彼がつくっている。"
              photoSrc="/images/switch/founder-koji.jpg"
              placeholder
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
              代表に直接相談する
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
  placeholder,
}: {
  name: string;
  nameRomaji: string;
  role: string;
  bio: string;
  photoSrc: string;
  placeholder?: boolean;
}) {
  return (
    <div className="bg-ivory border border-rule rounded-2xl p-5 sm:p-7 flex gap-4 sm:gap-5">
      {/* 写真スロット — placeholder=true の間はイニシャル表示 */}
      <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-bone border border-rule relative">
        {!placeholder && (
          <img src={photoSrc} alt={`${name} ${role}`} className="w-full h-full object-cover" loading="eager" />
        )}
        {placeholder && (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bone to-paper">
            <span className="text-[28px] sm:text-[36px] font-bold text-deep-teal/30 tracking-tight">
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <p className="text-[10px] sm:text-[11px] tracking-[0.2em] text-deep-teal/70 uppercase font-semibold mb-1">{role}</p>
        <h3 className="text-[18px] sm:text-[22px] font-bold text-ink leading-tight">{name}</h3>
        <p className="text-[10px] sm:text-[11px] text-ink/45 tracking-wider mb-2">{nameRomaji}</p>
        <p className="text-[12px] sm:text-[13px] text-ink/65 leading-relaxed">{bio}</p>
      </div>
    </div>
  );
}
