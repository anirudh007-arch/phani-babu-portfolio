import { useState } from 'react';
import { cn } from '@/lib/utils';

type SmartImageProps = {
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "4/5". Reserved up front so nothing shifts. */
  ratio?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  /** Short label shown on the designed fallback surface. */
  fallbackLabel?: string;
};

/**
 * Every image on the site goes through this component.
 *
 * Three jobs:
 *  1. Reserve the box via `aspect-ratio` so there is zero layout shift.
 *  2. Lazy-load and async-decode everything except the LCP image (`priority`).
 *  3. Degrade to a designed surface — not a broken-image icon — when an asset
 *     has not been supplied yet. The site therefore looks intentional before
 *     the real clinical photography is dropped into /public/images.
 */
export function SmartImage({
  src,
  alt,
  ratio = '4/5',
  className,
  imgClassName,
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  fallbackLabel,
}: SmartImageProps) {
  // An empty src would make the browser re-request the current page URL, so
  // a missing path goes straight to the fallback surface without an <img>.
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(src ? 'loading' : 'error');

  return (
    <div
      className={cn('relative overflow-hidden bg-bg-2', className)}
      style={{ aspectRatio: ratio }}
    >
      {/* Resting surface: visible while loading, and permanently on error. */}
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 transition-opacity duration-700 [transition-timing-function:var(--ease-out-luxe)]',
          'bg-[radial-gradient(120%_90%_at_30%_10%,var(--bg-3),var(--bg-2)_60%,var(--bg)_100%)]',
          status === 'loaded' ? 'opacity-0' : 'opacity-100',
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_85%,var(--glow),transparent_70%)]" />
        {status === 'error' && fallbackLabel && (
          <div className="absolute inset-0 grid place-items-center px-6">
            <span className="text-center font-display text-[0.8125rem] tracking-[0.16em] text-subtle uppercase">
              {fallbackLabel}
            </span>
          </div>
        )}
      </div>

      {src && (
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        draggable={false}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={cn(
          'absolute inset-0 h-full w-full object-cover',
          'transition-[opacity,transform,filter] duration-900 [transition-timing-function:var(--ease-out-luxe)]',
          status === 'loaded' ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-lg scale-[1.03]',
          imgClassName,
        )}
      />
      )}
    </div>
  );
}
