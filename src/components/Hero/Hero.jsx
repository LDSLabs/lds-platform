import { useTranslation } from 'react-i18next';
import Button from '../Button/Button.jsx';
import Tag from '../Tag/Tag.jsx';
import styles from './Hero.module.css';

function Hero() {
  const { t } = useTranslation();
  const credibility = t('hero.credibility', { returnObjects: true });

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <Tag tone="accent">{t('hero.eyebrow')}</Tag>

        <h1 id="hero-title" className={styles.title}>
          {t('hero.title')}
        </h1>

        <p className={styles.subtitle}>{t('hero.subtitle')}</p>

        <div className={styles.productHighlight}>
          <span className={styles.productLabel}>{t('hero.productLabel')}</span>
          <span className={styles.productName}>{t('product.name')}</span>
        </div>

        <div className={styles.actions}>
          <Button href="#waitlist" variant="primary">
            {t('hero.primaryCta')}
          </Button>
          <Button href="#product" variant="secondary">
            {t('hero.secondaryCta')}
          </Button>
        </div>

        <ul className={styles.credibilityList} aria-label={t('hero.credibilityLabel')}>
          {Object.values(credibility).map((item) => (
            <li key={item} className={styles.credibilityItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Hero;
