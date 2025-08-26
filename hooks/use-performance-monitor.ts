import { usePerformance } from '@/contexts/performance-context';

export function usePerformanceMonitor() {
  const { metrics, isLowPerformance } = usePerformance();

  return {
    fps: metrics.fps,
    frameTime: metrics.frameTime,
    isLowPerformance,
  };
}
