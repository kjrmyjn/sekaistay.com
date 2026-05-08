import type { Metadata } from "next";
import SwitchHeader from "@/components/switch/SwitchHeader";
import LpFooter from "@/components/switch/_shared/LpFooter";
import LpCompanyInfo from "@/components/switch/_shared/LpCompanyInfo";
import SwitchPricing from "@/components/switch/SwitchPricing";
import LpVariantForm from "@/components/switch/LpVariantForm";
import { HeroUltraShort } from "@/components/lp/Heroes";

export const metadata: Metadata = {
  title: "民泊代行 8% | SEKAI STAY",
  description: "民泊運用代行を 8% + 月1万円/物件で。AI で運営、人で対応。",
  robots: { index: false, follow: false },
};

export default function UltraShortPage() {
  return (
    <>
      <SwitchHeader />
      <main>
        <HeroUltraShort />
        <SwitchPricing />
        <LpVariantForm
          lpVariant="ultra-short"
          heading="60秒で申込み"
          leadCopy="名前・メール・電話 + 物件URL のみ"
          subCopy="その場で年間損失額を算出・24時間以内に診断レポート送付"
        />
        <LpCompanyInfo />
      </main>
      <LpFooter />
    </>
  );
}
