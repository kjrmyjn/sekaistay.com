#!/usr/bin/env node
// SEKAI STAY X Content Cascade Tracker の Pipeline タブを更新
// 既存 Sheet: 19qsHLdmIex59mj-xABMbF4jCatHoy6SN7LE8x4EzWVY
//
// 使い方:
//   node scripts/update-content-cascade-tracker.mjs
//
// v2 (2026-05-17): Full Draft Content 列を追加・人間がレビューしやすく
//     W1 (5/18-21) は全テンイチ運用に切替（J-3, U-5 → T-3, T-4）

import { getSheets } from "../../../shared/google-auth/index.js";

const SPREADSHEET_ID = "19qsHLdmIex59mj-xABMbF4jCatHoy6SN7LE8x4EzWVY";
const ACCOUNT = "sekaichi";

const PIPELINE_HEADER = [
  "ID", "Account", "Pillar", "Topic/Hook", "LP送客先",
  "X Post Date", "X Status", "X URL", "X Impressions", "X Engagement",
  "note Status", "note Publish Date", "note URL", "note Likes/PV",
  "HP Status", "HP Publish Date", "HP URL", "HP SEO Keywords",
  "Review Comments",
  "📝 Full Draft Content",
];

const DRAFT_T1 = `民泊運用代行の手数料が「業界相場 15-25% / 自社 8%」って言うと、
よく「ボランティアでやってるの?」と聞かれる。

違います。8% でちゃんと黒字。

なぜ可能か、構造を分解して書きます。

---

民泊代行の固定費は大きく分けて 4 つ:
- ① 価格管理 / 予約管理（ダイナミックプライシング・OTA同期）
- ② カスタマー対応（チェックイン・トラブル）
- ③ 清掃・リネン手配
- ④ 営業・マーケ・経理

業界相場の 20% は、これら全部を「人力で物件ごとに動く」前提のコスト構造。
1人のスタッフが見れる物件数が 5-10 件で頭打ちになるから、規模の経済が効きにくい。

僕らは違うアプローチを取った:
- ① は仕組み化（日次自動の価格チューニング・OTA連携の自動化）
- ② はマニュアル整備とクイック対応のための1次窓口集約
- ③ は信頼できる清掃会社との長期契約（バラ売りしない）
- ④ は LP・SEO・PR の自社運用（外注しない）

結果として、1人のオペレーターが見れる物件数が 30-50 件まで上がった。
これで 8% でも黒字になる。

---

「8% は安すぎる、品質が落ちるのでは」とも言われます。
でも実は逆で、仕組み化したからこそ品質が均質化する。

例えば DP を毎日触っているか触っていないかで、稼働率は月単位で 5-10pt 違う。
人力で 30 物件全部を毎日触るのは不可能。仕組みで毎日触っている前提で初めて、
8% でスーパーホスト多数認定の運営力が出る。

---

学びとして整理すると:
- 業界相場 20% は「人力 × 5-10 物件 / 人」構造のコスト
- 仕組み化で 30-50 物件 / 人にできれば 8% で黒字になる
- 品質は人力依存だと不均質、仕組み化すると均質化する
- 仕組み化に必要な投資は LP / 価格 API / 清掃契約の3点

ここは、誰でも同じ構造で再現できるはず。

---
うちの物件、今いくら損してるか 60 秒で診断します。
→ https://sekaistay.com/switch?utm_source=x&utm_medium=organic&utm_campaign=longform&utm_content=tenichi_8pct_structure

※ Airbnb 未掲載・アクティブなリスティングが無いオーナーも OK`;

