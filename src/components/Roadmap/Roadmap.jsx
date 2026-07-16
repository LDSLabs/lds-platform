import { roadmap } from '../../content/roadmap.js';
import styles from './Roadmap.module.css';

function Roadmap() {
  return (
    <section className={styles.section} aria-labelledby="roadmap-title">
      <div className="container">
        <h2 id="roadmap-title" className={styles.title}>
          {roadmap.title}
        </h2>
        <p className={styles.description}>{roadmap.description}</p>

        <ul className={styles.chipList} aria-label="Future product directions">
          {roadmap.categories.map((category) => (
            <li key={category} className={styles.chip}>
              {category}
            </li>
          ))}
        </ul>

        <p className={styles.note}>{roadmap.note}</p>
      </div>
    </section>
  );
}

export default Roadmap;
