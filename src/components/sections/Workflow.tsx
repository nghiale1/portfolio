"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stages } from "@/data/workflow";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

// QUY TRÌNH — ý nghĩa chuyển động: TÁCH RỒI & RÁP LẠI.
// Animation mạnh nhất của trang. Một video hoàn chỉnh tách thành mười công đoạn
// sản xuất thật — mỗi lớp một nhãn, mỗi lúc nhấn mạnh một lớp, nền yên tĩnh —
// rồi các lớp ráp lại thành video cuối cùng.
export default function Workflow() {
  const root = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finalRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [exploded, setExploded] = useState(false);
  const n = stages.length;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const apply = (p: number) => {
        const explode = clamp(p / 0.16);
        const reassemble = clamp((p - 0.84) / 0.16);
        const spread = explode * (1 - reassemble);
        const stageF = clamp((p - 0.16) / 0.68);
        const act = clamp(Math.round(stageF * (n - 1)), 0, n - 1);

        layerRefs.current.forEach((el, i) => {
          if (!el) return;
          const mid = (n - 1) / 2;
          const z = -i * 128 * spread;
          const y = (i - mid) * 40 * spread;
          const x = (i - mid) * 24 * spread;
          el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(${spread * 9}deg)`;
          const dist = Math.abs(i - act);
          const emph = spread < 0.06 ? 1 : i === act ? 1 : Math.max(0.16, 0.46 - dist * 0.1);
          el.style.opacity = String(emph);
          el.style.borderColor =
            spread > 0.06 && i === act ? "rgba(198,242,78,0.9)" : "rgba(244,241,232,0.16)";
        });
        if (finalRef.current) finalRef.current.style.opacity = String(1 - spread);
        setExploded(spread > 0.12);
        setActive((prev) => (prev === act ? prev : act));
      };

      if (reduced) {
        apply(0);
        return;
      }
      apply(0);
      ScrollTrigger.create({
        trigger: ".wf-pin",
        start: "top top",
        end: "+=320%",
        scrub: true,
        pin: true,
        onUpdate: (self) => apply(self.progress),
      });
    }, root);
    return () => ctx.revert();
  }, [n]);

  const s = stages[active];

  return (
    <section id="workflow" ref={root} className="section" data-scene="workflow">
      <div className="wf-pin pin-stage">
        <div className="section-inner grid w-full items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow mb-5">Bên trong một video</p>
            <div className="min-h-[180px]">
              <span className="font-display text-[clamp(48px,7vw,84px)] leading-none text-[rgba(198,242,78,0.85)]">
                {s.n}
              </span>
              <h2 className="mt-2 font-display text-[clamp(30px,4.4vw,52px)] leading-[0.98]">{s.title}</h2>
              <p className="mt-4 max-w-[40ch] text-muted">{s.desc}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-1.5" aria-hidden>
              {stages.map((st, i) => (
                <span
                  key={st.n}
                  className={
                    "h-1 rounded-full transition-all duration-300 " +
                    (i === active && exploded ? "w-8 bg-[#c6f24e]" : "w-4 bg-[rgba(244,241,232,0.22)]")
                  }
                />
              ))}
            </div>
            <p className="mt-6 max-w-[38ch] text-xs text-faint">
              Một video hoàn chỉnh, được tách thành mười công đoạn tạo ra nó — rồi ráp lại.
            </p>
          </div>

          <div className="relative mx-auto h-[60vh] w-full max-w-[460px] [perspective:1500px]">
            <div className="absolute inset-0 [transform-style:preserve-3d]">
              {stages.map((st, i) => (
                <div
                  key={st.n}
                  ref={(el) => {
                    layerRefs.current[i] = el;
                  }}
                  className="wf-layer absolute left-1/2 top-1/2 h-[56vh] w-[31.5vh] max-h-[460px] max-w-[259px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-[rgba(20,20,22,0.82)]"
                >
                  <div className="flex h-full flex-col justify-between p-4">
                    <span className="font-sans text-xs tracking-[0.2em] text-faint">{st.n}</span>
                    <span className="font-display text-lg leading-tight text-paper">{st.title}</span>
                  </div>
                </div>
              ))}
              <div
                ref={finalRef}
                className="absolute left-1/2 top-1/2 h-[56vh] w-[31.5vh] max-h-[460px] max-w-[259px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-[rgba(198,242,78,0.4)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/posters/workflow.jpg" alt="video hoàn chỉnh" className="absolute inset-0 h-full w-full object-cover" />
                <video
                  src="/previews/workflow.mp4"
                  poster="/posters/workflow.jpg"
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="screen-label">Video hoàn chỉnh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
