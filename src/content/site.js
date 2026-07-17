// Central brand and navigation data.
// Brand name and domain are sourced from src/config/siteConfig.js so there
// is a single place to update them. Link labels are translatable copy and
// live in src/locales/*.json — this file only holds hrefs and translation
// keys, no hardcoded text.
import { siteConfig } from '../config/siteConfig.js';

// siteConfig.domain is the canonical URL (with protocol), used for things
// like canonical/OG tags. For footer display we only want the bare
// hostname (e.g. "ldshome.com.br"), so it's derived here rather than
// duplicated in siteConfig.
const displayDomain = siteConfig.domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

export const site = {
  brandName: siteConfig.brandName,
  domain: siteConfig.domain,
  displayDomain,
};

// `key` maps to a translation under the `nav` namespace (src/locales/*.json).
export const navLinks = [
  { key: 'product', href: '#product' },
  { key: 'benefits', href: '#benefits' },
  { key: 'waitlist', href: '#waitlist' },
];

export const headerCta = {
  href: '#waitlist',
};
