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
  imageUrl: string | null;
  content: string;
};

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
    imageUrl: row.image_url,
    content: row.content,
  };
}
