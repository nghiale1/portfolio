"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { powers, powersStatement } from "@/data/powers";
import { projects } from "@/data/projects";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const feature = projects[0]; // một dự án thật, đọc trên ba lớp phân tích

// NĂNG LỰC — ý nghĩa chuyển động: PHÂN LỚP & HỢP NHẤT.
// Một dự án thật được nhìn trên ba lớp (Sáng tạo, Thương mại, Kỹ thuật). Mỗi
// lớp hiện riêng, rồi cả ba hợp nhất thành một sản phẩm nội dung hoàn chỉnh.
export default function Capabilities() {
  const root = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [merged, setMerged] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const apply = (p: number) => {
        const mergeT = clamp((p - 0.66) / 0.34);
        const stepT = clamp(p / 0.66);
        const act = clamp(Math.floor(stepT * 3), 0, 2);
        const offsets = [-150, 0, 150];
        layerRefs.current.forEach((el, i) => {
          if (!el) return;
          const spread = 1 - mergeT;
          el.style.transform = `translateX(${offsets[i] * spread}px) translateY(${(i - 1) * 18 * spread}px)`;
          const shown = mergeT > 0.01 ? 1 : i === act ? 1 : 0.18;
          el.style.opacity = String(shown);
        });
        setMerged(mergeT > 0.5);
        setActive((prev) => (prev === act ? prev : act));
      };
      if (reduced) {
        layerRefs.current.forEach((el) => el && (el.style.opacity = "1"));
        return;
      }
      apply(0);
      ScrollTrigger.create({
        trigger: ".cap-pin",
        start: "top top",
        end: "+=300%",
        scrub: true,
        pin: true,
        onUpdate: (self) => apply(self.progress),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="edge" ref={root} className="section" data-scene="capabilities">
      <div className="cap-pin pin-stage">
        <div className="section-inner w-full">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <div className="relative mx-auto h-[52vh] w-full max-w-[440px]">
              {powers.map((pw, i) => (
                <div
                  key={pw.key}
                  ref={(el) => {
                    layerRefs.current[i] = el;
                  }}
                  className="quiet-panel absolute inset-x-0 top-1/2 mx-auto w-[88%] -translate-y-1/2 p-6"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-sans text-xs uppercase tracking-[0.24em] text-[#c6f24e]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl">{pw.title}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {pw.items.map((it) => (
                      <li key={it} className="font-sans text-sm text-muted">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div>
              <p className="eyebrow mb-5">Vì sao tôi khác biệt</p>
              <p className="max-w-[44ch] text-muted">
                Phần lớn người làm nội dung mạnh ở một mảng. Tôi làm cả ba cùng lúc — nhìn một dự án
                thật, <span className="text-paper">{feature.title}</span>, qua ba lớp: thực thi sáng tạo, tư duy
                thương mại và một hệ thống kỹ thuật bên dưới:
                {" "}
                {merged
                  ? "cả ba hợp nhất thành sản phẩm nội dung hoàn chỉnh."
                  : `đang xem ở lớp ${powers[active].title.toLowerCase()}.`}
              </p>
              <p className="mt-8 max-w-[18ch] font-display text-[clamp(24px,3.4vw,40px)] leading-tight">
                {powersStatement}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
