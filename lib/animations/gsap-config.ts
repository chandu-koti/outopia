import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  
  // Configure GSAP defaults
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
  });
  
  // Set default ease
  gsap.defaults({
    ease: "power3.out",
    duration: 1,
  });

  // Configure ScrollTrigger
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });

  // Refresh ScrollTrigger on window resize
  let resizeTimer: NodeJS.Timeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });
}

export { gsap, ScrollTrigger, useGSAP };