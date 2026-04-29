# sekaistay-com — sekaistay.com 公式サイト

> 詳しい情報は `README.md` を参照（ページ一覧・技術スタック・HubSpot連携など）。ここはAIエージェント向けの作業ガイド。

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

### HubSpot連携
- `/switch`・`/audit` のフォーム送信は `japanvillas.kss-cloud.com` 経由でHubSpotへ
- リード起票ロジックは japan-villas 側にある（このプロジェクトはフォーム送信のみ）

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
- `japan-villas/` — HubSpot連携のバックエンド
- `sekai-stay-ai/` — Sekai StayのAIアシスタント（別プロジェクト）
- Sekai Stay事業全般のメモリは `~/.claude/projects/-Users-sekaichi-Desktop-claude-code/memory/project_sekai_stay.md`
