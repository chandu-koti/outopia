"use client";

import { motion } from "framer-motion";
import { Award, Shield, FileCheck, Star } from "lucide-react";

const certifications = [
  {
    icon: FileCheck,
    title: "EN 1176 Certified",
    description: "European safety standards for playground equipment",
  },
  {
    icon: Shield,
    title: "EN 16630 Certified",
    description: "Outdoor fitness equipment safety standards",
  },
  {
    icon: Award,
    title: "ISO 9001:2015",
    description: "Quality management systems certification",
  },
  {
    icon: Star,
    title: "5-Star Safety Rating",
    description: "Highest safety rating for outdoor equipment",
  },
];

export function CertificationsAwards() {
  return (
    <section id="certifications" className="section-padding bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Certifications & Standards
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meeting and exceeding international quality and safety standards
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 text-center shadow-lg"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <cert.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
              <p className="text-gray-600 text-sm">{cert.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-primary/5 rounded-lg p-8 text-center"
        >
          <h3 className="text-2xl font-semibold mb-4">Quality Assurance</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Every product undergoes rigorous testing to ensure it meets our high standards 
            for safety, durability, and performance. Our commitment to quality is reflected 
            in our comprehensive 5-year warranty on all products.
          </p>
        </motion.div>
      </div>
    </section>
  );
}