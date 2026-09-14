// Central translation dictionary for the whole site.
//
// Shape rules (see brief):
//  - Two top-level keys, `bs` (primary) and `en`, share the SAME nested shape.
//  - Headings that emphasise one word are stored as { pre, em, post } so each
//    language can italicise the word that reads best while keeping the exact
//    markup: {pre}<span class="italic">{em}</span>{post}.
//  - Repeated data (menu items, gallery cards, spaces…) is keyed by a STABLE id
//    that lives with the structural data in lib/menu.ts / lib/content.ts. Only
//    the translated strings live here — never keyed by a display string.

export type Language = "bs" | "en";

/** A heading with a single emphasised (italic) word. */
export type EmphasisHeading = {
  pre: string;
  em: string;
  post: string;
};

export type MenuItemCopy = {
  name: string;
  description: string;
};

export type SpaceCopy = {
  name: string;
  caption: string;
};

export type AboutTabCopy = {
  label: string;
  body: string;
};

export type GalleryItemCopy = {
  caption: string;
  alt: string;
};

/** The full copy shape shared by every language. */
export type Translation = {
  meta: {
    /** Endonym shown on the language option row. */
    label: string;
    /** Abbreviation shown on the switcher trigger. */
    abbr: string;
    /** Static asset path of the circular flag. */
    flag: string;
  };
  nav: {
    links: Record<"menu" | "spaces" | "about" | "gallery" | "contact", string>;
    reserve: string;
    changeLanguage: string;
  };
  hero: {
    flankLeft: string;
    flankRight: string;
    headline: EmphasisHeading;
    subtitle: string;
    cta: string;
    scroll: string;
  };
  favorites: {
    eyebrow: string;
  };
  signatures: {
    eyebrow: string;
    /** Decorative word for each signature id (rendered uppercase by the UI). */
    words: Record<string, string>;
  };
  menu: {
    eyebrow: string;
    heading: string;
    intro: string;
    viewFull: string;
    categories: Record<string, string>;
    /** Dish copy keyed by menu item id — the single source of truth for names. */
    items: Record<string, MenuItemCopy>;
  };
  philosophy: {
    eyebrow: string;
    heading: string;
    body: string;
    since: string;
  };
  spaces: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: Record<string, SpaceCopy>;
  };
  reservation: {
    eyebrow: string;
    heading: string;
    fields: Record<
      "seating" | "guests" | "date" | "time" | "message" | "name" | "phone" | "email",
      string
    >;
    seatingOptions: Record<"indoor" | "terrace" | "bar", string>;
    placeholders: Record<"guests" | "message" | "name" | "phone" | "email", string>;
    submit: string;
    sending: string;
    successTitle: string;
    successBody: string;
    another: string;
    error: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    tabs: Record<string, AboutTabCopy>;
  };
  testimonials: {
    eyebrow: string;
    /** Quote text keyed by testimonial id (authors are proper nouns, kept in data). */
    quotes: Record<string, string>;
  };
  gallery: {
    eyebrow: string;
    heading: string;
    items: Record<string, GalleryItemCopy>;
  };
  instagram: {
    heading: string;
    intro: string;
  };
  footer: {
    tagline: string;
    pagesTitle: string;
    visitTitle: string;
    followTitle: string;
    reservation: string;
    fullMenu: string;
    country: string;
  };
  menuPage: {
    home: string;
    reserve: string;
    eyebrow: string;
    title: string;
    currencyNote: string;
  };
};

export type Translations = Record<Language, Translation>;

