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
    // header の primary CTA は /switch と同じ文言で統一（2026-05-09 テンイチ指示）
    return {
      primary: "無料で診断レポートをもらう",
      sticky: "無料相談はこちら",
    };
  }

  if (pathname?.startsWith("/switch/founder")) {
    return {
      primary: "無料面談はこちら",
      sticky: "無料面談はこちら",
    };
  }

  return {
    primary: "無料で診断レポートをもらう",
    sticky: "無料で診断",
  };
}
