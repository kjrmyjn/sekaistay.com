#!/usr/bin/env node
// SEKAI STAY note Pipeline タブを生成 (X Pipeline とは別管理)
// Sheet: 19qsHLdmIex59mj-xABMbF4jCatHoy6SN7LE8x4EzWVY
//
// v3 (2026-05-18): 固有名詞（スーパーホスト等）の注記は不要に
//   - スーパーホスト・Airbnb・Booking.com など固有名詞はそのまま使う
//   - 一般用語化されたカタカナ語（再ポジショニング・リスティング等）のみ日本語化
//
// v2 (2026-05-18): 地方のおじさん向けに用語を日本語化
//   - 「再ポジショニング」→「見せ方を変える」「打ち出し方を変える」
//   - 「ADR」→「平均宿泊単価」(必要なら括弧で原語注記)
//   - 「ダイナミックプライシング」→「需要に応じた日々の価格調整」
//   - 「P/L」→「損益(売上とコスト)」
//   - 「M&A」→「企業の買収・合併」
//   - 横文字を最小限・必要なら必ず日本語注記
//
// v1 (2026-05-18 初版): note 戦略 (X とは別軸の AI 言及ゼロ経営者論考)

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

民泊代行という事業を始めるとき、業界の平均的な手数料は 15-25% でした。
それを 8% でやると決めた日のことを、書いておこうと思います。

## 1. 「相場」を疑うところから始まった

民泊代行業界を調べていた時、ほとんどの会社が手数料 15-25% で見積もりを出していました。

オーナーさんに「これは高くないですか?」と聞くと、多くの方が「他社も同じだから仕方ない」と言う。

でも、なぜそうなっているかを、誰もちゃんと説明していなかったんですよ。

業界全体で「相場はこうだから」を続けてきた結果、手数料が高止まりしている。
そう感じました。

## 2. コストの中身を、ゼロから見直す

民泊代行のコストは、大きく分けると 4 つあります。

- 価格の管理（毎日の値付けの調整）
- お客さん対応（チェックイン前後やトラブル時の連絡）
- 清掃・シーツや布団のリネン交換
- 経理や売上管理などの裏側業務

業界の平均的な手数料 20% の代行会社は、これらをすべて「人が物件に張り付く」前提で組んでいる。

そうすると、1 人の担当者が見られる物件は多くて数十件程度になる。
だから 1 物件あたりの人件費が高くなって、手数料を下げられない。

ここを根本から見直す必要があると思いました。

## 3. 「1 人で 100 物件」を成り立たせる仕組み

うちが取った方針は、運営の仕組みを根本から組み直すことでした。

価格は毎日、全物件について調整する。
お客さん対応は、よくある問い合わせの一次対応を標準化して、人が判断すべきものに集中する。
清掃は信頼できる地元の業者さんと長期で組む。
経理や裏側業務は、人によってやり方が違わないように仕組みで回す。

これで、1 人の担当者が 100 物件以上を見られる構造になった。

業界の平均的な代行と比べると、2 倍以上の効率です。

## 4. 8% でも、品質を上げられる確信があった

「手数料を下げる = 品質が下がる」と言われることがあります。

でも実際は、逆だと思っています。

担当者まかせの運営は、人によって品質がばらつく。
仕組みで回すと、どの物件でも品質が安定する。

スーパーホストとして 5 年やってきた経験を、
担当者まかせにせずに仕組みとして組み直す。
これがうちの民泊代行の本質です。

## 5. これからのこと

民泊代行という業態は、これから 5 年で構造が変わっていくと思っています。

人が物件に張り付くやり方から、仕組みで回すやり方へ。
手数料 15-25% から、もっと適正な水準へ。

そういう変化の起点になりたいと思って、8% で始めました。

業界の常識を、ちゃんと変えていきたいと思います。

---

ここまで読んでいただいてありがとうございました。

もしご自身の物件で「今いくら稼げる物件か」気になる方は、
60 秒で簡易診断ができます → https://sekaistay.com/switch?utm_source=note&utm_medium=organic&utm_campaign=note_founder&utm_content=tenichi_8pct_decision`;

