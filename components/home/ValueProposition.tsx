"use client";

import { motion } from "framer-motion";
import { Wrench, Lightbulb, Shield, Factory } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Modular Design Excellence",
    description: "Furniture that evolves with your needs",
  },
  {
    icon: Wrench,
    title: "End-to-End Solutions",
    description: "From brief to quality check, we handle everything",
  },
  {
    icon: Shield,
    title: "Premium Materials",
    description: "Weather-resistant construction built for Indian climates",
  },
  {
    icon: Factory,
    title: "Custom Manufacturing",
    description: "Bespoke solutions for unique spaces",
  },
];

export function ValueProposition() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Where Innovation Meets the Outdoors
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Infrascapes, we believe outdoor spaces deserve the same attention to detail as interiors. 
            Our modular design philosophy allows infinite possibilities, creating furniture that adapts 
            to your vision rather than limiting it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-primary/10 rounded-full">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}