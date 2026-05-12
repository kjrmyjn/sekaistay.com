import { getSupabaseAdmin } from "./supabase";
import type { LeadSubmissionRow } from "./lead-submissions";

const FORWARD_TIMEOUT_MS = 5000;

const SALES_PORTAL_URL = "https://sekaistay-sales-portal.vercel.app/api/public/inquiry";
// Sales Portal は public エンドポイント (認証なし・rate limit のみ) なので secret は不要。
// テスト送信が portal に流れないよう forwardLead と同じ kind="test" フィルタを適用。

export type ForwardOutcome = { ok: boolean; status?: number; error?: string };

function rowToPayload(row: LeadSubmissionRow): Record<string, unknown> {
  return {
    name: row.name,
    email: row.email,
    phone: row.phone,
    airbnbUrl: row.airbnb_url ?? undefined,
    totalProperties: row.total_properties ?? undefined,
    peakRevenue: row.peak_revenue ?? undefined,
    offpeakRevenue: row.offpeak_revenue ?? undefined,
    commissionRate: row.commission_rate ?? undefined,
    operatingYears: row.operating_years ?? undefined,
    complaints: row.complaints ?? undefined,
    companyName: row.company_name ?? undefined,
    utmSource: row.utm_source ?? undefined,
    utmMedium: row.utm_medium ?? undefined,
    utmCampaign: row.utm_campaign ?? undefined,
    utmContent: row.utm_content ?? undefined,
    utmTerm: row.utm_term ?? undefined,
    gclid: row.gclid ?? undefined,
    fbclid: row.fbclid ?? undefined,
    landingUrl: row.landing_url ?? undefined,
    referrer: row.referrer ?? undefined,
    lpVariant: row.lp_variant ?? undefined,
    formVariant: row.form_variant ?? undefined,
    submittedAt: row.created_at,
    tenichiLeadId: row.id,
  };
}

