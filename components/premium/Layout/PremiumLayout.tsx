"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { premiumColors, premiumEffects } from "@/lib/premium-design-system";
import { CustomCursor } from "../UI/CustomCursor";
import { NoiseOverlay } from "../UI/NoiseOverlay";

interface PremiumLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PremiumLayout({ children, className = "" }: PremiumLayoutProps) {
  const layoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set CSS custom properties for premium theme
    const root = document.documentElement;
    root.style.setProperty('--premium-primary', premiumColors.primary[900]);
    root.style.setProperty('--premium-accent', premiumColors.accent.emerald);
    
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <motion.div
      ref={layoutRef}
      className={`relative min-h-screen bg-neutral-50 text-neutral-900 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Noise texture overlay */}
      <NoiseOverlay />
      
      {/* Gradient mesh background */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          background: premiumEffects.gradient.mesh,
          filter: 'blur(100px)',
        }}
      />
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}