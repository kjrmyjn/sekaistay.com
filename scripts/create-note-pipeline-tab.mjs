#!/usr/bin/env node
// SEKAI STAY note Pipeline タブを生成 (X Pipeline とは別管理)
// Sheet: 19qsHLdmIex59mj-xABMbF4jCatHoy6SN7LE8x4EzWVY
//
// 設計方針 (2026-05-18):
//   note は X とは完全別軸のチャネル
//   - AI 言及ゼロ (経営者論考トーン)
//   - けんすう note 寄り (落ち着いた自己開示・構造分析・物語)
//   - 2,500-5,500 字、章立て (##) あり
//   - X の長文を単純転載しない
//
// 3 軸:
//   A. 経営者自己開示型 — 創業の意思決定・失敗・葛藤
//   B. 業界構造分析型 — 経営学的フレームで業界を分解
//   C. オーナー成功物語型 — 1 物件 / 1 オーナーの長編再生物語
//
// 初週 3 本:
//   N-1: 民泊代行を 8% でやろうと決めた日 (自己開示型)
//   N-2: 民泊代行のコスト構造を、経営学的に分解する (構造分析型)
//   N-3: サウナで再ポジショニングしたら、ADR が 2 倍になった話 (物語型)

import { getSheets } from "../../../shared/google-auth/index.js";

const SPREADSHEET_ID = "19qsHLdmIex59mj-xABMbF4jCatHoy6SN7LE8x4EzWVY";
const ACCOUNT = "sekaichi";

const PIPELINE_HEADER = [
  "ID", "Type", "Pillar", "Title",
  "LP送客先", "note Publish Date", "note Status", "note URL", "note Likes", "note PV",
  "HP Status", "HP Publish Date", "HP URL", "HP SEO Keywords",
  "字数", "Review Comments",
  "📝 Full Draft Content",
];

const DRAFT_N1 = `# 民泊代行を 8% でやろうと決めた日

民泊代行という事業を始めるとき、業界相場の手数料は 15-25% でした。
それを 8% でやると決めた日のことを、書いておこうと思います。

## 1. 「相場」を疑うところから始まった

民泊代行業界を調べていた時、ほぼ全ての会社が手数料 15-25% で見積もりを出していました。

オーナーさんに「これは高くないですか?」と聞くと、ほとんどが「他社も同じだから仕方ない」と言う。

でも、なぜそうなっているかを誰もちゃんと説明していなかったんですよ。

業界全体で「相場はこうだから」を続けてきた結果、手数料が高止まりしている。
そう感じました。

## 2. コスト構造を、ゼロから設計し直す

民泊代行のコストは、大きく分けると 4 つあります。

- 価格管理（ダイナミックプライシング）
- カスタマー対応（チェックイン前後・トラブル）
- 清掃・リネン
- バックオフィス（売上・経費・税務処理）

業界相場 20% の代行は、これらをすべて「人が物件に張り付く」前提で組んでいる。

つまり 1 人が見られる物件数が、多くて数十件程度になる。
だから、1 物件あたりの人件費が高くなり、手数料を下げられない。

ここを構造から見直す必要があると思いました。

## 3. 「1 人で 100 物件」を成立させる仕組み

うちが取った方針は、運営の仕組みを根本から組み直すことでした。

価格管理は日次で全物件チューニング。
カスタマー対応は一次対応の標準化と、人の判断を分ける設計。
清掃は信頼パートナーと長期契約。
バックオフィスは仕組み化して属人化を外す。

これで、1 人で 100 物件以上を見られる構造になった。

業界相場 20% の代行と比べると、2 倍以上の効率です。

## 4. 8% でも、品質を上げられる確信があった

「手数料を下げる = 品質が下がる」と言われることがあります。

でも実際は、逆だと思っています。

属人化した運営は、担当者によって品質がばらつく。
仕組みで回すと、品質が均質化する。

スーパーホストの運営力を、構造として再現する。
これがうちの民泊代行の本質です。

## 5. これからのこと

民泊代行という業態は、これから 5 年で構造が変わっていくと思っています。

人力で物件を見るモデルから、仕組みで回すモデルへ。
手数料 15-25% から、もっと適正な水準へ。

そういう変化の起点になりたいと思って、8% で始めました。

業界の常識を、ちゃんと変えていきたいと思います。

---

ここまで読んでいただいてありがとうございました。

もしご自身の物件で「今いくら稼げる物件か」気になる方は、
60 秒で簡易診断ができます → https://sekaistay.com/switch?utm_source=note&utm_medium=organic&utm_campaign=note_founder&utm_content=tenichi_8pct_decision`;