const DRAFT_T2 = `うちが今年取った賞、「BEST OF SAUNA STAY 2026」の話を少し書きます。

物件名は THE LAKE HOUSE 野尻湖。長野県上水内郡。
「サウナ × 民泊」というニッチな掛け算で、年間稼働率 78% を達成した結果での受賞。

---

正直、受賞自体は副産物だと思っています。
本当に伝えたいのは「ニッチを攻めると、価格競争を抜け出せる」ということ。

野尻湖の物件は、立ち上げ時に競合と同じ「ファミリー向け一棟貸し」で勝負していたら
ADR ¥18,000 で稼働 50% くらいで終わっていたはず。

サウナを軸に再ポジショニングしてから:
- ADR は ¥28,000-35,000（30-90% UP）
- 稼働は 78%（同エリア相場の 1.4-1.6 倍）
- レビュー単価が高くついた（決済力のある層が来る）

これって、運用代行を変えるとか手数料を下げる以前の話で、
**そもそも自分の物件の戦い方が間違っていないか**を問うべき問題。

---

オーナーさんとの面談でいつも聞くのは:
- このエリアでの「あなたの物件らしさ」は何か?
- 競合と比較して、どの軸で勝ちますか?
- 月間 ADR と稼働、どちらを最大化したいか?

ここの答えが曖昧だと、運用代行を変えても結果は変わりません。
僕らは運用代行を変えてくれたオーナーに、最初の 1 ヶ月でこのポジショニングを一緒に練り直します。
だから他社からの乗り換えで「同じ物件なのに +30% 増収」が起きる。

---

学びとして:
- 価格競争は「ポジショニングが曖昧だから」起きる
- ニッチを攻めると、ADR も稼働も両方上がる
- 運用代行を変える前に、まず物件の戦い方を見直す
- 良い代行は、運用前に物件戦略を一緒に考えてくれる

受賞は副産物。でもオーナーさんと喜びを分かち合えたのは本当に嬉しかった。

---
あなたの物件、今いくら損してるか 60 秒で診断します。
→ https://sekaistay.com/switch/founder?utm_source=x&utm_medium=organic&utm_campaign=longform&utm_content=tenichi_award_breakdown

※ Airbnb 未掲載・アクティブなリスティングが無いオーナーも OK`;

const DRAFT_T3 = `「民泊新法のせいで撤退します」

最近、3人のオーナーから同じ言葉を聞きました。

正直に言うと、これは半分正しくて、半分間違っています。
民泊新法で苦しんでいるオーナーと、伸ばしているオーナー、両方を見てきた立場で書きます。

---

苦しんでいるオーナーの共通点は、「180日上限」を物件単価で吸収しようとしてること。

180日 ÷ 365日 = 49%
これが新法エリアで物件運営する上限稼働率です。

ADR を強気で取れない物件で 49% 稼働しても、年間売上は元の 6 割程度に。
固定費は変わらないので、利益は半減以下。

これだと撤退判断になる。

---

伸ばしているオーナーは違うことをしています:

1. 旅館業法 or 特区民泊への切替を半年前から準備
2. 撤退ではなく「ポジショニング再設計」で ADR を 1.5-2 倍に
3. 物件あたりの月間ADR目標を、新法以前の数字から見直し

特に 2 の「ADR 1.5-2 倍化」が一番効きます。
受賞物件（THE LAKE HOUSE 野尻湖）でやった「サウナ × 民泊」のポジショニング転換と
同じ構造で、ニッチを攻めて稼働 49% × ADR 2 倍 = 売上を逆に増やす。

---

2026 年の経営判断としては、自分の物件を3つに分類するのが分かりやすい:

A. 新法 180 日上限のままで黒字 → そのまま運用
B. 上限で赤字だが、ポジショニング再設計で救える → ADR 強化に投資
C. ポジショニング変えても無理 → 旅館業法 or 特区民泊へ切替（半年-1年計画）

---

学びとして:
- 新法のせいで撤退、ではなく「自分の物件タイプを把握できていない」から撤退になっている
- 49% 稼働でも ADR 2 倍にできれば年間売上は変わらない
- 旅館業法切替は早めに動けば半年で済む
- 経営判断のフレームを持っているかどうかで、撤退か拡大かが決まる

---
あなたの物件、A/B/C のどれか 60 秒で診断します。
→ https://sekaistay.com/switch?utm_source=x&utm_medium=organic&utm_campaign=longform&utm_content=tenichi_minpaku_law_judgment

※ Airbnb 未掲載・アクティブなリスティングが無いオーナーも OK`;

