"use client";

import { useEffect, useRef } from "react";
import { designBuildProcess } from "@/lib/constants";
import { gsap } from "@/lib/animations/gsap-config";
import { TextReveal } from "@/components/animations/TextReveal";
import { FadeIn } from "@/components/animations/FadeIn";

export function AnimatedDesignBuildProcess() {
  const processRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the connecting line
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          ease: "none",
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );

      // Animate the icons with 3D effect
      iconsRef.current.forEach((icon, index) => {
        if (!icon) return;

        gsap.fromTo(
          icon,
          {
            scale: 0,
            rotateY: -180,
            opacity: 0,
          },
          {
            scale: 1,
            rotateY: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: icon,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          }
        );
      });

      // Animate cards
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            rotateX: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.15,
          }
        );
      });
    }, processRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      <div className="container">
        <FadeIn className="text-center mb-16">
          <TextReveal
            as="h2"
            className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent"
          >
            Your Vision, Our Expertise
          </TextReveal>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive design-build projects ensures seamless project
            execution from concept to completion
          </p>
        </FadeIn>

        <div ref={processRef} className="relative">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="absolute top-[60px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full">
              <div
                ref={lineRef}
                className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-primary rounded-full origin-left"
              />
            </div>
            <div className="grid grid-cols-5 gap-8 relative">
              {designBuildProcess.map((step, index) => (
                <div
                  key={step.step}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className="text-center group"
                >
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 scale-150" />
                    <div
                      ref={(el) => {
                        if (el) iconsRef.current[index] = el;
                      }}
                      className="w-28 h-28 mx-auto bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl flex items-center justify-center text-4xl relative z-10 transform-gpu transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-2xl border border-gray-100 group-hover:border-primary/30"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <span className="text-primary group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                      </span>
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-primary transition-colors duration-300">
                    {/* <span className="inline-block w-8 h-8 bg-gradient-to-br from-primary to-primary-dark text-white rounded-lg text-sm font-semibold leading-8 mr-2">
                      {step.step}
                    </span> */}
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-6">
            {designBuildProcess.map((step, index) => (
              <FadeIn
                key={step.step}
                delay={index * 0.1}
                x={-20}
                className="flex gap-4 group"
              >
                <div className="flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 scale-125" />
                  <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg flex items-center justify-center text-3xl relative z-10 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 border border-gray-100 group-hover:border-primary/30">
                    <span className="text-primary">
                      {step.icon}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-primary transition-colors duration-300">
                    {/* <span className="inline-block w-7 h-7 bg-gradient-to-br from-primary to-primary-dark text-white rounded-md text-xs font-semibold leading-7 mr-2">
                      {step.step}
                    </span> */}
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}