export async function forwardLead(leadId: string): Promise<ForwardOutcome> {
  const supabase = getSupabaseAdmin();
  const { data: row, error: fetchErr } = await supabase
    .from("lead_submissions")
    .select("*")
    .eq("id", leadId)
    .single();
  if (fetchErr || !row) {
    return { ok: false, error: fetchErr?.message || "row not found" };
  }
  if (row.forwarded_at) return { ok: true };

  // Don't pollute 吉蔵 prod endpoint with test/internal submissions
  if (row.kind === "test") {
    await supabase
      .from("lead_submissions")
      .update({ forwarded_at: new Date().toISOString() })
      .eq("id", leadId);
    return { ok: true };
  }

  const url = (process.env.LEAD_INTAKE_URL || "").trim();
  const secret = (process.env.LEAD_INTAKE_SECRET || "").trim();
  if (!url || !secret) {
    return { ok: false, error: "LEAD_INTAKE_URL / LEAD_INTAKE_SECRET not configured" };
  }

  const previousRetryCount = (row as LeadSubmissionRow).forward_retry_count ?? 0;

  // CAS claim: pre-increment retry_count atomically. Concurrent overlapping
  // invocations see the bumped value and lose the eq() check, so only one POSTs.
  // After this point retry_count = "attempts started" rather than "failures only";
  // on success forwarded_at is set and the row is filtered out of future scans.
  const { data: claimed, error: claimErr } = await supabase
    .from("lead_submissions")
    .update({ forward_retry_count: previousRetryCount + 1 })
    .eq("id", leadId)
    .eq("forward_retry_count", previousRetryCount)
    .is("forwarded_at", null)
    .select("id");
  if (claimErr) {
    return { ok: false, error: `claim failed: ${claimErr.message}` };
  }
  if (!claimed || claimed.length === 0) {
    return { ok: true, error: "already claimed or forwarded by another invocation" };
  }

  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), FORWARD_TIMEOUT_MS);
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Secret": secret,
      },
      body: JSON.stringify(rowToPayload(row as LeadSubmissionRow)),
      signal: ac.signal,
    });
    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      const errMsg = `HTTP ${resp.status}: ${text.slice(0, 500)}`;
      await supabase
        .from("lead_submissions")
        .update({ forward_error: errMsg })
        .eq("id", leadId);
      return { ok: false, status: resp.status, error: errMsg };
    }
    await supabase
      .from("lead_submissions")
      .update({
        forwarded_at: new Date().toISOString(),
        forward_error: null,
      })
      .eq("id", leadId);
    return { ok: true, status: resp.status };
  } catch (err: any) {
    const errMsg =
      err?.name === "AbortError"
        ? `timeout after ${FORWARD_TIMEOUT_MS}ms`
        : err?.message || String(err);
    await supabase
      .from("lead_submissions")
      .update({ forward_error: errMsg })
      .eq("id", leadId);
    return { ok: false, error: errMsg };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * SEKAI STAY 営業ポータル (sekaistay-sales-portal) への lead 転送。
 * 吉蔵の既存 forwardLead とは別経路。並行して 2 系統に送る運用。
 *
 * - public endpoint（認証なし）。本番ドメイン (sekaistay.com) からの POST は CORS 申請不要。
 * - kind === 'test' でも portal には送る（小川さんが CRM 受信確認できるよう）。
 *   識別のため source に `_test` suffix を付け、message 先頭に内部テスト旨を明記する。
 *   吉蔵 CRM / Meta CAPI 側は引き続き test skip。
 * - ガイド: https://sekaistay-sales-portal.vercel.app/integration-guide.html
 */
export async function forwardLeadToSalesPortal(leadId: string): Promise<ForwardOutcome> {
  const supabase = getSupabaseAdmin();
  const { data: row, error: fetchErr } = await supabase
    .from("lead_submissions")
    .select("*")
    .eq("id", leadId)
    .single();
  if (fetchErr || !row) {
    return { ok: false, error: fetchErr?.message || "row not found" };
  }

  // ポータルが受け付けるフィールドにマッピング (name/email/phone/company/message/source)。
  // 詳細な物件情報・収益見込みは message に集約して営業担当が即座に把握できる形に。
  const r = row as LeadSubmissionRow;
  const isTest = r.kind === "test";
  const messageBody = [
    isTest ? "[内部テスト送信 — Supabase kind=test。本番リード対応は不要]" : undefined,
    r.complaints || undefined,
    r.airbnb_url ? `Airbnb URL: ${r.airbnb_url}` : undefined,
    typeof r.total_properties === "number" ? `物件数: ${r.total_properties} 棟` : undefined,
    r.peak_revenue ? `繁忙期想定年商: ${r.peak_revenue}` : undefined,
    r.offpeak_revenue ? `閑散期想定年商: ${r.offpeak_revenue}` : undefined,
    r.commission_rate ? `現手数料: ${r.commission_rate}` : undefined,
    r.operating_years ? `運営年数: ${r.operating_years}` : undefined,
    r.utm_source || r.utm_campaign
      ? `[計測] utm_source=${r.utm_source ?? ""} utm_campaign=${r.utm_campaign ?? ""}`
      : undefined,
  ]
    .filter(Boolean)
    .join("\n");
  const baseSource = `lp_${(r.lp_variant || "report-request").replace(/[^a-z0-9_-]/gi, "_")}`;
  const source = isTest ? `${baseSource}_test` : baseSource;

  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), FORWARD_TIMEOUT_MS);
  try {
    const resp = await fetch(SALES_PORTAL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: r.name,
        email: r.email,
        phone: r.phone || undefined,
        company: r.company_name || undefined,
        message: messageBody || undefined,
        source,
      }),
      signal: ac.signal,
    });
    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      return { ok: false, status: resp.status, error: `HTTP ${resp.status}: ${text.slice(0, 500)}` };
    }
    return { ok: true, status: resp.status };
  } catch (err: any) {
    return {
      ok: false,
      error: err?.name === "AbortError" ? `timeout after ${FORWARD_TIMEOUT_MS}ms` : err?.message || String(err),
    };
  } finally {
    clearTimeout(timer);
  }
}
