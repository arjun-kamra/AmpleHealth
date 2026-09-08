/**
 * Generates a poster image from the first frame of each provider intro clip.
 *
 *   node scripts/make-video-posters.ts
 *
 * Reads  public/team/{slug}.mp4   for every provider with a `video` field
 * Writes public/team/{slug}-poster.jpg
 *
 * WHY
 * The <video> element on the team detail page used to fall back to the
 * provider's static portrait as its poster. For Dr. Kamra that portrait is a
 * white-coat photo while the clip opens on him in a tan suit, so the still
 * visibly snapped to a different outfit the moment the video rendered. The two
 * images also had different aspect ratios — a 2000x3000 portrait object-cover
 * cropped into a 9:16 box — so the framing jumped as well.
 *
 * Taking frame 0 of the video itself makes the poster and the video's opening
 * frame the same picture, so there is nothing left to jump.
 *
 * The portrait at /team/{slug}.jpg is deliberately left alone; the team listing
 * grid still uses it through ProviderPhoto.
 *
 * Requires ffmpeg on PATH.
 */

import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { providers } from "../lib/data.ts";

/** Native resolution is preserved — no scaling, no cropping. */
function extractFirstFrame(mp4: string, out: string) {
  execFileSync(
    "ffmpeg",
    ["-y", "-loglevel", "error", "-i", mp4, "-frames:v", "1", "-q:v", "2", out],
    { stdio: ["ignore", "ignore", "inherit"] }
  );
}

function probe(path: string): string {
  return execFileSync(
    "ffprobe",
    [
      "-v", "error",
      "-select_streams", "v:0",
      "-show_entries", "stream=width,height",
      "-of", "csv=p=0:s=x",
      path,
    ],
    { encoding: "utf8" }
  ).trim();
}

function main() {
  const withVideo = providers.filter((p) => p.video);
  if (withVideo.length === 0) {
    console.log("No providers have a video field. Nothing to do.");
    return;
  }

  console.log(`${withVideo.length} provider(s) with an intro clip.\n`);

  for (const provider of withVideo) {
    // provider.video is a public-relative URL such as "/team/slug.mp4".
    const mp4 = `public${provider.video}`;
    const out = `public/team/${provider.slug}-poster.jpg`;

    if (!existsSync(mp4)) {
      console.error(`  MISSING  ${mp4} — skipping ${provider.slug}`);
      process.exitCode = 1;
      continue;
    }

    extractFirstFrame(mp4, out);

    const videoSize = probe(mp4);
    const posterSize = probe(out);
    const bytes = statSync(out).size;
    const match = videoSize === posterSize ? "matches video" : "*** SIZE MISMATCH ***";

    console.log(`  ${provider.slug}`);
    console.log(`    video  ${videoSize}`);
    console.log(`    poster ${posterSize}  (${(bytes / 1024).toFixed(0)} KB)  ${match}`);

    if (videoSize !== posterSize) process.exitCode = 1;
  }
}

main();
