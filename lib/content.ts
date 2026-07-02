// Content for the editorial sections (§5.3, 5.4, 5.7, 5.9, 5.10, 5.11).
// Favorite Dishes, Our Signatures and Gallery pull their images from the menu
// (lib/menu.ts) so dish names and photos stay consistent across the site.

import { getDishImage } from "./menu";

export type FavoriteDish = {
  name: string;
  image: string;
};

// §5.3 — 9 dishes, drawn from the menu (English or Bosnian name as listed).
const FAVORITE_NAMES = [
  "Morning Croissant & Butter",
  "Burrata & Heirloom Tomato",
  "Margherita Classica",
  "Biftek na Žaru",
  "Kadaif",
  "Smoked Eggplant Ajvar Dip",
  "Piletina sa Gorgonzolom",
  "Quattro Formaggi",
  "Cheesecake",
];

export const FAVORITE_DISHES: FavoriteDish[] = FAVORITE_NAMES.map((name) => ({
  name,
  image: getDishImage(name),
}));

// §5.4 Our Signatures — each word maps to a specific dish photo (hover/tap swaps
// the center image). KADAIF is the default/featured image.
export type SignatureWord = {
  word: string;
  focal: boolean;
  dish: string;
  image: string;
};

const sig = (word: string, focal: boolean, dish: string): SignatureWord => ({
  word,
  focal,
  dish,
  image: getDishImage(dish),
});

export const SIGNATURES = {
  left: [
    sig("ARTISAN", false, "Fig & Prosciutto Crostini"),
    sig("BRUNCH", false, "Morning Croissant & Butter"),
    sig("KADAIF", true, "Kadaif"),
    sig("OLIVE", false, "Olive & Walnut Board"),
  ],
  right: [
    sig("BRASSERIE", false, "Biftek na Žaru"),
    sig("BURRATA", true, "Burrata & Heirloom Tomato"),
    sig("GORGONZOLA", false, "Piletina sa Gorgonzolom"),
    sig("THYME", false, "Mediterranean Chopped Salad"),
  ],
} as const;

export const SIGNATURE_DEFAULT_WORD = "KADAIF";

// §5.7 Our Spaces — the three ambiences of the one venue.
export type Space = {
  name: string;
  caption: string;
  image: string;
  alt: string;
};

export const SPACES: Space[] = [
  {
    name: "Indoor Dining",
    caption: "Exposed brick, warm light, and decorative swirl screens.",
    image: "/images/interior-brick.jpg",
    alt: "Paper Moon's brick-walled indoor dining room with a table set for two and a wine display",
  },
  {
    name: "Terrace",
    caption: "Candlelit mosaic tables beneath a glowing chandelier.",
    image: "/images/terrace-night.jpg",
    alt: "Paper Moon's covered terrace at night with candlelit mosaic-tile tables",
  },
  {
    name: "Bar & Lounge",
    caption: "A wood-beam ceiling and brick wine wall to linger under.",
    image: "/images/interior-wide.jpg",
    alt: "Wide view of Paper Moon's interior with wood-beam ceiling, brick wine wall and staircase",
  },
];

// §5.9 About — tabbed content.
export const ABOUT_TABS = [
  {
    id: "story",
    label: "Our Story",
    body: "Since 2015, Paper Moon has been Sarajevo's quiet corner for slow mornings and candlelit nights — where elegance meets flavor, one plate at a time.",
  },
  {
    id: "values",
    label: "Our Values",
    body: "We cook with what's fresh and local, treat every guest like family, and believe a good evening is built on small details — the right light, an unhurried table, and food made with care.",
  },
  {
    id: "chefs",
    label: "Our Chefs",
    body: "Our kitchen is led by a small team who have shaped Paper Moon's flavours for years. Full chef bios and portraits are coming soon — a placeholder for now.",
  },
] as const;

// §5.10 Testimonials — placeholder guest quotes, swap for real reviews.
export type Testimonial = {
  quote: string;
  author: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "An intimate evening every time — the candlelight, the burrata, the quiet hum of conversation. Paper Moon feels like a secret kept well.",
    author: "Lejla K.",
    rating: 5,
  },
  {
    quote: "Best brunch croissants in Sarajevo, hands down. We come every Sunday.",
    author: "Marko D.",
    rating: 5,
  },
  {
    quote:
      "From the bey's soup to the kadaif, every dish tells a story. A true neighborhood gem since 2015.",
    author: "Amina H.",
    rating: 5,
  },
];

// §5.11 Gallery — featured carousel mixing venue ambience with real food shots.
export type GalleryItem = {
  image: string;
  caption: string;
  alt: string;
};

export const GALLERY: GalleryItem[] = [
  {
    image: "/images/terrace-night.jpg",
    caption: "Terrace Evenings",
    alt: "Candlelit tables on Paper Moon's terrace at night",
  },
  {
    image: getDishImage("Morning Croissant & Butter"),
    caption: "Morning Brunch",
    alt: "Freshly baked golden croissants",
  },
  {
    image: "/images/table-setting.jpg",
    caption: "Candlelit Dinners",
    alt: "Close-up of a Paper Moon table setting with wine glasses and gold cutlery",
  },
  {
    image: getDishImage("Burrata & Heirloom Tomato"),
    caption: "From the Kitchen",
    alt: "Burrata and heirloom tomato salad on a dark plate",
  },
  {
    image: "/images/interior-brick.jpg",
    caption: "The Dining Room",
    alt: "Paper Moon's brick interior with intimate seating",
  },
  {
    image: getDishImage("Biftek na Žaru"),
    caption: "From the Grill",
    alt: "Grilled beef steak with roasted potatoes",
  },
  {
    image: "/images/storefront.jpg",
    caption: "Our Corner of Sarajevo",
    alt: "Daytime view of the Paper Moon storefront and terrace seating",
  },
  {
    image: getDishImage("Kadaif"),
    caption: "Something Sweet",
    alt: "Kadaif dessert with pistachio",
  },
];
