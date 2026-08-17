import { useCallback, useId, useRef, useState } from 'react';
import { SmartImage } from '@/components/ui/SmartImage';
import { clamp, cn } from '@/lib/utils';

type BeforeAfterProps = {
  before: string;
  after: string;
  alt: string;
  ratio?: string;
  className?: string;
  initial?: number;
  priority?: boolean;
};

/**
 * Before/after comparator.
 *
 * The interaction is driven by a real `<input type="range">` sitting invisibly
 * over the image. That is what makes it keyboard-operable and announced
 * correctly by screen readers — a div with pointer handlers would look the
 * same and be unusable for anyone not holding a mouse. The visible handle is
 * decorative and follows the input's value.
 */
export function BeforeAfter({
  before,
  after,
  alt,
  ratio = '4/3',
  className,
  initial = 50,
  priority = false,
}: BeforeAfterProps) {
  const [position, setPosition] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const setFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100, 0, 100));
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'group relative overflow-hidden rounded-[1.5rem] border border-[var(--border)] select-none',
        className,
      )}
      onPointerDown={(e) => {
        // Ignore the range input's own pointer stream — it handles itself.
        if ((e.target as HTMLElement).tagName === 'INPUT') return;
        setDragging(true);
        setFromClientX(e.clientX);
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => dragging && setFromClientX(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      {/* AFTER — the full-bleed base layer. */}
      <SmartImage
        src={after}
        alt={`${alt} — after treatment`}
        ratio={ratio}
        priority={priority}
        sizes="(min-width: 1024px) 55vw, 92vw"
        className="rounded-none"
      />

      {/* BEFORE — clipped to the left of the handle. */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-hidden
      >
        <SmartImage
          src={before}
          alt=""
          ratio={ratio}
          priority={priority}
          sizes="(min-width: 1024px) 55vw, 92vw"
          className="h-full rounded-none"
        />
      </div>

      {/* Corner labels */}
      <span
        className="glass-dark pointer-events-none absolute top-4 left-4 rounded-full px-3 py-1.5 text-[0.6875rem] tracking-[0.16em] text-white uppercase"
        style={{ opacity: position > 12 ? 1 : 0, transition: 'opacity 400ms var(--ease-out-luxe)' }}
      >
        Before
      </span>
      <span
        className="glass-dark pointer-events-none absolute top-4 right-4 rounded-full px-3 py-1.5 text-[0.6875rem] tracking-[0.16em] text-white uppercase"
        style={{ opacity: position < 88 ? 1 : 0, transition: 'opacity 400ms var(--ease-out-luxe)' }}
      >
        After
      </span>

      {/* Divider + handle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-px bg-white/70 shadow-[0_0_18px_rgb(0_0_0/0.45)]"
        style={{ left: `${position}%` }}
      >
        <span
          className={cn(
            'absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center',
            'rounded-full border border-white/70 bg-black/25 backdrop-blur-md',
            'transition-transform duration-400 [transition-timing-function:var(--ease-out-luxe)]',
            dragging ? 'scale-110' : 'group-hover:scale-105',
          )}
        >
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" className="text-white">
            <path d="M5.5 1 1 6l4.5 5M12.5 1 17 6l-4.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* The accessible control. Invisible, full-bleed, fully functional. */}
      <label htmlFor={id} className="sr-only">
        {alt} — reveal before and after. Use the arrow keys to compare.
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-valuetext={`${Math.round(position)}% before, ${Math.round(100 - position)}% after`}
        className={cn(
          'absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent',
          'focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--accent-hi)]',
          '[&::-webkit-slider-thumb]:h-11 [&::-webkit-slider-thumb]:w-11 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:opacity-0',
          '[&::-moz-range-thumb]:h-11 [&::-moz-range-thumb]:w-11 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:opacity-0',
        )}
      />
    </div>
  );
}
