"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { MagneticMenuItem } from "./MagneticMenuItem";
import { premiumNavigation } from "@/lib/premium-navigation";
import { X } from "lucide-react";

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MenuBackground() {
  return (
    <Canvas className="absolute inset-0">
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      
      <Float
        speed={1.5}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <mesh position={[-3, 2, -5]} scale={2}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color="#10B981"
            metalness={0.8}
            roughness={0.3}
            distort={0.4}
            speed={2}
            opacity={0.2}
            transparent
          />
        </mesh>
      </Float>
      
      <Float
        speed={2}
        rotationIntensity={0.3}
        floatIntensity={0.7}
      >
        <mesh position={[3, -2, -4]} scale={1.5}>
          <octahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#F59E0B"
            metalness={0.7}
            roughness={0.2}
            distort={0.3}
            speed={3}
            opacity={0.15}
            transparent
          />
        </mesh>
      </Float>
    </Canvas>
  );
}

export function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-neutral-900"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
        >
          {/* 3D Background */}
          <div className="absolute inset-0 opacity-50">
            <MenuBackground />
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/80 to-neutral-900" />
          
          {/* Close button */}
          <motion.button
            className="absolute top-8 right-8 p-4 text-white hover:text-emerald-400 transition-colors"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            data-cursor="hover"
          >
            <X className="w-8 h-8" />
          </motion.button>
          
          {/* Menu content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <nav className="text-center">
              {premiumNavigation.main.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  className="mb-8"
                >
                  <MagneticMenuItem
                    href={item.href}
                    onClick={onClose}
                    className="text-4xl md:text-6xl font-display font-light text-white hover:text-emerald-400 transition-colors"
                  >
                    {item.name}
                  </MagneticMenuItem>
                </motion.div>
              ))}
              
              {/* CTA */}
              <motion.div
                variants={itemVariants}
                className="mt-16"
              >
                <motion.a
                  href="/premium-contact"
                  className="inline-flex items-center gap-4 px-8 py-4 bg-emerald-500 text-white rounded-full font-medium text-lg hover:bg-emerald-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                >
                  Start Your Project
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </motion.div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}