"use client";

/* コテコテ版 Hero — control の SwitchHero から装飾を盛った煽り強め版。
 * A/Bテスト次元: 装飾密度（多）/ 緊急性（最大: countdown timer）/ 情報量（多: Hero内に Comparison ミニ表）
 * 配色は control と同じ（sekai-charcoal / sekai-teal / yellow accent）赤系は使わない。
 */

import { useEffect, useState } from "react";
import CountUp from "./deco/CountUp";
import DotPattern from "./deco/DotPattern";

export default function SwitchHeroKotekote() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(true), []);

  return (
    <section className="relative">
      {/* Top strip — control の限定バー + countdown timer 追加 */}
      <KotekoteTopStrip />

      <div className="bg-switch-charcoal text-white relative overflow-hidden">
        {/* 背景グロー多層（control より追加で1枚） */}
        <div className="absolute top-[-15%] right-[-25%] w-[80%] h-[75%] bg-switch-teal-bright/22 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[65%] bg-switch-teal/16 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[35%] left-[40%] w-[40%] h-[40%] bg-yellow-400/8 blur-[120px] rounded-full pointer-events-none" />
        <DotPattern opacity={0.06} />

        <div className="relative max-w-7xl mx-auto px-6 py-6 sm:py-8 min-h-[calc(100svh-120px)] lg:min-h-[calc(100vh-120px)] flex items-center">
          <div
            className={`w-full transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-10 items-center">
              {/* 左カラム: コピー（control 同等 + 数字煽り強化） */}
              <div className="text-center lg:text-left">
                {/* バッジ — control の塗り潰しバッジを大型化 + パルス */}
                <div className="inline-flex items-center gap-2 bg-yellow-400/10 border-2 border-yellow-400/50 rounded-full px-3.5 py-1.5 mb-4 backdrop-blur-sm">
                  <span className="relative flex w-2 h-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-yellow-400" />
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold tracking-wider text-yellow-400">
                    他社で運営中の方限定 / 2026年4月 宿泊税改正対応中
                  </span>
                </div>

                {/* H1 — control 同様の2段構成 + さらに強調装飾 */}
                <h1 className="font-bold leading-[1.18] mb-3 sm:mb-4 tracking-tight">
                  <span className="block text-[34px] sm:text-[44px] lg:text-[52px]">
                    <span className="gradient-highlight-box">民泊運用</span>
                    <span className="text-white">の</span>
                  </span>
                  <span className="block text-[34px] sm:text-[44px] lg:text-[52px] mt-1.5">
                    <span className="gradient-highlight-box">ぜんぶ</span>
                    <span className="text-white">を、</span>
                  </span>
                </h1>

                {/* 8% ブロック — control と同じが、グロー強化 + 「半額以下」追加バッジ */}
                <div className="mb-4 sm:mb-5 relative">
                  <div
                    className="absolute left-1/2 lg:left-[20%] top-[30%] -translate-x-1/2 lg:translate-x-0 w-[220px] h-[180px] bg-switch-teal-bright/22 blur-[80px] rounded-full pointer-events-none"
                    aria-hidden
                  />
                  <div className="relative flex items-end justify-center lg:justify-start gap-2 mb-1 overflow-visible">
                    <span className="inline-flex items-center bg-white/5 px-2.5 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0 text-lg sm:text-xl lg:text-2xl font-bold text-white/80 tracking-wider leading-none">
                      手数料
                    </span>
                    <CountUp
                      target={8}
                      initialValue={8}
                      className="gradient-text-mega text-[5.5rem] sm:text-[8.5rem] lg:text-[10rem] font-bold leading-none tabular-nums pr-1"
                    />
                    <span className="gradient-text-mega text-6xl sm:text-8xl lg:text-[7.5rem] font-bold leading-none">
                      %
                    </span>
                  </div>
                  <p className="relative text-[28px] sm:text-[36px] lg:text-[44px] font-bold text-white leading-[1.25] whitespace-normal sm:whitespace-nowrap mt-1">
                    で、
                    <span className="gradient-highlight-box">まるっと</span>
                    <span className="whitespace-nowrap">お任せ。</span>
                  </p>
                  <p className="relative text-[13px] sm:text-[15px] text-white/90 mt-2.5 tracking-wide font-semibold">
                    <span className="text-white">＋ ¥10,000</span>
                    <span className="text-white/60 text-[11px] sm:text-xs mx-1">/ 部屋 / 月</span>
                    <span className="inline-block mx-2 w-px h-3 bg-white/25 align-middle" aria-hidden />
                    <span className="inline-flex items-center gap-1 text-yellow-400 text-[11px] sm:text-xs font-bold">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      業界平均の半額以下
                    </span>
                  </p>
                </div>

                {/* CTA — control と同じだが、CTA 直下に「煽りリマインダー」追加 */}
                <div className="flex flex-col lg:items-start items-center mb-2 sm:mb-3">
                  <a
                    href="#simulator"
                    className="group w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap bg-switch-accent text-white font-bold text-[15px] sm:text-lg px-4 sm:px-10 py-3.5 sm:py-4 rounded-md hover:bg-switch-accent-hover transition-all shadow-lg hover:shadow-2xl hover:-translate-y-0.5 min-h-[48px]"
                  >
                    10秒で年間損失額を診断する
                    <svg className="ml-2.5 w-5 h-5 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </a>
                  <p className="text-[13px] sm:text-sm text-white/85 mt-3 leading-relaxed">
                    <span className="inline-flex items-center gap-1.5 mr-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                      <span className="text-yellow-400 font-bold">3,000+</span>
                    </span>
                    オーナーが既に診断 ・ 平均
                    <span className="font-bold text-white">¥744,000</span>
                    の年間削減見込み
                  </p>
                </div>
              </div>

              {/* 右カラム: Comparison ミニ表（control の iPhone mockup の代わり / Hero 内即比較） */}
              <div className="w-full">
                <KotekoteComparisonCard />
              </div>
            </div>

            {/* Trust metrics — control の4数値 + 物件数 + 削減実績 + ライセンス */}
            <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 pt-5 mt-5 border-t border-white/10">
              <BigMetric value="97" unit="%" label="継続率" />
              <Divider />
              <BigMetric value="4.8" unit="/5" label="満足度" />
              <Divider />
              <BigMetric value="61" unit="%" label="稼働率" />
              <Divider />
              <BigMetric value="200" unit="+" label="物件管理" />
              <Divider />
              <BigMetric value="¥1.4億" unit="" label="累計削減" />
              <Divider />
              <span className="text-[11px] text-white/75 font-bold tracking-wide">
                住宅宿泊管理業 <span className="text-switch-teal-bright">第F05780号</span>
              </span>
            </div>
            <p className="text-[10px] text-white/50 text-center mt-2 leading-normal">
              ※ 2026年4月時点 ｜ 継続6ヶ月以上の平均 ｜ 累計削減はオーナー全員の年間差額試算合計
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────── Top strip + countdown timer ─────── */
function KotekoteTopStrip() {
  return (
    <div className="bg-gradient-to-r from-black via-[#0a0a0a] to-black text-white py-3 sm:py-3.5 px-3 sm:px-4 relative overflow-hidden border-b border-yellow-400/20">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.12),transparent_60%)] pointer-events-none"
        aria-hidden
      />
      <div className="relative flex items-center justify-center flex-wrap gap-x-3 gap-y-1 text-[11px] sm:text-base font-bold tracking-wide">
        <span className="inline-flex items-center gap-1 bg-gradient-to-br from-yellow-300 to-yellow-500 text-black text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-sm shrink-0 shadow-[0_0_14px_rgba(251,191,36,0.5)] whitespace-nowrap animate-pulse">
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          5月限定
        </span>
        <span className="text-white whitespace-nowrap">先着10オーナー</span>
        <span className="hidden sm:inline text-white/40">／</span>
        <span className="inline-flex items-center gap-1 text-white/90 whitespace-nowrap">
          初期費用
          <span className="text-white/40 line-through decoration-[1.5px]">¥10万円</span>
          <span aria-hidden className="text-white/50">→</span>
          <span className="text-yellow-400 font-bold text-[15px] sm:text-lg tracking-wider">¥0</span>
        </span>
        <span className="hidden sm:inline text-white/40">／</span>
        <CountdownClock />
      </div>
    </div>
  );
}

function CountdownClock() {
  const [parts, setParts] = useState({ d: "--", h: "--", m: "--", s: "--" });
  useEffect(() => {
    const target = new Date("2026-05-31T23:59:59+09:00").getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setParts({
        d: String(Math.floor(diff / 86_400_000)).padStart(2, "0"),
        h: String(Math.floor((diff % 86_400_000) / 3_600_000)).padStart(2, "0"),
        m: String(Math.floor((diff % 3_600_000) / 60_000)).padStart(2, "0"),
        s: String(Math.floor((diff % 60_000) / 1000)).padStart(2, "0"),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="inline-flex items-center gap-1.5 bg-yellow-400/10 border border-yellow-400/30 rounded-md px-2 py-0.5 whitespace-nowrap">
      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
      <span className="text-[10px] sm:text-[11px] text-white/70">〆切まで</span>
      <span className="font-mono tabular-nums text-yellow-400 text-[12px] sm:text-[13px] font-bold tracking-wider">
        {parts.d}<span className="text-white/40 mx-0.5">日</span>
        {parts.h}:{parts.m}:{parts.s}
      </span>
    </span>
  );
}

/* ─────── Hero 内 Comparison ミニ表 ─────── */
function KotekoteComparisonCard() {
  return (
    <div className="relative">
      {/* グロー */}
      <div className="absolute -inset-6 bg-switch-teal-bright/15 blur-[80px] rounded-3xl pointer-events-none" aria-hidden />

      <div className="relative bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] font-bold text-yellow-400 tracking-[0.2em] uppercase">
            他社 vs SEKAI STAY
          </p>
          <span className="text-[10px] text-white/40">想定: 月売上¥80万 / 1部屋</span>
        </div>

        {/* テーブル */}
        <table className="w-full text-[12px] sm:text-[13px]">
          <thead>
            <tr className="text-left">
              <th className="font-medium text-white/40 pb-2.5"></th>
              <th className="font-medium text-white/50 pb-2.5 text-right">他社平均</th>
              <th className="font-bold text-switch-teal-bright pb-2.5 text-right">SEKAI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            <Row label="代行手数料" left="20%" right="8%" highlight />
            <Row label="月固定費" left="¥30,000" right="¥10,000" />
            <Row label="価格最適化" left="手動" right="AI 自動" />
            <Row label="夜間対応" left="人 / 遅延" right="AI 90%自動" />
            <Row label="オーナーレポート" left="月次PDF" right="リアルタイム" />
          </tbody>
        </table>

        {/* 年差額（最大の見せ所） */}
        <div className="mt-5 pt-4 border-t border-yellow-400/30 bg-yellow-400/5 -mx-5 sm:-mx-6 px-5 sm:px-6 rounded-b-2xl">
          <p className="text-[11px] text-white/65 mb-1 font-medium">この物件での年間差額</p>
          <div className="flex items-baseline gap-2">
            <span className="gradient-text-mega text-[40px] sm:text-[52px] font-bold leading-none tabular-nums">
              +¥744,000
            </span>
            <span className="text-[12px] text-white/55">/ 年</span>
          </div>
          <p className="text-[11px] text-white/45 mt-1.5">
            ※ 1部屋・月固定費含む試算 ・ 5部屋運営なら<span className="text-yellow-400 font-bold">+¥3,720,000/年</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, left, right, highlight }: { label: string; left: string; right: string; highlight?: boolean }) {
  return (
    <tr>
      <td className="py-2.5 text-white/85 font-medium">{label}</td>
      <td className="py-2.5 text-right text-white/55 line-through decoration-white/30">{left}</td>
      <td className={`py-2.5 text-right font-bold ${highlight ? "text-yellow-400 text-[15px] sm:text-base" : "text-switch-teal-bright"}`}>
        {right}
      </td>
    </tr>
  );
}

function BigMetric({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-lg sm:text-xl font-bold text-switch-teal-bright tabular-nums tracking-tight">
        {value}
      </span>
      <span className="text-[11px] text-white/65 font-medium">
        {unit && `${unit} `}{label}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-4 bg-white/15" aria-hidden />;
}
