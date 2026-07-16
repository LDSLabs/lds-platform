import { benefitsSection, benefits } from '../../content/benefits.js';
import styles from './Benefits.module.css';

function Benefits() {
  return (
    <section id="benefits" className={styles.section} aria-labelledby="benefits-title">
      <div className="container">
        <h2 id="benefits-title" className={styles.title}>
          {benefitsSection.title}
        </h2>
        <p className={styles.subtitle}>{benefitsSection.subtitle}</p>

        <ul className={styles.grid}>
          {benefits.map((benefit) => (
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
