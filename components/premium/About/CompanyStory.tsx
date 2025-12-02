"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { ParallaxImage } from "../ImageEffects/ParallaxImage";
import { PathText } from "../TextEffects/PathText";

const storyChapters = [
  {
    title: "The Beginning",
    content: "In 2015, we started with a simple belief: outdoor spaces deserve the same attention to detail and quality as indoor living areas. What began in a small workshop has grown into a movement.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop",
  },
  {
    title: "Innovation at Core",
    content: "We pioneered the modular outdoor furniture concept, allowing infinite configurations from a single system. This breakthrough earned us recognition and set new industry standards.",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&h=600&fit=crop",
  },
  {
    title: "Sustainable Future",
    content: "Sustainability isn't just a buzzword for us—it's our responsibility. We use recycled materials, renewable energy, and ensure every product is built to last generations.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop",
  },
];

export function CompanyStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <Section size="xl" className="relative overflow-hidden">
      <Container>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <PathText
            text="Our Story"
            className="text-sm font-medium text-emerald-600 uppercase tracking-wider mb-4"
          />
          <h2 className="text-4xl md:text-5xl font-display font-light">
            Building a Legacy
          </h2>
        </motion.div>

        <div ref={containerRef} className="space-y-32">
          {storyChapters.map((chapter, index) => {
            const yOffset = useTransform(
              scrollYProgress,
              [index * 0.3, (index + 1) * 0.3],
              [100, -100]
            );

            const opacity = useTransform(
              scrollYProgress,
              [index * 0.3 - 0.1, index * 0.3, (index + 1) * 0.3, (index + 1) * 0.3 + 0.1],
              [0, 1, 1, 0]
            );

            return (
              <motion.div
                key={chapter.title}
                className="grid lg:grid-cols-2 gap-12 items-center"
                style={{ opacity }}
              >
                {/* Content */}
                <motion.div
                  className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
                  style={{ y: yOffset }}
                >
                  <motion.h3
                    className="text-3xl font-display font-light mb-6"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {chapter.title}
                  </motion.h3>
                  
                  <motion.p
                    className="text-lg text-neutral-600 leading-relaxed"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {chapter.content}
                  </motion.p>
                  
                  {/* Decorative line */}
                  <motion.div
                    className="mt-8 h-1 bg-gradient-to-r from-emerald-500 to-blue-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{ transformOrigin: index % 2 === 0 ? 'left' : 'right' }}
                  />
                </motion.div>

                {/* Image */}
                <motion.div
                  className={`relative h-96 rounded-2xl overflow-hidden ${
                    index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <ParallaxImage
                    src={chapter.image}
                    alt={chapter.title}
                    className="w-full h-full"
                    parallaxSpeed={0.3}
                  />
                  
                  {/* Chapter number */}
                  <motion.div
                    className="absolute top-8 left-8 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <span className="text-2xl font-display font-light">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}