/**
 * Gives every existing blog post its own distinct photo.
 *
 *   node scripts/reimage-posts.ts              # dry run — prints, writes nothing
 *   node scripts/reimage-posts.ts --commit     # actually writes image_url
 *
 * Fixing imageForTitle() only affects posts generated from now on: every row
 * already in Supabase keeps whatever image_url it was written with, which for
 * the whole existing corpus is the shared per-category image. This backfills
 * them.
 *
 * SAFETY
 * The only column this ever writes is image_url. It never inserts, deletes, or
 * touches title, slug, excerpt, content, category or any timestamp. Dry run is
 * the default; --commit is required to write.
 *
 * UNIQUENESS
 * No two posts may end up sharing an image_url. Images already in use are
 * seeded into a Set before anything is fetched, and each post takes the first
 * unused candidate from its own Unsplash result list. Falling back to the
 * category image is the last resort and is logged loudly, because that is
 * exactly the collision this script exists to remove.
 */

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import {
  imageForCategory,
  imageQueriesForPost,
  overrideImageForSlug,
  photoIdFromUrl,
  searchUnsplash,
} from "../lib/blog.ts";
import { services } from "../lib/data.ts";

const COMMIT = process.argv.includes("--commit");
// --dry-run is the default; accepted explicitly so passing it reads as intent
// rather than being silently ignored.
const DRY_RUN_FLAG = process.argv.includes("--dry-run");
if (COMMIT && DRY_RUN_FLAG) {
  console.error("Pass either --commit or --dry-run, not both.");
  process.exit(1);
}

/** Unsplash demo apps allow 50 requests/hour; stay well under it. */
const THROTTLE_MS = 1500;
/** How many candidates to ask for, so collisions have somewhere to go. */
const PER_PAGE = 10;

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

/** Uniqueness is tracked on the photo id — see photoIdFromUrl in lib/blog.ts
 *  for why comparing whole URLs silently reports duplicates as distinct. */
const photoIdOf = (url: string | null): string => photoIdFromUrl(url) || (url ?? "");

/**
 * A candidate photo. alt_description is Unsplash's own description of what the
 * photo actually depicts — the only way to judge a match without opening every
 * URL by hand, which matters on a physician's site where a tonally wrong or
 * cliched stock image is worse than a repeated one.
 */
type Candidate = { url: string; alt: string | null };

/**
 * Candidates for a post, using the SAME query derivation the live generator
 * uses. Tries each query in turn and stops at the first that returns results,
 * so a post whose title yields nothing still falls through to its category
 * query instead of coming back empty.
 *
 * Returns the winning query alongside the candidates so the dry-run table can
 * show what was actually searched for.
 */
async function candidatesForPost(
  title: string,
  category: string | null
): Promise<{ query: string; candidates: Candidate[] }> {
  const queries = imageQueriesForPost(title, category);
  let lastQuery = queries[queries.length - 1] ?? "";

  for (const query of queries) {
    lastQuery = query;
    const hits = await searchUnsplash(query, PER_PAGE);
    await sleep(THROTTLE_MS);
    if (hits.length > 0) {
      return { query, candidates: hits.map((h) => ({ url: h.url, alt: h.alt })) };
    }
    console.warn(`  · "${query}" returned no results; trying the next query.`);
  }
  return { query: lastQuery, candidates: [] };
}

type Row = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  image_url: string | null;
};

