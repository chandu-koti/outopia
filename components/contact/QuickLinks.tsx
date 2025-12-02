"use client";

import { motion } from "framer-motion";
import { Download, Calendar, FileText, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";

const quickActions = [
  {
    icon: Download,
    title: "Download Product Catalog",
    description: "Get our complete product catalog with specifications",
    action: "/catalog",
    actionText: "Download PDF",
  },
  {
    icon: Calendar,
    title: "Schedule Site Visit",
    description: "Book a visit to discuss your project requirements",
    action: "/contact",
    actionText: "Schedule Visit",
  },
  {
    icon: FileText,
    title: "Request Samples",
    description: "Get material and finish samples delivered to you",
    action: "/contact",
    actionText: "Request Samples",
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    description: "Find answers to commonly asked questions",
    action: "/faq",
    actionText: "View FAQ",
  },
];

export function QuickLinks() {
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
          <h2 className="text-3xl font-bold mb-4">Quick Actions</h2>
          <p className="text-gray-600">
            Need something specific? We&apos;re here to help
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full flex flex-col">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <action.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {action.description}
                  </p>
                </div>
                <a
                  href={action.action}
                  className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  {action.actionText} →
                </a>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}