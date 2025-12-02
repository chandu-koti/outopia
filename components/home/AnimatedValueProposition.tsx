"use client";

import { useEffect, useRef } from "react";
import { Wrench, Lightbulb, Shield, Factory } from "lucide-react";
import { gsap } from "@/lib/animations/gsap-config";
import { TextReveal } from "@/components/animations/TextReveal";
import { FadeIn } from "@/components/animations/FadeIn";

const features = [
  {
    icon: Lightbulb,
    title: "Modular Design Excellence",
    description: "Furniture that evolves with your needs",
  },
  {
    icon: Wrench,
    title: "End-to-End Solutions",
    description: "From brief to quality check, we handle everything",
  },
  {
    icon: Shield,
    title: "Premium Materials",
    description: "Weather-resistant construction built for Indian climates",
  },
  {
    icon: Factory,
    title: "Custom Manufacturing",
    description: "Bespoke solutions for unique spaces",
  },
];

export function AnimatedValueProposition() {
  const sectionRef = useRef<HTMLElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate icons on hover
      iconsRef.current.forEach((icon) => {
        if (!icon) return;

        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            scale: 1.1,
            rotation: 360,
            duration: 0.6,
            ease: "power2.out",
          });
        });

        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        });
      });

      // Continuous floating animation for icons
      iconsRef.current.forEach((icon, index) => {
        if (!icon) return;

        gsap.to(icon, {
          y: -10,
          duration: 2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container">
        <FadeIn className="text-center mb-12">
          <TextReveal
            as="h2"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Where Innovation Meets the Outdoors
          </TextReveal>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Infrascapes, we believe outdoor spaces deserve the same attention
            to detail as interiors. Our modular design philosophy allows
            infinite possibilities, creating Outdoor living solutions that adapts to your
            vision rather than limiting it.
          </p>
        </FadeIn>

        <FadeIn
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          stagger={0.1}
        >
          {features.map((feature, index) => (
            <div key={feature.title} className="text-center">
              <div
                ref={(el) => {
                  if (el) iconsRef.current[index] = el;
                }}
                className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-primary/10 rounded-full cursor-pointer"
              >
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}