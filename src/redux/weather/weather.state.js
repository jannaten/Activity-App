import { DEFAULT_CITY, API_KEY } from "../../constant";

export const initState = {
  API_KEY,
  visible: false,
  light: "Night",
  isPending: false,
  givenCityName: "",
  weatherReport: {},
  weatherStatus: {},
  basicWeatherData: {},
  defaultCity: DEFAULT_CITY,
};
