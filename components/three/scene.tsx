'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { ReactNode, Suspense } from 'react';
import { SCENE_CONFIG } from '@/constants';

interface SceneProps {
  children: ReactNode;
  className?: string;
}

export function Scene({ children, className }: SceneProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{
          fov: SCENE_CONFIG.camera.fov,
          near: SCENE_CONFIG.camera.near,
          far: SCENE_CONFIG.camera.far,
          position: SCENE_CONFIG.camera.position as [number, number, number],
        }}
        gl={{
          antialias: SCENE_CONFIG.renderer.antialias,
          alpha: SCENE_CONFIG.renderer.alpha,
          powerPreference: SCENE_CONFIG.renderer
            .powerPreference as WebGLPowerPreference,
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
