# sekaistay-com ROADMAP — 広告運用

> SEKAI STAY の Google / Meta / X 広告運用ロードマップ。
>
> **目的**: 月 50 万円予算で 75 リード（Google 35 / Meta 25 / X 15）を獲得し、再現可能な広告運用ノウハウを会社資産にする。
>
> **役割分担**: AI（てんちむ）が観測・コード実装・計測整備、テンイチが配信オン/オフ・予算・課金・採用判断。
> 詳細は `ad-ops/README.md` の役割分担表 + `feedback_yoshizo_absolute_rules.md`。
>
> 設計原則: **観測 → Inbox 提案 → 人間判断 → 適用**。AI は広告管理画面を自動操作しない。
>
> AI に拾わせない人間タスクは冒頭に `(人間)` を付ける（picker が自然にスキップする）。

---

## Phase 0: 基盤構築 ✅

- [x] GA4 (`G-B7M920RCGR`) layout.tsx 実装済み
- [x] Meta Pixel (`989839370242915`) layout.tsx 実装済み（2026-05-10 切替）
- [x] Meta CAPI アクセストークン → Vercel env 登録済み (2026-05-09)
- [x] X Ads アカウント @tenichiliu 開通済み・Campaign 画面到達確認 (2026-05-09)
- [x] LP variants 5 種（switch / switch-lite / switch-short / switch-founder / switch-portal）実装済み
- [x] フォーム送信 API（/api/report-requests/submit → Supabase + CRM 転送）実装済み
- [x] 訴求パターン × LP マッピング確定（価格主導 / ポータル主導 / 信頼主導）(2026-05-09)
- [x] Privacy Policy に Meta CAPI 言及済み
- [x] Google Ads コピー下書き作成済み（google-ads/copy-drafts.md）
- [x] Google Ads キーワードリスト作成済み（google-ads/keyword-list.md）
- [x] Meta Ads コピー下書き作成済み（meta-ads/copy-drafts.md）
- [x] Meta Ads オーディエンス設計済み（meta-ads/audience-targeting.md）
- [x] X Ads コピー下書き作成済み（x-ads/copy-drafts.md）

---

## Phase 1: Google Ads 計測セットアップ [P1]

- [ ] (人間) Google Ads アカウント開設・課金方法紐付け @impact:9 @urgency:9 @effort:2
- [ ] (人間) GA4 ↔ Google Ads アカウント連携（管理画面でリンク設定） @impact:9 @urgency:9 @effort:1
- [ ] (人間) フォーム送信 CV インポート設定（GA4 `lead` イベント → Google Ads・値 ¥5,000・カウント 1 回） @impact:9 @urgency:8 @effort:1
- [ ] タグ ID・コンバージョン ラベルを Discord 共有 → NEXT_PUBLIC_GOOGLE_ADS_ID Vercel env 登録 @impact:8 @urgency:8 @effort:1
- [ ] (人間) Google Ads CV 動作確認（GA4 リアルタイム + Ads ステータス確認） @impact:7 @urgency:7 @effort:1

---

## Phase 2: Meta CAPI 実装 [P1]

- [ ] (人間) テストイベント コード取得（Events Manager → テストイベント タブ）→ Discord 共有 → META_CAPI_TEST_EVENT_CODE Vercel env 登録 @impact:8 @urgency:8 @effort:1
- [ ] PR4: lib/meta-capi.ts 作成（SHA-256 ハッシュ + Meta Graph API 呼び出し helper） @impact:9 @urgency:8 @effort:3
- [ ] PR4: /api/report-requests/submit に CAPI 統合実装（event_id 生成・fire-and-forget） @impact:9 @urgency:8 @effort:2
- [ ] PR4: ReportRequestForm.tsx の fbq 呼び出しに eventID を渡す（重複除去のキー） @impact:8 @urgency:8 @effort:1
- [ ] Test Events 動作確認（Pixel + CAPI 2 件確認・Meta が両方受信表示） @impact:7 @urgency:7 @effort:1
- [ ] EMQ スコア 8 点以上確認 @impact:7 @urgency:6 @effort:1
- [ ] (人間) 本番 Live（META_CAPI_TEST_EVENT_CODE を空に → Redeploy） @impact:8 @urgency:7 @effort:1

---

## Phase 3: X Ads 計測セットアップ [P2]

