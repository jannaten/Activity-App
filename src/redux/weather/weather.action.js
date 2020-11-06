import axios from "axios";
import { fetchUrl } from "../";
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

export const mountWeather = (defaultCity, API_KEY) => async (dispatch) => {
  dispatch({ type: TYPES.REQUEST_WEATHER_PENDING });
  try {
    const response = await axios.get(fetchUrl(defaultCity, API_KEY));
    dispatch({ type: TYPES.REQUEST_WEATHER_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: TYPES.REQUEST_WEATHER_FAILED, payload: e });
  }
};
