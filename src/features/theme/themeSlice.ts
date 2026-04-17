import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ThemeMode } from '../../types';
import type { RootState } from '../../app/store';

interface ThemeState {
  mode: ThemeMode;
}

const prefersDark =
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: (prefersDark ? 'dark' : 'light') as ThemeMode,
  } satisfies ThemeState as ThemeState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const selectThemeMode = (state: RootState): ThemeMode => state.theme.mode;
export default themeSlice.reducer;
