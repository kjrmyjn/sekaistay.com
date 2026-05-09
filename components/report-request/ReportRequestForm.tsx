"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type PropertySearchResult = {
  source: "airbnb" | "other";
  url: string;
  title?: string;
};

// ─────── Constants ───────

const COMMISSION_OPTIONS = [
  { value: "15", label: "15%" },
  { value: "20", label: "20%" },
  { value: "25", label: "25%" },
  { value: "unknown", label: "わからない" },
];

const YEARS_OPTIONS = [
  { value: "0", label: "1年未満" },
  { value: "1", label: "1〜2年" },
  { value: "3", label: "3〜5年" },
  { value: "5", label: "5年以上" },
];

const MEETING_URL = "https://timerex.net/s/sekai-stay/d61b424d";
const SEKAI_STAY_FEE = 8;
const MAX_REVENUE_MAN = 300;

// ─────── Types ───────

type FormState = {
  airbnbUrl: string;
  totalProperties: number; // 1〜30+
  peakRevenueMan: number;
  offpeakRevenueMan: number;
  commissionRate: string;
  operatingYears: string;
  name: string;
  email: string;
  phone: string;
  complaints: string;
};

const INITIAL: FormState = {
  airbnbUrl: "",
  totalProperties: 1,
  peakRevenueMan: 80,
  offpeakRevenueMan: 20,
  commissionRate: "",
  operatingYears: "",
  name: "",
  email: "",
  phone: "",
  complaints: "",
};

type Step = 1 | 2 | 3 | 4;

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

export type ReportRequestFormProps = {
  lpVariant?: string;
  embed?: boolean;
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
  if (man >= MAX_REVENUE_MAN) return `${MAX_REVENUE_MAN}万円以上`;
  return `約${man}万円`;
}

function formatProperties(n: number): string {
  if (n >= 30) return "30棟以上";
  return `${n}棟`;
}

const TEMPLATE_FEE_OPTIONS = [10, 15, 20, 25, 30];
function commissionPct(code: string): number | null {
  if (!code || code === "unknown") return null;
  const n = parseInt(code, 10);
  if (!Number.isFinite(n)) return null;
  return TEMPLATE_FEE_OPTIONS.reduce(
    (a, b) => (Math.abs(b - n) < Math.abs(a - n) ? b : a),
    TEMPLATE_FEE_OPTIONS[0],
  );
}

function rangeMidpointYen(man: number): number {
  const r = manToRange(man);
  const map: Record<string, number> = {
    "0-10": 50_000,
    "10-20": 150_000,
    "20-30": 250_000,
    "30-50": 400_000,
    "50-80": 650_000,
    "80-120": 1_000_000,
    "120-200": 1_600_000,
    "200-300": 2_500_000,
    "300+": 3_500_000,
  };
  return map[r] ?? 0;
}

function estimateAnnualLoss(peakMan: number, offpeakMan: number, commission: string): number | null {
  const peak = rangeMidpointYen(peakMan);
  const off = rangeMidpointYen(offpeakMan);
  const curFee = commissionPct(commission);
  if (!peak || !off || curFee == null) return null;
  const delta = curFee - SEKAI_STAY_FEE;
  if (delta <= 0) return null;
  const annualRevenue = peak * 6 + off * 6;
  return Math.round((annualRevenue * delta) / 100);
}

function formatYen(n: number): string {
  if (n >= 10_000) {
    const man = Math.round(n / 10_000);
    return `約${man.toLocaleString("ja-JP")}万円`;
  }
  return `約¥${n.toLocaleString("ja-JP")}`;
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

function useCountdown(deadline: Date | null) {
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    if (!deadline) return;
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, [deadline]);
  if (!deadline) return { h: 0, m: 0, s: 0, expired: true };
  const diff = Math.max(0, deadline.getTime() - now.getTime());
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { h, m, s, expired: diff === 0 };
}

// ─────── Main Form ───────

