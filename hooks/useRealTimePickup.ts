'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiService } from '@/lib/api'

interface PickupTracking {
  pickupId: number
  status: string
  collectorName?: string
  collectorPhone?: string
  collectorRating?: number
  scheduledDateTime: string
  estimatedArrival?: string
  currentLocation?: string
  distanceKm?: number
  specialInstructions?: string
  estimatedWeight?: number
  address: string
  contactNumber: string
}

export function useRealTimePickup(pickupId?: number) {
  const [pickup, setPickup] = useState<PickupTracking | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchPickupData = useCallback(async () => {
    if (!pickupId) return

    try {
      setLoading(true)
      setError(null)

      const response = await apiService.getPickupTracking(pickupId)

      if (response.success && response.data) {
        setPickup(response.data)
        setLastUpdated(new Date())
      } else {
        setError(response.message || 'Failed to fetch pickup data')
      }
    } catch (err) {
      setError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }, [pickupId])

  useEffect(() => {
    if (!pickupId) return

    // Initial fetch
    fetchPickupData()

    // Set up polling every 10 seconds
    const interval = setInterval(fetchPickupData, 10000)

    return () => clearInterval(interval)
  }, [pickupId, fetchPickupData])

  const refreshPickup = () => {
    fetchPickupData()
  }

  return {
    pickup,
    loading,
    error,
    lastUpdated,
    refreshPickup,
  }
}
