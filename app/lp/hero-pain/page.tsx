import type { Metadata } from "next";
import SwitchHeader from "@/components/switch/SwitchHeader";
import LpFooter from "@/components/switch/_shared/LpFooter";
import LpCompanyInfo from "@/components/switch/_shared/LpCompanyInfo";
import SwitchPainPoints from "@/components/switch/SwitchPainPoints";
import SwitchServices from "@/components/switch/SwitchServices";
import SwitchTestimonials from "@/components/switch/SwitchTestimonials";
import SwitchPricing from "@/components/switch/SwitchPricing";
import SwitchStickyCTA from "@/components/switch/SwitchStickyCTA";
import LpVariantForm from "@/components/switch/LpVariantForm";
import { HeroPain } from "@/components/lp/Heroes";

export const metadata: Metadata = {
  title: "「年間120万円、代行業者に消えてました」| SEKAI STAY",
  description: "ハズレ代行で取られていた年間損失。AI ネイティブ運営の SEKAI STAY なら手数料 8% で取り戻せます。",
  robots: { index: false, follow: false },
};

export default function HeroPainPage() {
  return (
    <>
      <SwitchHeader />
      <main>
        <HeroPain />
        <SwitchPainPoints />
        <SwitchServices />
        <SwitchTestimonials />
        <SwitchPricing />
        <LpVariantForm
          lpVariant="hero-pain"
          heading="あなたの損失額を診断"
          leadCopy="60秒入力で、24時間以内に物件専用の損失試算 + 改善レポートを送付"
          subCopy="無理な勧誘は致しません。レポートを見てから判断してください。"
        />
        <LpCompanyInfo />
      </main>
      <LpFooter />
      <SwitchStickyCTA />
    </>
  );
}
