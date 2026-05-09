"use client";

/* /switch/founder — 信頼主導 (人・創業者型) LP
 * 仮説: スイッチング先選定では「会社」より「人」を見る層がいる。商談化率が上がる。
 * 数字は控えめ・語りかけ調・代表写真ファースト・代表面談 CTA を主にする。
 */

import LpFooter from "@/components/switch/_shared/LpFooter";
import LpCompanyInfo from "@/components/switch/_shared/LpCompanyInfo";
import SwitchHeader from "@/components/switch/SwitchHeader";
import SwitchHeroFounder from "@/components/switch/SwitchHeroFounder";
import SwitchFounderStory from "@/components/switch/SwitchFounderStory";
import SwitchServices from "@/components/switch/SwitchServices";
import SwitchComparison from "@/components/switch/SwitchComparison";
import SwitchSimulator from "@/components/switch/SwitchSimulator";
import SwitchPricing from "@/components/switch/SwitchPricing";
import SwitchFlow from "@/components/switch/SwitchFlow";
import SwitchFAQ from "@/components/switch/SwitchFAQ";
import LpVariantForm from "@/components/switch/LpVariantForm";
import PageViewTracker from "@/components/switch/PageViewTracker";
import EngagementTracker from "@/components/EngagementTracker";
import SwitchStickyCTA from "@/components/switch/SwitchStickyCTA";

export default function SwitchFounderPage() {
  const handleApply = () => {
    setTimeout(() => {
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <>
      <PageViewTracker lpVariant="switch-founder" />
      <EngagementTracker lpVariant="switch-founder" />
      <SwitchHeader />
      <main>
        {/* §1 Hero — 創業者2名 + 語りかけ宣言 */}
        <div data-track-section="hero">
          <SwitchHeroFounder />
        </div>

        {/* §2 ストーリー（新規）「なぜ作ったか」 */}
        <div data-track-section="founder-story">
          <SwitchFounderStory />
        </div>

        {/* §3 料金（ストーリー直後に配置 — 哲学の即時可視化） */}
        <div data-track-section="pricing">
          <SwitchPricing />
        </div>

        {/* §4 サービス内容 */}
        <div data-track-section="services">
          <SwitchServices />
        </div>

        {/* §5 他社比較 */}
        <div data-track-section="comparison">
          <SwitchComparison />
        </div>

        {/* §7 シミュレーター（数字は中盤後半に） */}
        <div data-track-section="simulator">
          <SwitchSimulator onApply={handleApply} />
        </div>

        {/* §8 ご利用の流れ */}
        <div data-track-section="flow">
          <SwitchFlow />
        </div>

        {/* §9 FAQ */}
        <div data-track-section="faq">
          <SwitchFAQ />
        </div>

        {/* §10 フォーム — 副 CTA */}
        <div data-track-section="form">
          <LpVariantForm
            lpVariant="switch-founder"
            heading="まずはご相談だけでもどうぞ"
            leadCopy="24時間以内に担当者からご連絡"
            subCopy="30秒入力で無料面談を予約。無料レポートをお送り致します。"
          />
        </div>

        {/* §11 会社概要 */}
        <LpCompanyInfo />
      </main>
      <LpFooter />
      {/* 右下の追従 CTA：「45分の無料面談」（バリアント別ラベルは useSwitchCtaLabels で出し分け） */}
      <SwitchStickyCTA />
    </>
  );
}
