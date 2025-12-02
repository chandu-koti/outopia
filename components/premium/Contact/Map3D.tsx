"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Sphere, Text } from "@react-three/drei";
import { motion } from "framer-motion";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { MapPin, Navigation } from "lucide-react";

function MapScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Ground plane */}
      <Box args={[20, 0.1, 20]} position={[0, -2, 0]}>
        <meshPhysicalMaterial color="#E5E5E5" roughness={0.8} />
      </Box>
      
      {/* Office building */}
      <group position={[0, 0, 0]}>
        <Box args={[3, 4, 3]} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            color="#10B981"
            metalness={0.5}
            roughness={0.3}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Box>
        
        {/* Building details */}
        {[...Array(3)].map((_, floor) => (
          <group key={floor}>
            {[...Array(3)].map((_, window) => (
              <Box
                key={window}
                args={[0.6, 0.8, 0.1]}
                position={[window - 1, floor - 0.5, 1.51]}
              >
                <meshPhysicalMaterial
                  color="#3B82F6"
                  metalness={0.9}
                  roughness={0.1}
                  opacity={0.8}
                  transparent
                />
              </Box>
            ))}
          </group>
        ))}
        
        {/* Location pin */}
        <group position={[0, 3, 0]}>
          <Sphere args={[0.3, 32, 32]} position={[0, 0, 0]}>
            <meshPhysicalMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={0.5} />
          </Sphere>
          <Box args={[0.1, 1, 0.1]} position={[0, -0.5, 0]}>
            <meshPhysicalMaterial color="#EC4899" />
          </Box>
        </group>
        
        <Text
          position={[0, 4, 0]}
          fontSize={0.5}
          color="#1F2937"
          anchorX="center"
          anchorY="middle"
        >
          INFRASCAPES HQ
        </Text>
      </group>
      
      {/* Surrounding buildings */}
      {[
        { pos: [-6, 0, -3] as [number, number, number], height: 2, color: "#A3A3A3" },
        { pos: [6, 0, -2] as [number, number, number], height: 3, color: "#A3A3A3" },
        { pos: [-4, 0, 5] as [number, number, number], height: 2.5, color: "#A3A3A3" },
        { pos: [5, 0, 4] as [number, number, number], height: 2, color: "#A3A3A3" },
      ].map((building, i) => (
        <Box
          key={i}
          args={[2, building.height, 2]}
          position={building.pos}
        >
          <meshPhysicalMaterial color={building.color} roughness={0.9} />
        </Box>
      ))}
      
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={15}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export function Map3D() {
  return (
    <Section size="lg" className="bg-neutral-50">
      <Container>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-light mb-4">
            Visit Our Showroom
          </h2>
          <p className="text-xl text-neutral-600">
            Experience our products firsthand at our state-of-the-art facility
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* 3D Map */}
          <motion.div
            className="h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Canvas camera={{ position: [10, 10, 10], fov: 45 }}>
              <MapScene />
            </Canvas>
          </motion.div>
          
          {/* Location Details */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h3 className="text-2xl font-medium mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-emerald-500" />
                Headquarters & Showroom
              </h3>
              <address className="text-neutral-600 not-italic leading-relaxed">
                Infrascapes Private Limited<br />
                Plot No. 123, Phase II<br />
                IDA Jeedimetla<br />
                Hyderabad, Telangana 500055<br />
                India
              </address>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Showroom Hours</h4>
              <div className="space-y-2 text-neutral-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>By Appointment</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <motion.a
                href="https://goo.gl/maps/example"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </motion.a>
              
              <motion.button
                className="px-6 py-3 border-2 border-neutral-300 rounded-full font-medium hover:border-emerald-500 hover:text-emerald-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Visit
              </motion.button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}