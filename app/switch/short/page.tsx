"use client";

/* ─────────────────────────────────────────────────────────────
 * /switch/short — Control の短縮版（D variant）
 *
 * 仮説: 認知負荷を下げて即予約に振り切ると CVR が上がる。
 * Control 比で削除: PainPoints / MidCTA①②③ / Simulator / Services / Flow
 * Hero CTA は「45分の無料面談」(Timerex) に差し替え。
 * ───────────────────────────────────────────────────────────── */

import LpFooter from "@/components/switch/_shared/LpFooter";
import LpCompanyInfo from "@/components/switch/_shared/LpCompanyInfo";
import SwitchHeader from "@/components/switch/SwitchHeader";
import SwitchHero from "@/components/switch/SwitchHero";
import SwitchComparison from "@/components/switch/SwitchComparison";
import SwitchResults from "@/components/switch/SwitchResults";
import SwitchTestimonials from "@/components/switch/SwitchTestimonials";
import SwitchPricing from "@/components/switch/SwitchPricing";
import SwitchFAQ from "@/components/switch/SwitchFAQ";
import LpVariantForm from "@/components/switch/LpVariantForm";
import SwitchStickyCTA from "@/components/switch/SwitchStickyCTA";
import WaveDivider from "@/components/switch/deco/WaveDivider";
import PageViewTracker from "@/components/switch/PageViewTracker";

export default function SwitchShortPage() {
  return (
    <>
      <PageViewTracker lpVariant="switch-short" />
      <SwitchHeader />
      <main>
        {/* §1 Hero — CTA を「45分の無料面談」(Timerex) に差し替え */}
        <SwitchHero ctaMode="meeting" />
        <WaveDivider fromColor="#2d2d2d" toColor="#ffffff" withDots />

        {/* §2 他社比較 */}
        <SwitchComparison />

        {/* §3 実績 */}
        <SwitchResults />

        {/* §4 オーナー様の声 */}
        <SwitchTestimonials />

        {/* §5 料金 */}
        <SwitchPricing />

        {/* §6 FAQ */}
        <SwitchFAQ />

        {/* §7 お問い合わせフォーム */}
        <LpVariantForm
          lpVariant="switch-short"
          heading="まずはご相談だけでもどうぞ"
          leadCopy="物件診断レポート無料作成"
          subCopy={<>たったの<strong className="font-bold text-white">&quot;3項目&quot;</strong>で、1営業日以内にメールで専用レポートをお届けします。</>}
        />

        {/* §8 会社概要 */}
        <LpCompanyInfo />
      </main>
      <LpFooter />
      <SwitchStickyCTA />
    </>
  );
}
