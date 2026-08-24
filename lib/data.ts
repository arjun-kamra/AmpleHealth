// Centralized content for the AmpleHealth site.

export const site = {
  name: "AmpleHealth",
  tagline: "Internal Medicine & Primary Care",
  bookingUrl: "https://www.zocdoc.com/practice/amplehealth-132554",
  email: "hello@ample.health",
  // TrustCommerce hosted payment page. Passed through verbatim — the query
  // string carries the merchant id, field labels and the post-payment return
  // URL, and two params are intentionally space-prefixed ("%20bcc",
  // "%20receipt_logo"), so it must not be re-encoded or normalised.
  payBillUrl:
    "https://premier.trustcommerce.com/trustcommerce_payment/index.php?trxcustid=7016004&trxcustid_licensekey=DHo5P7SsX3bYyeDonaGHFI1h4TKKefWaYUgQrnWEZAQWKUcszB2jPQP4uraH64vE&amount=&ticketno=&googlepay=y&applepay=y&hide_ticket=n&identifier_label=Invoice%20Number/Account%20Number&show_email=y&%20bcc=y&display_logo=y&receipt_logo=y&email_address=&wcag=y&baddress=y&display_trxcustomfields=1,2,3,4,5,6,7,8,9,10&edit_trxcustomfields=1,2,3,4,5,6,7,8,9,10&label_trxcustomfields%5b1%5d=Invoice%20Date&label_trxcustomfields%5b2%5d=Due%20Date&label_trxcustomfields%5b3%5d=Service%20Date%20(Date%20of%20Visit)&label_trxcustomfields%5b4%5d=Patient%20Phone%20Number&label_trxcustomfields%5b5%5d=Patient%20First%20Name&label_trxcustomfields%5b6%5d=Patient%20Last%20Name&label_trxcustomfields%5b7%5d=Date%20of%20Birth&label_trxcustomfields%5b8%5d=Patient%20ID/MRN&label_trxcustomfields%5b9%5d=Provider/Doctor%20Name&label_trxcustomfields%5b10%5d=Facility/Location%20Name&%20receipt_logo=y&receipt_closeurl=https://amplehealth.com",

  copyrightYear: 2026,
};

