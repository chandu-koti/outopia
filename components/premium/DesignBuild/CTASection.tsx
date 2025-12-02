"use client";

import { motion } from "framer-motion";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { GlassPanel } from "../UI/GlassPanel";
import { RippleButton } from "../Cards/RippleButton";
import { Phone, Mail, Calendar } from "lucide-react";

export function CTASection() {
  return (
    <Section size="lg" className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 -z-10" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay -z-10" />
      
      <Container>
        <GlassPanel variant="dark" className="p-12 md:p-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-display font-light text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
              Let's discuss your project and create something extraordinary together. 
              Our team is ready to bring your vision to life.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <RippleButton size="lg" className="bg-white text-emerald-600 hover:bg-neutral-100">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Consultation
              </RippleButton>
              <RippleButton size="lg" variant="secondary" className="border-white text-white hover:bg-white/10">
                Download Brochure
              </RippleButton>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-8 text-white/90">
              <motion.a
                href="tel:+919876543210"
                className="flex items-center gap-2 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="w-5 h-5" />
                +91 98765 43210
              </motion.a>
              <motion.a
                href="mailto:designbuild@infrascapes.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="w-5 h-5" />
                designbuild@infrascapes.com
              </motion.a>
            </div>
          </motion.div>
          
          {/* Floating Elements */}
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"
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
            className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </GlassPanel>
      </Container>
    </Section>
  );
}