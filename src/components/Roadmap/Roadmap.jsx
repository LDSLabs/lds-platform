import { useTranslation } from 'react-i18next';
import Tag from '../Tag/Tag.jsx';
import styles from './Roadmap.module.css';

function Roadmap() {
  const { t } = useTranslation();
  const items = t('roadmap.items', { returnObjects: true });

  return (
    <section id="roadmap" className={styles.section} aria-labelledby="roadmap-title">
      <div className="container">
        <h2 id="roadmap-title" className={styles.title}>
          {t('roadmap.title')}
        </h2>
        <p className={styles.description}>{t('roadmap.description')}</p>

        <ul className={styles.itemList} aria-label={t('roadmap.title')}>
          {items.map((item) => (
            <li key={item.label} className={styles.item}>
              <span className={styles.itemLabel}>{item.label}</span>
              <Tag tone={item.status === 'inProgress' ? 'accent' : 'planned'}>
                {t(`roadmap.statusLabels.${item.status}`)}
              </Tag>
            </li>
          ))}
        </ul>

        <p className={styles.note}>{t('roadmap.note')}</p>
      </div>
    </section>
  );
}

export default Roadmap;
