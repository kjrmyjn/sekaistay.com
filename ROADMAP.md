# sekaistay-com ROADMAP — 広告運用

> SEKAI STAY の Google / Meta / X 広告運用ロードマップ。
>
> **役割分担**: AI（てんちむ）が観測・コード実装・計測整備、テンイチが配信オン/オフ・予算・課金・採用判断。
> 詳細は `ad-ops/README.md` の役割分担表 + `feedback_yoshizo_absolute_rules.md`。
>
> 設計原則: **観測 → Inbox 提案 → 人間判断 → 適用**。AI は広告管理画面を自動操作しない。
>
> AI に拾わせない人間タスクは冒頭に `(人間)` を付ける（picker が自然にスキップする）。

---

## 現状（2026-05-10）

**できていること:**
- ad-ops ディレクトリ整備（setup-guides / google-ads / meta-ads / x-ads / learnings）
- Meta CAPI トークン取得（2026-05-09）
- X Ads アカウント申請（2026-05-09）
- 訴求パターン × LP マッピング確定（2026-05-09・5 variants）

**残された課題:**
- Google Ads CV 計測（連携・タグ実装・動作確認）
- Meta CAPI Function 実装 + 本番 Live
- X Ads 審査通過 → Pixel 実装 → 初回キャンペーン
- 日次 / 週次 / 月次の KPI 自動レポートとガードレール通知

---

## Phase 1: 計測整備（5 月前半）[P0]

> 配信前に CV 計測が動いていないと、広告は「金を捨てる装置」になる。

### Google Ads 計測

- [ ] (人間) Google Ads ↔ GA4 アカウント連携 @urgency:high
- [ ] (人間) GA4 → Google Ads CV インポート設定 @urgency:high
- [ ] (人間) Google Ads コンバージョン タグ ID + ラベルを Discord で共有 @urgency:high
- [ ] Vercel env に Google Ads タグ ID + コンバージョン ラベルを登録 @impact:high @effort:small
- [ ] sekaistay.com にコンバージョン タグを実装（PR） @impact:high @effort:small
- [ ] (人間) Google Ads 管理画面で CV 動作確認

### Meta Conversions API

- [x] Meta CAPI トークン取得 ✅ 2026-05-09
- [ ] (人間) Meta Events Manager で CV イベント定義（Lead / CompleteRegistration） @urgency:high
- [ ] (人間) Test Events コード取得 @urgency:high
- [ ] Vercel env に CAPI トークン + Pixel ID + Test コード登録 @impact:high @effort:small
- [ ] /api/meta-capi/* Vercel Function 実装（Lead 送信・CORS 同一オリジン制限） @impact:high @effort:medium
- [ ] フォーム送信時に CAPI Function を呼び出す JS 組み込み @impact:high @effort:small
- [ ] (人間) Meta Test Events で受信確認 → 本番 Live 切替

### X Ads

- [x] X Ads アカウント申請 ✅ 2026-05-09
- [ ] (人間) X Ads アカウント審査通過確認 + 課金方法登録
- [ ] (人間) X Pixel 発行 → ID を Discord で共有
- [ ] Vercel env に X Pixel ID 登録 @impact:medium @effort:small
- [ ] sekaistay.com に X Universal Website Tag 実装 @impact:medium @effort:small
- [ ] (人間) X Ads 管理画面で CV イベント定義（フォーム送信）

---

## Phase 2: 配信開始・初月運用（5 月後半）[P0]

> 月 50 万円予算で 75 リード（Google 35 / Meta 25 / X 15）を達成。

- [ ] (人間) Google Ads キャンペーン Live 化（指名 + 検索 + ディスプレイ）
- [ ] (人間) Meta Ads キャンペーン Live 化（Advantage+ + Lookalike）
- [ ] (人間) X Ads 初回キャンペーン Live 化（フォロワー Lookalike + 興味関心）
- [ ] 日次 KPI 自動収集（Google/Meta/X API 経由で CTR/CV/CPA/CPC を Slack 投稿） @impact:high @effort:medium
- [ ] 異常検知（日予算 ¥30,000 超 / CPA 中央値 2 倍超 / CV ゼロ 24h）→ Inbox kind=`danger` @impact:high @effort:small
- [ ] 週次 KPI 集計（Slack `#001-ai-agent-hq` に投稿） @impact:medium @effort:small

---

## Phase 3: 学習・最適化（継続）[P1]

> 何が効いて何が効かなかったかを `ad-ops/learnings.md` に蓄積し、
> 「再現可能な広告運用ノウハウ」を会社の資産にする。

- [ ] 日次パフォーマンス → `ad-ops/learnings.md` 自動追記（観測のみ） @impact:medium @effort:medium
- [ ] 週次振り返り提案（勝ち訴求 / 負け訴求の整理を Inbox kind=`pattern` で投稿） @impact:medium @effort:medium
- [ ] 月次サマリー（CPA トレンド・LP variant 別 CVR・予算配分案を Inbox kind=`general` で提案） @impact:medium @effort:medium
- [ ] (人間) 月次レビューミーティング（AI 要約 + テンイチが配分判断）
- [ ] LP 改善提案（CVR 低い variant の改善案を Inbox に PR ドラフト） @impact:medium @effort:medium

---

## Phase 4: スケール（6 月以降）[P2]

- [ ] (人間) 6 月: アフィリエイト開始（5 月は広告検証・PR 配信に集中）
- [ ] (人間) 勝ちパターンへの予算集中判断（CPA 優位の媒体に再配分）
- [ ] 新規訴求パターン追加 → A/B テスト設計（Inbox 提案） @impact:medium @effort:medium
- [ ] PR タイムズ配信（6/1）と広告の連動効果計測 @impact:medium @effort:small

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
