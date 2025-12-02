"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface PathTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function PathText({ text, className = "", delay = 0 }: PathTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* SVG Path Background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,100 Q250,50 500,100 T1000,100"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          style={{
            pathLength,
            opacity,
          }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>

      {/* Animated Text */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay, duration: 0.8 }}
      >
        {text.split(' ').map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-2">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className="inline-block"
                initial={{ y: 50, opacity: 0, rotateX: -90 }}
                animate={
                  isInView
                    ? {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                      }
                    : {}
                }
                transition={{
                  delay: delay + wordIndex * 0.1 + charIndex * 0.02,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}