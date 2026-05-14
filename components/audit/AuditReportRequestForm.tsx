"use client";

/* /audit 専用フォーム (2026-05-14)
 *
 * 機能: LP (/switch/*) の ReportRequestForm と完全同一
 *   - Step 1: 手数料 (card grid + これから始める方 checkbox)
 *   - Step 2: 物件情報 (運用年数・売上 slider・物件名検索・物件数)
 *   - Step 3: ご連絡先 (氏名・メール・電話・課題)
 *   - 同じ /api/report-requests/submit に POST (lpVariant="audit")
 *   - 同じ Meta Pixel/CAPI dedup・GA4 events・timerex redirect
 *
 * デザイン: HP editorial スタイル (ivory/paper/ink パレット)
 *   - chapter-marker + eyebrow ヘッダー
 *   - numbered Field component (01. 02. 03.)
 *   - bg-mist border-rule inputs
 *   - btn-primary 角ボタン (ink filled)
 *   - 3-col 「Step 01 · Label」 progress ledger
 *
 * 注意: ロジック (state/handlers) は ReportRequestForm.tsx と意図的に重複。
 * 共通化するなら lib/report-request-form-helpers.ts に extract する選択肢あり。
 * 今は LP 側の改善が editorial 側に意図せず波及しないよう敢えて独立を選択。
 */

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

type PropertySearchResult = {
  source: "airbnb" | "other";
  url: string;
  title?: string;
};

// ─────── Constants (duplicated from ReportRequestForm) ───────

const FEE_CARDS = ["15", "20", "25"] as const;
const OTHER_FEE_OPTIONS = [
  { value: "0", label: "自己運用（0%）" },
  { value: "unknown", label: "わからない" },
  { value: "lt10", label: "10%未満" },
  { value: "10", label: "10%" },
  { value: "11-14", label: "11〜14%" },
  { value: "16-19", label: "16〜19%" },
  { value: "25plus", label: "25%以上" },
];

const YEARS_STOPS: { value: string; label: string }[] = [
  { value: "0", label: "1年未満" },
  { value: "1", label: "1〜2年" },
  { value: "3", label: "3〜5年" },
  { value: "5", label: "5年以上" },
];

const MEETING_URL = "https://timerex.net/s/sekai-stay/d61b424d";
const REVENUE_MIN_MAN = 10;
const REVENUE_MAX_MAN = 300;
const PROPERTIES_MAX = 30;

// ─────── Types ───────

type FormState = {
  commissionRate: string;
  startingNew: boolean;
  airbnbUrl: string;
  noPropertyYet: boolean;
  totalProperties: number;
  peakRevenueMan: number;
  offpeakRevenueMan: number;
  yearsIdx: number;
  name: string;
  email: string;
  phone: string;
  complaints: string;
};

const INITIAL: FormState = {
  commissionRate: "",
  startingNew: false,
  airbnbUrl: "",
  noPropertyYet: false,
  totalProperties: 1,
  peakRevenueMan: 80,
  offpeakRevenueMan: 30,
  yearsIdx: 1,
  name: "",
  email: "",
  phone: "",
  complaints: "",
};

type Step = 1 | 2 | 3;

type AdAttribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  fbclid?: string;
  landingUrl?: string;
  referrer?: string;
};

// ─────── Helpers ───────

function manToRange(man: number): string {
  if (man < 10) return "0-10";
  if (man < 20) return "10-20";
  if (man < 30) return "20-30";
  if (man < 50) return "30-50";
  if (man < 80) return "50-80";
  if (man < 120) return "80-120";
  if (man < 200) return "120-200";
  if (man < 300) return "200-300";
  return "300+";
}

function formatMan(man: number): string {
  if (man >= REVENUE_MAX_MAN) return `${REVENUE_MAX_MAN}万円以上`;
  return `約${man}万円`;
}

function formatProperties(n: number): string {
  if (n <= 1) return "上記のみ";
  if (n >= PROPERTIES_MAX) return `${PROPERTIES_MAX}棟以上`;
  return `${n}棟`;
}

function trackFunnel(eventName: string, params: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  try {
    // @ts-ignore
    window.gtag?.("event", eventName, params);
  } catch {}
  try {
    const metaName = eventName
      .split("_")
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
      .join("");
    // @ts-ignore
    window.fbq?.("trackCustom", metaName, params);
  } catch {}
}

