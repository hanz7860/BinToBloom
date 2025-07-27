'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Award,
  Leaf,
  Calendar,
  TrendingUp,
  MapPin,
  Clock,
  Star,
  Truck,
  Phone,
  MessageCircle,
  AlertCircle,
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { NotificationBell } from '@/components/notification-bell'
import { useNotifications } from '@/components/notification-provider'
import { useAuth } from '@/hooks/useAuth'
import { useRealTimePickup } from '@/hooks/useRealTimePickup'
import { apiService } from '@/lib/api'
import { LoadingSpinner } from '@/components/loading-spinner'
import { ErrorBoundary, ErrorFallback } from '@/components/error-boundary'

interface UserStats {
  totalWasteCollected: number
  totalCo2Saved: number
  ecoPoints: number
  totalPickups: number
  leaderboardRank: number
  badges: string[]
}

interface PickupHistoryItem {
  id: string
  scheduledDateTime: string
  actualWeight?: number
  status: string
  pointsEarned?: number
}

export default function DonorDashboard() {
  const router = useRouter()
  const { user, loading: authLoading, logout } = useAuth()
  const { addNotification } = useNotifications()

  // State management
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [activePickupId, setActivePickupId] = useState<number | null>(null)
  const [pickupHistory, setPickupHistory] = useState<PickupHistoryItem[]>([])
  const [loading, setLoading] = useState({
    stats: true,
    activePickup: true,
    history: true,
  })
  const [errors, setErrors] = useState({
    stats: null as string | null,
    activePickup: null as string | null,
    history: null as string | null,
  })

  // Real-time pickup tracking
  const {
    pickup: activePickup,
    loading: pickupLoading,
    error: pickupError,
    lastUpdated,
    refreshPickup,
  } = useRealTimePickup(activePickupId || undefined)

  // Fetch user stats
  const fetchUserStats = async () => {
    try {
      setLoading((prev) => ({ ...prev, stats: true }))
      setErrors((prev) => ({ ...prev, stats: null }))

      const response = await apiService.getUserStats()

      if (response.success && response.data) {
        setUserStats(response.data)
      } else {
        setErrors((prev) => ({ ...prev, stats: response.message }))
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        stats: 'Failed to load user statistics',
      }))
    } finally {
      setLoading((prev) => ({ ...prev, stats: false }))
    }
  }

  // Fetch active pickup
  const fetchActivePickup = async () => {
    try {
      setLoading((prev) => ({ ...prev, activePickup: true }))
      setErrors((prev) => ({ ...prev, activePickup: null }))

      const response = await apiService.getActivePickup()

      if (response.success) {
        if (response.data) {
          setActivePickupId(response.data.id)
        } else {
          setActivePickupId(null)
        }
      } else {
        setErrors((prev) => ({ ...prev, activePickup: response.message }))
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        activePickup: 'Failed to load active pickup',
      }))
    } finally {
      setLoading((prev) => ({ ...prev, activePickup: false }))
    }
  }

  // Fetch pickup history
  const fetchPickupHistory = async () => {
    try {
      setLoading((prev) => ({ ...prev, history: true }))
      setErrors((prev) => ({ ...prev, history: null }))

      const response = await apiService.getPickupHistory(0, 5)

      if (response.success && response.data) {
        setPickupHistory(response.data.content || [])
      } else {
        setErrors((prev) => ({ ...prev, history: response.message }))
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        history: 'Failed to load pickup history',
      }))
    } finally {
      setLoading((prev) => ({ ...prev, history: false }))
    }
  }

  // Initial data loading
  useEffect(() => {
    if (user) {
      fetchUserStats()
      fetchActivePickup()
      fetchPickupHistory()
    }
  }, [user])

  // Handle schedule pickup
  const handleSchedulePickup = () => {
    router.push('/schedule')
  }

  // Handle rate collector
  const handleRateCollector = (rating: number) => {
    addNotification({
      type: 'success',
      title: 'Rating Submitted',
      message: `You rated the collector ${rating} stars! Thank you for your feedback.`,
      priority: 'low',
      icon: <Star className="h-4 w-4" />,
    })
  }

  // Show loading screen during authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Loading your dashboard..." />
      </div>
    )
  }

  // Show error if user not found
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-4">
              Please log in to access your dashboard.
            </p>
            <Button onClick={() => router.push('/login')}>Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <ErrorBoundary fallback={ErrorFallback}>
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
              <div className="bg-green-100 p-2 rounded-full shadow-md">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-xl font-semibold text-green-600">
                BinToBloom
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <NotificationBell />
              <span className="text-sm">Welcome, {user.name}</span>
              <Button onClick={logout} variant="outline" size="sm">
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
              Donor Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Track your environmental impact and manage pickups
            </p>
          </motion.div>

          {/* Active Pickup Tracking */}
          {activePickupId && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Truck className="h-5 w-5" />
                    Active Pickup - Live Tracking
                    {lastUpdated && (
                      <span className="text-xs text-gray-500 ml-auto">
                        Last updated: {lastUpdated.toLocaleTimeString()}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pickupLoading && !activePickup ? (
                    <LoadingSpinner text="Loading pickup details..." />
                  ) : pickupError ? (
                    <div className="text-center py-4">
                      <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <p className="text-red-600">{pickupError}</p>
                      <Button
                        onClick={refreshPickup}
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-transparent"
                      >
                        Retry
                      </Button>
                    </div>
                  ) : activePickup ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        {activePickup.collectorName && (
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                              {activePickup.collectorName[0]}
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {activePickup.collectorName}
                              </h3>
                              {activePickup.collectorRating && (
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  <span className="text-sm">
                                    {activePickup.collectorRating}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">
                              Scheduled:{' '}
                              {new Date(
                                activePickup.scheduledDateTime
                              ).toLocaleString()}
                            </span>
                          </div>
                          {activePickup.currentLocation && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">
                                {activePickup.currentLocation}
                              </span>
                            </div>
                          )}
                          {activePickup.estimatedArrival && (
                            <div className="flex items-center gap-2">
                              <Truck className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-green-700">
                                ETA:{' '}
                                {new Date(
                                  activePickup.estimatedArrival
                                ).toLocaleTimeString()}
                              </span>
                            </div>
                          )}
                        </div>
                        {activePickup.collectorPhone && (
                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-1 bg-transparent"
                            >
                              <Phone className="h-4 w-4" />
                              Call
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-1 bg-transparent"
                            >
                              <MessageCircle className="h-4 w-4" />
                              Message
                            </Button>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">
                          Rate this collector:
                        </h4>
                        <div className="flex gap-1 mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => handleRateCollector(star)}
                              className="text-gray-300 hover:text-yellow-500 transition-colors"
                            >
                              <Star className="h-6 w-6" />
                            </button>
                          ))}
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <h5 className="font-medium mb-2">Status:</h5>
                          <Badge variant="outline" className="mb-4">
                            {activePickup.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-gray-600">
                      No active pickup found
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {loading.stats ? (
              Array.from({ length: 4 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="shadow-xl">
                    <CardContent className="p-6">
                      <LoadingSpinner size="sm" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : errors.stats ? (
              <div className="col-span-4">
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-6 text-center">
                    <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <p className="text-red-600">{errors.stats}</p>
                    <Button
                      onClick={fetchUserStats}
                      variant="outline"
                      size="sm"
                      className="mt-2 bg-transparent"
                    >
                      Retry
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : userStats ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Waste Collected
                      </CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {userStats.totalWasteCollected}kg
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Keep up the great work!
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
                        CO2 Saved
                      </CardTitle>
                      <Leaf className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {userStats.totalCo2Saved}kg
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Making a difference!
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Eco Points
                      </CardTitle>
                      <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {userStats.ecoPoints}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Rank #{userStats.leaderboardRank} globally
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Pickups
                      </CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {userStats.totalPickups}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {20 - userStats.totalPickups} more to next badge
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            ) : null}
          </div>

          {/* Quick Actions and Pickup History */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handleSchedulePickup}
                  >
                    Schedule New Pickup
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Pickups
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Invite Friends
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Redeem Eco Points
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle>Recent Pickups</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading.history ? (
                    <LoadingSpinner text="Loading pickup history..." />
                  ) : errors.history ? (
                    <div className="text-center py-4">
                      <AlertCircle className="h-6 w-6 text-red-500 mx-auto mb-2" />
                      <p className="text-red-600 text-sm">{errors.history}</p>
                      <Button
                        onClick={fetchPickupHistory}
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-transparent"
                      >
                        Retry
                      </Button>
                    </div>
                  ) : pickupHistory.length > 0 ? (
                    <div className="space-y-4">
                      {pickupHistory.map((pickup) => (
                        <div
                          key={pickup.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <div className="font-medium">
                              {new Date(
                                pickup.scheduledDateTime
                              ).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-600">
                              {pickup.actualWeight
                                ? `${pickup.actualWeight}kg`
                                : 'Pending'}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                pickup.status === 'COMPLETED'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {pickup.status}
                            </Badge>
                            {pickup.pointsEarned && (
                              <div className="flex items-center gap-1">
                                <Award className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">
                                  {pickup.pointsEarned}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-600 py-4">
                      No pickup history found
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Badges Section */}
          {userStats && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8"
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {userStats.badges.map((badge, index) => (
                      <Badge key={index} variant="outline" className="p-2">
                        <Award className="h-4 w-4 mr-1" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">
                      Progress to next badge:
                    </h4>
                    <Progress value={75} className="w-full" />
                    <p className="text-sm text-gray-600 mt-1">
                      {20 - userStats.totalPickups} more pickups to earn "Super
                      Contributor"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </main>
      </div>
    </ErrorBoundary>
  )
}
