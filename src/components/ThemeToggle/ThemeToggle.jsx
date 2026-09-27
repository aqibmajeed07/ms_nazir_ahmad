import React from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="theme-icon sun-icon" size={18} />
      ) : (
        <Moon className="theme-icon moon-icon" size={18} />
      )}
      <style>{`
        .theme-toggle-btn {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border);
          background-color: var(--surface-secondary);
          color: var(--text);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
        }
        .theme-toggle-btn:hover {
          background-color: var(--accent-light);
          border-color: var(--border-gold);
          color: var(--accent);
          transform: rotate(15deg);
        }
        .theme-icon {
          transition: transform var(--transition-base);
        }
      `}</style>
    </button>
  );
}

export default ThemeToggle;
