import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  isLowPerformance: boolean;
}

export function usePerformanceMonitor(threshold = 30) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    isLowPerformance: false,
  });

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationId = useRef<number>();

  useEffect(() => {
    const measurePerformance = () => {
      frameCount.current++;
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime.current;

      if (deltaTime >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / deltaTime);
        const frameTime = deltaTime / frameCount.current;
        const isLowPerformance = fps < threshold;

        setMetrics({ fps, frameTime, isLowPerformance });

        frameCount.current = 0;
        lastTime.current = currentTime;
      }

      animationId.current = requestAnimationFrame(measurePerformance);
    };

    animationId.current = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [threshold]);

  return metrics;
}

export function useAdaptiveQuality() {
  const { isLowPerformance } = usePerformanceMonitor();
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');

  useEffect(() => {
    if (isLowPerformance) {
      setQuality((prev) => (prev === 'high' ? 'medium' : 'low'));
    }
  }, [isLowPerformance]);

  return quality;
}
