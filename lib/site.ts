// Single source of truth for brand + contact details.
// NOTE (see brief §8): address taken from the Instagram bio — confirm before launch.

export const SITE = {
  name: "Paper Moon",
  tagline: "Where elegance meets flavor since 2015.",
  since: 2015,
  address: "Hamdije Čemerlića 45, Sarajevo",
  addressCountry: "Bosnia and Herzegovina",
  phone: "+387 33 956 939",
  phoneHref: "tel:+38733956939",
  email: "papermoon.sa@gmail.com",
  hours: "Monday–Saturday, 8:00–23:00",
  instagramHandle: "@papermoon.sarajevo_",
  instagramUrl: "https://www.instagram.com/papermoon.sarajevo_/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Paper+Moon+Hamdije+%C4%8Cemerli%C4%87a+45+Sarajevo",
} as const;

// Header navigation (matches brief §5.1). "Reserve a Table" is rendered as a
// separate pill button, not part of this list. Labels are translated at render
// time via t.nav.links[id]; only the id + anchor are structural.
export type NavLinkId = "menu" | "spaces" | "about" | "gallery" | "contact";

export const NAV_LINKS: { id: NavLinkId; href: string }[] = [
  { id: "menu", href: "#menu" },
  { id: "spaces", href: "#spaces" },
  { id: "about", href: "#about" },
  { id: "gallery", href: "#gallery" },
  { id: "contact", href: "#contact" },
];
