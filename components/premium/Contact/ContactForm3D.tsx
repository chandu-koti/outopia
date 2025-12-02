"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Box, Sphere } from "@react-three/drei";
import { Container } from "../Layout/Container";
import { Section } from "../Layout/Section";
import { GlassPanel } from "../UI/GlassPanel";
import { RippleButton } from "../Cards/RippleButton";
import { Send, CheckCircle } from "lucide-react";

function FormBackground() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      
      {/* Floating shapes */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Box args={[1, 1, 1]} position={[-3, 2, -5]}>
          <meshPhysicalMaterial
            color="#10B981"
            metalness={0.8}
            roughness={0.2}
            opacity={0.3}
            transparent
          />
        </Box>
      </Float>
      
      <Float speed={3} rotationIntensity={0.3} floatIntensity={0.7}>
        <Sphere args={[0.5, 32, 32]} position={[3, -1, -4]}>
          <meshPhysicalMaterial
            color="#3B82F6"
            metalness={0.9}
            roughness={0.1}
            opacity={0.3}
            transparent
          />
        </Sphere>
      </Float>
    </>
  );
}

export function ContactForm3D() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Section size="lg" className="relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10 opacity-50">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <FormBackground />
        </Canvas>
      </div>
      
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-display font-light mb-8">
              Start Your Project
            </h2>
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-neutral-300 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-neutral-300 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("company")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-neutral-300 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Type</label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("projectType")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-neutral-300 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="public">Public Space</option>
                        <option value="consultation">Consultation</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Range</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("budget")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-neutral-300 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                      >
                        <option value="">Select Budget</option>
                        <option value="<10L">Under ₹10 Lakhs</option>
                        <option value="10-25L">₹10-25 Lakhs</option>
                        <option value="25-50L">₹25-50 Lakhs</option>
                        <option value=">50L">Above ₹50 Lakhs</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-neutral-300 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your project vision..."
                      required
                    />
                  </div>
                  
                  <RippleButton
                    variant="primary"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    Send Message
                    <Send className="w-5 h-5" />
                  </RippleButton>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-display font-light mb-4">
                    Thank You!
                  </h3>
                  <p className="text-neutral-600">
                    We've received your message and will get back to you within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Info Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassPanel className="p-8" variant="light">
              <h3 className="text-xl font-medium mb-4">Why Choose Infrascapes?</h3>
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Free consultation and site assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>3D visualization before implementation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>5-year warranty on all products</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Professional installation team</span>
                </li>
              </ul>
            </GlassPanel>
            
            <GlassPanel className="p-8" variant="light">
              <h3 className="text-xl font-medium mb-4">Project Timeline</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Consultation</span>
                    <span className="text-neutral-500">1-2 days</span>
                  </div>
                  <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="h-full w-1/5 bg-emerald-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Design & Planning</span>
                    <span className="text-neutral-500">1-2 weeks</span>
                  </div>
                  <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="h-full w-2/5 bg-blue-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Production</span>
                    <span className="text-neutral-500">2-4 weeks</span>
                  </div>
                  <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/5 bg-amber-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Installation</span>
                    <span className="text-neutral-500">2-5 days</span>
                  </div>
                  <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-purple-500 rounded-full" />
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}