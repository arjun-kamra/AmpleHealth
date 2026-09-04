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
  // vegetables and pulses — the diet side of lipid management
  "Heart Health":    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800",
  // strength and conditioning
  "Women's Health":  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
  // clinician reviewing results at a workstation
  "Men's Health":    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
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

// Same filtering as titleSimilarity() in app/api/generate-blog/route.ts —
// drop connective words so the query carries only the title's subject matter.
const QUERY_STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "for", "to", "in", "of", "with",
  "how", "your", "you", "is", "are", "its", "it", "on", "at", "by",
  "what", "why", "when", "can", "does", "do", "about", "from", "that",
  "this", "know", "need", "should",
]);

/** Meaningful words from a post title, capped so the query stays focused. */
function imageQueryFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !QUERY_STOP_WORDS.has(w))
    .slice(0, 5)
    .join(" ");
}

/**
 * Searches Unsplash for a landscape photo matching a generated post's title,
 * returning one of the top few results at random so repeated posts on similar
 * topics don't all land on the same picture.
 *
 * Returns null — never throws — on a missing key, network failure, non-200
 * response, or empty result set, so callers can fall back to imageForCategory.
 * Requires UNSPLASH_ACCESS_KEY; without it this is a no-op.
 */
export async function imageForTitle(title: string): Promise<string | null> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return null;

  const query = imageQueryFromTitle(title);
  if (!query) return null;

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=5&orientation=landscape`,
      {
        headers: { Authorization: `Client-ID ${key}` },
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.warn(`imageForTitle: Unsplash returned ${res.status} for "${query}"`);
      return null;
    }

    const data: unknown = await res.json();
    const results =
      typeof data === "object" && data !== null && "results" in data
        ? (data as { results: unknown }).results
        : null;
    if (!Array.isArray(results)) return null;

    const urls = results
      .map((r) =>
        typeof r === "object" && r !== null
          ? (r as { urls?: { regular?: unknown } }).urls?.regular
          : undefined
      )
      .filter((u): u is string => typeof u === "string" && u.length > 0);
    if (urls.length === 0) return null;

    return urls[Math.floor(Math.random() * urls.length)];
  } catch (err) {
    console.warn("imageForTitle: Unsplash lookup failed", err);
    return null;
  }
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