function isAirbnbUrl(url: string): boolean {
  if (!url) return false;
  try {
    const host = new URL(url).hostname.toLowerCase();
    return /(^|\.)airbnb\.(com|jp|co\.jp)$/.test(host) || host === "abnb.me" || host.startsWith("m.airbnb.");
  } catch {
    return false;
  }
}

// ─────── Main Form ───────

const LP_VARIANT = "audit";

export function AuditReportRequestForm() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [attribution, setAttribution] = useState<AdAttribution>({});

  // attribution capture
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const get = (k: string) => params.get(k)?.slice(0, 200) || undefined;
    setAttribution({
      utmSource: get("utm_source"),
      utmMedium: get("utm_medium"),
      utmCampaign: get("utm_campaign"),
      utmContent: get("utm_content"),
      utmTerm: get("utm_term"),
      gclid: get("gclid"),
      fbclid: get("fbclid"),
      landingUrl: params.get("landing_url")?.slice(0, 1000) || window.location.href.slice(0, 1000),
      referrer: document.referrer ? document.referrer.slice(0, 1000) : undefined,
    });
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const canNextFromStep1 = useMemo(
    () => form.startingNew || form.commissionRate !== "",
    [form.commissionRate, form.startingNew],
  );

  function handleStartingNew(v: boolean) {
    setForm((f) => ({
      ...f,
      startingNew: v,
      ...(v ? { commissionRate: "" } : {}),
    }));
  }
  const canNextFromStep2 = useMemo(
    () => form.noPropertyYet || form.airbnbUrl.trim() !== "",
    [form.airbnbUrl, form.noPropertyYet],
  );
  const canSubmit = useMemo(
    () => form.name.trim() && form.email.trim() && form.phone.trim(),
    [form.name, form.email, form.phone],
  );

  function handleNext() {
    const fromStep = step;
    const nextStep: Step = fromStep === 1 && form.startingNew ? 3 : ((fromStep + 1) as Step);
    if (fromStep === 1) {
      trackFunnel("form_step_complete", {
        step: 1,
        next_step: nextStep,
        lp_variant: LP_VARIANT,
        starting_new: form.startingNew,
        commission_rate: form.commissionRate || "unset",
      });
    } else if (fromStep === 2) {
      trackFunnel("form_step_complete", {
        step: 2,
        next_step: nextStep,
        lp_variant: LP_VARIANT,
        no_property_yet: form.noPropertyYet,
        has_property_url: !form.noPropertyYet && form.airbnbUrl.trim() !== "",
        total_properties: form.totalProperties,
        operating_years: YEARS_STOPS[form.yearsIdx]?.value ?? "",
      });
    }
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    const fromStep = step;
    const toStep: Step =
      fromStep === 3 && form.startingNew ? 1 : ((fromStep > 1 ? fromStep - 1 : fromStep) as Step);
    trackFunnel("form_step_back", {
      from_step: fromStep,
      to_step: toStep,
      lp_variant: LP_VARIANT,
    });
    setStep(toStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const markers: string[] = [];
      if (form.startingNew) markers.push("[これから民泊を始める方]");
      if (form.noPropertyYet && !form.startingNew) markers.push("[物件未掲載]");
      const complaintsOut =
        markers.length > 0
          ? `${markers.join(" ")}${form.complaints ? "\n" + form.complaints : ""}`
          : form.complaints;
      const yearsValue = YEARS_STOPS[form.yearsIdx]?.value ?? "";
      const skipPropertyDetails = form.startingNew;
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        airbnbUrl: form.noPropertyYet ? "" : form.airbnbUrl.trim(),
        peakRevenue: skipPropertyDetails ? "" : manToRange(form.peakRevenueMan),
        offpeakRevenue: skipPropertyDetails ? "" : manToRange(form.offpeakRevenueMan),
        commissionRate: form.commissionRate,
        operatingYears: skipPropertyDetails ? "" : yearsValue,
        complaints: complaintsOut,
        totalProperties: form.totalProperties,
        lpVariant: LP_VARIANT,
        ...attribution,
      };
      const res = await fetch("/api/report-requests/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "送信に失敗しました。時間をおいて再度お試しください。");
        trackFunnel("form_submit_error", {
          lp_variant: LP_VARIANT,
          error_type: "server_error",
          status: res.status,
          error_message: String(data?.error || "unknown").slice(0, 200),
        });
        setSubmitting(false);
        return;
      }
      try {
        // @ts-ignore
        window.gtag?.("event", "generate_lead", {
          lp_variant: LP_VARIANT,
          form_variant: "default",
          commission_rate: form.commissionRate,
        });
        const eventID = typeof data?.eventId === "string" ? data.eventId : undefined;
        // @ts-ignore
        window.fbq?.(
          "track",
          "Lead",
          { lp_variant: LP_VARIANT, content_name: "report_request", currency: "JPY", value: 0 },
          eventID ? { eventID } : undefined,
        );
        if (typeof window !== "undefined" && window.parent === window) {
          // @ts-ignore
          window.fbq?.("track", "CompleteRegistration", {
            lp_variant: LP_VARIANT,
            form_id: LP_VARIANT,
            currency: "JPY",
            value: 0,
          });
        }
      } catch {}
      await new Promise((r) => setTimeout(r, 150));
      try {
        window.location.href = MEETING_URL;
      } catch {
        window.location.href = MEETING_URL;
      }
    } catch {
      setError("送信できませんでした。少し時間をおいてもう一度お試しください。");
      trackFunnel("form_submit_error", {
        lp_variant: LP_VARIANT,
        error_type: "network_error",
      });
      setSubmitting(false);
    }
  }

  return (
    <div>
      {/* Progress Ledger — editorial 3-column */}
      <ProgressLedger step={step} />

      {/* Chapter Header per step */}
      <div className="chapter-marker mt-10">
        <span className="rule-teal-sm" />
        <p className="eyebrow text-sekai-teal">
          {step === 1 && "Step 01 · 手数料"}
          {step === 2 && "Step 02 · 物件情報"}
          {step === 3 && "Step 03 · ご連絡先"}
        </p>
      </div>
      <h2 className="font-sans font-bold text-[24px] md:text-[28px] text-ink leading-snug mb-8 jp-keep">
        {step === 1 && "今の運営代行の手数料を教えてください"}
        {step === 2 && "物件の情報を教えてください"}
        {step === 3 && "レポートをお届けする連絡先を教えてください"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-10">
        {step === 1 && (
          <Step1Fee
            commissionRate={form.commissionRate}
            onChange={(v) => update("commissionRate", v)}
            startingNew={form.startingNew}
            onStartingNew={handleStartingNew}
          />
        )}
        {step === 2 && (
          <Step2Property
            airbnbUrl={form.airbnbUrl}
            noPropertyYet={form.noPropertyYet}
            totalProperties={form.totalProperties}
            peakMan={form.peakRevenueMan}
            offpeakMan={form.offpeakRevenueMan}
            yearsIdx={form.yearsIdx}
            onAirbnbUrl={(v) => update("airbnbUrl", v)}
            onNoPropertyYet={(v) => update("noPropertyYet", v)}
            onTotalProperties={(v) => update("totalProperties", v)}
            onPeakMan={(v) => update("peakRevenueMan", v)}
            onOffpeakMan={(v) => update("offpeakRevenueMan", v)}
            onYearsIdx={(v) => update("yearsIdx", v)}
          />
        )}
        {step === 3 && (
          <Step3Contact
            name={form.name}
            email={form.email}
            phone={form.phone}
            complaints={form.complaints}
            onChange={(k, v) => update(k, v as never)}
          />
        )}

        {error && (
          <div className="bg-paper border border-red-300 text-red-700 px-5 py-4 text-[14px] font-sans">
            {error}
          </div>
        )}

        {/* Navigation — editorial buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-rule">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="btn btn-ghost flex-1 justify-center text-[14px]"
            >
              ← 戻る
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              disabled={(step === 1 && !canNextFromStep1) || (step === 2 && !canNextFromStep2)}
              onClick={handleNext}
              className="btn btn-primary flex-1 justify-center text-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              次へ →
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting || !canSubmit}
              className="btn btn-primary flex-1 justify-center text-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "送信中..." : "無料レポート申込 →"}
            </button>
          )}
        </div>

        {step === 3 && (
          <p className="text-[12px] text-center leading-relaxed text-mid-gray font-sans">
            ご入力いただいた情報は暗号化して送信され、レポート作成以外の目的では使用されません。
          </p>
        )}
      </form>
    </div>
  );
}

// ─────── ProgressLedger ───────

function ProgressLedger({ step }: { step: Step }) {
  const items = [
    { n: 1, label: "Fee" },
    { n: 2, label: "Property" },
    { n: 3, label: "Contact" },
  ];
  return (
    <div className="bg-rule grid grid-cols-3 gap-px border border-rule">
      {items.map((s) => {
        const active = s.n <= step;
        return (
          <div key={s.n} className={`p-4 ${active ? "bg-ink text-ivory" : "bg-paper text-mid-gray"}`}>
            <p className={`eyebrow-mono mb-1 ${active ? "text-bright-teal" : "text-mid-gray"}`}>
              Step {String(s.n).padStart(2, "0")}
            </p>
            <p className={`font-sans text-[13px] ${active ? "text-ivory" : "text-mid-gray"}`}>{s.label}</p>
          </div>
        );
      })}
    </div>
  );
}

// ─────── Field (editorial numbered label) ───────

function Field({
  number,
  label,
  required,
  children,
  hint,
}: {
  number: string;
  label: string;
  required?: boolean;
  children: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-sans font-light text-[22px] text-sekai-teal leading-none tabular-nums">{number}</span>
        <label className="font-sans font-medium text-[14px] md:text-[15px] text-ink">
          {label}
          {required && <span className="text-sekai-teal ml-1 font-sans">*</span>}
        </label>
      </div>
      {children}
      {hint && <p className="text-[12px] text-mid-gray mt-2 font-sans leading-relaxed">{hint}</p>}
    </div>
  );
}

const editorialInput =
  "w-full bg-mist border border-rule px-5 py-4 text-[15px] font-sans text-ink placeholder:text-mid-gray/70 outline-none transition focus:border-sekai-teal focus:bg-paper";

// ─────── Step 1: Fee ───────

function Step1Fee({
  commissionRate,
  onChange,
  startingNew,
  onStartingNew,
}: {
  commissionRate: string;
  onChange: (v: string) => void;
  startingNew: boolean;
  onStartingNew: (v: boolean) => void;
}) {
  const isCardValue = (FEE_CARDS as readonly string[]).includes(commissionRate);
  const otherSelected = !isCardValue && commissionRate !== "";
  const dimmed = startingNew ? "opacity-40 pointer-events-none" : "";

  return (
    <Field number="01" label="現在の運営代行手数料" required>
      <div className={`grid grid-cols-2 gap-3 transition-opacity ${dimmed}`}>
        {FEE_CARDS.map((v) => {
          const selected = commissionRate === v;
          return (
            <button
              key={v}
              type="button"
              onClick={() => onChange(v)}
              disabled={startingNew}
              className={`py-6 text-[22px] font-bold border transition-all active:scale-[0.98] font-sans ${
                selected
                  ? "bg-ink text-ivory border-ink"
                  : "bg-paper text-ink border-rule hover:border-sekai-teal/60"
              }`}
            >
              {v}%
            </button>
          );
        })}
        <div
          className={`border transition-all relative ${
            otherSelected ? "bg-ink border-ink" : "bg-paper border-rule"
          }`}
        >
          <select
            value={otherSelected ? commissionRate : ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={startingNew}
            className={`w-full h-full px-4 py-6 text-center text-[15px] font-semibold appearance-none cursor-pointer bg-transparent focus:outline-none focus:ring-2 focus:ring-sekai-teal/30 font-sans ${
              otherSelected ? "text-ivory" : "text-ink"
            }`}
          >
            <option value="" disabled>
              その他 ▾
            </option>
            {OTHER_FEE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="text-ink">
                {o.label}
              </option>
            ))}
          </select>
          <span
            className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[11px] ${
              otherSelected ? "text-ivory/70" : "text-mid-gray"
            }`}
          >
            ▾
          </span>
        </div>
      </div>
      <label className="flex items-start gap-2 mt-4 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={startingNew}
          onChange={(e) => onStartingNew(e.target.checked)}
          className="mt-1 w-4 h-4 accent-sekai-teal shrink-0 cursor-pointer"
        />
        <span className="text-[13px] leading-relaxed text-dark-gray font-sans">これから民泊を始める方</span>
      </label>
    </Field>
  );
}

// ─────── Step 2: Property + Revenue + Years ───────

function Step2Property({
  airbnbUrl,
  noPropertyYet,
  totalProperties,
  peakMan,
  offpeakMan,
  yearsIdx,
  onAirbnbUrl,
  onNoPropertyYet,
  onTotalProperties,
  onPeakMan,
  onOffpeakMan,
  onYearsIdx,
}: {
  airbnbUrl: string;
  noPropertyYet: boolean;
  totalProperties: number;
  peakMan: number;
  offpeakMan: number;
  yearsIdx: number;
  onAirbnbUrl: (v: string) => void;
  onNoPropertyYet: (v: boolean) => void;
  onTotalProperties: (v: number) => void;
  onPeakMan: (v: number) => void;
  onOffpeakMan: (v: number) => void;
  onYearsIdx: (v: number) => void;
}) {
  const [searchResults, setSearchResults] = useState<PropertySearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const looksLikeUrl = (v: string) => /^https?:\/\//i.test(v.trim());
  const showUrlError =
    !noPropertyYet && looksLikeUrl(airbnbUrl) && airbnbUrl.trim() !== "" && !isAirbnbUrl(airbnbUrl.trim());

  useEffect(() => {
    if (noPropertyYet) {
      abortRef.current?.abort();
      setSearchResults([]);
      setSearchOpen(false);
      setSearching(false);
      return;
    }
    const q = airbnbUrl.trim();
    if (q.length < 2 || looksLikeUrl(q)) {
      abortRef.current?.abort();
      setSearchResults([]);
      setSearchOpen(false);
      setSearching(false);
      return;
    }
    const ac = new AbortController();
    abortRef.current?.abort();
    abortRef.current = ac;
    const t = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/property-search?q=${encodeURIComponent(q)}`, { signal: ac.signal });
        const data = await res.json();
        if (ac.signal.aborted) return;
        setSearchResults(Array.isArray(data?.results) ? data.results : []);
        setSearchOpen(true);
      } catch {
        if (!ac.signal.aborted) setSearchResults([]);
      } finally {
        if (!ac.signal.aborted) setSearching(false);
      }
    }, 400);
    return () => {
      clearTimeout(t);
      ac.abort();
      setSearching(false);
    };
  }, [airbnbUrl, noPropertyYet]);

  function pickResult(r: PropertySearchResult) {
    onAirbnbUrl(r.url);
    setSearchOpen(false);
    setSearchResults([]);
  }

  return (
    <div className="space-y-10">
      {/* Operating years */}
      <Field number="02" label="運用年数">
        <div className="text-[22px] font-bold text-sekai-teal mb-3 font-sans">{YEARS_STOPS[yearsIdx]?.label ?? ""}</div>
        <input
          type="range"
          min={0}
          max={YEARS_STOPS.length - 1}
          step={1}
          value={yearsIdx}
          onChange={(e) => onYearsIdx(parseInt(e.target.value, 10))}
          className="w-full accent-sekai-teal"
        />
        <div className="flex justify-between text-[11px] text-mid-gray mt-2 font-sans">
          {YEARS_STOPS.map((s) => (
            <span key={s.value}>{s.label}</span>
          ))}
        </div>
      </Field>

      {/* Peak revenue */}
      <Field number="03" label="ピーク月の売上（1物件あたり）">
        <div className="text-[26px] font-bold text-sekai-teal mb-3 font-sans">{formatMan(peakMan)}</div>
        <input
          type="range"
          min={REVENUE_MIN_MAN}
          max={REVENUE_MAX_MAN}
          step={10}
          value={peakMan}
          onChange={(e) => onPeakMan(parseInt(e.target.value, 10))}
          className="w-full accent-sekai-teal"
        />
        <div className="flex justify-between text-[11px] text-mid-gray mt-2 font-sans">
          <span>10万円</span>
          <span>300万円以上</span>
        </div>
      </Field>

      {/* Off-peak revenue */}
      <Field number="04" label="オフピーク月の売上（1物件あたり）">
        <div className="text-[26px] font-bold text-sekai-teal mb-3 font-sans">{formatMan(offpeakMan)}</div>
        <input
          type="range"
          min={REVENUE_MIN_MAN}
          max={REVENUE_MAX_MAN}
          step={10}
          value={offpeakMan}
          onChange={(e) => onOffpeakMan(parseInt(e.target.value, 10))}
          className="w-full accent-sekai-teal"
        />
        <div className="flex justify-between text-[11px] text-mid-gray mt-2 font-sans">
          <span>10万円</span>
          <span>300万円以上</span>
        </div>
      </Field>

      {/* Property name search */}
      <Field number="05" label="物件名をAirBnBで検索" required>
        <div className="relative">
          <input
            type="text"
            value={airbnbUrl}
            onChange={(e) => onAirbnbUrl(e.target.value)}
            onFocus={() => {
              if (searchResults.length > 0) setSearchOpen(true);
            }}
            onBlur={() => {
              setTimeout(() => setSearchOpen(false), 150);
            }}
            placeholder="2文字以上でAirBnB検索を開始"
            disabled={noPropertyYet}
            className={`${editorialInput} disabled:bg-pale-gray disabled:cursor-not-allowed disabled:opacity-60 ${
              showUrlError ? "border-red-300" : ""
            }`}
          />
          {searching && !noPropertyYet && (
            <p className="text-[12px] text-mid-gray mt-2 font-sans">物件を検索しています…</p>
          )}
          {searchOpen && !noPropertyYet && searchResults.length > 0 && (
            <ul className="absolute z-20 left-0 right-0 mt-1 max-h-72 overflow-y-auto border border-rule bg-paper shadow-lg">
              {searchResults.slice(0, 6).map((r) => (
                <li key={r.url}>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      pickResult(r);
                    }}
                    className="w-full text-left px-4 py-3 text-[14px] hover:bg-mist flex items-center gap-2 font-sans"
                  >
                    <span className="inline-block px-1.5 py-0.5 text-[10px] rounded font-bold bg-rose-50 text-rose-600 shrink-0">
                      Airbnb
                    </span>
                    <span className="truncate text-ink">{r.title || r.url}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {showUrlError && <p className="text-[12px] text-red-600 mt-2 font-sans">Airbnb の URL を入力してください</p>}
        </div>
        <label className="flex items-start gap-2 mt-4 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={noPropertyYet}
            onChange={(e) => onNoPropertyYet(e.target.checked)}
            className="mt-1 w-4 h-4 accent-sekai-teal shrink-0 cursor-pointer"
          />
          <span className="text-[13px] leading-relaxed text-dark-gray font-sans">
            まだ物件を AirBnB に掲載していない・アクティブなリスティングが無い
          </span>
        </label>
        {noPropertyYet && (
          <p className="text-[12px] text-amber-700 bg-amber-50 border border-amber-200 px-4 py-3 mt-3 leading-relaxed font-sans">
            ※ 新規立ち上げ物件の初期費用は別途お見積もりとなります（サイト記載の初期費用無料は運用中の物件が対象です）
          </p>
        )}
      </Field>

      {/* Total properties */}
      <Field number="06" label="他にも物件を管理されていますか？">
        <div className="text-[22px] font-bold text-sekai-teal mb-3 font-sans">{formatProperties(totalProperties)}</div>
        <input
          type="range"
          min={1}
          max={PROPERTIES_MAX}
          step={1}
          value={totalProperties}
          onChange={(e) => onTotalProperties(parseInt(e.target.value, 10))}
          className="w-full accent-sekai-teal"
        />
        <div className="flex justify-between text-[11px] text-mid-gray mt-2 font-sans">
          <span>1棟</span>
          <span>30棟以上</span>
        </div>
      </Field>
    </div>
  );
}

// ─────── Step 3: Contact ───────

function Step3Contact({
  name,
  email,
  phone,
  complaints,
  onChange,
}: {
  name: string;
  email: string;
  phone: string;
  complaints: string;
  onChange: (k: "name" | "email" | "phone" | "complaints", v: string) => void;
}) {
  return (
    <div className="space-y-8">
      <Field number="07" label="お名前" required>
        <input
          type="text"
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
          autoComplete="name"
          maxLength={100}
          placeholder="山田 太郎"
          className={editorialInput}
        />
      </Field>
      <Field number="08" label="メールアドレス" required>
        <input
          type="email"
          inputMode="email"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
          autoComplete="email"
          maxLength={200}
          placeholder="example@email.com"
          className={editorialInput}
        />
      </Field>
      <Field number="09" label="電話番号" required>
        <input
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => onChange("phone", e.target.value)}
          autoComplete="tel"
          maxLength={50}
          placeholder="090-1234-5678"
          className={editorialInput}
        />
      </Field>
      <Field number="10" label="現状の課題（任意）">
        <textarea
          value={complaints}
          onChange={(e) => onChange("complaints", e.target.value)}
          rows={5}
          maxLength={2000}
          placeholder="現代行や運営面でのご不満・ご要望があればお書きください"
          className={editorialInput + " resize-none"}
        />
      </Field>
    </div>
  );
}
