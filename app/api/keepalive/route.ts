import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Keeps the Supabase project from pausing.
 *
 * Supabase pauses a free-tier project after 7 days without activity. The only
 * guaranteed traffic this database had was the weekly blog cron, which sits
 * *exactly* on that threshold — every gap between generated posts measured
 * precisely 7 days. Once it tipped over, the failure sustained itself: the
 * database paused, the Monday cron's insert failed against a paused project,
 * nothing reset the idle clock, and it stayed paused. That is the 35-day hole
 * between 2026-06-29 and 2026-08-03, four Mondays with no post.
 *
 * This route exists purely to touch the database on a cadence comfortably
 * inside the window. It is READ-ONLY by construction:
 *   - it uses the public anon key, not the service role, so RLS applies and it
 *     holds no write capability at all;
 *   - it issues a single bounded SELECT and nothing else.
 *
 * Scheduling note for whoever reads this next: the blog cron in vercel.json is
 * "0 9 * * 1", which is 09:00 UTC Monday — 2:00am Pacific, not 9am — and Vercel
 * adds up to 59 minutes of jitter, which is why observed post times range from
 * 09:08 to 09:51 UTC. Left as-is deliberately; change it only if 2am Pacific
 * was not the intent.
 */

// Both are required. Without them Next can statically evaluate this route at
// build time and serve a cached response forever — the cron would return 200
// every day while never once touching Supabase, which is the exact failure
// this route exists to prevent.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.error("keepalive: Supabase env vars are missing.");
    return NextResponse.json(
      { ok: false, error: "Supabase is not configured." },
      { status: 503 }
    );
  }

  const db = createClient(url, anonKey, {
    auth: { persistSession: false },
    global: { fetch: (u, init) => fetch(u, { ...init, cache: "no-store" }) },
  });

  const { error } = await db.from("blog_posts").select("id").limit(1);

  if (error) {
    // Surface it rather than reporting a cheerful 200 — a keepalive that cannot
    // reach the database is precisely the thing worth knowing about, and a
    // non-200 marks the cron run as failed in Vercel instead of hiding it.
    console.error(`keepalive: Supabase read failed — ${error.message}`);
    return NextResponse.json(
      { ok: false, error: "Supabase read failed." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true, checkedAt: new Date().toISOString() });
}
