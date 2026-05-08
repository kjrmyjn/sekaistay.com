"use client";

import SwitchHeader from "@/components/switch/SwitchHeader";
import LpFooter from "@/components/switch/_shared/LpFooter";
import LpCompanyInfo from "@/components/switch/_shared/LpCompanyInfo";
import SwitchSimulator from "@/components/switch/SwitchSimulator";
import SwitchPricing from "@/components/switch/SwitchPricing";
import SwitchFAQ from "@/components/switch/SwitchFAQ";
import SwitchStickyCTA from "@/components/switch/SwitchStickyCTA";
import LpVariantForm from "@/components/switch/LpVariantForm";
import { HeroSavings } from "@/components/lp/Heroes";

export default function HeroSavingsPage() {
  const handleApply = () => {
    setTimeout(() => {
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };
  return (
    <>
      <SwitchHeader />
      <main>
        <HeroSavings />
        <SwitchSimulator onApply={handleApply} />
        <LpVariantForm
          lpVariant="hero-savings"
          heading="算出結果をレポート化"
          leadCopy="シミュレーター結果を踏まえて、物件専用の改善ロードマップをお送りします"
          subCopy="60秒入力 ・ 24時間以内にメールで詳細レポート受領"
        />
        <SwitchPricing />
        <SwitchFAQ />
        <LpCompanyInfo />
      </main>
      <LpFooter />
      <SwitchStickyCTA />
    </>
  );
}
