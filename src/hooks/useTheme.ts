import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectThemeMode, toggleTheme } from '../features/theme/themeSlice';
import type { ThemeMode } from '../types';

export function useTheme(): { mode: ThemeMode; toggleTheme: () => void } {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectThemeMode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return { mode, toggleTheme: () => dispatch(toggleTheme()) };
}
