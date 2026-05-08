"use client";

/* /switch/founder 専用「なぜこのサービスを作ったのか」セクション。
 * Hero の語りかけを継承し、ストーリーで信頼を積み上げる。
 */

import { useScrollFade } from "@/hooks/useScrollFade";

export default function SwitchFounderStory() {
  const ref = useScrollFade();
  return (
    <section ref={ref} className="py-16 sm:py-24 bg-ivory">
      <div className="max-w-3xl mx-auto px-6">
        <div className="fade-in">
          <p className="text-[11px] tracking-[0.4em] text-deep-teal/80 font-medium uppercase mb-3 text-center">
            Why We Built This
          </p>
          <h2 className="text-center text-[24px] sm:text-[34px] lg:text-[40px] font-bold tracking-tight text-ink leading-[1.3] mb-12 sm:mb-14">
            なぜ、このサービスを作ったのか。
          </h2>

          <div className="space-y-6 text-[14px] sm:text-[15px] lg:text-[16px] leading-[2] text-ink/75 tracking-wide">
            <p>
              3年前、知り合いの民泊オーナーから「代行に騙された」と相談を受けたのがきっかけでした。
              手数料20%、月額固定費 ¥30,000、清掃も人材紹介料も別。
              実際に手元に残るのは想定の半分以下。にもかかわらず、運用の中身は何ひとつ見えない。
            </p>
            <p>
              業界平均15-25%という手数料率は、相場というより「<strong className="text-ink">情報の非対称性で成立してきた価格</strong>」だと気づきました。
              テクノロジーと運用設計の見直しで、半額にできるはずでした。
            </p>
            <p>
              ——だから僕たちは、<strong className="text-deep-teal">手数料 8% + 月額1万円</strong>。
              そして<strong className="text-ink">オーナー専用のダッシュボード</strong>で、運用の中身をぜんぶ可視化しました。
              「お任せください」じゃなくて、「<strong className="text-ink">いつでも見られます</strong>」をプロダクトの軸に据えています。
            </p>
            <p>
              代行を切り替えるのは、心理的にもオペレーション的にもコストが高い決断です。
              だからこそ、初回は<strong className="text-ink">代表である僕（劉）が、必ず直接お話します</strong>。
              判断材料が揃ってから、無理なく進められるようにご案内します。
            </p>
            <p className="text-right text-[13px] text-ink/55 italic">
              — 代表取締役 CEO 劉 添毅
            </p>
          </div>

          {/* セクション末の控えめな CTA */}
          <div className="mt-12 sm:mt-14 pt-8 border-t border-rule text-center">
            <p className="text-[13px] text-ink/60 mb-4">
              30分、お話だけ聞いてみたい方へ。
            </p>
            <a
              href="https://timerex.net/s/sekai-stay/d61b424d"
              target="_blank"
              rel="noreferrer"
              data-cta="founder-meeting"
              data-cta-label="founder-story-cta"
              className="inline-flex items-center gap-2 text-[14px] sm:text-[15px] font-bold text-deep-teal hover:text-ink transition-colors underline underline-offset-4 decoration-deep-teal/30 hover:decoration-ink"
            >
              代表との 30 分無料面談を予約する →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
