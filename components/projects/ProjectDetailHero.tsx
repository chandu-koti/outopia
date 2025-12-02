"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Calendar, Clock } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import type { Project } from "@/lib/projects-data";

interface ProjectDetailHeroProps {
  project: Project;
}

export function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: project.title },
  ];

  return (
    <section className="relative min-h-[500px] flex items-end">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={project.images.main}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pb-16 pt-32">
        <Breadcrumb items={breadcrumbItems} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-8"
        >
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              {project.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {project.title}
          </h1>
          
          <p className="text-xl text-gray-200 mb-6 max-w-3xl">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-6 text-white">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-secondary-blue" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-secondary-blue" />
              <span>{project.year}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-secondary-blue" />
              <span>{project.duration}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}