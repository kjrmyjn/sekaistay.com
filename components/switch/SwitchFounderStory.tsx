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
              3年前、ある民泊オーナーの方から「20%の手数料を払い続けているのに、毎月の運用判断が一切見えない」とご相談を受けたのがきっかけでした。
              手数料20%、月額固定費 ¥30,000、清掃も人材紹介料も別。
              実際に手元に残るのは想定の半分以下。にもかかわらず、運用の中身は完全にブラックボックスでした。
            </p>
            <p>
              業界平均15-25%という手数料率は、相場というより「<strong className="text-ink">情報の非対称性で成立してきた価格</strong>」だと気づきました。
              テクノロジーと運用設計の見直しで、半額にできるはずでした。
            </p>
            <p>
              ——だから私たちは、<strong className="text-deep-teal">手数料 8% + 月額1万円</strong>。
              そして<strong className="text-ink">オーナー専用のダッシュボード</strong>で、運用の中身をぜんぶ可視化しました。
              「お任せください」じゃなくて、「<strong className="text-ink">いつでも見られます</strong>」をプロダクトの軸に据えています。
            </p>
            <p>
              切り替えてくださったオーナー様の中には、
              <strong className="text-ink">稼働率を 58% → 82%</strong>、
              <strong className="text-ink">月売上を 45万円 → 76万円</strong>に伸ばした事例もあります。
              手数料を下げるだけでなく、運用の質そのものを引き上げて利益を伸ばしています。
            </p>
            <p>
              さらに、<strong className="text-deep-teal">初期費用は期間限定で ¥0</strong>、
              <strong className="text-deep-teal">解約金も ¥0</strong>。
              「合わなければやめられる」前提で、運用の手応えをご自身で確かめていただけます。
              <span className="block text-[12px] text-ink/45 mt-1">※最低契約期間 6ヶ月</span>
            </p>
            <p>
              切り替えは心理的にもオペレーション的にもコストが高い決断です。
              だからこそ、初回は<strong className="text-ink">専門チームが、丁寧にお話を伺います</strong>。
              判断材料が揃ってから、無理なく進められるようにご案内します。
            </p>
            <p className="text-right text-[13px] text-ink/55 italic">
              — 株式会社セカイチ
            </p>
          </div>

          {/* セクション末の CTA — ボタン化 */}
          <div className="mt-12 sm:mt-14 pt-8 border-t border-rule text-center">
            <p className="text-[13px] text-ink/60 mb-4">
              45分、お話だけ聞いてみたい方へ。
            </p>
            <a
              href="https://timerex.net/s/sekai-stay/d61b424d"
              target="_blank"
              rel="noreferrer"
              data-cta="founder-meeting"
              data-cta-label="founder-story-cta"
              className="group inline-flex items-center justify-center bg-deep-teal text-white font-bold text-[14px] sm:text-[15px] px-7 sm:px-9 py-3.5 sm:py-4 rounded-md hover:bg-ink transition-colors duration-300 shadow-md tracking-wide"
            >
              45 分無料面談を予約する
              <svg className="ml-2.5 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
