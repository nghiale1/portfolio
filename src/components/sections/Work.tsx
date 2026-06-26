"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmartScreen from "@/components/ui/SmartScreen";
import { projects } from "@/data/projects";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// DỰ ÁN TIÊU BIỂU — ý nghĩa chuyển động: THAY THẾ TẮNG DỰ ÁN.
// Mỗi lúc chỉ một dự án chiếm màn hình. Cuộn để thay bằng dự án tiếp theo.
export default function Work() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = projects.length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".work-pin",
        start: "top top",
        end: "+=" + n * 100 + "%",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const idx = Math.min(n - 1, Math.floor(self.progress * n));
          setActive((prev) => (prev === idx ? prev : idx));
        },
      });
    }, root);
    return () => ctx.revert();
  }, [n]);

  const p = projects[active];

  return (
    <section id="work" ref={root} className="section" data-scene="work">
      <div className="work-pin pin-stage">
        <div className="section-inner grid w-full items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
          <div key={p.slug} className="work-copy">
            <p className="eyebrow mb-5">
              Dự án tiêu biểu · {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </p>
            <h2 className="font-display text-[clamp(40px,6vw,76px)] leading-[0.95]">{p.title}</h2>
            <p className="mt-3 font-sans text-base text-[#c6f24e]">
              {p.category} · {p.handle}
            </p>

            <dl className="mt-7 grid max-w-[46ch] gap-x-8 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="font-sans text-xs uppercase tracking-[0.24em] text-faint">Mục tiêu</dt>
                <dd className="mt-1 text-muted">{p.objective}</dd>
              </div>
              <div>
                <dt className="font-sans text-xs uppercase tracking-[0.24em] text-faint">Vai trò</dt>
                <dd className="mt-1 text-muted">{p.role}</dd>
              </div>
              <div>
                <dt className="font-sans text-xs uppercase tracking-[0.24em] text-faint">Công cụ</dt>
                <dd className="mt-1 text-muted">{p.tools.join(" · ")}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-sans text-xs uppercase tracking-[0.24em] text-faint">Kết quả</dt>
                <dd className="mt-1 text-paper">{p.result}</dd>
              </div>
            </dl>

            <div className="mt-8 flex items-center gap-5">
              <Link href={`/work/${p.slug}`} className="btn btn-solid">
                Xem chi tiết dự án →
              </Link>
              <div className="flex items-center gap-2" aria-hidden>
                {projects.map((q, i) => (
                  <span
                    key={q.slug}
                    className={
                      "h-1.5 rounded-full transition-all duration-300 " +
                      (i === active ? "w-7 bg-[#c6f24e]" : "w-2.5 bg-[rgba(244,241,232,0.25)]")
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[320px]">
            {projects.map((q, i) => (
              <div
                key={q.slug}
                className={
                  "transition-opacity duration-500 " +
                  (i === active ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0")
                }
              >
                <SmartScreen poster={q.poster} preview={q.preview} label={q.channel} />
              </div>
            ))}
            <p className="mt-4 text-center text-xs text-faint">Cuộn để xem lần lượt từng dự án</p>
          </div>
        </div>
      </div>
    </section>
  );
}
