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
  | 'neural'
  | 'ocean'
  | 'constellation'
  | 'cyberpunk'
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
    description: 'Animated starfield with falling petals',
    technology: '2D Canvas',
    performance: 'light',
    available: true,
  },
  {
    id: 'neural',
    name: 'Neural Network',
    description: 'Interactive 3D neural connections',
    technology: '3D WebGL',
    performance: 'medium',
    available: true,
  },
  {
    id: 'matrix',
    name: 'Matrix Rain',
    description: 'Falling code characters with glow effects',
    technology: '2D Canvas',
    performance: 'medium',
    available: true,
  },
  {
    id: 'ocean',
    name: 'Ocean Depths',
    description: 'Underwater world with marine life',
    technology: '3D WebGL',
    performance: 'heavy',
    available: true,
  },
  {
    id: 'constellation',
    name: 'Constellation',
    description: 'Connected stars forming patterns',
    technology: '2D Canvas',
    performance: 'light',
    available: true,
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon city grid (coming soon)',
    technology: '3D WebGL',
    performance: 'heavy',
    available: false,
  },
  {
    id: 'underwater',
    name: 'Underwater Abyss',
    description: 'Deep sea exploration (coming soon)',
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
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
      });
    } else {
      setTimeout(() => {
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
      }, 0);
    }
  }, []);

  const setTheme = (theme: ThemeId) => {
    if (!themes.find((t) => t.id === theme)?.available) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTheme(theme);
      if (mounted) {
        localStorage.setItem('portfolio-theme', theme);
      }
      setTimeout(() => setIsTransitioning(false), 300);
    }, 300);
  };

  const toggleEffects = () => {
    const newState = !isEffectsEnabled;
    setIsEffectsEnabled(newState);
    if (mounted) {
      localStorage.setItem('portfolio-effects', String(newState));
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