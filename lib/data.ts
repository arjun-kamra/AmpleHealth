// Centralized content for the AmpleHealth site.
// Placeholder links/text are clearly marked so they can be swapped later.

export const site = {
  name: "AmpleHealth",
  tagline: "Internal Medicine & Primary Care",
  // TODO: replace with real Zocdoc booking URL
  bookingUrl: "https://www.zocdoc.com/",
  email: "hello@ample.health",
  copyrightYear: 2026,
};

export type Location = {
  city: string;
  label: string;
  address1: string;
  address2: string;
  phone: string;
  phoneHref: string;
  // TODO: replace with real Google Maps embed src
  mapQuery: string;
};

export const locations: Location[] = [
  {
    city: "Carmichael",
    label: "Carmichael Office",
    address1: "6620 Coyle Ave, Suite 202",
    address2: "Carmichael, CA 95608",
    phone: "916-966-8500",
    phoneHref: "tel:+19169668500",
    mapQuery: "6620 Coyle Ave Suite 202, Carmichael, CA 95608",
  },
  {
    city: "Sacramento",
    label: "Sacramento Office",
    address1: "3270 Arena Blvd, Suite 405",
    address2: "Sacramento, CA 95834",
    phone: "916-418-4595",
    phoneHref: "tel:+19164184595",
    mapQuery: "3270 Arena Blvd Suite 405, Sacramento, CA 95834",
  },
];

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Services", href: "/services" },
  { label: "Forms", href: "/forms" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  highlights: string[];
  // tonal accent for placeholder art
  tone: string;
};

export const services: Service[] = [
  {
    slug: "family-medicine",
    title: "Family Medicine",
    summary:
      "Comprehensive primary care for every stage of life, built on long-term relationships.",
    description:
      "From annual physicals and chronic disease management to acute illness and preventive screenings, our family medicine practice cares for patients of all ages. We focus on continuity — knowing your history so we can make the right call when it matters.",
    highlights: [
      "Annual wellness & physical exams",
      "Chronic condition management (diabetes, hypertension, cholesterol)",
      "Acute illness & same-day concerns",
      "Preventive screenings & immunizations",
    ],
    tone: "#1B75BB",
  },
  {
    slug: "womens-health",
    title: "Women's Health",
    summary:
      "Attentive, whole-person care across screenings, wellness, and life transitions.",
    description:
      "We provide thoughtful women's health services including preventive screenings, wellness exams, hormonal and menopausal care, and counseling. Our goal is care that listens first and treats the whole person.",
    highlights: [
      "Well-woman exams & screenings",
      "Menopause & hormonal health",
      "Preventive & bone health",
      "Personalized wellness counseling",
    ],
    tone: "#155E96",
  },
  {
    slug: "geriatrics",
    title: "Geriatrics",
    summary:
      "Specialized care for older adults that protects independence and dignity.",
    description:
      "Aging well takes a coordinated approach. We manage complex conditions, medications, mobility, and cognitive health while keeping quality of life at the center of every decision — in close partnership with families and caregivers.",
    highlights: [
      "Complex & multi-condition management",
      "Medication review & deprescribing",
      "Cognitive & fall-risk assessment",
      "Care coordination with families",
    ],
    tone: "#104872",
  },
  {
    slug: "telehealth",
    title: "Telehealth",
    summary: "Secure virtual visits that bring the clinic to wherever you are.",
    description:
      "For follow-ups, medication management, and many acute concerns, telehealth saves you a trip without sacrificing quality. Connect with your provider over a secure video visit from home, work, or anywhere in California.",
    highlights: [
      "Secure video visits",
      "Follow-up & medication management",
      "Convenient scheduling",
      "Same standard of care as in person",
    ],
    tone: "#4D97D7",
  },
  {
    slug: "hospital-care",
    title: "Hospital Care",
    summary:
      "Continuity when you need it most — your physician, present in the hospital.",
    description:
      "When hospitalization is necessary, having a physician who knows your story changes everything. We provide inpatient oversight and coordination so your care stays connected from admission through discharge.",
    highlights: [
      "Inpatient oversight & rounding",
      "Coordination with specialists",
      "Seamless admission-to-discharge handoff",
      "Family communication & updates",
    ],
    tone: "#0B324F",
  },
  {
    slug: "post-acute-care",
    title: "Post-Acute Care",
    summary:
      "A guided recovery between the hospital and home, with no gaps in care.",
    description:
      "Recovery after a hospital stay is a vulnerable window. We manage transitions through skilled nursing and rehab settings, reconcile medications, and keep your recovery on track until you're safely home.",
    highlights: [
      "Skilled nursing & rehab oversight",
      "Medication reconciliation",
      "Recovery goal setting",
      "Safe transition home",
    ],
    tone: "#155E96",
  },
  {
    slug: "botox-and-fillers",
    title: "Botox & Fillers",
    summary:
      "Aesthetic treatments delivered with clinical precision and a natural touch.",
    description:
      "Physician-led aesthetic care for patients who want subtle, refined results. We offer neuromodulator and dermal filler treatments in a medical setting, with the safety and expertise you expect from a physician's practice.",
    highlights: [
      "Neuromodulator (Botox) treatments",
      "Dermal fillers",
      "Physician-led, medical-grade care",
      "Natural, individualized results",
    ],
    tone: "#C68A3E",
  },
];

export type Provider = {
  name: string;
  credentials: string;
  title: string;
  bio: string;
  tone: string;
};

