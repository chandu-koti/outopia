"use client";

import { motion } from "framer-motion";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function ContactHero() {
  return (
    <Section size="md" className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <Container>
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl md:text-7xl font-display font-light mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in Touch
          </motion.h1>
          
          <motion.p
            className="text-xl text-neutral-600 mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to transform your outdoor space? Our team of experts is here to help 
            bring your vision to life. Reach out today to start your journey.
          </motion.p>
          
          {/* Quick Contact */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-medium mb-1">Call Us</h3>
              <p className="text-sm text-neutral-600">+91 98660 73900</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-medium mb-1">Email</h3>
              <p className="text-sm text-neutral-600">sales@infrascapes.in</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-medium mb-1">Visit Us</h3>
              <p className="text-sm text-neutral-600">Madhapur, Hyderabad</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-medium mb-1">Business Hours</h3>
              <p className="text-sm text-neutral-600">Mon-Sat: 9AM-6PM</p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}