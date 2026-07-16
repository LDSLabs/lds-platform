// Footer links are derived from the central site configuration. Any link
// whose underlying config value is `null` is intentionally rendered as
// unavailable (never a clickable `href="#"` placeholder) by the Footer
// component — see src/components/Footer/Footer.jsx.
import { siteConfig } from '../config/siteConfig.js';

export function getFooterLinks() {
  return [
    { label: 'GitHub', href: siteConfig.githubUrl },
    {
      label: 'Contact',
      href: siteConfig.contactEmail ? `mailto:${siteConfig.contactEmail}` : null,
    },
    { label: 'Privacy', href: siteConfig.privacyUrl },
  ];
}
