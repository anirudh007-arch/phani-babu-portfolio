import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { site } from '@/content/site';
import { EASE_OUT, inView } from '@/lib/motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SmartImage } from '@/components/ui/SmartImage';
import { cn } from '@/lib/utils';

export function Clinic() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = site.clinic.spaces[activeIndex];

  return (
    <section id="clinic" aria-labelledby="clinic-heading" className="relative z-10 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="clinic-heading"
          eyebrow={site.clinic.eyebrow}
          heading={['Designed to', 'lower your pulse.']}
          lead={site.clinic.lead}
        />

        {/* ── Walkthrough ──────────────────────────────────────────────
            The room list drives a single stage. Hover previews on desktop,
            click/keyboard commits — so it works identically without a mouse. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
          className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12"
        >
          <ul className="flex flex-col" role="tablist" aria-label="Clinic spaces" aria-orientation="vertical">
            {site.clinic.spaces.map((space, i) => {
              const isActive = i === activeIndex;
              return (
                // `role="presentation"` removes the <li> from the accessibility
                // tree: a tablist's children must be tabs, and an intervening
                // listitem invalidates the whole pattern.
                <li
                  key={space.id}
                  role="presentation"
                  className="border-b border-[var(--border)] first:border-t"
                >
                  <button
                    type="button"
                    role="tab"
                    id={`clinic-tab-${space.id}`}
                    aria-selected={isActive}
                    aria-controls="clinic-stage"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(i)}
                    onFocus={() => setActiveIndex(i)}
                    onMouseEnter={() => setActiveIndex(i)}
                    onKeyDown={(e) => {
                      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
                      e.preventDefault();
                      const next =
                        (i + (e.key === 'ArrowDown' ? 1 : -1) + site.clinic.spaces.length) %
                        site.clinic.spaces.length;
                      setActiveIndex(next);
                      document.getElementById(`clinic-tab-${site.clinic.spaces[next].id}`)?.focus();
                    }}
                    className="group flex w-full items-start gap-4 py-5 text-left sm:gap-5"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'mt-1.5 font-sans text-[0.6875rem] tracking-[0.16em] tabular-nums transition-colors duration-500',
                        isActive ? 'text-accent' : 'text-subtle',
                      )}
                    >
                      0{i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          'block font-display text-[1.1875rem] font-medium tracking-[-0.02em] transition-colors duration-500',
                          isActive ? 'text-fg' : 'text-fg/65 group-hover:text-fg',
                        )}
                      >
                        {space.name}
                      </span>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5, ease: EASE_OUT }}
                            className="block overflow-hidden"
                          >
                            <span className="block pt-2 text-[0.875rem] leading-relaxed text-muted">
                              {space.blurb}
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            id="clinic-stage"
            role="tabpanel"
            aria-labelledby={`clinic-tab-${active.id}`}
            className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] shadow-[var(--shadow-luxe)] lg:sticky lg:top-28 lg:self-start"
          >
            {/* Every image is mounted; only opacity changes. Cross-fades are
                instant and nothing re-downloads when you move back up the list. */}
            <div className="relative" style={{ aspectRatio: '4/3' }}>
              {site.clinic.spaces.map((space, i) => (
                <div
                  key={space.id}
                  aria-hidden={i !== activeIndex}
                  className={cn(
                    'absolute inset-0 transition-opacity duration-700',
                    '[transition-timing-function:var(--ease-out-luxe)]',
                    i === activeIndex ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  <SmartImage
                    src={space.image}
                    alt={`${space.name} at ${site.doctor.clinic}`}
                    ratio="4/3"
                    sizes="(min-width: 1024px) 55vw, 92vw"
                    fallbackLabel={space.name}
                    className="h-full rounded-none"
                    imgClassName={cn(
                      'transition-transform duration-[1200ms] [transition-timing-function:var(--ease-out-luxe)]',
                      i === activeIndex ? 'scale-100' : 'scale-105',
                    )}
                  />
                </div>
              ))}
            </div>

            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/65 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5 sm:p-6">
              <p className="font-display text-[1.0625rem] font-medium tracking-tight text-white">
                {active.name}
              </p>
              <a
                href={site.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-dark inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.75rem] text-white transition-colors duration-400 hover:bg-white/15"
              >
                <MapPin size={13} strokeWidth={1.6} aria-hidden />
                Visit us
                <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Technology ───────────────────────────────────────────── */}
        <div className="mt-24">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="eyebrow flex items-center gap-3"
          >
            <span className="h-px w-8 bg-accent/60" aria-hidden />
            Technology
          </motion.p>

          <motion.dl
            initial="hidden"
            whileInView="show"
            viewport={inView}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } } }}
            className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3"
          >
            {site.clinic.technology.map((tech) => (
              <motion.div
                key={tech.name}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
                }}
                className="group border-t border-[var(--border)] pt-5 transition-colors duration-500 hover:border-[var(--border-hi)]"
              >
                <dt className="font-display text-[1.0625rem] font-medium tracking-tight">{tech.name}</dt>
                <dd className="mt-2 text-[0.875rem] leading-relaxed text-muted">{tech.detail}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