export const providers: Provider[] = [
  {
    name: "Dheeraj Kamra",
    credentials: "MD, FACP",
    title: "Founder & Internal Medicine Physician",
    bio: "Dr. Kamra is a board-certified internist and Fellow of the American College of Physicians. He founded AmpleHealth to deliver internal medicine that blends clinical rigor with genuine relationship — care that follows the patient across the clinic, hospital, and home. [Placeholder bio — replace with full biography.]",
    tone: "#1B75BB",
  },
  {
    name: "Alice Phillips",
    credentials: "FNP",
    title: "Family Nurse Practitioner",
    bio: "Alice provides comprehensive primary care with a focus on preventive health and chronic disease management. [Placeholder bio — replace with full biography.]",
    tone: "#155E96",
  },
  {
    name: "Sidrah Khan",
    credentials: "FNP-C",
    title: "Certified Family Nurse Practitioner",
    bio: "Sidrah cares for patients across the lifespan, bringing a patient-first approach to wellness and acute care. [Placeholder bio — replace with full biography.]",
    tone: "#104872",
  },
  {
    name: "Yelena Popova",
    credentials: "PA",
    title: "Physician Assistant",
    bio: "Yelena partners with patients on everything from routine visits to complex care coordination. [Placeholder bio — replace with full biography.]",
    tone: "#4D97D7",
  },
];

export type PracticeForm = {
  title: string;
  description: string;
};

export const forms: PracticeForm[] = [
  {
    title: "Authorization for Release of Medical Information",
    description:
      "Authorize AmpleHealth to share your medical records with another provider or party.",
  },
  {
    title: "Notice of Privacy Practices",
    description:
      "How we protect, use, and disclose your protected health information.",
  },
  {
    title: "No-Show & Late Cancellation Policy",
    description:
      "Our policy on missed and late-cancelled appointments, and how to reschedule.",
  },
  {
    title: "Patient Partnership Plan",
    description:
      "Our shared commitments — what you can expect from us and what we ask of you.",
  },
  {
    title: "Telemedicine Consent Agreement",
    description:
      "Consent to receive care through secure virtual telehealth visits.",
  },
  {
    title: "Patient Intake Form",
    description:
      "New patient history, medications, and contact information to complete before your first visit.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Dr. Kamra actually listens. I never feel rushed, and for the first time I feel like someone is managing my health with me, not at me.",
    name: "Patient — R.M.",
    detail: "Carmichael",
    rating: 5,
  },
  {
    quote:
      "The whole team is warm and incredibly organized. Booking was easy and my follow-up over telehealth was seamless.",
    name: "Patient — J.T.",
    detail: "Sacramento",
    rating: 5,
  },
  {
    quote:
      "When my father was in the hospital, having a physician who knew his history made a frightening time so much easier.",
    name: "Patient — D.S.",
    detail: "Family member",
    rating: 5,
  },
  {
    quote:
      "Thorough, thoughtful, and genuinely kind. This is what primary care should feel like.",
    name: "Patient — L.B.",
    detail: "Carmichael",
    rating: 5,
  },
  {
    quote:
      "I appreciate how they coordinated my recovery after surgery. Nothing fell through the cracks.",
    name: "Patient — A.K.",
    detail: "Post-acute care",
    rating: 5,
  },
  {
    quote:
      "Modern, calm, and professional. The care is excellent and the experience matches it.",
    name: "Patient — M.P.",
    detail: "Sacramento",
    rating: 5,
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tone: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-fellowship-matters",
    title: "What FACP Means for Your Care",
    excerpt:
      "A look at the Fellowship of the American College of Physicians — and why this credential signals a higher standard in internal medicine.",
    category: "Internal Medicine",
    date: "May 2026",
    readTime: "4 min read",
    tone: "#1B75BB",
  },
  {
    slug: "preventive-care-checklist",
    title: "Your Annual Preventive Care Checklist",
    excerpt:
      "The screenings, vaccines, and conversations worth scheduling this year — organized by age and risk.",
    category: "Prevention",
    date: "April 2026",
    readTime: "6 min read",
    tone: "#155E96",
  },
  {
    slug: "telehealth-when-to-use",
    title: "When Telehealth Is the Right Choice",
    excerpt:
      "Virtual visits aren't right for everything. Here's how to know when a video visit will serve you best.",
    category: "Telehealth",
    date: "March 2026",
    readTime: "3 min read",
    tone: "#4D97D7",
  },
  {
    slug: "aging-well-sacramento",
    title: "Aging Well: A Practical Guide",
    excerpt:
      "Small, evidence-based habits that protect independence, mobility, and cognitive health over time.",
    category: "Geriatrics",
    date: "February 2026",
    readTime: "7 min read",
    tone: "#104872",
  },
  {
    slug: "understanding-blood-pressure",
    title: "Understanding Your Blood Pressure Numbers",
    excerpt:
      "What the two numbers actually mean, and the lifestyle levers that move them most.",
    category: "Chronic Care",
    date: "January 2026",
    readTime: "5 min read",
    tone: "#0B324F",
  },
  {
    slug: "questions-for-your-doctor",
    title: "5 Questions to Bring to Every Visit",
    excerpt:
      "Make the most of your appointment with a short list that turns a checkup into a conversation.",
    category: "Patient Tips",
    date: "December 2025",
    readTime: "3 min read",
    tone: "#C68A3E",
  },
];

// Placeholder Google reviews trust data
export const reviews = {
  rating: 4.9,
  count: 180,
};

// Placeholder insurance partners
export const insurers = [
  "Aetna",
  "Anthem Blue Cross",
  "Blue Shield",
  "Cigna",
  "Health Net",
  "Medicare",
  "Sutter Health Plan",
  "United Healthcare",
];
