import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Report which env vars are present (never log actual key values).
  const envCheck = {
    NEXT_PUBLIC_SUPABASE_URL: url ? `set (${url})` : "MISSING",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey ? "set" : "MISSING",
    SUPABASE_SERVICE_ROLE_KEY: serviceKey ? "set" : "MISSING",
  };

  if (!url || !anonKey) {
    console.error("debug-blog: missing env vars", envCheck);
    return NextResponse.json({ envCheck, error: "Missing env vars" }, { status: 500 });
  }

  // Test 1: fetch with anon key (same client the blog page uses).
  const anonClient = createClient(url, anonKey, {
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
  });
  const anonResult = await anonClient
    .from("blog_posts")
    .select("id, title, slug, published_at, category")
    .order("published_at", { ascending: false });

  console.log("debug-blog anon result:", JSON.stringify({ count: anonResult.data?.length, error: anonResult.error }));

  // Test 2: fetch with service role key (bypasses RLS).
  let serviceResult: { data: unknown; error: unknown } = { data: null, error: "service key not set" };
  if (serviceKey) {
    const adminClient = createClient(url, serviceKey, {
      auth: { persistSession: false },
      global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
    });
    serviceResult = await adminClient
      .from("blog_posts")
      .select("id, title, slug, published_at, category")
      .order("published_at", { ascending: false });

    console.log("debug-blog service result:", JSON.stringify({ count: (serviceResult.data as unknown[])?.length, error: serviceResult.error }));
  }

  return NextResponse.json({
    envCheck,
    anonQuery: {
      rowCount: anonResult.data?.length ?? 0,
      error: anonResult.error,
      rows: anonResult.data,
    },
    serviceQuery: {
      rowCount: Array.isArray(serviceResult.data) ? serviceResult.data.length : 0,
      error: serviceResult.error,
      rows: serviceResult.data,
    },
  });
}
