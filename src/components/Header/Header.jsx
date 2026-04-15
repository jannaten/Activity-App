import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import styles from './Header.module.scss';

const NAV_LINKS = [
  { to: '/', label: 'Dashboard' },
  { to: '/check', label: 'All Activities' },
  { to: '/create', label: 'Add Activity' },
  { to: '/stats', label: 'Statistics' },
];

export default function Header() {
  const { mode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 680) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.brand} onClick={closeMenu}>
        <strong>activity</strong>
      </NavLink>

      <nav
        className={`${styles.nav} ${menuOpen ? styles.open : ''}`}
        aria-label="Main navigation"
      >
        <ul role="list">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.actions}>
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          title={`${mode === 'light' ? 'Dark' : 'Light'} mode`}
        >
          {mode === 'light' ? '🌙' : '☀️'}
        </button>

        <button
          className={styles.hamburger}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
