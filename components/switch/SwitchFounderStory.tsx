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
              3年前、<span className="font-bold text-ink">私たち自身も民泊のオーナーとして</span>、代行業者に物件を任せていました。
              <span className="font-bold text-ink">手数料20%、月額固定費 ¥20,000</span>。手元に残るのは、<span className="font-bold text-ink">売上の半分以下</span>でした。運用の中身は<span className="font-bold text-ink">完全にブラックボックス</span>で、届くレポートは<span className="font-bold text-ink">月1回のPDFだけ</span>。
            </p>
            <p>
              業界平均15〜25%という手数料率は、相場というより<mark className="bg-deep-teal/10 text-deep-teal font-bold px-1 rounded-sm">「情報の非対称性で成立してきた価格」</mark>だと気づきました。テクノロジーと運用設計を一から組み直せば、<span className="font-bold text-deep-teal">業界平均の半額ほど</span>にできる確信がありました。
            </p>
            <p>
              ──だから私たちは、<mark className="bg-deep-teal/10 text-deep-teal font-bold px-1 rounded-sm">手数料 8% + 月額1万円</mark>。そして<span className="font-bold text-deep-teal">オーナー専用のダッシュボード</span>で、運用の中身を<span className="font-bold text-ink">ぜんぶ可視化</span>しました。
            </p>
            <p>
              「お任せください」ではなく、<mark className="bg-deep-teal/10 text-deep-teal font-bold px-1 rounded-sm">「いつでも見られます」</mark>をプロダクトの軸に据えています。
            </p>
            <p>
              切り替えてくださったオーナー様の中には、<span className="font-bold text-deep-teal">稼働率を 58% → 82%</span>、<span className="font-bold text-deep-teal">月売上を ¥45万 → ¥76万</span>に伸ばされた方もいます。<span className="font-bold text-ink">手数料は半額、成果はそれ以上</span>。これが SEKAI STAY のアプローチです。
            </p>
            <p>
              切り替えは、心理的にもオペレーション的にも、<span className="font-bold text-ink">重い決断</span>です。だからこそ、<span className="font-bold text-deep-teal">入り口は軽く</span>しました。
            </p>
            <p>
              <mark className="bg-deep-teal/10 text-deep-teal font-bold px-1 rounded-sm">初期費用 ¥0（期間限定）</mark>、<mark className="bg-deep-teal/10 text-deep-teal font-bold px-1 rounded-sm">解約金 ¥0</mark>。
            </p>
            <p>
              最低契約期間は <span className="font-bold text-ink">6ヶ月</span>だけお願いしています──運用の真価が数字に表れるには、それくらいの時間が必要だからです。<mark className="bg-deep-teal/10 text-deep-teal font-bold px-1 rounded-sm">「合わなければやめられる、ただし試す価値のある時間だけは確保したい」</mark>という線引きです。
            </p>
            <p>
              初回のご相談では、専門家が丁寧にお話を伺います。<span className="font-bold text-ink">営業はしません</span>。運用が変わって、結果としてお付き合いが続いたら嬉しい。それくらいのスタンスで、お会いできればと思っています。
            </p>
            <p className="text-right text-[13px] text-ink/55 italic">
              ── 劉 添毅・明神 洸次郎
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
              className="group inline-flex items-center justify-center bg-switch-accent hover:bg-switch-accent-hover text-white font-bold text-[14px] sm:text-[15px] px-7 sm:px-9 py-3.5 sm:py-4 rounded-md transition-colors duration-300 shadow-md tracking-wide"
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
