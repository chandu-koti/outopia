"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, BufferGeometry, Float32BufferAttribute } from "three";
import { MeshDistortMaterial } from "@react-three/drei";

interface MorphingGeometryProps {
  position?: [number, number, number];
  scale?: number;
}

export function MorphingGeometry({ 
  position = [0, 0, 0], 
  scale = 1 
}: MorphingGeometryProps) {
  const meshRef = useRef<Mesh>(null);
  const time = useRef(0);

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    const vertices = [];
    const size = 2;
    const segments = 32;

    // Create a morphing cube-sphere hybrid
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      for (let j = 0; j <= segments; j++) {
        const phi = (j / segments) * Math.PI;
        
        // Sphere coordinates
        const x = size * Math.sin(phi) * Math.cos(theta);
        const y = size * Math.sin(phi) * Math.sin(theta);
        const z = size * Math.cos(phi);
        
        vertices.push(x, y, z);
      }
    }

    geo.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    geo.computeVertexNormals();
    
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    time.current += delta;
    
    // Rotate the mesh
    meshRef.current.rotation.x = Math.sin(time.current * 0.3) * 0.2;
    meshRef.current.rotation.y = time.current * 0.2;
    
    // Morph between shapes
    const positions = meshRef.current.geometry.attributes.position;
    const count = positions.count;
    
    for (let i = 0; i < count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      
      // Create morphing effect
      const morphFactor = Math.sin(time.current + i * 0.01) * 0.1;
      const newX = x * (1 + morphFactor);
      const newY = y * (1 + morphFactor);
      const newZ = z * (1 + morphFactor);
      
      positions.setXYZ(i, newX, newY, newZ);
    }
    
    positions.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      geometry={geometry}
    >
      <MeshDistortMaterial
        color="#10B981"
        metalness={0.8}
        roughness={0.2}
        distort={0.3}
        speed={2}
        envMapIntensity={1}
      />
    </mesh>
  );
}