"use client";

import { motion } from "framer-motion";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { PathText } from "../TextEffects/PathText";
import { ShaderVideo } from "../VideoEffects/ShaderVideo";

export function ProjectsHero() {
  return (
    <Section size="lg" className="relative min-h-[60vh] flex items-center">
      {/* Background Video */}
      <div className="absolute inset-0 -z-10">
        <ShaderVideo
          src="/videos/projects-montage.mp4"
          className="w-full h-full"
          overlay={true}
          parallax={true}
        />
      </div>
      
      <Container>
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <PathText
            text="Our Portfolio"
            className="text-sm font-medium text-emerald-400 uppercase tracking-wider mb-4"
          />
          
          <motion.h1
            className="text-5xl md:text-7xl font-display font-light text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transforming Spaces,
            <span className="block text-emerald-400 mt-2">Creating Experiences</span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-neutral-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore our portfolio of premium outdoor installations that blend 
            innovative design with sustainable materials to create unforgettable spaces.
          </motion.p>
        </motion.div>
      </Container>
    </Section>
  );
}