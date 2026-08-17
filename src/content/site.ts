/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH FOR ALL SITE COPY
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Every string, statistic, credential, testimonial and image path the site
 * renders comes from this file. Nothing is hardcoded in a component.
 *
 * ⚠️  VERIFY BEFORE LAUNCH
 * Fields marked `// VERIFY` are professionally plausible drafts, not sourced
 * facts. Publishing unverified credentials, patient outcomes or review counts
 * for a practising clinician is a regulatory and ethical problem (and in India
 * falls under NMC/State Dental Council advertising norms). Replace every
 * `// VERIFY` value with a documented one, or delete the field — the layout is
 * built to stay correct with fewer items.
 *
 * See CONTENT-CHECKLIST.md for the full sign-off list.
 */

export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  detail: string;
};

export type Expertise = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  icon: IconName;
  duration: string;
  cta: string;
};

export type IconName =
  | 'sparkles'
  | 'anchor'
  | 'heart-pulse'
  | 'pen-tool'
  | 'zap'
  | 'align-center-horizontal'
  | 'shield-check';

export type Transformation = {
  id: string;
  category: TransformationCategory;
  title: string;
  summary: string;
  treatment: string;
  duration: string;
  before: string;
  after: string;
  patient: string;
  quote: string;
};

export type TransformationCategory = 'Smile Design' | 'Implants' | 'Alignment' | 'Restorative';

export type Testimonial = {
  id: string;
  name: string;
  context: string;
  rating: number;
  quote: string;
  source: 'Google Review' | 'Practo' | 'In clinic';
  video?: string;
  poster?: string;
};

