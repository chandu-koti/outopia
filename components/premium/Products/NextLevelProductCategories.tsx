"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { getCategoriesByBrand } from "@/lib/data/categories";
import { useRef } from "react";

export function NextLevelProductCategories({ brand }: { brand: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const filteredCategories = getCategoriesByBrand(brand);

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2 rounded-full mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Premium Collections</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Explore Our Categories
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our complete range of premium outdoor solutions designed to transform any space
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="space-y-6 md:space-y-8">
          {filteredCategories.map((category, index) => {
            const yOffset = useTransform(
              scrollYProgress,
              [0, 1],
              [50, -50]
            );

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <Link href={category.href} className="block group">
                  <div className={`relative overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex flex-col md:flex`}>
                    
                    {/* Image Section */}
                    <div className="relative w-full md:w-1/2 h-64 md:h-96 overflow-hidden">
                      <motion.div 
                        className="absolute inset-0"
                        style={{ y: index % 2 === 0 ? yOffset : undefined }}
                      >
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </motion.div>
                      
                      {/* Decorative gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-${index % 2 === 0 ? 'r' : 'l'} from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      {/* Category badge */}
                      <motion.div 
                        className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-xs font-semibold text-gray-800">
                          {category.subcategories?.length || 0}+ Products
                        </span>
                      </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        {/* Category number */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-5xl md:text-6xl font-bold text-gray-100">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent" />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors duration-300">
                          {category.name}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
                          {category.description}
                        </p>

                        {/* Subcategories */}
                        {category.subcategories && (
                          <div className="mb-8">
                            <div className="flex flex-wrap gap-2">
                              {category.subcategories.slice(0, 3).map((sub, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                                >
                                  {sub}
                                </span>
                              ))}
                              {category.subcategories.length > 3 && (
                                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                                  +{category.subcategories.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* CTA Button */}
                        <motion.div
                          className="inline-flex items-center gap-3 text-primary font-semibold group/btn cursor-pointer"
                          whileHover={{ x: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <span className="text-lg">Explore Collection</span>
                          <div className="relative w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all duration-300">
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </motion.div>

                        {/* Decorative element */}
                        <motion.div
                          className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link href="/contact">
            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Request Full Catalog</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}