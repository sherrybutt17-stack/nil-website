# CLAUDE.md: NIL website

This is the working guide and build plan for the NIL marketing site. Keep it current when decisions change.

**Status (2026-10-28): built and verified.** Everything below is implemented. See "Decisions made during the build" and "Commands" at the end. The README covers placeholders, form setup and deployment for whoever runs the site.

## Context

When work started, the folder was empty: no repo, no stack, no assets. NIL connects sports-focused student athletes and social creators with agencies. Each side signs up through its own form. NIL's team reviews requests by hand, matches athletes from an internal database, and may support content such as Instagram Reels.

The site has to:
- explain that model to both audiences;
- route each visitor to the right signup form;
- build trust by being open about the process. Matching is done by people, not instantly or automatically.

There are no fake logos, testimonials, athletes, or stats. Any unknown detail is an editable placeholder. Forms are honest: success only appears when a submission was actually delivered.

Research notes:
- **1str.com** is athlete-first: roster by sport, social proof feeds, and a simple name/email/subject form. It has no path for brands.
- **magzmarketing.com** didn't render (client-side JS only).
- **Awwwards single-page** trends: type-led layouts, large condensed display faces, saturated accents on restrained grounds, and scroll-linked motion.

NIL's opening is to serve both sides clearly, with two colour-coded paths.

**Confirmed with the user:**
- **Imagery:** original SVG sports graphics and type-led art only. No stock photos, no photo slots.
- **Hosting:** Vercel or another Node host. Forms go through a server route, and the webhook URL and secret stay server-side. The README includes Vercel deploy steps and where to set env vars.

## Step 0: save this plan to the project

The user asked for it. Before scaffolding, write this plan to `/Users/shaheerbutt/Documents/NIL website/CLAUDE.md` as the project's working guide: the stack, identity, routes, form rules, placeholder policy, and verification checklist.

Keep it up to date if decisions change during the build. When the build finishes, add a short "Commands" section with dev, build, and start.

## Stack (empty repo, so chosen fresh; all versions checked on npm on 2026-10-28)

| Package | Version | License | Why |
|---|---|---|---|
| next | 16.4.x (App Router, Turbopack, TS) | MIT | Static pages, Metadata API, route handlers for forms, next/font, next/og |
| react / react-dom | 19.3.x | MIT | |
| tailwindcss + @tailwindcss/postcss | 4.3.x | MIT | Design tokens via `@theme` |
| motion | 14.7.x (`motion/react`) | MIT | Using `LazyMotion` + `m` + `domAnimation` costs about 5 KB plus 24 KB lazily, instead of about 43 KB for the full `motion` component |
| lucide-react | 1.63.x | ISC | Tree-shaken icons |
| zod | 4.6.x | MIT | One schema shared by client and server validation |
| shadcn (CLI, copies source) + radix-ui | 4.23 / 1.8 | MIT | Only Button, Input, Textarea, Label, Accordion (FAQ), and Sheet (mobile nav: focus trap and Escape). Also pulls in clsx, tailwind-merge, cva (Apache-2.0), and tw-animate-css |

Not added: react-hook-form (a small hook is enough), an animation package beyond Motion, image or video libraries, and analytics.

Multi-option fields use native checkboxes styled as chips, grouped in `fieldset`/`legend`. These are more accessible than custom widgets.

**Scaffold.** Set it up by hand, not with `create-next-app`. The folder name "NIL website" isn't a valid npm package name. The package is named `nil-website`, and code lives under `src/`.

Leave `cacheComponents` off, since all pages are static marketing pages. Before writing version-specific code, read the bundled docs at `node_modules/next/dist/docs/`.

## Identity

