<<<<<<< HEAD
=======
// next.config.mjs

import path from 'path'
import { fileURLToPath } from 'url'

>>>>>>> 821ad8e3403df0274503f1568fa817ddb0fbdfa7
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
<<<<<<< HEAD
=======
  webpack(config) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))

    // Force all packages to resolve the same 'three' instance
    config.resolve.alias['three'] = path.resolve(
      __dirname,
      'node_modules/three'
    )
    return config
  },
>>>>>>> 821ad8e3403df0274503f1568fa817ddb0fbdfa7
}

export default nextConfig
