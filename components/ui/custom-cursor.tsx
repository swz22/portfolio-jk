'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMounted } from '@/hooks/use-mounted';

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const mounted = useMounted();
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!mounted) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick !== null ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handlePointerOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handlePointerOver);
    };
  }, [cursorX, cursorY, mounted]);

  if (!mounted) return null;

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return null;

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className={cn(
          'fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] transition-transform duration-100',
          isPointer ? 'scale-150' : 'scale-100'
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <div className="relative w-full h-full">
          <div
            className={cn(
              'absolute inset-0 rounded-full transition-all duration-300',
              isPointer 
                ? 'bg-primary/20 scale-150' 
                : 'bg-primary/10'
            )}
          />
          <div className="absolute inset-2 rounded-full bg-primary" />
        </div>
      </motion.div>
    </>
  );
}