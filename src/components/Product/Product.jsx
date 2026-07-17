import { useTranslation } from 'react-i18next';
import Tag from '../Tag/Tag.jsx';
import styles from './Product.module.css';

function Product() {
  const { t } = useTranslation();
  const included = t('product.included', { returnObjects: true });
  const planned = t('product.planned', { returnObjects: true });
  const plannedStatusLabel = t('product.status.planned');

  return (
    <section id="product" className={styles.section} aria-labelledby="product-title">
      <div className="container">
        <Tag tone="accent">{t('product.eyebrow')}</Tag>
        <h2 id="product-title" className={styles.title}>
          {t('product.name')}
        </h2>
        <p className={styles.description}>{t('product.description')}</p>

        <div className={styles.grid}>
          <div>
            <h3 className={styles.groupTitle}>{t('product.includedTitle')}</h3>
            <ul className={styles.list}>
              {included.map((item) => (
                <li key={item.name} className={styles.listItem}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemDetail}>{item.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.groupTitle}>{t('product.plannedTitle')}</h3>
            <ul className={styles.list}>
              {planned.map((item) => (
                <li key={item.name} className={`${styles.listItem} ${styles.plannedItem}`}>
                  <span className={styles.itemName}>{item.name}</span>
                  <Tag tone="planned">{plannedStatusLabel}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
