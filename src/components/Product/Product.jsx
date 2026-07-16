import Tag from '../Tag/Tag.jsx';
import { product } from '../../content/product.js';
import styles from './Product.module.css';

function Product() {
  return (
    <section id="product" className={styles.section} aria-labelledby="product-title">
      <div className="container">
        <Tag tone="accent">{product.eyebrow}</Tag>
        <h2 id="product-title" className={styles.title}>
          {product.name}
        </h2>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.grid}>
          <div>
            <h3 className={styles.groupTitle}>{product.includedTitle}</h3>
            <ul className={styles.list}>
              {product.included.map((item) => (
                <li key={item.name} className={styles.listItem}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemDetail}>{item.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.groupTitle}>{product.plannedTitle}</h3>
            <ul className={styles.list}>
              {product.planned.map((item) => (
                <li key={item.name} className={`${styles.listItem} ${styles.plannedItem}`}>
                  <span className={styles.itemName}>{item.name}</span>
                  <Tag tone="planned">Planned</Tag>
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
