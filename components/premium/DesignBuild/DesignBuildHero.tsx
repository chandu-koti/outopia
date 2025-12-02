"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { RippleButton } from "../Cards/RippleButton";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import { Suspense } from "react";

function FloatingCube() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhysicalMaterial
          color="#10B981"
          metalness={0.2}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}

export function DesignBuildHero() {
  return (
    <Section size="lg" className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 -z-10" />
      
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl md:text-7xl font-display font-light mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Design & Build
              <span className="text-emerald-500"> Excellence</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-neutral-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              From concept to completion, we deliver comprehensive landscape solutions that transform spaces and exceed expectations. Our integrated design-build approach ensures seamless execution of your vision.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <RippleButton size="lg" variant="primary">
                Start Your Project
              </RippleButton>
              <RippleButton size="lg" variant="secondary">
                View Portfolio
              </RippleButton>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div>
                <div className="text-3xl font-light text-emerald-500">500+</div>
                <div className="text-sm text-neutral-600">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-light text-emerald-500">15+</div>
                <div className="text-sm text-neutral-600">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-light text-emerald-500">100%</div>
                <div className="text-sm text-neutral-600">Client Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* 3D Visual */}
          <motion.div
            className="relative h-[500px] lg:h-[600px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 to-emerald-200/20 rounded-3xl" />
            <Canvas camera={{ position: [5, 5, 5], fov: 45 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <FloatingCube />
                <Environment preset="city" />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
              </Suspense>
            </Canvas>
            
            {/* Overlay Images */}
            <motion.div
              className="absolute top-4 left-4 w-32 h-32 rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"
                alt="Project 1"
                width={128}
                height={128}
                className="object-cover"
              />
            </motion.div>
            
            <motion.div
              className="absolute bottom-4 right-4 w-40 h-40 rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop"
                alt="Project 2"
                width={160}
                height={160}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}