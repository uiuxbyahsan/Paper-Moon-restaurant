import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CURRENCY, MENU } from "@/lib/menu";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu",
  description: "The full Paper Moon menu — appetizers, salads, pizza, mains, desserts and drinks.",
};

export default function MenuPage() {
  return (
    <div className="printable min-h-screen bg-black text-cream">
      {/* Top bar */}
      <header className="no-print border-b border-cream/10">
        <div className="shell flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Paper Moon — home">
            <Logo tone="onDark" className="h-11 w-auto" />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm tracking-wide2 text-cream/70 hover:text-cream">
              ← Home
            </Link>
            <Link href="/#reserve" className="pill-cream">
              Reserve a Table
            </Link>
          </div>
        </div>
      </header>

      <main className="shell py-16 sm:py-24">
        {/* Title */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Paper Moon</span>
          <h1 className="mt-2 text-5xl sm:text-7xl">The Menu</h1>
          <p className="mt-4 text-cream/60">{SITE.tagline}</p>
        </div>

        {/* Categories */}
        <div className="mx-auto mt-16 max-w-3xl space-y-16">
          {MENU.map((category) => (
            <section key={category.id} aria-labelledby={`menu-${category.id}`}>
              <div className="flex items-baseline gap-4">
                <h2 id={`menu-${category.id}`} className="text-3xl sm:text-4xl">
                  {category.label}
                </h2>
                <span className="h-px flex-1 bg-cream/15" />
              </div>

              <ul className="mt-8 space-y-7">
                {category.items.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl text-cream">{item.name}</h3>
                      {item.localName && (
                        <p className="mt-0.5 text-sm italic text-cream/45">{item.localName}</p>
                      )}
                      <p className="mt-1 max-w-md text-sm leading-relaxed text-cream/60">
                        {item.description}
                      </p>
                    </div>
                    <span className="shrink-0 font-serif text-xl text-cream/80">
                      {item.price} {CURRENCY}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Footnote */}
        <div className="mx-auto mt-20 max-w-3xl border-t border-cream/15 pt-8 text-center text-sm text-cream/55">
          <p>{SITE.address}</p>
          <p className="mt-1">
            {SITE.hours} · {SITE.phone}
          </p>
          <p className="mt-1">Prices in KM (Bosnian convertible mark).</p>
        </div>
      </main>
    </div>
  );
}
