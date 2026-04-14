/**
 * SEKAI STAY — Homepage Copy
 * 全セクションの文言を一元管理。CTAリンク先はこのファイルで差し替え。
 */

// ═══ CTA リンク一元管理 ═══
export const CTA_LINKS = {
  contact: '/contact',       // 無料相談
  diagnostic: '/diagnostic', // 無料診断
  simulate: '/simulate',     // 収益シミュレーション
  caseStudies: '/case-studies',
  services: '/services',
  pricing: '/pricing',
  faq: '/faq',
} as const

// ═══ 1. Hero ═══
export const HERO = {
  headline: {
    line1: '民泊運営は、もう丸投げでいい。',
    line2: 'オーナーは、伸びるかどうかだけ見ればいい。',
  },
  body: '既存物件の運用改善から、これから始める民泊の立ち上げまで。SEKAI STAYは、価格設計・OTA最適化・多言語対応・清掃・ゲスト対応まで一気通貫で支援します。まずは無料で、あなたの物件の伸びしろを確認してください。',
  stats: [
    { value: '4.8', label: 'レビュー平均' },
    { value: '全国', label: '対応エリア' },
    { value: '5年+', label: '運用知見' },
    { value: '高級物件', label: '運用実績多数' },
  ],
  primaryCta: { label: '無料で収益シミュレーションする', href: '/simulate' },
  secondaryCta: { label: '無料相談を予約する', href: '/contact' },
  textLink: { label: '今の運用を無料診断する', href: '/diagnostic' },
  sideCard: {
    title: 'まずは3分で、物件の可能性をチェック',
    body: 'エリア・物件タイプ・部屋数などの情報から、想定売上や改善余地の目安を無料で確認できます。',
    cta: { label: '収益シミュレーションを始める', href: '/simulate' },
  },
} as const

// ═══ 2. Entry Points — 3つの入口導線 ═══
export const ENTRY = {
  headline: 'あなたに合った入口から、すぐに始められます。',
  body: '今の運用を見直したい方も、これから始めたい方も。SEKAI STAYは、状況に合わせて最適な形でご相談いただけます。',
  cards: [
    {
      id: 'existing',
      label: 'FOR EXISTING OWNERS',
      title: 'すでに民泊を運用している方へ',
      body: '今の運用に改善余地があるか、手数料や稼働率、レビュー改善の可能性を無料で診断します。',
      cta: { label: '無料診断する', href: '/diagnostic' },
    },
    {
      id: 'starting',
      label: 'FOR NEW OWNERS',
      title: 'これから民泊を始めたい方へ',
      body: '物件選定、許認可、立ち上げ準備、初回予約獲得まで。始め方から一緒に整理します。',
      cta: { label: '立ち上げ相談をする', href: '/contact' },
    },
    {
      id: 'exploring',
      label: 'FOR EXPLORERS',
      title: 'まずは収益感を知りたい方へ',
      body: 'エリアや物件条件をもとに、想定売上や改善余地を簡易シミュレーションできます。',
      cta: { label: '収益を試算する', href: '/simulate' },
    },
  ],
} as const

// ═══ 3. Simulation ═══
export const SIMULATION = {
  headline: {
    line1: 'あなたの物件、どれくらい伸びるか。',
    line2: '3分で試算できます。',
  },
  body: 'エリア・物件タイプ・運用状況などの情報をもとに、想定売上レンジと改善余地の目安を無料でご案内します。今の運用で十分か、もっと伸ばせるかを、まずは数字で確認してください。',
  formTitle: '入力はかんたんです',
  formFields: [
    'エリア',
    '物件タイプ',
    '部屋数',
    '現在運用中 / これから立ち上げ',
    '現在の月商（任意）',
    'メールアドレス',
  ],
  resultTitle: '診断後にわかること',
  resultItems: [
    '想定月商レンジ',
    '改善余地の大きさ',
    '優先して見直すべきポイント',
    '次に打つべき施策の方向性',
  ],
  cta: { label: '無料で試算結果を受け取る', href: '/simulate' },
} as const