- **Concept: "Two sides, one playbook."** Athletes are coded **Flare** (`#FF5A1F`, orange-red). Agencies are coded **Ultra** (`#3A2DFF`, ultramarine). They sit on **Ink** (`#0E0E10`) and **Chalk** (`#F3F0E8`). Every page, CTA, and form uses its audience colour, which helps wayfinding. Check contrast for each pairing. For example, Ultra on Chalk is about 7:1 and Flare on Ink is about 6.5:1. Flare is never used for small text on Chalk.
- **Type:** Archivo variable via next/font, with the `wdth` axis verified at 62–125.
  - Display: extra-condensed, weight 800–900, uppercase.
  - Body: normal width.
  - Accent: Instrument Serif italic for single editorial words.
  - That's 2 font families, self-hosted and preloaded.
- **Original sports graphics, all inline SVG:**
  - court and field line patterns;
  - outlined "jersey-number" step numerals;
  - a **playbook diagram** with X's and O's routes converging on NIL, which illustrates the matching process;
  - an athlete "profile card" ("Your card goes here", no fake data);
  - an agency "campaign brief" card.
- **Layout:** Asymmetric 12-column grid, oversized headlines that break the grid, alternating Ink and Chalk bands, and audience-coloured CTA bands.

## Routes and content

| Route | Sections |
|---|---|
| `/` Home | Hero with value proposition: hand-matched sports NIL partnerships, every match reviewed by people. Two CTAs: **Join as an Athlete** and **Partner as an Agency**. Profile and brief cards visual → scroll-linked strip of sport categories → "Pick your side" split panels, one per audience with its benefits → "The playbook": 4 steps (Sign up → Review → Match → Activate) with an animated diagram and an honest timing note → "What you can count on": human review, you approve every opportunity, submissions never published → Content support (branding, Reels, phrased as "may/where a campaign calls for it") → general FAQ → dual CTA band |
| `/agencies` | Hero (Ultra) → Benefits: curated shortlist from NIL's database, fit over follower count, one point of contact, content support → 5-step agency process → "What to include in your request" → agency FAQ → `#agency-signup` form, with a "What happens after you submit" panel |
| `/athletes` | Hero (Flare) → Who it's for: student athletes and sports creators → Benefits: profile review, campaign matching, branding and content support, you stay in control → 5-step process, where the internal database is described as private → "Before you apply": check your school, conference, and state NIL rules; under-18s involve a parent or guardian (placeholder copy, not legal advice) → athlete FAQ → `#athlete-signup` form |
| `/contact` | Short hero → router cards ("Athlete? Use the athlete form", "Agency? Use the agency form") → general inquiry form → contact details from config (placeholders) |
| `/privacy` | Clearly marked placeholder policy page, `noindex`, so consent links aren't broken |
| 404 | Branded `not-found.tsx` with links back to both paths |

The header is persistent and sticky. It has the logo, Home, For Athletes, For Agencies, Contact, and a compact CTA. `aria-current` marks the active page. On mobile the menu is a Sheet. The footer repeats both CTAs and shows placeholder contact and social details.

FAQ answers only cover process facts implied by the brief. They make no pricing, fee, guaranteed-deal, or timeline claims. The copy says outright that deals aren't guaranteed and that timing varies by campaign.

## Forms (`src/components/forms/`)

**Fields:**
- **Agency:** agency name, contact name, work email, sports/athlete categories (chips, at least 1), campaign goals (chips, at least 1), message (optional), consent.
- **Athlete:** name, email, sport (select plus "Other"), school/team (optional), position/event (optional), social links (Instagram, TikTok, other; at least one, accepting a URL or @handle), partnership interests (chips, at least 1), message (optional), consent.
- **Contact:** name, email, "I am a…" (select), message, consent.

**UX and accessibility:**
- Visible labels, with "(optional)" markers.
- `autocomplete` attributes and correct input types.
- Validation runs on submit, then live per field. Errors are tied to fields with `aria-invalid` and `aria-describedby`. An error summary uses `role="alert"`, and focus moves to the first invalid field.
- The submit button shows a busy state.
- Chip groups use `fieldset`/`legend`.
- Touch targets are at least 44px. The layout is single-column on mobile.
- A hidden honeypot field catches bots.
- No passwords, IDs, financial, or date-of-birth data are collected.

