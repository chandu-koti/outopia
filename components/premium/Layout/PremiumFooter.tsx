"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { GlassPanel } from "../UI/GlassPanel";
import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Instagram,
  Youtube,
  ArrowUpRight
} from "lucide-react";

const footerLinks = {
  products: [
    { name: "Outdoor Furniture", href: "/premium-category/outdoor-furniture" },
    { name: "Play Equipment", href: "/premium-category/play-equipment" },
    { name: "Fitness Equipment", href: "/premium-category/fitness-equipment" },
    { name: "Water Park Equipment", href: "/premium-category/water-park-equipment" },
  ],
  services: [
    { name: "Design Consultation", href: "/premium-design-build#consultation" },
    { name: "3D Visualization", href: "/premium-design-build#visualization" },
    { name: "Installation", href: "/premium-design-build#installation" },
    { name: "Maintenance", href: "/premium-design-build#maintenance" },
  ],
  company: [
    { name: "About Us", href: "/premium-about" },
    { name: "Projects", href: "/premium-projects" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/premium-contact" },
  ],
  resources: [
    { name: "Catalog", href: "/catalog" },
    { name: "Warranty", href: "/warranty" },
    { name: "Care Guide", href: "/care-guide" },
    { name: "Blog", href: "/blog" },
  ],
};

export function PremiumFooter() {
  return (
    <footer className="relative bg-neutral-900 text-white pt-20 pb-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <Image
                  src="/images/logo/cropped-cropped-OFFICE-LOGO-01-300x54-1.png"
                  alt="Infrascapes Logo"
                  width={180}
                  height={32}
                  className="h-8 w-auto object-contain brightness-0 invert"
                />
              </div>
              <p className="text-neutral-400 mb-6">
                Premium outdoor living solutions that transform spaces into experiences.
              </p>

              {/* Social links */}
              <div className="flex gap-4">
                <motion.a
                  href="https://linkedin.com/company/infrascapes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://instagram.com/infrascapes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://youtube.com/infrascapes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Youtube className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Links sections */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-medium mb-4 capitalize">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-neutral-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1 group"
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassPanel className="p-8 mb-8" variant="dark">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-emerald-400 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Visit Us</h4>
                  <p className="text-neutral-400 text-sm">
                    Plot No. 123, Phase II, IDA Jeedimetla,<br />
                    Hyderabad, Telangana 500055
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-emerald-400 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Call Us</h4>
                  <p className="text-neutral-400 text-sm">
                    +91 40 1234 5678<br />
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-emerald-400 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Email Us</h4>
                  <p className="text-neutral-400 text-sm">
                    info@infrascapes.in<br />
                    sales@infrascapes.in
                  </p>
                </div>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm">
              © 2024 Infrascapes. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-neutral-400 hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-neutral-400 hover:text-emerald-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-neutral-400 hover:text-emerald-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}