const DRAFT_T4 = `「20 万円の家具をケチって、100 万円逃してます」

これは僕がオーナーさんとの面談でよく使う言い回しです。
民泊の家具投資、もっと真面目に考えていい領域だと思っています。

---

具体例で話します。

ニセコの一棟貸し物件。
オーナーさんは「とりあえず IKEA でファミリー向けに揃えた」状態でリスティング開始。

ADR は ¥26,000 / 稼働 65%
月間売上は約 ¥500K / 物件。

ここで僕らがやったのは、家具投資 30 万円で:
- ラグジュアリー寄りのソファとダイニング
- リネン・タオルをホテル業務用に統一
- スピーカー（Bose）と高品質コーヒーマシン
- 物件写真を 3 万円で全面撮り直し

これで価格を ADR ¥32,000 に再設定 → 稼働 72%。

月間売上 約 ¥700K / 物件（+¥200K / 月）

家具投資 30 万円は **1.5 ヶ月で回収**。
あとは年間 +¥240 万円の上振れが残ります。

---

ここで多くのオーナーが家具投資を渋る理由:

「壊れたらどうするんですか」
「次のテナントの好みに合うか分からない」
「最低限でいいです、ビジネス用なので」

全部わかります。でも数字で考えると、家具投資 30 万円をケチって ADR を ¥6,000 下げる判断が、
年間 ¥100 万円以上の機会損失になる。

---

家具投資の判断フレームワーク（経営者目線）:

1. **回収期間 ≤ 6 ヶ月** が許容ライン
2. **ADR の上昇余地** = 物件タイプ × エリア × 競合との差別化
3. **業務用・耐久性ある** ものを選ぶ（年 1 回交換は前提にしない）
4. **写真映え** は ADR を上げる燃料

これを家具リストごとに ROI 計算してから、買うか買わないか決める。

---

学びとして:
- 民泊家具は「コスト」ではなく「投資」
- 30 万円の家具で ¥240 万円 / 年の売上差を作れる
- 回収期間 6 ヶ月以内ならほぼ確実に黒字
- 経営者として家具投資の ROI を計算しないオーナーは、無自覚に機会を逃している

---
うちの物件、家具投資で何が増収できそうか 60 秒で診断します。
→ https://sekaistay.com/switch/portal?utm_source=x&utm_medium=organic&utm_campaign=longform&utm_content=tenichi_furniture_roi

※ Airbnb 未掲載・アクティブなリスティングが無いオーナーも OK`;

const DRAFT_LAUNCH_T = `今日、SEKAI STAY を世の中に正式に発表します。

「民泊代行は高すぎる、品質も読めない」とよく言われる業界で、
業界相場の半額・手数料 8% で、Airbnb スーパーホスト多数認定の運営力を出す。
これを掲げて立ち上げました。

---

民泊代行の手数料相場は 15-25%。
これを「人が物件に張り付く」運営構造のコストだと考えています。

僕たちは違うアプローチを取った:
- 価格管理を日次自動で動かす（人力では追いつかない速度）
- カスタマー対応を社内マニュアル化（属人化を排除）
- 清掃は信頼パートナーと長期契約（バラ売りしない）
- 営業・マーケ・経理は自社で運用（外注しない）

これで 1 人が見られる物件数が 5-10 → 30-50 まで上がり、
8% でもスーパーホスト品質を維持できる事業構造になりました。

---

ここまでの実証:
- BEST OF SAUNA STAY 2026 受賞（THE LAKE HOUSE 野尻湖）
- 他社からの乗り換えオーナー様で +30% 増収事例多数
- 全国主要エリアで運営中

---

僕たちが向き合いたいのは、こんなオーナーさんです:
- 今の代行に手数料を払いすぎていると感じている方
- 数字が見えない運営にモヤモヤしている方
- もっと稼働を上げたいけど時間がない方
- これから民泊を始めたいけど、何から手をつければいいかわからない方

---

民泊運用代行を、もっと透明に、もっと公平に。
業界の常識を変えていきます。

詳細はプレスリリースに書きました → [PR TIMES Link]

うちの物件、今いくら損してるか 60 秒で診断します。
→ https://sekaistay.com/switch/founder?utm_source=x&utm_medium=organic&utm_campaign=launch&utm_content=launch_tenichi

※ Airbnb 未掲載・アクティブなリスティングが無いオーナーも OK`;

