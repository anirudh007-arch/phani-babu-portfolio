/**
 * The site's motion vocabulary — three values, used everywhere.
 *
 * Rules this encodes: no spring, no bounce, no overshoot. Durations stay in
 * the 400–900ms band and everything decelerates on the same curve, so
 * animations that happen at once read as a single movement rather than
 * several competing ones.
 */

/** The house curve — a long, quiet deceleration. Use for anything arriving. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** For anything that leaves and returns: accordions, panels, layout shifts. */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/**
 * Shared viewport config, so every section triggers at the same scroll depth.
 *
 * The bottom `-12%` is the taste part: content reveals once it is properly
 * into the viewport rather than the instant its first pixel appears.
 *
 * The enormous top margin is the correctness part. IntersectionObserver only
 * emits a callback when the intersection ratio *crosses* a threshold — so an
 * element that goes from below the viewport to above it in a single jump
 * never reports as intersecting, and with `once: true` it stays hidden
 * forever. That is not hypothetical: pressing End, clicking a footer anchor,
 * or a browser restoring scroll position on reload all skip whole sections,
 * and headings above the landing point would render permanently blank.
 *
 * Extending the root box upward makes "already scrolled past" count as in
 * view, which is what the visitor expects anyway. Content below the fold is
 * unaffected — it still waits for the -12% band.
 *
 * The value has to exceed the full page height (~15,000px here) or sections
 * far enough above the landing point fall outside the expanded root and stay
 * stuck anyway. 100,000px is "effectively infinite" for a single page.
 */
export const inView = { once: true, margin: '100000px 0px -12% 0px' } as const;
