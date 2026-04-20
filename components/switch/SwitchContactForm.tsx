"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useScrollFade } from "@/hooks/useScrollFade";

export type PrefillState = {
  currentFeeRate: number;
  monthlyRevenue: number;
  pastYears: number;
  futureYears: number;
} | null;

type Props = {
  prefill: PrefillState;
};

const FEE_OPTIONS = [
  { label: "8%以下", value: 0.08 },
  { label: "10%", value: 0.1 },
  { label: "15%", value: 0.15 },
  { label: "20%", value: 0.2 },
  { label: "25%以上", value: 0.25 },
  { label: "わからない", value: -1 },
];

const YEAR_OPTIONS = [
  { label: "新規", past: 0, future: 5 },
  { label: "1年以下", past: 1, future: 5 },
  { label: "1〜3年", past: 2, future: 5 },
  { label: "3〜5年", past: 4, future: 5 },
  { label: "5年以上", past: 6, future: 5 },
];

const TEMPERATURE_OPTIONS = [
  { label: "すぐにでも切り替えたい", value: "urgent" },
  { label: "1〜3ヶ月以内に検討中", value: "soon" },
  { label: "まずは情報収集", value: "research" },
];

export default function SwitchContactForm({ prefill }: Props) {
  const ref = useScrollFade();
  const router = useRouter();

  // step: 1 = property / 2 = revenue sliders / 3 = fee & years / 4 = contact
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ① property
  const [propertyName, setPropertyName] = useState("");
  const [airbnbUrl, setAirbnbUrl] = useState("");
  const [bookingUrl, setBookingUrl] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [area, setArea] = useState("");
  const [rooms, setRooms] = useState("1");

  // ② revenue
  const [peakRevenue, setPeakRevenue] = useState<number>(
    prefill ? prefill.monthlyRevenue : 80,
  );
  const [offpeakRevenue, setOffpeakRevenue] = useState<number>(
    prefill ? Math.max(0, Math.round(prefill.monthlyRevenue * 0.5)) : 40,
  );

  // ③ fee & years
  const [feeRate, setFeeRate] = useState<number>(
    prefill ? prefill.currentFeeRate : 0.2,
  );
  const [yearsIdx, setYearsIdx] = useState<number>(
    prefill
      ? YEAR_OPTIONS.findIndex((y) => y.past === prefill.pastYears)
      : 2,
  );

  // ④ contact
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [temperature, setTemperature] = useState("");
  const [note, setNote] = useState("");

  // honeypot（スパム対策・常に空のはず）
  const [honeypot, setHoneypot] = useState("");

  const estimatedAnnual = peakRevenue * 4 + offpeakRevenue * 8;

  function step1Valid() {
    return (
      propertyName.trim() !== "" &&
      propertyType !== "" &&
      area !== "" &&
      rooms !== ""
    );
  }

  function derivePropertySource(): "airbnb" | "booking" | undefined {
    const hasAirbnb = airbnbUrl.trim() !== "";
    const hasBooking = bookingUrl.trim() !== "";
    if (hasAirbnb && !hasBooking) return "airbnb";
    if (hasBooking && !hasAirbnb) return "booking";
    return undefined;
  }

  async function handleSubmit() {
    setError(null);
    if (!name || !email) {
      setError("お名前とメールアドレスは必須です");
      return;
    }
    // honeypot: 非空ならサイレントに完了扱い（スパム対策）
    if (honeypot) {
      router.push(`/switch/thanks`);
      return;
    }
    setSubmitting(true);

    const years = YEAR_OPTIONS[yearsIdx] ?? YEAR_OPTIONS[2];
    const monthlyRevenue = Math.round((peakRevenue + offpeakRevenue) / 2);

    // 姓名分割（スペース無し入力なら全部 lastname に入れる）
    const nameParts = name.trim().split(/\s+/);
    const lastname = nameParts[0] || "";
    const firstname = nameParts.slice(1).join(" ") || undefined;

    // property_type をガイド準拠ラベルへマッピング
    const propertyTypeMap: Record<string, string> = {
      house: "戸建",
      apartment: "マンション",
      "whole-building": "マンション",
      villa: "VILLA",
      other: "その他",
    };

    // area を日本語ラベルへマッピング
    const areaMap: Record<string, string> = {
      tokyo: "東京都",
      osaka: "大阪府",
      kyoto: "京都府",
      fukuoka: "福岡県",
      hokkaido: "北海道",
      okinawa: "沖縄県",
      other: "その他",
    };

    // UTM（layout.tsx で sessionStorage に保存済み）
    const readUtm = (k: string) =>
      typeof window !== "undefined"
        ? sessionStorage.getItem(k) || undefined
        : undefined;

    const body = {
      // --- ガイド記載の標準フィールド ---
      email,
      lastname,
      firstname,
      phone: phone || undefined,
      property_type: propertyTypeMap[propertyType] || undefined,
      area: areaMap[area] || undefined,
      room_count: Number(rooms) || undefined,
      estimated_revenue:
        monthlyRevenue > 0 ? monthlyRevenue * 10000 : undefined,
      lp_url:
        typeof window !== "undefined" ? window.location.href : undefined,
      utm_source: readUtm("utm_source"),
      utm_medium: readUtm("utm_medium"),
      utm_campaign: readUtm("utm_campaign"),
      website: honeypot,

      // --- カスタムプロパティ（HubSpot 側でそのままキー名で連携される） ---
      propertyName: propertyName.trim() || undefined,
      airbnbUrl: airbnbUrl || undefined,
      bookingUrl: bookingUrl || undefined,
      propertySource: derivePropertySource(),
      currentFeeRate: feeRate < 0 ? undefined : feeRate,
      pastYears: years.past,
      futureYears: years.future,
      peakRevenue,
      offpeakRevenue,
      temperature: temperature || undefined,
      note: note || undefined,
    };

    try {
      const res = await fetch(
        "https://japanvillas.kss-cloud.com/api/lp/owner-lead",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      const data = await res
        .json()
        .catch(() => ({ ok: false, error: "invalid response" }));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "送信に失敗しました");
      }

      // GA4 リードイベント（年間の手数料差額想定値を value に）
      if (typeof window !== "undefined") {
        const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void })
          .gtag;
        if (typeof gtag === "function") {
          gtag("event", "generate_lead", {
            currency: "JPY",
            value: Math.round(estimatedAnnual * 10000 * 0.12),
          });
        }
      }

      router.push(
        `/switch/thanks?id=${data.contact_id || ""}`,
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "送信に失敗しました");
      setSubmitting(false);
    }
  }

  const phaseProgress = step === 1 ? 0 : step === 2 || step === 3 ? 1 : 2;
  const phaseSub = step === 3 ? 1 : 0; // ②-B の時のみハーフ進行

  return (
    <section
      id="contact-form"
      className="relative py-16 sm:py-20 overflow-hidden bg-[linear-gradient(135deg,#0d5a60_0%,#167b81_40%,#1a8f96_55%,#167b81_75%,#0d5a60_100%)]"
      ref={ref}
    >
      {/* 装飾 */}
      <div
        className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-switch-teal-deep/25 blur-[120px] rounded-full pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -left-40 w-[480px] h-[480px] bg-switch-accent/15 blur-[120px] rounded-full pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />

      <div className="relative max-w-2xl mx-auto px-5 sm:px-6">
        {/* 見出し */}
        <div className="fade-in text-center mb-8">
          <h2 className="inline-flex items-center gap-2 bg-[#fde047] text-switch-charcoal font-bold text-lg sm:text-2xl leading-tight tracking-tight px-5 sm:px-7 py-2 sm:py-2.5 rounded-md mb-4 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-switch-accent shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            無料パーソナライズ診断
          </h2>
          <p className="text-white font-bold text-base sm:text-lg leading-snug mb-2">
            3分で入力、次営業日にあなた専用レポートを送付
          </p>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-xl mx-auto">
            民泊に強い専門の担当者が、診断レポートを作成します。無理な勧誘は致しません。
          </p>
        </div>

        {/* Progress */}
        <div className="fade-in mb-6">
          <div className="flex items-center justify-between text-xs text-white/70 mb-2 font-bold">
            <span className={phaseProgress >= 0 ? "text-[#fff7d6]" : ""}>
              ①物件情報
            </span>
            <span className={phaseProgress >= 1 ? "text-[#fff7d6]" : ""}>
              ②売上・手数料
            </span>
            <span className={phaseProgress >= 2 ? "text-[#fff7d6]" : ""}>
              ③ご連絡先
            </span>
          </div>
          <div className="h-2.5 sm:h-2 bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#fde047] rounded-full transition-all duration-500"
              style={{
                width: `${((phaseProgress * 2 + phaseSub) / 4) * 100 + (step === 4 ? 0 : 0)}%`,
              }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="fade-in bg-white rounded-2xl p-5 sm:p-8 shadow-2xl">
          {/* Slide viewport */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${(step - 1) * 100}%)` }}
            >
              {/* === ① 物件情報 === */}
              <div className="w-full shrink-0 px-1">
                {/* honeypot: スパム対策・画面外配置・常に空のはず */}
                <label
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    top: "auto",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                  }}
                >
                  Website
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </label>

                <StepTitle no="①" title="物件を教えてください" />

                <div className="mb-3">
                  <label className="block text-sm font-bold text-switch-charcoal mb-1.5">
                    物件名 <span className="text-switch-accent text-xs">*必須</span>
                  </label>
                  <input
                    type="text"
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    placeholder="例：代々木STAY"
                    className="w-full border border-switch-gray-light rounded-md px-4 py-3 text-base sm:text-sm bg-white focus:outline-none focus:border-switch-teal"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-bold text-switch-charcoal mb-1.5">
                    Airbnb 掲載URL{" "}
                    <span className="text-xs text-switch-gray-mid font-normal">
                      （任意）
                    </span>
                  </label>
                  <input
                    type="url"
                    value={airbnbUrl}
                    onChange={(e) => setAirbnbUrl(e.target.value)}
                    placeholder="https://www.airbnb.jp/rooms/..."
                    className="w-full border border-switch-gray-light rounded-md px-4 py-3 text-base sm:text-sm bg-white focus:outline-none focus:border-switch-teal"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-bold text-switch-charcoal mb-1.5">
                    Booking.com 掲載URL{" "}
                    <span className="text-xs text-switch-gray-mid font-normal">
                      （任意）
                    </span>
                  </label>
                  <input
                    type="url"
                    value={bookingUrl}
                    onChange={(e) => setBookingUrl(e.target.value)}
                    placeholder="https://www.booking.com/hotel/..."
                    className="w-full border border-switch-gray-light rounded-md px-4 py-3 text-base sm:text-sm bg-white focus:outline-none focus:border-switch-teal"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-bold text-switch-charcoal mb-1.5">
                    物件タイプ
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full border border-switch-gray-light rounded-md px-4 py-3 text-base sm:text-sm bg-white focus:outline-none focus:border-switch-teal"
                  >
                    <option value="">選択してください</option>
                    <option value="house">戸建て</option>
                    <option value="apartment">マンション</option>
                    <option value="whole-building">アパート一棟</option>
                    <option value="villa">別荘・ヴィラ</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div>
                    <label className="block text-sm font-bold text-switch-charcoal mb-1.5">
                      エリア
                    </label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full border border-switch-gray-light rounded-md px-4 py-3 text-base sm:text-sm bg-white focus:outline-none focus:border-switch-teal"
                    >
                      <option value="">選択</option>
                      <option value="tokyo">東京都</option>
                      <option value="osaka">大阪府</option>
                      <option value="kyoto">京都府</option>
                      <option value="fukuoka">福岡県</option>
                      <option value="hokkaido">北海道</option>
                      <option value="okinawa">沖縄県</option>
                      <option value="other">その他</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-switch-charcoal mb-1.5">
                      部屋数
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={rooms}
                      onChange={(e) => setRooms(e.target.value)}
                      className="w-full border border-switch-gray-light rounded-md px-4 py-3 text-base sm:text-sm bg-white focus:outline-none focus:border-switch-teal"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!step1Valid()}
                  onClick={() => setStep(2)}
                  className={`w-full py-4 sm:py-3.5 text-sm font-bold rounded-md transition-all ${
                    step1Valid()
                      ? "bg-switch-teal text-white hover:bg-switch-teal-deep"
                      : "bg-switch-gray-light text-switch-gray-mid cursor-not-allowed"
                  }`}
                >
                  次へ →
                </button>
              </div>

              {/* === ②-A 売上スライダー === */}
              <div className="w-full shrink-0 px-1">
                <StepTitle no="②" title="売上を教えてください" sub="1 / 2" />

                <RevenueSlider
                  label="ピーク月の売上"
                  hint="繁忙期・GW・年末年始など"
                  value={peakRevenue}
                  onChange={setPeakRevenue}
                />
                <div className="h-4" />
                <RevenueSlider
                  label="オフピーク月の売上"
                  hint="閑散期の平均的な月"
                  value={offpeakRevenue}
                  onChange={setOffpeakRevenue}
                />

                <div className="mt-4 bg-switch-teal-tint rounded-lg px-4 py-3 text-center">
                  <p className="text-[11px] text-switch-teal-deep font-bold tracking-wider mb-1">
                    年間売上（推定）
                  </p>
                  <p className="text-2xl font-bold text-switch-teal-deep tabular-nums leading-none">
                    {estimatedAnnual.toLocaleString("ja-JP")}
                    <span className="text-sm ml-1">万円</span>
                  </p>
                  <p className="text-[10px] text-switch-gray-mid mt-1">
                    ※ ピーク×4ヶ月＋オフピーク×8ヶ月で概算
                  </p>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-3 text-sm text-switch-gray-dark border border-switch-gray-light rounded-md hover:bg-switch-gray-pale transition-colors"
                  >
                    ← 戻る
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 py-4 sm:py-3.5 text-sm font-bold rounded-md bg-switch-teal text-white hover:bg-switch-teal-deep"
                  >
                    次へ →
                  </button>
                </div>
              </div>

              {/* === ②-B 手数料・運用年数 === */}
              <div className="w-full shrink-0 px-1">
                <StepTitle no="②" title="手数料と運用年数" sub="2 / 2" />

                <p className="text-sm font-bold text-switch-charcoal mb-2">
                  現在の運営代行手数料
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
                  {FEE_OPTIONS.map((f) => {
                    const active = feeRate === f.value;
                    return (
                      <button
                        key={f.label}
                        type="button"
                        onClick={() => setFeeRate(f.value)}
                        className={`py-3 px-2 text-sm font-bold rounded-md border transition-all ${
                          active
                            ? "border-switch-teal bg-switch-teal text-white shadow-sm"
                            : "border-switch-gray-light bg-white text-switch-charcoal hover:border-switch-teal/40"
                        }`}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </div>

                <p className="text-sm font-bold text-switch-charcoal mb-2">運用年数</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 mb-5">
                  {YEAR_OPTIONS.map((y, i) => {
                    const active = yearsIdx === i;
                    return (
                      <button
                        key={y.label}
                        type="button"
                        onClick={() => setYearsIdx(i)}
                        className={`py-3 px-1 text-xs font-bold rounded-md border transition-all ${
                          active
                            ? "border-switch-teal bg-switch-teal text-white shadow-sm"
                            : "border-switch-gray-light bg-white text-switch-charcoal hover:border-switch-teal/40"
                        }`}
                      >
                        {y.label}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-3 text-sm text-switch-gray-dark border border-switch-gray-light rounded-md hover:bg-switch-gray-pale transition-colors"
                  >
                    ← 戻る
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="flex-1 py-4 sm:py-3.5 text-sm font-bold rounded-md bg-switch-teal text-white hover:bg-switch-teal-deep"
                  >
                    次へ →
                  </button>
                </div>
              </div>

              {/* === ③ 連絡先 === */}
              <div className="w-full shrink-0 px-1">
                <StepTitle no="③" title="ご連絡先を教えてください" />

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-bold text-switch-charcoal mb-1.5">
                      お名前 <span className="text-switch-accent text-xs">*必須</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="山田 太郎"
                      className="w-full border border-switch-gray-light rounded-md px-4 py-3 text-base sm:text-sm bg-white focus:outline-none focus:border-switch-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-switch-charcoal mb-1.5">
                      メールアドレス{" "}
                      <span className="text-switch-accent text-xs">*必須</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="w-full border border-switch-gray-light rounded-md px-4 py-3 text-base sm:text-sm bg-white focus:outline-none focus:border-switch-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-switch-charcoal mb-1.5">
                      電話番号{" "}
                      <span className="text-xs text-switch-gray-mid font-normal">
                        （任意）
                      </span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="090-0000-0000"
                      className="w-full border border-switch-gray-light rounded-md px-4 py-3 text-base sm:text-sm bg-white focus:outline-none focus:border-switch-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-switch-charcoal mb-1.5">
                      温度感{" "}
                      <span className="text-xs text-switch-gray-mid font-normal">
                        （任意）
                      </span>
                    </label>
                    <div className="space-y-2">
                      {TEMPERATURE_OPTIONS.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setTemperature(t.value)}
                          className={`w-full text-left px-4 py-2.5 rounded-md border text-sm transition-all ${
                            temperature === t.value
                              ? "border-switch-teal bg-switch-teal-tint text-switch-teal-deep font-bold"
                              : "border-switch-gray-light hover:border-switch-teal/30 bg-white"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-switch-charcoal mb-1.5">
                      現状の課題・ご相談{" "}
                      <span className="text-xs text-switch-gray-mid font-normal">
                        （任意）
                      </span>
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={3}
                      placeholder="例：今の業者に不満があるが、解約金が気になっている"
                      className="w-full border border-switch-gray-light rounded-md px-4 py-3 text-base sm:text-sm bg-white focus:outline-none focus:border-switch-teal resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-switch-accent bg-switch-accent/10 rounded-md px-4 py-2">
                      {error}
                    </p>
                  )}

                  <p className="text-[11px] text-switch-gray-mid leading-relaxed">
                    ※ 入力情報は診断レポートのご連絡にのみ使用します。
                    <span className="font-bold text-switch-teal-deep">
                      無理な勧誘は致しません。
                    </span>
                  </p>

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={submitting}
                      className="px-4 py-3 text-sm text-switch-gray-dark border border-switch-gray-light rounded-md hover:bg-switch-gray-pale transition-colors disabled:opacity-50"
                    >
                      ← 戻る
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex-1 group inline-flex items-center justify-center bg-switch-accent hover:bg-switch-accent-hover text-white font-bold text-base sm:text-lg py-4 rounded-md shadow-[0_0_40px_rgba(235,110,40,0.45)] hover:shadow-[0_0_56px_rgba(235,110,40,0.6)] transition-all cta-breath disabled:opacity-60 min-h-[56px]"
                    >
                      {submitting ? "送信中..." : "無料で診断レポートをもらう"}
                      {!submitting && (
                        <svg
                          className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepTitle({
  no,
  title,
  sub,
}: {
  no: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="flex items-baseline gap-2 mb-5">
      <span className="text-switch-teal-deep font-bold text-xl">{no}</span>
      <h3 className="text-base sm:text-lg font-bold text-switch-charcoal">{title}</h3>
      {sub && (
        <span className="ml-auto text-xs text-switch-gray-mid font-bold tabular-nums">
          {sub}
        </span>
      )}
    </div>
  );
}

function RevenueSlider({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <div>
          <p className="text-sm font-bold text-switch-charcoal">{label}</p>
          <p className="text-[11px] text-switch-gray-mid">{hint}</p>
        </div>
        <p className="text-xl sm:text-3xl font-bold text-switch-teal-deep tabular-nums leading-none">
          {value.toLocaleString("ja-JP")}
          <span className="text-sm ml-1">万円</span>
        </p>
      </div>
      <input
        type="range"
        min={0}
        max={500}
        step={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-switch-teal"
      />
      <div className="flex justify-between text-[11px] sm:text-[10px] text-switch-gray-mid tabular-nums mt-0.5">
        <span>0</span>
        <span>250</span>
        <span>500万</span>
      </div>
    </div>
  );
}