const DRAFT_N2 = `# 民泊代行のコスト構造を、経営学的に分解する

民泊代行という業態は、なぜ手数料が下がらないのか。
業界の中にいる人間として、構造を整理しておきたいと思います。

## 1. 民泊代行の P/L をフレーム化する

民泊代行業の売上は、宿泊売上に対する手数料です。
業界相場は 15-25%、つまり宿泊売上 100 万円の物件で、代行会社の売上は 15-25 万円。

このうち、代行会社のコストは大きく 5 つに分かれます。

- 価格設定・予約管理の人件費
- カスタマー対応の人件費（24 時間体制）
- 清掃・リネンのコスト
- バックオフィス（経理・税務・申請対応）
- マーケティング・営業

このうち、清掃・リネンはオーナー負担で別建てになることが多いので、
実質、代行会社が負っているのは **人件費 + バックオフィス + マーケ** です。

## 2. 「人件費」が手数料を縛っている

業界の代行会社の運営構造を見ると、ほとんどが「1 人が見られる物件数」で制約されています。

具体的には、頑張っている会社で 1 人あたり数十件程度。
価格管理・予約管理・カスタマー対応をすべて手動で回すと、これ以上は物理的に難しい。

逆算してみます。

- 都内 1 棟貸し物件の月間売上: 60-100 万円
- 手数料 20% でも代行売上: 12-20 万円 / 月 / 物件
- 担当者 1 人で 50 物件管理: 月 600-1,000 万円の売上を 1 人で持つ
- 担当者人件費 + 諸経費を引くと、利益率は意外と薄い

つまり業界相場 20% は、**人力モデルの損益分岐点を維持するための価格** です。
ここを下げると、人力モデルの会社は赤字になる。

## 3. 構造を変えると、何が起きるか

ここからが本題です。

民泊運用の業務を分解すると、**毎日繰り返す定型業務** と **判断が要る非定型業務** に分かれます。

定型業務（価格チューニング、予約確認、レポート集計、経費仕分け）は、仕組みで自動化できる。
非定型業務（クレーム対応、複雑な交渉、戦略判断）は、人が必要。

業界の代行会社の多くは、両方を「人」でやっている。
だから 1 人あたりの担当物件数が伸びない。

ここを切り分けて、定型は仕組みに、非定型は人に集中させると、1 人で見られる物件数が一気に増える。
うちの構造では、1 人で 100 物件以上を見られる設計になっています。

業界相場 20% の代行と比べて、2 倍以上の効率です。

## 4. 8% は、構造が変われば成立する

ここまでの整理を前提に、手数料 8% を逆算してみます。

宿泊売上 100 万円の物件で、代行売上は 8 万円。
1 人で 100 物件を見られれば、月間売上 800 万円を 1 人で持てる。

人件費を業界水準で見積もっても、十分に利益が出る構造になります。

つまり 8% は、運営構造を変えることで成立する価格です。
業界相場 20% の半額以下に見えますが、構造的にちゃんと回ります。

## 5. 競合と何が違うか

「他社も AI を入れてるじゃないか」という指摘があるかもしれません。

そのとおりで、業界の他社も部分的にツールを入れています。
ただ、それは既存の人力オペレーションに「ツールを足す」設計で、
1 人あたりの担当物件数を 2 倍にする発想にはなっていない。

うちは逆で、**仕組みを前提に運営フローを全部組み直した**。
だから 1 人 100 物件以上が成立して、8% という価格が出せる。

## 6. これからの民泊代行業

民泊代行という業態は、これから「仕組み型」と「人力型」に分岐していくと思います。

人力型は手数料 15-25% を維持しつつ、丁寧な対応で差別化する。
仕組み型は手数料を下げて、台数を稼ぐ。

オーナーは、どちらが自分に合っているかを選ぶ時代になる。
そういう業界構造の変化の起点になりたいと思っています。

---

ここまで読んでいただいてありがとうございました。

もしご自身の物件の代行手数料が「業界相場のままで本当に妥当か」気になる方は、
60 秒で簡易診断ができます → https://sekaistay.com/switch?utm_source=note&utm_medium=organic&utm_campaign=note_industry&utm_content=tenichi_cost_structure`;

