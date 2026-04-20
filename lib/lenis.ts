"use client";

import Lenis from "lenis";
import { ensureGsap } from "@/lib/gsap";

export function createLenis() {
  const { ScrollTrigger } = ensureGsap();

  const lenis = new Lenis({
    autoRaf: false,
    lerp: 0.18,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 0.82,
    touchMultiplier: 1,
    overscroll: false,
  });

  lenis.on("scroll", () => ScrollTrigger.update());

  return lenis;
}
