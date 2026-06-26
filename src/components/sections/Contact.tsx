"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// LIÊN HỆ — ý nghĩa chuyển động: KẾT LẠI.
// Video cuối thu nhỏ thành một khung sạch, rồi hiện thành monogram LMN. Sau đó
// câu kết và thông tin liên hệ thật xuất hiện. Bình tĩnh, tự tin.
const tiktoks = projects.filter((p) => p.link);

export default function Contact() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([".contact-frame", ".contact-mark", ".contact-reveal"], { opacity: 1, scale: 1 });
        return;
      }
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".contact-pin", start: "top 75%", end: "bottom bottom", scrub: true },
      });
      tl.fromTo(
        ".contact-frame",
        { scale: 1, opacity: 1 },
        { scale: 0.34, opacity: 0, ease: "power2.inOut", duration: 1.2 },
      )
        .fromTo(
          ".contact-mark",
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, ease: "power2.out", duration: 0.8 },
          "-=0.5",
        )
        .from(".contact-reveal", { opacity: 0, y: 22, stagger: 0.15, duration: 0.8 }, "-=0.2");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={root} className="section" data-scene="contact">
      <div className="contact-pin section-inner flex min-h-screen flex-col items-center justify-center text-center">
        <div className="relative mb-10 h-[34vh] w-[19vh] max-h-[300px] max-w-[170px]">
          <div className="contact-frame absolute inset-0 overflow-hidden rounded-2xl border border-[rgba(198,242,78,0.4)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/posters/workflow.jpg" alt="khung cuối" className="absolute inset-0 h-full w-full object-cover" />
            <video src="/previews/workflow.mp4" muted loop playsInline autoPlay className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="contact-mark absolute inset-0 grid place-items-center">
            <span className="font-display text-[clamp(36px,6vw,64px)] tracking-tight">
              LMN<span className="text-[#c6f24e]">.</span>
            </span>
          </div>
        </div>

        <h2 className="contact-reveal max-w-[22ch] font-display text-[clamp(30px,5vw,60px)] leading-[1.02]">
          Cùng tạo ra nội dung chạy nhanh — và chạm tới con người.
        </h2>

        <div className="contact-reveal mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="mailto:minhnghia2311@gmail.com" className="btn btn-solid">
            minhnghia2311@gmail.com
          </a>
          <a href="/cv/Le-Minh-Nghia-CV.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Tải CV
          </a>
        </div>

        <div className="contact-reveal mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
          {tiktoks.map((p) => (
            <a key={p.slug} href={p.link} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-paper">
              {p.handle}
            </a>
          ))}
        </div>

        <p className="contact-reveal mt-10 text-xs text-faint">Quận 3, TP. Hồ Chí Minh · +84 329 672 505</p>
      </div>
    </section>
  );
}
