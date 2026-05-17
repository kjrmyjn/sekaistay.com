#!/usr/bin/env node
// SEKAI STAY X Content Cascade Tracker の Pipeline タブを更新
// 既存 Sheet: 19qsHLdmIex59mj-xABMbF4jCatHoy6SN7LE8x4EzWVY
//
// 使い方:
//   node scripts/update-content-cascade-tracker.mjs
//
// 注: テンイチ初週（5/18-21）は全テンイチ運用に切替（ジロー 5/22 開始までの暫定）
//     J-3 (5/19), U-5 (5/20) を T-3, T-4 に置換。他は維持。

import { getSheets } from "../../../shared/google-auth/index.js";

const SPREADSHEET_ID = "19qsHLdmIex59mj-xABMbF4jCatHoy6SN7LE8x4EzWVY";
const ACCOUNT = "sekaichi";

const PIPELINE_HEADER = [
  "ID", "Account", "Pillar", "Topic/Hook", "LP送客先",
  "X Post Date", "X Status", "X URL", "X Impressions", "X Engagement",
  "note Status", "note Publish Date", "note URL", "note Likes/PV",
  "HP Status", "HP Publish Date", "HP URL", "HP SEO Keywords",
  "Review Comments",
];

// 投稿時系列順に並べ替え
const PIPELINE_ROWS = [
  // 5/18 (月) — テンイチ
  [
    "T-1", "@tenichiliu", "業界トレンド",
    '"民泊運用代行を、業界相場の半額にしました。" — なぜ 8% で回せるか、事業構造を分解して書く',
    "/switch",
    "2026-05-18 08:00", "Draft", "", "", "",
    "Pending", "", "", "",
    "Pending", "", "", "民泊運用代行 手数料 / 8%構造 / 仕組み化",
    "Hook: 数字インパクト型・LinkedIn高エンゲ #1 パターン (Quote opening)",
  ],
  // 5/19 (火) — テンイチ (新規・J-3 を置換)
  [
    "T-3", "@tenichiliu", "法務制度",
    '"民泊新法のせいで撤退します" — 苦しむオーナーと伸ばすオーナーの3つの違い (2026新法 経営判断ガイド)',
    "/switch",
    "2026-05-19 08:00", "Draft", "", "", "",
    "Pending", "", "", "",
    "Pending", "", "", "民泊新法 2026 / 180日上限 / 旅館業法切替 / 特区民泊",
    "Hook: Counter-intuitive Quote (LinkedIn高エンゲ #3パターン) ｜ A/B/C物件分類フレーム",
  ],
  // 5/20 (水) — テンイチ (新規・U-5 を置換)
  [
    "T-4", "@tenichiliu", "民泊家具・アメニティ",
    '"20万円の家具をケチって、100万円逃してます" — 家具投資ROIの経営フレーム (ニセコ物件 +240万円/年事例)',
    "/switch/portal",
    "2026-05-20 08:00", "Draft", "", "", "",
    "Pending", "", "", "",
    "Pending", "", "", "民泊家具 / 家具投資ROI / ADR向上",
    "Hook: 損失額型 Quote opening ｜ 30万円投資→年240万円増収の具体ケース",
  ],
  // 5/21 (木) — テンイチ
  [
    "T-2", "@tenichiliu", "オーナー成功事例",
    "BEST OF SAUNA STAY 2026 受賞振り返り — ニッチを攻めると価格競争を抜け出せる",
    "/switch/founder",
    "2026-05-21 08:00", "Draft", "", "", "",
    "Pending", "", "", "",
    "Pending", "", "", "サウナ × 民泊 / ポジショニング再設計 / +30%増収",
    "Hook: 受賞ストーリー ｜ 同日夜 20:00 にローンチ予告通常ツイート別途投稿",
  ],
  // 5/22 (金) 🚀 ローンチ — テンイチ
  [
    "T-LAUNCH", "@tenichiliu", "業界トレンド + オーナー成功事例",
    "🚀 SEKAI STAY 本格発表 (経営者ビジョン軸) — 8% で回せる事業構造 + 受賞実績 + ビジョン宣言",
    "/switch/founder",
    "2026-05-22 10:00", "Draft", "", "", "",
    "Pending (同日)", "2026-05-22", "", "",
    "Pending", "2026-05-24", "", "民泊運用代行 8% / スーパーホスト多数認定 / 業界半額",
    "🔴 PR TIMES URL を [PR TIMES Link] に挿入要 ｜ ジロー版と同時 10:00 砲火",
  ],
  // 5/22 (金) 🚀 ローンチ — ジロー初投稿
  [
    "J-LAUNCH", "@jirosan", "OTA運用 + オーナー成功事例",
    "🚀 SEKAI STAY 本格発表 (現場実証3ポイント) — 日次価格チューニング・オーナーポータル・社内責任の清掃",
    "/switch",
    "2026-05-22 10:00", "Draft", "", "", "",
    "Pending (同日)", "2026-05-22", "", "",
    "Pending", "2026-05-24", "", "民泊代行 現場 / DP 毎日 / オーナーポータル",
    "🔴 PR TIMES URL 挿入要 ｜ ジロー初投稿・テンイチ版と同時 10:00 砲火",
  ],
  // 5/23 (土) — ジロー
  [
    "J-4", "@jirosan", "法務制度",
    "2026 年 民泊新法 周辺で何が変わるか（保健所と毎月やり取りしてる現場感）",
    "/switch",
    "2026-05-23 12:00", "Draft", "", "", "",
    "Pending", "", "", "",
    "Pending", "", "", "民泊新法 / 保健所対応 / 騒音問題",
    "ジロー視点・現場ノウハウ系で滞在時間獲得",
  ],
  // 5/24 (日) — 架空社員
  [
    "U-6", "@ss_unei_chan", "オーナー成功事例",
    "オーナーポータルが救った深夜 0 時の融資資料 — 24h ダッシュボードの本当の価値",
    "/switch/portal",
    "2026-05-24 19:00", "Draft", "", "", "",
    "Pending", "", "", "",
    "Pending", "", "", "オーナーポータル / 24時間ダッシュボード / 収益エクスポート",
    "架空社員視点・ローンチ余韻 + ポータル機能訴求",
  ],
  // 5/25 以降 (W3) — Skipped (deferred から再生成)
  [
    "J-3 (deferred)", "@jirosan", "OTA運用テクニック",
    "[W3移行] Airbnb価格を毎日触ってわかったこと（DP実例）",
    "/switch/portal",
    "2026-05-26 12:00", "Skipped", "", "", "",
    "Pending", "", "", "",
    "Pending", "", "", "ダイナミックプライシング / Pricelabs",
    "今週はテンイチ運用のため W3 へ後ろ倒し",
  ],
  [
    "U-5 (deferred)", "@ss_unei_chan", "民泊家具・アメニティ",
    "[W3移行] 家具選定で失敗した話（運営マネージャー視点）",
    "/switch/portal",
    "2026-05-27 19:00", "Skipped", "", "", "",
    "Pending", "", "", "",
    "Pending", "", "", "民泊家具 / 業務用 / 修理可能",
    "今週はテンイチ運用のため W3 へ後ろ倒し",
  ],
];

async function main() {
  const sheets = getSheets(ACCOUNT);

  // Pipeline タブを全消去 → ヘッダー + 新データで上書き
  await sheets.spreadsheets.values.clear({
    spreadsheetId: SPREADSHEET_ID,
    range: "Pipeline!A1:Z200",
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: "Pipeline!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [PIPELINE_HEADER, ...PIPELINE_ROWS] },
  });

  console.log(`✅ Pipeline tab updated with ${PIPELINE_ROWS.length} rows`);
  console.log(`📊 https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit#gid=0`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
