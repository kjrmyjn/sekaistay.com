"use client";

/* /switch/portal Hero — ポータル主導訴求。
 * 仮説: オーナーの本質的な苦痛は「不透明さ」。可視化が動機。
 * 8% は副題に格下げ。ダッシュボードを画面の主役に。
 */

import { useEffect, useState } from "react";
import DotPattern from "./deco/DotPattern";

export default function SwitchHeroPortal() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(true), []);

  return (
    <section className="relative">
      {/* Top strip — control 同様の限定バー（ポータル系でも緊急性は維持） */}
      <div className="bg-gradient-to-r from-black via-[#1a1a1a] to-black text-white py-2.5 sm:py-3 px-3 sm:px-4 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.08),transparent_60%)] pointer-events-none" aria-hidden />
        <p className="relative flex items-center justify-center flex-wrap gap-x-2 gap-y-1 sm:gap-x-3 text-[11px] sm:text-base font-bold tracking-wide">
          <span className="inline-flex items-center gap-1 bg-gradient-to-br from-yellow-300 to-yellow-500 text-black text-[10px] sm:text-xs font-bold px-1.5 sm:px-2.5 py-0.5 rounded-sm shrink-0 shadow-[0_0_12px_rgba(251,191,36,0.4)] whitespace-nowrap">
            限定
          </span>
          <span className="text-white whitespace-nowrap">先着10オーナー</span>
          <span className="hidden sm:inline text-white/40">／</span>
          <span className="inline-flex items-center gap-1 text-white/90 whitespace-nowrap">
            初期費用
            <span className="text-white/40 line-through decoration-[1.5px]">¥10万円</span>
            <span aria-hidden className="text-white/50">→</span>
            <span className="text-yellow-400 font-bold text-[15px] sm:text-lg tracking-wider">¥0</span>
          </span>
        </p>
      </div>

      <div className="bg-switch-charcoal text-white relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-15%] w-[70%] h-[75%] bg-switch-teal-bright/22 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-15%] left-[-15%] w-[55%] h-[60%] bg-switch-teal/14 blur-[140px] rounded-full pointer-events-none" />
        <DotPattern opacity={0.04} />

        <div className="relative max-w-7xl mx-auto px-6 py-5 sm:py-8 lg:py-6 min-h-[calc(100svh-100px)] lg:min-h-[calc(100vh-100px)] flex items-center">
          <div
            className={`w-full transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* ===== Desktop layout (lg以上): 既存の 2列グリッド ===== */}
            <div className="hidden lg:block">
              <div className="grid lg:grid-cols-[0.85fr_1.3fr] gap-8 lg:gap-12 items-center">
                {/* 左: コピー（ポータル主導） */}
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-white/8 border border-switch-teal-bright/40 rounded-full px-3 py-1 mb-4 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 bg-switch-teal-bright rounded-full" aria-hidden />
                    <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-switch-teal-bright uppercase">
                      Owner Portal
                    </span>
                  </div>

                  <h1 className="font-bold leading-[1.18] mb-5 sm:mb-6 tracking-tight">
                    <span className="block text-[30px] sm:text-[40px] lg:text-[48px]">
                      あなたの物件、
                    </span>
                    <span className="block text-[30px] sm:text-[40px] lg:text-[48px] mt-1.5">
                      <span className="gradient-highlight-box">リアルタイム</span>で、
                    </span>
                    <span className="block text-[30px] sm:text-[40px] lg:text-[48px] mt-1.5">
                      ぜんぶ見える。
                    </span>
                  </h1>

                  <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-white/85 leading-relaxed mb-6 font-medium">
                    民泊代行に、
                    <span className="text-switch-teal-bright font-bold">透明性</span>を。
                  </p>

                  <p className="text-[13px] sm:text-[14px] text-white/60 leading-relaxed mb-7">
                    予約状況・売上・経費・清掃 — オーナー専用ダッシュボードで全数値が手元に。
                    <br className="hidden sm:block" />
                    「任せきり」から、「いつでも見れる」運営へ。
                  </p>

                  <div className="inline-flex items-baseline gap-2 mb-6 px-4 py-2.5 rounded-md bg-white/5 border border-white/10">
                    <span className="text-[11px] text-white/55 tracking-wider">しかも手数料は業界最安の</span>
                    <span className="text-[24px] sm:text-[28px] font-bold text-yellow-400 tabular-nums leading-none">8%</span>
                    <span className="text-[11px] text-white/55">+ ¥10,000/月</span>
                  </div>

                  <div className="flex flex-col lg:items-start items-center">
                    <a
                      href="#contact-form"
                      data-cta="contact-form"
                      data-cta-label="portal-primary"
                      className="group w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap bg-switch-accent text-white font-bold text-[15px] sm:text-lg px-4 sm:px-9 py-3.5 sm:py-4 rounded-md hover:bg-switch-accent-hover transition-all shadow hover:-translate-y-0.5 min-h-[48px]"
                    >
                      SEKAI STAYのデモ
                      <svg className="ml-2.5 w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                    <p className="text-[12px] text-white/55 mt-3 leading-relaxed">
                      入力60秒・24時間以内にレポート + デモログイン情報をお届け
                    </p>
                  </div>
                </div>

                {/* 右: ダッシュボード画像 */}
                <div className="flex flex-col items-center w-full">
                  <div className="relative flex justify-center items-center w-full min-h-[320px] sm:min-h-[440px] lg:min-h-[520px]">
                    <div
                      className="absolute inset-0 bg-switch-teal-bright/25 blur-[120px] rounded-full scale-95 pointer-events-none"
                      aria-hidden
                    />
                    <img
                      src="/images/switch/dashboard-mockup.png?v=v4"
                      alt="SEKAI STAY オーナーポータル ダッシュボード"
                      className="relative w-[88%] max-w-[420px] sm:max-w-[560px] lg:max-w-[680px] select-none pointer-events-none drop-shadow-2xl z-10"
                    />
                    <FloatingDataChip className="absolute top-4 left-2 sm:top-8 sm:left-[6%] lg:top-12 lg:left-[10%] z-20" label="新規予約" value="2件" trend="up" />
                    <FloatingDataChip className="absolute top-1 right-0 sm:top-2 sm:right-[-1%] lg:top-3 lg:right-[-3%] z-20" label="清掃完了" value="3/3" trend="ok" />
                    <FloatingDataChip className="absolute bottom-1 left-0 sm:bottom-4 sm:left-[-1%] lg:bottom-6 lg:left-[-3%] z-20" label="稼働率" value="74%" trend="up" />
                    <FloatingDataChip className="absolute bottom-6 right-2 sm:bottom-14 sm:right-[8%] lg:bottom-20 lg:right-[12%] z-20" label="ピーク売上" value="+18%" trend="up" />
                  </div>

                  <p className="text-[11px] sm:text-[12px] text-white/55 mt-3 sm:mt-4 text-center max-w-md tracking-wide leading-relaxed">
                    予約・売上・経費・清掃 — <span className="text-switch-teal-bright font-semibold">数字は全部、手元で動いてる。</span>
                  </p>
                </div>
              </div>

              {/* Trust ライン */}
              <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 pt-5 mt-6 border-t border-white/10">
                <Metric value="97" unit="%" label="継続率" />
                <Divider />
                <Metric value="4.8" unit="/5" label="満足度" />
                <Divider />
                <Metric value="61" unit="%" label="稼働率" />
                <Divider />
                <span className="text-[11px] text-white/75 font-bold tracking-wide">
                  住宅宿泊管理業 <span className="text-switch-teal-bright">第F05780号</span>
                </span>
              </div>
              <p className="text-[10px] text-white/50 text-center mt-2 leading-normal">
                ※ 2026年4月時点 ｜ 継続6ヶ月以上の平均
              </p>
            </div>

            {/* ===== Mobile layout (lg未満): 並び替え版 =====
                順序: Pill → 画像+chips+tagline → Trust → 60秒+ボタン+8% → 見出し+sub+desc */}
            <div className="lg:hidden flex flex-col items-center gap-6 text-center">
              {/* 1. OWNER PORTAL pill */}
              <div className="inline-flex items-center gap-2 bg-white/8 border border-switch-teal-bright/40 rounded-full px-3 py-1 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-switch-teal-bright rounded-full" aria-hidden />
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-switch-teal-bright uppercase">
                  Owner Portal
                </span>
              </div>

              {/* 2. 見出し + サブヘッド + 説明文 (Owner Portal pill 直下に配置) */}
              <div className="w-full">
                <h1 className="font-bold leading-[1.18] mb-4 tracking-tight">
                  <span className="block text-[30px] sm:text-[40px]">
                    あなたの物件、
                  </span>
                  <span className="block text-[30px] sm:text-[40px] mt-1.5">
                    <span className="gradient-highlight-box">リアルタイム</span>で、
                  </span>
                  <span className="block text-[30px] sm:text-[40px] mt-1.5">
                    ぜんぶ見える。
                  </span>
                </h1>
                <p className="text-[16px] sm:text-[18px] text-white/85 leading-relaxed mb-3 font-medium">
                  民泊代行に、
                  <span className="text-switch-teal-bright font-bold">透明性</span>を。
                </p>
                <p className="text-[13px] sm:text-[14px] text-white/60 leading-relaxed">
                  予約状況・売上・経費・清掃 — オーナー専用ダッシュボードで全数値が手元に。
                  <br className="hidden sm:block" />
                  「任せきり」から、「いつでも見れる」運営へ。
                </p>
              </div>

              {/* 3. ダッシュボード画像 + chips + tagline */}
              <div className="flex flex-col items-center w-full">
                <div className="relative flex justify-center items-center w-full min-h-[320px] sm:min-h-[440px]">
                  <div
                    className="absolute inset-0 bg-switch-teal-bright/25 blur-[120px] rounded-full scale-95 pointer-events-none"
                    aria-hidden
                  />
                  <img
                    src="/images/switch/dashboard-mockup.png?v=v4"
                    alt="SEKAI STAY オーナーポータル ダッシュボード"
                    className="relative w-[88%] max-w-[420px] sm:max-w-[560px] select-none pointer-events-none drop-shadow-2xl z-10"
                  />
                  <FloatingDataChip className="absolute top-4 left-2 sm:top-8 sm:left-[6%] z-20" label="新規予約" value="2件" trend="up" />
                  <FloatingDataChip className="absolute top-1 right-0 sm:top-2 sm:right-[-1%] z-20" label="清掃完了" value="3/3" trend="ok" />
                  <FloatingDataChip className="absolute bottom-1 left-0 sm:bottom-4 sm:left-[-1%] z-20" label="稼働率" value="74%" trend="up" />
                  <FloatingDataChip className="absolute bottom-6 right-2 sm:bottom-14 sm:right-[8%] z-20" label="ピーク売上" value="+18%" trend="up" />
                </div>
                <p className="text-[11px] sm:text-[12px] text-white/55 mt-3 sm:mt-4 max-w-md tracking-wide leading-relaxed">
                  予約・売上・経費・清掃 — <span className="text-switch-teal-bright font-semibold">数字は全部、手元で動いてる。</span>
                </p>
              </div>

              {/* 4. Trust ライン + footnote */}
              <div className="w-full">
                <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 pt-5 border-t border-white/10">
                  <Metric value="97" unit="%" label="継続率" />
                  <Divider />
                  <Metric value="4.8" unit="/5" label="満足度" />
                  <Divider />
                  <Metric value="61" unit="%" label="稼働率" />
                  <Divider />
                  <span className="text-[11px] text-white/75 font-bold tracking-wide">
                    住宅宿泊管理業 <span className="text-switch-teal-bright">第F05780号</span>
                  </span>
                </div>
                <p className="text-[10px] text-white/50 mt-2 leading-normal">
                  ※ 2026年4月時点 ｜ 継続6ヶ月以上の平均
                </p>
              </div>

              {/* 5. 8% pill → デモボタン → 60秒キャプション */}
              <div className="flex flex-col items-center w-full">
                <div className="inline-flex items-baseline gap-2 mb-4 px-4 py-2.5 rounded-md bg-white/5 border border-white/10">
                  <span className="text-[11px] text-white/55 tracking-wider">しかも手数料は業界最安の</span>
                  <span className="text-[24px] sm:text-[28px] font-bold text-yellow-400 tabular-nums leading-none">8%</span>
                  <span className="text-[11px] text-white/55">+ ¥10,000/月</span>
                </div>
                <a
                  href="#contact-form"
                  data-cta="contact-form"
                  data-cta-label="portal-primary"
                  className="group w-full inline-flex items-center justify-center whitespace-nowrap bg-switch-accent text-white font-bold text-[15px] px-4 py-3.5 rounded-md hover:bg-switch-accent-hover transition-all shadow hover:-translate-y-0.5 min-h-[48px]"
                >
                  SEKAI STAYのデモ
                  <svg className="ml-2.5 w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <p className="text-[12px] text-white/55 mt-3 leading-relaxed">
                  入力60秒・24時間以内にレポート + デモログイン情報をお届け
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingDataChip({
  className = "",
  label,
  value,
  trend,
}: {
  className?: string;
  label: string;
  value: string;
  trend: "up" | "down" | "ok";
}) {
  const trendColor = trend === "up" ? "text-switch-teal-bright" : trend === "down" ? "text-switch-accent" : "text-white";
  return (
    <div className={`relative bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/40 px-2.5 py-2 sm:px-3.5 sm:py-2.5 ${className}`}>
      <span
        className="absolute -top-1.5 -right-1.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-orange-500 border-2 border-white shadow-md"
        aria-hidden
      />

      <p className="text-[8px] sm:text-[9px] text-switch-charcoal/60 font-medium tracking-wider uppercase leading-none">{label}</p>
      <div className="flex items-baseline gap-1 mt-1">
        <span className={`text-[14px] sm:text-[18px] font-bold tabular-nums leading-none ${trend === "up" ? "text-switch-teal-deep" : trend === "down" ? "text-switch-accent" : "text-switch-charcoal"}`}>
          {value}
        </span>
        {trend === "up" && (
          <svg className={`w-2.5 h-2.5 ${trendColor}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" />
          </svg>
        )}
      </div>
    </div>
  );
}

function Metric({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-lg sm:text-xl font-bold text-switch-teal-bright tabular-nums tracking-tight">{value}</span>
      <span className="text-[11px] text-white/65 font-medium">{unit} {label}</span>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-4 bg-white/15" aria-hidden />;
}
