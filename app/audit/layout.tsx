import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '無料物件診断｜SEKAI STAY',
  description:
    '3分で完了する民泊物件の無料診断レポート。現在のリスティング・売上・手数料を入力いただくだけで、稼働率と収益の改善余地をまとめた個別レポートをお届けします。先着10オーナー：移行コスト無料キャンペーン実施中。',
  alternates: {
    canonical: 'https://sekaistay.com/audit',
  },
  openGraph: {
    title: '無料物件診断｜SEKAI STAY',
    description: '3分で完了する民泊物件の無料診断レポート。個別の改善提案をお届けします。',
    url: 'https://sekaistay.com/audit',
  },
}

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
