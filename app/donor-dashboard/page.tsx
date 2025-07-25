"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, Leaf, Calendar, TrendingUp, MapPin, Clock, Star, Truck, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { NotificationBell } from "@/components/notification-bell"
import { RealTimeStatus } from "@/components/real-time-status"
import { useNotifications } from "@/components/notification-provider"

export default function DonorDashboard() {
  const router = useRouter()
  const { addNotification } = useNotifications()
  const [user, setUser] = useState<any>(null)
  const [activePickup, setActivePickup] = useState({
    id: "PU001",
    collectorName: "John Collector",
    collectorPhone: "+1234567890",
    scheduledTime: "2:30 PM",
    status: "On the way",
    estimatedArrival: "15 minutes",
    currentLocation: "2.5 km away",
    rating: 4.8,
  })

  const [userStats, setUserStats] = useState({
    totalWasteCollected: 45.5,
    totalCo2Saved: 12.8,
    ecoPoints: 1250,
    totalPickups: 15,
    leaderboardRank: 3,
    badges: ["Eco Warrior", "Regular Contributor", "Waste Champion"],
  })

  const [pickupHistory, setPickupHistory] = useState([
    { id: "PU001", date: "2024-01-15", weight: "3.2 kg", status: "Completed", rating: 5 },
    { id: "PU002", date: "2024-01-10", weight: "2.8 kg", status: "Completed", rating: 4 },
    { id: "PU003", date: "2024-01-05", weight: "4.1 kg", status: "Completed", rating: 5 },
  ])

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleRateCollector = (rating: number) => {
    addNotification({
      type: "success",
      title: "Rating Submitted",
      message: `You rated the collector ${rating} stars! Thank you for your feedback.`,
      priority: "low",
      icon: <Star className="h-4 w-4" />,
    })
  }

  const handleSchedulePickup = () => {
    addNotification({
      type: "info",
      title: "Pickup Scheduled",
      message: "Your pickup has been scheduled for tomorrow at 2:00 PM",
      priority: "medium",
      icon: <Calendar className="h-4 w-4" />,
    })
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
            <div className="bg-green-100 p-2 rounded-full shadow-md">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-xl font-semibold text-green-600">BinToBloom</span>
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
          <h1 className="text-3xl font-bold text-gray-800">Donor Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your environmental impact and manage pickups</p>
        </motion.div>

        {/* Real-Time Status Component */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <RealTimeStatus pickupId="PU001" />
        </motion.div>

        {/* Active Pickup Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Truck className="h-5 w-5" />
                Active Pickup - Live Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      {activePickup.collectorName[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold">{activePickup.collectorName}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{activePickup.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Scheduled: {activePickup.scheduledTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{activePickup.currentLocation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">ETA: {activePickup.estimatedArrival}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex items-center gap-1 bg-transparent">
                      <Phone className="h-4 w-4" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1 bg-transparent">
                      <MessageCircle className="h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Rate this collector:</h4>
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
                    <h5 className="font-medium mb-2">Quick Actions:</h5>
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() =>
                          addNotification({
                            type: "info",
                            title: "Message Sent",
                            message: "Your message has been sent to the collector",
                            priority: "low",
                            icon: <MessageCircle className="h-4 w-4" />,
                          })
                        }
                      >
                        Send Special Instructions
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() =>
                          addNotification({
                            type: "warning",
                            title: "Pickup Rescheduled",
                            message: "Your pickup has been rescheduled to tomorrow",
                            priority: "high",
                            icon: <Clock className="h-4 w-4" />,
                          })
                        }
                      >
                        Reschedule Pickup
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Waste Collected</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.totalWasteCollected}kg</div>
                <p className="text-xs text-muted-foreground">+3.2kg from last month</p>
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
                <CardTitle className="text-sm font-medium">CO2 Saved</CardTitle>
                <Leaf className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.totalCo2Saved}kg</div>
                <p className="text-xs text-muted-foreground">+2.1kg from last month</p>
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
                <CardTitle className="text-sm font-medium">Eco Points</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.ecoPoints}</div>
                <p className="text-xs text-muted-foreground">Rank #{userStats.leaderboardRank} globally</p>
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
                <CardTitle className="text-sm font-medium">Total Pickups</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.totalPickups}</div>
                <p className="text-xs text-muted-foreground">5 more to next badge</p>
              </CardContent>
            </Card>
          </motion.div>
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
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleSchedulePickup}>
                  Schedule New Pickup
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  View All Pickups
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Invite Friends
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() =>
                    addNotification({
                      type: "success",
                      title: "Points Redeemed",
                      message: "You've successfully redeemed 500 eco points for a $5 voucher!",
                      priority: "medium",
                      icon: <Award className="h-4 w-4" />,
                    })
                  }
                >
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
                <div className="space-y-4">
                  {pickupHistory.map((pickup) => (
                    <div key={pickup.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{pickup.date}</div>
                        <div className="text-sm text-gray-600">{pickup.weight}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={pickup.status === "Completed" ? "default" : "secondary"}>{pickup.status}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm">{pickup.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Badges Section */}
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
                <h4 className="font-medium mb-2">Progress to next badge:</h4>
                <Progress value={75} className="w-full" />
                <p className="text-sm text-gray-600 mt-1">5 more pickups to earn "Super Contributor"</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
