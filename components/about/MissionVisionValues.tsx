"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";

const items = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To create outdoor spaces that enhance quality of life through innovative design, superior craftsmanship, and sustainable practices.",
    color: "bg-primary",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "To be India's most trusted partner in outdoor space transformation, setting new standards for design excellence and customer satisfaction.",
    color: "bg-secondary-blue",
  },
  {
    icon: Heart,
    title: "Our Values",
    description: "Innovation, Quality, Sustainability, Customer Focus, and Integrity guide every decision we make and every project we undertake.",
    color: "bg-secondary-terracotta",
  },
];

export function MissionVisionValues() {
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
            What Drives Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our mission, vision, and values form the foundation of everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 ${item.color} text-white rounded-full mb-6`}>
                <item.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-white rounded-lg p-8 shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Our Core Values in Action</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { value: "Innovation", description: "Constantly pushing boundaries in design and functionality" },
              { value: "Quality", description: "Uncompromising commitment to superior materials and craftsmanship" },
              { value: "Sustainability", description: "Responsible practices that protect our environment" },
              { value: "Customer Focus", description: "Your vision drives our creativity" },
              { value: "Integrity", description: "Transparent, ethical business practices" },
            ].map((value, index) => (
              <div key={value.value} className="text-center">
                <div className="text-lg font-semibold text-primary mb-2">{value.value}</div>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}