import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateActivity } from '../../features/activities/activitiesSlice';
import Button from '../Button/Button';
import styles from './EditActivityModal.module.scss';

export default function EditActivityModal({ activity, onClose }) {
  const dispatch = useDispatch();
  const dialogRef = useRef(null);
  const isArchived = activity.completed;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: activity.name, timeStr: '' } });

  useEffect(() => {
    const el = dialogRef.current;
    if (el) el.focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const onSubmit = ({ name, timeStr }) => {
    dispatch(updateActivity({ id: activity.id, name, timeStr, completed: activity.completed }));
    onClose();
  };

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={styles.modal}
      >
        <div className={styles.modalHeader}>
          <h2 id="modal-title">Edit Activity</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.field}>
            <label htmlFor="edit-name">Activity name</label>
            <input
              id="edit-name"
              type="text"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'edit-name-error' : undefined}
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Min 2 characters' },
                validate: (v) => v.trim().length > 0 || 'Cannot be only spaces',
              })}
            />
            {errors.name && (
              <span id="edit-name-error" className={styles.error} role="alert">
                {errors.name.message}
              </span>
            )}
          </div>

          {!isArchived && (
            <div className={styles.field}>
              <label htmlFor="edit-time">New time (optional)</label>
              <input
                id="edit-time"
                type="time"
                aria-invalid={Boolean(errors.timeStr)}
                aria-describedby={errors.timeStr ? 'edit-time-error' : undefined}
                {...register('timeStr', {
                  validate: (v) => {
                    if (!v) return true;
                    const [h, m] = v.split(':').map(Number);
                    const now = new Date();
                    const nowMins = now.getHours() * 60 + now.getMinutes();
                    return h * 60 + m > nowMins || 'Time must be in the future';
                  },
                })}
              />
              {errors.timeStr && (
                <span id="edit-time-error" className={styles.error} role="alert">
                  {errors.timeStr.message}
                </span>
              )}
            </div>
          )}

          <div className={styles.actions}>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
