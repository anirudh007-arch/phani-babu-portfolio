# Pre-launch content checklist

The site is built and complete. What follows is the content that I could not
source and therefore drafted — every item below has to be replaced with a
verified value or deleted before this is published.

This matters more than usual here. The site presents a named, practising
clinician. Publishing invented credentials, statistics or patient outcomes is
not a copy problem; in India it engages the Dentists Act / State Dental Council
advertising norms and consumer-protection law, and it is the fastest way to
lose both a Google rich result and a licence. Everything is in one file —
`src/content/site.ts` — and every drafted field is marked `// VERIFY`.

The layout is built to stay correct with fewer items, so **deleting** an
unverifiable entry is always a safe option.

---

## 1. Blocking — must be replaced

- [ ] **Phone number** — currently `+91 00000 00000` (`contact.phone`,
      `contact.phoneHref`, and the `telephone` field in `index.html` schema)
- [ ] **WhatsApp number** — `contact.whatsappHref` (appears twice in the URL)
- [ ] **Email** — `care@denteazee.com` (`contact.email`, `contact.emailHref`)
- [ ] **Street address** — `contact.addressLines` and the `PostalAddress` block
      in `index.html`. Currently a placeholder Jubilee Hills address.
- [ ] **Google Maps** — `contact.mapsUrl` and `contact.mapsEmbed` currently
      point at a general Hyderabad area, not the clinic
- [ ] **Domain** — replace every `https://drphanibabu.com` in `index.html`,
      `public/robots.txt` and `public/sitemap.xml`
- [ ] **Consulting hours** — `contact.hours` and the
      `openingHoursSpecification` in `index.html`
- [ ] **Social links** — `site.social`; delete any account that does not exist
- [ ] **Legal pages** — `footer.legal` links to `/privacy`, `/terms`,
      `/patient-rights`, none of which exist yet

## 2. Statistics — every number must reconcile to clinic records

`site.stats`. These are the first thing a visitor reads and the easiest thing
to be challenged on.

- [ ] 14+ years in practice (and the "since 2011" detail line)
- [ ] 18,000+ patients treated
- [ ] 2,400+ smile makeovers
- [ ] 5,200+ dental implants
- [ ] 11 certifications
- [ ] 6 awards & honours
- [ ] `hero.trustline` — "Trusted by families across Hyderabad for over a decade"

## 3. Credentials — each needs a certificate, DOI or invitation on file

`site.achievements.groups`. **Fellowships, publications, speaking engagements
and memberships are all invented placeholders.** Delete every one you cannot
evidence.

- [ ] Fellowships & certifications (4 drafted)
- [ ] Publications (3 drafted, with invented journal names)
- [ ] Teaching & speaking (4 drafted)
- [ ] Memberships (4 drafted)

## 4. Reviews and testimonials

`site.testimonials` and `site.reviewSummary`.

- [ ] Rating of 4.9 and count of 640+ must match the live Google Business
      Profile, and should be re-checked periodically
- [ ] All eight testimonials are written, not collected. Replace with real
      reviews reproduced **verbatim**, or remove.
- [ ] Patient names: use the form the patient consented to. If they consented
      to a first name and initial, do not expand it.
- [ ] Two entries reference video files (`/videos/testimonial-*.mp4`) that do
      not exist. Supply them, or delete the `video` and `poster` fields — the
      card renders correctly without them.
- [ ] Add caption files for any video published (see the note in
      `src/sections/Testimonials.tsx`)

## 5. Smile gallery — the highest-risk section

`site.gallery.items`. Six cases are described, with patient quotes.

- [ ] Written, **treatment-specific** consent on file for every image
      published. Generic intake-form consent is not sufficient.
- [ ] Before and after shot under identical conditions — same lens, distance,
      angle, lighting, retractor position
- [ ] No retouching of either frame
- [ ] **No stock or AI-generated imagery, ever.** Presenting either as a real
      clinical outcome is misrepresentation.
- [ ] Case descriptions, durations and patient descriptors match the actual
      records
- [ ] Patient quotes are real and consented to

## 6. Biography and clinical claims

- [ ] `about.body` — the career narrative (public hospital start, founding
      story, teaching, calling surgical patients) is drafted and must be
      confirmed or rewritten by Dr. Phani Babu
- [ ] `about.pullQuote` — attributed to him by name; he must actually endorse it
- [ ] `about.values` — includes operational promises ("price quoted once",
      "post-operative concerns reach the treating dentist directly"). The
      clinic must be willing and able to honour each one.
- [ ] `expertise[*].benefits` — includes specific commitments such as
      "ceramics guaranteed for 10 years" and "retainers included for 2 years".
      Confirm each against the actual warranty terms.
- [ ] `faq` — the answer on implant survival cites ">95% at ten years". Keep a
      citation on file, or soften the claim.
- [ ] `clinic.technology` — confirm the clinic actually has each listed item
      (CBCT, intraoral scanner, CAD/CAM mill, surgical microscope, soft-tissue
      laser, Class B autoclaves)

## 7. Assets

See `public/images/README.md` for the full file table.

- [ ] Hero portrait (this is the LCP image — keep it under ~180KB)
- [ ] About portrait
- [ ] Six clinic space photographs
- [ ] Twelve gallery images (six before/after pairs)
- [ ] `og-image.jpg` at 1200×630
- [ ] `apple-touch-icon.png` at 180×180, then re-enable its link in `index.html`

## 8. Recommended before launch

- [ ] Self-host Inter and General Sans instead of loading from Google Fonts and
      Fontshare — two extra origins on the critical path is the biggest
      remaining performance win
- [ ] Run Lighthouse against the production build with real images in place;
      the layout reserves space for every image, so scores should hold
- [ ] Confirm the site's claims against your State Dental Council's advertising
      guidance — some states restrict superlatives and before/after imagery
      more tightly than others
