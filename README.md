# Mama's Kitchen – website

Next.js (App Router) · React · JavaScript · plain CSS · Framer Motion · Lucide · `qrcode`

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build: `npm run build && npm start`

Requires Node 18.18+ (Node 20+ recommended).

## What is a placeholder (nothing is invented)

| Item | Status | Where to fill it in |
| --- | --- | --- |
| **Logo** | Done – real logo (background removed) at `public/images/logo.png` | `logo.src` in `data/site.js` |
| **Photos** | Story + Experience use the supplied interior photos. **Hero is still a placeholder** (needs a wide photo, ~1920px+) | `data/images.js` – set `src` for each slot |
| **Dish photos** | Labeled placeholders | `public/data/menu.json` → `image.src` |
| **Menu** | Only *Quanta Firfir* (ቋንጣ ፍርፍር) is included; all other categories are marked "to be confirmed" | `public/data/menu.json` |
| **Prices** | Shown only when `price` is set (ETB) | `public/data/menu.json` |
| Phone / email / hours / social links | "To be added" | `data/site.js` |
| Addresses for 5 of the 6 branches | "To be confirmed" (Megenagna uses the supplied plus code `2R94+Q3M`) | `data/branches.js` |
| Google "write a review" link | Falls back to the Megenagna Google Maps listing | `googleReviewUrl` in `data/site.js` |

Why no photos were pulled from Google: images in Google results/Maps are not licensed for reuse, and no
verified, reusable photographs of Mama's Kitchen dishes could be confirmed. Use photos the restaurant owns.

## Brand colors

Red `#de1e2d` (sampled from the logo) and white, set as tokens at the top of `styles/base.css`.

## Updating the menu (no code changes)

Edit **`public/data/menu.json`**. The menu page re-reads this file on every visit.

- Add a dish: append an object to `items` (copy the Quanta Firfir entry). Set `category` to a category `id`.
- Set `"price": 450` for a verified price (shown as `ETB 450`); leave `null` to show "Price to be confirmed".
- Add a photo: save it under `public/images/menu/` and set `"image": { "src": "/images/menu/name.jpg", "alt": "...", "credit": null, "verified": true }`.
- When a category is verified, set `"confirmed": true`. When the whole menu is final, set `meta.status` to `"complete"` to remove the "Menu in progress" banner.
- To update the menu **without redeploying**, host the JSON anywhere that allows cross-origin reads and set
  `NEXT_PUBLIC_MENU_DATA_URL` (needs one rebuild to take effect, then never again).
  Editing `public/data/menu.json` itself takes effect on the next deploy/restart of your host.

## QR code & table card

1. Deploy the site, then set `NEXT_PUBLIC_SITE_URL=https://your-real-domain.com` (see `.env.example`) and rebuild.
   The QR code encodes `<that domain>/menu`.
2. If the variable is missing, the QR uses the address the site is currently served from, **but never `localhost`,
   `127.0.0.1` or private network addresses** – in that case it shows a message instead of a code.
   Preview domains (`*.vercel.app`, etc.) show a warning: don't print from those.
3. Home page → **QR section**: download PNG (≈2400 px) or SVG.
4. **`/table-card`**: print-ready A5 card – *Download PNG* (1800 × 2550 px) or *Print / Save as PDF*
   (choose A5, margins none, background graphics on).
5. Error correction is level H with a 4-module quiet zone. The centre logo is **off** by default; enable
   `qrLogoInCenter` in `data/site.js` only after setting the real logo, then **scan-test before printing**.

**Always scan a test print with an iPhone and an Android phone before printing in bulk.**

## Project layout

```
app/                 routes: / , /menu , /table-card, sitemap, robots, OG image
components/home/     homepage sections
components/menu/     menu page, dish card, dish detail modal
components/qr/       QR rendering + printable table card
components/layout/   header, footer, loader
components/ui/       logo, image placeholder, providers
components/motion.js reusable reveal / parallax animations
data/                site info, branches, image slots  ← edit these
public/data/menu.json menu content                      ← edit this
lib/                 QR + URL logic
styles/              CSS (tokens in base.css)
```

## Notes

- Animations respect `prefers-reduced-motion`. The intro loader plays once per session and is skipped on `/menu`
  and `/table-card`, so scanning guests see the menu immediately.
- Rating shown: Google 3.6 / 5 from 206 reviews, **Megenagna branch only**. No reviews are reproduced.
- Set `NEXT_PUBLIC_SITE_URL` for correct canonical URLs, sitemap and social sharing metadata.
