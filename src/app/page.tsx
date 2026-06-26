"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "@/components/overlay/Nav";
import Hero from "@/components/sections/Hero";
import Metrics from "@/components/sections/Metrics";
import Work from "@/components/sections/Work";
import Workflow from "@/components/sections/Workflow";
import Capabilities from "@/components/sections/Capabilities";
import Career from "@/components/sections/Career";
import Contact from "@/components/sections/Contact";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const lenisRef = useRef<Lenis | null>(null);

  // Smooth scroll wired into ScrollTrigger. Disabled under reduced motion.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const id = window.setTimeout(refresh, 400);

    return () => {
      window.clearTimeout(id);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      <div className="stage-bg" aria-hidden />
      <div className="grain" aria-hidden />
      <Nav />
      <main className="scroller">
        <Hero />
        <Metrics />
        <Work />
        <Workflow />
        <Capabilities />
        <Career />
        <Contact />
      </main>
    </>
  );
}
