"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, Users, Award } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "12+",
    label: "Projects Completed",
  },
  {
    icon: MapPin,
    value: "1+",
    label: "Cities Served",
  },
  {
    icon: Users,
    value: "20+",
    label: "Happy Clients",
  },
  {
    icon: Award,
    value: "2 Years",
    label: "Warranty on Products",
  },
];

export function ProjectStats() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-primary/10 rounded-full">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}