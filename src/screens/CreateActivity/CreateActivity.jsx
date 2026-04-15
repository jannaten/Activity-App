import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addActivity } from '../../features/activities/activitiesSlice';
import Button from '../../components/Button/Button';
import styles from './CreateActivity.module.scss';

const getCurrentTime = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

export default function CreateActivity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = ({ name, timeStr }) => {
    dispatch(addActivity({ name, timeStr }));
    setSubmitted(true);
    reset();
    setTimeout(() => navigate('/'), 1200);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>Add an Activity</h1>
        <p className={styles.subtitle}>Schedule what you want to accomplish today.</p>

        {submitted && (
          <div className={styles.success} role="status" aria-live="polite">
            ✓ Activity added! Redirecting to dashboard...
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">Activity name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Morning run"
              aria-describedby={errors.name ? 'name-error' : undefined}
              aria-invalid={!!errors.name}
              {...register('name', {
                required: 'Activity name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
                maxLength: { value: 60, message: 'Name must be under 60 characters' },
                validate: (v) => v.trim().length > 0 || 'Name cannot be only spaces',
              })}
            />
            {errors.name && (
              <span id="name-error" className={styles.error} role="alert">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="timeStr">Schedule time</label>
            <input
              id="timeStr"
              type="time"
              aria-describedby="time-hint"
              aria-invalid={!!errors.timeStr}
              {...register('timeStr', {
                required: 'Please set a time',
                validate: (v) => {
                  const [h, m] = v.split(':').map(Number);
                  const now = new Date();
                  return (
                    h * 60 + m > now.getHours() * 60 + now.getMinutes() ||
                    'Time must be in the future'
                  );
                },
              })}
            />
            <span id="time-hint" className={styles.hint}>
              Current time: {getCurrentTime()}
            </span>
            {errors.timeStr && (
              <span className={styles.error} role="alert">
                {errors.timeStr.message}
              </span>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} size="large">
            {isSubmitting ? 'Adding...' : 'Add Activity'}
          </Button>
        </form>
      </div>
    </div>
  );
}
