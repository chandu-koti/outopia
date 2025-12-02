"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface MorphingNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function MorphingNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2,
  className = ""
}: MorphingNumberProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);
  
  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [springValue]);

  // Split number into individual digits for morphing effect
  const formattedValue = displayValue.toFixed(decimals);
  const digits = formattedValue.split('');

  return (
    <div ref={ref} className={`inline-flex items-baseline ${className}`}>
      {prefix && <span className="mr-1">{prefix}</span>}
      
      <span className="relative inline-flex">
        {digits.map((digit, index) => (
          <motion.span
            key={index}
            className="relative inline-block"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              delay: index * 0.05,
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {digit === '.' ? (
              <span className="mx-1">.</span>
            ) : (
              <motion.span
                className="inline-block tabular-nums"
                animate={{
                  rotateX: isInView ? [0, 360] : 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {digit}
              </motion.span>
            )}
          </motion.span>
        ))}
      </span>
      
      {suffix && <span className="ml-1">{suffix}</span>}
    </div>
  );
}