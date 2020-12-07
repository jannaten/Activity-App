import { createSelector } from "reselect";

const selectWeather = (state) => state.weather;

export const selectAPI_KEY = createSelector(
  [selectWeather],
  (weather) => weather.API_KEY
);
export const selectDefaultCity = createSelector(
  [selectWeather],
  (weather) => weather.defaultCity
);
export const selectBasicWeatherData = createSelector(
  [selectWeather],
  (weather) => weather.basicWeatherData
);
export const selectVisible = createSelector(
  [selectWeather],
  (weather) => weather.visible
);
export const selectLight = createSelector(
  [selectWeather],
  (weather) => weather.light
);
export const selectIsPending = createSelector(
  [selectWeather],
  (weather) => weather.isPending
);
export const selectGivenCityName = createSelector(
  [selectWeather],
  (weather) => weather.givenCityName
);
export const selectWeatherReport = createSelector(
  [selectWeather],
  (weather) => weather.weatherReport
);
export const selectWeatherStatus = createSelector(
  [selectWeather],
  (weather) => weather.weatherStatus
);
