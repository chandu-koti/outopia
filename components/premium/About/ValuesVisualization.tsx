"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Box, Sphere, Torus } from "@react-three/drei";
import { motion } from "framer-motion";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { useRef } from "react";
import { Group } from "three";

const values = [
  {
    title: "Innovation",
    description: "Pushing boundaries in outdoor design",
    color: "#10B981",
    position: [-3, 0, 0] as [number, number, number],
    shape: "box",
  },
  {
    title: "Sustainability",
    description: "Protecting our planet for future generations",
    color: "#3B82F6",
    position: [0, 0, 0] as [number, number, number],
    shape: "sphere",
  },
  {
    title: "Quality",
    description: "Uncompromising standards in every detail",
    color: "#F59E0B",
    position: [3, 0, 0] as [number, number, number],
    shape: "torus",
  },
];

function Value3D({ value, index }: { value: any; index: number }) {
  const groupRef = useRef<Group>(null);

  return (
    <group ref={groupRef} position={value.position}>
      {value.shape === "box" && (
        <Box args={[1, 1, 1]}>
          <meshPhysicalMaterial
            color={value.color}
            metalness={0.8}
            roughness={0.2}
            envMapIntensity={1}
          />
        </Box>
      )}
      {value.shape === "sphere" && (
        <Sphere args={[0.6, 32, 32]}>
          <meshPhysicalMaterial
            color={value.color}
            metalness={0.8}
            roughness={0.2}
            envMapIntensity={1}
          />
        </Sphere>
      )}
      {value.shape === "torus" && (
        <Torus args={[0.5, 0.2, 16, 32]}>
          <meshPhysicalMaterial
            color={value.color}
            metalness={0.8}
            roughness={0.2}
            envMapIntensity={1}
          />
        </Torus>
      )}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {value.title}
      </Text>
    </group>
  );
}

export function ValuesVisualization() {
  return (
    <Section size="lg" className="relative">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-light mb-4">
            Our Core Values
          </h2>
          <p className="text-xl text-neutral-600">
            The principles that guide everything we do
          </p>
        </motion.div>

        {/* 3D Values Visualization */}
        <div className="h-96 mb-16">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
            {values.map((value, index) => (
              <Value3D key={value.title} value={value} index={index} />
            ))}
          </Canvas>
        </div>

        {/* Values Details */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${value.color}20` }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div
                  className="w-12 h-12 rounded-full"
                  style={{ backgroundColor: value.color }}
                />
              </motion.div>
              <h3 className="text-2xl font-medium mb-3" style={{ color: value.color }}>
                {value.title}
              </h3>
              <p className="text-neutral-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}