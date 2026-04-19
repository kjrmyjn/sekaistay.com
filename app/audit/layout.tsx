import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '無料運営診断｜SEKAI STAY',
  description:
    '3分で完了する民泊運営の無料診断。物件・現状・連絡先を入力いただくだけで、担当者が個別の改善レポートをお届けします。先着10オーナー：移行コスト無料キャンペーン実施中。',
  alternates: {
    canonical: 'https://sekaistay.com/audit',
  },
  openGraph: {
    title: '無料運営診断｜SEKAI STAY',
    description: '3分で完了する民泊運営の無料診断。個別の改善レポートをお届けします。',
    url: 'https://sekaistay.com/audit',
  },
}

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
