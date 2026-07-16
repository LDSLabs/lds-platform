// Central brand and navigation data.
// Brand name and domain are sourced from src/config/siteConfig.js so there
// is a single place to update them.
import { siteConfig } from '../config/siteConfig.js';

export const site = {
  brandName: siteConfig.brandName,
  domain: siteConfig.domain,
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
