'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { useState } from 'react';

function Neuron({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const pulseSpeed = useMemo(() => Math.random() * 2 + 1, []);

  useFrame((state) => {
    if (meshRef.current && lightRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.5 + 0.5;
      meshRef.current.scale.setScalar(0.4 + pulse * 0.2);
      lightRef.current.intensity = 0.5 + pulse * 0.5;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshPhysicalMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
      <pointLight ref={lightRef} color="#00ffff" intensity={0.5} distance={3} />
    </group>
  );
}

function Connection({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const { position, rotation, scale } = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const midpoint = new THREE.Vector3().lerpVectors(startVec, endVec, 0.5);
    const distance = startVec.distanceTo(endVec);

    const direction = new THREE.Vector3()
      .subVectors(endVec, startVec)
      .normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction
    );

    return {
      position: [midpoint.x, midpoint.y, midpoint.z] as [
        number,
        number,
        number,
      ],
      rotation: quaternion,
      scale: [0.02, distance, 0.02] as [number, number, number],
    };
  }, [start, end]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} quaternion={rotation} scale={scale}>
      <cylinderGeometry args={[1, 1, 1, 8]} />
      <meshBasicMaterial
        color="#00ffff"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  const network = useMemo(() => {
    const neurons: [number, number, number][] = [];
    const connections: {
      start: [number, number, number];
      end: [number, number, number];
    }[] = [];

    // Reduced complexity for better performance
    const layers = [
      { count: 2, x: -3 },
      { count: 3, x: -1 },
      { count: 4, x: 1 },
      { count: 3, x: 3 },
      { count: 2, x: 5 },
    ];

    const layerNeurons: [number, number, number][][] = [];

    layers.forEach((layer) => {
      const layerPositions: [number, number, number][] = [];
      for (let i = 0; i < layer.count; i++) {
        const y = (i - layer.count / 2) * 1.5;
        const z = (Math.random() - 0.5) * 2;
        const pos: [number, number, number] = [layer.x, y, z];
        neurons.push(pos);
        layerPositions.push(pos);
      }
      layerNeurons.push(layerPositions);
    });

    // Reduced connections for performance
    for (let i = 0; i < layerNeurons.length - 1; i++) {
      const currentLayer = layerNeurons[i];
      const nextLayer = layerNeurons[i + 1];

      currentLayer.forEach((neuron) => {
        const connectionCount = Math.floor(Math.random() * 2) + 1;
        const shuffled = [...nextLayer].sort(() => Math.random() - 0.5);

        for (let j = 0; j < Math.min(connectionCount, shuffled.length); j++) {
          connections.push({
            start: neuron,
            end: shuffled[j],
          });
        }
      });
    }

    return { neurons, connections };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {network.neurons.map((pos, i) => (
        <Neuron key={`neuron-${i}`} position={pos} />
      ))}
      {network.connections.map((conn, i) => (
        <Connection key={`conn-${i}`} start={conn.start} end={conn.end} />
      ))}
    </group>
  );
}

function BackgroundParticles() {
  const mesh = useRef<THREE.Points>(null);
  const count = 200; // Reduced from 500

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const color = new THREE.Color();
      color.setHSL(0.5 + Math.random() * 0.1, 1, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.min(Math.random() * 0.08 + 0.04, 0.1);
    }

    return { positions, colors, sizes };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particles.sizes.length}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
}

export function NeuralTheme() {
  const [dpr, setDpr] = useState(1);

  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        camera={{
          position: [0, 0, 12],
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          powerPreference: 'high-performance',
        }}
        dpr={dpr}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(0.5)}
          onIncline={() => setDpr(1)}
          flipflops={3}
          onFallback={() => setDpr(0.5)}
        />

        <Suspense fallback={null}>
          <color attach="background" args={['#000510']} />
          <fog attach="fog" args={['#000510', 10, 30]} />

          <ambientLight intensity={0.1} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.5}
            color="#0080ff"
          />
          <directionalLight
            position={[-10, -10, -5]}
            intensity={0.3}
            color="#00ffff"
          />

          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
            <NeuralNetwork />
          </Float>

          <BackgroundParticles />

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minDistance={8}
            maxDistance={20}
            rotateSpeed={0.5}
            autoRotate
            autoRotateSpeed={0.3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