export const translations: Translations = {
  bs: {
    meta: { label: "Bosanski", abbr: "BA", flag: "/flags/ba.svg" },
    nav: {
      links: {
        menu: "Meni",
        spaces: "Naši Prostori",
        about: "O Nama",
        gallery: "Galerija",
        contact: "Kontakt",
      },
      reserve: "Rezervišite Sto",
      changeLanguage: "Promijeni jezik",
    },
    hero: {
      flankLeft:
        "Od jutarnjih brunch obroka do večera uz svijeće — svaki tanjir ima svoju priču.",
      flankRight: "Sarajevski mirni kutak od 2015.",
      headline: { pre: "Gdje elegancija susreće ", em: "okus", post: "" },
      subtitle: "Stvoreno za nezaboravne trenutke za stolom.",
      cta: "Rezervišite Sto",
      scroll: "Skrolaj",
    },
    favorites: {
      eyebrow: "Omiljena Jela",
    },
    signatures: {
      eyebrow: "Naši Specijaliteti",
      words: {
        artisan: "Zanatski",
        brunch: "Brunch",
        kadaif: "Kadaif",
        olive: "Maslina",
        brasserie: "Braserija",
        burrata: "Burata",
        gorgonzola: "Gorgonzola",
        thyme: "Timijan",
      },
    },
    menu: {
      eyebrow: "Okusite Meni",
      heading: "Meni",
      intro: "Svježi sastojci, spremljeni da se uživaju, dijele i naručuju iznova.",
      viewFull: "Pogledaj Cijeli Meni",
      categories: {
        appetizers: "Predjela",
        salads: "Salate",
        pizza: "Pizza",
        mains: "Glavna Jela",
        desserts: "Deserti",
        drinks: "Pića",
      },
      items: {
        "olive-walnut-board": {
          name: "Daska s Maslinama i Orasima",
          description: "Marinirane masline, tostirani orasi i zreli sir na toploj lepini.",
        },
        "smoked-eggplant-ajvar": {
          name: "Dip od Dimljenog Ajvara",
          description: "Sporo pečene paprike i patlidžan, samljeveni i preliveni maslinovim uljem.",
        },
        "fig-prosciutto-crostini": {
          name: "Crostini sa Smokvom i Pršutom",
          description: "Hrskavi kruh od kvasca, slatka smokva, pršut i kap meda.",
        },
        "zucchini-dill-fritters": {
          name: "Uštipci od Tikvica s Koprom",
          description: "Zlatni uštipci od tikvica sa svježim koprom i hladnim jogurt dipom.",
        },
        "burrata-heirloom-tomato": {
          name: "Burata i Starinski Paradajz",
          description: "Kremasta burata, zreli starinski paradajz, bosiljak i zreli balzamiko.",
        },
        "rocket-parmesan-citrus": {
          name: "Salata s Rukolom, Parmezanom i Citrusima",
          description: "Ljutkasta rukola, listići parmezana i sočna naranča u citrus preljevu.",
        },
        "mediterranean-chopped": {
          name: "Mediteranska Sjeckana Salata",
          description: "Krastavac, paradajz, masline i feta s aromatičnim biljem i limunom.",
        },
        "margherita-classica": {
          name: "Klasična Margarita",
          description: "San Marzano paradajz, fior di latte, svježi bosiljak i djevičansko maslinovo ulje.",
        },
        "quattro-formaggi": {
          name: "Quattro Formaggi",
          description: "Mocarela, gorgonzola, parmezan i dimljena skamorca na tankom tijestu.",
        },
        "prosciutto-arugula": {
          name: "Pršut i Rukola",
          description: "Pršut, divlja rukola i parmezan na tijestu iz krušne peći.",
        },
        "grilled-beef-steak": {
          name: "Biftek na Žaru",
          description: "Goveđi biftek s roštilja sa sezonskim povrćem i umakom od papra.",
        },
        "chicken-gorgonzola": {
          name: "Piletina sa Gorgonzolom",
          description: "Pileća prsa u baršunastom umaku od gorgonzole.",
        },
        "salmon-orange-glaze": {
          name: "Losos u Umaku od Naranče",
          description: "File lososa glaziran narančom i timijanom, poslužen sa zelenom salatom.",
        },
        kadaif: {
          name: "Kadaif",
          description: "Rezano tijesto pečeno do zlatne boje, natopljeno mirisnim sirupom i orasima.",
        },
        "apple-pie": {
          name: "Pita od Jabuke",
          description: "Topla začinjena jabuka u prhkom tijestu uz kuglicu vanilin krema.",
        },
        cheesecake: {
          name: "Torta od Sira",
          description: "Svilenkasta pečena torta od sira na keksu s maslacem i sezonskim voćem.",
        },
        "morning-croissant": {
          name: "Jutarnji Kroasan s Maslacem",
          description: "Svježe pečeni kroasan s maslacem i džemom — savršen početak.",
        },
        cappuccino: {
          name: "Kapučino",
          description: "Espresso pod mekim oblakom pjenastog mlijeka.",
        },
        "fresh-orange-juice": {
          name: "Svježe Cijeđena Naranča",
          description: "Ručno cijeđena, poslužena hladna.",
        },
      },
    },
    philosophy: {
      eyebrow: "Naša Filozofija",
      heading: "Neka Svako Veče Vrijedi Pamćenja",
      body: "Svaki tanjir u Paper Moonu biran je s pažnjom, pripreman sa strpljenjem i poslužen s toplinom — od jutarnjih peciva do večera uz svijeće. Od 2015. naša kuhinja slavi ljepotu jednostavnosti.",
      since: "— Od 2015.",
    },
    spaces: {
      eyebrow: "Doživljaj",
      heading: "Naši Prostori, Jedna Priča",
      intro:
        "Od sunčanih brunch obroka do večera uz svijeće i noćnih razgovora, svaki prostor u Paper Moonu oblikuje drugačiju vrstu trenutka.",
      items: {
        indoor: {
          name: "Unutrašnji Prostor",
          caption: "Vidljiva cigla, topla svjetlost i ukrasne rešetke.",
        },
        terrace: {
          name: "Terasa",
          caption: "Mozaik stolovi uz svijeće ispod blistavog lustera.",
        },
        bar: {
          name: "Bar i Lounge",
          caption: "Strop s drvenim gredama i zid od cigle s vinima za dugo zadržavanje.",
        },
      },
    },
    reservation: {
      eyebrow: "Rezervacija",
      heading: "Rezervišite Sto",
      fields: {
        seating: "Preferencija Sjedenja",
        guests: "Gosti",
        date: "Datum",
        time: "Vrijeme",
        message: "Posebna Želja",
        name: "Ime",
        phone: "Telefon",
        email: "Email",
      },
      seatingOptions: {
        indoor: "Unutra",
        terrace: "Terasa",
        bar: "Bar",
      },
      placeholders: {
        guests: "Broj gostiju",
        message: "Mirni kutak, proslava, napomene o ishrani…",
        name: "Amina Hodžić",
        phone: "+387 ...",
        email: "primjer@gmail.com",
      },
      submit: "Rezervišite Sto",
      sending: "Šaljem…",
      successTitle: "Hvala Vam",
      successBody:
        "Vaš zahtjev je stigao do nas. Uskoro ćemo potvrditi Vaš sto telefonom ili e-mailom.",
      another: "Napravi novu rezervaciju",
      error: "Nešto je pošlo po zlu. Molimo nazovite nas na +387 33 956 939.",
    },
    about: {
      eyebrow: "O Nama",
      heading: "Naš Paper Moon",
      tabs: {
        story: {
          label: "Naša Priča",
          body: "Od 2015. Paper Moon je sarajevski mirni kutak za spore jutarnje sate i večeri uz svijeće — gdje se elegancija susreće s okusom, jedan po jedan tanjir.",
        },
        values: {
          label: "Naše Vrijednosti",
          body: "Kuhamo s onim što je svježe i domaće, prema svakom gostu se odnosimo kao prema porodici i vjerujemo da se dobra večer gradi na malim detaljima — pravom svjetlu, nesuvišnom stolu i hrani pripremljenoj s pažnjom.",
        },
        chefs: {
          label: "Naši Kuhari",
          body: "Našu kuhinju vodi mali tim koji godinama oblikuje okuse Paper Moona. Potpune biografije i portreti kuhara uskoro stižu — za sada rezervirano mjesto.",
        },
      },
    },
    testimonials: {
      eyebrow: "Lijepe Riječi",
      quotes: {
        t1: "Svaki put intiman doživljaj — svjetlost svijeća, burata, tihi žamor razgovora. Paper Moon je kao dobro čuvana tajna.",
        t2: "Najbolji brunch kroasani u Sarajevu, bez premca. Dolazimo svake nedjelje.",
        t3: "Od begove čorbe do kadaifa, svako jelo priča priču. Pravi kvartovski dragulj još od 2015.",
      },
    },
    gallery: {
      eyebrow: "Trenuci",
      heading: "Večeri u Paper Moonu",
      items: {
        "terrace-evenings": {
          caption: "Večeri na Terasi",
          alt: "Stolovi uz svijeće na terasi Paper Moona noću",
        },
        "morning-brunch": {
          caption: "Jutarnji Brunch",
          alt: "Svježe pečeni zlatni kroasani",
        },
        "candlelit-dinners": {
          caption: "Večere uz Svijeće",
          alt: "Detalj postavljenog stola Paper Moona s čašama za vino i zlatnim priborom",
        },
        "from-the-kitchen": {
          caption: "Iz Kuhinje",
          alt: "Salata od burate i starinskog paradajza na tamnom tanjiru",
        },
        "dining-room": {
          caption: "Trpezarija",
          alt: "Unutrašnjost Paper Moona od cigle s intimnim sjedenjem",
        },
        "from-the-grill": {
          caption: "Sa Žara",
          alt: "Goveđi biftek s roštilja uz pečeni krompir",
        },
        "our-corner": {
          caption: "Naš Kutak Sarajeva",
          alt: "Dnevni pogled na Paper Moon i sjedenje na terasi",
        },
        "something-sweet": {
          caption: "Nešto Slatko",
          alt: "Desert kadaif s pistaćima",
        },
      },
    },
    instagram: {
      heading: "Pratite nas na Instagramu",
      intro: "Pogledajte naša najnovija jela, večernje trenutke i priče iza kulisa.",
    },
    footer: {
      tagline: "Gdje se elegancija susreće s okusom od 2015.",
      pagesTitle: "Stranice",
      visitTitle: "Posjetite",
      followTitle: "Pratite Nas",
      reservation: "Rezervacija",
      fullMenu: "Cijeli Meni",
      country: "Bosna i Hercegovina",
    },
    menuPage: {
      home: "← Početna",
      reserve: "Rezervišite Sto",
      eyebrow: "Paper Moon",
      title: "Meni",
      currencyNote: "Cijene u KM (konvertibilna marka).",
    },
  },

  en: {
    meta: { label: "English", abbr: "EN", flag: "/flags/gb.svg" },
    nav: {
      links: {
        menu: "Menu",
        spaces: "Our Spaces",
        about: "About",
        gallery: "Gallery",
        contact: "Contact",
      },
      reserve: "Reserve a Table",
      changeLanguage: "Change language",
    },
    hero: {
      flankLeft: "From sunrise brunches to candlelit dinners, every plate has a story.",
      flankRight: "Sarajevo's quiet corner since 2015.",
      headline: { pre: "Where elegance meets ", em: "flavor", post: "" },
      subtitle: "Crafted for memorable dining.",
      cta: "Reserve a Table",
      scroll: "Scroll",
    },
    favorites: {
      eyebrow: "Favorite Dishes",
    },
    signatures: {
      eyebrow: "Our Signatures",
      words: {
        artisan: "Artisan",
        brunch: "Brunch",
        kadaif: "Kadaif",
        olive: "Olive",
        brasserie: "Brasserie",
        burrata: "Burrata",
        gorgonzola: "Gorgonzola",
        thyme: "Thyme",
      },
    },
    menu: {
      eyebrow: "Taste the Menu",
      heading: "Menu",
      intro: "Fresh ingredients, made to be enjoyed, shared, and ordered again.",
      viewFull: "View Full Menu",
      categories: {
        appetizers: "Appetizers",
        salads: "Salads",
        pizza: "Pizza",
        mains: "Main Dishes",
        desserts: "Desserts",
        drinks: "Drinks",
      },
      items: {
        "olive-walnut-board": {
          name: "Olive & Walnut Board",
          description: "Marinated olives, toasted walnuts, and aged cheese on warm flatbread.",
        },
        "smoked-eggplant-ajvar": {
          name: "Smoked Eggplant Ajvar Dip",
          description: "Slow-roasted peppers and aubergine, stone-ground and finished with olive oil.",
        },
        "fig-prosciutto-crostini": {
          name: "Fig & Prosciutto Crostini",
          description: "Crisp sourdough, sweet fig, cured prosciutto, and a drizzle of honey.",
        },
        "zucchini-dill-fritters": {
          name: "Zucchini & Dill Fritters",
          description: "Golden courgette fritters with fresh dill and a cool yoghurt dip.",
        },
        "burrata-heirloom-tomato": {
          name: "Burrata & Heirloom Tomato",
          description: "Creamy burrata, ripe heirloom tomatoes, basil, and aged balsamic.",
        },
        "rocket-parmesan-citrus": {
          name: "Rocket, Parmesan & Citrus Salad",
          description: "Peppery rocket, shaved parmesan, and bright orange in a citrus dressing.",
        },
        "mediterranean-chopped": {
          name: "Mediterranean Chopped Salad",
          description: "Cucumber, tomato, olives, and feta tossed with herbs and lemon.",
        },
        "margherita-classica": {
          name: "Margherita Classica",
          description: "San Marzano tomato, fior di latte, fresh basil, extra-virgin olive oil.",
        },
        "quattro-formaggi": {
          name: "Quattro Formaggi",
          description: "Mozzarella, gorgonzola, parmesan, and smoked scamorza on a thin crust.",
        },
        "prosciutto-arugula": {
          name: "Prosciutto & Arugula",
          description: "Cured prosciutto, wild rocket, and parmesan over a wood-fired base.",
        },
        "grilled-beef-steak": {
          name: "Grilled Beef Steak",
          description: "Char-grilled beef tenderloin with seasonal vegetables and pepper sauce.",
        },
        "chicken-gorgonzola": {
          name: "Chicken in Gorgonzola Sauce",
          description: "Pan-seared chicken breast in a velvety gorgonzola cream.",
        },
        "salmon-orange-glaze": {
          name: "Salmon in Orange Glaze",
          description: "Fillet of salmon glazed with orange and thyme, served with greens.",
        },
        kadaif: {
          name: "Kadaif",
          description: "Shredded pastry baked golden, soaked in fragrant syrup and walnuts.",
        },
        "apple-pie": {
          name: "Apple Pie",
          description: "Warm spiced apple in flaky pastry with a scoop of vanilla cream.",
        },
        cheesecake: {
          name: "Cheesecake",
          description: "Silky baked cheesecake on a buttery biscuit base with seasonal fruit.",
        },
        "morning-croissant": {
          name: "Morning Croissant & Butter",
          description: "Freshly baked all-butter croissant with jam — the perfect start.",
        },
        cappuccino: {
          name: "Cappuccino",
          description: "Espresso under a soft cloud of steamed milk.",
        },
        "fresh-orange-juice": {
          name: "Fresh Orange Juice",
          description: "Hand-squeezed, served cold.",
        },
      },
    },
    philosophy: {
      eyebrow: "Our Philosophy",
      heading: "Make Every Evening Worth Remembering",
      body: "Every plate at Paper Moon is sourced with care, prepared with patience, and served with warmth — from early-morning pastries to candlelit dinners. Since 2015, our kitchen has celebrated the beauty of simplicity.",
      since: "— Since 2015",
    },
    spaces: {
      eyebrow: "The Experience",
      heading: "Our Spaces, One Story",
      intro:
        "From sunlit brunches to candlelit dinners and late-night conversations, every space at Paper Moon is designed to shape a different kind of moment.",
      items: {
        indoor: {
          name: "Indoor Dining",
          caption: "Exposed brick, warm light, and decorative swirl screens.",
        },
        terrace: {
          name: "Terrace",
          caption: "Candlelit mosaic tables beneath a glowing chandelier.",
        },
        bar: {
          name: "Bar & Lounge",
          caption: "A wood-beam ceiling and brick wine wall to linger under.",
        },
      },
    },
    reservation: {
      eyebrow: "Reservation",
      heading: "Reserve a Table",
      fields: {
        seating: "Seating Preference",
        guests: "Guests",
        date: "Date",
        time: "Time",
        message: "Special Request",
        name: "Name",
        phone: "Phone",
        email: "Email",
      },
      seatingOptions: {
        indoor: "Indoor",
        terrace: "Terrace",
        bar: "Bar",
      },
      placeholders: {
        guests: "Number of guests",
        message: "A quiet corner, a celebration, dietary notes…",
        name: "Jane Smith",
        phone: "+387 ...",
        email: "sample@gmail.com",
      },
      submit: "Reserve a Table",
      sending: "Sending…",
      successTitle: "Thank you",
      successBody:
        "Your request has reached us. We'll confirm your table by phone or email shortly.",
      another: "Make another reservation",
      error: "Something went wrong. Please call us at +387 33 956 939.",
    },
    about: {
      eyebrow: "About",
      heading: "Our Paper Moon",
      tabs: {
        story: {
          label: "Our Story",
          body: "Since 2015, Paper Moon has been Sarajevo's quiet corner for slow mornings and candlelit nights — where elegance meets flavor, one plate at a time.",
        },
        values: {
          label: "Our Values",
          body: "We cook with what's fresh and local, treat every guest like family, and believe a good evening is built on small details — the right light, an unhurried table, and food made with care.",
        },
        chefs: {
          label: "Our Chefs",
          body: "Our kitchen is led by a small team who have shaped Paper Moon's flavours for years. Full chef bios and portraits are coming soon — a placeholder for now.",
        },
      },
    },
    testimonials: {
      eyebrow: "Kind Words",
      quotes: {
        t1: "An intimate evening every time — the candlelight, the burrata, the quiet hum of conversation. Paper Moon feels like a secret kept well.",
        t2: "Best brunch croissants in Sarajevo, hands down. We come every Sunday.",
        t3: "From the bey's soup to the kadaif, every dish tells a story. A true neighborhood gem since 2015.",
      },
    },
    gallery: {
      eyebrow: "Moments",
      heading: "Evenings at Paper Moon",
      items: {
        "terrace-evenings": {
          caption: "Terrace Evenings",
          alt: "Candlelit tables on Paper Moon's terrace at night",
        },
        "morning-brunch": {
          caption: "Morning Brunch",
          alt: "Freshly baked golden croissants",
        },
        "candlelit-dinners": {
          caption: "Candlelit Dinners",
          alt: "Close-up of a Paper Moon table setting with wine glasses and gold cutlery",
        },
        "from-the-kitchen": {
          caption: "From the Kitchen",
          alt: "Burrata and heirloom tomato salad on a dark plate",
        },
        "dining-room": {
          caption: "The Dining Room",
          alt: "Paper Moon's brick interior with intimate seating",
        },
        "from-the-grill": {
          caption: "From the Grill",
          alt: "Grilled beef steak with roasted potatoes",
        },
        "our-corner": {
          caption: "Our Corner of Sarajevo",
          alt: "Daytime view of the Paper Moon storefront and terrace seating",
        },
        "something-sweet": {
          caption: "Something Sweet",
          alt: "Kadaif dessert with pistachio",
        },
      },
    },
    instagram: {
      heading: "Follow us on Instagram",
      intro: "See our latest dishes, evening moments, and behind-the-scenes stories.",
    },
    footer: {
      tagline: "Where elegance meets flavor since 2015.",
      pagesTitle: "Pages",
      visitTitle: "Visit",
      followTitle: "Follow Us",
      reservation: "Reservation",
      fullMenu: "Full Menu",
      country: "Bosnia and Herzegovina",
    },
    menuPage: {
      home: "← Home",
      reserve: "Reserve a Table",
      eyebrow: "Paper Moon",
      title: "The Menu",
      currencyNote: "Prices in KM (Bosnian convertible mark).",
    },
  },
};