const DRAFT_LAUNCH_J = `今日、SEKAI STAY を正式発表します。

現場で運営代行をやってる立場から、何が違うかを書きます。
（テンイチが経営の話、僕は現場の話）

---

民泊代行で「8%」って聞くと、多くの人は
「安すぎる、絶対に品質落ちる」と思うはず。

僕も最初そう思いました。だから入る前にチームの中をめちゃくちゃ見ました。

実際に見て、納得したポイントが 3 つあります。

---

1️⃣ 価格を毎日触る仕組みがある

Pricelabs + DP API で毎日全物件の価格が自動更新される。
人力で月 1 回設定して放置する代行とは、稼働率も ADR も別物。
具体的には、同エリア相場の 1.3-1.6 倍の稼働を出してる物件が複数。

2️⃣ オーナーポータルで「数字が見える運営」が標準

オーナーさんがいつでも収益・稼働・レビューを自分で確認できる。
代行と毎月メールでやり取りする必要がない。
融資・確定申告・複数物件管理で、これが効くんです。

3️⃣ 清掃・トラブル対応が「社内責任」

清掃を完全に外注に丸投げしてる代行が多いんですが、
ここは社内マニュアル + 信頼パートナーの長期契約構造。
保健所対応・近隣トラブルも 24 時間社内で動ける。

---

僕が SEKAI STAY に入ったのは、こういう「ちゃんと作ってある代行」を
オーナーさんに届けたかったから。

業界のほとんどが「人力 × 高手数料」モデルで止まってる中で、
「仕組み化 × 業界半額」を成立させてる稀有な構造です。

---

今日からは僕も、現場で見えてきたことをここで発信していきます。
よろしくお願いします。

詳細はプレスリリース → [PR TIMES Link]

うちの物件、いくら損してるか 60 秒で診断 →
https://sekaistay.com/switch?utm_source=x&utm_medium=organic&utm_campaign=launch&utm_content=launch_jiro

※ Airbnb 未掲載・アクティブなリスティングが無いオーナーも OK`;

