"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface NextLevelProductsHeroProps {
  brand: "outopia" | "infrascapes";
}

const heroData = {
  outopia: {
    title: "OUTOPIA",
    subtitle: "Premium Outdoor Living",
    description: "Transform spaces with elegant seating, innovative shades, and contemporary outdoor elements designed for modern lifestyles",
    image: "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tridasa/4.jpg",
    logo: "/images/logo/infrascapes-light.png",
    gradient: "from-emerald-600 to-teal-700",
    accentColor: "text-emerald-600",
    primaryButton: "Explore Outopia Collection",
    primaryButtonLink: "#products",
    secondaryButton: "Download Outopia Catalog",
    secondaryButtonLink: "/contact",
  },
  infrascapes: {
    title: "INFRASCAPES",
    subtitle: "Active Living Solutions",
    description: "Creating extraordinary outdoor experiences with world-class play equipment, fitness installations, and aquatic adventures",
    image: "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/muppa-melody/2.jpg",
    logo: "/images/logo/outopia-light.png",
    gradient: "from-blue-600 to-indigo-700",
    accentColor: "text-blue-600",
    primaryButton: "View Projects",
    primaryButtonLink: "/projects",
    secondaryButton: "Get Quote",
    secondaryButtonLink: "/contact",
  },
};

export function NextLevelProductsHero({ brand }: NextLevelProductsHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const data = heroData[brand];

  return (
    <div ref={containerRef} className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <Image
          src={data.image}
          alt={`${brand} hero`}
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </motion.div>

      {/* Animated Gradient Overlay */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${data.gradient} mix-blend-multiply opacity-30`}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center px-4"
        style={{ y: textY, opacity }}
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo */}
          {data.logo && (
            <motion.div
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Image
                src={data.logo}
                alt={`${brand} logo`}
                width={brand === "outopia" ? 250 : 300}
                height={100}
                className="h-auto"
              />
            </motion.div>
          )}

          {/* Subtitle */}
          <motion.div
            className="mb-4 md:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.p
              className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {data.subtitle}
            </motion.p>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-6 md:mb-10 leading-relaxed px-4 sm:px-6 md:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {data.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Link href={data.primaryButtonLink}>
              <motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-semibold rounded-full hover:scale-105 transition-transform text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {data.primaryButton}
              </motion.button>
            </Link>
            <Link href={data.secondaryButtonLink}>
              <motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {data.secondaryButton}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}