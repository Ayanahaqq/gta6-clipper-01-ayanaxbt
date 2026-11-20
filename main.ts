// main.ts — entry program for the gta6-clipper-01 bounty.
// It copies VIDEO.json from the repository root to the output directory.
// The house reads the video from VIDEO.json and checks it through the
// YouTube Data API; nothing else this program writes counts.
// Before copying, it validates VIDEO.json: it must parse as JSON and
// carry a non-empty string "url" field, so a broken or empty video
// link fails loudly instead of being handed to the grader.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const videoPath = join(botDir, "VIDEO.json");

let videoUrl: unknown;
try {
  const parsed: unknown = JSON.parse(readFileSync(videoPath, "utf8"));
  videoUrl =
    parsed !== null && typeof parsed === "object"
      ? (parsed as Record<string, unknown>).url
      : undefined;
} catch (err) {
  console.error(
    `VIDEO.json could not be read or parsed as JSON: ${err instanceof Error ? err.message : err}`,
  );
  process.exit(1);
}

if (typeof videoUrl !== "string" || videoUrl.trim() === "") {
  console.error('VIDEO.json must carry a non-empty string "url" field');
  process.exit(1);
}

try {
  mkdirSync(outputDir, { recursive: true });
  copyFileSync(videoPath, join(outputDir, "VIDEO.json"));
} catch (err) {
  console.error(`failed to copy VIDEO.json: ${err instanceof Error ? err.message : err}`);
  process.exit(1);
}

console.log(`entry video: ${videoUrl}`);
