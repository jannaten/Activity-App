export const handleWeatherChange = (state) => ({
  type: "HANDLE_CHANGE",
  payload: state,
});

export const changeWeather = (state) => ({
  type: "CHANGE_WEATHER",
  payload: state,
});

export const getWeatherData = (state) => ({
  type: "GET_WEATHER",
  payload: state,
});

export const toggleVisible = (state) => ({
  type: "TOGGLE_VISIBLE",
  payload: state,
});

export const toggleLight = (state) => ({
  type: "CHANGE_LIGHT",
  payload: state,
});
