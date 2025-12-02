import { getCategoriesByBrand } from "./categories";
import { brandsData } from "./brands";

// Generate navigation dynamically from brands and categories
export function generateNavigation() {
  const outopiaCategories = getCategoriesByBrand('outopia');
  const infrascapesCategories = getCategoriesByBrand('infrascapes');

  return {
    main: [
      { name: "Home", href: "/" },
      {
        name: "Outopia",
        href: "/products/outopia",
        submenu: outopiaCategories.map(cat => ({
          name: cat.name,
          href: cat.href
        }))
      },
      {
        name: "Custom Products",
        href: "/products/infrascapes",
        submenu: infrascapesCategories.map(cat => ({
          name: cat.name,
          href: cat.href
        }))
      },
      { name: "Design-Build Services", href: "/design-build" },
      { name: "Projects", href: "/projects" },
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
    footer: {
      outopia: outopiaCategories.map(cat => ({
        name: cat.name,
        href: cat.href
      })),
      infrascapes: infrascapesCategories.map(cat => ({
        name: cat.name,
        href: cat.href
      })),
      services: [
        { name: "Hardscape Design", href: "/design-build#landscape" },
        { name: "Custom Manufacturing", href: "/design-build#custom" },
        { name: "Standard Furniture", href: "/design-build#project" },
        { name: "Project Management", href: "/design-build#maintenance" },
      ],
      company: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/about#team" },
        { name: "FAQ's", href: "/faq" },
        { name: "Contact Us", href: "/contact" },
      ],
      resources: [
        { name: "Product Catalog", href: "/resources/catalog" },
        { name: "Installation Guides", href: "/resources/installation" },
        { name: "Maintenance", href: "/resources/maintenance" },
        { name: "FAQ", href: "/faq" },
      ],
    }
  };
}

export const dynamicNavigation = generateNavigation();