**Submission flow:** client → `POST /api/inquiries` (`src/app/api/inquiries/route.ts`), with the `formType` discriminated union validated by the shared zod schema in `src/lib/inquiry-schema.ts`.

1. Reject non-JSON requests and bodies over about 20 KB. Only POST is allowed.
2. Choose the webhook: `INQUIRY_WEBHOOK_URL_{AGENCY|ATHLETE|CONTACT}`, falling back to `INQUIRY_WEBHOOK_URL`. Add `Authorization: Bearer $INQUIRY_WEBHOOK_SECRET` if that is set. Time out after 10 seconds.
3. **No webhook configured → 503 `not_configured`.** The UI says the form was **not sent**, keeps what the visitor typed, and offers the placeholder email address.
4. Upstream returns non-2xx, or the network fails → an error state with retry.
5. **Success UI only on a 2xx response from the webhook.**
6. No PII in server logs, nothing stored on the site, and no GET endpoint.

The webhook design works with Zapier, Make, n8n, a Google Apps Script sheet, HubSpot (through an automation), Slack, and similar tools. The payload shape is documented in the README.

## Motion (restrained)

- A client `MotionProvider` in the root layout wraps `LazyMotion features={domAnimation} strict` and `MotionConfig reducedMotion="user"`.
- `Reveal` (`m.div`, `whileInView`, once, opacity plus 16px y) applies only below the fold. A `<noscript>` style fallback keeps content visible without JS.
- **The hero's LCP text is never gated on JS.** Only the decorative hero cards get a CSS keyframe entrance, which is turned off under `prefers-reduced-motion`.
- The playbook routes draw in with `pathLength` and appear static when `useReducedMotion()` is set.
- The categories strip drifts with scroll (`useScroll`/`useTransform`). It doesn't autoplay, and it stays still under reduced motion.
- `template.tsx` fades content in on client-side navigation only, skipping the first load.
- Form status changes animate with `AnimatePresence`.
- The mobile Sheet uses its built-in transitions.
- Only transforms and opacity are animated, so nothing causes layout shift.

## SEO and metadata

- `metadataBase` comes from `NEXT_PUBLIC_SITE_URL`.
- Each page has its own title, using the template `%s · NIL`, plus a description, canonical URL, Open Graph, and `twitter: summary_large_image`.
- Per-route `opengraph-image.tsx` files share one `src/lib/og.tsx` renderer. They use a committed Archivo Black TTF (OFL, from github.com/google/fonts) and audience colours.
- `icon.svg` holds an original NIL monogram. Also add `apple-icon.tsx`, `sitemap.ts`, `robots.ts` (disallow `/api`), and `manifest.ts`.
- Organization JSON-LD on Home includes only known fields: name, url, logo.
- Each page has exactly one `h1`, with sections as `h2` and items as `h3`.

## Placeholders, all in one place

`src/content/site.ts` holds the editable values, each marked `// TODO(placeholder)`:
- email, phone, address, social URLs;
- privacy policy and consent copy;
- response-time wording.

When a value is unset, it renders as a visibly styled placeholder (`src/components/placeholder.tsx`) instead of invented data. Option lists (sports, categories, goals, interests) live in `src/content/options.ts`, and FAQs in `src/content/faqs.ts`.

The README lists every placeholder, every env var (`.env.example`), and the webhook payload.

## File layout (representative)

