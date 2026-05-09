/* ─────────────────────────────────────────────────────────────
 * /api/property-search — Airbnb 物件検索（Brave Search API 経由）
 *
 * Brave Search の `site:airbnb.jp/rooms <query>` で Airbnb 物件 URL と
 * snippet タイトルを取得。Vercel から直接 Airbnb を叩くと anti-bot で
 * 弾かれる + 吉蔵側 proxy 依存を切るため、検索エンジンを経由する。
 *
 * 結果は同一インスタンスのみ有効な Map LRU で 1h キャッシュ
 * （debounce 込みでも同一クエリが頻発するため有効）。
 *
 * 失敗時は空配列で返却（UI は手動 URL 貼付けに fallback）。
 * ───────────────────────────────────────────────────────────── */

import { NextResponse } from "next/server";

const BRAVE_ENDPOINT = "https://api.search.brave.com/res/v1/web/search";
const BRAVE_TIMEOUT_MS = 6_000;
const MAX_RESULTS = 8;
const CACHE_TTL_MS = 60 * 60 * 1000;
const CACHE_MAX_ENTRIES = 200;

export const runtime = "nodejs";

type Result = { source: "airbnb" | "other"; url: string; title?: string };
type CacheEntry = { results: Result[]; expiresAt: number };
const cache = new Map<string, CacheEntry>();

function cacheGet(key: string): Result[] | null {
  const hit = cache.get(key);
  if (!hit) return null;
  if (hit.expiresAt < Date.now()) {
    cache.delete(key);
    return null;
  }
  cache.delete(key);
  cache.set(key, hit);
  return hit.results;
}

function cacheSet(key: string, results: Result[]) {
  if (cache.size >= CACHE_MAX_ENTRIES) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
  cache.set(key, { results, expiresAt: Date.now() + CACHE_TTL_MS });
}

function normalizeAirbnbUrl(rawUrl: string): string | null {
  try {
    const u = new URL(rawUrl);
    const host = u.hostname.toLowerCase();
    const isAirbnb =
      /(^|\.)airbnb\.(com|jp|co\.jp)$/.test(host) ||
      host === "abnb.me" ||
      host.startsWith("m.airbnb.");
    if (!isAirbnb) return null;
    const m = u.pathname.match(/\/rooms\/(\d+)/);
    if (!m) return null;
    return `https://www.airbnb.jp/rooms/${m[1]}`;
  } catch {
    return null;
  }
}

function stripBraveHighlight(title: string): string {
  // Brave wraps matched terms in <strong>…</strong>; strip for plain title.
  return title.replace(/<\/?[a-zA-Z][^>]*>/g, "").trim();
}

async function searchBrave(query: string): Promise<Result[]> {
  const apiKey = (process.env.BRAVE_SEARCH_API_KEY || "").trim();
  if (!apiKey) {
    throw new Error("BRAVE_SEARCH_API_KEY not configured");
  }
  const params = new URLSearchParams({
    q: `site:airbnb.jp/rooms ${query}`,
    count: String(MAX_RESULTS * 2), // overfetch then dedup
    country: "JP",
    search_lang: "jp",
    ui_lang: "ja-JP",
    safesearch: "off",
  });
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), BRAVE_TIMEOUT_MS);
  try {
    const res = await fetch(`${BRAVE_ENDPOINT}?${params.toString()}`, {
      headers: {
        "X-Subscription-Token": apiKey,
        Accept: "application/json",
        "Accept-Encoding": "gzip",
      },
      cache: "no-store",
      signal: ac.signal,
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Brave HTTP ${res.status}: ${body.slice(0, 200)}`);
    }
    const data = (await res.json()) as {
      web?: { results?: Array<{ url?: string; title?: string }> };
    };
    const seen = new Set<string>();
    const out: Result[] = [];
    for (const item of data.web?.results ?? []) {
      const normalized = item.url ? normalizeAirbnbUrl(item.url) : null;
      if (!normalized || seen.has(normalized)) continue;
      seen.add(normalized);
      out.push({
        source: "airbnb",
        url: normalized,
        title: item.title ? stripBraveHighlight(item.title) : undefined,
      });
      if (out.length >= MAX_RESULTS) break;
    }
    return out;
  } finally {
    clearTimeout(timer);
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") || "").trim();
  if (q.length < 2) {
    return NextResponse.json({ ok: true, results: [] }, { status: 200 });
  }
  if (q.length > 100) {
    return NextResponse.json({ ok: false, error: "query too long" }, { status: 400 });
  }

  const cached = cacheGet(q);
  if (cached) {
    return NextResponse.json(
      { ok: true, results: cached, cached: true },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const results = await searchBrave(q);
    cacheSet(q, results);
    return NextResponse.json(
      { ok: true, results },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "search failed";
    console.error("[property-search] failed:", msg);
    return NextResponse.json(
      { ok: true, results: [], error: msg },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  }
}
