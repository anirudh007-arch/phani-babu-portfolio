import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useFinePointer } from '@/hooks/useMediaQuery';
import { lerp } from '@/lib/utils';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, [data-cursor]';

/**
 * Two-part custom cursor: a precise dot that tracks 1:1, and a ring that
 * trails behind it and expands over interactive targets.
 *
 * Written against the DOM directly rather than through React state — this
 * runs every frame, and re-rendering a component 60 times a second to move
 * two divs is exactly the kind of waste that costs a performance score.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!finePointer || prefersReduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add('has-custom-cursor');

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const trail = { ...pointer };
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      targetScale = target?.closest?.(INTERACTIVE) ? 1.9 : 1;
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    // Press feedback: the ring collapses toward the dot, then eases back.
    const onDown = () => (scale = Math.max(0.6, scale - 0.5));

    const render = () => {
      trail.x = lerp(trail.x, pointer.x, 0.16);
      trail.y = lerp(trail.y, pointer.y, 0.16);
      scale = lerp(scale, targetScale, 0.14);

      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      // Fades the ring's fill in as it grows, so hover reads as focus not size.
      ring.style.backgroundColor = `color-mix(in oklab, var(--accent) ${((scale - 1) * 14).toFixed(1)}%, transparent)`;

      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [finePointer, prefersReduced]);

  if (!finePointer || prefersReduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      <div
        ref={ringRef}
        className="absolute top-0 left-0 h-8 w-8 rounded-full border border-[var(--border-hi)] opacity-0 transition-opacity duration-300 will-change-transform"
      />
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300 will-change-transform"
      />
    </div>
  );
}
