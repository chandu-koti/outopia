"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is the typical timeline for a design-build project?",
    answer: "Project timelines vary based on scope and complexity. Small projects typically take 4-8 weeks, while larger commercial projects can range from 3-6 months. We provide detailed timelines during the initial consultation.",
  },
  {
    question: "Do you work with residential clients?",
    answer: "Yes! We work with both residential and commercial clients. Whether you need a backyard transformation or a complete commercial landscape, our team has the expertise to deliver exceptional results.",
  },
  {
    question: "Can you work with our existing landscape architect?",
    answer: "Absolutely. We're happy to collaborate with your existing design team or consultants. Our flexible approach ensures seamless integration with your preferred professionals.",
  },
  {
    question: "What areas do you service?",
    answer: "We primarily serve Hyderabad and surrounding areas within Telangana. For large projects, we can extend our services to other parts of India. Contact us to discuss your location.",
  },
  {
    question: "How do you ensure project stays within budget?",
    answer: "We provide detailed cost estimates upfront and maintain transparent communication throughout the project. Our project managers track expenses closely and inform you of any potential changes before proceeding.",
  },
  // {
  //   question: "Do you provide maintenance services after installation?",
  //   answer: "Yes, we offer comprehensive maintenance programs to keep your outdoor spaces in pristine condition. These can be customized based on your specific needs and budget.",
  // },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our design-build services
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-primary" />
                  ) : (
                    <Plus className="w-5 h-5 text-primary" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}