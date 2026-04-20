"use client";

import { useEffect, useRef } from "react";
import { useScrollFade } from "@/hooks/useScrollFade";

const EMBED_ORIGIN = "https://japanvillas.kss-cloud.com";
const EMBED_SRC = `${EMBED_ORIGIN}/report-request?embed=1`;

// kss-cloud form: padding-top 24px, padding-bottom 80px (pb-20)
// We crop 56px from the bottom so top/bottom whitespace match (24px each)
const BOTTOM_CROP = 56;

export default function SwitchReportFormEmbed() {
  const ref = useScrollFade();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.origin !== EMBED_ORIGIN) return;
      const data = e.data as { type?: string; height?: number } | null;
      if (!data || data.type !== "japan-villas-height") return;
      if (typeof data.height !== "number") return;
      // iframe takes full native height (no internal scrollbar),
      // wrapper is 56px shorter with overflow:hidden to clip the form's oversized bottom padding
      if (iframeRef.current) {
        iframeRef.current.style.height = `${data.height}px`;
      }
      if (wrapperRef.current) {
        wrapperRef.current.style.height = `${data.height - BOTTOM_CROP}px`;
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <section
      id="contact-form"
      className="relative py-16 sm:py-20 overflow-hidden bg-[linear-gradient(135deg,#0d5a60_0%,#167b81_40%,#1a8f96_55%,#167b81_75%,#0d5a60_100%)]"
      ref={ref}
    >
      <div
        className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-switch-teal-deep/25 blur-[120px] rounded-full pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -left-40 w-[480px] h-[480px] bg-switch-accent/15 blur-[120px] rounded-full pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />

      <div className="relative max-w-2xl mx-auto px-5 sm:px-6">
        <div className="fade-in text-center mb-8">
          <h2 className="inline-flex items-center gap-2 bg-[#fde047] text-switch-charcoal font-bold text-lg sm:text-2xl leading-tight tracking-tight px-5 sm:px-7 py-2 sm:py-2.5 rounded-md mb-4 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-switch-accent shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            無料パーソナライズ診断
          </h2>
          <p className="text-white font-bold text-base sm:text-lg leading-snug mb-2">
            3分で入力、次営業日にあなた専用レポートを送付
          </p>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-xl mx-auto">
            民泊に強い専門の担当者が、診断レポートを作成します。無理な勧誘は致しません。
          </p>
        </div>

        <div className="fade-in bg-white rounded-2xl p-4 sm:p-6 shadow-2xl">
          <div
            ref={wrapperRef}
            style={{
              width: "100%",
              maxWidth: "640px",
              height: `${850 - BOTTOM_CROP}px`,
              margin: "0 auto",
              overflow: "hidden",
            }}
          >
            <iframe
              ref={iframeRef}
              id="sekai-report-form"
              src={EMBED_SRC}
              title="SEKAI STAY 物件診断レポート申請"
              style={{
                width: "100%",
                height: "850px",
                border: "none",
                display: "block",
                background: "transparent",
              }}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