const DRAFT_N2 = `# 民泊代行の中身を、お金の流れから見直す

民泊代行という業態は、なぜ手数料が下がらないのか。
業界の中にいる人間として、整理しておきたいと思います。

## 1. 民泊代行のお金の流れ

民泊代行業の売上は、宿泊代金に対する手数料です。
業界の平均的な水準は 15-25%、つまり宿泊代金 100 万円の物件で、代行会社の売上は 15-25 万円。

このうち、代行会社が抱えるコストは大きく 5 つに分かれます。

- 価格の管理・予約の管理に関わる人件費
- お客さん対応の人件費（24 時間体制）
- 清掃・リネン（シーツや布団）にかかる費用
- 経理・税務・行政への申請対応などの裏側業務
- マーケティング（集客・宣伝）と営業

このうち、清掃・リネンはオーナーさんが別建てで負担することが多いので、
実際に代行会社が抱えているのは **人件費 + 裏側業務 + 集客** です。

## 2. 「人件費」が手数料を縛っている

業界の代行会社の運営を見ると、ほとんどが「1 人が見られる物件数」で縛られています。

具体的には、頑張っている会社でも 1 人あたり多くて数十件程度。
価格の調整、予約の確認、お客さん対応をすべて手作業で回すと、これ以上は物理的に難しい。

逆算してみます。

- 都内の 1 棟貸し物件の月の売上: 60-100 万円
- 手数料 20% でも代行会社の売上は: 月 12-20 万円 / 物件
- 担当者 1 人で 50 物件を見ると: 月 600-1,000 万円分の売上を 1 人で持つ
- 担当者の人件費や諸経費を引くと、利益は意外と薄い

つまり業界の平均的な 20% という手数料は、**人が物件に張り付くやり方を維持するために必要な水準** なんです。
ここを下げると、人力モデルの会社は赤字になる。

## 3. やり方を変えると、何が起きるか

ここからが本題です。

民泊運用の業務を分けると、**毎日繰り返す決まった業務** と **判断が要る非定型な業務** に分かれます。

決まった業務（毎日の価格の調整、予約確認、レポート集計、経費の仕分け）は、仕組みで回せる。
判断が要る業務（クレーム対応、複雑な交渉、戦略判断）は、人が必要。

業界の代行会社の多くは、両方を「人」でやっている。
だから 1 人あたりの担当物件数が伸びない。

ここを切り分けて、決まった業務は仕組みに、判断が要る業務に人を集中させると、1 人で見られる物件数が一気に増える。
うちの構造では、1 人で 100 物件以上を見られる設計になっています。

業界の平均的な代行会社と比べて、2 倍以上の効率です。

## 4. 8% は、やり方が変われば成立する

ここまでの整理を前提に、手数料 8% を逆算してみます。

宿泊代金 100 万円の物件で、代行会社の売上は 8 万円。
1 人で 100 物件を見られれば、月の売上 800 万円分を 1 人で持てる。

担当者の人件費を業界水準で見積もっても、十分に利益が出る構造になります。

つまり 8% は、運営のやり方を変えることで成立する価格です。
業界の平均的な手数料 20% の半額以下に見えますが、ちゃんと回ります。

## 5. 競合と何が違うか

「他社もツールを入れているじゃないか」という指摘があるかもしれません。

そのとおりで、業界の他社も部分的にツールを入れています。
ただ、それは今までの人力のやり方に「ツールを足す」設計で、
1 人あたりの担当物件数を 2 倍にする発想にはなっていない。

うちは逆で、**仕組みを前提に運営の流れを全部組み直した**。
だから 1 人 100 物件以上が成立して、8% という価格が出せる。

## 6. これからの民泊代行業

民泊代行という業態は、これから「仕組み型」と「人力型」に分かれていくと思います。

人力型は手数料 15-25% を維持しつつ、丁寧な対応で差別化する。
仕組み型は手数料を下げて、扱う物件数を増やす。

オーナーさんは、どちらが自分に合っているかを選ぶ時代になる。
そういう業界の変化の起点になりたいと思っています。

---

ここまで読んでいただいてありがとうございました。

もしご自身の物件の代行手数料が「業界相場のままで本当に妥当か」気になる方は、
60 秒で簡易診断ができます → https://sekaistay.com/switch?utm_source=note&utm_medium=organic&utm_campaign=note_industry&utm_content=tenichi_cost_structure`;

