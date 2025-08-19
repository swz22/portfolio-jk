'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useMounted } from '@/hooks/use-mounted';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) return;

    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

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
  }, [mounted]);

  if (!mounted) return null;

  const isTouchDevice =
    'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return null;

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
          'pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 will-change-transform',
          isPointer ? 'scale-150' : 'scale-100'
        )}
        style={{
          transition: 'scale 0.2s ease',
        }}
      >
        <div className="relative h-full w-full">
          <div
            className={cn(
              'absolute inset-0 rounded-full',
              isPointer ? 'bg-primary/20 scale-150' : 'bg-primary/10'
            )}
          />
          <div className="bg-primary absolute inset-2 rounded-full" />
        </div>
      </div>
    </>
  );
}
