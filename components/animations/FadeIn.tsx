"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "@/lib/animations/gsap-config";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  rotate?: number;
  stagger?: number;
  once?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 1,
  y = 50,
  x = 0,
  scale = 1,
  rotate = 0,
  stagger = 0,
  once = true,
}: FadeInProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      const elements = elementRef.current!.children.length > 0
        ? elementRef.current!.children
        : [elementRef.current];

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y,
          x,
          scale: scale !== 1 ? 0.8 : 1,
          rotation: rotate,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotation: 0,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay, duration, y, x, scale, rotate, stagger, once]);

  return (
    <div ref={elementRef} className={cn("fade-in", className)}>
      {children}
    </div>
  );
}