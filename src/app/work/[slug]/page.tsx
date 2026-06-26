import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { projects, projectBySlug } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = projectBySlug(params.slug);
  if (!p) return { title: "Dự án — Lê Minh Nghĩa" };
  return {
    title: `${p.title} — ${p.category} · Lê Minh Nghĩa`,
    description: p.summary,
  };
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const p = projectBySlug(params.slug);
  if (!p) notFound();

  const accentText: CSSProperties = { color: p.accent };
  const accentBg: CSSProperties = { background: p.accent };

  return (
    <main className="min-h-screen bg-ink text-paper">
      <div className="mx-auto max-w-[920px] px-6 py-16 md:py-24">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-paper transition-colors"
        >
          ← Quay lại danh sách dự án
        </Link>

        <header className="mt-10">
          <p
            className="font-sans text-xs uppercase tracking-widest2"
            style={accentText}
          >
            {p.category} · {p.channel}
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mt-4">
            {p.title}
          </h1>
          <p className="font-sans text-lg mt-4" style={accentText}>
            {p.handle}
          </p>
        </header>

        <div className="mt-12 grid gap-8 md:grid-cols-[300px_1fr] items-start">
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={p.poster}
              alt={`Poster ${p.title}`}
              fill
              sizes="300px"
              className="object-cover"
              priority
            />
          </div>

          <div className="reading-zone">
            <h2 className="font-display text-2xl mb-4">Mục tiêu</h2>
            <p className="text-muted leading-relaxed mb-8">{p.objective}</p>

            <h2 className="font-display text-2xl mb-4">Tổng quan</h2>
            {p.about.map((para, i) => (
              <p key={i} className="text-muted leading-relaxed mb-4">
                {para}
              </p>
            ))}

            <h2 className="font-display text-2xl mt-10 mb-4">Điểm nổi bật</h2>
            <ul className="space-y-3">
              {p.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-muted">
                  <span style={accentText}>—</span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="font-display text-2xl mb-3">Vai trò</h2>
                <p className="text-muted">{p.role}</p>
              </div>
              <div>
                <h2 className="font-display text-2xl mb-3">Công cụ</h2>
                <p className="text-muted">{p.tools.join(" · ")}</p>
              </div>
            </div>

            <h2 className="font-display text-2xl mt-10 mb-3">Kết quả</h2>
            <p className="text-paper leading-relaxed">{p.result}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs text-muted border border-white/10 rounded px-3 py-1.5"
                >
                  {t}
                </span>
              ))}
            </div>

            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex mt-10 items-center gap-2 rounded-full px-6 py-3 font-display text-sm text-ink"
                style={accentBg}
              >
                Ghé kênh ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
