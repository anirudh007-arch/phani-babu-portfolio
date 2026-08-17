import { useEffect, useRef } from 'react';
import { MessageCircle, ScanLine, ClipboardList, Stethoscope, HeartPulse, CalendarCheck } from 'lucide-react';
import { site } from '@/content/site';
import { SectionHeading } from '@/components/ui/SectionHeading';

const ICONS = [MessageCircle, ScanLine, ClipboardList, Stethoscope, HeartPulse, CalendarCheck];

export function Process() {
  const root = useRef<HTMLDivElement>(null);

  /**
   * GSAP rather than Framer Motion here, deliberately: this is one
   * scroll-scrubbed line draw plus six independently triggered nodes, and the
   * line runs vertically on mobile but horizontally on desktop.
   * `gsap.matchMedia` expresses that split cleanly and tears the desktop
   * timeline down on resize; ScrollTrigger keeps it all on a single shared
   * scroll listener instead of six viewport observers.
   *
   * GSAP is imported dynamically so its ~113KB never sits on the critical
   * path — this section is well below the fold, and the static markup below
   * is already correct without it.
   */
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const fill = root.current?.querySelector<HTMLElement>('[data-track-fill]');
        const nodes = gsap.utils.toArray<HTMLElement>('[data-process-node]');
        if (!fill) return;

        gsap.matchMedia().add(
          {
            reduced: '(prefers-reduced-motion: reduce)',
            horizontal: '(prefers-reduced-motion: no-preference) and (min-width: 1024px)',
            vertical: '(prefers-reduced-motion: no-preference) and (max-width: 1023.98px)',
          },
          (context) => {
            const { reduced, horizontal } = context.conditions as Record<string, boolean>;

            if (reduced) {
              gsap.set(fill, { scaleX: 1, scaleY: 1 });
              nodes.forEach((n) => n.classList.add('is-active'));
              return;
            }

            const axis = horizontal ? 'scaleX' : 'scaleY';
            gsap.set(fill, { transformOrigin: horizontal ? 'left center' : 'center top', [axis]: 0 });

            gsap.to(fill, {
              [axis]: 1,
              ease: 'none',
              scrollTrigger: { trigger: root.current, start: 'top 72%', end: 'bottom 78%', scrub: 0.6 },
            });

            nodes.forEach((node) => {
              ScrollTrigger.create({
                trigger: node,
                start: 'top 82%',
                once: true,
                onEnter: () => {
                  node.classList.add('is-active');
                  const icon = node.querySelector<HTMLElement>('[data-node-icon]');
                  const body = node.querySelector<HTMLElement>('[data-node-body]');
                  if (icon) {
                    gsap.fromTo(
                      icon,
                      { scale: 0.7, opacity: 0 },
                      { scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out' },
                    );
                  }
                  if (body) {
                    gsap.fromTo(
                      body,
                      { y: 20, opacity: 0 },
                      { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: 0.08 },
                    );
                  }
                },
              });
            });
          },
        );
      }, root);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section id="process" aria-labelledby="process-heading" className="relative z-10 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="process-heading"
          eyebrow={site.process.eyebrow}
          heading={['Six steps. No surprises', 'in any of them.']}
          lead={site.process.lead}
        />

        <div ref={root} className="process relative mt-16">
          {/* Track — vertical on mobile, horizontal from `lg` up. */}
          <div
            aria-hidden
            className="absolute top-0 left-[1.4375rem] h-full w-px bg-[var(--border)] lg:top-[1.4375rem] lg:left-0 lg:h-px lg:w-full"
          >
            <div
              data-track-fill
              className="h-full w-full bg-gradient-to-b from-accent to-accent-hi lg:bg-gradient-to-r"
            />
          </div>

          <ol className="grid gap-10 lg:grid-cols-6 lg:gap-6">
            {site.process.steps.map((step, i) => {
              const Icon = ICONS[i] ?? MessageCircle;
              return (
                <li key={step.id} data-process-node className="relative flex gap-5 lg:flex-col lg:gap-0">
                  <span
                    data-node-icon
                    className="node-icon relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-bg text-subtle"
                  >
                    <Icon size={18} strokeWidth={1.5} aria-hidden />
                    <span className="node-halo absolute inset-0 rounded-full bg-accent/12 opacity-0" />
                  </span>

                  <div data-node-body className="lg:mt-6 lg:pr-4">
                    <div className="flex items-baseline gap-3">
                      <span className="font-sans text-[0.6875rem] tracking-[0.16em] text-accent tabular-nums">
                        0{i + 1}
                      </span>
                      <h3 className="font-display text-[1.125rem] font-medium tracking-[-0.02em]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-[0.75rem] tracking-[0.06em] text-subtle uppercase">
                      {step.duration}
                    </p>
                    <p className="mt-3 max-w-sm text-[0.875rem] leading-[1.7] text-muted lg:max-w-none">
                      {step.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <style>{`
        .process [data-process-node] .node-icon {
          transition: border-color 700ms var(--ease-out-luxe), color 700ms var(--ease-out-luxe);
        }
        .process [data-process-node].is-active .node-icon {
          border-color: color-mix(in oklab, var(--accent) 50%, transparent);
          color: var(--accent);
        }
        .process [data-process-node] .node-halo {
          transition: opacity 700ms var(--ease-out-luxe);
        }
        .process [data-process-node].is-active .node-halo {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
