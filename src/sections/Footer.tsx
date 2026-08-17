import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { site } from '@/content/site';
import { EASE_OUT, inView } from '@/lib/motion';
import { scrollToSection } from '@/hooks/useSmoothScroll';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[var(--border)]">
      <div className="shell py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16"
        >
          {/* Identity */}
          <div>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="group inline-flex items-center gap-3"
            >
              <span
                aria-hidden
                className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border-hi)] font-display text-[0.75rem] font-medium text-accent transition-colors duration-400 group-hover:border-accent"
              >
                {site.doctor.initials}
              </span>
              <span className="font-display text-[1.0625rem] font-medium tracking-tight">
                {site.doctor.name}
              </span>
            </a>
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-[1.7] text-muted">
              {site.footer.statement}
            </p>
            <address className="mt-6 text-[0.875rem] leading-[1.7] text-subtle not-italic">
              {site.contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h2 className="text-[0.6875rem] tracking-[0.16em] text-subtle uppercase">Explore</h2>
            <ul className="mt-5 space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className="group inline-flex items-center gap-2 text-[0.9375rem] text-muted transition-colors duration-400 hover:text-fg"
                  >
                    <span
                      aria-hidden
                      className="h-px w-0 bg-accent transition-all duration-500 [transition-timing-function:var(--ease-out-luxe)] group-hover:w-4"
                    />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact & social */}
          <div>
            <h2 className="text-[0.6875rem] tracking-[0.16em] text-subtle uppercase">Connect</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="text-[0.9375rem] text-muted transition-colors duration-400 hover:text-fg"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.emailHref}
                  className="text-[0.9375rem] text-muted transition-colors duration-400 hover:text-fg"
                >
                  {site.contact.email}
                </a>
              </li>
            </ul>

            <ul className="mt-7 flex flex-wrap gap-2">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-[var(--border)] px-3.5 py-2 text-[0.8125rem] text-muted transition-colors duration-400 hover:border-[var(--border-hi)] hover:text-fg"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="hairline mt-14" />

        <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-2xl text-[0.75rem] leading-[1.7] text-subtle">{site.footer.disclaimer}</p>

          <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {site.footer.legal.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.8125rem] text-subtle transition-colors duration-400 hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => scrollToSection('#hero')}
              className="group inline-flex items-center gap-2 self-start rounded-full border border-[var(--border)] px-4 py-2 text-[0.8125rem] text-muted transition-colors duration-400 hover:border-[var(--border-hi)] hover:text-fg"
            >
              Back to top
              <ArrowUp
                size={14}
                strokeWidth={1.7}
                aria-hidden
                className="transition-transform duration-500 [transition-timing-function:var(--ease-out-luxe)] group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>

        <p className="mt-8 text-[0.8125rem] text-subtle">
          © {year} {site.doctor.clinic}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
