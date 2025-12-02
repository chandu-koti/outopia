import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Mesh, Vector3 } from "three";

interface UseWebGLOptions {
  enableRotation?: boolean;
  rotationSpeed?: number;
  enableFloat?: boolean;
  floatSpeed?: number;
  floatIntensity?: number;
}

export function useWebGL(options: UseWebGLOptions = {}) {
  const {
    enableRotation = true,
    rotationSpeed = 0.01,
    enableFloat = true,
    floatSpeed = 1,
    floatIntensity = 0.1,
  } = options;

  const meshRef = useRef<Mesh>(null);
  const time = useRef(0);
  const initialY = useRef(0);

  useEffect(() => {
    if (meshRef.current) {
      initialY.current = meshRef.current.position.y;
    }
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    time.current += delta;

    // Rotation
    if (enableRotation) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 0.7;
    }

    // Float animation
    if (enableFloat) {
      meshRef.current.position.y = 
        initialY.current + 
        Math.sin(time.current * floatSpeed) * floatIntensity;
    }
  });

  return meshRef;
}

export function useMousePosition3D() {
  const { camera, mouse, size } = useThree();
  const position = useRef(new Vector3());

  useFrame(() => {
    const x = (mouse.x * size.width) / 2;
    const y = (mouse.y * size.height) / 2;
    position.current.set(x, y, 0);
    position.current.unproject(camera);
  });

  return position;
}