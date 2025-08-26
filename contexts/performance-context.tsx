'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsed?: number;
  jsHeapSize?: number;
}

interface PerformanceContextType {
  quality: 'low' | 'medium' | 'high';
  setQuality: (quality: 'low' | 'medium' | 'high') => void;
  metrics: PerformanceMetrics;
  isLowPerformance: boolean;
  shouldReduceMotion: boolean;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(
  undefined
);

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [quality, setQualityState] = useState<'low' | 'medium' | 'high'>(
    'high'
  );
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
  });
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setShouldReduceMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    const savedQuality = localStorage.getItem('portfolio-quality');
    if (savedQuality && ['low', 'medium', 'high'].includes(savedQuality)) {
      setQualityState(savedQuality as 'low' | 'medium' | 'high');
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const setQuality = useCallback((newQuality: 'low' | 'medium' | 'high') => {
    setQualityState(newQuality);
    localStorage.setItem('portfolio-quality', newQuality);
  }, []);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measurePerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / deltaTime);
        const avgFrameTime = deltaTime / frameCount;

        let memoryInfo: Partial<PerformanceMetrics> = {};
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          memoryInfo = {
            memoryUsed: memory.usedJSHeapSize,
            jsHeapSize: memory.jsHeapSizeLimit,
          };
        }

        setMetrics({
          fps: currentFps,
          frameTime: avgFrameTime,
          ...memoryInfo,
        });

        const lowPerf = currentFps < 30 || avgFrameTime > 33;
        setIsLowPerformance(lowPerf);

        if (currentFps < 20 && quality !== 'low') {
          setQuality('low');
        } else if (currentFps < 40 && quality === 'high') {
          setQuality('medium');
        } else if (currentFps > 55 && quality === 'low') {
          setQuality('medium');
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(measurePerformance);
    };

    animationId = requestAnimationFrame(measurePerformance);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [quality, setQuality]);

  return (
    <PerformanceContext.Provider
      value={{
        quality,
        setQuality,
        metrics,
        isLowPerformance,
        shouldReduceMotion,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within PerformanceProvider');
  }
  return context;
}
