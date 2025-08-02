"use client"

import { useState, useEffect } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

interface AvatarLoaderProps {
  modelPath: string
  onLoad: (gltf: any) => void
  onError: (error: any) => void
}

export function AvatarLoader({ modelPath, onLoad, onError }: AvatarLoaderProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loader = new GLTFLoader()

    setLoading(true)
    setError(null)

    loader.load(
      modelPath,
      (gltf) => {
        setLoading(false)
        onLoad(gltf)
      },
      (xhr) => {
        // Progress callback
        console.log(`${modelPath} ${(xhr.loaded / xhr.total) * 100}% loaded`)
      },
      (error) => {
        setLoading(false)
        setError(error.message)
        onError(error)
      },
    )
  }, [modelPath, onLoad, onError])

  return null
}
