# Dr. Phani Babu — Denteazee Dental Clinic

A single-page portfolio site for a cosmetic and implant dentist. Dark and light
themes, motion throughout, and no content hardcoded in a component.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production bundle into dist/
npm run preview    # serve dist/ locally
npm run typecheck
```

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | React 19 + TypeScript (strict) | — |
| Build | Vite 8 | |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) | Tokens live in `src/index.css`, not a JS config |
| Animation | Framer Motion | Every reveal, accordion, modal and parallax |
| Scroll timeline | GSAP + ScrollTrigger | One section only — see below |
| Smooth scroll | Lenis | Disabled under `prefers-reduced-motion` |
| Icons | lucide-react | |

### Two deliberate departures from the brief

**No Three.js / R3F / Spline.** The hero's ambient particles are a ~90-line 2D
canvas (`src/components/ui/ParticleField.tsx`). A WebGL runtime would have
added roughly 150KB of JavaScript plus a GPU context to draw forty blurred
dots. The visual result is the same and the performance budget is not. If a
genuine 3D element is wanted later (a tooth model, a clinic flythrough), that
is the point at which R3F earns its weight — drop it in behind a dynamic
import so it stays off the critical path.

**GSAP is used in exactly one place** — the treatment timeline in
`src/sections/Process.tsx` — where a single scroll-scrubbed line draw feeds six
independently triggered nodes and the axis flips between mobile and desktop.
`gsap.matchMedia` handles that cleanly on one shared scroll listener. It is
loaded by dynamic `import()`, so its 113KB never touches the critical path.

## Content

**All copy, statistics, credentials, testimonials, contact details and image
paths live in `src/content/site.ts`.** Nothing is hardcoded in a component.
Editing that one file changes the site.

Values that are professionally plausible drafts rather than sourced facts are
marked `// VERIFY`. **Read `CONTENT-CHECKLIST.md` before this goes live** —
publishing unverified credentials or patient outcomes for a practising
clinician is a regulatory problem, not a copywriting one.

## Images

None are included. Drop files into `public/images/` per the table in
`public/images/README.md` and they appear — no code changes. Until then every
slot renders a designed fallback surface rather than a broken-image icon, so
the site stays presentable while photography is produced.

`SmartImage` reserves each box with `aspect-ratio` before load, so adding real
images causes zero layout shift.

## Architecture

```
src/
  content/site.ts        Every string and number on the site
  index.css              Design tokens, both themes, base + component layers
  lib/
    motion.ts            Two easing curves and one viewport config — the whole
                         motion vocabulary
    utils.ts             cn, clamp, lerp, number formatting
  hooks/
    useSmoothScroll.ts   Lenis lifecycle + scrollToSection (moves focus too)
    useTheme.ts          Reads the pre-paint theme, syncs html/colorScheme
    useCountUp.ts        rAF counter that fires on enter
    useActiveSection.ts  IntersectionObserver band for nav state
    useMediaQuery.ts     useFinePointer for hover-capable devices
  components/
    Preloader.tsx        The 1.5s entrance
    Navigation.tsx       Floating glass bar, shrinks on scroll, mobile sheet
    ExpertiseGlyph.tsx   Seven generated SVG line-art motifs
    ui/                  Button, Modal, SmartImage, TextReveal, SectionHeading,
                         Magnetic, Cursor, ScrollProgress, Atmosphere,
                         ParticleField
  sections/              One file per section, in page order
```

### Design tokens

Components never reference a raw hex. `src/index.css` defines semantic
variables (`--bg`, `--fg`, `--accent`, `--card`, `--border`…) and the light
theme swaps the values underneath. Tailwind maps them via `@theme inline`, so
`bg-bg`, `text-muted`, `border-line` all follow the theme automatically.

The accent darkens from `#B58B4A` to `#8A6428` in light mode — the brand gold
does not clear 4.5:1 as text on a light surface.

### Motion

`src/lib/motion.ts` holds two cubic-béziers and one viewport config, and that
is the entire vocabulary. No springs, no bounce, no overshoot; durations sit
between 400ms and 900ms. `prefers-reduced-motion` is honoured in three layers:
Framer's `useReducedMotion` in components, a CSS block for keyframe animations
Framer does not own, and Lenis simply not starting.

## Accessibility

- Skip link; visible focus ring on every interactive element.
- Modals trap Tab, restore focus to the trigger on close, and exit on Escape.
- Accordions use `aria-expanded` / `aria-controls` with `role="region"` panels.
- Anchor navigation moves keyboard focus to the target section, not just the
  viewport.
- The duplicated marquee row is `inert`, so its buttons stay out of the tab
  order rather than merely hidden from assistive tech.
- The custom cursor only replaces the native one for fine pointers, and never
  under reduced motion.

## SEO

- `Physician`, `Dentist`/`MedicalClinic` and `WebSite` JSON-LD in `index.html`.
- `FAQPage` JSON-LD generated from `site.faq` at render, so the markup and the
  visible accordion cannot drift apart.
- Open Graph and Twitter cards, canonical URL, `robots.txt`, `sitemap.xml`.

Replace every `https://drphanibabu.com` with the real domain before launch —
`index.html`, `robots.txt` and `sitemap.xml`.

## Performance notes

Entry chunks are React, Framer Motion and app code; GSAP loads on demand.
`ParticleField` stops its rAF loop when the hero scrolls out of view or the tab
is hidden. The Google Maps iframe is only mounted once it is about to enter the
viewport. The theme is applied before first paint by an inline script, so there
is no flash of the wrong background.

Fonts (Inter, General Sans) currently load from Google Fonts and Fontshare.
**Self-host them** before chasing a Lighthouse performance score — two extra
origins on the critical path is the largest remaining win.
