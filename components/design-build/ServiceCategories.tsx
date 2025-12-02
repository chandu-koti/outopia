"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

const services = [
  {
    id: "hardescape-design",
    title: "Hardscape Design",
    description: "Creating outdoor environments that inspire and function beautifully. From corporate campuses to public parks, we design spaces that enhance quality of life.",
    features: [
      "Site planning and analysis",
      "Hardscape and softscape design",
      "Sustainable design practices",
      "3D visualization",
    ],
    link: "contact",
    linkText: 'Get Quote',
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  },
  {
    id: "custom-manufacturing",
    title: "Custom Manufacturing",
    description: "When standard products don't fit your vision, our manufacturing capabilities create bespoke solutions tailored to your exact requirements.",
    features: [
      "Custom furniture design",
      "Special finishes and materials",
      "Prototype development",
      "Small to large scale production",
    ],
    link: "contact",
    linkText: 'Get Quote',
    image: "/images/UPDATE-1.jpg.jpeg",
  },
  {
    id: "project-management",
    title: "Project Management",
    description: "Dedicated project managers ensure timely delivery, budget adherence, and quality standards throughout your project lifecycle.",
    features: [
      "Timeline management",
      "Budget control",
      "Vendor coordination",
      "Quality assurance",
    ],
    link: "contact",
    linkText: 'Get Quote',
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
  },
  {
    id: "standard-furniture",
    title: "Standard Furniture",
    description: "Protect your investment with our comprehensive maintenance services, keeping your outdoor spaces beautiful and functional year-round.",
    features: [
      "Scheduled maintenance",
      "Emergency repairs",
      "Seasonal adjustments",
      "Performance monitoring",
    ],
    link: "products",
    linkText: 'View Products',
    image: "/images/UPDATE-3.jpg.jpeg",
  },
];

export function ServiceCategories() {
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Service Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions tailored to your specific needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full group">
                <div className="grid lg:grid-cols-2 h-full">
                  <div className="relative h-64 lg:h-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`${service.link}`}
                      className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                    >
                      {service.linkText}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}