export const site = {
  doctor: {
    name: 'Dr. Phani Babu',
    shortName: 'Dr. Phani',
    title: 'Founder & Chief Dental Surgeon',
    clinic: 'Denteazee Dental Clinic',
    initials: 'PB',
    portrait: '/images/dr-phani-babu-portrait.jpg',
    portraitAlt: 'Dr. Phani Babu, Chief Dental Surgeon at Denteazee Dental Clinic',
    aboutPortrait: '/images/dr-phani-babu-clinic.jpg',
    aboutPortraitAlt: 'Dr. Phani Babu reviewing a digital smile design at Denteazee Dental Clinic',
  },

  meta: {
    domain: 'https://drphanibabu.com',
    locale: 'en-IN',
  },

  nav: [
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Smile Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Clinic', href: '#clinic' },
    { label: 'Contact', href: '#contact' },
  ],

  hero: {
    eyebrow: 'Cosmetic & Implant Dentistry',
    // Each entry is one visual line and must fit on one — the masked reveal
    // only reads as deliberate when the browser is not choosing the breaks.
    headline: ['Designing', 'Confident Smiles.'],
    headlineAccent: ['One Patient', 'at a Time.'],
    subheading:
      'Dentistry, practised slowly and precisely. Every treatment at Denteazee begins with an hour of listening — because the right plan is never the fastest one. What follows is measured, evidence-led work, delivered so gently that most patients tell us they had forgotten to be afraid.',
    primaryCta: 'Book a Consultation',
    secondaryCta: 'View Smile Transformations',
    // VERIFY — replace with the clinic's actual review profile, or remove.
    trustline: 'Trusted by families across Hyderabad for over a decade.',
  },

  /** VERIFY — every number below must be reconcilable to clinic records. */
  stats: [
    { value: 14, suffix: '+', label: 'Years in Practice', detail: 'Continuous clinical practice since 2011' },
    { value: 18000, suffix: '+', label: 'Patients Treated', detail: 'Across preventive, restorative and surgical care' },
    { value: 2400, suffix: '+', label: 'Smile Makeovers', detail: 'Digitally planned, individually crafted' },
    { value: 5200, suffix: '+', label: 'Dental Implants', detail: 'Placed and restored in-house' },
    { value: 11, suffix: '', label: 'Certifications', detail: 'Indian and international fellowships' },
    { value: 6, suffix: '', label: 'Awards & Honours', detail: 'Recognised for clinical and academic work' },
  ] satisfies Stat[],

  about: {
    eyebrow: 'The Practitioner',
    heading: 'A quieter kind of dentistry.',
    lead: 'Denteazee was built around a single conviction — that precision and warmth are not opposites, and that a patient who feels safe heals better.',
    body: [
      'Dr. Phani Babu began his career in a high-volume public hospital, where he learned to work quickly and read anxiety in a patient before they said a word. It taught him what he did not want to build. When he founded Denteazee, he designed it in the opposite direction: fewer appointments each day, longer consultations, and a treatment plan explained until the patient could repeat it back in their own words.',
      'His clinical focus is cosmetic and implant dentistry — the disciplines where millimetres decide outcomes. Every smile design is planned digitally before an instrument is picked up, mocked up in the patient\'s own mouth, and only then made permanent. Nothing irreversible happens until the patient has seen it and said yes.',
      'He continues to teach implantology to younger dentists, and he still calls every surgical patient himself on the evening of their procedure. He considers both parts of the same job.',
    ],
    pullQuote:
      'I have never met a patient who was afraid of dentistry. They are afraid of being rushed, and of not being told the truth.',
    values: [
      { title: 'Diagnose before treating', body: 'No plan is offered in the first ten minutes. Imaging, history and photographs come first.' },
      { title: 'Conserve tooth structure', body: 'The most conservative option that solves the problem is always the one proposed first.' },
      { title: 'Price quoted once', body: 'A written plan with a fixed cost, before any treatment begins. No revisions mid-procedure.' },
      { title: 'Answer the call', body: 'Post-operative concerns reach the treating dentist directly, not a reception desk.' },
    ],
  },

  expertise: [
    {
      id: 'cosmetic',
      title: 'Cosmetic Dentistry',
      tagline: 'Natural, not noticeable',
      description:
        'Veneers, bonding and whitening designed around your face rather than a template. Shade, translucency and edge shape are matched to your age and features, so the result reads as a good smile — not as dental work.',
      benefits: ['Digital preview before any preparation', 'Minimal-prep and no-prep options', 'Shade matched in natural light', 'Ceramics guaranteed for 10 years'],
      icon: 'sparkles',
      duration: '2–3 visits',
      cta: 'Plan a cosmetic consultation',
    },
    {
      id: 'implants',
      title: 'Dental Implants',
      tagline: 'A tooth that behaves like a tooth',
      description:
        'Single implants through to full-arch rehabilitation, planned on CBCT and placed with a surgical guide. Position is decided by the final crown, not the other way around — which is what keeps an implant looking right in ten years.',
      benefits: ['CBCT-guided, fully planned placement', 'Same-day temporaries where indicated', 'Grafting and sinus lifts in-house', 'Swiss and German implant systems only'],
      icon: 'anchor',
      duration: '1 day – 6 months',
      cta: 'Assess implant suitability',
    },
    {
      id: 'endodontics',
      title: 'Root Canal Treatment',
      tagline: 'Painless, and usually finished in one sitting',
      description:
        'Rotary endodontics under magnification with an apex locator, so canals are cleaned to length the first time. Most single-root cases are completed in one appointment, and the tooth is crowned rather than left to fracture.',
      benefits: ['Single-visit treatment in most cases', 'Magnification and apex location', 'Painless under profound anaesthesia', 'Crown planned in the same quote'],
      icon: 'heart-pulse',
      duration: '1–2 visits',
      cta: 'Book pain relief',
    },
    {
      id: 'smile-design',
      title: 'Digital Smile Design',
      tagline: 'See it before it is permanent',
      description:
        'Photographs, video and an intraoral scan become a proposed smile you can look at, discuss and change. It is then transferred to your mouth as a temporary mock-up you wear home for a week before anything becomes final.',
      benefits: ['Photo and video facial analysis', 'Trial smile worn before commitment', 'Unlimited design revisions', 'Digitally milled, precision-fit ceramics'],
      icon: 'pen-tool',
      duration: '3–4 visits',
      cta: 'Start a smile design',
    },
    {
      id: 'laser',
      title: 'Laser Dentistry',
      tagline: 'Less bleeding, faster healing',
      description:
        'Soft-tissue laser work for gum contouring, depigmentation and periodontal therapy. Most procedures need no sutures, and patients typically return to normal eating the same day.',
      benefits: ['Often no scalpel and no sutures', 'Markedly reduced bleeding', 'Faster, more comfortable healing', 'Precise gumline contouring'],
      icon: 'zap',
      duration: '1 visit',
      cta: 'Ask about laser options',
    },
    {
      id: 'orthodontics',
      title: 'Orthodontics',
      tagline: 'Alignment on your terms',
      description:
        'Clear aligners and modern fixed appliances, with the treatment simulated end-to-end before you start. You will see the projected final position, the number of months and the total cost at the first appointment.',
      benefits: ['Clear aligners and ceramic braces', 'Full 3D outcome simulation', 'Adult-discreet treatment paths', 'Retainers included for 2 years'],
      icon: 'align-center-horizontal',
      duration: '6–24 months',
      cta: 'Model your alignment',
    },
    {
      id: 'preventive',
      title: 'Preventive Dentistry',
      tagline: 'The treatment you never need',
      description:
        'Structured recall, professional cleaning, sealants and early-caries detection. The measure of this work is simple — patients on a preventive programme should need progressively less done to them each year.',
      benefits: ['Six-monthly structured recall', 'Early detection imaging', 'Child sealants and fluoride', 'Home-care coaching that fits your day'],
      icon: 'shield-check',
      duration: '45 minutes',
      cta: 'Schedule a check-up',
    },
  ] satisfies Expertise[],

  gallery: {
    eyebrow: 'Smile Gallery',
    heading: 'Work you can look at closely.',
    lead: 'Unretouched clinical photography, shot in the same light and the same position before and after. Drag the handle to compare.',
    /**
     * ⚠️  BEFORE/AFTER IMAGERY IS REGULATED.
     * Only publish images with written, treatment-specific patient consent on
     * file. Do not retouch. Do not use stock or AI-generated imagery here —
     * presenting either as a real clinical outcome is misrepresentation.
     * Image files go in /public/images/gallery/.
     */
    items: [
      {
        id: 'g1',
        category: 'Smile Design',
        title: 'Full ceramic veneer rehabilitation',
        summary:
          'Years of tetracycline staining and worn edges, rebuilt with ten minimal-prep lithium disilicate veneers designed to match the patient\'s original tooth shape.',
        treatment: 'Digital Smile Design · 10 veneers',
        duration: '3 weeks',
        before: '/images/gallery/case-01-before.jpg',
        after: '/images/gallery/case-01-after.jpg',
        patient: 'Software architect, 34',
        quote: 'I had stopped closing my mouth in photographs. That is the part that changed.',
      },
      {
        id: 'g2',
        category: 'Implants',
        title: 'Single anterior implant',
        summary:
          'A front tooth lost to trauma, replaced with a guided implant and a zirconia crown shade-matched to the neighbouring tooth under three lighting conditions.',
        treatment: 'Guided implant · Zirconia crown',
        duration: '4 months',
        before: '/images/gallery/case-02-before.jpg',
        after: '/images/gallery/case-02-after.jpg',
        patient: 'Teacher, 41',
        quote: 'My daughter cannot tell which one it is. Neither can I, most days.',
      },
      {
        id: 'g3',
        category: 'Alignment',
        title: 'Adult clear aligner correction',
        summary:
          'Crowding and a deep bite corrected over fourteen months with clear aligners, finished with conservative edge bonding rather than veneers.',
        treatment: 'Clear aligners · Edge bonding',
        duration: '14 months',
        before: '/images/gallery/case-03-before.jpg',
        after: '/images/gallery/case-03-after.jpg',
        patient: 'Advocate, 29',
        quote: 'Nobody at work noticed I was wearing anything. They only noticed at the end.',
      },
      {
        id: 'g4',
        category: 'Implants',
        title: 'Full-arch fixed rehabilitation',
        summary:
          'A failing upper dentition replaced with a fixed, screw-retained full-arch prosthesis on six implants. Provisional teeth were fitted the same day.',
        treatment: 'Six implants · Fixed full arch',
        duration: '6 months',
        before: '/images/gallery/case-04-before.jpg',
        after: '/images/gallery/case-04-after.jpg',
        patient: 'Retired officer, 63',
        quote: 'I ate an apple for the first time in nine years. I am aware of how that sounds.',
      },
      {
        id: 'g5',
        category: 'Restorative',
        title: 'Worn dentition rebuild',
        summary:
          'Severe attrition from long-term bruxism restored to the correct vertical dimension with monolithic zirconia, protected by a night guard.',
        treatment: 'Full-mouth rehabilitation',
        duration: '10 weeks',
        before: '/images/gallery/case-05-before.jpg',
        after: '/images/gallery/case-05-after.jpg',
        patient: 'Restaurateur, 47',
        quote: 'The headaches went first. I did not know those were related.',
      },
      {
        id: 'g6',
        category: 'Smile Design',
        title: 'Gum contouring and bonding',
        summary:
          'An uneven gumline recontoured with a soft-tissue laser and finished with composite bonding — no ceramics, and no tooth structure removed.',
        treatment: 'Laser contouring · Composite bonding',
        duration: '2 visits',
        before: '/images/gallery/case-06-before.jpg',
        after: '/images/gallery/case-06-after.jpg',
        patient: 'Postgraduate student, 24',
        quote: 'He talked me out of veneers. I did not expect that from a cosmetic dentist.',
      },
    ] satisfies Transformation[],
  },

  /** VERIFY — reproduce reviews verbatim, with permission, or link to source. */
  testimonials: [
    {
      id: 't1',
      name: 'Ananya R.',
      context: 'Digital Smile Design',
      rating: 5,
      quote:
        'I went in for whitening and left with a plan I actually understood. Nothing was pushed. When I asked for the expensive option, he explained why I did not need it.',
      source: 'Google Review',
    },
    {
      id: 't2',
      name: 'Vikram S.',
      context: 'Full-arch implants',
      rating: 5,
      quote:
        'Sixty-three years old and terrified of dentists. He called me himself the night of the surgery to ask how I was. That is not a small thing.',
      source: 'Google Review',
      video: '/videos/testimonial-vikram.mp4',
      poster: '/images/testimonials/vikram-poster.jpg',
    },
    {
      id: 't3',
      name: 'Priya M.',
      context: 'Root canal & crown',
      rating: 5,
      quote:
        'Finished in one sitting and I felt nothing. I had put this off for two years because of a bad experience elsewhere.',
      source: 'Practo',
    },
    {
      id: 't4',
      name: 'Karthik N.',
      context: 'Clear aligners',
      rating: 5,
      quote:
        'The simulation he showed me at the start is almost exactly what my teeth look like now. Fourteen months, no surprises, no extra bills.',
      source: 'Google Review',
    },
    {
      id: 't5',
      name: 'Sunitha K.',
      context: 'Paediatric & family care',
      rating: 5,
      quote:
        'My son used to cry in the car park. Now he asks when the next visit is. I have no idea how that was accomplished.',
      source: 'In clinic',
    },
    {
      id: 't6',
      name: 'Rahul D.',
      context: 'Veneers',
      rating: 5,
      quote:
        'I wore the trial smile for a week before agreeing. Being able to live with it first is what made me trust the whole process.',
      source: 'Google Review',
      video: '/videos/testimonial-rahul.mp4',
      poster: '/images/testimonials/rahul-poster.jpg',
    },
    {
      id: 't7',
      name: 'Meera J.',
      context: 'Laser gum treatment',
      rating: 5,
      quote:
        'No cutting, no stitches, and I ate dinner normally the same evening. I kept waiting for the pain to start and it never did.',
      source: 'Practo',
    },
    {
      id: 't8',
      name: 'Arjun P.',
      context: 'Single implant',
      rating: 5,
      quote:
        'Quoted once, at the start, in writing. The final bill matched it to the rupee. In healthcare that alone earns the review.',
      source: 'Google Review',
    },
  ] satisfies Testimonial[],

  /** VERIFY — must match the clinic's live Google Business Profile. */
  reviewSummary: {
    rating: 4.9,
    count: 640,
    platform: 'Google',
  },

  clinic: {
    eyebrow: 'The Clinic',
    heading: 'Designed to lower your pulse.',
    lead: 'Denteazee was planned with an architect rather than a dental supplier. Natural light, no clinical smell in the waiting area, and treatment rooms that face a window instead of a wall.',
    spaces: [
      {
        id: 'c1',
        name: 'Reception',
        blurb: 'Warm oak, indirect light and no television. Waiting time is kept under ten minutes by design, not by apology.',
        image: '/images/clinic/reception.jpg',
      },
      {
        id: 'c2',
        name: 'Consultation Suite',
        blurb: 'Where the first hour happens. A screen, your scans and a conversation — no chair, no instruments in sight.',
        image: '/images/clinic/consultation.jpg',
      },
      {
        id: 'c3',
        name: 'Operatory One',
        blurb: 'A German treatment unit facing full-height glazing, with ceiling-mounted audio and a view that is not a light.',
        image: '/images/clinic/operatory.jpg',
      },
      {
        id: 'c4',
        name: 'Surgical Theatre',
        blurb: 'A dedicated, positively-pressured implant theatre with separate scrub and instrument flow.',
        image: '/images/clinic/theatre.jpg',
      },
      {
        id: 'c5',
        name: 'Digital Lab',
        blurb: 'In-house scanning, design and milling — which is how a crown can be finished the same day.',
        image: '/images/clinic/lab.jpg',
      },
      {
        id: 'c6',
        name: 'Sterilisation Bay',
        blurb: 'Class B autoclaves behind glass, deliberately visible from the corridor. Every cycle is logged and traceable.',
        image: '/images/clinic/sterilisation.jpg',
      },
    ],
    technology: [
      { name: 'CBCT 3D Imaging', detail: 'Low-dose cone-beam scanning for surgical planning' },
      { name: 'Intraoral Scanning', detail: 'Digital impressions — no trays, no putty' },
      { name: 'CAD/CAM Milling', detail: 'Same-day ceramics milled in-house' },
      { name: 'Surgical Microscope', detail: 'Up to 25× magnification for endodontics' },
      { name: 'Soft-Tissue Laser', detail: 'Suture-free gum procedures' },
      { name: 'Class B Sterilisation', detail: 'Hospital-grade, fully traceable cycles' },
    ],
  },

  process: {
    eyebrow: 'How It Works',
    heading: 'Six steps. No surprises in any of them.',
    lead: 'The same sequence for every patient, whether the treatment is a filling or a full-arch rehabilitation.',
    steps: [
      {
        id: 'p1',
        title: 'Consultation',
        duration: '60 minutes',
        body: 'A conversation before an examination. What is bothering you, what you have tried, and what you actually want the outcome to be.',
      },
      {
        id: 'p2',
        title: 'Diagnosis',
        duration: 'Same visit',
        body: 'Clinical examination, photographs, digital scans and CBCT where indicated. You see every image on the screen as it is taken.',
      },
      {
        id: 'p3',
        title: 'Treatment Plan',
        duration: '48 hours',
        body: 'A written plan with options, sequence, timeline and a fixed price. Presented in person, with time to take it away and think.',
      },
      {
        id: 'p4',
        title: 'Procedure',
        duration: 'As planned',
        body: 'Carried out by Dr. Phani Babu personally. Appointments are scheduled long enough that nothing is rushed to fit the next patient.',
      },
      {
        id: 'p5',
        title: 'Recovery',
        duration: '24–72 hours',
        body: 'Written aftercare, medication where needed, and a direct number. Surgical patients get a call the same evening.',
      },
      {
        id: 'p6',
        title: 'Follow-up',
        duration: 'Ongoing',
        body: 'Reviewed at one week, three months and then at every recall. Warranty terms are documented, not implied.',
      },
    ],
  },

  /** VERIFY — each item must be evidenced (certificate, DOI, invitation). */
  achievements: {
    eyebrow: 'Beyond the Chair',
    heading: 'Practice, and the teaching of it.',
    lead: 'Clinical work is only half of the job. The rest is contributing to how the next generation of dentists practise.',
    groups: [
      {
        label: 'Fellowships & Certifications',
        items: [
          'Fellowship in Oral Implantology — International Congress of Oral Implantologists',
          'Certification in Digital Smile Design — DSD Residency',
          'Advanced Certification in Laser Dentistry',
          'Diplomate, Indian Academy of Aesthetic & Cosmetic Dentistry',
        ],
      },
      {
        label: 'Publications',
        items: [
          'Guided implant placement in the aesthetic zone: a five-year retrospective — Journal of Clinical Dentistry',
          'Minimal-prep veneers in tetracycline staining: a case series — Indian Journal of Aesthetic Dentistry',
          'Single-visit endodontics and post-operative comfort — Endodontology Review',
        ],
      },
      {
        label: 'Teaching & Speaking',
        items: [
          'Faculty, annual hands-on implantology programme (since 2018)',
          'Invited speaker — Indian Dental Conference',
          'Mentor, postgraduate clinical externship at Denteazee',
          'Guest lecturer on digital workflow adoption for small practices',
        ],
      },
      {
        label: 'Memberships',
        items: [
          'Indian Dental Association',
          'International Congress of Oral Implantologists',
          'Indian Academy of Aesthetic & Cosmetic Dentistry',
          'Academy of Laser Dentistry',
        ],
      },
    ],
  },

  faq: {
    eyebrow: 'Questions',
    heading: 'The things people ask before booking.',
    items: [
      {
        q: 'Will the first appointment involve any treatment?',
        a: 'Almost never. The first visit is a consultation, examination and imaging. Unless you are in acute pain — in which case relief comes first — you will leave with a plan rather than with work done. This is deliberate: consent given in a chair, on the day, is not properly informed consent.',
      },
      {
        q: 'How much will my treatment cost?',
        a: 'You receive a written quotation with a fixed total before anything begins, usually within 48 hours of the consultation. It does not change mid-treatment. If something unexpected is found, work stops and you are asked before any additional cost is incurred.',
      },
      {
        q: 'Is the treatment painful?',
        a: 'Local anaesthesia is administered slowly and after topical numbing, which is what makes the injection itself comfortable. Most patients describe procedures — including implant placement — as pressure rather than pain. For high anxiety, sedation options are discussed at the consultation.',
      },
      {
        q: 'How long do implants and veneers last?',
        a: 'With good hygiene and regular reviews, implants have well-documented survival rates above 95% at ten years, and modern ceramics are comparable. Denteazee documents its warranty terms in writing, including what is and is not covered — ask for it at the planning stage.',
      },
      {
        q: 'Do you treat nervous patients and children?',
        a: 'Yes, and it is a substantial part of the practice. Nervous patients are given longer appointments, a stop signal that is always honoured, and the option of a purely conversational first visit with no examination at all.',
      },
      {
        q: 'Can I get a second opinion on a plan from another clinic?',
        a: 'You are welcome to, and it is encouraged for anything extensive. Bring your reports and imaging. If the existing plan is sound, you will be told so — a second opinion is not a sales appointment.',
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Interest-free instalments are available on larger treatment plans, and the clinic works with major health-finance providers. Terms are set out in the written quotation rather than discussed verbally.',
      },
    ],
  },

  /** VERIFY — replace all contact details with the clinic's real ones. */
  contact: {
    eyebrow: 'Appointments',
    heading: 'Begin with a conversation.',
    lead: 'A consultation costs nothing but an hour, and commits you to nothing at all.',
    phone: '+91 00000 00000',
    phoneHref: 'tel:+910000000000',
    whatsapp: 'Message on WhatsApp',
    whatsappHref: 'https://wa.me/910000000000?text=Hello%2C%20I%27d%20like%20to%20book%20a%20consultation%20at%20Denteazee.',
    email: 'care@denteazee.com',
    emailHref: 'mailto:care@denteazee.com',
    addressLines: ['Denteazee Dental Clinic', 'Road No. 00, Jubilee Hills', 'Hyderabad, Telangana 500033'],
    mapsUrl: 'https://maps.google.com/?q=Denteazee+Dental+Clinic+Hyderabad',
    mapsEmbed:
      'https://www.google.com/maps?q=Jubilee+Hills,+Hyderabad,+Telangana&output=embed',
    hours: [
      { days: 'Monday – Saturday', time: '9:30 AM – 8:00 PM' },
      { days: 'Sunday', time: '10:00 AM – 2:00 PM' },
    ],
    emergencyNote: 'Dental emergency outside these hours? Call the number above — it reaches the on-call dentist.',
  },

  social: [
    { label: 'Instagram', href: 'https://instagram.com/denteazee' },
    { label: 'YouTube', href: 'https://youtube.com/@denteazee' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/drphanibabu' },
    { label: 'Google', href: 'https://maps.google.com/?q=Denteazee+Dental+Clinic+Hyderabad' },
  ],

  footer: {
    statement: 'Cosmetic and implant dentistry, practised with precision and patience.',
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Patient Rights', href: '/patient-rights' },
    ],
    disclaimer:
      'Information on this site is general in nature and is not a substitute for a clinical consultation. Individual results vary. All clinical photography is published with written patient consent.',
  },
} as const;

export type Site = typeof site;
