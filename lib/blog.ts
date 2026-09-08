import type { BlogRow } from "@/lib/supabase";

export type DisplayPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  isoDate: string;
  readTime: string;
  tone: string;
  imageUrl: string;
  content: string;
};

// One distinct image per category. Every category the generator can emit
// (VALID_CATEGORIES in app/api/generate-blog/route.ts) has its own entry, plus
// the legacy category names still present on older posts. Each URL was
// load-tested and viewed before being committed. Geriatrics intentionally
// serves both of its current posts.
const CATEGORY_IMAGES: Record<string, string> = {
  // clinicians reviewing screening imagery
  "Preventive Care": "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800",
  // stethoscope — the classic check-up (legacy category name)
  Prevention:        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
  // blood-pressure cuff mid-reading
  "Chronic Disease": "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=800",
  // physician at a patient's bedside (legacy category name)
  "Chronic Care":    "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800",
  // a clean clinical stethoscope. Replaced photo-1498837167922, which is now on
  // the hard blocklist: it was simultaneously this category image, the Obesity
  // and Metabolic Wellness service hero, and the image on two posts.
  "Heart Health":    "https://images.unsplash.com/photo-1655313719493-16ebe4906441?w=800",
  // strength and conditioning
  "Women's Health":  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
  // a clinician with a tablet. Replaced photo-1576091160550, which is now the
  // reviewed image for the telehealth-for-everyone post — a fallback must never
  // be able to duplicate a post.
  "Men's Health":    "https://images.unsplash.com/photo-1631217872822-1c2546d6b864?w=800",
  // a prepared, balanced meal
  Nutrition:         "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
  // meditation at sunrise
  "Mental Health":   "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
  // anatomical brain model — sleep and neurological wellbeing
  Wellness:          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
  // an immunisation being given
  "Seasonal Health": "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800",
  // physician outdoors — shared by both current Geriatrics posts
  Geriatrics:        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800",
  // clinician with a smartphone
  Telehealth:        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
  // aesthetic treatment in progress
  Aesthetics:        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
};

// Last resort only — distinct from every category image above, so its
// appearance is a visible signal that a category is missing from the map.
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800";

// Returns a reliable Unsplash direct URL. Uses the category map unless the
// stored image_url is already a direct images.unsplash.com URL.
/** The canonical image for a category, used by the blog generator so the
 *  stored image_url matches what the site will actually render. */
export function imageForCategory(category: string | null): string {
  return CATEGORY_IMAGES[category ?? ""] ?? DEFAULT_IMAGE;
}

// ── Hand-picked images ─────────────────────────────────────────────────────

/**
 * Photos chosen by a human for a specific post, keyed by slug.
 *
 * Automated Unsplash selection tops out around 60% usable on clinical subjects:
 * the queries are right, but the library answers "back pain" with lifestyle
 * stock and "bones aging" with a skeleton. Rather than keep tuning queries
 * against that ceiling, a reviewed pick is recorded here and wins over anything
 * the search returns.
 *
 * The backfill consults this FIRST and only searches when a slug is absent, so
 * these survive re-runs and any future backfill.
 *
 * Values are Unsplash photo ids ("photo-<id>"), not full URLs, so the rendered
 * size and crop stay under our control.
 */
