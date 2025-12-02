"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { DepthCard } from "../Cards/DepthCard";

// Mock related products
const relatedProducts = [
  {
    id: "modular-table-01",
    title: "Modular Picnic Table",
    description: "Versatile table system that complements our bench collection",
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&h=600&fit=crop",
    href: "/premium-category/outdoor-furniture/modular-table-01",
  },
  {
    id: "planter-box-01",
    title: "Integrated Planter System",
    description: "Add greenery to your seating arrangements",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
    href: "/premium-category/outdoor-furniture/planter-box-01",
  },
  {
    id: "shade-canopy-01",
    title: "Modular Shade Canopy",
    description: "Weather protection that integrates seamlessly",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    href: "/premium-category/outdoor-furniture/shade-canopy-01",
  },
  {
    id: "waste-bin-01",
    title: "Smart Waste Management",
    description: "Elegant waste solutions for public spaces",
    image: "https://images.unsplash.com/photo-1558037142-9abc82256a7f?w=800&h=600&fit=crop",
    href: "/premium-category/outdoor-furniture/waste-bin-01",
  },
];

interface RelatedProductsProps {
  currentProductId: string;
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  return (
    <Section size="lg" className="bg-neutral-50">
      <Container>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-display font-light mb-4">
            Complete Your Space
          </h2>
          <p className="text-xl text-neutral-600">
            Explore complementary products for a cohesive design
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <DepthCard
                title={product.title}
                description={product.description}
                image={product.image}
                href={product.href}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="/premium-category"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors"
          >
            View All Products
            <span>→</span>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}