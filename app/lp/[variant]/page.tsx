import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReportRequestForm } from "@/components/report-request/ReportRequestForm";

// 6 variants — see sekaichi-dashboard LeadAcquisitionSection.tsx
//   3 designs × 2 variations: シンプル(長さ) / バランス(内容) / コテコテ(フォーム位置)
const VARIANTS = {
  "simple-short": { design: "simple", variation: "short", label: "シンプル(短)" },
  "simple-long": { design: "simple", variation: "long", label: "シンプル(長)" },
  "balance-light": { design: "balance", variation: "light", label: "バランス(薄)" },
  "balance-dense": { design: "balance", variation: "dense", label: "バランス(濃)" },
  "kotekote-form-first": { design: "kotekote", variation: "form-first", label: "コテコテ(フォーム先)" },
  "kotekote-form-last": { design: "kotekote", variation: "form-last", label: "コテコテ(フォーム後)" },
} as const;

type VariantKey = keyof typeof VARIANTS;

export async function generateStaticParams() {
  return Object.keys(VARIANTS).map((variant) => ({ variant }));
}

export async function generateMetadata({ params }: { params: { variant: string } }): Promise<Metadata> {
  const v = VARIANTS[params.variant as VariantKey];
  if (!v) return { title: "Not Found" };
  return {
    title: `民泊運用代行を 8% に切替 | SEKAI STAY`,
    description: "AI ネイティブ運営で代行手数料 8% + 月1万円/物件。24時間以内に無料診断レポートをお届け。",
    robots: { index: false, follow: false },
  };
}

export default function LpVariantPage({ params }: { params: { variant: string } }) {
  const v = VARIANTS[params.variant as VariantKey];
  if (!v) notFound();

  // form-first variant: form at the top
  if (v.variation === "form-first") {
    return (
      <main className="min-h-screen bg-ivory">
        <Hero />
        <ReportRequestForm lpVariant={params.variant} embed={false} />
        <Body design={v.design} variation={v.variation} />
      </main>
    );
  }

  // default: hero → body → form (form-last / standard)
  return (
    <main className="min-h-screen bg-ivory">
      <Hero />
      <Body design={v.design} variation={v.variation} />
      <ReportRequestForm lpVariant={params.variant} embed={false} />
    </main>
  );
}

// ─────── Hero (shared) ───────

function Hero() {
  return (
    <section className="bg-gradient-to-br from-deep-teal to-sekai-teal text-white">
      <div className="max-w-3xl mx-auto px-5 py-16 md:py-24">
        <p className="text-[12px] font-semibold tracking-widest text-bright-teal mb-3">SEKAI STAY</p>
        <h1 className="text-[32px] md:text-[44px] font-bold leading-tight mb-5">
          民泊運用代行を、AI ネイティブで <br className="hidden md:block" />
          <span className="text-bright-teal">8%</span> に変える。
        </h1>
        <p className="text-[16px] md:text-[18px] leading-relaxed text-white/90 mb-6">
          従来 15-25% が標準のレベニューシェアを、AI 運営により <strong>8% + 月1万円/物件</strong> へ。
          現在の手数料との差額・年間損失見込みを <strong>24時間以内</strong> に無料レポートで。
        </p>
      </div>
    </section>
  );
}

// ─────── Body (per design × variation) ───────

function Body({ design, variation }: { design: string; variation: string }) {
  // Simple: minimal — short = trust bar only, long = + value props + testimonial
  if (design === "simple") {
    return (
      <section className="bg-ivory">
        <div className="max-w-3xl mx-auto px-5 py-12">
          <TrustBar />
          {variation === "long" && (
            <>
              <ValueProps />
              <Testimonial />
              <FaqMini />
            </>
          )}
        </div>
      </section>
    );
  }

  // Balance: standard — light = core only, dense = + cases + numbers
  if (design === "balance") {
    return (
      <section className="bg-ivory">
        <div className="max-w-3xl mx-auto px-5 py-12">
          <TrustBar />
          <ValueProps />
          {variation === "dense" && (
            <>
              <CaseStudies />
              <Numbers />
              <FaqMini />
            </>
          )}
        </div>
      </section>
    );
  }

  // Kotekote: information-heavy — both variations have full content
  return (
    <section className="bg-ivory">
      <div className="max-w-3xl mx-auto px-5 py-12">
        <TrustBar />
        <ValueProps />
        <CaseStudies />
        <Numbers />
        <DetailComparison />
        <Testimonial />
        <FaqMini />
      </div>
    </section>
  );
}

// ─────── Body building blocks ───────

function TrustBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 py-6 mb-8 border-y border-rule">
      <div className="text-center">
        <div className="text-[11px] text-mid-gray mb-1">代行手数料</div>
        <div className="text-[20px] font-bold text-sekai-teal">8%</div>
      </div>
      <div className="h-8 w-px bg-rule" />
      <div className="text-center">
        <div className="text-[11px] text-mid-gray mb-1">基本料</div>
        <div className="text-[20px] font-bold text-sekai-teal">¥10,000<span className="text-[12px]">/月</span></div>
      </div>
      <div className="h-8 w-px bg-rule" />
      <div className="text-center">
        <div className="text-[11px] text-mid-gray mb-1">レポート受領</div>
        <div className="text-[20px] font-bold text-sekai-teal">24h</div>
      </div>
    </div>
  );
}