const DRAFT_N3 = `# サウナを置いて見せ方を変えたら、平均宿泊単価が 2 倍になった話

ある京都の 1 棟貸し物件で、平均宿泊単価（1 泊あたりの平均価格）が 2 倍になった話を書きます。

派手な改装をしたわけではありません。
やったのは、**物件の見せ方を変えただけ** です。

## 1. 「稼働率は高いのに、稼げない」物件

その物件は、京都市内の築 30 年の町家でした。
オーナーの K さん（仮名）が 2023 年に取得して、別の代行会社で運用していました。

スペックは悪くなかった。

- 立地: 京都市内・観光地から徒歩 15 分
- 広さ: 90 平米、大人 4 人 + 子供 2 人まで対応
- 設備: 庭付き、テラス、IH キッチン

稼働率（部屋が埋まる割合）は月 70-80% で回っていました。
でも、1 泊あたりの平均単価は ¥26,000。

K さんは「悪くない数字なんだけど、もう少し伸ばせる気がする」と言っていました。

## 2. 「立地が中途半端」という見立て

うちが引き受けて最初に見たのは、近くの似た物件との比較でした。

同じ京都市内・90 平米・4 人対応の物件を 50 件ほど並べて見たんですよ。
そこで気づいたのは、**ど真ん中の観光地物件に勝てる立地ではない** ということでした。

清水寺・祇園エリアまで徒歩 5 分の物件は 1 泊 ¥40,000-50,000 で予約が入っている。
でも徒歩 15 分の物件は、その値段では予約が入らない。

つまり、立地で勝負しようとすると、1 泊 ¥26,000 が頭打ちになる。
これは構造的な問題でした。

## 3. お客さんの層を変える

ここでチームで議論したのは、**「立地で勝てないなら、別の魅力で勝てるか」** でした。

物件の特徴を改めて見直しました。

- 庭がある
- テラスがある
- 静かなエリア
- 90 平米と広い

ここから出てきた仮説は、「観光客じゃなくて、ゆっくり過ごしたい人をお客さんにする」でした。

具体的には、**サウナ好きの層** です。
当時、京都にサウナ目的で来る人が増えていて、近くにいくつか有名なサウナ施設がありました。

そこで、物件のテラスに簡易テントサウナを 1 台置いた。
庭で水風呂代わりの水浴びができるように、ホースと木製のたらいを用意した。
Airbnb の物件ページの名前を「町家サウナリゾート」に変えた。

## 4. 1 泊 ¥26,000 → ¥58,000 になった

写真の撮り直し・物件ページの書き直しまで含めて、見せ方の作り直しが完了するまで 2 週間。

3 ヶ月後の数字です。

- 1 泊あたりの平均単価: ¥26,000 → ¥58,000 (約 2.2 倍)
- 稼働率: 75% → 68% (微減)
- 月の売上: 約 1.7 倍

稼働率は少し下がりましたが、単価の伸びの方が大きく、月の売上は大きく伸びました。

K さんも「同じ物件なのに、こんなに変わるとは思わなかった」と言っていました。

## 5. なぜこの変化が起きたか

これは、「立地で勝てない物件は、お客さんの層を切り替える」というシンプルな話です。

民泊運用でよくあるのは、**全物件を「観光客向け」で運用してしまうこと** だと思います。

立地が良い物件はそれで勝てるけど、立地で勝てない物件は、単価が頭打ちになる。
そのまま「稼働率を上げる」方向に走ると、価格を下げざるを得なくなり、収益はさらに下がる。

ここで効くのが、**お客さんの層を別に切り直す判断** です。

スーパーホストとして 5 年運用してきた経験で言えるのは、
立地が中途半端な物件こそ、用途を絞った打ち出し方に切り替えることで化ける、ということでした。

## 6. これからのこと

物件の打ち出し方は、「立地」「広さ」「価格」だけじゃない。
「誰の、どんな時間を満たす空間か」を改めて設計し直すと、単価は意外と伸びる。

うちでは、こういう物件単位の見直しを、運営の一部として組み込んでいます。
1 物件ずつ、丁寧に。

K さんの物件は今もうちで運用していて、毎月安定して伸びています。

---

ここまで読んでいただいてありがとうございました。

もしご自身の物件で「もっと単価を伸ばせる気がする」と感じている方は、
60 秒で簡易診断ができます → https://sekaistay.com/switch/founder?utm_source=note&utm_medium=organic&utm_campaign=note_story&utm_content=tenichi_sauna_repositioning`;

