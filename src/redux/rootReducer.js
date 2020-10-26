import { combineReducers } from "redux";
import activitiesReducer from "./activities/activities.reducer";
import weatherReducer from "./weather/weather.reducer";
export default combineReducers({
  activities: activitiesReducer,
  weather: weatherReducer,
});
