import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium ' +
  'whitespace-nowrap select-none isolate ' +
  'transition-[transform,box-shadow,background-color,border-color,color] duration-400 ' +
  '[transition-timing-function:var(--ease-out-luxe)] ' +
  'hover:-translate-y-0.5 active:translate-y-0 active:duration-100 ' +
  'disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: cn(
    'bg-accent text-white',
    // Light theme keeps the same warm gold but needs white text to stay legible.
    'shadow-[0_1px_0_rgb(255_255_255/0.18)_inset,0_10px_30px_-12px_var(--glow)]',
    'hover:shadow-[0_1px_0_rgb(255_255_255/0.22)_inset,0_18px_46px_-14px_var(--glow)]',
    'hover:bg-accent-hi dark:hover:bg-accent-hi',
  ),
  secondary: cn(
    'glass text-fg',
    'hover:bg-[var(--card-hover)] hover:border-[var(--border-hi)]',
    'shadow-[0_10px_30px_-18px_rgb(0_0_0/0.6)]',
    'hover:shadow-[0_18px_44px_-20px_rgb(0_0_0/0.7)]',
  ),
  ghost: 'text-muted hover:text-fg',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-[3.25rem] px-7 text-base',
};

type ButtonProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

/**
 * The one button in the system. Renders as `<button>` by default, or as any
 * element via `as` — anchors keep full styling without duplicating classes.
 */
export function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...rest
}: ButtonProps<T>) {
  const Tag = (as ?? 'button') as ElementType;

  return (
    <Tag className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {/* Soft specular glow that fades in on hover, behind the label. */}
      {variant !== 'ghost' && (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0',
            'transition-opacity duration-500 [transition-timing-function:var(--ease-out-luxe)]',
            'group-hover:opacity-100',
            'bg-[radial-gradient(80%_140%_at_50%_120%,var(--glow),transparent_70%)]',
          )}
        />
      )}
      {children}
    </Tag>
  );
}
