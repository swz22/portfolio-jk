'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export type ThemeId =
  | 'space'
  | 'earth'
  | 'beach'
  | 'matrix'
  | 'cyberpunk'
  | 'minimal';

interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  performance: 'light' | 'medium' | 'heavy';
  available: boolean;
}

interface ThemeContextType {
  currentTheme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  themes: ThemeConfig[];
  isEffectsEnabled: boolean;
  toggleEffects: () => void;
  isTransitioning: boolean;
}

const themes: ThemeConfig[] = [
  {
    id: 'minimal',
    name: 'Arctic Sky',
    description: 'Serene aurora with soft blues',
    performance: 'light',
    available: true,
  },
  {
    id: 'space',
    name: 'Space',
    description: 'Anime-inspired space with shooting stars',
    performance: 'light',
    available: true,
  },
  {
    id: 'earth',
    name: 'Earth',
    description: '3D globe with satellites',
    performance: 'heavy',
    available: true,
  },
  {
    id: 'beach',
    name: 'Beach',
    description: 'Relaxing beach scene',
    performance: 'medium',
    available: true,
  },
  {
    id: 'matrix',
    name: 'Matrix',
    description: 'Digital rain effect',
    performance: 'medium',
    available: false,
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon city vibes',
    performance: 'heavy',
    available: false,
  },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('space');
  const [isEffectsEnabled, setIsEffectsEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as ThemeId;
    const savedEffects = localStorage.getItem('portfolio-effects');

    if (savedEffects !== null) {
      setIsEffectsEnabled(savedEffects === 'true');
    }

    if (savedTheme && themes.find((t) => t.id === savedTheme)?.available) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const setTheme = (theme: ThemeId) => {
    if (!themes.find((t) => t.id === theme)?.available) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTheme(theme);
      localStorage.setItem('portfolio-theme', theme);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 300);
  };

  const toggleEffects = () => {
    const newState = !isEffectsEnabled;
    setIsEffectsEnabled(newState);
    localStorage.setItem('portfolio-effects', String(newState));

    if (!newState) {
      setTheme('minimal');
    } else if (currentTheme === 'minimal') {
      setTheme('space');
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        themes,
        isEffectsEnabled,
        toggleEffects,
        isTransitioning,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
