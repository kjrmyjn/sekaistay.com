/* ─────────────────────────────────────────────────────────────
 * /api/property-search — Airbnb 物件検索（自前実装）
 *
 * Airbnb の検索ページは完全クライアントレンダリングなので、Playwright
 * で headless Chromium を起動して描画後の DOM から物件 ID と title を
 * 抽出する。Vercel serverless 上では @sparticuz/chromium を使用。
 *
 * 結果は Map ベースのインメモリ LRU で 1 時間キャッシュ（同一インスタ
 * ンスのみ・コールドスタートでリセット）。debounce 込みでも同一クエリ
 * が頻発するため十分機能する。
 *
 * 失敗時 / タイムアウト時は空配列を返す（UI は手動 URL 貼付けに fallback）。
 * ───────────────────────────────────────────────────────────── */

import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import { chromium as playwrightChromium, type Browser } from "playwright-core";

export const runtime = "nodejs";
export const maxDuration = 30;

const NAV_TIMEOUT_MS = 15_000;
const SELECTOR_TIMEOUT_MS = 10_000;
const MAX_RESULTS = 8;
const CACHE_TTL_MS = 60 * 60 * 1000;
const CACHE_MAX_ENTRIES = 200;

type Result = { source: "airbnb"; url: string; title?: string };
type CacheEntry = { results: Result[]; expiresAt: number };
const cache = new Map<string, CacheEntry>();

function cacheGet(key: string): Result[] | null {
  const hit = cache.get(key);
  if (!hit) return null;
  if (hit.expiresAt < Date.now()) {
    cache.delete(key);
    return null;
  }
  // LRU: re-insert to move to tail
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

let browserPromise: Promise<Browser> | null = null;
async function getBrowser(): Promise<Browser> {
  if (browserPromise) {
    try {
      const b = await browserPromise;
      if (b.isConnected()) return b;
    } catch {
      // fallthrough to fresh launch
    }
  }
  browserPromise = (async () => {
    const executablePath = await chromium.executablePath();
    return playwrightChromium.launch({
      args: chromium.args,
      executablePath,
      headless: true,
    });
  })();
  return browserPromise;
}

async function searchAirbnb(query: string): Promise<Result[]> {
  const browser = await getBrowser();
  const ctx = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    locale: "ja-JP",
    viewport: { width: 1280, height: 900 },
  });
  const page = await ctx.newPage();
  try {
    const url = `https://www.airbnb.jp/s/${encodeURIComponent(query)}/homes?adults=1&search_type=user_typed`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: NAV_TIMEOUT_MS });
    // Wait for any listing card to appear
    await page
      .locator('a[href*="/rooms/"]')
      .first()
      .waitFor({ timeout: SELECTOR_TIMEOUT_MS })
      .catch(() => {});
    const items = await page.evaluate((max: number) => {
      const seen = new Set<string>();
      const out: Array<{ url: string; title?: string }> = [];
      const anchors = Array.from(
        document.querySelectorAll<HTMLAnchorElement>('a[href*="/rooms/"]'),
      );
      for (const a of anchors) {
        const href = a.href;
        const m = href.match(/\/rooms\/(\d+)/);
        if (!m) continue;
        const id = m[1];
        if (seen.has(id)) continue;
        seen.add(id);
        const cleanUrl = `https://www.airbnb.jp/rooms/${id}`;
        const title =
          a.getAttribute("aria-label")?.trim() ||
          a.querySelector("[id^=title]")?.textContent?.trim() ||
          a.textContent?.trim().slice(0, 100);
        out.push({ url: cleanUrl, title: title || undefined });
        if (out.length >= max) break;
      }
      return out;
    }, MAX_RESULTS);
    return items.map((it) => ({ source: "airbnb" as const, url: it.url, title: it.title }));
  } finally {
    await ctx.close().catch(() => {});
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
    const results = await searchAirbnb(q);
    cacheSet(q, results);
    return NextResponse.json(
      { ok: true, results },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    console.error("[property-search] failed:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { ok: true, results: [], error: err instanceof Error ? err.message : "search failed" },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  }
}
