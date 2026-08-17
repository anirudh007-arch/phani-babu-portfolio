# Image assets

Every path below is referenced from `src/content/site.ts`. Drop the files in
and they appear — no code changes needed. Until then each slot renders a
designed fallback surface rather than a broken image, so the site stays
presentable while photography is being produced.

## Required files

| Path | Ratio | Notes |
| --- | --- | --- |
| `dr-phani-babu-portrait.jpg` | 4:5 | Hero portrait. This is the **LCP image** — keep it under ~180KB. |
| `dr-phani-babu-clinic.jpg` | 4:5 | About section, working portrait. |
| `clinic/reception.jpg` | 4:3 | |
| `clinic/consultation.jpg` | 4:3 | |
| `clinic/operatory.jpg` | 4:3 | |
| `clinic/theatre.jpg` | 4:3 | |
| `clinic/lab.jpg` | 4:3 | |
| `clinic/sterilisation.jpg` | 4:3 | |
| `gallery/case-01-before.jpg` … `case-06-before.jpg` | 4:3 | |
| `gallery/case-01-after.jpg` … `case-06-after.jpg` | 4:3 | Must be framed identically to its `before`. |
| `testimonials/vikram-poster.jpg` | 16:9 | Video poster frame. |
| `testimonials/rahul-poster.jpg` | 16:9 | Video poster frame. |
| `../og-image.jpg` (in `/public`) | 1200×630 | Social share card. |
| `../apple-touch-icon.png` (in `/public`) | 180×180 | Then re-enable the link in `index.html`. |

## Before/after photography — non-negotiables

1. **Written, treatment-specific consent on file for every image.** Generic
   intake-form consent is not sufficient for publication.
2. **Identical capture conditions.** Same lens, distance, angle, lighting and
   retractor position for before and after. The slider makes any mismatch
   obvious and it reads as manipulation.
3. **No retouching.** No whitening in post, no skin smoothing, no colour
   grading applied to one frame and not the other.
4. **No stock or AI-generated imagery in the gallery, ever.** Presenting either
   as a real clinical outcome is misrepresentation, and it is the single
   fastest way to lose both a rich result and a licence.

## Format and size

- Ship `.webp` or `.avif` alongside `.jpg` where your host supports content
  negotiation; otherwise export progressive JPEG at quality ~78.
- Longest edge 1600px is plenty — the largest slot renders at ~55vw.
- Keep the hero portrait under 180KB and every other image under 250KB.
