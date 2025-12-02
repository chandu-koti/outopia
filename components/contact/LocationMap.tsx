"use client";

import { motion } from "framer-motion";

export function LocationMap() {
  return (
    <section id="map" className="py-16 bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">Find Us Here</h2>
          <p className="text-gray-600">
            Visit our experience center to see our products firsthand
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-lg overflow-hidden shadow-lg"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.119113701787!2d78.38737340703666!3d17.452539771913493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9167912db879%3A0x9c2a52f82b9eb316!2sINFRASCAPES!5e0!3m2!1sen!2sin!4v1753298795389!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          <div>
            <h3 className="font-semibold mb-2">By Car</h3>
            <p className="text-gray-600 text-sm">
              Ample parking available at our facility. Located off 100 Feet Road, easily accessible from HITEC City.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">By Metro</h3>
            <p className="text-gray-600 text-sm">
              Nearest metro station: HITEC City (Blue Line). Our facility is a 10-minute auto ride from the station.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">By Bus</h3>
            <p className="text-gray-600 text-sm">
              Multiple bus routes service Madhapur area. Ayyappa Society bus stop is a 5-minute walk from our office.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}