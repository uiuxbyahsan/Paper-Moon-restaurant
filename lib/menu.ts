// Menu data — single source of truth for both the homepage Menu tabs (§5.5)
// and the full /menu route. Prices are placeholder KM values reconstructed from
// Paper Moon's real menu + Instagram (see brief §8 — swap before launch).
//
// Each item's `image` points at a branded SVG placeholder. To use a real photo,
// drop the file in /public/images/menu/ and change this one `image` line.

export type MenuItem = {
  name: string;
  /** Bosnian name shown as a subtitle where the dish has one. */
  localName?: string;
  description: string;
  /** Price in KM (Bosnian convertible mark). */
  price: number;
  image: string;
};

export type MenuCategory = {
  /** Tab id / anchor. */
  id: string;
  label: string;
  items: MenuItem[];
};

export const CURRENCY = "KM";

const img = (slug: string) => `/images/food/${slug}.jpg`;

export const MENU: MenuCategory[] = [
  {
    id: "appetizers",
    label: "Appetizers",
    items: [
      {
        name: "Olive & Walnut Board",
        description: "Marinated olives, toasted walnuts, and aged cheese on warm flatbread.",
        price: 8,
        image: img("olive-walnut-board"),
      },
      {
        name: "Smoked Eggplant Ajvar Dip",
        description: "Slow-roasted peppers and aubergine, stone-ground and finished with olive oil.",
        price: 7,
        image: img("smoked-eggplant-ajvar"),
      },
      {
        name: "Fig & Prosciutto Crostini",
        description: "Crisp sourdough, sweet fig, cured prosciutto, and a drizzle of honey.",
        price: 9,
        image: img("fig-prosciutto-crostini"),
      },
      {
        name: "Zucchini & Dill Fritters",
        description: "Golden courgette fritters with fresh dill and a cool yoghurt dip.",
        price: 8,
        image: img("zucchini-dill-fritters"),
      },
    ],
  },
  {
    id: "salads",
    label: "Salads",
    items: [
      {
        name: "Burrata & Heirloom Tomato",
        description: "Creamy burrata, ripe heirloom tomatoes, basil, and aged balsamic.",
        price: 12,
        image: img("burrata-heirloom-tomato"),
      },
      {
        name: "Rocket, Parmesan & Citrus Salad",
        description: "Peppery rocket, shaved parmesan, and bright orange in a citrus dressing.",
        price: 10,
        image: img("rocket-parmesan-citrus"),
      },
      {
        name: "Mediterranean Chopped Salad",
        description: "Cucumber, tomato, olives, and feta tossed with herbs and lemon.",
        price: 9,
        image: img("mediterranean-chopped"),
      },
    ],
  },
  {
    id: "pizza",
    label: "Pizza",
    items: [
      {
        name: "Margherita Classica",
        description: "San Marzano tomato, fior di latte, fresh basil, extra-virgin olive oil.",
        price: 11,
        image: img("margherita-classica"),
      },
      {
        name: "Quattro Formaggi",
        description: "Mozzarella, gorgonzola, parmesan, and smoked scamorza on a thin crust.",
        price: 13,
        image: img("quattro-formaggi"),
      },
      {
        name: "Prosciutto & Arugula",
        description: "Cured prosciutto, wild rocket, and parmesan over a wood-fired base.",
        price: 14,
        image: img("prosciutto-arugula"),
      },
    ],
  },
  {
    id: "mains",
    label: "Main Dishes",
    items: [
      {
        name: "Grilled Beef Steak",
        localName: "Biftek na Žaru",
        description: "Char-grilled beef tenderloin with seasonal vegetables and pepper sauce.",
        price: 28,
        image: img("grilled-beef-steak"),
      },
      {
        name: "Chicken in Gorgonzola Sauce",
        localName: "Piletina sa Gorgonzolom",
        description: "Pan-seared chicken breast in a velvety gorgonzola cream.",
        price: 22,
        image: img("chicken-gorgonzola"),
      },
      {
        name: "Salmon in Orange Glaze",
        localName: "Losos u Umaku od Narandže",
        description: "Fillet of salmon glazed with orange and thyme, served with greens.",
        price: 26,
        image: img("salmon-orange-glaze"),
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      {
        name: "Kadaif",
        description: "Shredded pastry baked golden, soaked in fragrant syrup and walnuts.",
        price: 8,
        image: img("kadaif"),
      },
      {
        name: "Apple Pie",
        localName: "Pita od Jabuke",
        description: "Warm spiced apple in flaky pastry with a scoop of vanilla cream.",
        price: 7,
        image: img("apple-pie"),
      },
      {
        name: "Cheesecake",
        description: "Silky baked cheesecake on a buttery biscuit base with seasonal fruit.",
        price: 9,
        image: img("cheesecake"),
      },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    items: [
      {
        name: "Morning Croissant & Butter",
        description: "Freshly baked all-butter croissant with jam — the perfect start.",
        price: 5,
        image: img("morning-croissant"),
      },
      {
        name: "Cappuccino",
        description: "Espresso under a soft cloud of steamed milk.",
        price: 4,
        image: img("cappuccino"),
      },
      {
        name: "Fresh Orange Juice",
        description: "Hand-squeezed, served cold.",
        price: 6,
        image: img("fresh-orange-juice"),
      },
    ],
  },
];

/**
 * Look up a dish by its English name or its Bosnian localName. Lets the
 * Favorite Dishes and Our Signatures sections reuse the menu as the single
 * source of truth for names + images.
 */
export function getDish(nameOrLocal: string): MenuItem | undefined {
  for (const category of MENU) {
    for (const item of category.items) {
      if (item.name === nameOrLocal || item.localName === nameOrLocal) return item;
    }
  }
  return undefined;
}

export function getDishImage(nameOrLocal: string): string {
  return getDish(nameOrLocal)?.image ?? "/images/food/burrata-heirloom-tomato.jpg";
}
