"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// METRICS — ý nghĩa chuyển động: NHÂN BẢN & ĐẦU RA.
// Mỗi con số được bật sáng bởi đúng hành động tạo ra nó:
//   • "3 kênh"           — ba màn hình kênh xếp thẳng hàng.
//   • "30–50 video/ngày" — một video nhân thành nhiều đầu ra.
//   • "1.000+ đơn"       — đầu ra hội tụ ở khâu xuất bản.
//   • "5+ năm kỹ thuật"  — nền tảng bên dưới cả hệ thống.
const channels = projects.filter((p) => p.slug !== "workflow");
const clones = Array.from({ length: 9 });

export default function Metrics() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>(".m-step");
      if (reduced) {
        gsap.set(steps, { opacity: 1, y: 0 });
        gsap.set(".m-clone", { opacity: 1, scale: 1 });
        gsap.set(".m-foundation", { scaleX: 1, opacity: 1 });
        return;
      }

      gsap.set(steps, { opacity: 0.18 });
      gsap.set(".m-clone", { opacity: 0, scale: 0.4, transformOrigin: "center" });
      gsap.set(".m-foundation", { scaleX: 0, opacity: 0, transformOrigin: "left center" });
      gsap.set(".m-channel", { xPercent: (i: number) => (i - 1) * 60, opacity: 0.2 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".metrics-pin",
          start: "top top",
          end: "+=240%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(".m-step-1", { opacity: 1, duration: 0.4 })
        .to(".m-channel", { xPercent: 0, opacity: 1, duration: 0.6 }, "<")
        .to(".m-step-1", { opacity: 0.18, duration: 0.3 })
        .to(".m-step-2", { opacity: 1, duration: 0.4 }, "<")
        .to(
          ".m-clone",
          { opacity: 1, scale: 1, duration: 0.7, stagger: { each: 0.04, from: "start" } },
          "<",
        )
        .to(".m-step-2", { opacity: 0.18, duration: 0.3 })
        .to(".m-step-3", { opacity: 1, duration: 0.4 }, "<")
        .to(".m-clone", { x: 0, y: 0, duration: 0.6 }, "<")
        .to(".m-funnel", { opacity: 1, scaleX: 1, duration: 0.5 }, "<")
        .to(".m-step-3", { opacity: 0.18, duration: 0.3 })
        .to(".m-step-4", { opacity: 1, duration: 0.4 }, "<")
        .to(".m-foundation", { scaleX: 1, opacity: 1, duration: 0.6 }, "<");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="metrics" ref={root} className="section" data-scene="metrics">
      <div className="metrics-pin pin-stage">
        <div className="section-inner grid w-full items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <ol className="space-y-5">
            <li className="m-step m-step-1">
              <span className="block font-display text-[clamp(34px,5vw,60px)] leading-none text-paper">3</span>
              <span className="font-sans text-sm text-muted">kênh TikTok — Ẩm thực · Thời trang · Gia dụng, chạy trên cùng một hệ thống</span>
            </li>
            <li className="m-step m-step-2">
              <span className="block font-display text-[clamp(34px,5vw,60px)] leading-none text-paper">30–50</span>
              <span className="font-sans text-sm text-muted">video mỗi ngày — một ý tưởng được nhân thành nhiều đầu ra</span>
            </li>
            <li className="m-step m-step-3">
              <span className="block font-display text-[clamp(34px,5vw,60px)] leading-none text-paper">1.000+</span>
              <span className="font-sans text-sm text-muted">đơn hàng mỗi tháng — điểm hội tụ ở khâu xuất bản</span>
            </li>
            <li className="m-step m-step-4">
              <span className="block font-display text-[clamp(34px,5vw,60px)] leading-none text-[#c6f24e]">5+</span>
              <span className="font-sans text-sm text-muted">năm làm kỹ sư phần mềm — nền tảng kỹ thuật của cả hệ thống</span>
            </li>
          </ol>

          <div className="relative">
            <div className="flex justify-center gap-3">
              {channels.map((p) => (
                <div key={p.slug} className="m-channel w-1/4 max-w-[120px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.poster} alt={p.channel} className="aspect-[9/16] w-full rounded-lg border border-[var(--line-strong)] object-cover" />
                </div>
              ))}
            </div>

            <div className="mx-auto mt-6 grid max-w-[360px] grid-cols-3 gap-2">
              {clones.map((_, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  src={channels[i % channels.length].poster}
                  alt="đầu ra"
                  className="m-clone aspect-[9/16] w-full rounded-md object-cover"
                />
              ))}
            </div>

            <div className="m-funnel mx-auto mt-5 h-px w-2/3 origin-center bg-[rgba(198,242,78,0.45)] opacity-0" />

            <div className="m-foundation mt-5 h-2 w-full rounded-full bg-[rgba(198,242,78,0.55)]" />
            <p className="mt-2 text-center font-sans text-xs uppercase tracking-[0.28em] text-faint">
              Nền tảng kỹ sư phần mềm
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
