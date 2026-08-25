import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";
import { imageForCategory } from "@/lib/blog";

const TOPICS: { topic: string; category: string; keyword: string }[] = [
  { topic: "preventive care and annual wellness visits", category: "Preventive Care", keyword: "healthcare" },
  { topic: "healthy weight management strategies", category: "Preventive Care", keyword: "exercise" },
  { topic: "bone health and osteoporosis prevention", category: "Preventive Care", keyword: "bone-health" },
  { topic: "colorectal cancer screening and prevention", category: "Preventive Care", keyword: "cancer-prevention" },
  { topic: "skin health and dermatological screenings", category: "Preventive Care", keyword: "skin-health" },
  { topic: "diabetes management and blood sugar control", category: "Chronic Disease", keyword: "diabetes" },
  { topic: "managing high blood pressure (hypertension)", category: "Chronic Disease", keyword: "blood-pressure" },
  { topic: "thyroid health and common thyroid conditions", category: "Chronic Disease", keyword: "thyroid" },
  { topic: "chronic kidney disease prevention and care", category: "Chronic Disease", keyword: "kidney-health" },
  { topic: "COPD and respiratory health", category: "Chronic Disease", keyword: "respiratory" },
  { topic: "heart health and cardiovascular risk reduction", category: "Heart Health", keyword: "heart-health" },
  { topic: "cholesterol management and lipid health", category: "Heart Health", keyword: "cholesterol" },
  { topic: "atrial fibrillation and heart rhythm awareness", category: "Heart Health", keyword: "heart-rhythm" },
  { topic: "women's health and preventive screenings", category: "Women's Health", keyword: "women-health" },
  { topic: "menopause: symptoms, management, and support", category: "Women's Health", keyword: "womens-wellness" },
  { topic: "men's health and preventive screenings", category: "Men's Health", keyword: "men-health" },
  { topic: "prostate health and when to get screened", category: "Men's Health", keyword: "mens-wellness" },
  { topic: "nutrition and healthy eating habits", category: "Nutrition", keyword: "nutrition" },
  { topic: "reducing sugar and processed food intake", category: "Nutrition", keyword: "healthy-food" },
  { topic: "stress management and mental wellbeing", category: "Mental Health", keyword: "wellness" },
  { topic: "mental health awareness and depression screening", category: "Mental Health", keyword: "mental-health" },
  { topic: "anxiety: recognizing symptoms and seeking help", category: "Mental Health", keyword: "anxiety" },
  { topic: "sleep health and common sleep disorders", category: "Wellness", keyword: "sleep" },
  { topic: "back pain and musculoskeletal health", category: "Wellness", keyword: "back-pain" },
  { topic: "flu season, vaccines, and immunizations", category: "Seasonal Health", keyword: "vaccine" },
  { topic: "summer health tips and heat safety", category: "Seasonal Health", keyword: "summer-health" },
  { topic: "winter wellness and cold and flu prevention", category: "Seasonal Health", keyword: "winter-wellness" },
  { topic: "allergy season: management and relief", category: "Seasonal Health", keyword: "allergy" },
  { topic: "geriatric care and healthy aging strategies", category: "Geriatrics", keyword: "senior-care" },
  { topic: "fall prevention and balance in older adults", category: "Geriatrics", keyword: "senior-wellness" },
  { topic: "telehealth: getting the most from virtual visits", category: "Telehealth", keyword: "telehealth" },
  { topic: "preparing for your first telehealth appointment", category: "Telehealth", keyword: "virtual-care" },
];

const VALID_CATEGORIES = [
  "Preventive Care", "Chronic Disease", "Heart Health", "Women's Health",
  "Men's Health", "Nutrition", "Mental Health", "Wellness",
  "Seasonal Health", "Geriatrics", "Telehealth",
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function extractJson(raw: string): string {
  let text = raw.trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) text = fence[1].trim();
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first !== -1 && last !== -1) text = text.slice(first, last + 1);
  return text;
}

/** Jaccard similarity on meaningful words in two title strings. */
function titleSimilarity(a: string, b: string): number {
  const stopWords = new Set([
    "a", "an", "the", "and", "or", "for", "to", "in", "of", "with",
    "how", "your", "you", "is", "are", "its", "it", "on", "at", "by",
  ]);
  const words = (s: string): Set<string> =>
    new Set(
      s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 2 && !stopWords.has(w))
    );
  const wa = words(a);
  const wb = words(b);
  const waArr = Array.from(wa);
  const intersection = waArr.filter((w) => wb.has(w)).length;
  const union = new Set(waArr.concat(Array.from(wb))).size;
  return union === 0 ? 0 : intersection / union;
}

/** Pick the topic whose category appears least in recentCategories.
 *  Shuffles within the tied group so repeated runs vary. */
