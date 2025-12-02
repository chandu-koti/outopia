"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { 
  PerspectiveCamera, 
  OrbitControls, 
  Environment,
  ContactShadows,
  Center,
  Html
} from "@react-three/drei";
import { GLTFProductModel } from "./GLTFProductModel";
import { MaterialSelector } from "./MaterialSelector";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ProductViewer3DProps {
  productId: string;
  className?: string;
}

export function ProductViewer3D({ productId, className = "" }: ProductViewer3DProps) {
  const [selectedMaterial, setSelectedMaterial] = useState('default');
  const [isLoading, setIsLoading] = useState(true);

  const materials = [
    { id: 'default', name: 'Natural Wood', color: '#8B6B47' },
    { id: 'dark', name: 'Dark Oak', color: '#3E2723' },
    { id: 'light', name: 'Light Maple', color: '#F5DEB3' },
    { id: 'metal', name: 'Steel Frame', color: '#708090' },
  ];

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          preserveDrawingBuffer: true,
        }}
      >
        <Suspense 
          fallback={
            <Html center>
              <div className="flex items-center gap-2 text-white">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading 3D Model...</span>
              </div>
            </Html>
          }
        >
          <PerspectiveCamera
            makeDefault
            position={[3, 2, 5]}
            fov={45}
          />
          
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
          
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} />
          
          {/* Product Model */}
          <GLTFProductModel 
            productId={productId}
            material={selectedMaterial}
            onLoad={() => setIsLoading(false)}
          />
          
          {/* Shadows */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.5}
            scale={10}
            blur={2}
            far={4}
          />
          
          {/* Environment */}
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
      
      {/* Material Selector */}
      <motion.div
        className="absolute bottom-4 left-4 right-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ delay: 0.5 }}
      >
        <MaterialSelector
          materials={materials}
          selected={selectedMaterial}
          onChange={setSelectedMaterial}
        />
      </motion.div>
      
      {/* AR Preview Button */}
      <motion.button
        className="absolute top-4 right-4 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-cursor="hover"
      >
        View in AR
      </motion.button>
    </div>
  );
}