export type Location = {
  city: string;
  label: string;
  address1: string;
  address2: string;
  phone: string;
  phoneHref: string;
  mapQuery: string;
  /** Google Maps embed URL rendered in the contact page iframe. */
  mapEmbed: string;
  hours: { days: string; times: string }[];
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
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3488.357121374647!2d-121.3099802!3d38.6676384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809adef78d15480d%3A0x8cc1bf6103d07ac9!2s6620%20Coyle%20Ave%20Ste%20202%2C%20Carmichael%2C%20CA%2095608!5e1!3m2!1sen!2sus!4v1785524182339!5m2!1sen!2sus",
    hours: [
      { days: "Monday – Friday", times: "8:00 am – 5:00 pm" },
      { days: "Saturday – Sunday", times: "Closed" },
    ],
  },
  {
    city: "Sacramento",
    label: "Sacramento Office",
    address1: "3270 Arena Blvd, Suite 405",
    address2: "Sacramento, CA 95834",
    phone: "916-418-4595",
    phoneHref: "tel:+19164184595",
    mapQuery: "3270 Arena Blvd Suite 405, Sacramento, CA 95834",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3138.8307053262183!2d-121.53572191425543!3d38.64218503656875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ad7007d124585%3A0x51b7a7f74ac9fda2!2sAmple%20Health!5e1!3m2!1sen!2sus!4v1785522343153!5m2!1sen!2sus",
    hours: [
      { days: "Monday – Friday", times: "8:00 am – 5:00 pm" },
      { days: "Saturday – Sunday", times: "Closed" },
    ],
  },
];

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Services", href: "/services" },
  { label: "Insurance", href: "/insurance" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export type ServiceSection = {
  heading: string;
  /** Intro prose, rendered above any list. */
  body?: string[];
  bullets?: string[];
  /** Labelled detail entries, rendered as cards. */
  items?: { title: string; body: string }[];
  /** Closing prose, rendered below any list. */
  footnote?: string[];
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  highlights: string[];
  tone: string;
  /** STOCK PLACEHOLDER — Unsplash hero image; replace with real practice photo. */
  stockImage: string;
  /** Overview paragraphs shown under "What to expect". */
  body?: string[];
  /** Further detail sections rendered below the overview. */
  sections?: ServiceSection[];
};

export const services: Service[] = [
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
    body: [
      "Recovery doesn't end at the hospital doors. The weeks after discharge are when the gains are won or lost, and they are also when care most often fragments — a new facility, a new therapist, a new set of instructions, and nobody holding the thread.",
      "Post-acute care covers the rehabilitation you may need after a hospital stay, whether that means inpatient care at a facility, outpatient therapy, or medical care in your own home. The goal is straightforward: restore your independence, rebuild your strength, and keep you from going back to the hospital.",
    ],
    sections: [
      {
        heading: "Planning starts before you leave",
        body: [
          "Before you are discharged, we meet with you to evaluate what you will need and agree on the plan for what comes next. If a rehabilitation facility is the right setting, we make the referral and coordinate it. If you are heading home, we make sure the support is in place before you get there.",
        ],
      },
      {
        heading: "Coordinating the specialists you need",
        bullets: [
          "Wound care",
          "Physical therapy",
          "Occupational therapy",
          "Respiratory therapy",
          "Speech therapy",
          "Psychological counseling",
          "Memory and cognitive therapy",
        ],
        footnote: [
          "We can also help you or a loved one find long-term care when daily medical support is needed for complex conditions, or hospice care when the priority becomes comfort and dignity.",
        ],
      },
      {
        heading: "We follow you the whole way",
        body: [
          "Your recovery stays under the same set of eyes. We track your progress through in-office visits or telehealth appointments you can join from a computer, smartphone, or tablet, so adjustments happen when they are needed rather than at the next scheduled check-in.",
        ],
      },
      {
        heading: "What good post-acute care changes",
        bullets: [
          "Personalized medical attention through the transition",
          "A faster, better-supported recovery",
          "Stronger day-to-day functional skills",
          "Lower risk of complications",
          "Lower chance of readmission",
        ],
      },
    ],
    tone: "#155E96",
    // STOCK PLACEHOLDER — replace with real practice photo
    stockImage: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=1200&auto=format&fit=crop",
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
    body: [
      "Being in the hospital is disorienting, and it tends to happen when you are least equipped to advocate for yourself. Having a physician there who already knows your history changes the experience — decisions get made faster, and they get made with the full context of your health rather than from a chart assembled overnight.",
      "We visit you in the hospital to assess how you are doing and monitor the treatments you are receiving, working alongside the hospital staff to keep your care plan coherent from admission through discharge. We have particular experience caring for older adults admitted after a fall or a sudden illness, where the risks of a hospital stay compound quickly.",
    ],
    sections: [
      {
        heading: "Admitting privileges, not the emergency room",
        body: [
          "If you are unwell or injured and think you may need hospital care, call us first. We hold admitting privileges at area hospitals, which can spare you the wait and the hand-off that come with arriving through the emergency department. If you are already admitted, let us know as soon as you can and we will pick up your care from there.",
        ],
      },
      {
        heading: "What we do while you are admitted",
        bullets: [
          "Visit you during rounds to monitor and coordinate your care",
          "Order diagnostic testing as your condition evolves",
          "Prescribe and adjust the medications you need",
          "Talk through your treatment options and what each one means",
          "Coordinate directly with hospital staff and specialists",
        ],
      },
      {
        heading: "Care that continues after discharge",
        body: [
          "The hand-off out of the hospital is where continuity usually breaks. Because we followed your stay, there is no delay and nothing to re-explain — we carry your treatment forward through in-office visits or telehealth, and coordinate post-acute rehabilitation if your recovery calls for it.",
        ],
      },
    ],
    tone: "#0B324F",
    // STOCK PLACEHOLDER — replace with real practice photo
    stockImage: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1200&auto=format&fit=crop",
  },
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
    body: [
      "Internal medicine is the practice of understanding how the adult body works as a whole. We are trained to manage both the ordinary and the genuinely complicated — and, more to the point, to think carefully when symptoms overlap, when the diagnosis is not obvious, or when the picture does not fit the textbook.",
      "That ability to connect findings across systems is what makes an internist useful to you. Most of the people we care for are managing more than one thing at once, and someone has to hold the whole picture and coordinate the long-term plan rather than treating each problem in isolation.",
      "The name comes from the German innere medizin, a nineteenth-century term for a more scientific, patient-centered approach to adult medicine. That is still the idea: current evidence, applied with judgment, to one person at a time.",
    ],
    sections: [
      {
        heading: "Services we provide",
        bullets: [
          "Sick visits for urgent health needs",
          "Annual physical exams",
          "Preventive screenings and immunizations",
          "Comprehensive diagnostic testing",
          "Chronic disease management — diabetes, hypertension, obesity, heart and lung conditions",
          "Women's health and reproductive care",
          "Geriatric care for older adults",
          "Hospital and post-acute care through recovery",
        ],
        footnote: [
          "Alongside treatment we offer practical lifestyle guidance: personalized diet and exercise plans, and concrete strategies for lowering your risk of heart disease and type 2 diabetes.",
        ],
      },
      {
        heading: "What your first visit looks like",
        body: [
          "We start by understanding your complete health picture — your personal and family medical history, anything you are currently experiencing, and what you actually want out of your health. Then we perform a thorough physical exam, evaluating markers including:",
        ],
        bullets: [
          "Weight and height",
          "Heart rate and blood pressure",
          "Body temperature",
          "Muscle strength and joint flexibility",
        ],
      },
      {
        heading: "And what follows",
        body: [
          "Depending on your age, symptoms, and risk factors, we may order blood work or other diagnostic testing — often even when you feel entirely well, because that is when the most useful problems get caught. Sick visits and chronic condition checkups may call for further testing still.",
          "Afterward we build a care plan around what we found, and follow it with you over time through in-office visits or telehealth, adjusting as your health changes.",
        ],
      },
    ],
    tone: "#1B75BB",
    // STOCK PLACEHOLDER — replace with real practice photo
    stockImage: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=1200&auto=format&fit=crop",
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
    body: [
      "Your reproductive health changes across your life, and the care it needs changes with it. We provide women's health services that follow those stages rather than treating each visit as an isolated event.",
      "That covers preventive care, contraception, and menopause — along with the physical, mental, and emotional health that sits alongside all of it and too often gets left out of the conversation.",
    ],
    sections: [
      {
        heading: "Services we provide",
        bullets: [
          "Preventive pelvic exams",
          "Birth control and contraceptive management",
          "Menopause management",
          "Mental health evaluations",
          "Sexually transmitted infection testing",
          "Manual breast exams and Pap smears",
        ],
        footnote: [
          "You can see us in the office for routine physicals and diagnostic testing, and use telehealth for follow-up visits and medication refills.",
        ],
      },
      {
        heading: "When to come in",
        body: [
          "We recommend a women's health exam once a year — a complete physical, a pelvic exam, and the preventive screenings appropriate for you — even when you feel entirely well.",
          "Come in sooner if something has changed: pelvic pain, irregular periods, or any symptom you cannot explain. If you are experiencing hot flashes, night sweats, or other signs of a hormone imbalance, whether from menopause or an underlying condition, we can order blood work to find out what is driving it.",
        ],
      },
      {
        heading: "What a visit involves",
        body: [
          "We review your medical history, your current health, and anything you have noticed. A physical exam follows, including a pelvic and breast exam to check the health of your reproductive organs. As part of the pelvic exam we can perform a Pap smear, collecting cells from your cervix and examining them for early signs of cervical cancer.",
          "If you have come in about a specific symptom, we order the blood work or diagnostic testing needed to identify the cause, screen for infections where relevant, and talk through your options — including contraception or hormone therapy. We will also cover the ordinary things that protect long-term health: what you eat, how you move, and how to lower your risk of chronic disease.",
        ],
      },
    ],
    tone: "#155E96",
    // STOCK PLACEHOLDER — replace with real practice photo
    stockImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop",
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
    body: [
      "Later-life care is its own discipline. The conditions are often familiar ones; what changes is how many arrive at once, how they interact with each other, and how quickly a single event can unsettle a picture that had been stable for years.",
      "Our team includes geriatrics specialists with long experience caring for older adults through exactly those transitions. The aim is continuity — care that follows the changing needs and challenges of later life rather than treating each episode as unrelated to the last.",
    ],
    sections: [
      {
        heading: "When a hospital stay is involved",
        body: [
          "A hospital admission carries more risk for an older adult, and the days afterward carry more still. We have particular experience with patients admitted after a fall or a sudden illness, and with those whose long-standing conditions have destabilized.",
          "Because we provide hospital care and post-acute care ourselves, that whole stretch stays with one team: the admission, the stay, the discharge, and the rehabilitation that follows.",
        ],
      },
      {
        heading: "Memory, cognition, and the people alongside you",
        body: [
          "We regularly care for patients living with Alzheimer's disease, and we work with the families carrying it alongside them. Much of the practical weight of a dementia diagnosis falls on relatives, and they need a clinician they can reach as much as the patient does.",
        ],
      },
    ],
    tone: "#104872",
    // STOCK PLACEHOLDER — replace with real practice photo
    stockImage: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop",
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
    body: [
      "Telehealth gives you one-on-one time with your provider without the drive, the parking, or the waiting room. For a good share of what we do — evaluating symptoms, reviewing results, managing medications — a video visit is simply the more sensible format.",
      "The standard of care does not change. It is the same team, the same records, and the same judgment you would get sitting in our office.",
    ],
    sections: [
      {
        heading: "How a virtual visit works",
        body: [
          "Ahead of your appointment our staff send you everything you need to reach the platform. At the scheduled time you connect from a computer, smartphone, or tablet and meet your provider one-on-one over video.",
        ],
      },
      {
        heading: "What we can handle virtually",
        bullets: [
          "Symptom evaluation",
          "Follow-up visits",
          "Review of test results",
          "Prescription refills",
          "Medication management",
        ],
        footnote: [
          "If you are too unwell to travel, start with a virtual visit. We can assess you and tell you honestly whether you need to come in for a physical exam or diagnostic testing, or need a referral to a specialist or hospital.",
        ],
      },
      {
        heading: "Why patients use it",
        body: [
          "A virtual visit keeps routine care on schedule when your calendar is full or you are away from home, and it is there when illness, injury, or a lack of transportation makes the trip impossible. It means less time off work and less spent getting here.",
          "Mostly it means you can reach your provider with a question about your treatment plan without waiting weeks for a slot.",
        ],
      },
    ],
    tone: "#4D97D7",
    // STOCK PLACEHOLDER — replace with real practice photo
    stockImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "botox-and-fillers",
    title: "Botox & Fillers",
    summary:
      "Aesthetic treatments delivered with clinical precision and a natural touch.",
    description:
      "Physician-led aesthetic care for patients who want subtle, refined results. We offer neuromodulator (Botox, Xeomin) and dermal filler treatments in a medical setting, with the safety and expertise you expect from a physician's practice.",
    highlights: [
      "Botox® & Xeomin® neuromodulator treatments",
      "Dermal fillers",
      "Physician-led, medical-grade care",
      "Natural, individualized results",
    ],
    body: [
      "Aesthetic treatment works best when nobody can point to it. The aim is not a different face — it is your face, rested. We treat conservatively, in a medical setting, by clinicians trained in facial anatomy rather than in technique alone.",
      "Botox and dermal fillers address different problems, which is why they are so often discussed together. Botox softens the lines that come from movement: the creases across your brow and at the corners of your eyes that deepen after years of squinting and frowning. It eases the muscle activity underneath them, so the skin above relaxes and the lines settle.",
      "Fillers do close to the opposite job. As collagen and elastin production slows with age, the face loses volume — cheeks flatten, contours soften, lips thin. Fillers restore that fullness, replacing what time has taken rather than smoothing what movement has creased.",
    ],
    sections: [
      {
        heading: "Where we treat",
        bullets: [
          "Frown lines across the brow",
          "Crow's feet at the corners of the eyes",
          "Forehead lines",
          "Cheek and midface volume",
          "Lips",
          "Facial contour and definition",
        ],
      },
      {
        heading: "What a visit involves",
        body: [
          "We begin with a full skin evaluation and an honest conversation about what you are hoping for. That matters more than it sounds — the most common cause of disappointment in aesthetic medicine is a mismatch between expectation and what a treatment can actually deliver, and we would rather resolve that before anyone picks up a syringe.",
          "Treatment itself is quick. We can apply a topical anesthetic to keep you comfortable, then place precise amounts of product in the areas we agreed on. How long it takes depends on how many injections you need, and downtime is minimal — most people return to their day directly afterward.",
        ],
      },
      {
        heading: "How long results last",
        body: [
          "Botox is not immediate. Expect around 48 hours, sometimes longer, before the skin visibly smooths, with results generally holding up to about four months before you are ready for more.",
          "Fillers often show a change straight away that keeps improving over the following weeks. Depending on the filler used, those results typically last six months or longer before maintenance.",
        ],
      },
    ],
    tone: "#C68A3E",
    // STOCK PLACEHOLDER — replace with real practice photo
    stockImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "metabolic-syndrome",
    title: "Physician-Directed Weight Loss",
    summary:
      "Science-backed metabolic medicine — GLP-1 therapy, continuous glucose monitoring, and a dedicated support team working together.",
    description:
      "Traditional weight-loss advice rarely accounts for the biology of obesity and metabolic syndrome. We combine the latest GLP-1 and GIP receptor agonists, real-time CGM data, registered nutritionist guidance, and a dedicated support team to help you achieve lasting change.",
    highlights: [
      "GLP-1 & GIP receptor agonist therapy",
      "Continuous Glucose Monitor (CGM) integration",
      "Registered nutritionist coaching",
      "Dedicated accountability support team",
      "Metabolic syndrome & insulin resistance care",
    ],
    tone: "#1B75BB",
    // STOCK PLACEHOLDER — replace with real practice photo
    stockImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "chronic-care-management",
    title: "Chronic Care Management",
    summary:
      "Proactive remote monitoring for diabetes and hypertension, in partnership with Unified Care.",
    description:
      "AmpleHealth partners with Unified Care to provide continuous remote monitoring for patients managing diabetes and hypertension. Between visits, your care team tracks your vitals and key metrics, catching problems early and adjusting your plan before small changes become big ones.",
    highlights: [
      "Remote glucose & blood pressure monitoring",
      "Partnership with Unified Care",
      "Between-visit check-ins from your care team",
      "Proactive plan adjustments",
      "Coordinated with your in-office care",
    ],
    body: [
      "Chronic conditions are not managed in the exam room. They are managed on the ordinary days between appointments — and the gap between those visits is exactly where blood sugar drifts, blood pressure creeps, and small problems become large ones unnoticed.",
      "This program is built to close that gap. In partnership with Unified Care, we combine medical supervision, remote monitoring, and lifestyle coaching so your numbers are visible to your care team continuously rather than twice a year.",
      "We use this approach for hypertension, diabetes, obesity, and COPD — the conditions where steady, between-visit attention makes the largest difference both to how you feel day to day and to where you end up in five years.",
    ],
    sections: [
      {
        heading: "What the program includes",
        items: [
          {
            title: "Complimentary monitoring devices",
            body: "Depending on your diagnosis you will receive a blood pressure monitor, a glucose meter, or another device suited to your condition, provided at no cost to you. Accurate tracking should not depend on what equipment you happen to own.",
          },
          {
            title: "A smart mobile app",
            body: "Track, store, and review your blood sugar and blood pressure readings in one place. The app turns individual readings into trends and surfaces them in real time, so the numbers inform your daily decisions instead of just accumulating.",
          },
          {
            title: "A personalized care plan and coaching",
            body: "You work closely with your care team on a treatment plan built around your life, including nutritional counseling, lifestyle coaching, and medication reminders that keep the plan on track between visits.",
          },
          {
            title: "Virtual support and telehealth access",
            body: "On-demand remote support for when a question cannot wait for your next appointment. You reach clinical guidance directly, without scheduling delays.",
          },
          {
            title: "Extensive educational resources",
            body: "A full library of articles, videos, and health guides. Understanding your own condition is among the strongest predictors of managing it well, and we would rather you have that than a pamphlet.",
          },
        ],
      },
      {
        heading: "Why we partner with Unified Care",
        body: [
          "Unified Care's onsite-plus-online model was designed to bridge precisely the gap described above: the one between what happens in the office and what happens at home. It pairs remote monitoring devices with an easy-to-use mobile app and ongoing nutrition and lifestyle coaching.",
          "For people managing diabetes and hypertension, what that produces is steady, measurable improvement over time rather than the sawtooth pattern of good intentions after each appointment followed by drift. It also tends to lower overall healthcare costs, largely by preventing the complications and hospitalizations that uncontrolled chronic disease reliably causes.",
        ],
      },
      {
        heading: "Who this is for",
        body: [
          "If you are managing high blood pressure, diabetes, obesity, or COPD — particularly if your numbers have been difficult to control, or you have felt alone with them between appointments — this program was built for that.",
          "Your monitoring stays connected to the same team that provides your in-office care, so nothing has to be re-explained and no reading goes to a stranger.",
        ],
      },
    ],
    tone: "#104872",
    // STOCK PLACEHOLDER — replace with real practice photo
    stockImage: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?q=80&w=1200&auto=format&fit=crop",
  },
];

