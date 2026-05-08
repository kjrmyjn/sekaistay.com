"use client";

/* 5 variant 用カスタム Hero。
 * /switch (control) は SwitchHero を使う（変更なし）。
 */

import Link from "next/link";

const HERO_BG = "bg-gradient-to-br from-switch-charcoal via-switch-teal-deep to-switch-teal";

// ─────── ID 2: hero-pain（痛み訴求） ───────
export function HeroPain() {
  return (
    <section className={`relative ${HERO_BG} text-white py-20 md:py-28 overflow-hidden`}>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,#ff6b6b_0%,transparent_50%)] pointer-events-none" aria-hidden />
      <div className="relative max-w-4xl mx-auto px-5">
        <p className="text-[12px] md:text-[14px] font-semibold tracking-[0.2em] text-switch-accent mb-4">
          OWNER STORY ・ 元ハズレ代行ユーザー
        </p>
        <h1 className="text-[28px] md:text-[44px] font-bold leading-[1.25] mb-6">
          「年間120万円、<br className="md:hidden" />
          代行業者に消えてました」
        </h1>
        <p className="text-[15px] md:text-[18px] leading-relaxed text-white/90 mb-4">
          手数料20%・裏で取られていた高額クリーニング・OTA手動運用の遅れによる予約取り逃し ——
          代行業者を切り替えるまで、自分が何を失っていたか気づかなかった。
        </p>
        <p className="text-[15px] md:text-[18px] leading-relaxed text-white/90 mb-8">
          AI ネイティブ運営の SEKAI STAY なら、<strong className="text-white">手数料 8% + 月1万/物件</strong>。
          年間損失見込みを無料で診断し、改善ロードマップをレポート化します。
        </p>
        <Link
          href="#contact-form"
          data-cta="contact-form"
          data-cta-label="hero-pain-primary"
          className="inline-flex items-center justify-center gap-2 bg-white text-switch-teal-deep font-bold text-[15px] md:text-[16px] px-7 py-4 rounded-full shadow-2xl hover:scale-[1.02] transition-transform"
        >
          自分の年間損失額を診断する →
        </Link>
      </div>
    </section>
  );
}

