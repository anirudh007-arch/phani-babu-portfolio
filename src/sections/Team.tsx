import { motion } from 'framer-motion';
import { site } from '@/content/site';
import { EASE_OUT, inView } from '@/lib/motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SmartImage } from '@/components/ui/SmartImage';

export function Team() {
  return (
    <section id="team" aria-labelledby="team-heading" className="relative z-10 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="team-heading"
          eyebrow={site.team.eyebrow}
          heading={[site.team.heading]}
          lead={site.team.lead}
        />

        <div className="mt-14 grid gap-8">
          {site.team.members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: Math.min(index * 0.1, 0.3) }}
              className="grid gap-8 rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-7 backdrop-blur-[var(--blur-glass)] sm:p-9 sm:grid-cols-[0.65fr_1fr] sm:items-center lg:grid-cols-[0.45fr_1fr]"
            >
              <SmartImage
                src={member.portrait}
                alt={member.portraitAlt}
                ratio="4/5"
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 32vw, 92vw"
                className="rounded-[1.25rem]"
                fallbackLabel={member.name}
              />

              <div>
                <h3 className="font-display text-[1.5rem] font-medium tracking-[-0.02em] sm:text-[1.75rem]">
                  {member.name}
                </h3>
                <p className="mt-1.5 text-[0.9375rem] text-subtle">{member.credentials}</p>

                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {member.specialties.map((specialty) => (
                    <li
                      key={specialty}
                      className="rounded-full border border-[var(--border)] px-3.5 py-1.5 text-[0.8125rem] text-fg/85"
                    >
                      {specialty}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
