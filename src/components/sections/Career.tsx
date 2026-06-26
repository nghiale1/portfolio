"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// HÀNH TRÌNH — ý nghĩa chuyển động: TIẾN TRIỂN.
// Một đường duy nhất được vẽ dần từ trái sang phải khi cuộn; mỗi chặng sáng
// lên lần lượt. Ý: vai trò hiện tại tiến hóa từ nền tảng kỹ thuật — không phải làm lại.
const stages = [
  { label: "Kỹ sư phần mềm", evidence: "Otanics · Care Connect" },
  { label: "Tư duy hệ thống", evidence: "Phân tích nghiệp vụ (BA)" },
  { label: "Tự động hóa", evidence: "Flash Lex · API / dữ liệu" },
  { label: "Sản xuất nội dung AI", evidence: "3 kênh TikTok" },
];

export default function Career() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([".career-progress", ".career-stage"], { opacity: 1, scaleX: 1 });
        return;
      }
      gsap.set(".career-progress", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".career-stage", { opacity: 0.25, y: 14 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".career-pin", start: "top 70%", end: "bottom 60%", scrub: true },
      });
      tl.to(".career-progress", { scaleX: 1, ease: "none", duration: 4 }, 0);
      gsap.utils.toArray<HTMLElement>(".career-stage").forEach((el, i) => {
        tl.to(el, { opacity: 1, y: 0, duration: 0.6 }, i);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="path" ref={root} className="section" data-scene="career">
      <div className="section-inner career-pin">
        <p className="eyebrow mb-3">Nền tảng phía sau</p>
        <h2 className="mb-12 max-w-[22ch] font-display text-[clamp(28px,4vw,48px)] leading-[1.02]">
          Công việc hiện tại của tôi phát triển tự nhiên từ nền tảng kỹ thuật.
        </h2>

        <div className="relative">
          <div className="absolute left-0 right-0 top-3 h-px bg-[rgba(244,241,232,0.14)]" />
          <div className="career-progress absolute left-0 right-0 top-3 h-px bg-[#c6f24e]" />

          <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((st, i) => (
              <li key={st.label} className="career-stage">
                <span className="mb-5 block h-3 w-3 rounded-full bg-[#c6f24e]" />
                <span className="block font-display text-xl leading-tight text-paper">{st.label}</span>
                <span className="mt-1 block font-sans text-sm text-muted">{st.evidence}</span>
                {i < stages.length - 1 ? (
                  <span className="mt-3 block font-sans text-faint" aria-hidden>
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-12 max-w-[52ch] text-muted">
          Không phải làm lại từ đầu — mà là một bước tiến hóa. Những năm làm kỹ thuật chính
          là hệ thống mà cỗ máy nội dung đang vận hành trên đó.
        </p>
      </div>
    </section>
  );
}
