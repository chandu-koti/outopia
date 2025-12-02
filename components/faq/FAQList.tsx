"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqCategories = [
  {
    category: "General",
    questions: [
      {
        question: "What makes Infrascapes different from other outdoor furniture companies?",
        answer: "Our modular design philosophy sets us apart. We don't just sell furniture; we provide complete outdoor solutions with in-house design, manufacturing, and installation capabilities. Our products are specifically engineered for Indian weather conditions and backed by a 5-year warranty.",
      },
      {
        question: "Where are your products manufactured?",
        answer: "All our products are manufactured at our state-of-the-art facility in Madhapur, Hyderabad. This allows us to maintain strict quality control and offer custom solutions.",
      },
      {
        question: "Do you provide installation services?",
        answer: "Yes, we provide professional installation services for all our products. Our trained installation teams ensure proper setup and safety compliance.",
      },
    ],
  },
  {
    category: "Products",
    questions: [
      {
        question: "What materials do you use for outdoor furniture?",
        answer: "We use weather-resistant materials including treated wood, powder-coated metals, stainless steel, HDPE plastics, and UV-stable composites. All materials are selected for durability in Indian climate conditions.",
      },
      {
        question: "Can I customize products according to my requirements?",
        answer: "Absolutely! We offer extensive customization options including dimensions, colors, materials, and features. Our design team can work with you to create bespoke solutions.",
      },
      {
        question: "What safety certifications do your products have?",
        answer: "Our playground equipment is EN 1176 certified, fitness equipment meets EN 16630 standards, and we maintain ISO 9001:2015 certification for quality management.",
      },
    ],
  },
  {
    category: "Ordering & Delivery",
    questions: [
      {
        question: "What is the typical lead time for orders?",
        answer: "Standard products typically have a lead time of 2-4 weeks. Custom products may take 4-8 weeks depending on complexity. We provide accurate timelines during order confirmation.",
      },
      {
        question: "Do you deliver across India?",
        answer: "Yes, we deliver across India. Free delivery is available in Telangana. For other states, delivery charges apply based on location and order size.",
      },
      {
        question: "What is your minimum order quantity?",
        answer: "We don't have a strict minimum order quantity for most products. However, for custom manufacturing, minimum quantities may apply depending on the product type.",
      },
    ],
  },
  {
    category: "Warranty & Maintenance",
    questions: [
      {
        question: "What does your 2-year warranty cover?",
        answer: "Our warranty covers manufacturing defects, structural integrity, and premature wear under normal use conditions. It doesn't cover damage from misuse, vandalism, or natural disasters.",
      },
      // {
      //   question: "Do you provide maintenance services?",
      //   answer: "Yes, we offer comprehensive maintenance programs including scheduled inspections, cleaning, repairs, and part replacements to keep your installations in optimal condition.",
      // },
      {
        question: "How do I claim warranty?",
        answer: "Contact our customer service with your order details and photos of the issue. We'll assess the claim and arrange for repair or replacement as per warranty terms.",
      },
    ],
  },
];

export function FAQList() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="section-padding">
      <div className="container max-w-4xl">
        {faqCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold mb-6">{category.category}</h2>
            <div className="space-y-4">
              {category.questions.map((item, index) => {
                const itemId = `${category.category}-${index}`;
                const isOpen = openItems.includes(itemId);

                return (
                  <motion.div
                    key={itemId}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white rounded-lg shadow-sm border"
                  >
                    <button
                      onClick={() => toggleItem(itemId)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-medium pr-4">{item.question}</h3>
                      <div className="flex-shrink-0">
                        {isOpen ? (
                          <Minus className="w-5 h-5 text-primary" />
                        ) : (
                          <Plus className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 text-gray-600">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}