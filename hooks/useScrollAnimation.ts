import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap-config";

interface ScrollAnimationOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
}

export function useScrollAnimation(
  animation: gsap.TweenVars,
  options: ScrollAnimationOptions = {}
) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        {
          opacity: 0,
          y: 50,
          ...animation,
        },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: options.trigger || elementRef.current,
            start: options.start || "top 80%",
            end: options.end || "bottom 20%",
            scrub: options.scrub || false,
            pin: options.pin || false,
            markers: options.markers || false,
          },
          ...animation,
        }
      );
    });

    return () => ctx.revert();
  }, [animation, options]);

  return elementRef;
}