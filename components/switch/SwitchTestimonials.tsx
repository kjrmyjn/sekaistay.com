"use client";

import { useScrollFade } from "@/hooks/useScrollFade";
import SectionHead from "./deco/SectionHead";

const testimonials = [
  {
    name: "山本 様",
    age: "48歳",
    type: "戸建て2棟 / 神奈川県",
    years: "オーナー歴2年",
    impact: "-102",
    impactUnit: "万円/年",
    impactSub: "",
    impactLabel: "手数料削減額",
    color: "from-switch-accent to-switch-accent-hover",
    text: "前の代行は18%で、正直「民泊ってこんなに引かれるものなのか」と諦めていた。SEKAI STAYは数字が全部アプリで見える。はじめて『自分の事業』として数字を追う感覚を持てました。妻に見せたら「ちゃんと増えてるね」と。",
  },
  {
    name: "鈴木 様",
    age: "42歳",
    type: "マンション2室 / 大阪府",
    years: "オーナー歴1年",
    impact: "1.8",
    impactUnit: "倍",
    impactSub: "",
    impactLabel: "稼働率 32%→58%",
    color: "from-switch-teal to-switch-teal-deep",
    text: "副業で始めたけど、自分で運営する時間がなくて稼働率がボロボロだった。SEKAI STAYに任せてからは予約サイトの掲載が見違えた。写真の順番を変えただけで予約が入り始めたのは衝撃的でした。",
  },
  {
    name: "佐藤 様",
    age: "61歳",
    type: "一棟アパート / 福岡県",
    years: "オーナー歴5年",
    impact: "4.8",
    impactUnit: "",
    impactSub: "★",
    impactLabel: "ゲスト評価 4.2→4.8",
    color: "from-switch-teal-deep to-switch-teal",
    text: "前の代行がひどくて、レビューに「清掃が汚い」と書かれたこともあった。切り替えてからはそういったこともなく、レビューが改善して単価も上げられるようになった。妻にも「任せてよかったね」と言われました。",
  },
];

export default function SwitchTestimonials() {
  const ref = useScrollFade();

  return (
    <section className="py-16 sm:py-20 bg-switch-cloud" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="fade-in mb-12">
          <SectionHead
            enLabel="実際のオーナー様の声"
            jaTitle={<>切り替えた人の、リアルな結果。</>}
          />
        </div>

        <div className="stagger grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="fade-in bg-white rounded-md overflow-hidden shadow-sm hover:shadow transition-shadow"
            >
              {/* Impact */}
              <div
                className={`bg-gradient-to-br ${t.color} p-4 sm:p-6 text-center text-white relative overflow-hidden`}
              >
                <p className="text-[40px] sm:text-6xl font-bold leading-none tabular-nums tracking-tight">
                  {t.impactSub && <span className="text-2xl mr-1">{t.impactSub}</span>}
                  {t.impact}
                  {t.impactUnit && (
                    <span className="text-xl sm:text-2xl ml-0.5">
                      {t.impactUnit}
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-white/90 font-bold tracking-widest mt-3">
                  {t.impactLabel}
                </p>
              </div>

              <div className="p-5">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-5 h-5 text-switch-teal-bright"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-base text-switch-charcoal leading-normal mb-3">
                  「{t.text}」
                </p>

                <div className="pt-3 border-t border-switch-gray-light">
                  <p className="text-sm font-bold text-switch-charcoal">
                    {t.name}{" "}
                    <span className="text-xs text-switch-gray-mid">
                      ({t.age})
                    </span>
                  </p>
                  <p className="text-xs text-switch-gray-mid">
                    {t.type} / {t.years}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
