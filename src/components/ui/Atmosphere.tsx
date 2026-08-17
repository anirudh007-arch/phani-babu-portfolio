import { useReducedMotion } from 'framer-motion';

/**
 * The three fixed layers that sit behind all content and give the page its
 * depth: film grain, two very slow ambient lights, and a vignette.
 *
 * All of it is CSS. No canvas, no WebGL, no per-frame JavaScript — it costs
 * nothing at runtime and composites on the GPU.
 */
export function Atmosphere() {
  const prefersReduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Ambient lights — 40s and 55s cycles, deliberately below conscious notice. */}
      <div
        className="absolute -top-[20vh] -left-[10vw] h-[70vh] w-[70vh] rounded-full opacity-70 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, var(--glow), transparent 68%)',
          animation: prefersReduced ? undefined : 'drift-a 40s var(--ease-in-out-luxe) infinite',
        }}
      />
      <div
        className="absolute -right-[15vw] bottom-[5vh] h-[60vh] w-[60vh] rounded-full opacity-60 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, var(--glow), transparent 70%)',
          animation: prefersReduced ? undefined : 'drift-b 55s var(--ease-in-out-luxe) infinite',
        }}
      />

      {/* Vignette. */}
      <div className="absolute inset-0" style={{ background: 'var(--vignette)' }} />

      {/* Film grain — an inline SVG turbulence tile, so no image request. */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: 'var(--noise-opacity)',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <style>{`
        @keyframes drift-a {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50%      { transform: translate3d(12vw, 8vh, 0) scale(1.12); }
        }
        @keyframes drift-b {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1.08); }
          50%      { transform: translate3d(-10vw, -10vh, 0) scale(1); }
        }
      `}</style>
    </div>
  );
}
