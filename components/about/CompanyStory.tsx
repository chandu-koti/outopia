"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function CompanyStory() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Infrascapes was born from a simple observation: outdoor spaces in India deserved better detail. Founded
                by industry veteran Vijay Maroo, we set out to revolutionize how outdoor environments are designed and
                furnished. Outopia, our outdoor funiture start up brand is revolutionizing the outdoor living.


              </p>
              <p>
                With a substantial investment and a team of passionate professionals, we've quickly established ourselves
                as innovators in the outdoor furniture and outdoor design-build space. Our Madhapur facility serves as
                creative hub and manufacturing center at chandanvelly spread across 2.5 acres, where ideas are transform
                into reality.
              </p>
              <p>
                What sets us apart is our modular design philosophy. We don't just create outdoors; we create
                possibilities. Each elements is designed to adapt, evolve, and integrate seamlessly with your vision,
                ensuring that your outdoor spaces are as dynamic as yours needs
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
                alt="Infrascapes facility"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-lg shadow-xl">
              <div className="text-4xl font-bold">2022 </div>
              <div className="text-sm"> Established</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}