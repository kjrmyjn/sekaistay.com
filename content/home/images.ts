/**
 * SEKAI STAY — Homepage image assets
 * Unsplash 許諾範囲の写真を一元管理。差し替え時はここだけ更新。
 * Creative Guide 準拠：自然光・明るい・クリーン・ストックフォト感の薄いもの
 */

const UNSPLASH = (id: string, w = 1200, h?: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}${
    h ? `&h=${h}` : ''
  }&fit=crop&q=80&auto=format`

export const IMG = {
  // ─── Hero ─────────────────────────────────
  heroMain: {
    src: UNSPLASH('1522708323590-d24dbb6b0267', 900, 1100),
    alt: 'SEKAI STAYが管理する、自然光の入る清潔な客室',
  },

  // ─── Entry Points ─────────────────────────
  entryExisting: {
    src: UNSPLASH('1560448204-e02f11c3d0e2', 800, 500),
    alt: '運用中の民泊物件のリビング',
  },
  entryStarting: {
    src: UNSPLASH('1600585154340-be6161a56a0c', 800, 500),
    alt: 'これから運営を始める物件の外観',
  },
  entryExploring: {
    src: UNSPLASH('1554118811-1e0d58224f24', 800, 500),
    alt: '収益を試算するイメージ',
  },

  // ─── Value Prop visual ────────────────────
  valueAccent: {
    src: UNSPLASH('1540541338287-41700207dee6', 800, 900),
    alt: '京都の町家風物件と地域性',
  },

  // ─── Ecosystem: F&B spots ─────────────────
  fbNojiri: {
    // 都市型カフェの自然光の入る店内（中目黒の雰囲気）
    src: UNSPLASH('1525610553991-2bede1a236e2', 900, 700),
    alt: 'The World Cafe（東京・中目黒）の店内',
  },
  fbKyoto: {
    // 和食・食のクローズアップ
    src: UNSPLASH('1580959375944-abd7e991f971', 900, 700),
    alt: '京都の飲食事業のフードイメージ',
  },
  fbAmbient: {
    src: UNSPLASH('1554118811-1e0d58224f24', 1200, 600),
    alt: '自社飲食事業の店内',
  },

  // ─── Ecosystem: Media & Creative ──────────
  mediaStudio: {
    src: UNSPLASH('1533094602577-198d3beab8ea', 1200, 600),
    alt: 'クリエイティブ制作の現場',
  },

  // ─── Results cases ────────────────────────
  caseNojiri: {
    src: UNSPLASH('1528114039593-4366cc08227d', 800, 500),
    alt: '野尻湖エリアの貸別荘',
  },
  caseKyoto: {
    src: UNSPLASH('1540518614846-7eded433c457', 800, 500),
    alt: '京都エリアの宿泊物件',
  },
  caseNew: {
    src: UNSPLASH('1582719478250-c89cae4dc85b', 800, 500),
    alt: '立ち上げ初期の新規物件',
  },

  // ─── Final CTA ────────────────────────────
  finalCta: {
    src: UNSPLASH('1566073771259-6a8506099945', 1600, 900),
    alt: '次のゲストを迎える準備の整った客室',
  },
} as const
