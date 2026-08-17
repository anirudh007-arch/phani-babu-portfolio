import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { site } from '@/content/site';
import { scrollToSection } from '@/hooks/useSmoothScroll';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useTheme } from '@/hooks/useTheme';
import { EASE_OUT, EASE_IN_OUT } from '@/lib/motion';
import { Button } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const { theme, toggle } = useTheme();

  const ids = useMemo(() => site.nav.map((n) => n.href.slice(1)), []);
  const active = useActiveSection(ids);

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  // Lock the page behind the mobile sheet, and close it on Escape.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previous;
      window.__lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    // Let the sheet begin closing before the scroll starts, or the two fight.
    window.setTimeout(() => scrollToSection(href), open ? 220 : 0);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-4 sm:px-6 sm:pt-5"
      >
        <nav
          aria-label="Primary"
          className={cn(
            'flex w-full max-w-6xl items-center justify-between rounded-full',
            'transition-[padding,background-color,border-color,box-shadow,backdrop-filter] duration-500',
            '[transition-timing-function:var(--ease-out-luxe)]',
            scrolled
              ? 'glass px-3 py-2 shadow-[0_18px_50px_-30px_rgb(0_0_0/0.9)] sm:px-4 sm:py-2.5'
              : 'border border-transparent bg-transparent px-3 py-3.5 sm:px-4 sm:py-4',
          )}
        >
          {/* Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              go('#hero');
            }}
            className="group flex shrink-0 items-center gap-2.5 rounded-full pl-1.5 pr-2"
          >
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center rounded-full border border-[var(--border-hi)] font-display text-[0.6875rem] font-medium tracking-[0.04em] text-accent transition-colors duration-400 group-hover:border-accent"
            >
              {site.doctor.initials}
            </span>
            <span className="hidden font-display text-[0.9375rem] font-medium tracking-tight sm:block">
              {site.doctor.name}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {site.nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.href);
                    }}
                    className={cn(
                      'relative block rounded-full px-3.5 py-2 text-[0.875rem] transition-colors duration-400',
                      isActive ? 'text-fg' : 'text-muted hover:text-fg',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ duration: 0.5, ease: EASE_IN_OUT }}
                        className="absolute inset-0 -z-10 rounded-full bg-[var(--card-hover)]"
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors duration-400 hover:bg-[var(--card-hover)] hover:text-fg"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -60, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 60, scale: 0.7 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="grid place-items-center"
                >
                  {theme === 'dark' ? <Sun size={17} strokeWidth={1.6} /> : <Moon size={17} strokeWidth={1.6} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <Magnetic strength={0.2} className="hidden sm:inline-flex">
              <Button
                as="a"
                href="#contact"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  go('#contact');
                }}
                size="md"
                className="h-10 px-5 text-[0.875rem]"
              >
                Book Appointment
              </Button>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-9 w-9 place-items-center rounded-full text-fg transition-colors duration-400 hover:bg-[var(--card-hover)] lg:hidden"
            >
              {open ? <X size={19} strokeWidth={1.6} /> : <Menu size={19} strokeWidth={1.6} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="fixed inset-0 z-[95] bg-bg/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 pt-28 pb-10">
              <ul className="flex flex-col">
                {site.nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.06 + i * 0.05 }}
                    className="border-b border-[var(--border)]"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        go(item.href);
                      }}
                      className="flex items-baseline justify-between py-4 font-display text-[1.75rem] font-medium tracking-tight"
                    >
                      {item.label}
                      <span className="font-sans text-[0.6875rem] tracking-[0.2em] text-subtle">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.36 }}
                className="flex flex-col gap-3"
              >
                <Button
                  as="a"
                  href="#contact"
                  size="lg"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    go('#contact');
                  }}
                >
                  Book Appointment
                </Button>
                <Button as="a" href={site.contact.phoneHref} variant="secondary" size="lg">
                  {site.contact.phone}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
