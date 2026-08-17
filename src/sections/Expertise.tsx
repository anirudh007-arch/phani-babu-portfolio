import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  Anchor,
  HeartPulse,
  PenTool,
  Zap,
  AlignCenterHorizontal,
  ShieldCheck,
  Plus,
  ArrowUpRight,
  Check,
  Clock,
} from 'lucide-react';
import { site, type IconName } from '@/content/site';
import { EASE_OUT, EASE_IN_OUT, inView } from '@/lib/motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ExpertiseGlyph } from '@/components/ExpertiseGlyph';
import { scrollToSection } from '@/hooks/useSmoothScroll';
import { cn } from '@/lib/utils';

const ICONS: Record<IconName, typeof Sparkles> = {
  sparkles: Sparkles,
  anchor: Anchor,
  'heart-pulse': HeartPulse,
  'pen-tool': PenTool,
  zap: Zap,
  'align-center-horizontal': AlignCenterHorizontal,
  'shield-check': ShieldCheck,
};

export function Expertise() {
  // The first discipline is open on arrival — an all-closed accordion reads
  // as an empty section and gives the visitor nothing to react to.
  const [openId, setOpenId] = useState<string | null>(site.expertise[0].id);
  const prefersReduced = useReducedMotion();
  const uid = useId();

  return (
    <section id="expertise" aria-labelledby="expertise-heading" className="relative z-10 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="expertise-heading"
          eyebrow="Areas of Expertise"
          heading={['Seven disciplines,', 'one standard of care.']}
          lead="Every treatment below is planned and performed by Dr. Phani Babu personally. Open any discipline to see what it involves, how long it takes and what it is meant to achieve."
        />

        <div className="mt-14 border-t border-[var(--border)]">
          {site.expertise.map((item, index) => {
            const isOpen = openId === item.id;
            const Icon = ICONS[item.icon];
            const panelId = `${uid}-panel-${item.id}`;
            const buttonId = `${uid}-trigger-${item.id}`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: Math.min(index * 0.05, 0.3) }}
                className={cn(
                  'group border-b border-[var(--border)] transition-colors duration-500',
                  '[transition-timing-function:var(--ease-out-luxe)]',
                  isOpen && 'bg-[var(--card)]',
                )}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center gap-5 px-1 py-7 text-left sm:gap-7 sm:px-4 sm:py-8"
                  >
                    <span
                      aria-hidden
                      className="hidden shrink-0 font-sans text-[0.6875rem] tracking-[0.16em] text-subtle tabular-nums sm:block"
                    >
                      0{index + 1}
                    </span>

                    <span
                      aria-hidden
                      className={cn(
                        'grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors duration-500',
                        '[transition-timing-function:var(--ease-out-luxe)]',
                        isOpen
                          ? 'border-accent/50 bg-accent/10 text-accent'
                          : 'border-[var(--border)] text-muted group-hover:border-[var(--border-hi)] group-hover:text-fg',
                      )}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          'block font-display text-[clamp(1.375rem,2.6vw,2rem)] leading-tight font-medium tracking-[-0.03em] transition-colors duration-500',
                          isOpen ? 'text-fg' : 'text-fg/80 group-hover:text-fg',
                        )}
                      >
                        {item.title}
                      </span>
                      <span className="mt-1.5 block text-[0.875rem] text-subtle">{item.tagline}</span>
                    </span>

                    <span
                      aria-hidden
                      className={cn(
                        'grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500',
                        '[transition-timing-function:var(--ease-out-luxe)]',
                        isOpen
                          ? 'rotate-45 border-accent/50 bg-accent text-white'
                          : 'border-[var(--border)] text-muted group-hover:border-[var(--border-hi)] group-hover:text-fg',
                      )}
                    >
                      <Plus size={16} strokeWidth={1.8} />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      key="panel"
                      initial={prefersReduced ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={prefersReduced ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.65, ease: EASE_IN_OUT },
                        opacity: { duration: 0.4, ease: EASE_OUT },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 px-1 pb-10 sm:px-4 lg:grid-cols-[1fr_auto] lg:gap-14 lg:pl-[6.75rem]">
                        <div className="max-w-2xl">
                          <p className="text-[1.0625rem] leading-[1.8] text-muted">{item.description}</p>

                          <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                            {item.benefits.map((benefit, i) => (
                              <motion.li
                                key={benefit}
                                initial={prefersReduced ? false : { opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.15 + i * 0.06 }}
                                className="flex items-start gap-2.5 text-[0.9375rem] text-fg/85"
                              >
                                <Check
                                  size={15}
                                  strokeWidth={2}
                                  className="mt-1 shrink-0 text-accent"
                                  aria-hidden
                                />
                                {benefit}
                              </motion.li>
                            ))}
                          </ul>

                          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                            <a
                              href="#contact"
                              onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('#contact');
                              }}
                              className="group/cta inline-flex items-center gap-2 text-[0.9375rem] font-medium text-accent transition-colors duration-400 hover:text-accent-hi"
                            >
                              {item.cta}
                              <ArrowUpRight
                                size={16}
                                strokeWidth={1.8}
                                className="transition-transform duration-400 [transition-timing-function:var(--ease-out-luxe)] group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                              />
                            </a>
                            <span className="inline-flex items-center gap-2 text-[0.8125rem] text-subtle">
                              <Clock size={14} strokeWidth={1.6} aria-hidden />
                              Typically {item.duration}
                            </span>
                          </div>
                        </div>

                        <div className="hidden h-40 w-40 shrink-0 self-center opacity-90 lg:block xl:h-48 xl:w-48">
                          <ExpertiseGlyph id={item.id} active={isOpen} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
