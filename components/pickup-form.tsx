'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { apiService } from '@/lib/api' // Ensure apiService is imported

export function PickupForm() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    scheduledDateTime: '',
    address: '',
    contactNumber: '',
    specialInstructions: '',
    estimatedWeight: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      // Pre-fill form with user data if available
      setFormData((prev) => ({
        ...prev,
        contactNumber: parsedUser.phoneNumber || '',
        address: parsedUser.address || '',
      }))
    } else {
      router.push('/login')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      setError('Please log in to schedule a pickup')
      return
    }

    setIsSubmitting(true)
    setMessage('')
    setError('')

    try {
      // Use apiService which handles Authorization header and base URL
      // Remove userId from query parameter, backend will extract from token
      const response = await apiService.schedulePickup({
        ...formData,
        scheduledDateTime: new Date(formData.scheduledDateTime).toISOString(),
        estimatedWeight: Number.parseFloat(formData.estimatedWeight) || 0,
      })

      if (response.success) {
        setMessage(
          'Pickup scheduled successfully! You will be notified when a collector is assigned.'
        )
        setFormData({
          scheduledDateTime: '',
          address: '',
          contactNumber: '',
          specialInstructions: '',
          estimatedWeight: '',
        })

        // Redirect to dashboard after success
        setTimeout(() => {
          if (user.type === 'collector') {
            router.push('/collector-dashboard')
          } else {
            router.push('/donor-dashboard')
          }
        }, 2000)
      } else {
        setError(
          response.message || 'Failed to schedule pickup. Please try again.'
        )
      }
    } catch (error) {
      console.error('Pickup scheduling error:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Please log in to schedule a pickup
          </p>
          <Button onClick={() => router.push('/login')}>Go to Login</Button>
        </div>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl hover:shadow-3xl transition-shadow duration-300 border border-gray-200">
      <CardHeader>
        <CardTitle>Schedule a Pickup</CardTitle>
        <p className="text-sm text-gray-600">
          Welcome, {user.name}! Schedule your waste collection.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="scheduledDateTime"
              className="block text-sm font-medium mb-1"
            >
              Pickup Date & Time
            </label>
            <input
              type="datetime-local"
              id="scheduledDateTime"
              name="scheduledDateTime"
              value={formData.scheduledDateTime}
              onChange={handleChange}
              required
              min={new Date().toISOString().slice(0, 16)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:shadow-md transition-shadow duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Pickup Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:shadow-md transition-shadow duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter pickup address"
            />
          </div>

          <div>
            <label
              htmlFor="contactNumber"
              className="block text-sm font-medium mb-1"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:shadow-md transition-shadow duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter contact number"
            />
          </div>

          <div>
            <label
              htmlFor="estimatedWeight"
              className="block text-sm font-medium mb-1"
            >
              Estimated Weight (kg)
            </label>
            <input
              type="number"
              id="estimatedWeight"
              name="estimatedWeight"
              value={formData.estimatedWeight}
              onChange={handleChange}
              step="0.1"
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:shadow-md transition-shadow duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Estimated weight in kg"
            />
          </div>

          <div>
            <label
              htmlFor="specialInstructions"
              className="block text-sm font-medium mb-1"
            >
              Special Instructions
            </label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:shadow-md transition-shadow duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Any special instructions for the collector..."
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-200"
          >
            {isSubmitting ? 'Scheduling...' : 'Schedule Pickup'}
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
  )
}
