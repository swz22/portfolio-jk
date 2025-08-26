'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export type ThemeId =
  | 'starfall'
  | 'matrix'
  | 'cyberpunk'
  | 'neural'
  | 'underwater';

interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  technology: '2D Canvas' | '3D WebGL';
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
    id: 'starfall',
    name: 'Starfall',
    description: '',
    technology: '2D Canvas',
    performance: 'light',
    available: true,
  },
  {
    id: 'neural',
    name: 'Neural Network',
    description: '',
    technology: '3D WebGL',
    performance: 'medium',
    available: true,
  },
  {
    id: 'underwater',
    name: 'Underwater Abyss',
    description: '',
    technology: '3D WebGL',
    performance: 'heavy',
    available: false,
  },
  {
    id: 'matrix',
    name: 'Matrix',
    description: '',
    technology: '2D Canvas',
    performance: 'medium',
    available: false,
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: '',
    technology: '3D WebGL',
    performance: 'heavy',
    available: false,
  },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('neural');
  const [isEffectsEnabled, setIsEffectsEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const savedEffects = localStorage.getItem('portfolio-effects');

    if (savedEffects !== null) {
      setIsEffectsEnabled(savedEffects === 'true');
    }

    if (savedTheme) {
      const isValidTheme = themes.some(
        (t) => t.id === savedTheme && t.available
      );
      if (isValidTheme) {
        setCurrentTheme(savedTheme as ThemeId);
      }
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
