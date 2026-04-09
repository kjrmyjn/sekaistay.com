import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '民泊運営セルフ診断｜あなたの物件、運営効率をチェック',
  description:
    '5分で完了する民泊運営の無料セルフ診断。OTA活用度・清掃体制・価格設定・ゲスト対応を6カテゴリで採点し、改善ポイントをレポートでお届けします。',
  alternates: {
    canonical: 'https://sekaistay.com/audit',
  },
  openGraph: {
    title: '民泊運営セルフ診断｜SEKAI STAY',
    description: '無料で民泊運営の課題を可視化。5分で改善ポイントがわかる。',
    url: 'https://sekaistay.com/audit',
  },
}

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
