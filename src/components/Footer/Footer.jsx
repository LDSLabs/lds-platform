import { site } from '../../content/site.js';
import { getFooterLinks } from '../../content/footer.js';
import styles from './Footer.module.css';

function Footer() {
  const links = getFooterLinks();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.domain}>{site.displayDomain}</p>
          <p className={styles.tagline}>{site.tagline}</p>
        </div>

        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.label}>
              {link.href ? (
                <a href={link.href} className={styles.link}>
                  {link.label}
                </a>
              ) : (
                <span className={styles.linkDisabled} aria-disabled="true">
                  {link.label} <span className={styles.pending}>(coming soon)</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

