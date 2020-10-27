import { combineReducers } from "redux";
import { weatherReducer, activitiesReducer } from "./";

export default combineReducers({
  activities: activitiesReducer,
  weather: weatherReducer,
});
