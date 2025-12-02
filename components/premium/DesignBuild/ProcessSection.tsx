"use client";

import { motion } from "framer-motion";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { GlassPanel } from "../UI/GlassPanel";
import { Compass, Pencil, Hammer, CheckCircle } from "lucide-react";

const processSteps = [
  {
    icon: Compass,
    title: "Discovery & Planning",
    description: "We begin by understanding your vision, site conditions, and project goals through detailed consultation.",
    features: ["Site Analysis", "Concept Development", "Budget Planning"],
  },
  {
    icon: Pencil,
    title: "Design Development",
    description: "Our designers create detailed plans, 3D visualizations, and material selections tailored to your needs.",
    features: ["3D Renderings", "Material Selection", "Technical Drawings"],
  },
  {
    icon: Hammer,
    title: "Construction & Build",
    description: "Expert craftsmen bring the design to life with precision and attention to every detail.",
    features: ["Project Management", "Quality Control", "Timeline Adherence"],
  },
  {
    icon: CheckCircle,
    title: "Completion & Support",
    description: "We ensure perfect delivery and provide ongoing maintenance support for lasting beauty.",
    features: ["Final Inspection", "Maintenance Guide", "Warranty Support"],
  },
];

export function ProcessSection() {
  return (
    <Section size="lg" className="bg-neutral-50">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-display font-light mb-4">
            Our Proven Process
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            A systematic approach that ensures exceptional results from concept to completion
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassPanel className="p-8 h-full hover:shadow-2xl transition-shadow">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                {/* Step Number */}
                <div className="text-sm text-emerald-500 font-medium mb-2">
                  Step {index + 1}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-medium mb-4">{step.title}</h3>
                <p className="text-neutral-600 mb-6">{step.description}</p>
                
                {/* Features */}
                <ul className="space-y-2">
                  {step.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-neutral-500">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {/* Process Timeline */}
        <motion.div
          className="mt-16 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-200 -translate-y-1/2" />
          <div className="flex justify-between relative">
            {processSteps.map((_, index) => (
              <motion.div
                key={index}
                className="w-4 h-4 bg-emerald-500 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}