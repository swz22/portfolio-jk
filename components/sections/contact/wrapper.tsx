'use client';

import dynamic from 'next/dynamic';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useRef } from 'react';

const Contact = dynamic(() => import('./index'), {
  loading: () => (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading contact...</p>
          </div>
        </div>
      </div>
    </section>
  ),
});

export function ContactWrapper() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.1,
    rootMargin: '50px',
  });

  return (
    <div ref={ref}>
      {isVisible ? (
        <Contact />
      ) : (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="h-[400px]" />
          </div>
        </section>
      )}
    </div>
  );
}
