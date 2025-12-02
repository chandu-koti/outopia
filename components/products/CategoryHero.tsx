"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface CategoryHeroProps {
  title: string;
  description: string;
  image: string;
}

export function CategoryHero({ title, description, image }: CategoryHeroProps) {
  return (
    <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-white"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-200">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}