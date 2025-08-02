'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Leaf, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '@/components/loading-spinner'

export default function LoginPage() {
  const router = useRouter()
  const { login, loading } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!formData.username || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    try {
      const response = await login(formData.username, formData.password)

      if (response.success) {
        setMessage('Login successful! Redirecting...')

        // Redirect based on user type
        setTimeout(() => {
          const user = JSON.parse(localStorage.getItem('user') || '{}')
          if (user.type === 'collector') {
            router.push('/collector-dashboard')
          } else if (user.type === 'household' || user.type === 'restaurant') {
            router.push('/donor-dashboard')
          } else {
            router.push('/dashboard')
          }
        }, 1000)
      } else {
        setError(
          response.message || 'Login failed. Please check your credentials.'
        )
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An unexpected error occurred. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95"
      >
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 transform hover:scale-105 transition-transform duration-200"
          >
            <div className="bg-green-100 p-2 rounded-full shadow-md">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-xl font-semibold text-green-600 drop-shadow-sm">
              BinToBloom
            </span>
          </Link>
          <Link
            href="/register"
            className="text-green-600 hover:text-green-700 transition-colors duration-200 hover:drop-shadow-sm"
          >
            Don't have an account? Register
          </Link>
        </div>
      </motion.header>

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl hover:shadow-3xl transition-shadow duration-300 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Welcome Back
              </CardTitle>
              <p className="text-center text-gray-600">
                Sign in to your BinToBloom account
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium mb-1"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your username"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your password"
                  />
                </div>

                <motion.div
                  whileHover={{ scale: loading ? 1 : 1.03 }}
                  whileTap={{ scale: loading ? 1 : 0.97 }}
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none disabled:hover:scale-100 disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <LoadingSpinner size="sm" />
                        Signing In...
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </motion.div>

                {message && (
                  <div className="text-center text-sm text-green-600 bg-green-50 p-2 rounded">
                    {message}
                  </div>
                )}

                {error && (
                  <div className="text-center text-sm text-red-600 bg-red-50 p-2 rounded flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
