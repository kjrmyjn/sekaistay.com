"use client";

import SwitchHeader from "@/components/switch/SwitchHeader";
import LpFooter from "@/components/switch/_shared/LpFooter";
import LpCompanyInfo from "@/components/switch/_shared/LpCompanyInfo";
import SwitchSimulator from "@/components/switch/SwitchSimulator";
import SwitchServices from "@/components/switch/SwitchServices";
import SwitchComparison from "@/components/switch/SwitchComparison";
import SwitchTestimonials from "@/components/switch/SwitchTestimonials";
import SwitchPricing from "@/components/switch/SwitchPricing";
import SwitchFAQ from "@/components/switch/SwitchFAQ";
import SwitchPrimaryCTA from "@/components/switch/SwitchPrimaryCTA";
import SwitchStickyCTA from "@/components/switch/SwitchStickyCTA";
import LpVariantForm from "@/components/switch/LpVariantForm";
import { HeroUrgency, UrgencyBanner } from "@/components/lp/Heroes";

export default function UrgencyLimitedPage() {
  const handleApply = () => {
    setTimeout(() => {
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };
  return (
    <>
      <UrgencyBanner />
      <SwitchHeader />
      <main>
        <HeroUrgency />
        <SwitchSimulator onApply={handleApply} />
        <SwitchServices />
        <SwitchPrimaryCTA title="残り枠を確認して申込む" />
        <SwitchComparison />
        <SwitchTestimonials />
        <SwitchPricing />
        <SwitchFAQ />
        <LpVariantForm
          lpVariant="urgency-limited"
          heading="残り枠を確認・無料診断申込み"
          leadCopy="先着10物件・初期費用 0 円キャンペーン適用 (5月末まで)"
          subCopy="60秒入力 ・ 24時間以内に診断レポート + キャンペーン適用可否をお返事します"
        />
        <LpCompanyInfo />
      </main>
      <LpFooter />
      <SwitchStickyCTA />
    </>
  );
}
