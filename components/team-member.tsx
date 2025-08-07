"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html, Text, Sphere } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three/build/three.module.js"

interface TeamMemberProps {
  name: string
  position: string
  description: string
  avatarUrl: string
  position3D: [number, number, number]
  color: string
  index: number
}

export function TeamMember({ name, position, description, position3D, color, index }: TeamMemberProps) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.2
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1
      if (hovered) meshRef.current.rotation.y += 0.02
    }
  })

  return (
    <group
      ref={meshRef}
      position={position3D}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      {/* Avatar Body */}
      <mesh scale={hovered ? 1.1 : 1} rotation-y={hovered ? Math.PI * 0.1 : 0} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.4, 1.5, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Avatar Head */}
      <mesh position={[0, 1, 0]} scale={hovered ? 1.2 : 1} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.15, 1.1, 0.25]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.15, 1.1, 0.25]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Eye pupils */}
      <mesh position={[-0.15, 1.1, 0.3]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.15, 1.1, 0.3]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Arms */}
      <mesh
        position={[-0.6, 0.3, 0]}
        rotation={[0, 0, hovered ? -0.5 : -0.2]}
        rotateZ={hovered ? -0.8 : -0.2}
        castShadow
      >
        <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position={[0.6, 0.3, 0]} rotation={[0, 0, hovered ? 0.5 : 0.2]} rotateZ={hovered ? 0.8 : 0.2} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Floating particles around avatar */}
      {hovered && (
        <>
          {[...Array(8)].map((_, i) => (
            <Particle key={i} index={i} color={color} />
          ))}
        </>
      )}

      {/* Name label */}
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.ttf"
      >
        {name}
      </Text>

      {/* Position label */}
      <Text
        position={[0, -1.6, 0]}
        fontSize={0.2}
        color="#666666"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.ttf"
      >
        {position}
      </Text>

      {/* Info popup when clicked */}
      {clicked && (
        <Html position={[0, 2, 0]} center distanceFactor={10} occlude>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="bg-white rounded-lg shadow-xl p-4 max-w-xs border-2"
            style={{ borderColor: color }}
          >
            <h3 className="font-bold text-lg mb-2" style={{ color }}>
              {name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{position}</p>
            <p className="text-xs text-gray-500">{description}</p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setClicked(false)
              }}
              className="mt-2 text-xs px-2 py-1 rounded"
              style={{ backgroundColor: color, color: "white" }}
            >
              Close
            </button>
          </motion.div>
        </Html>
      )}

      {/* Hover glow effect */}
      {hovered && (
        <Sphere args={[1.2]} position={[0, 0, 0]}>
          <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.BackSide} />
        </Sphere>
      )}
    </group>
  )
}

function Particle({ index, color }: { index: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      const radius = 1.5
      const speed = 0.5 + index * 0.1

      meshRef.current.position.x = Math.cos(time * speed + index) * radius
      meshRef.current.position.y = Math.sin(time * speed + index * 0.5) * 0.5
      meshRef.current.position.z = Math.sin(time * speed + index) * radius

      meshRef.current.scale.setScalar(0.5 + Math.sin(time * 2 + index) * 0.2)
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  )
}
