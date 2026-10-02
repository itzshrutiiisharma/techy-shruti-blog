'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type AccentTheme = 'emerald' | 'cyan' | 'purple' | 'gold';

export interface AccentConfig {
  id: AccentTheme;
  name: string;
  primary: string;
  glow: string;
  border: string;
  bgSubtle: string;
  textClass: string;
}

export const ACCENT_CONFIGS: Record<AccentTheme, AccentConfig> = {
  emerald: {
    id: 'emerald',
    name: 'Matrix Emerald',
    primary: '#00ff66',
    glow: 'rgba(0, 255, 102, 0.4)',
    border: 'rgba(0, 255, 102, 0.3)',
    bgSubtle: 'rgba(0, 255, 102, 0.08)',
    textClass: 'text-[#00ff66]',
  },
  cyan: {
    id: 'cyan',
    name: 'Cyber Cyan',
    primary: '#00e5ff',
    glow: 'rgba(0, 229, 255, 0.4)',
    border: 'rgba(0, 229, 255, 0.3)',
    bgSubtle: 'rgba(0, 229, 255, 0.08)',
    textClass: 'text-[#00e5ff]',
  },
  purple: {
    id: 'purple',
    name: 'Electric Violet',
    primary: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.4)',
    border: 'rgba(168, 85, 247, 0.3)',
    bgSubtle: 'rgba(168, 85, 247, 0.08)',
    textClass: 'text-[#a855f7]',
  },
  gold: {
    id: 'gold',
    name: 'Solar Amber',
    primary: '#ffd60a',
    glow: 'rgba(255, 214, 10, 0.4)',
    border: 'rgba(255, 214, 10, 0.3)',
    bgSubtle: 'rgba(255, 214, 10, 0.08)',
    textClass: 'text-[#ffd60a]',
  },
};

interface ThemeContextType {
  accent: AccentTheme;
  setAccent: (accent: AccentTheme) => void;
  config: AccentConfig;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
}

const ThemeAccentContext = createContext<ThemeContextType>({
  accent: 'emerald',
  setAccent: () => {},
  config: ACCENT_CONFIGS.emerald,
  soundEnabled: true,
  setSoundEnabled: () => {},
});

export function ThemeAccentProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<AccentTheme>('emerald');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    const savedAccent = localStorage.getItem('techyshruti_accent') as AccentTheme;
    if (savedAccent && ACCENT_CONFIGS[savedAccent]) {
      setAccentState(savedAccent);
    }
    const savedSound = localStorage.getItem('techyshruti_sound');
    if (savedSound !== null) {
      setSoundEnabled(savedSound === 'true');
    }
  }, []);

  const setAccent = (newAccent: AccentTheme) => {
    setAccentState(newAccent);
    localStorage.setItem('techyshruti_accent', newAccent);
    const cfg = ACCENT_CONFIGS[newAccent];
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--accent-primary', cfg.primary);
      document.documentElement.style.setProperty('--accent-glow', cfg.glow);
      document.documentElement.style.setProperty('--accent-border', cfg.border);
      document.documentElement.style.setProperty('--accent-subtle', cfg.bgSubtle);
    }
  };

  useEffect(() => {
    const cfg = ACCENT_CONFIGS[accent];
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--accent-primary', cfg.primary);
      document.documentElement.style.setProperty('--accent-glow', cfg.glow);
      document.documentElement.style.setProperty('--accent-border', cfg.border);
      document.documentElement.style.setProperty('--accent-subtle', cfg.bgSubtle);
    }
  }, [accent]);

  const handleSetSound = (val: boolean | ((prev: boolean) => boolean)) => {
    setSoundEnabled((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      localStorage.setItem('techyshruti_sound', String(next));
      return next;
    });
  };

  return (
    <ThemeAccentContext.Provider
      value={{
        accent,
        setAccent,
        config: ACCENT_CONFIGS[accent],
        soundEnabled,
        setSoundEnabled: handleSetSound,
      }}
    >
      {children}
    </ThemeAccentContext.Provider>
  );
}

export function useThemeAccent() {
  return useContext(ThemeAccentContext);
}
