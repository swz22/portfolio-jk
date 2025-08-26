'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface PerformanceContextType {
  quality: 'low' | 'medium' | 'high';
  setQuality: (quality: 'low' | 'medium' | 'high') => void;
  fps: number;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(
  undefined
);

export function PerformanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('high');
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        const currentFps = Math.round(
          (frameCount * 1000) / (currentTime - lastTime)
        );
        setFps(currentFps);

        // Auto-adjust quality based on FPS
        if (currentFps < 30 && quality !== 'low') {
          setQuality('low');
        } else if (currentFps < 45 && quality === 'high') {
          setQuality('medium');
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [quality]);

  return (
    <PerformanceContext.Provider value={{ quality, setQuality, fps }}>
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
