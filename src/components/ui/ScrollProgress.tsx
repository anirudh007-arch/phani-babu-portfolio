import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * A one-pixel gold rule across the top of the viewport tracking read
 * progress. Driven entirely by a transform on the compositor — it never
 * triggers layout.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-px origin-left bg-gradient-to-r from-transparent via-accent to-accent-hi"
    />
  );
}
