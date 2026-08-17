import clsx, { type ClassValue } from 'clsx';

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

/** Clamp helper used by the sliders and parallax maths. */
export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/** Linear interpolation, for frame-rate independent easing in rAF loops. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** 18000 → "18,000" using the site locale. */
export const formatNumber = (value: number) => new Intl.NumberFormat('en-IN').format(value);
