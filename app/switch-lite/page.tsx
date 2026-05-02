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
import SwitchSimulator from "@/components/switch/SwitchSimulator";
import SwitchPainPoints from "@/components/switch/SwitchPainPoints";
import SwitchServices from "@/components/switch/SwitchServices";
import SwitchComparison from "@/components/switch/SwitchComparison";
import SwitchResults from "@/components/switch/SwitchResults";
import SwitchTestimonials from "@/components/switch/SwitchTestimonials";
import SwitchPricing from "@/components/switch/SwitchPricing";
import SwitchFlow from "@/components/switch/SwitchFlow";
import SwitchFAQ from "@/components/switch/SwitchFAQ";
import SwitchReportFormEmbed from "@/components/switch/SwitchReportFormEmbed";
import SwitchPrimaryCTA from "@/components/switch/SwitchPrimaryCTA";
import SwitchStickyCTA from "@/components/switch/SwitchStickyCTA";
import WaveDivider from "@/components/switch/deco/WaveDivider";

export default function SwitchLitePage() {
  const handleApply = () => {
    setTimeout(() => {
      document
        .getElementById("contact-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <>
      <SwitchHeader />
      <main>
        <SwitchHero />
        <WaveDivider fromColor="#2d2d2d" toColor="#167b81" withDots />

        <SwitchSimulator onApply={handleApply} />
        <WaveDivider fromColor="#167b81" toColor="#ffffff" />

        <SwitchPainPoints />

        <SwitchPrimaryCTA />

        <SwitchServices />

        <SwitchPrimaryCTA title="どんなサービスなのか気になった方へ" />

        <SwitchComparison />

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

        <SwitchResults />

        <SwitchTestimonials />

        <SwitchPricing />

        <SwitchFlow />

        <SwitchFAQ />

        {/* §13 軽量フォーム — 連絡先のみ必須・物件情報は任意続行 */}
        <SwitchReportFormEmbed
          variant="lite"
          heading="まずはご相談だけでもどうぞ"
          leadCopy="お名前・メール・電話の30秒入力で、24時間以内に担当者からご連絡"
          subCopy="物件情報の入力は不要。お話を伺ってから、必要に応じてレポートをお作りします。無理な勧誘は致しません。"
        />

        <LpCompanyInfo />
      </main>
      <LpFooter />
      <SwitchStickyCTA />
    </>
  );
}
