"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=800&fit=crop"
          alt="Infrascapes team"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-white"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Crafting Outdoor Excellence
            {/* Since 2010 */}
          </h1>
          <p className="text-xl text-gray-200">
            We are Infrascapes - innovators in outdoor furniture and design-build solutions,
            transforming landscapes across India with our modular brilliance and unwavering
            commitment to quality.
          </p>
        </motion.div>
      </div>
    </section>
  );
}