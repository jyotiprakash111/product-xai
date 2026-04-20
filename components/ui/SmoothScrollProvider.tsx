"use client";

import { ReactNode, useEffect } from "react";
import { ensureGsap } from "@/lib/gsap";
import { createLenis } from "@/lib/lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const lenis = createLenis();

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const refreshId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshId);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
