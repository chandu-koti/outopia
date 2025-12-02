"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { TeamCard } from "./TeamCard";

const teamMembers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    bio: "Visionary leader with 20+ years in outdoor design",
    linkedin: "#",
    email: "rajesh@infrascapes.in",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    bio: "Award-winning designer specializing in sustainable spaces",
    linkedin: "#",
    email: "priya@infrascapes.in",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Head of Engineering",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Innovation expert driving our modular systems",
    linkedin: "#",
    email: "amit@infrascapes.in",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Sustainability Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    bio: "Environmental scientist ensuring eco-friendly practices",
    linkedin: "#",
    email: "sarah@infrascapes.in",
  },
];

export function TeamSection() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <Section size="lg" className="bg-neutral-50">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-light mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-neutral-600">
            The passionate experts behind every project
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <TeamCard
                member={member}
                isHovered={hoveredMember === member.id}
                otherHovered={hoveredMember !== null && hoveredMember !== member.id}
              />
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-neutral-600 mb-6">
            Want to join our team of innovators?
          </p>
          <motion.a
            href="/careers"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="hover"
          >
            View Open Positions
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </Container>
    </Section>
  );
}