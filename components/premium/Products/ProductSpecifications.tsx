"use client";

import { motion } from "framer-motion";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";

interface Specifications {
  dimensions: string;
  weight: string;
  material: string;
  colors: string[];
  capacity: string;
  warranty: string;
}

interface ProductSpecificationsProps {
  specifications: Specifications;
}

export function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  return (
    <Section size="md" className="py-8 md:py-12 lg:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-display font-light mb-6 md:mb-8 text-center">
            Technical Specifications
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {Object.entries(specifications).map(([key, value], index) => (
              <motion.div
                key={key}
                className="border-b border-neutral-200 pb-3 md:pb-4"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-xs md:text-sm text-neutral-500 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-base md:text-lg font-medium">
                  {Array.isArray(value) ? (
                    <span className="flex flex-wrap gap-1.5 md:gap-2">
                      {value.map((color, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 md:px-3 md:py-1 bg-neutral-100 rounded-full text-xs md:text-sm"
                        >
                          {color}
                        </span>
                      ))}
                    </span>
                  ) : (
                    value
                  )}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          {/* <motion.div
            className="mt-12 p-6 bg-neutral-50 rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-medium mb-4">Certifications & Standards</h3>
            <div className="flex flex-wrap gap-4">
              {['ISO 9001:2015', 'EN 1176', 'ASTM F1487', 'Green Guard Gold'].map((cert, index) => (
                <motion.div
                  key={cert}
                  className="px-4 py-2 bg-white rounded-lg border border-neutral-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {cert}
                </motion.div>
              ))}
            </div>
          </motion.div> */}
        </motion.div>
      </Container>
    </Section>
  );
}