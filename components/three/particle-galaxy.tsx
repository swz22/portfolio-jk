'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/use-mouse-position';

interface ParticleGalaxyProps {
  count?: number;
  size?: number;
  radius?: number;
  branches?: number;
  spin?: number;
  randomness?: number;
  randomnessPower?: number;
  insideColor?: string;
  outsideColor?: string;
}

export function ParticleGalaxy({
  count = 5000,
  size = 0.01,
  radius = 5,
  branches = 3,
  spin = 1,
  randomness = 0.2,
  randomnessPower = 3,
  insideColor = '#ff6030',
  outsideColor = '#1b3984',
}: ParticleGalaxyProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const mousePosition = useMousePosition();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorInside = new THREE.Color(insideColor);
    const colorOutside = new THREE.Color(outsideColor);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const radiusValue = Math.random() * radius;
      const spinAngle = radiusValue * spin;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;

      const randomX =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radiusValue;
      const randomY =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radiusValue;
      const randomZ =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radiusValue;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radiusValue + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] =
        Math.sin(branchAngle + spinAngle) * radiusValue + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radiusValue / radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, [
    count,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor,
  ]);

  useFrame((state) => {
    if (!particlesRef.current) return;

    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;

    const targetRotationX = mousePosition.normalizedY * 0.1;
    const targetRotationZ = mousePosition.normalizedX * 0.1;

    particlesRef.current.rotation.x +=
      (targetRotationX - particlesRef.current.rotation.x) * 0.05;
    particlesRef.current.rotation.z +=
      (targetRotationZ - particlesRef.current.rotation.z) * 0.05;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
