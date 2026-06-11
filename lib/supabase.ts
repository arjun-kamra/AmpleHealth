import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabase uses Next.js fetch internally. Pass cache:'no-store' so server
// components always receive fresh data instead of a stale cached response.
const noStoreFetch: typeof fetch = (input, init) =>
  fetch(input, { ...init, cache: "no-store" });

// Public read-only client (browser-safe, respects RLS).
export const supabase = createClient(url, anonKey, {
  global: { fetch: noStoreFetch },
});

// Server-only client with the service role key for inserts/writes.
// Never import this into a client component.
export function supabaseAdmin() {
  return createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}

export type BlogRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  image_url: string | null;
  published_at: string;
  created_at: string;
};
