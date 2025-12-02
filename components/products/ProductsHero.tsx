"use client";

import { motion } from "framer-motion";

export function ProductsHero() {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-secondary-blue/5 pt-32 pb-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Premium Outdoor Solutions
          </h1>
          <p className="text-lg text-gray-600">
            Discover our comprehensive range of outdoor furniture and equipment designed 
            to transform any space. From elegant seating solutions to exciting play equipment, 
            each product combines superior craftsmanship with innovative modular design.
          </p>
        </motion.div>
      </div>
    </section>
  );
}