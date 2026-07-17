import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button.jsx';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher.jsx';
import { site, navLinks, headerCta } from '../../content/site.js';
import { resolveHref } from '../../utils/routing.js';
import styles from './Header.module.css';

function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href={resolveHref('#top')} className={styles.brand}>
          {site.brandName}
        </a>

        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="visually-hidden">
            {menuOpen ? t('common.menuClose') : t('common.menuOpen')}
          </span>
          <span aria-hidden="true" className={styles.menuIcon} data-open={menuOpen} />
        </button>

        <nav
          id="primary-navigation"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
          aria-label={t('nav.primaryLabel')}
        >
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={resolveHref(link.href)} className={styles.navLink} onClick={closeMenu}>
                  {t(`nav.${link.key}`)}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.navActions}>
            <LanguageSwitcher />
            <Button href={resolveHref(headerCta.href)} variant="primary" className={styles.cta} onClick={closeMenu}>
              {t('nav.cta')}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
