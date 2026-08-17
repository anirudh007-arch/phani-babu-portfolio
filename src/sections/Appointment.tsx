import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, MessageCircle, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { site } from '@/content/site';
import { EASE_OUT, inView } from '@/lib/motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';

const channels = [
  {
    icon: Phone,
    label: 'Call the clinic',
    value: site.contact.phone,
    href: site.contact.phoneHref,
    note: 'Answered during clinic hours',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: site.contact.whatsapp,
    href: site.contact.whatsappHref,
    note: 'Usually replied within the hour',
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: site.contact.email,
    href: site.contact.emailHref,
    note: 'For reports and second opinions',
  },
];

export function Appointment() {
  const mapRef = useRef<HTMLDivElement>(null);
  // The map iframe is a third-party frame; it is only mounted once it is
  // actually about to be seen, so it never competes with the initial load.
  const mapVisible = useInView(mapRef, { once: true, margin: '200px' });

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative z-10 py-24 sm:py-32">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-[var(--border)] bg-[var(--card)] backdrop-blur-[var(--blur-glass)]">
          {/* Warm light bloom from the lower-left of the panel. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-24 h-[32rem] w-[32rem] rounded-full opacity-80 blur-[110px]"
            style={{ background: 'radial-gradient(circle, var(--glow), transparent 70%)' }}
          />

          <div className="relative grid gap-14 p-7 sm:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:p-16">
            {/* ── Left: the invitation ─────────────────────────────── */}
            <div>
              <SectionHeading
                id="contact-heading"
                eyebrow={site.contact.eyebrow}
                heading={['Begin with', 'a conversation.']}
                lead={site.contact.lead}
              />

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.3 }}
                className="mt-9 flex flex-wrap gap-3"
              >
                <Magnetic strength={0.22}>
                  <Button as="a" href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" size="lg">
                    Book an Appointment
                    <ArrowUpRight
                      size={17}
                      strokeWidth={1.8}
                      className="transition-transform duration-400 [transition-timing-function:var(--ease-out-luxe)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Button>
                </Magnetic>
                <Magnetic strength={0.18}>
                  <Button as="a" href={site.contact.phoneHref} variant="secondary" size="lg">
                    <Phone size={16} strokeWidth={1.7} aria-hidden />
                    {site.contact.phone}
                  </Button>
                </Magnetic>
              </motion.div>

              {/* Channels */}
              <motion.ul
                initial="hidden"
                whileInView="show"
                viewport={inView}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
                className="mt-12 space-y-px"
              >
                {channels.map((channel) => (
                  <motion.li
                    key={channel.label}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
                    }}
                  >
                    <a
                      href={channel.href}
                      {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-center gap-4 border-t border-[var(--border)] py-5 transition-colors duration-500 last:border-b hover:border-[var(--border-hi)]"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--border)] text-muted transition-colors duration-500 group-hover:border-accent/50 group-hover:text-accent">
                        <channel.icon size={16} strokeWidth={1.6} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.6875rem] tracking-[0.16em] text-subtle uppercase">
                          {channel.label}
                        </span>
                        <span className="mt-1 block truncate text-[0.9375rem] font-medium">{channel.value}</span>
                      </span>
                      <span className="shrink-0 text-[0.75rem] text-subtle max-sm:hidden">{channel.note}</span>
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.6}
                        aria-hidden
                        className="shrink-0 text-subtle transition-all duration-500 [transition-timing-function:var(--ease-out-luxe)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      />
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* ── Right: where and when ────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
              className="flex flex-col gap-8"
            >
              <div ref={mapRef} className="relative overflow-hidden rounded-[1.5rem] border border-[var(--border)]">
                <div className="aspect-[4/3] w-full bg-bg-3">
                  {mapVisible && (
                    <iframe
                      title={`Map showing the location of ${site.doctor.clinic}`}
                      src={site.contact.mapsEmbed}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      // Google's tiles are always light. Inverting and rotating
                      // the hue 180° turns them into a dark map that keeps its
                      // real colours (parks green, water blue) instead of a
                      // white slab burning a hole in the section.
                      className="h-full w-full border-0 grayscale-[0.25] dark:invert dark:hue-rotate-180 dark:brightness-95 dark:contrast-[0.92]"
                    />
                  )}
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2.5 text-[0.6875rem] tracking-[0.16em] text-subtle uppercase">
                  <MapPin size={13} strokeWidth={1.6} className="text-accent" aria-hidden />
                  Clinic address
                </h3>
                <address className="mt-3 text-[0.9375rem] leading-[1.75] text-muted not-italic">
                  {site.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={site.contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-accent transition-colors duration-400 hover:text-accent-hi"
                >
                  Get directions
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.8}
                    className="transition-transform duration-400 [transition-timing-function:var(--ease-out-luxe)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>

              <div className="border-t border-[var(--border)] pt-7">
                <h3 className="flex items-center gap-2.5 text-[0.6875rem] tracking-[0.16em] text-subtle uppercase">
                  <Clock size={13} strokeWidth={1.6} className="text-accent" aria-hidden />
                  Consulting hours
                </h3>
                <dl className="mt-3.5 space-y-2.5">
                  {site.contact.hours.map((slot) => (
                    <div key={slot.days} className="flex items-baseline justify-between gap-4">
                      <dt className="text-[0.9375rem] text-muted">{slot.days}</dt>
                      <dd className="text-[0.9375rem] tabular-nums">{slot.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-[0.8125rem] leading-relaxed text-subtle">
                  {site.contact.emergencyNote}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
