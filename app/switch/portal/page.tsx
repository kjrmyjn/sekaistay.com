"use client";

/* /switch/portal — ポータル主導訴求 LP
 * 仮説: 民泊オーナーの本質的苦痛は「不透明さ」。可視化が動機。
 * Hero でダッシュボード推し → Comparison のダッシュボード行を上に → Testimonials を「数字が見える」系に差替え → Simulator は中盤に降格
 */

import LpFooter from "@/components/switch/_shared/LpFooter";
import LpCompanyInfo from "@/components/switch/_shared/LpCompanyInfo";
import SwitchHeader from "@/components/switch/SwitchHeader";
import SwitchHeroPortal from "@/components/switch/SwitchHeroPortal";
import SwitchPainPoints from "@/components/switch/SwitchPainPoints";
import SwitchServices from "@/components/switch/SwitchServices";
import SwitchComparison from "@/components/switch/SwitchComparison";
import SwitchSimulator from "@/components/switch/SwitchSimulator";
import SwitchResults from "@/components/switch/SwitchResults";
import SwitchPricing from "@/components/switch/SwitchPricing";
import SwitchFlow from "@/components/switch/SwitchFlow";
import SwitchFAQ from "@/components/switch/SwitchFAQ";
import SwitchPrimaryCTA from "@/components/switch/SwitchPrimaryCTA";
import SwitchStickyCTA from "@/components/switch/SwitchStickyCTA";
import LpVariantForm from "@/components/switch/LpVariantForm";
import PortalTestimonials from "@/components/switch/PortalTestimonials";
import PageViewTracker from "@/components/switch/PageViewTracker";
import WaveDivider from "@/components/switch/deco/WaveDivider";

export default function SwitchPortalPage() {
  const handleApply = () => {
    setTimeout(() => {
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <>
      <PageViewTracker lpVariant="switch-portal" />
      <SwitchHeader />
      <main>
        {/* §1 Hero — ダッシュボード主役 */}
        <SwitchHeroPortal />
        <WaveDivider fromColor="#2d2d2d" toColor="#ffffff" withDots />

        {/* §3 共感ストーリー（不透明さの痛み） */}
        <SwitchPainPoints />

        {/* MidCTA */}
        <SwitchPrimaryCTA title="ダッシュボードのデモを見る" />

        {/* §4 サービス内容（並び替えは中で行うのが理想だが、まずはコンポーネント単位で配置） */}
        <SwitchServices />

        {/* §5 他社比較（Comparison のダッシュボード行は SwitchComparison 内で並び替え推奨） */}
        <SwitchComparison />

        {/* §6 損失シミュレーター — 中盤に降格（control では §2 だったのを §6 へ） */}
        <SwitchSimulator onApply={handleApply} />

        {/* MidCTA */}
        <SwitchPrimaryCTA title="数字が見える運営に切り替える" />

        {/* §7 実績 */}
        <SwitchResults />

        {/* §8 オーナー様の声 — Portal専用差し替え版 */}
        <PortalTestimonials />

        {/* §9 料金 */}
        <SwitchPricing />

        {/* §10 ご利用の流れ */}
        <SwitchFlow />

        {/* §11 FAQ */}
        <SwitchFAQ />

        {/* §13 フォーム */}
        <LpVariantForm
          lpVariant="switch-portal"
          heading="まずはご相談だけでもどうぞ"
          leadCopy="24時間以内に担当者からご連絡"
          subCopy="30秒入力で無料面談を予約。24時間後までに無料レポートをお送り致します。"
        />

        {/* §14 会社概要 */}
        <LpCompanyInfo />
      </main>
      <LpFooter />
      <SwitchStickyCTA />
    </>
  );
}
