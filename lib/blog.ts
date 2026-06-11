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

const CATEGORY_IMAGES: Record<string, string> = {
  "Preventive Care": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
  Prevention:        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
  "Chronic Disease": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
  "Chronic Care":    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
  "Women's Health":  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
  Nutrition:         "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
  "Mental Health":   "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
  Telehealth:        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
  Geriatrics:        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800",
  Aesthetics:        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
  "Seasonal Health": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800";

// Returns a reliable Unsplash direct URL. Uses the category map unless the
// stored image_url is already a direct images.unsplash.com URL.
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
