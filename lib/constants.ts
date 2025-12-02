export const siteConfig = {
  name: "Outopia",
  tagline: "OUTDOOR LIVING SOLUTIONS",
  description: "Premium outdoor furniture and design-build solutions that transform landscapes into living experiences",
  url: "https://outopia.in",
  contact: {
    phone: "+91 9866073804",
    email: "Sales@infrascapes.in",
    whatsapp: "+91 9866073804",
    address: {
      line1: "1st Floor, 470/471, East Avenue Building",
      line2: "Off 100 Feet Road, Ayyappa Society",
      city: "Madhapur",
      state: "Hyderabad, Telangana",
      pincode: "500081",
    },
  },
  social: {
    linkedin: "https://linkedin.com/company/outopia",
    instagram: "https://instagram.com/outopia_",
    youtube: "https://youtube.com/@OutopiaIndia",
  },
};

export const navigation = {
  main: [
    { name: "Home", href: "/" },
    {
      name: "Outopia",
      href: "/products/outopia",
      submenu: [
        { name: "Seating and Benches", href: "/premium-category/seating-and-benches" },
        { name: "Outdoor Elements", href: "/premium-category/outdoor-elements" },
        { name: "Shades", href: "/premium-category/shades" },

      ],
    },
    {
      name: "Custom Products",
      href: "/products/infrascapes",
      submenu: [

        { name: "Play Equipment", href: "/premium-category/play-equipment" },
        { name: "Fitness Equipment", href: "/premium-category/fitness-equipment" },
        { name: "Water Park Equipment", href: "/premium-category/water-park-equipment" },
      ],
    },
    { name: "Design-Build Services", href: "/design-build" },
    { name: "Projects", href: "/projects" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  footer: {
    products: [
      // { name: "Seating & Benches", href: "/products/outdoor-furniture#seating" },
      // { name: "Planters", href: "/products/outdoor-furniture#planters" },
      // { name: "Pergolas & Gazebos", href: "/products/outdoor-furniture#pergolas" },
      { name: "Seating and Benches", href: "/premium-category/seating-and-benches" },
      { name: "Outdoor Elements", href: "/premium-category/outdoor-elements" },
      { name: "Shades", href: "/premium-category/shades" },
      { name: "Play Equipment", href: "/premium-category/play-equipment" },
      { name: "Fitness Equipment", href: "/premium-category/fitness-equipment" },
      { name: "Water Park Equipment", href: "/premium-category/water-park-equipment" },
    ],
    services: [
      { name: "Hardscape Design", href: "/design-build#landscape" },
      { name: "Custom Manufacturing", href: "/design-build#custom" },
      { name: "Standard Furniture", href: "/design-build#project" },
      { name: "Project Management", href: "/design-build#maintenance" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/about#team" },
      { name: "Faq's", href: "/faq" },
      { name: "Contact Us", href: "/contact" },
      // { name: "Certifications", href: "/about#certifications" },
      // { name: "Careers", href: "/careers" },
    ],
    resources: [
      { name: "Product Catalog", href: "/resources/catalog" },
      { name: "Installation Guides", href: "/resources/installation" },
      { name: "Maintenance", href: "/resources/maintenance" },
      { name: "FAQ", href: "/faq" },
    ],
  },
};

// Product categories are now managed in /lib/data/categories.ts
// Use getCategoriesByBrand() or getAllCategories() from that file

export const designBuildProcess = [
  {
    step: 1,
    title: "Brief & Consultation",
    description: "Understanding your unique requirements",
    icon: "📋",
  },
  {
    step: 2,
    title: "Concept Development",
    description: "Creative solutions tailored to your space",
    icon: "💡",
  },
  {
    step: 3,
    title: "3D Visualization",
    description: "See your project come to life digitally",
    icon: "🎨",
  },
  {
    step: 4,
    title: "Custom Manufacturing",
    description: "Precision crafting in our facilities",
    icon: "🏭",
  },
  {
    step: 5,
    title: "Professional Installation",
    description: "Expert deployment and quality assurance",
    icon: "🔧",
  },
];
