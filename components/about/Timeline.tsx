"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "2022",
    title: "Company Founded",
    description: "Infrascapes established with ₹5.5 crores investment in Hyderabad",
  },
  {
    year: "2022",
    title: "Manufacturing Facility",
    description: "State-of-the-art facility opened in Madhapur",
  },
  {
    year: "2022",
    title: "First Major Project",
    description: "Completed Tech Park Millennium with 200+ installations",
  },
  {
    year: "2022",
    title: "Expansion",
    description: "Extended services to 15+ cities across India",
  },
  {
    year: "Future",
    title: "Vision 2025",
    description: "Targeting 1000+ projects and international expansion",
  },
];

export function Timeline() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From inception to innovation, tracking our growth milestones
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300" />

            {/* Milestones */}
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
              >
                <div
                  className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                    }`}
                >
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="text-primary font-bold text-xl mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}