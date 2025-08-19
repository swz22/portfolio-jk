'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import { Mesh, Color } from 'three';
import { TechItem } from '@/types';

interface SkillSphereProps {
  skill: TechItem;
  position: [number, number, number];
}

function SkillSphere({ skill, position }: SkillSphereProps) {
  const meshRef = useRef<Mesh>(null);
  const color = new Color(skill.color);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group position={position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {skill.name}
        </Text>
      </group>
    </Float>
  );
}

interface FloatingSpheresProps {
  skills: TechItem[];
}

export function FloatingSpheres({ skills }: FloatingSpheresProps) {
  const radius = 3;
  const positions: [number, number, number][] = skills.map((_, index) => {
    const angle = (index / skills.length) * Math.PI * 2;
    return [
      Math.cos(angle) * radius,
      Math.sin(index * 0.5) * 0.5,
      Math.sin(angle) * radius,
    ];
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {skills.map((skill, index) => (
        <SkillSphere
          key={skill.name}
          skill={skill}
          position={positions[index]}
        />
      ))}
    </>
  );
}