export const IMAGE_OVERRIDES: Record<string, string> = {
  // ── Telehealth ──
  "telehealth-for-everyone": "photo-1576091160550-2173dba999ef",
  "preparing-for-your-first-telehealth-appointment-amplehealth":
    "photo-1758691462743-f9fc9e430d39",

  // ── Preventive / general ──
  // "Doctor talking to patient in an office". The title-derived query returned
  // an infant's hand; "doctor examining adult patient" is what found this.
  "annual-physical-exam": "photo-1758691461935-202e2ef6b69f",
  "what-happens-at-a-wellness-visit-why-it-matters":
    "photo-1603398938378-e54eab446dde",
  // "a close up of a person's tanning legs" — sun exposure, the actual risk
  // factor, rather than the magnifying glass the search preferred.
  "skin-cancer-screening-guide-sacramento-patients":
    "photo-1678896412871-4b8f6b8a16f9",

  // ── Chronic disease ──
  "understanding-high-blood-pressure-what-every-patient-needs-to-know":
    "photo-1725870953863-4ad4db0acfc2",
  "thyroid-health-hypothyroidism-hyperthyroidism-sacramento":
    "photo-1769029174099-30d43d3e86b1",

  // ── Heart health ──
  // "a stethoscope with a heart on top of it" — warmer than the red blood cell
  // render the query returned, and safely clear of 12.a7, which is blocked.
  "truth-about-cholesterol-what-your-numbers-mean-how-to-improve-them":
    "photo-1690785884403-2bff26562857",
  "beyond-statins-newer-cholesterol-treatments-amplehealth":
    "photo-1587854692152-cbe660dbde88",

  // ── Mental health / wellness ──
  // "man covering face with both hands while sitting on bench" — legible as
  // distress without the laptop-at-a-desk framing of the top results.
  "practical-stress-management-tips-amplehealth": "photo-1541199249251-f713e6145474",
  "depression-screening-annual-visit-ample-health":
    "photo-1493836512294-502baa1986e2",
  "why-youre-exhausted-but-cant-sleep-common-sleep-disorders-guide":
    "photo-1531353826977-0941b4779a1c",
  // "clipboard with a spinal cord print manual" — anatomical rather than the
  // lifestyle stock that dominates Unsplash's results for "back pain".
  "why-your-back-hurts-and-what-you-can-do-about-it":
    "photo-1539815208687-a0f05e15d601",

  // ── Geriatrics ──
  // "an older person holding the hand of a younger person". The query
  // "alzheimers" returned a wheelchair, which misreads a cognitive condition
  // as a mobility one.
  "warning-signs-alzheimers": "photo-1739932885175-5fdaa1bd5989",
  // "an older man and woman with grey hair walking arm in arm down a road".
  // Every one of the ten results for "bones aging" was a skeleton or a skull.
  "healthy-aging-guide-seniors-carmichael-sacramento":
    "photo-1625690987114-86f5af994b49",

  // ── Nutrition ──
  "eat-well-live-well-simple-nutrition-tips-amplehealth":
    "photo-1590779032260-5623d6774f7a",
  "eating-for-energy-balanced-meals-that-keep-you-full":
    "photo-1565895405137-3ca0cc5088c8",

  // ── Seasonal ──
  "sacramento-winter-cold-flu-survival-guide": "photo-1529386317747-0a2a51add902",

  // ── Aesthetics ──
  // "a woman getting a facial peel from a doctor" — clinician-administered,
  // which is closer to injectables than the spa masks around it.
  "botox-vs-xeomin-2026": "photo-1713085085470-fba013d67e65",

  // ── Men's health ──
  // WEAK PICK, REVISIT. "two men sitting at a desk talking to each other."
  // Unsplash has essentially nothing for prostate screening — the full top ten
  // for "prostate men screening" were smartphones, tablets, a massage and a
  // woman on a bed. This was the least bad of a bad set rather than a good
  // match. Worth replacing with purchased stock or a real practice photo.
  "prostate-health-screening-guide-sacramento-carmichael":
    "photo-1739285388427-d6f85d12a8fc",

  // ── Women's health ──
  // "woman sitting on sofa holding book" — calm and non-clinical; the set had
  // no photograph that actually depicts menopause care.
  "navigating-menopause-symptoms-treatments-when-to-call-your-doctor":
    "photo-1558713089-d1aad46c19bf",
};

/**
 * Photos barred from ever being selected again.
 *
 * photo-1498837167922 is the vegetable macro that started this: it was the
 * hardcoded "Heart Health" category image, the Obesity and Metabolic Wellness
 * service hero, and the image on two separate blog posts simultaneously. It is
 * filtered out of every search result rather than merely avoided, so no future
 * query can reintroduce it.
 */
export const BLOCKED_PHOTO_IDS = new Set<string>([
  "photo-1498837167922-ddd27525d352",
  // A protest placard carrying profanity, returned in the top ten for the
  // query "cholesterol". Harmless in a review list, unacceptable if the Monday
  // cron ever picked it unattended.
  "photo-1760847664430-ad83b1598ab0",
]);

/** The Unsplash photo id inside a URL, or "" if there isn't one. */
export function photoIdFromUrl(url: string | null): string {
  if (!url) return "";
  return url.match(/photo-[0-9a-z]+-[0-9a-z]+/i)?.[0] ?? "";
}

/** A rendered URL for a bare Unsplash photo id. */
export function unsplashUrlForId(photoId: string): string {
  return `https://images.unsplash.com/${photoId}?q=80&w=1200&auto=format&fit=crop`;
}

/** The reviewed pick for a post, as a ready-to-store URL, or null. */
export function overrideImageForSlug(slug: string | null): string | null {
  if (!slug) return null;
  const id = IMAGE_OVERRIDES[slug];
  return id ? unsplashUrlForId(id) : null;
}

