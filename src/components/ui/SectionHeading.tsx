import { motion } from 'framer-motion';
import { EASE_OUT, inView } from '@/lib/motion';
import { TextReveal } from '@/components/ui/TextReveal';
import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow: string;
  /** Rendered as masked lines; pass one string per visual line. */
  heading: readonly string[];
  lead?: string;
  align?: 'left' | 'center';
  className?: string;
  id?: string;
};

/** The shared section header — keeps rhythm and reveal timing identical. */
export function SectionHeading({
  eyebrow,
  heading,
  lead,
  align = 'left',
  className,
  id,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    // Wide enough that the authored line breaks survive at the largest
    // heading size; the lead paragraph re-narrows itself below.
    <div className={cn(centered && 'mx-auto max-w-4xl text-center', className)}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className={cn('eyebrow flex items-center gap-3', centered && 'justify-center')}
      >
        <span className="h-px w-8 bg-accent/60" aria-hidden />
        {eyebrow}
      </motion.p>

      <TextReveal
        as="h2"
        id={id}
        lines={heading}
        delay={0.08}
        className="mt-6 font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.06] font-medium tracking-[-0.035em]"
      />

      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.22 }}
          className={cn(
            'mt-6 max-w-2xl text-[1.0625rem] leading-[1.75] text-muted',
            centered && 'mx-auto',
          )}
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
}
