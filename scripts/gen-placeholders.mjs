// Generates elegant, on-brand SVG placeholders for food photography that isn't
// available yet (brief §4). Rectangular cards for the menu, cream "plate"
// circles for Favorite Dishes. Re-run with: npm run gen:placeholders
//
// These are deliberately atmospheric (monogram + crescent motif), not literal
// food — they read as intentional placeholders and are swapped one line at a
// time in lib/menu.ts / lib/content.ts when real photos arrive.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/images/menu");
mkdirSync(OUT, { recursive: true });

const CREAM = "#F3EFE6";
const CREAM_DIM = "#E7E1D2";

// SVGs are loaded via <img>, so they must be valid XML — escape any text we
// interpolate (dish names contain "&", which is illegal unescaped).
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Deterministic hue per slug so each card feels distinct but stays in-palette.
function hue(slug) {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) % 360;
  return h;
}

// Faint crescent motif echoing the logo, tucked into a corner.
function crescent(cx, cy, r, opacity) {
  return `<path d="M ${cx + r * 0.7} ${cy - r} a ${r} ${r} 0 1 0 0 ${2 * r} a ${r * 0.78} ${
    r * 0.78
  } 0 1 1 0 ${-2 * r} z" fill="none" stroke="${CREAM}" stroke-width="2" opacity="${opacity}" />`;
}

function menuPlaceholder({ slug, name, category }) {
  const w = 800;
  const h = 600;
  const hh = hue(slug);
  const top = `hsl(${hh} 16% 12%)`;
  const bottom = `hsl(${(hh + 24) % 360} 20% 7%)`;
  const monogram = name.trim()[0].toUpperCase();
  const id = `g-${slug}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(name)}">
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="${top}" />
      <stop offset="1" stop-color="${bottom}" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${id})" />
  <rect x="20" y="20" width="${w - 40}" height="${h - 40}" fill="none" stroke="${CREAM}" stroke-opacity="0.12" />
  ${crescent(640, 470, 150, 0.06)}
  <text x="${w / 2}" y="120" text-anchor="middle" fill="${CREAM}" fill-opacity="0.55"
    font-family="Inter, system-ui, sans-serif" font-size="20" letter-spacing="8">${esc(category.toUpperCase())}</text>
  <text x="${w / 2}" y="${h / 2 + 70}" text-anchor="middle" fill="${CREAM}" fill-opacity="0.9"
    font-family="Georgia, 'Cormorant Garamond', serif" font-size="280" font-style="italic">${monogram}</text>
  <text x="${w / 2}" y="${h - 56}" text-anchor="middle" fill="${CREAM}" fill-opacity="0.6"
    font-family="Georgia, serif" font-size="26" font-style="italic" letter-spacing="2">Paper Moon</text>
</svg>`;
}

function platePlaceholder({ slug, name }) {
  const s = 600;
  const cx = s / 2;
  const cy = s / 2;
  const monogram = name.trim()[0].toUpperCase();
  const id = `p-${slug}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" role="img" aria-label="${esc(name)}">
  <defs>
    <radialGradient id="${id}" cx="0.4" cy="0.35" r="0.75">
      <stop offset="0" stop-color="${CREAM}" />
      <stop offset="0.7" stop-color="${CREAM_DIM}" />
      <stop offset="1" stop-color="#d8d1bf" />
    </radialGradient>
  </defs>
  <rect width="${s}" height="${s}" fill="#0B0B0B" />
  <circle cx="${cx}" cy="${cy}" r="296" fill="url(#${id})" />
  <circle cx="${cx}" cy="${cy}" r="232" fill="none" stroke="#0B0B0B" stroke-opacity="0.10" stroke-width="2" />
  <circle cx="${cx}" cy="${cy}" r="210" fill="none" stroke="#0B0B0B" stroke-opacity="0.06" stroke-width="1" />
  ${crescent(cx + 6, cy - 4, 86, 0.14).replace(CREAM, "#0B0B0B")}
  <text x="${cx}" y="${cy + 36}" text-anchor="middle" fill="#0B0B0B" fill-opacity="0.30"
    font-family="Georgia, 'Cormorant Garamond', serif" font-size="120" font-style="italic">${monogram}</text>
</svg>`;
}

const MENU = [
  { slug: "olive-walnut-board", name: "Olive & Walnut Board", category: "Appetizers" },
  { slug: "smoked-eggplant-ajvar", name: "Smoked Eggplant Ajvar Dip", category: "Appetizers" },
  { slug: "fig-prosciutto-crostini", name: "Fig & Prosciutto Crostini", category: "Appetizers" },
  { slug: "zucchini-dill-fritters", name: "Zucchini & Dill Fritters", category: "Appetizers" },
  { slug: "burrata-heirloom-tomato", name: "Burrata & Heirloom Tomato", category: "Salads" },
  { slug: "rocket-parmesan-citrus", name: "Rocket, Parmesan & Citrus Salad", category: "Salads" },
  { slug: "mediterranean-chopped", name: "Mediterranean Chopped Salad", category: "Salads" },
  { slug: "margherita-classica", name: "Margherita Classica", category: "Pizza" },
  { slug: "quattro-formaggi", name: "Quattro Formaggi", category: "Pizza" },
  { slug: "prosciutto-arugula", name: "Prosciutto & Arugula", category: "Pizza" },
  { slug: "grilled-beef-steak", name: "Grilled Beef Steak", category: "Main Dishes" },
  { slug: "chicken-gorgonzola", name: "Chicken in Gorgonzola Sauce", category: "Main Dishes" },
  { slug: "salmon-orange-glaze", name: "Salmon in Orange Glaze", category: "Main Dishes" },
  { slug: "kadaif", name: "Kadaif", category: "Desserts" },
  { slug: "apple-pie", name: "Apple Pie", category: "Desserts" },
  { slug: "cheesecake", name: "Cheesecake", category: "Desserts" },
  { slug: "morning-croissant", name: "Morning Croissant & Butter", category: "Drinks" },
  { slug: "cappuccino", name: "Cappuccino", category: "Drinks" },
  { slug: "fresh-orange-juice", name: "Fresh Orange Juice", category: "Drinks" },
];

const FAVORITES = [
  { slug: "fav-burrata", name: "Burrata" },
  { slug: "fav-margherita", name: "Margherita" },
  { slug: "fav-salmon", name: "Salmon" },
  { slug: "fav-croissant", name: "Croissant" },
  { slug: "fav-kadaif", name: "Kadaif" },
  { slug: "fav-ajvar", name: "Ajvar" },
];

let count = 0;
for (const item of MENU) {
  writeFileSync(resolve(OUT, `${item.slug}.svg`), menuPlaceholder(item));
  count++;
}
for (const item of FAVORITES) {
  writeFileSync(resolve(OUT, `${item.slug}.svg`), platePlaceholder(item));
  count++;
}
console.log(`Generated ${count} placeholder images in public/images/menu/`);
