import styles from './Tag.module.css';

function Tag({ tone = 'neutral', children }) {
  const className = [styles.tag, styles[tone]].filter(Boolean).join(' ');
  return <span className={className}>{children}</span>;
}

export default Tag;
