"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";
import { Float, Box, Sphere, Torus } from "@react-three/drei";
import { useWebGL } from "@/lib/animations/hooks/useWebGL";

export function FloatingFurniture() {
  const groupRef = useRef<Group>(null);
  const meshRef = useWebGL({ 
    enableRotation: true, 
    rotationSpeed: 0.005,
    enableFloat: true,
    floatSpeed: 0.5,
    floatIntensity: 0.2
  });

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Abstract furniture representation */}
      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={0.5}
        floatingRange={[-0.1, 0.1]}
      >
        <group position={[-2, 0, 0]}>
          <Box args={[1, 0.1, 1]} position={[0, 0.5, 0]}>
            <meshPhysicalMaterial
              color="#1E4B2A"
              metalness={0.4}
              roughness={0.3}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </Box>
          <Box args={[0.08, 0.5, 0.08]} position={[-0.4, 0, -0.4]}>
            <meshPhysicalMaterial
              color="#2C5F3A"
              metalness={0.6}
              roughness={0.2}
            />
          </Box>
          <Box args={[0.08, 0.5, 0.08]} position={[0.4, 0, -0.4]}>
            <meshPhysicalMaterial
              color="#2C5F3A"
              metalness={0.6}
              roughness={0.2}
            />
          </Box>
          <Box args={[0.08, 0.5, 0.08]} position={[-0.4, 0, 0.4]}>
            <meshPhysicalMaterial
              color="#2C5F3A"
              metalness={0.6}
              roughness={0.2}
            />
          </Box>
          <Box args={[0.08, 0.5, 0.08]} position={[0.4, 0, 0.4]}>
            <meshPhysicalMaterial
              color="#2C5F3A"
              metalness={0.6}
              roughness={0.2}
            />
          </Box>
        </group>
      </Float>

      {/* Modular elements */}
      <Float
        speed={3}
        rotationIntensity={0.8}
        floatIntensity={0.3}
        floatingRange={[-0.2, 0.2]}
      >
        <group position={[2, 0.5, 0]}>
          <Sphere args={[0.3, 32, 32]} position={[0, 0, 0]}>
            <meshPhysicalMaterial
              color="#10B981"
              metalness={0.8}
              roughness={0.1}
              envMapIntensity={1}
            />
          </Sphere>
          <Torus args={[0.5, 0.1, 16, 32]} position={[0, 0, 0]}>
            <meshPhysicalMaterial
              color="#F59E0B"
              metalness={0.7}
              roughness={0.2}
            />
          </Torus>
        </group>
      </Float>

      {/* Abstract bench */}
      <Float
        speed={2.5}
        rotationIntensity={0.6}
        floatIntensity={0.4}
        floatingRange={[-0.15, 0.15]}
      >
        <group position={[0, -0.5, 0]}>
          <Box args={[2, 0.1, 0.6]} position={[0, 0, 0]}>
            <meshPhysicalMaterial
              color="#3A734A"
              metalness={0.3}
              roughness={0.4}
              clearcoat={0.8}
            />
          </Box>
          <Box args={[0.1, 0.3, 0.6]} position={[-0.8, -0.2, 0]}>
            <meshPhysicalMaterial
              color="#2C5F3A"
              metalness={0.5}
              roughness={0.3}
            />
          </Box>
          <Box args={[0.1, 0.3, 0.6]} position={[0.8, -0.2, 0]}>
            <meshPhysicalMaterial
              color="#2C5F3A"
              metalness={0.5}
              roughness={0.3}
            />
          </Box>
        </group>
      </Float>
    </group>
  );
}