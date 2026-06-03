// Centralized content for the AmpleHealth site.

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
  mapQuery: string;
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
  tone: string;
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
    tone: "#155E96",
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
    tone: "#C68A3E",
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
    tone: "#104872",
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
    name: "Mythli Nagaraj",
    credentials: "MD",
    title: "Physician",
    group: "physicians",
    shortBio:
      "USMLE-certified physician and Diplomate of the American Board of Integrative and Holistic Medicine. Dr. Nagaraj brings advanced functional medicine training and a whole-person philosophy to every patient encounter.",
    fullBio: [
      "Dr. Mythli Nagaraj is a physician at AmpleHealth who joined the practice in January 2024. She holds an active California medical license, DEA certification, and is certified in both BLS and ACLS.",
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
    slug: "katelynn-mcgarrah",
    name: "Katelynn McGarrah",
    credentials: "",
    title: "Referral Coordinator & Medical Assistant",
    group: "care-admin",
    shortBio:
      "A dedicated member of the AmpleHealth care team, serving as both a Referral Coordinator and Medical Assistant.",
    fullBio: [
      "Katelynn McGarrah is a Referral Coordinator and Medical Assistant at AmpleHealth, supporting patients through every step of their care experience.",
      "A dedicated member of the AmpleHealth team, Katelynn is committed to ensuring that referrals and care coordination are handled with efficiency and compassion.",
    ],
    highlights: [
      "Referral Coordinator & Medical Assistant",
      "Care coordination & patient support",
    ],
    tone: "#155E96",
  },
  {
    slug: "veronica-tkachuk",
    name: "Veronica Tkachuk",
    credentials: "",
    title: "Phlebotomist & Medical Assistant",
    group: "care-admin",
    shortBio:
      "A dedicated member of the AmpleHealth care team, serving as both a Phlebotomist and Medical Assistant.",
    fullBio: [
      "Veronica Tkachuk is a Phlebotomist and Medical Assistant at AmpleHealth. She supports the clinical team and ensures patients feel comfortable during lab draws and clinical procedures.",
      "A dedicated member of the AmpleHealth team, Veronica brings professionalism and care to every patient interaction.",
    ],
    highlights: [
      "Phlebotomist & Medical Assistant",
      "Clinical support & lab services",
    ],
    tone: "#104872",
  },
  {
    slug: "tiffany-schroeder",
    name: "Tiffany Schroeder",
    credentials: "",
    title: "Medical Assistant",
    group: "care-admin",
    shortBio: "A dedicated member of the AmpleHealth care team.",
    fullBio: [
      "Tiffany Schroeder is a Medical Assistant at AmpleHealth, providing essential clinical support to both patients and providers.",
      "A dedicated member of the AmpleHealth team, Tiffany is committed to delivering attentive, high-quality care to every patient she works with.",
    ],
    highlights: ["Medical Assistant", "Clinical patient support"],
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
    slug: "aaliyah-childs",
    name: "Aaliyah Childs",
    credentials: "CMA",
    title: "Front Desk & Certified Medical Assistant",
    group: "care-admin",
    shortBio:
      "Certified Medical Assistant and front desk team member. Graduated high school 2024, completed medical assisting school 2025. Inspired by her mother's work as a caregiver. Plans to pursue nursing education in 2026.",
    fullBio: [
      "Aaliyah Childs is a Certified Medical Assistant and front desk team member at AmpleHealth. She graduated from high school in 2024 and completed her medical assisting training in 2025, bringing dedication and a fresh perspective to the team.",
      "Aaliyah was inspired to pursue healthcare by watching her mother work as a caregiver — a role that showed her firsthand the difference that compassionate, attentive care can make in a person's life.",
      "She plans to continue her education by pursuing nursing in 2026, and sees her time at AmpleHealth as an important foundation for her clinical career.",
    ],
    highlights: [
      "Certified Medical Assistant (CMA)",
      "Front Desk & patient coordination",
      "Completed medical assisting school 2025",
      "Aspiring nursing student (2026)",
    ],
    tone: "#C68A3E",
  },
  {
    slug: "doneal-decapia",
    name: "Doneal Decapia",
    credentials: "BS, RN",
    title: "Front Desk & Healthcare Virtual Assistant",
    group: "care-admin",
    shortBio:
      "BS in Nursing from the Philippines. Red Cross Philippines volunteer. Trained Healthcare Virtual Assistant (Hello Rache). Manages scheduling, patient communications, data entry, and documentation. Enjoys basketball, movies, and travel.",
    fullBio: [
      "Doneal Decapia brings a healthcare background and a service-first mindset to his role on the AmpleHealth front desk. He earned his Bachelor of Science in Nursing from the Philippines and has served as a volunteer with the Red Cross Philippines.",
      "Doneal is a trained Healthcare Virtual Assistant through Hello Rache, a program that prepares healthcare professionals for virtual support roles. He manages scheduling, patient communications, data entry, and clinical documentation with precision and care.",
      "Outside of work, Doneal enjoys basketball, movies, and travel.",
    ],
    highlights: [
      "BS in Nursing (Philippines)",
      "Red Cross Philippines volunteer",
      "Healthcare Virtual Assistant — Hello Rache certified",
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
    shortBio: "A dedicated member of the AmpleHealth care team.",
    fullBio: [
      "Franklin Ratunil is a Front Desk Receptionist at AmpleHealth, often the first friendly face patients encounter when they visit or call.",
      "A dedicated member of the AmpleHealth team, Franklin is committed to making every patient feel welcomed and well taken care of from the moment they arrive.",
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