// ═══ 4. Value Proposition ═══
export const VALUE = {
  headline: 'SEKAI STAYが、ただの運用代行で終わらない理由',
  body: '民泊は、ただ管理するだけでは伸びません。地域ごとの需要を読み、物件の魅力を正しく伝え、予約につながる形に整えることで成果が変わります。SEKAI STAYは、運営だけでなく“伸ばすための設計”まで支援します。',
  items: [
    {
      number: '01',
      title: '地域ごとの勝ち方を知っている',
      body: '過去5年間の運用知見をもとに、季節性、観光資源、ゲスト傾向、競合状況まで踏まえて運用設計します。',
    },
    {
      number: '02',
      title: '宿を“見つかる状態”まで作る',
      body: 'タイトル、写真、見せ方、価格調整、レビュー導線まで最適化し、上位表示と予約率改善を狙います。',
    },
    {
      number: '03',
      title: 'インバウンドに強い事業基盤がある',
      body: '海外向け事業、飲食事業、広告・SNS運用、クリエイティブ体制。単なる代行ではなく、海外需要を取りにいく視点で物件を伸ばします。',
    },
  ],
} as const

// ═══ 4.5 Ecosystem — 飲食事業 × メディア基盤 ═══
export const ECOSYSTEM = {
  eyebrow: 'Business Assets',
  headline: {
    line1: '運営知見の裏にある、',
    line2: '自社の事業基盤。',
  },
  body: '旅行者の動き、見せ方、予約につながる伝え方。SEKAI STAYはこれらを机上ではなく、自社の事業と現場で積み重ねてきました。',

  // ── Block 1: 飲食事業 ──
  hospitality: {
    label: 'Hospitality × Inbound',
    title: '旅行者の消費と反応を、現場で理解している。',
    body: '長野・野尻湖、京都などで飲食事業を自社運営。インバウンド旅行者の動き、好み、価格感覚、滞在体験への反応を、日々の現場でつかんでいます。',
    supporting: '宿の運用設計を“机上の分析”ではなく、“現場の実感”に基づいて行える。それが、SEKAI STAYの運営の地力を支えています。',
    spots: [
      { name: 'The World Cafe', area: '長野・野尻湖' },
      { name: 'Kyoto F&B', area: '京都' },
      { name: 'その他の拠点', area: '全国' },
    ],
  },

  // ── Block 2: メディア・クリエイティブ基盤 ──
  media: {
    label: 'Media & Creative',
    title: '宿は“管理業”ではなく、“集客業”でもある。',
    body: '見つけられ、選ばれ、来てもらう。SEKAI STAYは宿の運営だけでなく、宿が“行きたい理由のある場所”になるまでを設計できる体制を持っています。',
    pillars: [
      {
        title: '広告事業部',
        body: 'OTA内SEO、タイトル・写真・見せ方・価格・SNS二次活用までを、運用設計に直接つなぎます。宿が“見つけられる状態”まで作り込むのが役割です。',
      },
      {
        title: 'インフルエンサー事業部',
        body: '宿単体ではなく、地域全体で話題を作る発想。オープン時の認知形成、特定物件の世界観設計、タイアップ・撮影利用まで、企画からの仕掛けが可能です。',
      },
      {
        title: '自社YouTubeメディア',
        body: '旅行・ライフスタイル領域の自社発信基盤を運営（登録者20万人超）。宿泊・体験の魅力をどう伝えると人が動くかを、日々メディア運営で実践しています。',
      },
      {
        title: 'ASHIMOTO制作との連動',
        body: '企業YouTube運用、住宅・家具・不動産領域の大型メディア制作経験を持つクリエイティブ体制。映像・写真・世界観づくりの実装力で、宿の見せ方を支えます。',
      },
    ],
  },
} as const

// ═══ 5. Results ═══
export const RESULTS = {
  headline: '数字で見る、改善実績',
  body: '全国でさまざまな物件の運用改善を支援してきました。高級物件から地域特化型の物件まで、それぞれの魅力を活かした改善を行っています。',
  cases: [
    {
      title: '野尻湖エリアの貸別荘',
      metrics: [
        { label: '稼働率', from: '58%', to: '82%' },
        { label: '月間売上', from: '85万円', to: '134万円' },
      ],
      body: '写真と訴求、価格設計、見せ方を再設計し、稼働率と売上の両方を改善しました。',
    },
    {
      title: '京都エリアの宿泊物件',
      metrics: [
        { label: '成果', from: '', to: 'レビュー改善 × 単価設計見直し' },
      ],
      body: '多言語対応やゲスト導線、体験価値の伝え方を調整し、予約率と満足度の改善につなげました。',
    },
    {
      title: '立ち上げ初期の新規物件',
      metrics: [
        { label: 'サポート', from: '', to: 'オープン準備〜運用開始まで一気通貫' },
      ],
      body: '物件の見せ方、OTA初期設計、運用導線の整備まで。スタート時点から取りこぼしの少ない体制を整えます。',
    },
  ],
  cta: { label: '実績をもっと見る', href: '/case-studies' },
} as const

