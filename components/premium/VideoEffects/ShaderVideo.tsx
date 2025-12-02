"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ShaderVideoProps {
  src: string;
  className?: string;
  overlay?: boolean;
  parallax?: boolean;
}

export function ShaderVideo({ 
  src, 
  className = "",
  overlay = true,
  parallax = true
}: ShaderVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    parallax ? ["0%", "20%"] : ["0%", "0%"]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.2, 1, 1.2]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Play video when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Video with motion effects */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y, scale }}
      >
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
        />
        
        {/* WebGL-style filters using CSS */}
        <div 
          className="absolute inset-0 mix-blend-screen opacity-20"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(16, 185, 129, 0.4) 100%)',
          }}
        />
      </motion.div>

      {/* Shader overlay effects */}
      {overlay && (
        <>
          {/* Scan lines */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div 
              className="h-full w-full"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 255, 255, 0.1) 2px,
                  rgba(255, 255, 255, 0.1) 4px
                )`,
                animation: 'scan 8s linear infinite',
              }}
            />
          </div>

          {/* Noise texture */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-neutral-900/20" />
        </>
      )}

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
}