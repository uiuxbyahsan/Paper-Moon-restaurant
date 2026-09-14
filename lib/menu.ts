// Menu data — single source of truth for the STRUCTURAL side of the menu:
// stable ids, prices and images. The translated names + descriptions live in
// lib/translations.ts, keyed by these same ids (see brief). Both the homepage
// Menu tabs (§5.5) and the full /menu route read from here and pair each item
// with its translated copy at render time.
//
// Each item's `image` points at a branded placeholder under /public/images/food.
// To use a real photo, drop the file in and change this one `image` line.

export type MenuItem = {
  /** Stable id — the translation key in lib/translations.ts (menu.items[id]). */
  id: string;
  /** Bosnian name shown as an italic subtitle in the English view only. */
  localName?: string;
  /** Price in KM (Bosnian convertible mark). */
  price: number;
  image: string;
};

export type MenuCategory = {
  /** Tab id / anchor — also the translation key (menu.categories[id]). */
  id: string;
  items: MenuItem[];
};

export const CURRENCY = "KM";

const img = (slug: string) => `/images/food/${slug}.jpg`;

// Helper: id doubles as the image slug for every dish here.
const item = (id: string, price: number, localName?: string): MenuItem => ({
  id,
  price,
  localName,
  image: img(id),
});

export const MENU: MenuCategory[] = [
  {
    id: "appetizers",
    items: [
      item("olive-walnut-board", 8),
      item("smoked-eggplant-ajvar", 7),
      item("fig-prosciutto-crostini", 9),
      item("zucchini-dill-fritters", 8),
    ],
  },
  {
    id: "salads",
    items: [
      item("burrata-heirloom-tomato", 12),
      item("rocket-parmesan-citrus", 10),
      item("mediterranean-chopped", 9),
    ],
  },
  {
    id: "pizza",
    items: [
      item("margherita-classica", 11),
      item("quattro-formaggi", 13),
      item("prosciutto-arugula", 14),
    ],
  },
  {
    id: "mains",
    items: [
      item("grilled-beef-steak", 28, "Biftek na Žaru"),
      item("chicken-gorgonzola", 22, "Piletina sa Gorgonzolom"),
      item("salmon-orange-glaze", 26, "Losos u Umaku od Narandže"),
    ],
  },
  {
    id: "desserts",
    items: [item("kadaif", 8), item("apple-pie", 7, "Pita od Jabuke"), item("cheesecake", 9)],
  },
  {
    id: "drinks",
    items: [
      item("morning-croissant", 5),
      item("cappuccino", 4),
      item("fresh-orange-juice", 6),
    ],
  },
];

/** Look up a dish by its stable id. */
export function getDish(id: string): MenuItem | undefined {
  for (const category of MENU) {
    for (const dish of category.items) {
      if (dish.id === id) return dish;
    }
  }
  return undefined;
}

export function getDishImage(id: string): string {
  return getDish(id)?.image ?? img("burrata-heirloom-tomato");
}