const DRAFT_J4 = `2026 年、民泊新法の周辺で何が変わるか、現場感で書きます。
（保健所と毎月やり取りしてる立場として）

---

主要な動きは 3 つ:

① 都内 23 区の「年間 180 日上限」運用の実態厳格化
ジロー個人の体感だと、2024 年までは保健所の現地確認は年1回程度だったのが、
2025-2026 は通報ベースで月単位の確認が来るようになってる。

② 民泊以外への用途変更（旅館業法・特区民泊）への流入加速
180 日上限がボトルネックになってきたオーナーが、
旅館業法・特区民泊への切り替えを検討する流れが明確に加速。
特に大阪・福岡・京都の特区エリアで顕著。

③ 騒音・ゴミ問題の対応要件強化
2026 年4月から、近隣からの通報に対するレスポンス時間が
「24 時間以内」→「直ちに」に変わる自治体が出てきた。
意味的には現場対応員の常時待機が必要ということ。

---

オーナーが今、現場感で考えるべきこと:

- 180 日上限を超えそうな物件は、旅館業法か特区民泊に切替を検討すべき
- 切替には半年-1年かかるので、年初から動き始めるのが正解
- 騒音対応は人力で常時待機できる代行を選ばないと、近隣トラブルで自治体指導が来る
- 民泊新法の改正トレンドは「より厳しく」なる方向（楽になることはない）

---

僕らが実際にやってる現場対応:
- 24時間電話 / LINE 対応（社内当番制）
- 騒音センサーを物件に設置（IoT で社内に通知）
- 近隣トラブル対応の標準マニュアル化（自治体ごと）
- 旅館業法切替の手続きサポート（保健所提出書類含む）

---

学びとして:
- 民泊新法の改正トレンドは厳格化方向
- 180 日上限超過の物件は旅館業法 / 特区民泊への切替を半年前から準備
- 騒音・ゴミ問題は「24時間以内」から「直ちに」へ。人力対応必須の自治体増
- 法務対応を「オーナー個人でできる」と勘違いする代行は危険

---
うちは保健所対応・旅館業法切替まで一気通貫でサポートしてます。
→ https://sekaistay.com/switch?utm_source=x&utm_medium=organic&utm_campaign=longform&utm_content=jiro_minpaku_law_2026

※ Airbnb 未掲載・アクティブなリスティングが無いオーナーも OK`;

const DRAFT_U6 = `うちのオーナーポータル（ダッシュボード）について、
オーナーさんから「これがあって本当に救われた」と言われた話を書きます。

---

K さんという 3 物件持ちのオーナーさん。
僕らに切り替えてくれて 2 ヶ月後、深夜 0 時に LINE が来ました。

「明日の朝までに、銀行に物件の収益データを 1 年分まとめて提出しないといけない。
追加融資の件で。何とかなりませんか?」

---

通常、こういう急な依頼は代行業者から見ると「明日の朝までは絶対無理」案件です。
- Airbnb の管理画面で月別売上データを取得
- Booking.com も同様
- 自社サイト直予約分も計算
- これを物件ごと × 12 ヶ月で計算
- Excel にまとめて整える

人力でやると 6-8 時間かかる作業。

---

でも、ダッシュボードに「収益データ一括エクスポート」機能があった。
オーナーさん自身がポータルにログイン → 期間指定（過去 12 ヶ月）→ PDF / Excel ダウンロード。

K さんは深夜 0 時 15 分に「自分でダウンロードできました!ありがとう」と返信。
僕は寝てる時間に、オーナーさんが自分で問題解決してくれた。

翌週、融資が無事に通って、K さんから「次の物件もお願いしたい」と連絡が来た。

---

僕らのオーナーポータルは「24 時間ダッシュボード」を機能として打ち出してるけど、
本当の価値は「**オーナーさんが代行業者を待たずに動ける**」ことだと思ってる。

人力で対応する代行業者は、土日や深夜は対応できない。
仕組み化したポータルは、24 時間オーナーさんを助けられる。

---

学びとして:
- オーナーさんが必要なデータに「自分で」アクセスできる仕組みは強い
- 代行業者が深夜対応する以上に、ポータルで自己解決できる方が早い
- 融資・確定申告・複数物件管理など、想定外の用途で活きる
- ダッシュボードは「機能」ではなく「オーナーさんの自由度」

---
あなたの物件の収益、いつでも自分で確認できるダッシュボードあります。
→ https://sekaistay.com/switch/portal?utm_source=x&utm_medium=organic&utm_campaign=longform&utm_content=unei_owner_dashboard_use

※ Airbnb 未掲載・アクティブなリスティングが無いオーナーも OK`;

