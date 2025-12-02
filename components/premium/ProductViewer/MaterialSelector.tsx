"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Material {
  id: string;
  name: string;
  color: string;
}

interface MaterialSelectorProps {
  materials: Material[];
  selected: string;
  onChange: (id: string) => void;
}

export function MaterialSelector({ materials, selected, onChange }: MaterialSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-2 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
      <span className="text-sm font-medium mr-2 text-white">Material:</span>
      {materials.map((material) => (
        <motion.button
          key={material.id}
          onClick={() => onChange(material.id)}
          className="relative group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          data-cursor="hover"
        >
          <div
            className={`w-10 h-10 rounded-full border-2 transition-all ${
              selected === material.id 
                ? 'border-white scale-110' 
                : 'border-white/40 hover:border-white/60'
            }`}
            style={{ backgroundColor: material.color }}
          >
            {selected === material.id && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Check className="w-5 h-5 text-white drop-shadow-lg" />
              </motion.div>
            )}
          </div>
          
          {/* Tooltip */}
          <motion.span
            className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 text-white text-xs rounded whitespace-nowrap opacity-0 pointer-events-none"
            initial={{ opacity: 0, y: 5 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            {material.name}
          </motion.span>
        </motion.button>
      ))}
    </div>
  );
}