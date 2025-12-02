"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

interface DepthCardProps {
  title: string;
  description: string;
  image: string;
  href?: string;
  className?: string;
}

export function DepthCard({ 
  title, 
  description, 
  image, 
  href = "#",
  className = "" 
}: DepthCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  
  const depth = useTransform(
    [rotateX, rotateY],
    ([latestX, latestY]) => {
      const x = latestX as number;
      const y = latestY as number;
      return Math.sqrt(x * x + y * y) / 10;
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientY - centerY) / (rect.height / 2);
    const y = (e.clientX - centerX) / (rect.width / 2);
    
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    
    rotateX.set(-x * 15);
    rotateY.set(y * 15);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.a
      ref={cardRef}
      href={href}
      className={`block relative group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { duration: 0.3 } }}
      data-cursor="view"
    >
      {/* Card container with depth */}
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-white shadow-xl"
        style={{
          transformStyle: "preserve-3d",
          boxShadow: useTransform(
            depth,
            [0, 5],
            [
              "0 10px 30px -10px rgba(0,0,0,0.3)",
              "0 30px 60px -15px rgba(0,0,0,0.4)"
            ]
          ),
        }}
      >
        {/* Image layer with parallax */}
        <motion.div
          className="relative h-64 overflow-hidden"
          style={{
            transform: "translateZ(20px)",
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              x: useTransform(mouseX, [0, 400], [-10, 10]),
              y: useTransform(mouseY, [0, 300], [-10, 10]),
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ scale: { duration: 0.6 } }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>

        {/* Content layer */}
        <motion.div
          className="relative p-6 bg-white"
          style={{
            transform: "translateZ(40px)",
          }}
        >
          <h3 className="text-xl font-display font-medium mb-2">{title}</h3>
          <p className="text-neutral-600 text-sm leading-relaxed">{description}</p>
          
          {/* Hover indicator */}
          <motion.div
            className="mt-4 flex items-center gap-2 text-emerald-500 text-sm font-medium"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            transition={{ duration: 0.3 }}
          >
            <span>View Details</span>
            <motion.span
              animate={{ x: isHovered ? [0, 5, 0] : 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: `radial-gradient(
              circle at ${mouseX.get()}px ${mouseY.get()}px,
              rgba(255,255,255,0.2) 0%,
              transparent 50%
            )`,
          }}
        />
      </motion.div>
    </motion.a>
  );
}