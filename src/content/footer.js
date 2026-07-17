// Footer links are derived from the central site configuration. Link
// labels are translatable copy (src/locales/*.json, `footer` namespace) —
// this file only provides the translation `key` and the `href`.
//
// Anchor links (Products, Roadmap) always point within the single page and
// are always available. Links backed by external configuration
// (GitHub, Contact, Privacy, Terms) are intentionally rendered as
// unavailable (never a clickable `href="#"` placeholder) when the
// underlying config value is `null` — see src/components/Footer/Footer.jsx.
import { siteConfig } from '../config/siteConfig.js';

export function getFooterLinks() {
  return [
    { key: 'products', href: '#product' },
    { key: 'roadmap', href: '#roadmap' },
    { key: 'github', href: siteConfig.githubUrl },
    {
      key: 'contact',
      href: siteConfig.contactEmail ? `mailto:${siteConfig.contactEmail}` : null,
    },
    { key: 'privacy', href: siteConfig.privacyUrl },
    { key: 'terms', href: siteConfig.termsUrl },
  ];
}
