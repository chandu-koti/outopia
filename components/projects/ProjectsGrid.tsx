"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface Project {
  id: string;
  name: string;
  slug: string;
  client: string;
  location: string;
  category: string;
  year: string;
  area: string;
  description: string;
  mainImage: string;
  featured: boolean;
}

export function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Get unique categories from actual project data
  const availableCategories = useMemo(() => {
    const categories = new Set(projects.map(project => project.category));
    const categoryList = [
      { id: "all", name: "All Projects", count: projects.length }
    ];
    
    categories.forEach(category => {
      const count = projects.filter(p => p.category === category).length;
      const id = category.toLowerCase().replace(/\s+/g, '-');
      categoryList.push({ id, name: category, count });
    });
    
    return categoryList;
  }, [projects]);

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => {
        const categoryId = project.category.toLowerCase().replace(/\s+/g, '-');
        return categoryId === selectedCategory;
      });

  if (loading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {availableCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 relative ${
                selectedCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category.name}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/projects/${project.slug || project.id}`}>
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={project.mainImage}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </div>
                      )}

                      {/* View Project Overlay */}
                      <div className="absolute bottom-4 right-4 bg-white text-primary p-3 rounded-full transform translate-x-20 group-hover:translate-x-0 transition-transform duration-300">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="text-sm text-primary font-medium">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 mb-4">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{project.year}</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Client: {project.client}</span>
                          <span className="text-gray-500">{project.area}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}