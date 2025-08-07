'use client'

import type React from 'react'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import { useMounted } from '@/hooks/use-mounted'
import { fetchUserPickups } from '@/lib/store/slices/pickupSlice'
import { fetchNotifications } from '@/lib/store/slices/notificationSlice'
import Link from 'next/link'
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  Award,
  TrendingUp,
  MapPin,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import ProtectedRoute from '@/components/ProtectedRoute'

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { pickups } = useAppSelector((state) => state.pickup)
  const { notifications } = useAppSelector((state) => state.notifications)
  const mounted = useMounted()

  useEffect(() => {
    dispatch(fetchUserPickups())
    dispatch(fetchNotifications())
  }, [dispatch])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'ACCEPTED':
        return 'bg-blue-100 text-blue-800'
      case 'IN_PROGRESS':
        return 'bg-purple-100 text-purple-800'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-4 h-4" />
      case 'ACCEPTED':
        return <CheckCircle className="w-4 h-4" />
      case 'IN_PROGRESS':
        return <Truck className="w-4 h-4" />
      case 'COMPLETED':
        return <Award className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const stats = {
    totalPickups: pickups.length,
    completedPickups: pickups.filter((p) => p.status === 'COMPLETED').length,
    pendingPickups: pickups.filter((p) => p.status === 'PENDING').length,
    totalWaste: pickups.reduce((sum, p) => sum + p.quantity, 0),
  }

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
  //     </div>
  //   )
  // }

  if (!mounted) {
    return <LoadingSpinner />
  }

  return (
    <ProtectedRoute requiredRole="DONOR">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 mt-2">
              {user?.role === 'DONOR'
                ? 'Track your waste donations and environmental impact'
                : 'Manage your collection activities and earnings'}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Pickups
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalPickups}
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
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.pendingPickups}
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
                    Total Waste (kg)
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalWaste}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Pickups */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Pickups
                  </h2>
                  {user?.role === 'DONOR' && (
                    <Link
                      href="/schedule-pickup"
                      className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
                    >
                      Schedule New Pickup
                    </Link>
                  )}
                </div>

                <div className="divide-y divide-gray-200">
                  {pickups.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No pickups scheduled yet</p>
                      {user?.role === 'DONOR' && (
                        <Link
                          href="/schedule-pickup"
                          className="text-green-600 hover:text-green-500 font-medium"
                        >
                          Schedule your first pickup
                        </Link>
                      )}
                    </div>
                  ) : (
                    pickups.slice(0, 5).map((pickup) => (
                      <div key={pickup.id} className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              {getStatusIcon(pickup.status)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {pickup.wasteType} - {pickup.quantity}kg
                              </p>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <MapPin className="w-4 h-4 mr-1" />
                                {pickup.location.address}
                              </div>
                              <p className="text-xs text-gray-400 mt-1">
                                Scheduled:{' '}
                                {formatDistanceToNow(
                                  new Date(pickup.scheduledTime),
                                  { addSuffix: true }
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                pickup.status
                              )}`}
                            >
                              {pickup.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>

                        {pickup.collector && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Collector:</span>{' '}
                              {pickup.collector.name}
                            </p>
                            {pickup.status === 'ACCEPTED' && (
                              <p className="text-sm text-green-600 mt-1">
                                ✓ Your pickup has been accepted and collector is
                                on the way!
                              </p>
                            )}
                            {pickup.status === 'IN_PROGRESS' && (
                              <p className="text-sm text-blue-600 mt-1">
                                🚛 Collector is currently picking up your waste
                              </p>
                            )}
                            {pickup.status === 'COMPLETED' && (
                              <p className="text-sm text-green-600 mt-1">
                                ✅ Pickup completed successfully!
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Recent Notifications */}
            <div>
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Notifications
                  </h2>
                </div>

                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <div className="w-12 h-12 mx-auto mb-4 text-gray-300">
                        📢
                      </div>
                      <p>No notifications yet</p>
                    </div>
                  ) : (
                    notifications.slice(0, 10).map((notification) => (
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

              {/* Environmental Impact */}
              <div className="bg-white rounded-lg shadow mt-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Your Impact
                  </h2>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">CO2 Saved</span>
                      <span className="text-sm font-medium text-green-600">
                        {(stats.totalWaste * 0.28).toFixed(1)}kg
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Trees Equivalent
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        {Math.floor(stats.totalWaste / 7.5).toFixed(2)} trees
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Pesticide Produced
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        {(stats.totalWaste * 0.6).toFixed(1)}L
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">
                        Eco Warrior Badge
                      </span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      Keep up the great work! You&#39;re making a real
                      difference.
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

export default Dashboard
