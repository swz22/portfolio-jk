'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { ReactNode, Suspense } from 'react';

interface SceneProps {
  children: ReactNode;
  className?: string;
}

const cameraConfig = {
  fov: 45,
  near: 0.1,
  far: 1000,
  position: [0, 0, 5] as [number, number, number],
};

const rendererConfig = {
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance' as WebGLPowerPreference,
};

export function Scene({ children, className }: SceneProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{
          fov: cameraConfig.fov,
          near: cameraConfig.near,
          far: cameraConfig.far,
          position: cameraConfig.position,
        }}
        gl={{
          antialias: rendererConfig.antialias,
          alpha: rendererConfig.alpha,
          powerPreference: rendererConfig.powerPreference,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