// ── Image search queries ───────────────────────────────────────────────────
// A post title is a headline, not a description of a photograph. Feeding one
// to Unsplash verbatim matches its rhetoric instead of its subject: "Warning
// Signs of Alzheimer's" returned a yellow-and-black POISON sign, "The Truth
// About Cholesterol" returned a scale captioned "fake news", and "Strong Bones,
// Sharp Mind" returned a skeleton. The job here is to throw the headline away
// and keep the clinical subject.

/** Grammatical connectives. Mirrors titleSimilarity() in the generator route. */
const QUERY_STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "for", "to", "in", "of", "with",
  "how", "your", "you", "is", "are", "its", "it", "on", "at", "by",
  "what", "why", "when", "can", "does", "do", "about", "from", "that",
  "this", "know", "need", "should", "into", "than", "then", "but", "not",
  "was", "were", "has", "have", "will", "would", "could", "any", "all",
]);

/**
 * Editorial scaffolding. These survive ordinary stop-word filtering and are
 * exactly what produced the bad matches — Unsplash happily finds a literal
 * photograph of a "warning sign" or the word "truth".
 */
const RHETORICAL_WORDS = new Set([
  "truth", "beyond", "warning", "warnings", "sign", "signs", "navigating",
  "navigate", "surprising", "hidden", "myth", "myths", "real", "really",
  "actually", "everything", "guide", "guides", "tips", "tip", "numbers",
  "number", "blue", "strong", "sharp", "steady", "spot", "bundle", "fight",
  "taming", "tame", "era", "new", "newer", "newest", "just", "more", "most",
  "less", "better", "best", "worse", "worst", "simple", "practical", "easy",
  "essential", "important", "importance", "matter", "matters", "means",
  "meaning", "happens", "happening", "worth", "showing", "first", "every",
  "everyday", "common", "confidence", "confident", "steps", "step", "story",
  "stories", "secret", "secrets", "ultimate", "complete", "quick", "smooth",
  "productive", "prepare", "preparing", "ready", "start", "starting", "stop",
  "stopping", "avoid", "avoiding", "improve", "improving", "build", "building",
  "keep", "keeping", "make", "making", "take", "taking", "get", "getting",
  "feeling", "feel", "feels", "look", "looking", "call", "calling", "talk",
  "talking", "ask", "asking", "say", "saying", "tell", "telling", "think",
  "thinking", "learn", "learning", "understand", "understanding", "explained",
  "explain", "answer", "answers", "question", "questions", "reasons", "reason",
  "ways", "way", "things", "thing", "much", "many", "own", "yours", "mine",
  "life", "lives", "living", "live", "well", "back", "over", "under", "out",
  "off", "down", "left", "right", "before", "after", "during", "while",
  "might", "may", "let", "lets", "who", "which", "where", "whose",
]);

/**
 * Practice, person and place tokens. None of these will ever match a stock
 * photograph, and including them is what made three posts return zero results.
 */
const LOCAL_TOKENS = new Set([
  "amplehealth", "ample", "health-", "sacramento", "carmichael", "california",
  "kamra", "pareek", "nageswaran", "faraji", "nagaraj", "hernandez",
]);

/**
 * Concrete clinical, anatomical and procedural nouns. A title-derived query is
 * only used when at least one of these survives filtering — otherwise whatever
 * is left is headline residue, and the category query is the safer photograph.
 */
const CLINICAL_TERMS = new Set([
  // cardiovascular & metabolic
  "cholesterol", "statin", "statins", "lipid", "lipids", "triglycerides",
  "heart", "cardiac", "cardiovascular", "cardiology", "artery", "arteries",
  "stroke", "blood", "pressure", "hypertension", "circulation",
  "diabetes", "diabetic", "glucose", "insulin", "sugar", "metabolic",
  "metabolism", "obesity", "weight", "thyroid", "hypothyroidism",
  "hyperthyroidism", "hormone", "hormones",
  // organs & systems
  "kidney", "kidneys", "renal", "dialysis", "liver", "lung", "lungs",
  "respiratory", "breathing", "asthma", "copd", "stomach", "digestion",
  "digestive", "gut", "bladder", "prostate", "bone", "bones", "osteoporosis",
  "joint", "joints", "arthritis", "spine", "muscle", "muscles", "skin",
  "dermatology", "eye", "eyes", "vision", "hearing", "brain", "nerve",
  // conditions & screening
  "cancer", "melanoma", "colorectal", "colonoscopy", "screening", "screenings",
  "mammogram", "biopsy", "diagnosis", "symptom", "symptoms", "pain", "ache",
  "inflammation", "infection", "fever", "cough", "flu", "influenza", "cold",
  "virus", "allergy", "allergies", "vaccine", "vaccination", "vaccines",
  "immunization", "immunity",
  // mind, sleep, aging
  "sleep", "insomnia", "apnea", "fatigue", "exhausted", "stress", "anxiety",
  "depression", "mental", "mood", "memory", "dementia", "alzheimer",
  "alzheimers", "cognition", "cognitive", "aging", "senior", "seniors",
  "elderly", "geriatric", "fall", "falls", "balance", "mobility",
  // women's & men's health
  "menopause", "menstrual", "pregnancy", "prenatal", "contraception",
  "women", "woman", "men", "man", "fertility",
  // lifestyle & care delivery
  "nutrition", "diet", "food", "eating", "meal", "meals", "vegetables",
  "produce", "exercise", "fitness", "walking", "running", "hydration",
  "vitamin", "vitamins", "smoking", "alcohol",
  "telehealth", "telemedicine", "virtual", "appointment", "checkup",
  "physical", "exam", "examination", "clinic", "doctor", "physician",
  "nurse", "patient", "medication", "medications", "prescription", "treatment",
  "treatments", "therapy", "surgery", "recovery", "rehabilitation",
]);

