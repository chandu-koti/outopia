"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  email?: string;
}

interface TeamCardProps {
  member: TeamMember;
  isHovered: boolean;
  otherHovered: boolean;
}

export function TeamCard({ member, isHovered, otherHovered }: TeamCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientY - centerY) / (rect.height / 2);
    const y = (e.clientX - centerX) / (rect.width / 2);
    
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
    
    rotateX.set(-x * 20);
    rotateY.set(y * 20);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        scale: otherHovered ? 0.95 : 1,
        opacity: otherHovered ? 0.7 : 1,
      }}
      transition={{ duration: 0.3 }}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      data-cursor="view"
    >
      {/* Card Container */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Image Layer with Parallax */}
        <motion.div
          className="relative h-80 overflow-hidden"
          style={{
            transform: "translateZ(20px)",
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              x: useTransform(mouseX, [0, 1], [-10, 10]),
              y: useTransform(mouseY, [0, 1], [-10, 10]),
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ scale: { duration: 0.6 } }}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </motion.div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Name overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 text-white"
            style={{
              transform: "translateZ(40px)",
            }}
          >
            <h3 className="text-2xl font-display font-light">{member.name}</h3>
            <p className="text-emerald-400">{member.role}</p>
          </motion.div>
        </motion.div>

        {/* Content Layer */}
        <motion.div
          className="p-6"
          style={{
            transform: "translateZ(60px)",
          }}
        >
          <p className="text-neutral-600 mb-4">{member.bio}</p>
          
          {/* Social Links */}
          <div className="flex gap-3">
            {member.linkedin && (
              <motion.a
                href={member.linkedin}
                className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            )}
            {member.email && (
              <motion.a
                href={`mailto:${member.email}`}
                className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            )}
          </div>
        </motion.div>

        {/* Hover effect layers */}
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Shine effect */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(
                circle at ${mouseX.get() * 100}% ${mouseY.get() * 100}%,
                rgba(255,255,255,0.2) 0%,
                transparent 50%
              )`,
            }}
          />
          
          {/* Edge glow */}
          <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-2xl" />
        </motion.div>
      </div>
    </motion.div>
  );
}