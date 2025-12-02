"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { MapPin, Calendar, ArrowRight, Award } from "lucide-react";

const featuredProjects = [
  {
    id: "1",
    title: "Hyderabad IT Park",
    location: "HITEC City, Hyderabad",
    year: "2023",
    category: "Commercial",
    description: "Complete outdoor transformation with modular furniture, creating collaborative spaces for 5000+ employees",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop",
    ],
    awards: ["Best Commercial Landscape 2023"],
  },
  {
    id: "2",
    title: "Jubilee Hills Public Park",
    location: "Jubilee Hills, Hyderabad",
    year: "2023",
    category: "Public Space",
    description: "Revitalized 10-acre park with inclusive play equipment, fitness zones, and sustainable seating",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1559070081-648fb00b2ed1?w=600&h=400&fit=crop",
    ],
    awards: ["Excellence in Public Design"],
  },
  {
    id: "3",
    title: "International School Campus",
    location: "Gachibowli, Hyderabad",
    year: "2022",
    category: "Educational",
    description: "Age-appropriate play areas and outdoor learning spaces for 2000+ students",
    image: "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1576435600662-e7de4fab5c8e?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1565795298595-a1344e79a8c0?w=600&h=400&fit=crop",
    ],
    awards: [],
  },
];

export function PremiumFeaturedProjects() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <Section size="xl" className="bg-neutral-50">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-light mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Transforming visions into reality across Hyderabad and beyond
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Display */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={featuredProjects[activeProject].image}
                  alt={featuredProjects[activeProject].title}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  {featuredProjects[activeProject].awards.length > 0 && (
                    <motion.div
                      className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Award className="w-4 h-4" />
                      {featuredProjects[activeProject].awards[0]}
                    </motion.div>
                  )}
                  
                  <motion.h3
                    className="text-3xl font-display font-light mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {featuredProjects[activeProject].title}
                  </motion.h3>
                  
                  <motion.div
                    className="flex items-center gap-4 text-white/80 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {featuredProjects[activeProject].location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredProjects[activeProject].year}
                    </span>
                  </motion.div>
                  
                  <motion.p
                    className="text-white/90 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {featuredProjects[activeProject].description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Link
                      href="/premium-projects"
                      className="inline-flex items-center gap-2 text-white hover:text-emerald-400 transition-colors"
                    >
                      <span>View Project Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Project Selector */}
          <div className="space-y-4">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveProject(index)}
                className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 ${
                  activeProject === index
                    ? "bg-white shadow-lg scale-105"
                    : "bg-white/50 hover:bg-white hover:shadow-md"
                }`}
              >
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={project.gallery[0]}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{project.title}</h4>
                    <p className="text-sm text-neutral-600">{project.category}</p>
                    <p className="text-sm text-neutral-500">{project.year}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <motion.div
              className="text-center pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/premium-projects"
                className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}