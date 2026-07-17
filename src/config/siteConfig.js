// Central, single-source-of-truth site configuration.
//
// Every value below that is currently `null` is an intentional placeholder:
// components must treat a `null` value as "not configured yet" and avoid
// rendering fake/broken links or pretending an integration exists (no
// `href="#"`, no fake success states, etc.). Fill these in before publishing.

export const siteConfig = {
  // Public brand name used across the header, footer and metadata.
  brandName: 'LDS Labs',

  // One-line description of the brand, independent of any single product.
  brandDescription:
    'LDS Labs creates developer products, starters, modules and tools designed to help software teams ship faster.',

  // Primary domain the site will be published on.
  domain: 'https://ldshome.com.br',

  // Real GitHub organization/repository URL.
  githubUrl: 'https://github.com/LDSLabs',

  // Real contact mailbox.
  contactEmail: 'hello@ldshome.com.br',

  // Formspree endpoint for the waitlist form. While this is falsy,
  // WaitlistForm runs in local-only mode: it still validates input but
  // never submits anywhere and never claims data was saved.
  formEndpoint: 'https://formspree.io/f/xbdngdlq',

  // TODO(later): set to the analytics provider's site/property id once
  // analytics is approved and added. Not wired up to anything yet — no
  // analytics script is loaded in this version.
  analyticsId: '',

  // TODO(later): set once a real privacy policy page exists. Leave `null`
  // to keep the footer's "Privacy" item non-clickable.
  privacyUrl: null,
};
