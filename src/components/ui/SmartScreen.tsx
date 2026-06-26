"use client";
import { useEffect, useRef } from "react";

/**
 * A single 9:16 content screen showing REAL project media.
 * - Poster image is always painted first (instant, no blank frame).
 * - The muted preview video plays only while the screen is in the viewport,
 *   so motion on screen is always a real content unit, never decoration.
 */
export default function SmartScreen({
  poster,
  preview,
  label,
  className = "",
  rounded = true,
}: {
  poster: string;
  preview?: string;
  label?: string;
  className?: string;
  rounded?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) v.play().catch(() => undefined);
          else v.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`screen ${className}`} style={rounded ? undefined : { borderRadius: 0 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt={label ? `${label} channel` : "content"} />
      {preview ? (
        <video
          ref={ref}
          src={preview}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : null}
      {label ? <span className="screen-label">{label}</span> : null}
    </div>
  );
}
