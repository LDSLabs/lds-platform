import { useTranslation } from 'react-i18next';
import { site } from '../../content/site.js';
import { getFooterLinks } from '../../content/footer.js';
import styles from './Footer.module.css';

function Footer() {
  const { t } = useTranslation();
  const links = getFooterLinks();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.domain}>{site.displayDomain}</p>
          <p className={styles.tagline}>{t('footer.tagline')}</p>
        </div>

        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.key}>
              {link.href ? (
                <a href={link.href} className={styles.link}>
                  {t(`footer.${link.key}`)}
                </a>
              ) : (
                <span className={styles.linkDisabled} aria-disabled="true">
                  {t(`footer.${link.key}`)} <span className={styles.pending}>{t('common.comingSoon')}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="container">
        <p className={styles.copyright}>
          {t('footer.copyright', { year: currentYear, brand: site.brandName })}
        </p>
      </div>
    </footer>
  );
}

export default Footer;

