import { useState, useEffect } from 'react';
import { throttle } from '@/lib/utils';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = throttle(() => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const currentProgress =
        scrollHeight > 0 ? (scrollPosition / scrollHeight) * 100 : 0;
      setProgress(currentProgress);
    }, 16);

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return progress;
}
