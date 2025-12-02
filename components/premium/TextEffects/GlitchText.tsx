"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchColors?: string[];
}

export function GlitchText({ 
  text, 
  className = "",
  glitchColors = ['#10B981', '#3B82F6', '#F59E0B']
}: GlitchTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  const glitchAnimation = {
    x: glitchActive ? [0, -2, 2, -1, 1, 0] : 0,
    transition: {
      duration: 0.2,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Main text */}
      <motion.h2
        className="relative z-10"
        animate={glitchAnimation}
      >
        {text}
      </motion.h2>

      {/* Glitch layers */}
      {glitchActive && (
        <>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              x: [-2, 2, -1],
              y: [1, -1, 0],
            }}
            transition={{ duration: 0.2 }}
            style={{
              color: glitchColors[0],
              mixBlendMode: 'screen',
            }}
          >
            {text}
          </motion.div>
          
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              x: [2, -2, 1],
              y: [-1, 1, 0],
            }}
            transition={{ duration: 0.2, delay: 0.05 }}
            style={{
              color: glitchColors[1],
              mixBlendMode: 'screen',
            }}
          >
            {text}
          </motion.div>
          
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scaleX: [1, 1.01, 1],
            }}
            transition={{ duration: 0.2, delay: 0.1 }}
            style={{
              color: glitchColors[2],
              mixBlendMode: 'screen',
              clipPath: `polygon(
                0 ${Math.random() * 30}%, 
                100% ${Math.random() * 30}%, 
                100% ${60 + Math.random() * 30}%, 
                0 ${60 + Math.random() * 30}%
              )`,
            }}
          >
            {text}
          </motion.div>
        </>
      )}
    </div>
  );
}