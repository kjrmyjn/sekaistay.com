import type { Metadata } from "next";
import SwitchHeader from "@/components/switch/SwitchHeader";
import LpFooter from "@/components/switch/_shared/LpFooter";
import LpCompanyInfo from "@/components/switch/_shared/LpCompanyInfo";
import SwitchTestimonials from "@/components/switch/SwitchTestimonials";
import SwitchResults from "@/components/switch/SwitchResults";
import SwitchPricing from "@/components/switch/SwitchPricing";
import SwitchFAQ from "@/components/switch/SwitchFAQ";
import SwitchStickyCTA from "@/components/switch/SwitchStickyCTA";
import LpVariantForm from "@/components/switch/LpVariantForm";
import { HeroSocialProof } from "@/components/lp/Heroes";

export const metadata: Metadata = {
  title: "オーナー4名が手数料を半分以下にした理由 | SEKAI STAY",
  description: "代行手数料 20% → 8% へ切り替えたオーナーの声。年間100万円以上の改善事例多数。",
  robots: { index: false, follow: false },
};

export default function SocialProofPage() {
  return (
    <>
      <SwitchHeader />
      <main>
        <HeroSocialProof />
        <SwitchTestimonials />
        <SwitchResults />
        <SwitchPricing />
        <SwitchFAQ />
        <LpVariantForm
          lpVariant="social-proof"
          heading="あなたも切り替えませんか"
          leadCopy="オーナー様と同じ条件で診断 ・ 60秒入力で24時間以内にレポート"
          subCopy="無理な勧誘は致しません。レポートをご覧いただいた後、必要に応じてお話を伺います。"
        />
        <LpCompanyInfo />
      </main>
      <LpFooter />
      <SwitchStickyCTA />
    </>
  );
}
