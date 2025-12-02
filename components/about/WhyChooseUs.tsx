"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, Shield, Users, Wrench, Award } from "lucide-react";

const reasons = [
  {
    icon: CheckCircle,
    title: "Modular Design Philosophy",
    description: "Our products aren't just furniture; they're building blocks for infinite possibilities.",
  },
  {
    icon: Shield,
    title: "Weather-Resistant Engineering",
    description: "Every product is specifically engineered for Indian climate conditions.",
  },
  {
    icon: Users,
    title: "Complete Solutions",
    description: "From concept to maintenance, we're your single partner for all outdoor space needs.",
  },
  {
    icon: Clock,
    title: "5-Year Warranty",
    description: "We stand behind our products with comprehensive warranty coverage.",
  },
  {
    icon: Wrench,
    title: "Custom Manufacturing",
    description: "In-house facilities allow us to create bespoke solutions for unique requirements.",
  },
  // {
  //   icon: Award,
  //   title: "Safety Certified",
  //   description: "All equipment meets international safety standards (EN 1176, EN 16630).",
  // },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Infrascapes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Five compelling reasons to partner with us for your outdoor transformation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <reason.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}