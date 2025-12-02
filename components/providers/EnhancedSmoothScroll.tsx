"use client";

import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "@/lib/animations/gsap-config";

interface EnhancedSmoothScrollProps {
  children: ReactNode;
}

export function EnhancedSmoothScroll({ children }: EnhancedSmoothScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enable smooth scroll behavior
    if (typeof window !== "undefined") {
      // CSS smooth scroll as base
      document.documentElement.style.scrollBehavior = "smooth";
      
      // Add smooth scroll to anchor links
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a[href^="#"]');
        
        if (link) {
          e.preventDefault();
          const href = link.getAttribute("href");
          if (href && href !== "#") {
            const element = document.querySelector(href);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        }
      };

      document.addEventListener("click", handleAnchorClick);

      // Smooth scroll with wheel events (optional, for extra smoothness)
      let scrollY = window.scrollY;
      let targetY = scrollY;
      let currentY = scrollY;
      let ease = 0.1;

      const updateScroll = () => {
        const diff = targetY - currentY;
        if (Math.abs(diff) > 0.1) {
          currentY += diff * ease;
          window.scrollTo(0, currentY);
          requestAnimationFrame(updateScroll);
        }
      };

      const handleWheel = (e: WheelEvent) => {
        // Only apply smooth scroll on desktop
        if (window.innerWidth > 768) {
          e.preventDefault();
          targetY += e.deltaY;
          targetY = Math.max(0, Math.min(targetY, document.body.scrollHeight - window.innerHeight));
          requestAnimationFrame(updateScroll);
        }
      };

      // Enable/disable based on device
      const checkDevice = () => {
        if (window.innerWidth > 768) {
          window.addEventListener("wheel", handleWheel, { passive: false });
        } else {
          window.removeEventListener("wheel", handleWheel);
        }
      };

      checkDevice();
      window.addEventListener("resize", checkDevice);

      return () => {
        document.documentElement.style.scrollBehavior = "auto";
        document.removeEventListener("click", handleAnchorClick);
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("resize", checkDevice);
      };
    }
  }, []);

  return <div ref={scrollContainerRef}>{children}</div>;
}