async function main() {
  loadEnvLocal();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
    process.exit(1);
  }
  if (!process.env.UNSPLASH_ACCESS_KEY) {
    console.error(
      "UNSPLASH_ACCESS_KEY is not set. Without it every post would fall back to\n" +
        "its category image, which is the problem this script is meant to fix.\n" +
        "Set it in .env.local and re-run."
    );
    process.exit(1);
  }

  const db = createClient(url, serviceKey, { auth: { persistSession: false } });

  const { data, error } = await db
    .from("blog_posts")
    .select("id, slug, title, category, image_url")
    .order("published_at", { ascending: true });

  if (error) {
    console.error("Supabase read failed:", error.message);
    process.exit(1);
  }
  const rows = (data ?? []) as Row[];
  console.log(`${rows.length} posts read from blog_posts.`);
  console.log(COMMIT ? "MODE: --commit (will write image_url)" : "MODE: dry run (no writes)");
  console.log();

  // Seed with every photo already used as a service hero, so a post can never
  // land on the same picture as a service page. That cross-surface collision is
  // what started this whole thread.
  const used = new Set<string>(
    services.map((svc) => photoIdOf(svc.stockImage)).filter(Boolean)
  );
  console.log(`Reserved ${used.size} photo ids already used by service pages.`);
  console.log();

  type Planned = {
    row: Row;
    query: string;
    next: string;
    alt: string | null;
    note: string;
  };
  const plan: Planned[] = [];

  for (const row of rows) {
    // A reviewed pick always wins; only search when there isn't one. This is
    // also what keeps hand-chosen images stable across re-runs.
    const override = overrideImageForSlug(row.slug);
    if (override) {
      used.add(photoIdOf(override));
      plan.push({
        row,
        query: "(override)",
        next: override,
        alt: "hand-picked — see IMAGE_OVERRIDES in lib/blog.ts",
        note: "override",
      });
      continue;
    }

    const { query, candidates } = await candidatesForPost(row.title, row.category);

    // Take this post's best-ranked candidate that no earlier post has claimed.
    // Unsplash orders by relevance, so the first unused one is the closest
    // match still available.
    let picked: Candidate | undefined;
    for (const c of candidates) {
      if (!used.has(photoIdOf(c.url))) {
        picked = c;
        break;
      }
    }

    let next: string;
    let alt: string | null;
    let note: string;

    if (picked) {
      next = picked.url;
      alt = picked.alt;
      note = "per-title";
    } else {
      const fallback = imageForCategory(row.category);
      alt = null;
      if (!used.has(photoIdOf(fallback))) {
        next = fallback;
        note = "!! CATEGORY FALLBACK";
        console.warn(
          `  !! ${row.title}\n     ${
            candidates.length === 0
              ? "Unsplash returned no candidates"
              : "every candidate was already claimed by an earlier post"
          }; falling back to the shared "${row.category}" category image. ` +
            `That is the exact duplication this script exists to remove.`
        );
      } else {
        next = row.image_url ?? fallback;
        note = "!! UNRESOLVED — left as-is";
        console.warn(
          `  !! ${row.title}\n     No unused image available at all (the category ` +
            `image is already taken too). Leaving image_url unchanged.`
        );
      }
    }

    used.add(photoIdOf(next));
    plan.push({ row, query, next, alt, note });
  }

  // Report — one block per post rather than a wide table, because
  // alt_description is the field that actually needs reading and it does not
  // fit in a column.
  const photoId = (u: string | null) => (u ? photoIdOf(u) : "(null)");

  console.log();
  console.log("=".repeat(100));
  console.log("PROPOSED CHANGES");
  console.log("=".repeat(100));
  plan.forEach(({ row, query, next, alt, note }, i) => {
    console.log();
    console.log(`${String(i + 1).padStart(2)}. ${row.title}`);
    console.log(`    category : ${row.category ?? "(none)"}`);
    console.log(`    query    : "${query}"`);
    console.log(`    current  : ${photoId(row.image_url)}`);
    console.log(`    proposed : ${photoId(next)}`);
    console.log(`    alt      : ${alt ?? "(no alt_description on this photo)"}`);
    if (note !== "per-title") console.log(`    NOTE     : ${note}`);
  });

  const changes = plan.filter((p) => p.row.image_url !== p.next);
  const distinct = new Set(plan.map((p) => photoIdOf(p.next))).size;
  console.log();
  console.log("=".repeat(100));
  console.log(`${changes.length} of ${plan.length} posts would change.`);
  console.log(`${distinct} distinct image_urls across ${plan.length} posts.`);
  if (distinct !== plan.length) {
    console.warn("!! Uniqueness NOT achieved — some posts would still share an image.");
  } else {
    console.log("Uniqueness achieved — every post gets its own photo.");
  }
  const missingAlt = plan.filter((p) => !p.alt).length;
  if (missingAlt) {
    console.log(`${missingAlt} proposed photo(s) have no alt_description to review.`);
  }

  if (!COMMIT) {
    console.log();
    console.log("Dry run — nothing written. Re-run with --commit to apply.");
    return;
  }

  console.log();
  for (const { row, next } of changes) {
    // image_url and nothing else.
    const { error: upErr } = await db
      .from("blog_posts")
      .update({ image_url: next })
      .eq("id", row.id);
    if (upErr) console.error(`  FAILED ${row.title}: ${upErr.message}`);
    else console.log(`  updated ${row.title}`);
  }
  console.log(`Done — ${changes.length} rows updated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
