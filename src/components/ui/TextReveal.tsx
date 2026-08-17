import { motion, useReducedMotion } from 'framer-motion';
import type { ElementType } from 'react';
import { EASE_OUT, inView } from '@/lib/motion';
import { cn } from '@/lib/utils';

type TextRevealProps = {
  /** One entry per visual line — each wipes up from behind its own mask. */
  lines: readonly string[];
  as?: ElementType;
  id?: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
};

const lineVariants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.9, ease: EASE_OUT } },
};

/**
 * Masked line-by-line heading reveal.
 *
 * The text is never split into per-character spans: screen readers get whole
 * lines, and there is no layout thrash from hundreds of nodes. Each line sits
 * in an `overflow-hidden` block and translates up from below it.
 *
 * The viewport trigger lives on the *heading*, and the lines animate as
 * variant children. It must not live on the masked spans themselves: those
 * start translated fully below their `overflow-hidden` wrapper, and
 * IntersectionObserver intersects against ancestor clipping — so a span that
 * wraps onto two lines has zero visible area, never reports as in view, and
 * stays invisible forever. (A one-line span survives only by a ~1px sliver,
 * which is not something to rely on.)
 */
export function TextReveal({
  lines,
  as = 'span',
  id,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
}: TextRevealProps) {
  const prefersReduced = useReducedMotion();
  const Tag = as as 'span';

  if (prefersReduced) {
    return (
      <Tag id={id} className={cn('block', className)}>
        {lines.map((line) => (
          <span key={line} className={cn('block', lineClassName)}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  const MotionTag = motion[as as 'span'];

  return (
    <MotionTag
      id={id}
      className={cn('block', className)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {lines.map((line) => (
        // pb/-mb pair keeps descenders (g, y, p) from being clipped by the mask.
        <span key={line} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span variants={lineVariants} className={cn('block will-change-transform', lineClassName)}>
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
