"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Container } from "../Layout/Container";
import { MagneticButton } from "../UI/MagneticButton";
import { MagneticMenuItem } from "./MagneticMenuItem";
import { FullScreenMenu } from "./FullScreenMenu";
import { Menu, X } from "lucide-react";
import { premiumNavigation } from "@/lib/premium-navigation";
import { cn } from "@/lib/utils";
import { GlassPanel } from "../UI/GlassPanel";

export function PremiumNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFullScreenMenuOpen, setIsFullScreenMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "py-4" : "py-6"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Container>
          <GlassPanel
            className={cn(
              "px-6 py-4 transition-all duration-500",
              isScrolled ? "backdrop-blur-xl" : "backdrop-blur-md"
            )}
            variant="light"
            blur="lg"
          >
            <nav className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/premium-home" className="relative group">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src="/images/logo/cropped-cropped-OFFICE-LOGO-01-300x54-1.png"
                    alt="Infrascapes Logo"
                    width={200}
                    height={36}
                    className="h-9 w-auto object-contain"
                    priority
                  />
                </motion.div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-8">
                {premiumNavigation.main.map((item) => (
                  <MagneticMenuItem
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
                  >
                    {item.name}
                  </MagneticMenuItem>
                ))}
              </div>

              {/* CTA Button */}
              <div className="hidden lg:block">
                <MagneticButton variant="primary" size="sm">
                  Get Quote
                </MagneticButton>
              </div>

              {/* Menu Toggle */}
              <button
                className="p-2"
                onClick={() => setIsFullScreenMenuOpen(!isFullScreenMenuOpen)}
                data-cursor="hover"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isFullScreenMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              </button>
            </nav>
          </GlassPanel>
        </Container>
      </motion.header>

      {/* Full Screen Menu */}
      <FullScreenMenu
        isOpen={isFullScreenMenuOpen}
        onClose={() => setIsFullScreenMenuOpen(false)}
      />
    </>
  );
}