"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  Truck,
  DollarSign,
  TrendingUp,
  Award,
  Phone,
  Navigation,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { NotificationBell } from "@/components/notification-bell"
import { useNotifications } from "@/components/notification-provider"

export default function CollectorDashboard() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addNotification } = useNotifications()
  const [user, setUser] = useState<any>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const [assignedPickups, setAssignedPickups] = useState([
    {
      id: "PU001",
      donorName: "Sarah Miller",
      donorPhone: "+1234567890",
      address: "123 Green St, EcoCity",
      scheduledTime: "2:30 PM",
      estimatedWeight: "3.5 kg",
      status: "assigned",
      distance: "2.5 km",
      donorRating: 4.9,
    },
    {
      id: "PU002",
      donorName: "Mike Rodriguez",
      donorPhone: "+1234567891",
      address: "456 Eco Ave, GreenTown",
      scheduledTime: "4:00 PM",
      estimatedWeight: "2.8 kg",
      status: "assigned",
      distance: "1.2 km",
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
    { id: "PU003", date: "2024-01-15", donor: "Alice Johnson", weight: "4.2 kg", earnings: "$15.50", rating: 5 },
    { id: "PU004", date: "2024-01-14", donor: "Bob Smith", weight: "3.1 kg", earnings: "$12.25", rating: 4 },
    { id: "PU005", date: "2024-01-13", donor: "Carol Davis", weight: "5.0 kg", earnings: "$18.00", rating: 5 },
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

  const handleImageCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string)
        addNotification({
          type: "success",
          title: "Photo Captured",
          message: "Waste collection photo captured successfully!",
          priority: "low",
          icon: <Camera className="h-4 w-4" />,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadPhoto = () => {
    if (capturedImage) {
      addNotification({
        type: "success",
        title: "Photo Uploaded",
        message: "Photo uploaded successfully! Pickup marked as completed.",
        priority: "medium",
        icon: <CheckCircle className="h-4 w-4" />,
      })
      setCapturedImage(null)
    } else {
      fileInputRef.current?.click()
    }
  }

  const handleStartPickup = (pickupId: string) => {
    setAssignedPickups((prev) =>
      prev.map((pickup) => (pickup.id === pickupId ? { ...pickup, status: "in_progress" } : pickup)),
    )

    addNotification({
      type: "info",
      title: "Pickup Started",
      message: `Started pickup ${pickupId}. Donor has been notified.`,
      priority: "medium",
      icon: <Truck className="h-4 w-4" />,
    })
  }

  const handleCompletePickup = (pickupId: string) => {
    if (!capturedImage) {
      addNotification({
        type: "warning",
        title: "Photo Required",
        message: "Please take a photo of the collected waste first!",
        priority: "high",
        icon: <Camera className="h-4 w-4" />,
      })
      return
    }

    const pickup = assignedPickups.find((p) => p.id === pickupId)
    const earnings = Math.floor(Math.random() * 20) + 10 // Random earnings between $10-30

    addNotification({
      type: "success",
      title: "Pickup Completed",
      message: `Pickup ${pickupId} completed successfully! $${earnings} earned.`,
      priority: "high",
      icon: <DollarSign className="h-4 w-4" />,
    })

    setAssignedPickups((prev) => prev.filter((pickup) => pickup.id !== pickupId))
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
            <span className="text-xl font-semibold text-blue-600">BinToBloom Collector</span>
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
          <h1 className="text-3xl font-bold text-gray-800">Collector Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your pickups and track your earnings</p>
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
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${collectorStats.totalEarnings}</div>
                <p className="text-xs text-muted-foreground">+${collectorStats.thisWeekEarnings} this week</p>
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
                <CardTitle className="text-sm font-medium">Total Pickups</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{collectorStats.totalPickups}</div>
                <p className="text-xs text-muted-foreground">+{collectorStats.thisWeekPickups} this week</p>
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
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{collectorStats.averageRating}</div>
                <p className="text-xs text-muted-foreground">Based on {collectorStats.totalPickups} reviews</p>
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
                <CardTitle className="text-sm font-medium">Waste Collected</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{collectorStats.totalWasteCollected}kg</div>
                <p className="text-xs text-muted-foreground">Environmental impact</p>
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
                    Take a photo of the collected waste to complete the pickup and receive payment.
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageCapture}
                    ref={fileInputRef}
                    className="hidden"
                  />

                  <Button onClick={handleUploadPhoto} className="w-full bg-blue-600 hover:bg-blue-700 mb-4">
                    <Camera className="h-4 w-4 mr-2" />
                    {capturedImage ? "Upload Photo" : "Take Photo"}
                  </Button>

                  {capturedImage && (
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-green-700">Photo captured successfully!</p>
                    </div>
                  )}
                </div>

                <div>
                  {capturedImage ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <img
                        src={capturedImage || "/placeholder.svg"}
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
                  <div key={pickup.id} className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                            {pickup.donorName[0]}
                          </div>
                          <div>
                            <h3 className="font-semibold">{pickup.donorName}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{pickup.donorRating}</span>
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
                        <p className="text-sm text-gray-600">Estimated Weight:</p>
                        <p className="font-semibold text-lg">{pickup.estimatedWeight}</p>
                        <Badge
                          variant={pickup.status === "in_progress" ? "default" : "secondary"}
                          className="w-fit mt-2"
                        >
                          {pickup.status === "in_progress" ? "In Progress" : "Assigned"}
                        </Badge>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1 bg-transparent"
                          onClick={() =>
                            addNotification({
                              type: "info",
                              title: "Call Initiated",
                              message: `Calling ${pickup.donorName}...`,
                              priority: "low",
                              icon: <Phone className="h-4 w-4" />,
                            })
                          }
                        >
                          <Phone className="h-4 w-4" />
                          Call Donor
                        </Button>

                        {pickup.status === "assigned" ? (
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
                  <div key={pickup.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{pickup.donor}</div>
                      <div className="text-sm text-gray-600">
                        {pickup.date} • {pickup.weight}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold text-green-600">{pickup.earnings}</div>
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
