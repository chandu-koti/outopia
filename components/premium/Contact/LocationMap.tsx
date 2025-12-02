"use client";

import { motion } from "framer-motion";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";

export function LocationMap() {
  return (
    <Section size="lg">
      <Container>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-display font-light mb-4">
            Find Us Here
          </h2>
          <p className="text-xl text-neutral-600">
            Conveniently located in the heart of Hyderabad's business district
          </p>
        </motion.div>

        <motion.div
          className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Map placeholder - In real implementation, use Google Maps embed */}
          <div className="w-full h-full bg-neutral-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.464434656836!2d78.3892!3d17.4376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzE1LjQiTiA3OMKwMjMnMjEuMSJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          
          {/* Map Overlay with Info */}
          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-sm">
            <h3 className="text-xl font-medium mb-2">Infrascapes India</h3>
            <p className="text-sm text-neutral-600 mb-3">
              470/471, 1st Floor, North East Avenue Building<br />
              Off 100 Feet Road, Ayyappa Society<br />
              Madhapur, Hyderabad - 500081
            </p>
            <div className="flex gap-3">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-emerald-500 font-medium hover:text-emerald-600 transition-colors"
              >
                Open in Maps →
              </a>
              <a
                href="tel:+919866073804"
                className="text-sm text-emerald-500 font-medium hover:text-emerald-600 transition-colors"
              >
                Call Now →
              </a>
            </div>
          </div>
        </motion.div>
        
        {/* Nearby Landmarks */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-emerald-600">🚇</span>
            </div>
            <h4 className="font-medium mb-1">Nearest Metro</h4>
            <p className="text-sm text-neutral-600">Madhapur Station - 1.2 km</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-emerald-600">✈️</span>
            </div>
            <h4 className="font-medium mb-1">From Airport</h4>
            <p className="text-sm text-neutral-600">35 minutes drive</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-emerald-600">🅿️</span>
            </div>
            <h4 className="font-medium mb-1">Parking</h4>
            <p className="text-sm text-neutral-600">Ample visitor parking available</p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}