export type Provider = {
  slug: string;
  name: string;
  credentials: string;
  title: string;
  group: "physicians" | "np-pa" | "care-admin";
  shortBio: string;
  fullBio: string[];
  highlights: string[];
  tone: string;
};

export const providers: Provider[] = [
  // ── PHYSICIANS ────────────────────────────────────────────────────────────
  {
    slug: "dheeraj-kamra",
    name: "Dheeraj Kamra",
    credentials: "MD, FACP",
    title: "Founder & Internist",
    group: "physicians",
    shortBio:
      "Board-certified internist and Fellow of the American College of Physicians. Dr. Kamra founded AmpleHealth to deliver evidence-based, relationship-driven internal medicine across the clinic, hospital, and home.",
    fullBio: [
      "Dr. Dheeraj Kamra is the founder of AmpleHealth and a board-certified internist serving Carmichael and Sacramento, California. He became interested in medicine because of his father, an anesthesiologist in India, who inspired a lifelong commitment to clinical excellence.",
      "Dr. Kamra completed his surgical residency at the Post Graduate Institute of Medical Education & Research (PGI) in Chandigarh, India — one of the most prestigious medical institutions in South Asia. He subsequently trained at the University of Rochester in New York and Drexel University College of Medicine in Philadelphia, where he deepened his expertise in internal medicine.",
      "He practices an evidence-based approach to medicine, staying at the forefront of clinical research to ensure his patients receive care grounded in the best available evidence. In recognition of his clinical excellence and commitment to the profession, Dr. Kamra was elected as a Fellow of the American College of Physicians (FACP) — a distinction awarded to internists who demonstrate superior competence, professionalism, and service.",
      "Outside of medicine, Dr. Kamra is passionate about cardiovascular fitness, biking, and strength training. He lives in Granite Bay, California with his wife and three children.",
    ],
    highlights: [
      "Board-certified in Internal Medicine",
      "Fellow of the American College of Physicians (FACP)",
      "Training at University of Rochester & Drexel University College of Medicine",
      "Residency at PGI Chandigarh, India",
      "Evidence-based, relationship-driven practice",
    ],
    tone: "#1B75BB",
  },
  {
    slug: "mythli-nagaraj",
    name: "Mythili Nagaraj",
    credentials: "MD",
    title: "Physician",
    group: "physicians",
    shortBio:
      "USMLE-certified physician and Diplomate of the American Board of Integrative and Holistic Medicine. Dr. Nagaraj brings advanced functional medicine training and a whole-person philosophy to every patient encounter.",
    fullBio: [
      "Dr. Mythili Nagaraj is a physician at AmpleHealth who joined the practice in January 2024. She holds an active California medical license, DEA certification, and is certified in both BLS and ACLS.",
      "Dr. Nagaraj is a Diplomate of the American Board of Integrative and Holistic Medicine and has completed advanced coursework in Functional Medicine through the Institute for Functional Medicine. This training informs a whole-person, root-cause approach to patient care that goes beyond symptom management.",
      "Her clinical contributions have been recognized with the Best Clinical Care Provider award at Norton Healthcare, and she has received recognition from the American Medical Association. Dr. Nagaraj has authored and contributed to publications on infectious diseases, cancer screening, diabetes management, and fibromyalgia.",
      "She is committed to building lasting relationships with her patients and providing care that addresses not just disease, but the full context of a person's health, lifestyle, and goals.",
    ],
    highlights: [
      "USMLE certified, active California medical license",
      "DEA certification, BLS & ACLS certified",
      "Diplomate of the American Board of Integrative & Holistic Medicine",
      "Advanced Functional Medicine training (IFM)",
      "Best Clinical Care Provider — Norton Healthcare",
      "Publications on infectious diseases, cancer screening, diabetes & fibromyalgia",
    ],
    tone: "#155E96",
  },
  {
    slug: "rekha-pareek",
    name: "Rekha Pareek",
    credentials: "MD",
    title: "Nephrologist",
    group: "physicians",
    shortBio:
      "Nephrologist with 23+ years of clinical experience specializing in kidney care, home dialysis therapies, complex electrolyte disorders, Obesity Medicine, and metabolic syndrome.",
    fullBio: [
      "Dr. Rekha Pareek is a nephrologist with more than 23 years of clinical experience caring for patients with kidney disease and complex metabolic conditions. She brings a depth of expertise that few physicians in the region can match.",
      "Dr. Pareek earned her medical degree from RNT Medical College in Udaipur, India, before completing her Internal Medicine residency at Graduate Hospital in Philadelphia. She then pursued subspecialty fellowship training at Drexel University Hospital, where she developed her expertise in nephrology.",
      "Her clinical specialties include kidney care, home dialysis therapies, complex electrolyte disorders, Obesity Medicine, and metabolic syndrome. She is particularly passionate about empowering patients to take an active role in managing their kidney health and weight-related conditions.",
      "Outside of medicine, Dr. Pareek enjoys reading and creative art and design — pursuits that reflect the same careful attention and creativity she brings to her clinical work.",
    ],
    highlights: [
      "23+ years of clinical experience",
      "Nephrology fellowship at Drexel University Hospital",
      "Internal Medicine residency at Graduate Hospital, Philadelphia",
      "Specializes in kidney care & home dialysis",
      "Obesity Medicine & metabolic syndrome",
      "Complex electrolyte disorder management",
    ],
    tone: "#104872",
  },
  {
    slug: "jamshid-faraji",
    name: "Jamshid Faraji",
    credentials: "MD",
    title: "Internal Medicine Physician & Lipidology Specialist",
    group: "physicians",
    shortBio:
      "Board-certified Internal Medicine Physician and Lipidology Specialist with over four decades of clinical experience in California. Dr. Faraji specializes in lipid disorders, cardiovascular risk reduction, preventive cardiology, diabetes, hypertension, and complex chronic conditions.",
    fullBio: [
      "Dr. Jamshid Faraji brings more than four decades of clinical excellence to AmpleHealth. He earned his medical degree from the National University of Iran in Tehran and completed his Internal Medicine residency at Pahlavi University in Shiraz, Iran.",
      "He further advanced his training at Bristol Royal Infirmary in the United Kingdom, where he completed MRCP Part I, and subsequently completed an additional Internal Medicine residency at LAC+USC Medical Center in Los Angeles. Dr. Faraji has been practicing in California since 1982.",
      "His clinical specialties include lipid disorders, cardiovascular risk reduction, preventive cardiology, diabetes, hypertension, and the management of complex chronic conditions. He is also skilled in office procedures including joint aspirations and injections, skin biopsies, and minor surgical interventions.",
      "Dr. Faraji is known throughout his career for his thoughtful clinical judgment, his ability to synthesize complex medical histories, and his commitment to personalized, evidence-based care. His decades of experience bring a perspective to patient care that is both deep and nuanced.",
    ],
    highlights: [
      "Board-certified Internal Medicine & Lipidology Specialist",
      "40+ years of clinical experience in California (practicing since 1982)",
      "MD from National University of Iran, Tehran",
      "MRCP Part I — Bristol Royal Infirmary, UK",
      "Residency at LAC+USC Medical Center, Los Angeles",
      "Office procedures: joint aspirations, skin biopsies, minor surgery",
      "Specializes in lipids, cardiovascular risk & preventive cardiology",
    ],
    tone: "#0B324F",
  },
  {
    slug: "liz-hernandez",
    name: "Liz Hernandez",
    credentials: "MD",
    title: "Family Medicine",
    group: "physicians",
    shortBio:
      "Board-certified Family Medicine physician and fluent Spanish speaker who champions preventive care, healthy lifestyle choices, non-narcotic pain management, and active patient involvement in care decisions.",
    fullBio: [
      "Dr. Hernandez is a board-certified Family Medicine physician who immigrated to California from Colombia in 2005. She conducted medical research at UCSF before completing her residency at Texas Tech University Health Sciences Center in El Paso, TX. She is passionate about preventive care and champions healthy lifestyle choices, stress reduction, strong mental and emotional health, non-narcotic pain management, and active patient involvement in care decisions.",
      "Fluent in Spanish, Dr. Hernandez brings a multicultural perspective to her practice and is committed to building long-term, trust-based relationships with her patients — always doing right by them, taking a comprehensive and holistic approach to care, and taking the time to educate patients so they can be true partners in their own health.",
    ],
    highlights: [
      "Board-certified by the American Board of Family Medicine",
      "Areas of interest: Geriatric Medicine & General Family Medicine",
      "Residency at Texas Tech University Health Sciences Center, El Paso",
      "Medical research at UCSF",
      "California State Medical License",
      "Fluent in Spanish — multicultural approach to care",
    ],
    tone: "#4D97D7",
  },

  // ── NURSE PRACTITIONERS & PHYSICIAN ASSISTANTS ───────────────────────────
  {
    slug: "alice-phillips",
    name: "Alice Phillips",
    credentials: "FNP",
    title: "Family Nurse Practitioner",
    group: "np-pa",
    shortBio:
      "Family Nurse Practitioner with 40+ years of experience. MSN from UCSF cum laude. Former Medical Director of Cameron Park Clinic and clinical instructor for NP and PA programs including UC Davis School of Medicine. At AmpleHealth since 2023.",
    fullBio: [
      "Alice Phillips is a Family Nurse Practitioner with more than 40 years of clinical experience, bringing a breadth of knowledge and a deeply patient-centered approach to her practice at AmpleHealth.",
      "She earned her Master of Science in Nursing (MSN) from the University of California, San Francisco, graduating cum laude, and her Bachelor of Science in Nursing (BSN) from California State University, Sacramento. She holds national certification as a Family Nurse Practitioner through the American Nurses Association, as well as certifications in public health nursing, school nursing, and nursing education.",
      "Alice's clinical expertise spans comprehensive primary care, internal medicine, urgent care, women's health, pediatrics, and sports medicine. From 2006 to 2023, she practiced at Marshall Medical Associates, where she ultimately served as Medical Director of the Cameron Park Clinic.",
      "Throughout her career, Alice has been deeply committed to training the next generation of clinicians. She has served as a clinical instructor for nurse practitioner and physician assistant programs, including the UC Davis School of Medicine. She joined AmpleHealth in 2023.",
    ],
    highlights: [
      "40+ years of clinical experience",
      "MSN from UCSF, cum laude",
      "BSN from CSU Sacramento",
      "National FNP certification — American Nurses Association",
      "Former Medical Director, Cameron Park Clinic (Marshall Medical Associates)",
      "Clinical instructor — UC Davis School of Medicine NP/PA programs",
      "Certifications in public health, school nursing & nursing education",
    ],
    tone: "#4D97D7",
  },
  {
    slug: "sidrah-khan",
    name: "Sidrah Khan",
    credentials: "FNP-C",
    title: "Board-Certified Family Nurse Practitioner",
    group: "np-pa",
    shortBio:
      "Board-Certified FNP with 10+ years of healthcare experience. Graduated with honors from Georgetown University. Manages a broad range of conditions including hypertension, diabetes, women's health, and mental health. Fluent in English, Urdu, and Punjabi.",
    fullBio: [
      "Sidrah Khan is a Board-Certified Family Nurse Practitioner who graduated with honors from Georgetown University in Washington, DC, earning dual Bachelor of Science degrees in Biology and Biomedical Sciences.",
      "She brings more than 10 years of healthcare experience to AmpleHealth, including four years managing her own patient panel in family medicine in Washington, DC, and four years in urgent care. This breadth of experience gives her a confident, thorough approach to both acute and chronic care.",
      "Her clinical scope includes the management of high blood pressure, diabetes, high cholesterol, obesity, thyroid conditions, infections, and mental health. She also provides comprehensive women's health services including contraceptive management and prenatal care, as well as dermatology and aesthetic medicine services.",
      "Sidrah is fluent in English, Urdu, and Punjabi, allowing her to connect with a wide range of patients in their preferred language. She is known for her warmth, thoroughness, and genuine investment in her patients' long-term health.",
    ],
    highlights: [
      "Board-Certified Family Nurse Practitioner (FNP-C)",
      "Graduated with honors from Georgetown University",
      "Dual BS in Biology & Biomedical Sciences",
      "10+ years healthcare experience",
      "4 years managing own patient panel in family medicine, Washington DC",
      "Women's health, contraceptive management & prenatal care",
      "Dermatology & aesthetic medicine services",
      "Fluent in English, Urdu & Punjabi",
    ],
    tone: "#0B324F",
  },
  {
    slug: "gurpreet-smagh",
    name: "Gurpreet Smagh",
    credentials: "PA",
    title: "Board-Certified Physician Assistant",
    group: "np-pa",
    shortBio:
      "Board-certified PA with 10+ years spanning Physical Medicine & Rehabilitation, Trauma and Acute Care Surgery, Emergency Medicine, and Occupational Medicine. Currently also at Sacramento Rehabilitation Hospital. Fluent in English, Punjabi, Hindi, and Urdu.",
    fullBio: [
      "Gurpreet Smagh is a board-certified Physician Assistant with more than 10 years of clinical experience across a wide range of high-acuity settings, including Physical Medicine & Rehabilitation, Trauma and Acute Care Surgery, Emergency Medicine, and Occupational Medicine.",
      "In addition to his role at AmpleHealth, Gurpreet currently practices at Sacramento Rehabilitation Hospital, where he manages complex rehabilitation patients navigating recovery from serious injuries, surgeries, and neurological conditions.",
      "His procedural skill set includes wound debridement, skin excisions, abscess management, and minor surgical interventions. He has deep expertise in workers' compensation cases, DOT physicals, and occupational injury management — making him a valued resource for patients whose health intersects with their work.",
      "Gurpreet is fluent in English, Punjabi, Hindi, and Urdu, enabling him to serve patients across diverse linguistic communities in the Sacramento region.",
    ],
    highlights: [
      "Board-certified Physician Assistant",
      "10+ years spanning PM&R, Trauma, Emergency Medicine & Occupational Medicine",
      "Currently at Sacramento Rehabilitation Hospital",
      "Workers' compensation & DOT physicals",
      "Procedural expertise: wound debridement, skin excisions, minor surgery",
      "Fluent in English, Punjabi, Hindi & Urdu",
    ],
    tone: "#155E96",
  },
  {
    slug: "yelena-popova",
    name: "Yelena Popova",
    credentials: "PA",
    title: "Physician Assistant",
    group: "np-pa",
    shortBio:
      "Physician Assistant trained at UC Davis PA Program (2005). Medical background from Ivano-Frankivsk Medical Academy, Ukraine. Working in family and internal medicine since graduation. Fluent in Russian and Ukrainian.",
    fullBio: [
      "Yelena Popova is a Physician Assistant at AmpleHealth who brings a strong medical foundation and nearly two decades of family and internal medicine experience to her patients.",
      "She earned her medical degree from Ivano-Frankivsk Medical Academy in Ukraine before completing her Physician Assistant training at the UC Davis Physician Assistant Program, graduating in 2005. Since graduation, she has worked continuously in family and internal medicine.",
      "Yelena is fluent in Russian and Ukrainian, allowing her to serve patients from Eastern European communities who prefer to communicate in their native language.",
      "Outside of work, Yelena enjoys reading, trying new recipes, and hiking.",
    ],
    highlights: [
      "Physician Assistant, UC Davis PA Program (2005)",
      "MD from Ivano-Frankivsk Medical Academy, Ukraine",
      "Family & internal medicine since 2005",
      "Fluent in Russian & Ukrainian",
    ],
    tone: "#C68A3E",
  },
  {
    slug: "harneet-sandhu",
    name: "Harneet Sandhu",
    credentials: "PA",
    title: "Physician Assistant",
    group: "np-pa",
    shortBio:
      "Physician Assistant with a Master of Physician Assistant Studies from UC Davis. Born and raised in the Bay Area. Passionate about patient education and dedicated to collaborative patient-provider relationships and compassionate inpatient care.",
    fullBio: [
      "Harneet Sandhu is a Physician Assistant at AmpleHealth who grew up in the Bay Area and completed her Master of Physician Assistant Studies at the UC Davis Physician Assistant Program.",
      "Harneet believes that patient education is the foundation of exceptional care. She invests time in making sure her patients not only receive the right treatment but truly understand their conditions, their options, and the reasoning behind each clinical decision.",
      "She is dedicated to building collaborative patient-provider relationships grounded in respect and transparency. Her approach to inpatient care is marked by compassion — she is committed to supporting patients through recovery at some of the most vulnerable moments of their lives.",
    ],
    highlights: [
      "Physician Assistant",
      "Master of Physician Assistant Studies — UC Davis",
      "Patient education-centered philosophy",
      "Collaborative inpatient care",
    ],
    tone: "#104872",
  },
  {
    slug: "somosri-pal",
    name: "Somosri Pal",
    credentials: "PA",
    title: "Board-Certified Physician Assistant",
    group: "np-pa",
    shortBio:
      "Board-certified PA with 10+ years in internal and hospital medicine. Previously at Montefiore Medical Center and Yale New Haven Hospital. Patient-centered approach with strong multidisciplinary collaboration. Fluent in Bengali, English, and Hindi.",
    fullBio: [
      "Somosri Pal is a board-certified Physician Assistant with more than 10 years of experience in internal and hospital medicine. She earned her Bachelor of Science in Physician Assistant Studies from St. John's University and her Master of Science in Physician Assistant Studies from Touro University.",
      "Prior to joining AmpleHealth, Somosri practiced at Montefiore Medical Center and Yale New Haven Hospital — two of the nation's leading academic medical centers. These experiences honed her ability to manage complex patients, collaborate across disciplines, and deliver high-quality care under demanding clinical conditions.",
      "Somosri brings a deeply patient-centered approach to her practice, prioritizing clear communication and strong therapeutic relationships. She is a skilled collaborator who works effectively within multidisciplinary teams to ensure comprehensive, coordinated care.",
      "She is fluent in Bengali, English, and Hindi, allowing her to serve patients from South Asian communities in their preferred language.",
    ],
    highlights: [
      "Board-certified Physician Assistant",
      "10+ years in internal & hospital medicine",
      "BS from St. John's University; MS from Touro University",
      "Previously at Montefiore Medical Center & Yale New Haven Hospital",
      "Strong multidisciplinary collaboration",
      "Fluent in Bengali, English & Hindi",
    ],
    tone: "#1B75BB",
  },

  // ── CARE & ADMINISTRATIVE TEAM ────────────────────────────────────────────
  {
    slug: "samia-quraishi",
    name: "Samia Quraishi",
    credentials: "",
    title: "Referral Coordinator & Medical Assistant",
    group: "care-admin",
    shortBio:
      "Medical Assistant and Referral Coordinator at AmpleHealth. Graduated MA school in 2023. Passionate about treating every patient the way she'd want her own family treated — with care, clarity, and understanding.",
    fullBio: [
      "Samia Quraishi serves as both a Medical Assistant and Referral Coordinator at AmpleHealth. She graduated from medical assisting school in 2023 and quickly became an integral part of the AmpleHealth team.",
      "Samia's guiding philosophy is simple but powerful: treat every patient the way she would want her own family to be treated — with care, clarity, and understanding. Whether she's assisting during an appointment, coordinating specialist referrals, or helping a patient navigate the healthcare system, she brings that same commitment to every interaction.",
    ],
    highlights: [
      "Medical Assistant & Referral Coordinator",
      "Graduated MA school 2023",
      "Patient-centered, family-like care approach",
    ],
    tone: "#4D97D7",
  },
  {
    slug: "tiffany-schroeder",
    name: "Tiffany Schroeder",
    credentials: "",
    title: "Medical Assistant",
    group: "care-admin",
    shortBio:
      "Dedicated and compassionate Medical Assistant with a strong commitment to providing high-quality, patient-centered care.",
    fullBio: [
      "Dedicated and compassionate Medical Assistant with a strong commitment to providing high-quality, patient-centered care. She graduated from Medical Assistant school in 2023 and began her career with AmpleHealth the same year. Through her experience, she has developed strong clinical, organizational, and leadership skills while supporting providers, patients, and the healthcare team.",
    ],
    highlights: [],
    tone: "#0B324F",
  },
  {
    slug: "shreya-kamra",
    name: "Shreya Kamra",
    credentials: "",
    title: "Medical Assistant",
    group: "care-admin",
    shortBio: "A dedicated member of the AmpleHealth care team.",
    fullBio: [
      "Shreya Kamra is a Medical Assistant at AmpleHealth, supporting the care team in delivering an exceptional patient experience.",
      "A dedicated member of the AmpleHealth team, Shreya brings energy and commitment to her role every day.",
    ],
    highlights: ["Medical Assistant", "Clinical patient support"],
    tone: "#1B75BB",
  },
  {
    slug: "leslie-hernandez",
    name: "Leslie Hernandez",
    credentials: "",
    title: "Medical Assistant",
    group: "care-admin",
    shortBio:
      "Leslie is a committed Medical Assistant who graduated from MA school in 2025.",
    fullBio: [
      "Leslie is a committed Medical Assistant who graduated from MA school in 2025. She loves being able to help and care for patients while making sure each person feels seen, heard, valued, and important. As a bilingual medical assistant who speaks both English and Spanish, she enjoys connecting with and supporting patients from different backgrounds. She is dedicated to providing compassionate care and creating a welcoming, respectful, and comfortable experience for every patient.",
    ],
    highlights: [],
    tone: "#155E96",
  },
  {
    slug: "saif-amiri",
    name: "Saif Amiri",
    credentials: "",
    title: "Medical Assistant",
    group: "care-admin",
    shortBio:
      "Medical Assistant graduate (2026), passionate about helping others and providing quality, compassionate care to every patient.",
    fullBio: [
      "Medical Assistant graduate (2026), passionate about helping others and providing quality, compassionate care to every patient.",
    ],
    highlights: [],
    tone: "#4D97D7",
  },
  {
    slug: "doneal-decapia",
    name: "Doneal Decapia",
    credentials: "BS, RN",
    title: "Front Desk Receptionist",
    group: "care-admin",
    shortBio:
      "BSN graduate from the Philippines and former Philippine Red Cross volunteer. As Front Desk Receptionist, Don manages scheduling, patient communications, documentation, and data entry with exceptional accuracy and strict confidentiality.",
    fullBio: [
      "Don earned his Bachelor of Science in Nursing degree in the Philippines and began his healthcare career as a volunteer with the Philippine Red Cross, where he developed a strong foundation in patient care and community service. Doneal has proven himself to be an indispensable part of AmpleHealth as Front Desk Receptionist.",
      "Don provides dependable support to our team by managing appointment scheduling, patient communications, medical documentation, and data entry with exceptional accuracy and strict attention to confidentiality. His strong organizational skills, attention to detail, and understanding of clinical workflows helps keep operations running smoothly, allowing providers to focus on delivering high-quality patient care.",
      "Outside of work, Don enjoys playing basketball, watching movies, and exploring new destinations and cuisines through travel.",
    ],
    highlights: [
      "BS in Nursing (Philippines)",
      "Red Cross Philippines volunteer",
      "Scheduling, communications, documentation & data entry",
    ],
    tone: "#155E96",
  },
  {
    slug: "franklin-ratunil",
    name: "Franklin Ratunil",
    credentials: "",
    title: "Front Desk Receptionist",
    group: "care-admin",
    shortBio:
      "Franklin is our Front Desk Receptionist with a strong foundation in clinical knowledge and patient care.",
    fullBio: [
      "Franklin is our Front Desk Receptionist with a strong foundation in clinical knowledge and patient care.",
      "At AmpleHealth, Franklin is an indispensable member of the team. Alongside Doneal, he manages incoming phone calls, ensuring patients receive prompt, courteous, and professional assistance. His calm demeanor, excellent communication skills, attention to detail, and ability to multitask help keep the practice running smoothly while delivering an exceptional patient experience.",
      "Outside of work, Franklin enjoys road trips, playing musical instruments, basketball, and following the financial markets.",
    ],
    highlights: ["Front Desk Receptionist", "Patient welcome & coordination"],
    tone: "#104872",
  },
  {
    slug: "liana-khanenia",
    name: "Liana Khanenia",
    credentials: "",
    title: "Front Desk & Receptionist",
    group: "care-admin",
    shortBio: "A dedicated member of the AmpleHealth care team.",
    fullBio: [
      "Liana Khanenia is a Front Desk Receptionist at AmpleHealth, supporting patients with scheduling, check-in, and day-to-day office needs.",
      "A dedicated member of the AmpleHealth team, Liana brings warmth and professionalism to every patient interaction.",
    ],
    highlights: ["Front Desk & Receptionist", "Patient coordination"],
    tone: "#0B324F",
  },
  {
    slug: "mark-ustimov",
    name: "Mark Ustimov",
    credentials: "",
    title: "Front Desk Receptionist",
    group: "care-admin",
    shortBio:
      "Mark handles Front Desk operations and has extensive back-office and administrative experience.",
    fullBio: [
      "Mark handles Front Desk operations and has extensive back-office and administrative experience. He takes pride in providing professional, friendly support to both colleagues and patients. He is currently working toward his long-term goal of attending medical school and building a career in healthcare. In his downtime, he enjoys playing basketball as a way to stay active and unwind.",
    ],
    highlights: [],
    tone: "#C68A3E",
  },
  {
    slug: "cynth-ann-diente",
    name: "Cynth Ann Diente",
    credentials: "",
    title: "Referral Coordinator",
    group: "care-admin",
    shortBio:
      "CynthAnn is one of our two full-time, dedicated Referral Coordinators, helping ensure that patients receive timely, organized, and attentive support throughout the referral process.",
    fullBio: [
      "CynthAnn is one of our two full-time, dedicated Referral Coordinators, helping ensure that patients receive timely, organized, and attentive support throughout the referral process.",
      "With a laboratory-honed eye for detail and a passion for organized workflows, CynthAnn thrives in fast-paced healthcare environments. Her experience spans tertiary hospitals, provincial healthcare facilities, and specialized blood banks, giving her a strong foundation in clinical accuracy, patient safety, and interdisciplinary coordination.",
      "Meticulous, efficient, and highly adaptable, she approaches every referral with careful attention to detail while keeping the patient's needs at the center of the process. She takes ownership of her responsibilities, anticipates needs, and continually looks for ways to improve workflows and strengthen communication between patients, specialists, and our clinical team.",
      "Driven by continuous professional growth, CynthAnn brings discipline, empathy, reliability, and a commitment to excellence to AmpleHealth and the patients we serve.",
    ],
    highlights: [],
    tone: "#4D97D7",
  },
  {
    slug: "cleeve-lyndon-cebedo",
    name: "Cleeve Lyndon Cebedo",
    credentials: "RPh",
    title: "Referral Coordinator",
    group: "care-admin",
    shortBio:
      "With seven years of experience as a hospital pharmacist, Cleeve has worked closely with physicians and other healthcare professionals to support safe, effective patient care.",
    fullBio: [
      "With seven years of experience as a hospital pharmacist, Cleeve has worked closely with physicians and other healthcare professionals to support safe, effective patient care. His background includes ensuring medication accuracy, communicating important drug information, educating patients, and collaborating with clinical teams to achieve the best possible outcomes.",
      "After relocating to the United States, Cleeve demonstrated his versatility by successfully transitioning into a fast-paced, high-volume work environment, where he continued to distinguish himself through accuracy, efficiency, reliability, and consistent performance.",
      "What truly sets Cleeve apart is his approach to his work. He learns quickly, adapts readily to new environments, and takes genuine ownership of his responsibilities. He believes that excellence comes from discipline, accountability, and a willingness to continually improve.",
      "Dependable, adaptable, and results-driven, Cleeve brings the same high standard to every role he takes on and every team he serves. He is one of AmpleHealth's two Referral Coordinators, alongside CynthAnn.",
    ],
    highlights: [],
    tone: "#155E96",
  },
  {
    slug: "anshul-gattani",
    name: "Anshul Gattani",
    credentials: "",
    title: "Quality Coordinator",
    group: "care-admin",
    shortBio:
      "Recent graduate with Honors in Biology from UC Santa Cruz and an aspiring healthcare provider.",
    fullBio: [
      "Recent graduate with Honors in Biology from UC Santa Cruz and an aspiring healthcare provider. He enjoys connecting with patients and helping create a welcoming experience in the healthcare setting. Outside of work, he enjoys playing sports, making music, and spending time outdoors and in nature.",
    ],
    highlights: [],
    tone: "#104872",
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
  name: string;
  date: string;
  rating: number;
  text: string;
};

/** Real patient reviews. Single source for /testimonials and the homepage. */
export const testimonials: Testimonial[] = [
  {
    name: "Susan L.",
    date: "May 09, 2026",
    rating: 5,
    text: "Dr. Faraji was my doctors when I came back to Citrus Heights CA",
  },
  {
    name: "Kim R.",
    date: "May 09, 2026",
    rating: 5,
    text: "Great Dr. was willing to help my mother and work with us to provide the best care for her under difficult medical conditions.",
  },
  {
    name: "Sara C.",
    date: "May 08, 2026",
    rating: 5,
    text: "Yelena is great and we have been going to her for many years. She is very kind, attentive and knows our health history. She is always great to follow up with us on labs X-rays or testing.etc. and will call us with results and further action if needed. We always ask for Yelena for our annual and other needed appointments.",
  },
  {
    name: "Mike K.",
    date: "Dec 03, 2025",
    rating: 5,
    text: "Haven't seen Kamra in years. I see Yelena Popova. She is the Best! She is the reason that I continue to go to this office!",
  },
  {
    name: "Linda A.",
    date: "Nov 19, 2025",
    rating: 5,
    text: "Very thorough, listened to my concerns.",
  },
  {
    name: "Winona B.",
    date: "Nov 12, 2025",
    rating: 5,
    text: "Dr. Kamra is always professional and always answers my questions.",
  },
  {
    name: "Michael R.",
    date: "Oct 20, 2025",
    rating: 5,
    text: "Dr Kamra is a brilliant doctor in every way and his staff is phenomenal!!",
  },
  {
    name: "Dennis V.",
    date: "Oct 14, 2025",
    rating: 5,
    text: "Alice is thorough, never in a hurry, always listens and makes great suggestions!!!",
  },
  {
    name: "Carolyn M.",
    date: "Oct 14, 2025",
    rating: 5,
    text: "Very good Dr. I have not had such a good in years. If you can go see him.",
  },
  {
    name: "Ardell B.",
    date: "Oct 01, 2025",
    rating: 5,
    text: "She is the best doctor and I'm so glad I get to keep her.",
  },
  {
    name: "John K.",
    date: "Sep 30, 2025",
    rating: 5,
    text: "My video visit was with Dr. Nagaraj. She listens carefully and asks appropriate questions. She is very thorough. This is the second time I've seen Dr. Nagaraj, the first visit being in person at the office. I am confident that she has my best interest in mind.",
  },
  {
    name: "Taissia S.",
    date: "Sep 25, 2025",
    rating: 5,
    text: "Thank you! I received all answers on my questions. I know more about my real condition.",
  },
  {
    name: "Marie M.",
    date: "Aug 27, 2025",
    rating: 5,
    text: "So glad I switched doctors to Dr. Kamra!",
  },
  {
    name: "Rhoda T.",
    date: "Jun 04, 2025",
    rating: 5,
    text: "I didn't see Dr Kamra but I did communicate with Yelena Popova PA who called me to let me know the results of my mammogram and breast ultrasound. It was a very timely call coming just hours after the tests, and I appreciate Yelena's professionalism.",
  },
  {
    name: "John R.",
    date: "Apr 11, 2025",
    rating: 5,
    text: "Excellent and caring Doctor.",
  },
  {
    name: "Linda D.",
    date: "Apr 11, 2025",
    rating: 5,
    text: "I am now seeing DR Kamra's new associate DR Mythili Nagaraj. I am very happy with Dr Nagaraj's thorough, thoughtful care and pleasant personality.",
  },
  {
    name: "Joyce C.",
    date: "Mar 21, 2025",
    rating: 5,
    text: "My appointments with Dr. Nagaraj are always very efficient, friendly, and helpful. She never rushes our time and is very attentive to my questions and concerns. Thank you Dr. Nagaraj and staff for making me feel comfortable.",
  },
];

/** The three reviews highlighted on the homepage, in display order. */
export const featuredTestimonials: Testimonial[] = ["Michael R.", "Sara C.", "John K."]
  .map((name) => testimonials.find((t) => t.name === name))
  .filter((t): t is Testimonial => t !== undefined);

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  isoDate: string;
  readTime: string;
  tone: string;
  articleContent: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "botox-vs-xeomin-2026",
    title: "The New Era of Wrinkle Reduction: Botox vs Xeomin in 2026",
    excerpt:
      "Many people are exploring nonsurgical cosmetic treatments, like Botox® and Xeomin®, to improve their skin's appearance. But what's the difference, and which is best for your situation?",
    category: "Aesthetics",
    date: "May 7, 2026",
    isoDate: "2026-05-07",
    readTime: "5 min read",
    tone: "#C68A3E",
    articleContent: [
      "Nonsurgical cosmetic treatments have never been more accessible — or more confusing. Two of the most popular neuromodulators on the market, Botox® and Xeomin®, both relax the muscles responsible for dynamic wrinkles, but they're not identical products. Understanding the difference can help you have a more informed conversation with your provider.",
      "Botox® (onabotulinumtoxinA) has been the gold standard for decades. It contains the botulinum toxin type A complexed with accessory proteins. These proteins may help stabilize the active ingredient, which is why some providers find it has a slightly longer track record across a wide range of uses.",
      "Xeomin® (incobotulinumtoxinA) is sometimes called a 'naked' neuromodulator because it's formulated without those accessory proteins. Some research suggests this may reduce the likelihood of developing antibody resistance over repeated treatments, making it an appealing option for patients who receive injections regularly.",
      "In clinical practice, both products produce comparable results for crow's feet, forehead lines, and the '11 lines' between the brows. The choice often comes down to provider preference, patient history, and specific treatment goals.",
      "At AmpleHealth, our physician-led aesthetic care means you're receiving these treatments from someone trained in anatomy, not just technique. We take a conservative, natural approach — the goal is always to look like a refreshed version of yourself.",
      "If you're curious about whether Botox or Xeomin is right for you, book a consultation with our team. We'll walk you through your options and create a plan tailored to your face and your goals.",
    ],
  },
  {
    slug: "warning-signs-alzheimers",
    title: "Warning Signs of Alzheimer's",
    excerpt:
      "Alzheimer's disease affects millions of Americans. There's no cure, but early detection can help slow symptom progression and improve quality of life. Learn how to spot the early signs.",
    category: "Geriatrics",
    date: "April 7, 2026",
    isoDate: "2026-04-07",
    readTime: "6 min read",
    tone: "#104872",
    articleContent: [
      "Alzheimer's disease is the most common form of dementia, affecting more than 6 million Americans. While there is currently no cure, early detection remains one of the most powerful tools available — giving patients and families more time to plan, access support, and pursue treatments that may slow progression.",
      "The challenge is that many early signs of Alzheimer's are subtle and easy to attribute to normal aging. Knowing what to look for can make a meaningful difference.",
      "Memory loss that disrupts daily life is the most well-known warning sign, but it's important to distinguish this from occasionally forgetting a name or appointment. People with early Alzheimer's often forget recently learned information, ask the same questions repeatedly, or increasingly rely on memory aids for things they previously managed easily.",
      "Other early signs include: challenges in planning or solving problems (difficulty following familiar recipes or managing bills); confusion with time or place (losing track of dates, seasons, or where they are); trouble with visual images and spatial relationships; new problems with words in speaking or writing; misplacing things and being unable to retrace steps; decreased or poor judgment; and withdrawal from social activities.",
      "It's worth noting that occasional memory lapses are normal at any age. The difference with Alzheimer's is frequency, severity, and impact on daily functioning.",
      "If you or someone you love is experiencing several of these signs, talk to a physician. At AmpleHealth, we offer cognitive assessments as part of our geriatric and preventive care and can help you navigate next steps with compassion and clarity.",
    ],
  },
  {
    slug: "choosing-birth-control",
    title: "Choosing the Right Birth Control for You",
    excerpt:
      "Birth control can help prevent an unintended pregnancy or manage conditions like endometriosis. But there are so many options. How do you know what's best for your needs and lifestyle?",
    category: "Women's Health",
    date: "March 17, 2026",
    isoDate: "2026-03-17",
    readTime: "6 min read",
    tone: "#155E96",
    articleContent: [
      "Choosing a birth control method is one of the most personal healthcare decisions a person can make. The right choice depends on your health history, lifestyle, future pregnancy plans, and what matters most to you — whether that's convenience, effectiveness, hormone-free options, or managing an underlying condition like endometriosis or PCOS.",
      "Hormonal methods — including the pill, patch, ring, injection, and hormonal IUD — work by preventing ovulation, thickening cervical mucus, or thinning the uterine lining. They are highly effective when used correctly and can provide additional benefits like reducing menstrual pain, managing acne, and treating endometriosis.",
      "Long-acting reversible contraceptives (LARCs) like the hormonal IUD and copper IUD are among the most effective options available and require no daily action. The copper IUD offers highly effective, hormone-free protection and can also be used as emergency contraception.",
      "Barrier methods — condoms, diaphragms, and cervical caps — do not affect hormones and provide the added benefit (for condoms) of protection against sexually transmitted infections. They require consistent use to be effective.",
      "Permanent options like tubal ligation and vasectomy are appropriate for people who are certain they do not want future pregnancies.",
      "The best birth control is the one you'll use consistently and that fits your health profile. Our providers at AmpleHealth take the time to understand your full picture before making a recommendation — no rushed consultations, no one-size-fits-all answers.",
    ],
  },
  {
    slug: "annual-physical-exam",
    title: "The Importance of Your Annual Physical Exam",
    excerpt:
      "If you feel healthy, it's easy to put off a physical exam. But many medical issues, like high blood pressure, don't have obvious symptoms. Learn why you should schedule an annual physical.",
    category: "Prevention",
    date: "February 18, 2026",
    isoDate: "2026-02-18",
    readTime: "5 min read",
    tone: "#1B75BB",
    articleContent: [
      "It's tempting to skip the annual physical when you feel fine. But feeling fine and being healthy are not the same thing — and that gap is exactly what the annual physical is designed to close.",
      "Many of the most serious and common health conditions develop silently. High blood pressure, elevated cholesterol, pre-diabetes, and early kidney disease often produce no noticeable symptoms until they've been progressing for years. By then, the damage is harder to reverse. Regular checkups catch these conditions early, when intervention is most effective.",
      "The annual physical also gives your physician a baseline. Over time, your doctor builds a longitudinal picture of your health — tracking trends in your lab work, weight, blood pressure, and more. This context is invaluable when something changes.",
      "Beyond the numbers, the annual physical is a conversation. It's an opportunity to discuss anything on your mind — sleep, stress, joint pain, medication side effects, preventive screenings you might be due for, or health goals you want support with.",
      "Preventive screenings are another key component. Depending on your age, sex, and risk factors, your annual visit may include colorectal cancer screening, mammography referral, bone density testing, STI screening, vision and hearing checks, and immunization review.",
      "At AmpleHealth, we don't rush annual physicals. We use them as a foundation for the kind of longitudinal, relationship-driven care that actually keeps people healthy over time. If you haven't scheduled yours yet, there's no better time.",
    ],
  },
  {
    slug: "prp-joint-pain",
    title: "PRP: Why It's a Game-Changer in Remedying Joint Pain",
    excerpt:
      "When you're in pain, medication can mask it for a while, but stopping it for good would be life-changing. Find out if platelet-rich plasma (PRP) could be the therapy that finally gives you your life back.",
    category: "Chronic Care",
    date: "January 26, 2026",
    isoDate: "2026-01-26",
    readTime: "5 min read",
    tone: "#0B324F",
    articleContent: [
      "Joint pain is one of the most common reasons patients seek medical care — and one of the most frustrating to treat. Anti-inflammatory medications can reduce pain in the short term, but they don't address the underlying tissue damage, and long-term use carries its own risks.",
      "Platelet-rich plasma (PRP) therapy offers a different approach: using your body's own healing mechanisms to repair damaged tissue. PRP is derived from a small sample of your own blood, which is then processed to concentrate the platelets — cells that are rich in growth factors critical to tissue repair and regeneration.",
      "The concentrated PRP is then injected directly into the affected joint or tissue. The growth factors stimulate cellular repair, reduce inflammation, and support the regeneration of tendons, ligaments, and cartilage. For many patients with osteoarthritis, tendinopathy, or sports injuries, PRP provides sustained relief that outlasts conventional treatments.",
      "The evidence base for PRP continues to grow. Studies have shown meaningful improvements in knee osteoarthritis, rotator cuff tendinopathy, and lateral epicondylitis (tennis elbow), among other conditions. Because PRP is derived from your own blood, the risk of adverse reactions is low.",
      "PRP isn't right for everyone, and it's important to set realistic expectations. It typically requires one to three sessions and may take several weeks for the full effect to be felt. But for patients who have plateaued with physical therapy and want to avoid surgery, it represents a meaningful option.",
      "Talk to your AmpleHealth provider to find out if PRP therapy might be appropriate for your situation.",
    ],
  },
  {
    slug: "birth-control-options",
    title: "What Are My Birth Control Options?",
    excerpt:
      "Birth control can prevent unwanted pregnancies and help manage certain medical conditions, but which type is right for you?",
    category: "Women's Health",
    date: "June 4, 2025",
    isoDate: "2025-06-04",
    readTime: "4 min read",
    tone: "#155E96",
    articleContent: [
      "Understanding your birth control options is an important part of managing your reproductive health. Whether your goal is preventing pregnancy, managing a medical condition, or both, there's likely an option that fits your life.",
      "Hormonal contraceptives include combined oral contraceptive pills (estrogen and progestin), progestin-only pills (the 'mini-pill'), the contraceptive patch, the vaginal ring, the injectable (Depo-Provera), and hormonal IUDs. Each has different dosing schedules, side effect profiles, and suitability depending on your health history.",
      "Non-hormonal options include the copper IUD (highly effective, hormone-free, lasts up to 10 years), barrier methods like condoms and diaphragms, and fertility awareness-based methods for those who prefer a natural approach.",
      "Permanent contraception (tubal ligation, vasectomy) is available for individuals certain they do not want future pregnancies.",
      "Emergency contraception — including Plan B and the copper IUD — is available for use after unprotected sex.",
      "The right choice is deeply personal. Your medical history, future pregnancy plans, and lifestyle all matter. Schedule an appointment with an AmpleHealth provider for a confidential conversation about which options are right for you.",
    ],
  },
  {
    slug: "telehealth-for-everyone",
    title: "Can Telehealth Work for Me If I'm Technically Challenged?",
    excerpt:
      "Worried that telehealth might be too complicated if you're not great with technology? You might be surprised at how simple and accessible virtual visits have become.",
    category: "Telehealth",
    date: "May 5, 2025",
    isoDate: "2025-05-05",
    readTime: "3 min read",
    tone: "#4D97D7",
    articleContent: [
      "Telehealth has come a long way. What once required specialized software, headsets, and a steep learning curve now works on virtually any smartphone or computer with a browser and a camera. If you can video chat with a family member, you can do a telehealth visit.",
      "The most common concern we hear is: 'I'm not good with technology.' But modern telehealth platforms are designed with accessibility in mind. Most require nothing more than clicking a link in an email or text message. No downloads, no accounts, no passwords.",
      "For patients who prefer a guided experience, our staff can walk you through the setup process over the phone before your appointment. We build in time to troubleshoot together so that technical issues don't cut into your visit time.",
      "Telehealth is particularly well-suited for follow-up appointments, medication management, minor acute concerns, and conversations about lab results or care plans. For these types of visits, the quality of care is equivalent to an in-person visit.",
      "There are situations where an in-person visit is necessary — physical exams, procedures, and certain urgent concerns require being in the office. Our team will always help you identify the right format for your needs.",
      "If you've been putting off a visit because getting to the office is difficult, telehealth may be the answer. Call us to schedule, and we'll make sure you're comfortable with the technology before your appointment.",
    ],
  },
];

