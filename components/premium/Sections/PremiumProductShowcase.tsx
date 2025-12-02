"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { ProductViewer3D } from "../ProductViewer/ProductViewer3D";
import { PathText } from "../TextEffects/PathText";
import { GlitchText } from "../TextEffects/GlitchText";
import { AnimatedStats } from "../NumberEffects/AnimatedStats";
import { RippleButton } from "../Cards/RippleButton";
import { GlassPanel } from "../UI/GlassPanel";
import { revealVariants } from "@/lib/animations/variants";

const productStats = [
  { label: "Years Warranty", value: 5, suffix: "+" },
  { label: "Happy Clients", value: 500, suffix: "+" },
  { label: "Products", value: 150, suffix: "+" },
  { label: "Completion Rate", value: 99.8, suffix: "%", decimals: 1 },
];

export function PremiumProductShowcase() {
  const [showExploded, setShowExploded] = useState(false);

  return (
    <Section size="lg" className="relative">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            <PathText
              text="Premium Modular"
              className="text-sm font-medium text-emerald-500 uppercase tracking-wider mb-4"
              delay={0}
            />
            
            <GlitchText
              text="Outdoor Furniture"
              className="text-4xl md:text-5xl font-display font-light mb-6"
            />
            
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              Experience the future of outdoor living with our revolutionary modular 
              furniture system. Each piece is meticulously crafted to combine 
              timeless aesthetics with unparalleled functionality.
            </p>

            <GlassPanel className="p-6 mb-8" variant="light" blur="sm">
              <h3 className="text-lg font-medium mb-4">Key Features</h3>
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Weather-resistant materials with 5+ year warranty</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Modular design for endless configurations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Sustainable materials and eco-friendly production</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Tool-free assembly in under 30 minutes</span>
                </li>
              </ul>
            </GlassPanel>

            <div className="flex flex-wrap gap-4 mb-12">
              <RippleButton variant="primary" size="lg">
                View Collection
              </RippleButton>
              <RippleButton 
                variant="ghost" 
                size="lg"
                onClick={() => setShowExploded(!showExploded)}
              >
                {showExploded ? 'Hide' : 'Show'} Assembly
              </RippleButton>
            </div>

            <AnimatedStats stats={productStats} />
          </motion.div>

          {/* 3D Viewer Side */}
          <motion.div
            className="relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ProductViewer3D 
              productId="premium-chair"
              className="w-full h-full"
            />
            
            {/* Feature callouts */}
            <motion.div
              className="absolute top-4 left-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <GlassPanel className="px-3 py-2" variant="light">
                <p className="text-xs font-medium">360° View</p>
              </GlassPanel>
            </motion.div>
            
            <motion.div
              className="absolute bottom-20 right-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
            >
              <GlassPanel className="px-3 py-2" variant="light">
                <p className="text-xs font-medium">4 Material Options</p>
              </GlassPanel>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}