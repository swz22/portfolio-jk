'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Navigation } from './navigation';
import { Footer } from './footer';
import { ThemeProvider } from '@/contexts/theme-context';

const LoadingScreen = dynamic(
  () =>
    import('@/components/ui/loading-screen').then((mod) => mod.LoadingScreen),
  {
    ssr: false,
  }
);

const ScrollProgress = dynamic(
  () =>
    import('@/components/ui/scroll-progress').then((mod) => mod.ScrollProgress),
  {
    ssr: false,
  }
);

interface LayoutWrapperProps {
  children: ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <ScrollProgress />
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
