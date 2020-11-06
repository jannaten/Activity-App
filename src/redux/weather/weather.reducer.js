import { initState } from "./weather.state";
import { WeatherActionTypes as TYPES } from "./weather.types";

const weatherReducer = (state = initState, action) => {
  switch (action.type) {
    //Changing the state with the defaultCityName state
    case TYPES.HANDLE_CHANGE:
      const { value, name } = action.payload.target;
      return { ...state, [name]: value };

    //Change weather accordingly with defaultCityName state
    case TYPES.CHANGE_WEATHER:
      action.payload.preventDefault();
      const val = state.givenCityName;
      return { ...state, defaultCity: val, givenCityName: "" };

    //Set the visivility of suggestions
    case TYPES.TOGGLE_VISIBLE:
      return { ...state, visible: true };

    //Check the current time of particular places
    case TYPES.CHANGE_LIGHT:
      if (state.weatherStatus.icon.includes("d")) {
        return { ...state, light: "Day" };
      } else if (state.weatherStatus.icon.includes("n")) {
        return { ...state, light: "Night" };
      } else {
        return { ...state, light: "" };
      }

    //Check the fetching respond
    case TYPES.REQUEST_WEATHER_PENDING:
      return { ...state, isPending: true };

    //Get the weather data and set it in the state
    case TYPES.REQUEST_WEATHER_SUCCESS:
      const mainTemp = action.payload.main;
      const weatherStatus = action.payload.weather[0];
      return {
        ...state,
        weatherStatus,
        isPending: false,
        basicWeatherData: mainTemp,
        weatherReport: action.payload,
      };

    //Handle the error
    case TYPES.REQUEST_WEATHER_FAILED:
      alert("City doesn't found");
      return { ...state, isPending: false };

    //If no action happens its retruns the states
    default:
      return state;
  }
};

export default weatherReducer;
