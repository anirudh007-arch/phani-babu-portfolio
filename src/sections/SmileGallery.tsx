import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Expand, Quote } from 'lucide-react';
import { site, type Transformation, type TransformationCategory } from '@/content/site';
import { EASE_OUT, EASE_IN_OUT, inView } from '@/lib/motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BeforeAfter } from '@/components/BeforeAfter';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';

type Filter = 'All' | TransformationCategory;

export function SmileGallery() {
  const [filter, setFilter] = useState<Filter>('All');
  const [expanded, setExpanded] = useState<Transformation | null>(null);

  const filters = useMemo<Filter[]>(() => {
    const categories = Array.from(new Set(site.gallery.items.map((i) => i.category)));
    return ['All', ...categories];
  }, []);

  const visible = useMemo(
    () => (filter === 'All' ? site.gallery.items : site.gallery.items.filter((i) => i.category === filter)),
    [filter],
  );

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="relative z-10 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="gallery-heading"
          eyebrow={site.gallery.eyebrow}
          heading={['Work you can', 'look at closely.']}
          lead={site.gallery.lead}
        />

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 }}
          role="group"
          aria-label="Filter transformations by treatment type"
          className="no-scrollbar mt-12 flex gap-2 overflow-x-auto pb-1"
        >
          {filters.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={isActive}
                className={cn(
                  'relative shrink-0 rounded-full px-4 py-2 text-[0.875rem] transition-colors duration-400',
                  '[transition-timing-function:var(--ease-out-luxe)]',
                  isActive ? 'text-bg' : 'text-muted hover:text-fg',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="gallery-filter"
                    transition={{ duration: 0.5, ease: EASE_IN_OUT }}
                    className="absolute inset-0 -z-10 rounded-full bg-fg"
                  />
                )}
                {f}
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.ul layout className="mt-10 grid gap-6 sm:gap-7 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((item, index) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.3, ease: EASE_OUT } }}
                viewport={inView}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: Math.min(index * 0.06, 0.24) }}
                className="group relative"
              >
                <div className="relative">
                  <BeforeAfter
                    before={item.before}
                    after={item.after}
                    alt={item.title}
                    ratio="4/3"
                    initial={index % 2 === 0 ? 52 : 48}
                  />

                  <button
                    type="button"
                    onClick={() => setExpanded(item)}
                    aria-label={`View ${item.title} full screen`}
                    className="glass-dark absolute right-4 bottom-4 z-10 grid h-10 w-10 place-items-center rounded-full text-white opacity-0 transition-all duration-500 [transition-timing-function:var(--ease-out-luxe)] group-hover:opacity-100 focus-visible:opacity-100"
                  >
                    <Expand size={16} strokeWidth={1.6} />
                  </button>
                </div>

                <div className="mt-5 px-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-[1.1875rem] font-medium tracking-[-0.02em]">
                      {item.title}
                    </h3>
                    <span className="eyebrow">{item.category}</span>
                  </div>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">{item.summary}</p>
                  <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-subtle">
                    <span>{item.treatment}</span>
                    <span aria-hidden>·</span>
                    <span>{item.duration}</span>
                    <span aria-hidden>·</span>
                    <span>{item.patient}</span>
                  </p>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inView}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="mt-12 max-w-2xl text-[0.8125rem] leading-relaxed text-subtle"
        >
          All clinical photography is unretouched and published with written patient consent. Individual
          results depend on presenting condition, bone quality and home care — your own outcome is discussed
          honestly at consultation.
        </motion.p>
      </div>

      {/* Fullscreen */}
      <AnimatePresence>
        {expanded && (
          <Modal onClose={() => setExpanded(null)} label={`${expanded.title} — before and after`}>
            <BeforeAfter
              before={expanded.before}
              after={expanded.after}
              alt={expanded.title}
              ratio="16/10"
              priority
              className="rounded-none rounded-t-[1.75rem] border-0 border-b"
            />
            <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <span className="eyebrow">{expanded.category}</span>
                <h3 className="mt-3 font-display text-[1.5rem] leading-tight font-medium tracking-[-0.03em] sm:text-[1.75rem]">
                  {expanded.title}
                </h3>
                <p className="mt-4 text-[1rem] leading-[1.75] text-muted">{expanded.summary}</p>
                <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                  {[
                    ['Treatment', expanded.treatment],
                    ['Duration', expanded.duration],
                    ['Patient', expanded.patient],
                  ].map(([term, value]) => (
                    <div key={term}>
                      <dt className="text-[0.6875rem] tracking-[0.16em] text-subtle uppercase">{term}</dt>
                      <dd className="mt-1.5 text-[0.9375rem]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <figure className="relative rounded-[1.25rem] border border-[var(--border)] bg-[var(--card)] p-6">
                <Quote aria-hidden size={22} strokeWidth={1.2} className="text-accent" />
                <blockquote className="mt-3 font-display text-[1.0625rem] leading-[1.6] font-medium tracking-[-0.015em]">
                  “{expanded.quote}”
                </blockquote>
                <figcaption className="mt-4 text-[0.8125rem] text-subtle">{expanded.patient}</figcaption>
              </figure>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}
