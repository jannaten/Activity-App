import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectNotifiedItems } from '../../features/activities/activitiesSelectors';
import styles from './Notifications.module.scss';

export default function Notifications(): React.ReactElement {
  const notifiedItems = useAppSelector(selectNotifiedItems);

  return (
    <div className={styles.container} aria-live="polite" aria-label="Notifications">
      <h2>Notifications</h2>
      {notifiedItems.length === 0 ? (
        <p className={styles.empty}>No notifications at this moment</p>
      ) : (
        <ul className={styles.list}>
          {notifiedItems.map((item) => (
            <li key={item.id} className={styles.item}>
              <span className={styles.dot} aria-hidden="true" />
              <span>
                <strong>{item.name}</strong> has started
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
