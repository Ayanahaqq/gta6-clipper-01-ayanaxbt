// main.ts — entry program for the gta6-clipper-01 bounty.
// It copies VIDEO.json from the repository root to the output directory.
// The house reads the video from VIDEO.json and checks it through the
// YouTube Data API; nothing else this program writes counts.
import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

try {
  mkdirSync(outputDir, { recursive: true });
  copyFileSync(join(botDir, "VIDEO.json"), join(outputDir, "VIDEO.json"));
} catch (err) {
  console.error(`failed to copy VIDEO.json: ${err instanceof Error ? err.message : err}`);
  process.exit(1);
}
