"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Vector2 } from "three";
import { useMemo, useRef } from "react";
import { Plane } from "@react-three/drei";

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uHover;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Wave distortion
    pos.z += sin(pos.x * 5.0 + uTime) * 0.1 * uHover;
    pos.z += sin(pos.y * 3.0 + uTime * 0.8) * 0.1 * uHover;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;
  
  void main() {
    vec2 uv = vUv;
    
    // Distortion based on mouse position
    float dist = distance(uv, uMouse);
    float strength = 1.0 - smoothstep(0.0, 0.5, dist);
    
    // Chromatic aberration
    float aberration = 0.002 * uHover * strength;
    vec2 redOffset = vec2(aberration, 0.0);
    vec2 blueOffset = vec2(-aberration, 0.0);
    
    float r = texture2D(uTexture, uv + redOffset).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv + blueOffset).b;
    
    // RGB shift effect
    vec3 color = vec3(r, g, b);
    
    // Add slight vignette
    float vignette = smoothstep(1.0, 0.4, length(uv - 0.5));
    color *= vignette;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

interface WebGLImageProps {
  src: string;
  className?: string;
}

function ImageMesh({ src }: { src: string }) {
  const meshRef = useRef<any>(null);
  const texture = useLoader(TextureLoader, src);
  
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uHover: { value: 0 },
      uMouse: { value: new Vector2(0.5, 0.5) },
    }),
    [texture]
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Update mouse position
      const x = (state.mouse.x + 1) / 2;
      const y = (state.mouse.y + 1) / 2;
      meshRef.current.material.uniforms.uMouse.value.set(x, y);
    }
  });

  return (
    <Plane 
      ref={meshRef} 
      args={[5, 3]}
      onPointerEnter={() => {
        if (meshRef.current) {
          meshRef.current.material.uniforms.uHover.value = 1;
        }
      }}
      onPointerLeave={() => {
        if (meshRef.current) {
          meshRef.current.material.uniforms.uHover.value = 0;
        }
      }}
    >
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </Plane>
  );
}

export function WebGLImage({ src, className = "" }: WebGLImageProps) {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ImageMesh src={src} />
      </Canvas>
    </div>
  );
}