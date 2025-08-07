'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from '@react-three/drei'
import { GLBAvatar } from '@/components/glb-avatar'
import { SimpleAvatarView } from '@/components/simple-avatar-view'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

const TEAM = [
  {
    name: 'Harsh',
    position: 'Full-Stack Dev',
    description: 'Builds robust web & backend systems',
    color: '#22c55e',
    modelPath: '/models/harsh.glb',
    position3D: [-4, 0, 0] as [number, number, number],
  },
  {
    name: 'Hanzala',
    position: '3D / XR Engineer',
    description: 'Creates immersive 3-D experiences',
    color: '#0ea5e9',
    modelPath: '/models/hanzala.glb',
    position3D: [-2, 0, 0] as [number, number, number],
  },
  {
    name: 'Aniket',
    position: 'UI / UX Lead',
    description: 'Designs delightful user interfaces',
    color: '#f97316',
    modelPath: '/models/aniket.glb',
    position3D: [0, 0, 0] as [number, number, number],
  },
  {
    name: 'Fardeen',
    position: 'Data Scientist',
    description: 'Turns waste data into insights',
    color: '#a855f7',
    modelPath: '/models/fardeen.glb',
    position3D: [2, 0, 0] as [number, number, number],
  },
  {
    name: 'Maroti',
    position: 'Ops & DevSec',
    description: 'Keeps the cloud secure & humming',
    color: '#e11d48',
    modelPath: '/models/maroti.glb',
    position3D: [4, 0, 0] as [number, number, number],
  },
]

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const [renderError, setRenderError] = useState(false)
  const [use3D, setUse3D] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  // if (!mounted) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-8">
  //       <div className="max-w-6xl mx-auto">
  //         <h1 className="text-4xl font-bold text-green-800 mb-8">About Our Team</h1>
  //         <div className="h-[600px] bg-white/50 rounded-xl flex items-center justify-center">
  //           <div className="text-xl text-green-700">Loading...</div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          About Our Team
        </h1>
        <p className="text-lg text-green-700 mb-8">
          Meet the passionate individuals behind Bin to Bloom who are dedicated
          to transforming waste management and creating a more sustainable
          future.
        </p>

        {renderError && (
          <Alert className="mb-6">
            <AlertTitle>3D rendering encountered an error</AlertTitle>
            <AlertDescription>
              We've switched to a simplified view. You can try reloading the 3D
              experience.
              <Button
                variant="outline"
                size="sm"
                className="ml-4 bg-transparent"
                onClick={() => {
                  setRenderError(false)
                  setUse3D(true)
                }}
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Try 3D Again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {use3D && !renderError ? (
          <div className="bg-white/50 rounded-xl overflow-hidden shadow-xl mb-8">
            <div className="h-[600px] relative">
              <ErrorBoundary
                onError={() => {
                  setRenderError(true)
                  setUse3D(false)
                }}
              >
                <Canvas
                  shadows
                  onError={() => {
                    setRenderError(true)
                    setUse3D(false)
                  }}
                >
                  <PerspectiveCamera
                    makeDefault
                    position={[0, 0, 10]}
                    fov={50}
                  />
                  <ambientLight intensity={0.5} />
                  <pointLight
                    position={[10, 10, 10]}
                    intensity={0.8}
                    castShadow
                  />
                  <Suspense fallback={null}>
                    {TEAM.map((member, index) => (
                      <GLBAvatar
                        key={member.name}
                        name={member.name}
                        position={member.position}
                        description={member.description}
                        position3D={member.position3D}
                        color={member.color}
                        index={index}
                        modelPath={member.modelPath}
                      />
                    ))}
                    <Environment preset="city" />
                  </Suspense>
                  <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    zoomSpeed={0.5}
                    panSpeed={0.5}
                    rotateSpeed={0.5}
                    minDistance={5}
                    maxDistance={20}
                  />
                </Canvas>
              </ErrorBoundary>

              <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-green-800 mb-2">
                  Interactive 3D Team Gallery
                </h2>
                <p className="text-sm text-gray-600">
                  Click on team members to learn more about them. Drag to
                  rotate, scroll to zoom, and enjoy our interactive 3D
                  experience!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <SimpleAvatarView teamMembers={TEAM} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 mb-4">
              At Bin to Bloom, we're committed to revolutionizing waste
              management through technology and community engagement. We connect
              waste donors with collectors to ensure proper recycling and
              composting, reducing landfill waste and promoting a circular
              economy.
            </p>
            <p className="text-gray-700">
              Our platform incentivizes sustainable practices through
              gamification, education, and real-time impact tracking, making
              environmental responsibility accessible and rewarding for
              everyone.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Our Impact
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold">
                  5T
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">
                    Waste Diverted
                  </h3>
                  <p className="text-sm text-gray-600">
                    Tons of waste kept out of landfills
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
                  3K
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">Active Users</h3>
                  <p className="text-sm text-gray-600">
                    Community members making a difference
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-2xl font-bold">
                  12K
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">CO₂ Reduced</h3>
                  <p className="text-sm text-gray-600">
                    Kilograms of carbon emissions prevented
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Error boundary component to catch rendering errors
class ErrorBoundary extends React.Component<{
  children: React.ReactNode
  onError: () => void
}> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any) {
    console.error('3D rendering error:', error)
    this.props.onError()
  }

  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}
