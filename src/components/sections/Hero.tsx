"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SmartScreen from "@/components/ui/SmartScreen";
import { projects } from "@/data/projects";

// HERO — ý nghĩa chuyển động: TỔ CHỨC.
// Ba màn hình kênh 9:16 thật bắt đầu rời nhau, rồi lần lượt xếp vào một hàng —
// một hệ thống sản xuất. Chuyển động chạy một lần khi tải rồi dừng lại.
const channels = projects.filter((p) => p.slug !== "workflow");

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".hero-screen", { clearProps: "all", opacity: 1 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-screen",
        {
          opacity: 0,
          yPercent: (i: number) => -8 + i * 10,
          xPercent: (i: number) => (i - 1) * 16,
          rotation: (i: number) => (i - 1) * 6,
          scale: 0.9,
        },
        {
          opacity: 1,
          yPercent: 0,
          xPercent: 0,
          rotation: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.22,
        },
      )
        .from(
          ".hero-rail-line",
          { scaleX: 0, transformOrigin: "left center", duration: 0.7 },
          "-=0.4",
        )
        .from(
          ".hero-chip",
          { opacity: 0, y: 10, stagger: 0.12, duration: 0.5 },
          "-=0.4",
        )
        .from(
          ".hero-line > span",
          { yPercent: 115, duration: 0.9, stagger: 0.08 },
          0.25,
        )
        .from(".hero-sub", { opacity: 0, y: 16, duration: 0.7 }, "-=0.3")
        .from(".hero-statement", { opacity: 0, y: 16, duration: 0.7 }, "-=0.4");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="section" data-scene="hero">
      <div className="section-inner min-h-screen grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="eyebrow mb-7">Sản xuất nội dung bằng AI</p>
          <h1 className="font-display leading-[0.92] text-[clamp(40px,7vw,84px)]">
            <span className="hero-line block overflow-hidden">
              <span className="block">LÊ MINH</span>
            </span>
            <span className="hero-line block overflow-hidden">
              <span className="block">NGHĨA</span>
            </span>
          </h1>
          <div className="hero-sub mt-6 max-w-[38ch]">
            <p className="font-display text-[clamp(18px,2.4vw,26px)] text-paper">
              Nhà sản xuất nội dung AI
            </p>
            <p className="font-sans text-base text-muted">
              Tư duy kỹ sư, vận hành nội dung như một dây chuyền.
            </p>
          </div>
          <p className="hero-statement mt-9 max-w-[32ch] border-l-2 border-[#c6f24e] pl-4 font-display text-[clamp(17px,2vw,22px)] leading-snug">
            Tôi không làm từng video lẻ — tôi xây hệ thống sản xuất ra chúng. Ba kênh, một quy trình.
          </p>
        </div>

        <div className="relative">
          <div className="hero-rail relative grid grid-cols-3 gap-4 md:gap-5">
            <div className="hero-rail-line pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[rgba(198,242,78,0.35)]" />
            {channels.map((p) => (
              <div key={p.slug} className="hero-col relative">
                <div className="hero-screen">
                  <SmartScreen poster={p.poster} preview={p.preview} />
                </div>
                <div className="hero-chip mt-3 text-center">
                  <span className="block font-sans text-sm text-paper">{p.channel}</span>
                  <span className="block font-sans text-xs text-faint">{p.handle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
