"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatedProductCard } from "../home/AnimatedProductCard";
import { FadeIn } from "@/components/animations/FadeIn";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { brandsData } from "@/lib/data/brands";
import { getCategoriesByBrand } from "@/lib/data/categories";
import { ArrowRight, Sparkles } from "lucide-react";

interface ProductCategoriesProps {
  brand: string;
  displayMode?: "card" | "detailed";
  showHeader?: boolean;
}

export function ProductCategories({
  brand,
  displayMode = "card",
  showHeader = true
}: ProductCategoriesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [brandData, setBrandData] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch brand data
        const brandRes = await fetch('/api/brands');
        const brands = await brandRes.json();
        const list: any[] = Array.isArray(brands) ? brands : Object.values(brandsData);
        const foundBrand = list.find((b: any) =>
          (b.name && b.name.toLowerCase() === brand.toLowerCase()) || (b.id && b.id.toLowerCase() === brand.toLowerCase())
        );

        if (!foundBrand) {
          setLoading(false);
          return;
        }

        setBrandData(foundBrand);

        // Fetch categories for this brand
        const categoryRes = await fetch('/api/categories');
        const allCategories = await categoryRes.json();
        let brandCategories: any[] = [];
        if (Array.isArray(allCategories)) {
          brandCategories = allCategories.filter((c: any) => c.brandId === foundBrand.id);
        } else {
          // Fallback to static categories
          const staticCats = getCategoriesByBrand((foundBrand.id || foundBrand.name).toLowerCase());
          brandCategories = staticCats.map(sc => ({
            id: sc.id,
            name: sc.name,
            description: sc.description,
            image: sc.image,
            href: sc.href,
            brandId: foundBrand.id
          }));
        }

        setCategories(brandCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [brand]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!brandData) return null;

  const getLogoClass = () => {
    if (brand === "outopia") {
      return "h-32 md:h-40 lg:h-48 w-auto object-contain max-w-sm md:max-w-md lg:max-w-lg";
    } else if (brand === "infrascapes") {
      return "h-16 md:h-20 lg:h-24 w-auto object-contain max-w-sm md:max-w-md lg:max-w-lg";
    }
    return "h-20 md:h-24 lg:h-32 w-auto object-contain max-w-xs md:max-w-sm";
  };

  if (displayMode === "detailed") {
    return (
      <section ref={containerRef} className="py-8 md:py-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          {showHeader && (
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
                {brandData.description}
              </p>
            </motion.div>
          )}

          <div className="space-y-6 md:space-y-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <Link href={category.href} className="block group">
                  <div className={`relative overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex flex-col md:flex`}>

                    <div className="relative w-full md:w-1/2 h-64 md:h-96 overflow-hidden">
                      <div className="absolute inset-0">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>

                      <div className={`absolute inset-0 bg-gradient-to-${index % 2 === 0 ? 'r' : 'l'} from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                      <motion.div
                        className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-xs font-semibold text-gray-800">
                          {category.count || '20+ Products'}
                        </span>
                      </motion.div>
                    </div>

                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-5xl md:text-6xl font-bold text-gray-100">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent" />
                        </div>

                        <h3 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors duration-300">
                          {category.name}
                        </h3>

                        <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
                          {category.description}
                        </p>

                        {category.subcategories && (
                          <div className="mb-8">
                            <div className="flex flex-wrap gap-2">
                              {category.subcategories.slice(0, 3).map((sub: string, idx: number) => (
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
            ))}
          </div>

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

  // Card display mode (for homepage)
  return (
    <section className="section-padding">
      <div className="container">
        {showHeader && (
          <FadeIn className="text-center mb-12">
            <div className="w-full flex flex-row justify-center items-center mb-8 px-4">
              <Image
                src={brandData.logo}
                alt={`${brandData.name} logo`}
                width={600}
                height={200}
                className={getLogoClass()}
                priority
              />
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {brandData.subtitle}
            </p>
          </FadeIn>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <AnimatedProductCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
