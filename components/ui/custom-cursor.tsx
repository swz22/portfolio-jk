'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
      setIsVisible(true);
    }

    const cursor = cursorRef.current;
    if (!cursor || isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
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
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <div
        ref={cursorRef}
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 opacity-0 will-change-transform',
          isPointer ? 'scale-150' : 'scale-100'
        )}
        style={{
          transition: 'scale 0.2s ease',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="relative h-full w-full">
          <div
            className={cn(
              'absolute inset-0 rounded-full',
              isPointer ? 'scale-150 bg-primary/20' : 'bg-primary/10'
            )}
          />
          <div className="absolute inset-2 rounded-full bg-primary" />
        </div>
      </div>
    </>
  );
}