export function ReportRequestForm({ lpVariant, embed = false }: ReportRequestFormProps) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [annualLoss, setAnnualLoss] = useState<number | null>(null);
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

  // iframe height notify
  useEffect(() => {
    if (!embed || typeof window === "undefined") return;
    const notifyHeight = () => {
      const height = document.body.scrollHeight;
      try {
        window.parent.postMessage({ type: "japan-villas-height", height }, "*");
      } catch {}
    };
    notifyHeight();
    const observer = new ResizeObserver(notifyHeight);
    observer.observe(document.body);
    window.addEventListener("load", notifyHeight);
    const interval = setInterval(notifyHeight, 1000);
    return () => {
      observer.disconnect();
      window.removeEventListener("load", notifyHeight);
      clearInterval(interval);
    };
  }, [embed]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const canNextFromStep1 = useMemo(
    () => form.airbnbUrl.trim().length > 0 && isAirbnbUrl(form.airbnbUrl.trim()),
    [form.airbnbUrl],
  );
  const canNextFromStep2 = useMemo(
    () => form.peakRevenueMan >= 0 && form.offpeakRevenueMan >= 0,
    [form.peakRevenueMan, form.offpeakRevenueMan],
  );
  const canNextFromStep3 = useMemo(
    () => form.commissionRate !== "" && form.operatingYears !== "",
    [form.commissionRate, form.operatingYears],
  );
  const canSubmit = useMemo(
    () => form.name.trim() && form.email.trim() && form.phone.trim(),
    [form.name, form.email, form.phone],
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        airbnbUrl: form.airbnbUrl.trim(),
        peakRevenue: manToRange(form.peakRevenueMan),
        offpeakRevenue: manToRange(form.offpeakRevenueMan),
        commissionRate: form.commissionRate,
        operatingYears: form.operatingYears,
        complaints: form.complaints,
        totalProperties: form.totalProperties,
        lpVariant,
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
        setSubmitting(false);
        return;
      }
      setDeadline(new Date(Date.now() + 24 * 60 * 60 * 1000));
      setAnnualLoss(estimateAnnualLoss(form.peakRevenueMan, form.offpeakRevenueMan, form.commissionRate));
      setDone(true);
      // GA4 event
      try {
        // @ts-ignore
        window.gtag?.("event", "lead", {
          lp_variant: lpVariant || "direct",
          form_variant: "default",
          commission_rate: form.commissionRate,
        });
        // @ts-ignore
        window.fbq?.("track", "Lead", { lp_variant: lpVariant || "direct", content_name: "report_request" });
      } catch {}
      // iframe parent notify
      try {
        if (typeof window !== "undefined" && window.parent !== window) {
          window.parent.postMessage(
            { type: "japan-villas-form-submitted", form_id: lpVariant || "report-request" },
            "*",
          );
        }
      } catch {}
      // 完了画面を画面内に収める（LPの一番上に飛ぶのを防ぐ）
      if (embed) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch {
      setError("送信できませんでした。少し時間をおいてもう一度お試しください。");
      setSubmitting(false);
    }
  }

  if (done) {
    return <DoneScreen embed={embed} deadline={deadline} annualLoss={annualLoss} />;
  }

  return (
    <div className={embed ? "" : "py-8"}>
      <div className="max-w-xl mx-auto px-5">
        <ProgressBar step={step} />
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
          {step === 1 && (
            <Step1Property
              airbnbUrl={form.airbnbUrl}
              totalProperties={form.totalProperties}
              onAirbnbUrl={(v) => update("airbnbUrl", v)}
              onTotalProperties={(v) => update("totalProperties", v)}
            />
          )}
          {step === 2 && (
            <Step2Revenue
              peakMan={form.peakRevenueMan}
              offpeakMan={form.offpeakRevenueMan}
              onChange={(k, v) => update(k, v as never)}
            />
          )}
          {step === 3 && (
            <Step3FeeYears
              commissionRate={form.commissionRate}
              operatingYears={form.operatingYears}
              onChange={(k, v) => update(k, v as never)}
            />
          )}
          {step === 4 && (
            <Step4Contact
              name={form.name}
              email={form.email}
              phone={form.phone}
              complaints={form.complaints}
              onChange={(k, v) => update(k, v as never)}
            />
          )}

          {error && (
            <div className="rounded-lg px-4 py-3 text-sm bg-red-50 border border-red-200 text-red-700">
              {error}
            </div>
          )}

          <div className="flex gap-3 mt-2">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
                className="flex-1 rounded-lg py-3 text-[15px] font-medium bg-white text-ink border border-rule transition-all active:scale-[0.98]"
              >
                ← 戻る
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                disabled={
                  (step === 1 && !canNextFromStep1) ||
                  (step === 2 && !canNextFromStep2) ||
                  (step === 3 && !canNextFromStep3)
                }
                onClick={() => setStep((s) => (s + 1) as Step)}
                className="flex-1 rounded-lg py-3 text-[15px] font-semibold text-white transition-all active:scale-[0.98] bg-sekai-teal disabled:bg-mid-gray disabled:cursor-not-allowed disabled:opacity-80"
              >
                次へ →
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting || !canSubmit}
                className="flex-1 rounded-lg py-3 text-[15px] font-semibold text-white transition-all active:scale-[0.98] bg-sekai-teal disabled:bg-mid-gray disabled:cursor-not-allowed"
                style={{ opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? "送信中..." : "無料レポートを申し込む"}
              </button>
            )}
          </div>

          {step === 4 && (
            <p className="text-[11px] text-center leading-relaxed text-mid-gray">
              ご入力いただいた情報は暗号化して送信され、レポート作成以外の目的では使用されません。
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

// ─────── ProgressBar ───────

function ProgressBar({ step }: { step: Step }) {
  const labels = ["物件情報", "売上", "手数料", "ご連絡先"];
  return (
    <div className="flex items-center gap-1">
      {labels.map((label, i) => {
        const idx = (i + 1) as Step;
        const state = idx < step ? "done" : idx === step ? "active" : "pending";
        return (
          <div key={label} className="flex items-center flex-1">
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${
                  state === "pending" ? "bg-rule text-mid-gray" : "bg-sekai-teal text-white"
                }`}
              >
                {state === "done" ? "✓" : idx}
              </div>
              <span
                className={`text-[11px] font-medium truncate ${
                  state === "pending" ? "text-mid-gray" : "text-ink"
                }`}
              >
                {label}
              </span>
            </div>
            {i < labels.length - 1 && <div className="w-3 h-px bg-rule" />}
          </div>
        );
      })}
    </div>
  );
}

// ─────── Step 1: Property ───────

function Step1Property({
  airbnbUrl,
  totalProperties,
  onAirbnbUrl,
  onTotalProperties,
}: {
  airbnbUrl: string;
  totalProperties: number;
  onAirbnbUrl: (v: string) => void;
  onTotalProperties: (v: number) => void;
}) {
  const [searchResults, setSearchResults] = useState<PropertySearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const looksLikeUrl = (v: string) => /^https?:\/\//i.test(v.trim());
  const showUrlError = looksLikeUrl(airbnbUrl) && airbnbUrl.trim() !== "" && !isAirbnbUrl(airbnbUrl.trim());

  useEffect(() => {
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
  }, [airbnbUrl]);

  function pickResult(r: PropertySearchResult) {
    onAirbnbUrl(r.url);
    setSearchOpen(false);
    setSearchResults([]);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <label className="block text-[14px] font-semibold mb-2 text-ink">
          物件のAirbnb URL <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          inputMode="url"
          value={airbnbUrl}
          onChange={(e) => onAirbnbUrl(e.target.value)}
          onFocus={() => { if (searchResults.length > 0) setSearchOpen(true); }}
          onBlur={() => { setTimeout(() => setSearchOpen(false), 150); }}
          placeholder="物件名で検索、または URL を貼り付け"
          className={`w-full px-4 py-3 rounded-lg border bg-white text-[15px] placeholder:text-mid-gray focus:outline-none focus:ring-2 focus:ring-sekai-teal/20 ${
            showUrlError ? "border-red-300" : "border-rule"
          }`}
        />
        {searching && (
          <p className="text-[12px] text-mid-gray mt-1.5">物件を検索しています…</p>
        )}
        {searchOpen && searchResults.length > 0 && (
          <ul className="absolute z-20 left-0 right-0 mt-1 max-h-72 overflow-y-auto rounded-lg border border-rule bg-white shadow-lg">
            {searchResults.slice(0, 6).map((r) => (
              <li key={r.url}>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); pickResult(r); }}
                  className="w-full text-left px-3 py-2 text-[14px] hover:bg-light-gray flex items-center gap-2"
                >
                  <span className="inline-block px-1.5 py-0.5 text-[10px] rounded font-bold bg-rose-50 text-rose-600 shrink-0">
                    Airbnb
                  </span>
                  <span className="truncate">{r.title || r.url}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {showUrlError && (
          <p className="text-[12px] text-red-600 mt-1.5">Airbnb の URL を入力してください</p>
        )}
        <p className="text-[12px] text-mid-gray mt-1.5">
          物件名で検索して選択 or https://www.airbnb.jp/rooms/… を直接貼り付け
        </p>
      </div>

      <div>
        <label className="block text-[14px] font-semibold mb-2 text-ink">
          全ての管理物件数
        </label>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[24px] font-bold text-sekai-teal">
            {formatProperties(totalProperties)}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={30}
          step={1}
          value={totalProperties}
          onChange={(e) => onTotalProperties(parseInt(e.target.value, 10))}
          className="w-full accent-sekai-teal"
        />
        <div className="flex justify-between text-[11px] text-mid-gray mt-1">
          <span>1棟</span>
          <span>30棟以上</span>
        </div>
      </div>
    </div>
  );
}

// ─────── Step 2: Revenue ───────

function Step2Revenue({
  peakMan,
  offpeakMan,
  onChange,
}: {
  peakMan: number;
  offpeakMan: number;
  onChange: (k: "peakRevenueMan" | "offpeakRevenueMan", v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="block text-[14px] font-semibold mb-2 text-ink">
          ピーク月の売上（1物件あたり・月）
        </label>
        <div className="text-[28px] font-bold text-sekai-teal mb-2">{formatMan(peakMan)}</div>
        <input
          type="range"
          min={0}
          max={MAX_REVENUE_MAN}
          step={10}
          value={peakMan}
          onChange={(e) => onChange("peakRevenueMan", parseInt(e.target.value, 10))}
          className="w-full accent-sekai-teal"
        />
        <div className="flex justify-between text-[11px] text-mid-gray mt-1">
          <span>0万円</span>
          <span>300万円以上</span>
        </div>
      </div>
      <div>
        <label className="block text-[14px] font-semibold mb-2 text-ink">
          オフピーク月の売上（1物件あたり・月）
        </label>
        <div className="text-[28px] font-bold text-sekai-teal mb-2">{formatMan(offpeakMan)}</div>
        <input
          type="range"
          min={0}
          max={MAX_REVENUE_MAN}
          step={10}
          value={offpeakMan}
          onChange={(e) => onChange("offpeakRevenueMan", parseInt(e.target.value, 10))}
          className="w-full accent-sekai-teal"
        />
        <div className="flex justify-between text-[11px] text-mid-gray mt-1">
          <span>0万円</span>
          <span>300万円以上</span>
        </div>
      </div>
    </div>
  );
}

// ─────── Step 3: Fee + Years ───────

function Step3FeeYears({
  commissionRate,
  operatingYears,
  onChange,
}: {
  commissionRate: string;
  operatingYears: string;
  onChange: (k: "commissionRate" | "operatingYears", v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="block text-[14px] font-semibold mb-2 text-ink">現在の運営代行手数料</label>
        <div className="grid grid-cols-2 gap-2">
          {COMMISSION_OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange("commissionRate", o.value)}
              className={`rounded-lg py-3 text-[15px] font-medium border transition-all active:scale-[0.98] ${
                commissionRate === o.value
                  ? "bg-sekai-teal text-white border-sekai-teal"
                  : "bg-white text-ink border-rule"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-[14px] font-semibold mb-2 text-ink">運用年数</label>
        <div className="grid grid-cols-2 gap-2">
          {YEARS_OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange("operatingYears", o.value)}
              className={`rounded-lg py-3 text-[15px] font-medium border transition-all active:scale-[0.98] ${
                operatingYears === o.value
                  ? "bg-sekai-teal text-white border-sekai-teal"
                  : "bg-white text-ink border-rule"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────── Step 4: Contact ───────

function Step4Contact({
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
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-[14px] font-semibold mb-1.5 text-ink">
          お名前 <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
          autoComplete="name"
          maxLength={100}
          className="w-full px-4 py-3 rounded-lg border border-rule bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-sekai-teal/20"
        />
      </div>
      <div>
        <label className="block text-[14px] font-semibold mb-1.5 text-ink">
          メールアドレス <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          inputMode="email"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
          autoComplete="email"
          maxLength={200}
          className="w-full px-4 py-3 rounded-lg border border-rule bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-sekai-teal/20"
        />
      </div>
      <div>
        <label className="block text-[14px] font-semibold mb-1.5 text-ink">
          電話番号 <span className="text-red-600">*</span>
        </label>
        <input
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => onChange("phone", e.target.value)}
          autoComplete="tel"
          maxLength={50}
          className="w-full px-4 py-3 rounded-lg border border-rule bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-sekai-teal/20"
        />
      </div>
      <div>
        <label className="block text-[14px] font-semibold mb-1.5 text-ink">
          現代行や運営面でのご不満・ご要望（任意）
        </label>
        <textarea
          value={complaints}
          onChange={(e) => onChange("complaints", e.target.value)}
          rows={4}
          maxLength={2000}
          className="w-full px-4 py-3 rounded-lg border border-rule bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-sekai-teal/20"
        />
      </div>
    </div>
  );
}

// ─────── Done Screen ───────

function DoneScreen({
  embed,
  deadline,
  annualLoss,
}: {
  embed: boolean;
  deadline: Date | null;
  annualLoss: number | null;
}) {
  const countdown = useCountdown(deadline);
  const deadlineLabel = deadline
    ? deadline.toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })
    : null;

  return (
    <div className={embed ? "" : "py-12 min-h-screen bg-ivory"}>
      <div className="max-w-xl mx-auto px-5">
        <div className="rounded-2xl p-8 mb-5 bg-white border border-rule shadow-sm">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5 bg-teal-tint">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#167B81" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-[22px] font-semibold mb-3 text-ink">
            診断結果と詳細レポートを送ります
          </h1>
          <p className="text-[15px] leading-relaxed mb-5 text-dark-gray">
            <strong className="text-ink">24時間後</strong>に、物件専用の分析レポート（専用URL）をご入力のメールアドレスへお送りします。
          </p>
          {deadlineLabel && (
            <div className="rounded-lg p-4 mb-2 bg-teal-tint border border-bright-teal/30">
              <p className="text-[12px] mb-1 text-sekai-teal font-semibold">送信予定</p>
              <p className="text-[18px] font-bold mb-1 text-ink">{deadlineLabel} ごろ</p>
              {!countdown.expired && (
                <p className="text-[13px] font-mono tabular-nums text-sekai-teal">
                  残り {String(countdown.h).padStart(2, "0")}:{String(countdown.m).padStart(2, "0")}:
                  {String(countdown.s).padStart(2, "0")}
                </p>
              )}
            </div>
          )}
        </div>

        {annualLoss && annualLoss > 0 && (
          <div className="rounded-2xl p-6 mb-5 bg-bone border border-rule">
            <p className="text-[12px] font-semibold mb-2 text-sekai-teal tracking-wider">
              あなたが今、失っている可能性のあるコスト
            </p>
            <p className="text-[13px] leading-relaxed mb-3 text-dark-gray">現在の代行手数料で年間</p>
            <p className="text-[32px] font-bold leading-none mb-3 text-deep-teal">{formatYen(annualLoss)}</p>
            <p className="text-[12px] leading-relaxed text-mid-gray">
              SEKAI STAY 8% への切替で削減できる見込み額（申請内容から概算）。
            </p>
          </div>
        )}

        <div className="rounded-2xl p-6 mb-5 bg-white border border-rule shadow-sm">
          <p className="text-[13px] font-semibold mb-2 text-ink">
            レポートを待たずに、直接話を聞きたい方へ
          </p>
          <p className="text-[13px] leading-relaxed mb-4 text-dark-gray">
            申請内容を踏まえて、その場で収益改善の仮プランをご提示します。
          </p>
          <a
            href={MEETING_URL}
            target="_blank"
            rel="noreferrer"
            className="block rounded-lg py-3 text-center text-[15px] font-semibold text-white bg-sekai-teal transition-all active:scale-[0.98]"
          >
            ミーティングを予約する →
          </a>
        </div>

        <div className="rounded-lg p-4 text-[13px] leading-relaxed bg-mist text-dark-gray">
          <p className="mb-1 text-ink font-medium">お急ぎの場合</p>
          <p>contact@sekaichi.org までお問い合わせください。</p>
        </div>
      </div>
    </div>
  );
}
