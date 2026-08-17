import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT, EASE_IN_OUT } from '@/lib/motion';
import { site } from '@/content/site';

/**
 * The 1.5s entrance.
 *
 * A smile arc draws itself, the name wipes up from behind a mask, a hairline
 * opens outward from centre, and the whole panel lifts away to uncover the
 * hero. No spinner, no percentage — nothing that says "waiting".
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const prefersReduced = useReducedMotion();

  // Scroll is locked for the duration so the reveal is never interrupted.
  useEffect(() => {
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = 'hidden';
    const t = window.setTimeout(onDone, prefersReduced ? 200 : 1500);
    return () => {
      window.clearTimeout(t);
      body.style.overflow = previous;
    };
  }, [onDone, prefersReduced]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
      // The starting clip-path is declared on `initial`, not on `style` — a
      // static style value would be re-applied on every render and fight the
      // exit animation that is trying to move the same property.
      initial={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
      exit={
        prefersReduced
          ? { opacity: 0, transition: { duration: 0.2 } }
          : { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.9, ease: EASE_IN_OUT } }
      }
    >
      <motion.div
        className="flex flex-col items-center gap-7"
        exit={prefersReduced ? undefined : { opacity: 0, y: -24, transition: { duration: 0.5, ease: EASE_OUT } }}
      >
        {/* Smile arc, drawn rather than faded in. */}
        <svg
          width="112"
          height="44"
          viewBox="0 0 120 48"
          fill="none"
          aria-hidden
          className="overflow-visible"
        >
          <motion.path
            d="M6 8C6 8 24 40 60 40C96 40 114 8 114 8"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { pathLength: { duration: 1.05, ease: EASE_OUT }, opacity: { duration: 0.25 } }
            }
          />
        </svg>

        <div className="flex flex-col items-center gap-3">
          <span className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
            <motion.span
              className="block font-display text-2xl font-medium tracking-tight sm:text-[1.75rem]"
              initial={prefersReduced ? { y: 0 } : { y: '115%' }}
              animate={{ y: '0%' }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.85, ease: EASE_OUT, delay: 0.32 }}
            >
              {site.doctor.name}
            </motion.span>
          </span>

          <motion.div
            className="h-px w-24 origin-center bg-[var(--border-hi)]"
            initial={prefersReduced ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.7, ease: EASE_OUT, delay: 0.5 }}
          />

          <motion.span
            className="eyebrow"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: EASE_OUT, delay: 0.66 }}
          >
            {site.doctor.clinic}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}
