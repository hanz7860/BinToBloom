<<<<<<< HEAD
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const RegisterForm = dynamic(() => import('./RegisterForm'), {
  ssr: false, // 🛡️ disables SSR for this component
})

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
=======
'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Leaf, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    userType: 'HOUSEHOLD',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')
    setError('')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setMessage('Registration successful! Redirecting to login...')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        setError(data.message || 'Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
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
            href="/login"
            className="text-green-600 hover:text-green-700 transition-colors duration-200 hover:drop-shadow-sm"
          >
            Already have an account? Login
          </Link>
        </div>
      </header>

      {/* Registration Form */}
      <div className="flex-grow flex items-center justify-center py-8 px-4">
        <Card className="w-full max-w-md shadow-2xl hover:shadow-3xl transition-shadow duration-300 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Join BinToBloom
            </CardTitle>
            <p className="text-center text-gray-600">
              Start making a difference today
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="userType"
                  className="block text-sm font-medium mb-1"
                >
                  Account Type
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="HOUSEHOLD">Household</option>
                  <option value="RESTAURANT">Restaurant</option>
                  <option value="COLLECTOR">Collector</option>
                  <option value="NGO">NGO</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  minLength={6}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-200"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>

              {message && (
                <div className="text-center text-sm text-green-600 bg-green-50 p-2 rounded flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
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
      </div>
    </div>
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
  )
}
