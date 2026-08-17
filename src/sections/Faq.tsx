import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { site } from '@/content/site';
import { EASE_OUT, EASE_IN_OUT, inView } from '@/lib/motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

/**
 * FAQPage structured data, generated from the same source as the visible
 * accordion — the two can never drift apart, which is what usually gets a
 * rich result revoked.
 */
const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: site.faq.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const prefersReduced = useReducedMotion();
  const uid = useId();

  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative z-10 py-24 sm:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="faq-heading"
              eyebrow={site.faq.eyebrow}
              heading={['The things people ask', 'before booking.']}
            />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-[1.75] text-muted">
              Anything not answered here is worth a phone call — questions are answered by a dentist, not a
              receptionist.
            </p>
          </div>

          <div className="border-t border-[var(--border)]">
            {site.faq.items.map((item, i) => {
              const isOpen = open === i;
              const panelId = `${uid}-a-${i}`;
              const buttonId = `${uid}-q-${i}`;

              return (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.6, ease: EASE_OUT, delay: Math.min(i * 0.05, 0.25) }}
                  className="border-b border-[var(--border)]"
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-start gap-5 py-6 text-left"
                    >
                      <span
                        className={cn(
                          'flex-1 font-display text-[1.0625rem] leading-snug font-medium tracking-[-0.02em] transition-colors duration-500 sm:text-[1.1875rem]',
                          isOpen ? 'text-fg' : 'text-fg/80 group-hover:text-fg',
                        )}
                      >
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          'mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-500',
                          '[transition-timing-function:var(--ease-out-luxe)]',
                          isOpen
                            ? 'rotate-45 border-accent/50 bg-accent text-white'
                            : 'border-[var(--border)] text-muted group-hover:border-[var(--border-hi)] group-hover:text-fg',
                        )}
                      >
                        <Plus size={14} strokeWidth={1.8} />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={prefersReduced ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={prefersReduced ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.55, ease: EASE_IN_OUT },
                          opacity: { duration: 0.35, ease: EASE_OUT },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 text-[0.9375rem] leading-[1.8] text-muted">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
