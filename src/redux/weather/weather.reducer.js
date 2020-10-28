import { DEFAULT_CITY } from "../../constant";

const initState = {
  visible: false,
  givenCityName: "",
  weatherReport: {},
  weatherStatus: {},
  basicWeatherData: {},
  defaultCity: DEFAULT_CITY,
};

const weatherReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_WEATHER":
      const { basicWeatherData, weatherStatus, weatherReport } = action.payload;
      return { ...state, basicWeatherData, weatherStatus, weatherReport };
    case "HANDLE_CHANGE":
      const { value, name } = action.payload.target;
      return { ...state, [name]: value };
    case "CHANGE_WEATHER":
      action.payload.preventDefault();
      const val = state.givenCityName;
      return { ...state, defaultCity: val, givenCityName: "" };
    case "TOGGLE_VISIBLE":
      return { ...state, visible: true };
    default:
      return state;
  }
};

export default weatherReducer;
