import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Counts from 0 to `target` once the element enters the viewport.
 *
 * Uses rAF with an eased curve rather than a fixed interval so the count
 * decelerates into its final value instead of stopping abruptly. Under
 * reduced motion the final value is rendered immediately.
 */
export function useCountUp(target: number, duration = 1800) {
  const ref = useRef<HTMLSpanElement>(null);
  // Large top margin for the same reason as `inView` in lib/motion.ts — a
  // section skipped over in one jump never reports as intersecting, and these
  // counters would sit at zero permanently.
  const inView = useInView(ref, { once: true, margin: '100000px 0px -15% 0px' });
  const prefersReduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();
    // Matches EASE_OUT closely enough that the count feels part of the reveal.
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(ease(t) * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, prefersReduced]);

  return { ref, value, inView };
}
