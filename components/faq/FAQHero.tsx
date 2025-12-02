"use client";

import { motion } from "framer-motion";

export function FAQHero() {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-secondary-blue/5 pt-32 pb-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our products, services, and processes
          </p>
        </motion.div>
      </div>
    </section>
  );
}