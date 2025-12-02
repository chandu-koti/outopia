"use client";

import { useRef, useEffect, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, useGLTF, Center, ContactShadows } from "@react-three/drei";
import { Group, MeshPhysicalMaterial, Color, Mesh } from "three";

interface GLTFProductModelProps {
  productId: string;
  material: string;
  onLoad?: () => void;
}

// Model URLs for different products - using the sheen chair as default for all
const getModelUrl = (productId: string) => {
  // In a real app, you would have different models for different products
  // For now, we'll use the same chair model for all products as a demo
  const modelMap: Record<string, string> = {
    'bench-01': "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/SheenChair.glb",
    'table-01': "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/SheenChair.glb",
    'planter-01': "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/SheenChair.glb",
    'pergola-01': "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/SheenChair.glb",
    'slide-01': "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/SheenChair.glb",
    'swing-01': "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/SheenChair.glb",
    'pull-up-01': "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/SheenChair.glb",
    'elliptical-01': "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/SheenChair.glb",
    'water-slide-01': "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/SheenChair.glb",
    'splash-pad-01': "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/SheenChair.glb",
  };
  
  return modelMap[productId] || "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/SheenChair.glb";
};

const materialConfigs = {
  default: { 
    color: new Color('#8B6B47'),
    sheen: 1,
    sheenRoughness: 0.3,
    sheenColor: new Color('#D4A574'),
    metalness: 0,
    roughness: 0.5
  },
  dark: { 
    color: new Color('#3E2723'),
    sheen: 1,
    sheenRoughness: 0.4,
    sheenColor: new Color('#8B4513'),
    metalness: 0,
    roughness: 0.6
  },
  light: { 
    color: new Color('#F5DEB3'),
    sheen: 0.8,
    sheenRoughness: 0.2,
    sheenColor: new Color('#FFF8DC'),
    metalness: 0,
    roughness: 0.4
  },
  metal: { 
    color: new Color('#708090'),
    sheen: 0.5,
    sheenRoughness: 0.1,
    sheenColor: new Color('#C0C0C0'),
    metalness: 0.8,
    roughness: 0.2
  },
};

function ChairModel({ productId, material, onLoad }: { productId: string; material: string; onLoad?: () => void }) {
  const groupRef = useRef<Group>(null);
  const modelUrl = getModelUrl(productId);
  const { scene } = useGLTF(modelUrl);
  
  const config = materialConfigs[material as keyof typeof materialConfigs] || materialConfigs.default;

  useEffect(() => {
    if (scene) {
      // Update all meshes with sheen material
      scene.traverse((child) => {
        if ((child as Mesh).isMesh) {
          const mesh = child as Mesh;
          
          // Create new material with sheen
          const sheenMaterial = new MeshPhysicalMaterial({
            color: config.color,
            metalness: config.metalness,
            roughness: config.roughness,
            sheen: config.sheen,
            sheenRoughness: config.sheenRoughness,
            sheenColor: config.sheenColor,
            envMapIntensity: 1,
            clearcoat: 0.1,
            clearcoatRoughness: 0.1,
          });
          
          mesh.material = sheenMaterial;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });
      
      // Call onLoad after material is applied
      onLoad?.();
    }
  }, [scene, config, onLoad]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 + state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={0.01} />
      </Center>
    </group>
  );
}

export function GLTFProductModel({ productId, material, onLoad }: GLTFProductModelProps) {
  return (
    <>
      <Suspense fallback={null}>
        <ChairModel productId={productId} material={material} onLoad={onLoad} />
        <Environment preset="apartment" />
      </Suspense>
      <ContactShadows 
        position={[0, -1.4, 0]} 
        opacity={0.5} 
        scale={10} 
        blur={2.5} 
        far={4} 
      />
    </>
  );
}

// Preload common models
useGLTF.preload("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/SheenChair.glb");