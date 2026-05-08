"use client";

/* シンプル版 Hero — control の SwitchHero から装飾を削減した上質ミニマル版。
 * A/Bテスト次元: 装飾密度（少）/ 緊急性（なし）/ 情報量（控えめ）
 * 配色は control と同じ（sekai-charcoal / sekai-teal / yellow accent）。
 */

import { useEffect, useState } from "react";
import CountUp from "./deco/CountUp";

export default function SwitchHeroSimple() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(true), []);

  return (
    <section className="relative bg-switch-charcoal text-white overflow-hidden">
      {/* 背景は単一の控えめなグロー1つだけ（control は2つ + dot pattern） */}
      <div
        className="absolute top-[10%] right-[-15%] w-[55%] h-[55%] bg-switch-teal-bright/12 blur-[160px] rounded-full pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-5xl mx-auto px-6 py-20 sm:py-24 lg:py-28 min-h-[calc(100svh-80px)] lg:min-h-[80vh] flex items-center">
        <div
          className={`w-full transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
            {/* 左カラム: コピー（中央寄せ気味・余白広め） */}
            <div className="text-center lg:text-left">
              {/* 細いライン装飾だけのバッジ（control の塗り潰しバッジと差別化） */}
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="w-8 h-px bg-switch-teal-bright" />
                <span className="text-[11px] font-semibold tracking-[0.25em] text-switch-teal-bright uppercase">
                  Owner-First Operation
                </span>
              </div>

              {/* H1 — シンプルな1ブロック構成（control は2行 + gradient-highlight-box） */}
              <h1 className="font-bold leading-[1.15] mb-8 sm:mb-10 tracking-tight text-white">
                <span className="block text-[40px] sm:text-[52px] lg:text-[64px]">
                  民泊運用は、
                </span>
                <span className="block text-[40px] sm:text-[52px] lg:text-[64px] mt-1">
                  まるっと
                  <span className="text-switch-teal-bright">8%</span>。
                </span>
              </h1>

              {/* 価格情報 — 控えめな1行 */}
              <div className="mb-10 sm:mb-12">
                <p className="text-[14px] sm:text-[15px] text-white/70 leading-relaxed font-medium tracking-wide">
                  代行手数料 <span className="text-white font-bold">8%</span>
                  <span className="mx-2 text-white/30">+</span>
                  <span className="text-white">¥10,000</span>
                  <span className="text-white/50 text-[12px] mx-1">/ 部屋 / 月</span>
                </p>
                <p className="text-[12px] text-white/50 mt-2 leading-relaxed">
                  業界平均 15-25% の半額以下 ・ AI ネイティブ運営
                </p>
              </div>

              {/* CTA — 単一・モノトーン気味（control は switch-accent オレンジ） */}
              <div className="flex flex-col lg:items-start items-center gap-4">
                <a
                  href="#simulator"
                  className="group inline-flex items-center justify-center bg-white text-switch-charcoal font-bold text-[15px] sm:text-base px-10 py-4 rounded-full hover:bg-white/90 transition-all min-h-[52px]"
                >
                  10秒で損失額を診断
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <p className="text-[12px] text-white/55 mt-1">
                  入力項目は3つだけ ・ 24時間以内にレポート受領
                </p>
              </div>
            </div>

            {/* 右カラム: iPhoneモックアップのみ（control の PropertyChip と animated SVG flow lines は削除） */}
            <div className="flex justify-center items-center w-full">
              <div className="relative w-full max-w-md">
                {/* シンプルなグロー1枚 */}
                <div
                  className="absolute inset-0 bg-switch-teal-bright/15 blur-[100px] rounded-full scale-90 pointer-events-none"
                  aria-hidden
                />
                <img
                  src="/images/switch/dashboard-mockup.png"
                  alt="SEKAI STAY オーナーポータル"
                  className="relative w-full select-none pointer-events-none drop-shadow-2xl"
                  style={{
                    maskImage:
                      "radial-gradient(ellipse 78% 88% at center, #000 60%, transparent 99%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 78% 88% at center, #000 60%, transparent 99%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Trust metrics — 3つのみ（control は4つ + ライセンス番号） */}
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3 pt-12 mt-16 border-t border-white/8">
            <Metric value="97" unit="%" label="継続率" />
            <Divider />
            <Metric value="4.8" unit="/5" label="満足度" />
            <Divider />
            <Metric value="61" unit="%" label="稼働率" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
        {value}
      </span>
      <span className="text-[11px] text-white/50 font-medium">
        {unit} {label}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-white/10" aria-hidden />;
}
