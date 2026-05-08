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
import SwitchPainPoints from "@/components/switch/SwitchPainPoints";
import SwitchServices from "@/components/switch/SwitchServices";
import SwitchTestimonials from "@/components/switch/SwitchTestimonials";
import SwitchComparison from "@/components/switch/SwitchComparison";
import SwitchSimulator from "@/components/switch/SwitchSimulator";
import SwitchPricing from "@/components/switch/SwitchPricing";
import SwitchFlow from "@/components/switch/SwitchFlow";
import SwitchFAQ from "@/components/switch/SwitchFAQ";
import LpVariantForm from "@/components/switch/LpVariantForm";
import PageViewTracker from "@/components/switch/PageViewTracker";

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

        {/* §3 共感（オーナーが抱える痛み） */}
        <SwitchPainPoints />

        {/* §4 サービス内容 */}
        <SwitchServices />

        {/* §5 オーナー様の声（信頼の積み上げ） */}
        <SwitchTestimonials />

        {/* §6 他社比較 */}
        <SwitchComparison />

        {/* §7 シミュレーター（数字は中盤後半に） */}
        <SwitchSimulator onApply={handleApply} />

        {/* §8 料金 */}
        <SwitchPricing />

        {/* §9 ご利用の流れ */}
        <SwitchFlow />

        {/* §10 FAQ */}
        <SwitchFAQ />

        {/* §11 フォーム — 副 CTA（メインの CTA は Hero/Story の代表面談） */}
        <LpVariantForm
          lpVariant="switch-founder"
          heading="まずは話を聞きたい方へ"
          leadCopy="30秒入力で代表との 30 分無料面談を予約 ・ 24時間以内にご返信"
          subCopy="物件情報の入力は不要。代表の劉が直接お話を伺ってから、必要な資料・診断レポートをお送りします。"
        />

        {/* §12 会社概要 */}
        <LpCompanyInfo />
      </main>
      <LpFooter />
      {/* SwitchStickyCTA は意図的に未配置 — 信頼系の落ち着いた世界観を保つ */}
    </>
  );
}