const DRAFT_J3 = `Airbnb の価格、毎日触ってますか?

僕は毎日触ります。1日サボると、その日の予約が逃げます。
（厳密には Pricelabs に毎日チューニングさせてる）

「毎日って大袈裟だろ」と思う人にこそ読んでほしい話を書きます。

---

民泊の価格は、需要が日次でガンガン動きます。
- 3 日前に近隣でフェスが発表 → +30%
- 翌週に雨予報 → -15%
- 同エリアの競合が値下げ → -10%
- Airbnb 検索結果での自分の順位 → ±20%

これを月1で価格設定して放置していると、
高需要日に取りこぼし・低需要日に空室、両方が起きる。

「毎日触る」というのは、人が朝コーヒー飲みながら触るって意味じゃない。
ツール（Pricelabs / Beyond Pricing）と DP API を組み合わせて、
**毎日自動で再計算 → Airbnb / Booking.com / 自社サイトに同期** が前提。

---

具体的にどう設定するか、僕がいつもやってる手順:

1. ベースプライス: 過去 12 ヶ月のリスティングデータから AI で算出（Pricelabs）
2. 季節係数: 月単位で ±0-40% の幅を設定（GW・お盆・年末年始は +30%）
3. 曜日係数: 金土 +15%、日月 -10%
4. 残日数係数: 30 日前 -5%、14 日前 +0%、7 日前 +10%、3 日前 +20%（or -10%）
5. 競合連動: 同エリア類似物件の最新価格を毎日スクレイプして ±5% 補正

これを毎日実行 → 各 OTA に API で同期。

---

学びとして:
- 価格は日次で動く需要に毎日合わせるもの
- 人力では絶対に追いつかない（30 物件触るのに 1 人日かかる）
- Pricelabs + DP API の組み合わせが現状ベストプラクティス
- 「価格設定」を「予約管理」と別タスクで考えてる代行業者は要警戒

民泊運用は、人力でやれる範囲を超えてる業務。
毎日触れる仕組みを持ってる代行を選ぶといいです。

---
うちのダッシュボードで「毎日自動で何をしているか」見られます。
→ https://sekaistay.com/switch/portal?utm_source=x&utm_medium=organic&utm_campaign=longform&utm_content=jiro_dp_daily_tuning

※ Airbnb 未掲載・アクティブなリスティングが無いオーナーも OK`;

const DRAFT_U5 = `家具選定で失敗した話を書きます。
（運営チームの運用マネージャー視点で）

---

去年、京都の物件で和モダンのお洒落な「天然木のローテーブル」を入れたんです。
オーナーさんも「これ良いね」って言ってくれて、リスティング写真も映えた。

→ 3 ヶ月でひび割れ。

天然木は湿度差に弱いことを、知識としては知ってたんだけど、
「写真映えするから」を優先して採用してしまった。
結果、3 ヶ月で交換、20 万円の損失。

---

そこからチームで「民泊で使う家具・アメニティの選定基準」を文書化しました。

選定基準は 5 つ:
1. 耐久性: 業務用 or 業務向け表記があるか
2. 清掃のしやすさ: 取り外し可能 or 拭き取りやすい素材か
3. 修理コスト: 部分交換可能か（IKEA は部品単位で買える）
4. 写真映え: あくまで上記4点満たした上で
5. 価格: 1物件あたり ¥100-300K で抑える

---

実際に「これは外れた」家具・アメニティ:
- 天然木のテーブル → 業務向け突板材に変更
- ラタンのソファ → 合成ラタンに変更（雨水に強い・色褪せしない）
- 麻のシーツ → 厚手のコットン（洗濯耐久 200 回以上）
- アロマディフューザー（ガラス製）→ 樹脂製（割れない）

逆に「これは正解だった」もの:
- IKEA POÄNG（修理パーツが買える定番椅子）
- 業務用乾燥機（家庭用は 1-2 年で壊れる）
- カトラリーは全部 100 均で揃える（紛失前提）
- タオルはホテル業務用（耐久性 + 統一感）

---

学びとして:
- 民泊家具は「業務用 or 業務向け」を基準にする
- 写真映えは選定の最後の条件
- 修理可能な家具を選ぶ（部品単位で買えるか）
- アメニティは紛失前提で安く・統一感を持たせる

家具選定は地味だけど、ここを外すと毎年の修繕費が積み上がります。

---
うちのオーナーポータルでは、家具・アメニティの推奨リストも見られます。
→ https://sekaistay.com/switch/portal?utm_source=x&utm_medium=organic&utm_campaign=longform&utm_content=unei_furniture_fail

※ Airbnb 未掲載・アクティブなリスティングが無いオーナーも OK`;

