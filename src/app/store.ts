import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import activitiesReducer from '../features/activities/activitiesSlice';
import weatherReducer from '../features/weather/weatherSlice';
import themeReducer from '../features/theme/themeSlice';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['activities', 'theme'],
};

const rootReducer = combineReducers({
  activities: activitiesReducer,
  weather: weatherReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

/** Derived from rootReducer (not the persisted wrapper) so selectors get clean slice types. */
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
