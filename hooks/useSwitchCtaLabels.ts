"use client";

import { usePathname } from "next/navigation";

/**
 * /switch 系LPのバリアント別CTAラベル。
 * 各バリアントの訴求軸に合わせてボタン文言を出し分ける。
 */
export type SwitchCtaLabels = {
  primary: string;
  sticky: string;
};

export function useSwitchCtaLabels(): SwitchCtaLabels {
  const pathname = usePathname();

  if (pathname?.startsWith("/switch/portal")) {
    return {
      primary: "SEKAI STAYのデモを予約する",
      sticky: "無料相談はこちら",
    };
  }

  if (pathname?.startsWith("/switch/founder")) {
    return {
      primary: "専門家に相談する",
      sticky: "45分の無料面談",
    };
  }

  return {
    primary: "無料で診断レポートをもらう",
    sticky: "無料で診断",
  };
}
