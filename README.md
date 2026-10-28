# Real NIL Agency website

The marketing site for **Real NIL Agency**, which connects student athletes and sports creators with agencies. The agency reviews and matches both sides by hand.

The company name is set once in `src/content/site.ts` (`site.name`, plus `site.shortName` for tight spaces). The stacked header wordmark is in `src/components/graphics/logo.tsx`, and a few sentences name the agency directly.

The site has four public routes:

| Route | What it does |
|---|---|
| `/` | Home, campaign-led. A role picker, the hero ("Real athletes. Real content. Real fit."), partner logos, the mission, what the agency does for each side, why brands work with athletes, campaign work, FAQs and calls to action |
| `/athletes` | For Athletes. Onboarding, profile review and content support, plus the **athlete signup form** (`#athlete-signup`) |
| `/agencies` | For Agencies. The request and matching process, plus the **agency signup form** (`#agency-signup`) |
| `/contact` | General inquiry form and contact details |

Three more routes exist: `/privacy`, a placeholder that is marked `noindex`; `/mockups/original-home`, the first homepage design kept for reference (hidden from search, not linked); and a custom 404 page.

## Two colour versions

The same code builds two versions of the site. They differ only in colour:

| Version | Setting | Colours |
|---|---|---|
| Flare & Ultra (default) | `NEXT_PUBLIC_SITE_VARIANT=flare` | Orange for athletes, ultramarine for agencies |
| Night Game | `NEXT_PUBLIC_SITE_VARIANT=night` | Volt for athletes, magenta for agencies |

The setting is read at build time and applies everywhere, including the favicon, the Apple icon, the social-share images and the browser theme colour. Page colours live in `src/app/globals.css`, and the image colours in `src/content/variant.ts`. Keep the two in sync. Both versions pass WCAG AA contrast.

## Run it locally

You need Node.js 20.9 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
```

To run a production build:

```bash
npm run build
npm start            # http://localhost:3000
```

To build and run both versions side by side (macOS or Linux):

```bash
npm run build:both
npm run start:flare  # Flare & Ultra on http://localhost:3000
npm run start:night  # Night Game on http://localhost:3001 (in a second terminal)
npm run dev:night    # Night Game dev server on http://localhost:3001
```

Checks:

```bash
npm run lint
npm run typecheck
```

## Before launch: placeholders to fill in

Nothing below has been invented. Each of these shows on the site as a dashed `[placeholder]` until you set it.

| What | Where |
|---|---|
| Public email, phone, location, response-time wording | `src/content/site.ts` → `site.contact` |
| Social profile links | `src/content/site.ts` → `site.social` |
| Partner logos and campaign posts on the homepage | `src/content/proof.ts`. Until real ones are added, set `showEmptySlots` to `false` to hide those sections before launch |
| Consent wording on each form, and the minors note | `src/content/site.ts` → `legal` (have counsel review it, then bump `legal.version`) |
| Privacy policy | `src/app/privacy/page.tsx` (it is `noindex` and left out of the sitemap until replaced) |
| "Not legal advice" note on the athletes page | `src/app/athletes/page.tsx` (`TODO(placeholder)`) |
| Production domain | `NEXT_PUBLIC_SITE_URL` env var (set automatically for GitHub Pages) |
| Form delivery | `INQUIRY_WEBHOOK_URL` env var (see below) |

The site has no testimonials, client logos, athlete names, deal results or statistics. Add them only once they are real and you have permission to use them.

Other copy lives here:
- Form option lists: `src/content/options.ts`
- FAQs: `src/content/faqs.ts`
- Page copy: each `src/app/**/page.tsx`

## Forms

All three forms post JSON to `POST /api/inquiries` (`src/app/api/inquiries/route.ts`). The route:

1. Accepts only JSON up to 20 KB.
2. Drops bot submissions caught by a hidden honeypot field.
3. Validates the data with the same zod schema the browser uses (`src/lib/inquiry-schema.ts`).
4. Forwards valid submissions to your webhook (`src/lib/deliver.ts`).

The site **stores nothing** and has **no way to read submissions back**. Server logs record only the form type and a status code, never personal data.

### What visitors see

| Situation | API response | What the visitor sees |
|---|---|---|
| Webhook returned 2xx | `200 { ok: true }` | Success message |
| No webhook configured | `503 { error: "not_configured" }` | "Your details weren't sent", with the contact email. Their answers stay in the form |
| Webhook error or timeout (10 s) | `502 { error: "delivery_failed" }` | "Something went wrong, and your details weren't sent", with a retry |
| Invalid data | `400 { error: "invalid", fieldErrors }` | Errors shown on each field |

**Visitors only see a success message once the webhook has actually accepted the submission.**

### Environment variables

Copy `.env.example` to `.env.local` and fill it in.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes, in production | Canonical URLs, Open Graph images, sitemap and robots |
| `INQUIRY_WEBHOOK_URL` | Yes, to receive submissions | The `https://` endpoint every form posts to |
| `INQUIRY_WEBHOOK_URL_ATHLETE` / `_AGENCY` / `_CONTACT` | No | Per-form endpoints. They override the default |
| `INQUIRY_WEBHOOK_SECRET` | Recommended | Sent as `Authorization: Bearer <secret>`. Reject requests without it |

Plain `http://` is accepted only for `localhost`.

### Payload sent to your webhook

