"use client";

/* ─────────────────────────────────────────────────────────────
 * /switch — sekaistay.com のネイティブ実装（社内LPを完全移植）
 *
 * 以前は sekaistay-lp.vercel.app を iframe でミラーしていたが、
 * SEO・LCP・保守性のため sekaistay.com 本体に直接統合。
 * 色クラスは `switch-` プレフィックス版に置換済み（色衝突回避）。
 * ───────────────────────────────────────────────────────────── */

import LpFooter from "@/components/switch/_shared/LpFooter";
import LpCompanyInfo from "@/components/switch/_shared/LpCompanyInfo";
import SwitchHeader from "@/components/switch/SwitchHeader";
import SwitchHero from "@/components/switch/SwitchHero";
import SwitchSimulator from "@/components/switch/SwitchSimulator";
import SwitchPainPoints from "@/components/switch/SwitchPainPoints";
import SwitchServices from "@/components/switch/SwitchServices";
import SwitchComparison from "@/components/switch/SwitchComparison";
import SwitchResults from "@/components/switch/SwitchResults";
import SwitchTestimonials from "@/components/switch/SwitchTestimonials";
import SwitchPricing from "@/components/switch/SwitchPricing";
import SwitchFlow from "@/components/switch/SwitchFlow";
import SwitchFAQ from "@/components/switch/SwitchFAQ";
import SwitchReportFormEmbed from "@/components/switch/SwitchReportFormEmbed";
import SwitchPrimaryCTA from "@/components/switch/SwitchPrimaryCTA";
import SwitchStickyCTA from "@/components/switch/SwitchStickyCTA";
import WaveDivider from "@/components/switch/deco/WaveDivider";

export default function SwitchPage() {
  const handleApply = () => {
    setTimeout(() => {
      document
        .getElementById("contact-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <>
      <SwitchHeader />
      <main>
        {/* §1 Hero */}
        <SwitchHero />
        <WaveDivider fromColor="#2d2d2d" toColor="#167b81" withDots />

        {/* §2 簡易診断 */}
        <SwitchSimulator onApply={handleApply} />
        <WaveDivider fromColor="#167b81" toColor="#ffffff" />

        {/* §3 共感ストーリー（松本さん・悩み） */}
        <SwitchPainPoints />

        {/* MidCTA① — 共感 → プライマリCTA（濃紺ヒーロー） */}
        <SwitchPrimaryCTA />

        {/* §4 サービス内容 */}
        <SwitchServices />

        {/* MidCTA② — 機能 → プライマリCTA（同デザイン） */}
        <SwitchPrimaryCTA title="どんなサービスなのか気になった方へ" />

        {/* §5 他社比較 */}
        <SwitchComparison />

        {/* MidCTA③ — 差分 → PrimaryCTA（同デザイン + 数値比較） */}
        <SwitchPrimaryCTA
          title="他社との手数料差は、あなたの物件だと…"
          compareStat={{
            leftLabel: "松本さんの場合（手数料20%）",
            leftValue: 1440000,
            leftSuffix: "/ 年",
            rightLabel: "SEKAI STAY（手数料8%）",
            rightValue: 696000,
            rightSuffix: "/ 年",
            diffLabel: "年間差額",
            diffValue: 744000,
            diffSuffix: "/ 年",
            note: "※ 1部屋想定・月額固定費 ¥10,000/部屋 込みで試算",
          }}
        />

        {/* §7 実績 */}
        <SwitchResults />

        {/* §8 オーナー様の声（松本さん・乗り換え後） */}
        <SwitchTestimonials />

        {/* §9 料金 */}
        <SwitchPricing />

        {/* §10 ご利用の流れ */}
        <SwitchFlow />

        {/* §11 FAQ */}
        <SwitchFAQ />

        {/* §13 無料診断フォーム（japanvillas のレポート申請フォームを iframe 埋め込み） */}
        <SwitchReportFormEmbed />

        {/* §14 会社概要 */}
        <LpCompanyInfo />
      </main>
      <LpFooter />
      <SwitchStickyCTA />
    </>
  );
}
