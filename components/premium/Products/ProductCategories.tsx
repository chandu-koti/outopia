"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { DepthCard } from "../Cards/DepthCard";
import { ArrowRight } from "lucide-react";
import { getAllCategories } from "@/lib/data/categories";

const categories = [
  {
    id: "seating-and-benches",
    title: "Seating and Benches",
    description: "Safe, engaging play structures designed to inspire imagination",
    image: "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tridasa/4.jpg",
    href: "/premium-category/seating-and-benches",
    count: '80+ Products',
  },

  {
    id: "outdoor-elements",
    title: "Outdoor Elements",
    description: "Safe, engaging play structures designed to inspire imagination",
    image: "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/40s-infra/1.jpeg",
    href: "/premium-category/outdoor-elements",
    count: '80+ Products',
  },

  {
    id: "shades",
    title: "Shades",
    description: "Safe, engaging play structures designed to inspire imagination",
    image: "/images/UPDATE-1.jpg.jpeg",
    href: "/premium-category/shades",
    count: '80+ Products',
  },
  {
    id: 'play-equipment',
    title: 'Play Equipment',
    description: 'Safe, innovative playground solutions that inspire creativity and fun',
    image: 'https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/muppa-melody/2.jpg',
    href: '/premium-category/play-equipment',
    count: '80+ Products',
  },
  {
    id: 'fitness-equipment',
    title: 'Fitness Equipment',
    description: 'Durable outdoor gym equipment for parks and recreational areas',
    image: 'https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/botinical-garden/5.jpg',
    href: '/premium-category/fitness-equipment',
    count: '60+ Products',
  },
  {
    id: 'water-park',
    title: 'Water Front Equipment',
    description: 'Exciting water features and splash pad equipment for all ages',
    image: 'https://images.unsplash.com/photo-1472805911884-dc4c5797ee37?q=80&w=2070',
    href: '/premium-category/water-park-equipment',
    count: '40+ Products',
  },
];

export function ProductCategories({ brand }: { brand: string }) {
  return (
    <Section size="lg" className="bg-neutral-50" >
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-light mb-4">
            Explore Our Categories
          </h2>
          <p className="text-xl text-neutral-600">
            Complete solutions for every outdoor space
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {getAllCategories()
            .filter(category => brand ? category.brand === brand : true)
            .map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={category.href} className="block group">
                  <div className="relative h-[500px] overflow-hidden rounded-2xl">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <p className="text-emerald-400 text-sm font-medium mb-2">
                          {category.count}
                        </p>
                        <h3 className="text-3xl font-display font-light mb-3">
                          {category.name}
                        </h3>
                        <p className="text-neutral-300 mb-4">
                          {category.description}
                        </p>
                        <motion.div
                          className="flex items-center gap-2 text-emerald-400 font-medium"
                          whileHover={{ x: 10 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <span>Explore Collection</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
      </Container>
    </Section>
  );
}