export const handleChange = (state) => ({
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
