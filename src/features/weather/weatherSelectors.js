import { createSelector } from '@reduxjs/toolkit';

const selectWeatherState = (state) => state.weather;

export const selectWeatherData = createSelector(selectWeatherState, (s) => s.data);
export const selectWeatherStatus = createSelector(selectWeatherState, (s) => s.status);
export const selectWeatherError = createSelector(selectWeatherState, (s) => s.error);
export const selectWeatherCity = createSelector(selectWeatherState, (s) => s.city);

export const selectWeatherSummary = createSelector(selectWeatherData, (data) => {
  if (!data) return null;
  return {
    city: data.name,
    country: data.sys?.country,
    temp: data.main?.temp,
    feelsLike: data.main?.feels_like,
    humidity: data.main?.humidity,
    pressure: data.main?.pressure,
    tempMin: data.main?.temp_min,
    tempMax: data.main?.temp_max,
    description: data.weather?.[0]?.description,
    icon: data.weather?.[0]?.icon,
    isDay: data.weather?.[0]?.icon?.includes('d') ?? true,
  };
});
