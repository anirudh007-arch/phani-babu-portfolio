import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { site, type Stat } from '@/content/site';
import { useCountUp } from '@/hooks/useCountUp';
import { EASE_OUT, inView } from '@/lib/motion';
import { formatNumber } from '@/lib/utils';

function StatNode({ stat, index }: { stat: Stat; index: number }) {
  const { ref, value } = useCountUp(stat.value, 1700 + index * 90);

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 26 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
      }}
      className="group relative shrink-0 snap-start pt-10 pr-8 last:pr-0 md:pr-0 min-w-[13.5rem] md:min-w-0"
    >
      {/* Node on the rail */}
      <span
        aria-hidden
        className="absolute top-0 left-0 grid h-[9px] w-[9px] -translate-y-1/2 place-items-center"
      >
        <span className="absolute inset-0 rounded-full bg-accent" />
        <span className="absolute inset-0 rounded-full bg-accent opacity-0 transition-all duration-700 [transition-timing-function:var(--ease-out-luxe)] group-hover:scale-[2.6] group-hover:opacity-20" />
      </span>

      <p className="font-display text-[clamp(2.25rem,4.2vw,3.25rem)] leading-none font-medium tracking-[-0.04em] tabular-nums">
        <span ref={ref}>{formatNumber(value)}</span>
        {stat.suffix && <span className="text-accent">{stat.suffix}</span>}
      </p>
      <p className="mt-3 text-[0.9375rem] font-medium">{stat.label}</p>
      <p className="mt-1.5 max-w-[16rem] text-[0.8125rem] leading-relaxed text-subtle">{stat.detail}</p>
    </motion.li>
  );
}

export function Credentials() {
  const railRef = useRef<HTMLDivElement>(null);
  const railInView = useInView(railRef, { once: true, margin: '0px 0px -20% 0px' });
  const prefersReduced = useReducedMotion();

  return (
    <section id="credentials" aria-label="Credentials in numbers" className="relative z-10 py-24 sm:py-32">
      <div className="shell">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="eyebrow"
        >
          By the numbers
        </motion.p>

        <div ref={railRef} className="relative mt-12">
          {/* The rail itself, drawn left-to-right as the section arrives. */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-accent/70 via-[var(--border-hi)] to-transparent"
            initial={prefersReduced ? { scaleX: 1 } : { scaleX: 0 }}
            animate={railInView ? { scaleX: 1 } : undefined}
            transition={prefersReduced ? { duration: 0 } : { duration: 1.3, ease: EASE_OUT }}
          />

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={inView}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }}
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-12 md:overflow-visible lg:grid-cols-6 lg:gap-x-6"
          >
            {site.stats.map((stat, i) => (
              <StatNode key={stat.label} stat={stat} index={i} />
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
