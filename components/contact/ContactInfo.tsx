"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/constants";

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    details: siteConfig.contact.phone,
    action: `tel:${siteConfig.contact.phone}`,
    actionText: "Call Now",
    color: "bg-primary",
  },
  {
    icon: Mail,
    title: "Email",
    details: siteConfig.contact.email,
    action: `mailto:${siteConfig.contact.email}`,
    actionText: "Send Email",
    color: "bg-secondary-blue",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    details: siteConfig.contact.whatsapp,
    action: `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`,
    actionText: "Chat Now",
    color: "bg-green-600",
  },
];

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Quick Contact Methods */}
      <div className="space-y-4">
        {contactMethods.map((method, index) => (
          <motion.div
            key={method.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${method.color} text-white rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <method.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{method.title}</h3>
                  <p className="text-gray-600 mb-3">{method.details}</p>
                  <a
                    href={method.action}
                    target={method.title === "WhatsApp" ? "_blank" : undefined}
                    rel={method.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                  >
                    {method.actionText} →
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Office Address */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-secondary-terracotta text-white rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-3">Visit Our Experience Center</h3>
              <address className="text-gray-600 not-italic mb-4">
                {siteConfig.contact.address.line1}<br />
                {siteConfig.contact.address.line2}<br />
                {siteConfig.contact.address.city}, {siteConfig.contact.address.state}<br />
                {siteConfig.contact.address.pincode}
              </address>
              <Button href="#map" variant="secondary" size="sm">
                Get Directions
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Office Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-secondary-sage text-white rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-3">Office Hours</h3>
              <div className="text-gray-600 space-y-1">
                <p><span className="font-medium">Monday - Saturday:</span> 9:00 AM - 7:00 PM</p>
                <p><span className="font-medium">Sunday:</span> Closed</p>
                <p className="text-sm pt-2">* Available on WhatsApp 24/7 for inquiries</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}