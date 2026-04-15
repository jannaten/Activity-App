import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { decrementTime } from '../features/activities/activitiesSlice';

export function useActivityTimer() {
  const dispatch = useDispatch();
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      dispatch(decrementTime());
    }, 1_000); // tick every second

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [dispatch]);
}
