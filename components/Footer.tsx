import Link from "next/link";
import { Logo } from "@/components/Logo";
import { BackToTop } from "@/components/BackToTop";
import { NAV_LINKS, SITE } from "@/lib/site";

const PAGES = [...NAV_LINKS, { label: "Reservation", href: "#reserve" }, { label: "Full Menu", href: "/menu" }];

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 bg-cream text-charcoal">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Logo tone="onLight" className="h-16 w-auto" />
          <p className="mt-6 max-w-xs text-charcoal/70">{SITE.tagline}</p>
        </div>

        {/* Pages */}
        <nav aria-label="Footer">
          <h3 className="text-xs uppercase tracking-eyebrow text-charcoal/50">Pages</h3>
          <ul className="mt-5 space-y-3">
            {PAGES.map((link) =>
              link.href.startsWith("/") ? (
                <li key={link.href}>
                  <Link href={link.href} className="font-serif text-xl transition-opacity hover:opacity-60">
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.href}>
                  <a href={link.href} className="font-serif text-xl transition-opacity hover:opacity-60">
                    {link.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        {/* Visit */}
        <div>
          <h3 className="text-xs uppercase tracking-eyebrow text-charcoal/50">Visit</h3>
          <address className="mt-5 space-y-3 not-italic text-charcoal/75">
            <p>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-charcoal">
                {SITE.address}
              </a>
            </p>
            <p>{SITE.hours}</p>
            <p>
              <a href={SITE.phoneHref} className="hover:text-charcoal">
                {SITE.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${SITE.email}`} className="hover:text-charcoal">
                {SITE.email}
              </a>
            </p>
          </address>
        </div>

        {/* Connect */}
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-xs uppercase tracking-eyebrow text-charcoal/50">Follow Us</h3>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Paper Moon on Instagram (${SITE.instagramHandle})`}
              className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/25 transition-all duration-300 hover:-translate-y-0.5 hover:border-charcoal"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-charcoal/15">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-sm text-charcoal/60 sm:flex-row">
          <p>
            {SITE.name} © 2026 · {SITE.addressCountry}
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
