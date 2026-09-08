/**
 * Diagnoses why imageForTitle() is returning null.
 *
 *   node scripts/test-unsplash.ts
 *
 * Loads .env.local (Next does that automatically at runtime; a bare node
 * process does not), then reports, in order:
 *
 *   1. whether UNSPLASH_ACCESS_KEY is even present — imageForTitle() returns
 *      null before making any request when it is missing, which looks exactly
 *      like an API failure from the outside;
 *   2. the raw HTTP status and body of a direct Unsplash search;
 *   3. the X-Ratelimit-* headers, so a demo app that has burned through its
 *      50 requests/hour is distinguishable from a bad key;
 *   4. what imageForTitle() itself returns for three real post titles.
 */

import { readFileSync } from "node:fs";
import { imageForTitle } from "../lib/blog.ts";

/** Minimal .env parser — enough for KEY=value and quoted values. */
function loadEnvLocal(path = ".env.local") {
  let raw: string;
  try {
    raw = readFileSync(path, "utf8");
  } catch {
    console.log(`(no ${path} found)`);
    return;
  }
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = value;
  }
}

const TITLES = [
  "Beyond Statins: The New Frontier of Cholesterol Management",
  "Warning Signs of Alzheimer's",
  "The Importance of Your Annual Physical Exam",
];

async function main() {
  loadEnvLocal();

  const key = process.env.UNSPLASH_ACCESS_KEY;
  console.log("=".repeat(72));
  console.log("1. KEY PRESENCE");
  console.log("=".repeat(72));
  if (!key) {
    console.log("  UNSPLASH_ACCESS_KEY: *** NOT SET ***");
    console.log(
      "  imageForTitle() returns null at its first line without ever calling\n" +
        "  Unsplash, so every post falls back to the category image. This is\n" +
        "  indistinguishable from an API error unless you check for the key."
    );
  } else {
    console.log(`  UNSPLASH_ACCESS_KEY: set (${key.length} chars, ends ...${key.slice(-4)})`);
  }

  console.log();
  console.log("=".repeat(72));
  console.log("2. RAW HTTP RESPONSE");
  console.log("=".repeat(72));
  if (!key) {
    console.log("  skipped — no key to send.");
  } else {
    const url =
      "https://api.unsplash.com/search/photos" +
      "?query=cholesterol%20management&per_page=5&orientation=landscape";
    const res = await fetch(url, { headers: { Authorization: `Client-ID ${key}` } });
    const body = await res.text();
    console.log(`  GET ${url}`);
    console.log(`  status: ${res.status} ${res.statusText}`);
    console.log("  rate limit:");
    console.log(`    X-Ratelimit-Limit:     ${res.headers.get("x-ratelimit-limit") ?? "(absent)"}`);
    console.log(`    X-Ratelimit-Remaining: ${res.headers.get("x-ratelimit-remaining") ?? "(absent)"}`);
    if (res.status === 403) {
      console.log(
        "  >> 403 with Remaining: 0 means the demo app's 50 req/hour cap is spent.\n" +
          "  >> 403 with no rate-limit headers usually means a bad or revoked key."
      );
    }
    console.log(`  body (first 400 chars): ${body.slice(0, 400)}`);
  }

  console.log();
  console.log("=".repeat(72));
  console.log("3. imageForTitle() FOR REAL POST TITLES");
  console.log("=".repeat(72));
  for (const title of TITLES) {
    const result = await imageForTitle(title);
    console.log(`  ${result === null ? "NULL  " : "ok    "} ${title}`);
    if (result) console.log(`         -> ${result}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
