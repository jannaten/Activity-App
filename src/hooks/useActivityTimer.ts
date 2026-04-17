import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../app/hooks';
import { decrementTime } from '../features/activities/activitiesSlice';

export function useActivityTimer(): void {
  const dispatch = useAppDispatch();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      dispatch(decrementTime());
    }, 1_000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [dispatch]);
}
