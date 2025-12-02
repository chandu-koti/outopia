"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";

interface Category {
  id: string;
  name: string;
  slug: string;
  href: string;
  brandId: string;
}

interface Brand {
  id: string;
  name: string;
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [navigation, setNavigation] = useState<any>({
    main: [
      { name: "Home", href: "/" },
      { name: "Design-Build Services", href: "/design-build" },
      { name: "Projects", href: "/projects" },
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
    ]
  });

  // Helper function to generate slug from brand name
  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        // Fetch categories and brands
        const [categoriesRes, brandsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/brands')
        ]);

        const categoriesJson = await categoriesRes.json();
        const brandsJson = await brandsRes.json();

        const categories: Category[] = Array.isArray(categoriesJson) ? categoriesJson : [];
        const brands: Brand[] = Array.isArray(brandsJson) ? brandsJson : [];

        // Build navigation dynamically with all brands
        const dynamicNavItems: any[] = [
          { name: "Home", href: "/" },

        ];

        // Add each brand as a navigation item with its categories
        brands.forEach(brand => {
          const brandSlug = generateSlug(brand.name);
          const brandCategories = categories.filter(cat => cat.brandId === brand.id);

          dynamicNavItems.push({
            name: brand.name,
            href: `/products/${brandSlug}`,
            submenu: brandCategories.map(cat => ({
              name: cat.name,
              href: cat.href || `/premium-category/${cat.slug}`
            }))
          });
        });

        // Add remaining static navigation items
        dynamicNavItems.push({
          name: "More",
          href: "#",
          submenu: [
            { name: "Design-Build Services", href: "/design-build" },
            // { name: "Projects", href: "/projects" },
            { name: "About Us", href: "/about" },
            { name: "Contact", href: "/contact" }
          ]
        });

        dynamicNavItems.push({ name: "Projects", href: "/projects" })

        // Update navigation (fallback to static items if no brands/categories)
        setNavigation({
          main: dynamicNavItems.length > 0 ? dynamicNavItems : [
            { name: "Home", href: "/" },
            { name: "Products", href: "/products" },
            { name: "Design-Build Services", href: "/design-build" },
            { name: "Projects", href: "/projects" },
            { name: "About Us", href: "/about" },
            { name: "Contact", href: "/contact" }
          ]
        });
      } catch (error) {
        console.error('Error fetching navigation data:', error);
        // Basic fallback on error
        setNavigation({
          main: [
            { name: "Home", href: "/" },
            { name: "Products", href: "/products" },
            { name: "Design-Build Services", href: "/design-build" },
            { name: "Projects", href: "/projects" },
            { name: "About Us", href: "/about" },
            { name: "Contact", href: "/contact" }
          ]
        });
      }
    };

    fetchNavigationData();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="container">
        <div className="flex items-center justify-between h-14 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo/outopia-light.png"
              alt={siteConfig.name}
              width={200}
              height={36}
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.main.map((item: any) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-1 text-neutral-charcoal hover:text-primary transition-colors duration-200 font-medium",
                    activeDropdown === item.name && "text-primary"
                  )}
                >
                  <span>{item.name}</span>
                  {item.submenu && item.submenu.length > 0 && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.submenu && item.submenu.length > 0 && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
                    >
                      {item.submenu.map((subitem: any) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-3 hover:bg-primary/5 hover:text-primary transition-colors duration-200"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="btn-primary"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navigation.main.map((item: any) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-neutral-charcoal hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && item.submenu.length > 0 && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.submenu.map((subitem: any) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 px-4">
                  <Link
                    href="/contact"
                    className="btn-primary w-full text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
