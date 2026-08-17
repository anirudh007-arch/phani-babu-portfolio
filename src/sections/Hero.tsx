import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowDown, ArrowUpRight, ShieldCheck, Star } from 'lucide-react';
import { site } from '@/content/site';
import { EASE_OUT } from '@/lib/motion';
import { scrollToSection } from '@/hooks/useSmoothScroll';
import { useFinePointer } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { SmartImage } from '@/components/ui/SmartImage';
import { ParticleField } from '@/components/ui/ParticleField';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const finePointer = useFinePointer();

  // Scroll parallax: the portrait lags the page, the copy leads it slightly.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Pointer parallax — a few pixels of travel, nothing more.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springCfg = { stiffness: 60, damping: 22, mass: 0.6 };
  const tiltX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), springCfg);
  const tiltY = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), springCfg);
  const floatX = useSpring(useTransform(px, [-0.5, 0.5], [-14, 14]), springCfg);
  const floatY = useSpring(useTransform(py, [-0.5, 0.5], [-10, 10]), springCfg);

  const onPointerMove = (e: React.PointerEvent) => {
    if (!finePointer || prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const headingDelay = 0.15;

  return (
    <section
      ref={sectionRef}
      id="hero"
      onPointerMove={onPointerMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20 lg:pt-28 lg:pb-24"
    >
      <ParticleField className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />

      <div className="shell relative z-10 w-full">
        <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14 xl:gap-20">
          {/* ── Copy ─────────────────────────────────────────────────── */}
          <motion.div style={prefersReduced ? undefined : { y: copyY, opacity: heroFade }}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: headingDelay }}
              className="eyebrow flex items-center gap-3"
            >
              <span className="h-px w-8 bg-accent/60" aria-hidden />
              {site.hero.eyebrow}
            </motion.p>

            {/* Sized so each authored line stays on one visual line at every
                breakpoint — the mask reveal only reads as deliberate when a
                line is a line. */}
            <h1 className="mt-6 font-display text-[clamp(2.5rem,5.4vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.035em]">
              {site.hero.headline.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                  <motion.span
                    className="block will-change-transform"
                    initial={prefersReduced ? { y: 0 } : { y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={
                      prefersReduced
                        ? { duration: 0 }
                        : { duration: 0.95, ease: EASE_OUT, delay: headingDelay + 0.1 + i * 0.09 }
                    }
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
              {site.hero.headlineAccent.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                  <motion.span
                    className="shimmer block will-change-transform"
                    initial={prefersReduced ? { y: 0 } : { y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={
                      prefersReduced
                        ? { duration: 0 }
                        : {
                            duration: 0.95,
                            ease: EASE_OUT,
                            delay: headingDelay + 0.28 + i * 0.09,
                          }
                    }
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: headingDelay + 0.45 }}
              className="mt-8 max-w-xl text-[1.0625rem] leading-[1.75] text-muted"
            >
              {site.hero.subheading}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: headingDelay + 0.58 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.22}>
                <Button
                  as="a"
                  href="#contact"
                  size="lg"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    scrollToSection('#contact');
                  }}
                >
                  {site.hero.primaryCta}
                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.8}
                    className="transition-transform duration-400 [transition-timing-function:var(--ease-out-luxe)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Button>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: headingDelay + 0.75 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.8125rem] text-subtle"
            >
              <span className="flex items-center gap-2">
                <span className="flex" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: EASE_OUT, delay: 1.0 + i * 0.07 }}
                    >
                      <Star size={13} className="fill-accent text-accent" strokeWidth={0} />
                    </motion.span>
                  ))}
                </span>
                <span className="text-muted">
                  {site.reviewSummary.rating} · {site.reviewSummary.count}+ {site.reviewSummary.platform} reviews
                </span>
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={14} strokeWidth={1.6} className="text-accent" />
                {site.hero.trustline}
              </span>
            </motion.div>
          </motion.div>

          {/* ── Portrait ─────────────────────────────────────────────── */}
          <motion.div
            style={prefersReduced ? undefined : { y: portraitY }}
            className="relative mx-auto w-full max-w-[30rem] lg:max-w-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.3 }}
              style={
                prefersReduced
                  ? undefined
                  : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }
              }
              className="relative"
            >
              {/* Halo behind the frame. */}
              <div
                aria-hidden
                className="absolute -inset-8 -z-10 rounded-[3rem] opacity-80 blur-3xl"
                style={{ background: 'radial-gradient(60% 60% at 50% 40%, var(--glow), transparent 70%)' }}
              />

              <div className="relative overflow-hidden rounded-[2.25rem] border border-[var(--border)] shadow-[var(--shadow-luxe)]">
                <SmartImage
                  src={site.doctor.portrait}
                  alt={site.doctor.portraitAlt}
                  ratio="4/5"
                  priority
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  fallbackLabel={`${site.doctor.name} — portrait`}
                  imgClassName="scale-[1.02]"
                />

                {/* Glass gradient over the lower third, so the name plate reads. */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="glass-dark rounded-2xl px-4 py-3.5 sm:px-5">
                    <p className="font-display text-[1.0625rem] font-medium tracking-tight text-white">
                      {site.doctor.name}
                    </p>
                    <p className="mt-0.5 text-[0.75rem] tracking-wide text-white/70">
                      {site.doctor.title} · {site.doctor.clinic}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating credential chip — drifts opposite the portrait. */}
              <motion.div
                style={prefersReduced ? undefined : { x: floatX, y: floatY }}
                className="absolute -top-5 -left-4 hidden sm:block lg:-left-10"
              >
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.9 }}
                  className="glass rounded-2xl px-4 py-3"
                >
                  <p className="font-display text-xl font-medium tracking-tight">
                    {site.stats[3].value.toLocaleString('en-IN')}
                    <span className="text-accent">+</span>
                  </p>
                  <p className="mt-0.5 text-[0.6875rem] tracking-[0.12em] text-subtle uppercase">
                    Implants placed
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                style={prefersReduced ? undefined : { x: floatY, y: floatX }}
                className="absolute -right-4 bottom-24 hidden sm:block lg:-right-9"
              >
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.05 }}
                  className="glass rounded-2xl px-4 py-3"
                >
                  <p className="font-display text-xl font-medium tracking-tight">
                    {site.stats[0].value}
                    <span className="text-accent">+</span>
                  </p>
                  <p className="mt-0.5 text-[0.6875rem] tracking-[0.12em] text-subtle uppercase">
                    Years practising
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('#credentials')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.4 }}
        style={prefersReduced ? undefined : { opacity: heroFade }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-subtle transition-colors duration-400 hover:text-fg lg:flex"
        aria-label="Scroll to credentials"
      >
        <span className="text-[0.625rem] tracking-[0.24em] uppercase">Scroll</span>
        <motion.span
          animate={prefersReduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
        >
          <ArrowDown size={15} strokeWidth={1.5} />
        </motion.span>
      </motion.button>
    </section>
  );
}
