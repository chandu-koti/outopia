"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Text, Center, Box } from "@react-three/drei";
import { motion } from "framer-motion";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { Suspense } from "react";
import Image from "next/image";

function Hero3DText() {
  return (
    <Center>
      <Float
        speed={2}
        rotationIntensity={0.3}
        floatIntensity={0.5}
      >
        <group>
          {/* Create INFRASCAPES with 3D boxes instead of text */}
          <group position={[0, 0, 0]}>
            {/* Letter I */}
            <Box args={[0.1, 1, 0.1]} position={[-2.5, 0, 0]}>
              <meshPhysicalMaterial
                color="#10B981"
                metalness={0.8}
                roughness={0.2}
                clearcoat={1}
              />
            </Box>
            
            {/* Letter N (simplified) */}
            <Box args={[0.1, 1, 0.1]} position={[-2, 0, 0]}>
              <meshPhysicalMaterial color="#10B981" metalness={0.8} roughness={0.2} />
            </Box>
            <Box args={[0.5, 0.1, 0.1]} position={[-1.75, 0.2, 0]} rotation={[0, 0, -0.5]}>
              <meshPhysicalMaterial color="#10B981" metalness={0.8} roughness={0.2} />
            </Box>
            <Box args={[0.1, 1, 0.1]} position={[-1.5, 0, 0]}>
              <meshPhysicalMaterial color="#10B981" metalness={0.8} roughness={0.2} />
            </Box>
            
            {/* Abstract shapes for the rest */}
            <Box args={[0.3, 0.3, 0.3]} position={[-0.5, 0, 0]} rotation={[0.3, 0.5, 0]}>
              <meshPhysicalMaterial
                color="#3B82F6"
                metalness={0.9}
                roughness={0.1}
                emissive="#3B82F6"
                emissiveIntensity={0.2}
              />
            </Box>
            
            <Box args={[0.2, 0.5, 0.2]} position={[0.5, 0, 0]} rotation={[0, 0.7, 0]}>
              <meshPhysicalMaterial
                color="#F59E0B"
                metalness={0.9}
                roughness={0.1}
                emissive="#F59E0B"
                emissiveIntensity={0.2}
              />
            </Box>
            
            <Box args={[0.4, 0.4, 0.4]} position={[1.5, 0, 0]} rotation={[-0.3, 0.3, 0.5]}>
              <meshPhysicalMaterial
                color="#8B5CF6"
                metalness={0.9}
                roughness={0.1}
                emissive="#8B5CF6"
                emissiveIntensity={0.2}
              />
            </Box>
          </group>
        </group>
      </Float>
    </Center>
  );
}

export function AboutHero() {
  return (
    <Section size="lg" className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop"
          alt="About Hero Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Hero3DText />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/90 -z-10" />
      
      <Container>
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-sm font-medium text-emerald-600 uppercase tracking-wider mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Est. 2015
          </motion.p>
          
          <motion.h1
            className="text-5xl md:text-7xl font-display font-light mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Crafting Outdoor
            <span className="block text-emerald-600 mt-2">Excellence</span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            For nearly a decade, we've been transforming outdoor spaces into 
            extraordinary experiences through innovative design, sustainable 
            materials, and uncompromising quality.
          </motion.p>
        </motion.div>
      </Container>
    </Section>
  );
}