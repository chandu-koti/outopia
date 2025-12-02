export const premiumNavigation = {
  main: [
    { name: "Home", href: "/premium-home" },
    {
      name: "Products",
      href: "/premium-category",
      submenu: [
        { name: "Outdoor Furniture", href: "/premium-category/outdoor-furniture" },
        { name: "Play Equipment", href: "/premium-category/play-equipment" },
        { name: "Fitness Equipment", href: "/premium-category/fitness-equipment" },
        { name: "Water Park Equipment", href: "/premium-category/water-park-equipment" },
      ],
    },
    { name: "Design-Build", href: "/premium-design-build" },
    { name: "Projects", href: "/premium-projects" },
    { name: "About", href: "/premium-about" },
    { name: "Contact", href: "/premium-contact" },
  ],
  footer: {
    products: [
      { name: "Outdoor Furniture", href: "/premium-category/outdoor-furniture" },
      { name: "Play Equipment", href: "/premium-category/play-equipment" },
      { name: "Fitness Equipment", href: "/premium-category/fitness-equipment" },
      { name: "Water Park Equipment", href: "/premium-category/water-park-equipment" },
      { name: "Custom Solutions", href: "/premium-category/custom" },
    ],
    services: [
      { name: "Landscape Design", href: "/premium-design-build#landscape" },
      { name: "3D Visualization", href: "/premium-design-build#visualization" },
      { name: "Project Management", href: "/premium-design-build#management" },
      { name: "Custom Manufacturing", href: "/premium-design-build#manufacturing" },
      { name: "Installation Services", href: "/premium-design-build#installation" },
    ],
    company: [
      { name: "About Outopia", href: "/premium-about" },
      { name: "Our Process", href: "/premium-about#process" },
      { name: "Awards & Recognition", href: "/premium-about#awards" },
      { name: "Sustainability", href: "/premium-about#sustainability" },
      { name: "Career Opportunities", href: "/premium-careers" },
    ],
    support: [
      { name: "Contact Us", href: "/premium-contact" },
      { name: "Request Quote", href: "/premium-contact#quote" },
      { name: "Schedule Consultation", href: "/premium-contact#consultation" },
      { name: "Technical Support", href: "/premium-support" },
      { name: "FAQs", href: "/premium-faq" },
    ],
  },
};