// ─────── ID 3: hero-savings（即試算フック） ───────
export function HeroSavings() {
  return (
    <section className={`relative ${HERO_BG} text-white py-16 md:py-20 overflow-hidden`}>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_30%,#fde047_0%,transparent_50%)] pointer-events-none" aria-hidden />
      <div className="relative max-w-4xl mx-auto px-5 text-center">
        <p className="text-[12px] md:text-[14px] font-semibold tracking-[0.2em] text-[#fde047] mb-4">
          INSTANT DIAGNOSIS
        </p>
        <h1 className="text-[26px] md:text-[42px] font-bold leading-[1.25] mb-5">
          あなたの代行手数料、<br className="md:hidden" />
          <span className="text-[#fde047]">いくら損してる？</span>
        </h1>
        <p className="text-[15px] md:text-[18px] leading-relaxed text-white/90 mb-3">
          月売上を入れるだけ。 SEKAI STAY 8% への切替で年間いくら削減できるか、今すぐ試算できます。
        </p>
        <p className="text-[12px] md:text-[14px] text-white/70 mb-8">
          ↓ シミュレーターで試算 → 結果をメールで受け取れます
        </p>
        <div className="flex justify-center">
          <svg className="w-8 h-8 text-white/80 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ─────── ID 4: ultra-short（モバイル1スクロール） ───────
export function HeroUltraShort() {
  return (
    <section className={`relative ${HERO_BG} text-white pt-16 pb-10 md:pt-20 md:pb-12 overflow-hidden`}>
      <div className="relative max-w-3xl mx-auto px-5 text-center">
        <h1 className="text-[32px] md:text-[52px] font-bold leading-[1.05] mb-4 tracking-tight">
          民泊代行を、<br />
          <span className="text-[#fde047]">8%</span>に。
        </h1>
        <p className="text-[15px] md:text-[18px] text-white/85 mb-2">
          月1万円/物件・初期費用 0 円
        </p>
        <p className="text-[12px] md:text-[14px] text-white/60">
          業界標準 15-25% の半額以下 ・ AI で運営、人で対応
        </p>
      </div>
    </section>
  );
}

// ─────── ID 5: social-proof（オーナー声 Hero化、写真なし） ───────
export function HeroSocialProof() {
  return (
    <section className={`relative ${HERO_BG} text-white py-16 md:py-20 overflow-hidden`}>
      <div className="relative max-w-4xl mx-auto px-5">
        <p className="text-[12px] md:text-[14px] font-semibold tracking-[0.2em] text-switch-accent mb-4">
          OWNER VOICES ・ 切替えオーナー4名の声
        </p>
        <h1 className="text-[26px] md:text-[40px] font-bold leading-[1.3] mb-8">
          オーナー4名が、<br className="md:hidden" />
          手数料を半分以下に切り替えた理由
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8">
          {[
            {
              q: "「夜中のクレーム対応がゼロになった。AIで90%自動処理されるので、寝てる間に問題が解決する。」",
              n: "M.S 様",
              p: "LAKE HOUSE 野尻湖（管理1物件）",
            },
            {
              q: "「手数料20% → 8% で年間100万円以上の改善。それ以上に毎月のレポートが分かりやすい。」",
              n: "T.K 様",
              p: "MOUNTAIN VILLA ニセコ（管理2物件）",
            },
            {
              q: "「OTA一括連携と料金最適化AIで、オフピークの稼働率が42%上がった。これは大きい。」",
              n: "K.H 様",
              p: "都内民泊オーナー（管理3物件）",
            },
            {
              q: "「契約までのコミュニケーションが速かった。質問には30分以内に回答が来る安心感。」",
              n: "Y.N 様",
              p: "京都町家（管理1物件）",
            },
          ].map((v, i) => (
            <div key={i} className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 md:p-5">
              <p className="text-[13px] md:text-[15px] leading-relaxed text-white mb-3">{v.q}</p>
              <p className="text-[11px] md:text-[12px] font-semibold text-[#fde047]">{v.n}</p>
              <p className="text-[10px] md:text-[11px] text-white/60">{v.p}</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] md:text-[12px] text-white/50">
          ※ プライバシー保護のため一部仮名で掲載しています
        </p>
      </div>
    </section>
  );
}

// ─────── ID 6: urgency-limited（限定キャンペーン） ───────
export function UrgencyBanner() {
  return (
    <div className="bg-switch-accent text-white py-3 px-4 text-center sticky top-0 z-30 shadow-lg">
      <p className="text-[12px] md:text-[14px] font-bold tracking-tight">
        🎯 5月末まで限定 ・ 初期費用 <span className="text-[#fde047]">¥0</span> キャンペーン ・ 先着10物件
      </p>
    </div>
  );
}

export function HeroUrgency() {
  return (
    <section className={`relative ${HERO_BG} text-white py-16 md:py-22 overflow-hidden`}>
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_50%_30%,#e8653a_0%,transparent_60%)] pointer-events-none" aria-hidden />
      <div className="relative max-w-4xl mx-auto px-5 text-center">
        <p className="inline-block text-[11px] md:text-[13px] font-bold tracking-[0.2em] bg-switch-accent text-white px-4 py-1.5 rounded-full mb-4">
          5月末まで限定 ・ 先着10物件
        </p>
        <h1 className="text-[28px] md:text-[44px] font-bold leading-[1.2] mb-4">
          初期費用 <span className="text-[#fde047]">0円</span> で<br className="md:hidden" />
          AI 民泊代行に切替
        </h1>
        <p className="text-[15px] md:text-[18px] leading-relaxed text-white/90 mb-3">
          通常の OTA 移行手数料・初期セットアップ費を全額免除（約30万円相当）。
        </p>
        <p className="text-[13px] md:text-[15px] text-white/70 mb-8">
          手数料 8% + 月1万円/物件 ・ 業界標準 15-25% の半額以下
        </p>
        <Countdown />
        <Link
          href="#contact-form"
          data-cta="contact-form"
          data-cta-label="urgency-primary"
          className="inline-flex items-center justify-center gap-2 mt-8 bg-[#fde047] text-switch-charcoal font-bold text-[15px] md:text-[16px] px-7 py-4 rounded-full shadow-2xl hover:scale-[1.02] transition-transform"
        >
          残り枠を確認して申込む →
        </Link>
      </div>
    </section>
  );
}

function Countdown() {
  // 5月末（5/31 23:59:59 JST）までのカウントダウン。
  // CSR で動的計算するため "use client" 必要（既にファイル先頭で宣言済み）。
  if (typeof window === "undefined") {
    return (
      <div className="inline-flex gap-2 md:gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 md:px-6 py-3">
        <CountdownUnit value="--" label="日" />
        <CountdownUnit value="--" label="時" />
        <CountdownUnit value="--" label="分" />
      </div>
    );
  }
  return <CountdownClient />;
}

function CountdownClient() {
  // ブラウザでマウント後にのみ実時間を計算
  const target = new Date("2026-05-31T23:59:59+09:00").getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  return (
    <div className="inline-flex gap-2 md:gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 md:px-6 py-3">
      <CountdownUnit value={String(days).padStart(2, "0")} label="日" />
      <CountdownUnit value={String(hours).padStart(2, "0")} label="時" />
      <CountdownUnit value={String(mins).padStart(2, "0")} label="分" />
    </div>
  );
}

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[44px] md:min-w-[56px]">
      <div className="text-[24px] md:text-[32px] font-bold tabular-nums leading-none text-[#fde047]">{value}</div>
      <div className="text-[10px] md:text-[11px] text-white/70 mt-1">{label}</div>
    </div>
  );
}