/**
 * The photograph to look for when a title yields nothing usable. Every category
 * the generator can emit has an entry, plus the legacy names still on older
 * posts, so a query is never empty — three posts previously searched for things
 * like "first telehealth visit amplehealth prepare" and got zero results.
 */
export const CATEGORY_QUERIES: Record<string, string> = {
  "Preventive Care": "preventive medicine checkup",
  Prevention: "doctor stethoscope checkup",
  "Chronic Disease": "chronic condition monitoring",
  "Chronic Care": "physician patient bedside",
  "Heart Health": "heart health cardiology",
  "Women's Health": "womens health clinic",
  "Men's Health": "mens health checkup",
  Nutrition: "healthy food nutrition",
  "Mental Health": "mental health calm",
  Wellness: "wellness rest recovery",
  "Seasonal Health": "seasonal illness vaccine",
  Geriatrics: "older adult care",
  Telehealth: "telemedicine video consultation",
  Aesthetics: "skincare treatment",
};

const DEFAULT_QUERY = "medical care clinic";

/** Split a title into lowercase word tokens, dropping punctuation entirely. */
function tokenize(title: string): string[] {
  return title
    .toLowerCase()
    .replace(/[\u2019']/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Clinical subject terms from a title, in title order, capped at three so the
 * query stays broad enough for Unsplash to return anything at all.
 */
function clinicalTermsFromTitle(title: string): string[] {
  const tokens = tokenize(title);
  // "back" is anatomical in "back pain" but rhetorical in "fight back", so it
  // is in RHETORICAL_WORDS by default and only reinstated alongside a pain word.
  const backIsAnatomical =
    tokens.includes("back") &&
    tokens.some((t) => ["pain", "hurts", "hurt", "ache", "aches", "aching"].includes(t));

  const kept: string[] = [];
  for (const token of tokens) {
    if (token.length < 3) continue;
    if (/^\d+$/.test(token)) continue; // bare numerals: "101", "65", "2026"
    if (LOCAL_TOKENS.has(token)) continue;
    if (QUERY_STOP_WORDS.has(token)) continue;
    if (token === "back") {
      // Bare "back" retrieves backs of heads and landscapes; the pair is what
      // actually finds the subject.
      if (backIsAnatomical && !kept.includes("back")) {
        kept.push("back");
        if (!kept.includes("pain")) kept.push("pain");
      }
      continue;
    }
    if (RHETORICAL_WORDS.has(token)) continue;
    if (!CLINICAL_TERMS.has(token)) continue;
    if (!kept.includes(token)) kept.push(token);
    if (kept.length === 3) break;
  }
  return kept;
}

/** Turn a generator topic keyword ("blood-pressure") into a query. */
function keywordToQuery(keyword: string): string {
  return keyword.toLowerCase().replace(/[-_]+/g, " ").trim();
}

/**
 * The queries to try for a post, most specific first, never empty.
 *
 * Order is deliberate: the generator's own curated per-topic keyword is the
 * best signal available because a human chose it, the title's clinical nouns
 * come next, and the category query is the guaranteed floor. Callers should try
 * each in turn and stop at the first that returns results.
 *
 * Exported so the backfill script and the live generator derive queries the
 * same way — this logic must not be duplicated.
 */
export function imageQueriesForPost(
  title: string,
  category: string | null,
  keyword?: string | null
): string[] {
  const queries: string[] = [];

  if (keyword) {
    const fromKeyword = keywordToQuery(keyword);
    if (fromKeyword) queries.push(fromKeyword);
  }

  const clinical = clinicalTermsFromTitle(title);
  if (clinical.length > 0) queries.push(clinical.join(" "));

  queries.push(CATEGORY_QUERIES[category ?? ""] ?? DEFAULT_QUERY);

  return queries.filter((q, i) => q.length > 0 && queries.indexOf(q) === i);
}

/** One Unsplash search hit, reduced to what callers actually use. */
export type UnsplashCandidate = {
  url: string;
  /** Unsplash's own description of what the photo depicts, when it has one. */
  alt: string | null;
  /** Photographer, for attribution during review. */
  photographer: string | null;
};

/**
 * Raw Unsplash landscape search. Returns [] — never throws — on a missing key,
 * network failure, non-200 response or empty result set.
 *
 * Exported so the backfill can collect candidates and their alt text through
 * exactly the same call the generator makes.
 */
export async function searchUnsplash(
  query: string,
  perPage = 10
): Promise<UnsplashCandidate[]> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key || !query) return [];

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=${perPage}&orientation=landscape`,
      {
        headers: { Authorization: `Client-ID ${key}` },
        cache: "no-store",
      }
    );
    if (!res.ok) {
      const remaining = res.headers.get("x-ratelimit-remaining");
      console.warn(
        `searchUnsplash: Unsplash returned ${res.status} for "${query}"` +
          (remaining !== null ? ` (rate limit remaining: ${remaining})` : "")
      );
      return [];
    }

    const data = (await res.json()) as {
      results?: {
        alt_description?: string | null;
        description?: string | null;
        urls?: { regular?: string };
        user?: { name?: string | null };
      }[];
    };
    return (data.results ?? [])
      .map((r) => ({
        url: r.urls?.regular ?? "",
        alt: r.alt_description ?? r.description ?? null,
        photographer: r.user?.name ?? null,
      }))
      .filter((c) => c.url.length > 0 && !BLOCKED_PHOTO_IDS.has(photoIdFromUrl(c.url)));
  } catch (err) {
    console.warn(`searchUnsplash: lookup failed for "${query}"`, err);
    return [];
  }
}

/**
 * A landscape photo matching a post's clinical subject, or null.
 *
 * Tries each query from imageQueriesForPost in turn and stops at the first that
 * returns anything, so a post whose title yields no usable terms still falls
 * through to its category query rather than coming back empty. One of the top
 * few results is chosen at random so posts on adjacent topics don't collide.
 *
 * Returns null — never throws — when UNSPLASH_ACCESS_KEY is unset or every
 * query comes back empty, so callers can fall back to imageForCategory.
 */
export async function imageForTitle(
  title: string,
  category: string | null = null,
  keyword?: string | null
): Promise<string | null> {
  if (!process.env.UNSPLASH_ACCESS_KEY) return null;

  for (const query of imageQueriesForPost(title, category, keyword)) {
    const candidates = await searchUnsplash(query, 5);
    if (candidates.length === 0) continue;
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    return pick.url;
  }
  return null;
}

export function imageForPost(imageUrl: string | null, category: string | null): string {
  if (imageUrl && imageUrl.startsWith("https://images.unsplash.com")) {
    return imageUrl;
  }
  return CATEGORY_IMAGES[category ?? ""] ?? DEFAULT_IMAGE;
}

// Brand-palette color per category, with a fallback to brand blue.
const CATEGORY_TONES: Record<string, string> = {
  "Preventive Care": "#1B75BB",
  Prevention: "#1B75BB",
  "Chronic Disease": "#0B324F",
  "Chronic Care": "#0B324F",
  "Women's Health": "#155E96",
  Nutrition: "#2C7D3D",
  "Mental Health": "#155E96",
  "Seasonal Health": "#C68A3E",
  Aesthetics: "#C68A3E",
  Geriatrics: "#104872",
  Telehealth: "#4D97D7",
};

export function toneForCategory(category: string | null): string {
  if (!category) return "#1B75BB";
  return CATEGORY_TONES[category] ?? "#1B75BB";
}

// Rough reading time from markdown content (~200 wpm).
export function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function mapRow(row: BlogRow): DisplayPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    category: row.category ?? "Health",
    date: formatDate(row.published_at),
    isoDate: row.published_at,
    readTime: readingTime(row.content),
    tone: toneForCategory(row.category),
    imageUrl: imageForPost(row.image_url, row.category),
    content: row.content,
  };
}
