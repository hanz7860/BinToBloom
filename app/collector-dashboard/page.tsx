'use client'

import type React from 'react'
<<<<<<< HEAD
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import { useMounted } from '@/hooks/use-mounted'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useRouter } from 'next/navigation'
import {
  fetchAvailablePickups,
  acceptPickup,
  updatePickupStatus,
  fetchUserPickups,
} from '@/lib/store/slices/pickupSlice'
import { fetchNotifications } from '@/lib/store/slices/notificationSlice'
import {
  MapPin,
  Clock,
  Package,
=======

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Camera,
  MapPin,
  Clock,
  Star,
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
  CheckCircle,
  Truck,
  DollarSign,
  TrendingUp,
<<<<<<< HEAD
  Bell,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import toast from 'react-hot-toast'
import { LoadingSpinner } from '@/components/LoadingSpinner'

const CollectorDashboard: React.FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    isAuthenticated,
    user,
    loading: authLoading,
  } = useAppSelector((state) => state.auth)

  const {
    pickups,
    availablePickups,
    loading: pickupLoading,
  } = useAppSelector((state) => state.pickup)

  const { notifications } = useAppSelector((state) => state.notifications)
  const [activeTab, setActiveTab] = useState<
    'available' | 'accepted' | 'completed'
  >('available')

  const mounted = useMounted()

  // useEffect(() => {
  //   // Fetch user's location and get available pickups
  //   if (user?.location) {
  //     dispatch(
  //       fetchAvailablePickups({
  //         latitude: user.location.latitude,
  //         longitude: user.location.longitude,
  //       }),
  //     )
  //   }
  //   dispatch(fetchUserPickups())
  //   dispatch(fetchNotifications())
  // }, [dispatch, user])

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'COLLECTOR')) {
      router.replace('/login')
    }
  }, [authLoading, isAuthenticated, user, router])

  useEffect(() => {
    if (isAuthenticated && user?.role === 'COLLECTOR') {
      if (user.location) {
        dispatch(
          fetchAvailablePickups({
            latitude: user.location.latitude,
            longitude: user.location.longitude,
          })
        )
      }
      dispatch(fetchUserPickups())
      dispatch(fetchNotifications())
    }
  }, [dispatch, user, isAuthenticated])

  const handleAcceptPickup = async (pickupId: number) => {
    try {
      const result = await dispatch(acceptPickup(pickupId))
      if (acceptPickup.fulfilled.match(result)) {
        toast.success('Pickup accepted successfully!')
        // Refresh available pickups
        if (user?.location) {
          dispatch(
            fetchAvailablePickups({
              latitude: user.location.latitude,
              longitude: user.location.longitude,
            })
          )
        }
      } else {
        toast.error('Failed to accept pickup. Please try again.')
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error('Failed to accept pickup. Please try again. ' + err.message)
      } else {
        toast.error('Failed to accept pickup due to an unknown error.')
      }
    }
  }

  const handleUpdateStatus = async (pickupId: number, status: string) => {
    try {
      const result = await dispatch(updatePickupStatus({ pickupId, status }))
      if (updatePickupStatus.fulfilled.match(result)) {
        toast.success(
          `Pickup status updated to ${status.replace('_', ' ').toLowerCase()}!`
        )
      } else {
        toast.error('Failed to update status. Please try again.')
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error('Failed to update status. Please try again. ' + err.message)
      } else {
        toast.error(
          'Failed to update status. Please try again. An unknown error occurred.'
        )
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
        return 'bg-blue-100 text-blue-800'
      case 'IN_PROGRESS':
        return 'bg-purple-100 text-purple-800'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const acceptedPickups = pickups.filter(
    (p) => p.status === 'ACCEPTED' || p.status === 'IN_PROGRESS'
  )
  const completedPickups = pickups.filter((p) => p.status === 'COMPLETED')

  const stats = {
    totalEarnings: completedPickups.length * 50, // Assuming ₹50 per pickup
    completedPickups: completedPickups.length,
    acceptedPickups: acceptedPickups.length,
    totalWasteCollected: completedPickups.reduce(
      (sum, p) => sum + p.quantity,
      0
    ),
  }

  if (!mounted || authLoading || pickupLoading) {
    return <LoadingSpinner />
  }

  return (
    <ProtectedRoute requiredRole="COLLECTOR">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Collector Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your pickup requests and track your earnings
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Earnings
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{stats.totalEarnings}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.completedPickups}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Truck className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Active Pickups
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.acceptedPickups}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Waste Collected (kg)
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalWasteCollected.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex">
                    <button
                      onClick={() => setActiveTab('available')}
                      className={`py-4 px-6 text-sm font-medium border-b-2 ${
                        activeTab === 'available'
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Available Pickups ({availablePickups.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('accepted')}
                      className={`py-4 px-6 text-sm font-medium border-b-2 ${
                        activeTab === 'accepted'
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Accepted ({acceptedPickups.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('completed')}
                      className={`py-4 px-6 text-sm font-medium border-b-2 ${
                        activeTab === 'completed'
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Completed ({completedPickups.length})
                    </button>
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="divide-y divide-gray-200">
                  {activeTab === 'available' && (
                    <>
                      {availablePickups.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                          <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                          <p>No available pickups in your area</p>
                          <p className="text-sm mt-1">
                            Check back later for new requests
                          </p>
                        </div>
                      ) : (
                        availablePickups.map((pickup) => (
                          <div key={pickup.id} className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Package className="w-5 h-5 text-gray-400" />
                                  <h3 className="text-lg font-medium text-gray-900">
                                    {pickup.wasteType} - {pickup.quantity}kg
                                  </h3>
                                </div>

                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {pickup.location.address}
                                </div>

                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                  <Clock className="w-4 h-4 mr-1" />
                                  Scheduled:{' '}
                                  {formatDistanceToNow(
                                    new Date(pickup.scheduledTime),
                                    { addSuffix: true }
                                  )}
                                </div>

                                <div className="text-sm text-gray-600 mb-3">
                                  <span className="font-medium">Donor:</span>{' '}
                                  {pickup.donor.name}
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-lg font-semibold text-green-600">
                                    Earn: ₹50
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleAcceptPickup(pickup.id)
                                    }
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                                  >
                                    Accept Pickup
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </>
                  )}

                  {activeTab === 'accepted' && (
                    <>
                      {acceptedPickups.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                          <Truck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                          <p>No accepted pickups</p>
                          <p className="text-sm mt-1">
                            Accept available pickups to start collecting
                          </p>
                        </div>
                      ) : (
                        acceptedPickups.map((pickup) => (
                          <div key={pickup.id} className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Package className="w-5 h-5 text-gray-400" />
                                  <h3 className="text-lg font-medium text-gray-900">
                                    {pickup.wasteType} - {pickup.quantity}kg
                                  </h3>
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                      pickup.status
                                    )}`}
                                  >
                                    {pickup.status.replace('_', ' ')}
                                  </span>
                                </div>

                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {pickup.location.address}
                                </div>

                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                  <Clock className="w-4 h-4 mr-1" />
                                  Scheduled:{' '}
                                  {formatDistanceToNow(
                                    new Date(pickup.scheduledTime),
                                    { addSuffix: true }
                                  )}
                                </div>

                                <div className="text-sm text-gray-600 mb-3">
                                  <span className="font-medium">Donor:</span>{' '}
                                  {pickup.donor.name}
                                </div>

                                <div className="flex items-center space-x-2">
                                  {pickup.status === 'ACCEPTED' && (
                                    <button
                                      onClick={() =>
                                        handleUpdateStatus(
                                          pickup.id,
                                          'IN_PROGRESS'
                                        )
                                      }
                                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                                    >
                                      Start Collection
                                    </button>
                                  )}
                                  {pickup.status === 'IN_PROGRESS' && (
                                    <button
                                      onClick={() =>
                                        handleUpdateStatus(
                                          pickup.id,
                                          'COMPLETED'
                                        )
                                      }
                                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                                    >
                                      Mark Complete
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </>
                  )}

                  {activeTab === 'completed' && (
                    <>
                      {completedPickups.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                          <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                          <p>No completed pickups yet</p>
                          <p className="text-sm mt-1">
                            Complete pickups to see them here
                          </p>
                        </div>
                      ) : (
                        completedPickups.map((pickup) => (
                          <div key={pickup.id} className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Package className="w-5 h-5 text-gray-400" />
                                  <h3 className="text-lg font-medium text-gray-900">
                                    {pickup.wasteType} - {pickup.quantity}kg
                                  </h3>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    COMPLETED
                                  </span>
                                </div>

                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {pickup.location.address}
                                </div>

                                <div className="text-sm text-gray-600 mb-3">
                                  <span className="font-medium">Donor:</span>{' '}
                                  {pickup.donor.name}
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-500">
                                    Completed:{' '}
                                    {formatDistanceToNow(
                                      new Date(pickup.createdAt),
                                      { addSuffix: true }
                                    )}
                                  </span>
                                  <span className="text-lg font-semibold text-green-600">
                                    Earned: ₹50
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Recent Notifications */}
              <div className="bg-white rounded-lg shadow mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Notifications
                  </h2>
                </div>

                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No notifications yet</p>
                    </div>
                  ) : (
                    notifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {formatDistanceToNow(
                                new Date(notification.createdAt),
                                { addSuffix: true }
                              )}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Earnings Summary */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Earnings Summary
                  </h2>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">This Month</span>
                      <span className="text-lg font-semibold text-green-600">
                        ₹{stats.totalEarnings}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Completed Pickups
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {stats.completedPickups}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Average per Pickup
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        ₹50
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">
                        Top Collector Badge
                      </span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      You&rsquo;re in the top 10% of collectors this month!
                    </p>
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

export default CollectorDashboard
=======
  Award,
  Phone,
  Navigation,
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { NotificationBell } from '@/components/notification-bell'
import { useNotifications } from '@/components/notification-provider'

export default function CollectorDashboard() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addNotification } = useNotifications()
  const [user, setUser] = useState<any>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const [assignedPickups, setAssignedPickups] = useState([
    {
      id: 'PU001',
      donorName: 'Sarah Miller',
      donorPhone: '+1234567890',
      address: '123 Green St, EcoCity',
      scheduledTime: '2:30 PM',
      estimatedWeight: '3.5 kg',
      status: 'assigned',
      distance: '2.5 km',
      donorRating: 4.9,
    },
    {
      id: 'PU002',
      donorName: 'Mike Rodriguez',
      donorPhone: '+1234567891',
      address: '456 Eco Ave, GreenTown',
      scheduledTime: '4:00 PM',
      estimatedWeight: '2.8 kg',
      status: 'assigned',
      distance: '1.2 km',
      donorRating: 4.7,
    },
  ])

  const [collectorStats, setCollectorStats] = useState({
    totalEarnings: 450.75,
    totalPickups: 28,
    averageRating: 4.8,
    totalWasteCollected: 125.5,
    thisWeekPickups: 8,
    thisWeekEarnings: 85.5,
  })

  const [completedPickups, setCompletedPickups] = useState([
    {
      id: 'PU003',
      date: '2024-01-15',
      donor: 'Alice Johnson',
      weight: '4.2 kg',
      earnings: '$15.50',
      rating: 5,
    },
    {
      id: 'PU004',
      date: '2024-01-14',
      donor: 'Bob Smith',
      weight: '3.1 kg',
      earnings: '$12.25',
      rating: 4,
    },
    {
      id: 'PU005',
      date: '2024-01-13',
      donor: 'Carol Davis',
      weight: '5.0 kg',
      earnings: '$18.00',
      rating: 5,
    },
  ])

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleImageCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string)
        addNotification({
          type: 'success',
          title: 'Photo Captured',
          message: 'Waste collection photo captured successfully!',
          priority: 'low',
          icon: <Camera className="h-4 w-4" />,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadPhoto = () => {
    if (capturedImage) {
      addNotification({
        type: 'success',
        title: 'Photo Uploaded',
        message: 'Photo uploaded successfully! Pickup marked as completed.',
        priority: 'medium',
        icon: <CheckCircle className="h-4 w-4" />,
      })
      setCapturedImage(null)
    } else {
      fileInputRef.current?.click()
    }
  }

  const handleStartPickup = (pickupId: string) => {
    setAssignedPickups((prev) =>
      prev.map((pickup) =>
        pickup.id === pickupId ? { ...pickup, status: 'in_progress' } : pickup
      )
    )

    addNotification({
      type: 'info',
      title: 'Pickup Started',
      message: `Started pickup ${pickupId}. Donor has been notified.`,
      priority: 'medium',
      icon: <Truck className="h-4 w-4" />,
    })
  }

  const handleCompletePickup = (pickupId: string) => {
    if (!capturedImage) {
      addNotification({
        type: 'warning',
        title: 'Photo Required',
        message: 'Please take a photo of the collected waste first!',
        priority: 'high',
        icon: <Camera className="h-4 w-4" />,
      })
      return
    }

    const pickup = assignedPickups.find((p) => p.id === pickupId)
    const earnings = Math.floor(Math.random() * 20) + 10 // Random earnings between $10-30

    addNotification({
      type: 'success',
      title: 'Pickup Completed',
      message: `Pickup ${pickupId} completed successfully! $${earnings} earned.`,
      priority: 'high',
      icon: <DollarSign className="h-4 w-4" />,
    })

    setAssignedPickups((prev) =>
      prev.filter((pickup) => pickup.id !== pickupId)
    )
    setCapturedImage(null)

    // Update stats
    setCollectorStats((prev) => ({
      ...prev,
      totalEarnings: prev.totalEarnings + earnings,
      totalPickups: prev.totalPickups + 1,
      thisWeekEarnings: prev.thisWeekEarnings + earnings,
      thisWeekPickups: prev.thisWeekPickups + 1,
    }))
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50"
      >
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-full shadow-md">
              <Truck className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-xl font-semibold text-blue-600">
              BinToBloom Collector
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <span className="text-sm">Welcome, {user.name}</span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            Collector Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your pickups and track your earnings
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Earnings
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${collectorStats.totalEarnings}
                </div>
                <p className="text-xs text-muted-foreground">
                  +${collectorStats.thisWeekEarnings} this week
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Pickups
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {collectorStats.totalPickups}
                </div>
                <p className="text-xs text-muted-foreground">
                  +{collectorStats.thisWeekPickups} this week
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Rating
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {collectorStats.averageRating}
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on {collectorStats.totalPickups} reviews
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Waste Collected
                </CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {collectorStats.totalWasteCollected}kg
                </div>
                <p className="text-xs text-muted-foreground">
                  Environmental impact
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Photo Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Camera className="h-5 w-5" />
                Waste Collection Photo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Take a photo of the collected waste to complete the pickup
                    and receive payment.
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageCapture}
                    ref={fileInputRef}
                    className="hidden"
                  />

                  <Button
                    onClick={handleUploadPhoto}
                    className="w-full bg-blue-600 hover:bg-blue-700 mb-4"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    {capturedImage ? 'Upload Photo' : 'Take Photo'}
                  </Button>

                  {capturedImage && (
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-green-700">
                        Photo captured successfully!
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  {capturedImage ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <img
                        src={capturedImage || '/placeholder.svg'}
                        alt="Captured waste"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Photo will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Assigned Pickups */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Assigned Pickups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignedPickups.map((pickup) => (
                  <div
                    key={pickup.id}
                    className="border rounded-lg p-4 bg-white shadow-sm"
                  >
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                            {pickup.donorName[0]}
                          </div>
                          <div>
                            <h3 className="font-semibold">
                              {pickup.donorName}
                            </h3>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm">
                                {pickup.donorRating}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{pickup.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{pickup.scheduledTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Navigation className="h-4 w-4" />
                            <span>{pickup.distance} away</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center">
                        <p className="text-sm text-gray-600">
                          Estimated Weight:
                        </p>
                        <p className="font-semibold text-lg">
                          {pickup.estimatedWeight}
                        </p>
                        <Badge
                          variant={
                            pickup.status === 'in_progress'
                              ? 'default'
                              : 'secondary'
                          }
                          className="w-fit mt-2"
                        >
                          {pickup.status === 'in_progress'
                            ? 'In Progress'
                            : 'Assigned'}
                        </Badge>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1 bg-transparent"
                          onClick={() =>
                            addNotification({
                              type: 'info',
                              title: 'Call Initiated',
                              message: `Calling ${pickup.donorName}...`,
                              priority: 'low',
                              icon: <Phone className="h-4 w-4" />,
                            })
                          }
                        >
                          <Phone className="h-4 w-4" />
                          Call Donor
                        </Button>

                        {pickup.status === 'assigned' ? (
                          <Button
                            size="sm"
                            onClick={() => handleStartPickup(pickup.id)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Start Pickup
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleCompletePickup(pickup.id)}
                            className="bg-green-600 hover:bg-green-700"
                            disabled={!capturedImage}
                          >
                            Complete Pickup
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Completed Pickups */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Recent Completed Pickups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedPickups.map((pickup) => (
                  <div
                    key={pickup.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{pickup.donor}</div>
                      <div className="text-sm text-gray-600">
                        {pickup.date} • {pickup.weight}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          {pickup.earnings}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm">{pickup.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
