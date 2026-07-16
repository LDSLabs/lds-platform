import { useState } from 'react';
import Button from '../Button/Button.jsx';
import { site, navLinks, headerCta } from '../../content/site.js';
import styles from './Header.module.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand}>
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
            {menuOpen ? 'Close menu' : 'Open menu'}
          </span>
          <span aria-hidden="true" className={styles.menuIcon} data-open={menuOpen} />
        </button>

        <nav
          id="primary-navigation"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
          aria-label="Primary"
        >
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href={headerCta.href} variant="primary" className={styles.cta} onClick={closeMenu}>
            {headerCta.label}
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
