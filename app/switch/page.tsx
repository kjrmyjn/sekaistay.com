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

        {/* §13 お問い合わせフォーム（連絡先先取り型 lite に統一）
            japanvillas /report-request-lite を iframe 埋め込み。
            物件URL/売上等の詳細入力は送信後の任意続行で取得する。 */}
        <SwitchReportFormEmbed
          variant="lite"
          heading="まずはご相談だけでもどうぞ"
          leadCopy="お名前・メール・電話の30秒入力で、24時間以内に担当者からご連絡"
          subCopy="物件情報の入力は不要。お話を伺ってから、必要に応じてレポートをお作りします。無理な勧誘は致しません。"
        />

        {/* §14 会社概要 */}
        <LpCompanyInfo />
      </main>
      <LpFooter />
      <SwitchStickyCTA />
    </>
  );
}
