// Central brand and navigation data.
// Brand name and domain are sourced from src/config/siteConfig.js so there
// is a single place to update them.
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
  tagline: 'Developer products built to help you ship faster.',
};

export const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Waitlist', href: '#waitlist' },
];

export const headerCta = {
  label: 'Join the waitlist',
  href: '#waitlist',
};
