# Paper Moon

Marketing site for **Paper Moon**, a brasserie in Sarajevo, Bosnia & Herzegovina — _"Where elegance meets flavor since 2015."_

A single-page, continuous-scroll homepage with anchor navigation, plus a dedicated `/menu` route. Black-and-cream editorial design, Framer Motion throughout (restrained, scroll-triggered), fully responsive and accessible.

## Stack

- **Next.js 14** (App Router) · **TypeScript**
- **Tailwind CSS** — palette + fonts in [`tailwind.config.ts`](tailwind.config.ts)
- **Framer Motion** — animation
- **next/font** — Cormorant Garamond (display), Inter (body), Petit Formal Script (accents)
- **sharp** — image optimization + the logo background-removal script

## Develop

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
```

Helper scripts:

```bash
npm run gen:placeholders   # regenerate the branded food placeholders
npm run gen:logo           # re-derive public/images/logo.png from logo.jpg
```

## Project shape

```
app/
  page.tsx             # homepage — composes every section
  menu/page.tsx        # full categorized, printable menu
  api/reserve/route.ts # reservation endpoint (see "Before launch")
components/             # one file per section + ui/ primitives
lib/
  site.ts              # brand + contact details, nav
  menu.ts              # all menu items, prices, images
  content.ts           # spaces, signatures, testimonials, gallery, about
public/images/         # brand photos + generated placeholders
scripts/               # placeholder + logo generators
```

Content is data-driven: edit `lib/*.ts` to change copy, dishes, prices, or images — no component changes needed.

## Swapping in real food photos

Food shots are branded SVG **placeholders** (`public/images/menu/*.svg`). To use a real
photo, drop the file in `public/images/menu/` and change that item's `image` field in
[`lib/menu.ts`](lib/menu.ts) (or `lib/content.ts` for Favorite Dishes / Gallery). JPG/PNG
images flow through the next/image optimizer automatically — no other change required.

## Before launch (placeholders to confirm — see brief §8)

- [ ] **Address** — taken from the Instagram bio (`Hamdije Čemerlića 45`); confirm in `lib/site.ts`.
- [ ] **Menu & prices** — realistic placeholders in `lib/menu.ts`; replace with the real menu.
- [ ] **Food photography** — swap the SVG placeholders (see above).
- [ ] **Chef bios** — placeholder copy in the About → Our Chefs tab (`lib/content.ts`).
- [ ] **Testimonials** — placeholder quotes in `lib/content.ts`; swap for real reviews.
- [ ] **Reservation email** — `app/api/reserve/route.ts` validates + logs; wire delivery to
      `papermoon.sa@gmail.com` (Formspree / Resend / SMTP) once hosting is decided.
- [ ] **SITE_URL** — set the production domain in `app/layout.tsx` for correct OG/canonical URLs.
