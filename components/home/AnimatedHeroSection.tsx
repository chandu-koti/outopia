"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { gsap } from "@/lib/animations/gsap-config";
import { useParallax } from "@/hooks/useParallax";

export function AnimatedHeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useParallax<HTMLDivElement>({ speed: 0.5 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 100,
      });

      gsap.set(overlayRef.current, {
        opacity: 0,
      });

      // Create timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 1.5,
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
          },
          "-=1"
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.8"
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.8"
        );

      // Scroll-triggered animations - keeping text visible
      gsap.to(overlayRef.current, {
        opacity: 0.4,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen min-h-[600px] -mt-20 flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 w-full h-full ">
          <Image
            src="https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/images/hero.jpg"
            alt="Modern outdoor furniture installation"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      {/* Overlay */}
      <div
        // ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"
      />

      {/* Content */}
      <div className="container relative z-20">
        <div className="max-w-3xl text-white">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Redefining Outdoor Spaces with Modular Brilliance
          </h1>

          <p ref={subtitleRef} className="text-lg md:text-xl mb-8 text-gray-200">
            Premium outdoor furniture and design-build solutions that transform
            landscapes into living experiences
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <Button href="/products/outopia" size="lg">
              OUTOPIA
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Get Custom Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-3 bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}