const PIPELINE_ROWS = [
  ["T-1", "@tenichiliu", "業界トレンド",
    '"民泊運用代行を、業界相場の半額にしました。" — なぜ 8% で回せるか',
    "/switch", "2026-05-18 08:00", "Draft", "", "", "",
    "Pending", "", "", "",
    "Pending", "", "", "民泊運用代行 手数料 / 8%構造 / 仕組み化",
    "Hook: 数字インパクト型・LinkedIn高エンゲ #1 パターン (Quote opening)",
    DRAFT_T1],
  ["T-3", "@tenichiliu", "法務制度",
    '"民泊新法のせいで撤退します" — A/B/C 物件分類フレーム',
    "/switch", "2026-05-19 08:00", "Draft", "", "", "",
    "Pending", "", "", "",
    "Pending", "", "", "民泊新法 2026 / 180日上限 / 旅館業法切替 / 特区民泊",
    "Hook: Counter-intuitive Quote (LinkedIn高エンゲ #3パターン)",
    DRAFT_T3],
  ["T-4", "@tenichiliu", "民泊家具・アメニティ",
    '"20万円の家具をケチって、100万円逃してます" — 家具投資ROIフレーム',
    "/switch/portal", "2026-05-20 08:00", "Draft", "", "", "",
    "Pending", "", "", "",
    "Pending", "", "", "民泊家具 / 家具投資ROI / ADR向上",
    "Hook: 損失額型 Quote opening ｜ 30万円投資→年240万円増収",
    DRAFT_T4],
  ["T-2", "@tenichiliu", "オーナー成功事例",
    "BEST OF SAUNA STAY 2026 受賞振り返り — ニッチを攻めると価格競争を抜け出せる",
    "/switch/founder", "2026-05-21 08:00", "Draft", "", "", "",
    "Pending", "", "", "",
    "Pending", "", "", "サウナ × 民泊 / ポジショニング再設計 / +30%増収",
    "Hook: 受賞ストーリー ｜ 同日夜 20:00 にローンチ予告通常ツイート別途投稿",
    DRAFT_T2],
  ["T-LAUNCH", "@tenichiliu", "業界トレンド + オーナー成功事例",
    "🚀 SEKAI STAY 本格発表 (経営者ビジョン軸)",
    "/switch/founder", "2026-05-22 10:00", "Draft", "", "", "",
    "Pending (同日)", "2026-05-22", "", "",
    "Pending", "2026-05-24", "", "民泊運用代行 8% / スーパーホスト多数認定 / 業界半額",
    "🔴 PR TIMES URL を [PR TIMES Link] に挿入要 ｜ ジロー版と同時 10:00 砲火",
    DRAFT_LAUNCH_T],
  ["J-LAUNCH", "@jirosan", "OTA運用 + オーナー成功事例",
    "🚀 SEKAI STAY 本格発表 (現場実証3ポイント)",
    "/switch", "2026-05-22 10:00", "Draft", "", "", "",
    "Pending (同日)", "2026-05-22", "", "",
    "Pending", "2026-05-24", "", "民泊代行 現場 / DP 毎日 / オーナーポータル",
    "🔴 PR TIMES URL 挿入要 ｜ ジロー初投稿・テンイチ版と同時 10:00 砲火",
    DRAFT_LAUNCH_J],
  ["J-4", "@jirosan", "法務制度",
    "2026 年 民泊新法 周辺で何が変わるか",
    "/switch", "2026-05-23 12:00", "Draft", "", "", "",
    "Pending", "", "", "",
    "Pending", "", "", "民泊新法 / 保健所対応 / 騒音問題",
    "ジロー視点・現場ノウハウ系で滞在時間獲得",
    DRAFT_J4],
  ["U-6", "@ss_unei_chan", "オーナー成功事例",
    "オーナーポータルが救った深夜 0 時の融資資料",
    "/switch/portal", "2026-05-24 19:00", "Draft", "", "", "",
    "Pending", "", "", "",
    "Pending", "", "", "オーナーポータル / 24時間ダッシュボード / 収益エクスポート",
    "架空社員視点・ローンチ余韻 + ポータル機能訴求",
    DRAFT_U6],
  ["J-3 (deferred)", "@jirosan", "OTA運用テクニック",
    "[W3移行] Airbnb価格を毎日触ってわかったこと",
    "/switch/portal", "2026-05-26 12:00", "Skipped", "", "", "",
    "Pending", "", "", "",
    "Pending", "", "", "ダイナミックプライシング / Pricelabs",
    "今週はテンイチ運用のため W3 へ後ろ倒し",
    DRAFT_J3],
  ["U-5 (deferred)", "@ss_unei_chan", "民泊家具・アメニティ",
    "[W3移行] 家具選定で失敗した話",
    "/switch/portal", "2026-05-27 19:00", "Skipped", "", "", "",
    "Pending", "", "", "",
    "Pending", "", "", "民泊家具 / 業務用 / 修理可能",
    "今週はテンイチ運用のため W3 へ後ろ倒し",
    DRAFT_U5],
];