```
src/app/{layout,template,page,not-found}.tsx, globals.css, sitemap.ts, robots.ts, manifest.ts, icon.svg, apple-icon.tsx, opengraph-image.tsx
src/app/{agencies,athletes,contact,privacy}/page.tsx (+ opengraph-image.tsx)
src/app/api/inquiries/route.ts
src/components/ui/*            (shadcn, restyled)
src/components/layout/{site-header,mobile-nav,site-footer}.tsx
src/components/sections/*      (hero, path-split, process-steps, faq, cta-band, category-strip, …)
src/components/graphics/*      (playbook, field-lines, profile-card, brief-card, logo)
src/components/motion/{motion-provider,reveal}.tsx
src/components/forms/{agency-form,athlete-form,contact-form,fields,form-status,use-inquiry-submit}.tsx
src/content/{site,options,faqs}.ts
src/lib/{inquiry-schema,deliver,metadata,og,utils}.ts(x)
```

## Verification

1. `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass. Check that every page is statically prerendered, and review first-load JS sizes.
2. Run `npm start`, then a Playwright script in the scratchpad using the cached Chromium. It covers `/`, `/agencies`, `/athletes`, `/contact`, `/privacy`, and a 404, at 390×844, 768×1024, and 1440×900. It:
   - takes full-page screenshots, which I review visually;
   - records console and page errors;
   - checks for horizontal overflow;
   - confirms one `h1` per page;
   - crawls every internal link and checks it returns 200.
3. Test forms in Playwright:
   - **Invalid submit:** errors appear and focus moves to the first invalid field.
   - **Keyboard-only:** the whole form can be completed with the keyboard.
   - **No env set:** the "not sent" message appears, not success.
   - **`INQUIRY_WEBHOOK_URL` pointing at a local mock server:** success appears, and the payload is checked.
   - **Mock returns 500:** the error state appears.
4. Run `@axe-core/playwright`, installed in the scratchpad rather than the project, on every route. Also take a screenshot pass with `reducedMotion: 'reduce'`.
5. Run Lighthouse mobile with the Playwright Chromium through `CHROME_PATH` on `/` and `/athletes`. Targets: LCP under 2.5 s, plus high scores for accessibility, SEO, and best practices. Fix any regressions.
6. Final summary for the user: the pages built, placeholders still to fill, form integration steps, and the exact commands (`npm install`, `npm run dev`, `npm run build && npm start`).

## Decisions made during the build

- **Class utility.** The shadcn CLI now installs its own `cn` package, which is at 0.x and was revived about eight weeks ago. It was removed. Components import `cn` from `@/lib/utils`, which is clsx plus tailwind-merge. Change any newly added shadcn component the same way.
- **Label.** Uses a native `<label>`, not Radix Label, so it needs no client JS.
- **Form hook.** `src/components/forms/use-inquiry-form.ts` returns no refs. It gets the form element from `event.currentTarget`, because the React Compiler lint rule `react-hooks/refs` flags any object that contains a ref.
- **Errors.** An error summary (`role="alert"`, linking to each field) appears on a failed submit, and focus moves to the first `[aria-invalid]` control. Field errors show on blur when the field has a value, and for every field after a submit attempt.
- **Fonts.** The generated `@font-face` declares `font-stretch: 62% 125%`, so the `display` and `eyebrow` utilities use plain `font-stretch`, not `font-variation-settings`.
- **Outlined numerals.** `numeral-outline` uses `-webkit-text-fill-color: transparent`, which keeps `color` (and therefore `currentColor` for the stroke) settable through `text-*` utilities. `color: transparent` would make the stroke invisible.
- **Decorative text.** The footer's giant wordmark is CSS `content`, so axe doesn't flag it for contrast.
- **Hydration.** Forms and the FAQ accordion sit inside `<Suspense>` so React can hydrate them as separate tasks. This lowers Total Blocking Time on the form pages.
- **Rotation.** Tailwind v4 `rotate-*` sets the CSS `rotate` property, and keyframes animate `transform`, so the two combine without extra variables.

## Two versions and the new homepage (2026-10-28)

- **Versions.** The user chose two colour versions with identical content: Flare & Ultra (default) and Night Game. `NEXT_PUBLIC_SITE_VARIANT` (`flare` or `night`) is read at build time in `src/content/variant.ts`.
  - The layout sets `<html data-palette="night">`, and `globals.css` overrides the tokens under that selector.
  - The favicon (`icon.tsx`), `apple-icon.tsx`, the OG images and the manifest take their colours from `brandColors`.
  - The `build:flare` and `build:night` scripts use `NEXT_DIST_DIR` (wired to `distDir` in `next.config.ts`), so both builds can run side by side on ports 3000 and 3001.
  - The earlier runtime palette switcher and the Varsity, Turf and Sunset palettes were removed.
- **Homepage.** It is now the campaign-led page. Its structure and tone follow mogl.online, which the user referenced; all copy is original, because the user asked to use mogl.online's text and that was declined (copyrighted, and its claims don't fit NIL). The home FAQ was added to it.
  - Partner logos and campaign posts come from `src/content/proof.ts`. Empty lists show dashed slots while `showEmptySlots` is true.
  - The previous homepage ("We scout the match") is kept at `/mockups/original-home`. It is `noindex` and disallowed in robots.
- **Mobile and tablet.**
  - The "What we do" panel headings and every `SectionHeading` size themselves with container queries (`@container` plus `@sm:`/`@[26rem]:`/`@xl:`), so long words fit narrow tablet columns.
  - The role picker is three compact columns on phones.
  - The mission stamp's offset is smaller on phones, and that section clips its overflow.
- **Checks.**
  - Both versions were swept at 320, 360, 390, 430, 600, 768, 820, 1024×768, 1024×1366 and 1180 px. The sweep found no page overflow, no text wider than its box, no header crowding, no tap target under 24 px and no input under 16 px.
  - axe found no violations on either version.
  - The 23 form tests pass.
  - Lighthouse mobile on the homepage: Flare 99 (LCP 0.91 s) and Night 99 (LCP 1.02 s), with CLS 0.
- **Comparison board.** https://claude.ai/artifact/Pqt16xH3iFxEJPZEC7gZBj is private and now out of date: it shows five palettes and the old homepage.

## Verification results (2026-10-28)

- `npm run lint`, `npm run typecheck` and `npm run build` are clean. Every page is static, and only `/api/inquiries` is dynamic.
- Playwright checked all six routes at 390, 768 and 1440 px:
  - no horizontal overflow, one `h1` per page, and no console errors (only the expected 404 on the 404 route);
  - every internal link returns 200;
  - axe found no WCAG 2.2 AA violations at desktop or mobile;
  - a reduced-motion pass was clean.
- Form and API tests: 23 of 23 pass. They cover:
  - the error summary and focus;
  - format errors and the conditional "Other" sport;
  - the honest `not_configured` state with answers preserved;
  - keyboard-only submission;
  - webhook payload shape and bearer secret;
  - a 500 response followed by a successful retry;
  - 415, 405 and 413 responses, the honeypot, and the 503 response.
- The mobile menu traps focus and returns it to the menu button on Escape.
- Lighthouse, mobile with simulated throttling, median of 3 runs:

  | Route | Performance | LCP | TBT |
  |---|---|---|---|
  | `/` | 97 | 0.95 s | 207 ms |
  | `/athletes` | 88 | 0.98 s | 477 ms |
  | `/agencies` | 99 | 0.92 s | 139 ms |
  | `/contact` | 100 | 0.76 s | 62 ms |

  Accessibility, best practices and SEO all scored 100.

## Commands

```bash
npm install
npm run dev                  # http://localhost:3000 (Flare & Ultra)
npm run dev:night            # http://localhost:3001 (Night Game)
npm run build:both           # builds .next-flare and .next-night
npm run start:flare          # :3000
npm run start:night          # :3001
npm run lint && npm run typecheck
```

To test form delivery locally:

```bash
INQUIRY_WEBHOOK_URL=http://localhost:4010/hook npm start
```

Point it at any JSON endpoint. Without it, the forms say "Your details weren't sent".
