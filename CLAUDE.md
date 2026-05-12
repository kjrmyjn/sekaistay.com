# sekaistay-com — sekaistay.com 公式サイト

> 詳しい情報は `README.md` を参照（ページ一覧・技術スタック）。ここはAIエージェント向けの作業ガイド。

## 何のプロジェクトか
- **本番**: https://sekaistay.com
- 民泊運用代行のマーケティングサイト + 無料診断LP（Sekai Stay事業）
- Next.js 14 (App Router) + TypeScript + Tailwind + Vercel

## AIエージェントが触るときの注意

### デプロイ
- `vercel --prod` で本番反映（sekaichi org）
- mainブランチへのpushで自動デプロイ
- **本番サイトなので**：CSS崩れ・SEO破壊・404はビジネス影響大。変更は必ずローカル `npm run dev` で目視確認してから

### コンテンツ更新
- ブログ記事は `content/blog/` のMDXファイル
- 事例・エリアは `data/` 配下のJSON
- 画像は `public/images/`（manifest: `IMAGES_MANIFEST.md`）

### リード処理フロー
- `/switch*` の各 LP variant のフォーム送信は `/api/report-requests/submit` で受信
- このプロジェクト内で Supabase `lead_submissions` への保存 + 物件診断レポートの生成・メール送信を完結
- リード情報は `lib/lead-forward.ts` の以下2系統で並行転送:
  - `forwardLead` → 吉蔵 CRM (`LEAD_INTAKE_URL`)
  - `forwardLeadToSalesPortal` → sekaistay-sales-portal (公開エンドポイント)
- HubSpot は不採用（2026-05-09 確定・自社CRMへ移行）

### SEO・規約
- メタタグ・構造化データは絶対に壊さない（`SEO_AUDIT_REPORT.md` 参照）
- Tailwindのデザイントークンは `SEKAI_STAY_Creative_Guide.md` に定義済み

## よく使う
```
npm run dev       # ローカル開発（localhost:3000）
npm run build     # 本番ビルド検証
npm run lint      # ESLintチェック
```

## 関連
- `sekai-stay-ai/` — Sekai StayのAIアシスタント（別プロジェクト）
- `sekaistay-sales-portal` — 営業ポータル (lead 並行転送先・別 Vercel project)
- Sekai Stay事業全般のメモリは `~/.claude/projects/-Users-sekaichi-Desktop-claude-code/memory/project_sekai_stay.md`
