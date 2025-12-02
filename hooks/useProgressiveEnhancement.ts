"use client";

import { useState, useEffect } from "react";

interface ProgressiveEnhancementConfig {
  enable3D: boolean;
  enableShaders: boolean;
  enablePostProcessing: boolean;
  quality: 'low' | 'medium' | 'high';
  deviceTier: 'low' | 'mid' | 'high';
}

export function useProgressiveEnhancement(): ProgressiveEnhancementConfig {
  const [config, setConfig] = useState<ProgressiveEnhancementConfig>({
    enable3D: false,
    enableShaders: false,
    enablePostProcessing: false,
    quality: 'low',
    deviceTier: 'low',
  });

  useEffect(() => {
    // Check device capabilities
    const checkDeviceCapabilities = async () => {
      try {
        // Check WebGL support
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        const hasWebGL = !!gl;

        // Check GPU info (if available)
        let gpuTier: 'low' | 'mid' | 'high' = 'low';
        if (gl && 'getExtension' in gl) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            // Simple GPU tier detection
            if (renderer.includes('Apple') || renderer.includes('NVIDIA') || renderer.includes('AMD')) {
              gpuTier = 'high';
            } else if (renderer.includes('Intel')) {
              gpuTier = 'mid';
            }
          }
        }

        // Check device memory (if available)
        const deviceMemory = (navigator as any).deviceMemory || 4;
        const hasHighMemory = deviceMemory >= 8;

        // Check connection speed
        const connection = (navigator as any).connection;
        const hasGoodConnection = !connection || 
          connection.effectiveType === '4g' || 
          connection.effectiveType === 'wifi';

        // Check screen size
        const isLargeScreen = window.innerWidth >= 1024;

        // Determine configuration based on capabilities
        let quality: 'low' | 'medium' | 'high' = 'low';
        let enable3D = hasWebGL;
        let enableShaders = false;
        let enablePostProcessing = false;

        if (gpuTier === 'high' && hasHighMemory && hasGoodConnection) {
          quality = 'high';
          enableShaders = true;
          enablePostProcessing = true;
        } else if (gpuTier === 'mid' || (hasWebGL && deviceMemory >= 4)) {
          quality = 'medium';
          enableShaders = true;
          enablePostProcessing = false;
        }

        // Reduce quality on mobile devices
        if (!isLargeScreen) {
          if (quality === 'high') quality = 'medium';
          if (quality === 'medium') quality = 'low';
          enablePostProcessing = false;
        }

        setConfig({
          enable3D,
          enableShaders,
          enablePostProcessing,
          quality,
          deviceTier: gpuTier,
        });
      } catch (error) {
        console.error('Error checking device capabilities:', error);
        // Fallback to safe defaults
        setConfig({
          enable3D: false,
          enableShaders: false,
          enablePostProcessing: false,
          quality: 'low',
          deviceTier: 'low',
        });
      }
    };

    checkDeviceCapabilities();

    // Listen for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreference = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setConfig(prev => ({
          ...prev,
          enable3D: false,
          enableShaders: false,
          enablePostProcessing: false,
        }));
      }
    };

    mediaQuery.addEventListener('change', handleMotionPreference);
    handleMotionPreference(mediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  return config;
}