function ValueProps() {
  const items = [
    { title: "AI による収益最適化", body: "料金最適化AI・自動応答・レビュー対応で人件費を圧縮。" },
    { title: "オーナーポータル完備", body: "毎朝3秒で意思決定できる KPI 可視化ダッシュボード。" },
    { title: "OTA 一括連携", body: "Airbnb / Booking / 楽天 / 一休 / Vrbo などの主要 OTA を Beds24 で統合。" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      {items.map((it) => (
        <div key={it.title} className="rounded-2xl bg-white border border-rule p-5">
          <div className="text-[14px] font-bold mb-2 text-ink">{it.title}</div>
          <p className="text-[13px] leading-relaxed text-dark-gray">{it.body}</p>
        </div>
      ))}
    </div>
  );
}

function CaseStudies() {
  const cases = [
    { name: "LAKE HOUSE 野尻湖", note: "ピーク月 +28% / 通年稼働率 79%" },
    { name: "MOUNTAIN VILLA ニセコ", note: "オフピーク月 +42% / レビュー 4.94" },
    { name: "The Lake Side INN", note: "管理オーナー労力 -85% / 入金フロー自動化" },
  ];
  return (
    <div className="mb-12">
      <h2 className="text-[20px] font-bold mb-5 text-ink">運用実績</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cases.map((c) => (
          <div key={c.name} className="rounded-2xl bg-paper border border-rule p-5">
            <div className="text-[14px] font-semibold mb-1 text-ink">{c.name}</div>
            <div className="text-[12px] text-mid-gray">{c.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Numbers() {
  const stats = [
    { v: "8%", l: "手数料率（業界平均比 -7〜17pt）" },
    { v: "60秒", l: "診断レポート申込時間" },
    { v: "24h", l: "レポート受領まで" },
  ];
  return (
    <div className="mb-12 rounded-2xl bg-deep-teal text-white p-8">
      <div className="grid grid-cols-3 gap-4 text-center">
        {stats.map((s) => (
          <div key={s.l}>
            <div className="text-[28px] md:text-[36px] font-bold mb-1 text-bright-teal">{s.v}</div>
            <div className="text-[11px] text-white/80 leading-relaxed">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailComparison() {
  return (
    <div className="mb-12">
      <h2 className="text-[20px] font-bold mb-5 text-ink">他社代行との違い</h2>
      <div className="rounded-2xl border border-rule overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-bone">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-ink"></th>
              <th className="text-left px-4 py-3 font-semibold text-ink">SEKAI STAY</th>
              <th className="text-left px-4 py-3 font-semibold text-mid-gray">他社平均</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["手数料", "8%", "15〜25%"],
              ["月額固定費", "¥10,000/物件", "¥0〜¥30,000"],
              ["価格最適化", "AI 自動", "手動 or 業界一律"],
              ["夜間対応", "AI 90% 自動", "人による属人対応"],
              ["オーナーレポート", "ダッシュボード+月次", "月次PDFのみ"],
            ].map(([k, v1, v2]) => (
              <tr key={k} className="border-t border-rule">
                <td className="px-4 py-3 font-medium text-ink">{k}</td>
                <td className="px-4 py-3 font-semibold text-sekai-teal">{v1}</td>
                <td className="px-4 py-3 text-mid-gray">{v2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Testimonial() {
  return (
    <div className="mb-12 rounded-2xl bg-paper border border-rule p-6 md:p-8">
      <p className="text-[14px] md:text-[15px] leading-relaxed text-ink mb-3">
        「以前の代行から SEKAI STAY に切り替えて、手数料が半分以下になった上に、夜間のクレーム対応やレビュー返信まで自動化された。
        毎朝ダッシュボードで KPI を確認するだけで、運営判断ができる。」
      </p>
      <div className="text-[12px] text-mid-gray">— LAKE HOUSE 野尻湖 オーナー</div>
    </div>
  );
}

function FaqMini() {
  const faqs = [
    {
      q: "他社からの切替えにかかる時間は？",
      a: "OTA アカウント・予約引き継ぎ・契約事務を含めて 2〜4週間。並行運用も可能です。",
    },
    {
      q: "8% 以外の追加費用は？",
      a: "月額固定費 ¥10,000/物件のみ。クリーニングや消耗品は実費精算で透明化しています。",
    },
    {
      q: "オーナー名義のままでも可能？",
      a: "可能です（広告代理モード）。OTA アカウント・支払口座はオーナー名義のままご利用いただけます。",
    },
  ];
  return (
    <div className="mb-12">
      <h2 className="text-[20px] font-bold mb-5 text-ink">よくある質問</h2>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="rounded-xl bg-white border border-rule p-4">
            <summary className="text-[14px] font-semibold cursor-pointer text-ink">{f.q}</summary>
            <p className="text-[13px] leading-relaxed text-dark-gray mt-2">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
