"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
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

interface FooterLink {
  name: string;
  href: string;
}

interface FooterData {
  outopia: FooterLink[];
  infrascapes: FooterLink[];
  services: FooterLink[];
  company: FooterLink[];
}

export function Footer() {
  const [footerData, setFooterData] = useState<FooterData>({
    outopia: [],
    infrascapes: [],
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
    ]
  });

  useEffect(() => {
    const fetchFooterData = async () => {
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

        // Find brand IDs
        const outopiaBrand = Array.isArray(brands) ? brands.find(b => b.name.toLowerCase() === 'outopia') : undefined;
        const infrascapesBrand = Array.isArray(brands) ? brands.find(b => b.name.toLowerCase() === 'infrascapes') : undefined;

        // Filter categories by brand
        const outopiaCategories = outopiaBrand 
          ? categories.filter(cat => cat.brandId === outopiaBrand.id)
          : [];
        
        const infrascapesCategories = infrascapesBrand
          ? categories.filter(cat => cat.brandId === infrascapesBrand.id)
          : [];

        // Update footer data with dynamic categories
        setFooterData(prev => ({
          ...prev,
          outopia: outopiaCategories.map(cat => ({
            name: cat.name,
            href: cat.href || `/premium-category/${cat.slug}`
          })),
          infrascapes: infrascapesCategories.map(cat => ({
            name: cat.name,
            href: cat.href || `/premium-category/${cat.slug}`
          }))
        }));
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <footer className="bg-neutral-charcoal text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo/OUTOPIA LOGO-12.PNG"
                alt={siteConfig.name}
                width={300}
                height={76}
                className="h-9 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-300 mb-6 text-sm">
              {siteConfig.description}
            </p>
            <div className="space-y-3">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>{siteConfig.contact.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>{siteConfig.contact.email}</span>
              </a>
              <div className="flex items-start space-x-3 text-gray-300 text-sm">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p>{siteConfig.contact.address.line1}</p>
                  <p>{siteConfig.contact.address.line2}</p>
                  <p>{siteConfig.contact.address.city}, {siteConfig.contact.address.state}</p>
                  <p>{siteConfig.contact.address.pincode}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Outopia Products */}
          {footerData.outopia.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-4">OUTOPIA</h3>
              <ul className="space-y-2">
                {footerData.outopia.map((item: any) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {footerData.infrascapes.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-4">OUTOPIA</h3>
              <ul className="space-y-2">
                {footerData.infrascapes.map((item: any) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {footerData.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerData.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
