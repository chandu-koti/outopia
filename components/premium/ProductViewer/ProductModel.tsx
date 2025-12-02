"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";
import { Box, Cylinder } from "@react-three/drei";

interface ProductModelProps {
  productId: string;
  material: string;
  onLoad?: () => void;
}

const materialConfigs = {
  default: { color: '#8B6B47', metalness: 0.1, roughness: 0.8 },
  dark: { color: '#3E2723', metalness: 0.2, roughness: 0.7 },
  light: { color: '#F5DEB3', metalness: 0.05, roughness: 0.9 },
  metal: { color: '#708090', metalness: 0.9, roughness: 0.2 },
};

export function ProductModel({ productId, material, onLoad }: ProductModelProps) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    // Simulate model loading
    const timer = setTimeout(() => {
      onLoad?.();
    }, 500);
    return () => clearTimeout(timer);
  }, [onLoad]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const config = materialConfigs[material as keyof typeof materialConfigs] || materialConfigs.default;

  // Simple chair model for demonstration
  return (
    <group
      ref={groupRef}
    >
      {/* Seat */}
      <Box
        ref={meshRef}
        args={[2, 0.1, 2]}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={config.color}
          metalness={config.metalness}
          roughness={config.roughness}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
        />
      </Box>
      
      {/* Backrest */}
      <Box
        args={[2, 1.5, 0.1]}
        position={[0, 0.75, -0.95]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={config.color}
          metalness={config.metalness}
          roughness={config.roughness}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
        />
      </Box>
      
      {/* Legs */}
      {[[-0.9, -0.9], [0.9, -0.9], [-0.9, 0.9], [0.9, 0.9]].map(([x, z], i) => (
        <Cylinder
          key={i}
          args={[0.05, 0.05, 1.5]}
          position={[x, -0.75, z]}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color={material === 'metal' ? config.color : '#404040'}
            metalness={0.8}
            roughness={0.3}
          />
        </Cylinder>
      ))}
      
      {/* Armrests */}
      {[-1.1, 1.1].map((x, i) => (
        <Box
          key={i}
          args={[0.1, 0.5, 1.8]}
          position={[x, 0.25, 0]}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color={config.color}
            metalness={config.metalness}
            roughness={config.roughness}
            clearcoat={0.5}
            clearcoatRoughness={0.3}
          />
        </Box>
      ))}
    </group>
  );
}