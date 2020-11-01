import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./rootReducer";

// const middleware = [logger];
let middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, logger];
} else {
  middleware = [...middleware];
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
