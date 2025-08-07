'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
<<<<<<< HEAD
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { login, clearError } from '@/lib/store/slices/authSlice'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { useMounted } from '@/hooks/use-mounted'
import { LoadingSpinner } from '@/components/LoadingSpinner'

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useAppDispatch()
  const router = useRouter()
  const { loading, error } = useAppSelector((state) => state.auth)
  const mounted = useMounted()

  type LoginPayload = {
    user: {
      role: 'COLLECTOR' | 'DONOR'
=======
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
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
<<<<<<< HEAD
    if (error) {
      dispatch(clearError())
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      const result = await dispatch(login(formData))
      if (login.fulfilled.match(result)) {
        toast.success('Login successful!')
        const loggedInUser = result.payload as LoginPayload
        // console.log('result', result.payload)
        // console.log('loggedInUser', loggedInUser)

        console.log('loggedInUser.role', loggedInUser.user.role)

        if (loggedInUser.user.role === 'COLLECTOR') {
          router.push('/collector-dashboard')
        } else {
          router.push('/dashboard')
        }
      } else {
        toast.error((result.payload as string) || 'Login failed')
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error('Login failed. Please try again.' + err.message)
      } else {
        toast.error('An unexpected error occurred. Please try again.')
      }
    }
  }

  if (!mounted) {
    return <LoadingSpinner />
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link
            href="/register"
            className="font-medium text-green-600 hover:text-green-500"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  New to BinToBloom?
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link
                href="/register?role=donor"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Join as Donor
              </Link>
              <Link
                href="/register?role=collector"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Join as Collector
              </Link>
            </div>
          </div>
        </div>
=======
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
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
      </div>
    </div>
  )
}
<<<<<<< HEAD

export default Login
=======
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
