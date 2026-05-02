"use client";

/* ─────────────────────────────────────────────────────────────
 * /switch-lite — パターンB（軽量入口）
 *
 * /switch と同じ売り込み構成だが、§13 の申請フォームを
 * 「連絡先のみ + 任意続行」の lite 版に差し替える。
 * 物件URL/売上等の入力負荷を初期段階から外すことで離脱を抑える。
 * ───────────────────────────────────────────────────────────── */

import LpFooter from "@/components/switch/_shared/LpFooter";
import LpCompanyInfo from "@/components/switch/_shared/LpCompanyInfo";
import SwitchHeader from "@/components/switch/SwitchHeader";
import SwitchHero from "@/components/switch/SwitchHero";
import SwitchTestimonials from "@/components/switch/SwitchTestimonials";
import SwitchReportFormEmbed from "@/components/switch/SwitchReportFormEmbed";
import SwitchPrimaryCTA from "@/components/switch/SwitchPrimaryCTA";
import SwitchStickyCTA from "@/components/switch/SwitchStickyCTA";

export default function SwitchLitePage() {
  return (
    <>
      <SwitchHeader />
      <main>
        {/* §1 Hero（既存の SwitchHero を流用） */}
        <SwitchHero />

        {/* §2 数字差訴求 — 年間差額カード */}
        <SwitchPrimaryCTA
          title="他社との手数料差は、あなたの物件だと…"
          compareStat={{
            leftLabel: "松本さんの場合（手数料20%）",
            leftValue: 1440000,
            leftSuffix: "/ 年",
            rightLabel: "SEKAI STAY（手数料8%）",
            rightValue: 696000,
            rightSuffix: "/ 年",
            diffLabel: "年間差額",
            diffValue: 744000,
            diffSuffix: "/ 年",
            note: "※ 1部屋想定・月額固定費 ¥10,000/部屋 込みで試算",
          }}
        />

        {/* §3 オーナー様の声（既存・短い） */}
        <SwitchTestimonials />

        {/* §4 軽量フォーム — 連絡先のみ必須・物件情報は任意続行 */}
        <SwitchReportFormEmbed
          variant="lite"
          heading="まずはご相談だけでもどうぞ"
          leadCopy="お名前・メール・電話の30秒入力で、24時間以内に担当者からご連絡"
          subCopy="物件情報の入力は不要。お話を伺ってから、必要に応じてレポートをお作りします。無理な勧誘は致しません。"
        />

        {/* §5 会社概要 */}
        <LpCompanyInfo />
      </main>
      <LpFooter />
      <SwitchStickyCTA />
    </>
  );
}
