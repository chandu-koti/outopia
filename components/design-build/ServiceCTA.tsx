"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Phone, Mail } from "lucide-react";

export function ServiceCTA() {
  return (
    <section className="py-24 bg-primary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Vision into Reality?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Let&apos;s discuss how our design-build expertise can bring your outdoor project to life
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button 
              href="/contact" 
              size="lg" 
              variant="secondary"
              className="group"
            >
              Start Your Project
            </Button>
            <a
              href="tel:+919866073804"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-primary transition-all duration-200"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center text-sm">
            <a
              href="tel:+919866073804"
              className="flex items-center justify-center text-gray-100 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              +91 9866073804
            </a>
            <a
              href="mailto:Sales@outopiafurniture.com"
              className="flex items-center justify-center text-gray-100 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Sales@outopiafurniture.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