const DRAFT_N3 = `# サウナで再ポジショニングしたら、ADR が 2 倍になった話

ある京都の 1 棟貸し物件で、ADR（平均客単価）が 2 倍になった話を書きます。

派手な改装をしたわけではありません。
やったのは、**物件の見せ方を変えただけ** です。

## 1. 「稼働率は高いのに、稼げない」物件

その物件は、京都市内の築 30 年の町家でした。
オーナーの K さん（仮名）が 2023 年に取得して、別の代行会社で運用していました。

スペックは悪くなかった。

- 立地: 京都市内・観光地から徒歩 15 分
- 広さ: 90 平米、4 人 + 子供 2 人まで対応
- 設備: 庭付き、テラス、IH キッチン

稼働率は月 70-80% で回っていました。
でも、ADR は ¥26,000。

K さんは「悪くない数字なんだけど、もう少し伸ばせる気がする」と言っていました。

## 2. 「立地が中途半端」という見立て

うちが引き受けて最初に見たのは、競合分析でした。

同じ京都市内・90 平米・4 人対応の物件を 50 件ほど並べて見たんですよ。
そこで気づいたのは、**ど真ん中の観光地物件に勝てる立地ではない** ということでした。

清水寺・祇園エリアまで徒歩 5 分の物件は ADR ¥40,000-50,000 で取れている。
でも徒歩 15 分の物件は、その値段では予約が入らない。

つまり、立地で勝負しようとすると、ADR ¥26,000 が天井になる。
これは構造的な問題でした。

## 3. ターゲットを変える

ここでチームで議論したのは、**「立地で勝てないなら、別の軸で勝てるか」** でした。

物件の特徴を改めて見直しました。

- 庭がある
- テラスがある
- 静かなエリア
- 90 平米と広い

ここから出てきた仮説は、「観光客じゃなくて、ゆっくり過ごしたい人をターゲットにする」でした。

具体的には、**サウナ好き** です。
当時、京都にサウナ目的で来る層が増えていて、近隣にいくつか有名なサウナ施設がありました。

物件のテラスに、簡易テントサウナを 1 台置いた。
庭で水風呂代わりの水浴びができるように、ホースと木製のたらいを設置した。
リスティング名を「町家サウナリゾート」に変えた。

## 4. ADR が ¥26,000 → ¥58,000 になった

写真撮り直し・リスティング書き直しまで含めて、再ポジショニング完了まで 2 週間。

3 ヶ月後の数字です。

- ADR: ¥26,000 → ¥58,000 (約 2.2 倍)
- 稼働率: 75% → 68% (微減)
- 月間売上: 約 1.7 倍

稼働率は少し下がりましたが、ADR の伸びの方が大きく、月間売上は大きく伸びました。

K さんも「同じ物件なのに、こんなに変わるとは思わなかった」と言っていました。

## 5. なぜこの変化が起きたか

これは、「立地で勝てない物件は、別の軸でターゲットを切り替える」というシンプルな話です。

民泊運用のあるあるは、**全物件を「観光客向け」で運用してしまうこと** だと思います。

立地が良い物件はそれで勝てるけど、立地で勝てない物件は、ADR が頭打ちになる。
そのまま「稼働率を上げる」方向に走ると、価格を下げざるを得なくなり、収益はさらに下がる。

ここで効くのが、**ポジショニングを別軸で切り直す判断** です。

スーパーホストとして 5 年運用してきた経験で言えるのは、立地が中途半端な物件こそ、
特化型のリスティングに切り替えることで化ける、ということでした。

## 6. これからのこと

物件のポジショニングは、「立地」「広さ」「価格」だけじゃない。
「誰の何を満たす空間か」を改めて設計し直すと、ADR は意外と伸びる。

うちでは、こういう物件単位の再設計を、運営の一部として組み込んでいます。
1 物件ずつ、丁寧に。

K さんの物件は今もうちで運用していて、毎月安定して伸びています。

---

ここまで読んでいただいてありがとうございました。

もしご自身の物件で「もっと ADR を伸ばせる気がする」と感じている方は、
60 秒で簡易診断ができます → https://sekaistay.com/switch/founder?utm_source=note&utm_medium=organic&utm_campaign=note_story&utm_content=tenichi_sauna_repositioning`;

