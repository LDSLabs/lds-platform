import styles from './Button.module.css';

/**
 * Shared button/link component.
 * Renders an <a> when `href` is provided, otherwise a <button>.
 */
function Button({
  as,
  href,
  variant = 'primary',
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  }

  const Tag = as || 'button';

  return (
    <Tag className={classes} type={Tag === 'button' ? type : undefined} {...rest}>
      {children}
    </Tag>
  );
}

export default Button;
