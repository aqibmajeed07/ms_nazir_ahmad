import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('company-site-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    // Fall back to system preference
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('company-site-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
}

export default useTheme;
