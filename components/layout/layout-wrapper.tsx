'use client';

import { ReactNode } from 'react';
import { Navigation } from './navigation';
import { Footer } from './footer';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { CustomCursor } from '@/components/ui/custom-cursor';

interface LayoutWrapperProps {
  children: ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navigation />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer />
    </>
  );
}
