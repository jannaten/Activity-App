import { WeatherActionTypes as TYPES } from "./weather.types";
export const handleWeatherChange = (state) => ({
  type: TYPES.HANDLE_CHANGE,
  payload: state,
});

export const changeWeather = (state) => ({
  type: TYPES.CHANGE_WEATHER,
  payload: state,
});

export const getWeatherData = (state) => ({
  type: TYPES.GET_WEATHER,
  payload: state,
});

export const toggleVisible = (state) => ({
  type: TYPES.TOGGLE_VISIBLE,
  payload: state,
});

export const toggleLight = (state) => ({
  type: TYPES.TOGGLE_VISIBLE,
  payload: state,
});
