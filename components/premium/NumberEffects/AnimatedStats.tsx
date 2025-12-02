"use client";

import { motion } from "framer-motion";
import { MorphingNumber } from "./MorphingNumber";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface Stat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

interface AnimatedStatsProps {
  stats: Stat[];
  className?: string;
}

export function AnimatedStats({ stats, className = "" }: AnimatedStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: index * 0.1,
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {/* Number with morphing effect */}
          <div className="text-4xl md:text-5xl font-display font-light mb-2">
            <MorphingNumber
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals || 0}
            />
          </div>
          
          {/* Label with animated underline */}
          <motion.div className="relative inline-block">
            <p className="text-sm font-medium text-neutral-600 uppercase tracking-wider">
              {stat.label}
            </p>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-blue-500"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{
                delay: index * 0.1 + 0.3,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}