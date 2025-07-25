"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three/build/three.module.js"

interface AdvancedAvatarProps {
  name: string
  position: string
  description: string
  position3D: [number, number, number]
  color: string
  index: number
}

export function AdvancedAvatar({ name, position, description, position3D, color, index }: AdvancedAvatarProps) {
  const groupRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Mesh>(null)
  const rightArmRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [animationState, setAnimationState] = useState<"idle" | "wave" | "dance" | "thinking">("idle")

  // Create a more detailed avatar
  const createAvatar = () => {
    const avatar = new THREE.Group()

    // Body
    const bodyGeometry = new THREE.CapsuleGeometry(0.3, 1.2, 4, 8)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.3,
      metalness: 0.1,
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 0.6
    body.castShadow = true
    avatar.add(body)

    // Head
    const headGeometry = new THREE.SphereGeometry(0.35, 16, 16)
    const headMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color).multiplyScalar(1.2),
      roughness: 0.2,
      metalness: 0.05,
    })
    const head = new THREE.Mesh(headGeometry, headMaterial)
    head.position.y = 1.5
    head.castShadow = true
    avatar.add(head)

    // Hair
    const hairGeometry = new THREE.SphereGeometry(0.38, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.7)
    const hairMaterial = new THREE.MeshStandardMaterial({
      color: "#4A4A4A",
      roughness: 0.8,
    })
    const hair = new THREE.Mesh(hairGeometry, hairMaterial)
    hair.position.y = 1.7
    hair.castShadow = true
    avatar.add(hair)

    return avatar
  }

  // Animation loop
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime

      // Base floating animation
      groupRef.current.position.y = Math.sin(time + index) * 0.1

      // Different animations based on state
      switch (animationState) {
        case "idle":
          groupRef.current.rotation.y = Math.sin(time * 0.5 + index) * 0.05
          // Subtle breathing animation
          groupRef.current.scale.y = 1 + Math.sin(time * 2 + index) * 0.02
          break
        case "wave":
          groupRef.current.rotation.y = Math.sin(time * 2) * 0.2
          // Head nod while waving
          if (groupRef.current.children[0]) {
            groupRef.current.children[0].rotation.x = Math.sin(time * 3) * 0.1
          }
          break
        case "dance":
          groupRef.current.rotation.y = Math.sin(time * 1.5) * 0.3
          groupRef.current.position.y += Math.sin(time * 3) * 0.1
          // Hip sway
          groupRef.current.rotation.z = Math.sin(time * 2) * 0.1
          break
        case "thinking":
          // Head scratch animation
          groupRef.current.rotation.x = Math.sin(time * 4) * 0.1
          groupRef.current.rotation.y = Math.sin(time * 2) * 0.15
          break
      }

      if (leftArmRef.current && rightArmRef.current) {
        if (animationState === "wave") {
          const wave = Math.sin(time * 4) * 0.8
          leftArmRef.current.rotation.z = -0.2 - wave
          rightArmRef.current.rotation.z = 0.2 + wave
        } else {
          leftArmRef.current.rotation.z = -0.2
          rightArmRef.current.rotation.z = 0.2
        }
      }
    }
  })

  // Change animation state on hover
  useEffect(() => {
    if (hovered) {
      setAnimationState("wave")
      const timer = setTimeout(() => setAnimationState("idle"), 2000)
      return () => clearTimeout(timer)
    } else {
      setAnimationState("idle")
    }
  }, [hovered])

  return (
    <group
      ref={groupRef}
      position={position3D}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
      scale={hovered ? 1.1 : 1}
    >
      {/* Main Avatar */}
      <group>
        {/* Torso - more realistic proportions */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[0.8, 1.2, 0.4]} />
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
        </mesh>

        {/* Shirt/Clothing overlay */}
        <mesh position={[0, 0.8, 0.01]} castShadow>
          <boxGeometry args={[0.82, 1.22, 0.42]} />
          <meshStandardMaterial
            color={new THREE.Color(color).multiplyScalar(0.8)}
            roughness={0.6}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Head - more realistic */}
        <mesh position={[0, 1.8, 0]} castShadow>
          <boxGeometry args={[0.6, 0.7, 0.5]} />
          <meshStandardMaterial color="#fdbcb4" roughness={0.3} metalness={0.05} />
        </mesh>

        {/* Hair - more stylized */}
        <mesh position={[0, 2.1, -0.1]} castShadow>
          <boxGeometry args={[0.65, 0.4, 0.6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>

        {/* Eyes - larger and more expressive */}
        <mesh position={[-0.15, 1.85, 0.26]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0.15, 1.85, 0.26]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="white" />
        </mesh>

        {/* Pupils - more detailed */}
        <mesh position={[-0.15, 1.85, 0.32]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>
        <mesh position={[0.15, 1.85, 0.32]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>

        {/* Eyebrows */}
        <mesh position={[-0.15, 1.95, 0.28]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.15, 0.03, 0.02]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.15, 1.95, 0.28]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.15, 0.03, 0.02]} />
          <meshStandardMaterial color="#654321" />
        </mesh>

        {/* Nose */}
        <mesh position={[0, 1.75, 0.28]}>
          <boxGeometry args={[0.08, 0.15, 0.08]} />
          <meshStandardMaterial color="#fdbcb4" />
        </mesh>

        {/* Mouth */}
        <mesh position={[0, 1.65, 0.26]}>
          <boxGeometry args={[0.2, 0.05, 0.02]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>

        {/* Arms - more realistic with joints */}
        <group>
          {/* Left upper arm */}
          <mesh position={[-0.6, 1.2, 0]} castShadow ref={leftArmRef}>
            <boxGeometry args={[0.2, 0.8, 0.2]} />
            <meshStandardMaterial color="#fdbcb4" />
          </mesh>
          {/* Left forearm */}
          <mesh position={[-0.6, 0.3, 0]} castShadow>
            <boxGeometry args={[0.18, 0.7, 0.18]} />
            <meshStandardMaterial color="#fdbcb4" />
          </mesh>
          {/* Left hand */}
          <mesh position={[-0.6, -0.2, 0]} castShadow>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#fdbcb4" />
          </mesh>
        </group>

        <group>
          {/* Right upper arm */}
          <mesh position={[0.6, 1.2, 0]} castShadow ref={rightArmRef}>
            <boxGeometry args={[0.2, 0.8, 0.2]} />
            <meshStandardMaterial color="#fdbcb4" />
          </mesh>
          {/* Right forearm */}
          <mesh position={[0.6, 0.3, 0]} castShadow>
            <boxGeometry args={[0.18, 0.7, 0.18]} />
            <meshStandardMaterial color="#fdbcb4" />
          </mesh>
          {/* Right hand */}
          <mesh position={[0.6, -0.2, 0]} castShadow>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#fdbcb4" />
          </mesh>
        </group>

        {/* Legs - more realistic */}
        <group>
          {/* Left thigh */}
          <mesh position={[-0.25, -0.2, 0]} castShadow>
            <boxGeometry args={[0.25, 0.8, 0.25]} />
            <meshStandardMaterial color={new THREE.Color(color).multiplyScalar(0.7)} />
          </mesh>
          {/* Left shin */}
          <mesh position={[-0.25, -1.1, 0]} castShadow>
            <boxGeometry args={[0.22, 0.8, 0.22]} />
            <meshStandardMaterial color={new THREE.Color(color).multiplyScalar(0.7)} />
          </mesh>
          {/* Left foot */}
          <mesh position={[-0.25, -1.7, 0.1]} castShadow>
            <boxGeometry args={[0.2, 0.15, 0.4]} />
            <meshStandardMaterial color="#2d1810" />
          </mesh>
        </group>

        <group>
          {/* Right thigh */}
          <mesh position={[0.25, -0.2, 0]} castShadow>
            <boxGeometry args={[0.25, 0.8, 0.25]} />
            <meshStandardMaterial color={new THREE.Color(color).multiplyScalar(0.7)} />
          </mesh>
          {/* Right shin */}
          <mesh position={[0.25, -1.1, 0]} castShadow>
            <boxGeometry args={[0.22, 0.8, 0.22]} />
            <meshStandardMaterial color={new THREE.Color(color).multiplyScalar(0.7)} />
          </mesh>
          {/* Right foot */}
          <mesh position={[0.25, -1.7, 0.1]} castShadow>
            <boxGeometry args={[0.2, 0.15, 0.4]} />
            <meshStandardMaterial color="#2d1810" />
          </mesh>
        </group>

        {/* Accessories - tie/necklace */}
        <mesh position={[0, 1.4, 0.21]} castShadow>
          <boxGeometry args={[0.1, 0.6, 0.02]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
      </group>

      {/* Floating name and title */}
      <Html
        position={[0, -1.5, 0]}
        center
        distanceFactor={8}
        style={{
          transition: "all 0.3s",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}
      >
        <div className="text-center pointer-events-none">
          <div className="font-bold text-lg mb-1 drop-shadow-lg" style={{ color }}>
            {name}
          </div>
          <div className="text-sm text-gray-600 drop-shadow-sm">{position}</div>
        </div>
      </Html>

      {/* Interactive info panel */}
      {clicked && (
        <Html position={[0, 2.5, 0]} center distanceFactor={10} occlude>
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="bg-white rounded-xl shadow-2xl p-6 max-w-sm border-2 backdrop-blur-sm"
            style={{ borderColor: color }}
          >
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                style={{ backgroundColor: color }}
              >
                {name[0]}
              </div>
              <h3 className="font-bold text-xl mb-2" style={{ color }}>
                {name}
              </h3>
              <p className="text-sm font-medium mb-3 text-gray-600">{position}</p>
              <p className="text-sm text-gray-500 mb-4">{description}</p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setAnimationState("dance")
                    setTimeout(() => setAnimationState("idle"), 3000)
                  }}
                  className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  🕺 Dance
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setAnimationState("wave")
                    setTimeout(() => setAnimationState("idle"), 2000)
                  }}
                  className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  👋 Wave
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setAnimationState("thinking")
                    setTimeout(() => setAnimationState("idle"), 3000)
                  }}
                  className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  🤔 Think
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setClicked(false)
                  }}
                  className="text-xs px-3 py-1 rounded-full text-white transition-colors"
                  style={{ backgroundColor: color }}
                >
                  ✕ Close
                </button>
              </div>
            </div>
          </motion.div>
        </Html>
      )}

      {/* Particle effects when hovered */}
      {hovered && (
        <group>
          {[...Array(12)].map((_, i) => (
            <FloatingParticle key={i} index={i} color={color} />
          ))}
        </group>
      )}

      {/* Spotlight effect */}
      {hovered && (
        <spotLight
          position={[0, 5, 2]}
          angle={0.3}
          penumbra={0.5}
          intensity={0.5}
          color={color}
          target-position={position3D}
        />
      )}
    </group>
  )
}

function FloatingParticle({ index, color }: { index: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      const radius = 1.5 + Math.sin(time + index) * 0.3
      const speed = 0.3 + index * 0.05
      const height = Math.sin(time * speed + index * 0.7) * 0.8

      meshRef.current.position.x = Math.cos(time * speed + index * 0.5) * radius
      meshRef.current.position.y = height + 1
      meshRef.current.position.z = Math.sin(time * speed + index * 0.5) * radius

      const scale = 0.3 + Math.sin(time * 3 + index) * 0.1
      meshRef.current.scale.setScalar(scale)

      meshRef.current.rotation.x = time * 2
      meshRef.current.rotation.y = time * 1.5
    }
  })

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.05, 0]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  )
}
