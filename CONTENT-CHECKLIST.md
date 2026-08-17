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

- [x] **Phone number** — updated to `+91 95001 35566`, sourced from
      denteazeedentalclinic.in and cross-checked against the address on
      indiadental.co.in. Still worth one direct confirmation call.
- [ ] **WhatsApp number** — set to the same number as the phone above
      (`contact.whatsappHref`); confirm WhatsApp is actually active on it.
- [ ] **Email** — still the placeholder `care@denteazee.com`
      (`contact.email`, `contact.emailHref`). The clinic's own site lists
      `drphanibabu@gmail.com` — decide whether to use that or a dedicated
      clinic address before launch.
- [x] **Street address** — updated to `25, Besant Avenue Road, Opposite
      Hotel Esthell, Adyar, Chennai, Tamil Nadu 600020`, in
      `contact.addressLines` and the `PostalAddress` block in `index.html`.
      This corrected the clinic's **city** from the placeholder Hyderabad —
      check every remaining page for a Hyderabad reference if more content
      is added later.
- [x] **Google Maps** — `contact.mapsUrl` and `contact.mapsEmbed` now query
      the real address above.
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
- [x] `hero.trustline` — city corrected to Chennai to match the real address;
      the "over a decade" claim and the review profile it references still
      need confirming

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

## 5. Smile gallery — removed

The before/after smile gallery section has been removed from the site
entirely (component, nav link, hero CTA, and content data). If it's added
back later, its consent and photography requirements were the highest-risk
item on this list — re-review them before shipping any before/after imagery.

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
- [ ] `team.members` — Dr. Vimalageetha's credentials (BDS, MDS) and listed
      specialties (Pediatric Dentist, Dental Implantologist, Laser Gum
      Specialist, Cosmetic Dentist, Root Canal Specialist) were supplied
      directly and should still be checked against her actual registration
      before publishing. The section heading/lead copy is drafted and can be
      replaced with her own bio if she wants one.

## 7. Assets

See `public/images/README.md` for the full file table.

- [ ] Hero portrait (this is the LCP image — keep it under ~180KB)
- [ ] About portrait
- [ ] Dr. Vimalageetha's portrait for the Team section
- [ ] Six clinic space photographs
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
