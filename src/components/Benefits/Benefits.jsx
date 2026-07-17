import { useTranslation } from 'react-i18next';
import styles from './Benefits.module.css';

function Benefits() {
  const { t } = useTranslation();
  const items = t('benefits.items', { returnObjects: true });

  return (
    <section id="benefits" className={styles.section} aria-labelledby="benefits-title">
      <div className="container">
        <h2 id="benefits-title" className={styles.title}>
          {t('benefits.title')}
        </h2>
        <p className={styles.subtitle}>{t('benefits.subtitle')}</p>

        <ul className={styles.grid}>
          {items.map((benefit) => (
            <li key={benefit.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{benefit.title}</h3>
              <p className={styles.cardDescription}>{benefit.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Benefits;
