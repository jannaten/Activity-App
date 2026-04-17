/**
 * Custom render helper that wraps components with the Redux store and Router.
 * Use `renderWithProviders` instead of RTL's plain `render` whenever the component
 * under test reads from or dispatches to Redux, or uses react-router hooks/links.
 */
import React from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import activitiesReducer, { type ActivitiesState } from '../features/activities/activitiesSlice';
import weatherReducer from '../features/weather/weatherSlice';
import themeReducer from '../features/theme/themeSlice';
import type { Activity } from '../types';

const _reducers = {
  activities: activitiesReducer,
  weather: weatherReducer,
  theme: themeReducer,
};

// Derive the store type from a no-preloadedState call so getState() is well-typed.
const _typedStore = configureStore({ reducer: _reducers });
export type TestStore = typeof _typedStore;

/** Build a test-only Redux store (no redux-persist, synchronous). */
export function createTestStore(preloadedState: Record<string, any> = {}): TestStore {
  // Cast configureStore as any to bypass overload resolution issues when
  // preloadedState is a loose Record — safe because TestStore is still the return type.

  return (configureStore as any)({
    reducer: _reducers,
    preloadedState: Object.keys(preloadedState).length ? preloadedState : undefined,
  }) as TestStore;
}

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Record<string, any>;
  store?: TestStore;
  route?: string;
}

/** Render `ui` wrapped in a Redux Provider + MemoryRouter. */
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    route = '/',
    ...renderOptions
  }: RenderWithProvidersOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

/** A minimal Redux state shape that matches the app's initial state. */
export const defaultActivitiesState: ActivitiesState = {
  activities: [],
  activitiesActive: [],
  activitiesArchived: [],
  notifiedItems: [],
  searchQuery: '',
  sortOrder: 'default',
  undoStack: [],
};

/** Factory to build a single activity object for test fixtures. */
export function makeActivity(overrides: Partial<Activity> = {}): Activity {
  return {
    id: 'test-id-1',
    name: 'Test Activity',
    completed: false,
    timeSet: 300,
    originalTimeSet: 300,
    ...overrides,
  };
}
