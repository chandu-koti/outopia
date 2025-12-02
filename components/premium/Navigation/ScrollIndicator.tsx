"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Section {
  id: string;
  title: string;
}

interface ScrollIndicatorProps {
  sections?: Section[];
}

export function ScrollIndicator({ sections = [] }: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to indicator position
  const indicatorY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, sections.length > 0 ? (sections.length - 1) * 40 : 0]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (sections.length === 0) return;
      
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (sections.length === 0) return null;

  return (
    <motion.div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {/* Progress line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-neutral-200 -translate-x-1/2" />
      
      {/* Active indicator */}
      <motion.div
        className="absolute left-1/2 w-3 h-3 bg-emerald-500 rounded-full -translate-x-1/2"
        style={{ y: indicatorY }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />
      
      {/* Section dots */}
      <div className="relative space-y-8">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center justify-end gap-3 pr-6"
            data-cursor="hover"
          >
            {/* Label */}
            <motion.span
              className={`text-xs font-medium transition-all duration-300 ${
                activeSection === index
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2"
              } group-hover:opacity-100 group-hover:translate-x-0`}
            >
              {section.title}
            </motion.span>
            
            {/* Dot */}
            <motion.span
              className={`relative w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === index
                  ? "bg-emerald-500 scale-150"
                  : "bg-neutral-400"
              }`}
              whileHover={{ scale: 1.5 }}
            />
          </button>
        ))}
      </div>
      
      {/* Scroll progress */}
      <motion.div
        className="absolute -bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-10 h-10 rounded-full border-2 border-neutral-300"
          style={{
            background: `conic-gradient(#10B981 ${scrollYProgress.get() * 100}%, transparent 0)`,
          }}
        >
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-xs font-medium"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
            }}
          >
            {Math.round(scrollYProgress.get() * 100)}%
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}