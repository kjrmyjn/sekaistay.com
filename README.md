# 民泊運営 無料診断サービス — MVP

## セットアップ

```bash
cd minpaku-audit
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開く

---

## ページ一覧

| URL | 説明 |
|-----|------|
| `/` | ランディングページ |
| `/audit` | 7ステップ診断フォーム |
| `/result` | 診断結果ページ |
| `/admin` | 管理画面（回答一覧） |

---

## ファイル構成

```
minpaku-audit/
├── app/
│   ├── page.tsx          # ランディングページ
│   ├── audit/page.tsx    # 診断フォーム
│   ├── result/page.tsx   # 診断結果
│   ├── admin/page.tsx    # 管理画面
│   ├── layout.tsx
│   └── globals.css
├── data/
│   ├── questions.ts      # 設問データ（ここを編集して設問を変更）
│   └── resultCopy.ts     # 結果ページの文言（スコア帯別）
└── lib/
    ├── scoring.ts        # スコアリングロジック
    └── storage.ts        # データ保存・取得（localStorage）
```

---

## 設問の追加・変更

`data/questions.ts` の `QUESTIONS` 配列に追加するだけ。

```typescript
{
  id: 'new_question',         // ユニークなID
  step: 3,                    // 表示するステップ番号（1〜7）
  category: 'revenue',        // カテゴリ（スコア集計に使用）
  text: '質問文',
  type: 'single',             // 'single' | 'text' | 'email' | 'tel'
  scored: true,               // スコアに含める場合 true
  options: [
    { label: '選択肢A', score: 3 },
    { label: '選択肢B', score: 1 },
  ],
}
```

---

## スコアリング

- スコア済み設問（`scored: true`）のみ集計
- 各選択肢に 0〜3 点を設定
- 総合スコア = (獲得点 / 満点) × 100
- カテゴリ別スコアも同様に算出

### ランク

| スコア | ランク |
|--------|--------|
| 80〜100 | A: 優秀 |
| 60〜79 | B: 良好 |
| 40〜59 | C: 改善余地あり |
| 0〜39 | D: 要見直し |

---

## データ管理

現在は `localStorage` に保存（MVPのため）。

本番導入時は `lib/storage.ts` の関数をAPI呼び出しに差し替えるだけでOK:
- `submitAnswers()` → POST /api/submissions
- `getAllSubmissions()` → GET /api/submissions

---

## カスタマイズポイント

- **文言変更**: `data/resultCopy.ts` のテキストを編集
- **カラー変更**: `tailwind.config.js` の `navy` 色を変更
- **CTA先変更**: `app/result/page.tsx` の `mailto:` を変更
- **設問追加**: `data/questions.ts` に追加（ステップ番号を指定）
