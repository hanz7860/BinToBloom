"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useAnimations, Html } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"

interface ReadyPlayerMeAvatarProps {
  name: string
  position: string
  description: string
  position3D: [number, number, number]
  color: string
  index: number
  modelUrl?: string
}

export function ReadyPlayerMeAvatar({
  name,
  position,
  description,
  position3D,
  color,
  index,
  modelUrl,
}: ReadyPlayerMeAvatarProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [animationState, setAnimationState] = useState<"idle" | "wave" | "dance" | "thinking">("idle")
  const [modelLoaded, setModelLoaded] = useState(false)

  // Try to load GLTF model, but don't crash if it fails
  const scene = null
  const animations: THREE.AnimationClip[] = []

  try {
    if (modelUrl) {
      // This would normally use useGLTF, but we'll skip it for now to avoid errors
      // const gltf = useGLTF(modelUrl)
      // scene = gltf.scene
      // animations = gltf.animations
    }
  } catch (error) {
    console.log(`Model ${modelUrl} not found, using placeholder`)
  }

  const { actions, mixer } = useAnimations(animations, groupRef)

  // Animation state management
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      // Stop all animations first
      Object.values(actions).forEach((action) => action?.stop())

      // Play the appropriate animation based on state
      switch (animationState) {
        case "idle":
          actions.idle?.play()
          break
        case "wave":
          actions.wave?.play()
          break
        case "dance":
          actions.dance?.play()
          break
        case "thinking":
          actions.thinking?.play()
          break
      }
    }
  }, [animationState, actions])

  // Animation loop
  useFrame((state, delta) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime

      // Base floating animation
      groupRef.current.position.y = Math.sin(time + index) * 0.1

      // Different animations based on state for placeholder avatars
      switch (animationState) {
        case "idle":
          groupRef.current.rotation.y = Math.sin(time * 0.5 + index) * 0.05
          break
        case "wave":
          groupRef.current.rotation.y = Math.sin(time * 2) * 0.2
          groupRef.current.rotation.z = Math.sin(time * 4) * 0.1
          break
        case "dance":
          groupRef.current.rotation.y = Math.sin(time * 1.5) * 0.3
          groupRef.current.position.y += Math.sin(time * 3) * 0.1
          groupRef.current.rotation.z = Math.sin(time * 2) * 0.1
          break
        case "thinking":
          groupRef.current.rotation.x = Math.sin(time * 4) * 0.1
          groupRef.current.rotation.y = Math.sin(time * 2) * 0.15
          break
      }

      // Scale effect when hovered
      const targetScale = hovered ? 1.1 : 1
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }

    // Update animation mixer if available
    if (mixer) {
      mixer.update(delta)
    }
  })

  // Change animation state on hover
  useEffect(() => {
    if (hovered) {
      setAnimationState("wave")
      const timer = setTimeout(() => setAnimationState("idle"), 3000)
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
    >
      {/* Avatar - either GLTF model or placeholder */}
      {scene ? (
        <primitive object={scene.clone()} scale={2} position={[0, -1, 0]} castShadow receiveShadow />
      ) : (
        <PlaceholderAvatar color={color} name={name} />
      )}

      {/* Floating name and title */}
      <Html
        position={[0, 1, 0]}
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
        <Html position={[0, 2, 0]} center distanceFactor={10} occlude>
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
              <div className="text-xs text-gray-400 mb-4">
                {scene ? "✅ Ready Player Me Avatar" : "🎭 Demo Placeholder Avatar"}
              </div>
              <div className="flex gap-2 justify-center flex-wrap">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setAnimationState("dance")
                    setTimeout(() => setAnimationState("idle"), 4000)
                  }}
                  className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  🕺 Dance
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setAnimationState("wave")
                    setTimeout(() => setAnimationState("idle"), 3000)
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
          {[...Array(8)].map((_, i) => (
            <FloatingParticle key={i} index={i} color={color} />
          ))}
        </group>
      )}

      {/* Spotlight effect */}
      {hovered && <spotLight position={[0, 5, 2]} angle={0.3} penumbra={0.5} intensity={0.5} color={color} />}
    </group>
  )
}

// Placeholder avatar component that looks more human-like
function PlaceholderAvatar({ color, name }: { color: string; name: string }) {
  return (
    <group position={[0, -1, 0]} scale={1.5}>
      {/* Body */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <capsuleGeometry args={[0.4, 1.2, 4, 8]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#fdbcb4" roughness={0.3} metalness={0.05} />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 2.1, -0.1]} castShadow>
        <sphereGeometry args={[0.38, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.15, 1.85, 0.26]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.15, 1.85, 0.26]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Pupils */}
      <mesh position={[-0.15, 1.85, 0.32]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>
      <mesh position={[0.15, 1.85, 0.32]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 1.75, 0.28]}>
        <coneGeometry args={[0.05, 0.15, 6]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, 1.65, 0.26]}>
        <sphereGeometry args={[0.1, 8, 8, 0, Math.PI]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.6, 1.2, 0]} rotation={[0, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.1, 0.8, 4, 8]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>
      <mesh position={[0.6, 1.2, 0]} rotation={[0, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.1, 0.8, 4, 8]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.25, -0.2, 0]} castShadow>
        <capsuleGeometry args={[0.15, 1.0, 4, 8]} />
        <meshStandardMaterial color={new THREE.Color(color).multiplyScalar(0.7)} />
      </mesh>
      <mesh position={[0.25, -0.2, 0]} castShadow>
        <capsuleGeometry args={[0.15, 1.0, 4, 8]} />
        <meshStandardMaterial color={new THREE.Color(color).multiplyScalar(0.7)} />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.25, -0.9, 0.1]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.4]} />
        <meshStandardMaterial color="#2d1810" />
      </mesh>
      <mesh position={[0.25, -0.9, 0.1]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.4]} />
        <meshStandardMaterial color="#2d1810" />
      </mesh>

      {/* Name badge */}
      <Html position={[0, 0.5, 0.5]} center>
        <div className="bg-white px-2 py-1 rounded text-xs font-bold shadow-lg border" style={{ color }}>
          {name[0]}
        </div>
      </Html>
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
