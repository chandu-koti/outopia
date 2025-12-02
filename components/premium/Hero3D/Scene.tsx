"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { PerspectiveCamera, Environment, Float } from "@react-three/drei";
import { FloatingFurniture } from "./FloatingFurniture";
import { ParticleField } from "./ParticleField";
import { MorphingGeometry } from "./MorphingGeometry";
import { Lights } from "./Lights";
import { InteractiveCamera } from "./InteractiveCamera";
import { PostProcessing } from "./PostProcessing";

export function Scene() {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 2]}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 8]}
          fov={45}
          near={0.1}
          far={100}
        />
        
        <InteractiveCamera />
        
        <Lights />
        
        <FloatingFurniture />
        
        {/* Morphing geometries showing modularity */}
        <Float
          speed={2}
          rotationIntensity={0.3}
          floatIntensity={0.5}
        >
          <MorphingGeometry position={[-3, 1, -2]} scale={0.5} />
        </Float>
        
        <Float
          speed={3}
          rotationIntensity={0.5}
          floatIntensity={0.3}
        >
          <MorphingGeometry position={[3, -1, -1]} scale={0.3} />
        </Float>
        
        <ParticleField count={100} />
        
        <Environment preset="studio" blur={0.8} />
        
        <PostProcessing />
      </Suspense>
    </Canvas>
  );
}