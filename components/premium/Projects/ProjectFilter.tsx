"use client";

import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
}

interface ProjectFilterProps {
  categories: Category[];
  selected: string;
  onChange: (category: string) => void;
}

export function ProjectFilter({ categories, selected, onChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`relative px-6 py-3 rounded-full font-medium transition-all ${
            selected === category.id
              ? 'text-white'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-cursor="hover"
        >
          {/* Background */}
          {selected === category.id && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
              layoutId="activeFilter"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          
          {/* Text */}
          <span className="relative z-10">{category.name}</span>
          
          {/* Hover effect */}
          {selected !== category.id && (
            <motion.div
              className="absolute inset-0 border-2 border-neutral-300 rounded-full"
              whileHover={{ borderColor: '#10B981' }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}