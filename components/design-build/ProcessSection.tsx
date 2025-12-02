"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Lightbulb,
  Palette,
  FileText,
  Factory,
  CheckCircle2
} from "lucide-react";

const processSteps = [
  {
    icon: ClipboardList,
    title: "Discovery & Brief",
    description: "We begin by understanding your vision, requirements, and constraints. Our team conducts site analysis, user needs assessment, and budget planning.",
    details: [
      "Site evaluation and analysis",
      "Stakeholder consultation",
      "Budget planning",
      "Timeline establishment",
    ],
  },
  {
    icon: Lightbulb,
    title: "Concept Development",
    description: "Our creative team develops multiple design concepts that balance aesthetics, functionality, and budget.",
    details: [
      "Initial sketches and ideas",
      "Material exploration",
      "Functionality mapping",
      "Cost estimation",
    ],
  },
  {
    icon: Palette,
    title: "Design Refinement",
    description: "Working collaboratively with you, we refine the chosen concept, developing detailed plans and 3D visualizations.",
    details: [
      "3D modeling and rendering",
      "Material selection",
      "Color schemes",
      "Technical drawings",
    ],
  },
  {
    icon: FileText,
    title: "Documentation & Approvals",
    description: "We prepare comprehensive construction documents, technical specifications, and handle necessary approvals.",
    details: [
      "Construction drawings",
      "Technical specifications",
      "Permit applications",
      "Compliance documentation",
    ],
  },
  {
    icon: Factory,
    title: "Manufacturing & Construction",
    description: "Our facilities manufacture custom elements while our construction team prepares the site.",
    details: [
      "Custom fabrication",
      "Quality control",
      "Site preparation",
      "Progress monitoring",
    ],
  },
  {
    icon: CheckCircle2,
    title: "Installation & Handover",
    description: "Professional installation teams deploy equipment with precision, followed by thorough quality checks.",
    details: [
      "Professional installation",
      "Quality inspection",
      "Client walkthrough",
      "Maintenance training",
    ],
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Proven Process
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Six strategic steps ensure your project&apos;s success from initial concept to final installation
          </p>
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden lg:block relative">
          {/* Vertical line connecting all steps */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />
          
          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div className="flex-1">
                  <div className={`bg-white rounded-xl shadow-lg p-8 ${
                    index % 2 === 0 ? "mr-8" : "ml-8"
                  }`}>
                    <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="relative z-10">
                  <div className="w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-gray-50">
                    <step.icon className="w-16 h-16 text-primary" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden space-y-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Header with Icon */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center">
                      <step.icon className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold flex-1">{step.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-start text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}