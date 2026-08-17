'use client';

import React, { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Delay sedikit agar DOM telah ter-mount sempurna
    const timer = setTimeout(() => {
      const scrollContainer = document.querySelector<HTMLElement>('#main-scroll-container');

      if (!scrollContainer) return;

      const lenis = new Lenis({
        wrapper: scrollContainer,
        content: scrollContainer.firstElementChild as HTMLElement || scrollContainer,
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        autoRaf: false,
      });

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
}
