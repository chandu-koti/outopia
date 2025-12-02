"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface ProjectTestimonialProps {
  testimonial: {
    text: string;
    author: string;
    designation: string;
  };
}

export function ProjectTestimonial({ testimonial }: ProjectTestimonialProps) {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Quote className="w-12 h-12 text-primary mx-auto mb-6" />
          <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 italic">
            "{testimonial.text}"
          </blockquote>
          <div>
            <p className="font-semibold text-lg">{testimonial.author}</p>
            <p className="text-gray-600">{testimonial.designation}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}