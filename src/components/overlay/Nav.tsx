"use client";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#work", label: "Dự án" },
  { href: "#workflow", label: "Quy trình" },
  { href: "#edge", label: "Năng lực" },
  { href: "#path", label: "Hành trình" },
  { href: "#contact", label: "Liên hệ" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed left-0 top-0 z-[80] w-full transition-colors duration-300 " +
        (solid ? "bg-[rgba(12,12,13,0.7)] backdrop-blur-md" : "bg-transparent")
      }
    >
      <nav className="flex items-center justify-between px-5 py-5 md:px-10">
        <a href="#top" className="font-display text-lg tracking-tight">
          LMN<span className="text-[#c6f24e]">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="font-sans text-sm text-muted transition-colors hover:text-paper">
              {l.label}
            </a>
          ))}
          <a
            href="/cv/Le-Minh-Nghia-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[rgba(198,242,78,0.6)] px-4 py-2 font-sans text-sm text-[#c6f24e] transition-colors hover:bg-[#c6f24e] hover:text-[#0a1200]"
          >
            Tải CV
          </a>
        </div>

        <button onClick={() => setOpen((o) => !o)} className="font-sans text-sm text-paper md:hidden" aria-label="Mở menu">
          {open ? "Đóng" : "Menu"}
        </button>
      </nav>

      {open ? (
        <div className="flex flex-col gap-1 bg-[rgba(12,12,13,0.92)] px-5 pb-5 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-[rgba(244,241,232,0.06)] py-2 font-display text-2xl"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/cv/Le-Minh-Nghia-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 rounded-full bg-[#c6f24e] px-4 py-3 text-center font-display text-[#0a1200]"
          >
            Tải CV
          </a>
        </div>
      ) : null}
    </header>
  );
}
