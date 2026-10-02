'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeType = 'magenta' | 'obsidian' | 'violet' | 'emerald' | 'light';

interface ThemeContextValue {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'magenta',
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>('magenta');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('shruti_theme') as ThemeType;
    if (savedTheme && ['magenta', 'obsidian', 'violet', 'emerald', 'light'].includes(savedTheme)) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'magenta');
    }
  }, []);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('shruti_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleTheme = () => {
    const themeCycle: ThemeType[] = ['magenta', 'obsidian', 'violet', 'emerald', 'light'];
    const nextIndex = (themeCycle.indexOf(theme) + 1) % themeCycle.length;
    setTheme(themeCycle[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div className={`theme-${theme} min-h-screen flex flex-col`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