async function main() {
  const sheets = getSheets(ACCOUNT);

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

  const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  const pipelineSheet = meta.data.sheets.find(s => s.properties.title === "Pipeline");
  const pipelineSheetId = pipelineSheet.properties.sheetId;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: {
      requests: [
        // Full Draft 列 (T列 = index 19) を 650px に
        { updateDimensionProperties: { range: { sheetId: pipelineSheetId, dimension: "COLUMNS", startIndex: 19, endIndex: 20 }, properties: { pixelSize: 650 }, fields: "pixelSize" } },
        // 各データ行の高さを 320px に
        { updateDimensionProperties: { range: { sheetId: pipelineSheetId, dimension: "ROWS", startIndex: 1, endIndex: 11 }, properties: { pixelSize: 320 }, fields: "pixelSize" } },
        // Full Draft 列に wrap + top
        {
          repeatCell: {
            range: { sheetId: pipelineSheetId, startRowIndex: 1, endRowIndex: 200, startColumnIndex: 19, endColumnIndex: 20 },
            cell: { userEnteredFormat: { wrapStrategy: "WRAP", verticalAlignment: "TOP", textFormat: { fontSize: 9 } } },
            fields: "userEnteredFormat(wrapStrategy,verticalAlignment,textFormat)",
          },
        },
        // ヘッダー再フォーマット
        {
          repeatCell: {
            range: { sheetId: pipelineSheetId, startRowIndex: 0, endRowIndex: 1 },
            cell: { userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.85, green: 0.92, blue: 0.95 }, horizontalAlignment: "CENTER" } },
            fields: "userEnteredFormat(textFormat,backgroundColor,horizontalAlignment)",
          },
        },
        // ヘッダー凍結
        {
          updateSheetProperties: {
            properties: { sheetId: pipelineSheetId, gridProperties: { frozenRowCount: 1, frozenColumnCount: 1 } },
            fields: "gridProperties.frozenRowCount,gridProperties.frozenColumnCount",
          },
        },
      ],
    },
  });

  console.log(`✅ Pipeline updated: ${PIPELINE_ROWS.length} rows with Full Draft Content`);
  console.log(`📊 https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit#gid=0`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
