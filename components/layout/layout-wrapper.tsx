'use client';

import { ReactNode, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Navigation } from './navigation';
import { Footer } from './footer';
import { ThemeProvider } from '@/contexts/theme-context';
import { PerformanceProvider } from '@/contexts/performance-context';

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

const PerformanceMonitor = dynamic(
  () =>
    import('@/components/ui/performance-monitor').then((mod) => mod.PerformanceMonitor),
  {
    ssr: false,
  }
);

const Breadcrumb = dynamic(
  () =>
    import('@/components/ui/breadcrumb').then((mod) => mod.Breadcrumb),
  {
    ssr: false,
  }
);

const MinimalLoader = () => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
  </div>
);

interface LayoutWrapperProps {
  children: ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <PerformanceProvider>
      <ThemeProvider>
        <Suspense fallback={<MinimalLoader />}>
          <LoadingScreen />
        </Suspense>
        <Suspense fallback={null}>
          <ScrollProgress />
        </Suspense>
        <Suspense fallback={null}>
          <PerformanceMonitor />
        </Suspense>
        <Suspense fallback={null}>
          <Breadcrumb />
        </Suspense>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </ThemeProvider>
    </PerformanceProvider>
  );
}