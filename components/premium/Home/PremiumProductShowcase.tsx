"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { GlassPanel } from "../UI/GlassPanel";
import { ArrowRight, Sparkles } from "lucide-react";

const premiumProducts = [
  {
    id: "outdoor-furniture",
    title: "Outdoor Furniture",
    description: "Transform spaces with modular, sustainable seating solutions",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    features: ["Modular Design", "Weather Resistant", "10 Year Warranty"],
    href: "/premium-category/outdoor-furniture",
  },
  {
    id: "play-equipment",
    title: "Play Equipment",
    description: "Safe, innovative play structures that inspire imagination",
    image: "https://images.unsplash.com/photo-1576435600662-e7de4fab5c8e?w=800&h=600&fit=crop",
    features: ["Safety Certified", "Age Appropriate", "Custom Themes"],
    href: "/premium-category/play-equipment",
  },
  {
    id: "fitness-equipment",
    title: "Fitness Equipment",
    description: "Professional-grade outdoor gym solutions for communities",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    features: ["Zero Maintenance", "All Weather", "Inclusive Design"],
    href: "/premium-category/fitness-equipment",
  },
  {
    id: "water-park",
    title: "Water Park Equipment",
    description: "Thrilling aquatic attractions for unforgettable experiences",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=600&fit=crop",
    features: ["Interactive Features", "Safety First", "Custom Design"],
    href: "/premium-category/water-park-equipment",
  },
];

export function PremiumProductShowcase() {
  return (
    <Section size="xl" className="bg-gradient-to-b from-white to-neutral-50">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center justify-center gap-2 text-emerald-600 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Premium Collection</span>
            <Sparkles className="w-5 h-5" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-display font-light mb-4">
            Exceptional Products,
            <span className="block text-emerald-600">Extraordinary Spaces</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Discover our complete range of premium outdoor solutions, each crafted with
            meticulous attention to detail and built to last generations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {premiumProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={product.href} className="group">
                <GlassPanel className="overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="grid lg:grid-cols-2 gap-6 p-8">
                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <h3 className="text-2xl font-medium mb-3 group-hover:text-emerald-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-neutral-600 mb-6">{product.description}</p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-neutral-600">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <motion.div
                        className="flex items-center gap-2 text-emerald-600 font-medium"
                        whileHover={{ x: 5 }}
                      >
                        <span>Explore Collection</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>

                    {/* Image */}
                    <div className="relative h-64 lg:h-full rounded-xl overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </GlassPanel>
              </Link>
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
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}