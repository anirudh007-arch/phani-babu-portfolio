import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { site } from '@/content/site';
import { EASE_OUT, inView } from '@/lib/motion';
import { SmartImage } from '@/components/ui/SmartImage';
import { TextReveal } from '@/components/ui/TextReveal';

export function About() {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // The portrait travels slower than the column beside it, which is what
  // reads as depth rather than as "an image that moves".
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.0, 1.06]);

  return (
    <section ref={ref} id="about" aria-labelledby="about-heading" className="relative z-10 py-24 sm:py-32">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          {/* ── Portrait column ──────────────────────────────────────── */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={prefersReduced ? undefined : { clipPath: 'inset(0 0 100% 0)' }}
              whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
              viewport={inView}
              transition={{ duration: 1.1, ease: EASE_OUT }}
              className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] shadow-[var(--shadow-luxe)]"
            >
              <motion.div style={prefersReduced ? undefined : { y: imageY, scale: imageScale }}>
                <SmartImage
                  src={site.doctor.aboutPortrait}
                  alt={site.doctor.aboutPortraitAlt}
                  ratio="4/5"
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  fallbackLabel="Dr. Phani Babu at work"
                />
              </motion.div>
            </motion.div>

            {/* Signature-style attribution under the portrait. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 }}
              className="mt-6 flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-display text-[1.0625rem] font-medium tracking-tight">{site.doctor.name}</p>
                <p className="mt-0.5 text-[0.8125rem] text-subtle">{site.doctor.title}</p>
              </div>
              <span className="eyebrow shrink-0">{site.doctor.clinic}</span>
            </motion.div>
          </div>

          {/* ── Narrative column ─────────────────────────────────────── */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.7, ease: EASE_OUT }}
              className="eyebrow flex items-center gap-3"
            >
              <span className="h-px w-8 bg-accent/60" aria-hidden />
              {site.about.eyebrow}
            </motion.p>

            <TextReveal
              as="h2"
              id="about-heading"
              lines={[site.about.heading]}
              delay={0.08}
              className="mt-6 font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.06] font-medium tracking-[-0.035em]"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
              className="mt-7 text-[1.125rem] leading-[1.7] text-fg"
            >
              {site.about.lead}
            </motion.p>

            <div className="mt-8 space-y-6">
              {site.about.body.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 + i * 0.06 }}
                  className="text-[1.0625rem] leading-[1.8] text-muted"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Pull quote */}
            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
              className="relative mt-12 rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-7 backdrop-blur-[var(--blur-glass)] sm:p-9"
            >
              <Quote
                aria-hidden
                size={26}
                strokeWidth={1.2}
                className="absolute -top-3 left-7 rounded-full bg-bg p-0.5 text-accent"
              />
              <blockquote className="font-display text-[1.25rem] leading-[1.55] font-medium tracking-[-0.02em] text-balance sm:text-[1.4375rem]">
                “{site.about.pullQuote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-[0.8125rem] text-subtle">
                <span className="h-px w-7 bg-accent/60" aria-hidden />
                {site.doctor.name}
              </figcaption>
            </motion.figure>

            {/* Values */}
            <motion.dl
              initial="hidden"
              whileInView="show"
              viewport={inView}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
              className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2"
            >
              {site.about.values.map((value, i) => (
                <motion.div
                  key={value.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
                  }}
                  className="border-t border-[var(--border)] pt-5"
                >
                  <dt className="flex items-baseline gap-3 font-display text-[1.0625rem] font-medium tracking-tight">
                    <span className="font-sans text-[0.6875rem] tracking-[0.16em] text-accent tabular-nums">
                      0{i + 1}
                    </span>
                    {value.title}
                  </dt>
                  <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">{value.body}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </div>
      </div>
    </section>
  );
}
