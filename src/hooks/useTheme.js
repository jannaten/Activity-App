import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { selectThemeMode, toggleTheme } from '../features/theme/themeSlice';

export function useTheme() {
  const dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return { mode, toggleTheme: () => dispatch(toggleTheme()) };
}
