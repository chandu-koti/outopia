"use client";

import { ReactNode, forwardRef } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { premiumColors, premiumEffects } from "@/lib/premium-design-system";

interface GlassPanelProps extends MotionProps {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'dark' | 'colored';
  blur?: 'sm' | 'md' | 'lg';
  border?: boolean;
}

const variantClasses = {
  light: 'bg-white/10 text-neutral-900',
  dark: 'bg-neutral-900/10 text-white',
  colored: 'bg-gradient-to-br from-emerald-500/10 to-blue-500/10',
} as const;

const blurClasses = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
} as const;

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(({
  children,
  className = "",
  variant = 'light',
  blur = 'md',
  border = true,
  ...motionProps
}, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        variantClasses[variant],
        blurClasses[blur],
        border && "border border-white/10",
        className
      )}
      {...motionProps}
    >
      {/* Gradient border effect */}
      {border && (
        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-white/20 to-white/0 pointer-events-none" />
      )}
      
      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: premiumEffects.noise,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none"
        whileHover={{ opacity: 0.05 }}
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
});

GlassPanel.displayName = "GlassPanel";