'use client';

import { useRef } from 'react';
import { Text3D, Center, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingTextProps {
  text: string;
  size?: number;
  height?: number;
  color?: string;
  emissive?: string;
  floatIntensity?: number;
  floatSpeed?: number;
}

export function FloatingText({
  text,
  size = 0.5,
  height = 0.2,
  color = '#ffffff',
  emissive = '#4a5568',
  floatIntensity = 1,
  floatSpeed = 1,
}: FloatingTextProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={0.5}
      floatIntensity={floatIntensity}
    >
      <Center>
        <Text3D
          ref={meshRef}
          font="/fonts/helvetiker_regular.typeface.json"
          size={size}
          height={height}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {text}
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.8}
          />
        </Text3D>
      </Center>
    </Float>
  );
}
