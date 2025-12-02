"use client";

import { useRef, Suspense } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { Plane } from "@react-three/drei";
import { Mesh } from "three";

// Simplified WebGL Mesh Component without texture loading
function DistortionMesh({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Plane ref={meshRef} args={[5, 3]}>
      <meshPhysicalMaterial
        color={isHovered ? "#10B981" : "#3B82F6"}
        metalness={0.8}
        roughness={0.2}
        opacity={0.3}
        transparent
      />
    </Plane>
  );
}

interface ProjectCardProps {
  project: any;
  isHovered: boolean;
  index: number;
}

export function ProjectCard({ project, isHovered, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
    
    rotateX.set(x * 10);
    rotateY.set(y * 10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
    >
      <Link href={`/projects/${project.id}`} className="block">
        {/* Image Container with WebGL Effect */}
        <div className="relative h-80 overflow-hidden rounded-2xl bg-neutral-200">
          {/* Fallback image for non-WebGL */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-0"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* WebGL Canvas */}
          <Canvas
            className="absolute inset-0 opacity-50"
            camera={{ position: [0, 0, 5], fov: 50 }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={0.5} />
              <DistortionMesh isHovered={isHovered} />
            </Suspense>
          </Canvas>
          
          {/* Overlay Content */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Project Details */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: isHovered ? 0 : 20, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-medium text-emerald-400 mb-2">
              {project.category}
            </p>
            <h3 className="text-2xl font-display font-light mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-neutral-300 line-clamp-2">
              {project.description}
            </p>
          </motion.div>
        </div>
        
        {/* Cinematic Reveal Effect */}
        <motion.div
          className="absolute inset-0 bg-white pointer-events-none"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            ease: [0.77, 0, 0.175, 1],
          }}
          style={{ transformOrigin: "top" }}
        />
      </Link>
    </motion.div>
  );
}