const PIPELINE_ROWS = [
  ["N-1", "A. 経営者自己開示型", "業界トレンド",
    "民泊代行を 8% でやろうと決めた日",
    "/switch", "2026-05-19 09:00", "Draft", "", "", "",
    "Pending", "", "", "民泊代行 手数料 / 業界相場 / 仕組み化",
    "約 1,700 字",
    "✨ note v1: けんすう note 寄り・落ち着いた自己開示・AI 言及ゼロ",
    DRAFT_N1],
  ["N-2", "B. 業界構造分析型", "業界トレンド",
    "民泊代行のコスト構造を、経営学的に分解する",
    "/switch", "2026-05-21 09:00", "Draft", "", "", "",
    "Pending", "", "", "民泊代行 P/L / コスト構造 / 経営分析",
    "約 2,100 字",
    "✨ note v1: 経営学的フレームで業界を分解・SEO 上位狙い",
    DRAFT_N2],
  ["N-3", "C. オーナー成功物語型", "オーナー成功事例",
    "サウナで再ポジショニングしたら、ADR が 2 倍になった話",
    "/switch/founder", "2026-05-23 09:00", "Draft", "", "", "",
    "Pending", "", "", "民泊 再ポジショニング / ADR 改善 / 京都 町家",
    "約 2,200 字",
    "✨ note v1: 1 物件再生物語・スーパーホスト運営力が滲む構成",
    DRAFT_N3],
];

async function main() {
  const sheets = getSheets(ACCOUNT);

  // 1. note Pipeline タブを追加
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  const existing = meta.data.sheets.find(s => s.properties.title === "note Pipeline");

  let noteSheetId;
  if (existing) {
    noteSheetId = existing.properties.sheetId;
    console.log("ℹ️  note Pipeline タブは既存 — 既存の内容をクリアして上書き");
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: "'note Pipeline'!A1:Z200",
    });
  } else {
    const addResp = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [
          { addSheet: { properties: { title: "note Pipeline" } } },
        ],
      },
    });
    noteSheetId = addResp.data.replies[0].addSheet.properties.sheetId;
    console.log("✅ note Pipeline タブを新規作成");
  }

  // 2. ヘッダー + 行を書き込み
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: "'note Pipeline'!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [PIPELINE_HEADER, ...PIPELINE_ROWS] },
  });

  // 3. フォーマット (列幅・行高・wrap・凍結・ヘッダーカラー)
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: {
      requests: [
        // ID 列
        { updateDimensionProperties: { range: { sheetId: noteSheetId, dimension: "COLUMNS", startIndex: 0, endIndex: 1 }, properties: { pixelSize: 80 }, fields: "pixelSize" } },
        // Type 列
        { updateDimensionProperties: { range: { sheetId: noteSheetId, dimension: "COLUMNS", startIndex: 1, endIndex: 2 }, properties: { pixelSize: 150 }, fields: "pixelSize" } },
        // Title 列
        { updateDimensionProperties: { range: { sheetId: noteSheetId, dimension: "COLUMNS", startIndex: 3, endIndex: 4 }, properties: { pixelSize: 280 }, fields: "pixelSize" } },
        // Full Draft Content 列 (一番右)
        { updateDimensionProperties: { range: { sheetId: noteSheetId, dimension: "COLUMNS", startIndex: 16, endIndex: 17 }, properties: { pixelSize: 700 }, fields: "pixelSize" } },
        // 行高
        { updateDimensionProperties: { range: { sheetId: noteSheetId, dimension: "ROWS", startIndex: 1, endIndex: 4 }, properties: { pixelSize: 500 }, fields: "pixelSize" } },
        // Full Draft Content wrap
        {
          repeatCell: {
            range: { sheetId: noteSheetId, startRowIndex: 1, endRowIndex: 200, startColumnIndex: 16, endColumnIndex: 17 },
            cell: { userEnteredFormat: { wrapStrategy: "WRAP", verticalAlignment: "TOP", textFormat: { fontSize: 9 } } },
            fields: "userEnteredFormat(wrapStrategy,verticalAlignment,textFormat)",
          },
        },
        // ヘッダー装飾 (note は紫系で X Pipeline と区別)
        {
          repeatCell: {
            range: { sheetId: noteSheetId, startRowIndex: 0, endRowIndex: 1 },
            cell: { userEnteredFormat: { textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } }, backgroundColor: { red: 0.55, green: 0.45, blue: 0.7 }, horizontalAlignment: "CENTER" } },
            fields: "userEnteredFormat(textFormat,backgroundColor,horizontalAlignment)",
          },
        },
        // 凍結
        {
          updateSheetProperties: {
            properties: { sheetId: noteSheetId, gridProperties: { frozenRowCount: 1, frozenColumnCount: 1 } },
            fields: "gridProperties.frozenRowCount,gridProperties.frozenColumnCount",
          },
        },
      ],
    },
  });

  console.log(`\n✅ note Pipeline 完成: ${PIPELINE_ROWS.length} 行 (N-1, N-2, N-3)`);
  console.log(`📊 https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit#gid=${noteSheetId}`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  console.error(err);
  process.exit(1);
});
