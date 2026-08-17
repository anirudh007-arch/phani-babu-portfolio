import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Play, Star, BadgeCheck } from 'lucide-react';
import { site, type Testimonial } from '@/content/site';
import { EASE_OUT, inView } from '@/lib/motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SmartImage } from '@/components/ui/SmartImage';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';

function Stars({ rating, delay = 0 }: { rating: number; delay?: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={inView}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: delay + i * 0.06 }}
        >
          <Star
            size={13}
            strokeWidth={0}
            className={cn(i < rating ? 'fill-accent text-accent' : 'fill-transparent text-subtle')}
          />
        </motion.span>
      ))}
    </span>
  );
}

function Card({ item, onPlay }: { item: Testimonial; onPlay: (t: Testimonial) => void }) {
  return (
    <article
      className={cn(
        'flex w-[19rem] shrink-0 flex-col justify-between rounded-[1.5rem] p-6 sm:w-[23rem]',
        'border border-[var(--border)] bg-[var(--card)] backdrop-blur-[var(--blur-glass)]',
        'transition-[transform,border-color,background-color,box-shadow] duration-500',
        '[transition-timing-function:var(--ease-out-luxe)]',
        'hover:-translate-y-1 hover:border-[var(--border-hi)] hover:bg-[var(--card-hover)]',
        'hover:shadow-[0_28px_60px_-32px_rgb(0_0_0/0.75)]',
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-4">
          <Stars rating={item.rating} />
          <span className="flex items-center gap-1.5 text-[0.6875rem] tracking-[0.1em] text-subtle uppercase">
            <BadgeCheck size={13} strokeWidth={1.6} className="text-accent" aria-hidden />
            {item.source}
          </span>
        </div>

        <blockquote className="mt-5 text-[0.9375rem] leading-[1.7] text-fg/90">“{item.quote}”</blockquote>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-[var(--border)] pt-5">
        <div>
          <p className="text-[0.9375rem] font-medium">{item.name}</p>
          <p className="mt-0.5 text-[0.8125rem] text-subtle">{item.context}</p>
        </div>

        {item.video && (
          <button
            type="button"
            onClick={() => onPlay(item)}
            className="group/play flex shrink-0 items-center gap-2 rounded-full border border-[var(--border)] py-1.5 pr-3.5 pl-2 text-[0.75rem] text-muted transition-colors duration-400 hover:border-accent/50 hover:text-fg"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-white">
              <Play size={10} strokeWidth={0} className="ml-px fill-current" />
            </span>
            Watch
          </button>
        )}
      </div>
    </article>
  );
}

function Marquee({
  items,
  reverse,
  duration,
  onPlay,
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration: number;
  onPlay: (t: Testimonial) => void;
}) {
  const prefersReduced = useReducedMotion();

  // Under reduced motion the rail stops animating and becomes an ordinary
  // horizontal scroller — the content stays fully reachable either way.
  if (prefersReduced) {
    return (
      <div className="no-scrollbar mask-fade-x flex gap-5 overflow-x-auto pb-2">
        {items.map((item) => (
          <Card key={item.id} item={item} onPlay={onPlay} />
        ))}
      </div>
    );
  }

  return (
    <div className="mask-fade-x group/marquee relative overflow-hidden">
      <div
        className="flex w-max gap-5"
        style={{
          animation: `marquee-${reverse ? 'rev' : 'fwd'} ${duration}s linear infinite`,
        }}
      >
        {[0, 1].map((copy) => (
          // The second copy exists only to make the loop seamless. `inert`
          // (not just aria-hidden) is what keeps its Watch buttons out of the
          // tab order — hiding focusable content from AT alone is a violation.
          <div key={copy} className="flex gap-5" aria-hidden={copy === 1} inert={copy === 1}>
            {items.map((item) => (
              <Card key={`${copy}-${item.id}`} item={item} onPlay={onPlay} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const [playing, setPlaying] = useState<Testimonial | null>(null);

  const half = Math.ceil(site.testimonials.length / 2);
  const rowOne = site.testimonials.slice(0, half);
  const rowTwo = site.testimonials.slice(half);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative z-10 overflow-hidden py-24 sm:py-32"
    >
      <div className="shell">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Patient Voices"
          heading={['What people say', 'once they are no longer nervous.']}
          lead="Unedited reviews from Google and Practo, plus a few patients who agreed to say it on camera."
          align="center"
        />

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 }}
          className="mx-auto mt-10 flex w-fit flex-wrap items-center justify-center gap-x-7 gap-y-4 rounded-full border border-[var(--border)] bg-[var(--card)] px-7 py-4 backdrop-blur-[var(--blur-glass)]"
        >
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl font-medium tracking-tight tabular-nums">
              {site.reviewSummary.rating}
            </span>
            <div>
              <Stars rating={5} delay={0.3} />
              <p className="mt-1 text-[0.75rem] text-subtle">
                {site.reviewSummary.count}+ {site.reviewSummary.platform} reviews
              </p>
            </div>
          </div>
          <span aria-hidden className="hidden h-8 w-px bg-[var(--border)] sm:block" />
          <p className="text-[0.8125rem] text-muted">
            Every review below is reproduced verbatim, with permission.
          </p>
        </motion.div>
      </div>

      {/* Rails — deliberately outside `.shell` so they bleed to the edges. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={inView}
        transition={{ duration: 1, ease: EASE_OUT, delay: 0.2 }}
        className="mt-14 flex flex-col gap-5"
      >
        <Marquee items={rowOne} duration={64} onPlay={setPlaying} />
        <Marquee items={rowTwo} duration={78} reverse onPlay={setPlaying} />
      </motion.div>

      <style>{`
        @keyframes marquee-fwd {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(calc(-50% - 0.625rem), 0, 0); }
        }
        @keyframes marquee-rev {
          from { transform: translate3d(calc(-50% - 0.625rem), 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }
        /* Pause on hover and whenever a card inside receives keyboard focus. */
        .group\\/marquee:hover > div,
        .group\\/marquee:focus-within > div {
          animation-play-state: paused;
        }
      `}</style>

      {/* Video testimonial */}
      <AnimatePresence>
        {playing && (
          <Modal onClose={() => setPlaying(null)} label={`Video testimonial from ${playing.name}`}>
            <div className="relative">
              {/* Poster stands in until the file loads, and remains if it is absent. */}
              <div className="absolute inset-0 -z-10">
                <SmartImage
                  src={playing.poster ?? ''}
                  alt=""
                  ratio="16/9"
                  fallbackLabel={`${playing.name} — video testimonial`}
                  className="rounded-t-[1.75rem]"
                />
              </div>
              <video
                key={playing.id}
                src={playing.video}
                poster={playing.poster}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="aspect-video w-full rounded-t-[1.75rem] bg-black object-cover"
              />
              {/* Add a <track kind="captions" srcLang="en" src="…​.vtt" /> per video
                  once caption files exist. An empty track element is worse than
                  none — it advertises captions that are not there. */}
            </div>
            <div className="p-6 sm:p-8">
              <Stars rating={playing.rating} />
              <blockquote className="mt-4 font-display text-[1.125rem] leading-[1.6] font-medium tracking-[-0.015em] sm:text-[1.25rem]">
                “{playing.quote}”
              </blockquote>
              <p className="mt-4 text-[0.875rem] text-subtle">
                {playing.name} · {playing.context}
              </p>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}
