"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { Trees, Building2, Droplets, Lightbulb, Mountain, Palette } from "lucide-react";

const services = [
  {
    icon: Trees,
    title: "Landscape Design",
    description: "Complete landscape architecture from concept to installation",
    image: "https://images.unsplash.com/photo-1584738766473-61c083514bf4?w=600&h=400&fit=crop",
  },
  {
    icon: Building2,
    title: "Hardscape Construction",
    description: "Patios, walkways, retaining walls, and outdoor structures",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop",
  },
  {
    icon: Droplets,
    title: "Water Features",
    description: "Fountains, ponds, waterfalls, and irrigation systems",
    image: "https://images.unsplash.com/photo-1538935732373-f7a495fea3f6?w=600&h=400&fit=crop",
  },
  {
    icon: Lightbulb,
    title: "Outdoor Lighting",
    description: "Architectural and landscape lighting for beauty and security",
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&h=400&fit=crop",
  },
  {
    icon: Mountain,
    title: "Grading & Drainage",
    description: "Site preparation, grading, and drainage solutions",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
  },
  {
    icon: Palette,
    title: "Custom Features",
    description: "Unique installations tailored to your specific vision",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
  },
];

export function ServicesGrid() {
  return (
    <Section size="lg">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-display font-light mb-4">
            Comprehensive Services
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Full-service design and construction capabilities to bring any vision to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Icon Overlay */}
                  <motion.div
                    className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <service.icon className="w-6 h-6 text-emerald-500" />
                  </motion.div>
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-medium mb-3">{service.title}</h3>
                  <p className="text-neutral-600 mb-4">{service.description}</p>
                  
                  <motion.button
                    className="text-emerald-500 font-medium flex items-center gap-2 group/btn"
                    whileHover={{ x: 5 }}
                  >
                    Learn More
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}