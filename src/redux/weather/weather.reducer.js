import { DEFAULT_CITY } from "../../constant";

const initState = {
  visible: false,
  light: "Night",
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
    case "CHANGE_LIGHT":
      if (state.weatherStatus.icon.includes("d")) {
        return { ...state, light: "Day" };
      } else if (state.weatherStatus.icon.includes("n")) {
        return { ...state, light: "Night" };
      } else {
        return { ...state, light: "" };
      }
    default:
      return state;
  }
};

export default weatherReducer;
