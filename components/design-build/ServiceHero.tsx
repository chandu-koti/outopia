"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

export function ServiceHero() {
  const benefits = [
    "Single point of contact",
    "Seamless project execution",
    "Cost-effective solutions",
    "Quality assurance",
  ];

  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/design-build-03-1-scaled.jpg.jpeg"
          alt="Design-build project"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Complete Design-Build Solutions for Outdoor Spaces
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              From Vision to Reality: Our integrated team of architects, designers, 
              and craftsmen deliver comprehensive outdoor solutions from concept to installation.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-center text-white"
                >
                  <CheckCircle className="w-5 h-5 text-secondary-blue mr-2" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button href="/contact" size="lg">
                Start Your Project
              </Button>
              <Button href="#process" variant="secondary" size="lg">
                Our Process
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}