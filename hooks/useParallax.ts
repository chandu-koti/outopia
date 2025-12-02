import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap-config";

interface ParallaxOptions {
  speed?: number;
  offset?: number;
  start?: string;
  end?: string;
}

export function useParallax<T extends HTMLElement = HTMLElement>(options: ParallaxOptions = {}) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const speed = options.speed || 0.5;
    const offset = options.offset || 0;

    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        yPercent: -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: elementRef.current,
          start: options.start || "top bottom",
          end: options.end || "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [options]);

  return elementRef;
}