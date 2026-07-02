// Derives a transparent-background version of the supplied logo (brief §2 — the
// artwork is used as-is, only its solid black canvas is removed). Luminance
// becomes the alpha channel and the art is normalised to white, so it sits
// cleanly on any surface: shown directly on dark backgrounds, inverted to dark
// on light ones. Re-run with: npm run gen:logo

import sharp from "sharp";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, "../public/images/logo.jpg");
const OUT = resolve(__dirname, "../public/images/logo.png");

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

const LOW = 22; // below this luminance => fully transparent (kills the vignette)
const GAIN = 1.5;

for (let i = 0; i < data.length; i += 4) {
  const lum = Math.max(data[i], data[i + 1], data[i + 2]);
  const alpha = lum <= LOW ? 0 : Math.min(255, Math.round((lum - LOW) * GAIN));
  data[i] = 255; // white art
  data[i + 1] = 255;
  data[i + 2] = 255;
  data[i + 3] = alpha;
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .trim()
  .png()
  .toFile(OUT);

console.log(`Wrote ${OUT} (${info.width}x${info.height} source, trimmed)`);