// Placeholder Google reviews trust data
export const reviews = {
  rating: 4.9,
  count: 180,
};

// Placeholder insurance partners
export type Insurer = {
  name: string;
  type: string;
  description: string;
  color: string;
  logo?: string;
  domain?: string;
  logoUrl?: string; // direct URL takes precedence over domain-based lookup
};

export const insurers: Insurer[] = [
  {
    name: "Aetna",
    type: "Commercial",
    description: "PPO, HMO, and Medicare Advantage plans accepted. One of the largest national insurers.",
    color: "#7B2D8B",
    domain: "aetna.com",
  },
  {
    name: "Anthem Blue Cross",
    type: "Commercial",
    description: "California's largest for-profit health insurer offering PPO and HMO plans.",
    color: "#286CE2",
    domain: "anthem.com",
  },
  {
    name: "Blue Shield of California",
    type: "Commercial",
    description: "Non-profit insurer offering a wide range of PPO, HMO, and HSP plans statewide.",
    color: "#005CB9",
    domain: "blueshieldca.com",
  },
  {
    name: "Cigna",
    type: "Commercial",
    description: "National carrier with broad PPO and HMO networks, including behavioral health.",
    color: "#005DAA",
    domain: "cigna.com",
  },
  {
    name: "Health Net",
    type: "Commercial",
    description: "California-based managed care plan with Medi-Cal, commercial, and Medicare options.",
    color: "#0080C6",
    domain: "healthnet.com",
  },
  {
    name: "Medicare",
    type: "Government",
    description: "Original Medicare (Parts A & B) accepted. Medicare Advantage plans vary — please call to confirm.",
    color: "#1565C0",
    domain: "medicare.gov",
  },
  {
    name: "Sutter Health Plan",
    type: "Commercial",
    description: "Regional non-profit plan offering group and individual coverage across Northern California.",
    color: "#2C7D3D",
    domain: "sutterhealth.org",
  },
  {
    name: "United Healthcare",
    type: "Commercial",
    description: "The nation's largest carrier with PPO, HMO, and Medicare Advantage products.",
    color: "#0066CC",
    domain: "uhc.com",
  },
  {
    name: "Western Health Advantage",
    type: "Commercial",
    description: "Sacramento-based non-profit HMO created by local health systems, serving the greater Sacramento region.",
    color: "#4E7C31",
    logoUrl: "/insurance/western-health-advantage.png",
  },
  {
    name: "Hill Physicians",
    type: "IPA / Medical Group",
    description: "One of the largest independent physician associations in Northern California, working with multiple health plans.",
    color: "#C8102E",
    domain: "hillphysicians.com",
  },
  {
    name: "MD Partners IPA",
    type: "IPA / Medical Group",
    description: "Sacramento-area independent physician association offering care coordination across multiple health plans.",
    color: "#1B75BB",
    // No confirmed public domain — falls back to letter avatar
  },
  {
    name: "Sutter Independent Physicians",
    type: "IPA / Medical Group",
    description: "Independent physician association aligned with Sutter Health, coordinating care across the Sacramento region.",
    color: "#00A499",
    logoUrl: "/insurance/sutter-independent-physicians.png",
  },
  {
    name: "Vivant Health",
    type: "Managed Care",
    description: "Sacramento-region managed care plan focused on whole-person, coordinated healthcare.",
    color: "#4CAF50",
    domain: "vivanthealth.com",
    logoUrl: "https://vivanthealth.com/wp-content/uploads/2024/08/tt.png",
  },
  {
    name: "SCAN Health Plan",
    type: "Managed Care",
    description: "Not-for-profit Medicare Advantage plan focused on keeping seniors healthy and independent.",
    color: "#DA291C",
    logoUrl: "/insurance/scan.png",
  },
  {
    name: "Central Health Medicare Plan",
    type: "Managed Care",
    description: "Medicare Advantage plan offering coordinated, culturally attuned care for seniors in California.",
    color: "#2E6C68",
    logoUrl: "/insurance/central-health-medicare-plan.png",
  },
  {
    name: "Alignment Health Plan",
    type: "Managed Care",
    description: "California-based Medicare Advantage plan built around personalized senior care and 24/7 clinical support.",
    color: "#1B3A5C",
    logoUrl: "/insurance/alignment-health-plan.png",
  },
];
