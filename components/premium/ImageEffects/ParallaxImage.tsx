"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  parallaxSpeed?: number;
  scale?: boolean;
}

export function ParallaxImage({ 
  src, 
  alt, 
  className = "",
  parallaxSpeed = 0.5,
  scale = true
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-100 * parallaxSpeed, 100 * parallaxSpeed]
  );

  const scaleValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.2, 1, 1.2]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden ${className}`}
    >
      {/* Reveal mask */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent z-10"
        style={{ opacity }}
      />
      
      {/* Image with parallax */}
      <motion.div
        className="relative w-full h-full"
        style={{
          y,
          scale: scale ? scaleValue : 1,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
      
      {/* Noise overlay for texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}