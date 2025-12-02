"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export function InteractiveCamera() {
  const { camera, mouse } = useThree();
  const cameraPosition = useRef(new Vector3(0, 0, 8));
  const targetPosition = useRef(new Vector3());

  useFrame((state, delta) => {
    // Mouse-based camera movement
    targetPosition.current.set(
      mouse.x * 2,
      mouse.y * 1.5,
      8 + mouse.y * 0.5
    );

    // Smooth camera movement
    cameraPosition.current.lerp(targetPosition.current, delta * 2);
    camera.position.copy(cameraPosition.current);
    
    // Camera always looks at center with slight offset based on mouse
    camera.lookAt(mouse.x * 0.5, mouse.y * 0.5, 0);
  });

  return null;
}