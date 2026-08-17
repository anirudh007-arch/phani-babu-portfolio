import { motion } from 'framer-motion';
import { site } from '@/content/site';
import { EASE_OUT, inView } from '@/lib/motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Achievements() {
  return (
    <section id="achievements" aria-labelledby="achievements-heading" className="relative z-10 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="achievements-heading"
          eyebrow={site.achievements.eyebrow}
          heading={['Practice, and', 'the teaching of it.']}
          lead={site.achievements.lead}
        />

        <div className="mt-16 grid gap-x-14 gap-y-16 lg:grid-cols-2">
          {site.achievements.groups.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } } }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
                }}
                className="flex items-baseline justify-between gap-4 border-b border-[var(--border)] pb-4"
              >
                <h3 className="font-display text-[1.25rem] font-medium tracking-[-0.025em]">{group.label}</h3>
                <span className="font-sans text-[0.6875rem] tracking-[0.16em] text-subtle tabular-nums">
                  0{groupIndex + 1}
                </span>
              </motion.div>

              <ul className="mt-1">
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
                    }}
                    className="group flex gap-4 border-b border-[var(--border)] py-5 transition-colors duration-500 hover:border-[var(--border-hi)]"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-accent/60 transition-all duration-500 [transition-timing-function:var(--ease-out-luxe)] group-hover:w-4 group-hover:bg-accent"
                    />
                    <span className="text-[0.9375rem] leading-[1.65] text-muted transition-colors duration-500 group-hover:text-fg">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
