"use client";

import { motion } from "framer-motion";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { GlassPanel } from "../UI/GlassPanel";
import { Shield, Leaf, Wrench, Sun, Droplets, Recycle } from "lucide-react";

const featureIcons = {
  "Weather-resistant materials": Droplets,
  "Modular design for flexible configurations": Wrench,
  "5-year warranty": Shield,
  "UV-resistant coating": Sun,
  "Tool-free assembly": Wrench,
  "Sustainable materials": Leaf,
};

interface ProductFeaturesProps {
  features: string[];
}

export function ProductFeatures({ features }: ProductFeaturesProps) {
  return (
    <Section size="lg" className="bg-neutral-50">
      <Container>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-display font-light mb-4">
            Built for Excellence
          </h2>
          <p className="text-xl text-neutral-600">
            Every detail crafted with purpose
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = featureIcons[feature as keyof typeof featureIcons] || Shield;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassPanel className="p-6 h-full hover:shadow-xl transition-shadow">
                  <motion.div
                    className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Icon className="w-7 h-7 text-emerald-500" />
                  </motion.div>
                  
                  <h3 className="text-lg font-medium mb-2">{feature}</h3>
                  
                  <p className="text-neutral-600 text-sm">
                    Engineered to the highest standards for lasting performance and reliability.
                  </p>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}