// ═══ 6. Dashboard ═══
export const DASHBOARD = {
  headline: {
    line1: '任せるだけで終わらない。',
    line2: 'オーナーが毎日見たくなるダッシュボード。',
  },
  body: '売上、稼働率、予約状況、レビュー、改善ポイントまで。物件の状態を一画面でわかりやすく確認できます。ただの報告画面ではなく、物件が育っていく実感を持てる設計です。',
  items: [
    '今月の売上',
    '稼働率',
    '予約ペース',
    '前月比',
    'レビュー推移',
    '今後の改善アクション',
  ],
  cta: { label: 'ダッシュボードについて見る', href: '/services' },
} as const

// ═══ 7. Flow ═══
export const FLOW = {
  headline: 'ご相談から運用開始まで、スムーズに。',
  body: '既存物件の乗り換えも、これから始める立ち上げも。状況を整理しながら、最適な形でご提案します。',
  steps: [
    { num: '01', title: '無料相談・無料診断', body: 'まずは現状やご希望をお聞きします。' },
    { num: '02', title: '現状確認・物件ヒアリング', body: '現在の運用状況、または立ち上げ予定物件の条件を確認します。' },
    { num: '03', title: '収益シミュレーション・ご提案', body: '想定売上や改善余地、運用方針をご提案します。' },
    { num: '04', title: '契約・準備開始', body: '必要な設定や準備を進めます。' },
    { num: '05', title: '運用スタート', body: '掲載、運営、清掃、ゲスト対応まで一貫して支援します。' },
  ],
  cta: { label: '無料相談を予約する', href: '/contact' },
} as const

// ═══ 8. Pricing ═══
export const PRICING = {
  headline: 'わかりやすく、始めやすい料金設計',
  body: 'SEKAI STAYは、導入しやすい料金設計を目指しています。詳細は物件やエリアによって異なるため、まずは無料相談で最適なプランをご案内します。',
  note: '手数料だけでなく、どこまで任せられるか、最終的にどれだけ手元に残るかまで含めてご説明します。',
  cta: { label: '料金について相談する', href: '/contact' },
} as const

// ═══ 9. FAQ ═══
export const FAQ = {
  headline: 'よくあるご質問',
  items: [
    {
      q: '本当に丸投げできますか？',
      a: 'はい。掲載管理、価格調整、ゲスト対応、清掃連携など、運営に必要な業務を一貫して対応します。オーナー様は、必要な確認と意思決定に集中していただけます。',
    },
    {
      q: '今ほかの代行会社を使っていますが、相談できますか？',
      a: 'もちろん可能です。現在の運用状況を確認したうえで、改善余地や乗り換えメリットがあるかをご案内します。',
    },
    {
      q: 'これから民泊を始める段階でも相談できますか？',
      a: 'はい。物件選定、許認可、立ち上げ準備、掲載設計まで、0→1の段階からご相談いただけます。',
    },
    {
      q: '対応エリアはどこですか？',
      a: '全国でご相談を受け付けています。エリア特性に応じて、対応可否も含めて個別にご案内します。',
    },
    {
      q: '相談だけでも大丈夫ですか？',
      a: 'はい、大丈夫です。まずは現状確認や方向性整理のためのご相談としてご利用いただけます。',
    },
    {
      q: '収益シミュレーションは無料ですか？',
      a: 'はい。簡易シミュレーションや初回相談は無料でご案内しています。',
    },
  ],
} as const

// ═══ 10. Final CTA ═══
export const FINAL_CTA = {
  headline: 'まずは、あなたの物件の伸びしろを見てみませんか？',
  body: '今の運用を見直したい方も、これから民泊を始めたい方も。SEKAI STAYが、現状整理から収益化の方向性まで一緒に考えます。',
  primaryCta: { label: '無料で収益シミュレーションする', href: '/simulate' },
  secondaryCta: { label: '無料相談を予約する', href: '/contact' },
  textLink: { label: '今の運用を無料診断する', href: '/diagnostic' },
} as const

// ═══ 11. Footer Catch ═══
export const FOOTER_CATCH = {
  body: '運用は、丸投げでいい。でも、物件が伸びていく実感は、オーナーにも届くように。SEKAI STAYは、管理だけで終わらない民泊運営を目指しています。',
} as const
