import Button from '../Button/Button.jsx';
import Tag from '../Tag/Tag.jsx';
import { hero } from '../../content/hero.js';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <Tag tone="accent">{hero.eyebrow}</Tag>

        <h1 id="hero-title" className={styles.title}>
          {hero.title}
        </h1>

        <p className={styles.subtitle}>{hero.subtitle}</p>

        <div className={styles.productHighlight}>
          <span className={styles.productLabel}>{hero.productLabel}</span>
          <span className={styles.productName}>{hero.productName}</span>
        </div>

        <div className={styles.actions}>
          <Button href={hero.primaryCta.href} variant="primary">
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} variant="secondary">
            {hero.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
