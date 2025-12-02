"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations/gsap-config";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function TextReveal({ 
  children, 
  className, 
  delay = 0,
  stagger = 0.02,
  as = "div" 
}: TextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const Component = as;

  useEffect(() => {
    if (!textRef.current) return;

    const words = children.split(" ");
    textRef.current.innerHTML = words
      .map(word => `<span class="word-wrapper"><span class="word">${word}</span></span>`)
      .join(" ");

    const wordElements = textRef.current.querySelectorAll(".word");

    const ctx = gsap.context(() => {
      gsap.set(wordElements, {
        opacity: 0,
        y: 100,
        rotationX: -90,
      });

      gsap.to(wordElements, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [children, delay, stagger]);

  if (Component === 'div') {
    return (
      <div
        ref={textRef}
        className={cn("text-reveal", className)}
        style={{ perspective: "1000px" }}
      />
    );
  }
  
  // For other elements, we'll use dangerouslySetInnerHTML to avoid ref issues
  const ElementTag = Component as any;
  return (
    <ElementTag
      className={cn("text-reveal", className)}
      style={{ perspective: "1000px" }}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}