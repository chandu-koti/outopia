"use client";

import { useState } from "react";
import { Box, Text } from "@react-three/drei";
import { Vector3 } from "three";

interface Part {
  id: string;
  name: string;
  position: Vector3;
  explodedPosition: Vector3;
  size: [number, number, number];
  color: string;
}

interface ExplodedViewProps {
  isExploded: boolean;
}

export function ExplodedView({ isExploded }: ExplodedViewProps) {
  const parts: Part[] = [
    {
      id: 'seat',
      name: 'Modular Seat',
      position: new Vector3(0, 0, 0),
      explodedPosition: new Vector3(0, 0.5, 0),
      size: [2, 0.1, 2],
      color: '#8B6B47',
    },
    {
      id: 'backrest',
      name: 'Ergonomic Backrest',
      position: new Vector3(0, 0.75, -0.95),
      explodedPosition: new Vector3(0, 1.5, -2),
      size: [2, 1.5, 0.1],
      color: '#8B6B47',
    },
    {
      id: 'frame',
      name: 'Steel Frame',
      position: new Vector3(0, -0.75, 0),
      explodedPosition: new Vector3(0, -2, 0),
      size: [2, 0.1, 2],
      color: '#708090',
    },
    {
      id: 'armrest-left',
      name: 'Left Armrest',
      position: new Vector3(-1.1, 0.25, 0),
      explodedPosition: new Vector3(-2, 0.25, 0),
      size: [0.1, 0.5, 1.8],
      color: '#8B6B47',
    },
    {
      id: 'armrest-right',
      name: 'Right Armrest',
      position: new Vector3(1.1, 0.25, 0),
      explodedPosition: new Vector3(2, 0.25, 0),
      size: [0.1, 0.5, 1.8],
      color: '#8B6B47',
    },
  ];

  return (
    <group>
      {parts.map((part) => (
        <group
          key={part.id}
          position={[
            isExploded ? part.explodedPosition.x : part.position.x,
            isExploded ? part.explodedPosition.y : part.position.y,
            isExploded ? part.explodedPosition.z : part.position.z,
          ]}
        >
          <Box args={part.size} castShadow receiveShadow>
            <meshPhysicalMaterial
              color={part.color}
              metalness={part.id === 'frame' ? 0.9 : 0.1}
              roughness={part.id === 'frame' ? 0.2 : 0.8}
              clearcoat={0.5}
              clearcoatRoughness={0.3}
            />
          </Box>
          
          {/* Part label */}
          {isExploded && (
            <Text
              position={[0, part.size[1] / 2 + 0.3, 0]}
              fontSize={0.15}
              color="white"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.01}
              outlineColor="black"
            >
              {part.name}
            </Text>
          )}
          
          {/* Connection lines are disabled for now due to type issues */}
        </group>
      ))}
    </group>
  );
}