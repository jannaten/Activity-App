import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { weatherReducer, activitiesReducer } from "./";
import sessionStorage from "redux-persist/lib/storage/session";

const persistCofig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["activities", "weather"],
};

const rootReducer = combineReducers({
  activities: activitiesReducer,
  weather: weatherReducer,
});

export default persistReducer(persistCofig, rootReducer);
