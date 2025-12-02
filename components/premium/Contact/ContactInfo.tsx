"use client";

import { motion } from "framer-motion";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { GlassPanel } from "../UI/GlassPanel";
import { Phone, Mail, MapPin, Clock, MessageCircle, Globe } from "lucide-react";
import Image from "next/image";

const contactDetails = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 98660 73804"],
    action: "Call Now",
    href: "tel:+919866073804",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["sales@outopia.in", "info@outopia.in"],
    action: "Send Email",
    href: "mailto:sales@outopia.in",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    details: ["Quick response on WhatsApp", "+91 9866073804"],
    action: "Chat Now",
    href: "https://wa.me/919866073804 ",
  },
  {
    icon: Globe,
    title: "Social Media",
    details: ["LinkedIn: @outopia", "Instagram: @outopia_"],
    action: "Follow Us",
    href: "https://linkedin.com/company/outopia",
  },
];

export function ContactInfo() {
  return (
    <Section size="lg" className="bg-neutral-50">
      <Container>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-display font-light mb-4">
            Multiple Ways to Connect
          </h2>
          <p className="text-xl text-neutral-600">
            Choose the communication method that works best for you
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactDetails.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassPanel className="p-6 h-full hover:shadow-xl transition-shadow">
                <item.icon className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                <div className="space-y-1 mb-4">
                  {item.details.map((detail) => (
                    <p key={detail} className="text-sm text-neutral-600">
                      {detail}
                    </p>
                  ))}
                </div>
                <motion.a
                  href={item.href}
                  className="inline-flex items-center gap-2 text-emerald-500 font-medium hover:text-emerald-600 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  {item.action}
                  <span>→</span>
                </motion.a>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {/* Office Info */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-display font-light mb-6">
              Visit Our Headquarters
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Office Address</h4>
                  <p className="text-neutral-600">
                    470/471, 1st Floor, North East Avenue Building<br />
                    Off 100 Feet Road, Ayyappa Society<br />
                    Madhapur, Hyderabad, Telangana 500081
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Business Hours</h4>
                  <p className="text-neutral-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 5:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
            
            <motion.a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Directions
              <span>↗</span>
            </motion.a>
          </motion.div>
          
          <motion.div
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
              alt="Outopia Office"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-sm opacity-90">Outopia Headquarters</p>
              <p className="text-2xl font-light">Hyderabad, India</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
