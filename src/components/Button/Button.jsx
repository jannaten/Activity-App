import React from 'react';
import styles from './Button.module.scss';

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false,
  onClick,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.btn} ${styles[variant]} ${styles[size]}`}
      {...rest}
    >
      {children}
    </button>
  );
}
