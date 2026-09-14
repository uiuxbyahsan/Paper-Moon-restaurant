// Structural data for the editorial sections (§5.3, 5.4, 5.7, 5.9, 5.10, 5.11).
// These carry only ids + images; the translated names, captions and bodies live
// in lib/translations.ts keyed by the same ids. Favorite Dishes, Our Signatures
// and Gallery pull their images from the menu (lib/menu.ts) so dish photos stay
// consistent across the site.

import { getDishImage } from "./menu";

// §5.3 Favorite Dishes — 9 dishes drawn from the menu (name via menu.items[id]).
export type FavoriteDish = {
  /** Menu item id — translated name comes from t.menu.items[id].name. */
  id: string;
  image: string;
};

const FAVORITE_IDS = [
  "morning-croissant",
  "burrata-heirloom-tomato",
  "margherita-classica",
  "grilled-beef-steak",
  "kadaif",
  "smoked-eggplant-ajvar",
  "chicken-gorgonzola",
  "quattro-formaggi",
  "cheesecake",
];

export const FAVORITE_DISHES: FavoriteDish[] = FAVORITE_IDS.map((id) => ({
  id,
  image: getDishImage(id),
}));

// §5.4 Our Signatures — each decorative word maps to a specific dish photo
// (hover/tap swaps the center image). KADAIF is the default/featured image.
export type SignatureWord = {
  /** Word id — translated label comes from t.signatures.words[id]. */
  id: string;
  focal: boolean;
  /** Menu item id for the paired dish photo + caption. */
  dishId: string;
  image: string;
};

const sig = (id: string, focal: boolean, dishId: string): SignatureWord => ({
  id,
  focal,
  dishId,
  image: getDishImage(dishId),
});

export const SIGNATURES = {
  left: [
    sig("artisan", false, "fig-prosciutto-crostini"),
    sig("brunch", false, "morning-croissant"),
    sig("kadaif", true, "kadaif"),
    sig("olive", false, "olive-walnut-board"),
  ],
  right: [
    sig("brasserie", false, "grilled-beef-steak"),
    sig("burrata", true, "burrata-heirloom-tomato"),
    sig("gorgonzola", false, "chicken-gorgonzola"),
    sig("thyme", false, "mediterranean-chopped"),
  ],
} as const;

export const SIGNATURE_DEFAULT_ID = "kadaif";

// §5.7 Our Spaces — the three ambiences of the one venue (name + caption via
// t.spaces.items[id]).
export type Space = {
  id: string;
  image: string;
};

export const SPACES: Space[] = [
  { id: "indoor", image: "/images/interior-brick.jpg" },
  { id: "terrace", image: "/images/terrace-night.jpg" },
  { id: "bar", image: "/images/interior-wide.jpg" },
];

// §5.9 About — tab ids (label + body via t.about.tabs[id]).
export const ABOUT_TAB_IDS = ["story", "values", "chefs"] as const;

// §5.10 Testimonials — quote via t.testimonials.quotes[id]; author + rating are
// proper data and stay here.
export type Testimonial = {
  id: string;
  author: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", author: "Lejla K.", rating: 5 },
  { id: "t2", author: "Marko D.", rating: 5 },
  { id: "t3", author: "Amina H.", rating: 5 },
];

// §5.11 Gallery — featured carousel (caption + alt via t.gallery.items[id]).
export type GalleryItem = {
  id: string;
  image: string;
};

export const GALLERY: GalleryItem[] = [
  { id: "terrace-evenings", image: "/images/terrace-night.jpg" },
  { id: "morning-brunch", image: getDishImage("morning-croissant") },
  { id: "candlelit-dinners", image: "/images/table-setting.jpg" },
  { id: "from-the-kitchen", image: getDishImage("burrata-heirloom-tomato") },
  { id: "dining-room", image: "/images/interior-brick.jpg" },
  { id: "from-the-grill", image: getDishImage("grilled-beef-steak") },
  { id: "our-corner", image: "/images/storefront.jpg" },
  { id: "something-sweet", image: getDishImage("kadaif") },
];
