"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { RippleButton } from "../Cards/RippleButton";
import { ArrowRight, Phone, Mail } from "lucide-react";

export function PremiumCTASection() {
  return (
    <Section size="lg" className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop"
          alt="CTA Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-800/80 to-emerald-900/90" />
      </div>
      
      {/* Floating Images */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 rounded-2xl overflow-hidden shadow-2xl opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=400&h=400&fit=crop"
          alt="Project 1"
          fill
          className="object-cover"
        />
      </motion.div>
      
      <motion.div
        className="absolute bottom-10 right-10 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl opacity-20"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop"
          alt="Project 2"
          fill
          className="object-cover"
        />
      </motion.div>
      
      <Container className="relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-display font-light mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to Transform
            <span className="block text-emerald-300">Your Outdoor Space?</span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-white/90 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Let's create something extraordinary together. Our team of experts is ready to bring 
            your vision to life with premium outdoor solutions that stand the test of time.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <RippleButton 
              size="lg" 
              className="bg-white text-emerald-600 hover:bg-neutral-100 px-8"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </RippleButton>
            <RippleButton 
              size="lg" 
              variant="secondary" 
              className="border-white text-white hover:bg-white/10 px-8"
            >
              View Catalog
            </RippleButton>
          </motion.div>
          
          {/* Quick Contact */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 text-white/90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              href="tel:+919866073804"
              className="flex items-center gap-2 hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>+91 98660 73804</span>
            </a>
            <a
              href="mailto:sales@infrascapes.in"
              className="flex items-center gap-2 hover:text-emerald-300 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>sales@infrascapes.in</span>
            </a>
          </motion.div>
        </motion.div>
        
        {/* Project Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { number: "500+", label: "Projects Completed" },
            { number: "15+", label: "Years Experience" },
            { number: "100%", label: "Client Satisfaction" },
            { number: "50+", label: "Awards Won" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-light text-emerald-300 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}