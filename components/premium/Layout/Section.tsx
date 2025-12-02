"use client";

import { ReactNode, forwardRef } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { premiumSpacing } from "@/lib/premium-design-system";

interface SectionProps extends MotionProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'light' | 'dark' | 'gradient';
}

const sizeClasses = {
  sm: `py-${premiumSpacing.xl} md:py-${premiumSpacing['2xl']}`,
  md: `py-${premiumSpacing['2xl']} md:py-${premiumSpacing['3xl']}`,
  lg: `py-${premiumSpacing['3xl']} md:py-${premiumSpacing['4xl']}`,
  xl: `py-${premiumSpacing['4xl']} md:py-[200px]`,
} as const;

const backgroundClasses = {
  transparent: '',
  light: 'bg-white/50 backdrop-blur-sm',
  dark: 'bg-neutral-900 text-white',
  gradient: 'bg-gradient-to-b from-transparent via-white/50 to-transparent',
} as const;

export const Section = forwardRef<HTMLElement, SectionProps>(({
  children,
  className = "",
  size = 'md',
  background = 'transparent',
  ...motionProps
}, ref) => {
  return (
    <motion.section
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        "pt-20 md:pt-32 lg:pt-40", // Using explicit values since dynamic classes don't work with Tailwind
        backgroundClasses[background],
        className
      )}
      {...motionProps}
    >
      {children}
    </motion.section>
  );
});

Section.displayName = "Section";