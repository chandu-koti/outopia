"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { GlassPanel } from "../UI/GlassPanel";
import { MapPin, Calendar, Award } from "lucide-react";

const portfolioProjects = [
  {
    id: "1",
    title: "Luxury Resort Landscape",
    category: "Commercial",
    location: "Goa, India",
    date: "2023",
    awards: ["Best Commercial Landscape 2023"],
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop",
    ],
    description: "Complete landscape transformation for a 5-star resort including tropical gardens, water features, and outdoor entertainment areas.",
  },
  {
    id: "2",
    title: "Urban Park Renovation",
    category: "Public",
    location: "Mumbai, India",
    date: "2023",
    awards: ["Sustainable Design Award"],
    images: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1559070081-648fb00b2ed1?w=600&h=400&fit=crop",
    ],
    description: "Revitalization of a 10-acre urban park with sustainable materials, native plantings, and inclusive play areas.",
  },
  {
    id: "3",
    title: "Corporate Campus",
    category: "Commercial",
    location: "Bangalore, India",
    date: "2022",
    awards: ["Excellence in Innovation"],
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop",
    ],
    description: "Modern landscape design for tech campus featuring outdoor workspaces, meditation gardens, and recreational facilities.",
  },
];

const categories = ["All", "Commercial", "Public", "Residential"];

export function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filteredProjects = portfolioProjects.filter(
    project => selectedCategory === "All" || project.category === selectedCategory
  );

  return (
    <Section size="lg" className="bg-neutral-50">
      <Container>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-display font-light mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Explore our portfolio of award-winning landscape transformations
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-neutral-600 hover:bg-emerald-50"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project.id)}
                className="cursor-pointer"
              >
                <GlassPanel className="overflow-hidden hover:shadow-2xl transition-shadow">
                  {/* Main Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                    {project.awards.length > 0 && (
                      <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        Award Winner
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-medium mb-2">{project.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.date}
                      </span>
                    </div>
                    <p className="text-neutral-600 line-clamp-2">{project.description}</p>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const project = portfolioProjects.find(p => p.id === selectedProject);
                  if (!project) return null;
                  
                  return (
                    <>
                      <div className="relative h-96">
                        <Image
                          src={project.images[0]}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-8">
                        <h2 className="text-3xl font-medium mb-4">{project.title}</h2>
                        <div className="flex items-center gap-6 text-neutral-600 mb-6">
                          <span className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            {project.location}
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            {project.date}
                          </span>
                        </div>
                        <p className="text-lg text-neutral-600 mb-8">{project.description}</p>
                        
                        {/* Additional Images */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                          {project.images.slice(1).map((image, index) => (
                            <div key={index} className="relative h-48 rounded-xl overflow-hidden">
                              <Image
                                src={image}
                                alt={`${project.title} ${index + 2}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        
                        {/* Awards */}
                        {project.awards.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.awards.map((award) => (
                              <span
                                key={award}
                                className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm"
                              >
                                🏆 {award}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}