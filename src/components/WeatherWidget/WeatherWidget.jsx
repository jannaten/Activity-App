import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather } from '../../features/weather/weatherSlice';
import {
  selectWeatherSummary,
  selectWeatherStatus,
  selectWeatherError,
} from '../../features/weather/weatherSelectors';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';
import Button from '../Button/Button';
import styles from './WeatherWidget.module.scss';

export default function WeatherWidget() {
  const dispatch = useDispatch();
  const summary = useSelector(selectWeatherSummary);
  const status = useSelector(selectWeatherStatus);
  const error = useSelector(selectWeatherError);
  const [cityInput, setCityInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = cityInput.trim();
    if (trimmed.length < 2) return;
    dispatch(fetchWeather(trimmed));
    setCityInput('');
  };

  return (
    <div className={styles.widget}>
      <h2>Weather</h2>

      {error && (
        <p className={styles.error} role="alert">
          {error} — try a different city.
        </p>
      )}

      {status === 'loading' ? (
        <SkeletonLoader rows={3} />
      ) : (
        summary && (
          <div className={styles.data}>
            <div className={styles.main}>
              <img
                src={`https://openweathermap.org/img/wn/${summary.icon}@2x.png`}
                alt={summary.description}
                width={56}
                height={56}
              />
              <div>
                <strong className={styles.city}>
                  {summary.city}, {summary.country}
                </strong>
                <p className={styles.temp}>{summary.temp?.toFixed(1)}°C</p>
                <p className={styles.desc}>{summary.description}</p>
              </div>
            </div>

            <dl className={styles.details}>
              <div>
                <dt>Feels like</dt>
                <dd>{summary.feelsLike?.toFixed(1)}°C</dd>
              </div>
              <div>
                <dt>Humidity</dt>
                <dd>{summary.humidity}%</dd>
              </div>
              <div>
                <dt>Pressure</dt>
                <dd>{summary.pressure} hPa</dd>
              </div>
              <div>
                <dt>High / Low</dt>
                <dd>
                  {summary.tempMax?.toFixed(0)}° / {summary.tempMin?.toFixed(0)}°
                </dd>
              </div>
            </dl>
          </div>
        )
      )}

      <form onSubmit={handleSearch} className={styles.form}>
        <label htmlFor="city-search" className="sr-only">
          Search a city
        </label>
        <input
          id="city-search"
          type="search"
          placeholder="Search city..."
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          className={styles.input}
          minLength={2}
          aria-label="City name"
        />
        <Button type="submit" size="small">
          Search
        </Button>
      </form>
    </div>
  );
}
