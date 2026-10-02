"use client";

/**
 * SmoothScrollProvider
 * Uses Lenis for buttery-smooth inertia scrolling.
 * Synchronises with Framer Motion's useScroll via RAF loop.
 */

import { useEffect, useRef, ReactNode } from "react";

interface Props { children: ReactNode; }

export function SmoothScrollProvider({ children }: Props) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let lenis: any;
    let raf: number;

    async function init() {
      const { default: Lenis } = await import("lenis");
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });
      lenisRef.current = lenis;

      // Sync Lenis with Framer Motion scroll
      function onRaf(time: number) {
        lenis.raf(time * 1000);
        raf = requestAnimationFrame(onRaf);
      }
      raf = requestAnimationFrame(onRaf);
    }

    init();

    return () => {
      cancelAnimationFrame(raf);
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}
