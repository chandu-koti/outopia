"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { ProductInquiryModal } from "./ProductInquiryModal";

interface Subcategory {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  specifications: Record<string, any>;
}

interface SubcategoryGridProps {
  subcategories: Subcategory[];
}

export function SubcategoryGrid({ subcategories }: SubcategoryGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Subcategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInquiry = (product: Subcategory) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subcategories.map((subcategory, index) => (
              <motion.div
                key={subcategory.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <div className="relative h-64">
                    <Image
                      src={subcategory.image}
                      alt={subcategory.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold mb-3">
                      {subcategory.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {subcategory.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {subcategory.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex items-start text-sm text-gray-600">
                            <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto space-y-3">
                      <Button
                        onClick={() => handleInquiry(subcategory)}
                        className="w-full"
                      >
                        Get Quote
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <ProductInquiryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
        />
      )}
    </>
  );
}