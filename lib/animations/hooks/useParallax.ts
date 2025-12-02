import { useScroll, useTransform, MotionValue } from "framer-motion";
import { RefObject } from "react";

interface UseParallaxOptions {
  offset?: number;
  multiplier?: number;
  clamp?: boolean;
}

export function useParallax(
  ref: RefObject<HTMLElement>,
  options: UseParallaxOptions = {}
): MotionValue<number> {
  const { offset = 0, multiplier = 0.5, clamp = true } = options;
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [offset - 100 * multiplier, offset + 100 * multiplier]
  );

  if (clamp) {
    return useTransform(y, (value) => 
      Math.max(-100, Math.min(100, value))
    );
  }

  return y;
}