import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { syncDerivedLists } from '../../features/activities/activitiesSlice';
import { fetchWeather } from '../../features/weather/weatherSlice';
import { selectWeatherCity } from '../../features/weather/weatherSelectors';
import { useActivityTimer } from '../../hooks/useActivityTimer';
import ActiveActivities from '../../components/ActiveActivities/ActiveActivities';
import ArchivedActivities from '../../components/ArchivedActivities/ArchivedActivities';
import Notifications from '../../components/Notifications/Notifications';
import WeatherSuggestions from '../../components/WeatherSuggestions/WeatherSuggestions';
import WeatherWidget from '../../components/WeatherWidget/WeatherWidget';
import styles from './Dashboard.module.scss';

export default function Dashboard() {
  const dispatch = useDispatch();
  const city = useSelector(selectWeatherCity);

  useActivityTimer();

  useEffect(() => {
    dispatch(syncDerivedLists());
  }, [dispatch]);

  useEffect(() => {
    if (city) dispatch(fetchWeather(city));
  }, [dispatch, city]);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Daily Activities</h1>
      <div className={styles.grid}>
        <section className={styles.colMain} aria-label="Active activities">
          <ActiveActivities />
        </section>
        <section className={styles.colSide} aria-label="Notifications and suggestions">
          <Notifications />
          <WeatherSuggestions />
          <ArchivedActivities />
        </section>
        <section className={styles.colWeather} aria-label="Weather information">
          <WeatherWidget />
        </section>
      </div>
    </div>
  );
}
