# LDS Labs — Developer Products Landing Page

First public version of the landing page for **LDS Labs**, a broad brand for
developer products, starters, modules and tools, at the future domain
`ldshome.com.br`.

This is a single-page, static React + Vite site whose only goals are to:

- Present the brand and its first product, **Spring Boot SaaS Starter**
  (still in development).
- Explain what the starter includes today vs. what is planned.
- Collect interest via a name/email waitlist form, ready to connect to
  Formspree (falls back to a clearly-labeled local-only mode until
  configured — see "Before this goes live" below).

There is intentionally **no** store, authentication, admin panel, blog, or
full documentation site in this version.

## Tech stack

- React 19
- Vite
- Plain JavaScript (no TypeScript)
- CSS Modules + a small set of global CSS variables (`src/index.css`)
- No UI component libraries, no animation libraries
- No backend / no external services

## Project structure

```
src/
  components/   # One folder per UI component (JSX + .module.css)
  content/      # Copy and structured data, kept separate from markup
  config/       # siteConfig.js — single source of truth for brand/links/
                # form endpoint/analytics id
  index.css     # Design tokens (colors, spacing, typography) + resets
  App.jsx       # Composes the page sections
  main.jsx      # React entry point
```

Editing site copy (headline, product features, benefits, footer links, form
labels/messages) only requires changing the files in `src/content/`, not the
components themselves. Editing brand/domain/links/integrations only requires
changing `src/config/siteConfig.js`.

## Requirements

- Node.js 18+ (Node 20 LTS recommended)
- npm

## Running locally

```bash
npm install
npm run dev
```

The dev server prints a local URL (typically `http://localhost:5173`).

## Linting

```bash
npm run lint
```

## Building for production

```bash
npm run build
```

This outputs a static site to `dist/`. Verify it locally before deploying:

```bash
npm run preview
```

## Deploying

The output in `dist/` is a fully static site and can be hosted on any static
host (e.g. Vercel, Netlify, Cloudflare Pages, GitHub Pages, or a plain
Nginx/S3 setup). General steps:

1. Run `npm run build`.
2. Upload/deploy the contents of `dist/` to your static host.
3. Point the `ldshome.com.br` DNS/domain at the hosting provider once chosen.

## Before this goes live — things still pending

All of the following are centralized in `src/config/siteConfig.js` and are
intentionally `null`/placeholder until filled in:

- [ ] Set `githubUrl` to the real GitHub organization/repository URL.
      While `null`, the footer's GitHub link is hidden/non-clickable instead
      of pointing to a fake `#` link.
- [ ] Set `contactEmail` to the real contact mailbox. While `null`, the
      footer's Contact link is hidden/non-clickable.
- [ ] Set `formEndpoint` to a Formspree endpoint (e.g.
      `https://formspree.io/f/xxxxxxxx`) to enable real waitlist
      submissions. While `null`, `WaitlistForm` still validates input
      client-side but runs in local-only mode and never claims data was
      sent or saved.
- [ ] Set `privacyUrl` once a real privacy policy page exists. While
      `null`, the footer's Privacy item is shown as "coming soon" and is
      not clickable.
- [ ] Set `analyticsId` and add the corresponding script only when
      analytics is approved — nothing is wired up yet.
- [ ] Choose and configure hosting + the `ldshome.com.br` domain/DNS.
- [ ] Decide on the final public brand name if "LDS Labs" changes.


