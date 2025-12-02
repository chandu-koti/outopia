"use client";

import { motion } from "framer-motion";
import { Scene } from "./Scene";
import { Container } from "../Layout/Container";
import { MagneticButton } from "../UI/MagneticButton";
import { revealVariants, fadeInVariants } from "@/lib/animations/variants";
import { ArrowRight, Play } from "lucide-react";

export function Hero3D() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-50 to-neutral-100">
      {/* 3D Scene Background */}
      <div className="absolute inset-0">
        <Scene />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-50/80 pointer-events-none" />
      
      {/* Content */}
      <Container className="relative z-10">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* Tagline */}
          <motion.p
            className="text-sm md:text-base font-medium text-neutral-600 uppercase tracking-wider mb-6"
            variants={fadeInVariants}
          >
            Premium Outdoor Living Solutions
          </motion.p>
          
          {/* Main heading */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-light text-neutral-900 mb-8 leading-[1.1]"
            variants={revealVariants}
          >
            Redefining
            <span className="block text-gradient font-medium mt-2">
              Outdoor Spaces
            </span>
          </motion.h1>
          
          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-12 leading-relaxed"
            variants={fadeInVariants}
          >
            Discover our premium collection of modular outdoor furniture, 
            where innovative design meets uncompromising quality to transform 
            your outdoor environment.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInVariants}
          >
            <MagneticButton size="lg" variant="primary">
              Explore Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </MagneticButton>
            
            <MagneticButton size="lg" variant="ghost">
              <Play className="mr-2 h-5 w-5" />
              Watch Showcase
            </MagneticButton>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-2 bg-neutral-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}