import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useFinePointer } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

type MagneticProps = {
  children: ReactNode;
  /** Fraction of the cursor's offset the element follows. Keep it small. */
  strength?: number;
  className?: string;
};

/**
 * Pulls an element gently toward the cursor while hovered.
 *
 * The spring is heavily damped on purpose — the element glides and settles
 * without a single overshoot. Inert for coarse pointers (nothing to respond
 * to) and under reduced motion.
 */
export function Magnetic({ children, strength = 0.25, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const finePointer = useFinePointer();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const config = { stiffness: 150, damping: 20, mass: 0.4 };
  const sx = useSpring(x, config);
  const sy = useSpring(y, config);

  const active = finePointer && !prefersReduced;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !active) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (!active) return <div className={cn('inline-flex', className)}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn('inline-flex', className)}
    >
      {children}
    </motion.div>
  );
}
