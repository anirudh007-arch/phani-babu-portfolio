import { motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT } from '@/lib/motion';

/**
 * A distinct piece of line art per discipline, drawn on open.
 *
 * These are geometric abstractions rather than clinical diagrams — enough to
 * give each panel its own identity without the site turning into a textbook.
 * Vector, ~1KB each, and they inherit the theme's accent colour.
 */

const PATHS: Record<string, string[]> = {
  // Cosmetic — a fan of graded facets, brightest at the centre.
  cosmetic: [
    'M20 96V52c0-6 4-10 10-10s10 4 10 10v44',
    'M48 96V44c0-7 5-12 12-12s12 5 12 12v52',
    'M80 96V52c0-6 4-10 10-10s10 4 10 10v44',
    'M12 108h96',
  ],
  // Implants — a fixture and abutment on a bone line.
  implants: [
    'M60 20v24',
    'M46 44h28l-4 12H50z',
    'M52 56v34',
    'M52 64h16M52 72h16M52 80h16',
    'M20 96h80',
    'M20 96c14 6 26 6 40 0s26-6 40 0',
  ],
  // Endodontics — canals traced to their apex.
  endodontics: [
    'M36 28c0 34 6 52 12 66',
    'M60 24v72',
    'M84 28c0 34-6 52-12 66',
    'M30 40c20-14 40-14 60 0',
    'M48 94a12 12 0 0 0 24 0',
  ],
  // Smile design — a proportional grid over an arc.
  'smile-design': [
    'M16 46h88',
    'M16 82h88',
    'M38 40v48M60 36v52M82 40v48',
    'M20 60c14 22 26 32 40 32s26-10 40-32',
  ],
  // Laser — a focused beam converging to a point.
  laser: [
    'M60 16v22',
    'M40 30l10 16M80 30l-10 16',
    'M44 52h32l-16 26z',
    'M60 78v18',
    'M34 100h52',
  ],
  // Orthodontics — an archwire threading brackets.
  orthodontics: [
    'M14 58c22-26 70-26 92 0',
    'M28 52h10v14H28zM53 42h14v14H53zM82 52h10v14H82z',
    'M14 92h92',
    'M60 78v14',
  ],
  // Preventive — a shield around a rhythm of recall marks.
  preventive: [
    'M60 18l32 12v28c0 24-14 38-32 46-18-8-32-22-32-46V30z',
    'M46 60l10 11 20-22',
  ],
};

export function ExpertiseGlyph({ id, active }: { id: string; active: boolean }) {
  const prefersReduced = useReducedMotion();
  const paths = PATHS[id] ?? PATHS.preventive;

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden
      className="h-full w-full text-accent"
      preserveAspectRatio="xMidYMid meet"
    >
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
          animate={
            prefersReduced
              ? undefined
              : active
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: { duration: 0.85, ease: EASE_OUT, delay: active ? 0.12 + i * 0.07 : 0 },
            opacity: { duration: 0.3, delay: active ? 0.12 + i * 0.07 : 0 },
          }}
        />
      ))}
    </svg>
  );
}
