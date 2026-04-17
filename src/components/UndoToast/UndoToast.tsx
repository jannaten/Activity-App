import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUndoAvailable } from '../../features/activities/activitiesSelectors';
import { undoLastAction } from '../../features/activities/activitiesSlice';
import styles from './UndoToast.module.scss';

export default function UndoToast(): React.ReactElement | null {
  const dispatch = useAppDispatch();
  const canUndo = useAppSelector(selectUndoAvailable);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (canUndo) {
      setVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(false), 5000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [canUndo]);

  if (!visible) return null;

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      <span>Action complete</span>
      <button
        className={styles.undoBtn}
        onClick={() => {
          dispatch(undoLastAction());
          setVisible(false);
        }}
        aria-label="Undo last action"
      >
        Undo
      </button>
      <button
        className={styles.dismissBtn}
        onClick={() => setVisible(false)}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}