```json
{
  "formType": "athlete",
  "submittedAt": "2026-10-28T18:30:00.000Z",
  "source": "nil-website",
  "consentVersion": "placeholder-2026-10",
  "data": {
    "fullName": "…",
    "email": "…",
    "sport": "Soccer",
    "sportOther": "",
    "schoolOrTeam": "",
    "position": "",
    "social": { "instagram": "@…", "tiktok": "", "other": "" },
    "interests": ["Brand partnerships"],
    "message": "",
    "consent": true
  }
}
```

The `data` fields for each form type:

- **`agency`**: `agencyName`, `contactName`, `workEmail`, `categories[]`, `goals[]`, `message`, `consent`
- **`contact`**: `name`, `email`, `role`, `message`, `consent`

### Connecting a destination

Any service that accepts a JSON POST works. For example:

- **Zapier / Make / n8n**: create a "Catch webhook" trigger, paste its URL into `INQUIRY_WEBHOOK_URL`, then route the data to your CRM, Airtable, Google Sheets, Slack or email.
- **Google Sheets directly**: deploy a Google Apps Script web app with a `doPost(e)` that appends `JSON.parse(e.postData.contents)` to a sheet.
- **A CRM** (HubSpot, Salesforce…): use its webhook or automation intake, or route through one of the tools above.

Keep athlete data in a private destination with access controls. Never publish it.

### Testing delivery locally

Set `INQUIRY_WEBHOOK_URL` to a test endpoint, such as a request-bin URL or a local server on `http://localhost:…`, then submit a form.

## Deploying (Vercel)

1. Push the repo to GitHub, GitLab or Bitbucket, and import it at vercel.com/new. Vercel detects the framework (Next.js) automatically.
2. Under **Project → Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL`, `INQUIRY_WEBHOOK_URL` and, ideally, `INQUIRY_WEBHOOK_SECRET`.
3. Deploy. Afterwards, submit each form once and check that the submission arrives.

To put both colour versions online, create two Vercel projects from the same repository. Set `NEXT_PUBLIC_SITE_VARIANT=flare` on one and `NEXT_PUBLIC_SITE_VARIANT=night` on the other, and give each its own `NEXT_PUBLIC_SITE_URL`.

Any host that runs `next start` on Node 20.9+ also works (Netlify, Render, Railway, a VPS). The form API needs a server, so a static export is not supported.

## GitHub Pages (live preview of both versions)

Every push to `main` runs `.github/workflows/pages.yml`. The workflow type-checks the code, then builds both colour versions as static files with `scripts/build-pages.mjs`, and publishes them:

| Version | URL |
|---|---|
| Flare & Ultra | https://sherrybutt17-stack.github.io/nil-website/ |
| Night Game | https://sherrybutt17-stack.github.io/nil-website/night/ |

To set it up once, open GitHub → **Settings → Pages** and set **Source** to **GitHub Actions**.

GitHub Pages only serves static files, so the Pages build differs in a few ways:

- **Forms.** There is no `/api/inquiries` route. To receive submissions, create a form endpoint with a service that accepts JSON POSTs from the browser, such as Formspree or Basin. Then add its URL as a repository variable named `INQUIRY_ENDPOINT` (Settings → Secrets and variables → Actions → Variables) and push again. Until then, the forms honestly tell visitors their details were not sent.
- **No custom security headers.** For the full version, including the server-side webhook and its secret, deploy to a Node host (see "Deploying" below).

To try the Pages build locally:

```bash
PAGES_ORIGIN=http://localhost:8080 PAGES_BASE=/nil-website node scripts/build-pages.mjs
```

The output goes to `pages-dist/`. Serve it so that it appears under `/nil-website/`.

## How it's built

- **Next.js 16** (App Router, TypeScript, Turbopack). Every page is statically prerendered, and only `/api/inquiries` runs on demand.
- **Tailwind CSS 4**. Design tokens are in `src/app/globals.css`:
  - Colors: Ink `#0e0e10`, Chalk `#f3f0e8`, Flare `#ff5a1f` (athletes), Ultra `#3a2dff` (agencies).
  - Every text/background pairing meets WCAG AA.
  - Flare is never used as text on light backgrounds. Use `flare-deep` for that.
- **Fonts**: Archivo (variable, with the width axis, for condensed display type) and Instrument Serif italic accents. Both are self-hosted through `next/font`. The OG images use static Archivo TTFs in `src/assets/fonts` (OFL).
- **Motion** (`motion/react`) uses `LazyMotion`, which loads animation features after first paint.
  - All motion respects `prefers-reduced-motion`.
  - Hero text never waits on JavaScript.
  - Scroll-linked effects only move while you scroll.
- **shadcn/ui** source components (Button, Input, Textarea, Label, Accordion, Sheet) live in `src/components/ui`, restyled. Radix provides the accordion and the mobile menu's focus trap.
- **lucide-react** for icons, **zod** for validation.

```
src/
  app/                 routes, metadata files (OG images, sitemap, robots, icons), API route
  components/
    forms/             agency, athlete and contact forms, field components, submit hook
    graphics/          original SVG/HTML illustrations (playbook, cards, field lines, logo)
    layout/            header, mobile nav, footer
    motion/            Motion provider and scroll reveal
    sections/          reusable page sections (hero, process, FAQ, CTA band…)
    ui/                shadcn/ui primitives
  content/             site settings and placeholders, FAQs, form options
  lib/                 validation schema, webhook delivery, metadata and OG helpers
```
