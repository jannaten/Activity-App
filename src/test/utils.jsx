/**
 * Custom render helper that wraps components with the Redux store and Router.
 * Use `renderWithProviders` instead of RTL's plain `render` whenever the component
 * under test reads from or dispatches to Redux, or uses react-router hooks/links.
 */
import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import activitiesReducer from '../features/activities/activitiesSlice';
import weatherReducer from '../features/weather/weatherSlice';
import themeReducer from '../features/theme/themeSlice';

/**
 * Build a test-only Redux store (no redux-persist, synchronous).
 * @param {object} preloadedState - slice state to pre-populate
 */
export function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      activities: activitiesReducer,
      weather: weatherReducer,
      theme: themeReducer,
    },
    preloadedState,
  });
}

/**
 * Render `ui` wrapped in a Redux Provider + MemoryRouter.
 *
 * @param {React.ReactElement} ui
 * @param {object} options
 * @param {object}  options.preloadedState  - pre-loaded Redux state
 * @param {object}  options.store           - custom store instance (overrides preloadedState)
 * @param {string}  options.route           - initial route (default: '/')
 * @param {object}  options.renderOptions   - passed through to RTL render
 */
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    route = '/',
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

/**
 * A minimal Redux state shape that matches the app's initial state.
 * Use this as a base and spread overrides where needed.
 */
export const defaultActivitiesState = {
  activities: [],
  activitiesActive: [],
  activitiesArchived: [],
  notifiedItems: [],
  searchQuery: '',
  sortOrder: 'default',
  undoStack: [],
};

/**
 * Factory to build a single activity object for test fixtures.
 */
export function makeActivity(overrides = {}) {
  return {
    id: 'test-id-1',
    name: 'Test Activity',
    completed: false,
    timeSet: 300,
    originalTimeSet: 300,
    ...overrides,
  };
}
