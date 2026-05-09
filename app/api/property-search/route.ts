/* ─────────────────────────────────────────────────────────────
 * /api/property-search — 吉蔵側 /api/report-requests/property-search の Server-side Proxy
 *
 * クライアントから japanvillas.kss-cloud.com を直接叩くと CORS で弾かれるため、
 * sekaistay.com 側で中継する。検索クエリ（q）のみを受け取り、結果をそのまま透過。
 * ───────────────────────────────────────────────────────────── */

import { NextResponse } from "next/server";

const UPSTREAM = "https://japanvillas.kss-cloud.com/api/report-requests/property-search";
const ATTEMPT_TIMEOUT_MS = 8_000;
const USER_AGENT = "sekaistay-property-search-proxy/1.0 (+https://sekaistay.com)";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") || "").trim();
  if (q.length < 2) {
    return NextResponse.json({ ok: true, results: [] }, { status: 200 });
  }
  if (q.length > 100) {
    return NextResponse.json({ ok: false, error: "query too long" }, { status: 400 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ATTEMPT_TIMEOUT_MS);
  try {
    const res = await fetch(`${UPSTREAM}?q=${encodeURIComponent(q)}`, {
      method: "GET",
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "application/json",
      },
      cache: "no-store",
      signal: controller.signal,
    });
    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    const aborted = e instanceof Error && e.name === "AbortError";
    return NextResponse.json(
      { ok: false, error: aborted ? "upstream timeout" : "upstream error" },
      { status: aborted ? 504 : 502 },
    );
  } finally {
    clearTimeout(timer);
  }
}
