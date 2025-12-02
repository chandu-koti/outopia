"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Box, Sphere } from "@react-three/drei";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { MorphingNumber } from "../NumberEffects/MorphingNumber";
import Image from "next/image";

const timelineEvents = [
  {
    year: 2015,
    title: "Foundation",
    description: "Started with a vision to revolutionize outdoor furniture",
    milestone: "First Workshop",
    color: "#10B981",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop",
  },
  {
    year: 2017,
    title: "Innovation",
    description: "Launched our modular furniture system",
    milestone: "Patent Filed",
    color: "#3B82F6",
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=600&h=400&fit=crop",
  },
  {
    year: 2019,
    title: "Expansion",
    description: "Opened manufacturing facility in Hyderabad",
    milestone: "100+ Projects",
    color: "#F59E0B",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&h=400&fit=crop",
  },
  {
    year: 2021,
    title: "Sustainability",
    description: "Achieved carbon-neutral production",
    milestone: "Green Certified",
    color: "#8B5CF6",
    image: "https://images.unsplash.com/photo-1536859975388-b5e6623e9223?w=600&h=400&fit=crop",
  },
  {
    year: 2024,
    title: "Future Forward",
    description: "Launched AI-powered design studio",
    milestone: "500+ Clients",
    color: "#EC4899",
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=400&fit=crop",
  },
];

function Timeline3D({ scrollProgress }: { scrollProgress: any }) {
  const activeIndex = useTransform(
    scrollProgress,
    [0, 1],
    [0, timelineEvents.length - 1]
  );

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {timelineEvents.map((event, index) => (
        <Float
          key={event.year}
          speed={2 + index * 0.5}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <group position={[index * 3 - 6, 0, 0]}>
            <Box args={[1, 1, 1]} position={[0, 0, 0]}>
              <meshPhysicalMaterial
                color={event.color}
                metalness={0.8}
                roughness={0.2}
                envMapIntensity={1}
              />
            </Box>
            <Sphere args={[0.3, 32, 32]} position={[0, 1.5, 0]}>
              <meshPhysicalMaterial
                color={event.color}
                metalness={1}
                roughness={0.1}
                emissive={event.color}
                emissiveIntensity={0.5}
              />
            </Sphere>
          </group>
        </Float>
      ))}
    </Canvas>
  );
}

export function InteractiveTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section size="xl" className="relative">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-light mb-4">
            Our Journey
          </h2>
          <p className="text-xl text-neutral-600">
            A decade of innovation and growth
          </p>
        </motion.div>

        {/* 3D Timeline Background */}
        <div className="absolute inset-0 h-96 -z-10 opacity-20">
          <Timeline3D scrollProgress={scrollYProgress} />
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Progress Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-neutral-200 -translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-emerald-500 to-blue-500"
              style={{ height: lineWidth }}
            />
          </div>

          {/* Timeline Events */}
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              className={`relative flex items-center mb-24 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className="relative mb-4">
                  <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                </div>
                <div className="text-4xl font-display font-light mb-2">
                  <MorphingNumber value={event.year} />
                </div>
                <h3 className="text-2xl font-medium mb-2" style={{ color: event.color }}>
                  {event.title}
                </h3>
                <p className="text-neutral-600 mb-3">{event.description}</p>
                <span className="inline-block px-4 py-2 bg-neutral-100 rounded-full text-sm font-medium">
                  {event.milestone}
                </span>
              </div>

              {/* Center Dot */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white z-10"
                style={{ backgroundColor: event.color }}
                whileInView={{ scale: [0, 1.2, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}