"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin } from "lucide-react";

const leadership = [
  {
    name: "Vijay Maroo",
    role: "Co-Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    bio: "Industry veteran with over 20 years of experience in outdoor solutions and manufacturing.",
    linkedin: "#",
  },
  // {
  //   name: "Dhiren Ratilal Chheda",
  //   role: "Co-Founder & COO",
  //   image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
  //   bio: "Expert in operations and supply chain management with a vision for sustainable growth.",
  //   linkedin: "#",
  // },
];

const departments = [
  {
    title: "Design Team",
    description: "Creative architects and designers who bring visions to life",
    icon: "🎨",
  },
  {
    title: "Engineering",
    description: "Technical experts ensuring safety and structural integrity",
    icon: "⚙️",
  },
  {
    title: "Manufacturing",
    description: "Skilled craftsmen who transform designs into reality",
    icon: "🏭",
  },
  {
    title: "Project Management",
    description: "Professionals who ensure seamless project execution",
    icon: "📊",
  },
];

export function TeamSection() {
  return (
    <section id="team" className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Passionate professionals dedicated to transforming outdoor spaces
          </p>
        </motion.div>

        {/* Leadership */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-semibold text-center mb-8"
          >
            Leadership
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="text-xl font-semibold mb-1">{leader.name}</h4>
                    <p className="text-primary mb-3">{leader.role}</p>
                    <p className="text-gray-600 text-sm mb-3">{leader.bio}</p>
                    <a
                      href={leader.linkedin}
                      className="inline-flex items-center text-gray-500 hover:text-primary transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Departments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-8">
            Our Creative Group
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6 text-center"
              >
                <div className="text-4xl mb-4">{dept.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{dept.title}</h4>
                <p className="text-gray-600 text-sm">{dept.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}