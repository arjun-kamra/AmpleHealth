// One-off generator: reads the existing blogPosts array from lib/data.ts and
// emits supabase/setup.sql (CREATE TABLE + seed INSERTs). Run: node scripts/gen-seed.mjs
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync(new URL("../lib/data.ts", import.meta.url), "utf8");

// Extract the blogPosts array literal and eval it as plain JS.
const start = src.indexOf("export const blogPosts");
const arrStart = src.indexOf("[", start);
const arrEnd = src.indexOf("\n];", arrStart);
const literal = src.slice(arrStart, arrEnd + 2);
const blogPosts = eval(literal);

const KEYWORDS = {
  Aesthetics: "skincare",
  Geriatrics: "senior-care",
  "Women's Health": "women-health",
  Prevention: "healthcare",
  "Chronic Care": "wellness",
  Telehealth: "telehealth",
};

const q = (v) => (v === null || v === undefined ? "null" : `'${String(v).replace(/'/g, "''")}'`);

const rows = blogPosts.map((p) => {
  const content = p.articleContent.join("\n\n");
  const keyword = KEYWORDS[p.category] ?? "health";
  const image = `https://source.unsplash.com/featured/1200x600/?${keyword}`;
  return `  (${q(p.title)}, ${q(p.slug)}, ${q(p.excerpt)}, ${q(content)}, ${q(p.category)}, ${q(image)}, ${q(p.isoDate)})`;
});

const sql = `-- AmpleHealth blog schema + seed. Run in the Supabase SQL editor.

create table if not exists blog_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  category text,
  image_url text,
  published_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Allow public (anon) read access; writes happen via the service-role key only.
alter table blog_posts enable row level security;

drop policy if exists "Public read access" on blog_posts;
create policy "Public read access" on blog_posts for select using (true);

-- Seed the 7 existing posts (idempotent on slug).
insert into blog_posts (title, slug, excerpt, content, category, image_url, published_at) values
${rows.join(",\n")}
on conflict (slug) do nothing;
`;

writeFileSync(new URL("../supabase/setup.sql", import.meta.url), sql);
console.log(`Wrote supabase/setup.sql with ${blogPosts.length} seed posts.`);
