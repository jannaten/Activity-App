import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./rootReducer";
import thunkMiddleware from "redux-thunk";

// const middleware = [logger];
let middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, logger];
} else {
  middleware = [...middleware];
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, ...middleware)
);

export default store;
