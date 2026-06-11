import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Rotating set of internal-medicine topics, each paired with an Unsplash
// keyword used to build the hero image URL.
const TOPICS: { topic: string; keyword: string }[] = [
  { topic: "preventive care", keyword: "healthcare" },
  { topic: "diabetes management", keyword: "diabetes" },
  { topic: "heart health", keyword: "heart-health" },
  { topic: "hypertension", keyword: "blood-pressure" },
  { topic: "weight management", keyword: "exercise" },
  { topic: "sleep health", keyword: "sleep" },
  { topic: "stress management", keyword: "wellness" },
  { topic: "women's health", keyword: "women-health" },
  { topic: "geriatric care", keyword: "senior-care" },
  { topic: "telehealth tips", keyword: "telehealth" },
  { topic: "flu and vaccine season", keyword: "vaccine" },
  { topic: "nutrition", keyword: "nutrition" },
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
  // Strip ```json fences if the model wrapped the output.
  let text = raw.trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) text = fence[1].trim();
  // Fall back to the first {...} block.
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first !== -1 && last !== -1) text = text.slice(first, last + 1);
  return text;
}

async function generateAndStore() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured." },
      { status: 500 }
    );
  }

  const { topic, keyword } = TOPICS[Math.floor(Math.random() * TOPICS.length)];

  const prompt = `Write a helpful, informative blog post for patients of AmpleHealth, an internal medicine practice in Carmichael and Sacramento, CA led by Dr. Dheeraj Kamra MD FACP.

Topic: ${topic}

Format the response as JSON with these fields:
- title: engaging headline
- slug: url-friendly version of title
- excerpt: 2 sentence summary
- content: full article in markdown, 400-500 words, practical and patient-friendly
- category: one of [Preventive Care, Chronic Disease, Women's Health, Nutrition, Mental Health, Seasonal Health]

Return only valid JSON, no markdown code blocks.`;

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });

  const block = response.content[0];
  if (block.type !== "text") {
    return NextResponse.json(
      { error: "Unexpected response type from model." },
      { status: 502 }
    );
  }

  let parsed: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
  };
  try {
    parsed = JSON.parse(extractJson(block.text));
  } catch {
    return NextResponse.json(
      { error: "Failed to parse model output as JSON." },
      { status: 502 }
    );
  }

  const baseSlug = slugify(parsed.slug || parsed.title);
  const imageUrl = `https://source.unsplash.com/featured/1200x600/?${encodeURIComponent(
    keyword
  )}`;

  const db = supabaseAdmin();

  const record = {
    title: parsed.title,
    excerpt: parsed.excerpt,
    content: parsed.content,
    category: parsed.category,
    image_url: imageUrl,
  };

  // Insert; if the slug collides, retry once with a short unique suffix.
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

  return NextResponse.json({ post: data }, { status: 201 });
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