const PIPELINE_ROWS = [
  ["N-1", "A. 経営者自己開示型", "業界トレンド",
    "民泊代行を 8% でやろうと決めた日",
    "/switch", "2026-05-19 09:00", "Draft", "", "", "",
    "Pending", "", "", "民泊代行 手数料 / 業界相場 / 仕組み化",
    "約 1,800 字",
    "✨ v3: スーパーホスト注記を削除（固有名詞はそのまま使用）",
    DRAFT_N1],
  ["N-2", "B. 業界構造分析型", "業界トレンド",
    "民泊代行の中身を、お金の流れから見直す",
    "/switch", "2026-05-21 09:00", "Draft", "", "", "",
    "Pending", "", "", "民泊代行 コスト / 手数料 / 損益",
    "約 2,200 字",
    "✨ v2: タイトルから「経営学的に分解」を削除・P/L → 損益・横文字最小化",
    DRAFT_N2],
  ["N-3", "C. オーナー成功物語型", "オーナー成功事例",
    "サウナを置いて見せ方を変えたら、平均宿泊単価が 2 倍になった話",
    "/switch/founder", "2026-05-23 09:00", "Draft", "", "", "",
    "Pending", "", "", "民泊 単価改善 / 京都 町家 / サウナ",
    "約 2,300 字",
    "✨ v2: 「再ポジショニング」→「見せ方を変える」・ADR → 平均宿泊単価・リスティング → 物件ページ",
    DRAFT_N3],
];

async function main() {
  const sheets = getSheets(ACCOUNT);

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

  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: "'note Pipeline'!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [PIPELINE_HEADER, ...PIPELINE_ROWS] },
  });

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: {
      requests: [
        { updateDimensionProperties: { range: { sheetId: noteSheetId, dimension: "COLUMNS", startIndex: 0, endIndex: 1 }, properties: { pixelSize: 80 }, fields: "pixelSize" } },
        { updateDimensionProperties: { range: { sheetId: noteSheetId, dimension: "COLUMNS", startIndex: 1, endIndex: 2 }, properties: { pixelSize: 150 }, fields: "pixelSize" } },
        { updateDimensionProperties: { range: { sheetId: noteSheetId, dimension: "COLUMNS", startIndex: 3, endIndex: 4 }, properties: { pixelSize: 320 }, fields: "pixelSize" } },
        { updateDimensionProperties: { range: { sheetId: noteSheetId, dimension: "COLUMNS", startIndex: 16, endIndex: 17 }, properties: { pixelSize: 700 }, fields: "pixelSize" } },
        { updateDimensionProperties: { range: { sheetId: noteSheetId, dimension: "ROWS", startIndex: 1, endIndex: 4 }, properties: { pixelSize: 500 }, fields: "pixelSize" } },
        {
          repeatCell: {
            range: { sheetId: noteSheetId, startRowIndex: 1, endRowIndex: 200, startColumnIndex: 16, endColumnIndex: 17 },
            cell: { userEnteredFormat: { wrapStrategy: "WRAP", verticalAlignment: "TOP", textFormat: { fontSize: 9 } } },
            fields: "userEnteredFormat(wrapStrategy,verticalAlignment,textFormat)",
          },
        },
        {
          repeatCell: {
            range: { sheetId: noteSheetId, startRowIndex: 0, endRowIndex: 1 },
            cell: { userEnteredFormat: { textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } }, backgroundColor: { red: 0.55, green: 0.45, blue: 0.7 }, horizontalAlignment: "CENTER" } },
            fields: "userEnteredFormat(textFormat,backgroundColor,horizontalAlignment)",
          },
        },
        {
          updateSheetProperties: {
            properties: { sheetId: noteSheetId, gridProperties: { frozenRowCount: 1, frozenColumnCount: 1 } },
            fields: "gridProperties.frozenRowCount,gridProperties.frozenColumnCount",
          },
        },
      ],
    },
  });

  console.log(`\n✅ note Pipeline v2 反映: ${PIPELINE_ROWS.length} 行 (地方のおじさん向け表現に書き直し)`);
  console.log(`📊 https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit#gid=${noteSheetId}`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  console.error(err);
  process.exit(1);
});
