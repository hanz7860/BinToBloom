'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import {
  fetchAvailablePickups,
  acceptPickup,
  updatePickupStatus,
  fetchUserPickups,
} from '../store/slices/pickupSlice'
import { fetchNotifications } from '../store/slices/notificationSlice'
import {
  MapPin,
  Clock,
  Package,
  CheckCircle,
  Truck,
  DollarSign,
  TrendingUp,
  Bell,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import toast from 'react-hot-toast'

const CollectorDashboard: React.FC = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { pickups, availablePickups, loading } = useAppSelector(
    (state) => state.pickup
  )
  const { notifications } = useAppSelector((state) => state.notifications)
  const [activeTab, setActiveTab] = useState<
    'available' | 'accepted' | 'completed'
  >('available')

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
    // Fetch user's location and get available pickups
    if (user?.location) {
      dispatch(
        fetchAvailablePickups({
          latitude: user.location.latitude,
          longitude: user.location.longitude,
        })
      )
    }
    dispatch(fetchUserPickups())
    dispatch(fetchNotifications())
  }, [dispatch, user])

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
    } catch (err) {
      toast.error('Failed to accept pickup. Please try again.')
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
    } catch (err) {
      toast.error('Failed to update status. Please try again.')
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
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
                  {stats.totalWasteCollected}
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
                                  onClick={() => handleAcceptPickup(pickup.id)}
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
                                      handleUpdateStatus(pickup.id, 'COMPLETED')
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
                    You're in the top 10% of collectors this month!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectorDashboard
