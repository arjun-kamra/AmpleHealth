/**
 * Lists Unsplash candidates for review, so a human can pick by number.
 *
 *   node scripts/image-candidates.ts
 *
 * Read-only: it touches neither Supabase nor any file. It exists because
 * automated selection tops out around 60% usable on clinical subjects — the
 * queries are right, but the library answers "back pain" with lifestyle stock
 * and "bones aging" with a skeleton. Reviewing ten options per post and
 * recording the choice in IMAGE_OVERRIDES beats tuning queries further.
 *
 * Some posts list two queries: the one the derivation currently produces, and a
 * proposed replacement where the query itself is the problem rather than the
 * results. Both are shown so the comparison is visible rather than asserted.
 *
 * Each request costs one call against a 50/hour demo quota; the run below uses
 * one per query listed.
 */

import { readFileSync } from "node:fs";
import { searchUnsplash } from "../lib/blog.ts";

function loadEnvLocal(path = ".env.local") {
  let raw: string;
  try {
    raw = readFileSync(path, "utf8");
  } catch {
    return;
  }
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = v;
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Review = {
  /** Position in the dry-run table, so the two line up. */
  n: number;
  slug: string;
  title: string;
  verdict: "REJECTED" | "BORDERLINE";
  /** Why the previously proposed photo was not acceptable. */
  problem: string;
  /** Queries to show. The first is what the derivation produces today. */
  queries: { query: string; label: string }[];
};

const REVIEWS: Review[] = [
  {
    n: 2,
    slug: "annual-physical-exam",
    title: "The Importance of Your Annual Physical Exam",
    verdict: "REJECTED",
    problem: "returned a baby's hand; this is an adult internal medicine practice",
    queries: [
      { query: "physical exam", label: "current" },
      { query: "doctor examining adult patient", label: "proposed — steers away from pediatric" },
    ],
  },
  {
    n: 3,
    slug: "warning-signs-alzheimers",
    title: "Warning Signs of Alzheimer's",
    verdict: "BORDERLINE",
    problem: "returned a wheelchair; Alzheimer's is cognitive, not a mobility condition",
    queries: [
      { query: "alzheimers", label: "current" },
      { query: "senior memory care hands", label: "proposed — cognitive and caregiving, not mobility" },
    ],
  },
  {
    n: 4,
    slug: "botox-vs-xeomin-2026",
    title: "The New Era of Wrinkle Reduction: Botox vs Xeomin in 2026",
    verdict: "BORDERLINE",
    problem: "returned a spa face mask, which is a different treatment category than neuromodulators",
    queries: [{ query: "skincare treatment", label: "current" }],
  },
  {
    n: 5,
    slug: "eat-well-live-well-simple-nutrition-tips-amplehealth",
    title: "Eat Well, Live Well: Simple Nutrition Tips",
    verdict: "BORDERLINE",
    problem:
      "proposed the vegetable macro that is now hard-blocked; results below exclude it",
    queries: [
      { query: "nutrition", label: "current" },
      { query: "balanced meal vegetables", label: "proposed — a plate rather than an abstract" },
    ],
  },
  {
    n: 7,
    slug: "practical-stress-management-tips-amplehealth",
    title: "Taming the Tension: Practical Stress Management Tips",
    verdict: "REJECTED",
    problem: "returned a man at a MacBook; generic office stock with no stress signal",
    queries: [{ query: "stress", label: "current" }],
  },
  {
    n: 8,
    slug: "prostate-health-screening-guide-sacramento-carmichael",
    title: "Prostate Health 101: What Men Need to Know About Screening",
    verdict: "REJECTED",
    problem: "returned a man holding a smartphone; unrelated to screening",
    queries: [{ query: "prostate men screening", label: "current" }],
  },
  {
    n: 9,
    slug: "sacramento-winter-cold-flu-survival-guide",
    title: "Bundle Up and Fight Back: Winter Cold & Flu Survival Guide",
    verdict: "BORDERLINE",
    problem: "returned a mug beside eyeglasses; the tea-and-blanket cliche",
    queries: [{ query: "cold flu", label: "current" }],
  },
  {
    n: 11,
    slug: "skin-cancer-screening-guide-sacramento-patients",
    title: "Spot It Early: A Patient's Guide to Skin Cancer Screening",
    verdict: "BORDERLINE",
    problem: "returned a magnifying glass; reads as generic 'investigation' stock",
    queries: [{ query: "skin cancer screening", label: "current" }],
  },
  {
    n: 12,
    slug: "truth-about-cholesterol-what-your-numbers-mean-how-to-improve-them",
    title: "The Truth About Cholesterol: What Your Numbers Actually Mean",
    verdict: "BORDERLINE",
    problem: "returned a red blood cell render; clinically adjacent but cold for patients",
    queries: [{ query: "cholesterol", label: "current" }],
  },
  {
    n: 13,
    slug: "navigating-menopause-symptoms-treatments-when-to-call-your-doctor",
    title: "Navigating Menopause with Confidence",
    verdict: "BORDERLINE",
    problem: "returned a generic portrait with no connection to the subject",
    queries: [{ query: "menopause symptoms treatments", label: "current" }],
  },
  {
    n: 14,
    slug: "healthy-aging-guide-seniors-carmichael-sacramento",
    title: "Strong Bones, Sharp Mind, Steady Steps: Healthy Aging for Adults 65+",
    verdict: "REJECTED",
    problem: '"bones aging" keeps returning a skeleton',
    queries: [
      { query: "bones aging", label: "current" },
      { query: "senior couple walking", label: "proposed — active later life, not anatomy" },
    ],
  },
  {
    n: 20,
    slug: "why-your-back-hurts-and-what-you-can-do-about-it",
    title: "Why Your Back Hurts — and What You Can Actually Do About It",
    verdict: "REJECTED",
    problem: "returned a woman in a tank top and shorts on a bed; lifestyle stock",
    queries: [{ query: "back pain", label: "current" }],
  },
  {
    n: 21,
    slug: "eating-for-energy-balanced-meals-that-keep-you-full",
    title: "Eating for Energy: How to Build Balanced Meals",
    verdict: "BORDERLINE",
    problem: "returned a person holding cutlery; generic",
    queries: [{ query: "eating meals", label: "current" }],
  },
];

async function main() {
  loadEnvLocal();
  if (!process.env.UNSPLASH_ACCESS_KEY) {
    console.error("UNSPLASH_ACCESS_KEY is not set.");
    process.exit(1);
  }

  const totalQueries = REVIEWS.reduce((n, r) => n + r.queries.length, 0);
  console.log(`Listing candidates for ${REVIEWS.length} posts (${totalQueries} queries).`);
  console.log("Pick by number and they will be written into IMAGE_OVERRIDES.\n");

  for (const review of REVIEWS) {
    console.log("=".repeat(96));
    console.log(`#${review.n}  ${review.title}`);
    console.log(`     slug    : ${review.slug}`);
    console.log(`     verdict : ${review.verdict} — ${review.problem}`);

    for (const { query, label } of review.queries) {
      const hits = await searchUnsplash(query, 10);
      await sleep(1200);
      console.log(`\n     QUERY "${query}"  [${label}]`);
      if (hits.length === 0) {
        console.log("       (no results)");
        continue;
      }
      hits.forEach((h, i) => {
        const id = h.url.match(/photo-[0-9a-z]+-[0-9a-z]+/i)?.[0] ?? "?";
        const tag = `${review.n}.${label === "current" ? "a" : "b"}${i + 1}`;
        console.log(`       [${tag}] ${id}`);
        console.log(`             ${h.alt ?? "(no alt_description)"}`);
        console.log(`             — ${h.photographer ?? "unknown"}`);
      });
    }
    console.log();
  }

  console.log("=".repeat(96));
  console.log("Reply with tags, e.g. \"2.b3, 14.b1, 20.a5\".");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
