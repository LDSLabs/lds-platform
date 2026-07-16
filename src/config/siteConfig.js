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
  domain: 'ldshome.com.br',

  // TODO(before launch): set to the real GitHub organization or repository
  // URL, e.g. 'https://github.com/lds-labs'. Leave `null` to hide the
  // footer's GitHub link instead of rendering a placeholder.
  githubUrl: null,

  // TODO(before launch): set to the real contact mailbox, e.g.
  // 'hello@ldshome.com.br'. Leave `null` to hide the footer's contact link.
  contactEmail: null,

  // TODO(before launch): set to the Formspree endpoint for the waitlist
  // form, e.g. 'https://formspree.io/f/xxxxxxxx'. While this is `null`,
  // WaitlistForm runs in local-only mode: it still validates input but
  // never submits anywhere and never claims data was saved.
  formEndpoint: null,

  // TODO(later): set to the analytics provider's site/property id once
  // analytics is approved and added. Not wired up to anything yet — no
  // analytics script is loaded in this version.
  analyticsId: null,

  // TODO(later): set once a real privacy policy page exists. Leave `null`
  // to keep the footer's "Privacy" item non-clickable.
  privacyUrl: null,
};
