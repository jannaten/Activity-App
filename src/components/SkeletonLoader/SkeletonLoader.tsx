import React from 'react';
import styles from './SkeletonLoader.module.scss';

interface SkeletonLoaderProps {
  rows?: number;
}

export default function SkeletonLoader({ rows = 3 }: SkeletonLoaderProps): React.ReactElement {
  return (
    <div className={styles.container} aria-busy="true" aria-label="Loading content">
      {Array.from({ length: rows }, (_, i) => `row-${i}`).map((rowKey) => (
        <div key={rowKey} className={styles.row}>
          <div className={`${styles.block} ${styles.title}`} />
          <div className={`${styles.block} ${styles.body}`} />
          <div className={`${styles.block} ${styles.short}`} />
        </div>
      ))}
    </div>
  );
}
