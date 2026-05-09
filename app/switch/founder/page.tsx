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
import SwitchTestimonials from "@/components/switch/SwitchTestimonials";
import SwitchComparison from "@/components/switch/SwitchComparison";
import SwitchSimulator from "@/components/switch/SwitchSimulator";
import SwitchPricing from "@/components/switch/SwitchPricing";
import SwitchFlow from "@/components/switch/SwitchFlow";
import SwitchFAQ from "@/components/switch/SwitchFAQ";
import LpVariantForm from "@/components/switch/LpVariantForm";
import PageViewTracker from "@/components/switch/PageViewTracker";
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
      <SwitchHeader />
      <main>
        {/* §1 Hero — 創業者2名 + 語りかけ宣言 */}
        <SwitchHeroFounder />

        {/* §2 ストーリー（新規）「なぜ作ったか」 */}
        <SwitchFounderStory />

        {/* §3 料金（ストーリー直後に配置 — 哲学の即時可視化） */}
        <SwitchPricing />

        {/* §4 サービス内容 */}
        <SwitchServices />

        {/* §5 オーナー様の声（信頼の積み上げ） */}
        <SwitchTestimonials />

        {/* §6 他社比較 */}
        <SwitchComparison />

        {/* §7 シミュレーター（数字は中盤後半に） */}
        <SwitchSimulator onApply={handleApply} />

        {/* §8 ご利用の流れ */}
        <SwitchFlow />

        {/* §9 FAQ */}
        <SwitchFAQ />

        {/* §10 フォーム — 副 CTA（メインの CTA は Hero/Story の代表面談） */}
        <LpVariantForm
          lpVariant="switch-founder"
          heading="まずはご相談だけでもどうぞ"
          leadCopy="24時間以内に担当者からご連絡"
          subCopy="30秒入力で無料面談を予約。無料レポートをお送り致します。"
        />

        {/* §11 会社概要 */}
        <LpCompanyInfo />
      </main>
      <LpFooter />
      {/* 右下の追従 CTA：「45分の無料面談」（バリアント別ラベルは useSwitchCtaLabels で出し分け） */}
      <SwitchStickyCTA />
    </>
  );
}
