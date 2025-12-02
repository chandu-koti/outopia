"use client";

import { motion } from "framer-motion";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { PathText } from "../TextEffects/PathText";

export function ProductsHero({ brand }: { brand: string }) {
  return (
    <Section size="md" className="relative bg-gradient-to-b from-neutral-50 to-white">
      <Container>
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <PathText
            text={` ${brand} Premium Collection `}
            className="text-sm font-medium uppercase text-emerald-600 uppercase tracking-wider mb-4"
          />

          <motion.h1
            className="text-5xl md:text-7xl font-display font-light mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Outdoor Furniture
            <span className="block text-emerald-600 mt-2">Redefined</span>
          </motion.h1>

          <motion.p
            className="text-xl text-neutral-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover our complete range of premium outdoor solutions,
            from elegant seating to innovative play equipment, all designed
            with modularity and sustainability at heart.
          </motion.p>
        </motion.div>
      </Container>
    </Section>
  );
}