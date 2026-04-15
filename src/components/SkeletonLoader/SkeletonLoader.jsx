import React from 'react';
import styles from './SkeletonLoader.module.scss';

export default function SkeletonLoader({ rows = 3 }) {
  return (
    <div className={styles.container} aria-busy="true" aria-label="Loading content">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={styles.row}>
          <div className={`${styles.block} ${styles.title}`} />
          <div className={`${styles.block} ${styles.body}`} />
          <div className={`${styles.block} ${styles.short}`} />
        </div>
      ))}
    </div>
  );
}
