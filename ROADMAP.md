# ROADMAP — Sekai Stay 広告運用基盤

**目的**: 月50万円予算で 75 リード（Google 35 / Meta 25 / X 15）を獲得し、再現可能な広告運用ノウハウを会社資産にする。
**設計原則**: AI が提案・実装・観測、テンイチが判断・実行（Human-in-the-Loop）

---

## Phase 0: 基盤構築

- [x] GA4 (`G-B7M920RCGR`) layout.tsx 実装済み
- [x] Meta Pixel (`1658477098524563`) layout.tsx 実装済み
- [x] Meta CAPI アクセストークン → Vercel env 登録済み (2026-05-09)
- [x] X Ads アカウント @tenichiliu 開通済み・Campaign 画面到達確認 (2026-05-09)
- [x] LP variants 5種（switch / switch-lite / switch-short / switch-founder / switch-portal）実装済み
- [x] フォーム送信 API（/api/report-requests/submit → Supabase + CRM 転送）実装済み
- [x] 訴求パターン × LP マッピング確定（価格主導/ポータル主導/信頼主導）(2026-05-09)
- [x] Privacy Policy に Meta CAPI 言及済み
- [x] Google Ads コピー下書き作成済み（google-ads/copy-drafts.md）
- [x] Google Ads キーワードリスト作成済み（google-ads/keyword-list.md）
- [x] Meta Ads コピー下書き作成済み（meta-ads/copy-drafts.md）
- [x] Meta Ads オーディエンス設計済み（meta-ads/audience-targeting.md）
- [x] X Ads コピー下書き作成済み（x-ads/copy-drafts.md）

## Phase 1: Google Ads 計測セットアップ [P1]

- [ ] (テンイチ) Google Ads アカウント開設・課金方法紐付け @impact:9 @urgency:9 @effort:2
- [ ] (テンイチ) GA4 ↔ Google Ads アカウント連携（管理画面でリンク設定） @impact:9 @urgency:9 @effort:1
- [ ] (テンイチ) フォーム送信 CV インポート設定（GA4 `lead` イベント → Google Ads・値¥5,000・カウント1回） @impact:9 @urgency:8 @effort:1
- [ ] タグID・コンバージョンラベルを Discord 共有 → NEXT_PUBLIC_GOOGLE_ADS_ID Vercel env 登録 @impact:8 @urgency:8 @effort:1
- [ ] (テンイチ) Google Ads CV 動作確認（GA4 リアルタイム + Ads ステータス確認） @impact:7 @urgency:7 @effort:1

## Phase 2: Meta CAPI 実装 [P1]

- [ ] (テンイチ) テストイベント コード取得（Events Manager → テストイベント タブ）→ Discord 共有 → META_CAPI_TEST_EVENT_CODE Vercel env 登録 @impact:8 @urgency:8 @effort:1
- [ ] PR4: lib/meta-capi.ts 作成（SHA-256 ハッシュ + Meta Graph API 呼び出し helper） @impact:9 @urgency:8 @effort:3
- [ ] PR4: /api/report-requests/submit に CAPI 統合実装（event_id 生成・fire-and-forget） @impact:9 @urgency:8 @effort:2
- [ ] PR4: ReportRequestForm.tsx の fbq 呼び出しに eventID を渡す（重複除去のキー） @impact:8 @urgency:8 @effort:1
- [ ] Test Events 動作確認（Pixel + CAPI 2件確認・Meta が両方受信表示） @impact:7 @urgency:7 @effort:1
- [ ] EMQ スコア 8点以上確認 @impact:7 @urgency:6 @effort:1
- [ ] 本番 Live（META_CAPI_TEST_EVENT_CODE を空に → Redeploy） @impact:8 @urgency:7 @effort:1

## Phase 3: X Ads 計測セットアップ [P2]

- [ ] X Pixel ID 取得（Ads Manager → ツール → コンバージョントラッキング → UWT 作成） @impact:7 @urgency:6 @effort:1
- [ ] X Pixel ID・タグコードを Discord 共有 → app/layout.tsx 実装（PR5） @impact:7 @urgency:6 @effort:2
- [ ] X Ads コンバージョン イベント定義（URL ベース or イベントベース・方式選択要） @impact:7 @urgency:6 @effort:1
- [ ] (テンイチ) X Ads 課金方法設定（法人クレジットカード・Ads Manager → アカウント設定 → 課金） @impact:7 @urgency:6 @effort:1
- [ ] x-ads/audience-targeting.md 作成 @impact:6 @urgency:5 @effort:2

## Phase 4: 初回キャンペーン Live [P1]

- [ ] PR5: サンクスページ作成（/contact/thanks・X CV URL ベース方式用） @impact:6 @urgency:5 @effort:2
- [ ] (テンイチ) Google Ads 初回キャンペーン設定（キーワード選定・CPA 目標入札・日予算 ¥17k） @impact:9 @urgency:7 @effort:3
- [ ] (テンイチ) Meta Ads 初回キャンペーン設定（3パターン × 3 LP ABテスト・日予算 ¥13k） @impact:9 @urgency:7 @effort:3
- [ ] (テンイチ) X Ads 初回キャンペーン設定（/switch + /switch/short・日予算 ¥5k → 慣らし ¥3k） @impact:7 @urgency:6 @effort:2
- [ ] (テンイチ) 本人画像・クリエイティブ素材準備（IMAGES_MANIFEST.md から選定 + 追加撮影判断） @impact:7 @urgency:6 @effort:2

## Phase 5: 観測・自動化 [P2]

- [ ] 日次パフォーマンス観測スクリプト（GA4/Google Ads/Meta/X 指標収集 → Discord #sekai-stay サマリ投稿） @impact:8 @urgency:5 @effort:5
- [ ] 異常検知実装（日予算超過 ¥30k / CPA 中央値2倍 / CV ゼロ24h → Inbox danger + Slack） @impact:8 @urgency:5 @effort:4
- [ ] 週次レビュー下書き自動生成（月曜朝・Inbox general → テンイチが気づき追記） @impact:7 @urgency:4 @effort:4
- [ ] reports/ 日次レポート自動生成（媒体別・LP variant 別・reports/YYYY-MM-DD.md） @impact:6 @urgency:4 @effort:3
- [ ] 月次 KGI 達成度レビュー自動集計（リード数/CPA/媒体別）→ learnings.md 自動下書き @impact:6 @urgency:3 @effort:4
