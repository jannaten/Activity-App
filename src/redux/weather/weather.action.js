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

export const toggleVisible = () => ({
  type: TYPES.TOGGLE_VISIBLE,
});

export const toggleLight = () => ({
  type: TYPES.CHANGE_LIGHT,
});
