# Racify

**Power • Performance • Speed.** Racify is a motorsport information hub covering Formula 1, FIA WEC, GT World Challenge and WRC. It's a static front-end site built with plain HTML, CSS and JavaScript: no framework, no build step.

## Features

- **Hero** with headline, platform stats, a live-style speed readout and a green-flag countdown
- **Standings** table with a switcher for F1, WEC, GT World Challenge and WRC. Totals are calculated from the race scores, and the best score in each round is highlighted
- **Championship events** with series filters, live-race status, countdowns calculated from each event's date, expandable details and "Load more" pagination
- **Latest news** with series filters, unread markers (remembered between visits) and a full-article popup
- **The Machines** car showcase with a horizontally scrolling card runway for each series
- **Partners** logo marquee that pauses on hover
- **Footer** with a newsletter form, navigation, and contact details
- Responsive down to phone width, keyboard accessible, and respects `prefers-reduced-motion`

## Tech

| Part | Choice |
| --- | --- |
| Markup / styling / logic | HTML5, CSS3, vanilla JavaScript (ES2020) |
| Icons | [Lucide](https://lucide.dev) via CDN (`unpkg.com`) |
| Fonts | Barlow Condensed, Barlow, JetBrains Mono via Google Fonts |

## Project structure

```
.
├── index.html      # page structure and content
├── style.css       # design tokens, layout and components
├── script.js       # data (standings, events, news, cars) and all behaviour
├── README.md
└── Assets/         # images used by the site
    ├── Hero.jfif
    ├── F1logo.png, WEC.webp, wrc.webp, GT World Chanllenge.webp
    ├── Events/     # event1.jfif … event5.jfif
    ├── F1/  WEC/  GT/  Wrc/   # car photos
    └── Partners/   # sponsor logos
```

## Run locally

No install needed. Either open `index.html` in a browser, or serve the folder for a more realistic test:

```bash
# any one of these, from the project folder
npx serve .
python3 -m http.server 8000
```

## Deploy to Vercel

The site is fully static, so Vercel needs no build configuration.

**Option A: Git (recommended)**

1. Put the project in a GitHub repository with `index.html` at the **root** (not inside a sub-folder).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Leave the settings as they are:
   - Framework Preset: **Other**
   - Build Command: *(empty)*
   - Output Directory: *(empty)*
4. Click **Deploy**. Every push to the main branch redeploys automatically.

**Option B: Vercel CLI**

```bash
npm i -g vercel
cd path/to/racify
vercel          # preview deployment
vercel --prod   # production deployment
```

### Before you deploy: check your asset paths

Vercel runs on Linux, where file names are **case-sensitive**. A path that works on Windows or macOS can return a 404 once deployed.

- Make sure folder and file names match the paths in the code exactly, for example `Assets/Wrc/` (not `WRC/`) and `Assets/WEC/` (not `Wec/`).
- Some names contain spaces or accents (`TAG heuer.png`, `Škoda_Fabia_RS_Rally2.jpg`, `Citroën_C3_Rally2.jpg`). They work, but they must match character for character. Renaming files to simple lowercase names such as `tag-heuer.png` is safer. If you do, update the matching paths in `index.html` and `script.js`.
- Some logos are loaded from other websites (Formula 1, Wikimedia and others). If one of those sites removes or moves an image, the site shows the series or team initials instead. Download the logos into `Assets/` and point to the local copies to avoid this.

### Optional: `vercel.json`

Not required, but this adds clean caching for images:

```json
{
  "headers": [
    {
      "source": "/Assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

Only use `immutable` caching if you rename an image whenever you change it.

## Customising

All content lives in `script.js`, near the top of each section:

| To change | Edit |
| --- | --- |
| Standings and race scores | `standings` |
| Events (name, circuit, date, live status) | `eventCatalog`. Dates are written like `'Nov 21 - 23'` and the countdown is calculated from them. Add a `live: {...}` block to mark an event as live |
| News stories | `stories` |
| Car cards | `cars` |
| Colours and fonts | the `:root` block at the top of `style.css` |
| Sponsors | the `.marquee-group` list in `index.html` |

## Known limitations

- **Newsletter form:** it shows a confirmation on screen but doesn't send the address anywhere. Connect it to an email service (for example Mailchimp, Buttondown or a Vercel serverless function) in `initFooter()` in `script.js`.
- **Data is static:** standings, events and news are hand-written sample data. The "live" status and speed readout are simulated, not fed from a real timing source.
- **Social and legal links** in the footer point to `#` until you add the real pages.

## Contact

- Email: [bleemmjochi@gmail.com](mailto:bleemmjochi@gmail.com)
- WhatsApp: [+234 904 202 0318](https://wa.me/2349042020318)

Developed by **BlexonDev (Blessed John)**.

&copy; 2026 Racify Inc. All rights reserved.
