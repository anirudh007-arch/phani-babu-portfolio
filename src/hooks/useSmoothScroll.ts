import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';

/**
 * Installs Lenis as the page's scroll engine and exposes it on `window` so
 * anchor links and the "back to top" control can drive it.
 *
 * Skipped entirely under `prefers-reduced-motion` — smoothed scrolling is
 * exactly the kind of vestibular trigger that setting exists for.
 */
export function useSmoothScroll(enabled = true) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      // Matches --ease-out-luxe closely enough that scroll and reveal feel related.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch is better than anything we can synthesise.
      syncTouch: false,
      touchMultiplier: 1.6,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, [enabled, prefersReduced]);

  return lenisRef;
}

/** Scrolls to a selector, respecting Lenis when it is running. */
export function scrollToSection(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;

  if (window.__lenis) {
    window.__lenis.scrollTo(el as HTMLElement, { offset: -12, duration: 1.3 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Move keyboard focus with the viewport, otherwise tabbing after an anchor
  // click resumes from the nav instead of the section just jumped to.
  const target = el as HTMLElement;
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}
