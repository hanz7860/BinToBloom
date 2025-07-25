// next.config.mjs

import path from 'path'
import { fileURLToPath } from 'url'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack(config) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))

    // Force all packages to resolve the same 'three' instance
    config.resolve.alias['three'] = path.resolve(
      __dirname,
      'node_modules/three'
    )
    return config
  },
}

export default nextConfig
