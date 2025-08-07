'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Leaf, Home, Search, Sprout } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function NotFound() {
  const [currentJoke, setCurrentJoke] = useState(0)

  const jokes = [
    'Looks like this page got composted! 🌱',
    'This page is as lost as plastic in the ocean! 🌊',
    'Oops! This page went to the wrong bin! 🗑️',
    'This URL is more extinct than the dodo! 🦤',
    'Page not found - it must be biodegradable! 🍃',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJoke((prev) => (prev + 1) % jokes.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [jokes.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 with Plants */}
        <div className="relative mb-8">
          <div className="text-8xl md:text-9xl font-bold text-green-600 opacity-20 select-none">
            404
          </div>

          {/* Animated Plants Growing from the Numbers */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-8">
              {/* Plant 1 */}
              <div className="animate-bounce" style={{ animationDelay: '0s' }}>
                <Sprout className="w-12 h-12 text-green-500" />
              </div>
              {/* Plant 2 */}
              <div
                className="animate-bounce"
                style={{ animationDelay: '0.5s' }}
              >
                <Leaf className="w-16 h-16 text-emerald-500" />
              </div>
              {/* Plant 3 */}
              <div className="animate-bounce" style={{ animationDelay: '1s' }}>
                <Sprout className="w-10 h-10 text-teal-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Humorous Message */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>

          {/* Rotating Jokes */}
          <div className="h-16 flex items-center justify-center">
            <p
              key={currentJoke}
              className="text-xl text-gray-600 animate-fade-in-up"
            >
              {jokes[currentJoke]}
            </p>
          </div>
        </div>

        {/* Fun GIF Placeholder - Using CSS Animation Instead */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-64 h-48 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl overflow-hidden shadow-lg">
            {/* Animated Waste Bin */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-20 bg-green-600 rounded-lg relative">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-green-700 rounded-full"></div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold">
                  BIN
                </div>
              </div>
            </div>

            {/* Animated Falling Items */}
            <div
              className="absolute top-4 left-8 animate-bounce"
              style={{ animationDelay: '0s', animationDuration: '2s' }}
            >
              <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
            </div>
            <div
              className="absolute top-8 right-12 animate-bounce"
              style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}
            >
              <div className="w-3 h-6 bg-red-400 rounded"></div>
            </div>
            <div
              className="absolute top-6 left-1/2 animate-bounce"
              style={{ animationDelay: '1s', animationDuration: '3s' }}
            >
              <Leaf className="w-5 h-5 text-green-500" />
            </div>

            {/* Ground */}
            <div className="absolute bottom-0 w-full h-8 bg-green-200"></div>

            {/* Floating Text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-2xl animate-pulse">🌱</div>
            </div>
          </div>
        </div>

        {/* Environmental Tips */}
        <div className="mb-8 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center justify-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            While You&#39;re Here, Did You Know?
          </h3>
          <p className="text-gray-600 text-sm">
            The average household throws away 30% of food purchased. That&#39;s
            like throwing money in the bin! Let BinToBloom help you turn that
            waste into something beautiful. 🌸
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
          >
            <Link href="/about-us" className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Meet Our Team
            </Link>
          </Button>
        </div>

        {/* Fun Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-2">
            &ldquo;Every page not found is a chance to plant a new idea!&rdquo;
            🌱
          </p>
          <div className="flex justify-center space-x-2 text-2xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>
              🌿
            </span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
              🌱
            </span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>
              🌿
            </span>
            <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>
              🌱
            </span>
            <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>
              🌿
            </span>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-10 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-48 h-48 bg-emerald-200 rounded-full opacity-10 animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-5 w-24 h-24 bg-teal-200 rounded-full opacity-10 animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-1/3 right-20 w-36 h-36 bg-lime-200 rounded-full opacity-10 animate-pulse"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </div>
    </div>
  )
}
