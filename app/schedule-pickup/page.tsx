'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { schedulePickup } from '@/lib/store/slices/pickupSlice'
import { MapPin, Package, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { useMounted } from '@/hooks/use-mounted'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import ProtectedRoute from '@/components/ProtectedRoute'
import axios from 'axios'

const SchedulePickup: React.FC = () => {
  const [formData, setFormData] = useState({
    wasteType: '',
    quantity: '',
    scheduledTime: '',
    location: {
      address: '',
      latitude: 0,
      longitude: 0,
    },
    notes: '',
  })
  const [locationLoading, setLocationLoading] = useState(false)

  const dispatch = useAppDispatch()
  const router = useRouter()
  const { loading } = useAppSelector((state) => state.pickup)
  //const { user } = useAppSelector((state) => state.auth)
  const mounted = useMounted()

  const wasteTypes = [
    'Food Waste',
    'Vegetable Peels',
    'Fruit Waste',
    'Cooked Food',
    'Dairy Products',
    'Mixed Organic Waste',
  ]

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (e.target.name === 'address') {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          address: e.target.value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    }
  }

  const getCurrentLocation = () => {
    setLocationLoading(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords

          try {
            const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY // api key open cage
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
            )

            const address =
              response.data.results[0]?.formatted || `${latitude}, ${longitude}`

            setFormData((prev) => ({
              ...prev,
              location: {
                latitude,
                longitude,
                address,
              },
            }))
            toast.success('Location detected!')
          } catch (err: unknown) {
            if (err instanceof Error) {
              toast.error(`Failed to get address: ${err.message}`)
            }
            toast.error('Failed to get address from coordinates.')
            setFormData((prev) => ({
              ...prev,
              location: {
                latitude,
                longitude,
                address: `${latitude}, ${longitude}`,
              },
            }))
          }

          setLocationLoading(false)
        },
        (error: unknown) => {
          if (error instanceof Error) {
            toast.error(
              `Error getting location, Please Enter Manually: ${error.message}`
            )
          } else {
            toast.error('Unable to get your location. Please enter manually.')
          }
          setLocationLoading(false)
        }
      )
    } else {
      toast.error('Geolocation is not supported by this browser.')
      setLocationLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.wasteType ||
      !formData.quantity ||
      !formData.scheduledTime ||
      !formData.location.address
    ) {
      toast.error('Please fill in all required fields')
      return
    }

    if (Number.parseFloat(formData.quantity) <= 0) {
      toast.error('Quantity must be greater than 0')
      return
    }

    const scheduledDate = new Date(formData.scheduledTime)
    if (scheduledDate <= new Date()) {
      toast.error('Please select a future date and time')
      return
    }

    try {
      const result = await dispatch(
        schedulePickup({
          wasteType: formData.wasteType,
          quantity: Number.parseFloat(formData.quantity),
          location: formData.location,
          scheduledTime: formData.scheduledTime,
        })
      )

      if (schedulePickup.fulfilled.match(result)) {
        toast.success('Pickup scheduled successfully!')
        router.push('/dashboard')
      } else {
        toast.error('Failed to schedule pickup. Please try again.')
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(
          'Failed to schedule pickup. Please try again.' + err.message
        )
      } else {
        toast.error('Failed to schedule pickup. Please try again.')
      }
    }
  }
  // Set minimum date to current date and time
  const now = new Date()
  const minDateTime = new Date(now.getTime() + 60 * 60 * 1000) // 1 hour from now
  const minDateTimeString = minDateTime.toISOString().slice(0, 16)

  if (!mounted) {
    return <LoadingSpinner />
  }
  return (
    <ProtectedRoute requiredRole="DONOR">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">
                Schedule Pickup
              </h1>
              <p className="text-gray-600 mt-1">
                Schedule a convenient time for waste collection
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Waste Type */}
              <div>
                <label
                  htmlFor="wasteType"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Waste Type *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Package className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="wasteType"
                    name="wasteType"
                    value={formData.wasteType}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select waste type</option>
                    {wasteTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Estimated Quantity (kg) *
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter quantity in kg"
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Pickup Location *
                </label>
                <div className="flex">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.location.address}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter pickup address"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={locationLoading}
                    className="px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {locationLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                    ) : (
                      'Use Current'
                    )}
                  </button>
                </div>
              </div>

              {/* Scheduled Time */}
              <div>
                <label
                  htmlFor="scheduledTime"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Preferred Pickup Time *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="scheduledTime"
                    name="scheduledTime"
                    type="datetime-local"
                    value={formData.scheduledTime}
                    onChange={handleChange}
                    min={minDateTimeString}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Please select a time at least 1 hour from now
                </p>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Any special instructions for the collector..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Scheduling...
                    </div>
                  ) : (
                    'Schedule Pickup'
                  )}
                </button>
              </div>
            </form>

            {/* Info Section */}
            <div className="px-6 py-4 bg-green-50 border-t border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">ℹ️</span>
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    What happens next?
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        Nearby collectors will be notified about your pickup
                        request
                      </li>
                      <li>
                        A collector will accept your request and contact you
                      </li>
                      <li>
                        You&#39;ll receive notifications about the pickup status
                      </li>
                      <li>
                        The collector will arrive at your specified time and
                        location
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default SchedulePickup
