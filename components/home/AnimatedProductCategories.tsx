"use client";

import { getCategoriesByBrand } from "@/lib/data/categories";
import { AnimatedProductCard } from "./AnimatedProductCard";
import { TextReveal } from "@/components/animations/TextReveal";
import { FadeIn } from "@/components/animations/FadeIn";
import Image from "next/image";

export function AnimatedProductCategories({ brand, title, subtitle, logo }: { brand?: string; title: string; subtitle: string; logo?: string }) {
  // Determine logo sizing based on brand
  const getLogoClass = () => {
    if (brand === "outopia") {
      return "h-32 md:h-40 lg:h-48 w-auto object-contain max-w-sm md:max-w-md lg:max-w-lg";
    } else if (brand === "infrascapes") {
      return "h-16 md:h-20 lg:h-24 w-auto object-contain max-w-sm md:max-w-md lg:max-w-lg";
    }
    return "h-20 md:h-24 lg:h-32 w-auto object-contain max-w-xs md:max-w-sm";
  };
  return (
    <section className="section-padding">
      <div className="container">
        <FadeIn className="text-center mb-12">
          {logo ? <div className="w-full flex flex-row justify-center items-center mb-8 px-4">
            <Image
              src={logo}
              alt={`${brand || title} logo`}
              width={600}
              height={200}
              className={getLogoClass()}
              priority
            /></div> : <TextReveal
              as="h2"
              className="text-3xl md:text-4xl font-bold mb-4"
            >
            {title}
          </TextReveal>}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">

            {subtitle}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {getCategoriesByBrand(brand || '')
            .map((category, index) => (
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