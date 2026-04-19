"use client";

import { useScrollFade } from "@/hooks/useScrollFade";
import HighlightMarker from "./deco/HighlightMarker";
import SectionHead from "./deco/SectionHead";

const steps = [
  {
    step: "STEP 1",
    title: "無料診断を申し込む",
    duration: "30秒",
    description: "フォームから物件情報を入力するだけ。30秒で完了します。",
  },
  {
    step: "STEP 2",
    title: "物件確認・収益シミュレーション",
    duration: "3〜5日",
    description:
      "物件を確認し、収益予測と最適な運営プランをご提案。納得いただけなければ、ここで終了してOKです。",
  },
  {
    step: "STEP 3",
    title: "契約・運営開始",
    duration: "1〜2週間",
    description:
      "契約後、OTA掲載の最適化と運営体制の構築を行い、最短2週間で運営をスタートします。",
  },
];

// STEP 3「最短2週間」の内訳（信頼性の裏付け）
const step3Breakdown = [
  { days: "0〜2日", task: "契約書締結・OTAアカウント連携" },
  { days: "3〜7日", task: "OTA掲載の写真・文章・価格を最適化" },
  { days: "8〜10日", task: "清掃パートナー手配・運営体制構築" },
  { days: "11〜14日", task: "並行運用で予約を途切れなく引き継ぎ" },
];

export default function SwitchFlow() {
  const ref = useScrollFade();

  return (
    <section className="py-16 sm:py-20 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="fade-in mb-14">
          <SectionHead
            enLabel="契約の流れ"
            jaTitle={<><HighlightMarker>最短2週間</HighlightMarker>で切り替え完了。</>}
            subtitle="他社からの引き継ぎもお任せ。既存の予約・ゲスト対応も途切れなく移行します。"
          />
        </div>

        <div className="stagger relative">
          <div className="absolute left-[2.25rem] top-0 bottom-0 w-1 bg-gradient-to-b from-switch-teal via-switch-teal-bright to-switch-teal-deep hidden sm:block" />

          <div className="space-y-10">
            {steps.map((s, i) => (
              <div key={i} className="fade-in flex gap-4 sm:gap-6 items-start relative">
                <div className="relative z-10 w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-switch-teal to-switch-teal-deep rounded-full flex items-center justify-center shrink-0 shadow">
                  <span className="text-white font-bold text-xl sm:text-3xl">
                    {i + 1}
                  </span>
                </div>
                <div className="pt-2 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-switch-teal tracking-widest">
                      {s.step}
                    </span>
                    <span className="text-xs bg-gradient-to-r from-switch-teal-tint to-white border border-switch-teal/30 text-switch-teal-deep px-3 py-1 rounded-full font-bold">
                      {s.duration}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-switch-charcoal mb-2 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-base text-switch-gray-dark leading-normal">
                    {s.description}
                  </p>
                  {/* STEP 3 のみ、2週間の内訳を表示 */}
                  {i === 2 && (
                    <div className="mt-4 bg-switch-cloud rounded-md p-4 sm:p-5 border border-switch-gray-light/60">
                      <p className="text-[11px] text-switch-teal font-bold tracking-widest mb-3">
                        2週間の内訳
                      </p>
                      <ul className="space-y-2">
                        {step3Breakdown.map((b) => (
                          <li key={b.days} className="flex items-start gap-3 text-sm">
                            <span className="inline-block min-w-[4.5rem] text-switch-teal font-bold tabular-nums">
                              {b.days}
                            </span>
                            <span className="text-switch-charcoal">{b.task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
