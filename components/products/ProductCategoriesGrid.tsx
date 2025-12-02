"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { getAllCategories } from "@/lib/data/categories";

export function ProductCategoriesGrid() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {getAllCategories().map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={category.href}>
                <Card className="group cursor-pointer overflow-hidden h-full">
                  <div className="grid md:grid-cols-2 h-full">
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {category.name}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {category.description}
                      </p>
                      <div className="space-y-2 mb-6">
                        {category.subcategories?.slice(0, 4).map((sub) => (
                          <p key={sub} className="text-sm text-gray-500">
                            • {sub}
                          </p>
                        ))}
                        {category.subcategories && category.subcategories.length > 4 && (
                          <p className="text-sm text-gray-500">
                            • And {category.subcategories!.length - 4} more...
                          </p>
                        )}
                      </div>
                      <div className="flex items-center text-primary font-medium">
                        <span>Explore Collection</span>
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}