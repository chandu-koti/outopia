"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { gsap } from "@/lib/animations/gsap-config";

interface AnimatedProductCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    image: string;
    href: string;
  };
  index: number;
}

export function AnimatedProductCard({ category, index }: AnimatedProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial reveal animation
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 100,
          rotateY: -30,
        },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 1,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none none",
          },
        }
      );

      // Hover animations
      const card = cardRef.current;
      if (!card) return;

      const handleMouseEnter = () => {
        gsap.to(imageRef.current, {
          scale: 1.1,
          duration: 0.6,
          ease: "power2.out",
        });

        gsap.to(contentRef.current, {
          y: -5,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(arrowRef.current, {
          x: 8,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(card, {
          y: -10,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });

        gsap.to(contentRef.current, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(arrowRef.current, {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(card, {
          y: 0,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      style={{ perspective: "1000px" }}
      className="transform-gpu"
    >
      <Link href={category.href}>
        <Card className="h-full group cursor-pointer overflow-hidden">
          <div ref={imageRef} className="relative h-48 overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div ref={contentRef} className="p-6">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="flex items-center text-primary font-medium">
              <span>Explore</span>
              <ArrowRight ref={arrowRef} className="w-4 h-4 ml-2" />
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}