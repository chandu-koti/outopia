"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilter } from "./ProjectFilter";

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'parks', name: 'Parks & Recreation' },
  { id: 'schools', name: 'Educational' },
  { id: 'residential', name: 'Residential' },
  { id: 'commercial', name: 'Commercial' },
];

export function ProjectsGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Projects data
  const projects = [
    {
      id: '1',
      title: 'Luxury Resort Garden',
      description: 'Premium outdoor furniture for a 5-star resort',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop',
      category: 'commercial',
    },
    {
      id: '2',
      title: 'Urban Park Renovation',
      description: 'Complete transformation of city park with modular seating',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop',
      category: 'parks',
    },
    {
      id: '3',
      title: 'School Playground',
      description: 'Safe and fun outdoor equipment for children',
      image: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=800&h=600&fit=crop',
      category: 'schools',
    },
    {
      id: '4',
      title: 'Private Villa',
      description: 'Bespoke outdoor furniture for luxury residence',
      image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop',
      category: 'residential',
    },
    {
      id: '5',
      title: 'Corporate Campus',
      description: 'Modern outdoor spaces for tech company headquarters',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      category: 'commercial',
    },
    {
      id: '6',
      title: 'Community Center',
      description: 'Inclusive play equipment and seating areas',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      category: 'parks',
    },
    {
      id: '7',
      title: 'University Courtyard',
      description: 'Study pods and relaxation zones for students',
      image: 'https://images.unsplash.com/photo-1562113530-57ba467cea38?w=800&h=600&fit=crop',
      category: 'schools',
    },
    {
      id: '8',
      title: 'Beachfront Hotel',
      description: 'Weather-resistant furniture for coastal property',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
      category: 'commercial',
    },
    {
      id: '9',
      title: 'Apartment Complex',
      description: 'Rooftop garden and poolside furniture',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
      category: 'residential',
    },
  ];

  // Filter projects based on category
  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project =>
      project.category?.toLowerCase() === selectedCategory
    );

  return (
    <Section size="lg" className="bg-neutral-50">
      <Container>
        {/* Filter */}
        <ProjectFilter
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  layout: { duration: 0.5 }
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <ProjectCard
                  project={project}
                  isHovered={hoveredProject === project.id}
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="hover"
          >
            Load More Projects
          </motion.button>
        </motion.div>
      </Container>
    </Section>
  );
}