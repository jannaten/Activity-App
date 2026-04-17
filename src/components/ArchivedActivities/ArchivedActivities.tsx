import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectArchivedActivities } from '../../features/activities/activitiesSelectors';
import styles from './ArchivedActivities.module.scss';

export default function ArchivedActivities(): React.ReactElement {
  const archived = useAppSelector(selectArchivedActivities);

  return (
    <div className={styles.container}>
      <h2>Archive</h2>
      {archived.length === 0 ? (
        <p className={styles.empty}>No completed activities yet</p>
      ) : (
        <ul className={styles.list}>
          {archived.map((ac) => (
            <li key={ac.id} className={styles.item}>
              <span className={styles.check} aria-hidden="true">
                ✓
              </span>
              <span className={styles.name}>{ac.name}</span>
              <span className={styles.badge}>Done</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