- [ ] (人間) X Pixel ID 取得（Ads Manager → ツール → コンバージョン トラッキング → UWT 作成） @impact:7 @urgency:6 @effort:1
- [ ] X Pixel ID・タグコードを Discord 共有 → app/layout.tsx 実装（PR5） @impact:7 @urgency:6 @effort:2
- [ ] (人間) X Ads コンバージョン イベント定義（URL ベース or イベントベース・方式選択要） @impact:7 @urgency:6 @effort:1
- [ ] (人間) X Ads 課金方法設定（法人クレジットカード・Ads Manager → アカウント設定 → 課金） @impact:7 @urgency:6 @effort:1
- [ ] x-ads/audience-targeting.md 作成 @impact:6 @urgency:5 @effort:2

---

## Phase 4: 初回キャンペーン Live [P1]

- [ ] PR5: サンクスページ作成（/contact/thanks・X CV URL ベース方式用） @impact:6 @urgency:5 @effort:2
- [ ] (人間) Google Ads 初回キャンペーン設定（キーワード選定・CPA 目標入札・日予算 ¥17k） @impact:9 @urgency:7 @effort:3
- [ ] (人間) Meta Ads 初回キャンペーン設定（3 パターン × 3 LP AB テスト・日予算 ¥13k） @impact:9 @urgency:7 @effort:3
- [ ] (人間) X Ads 初回キャンペーン設定（/switch + /switch/short・日予算 ¥5k → 慣らし ¥3k） @impact:7 @urgency:6 @effort:2
- [ ] (人間) 本人画像・クリエイティブ素材準備（IMAGES_MANIFEST.md から選定 + 追加撮影判断） @impact:7 @urgency:6 @effort:2

---

## Phase 5: 観測・自動化 [P2]

- [ ] 日次パフォーマンス観測スクリプト（GA4 / Google Ads / Meta / X 指標収集 → Discord #sekai-stay サマリ投稿） @impact:8 @urgency:5 @effort:5
- [ ] 異常検知実装（日予算超過 ¥30k / CPA 中央値 2 倍 / CV ゼロ 24h → Inbox `danger` + Slack） @impact:8 @urgency:5 @effort:4
- [ ] 週次レビュー下書き自動生成（月曜朝・Inbox `general` → テンイチが気づき追記） @impact:7 @urgency:4 @effort:4
- [ ] reports/ 日次レポート自動生成（媒体別・LP variant 別・reports/YYYY-MM-DD.md） @impact:6 @urgency:4 @effort:3
- [ ] 月次 KGI 達成度レビュー自動集計（リード数 / CPA / 媒体別）→ learnings.md 自動下書き @impact:6 @urgency:3 @effort:4

---

## Phase 6: スケール（6 月以降）[P2]

- [ ] (人間) 6 月: アフィリエイト開始（5 月は広告検証・PR 配信に集中）
- [ ] (人間) 勝ちパターンへの予算集中判断（CPA 優位の媒体に再配分）
- [ ] 新規訴求パターン追加 → A/B テスト設計（Inbox 提案） @impact:6 @urgency:5 @effort:3
- [ ] PR タイムズ配信（6/1）と広告の連動効果計測 @impact:6 @urgency:5 @effort:2

---

## 設計原則（吉蔵基準）

1. AI は広告アカウントの管理画面を**自動操作しない**（広告アカウント設定・予算変更・配信 ON/OFF はテンイチ）
2. AI は計測コード・Vercel Function・CORS・LP コードを実装する（コードは AI 領域）
3. 異常は検知のみ（`danger` Inbox 通知）→ テンイチが管理画面で停止判断
4. CAPI トークン・Pixel ID は Vercel env のみに保存（コード・GitHub・Discord 公開チャネル禁止）
5. ガードレール（金銭操作の閾値）は `ad-ops/README.md` 参照
6. picker は `(人間)` プレフィックスを見て人間タスクをスキップする

---

## KGI（初月）

| 軸 | 目標 |
|---|---|
| Google Ads リード数 | 35 |
| Meta Ads リード数 | 25 |
| X Ads リード数 | 15 |
| **合計** | **75** |
| 月予算 | ¥500,000 |
| ブレンド CPA | ¥6,667 |

詳細は `ad-ops/README.md` の KGI セクション。

---

## 関連

- `ad-ops/README.md` — 役割分担・ガードレール・学習サイクル
- `ad-ops/learnings.md` — 学習ログ（日次 / 週次 / 確定ナレッジ / 失敗）
- `ad-ops/setup-guides/` — 各媒体のセットアップ手順
- `feedback_yoshizo_absolute_rules.md` — 吉蔵基準（絶対ルール・危険信号）