function pickTopic(
  recentCategories: string[],
  exclude: string | null = null
): { topic: string; category: string; keyword: string } {
  // Count how many of the last N posts used each category.
  const freq: Record<string, number> = {};
  for (const c of recentCategories) freq[c] = (freq[c] ?? 0) + 1;

  const candidates = TOPICS.filter((t) => t.topic !== exclude);
  const scored = candidates.map((t) => ({ ...t, score: freq[t.category] ?? 0 }));
  const minScore = Math.min(...scored.map((t) => t.score));
  const pool = scored.filter((t) => t.score === minScore);

  // Shuffle the pool so ties resolve randomly.
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool[0];
}

interface PostDraft {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
}

async function callModel(
  client: Anthropic,
  topicEntry: { topic: string; category: string },
  recentTitles: string[]
): Promise<PostDraft> {
  const recentList =
    recentTitles.length > 0
      ? `\n\nAvoid these recently published topics (pick something clearly different):\n${recentTitles.map((t) => `- ${t}`).join("\n")}`
      : "";

  const prompt = `Write a helpful, informative blog post for patients of AmpleHealth, an internal medicine practice in Carmichael and Sacramento, CA led by Dr. Dheeraj Kamra MD FACP.

Topic area: ${topicEntry.topic}${recentList}

Format the response as JSON with these fields:
- title: engaging, specific headline (not generic — avoid reusing recent titles above)
- slug: url-friendly version of title
- excerpt: 2 sentence summary
- content: full article in markdown, 400-500 words, practical and patient-friendly
- category: one of [${VALID_CATEGORIES.join(", ")}]

Return only valid JSON, no markdown code blocks.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });

  const block = response.content[0];
  if (block.type !== "text") throw new Error("Unexpected response type from model.");

  return JSON.parse(extractJson(block.text)) as PostDraft;
}

async function generateAndStore() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured." },
      { status: 500 }
    );
  }

  const db = supabaseAdmin();

  // Fetch the last 15 posts to build context.
  const { data: recentPosts } = await db
    .from("blog_posts")
    .select("title, category")
    .order("created_at", { ascending: false })
    .limit(15);

  const recentTitles = (recentPosts ?? []).map((p: { title: string }) => p.title);
  const recentCategories = (recentPosts ?? []).map((p: { category: string }) => p.category);

  const client = new Anthropic({ apiKey });

  // First attempt: pick the least-recently-used category.
  const topicEntry = pickTopic(recentCategories);
  let parsed: PostDraft;
  try {
    parsed = await callModel(client, topicEntry, recentTitles);
  } catch {
    return NextResponse.json(
      { error: "Failed to parse model output as JSON." },
      { status: 502 }
    );
  }

  // Similarity check: if title is too close to an existing one, regenerate once.
  const maxSimilarity = recentTitles.reduce(
    (max, t) => Math.max(max, titleSimilarity(parsed.title, t)),
    0
  );
  if (maxSimilarity > 0.5) {
    console.warn(
      `generate-blog: title "${parsed.title}" too similar to existing post (score ${maxSimilarity.toFixed(2)}). Regenerating.`
    );
    const altTopic = pickTopic(recentCategories, topicEntry.topic);
    try {
      parsed = await callModel(client, altTopic, recentTitles);
    } catch {
      // Fall through with original if retry also fails to parse.
      console.warn("generate-blog: retry parse failed, using original output.");
    }
  }

  const baseSlug = slugify(parsed.slug || parsed.title);
  // Derived from the category that actually shipped, not from topicEntry —
  // the similarity retry above can swap the topic out, and the old code kept
  // the original keyword. source.unsplash.com, which this previously wrote to,
  // has been retired and returns 503; those URLs never rendered.
  const imageUrl = imageForCategory(parsed.category);

  const record = {
    title: parsed.title,
    excerpt: parsed.excerpt,
    content: parsed.content,
    category: parsed.category,
    image_url: imageUrl,
  };

  // Insert; retry with unique suffix on slug collision.
  let { data, error } = await db
    .from("blog_posts")
    .insert({ ...record, slug: baseSlug })
    .select()
    .single();

  if (error && error.code === "23505") {
    const uniqueSlug = `${baseSlug}-${Date.now().toString(36)}`;
    ({ data, error } = await db
      .from("blog_posts")
      .insert({ ...record, slug: uniqueSlug })
      .select()
      .single());
  }

  if (error) {
    console.error("generate-blog Supabase error:", error.message);
    return NextResponse.json(
      { error: "Failed to save the generated post." },
      { status: 500 }
    );
  }

  revalidatePath("/blog");

  return NextResponse.json(
    { post: data, topicUsed: topicEntry.topic, similarityScore: maxSimilarity },
    { status: 201 }
  );
}

// Vercel Cron triggers a GET request; the admin button uses POST.
export async function GET() {
  try {
    return await generateAndStore();
  } catch (e) {
    console.error("generate-blog error:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Generation failed." }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}
