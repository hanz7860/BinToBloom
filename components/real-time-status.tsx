"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Truck, Clock, MapPin, CheckCircle, AlertCircle } from "lucide-react"
import { useNotifications } from "./notification-provider"

interface PickupStatus {
  id: string
  status: "scheduled" | "assigned" | "en_route" | "arrived" | "collecting" | "completed"
  collectorName: string
  estimatedArrival: string
  currentLocation: string
  lastUpdate: Date
}

export function RealTimeStatus({ pickupId }: { pickupId: string }) {
  const { addNotification } = useNotifications()
  const [status, setStatus] = useState<PickupStatus>({
    id: pickupId,
    status: "scheduled",
    collectorName: "John Collector",
    estimatedArrival: "30 minutes",
    currentLocation: "Depot",
    lastUpdate: new Date(),
  })

  const statusSteps = [
    { key: "scheduled", label: "Pickup Scheduled", icon: Clock },
    { key: "assigned", label: "Collector Assigned", icon: Truck },
    { key: "en_route", label: "En Route", icon: MapPin },
    { key: "arrived", label: "Arrived", icon: CheckCircle },
    { key: "collecting", label: "Collecting Waste", icon: AlertCircle },
    { key: "completed", label: "Completed", icon: CheckCircle },
  ]

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex((step) => step.key === status.status)
  }

  // Simulate real-time status updates
  useEffect(() => {
    const statusProgression = [
      {
        status: "assigned" as const,
        estimatedArrival: "25 minutes",
        currentLocation: "Starting route",
        notification: {
          type: "info" as const,
          title: "Collector Assigned",
          message: `${status.collectorName} has been assigned to your pickup`,
          priority: "medium" as const,
          icon: <Truck className="h-4 w-4" />,
        },
      },
      {
        status: "en_route" as const,
        estimatedArrival: "15 minutes",
        currentLocation: "2.5 km away",
        notification: {
          type: "info" as const,
          title: "Collector En Route",
          message: "Your collector is on the way! ETA: 15 minutes",
          priority: "high" as const,
          icon: <MapPin className="h-4 w-4" />,
        },
      },
      {
        status: "arrived" as const,
        estimatedArrival: "Now",
        currentLocation: "At your location",
        notification: {
          type: "success" as const,
          title: "Collector Arrived",
          message: "Your collector has arrived at your location",
          priority: "high" as const,
          icon: <CheckCircle className="h-4 w-4" />,
        },
      },
      {
        status: "collecting" as const,
        estimatedArrival: "5 minutes",
        currentLocation: "At your location",
        notification: {
          type: "info" as const,
          title: "Collection in Progress",
          message: "Your waste is being collected",
          priority: "medium" as const,
          icon: <AlertCircle className="h-4 w-4" />,
        },
      },
      {
        status: "completed" as const,
        estimatedArrival: "Completed",
        currentLocation: "Pickup completed",
        notification: {
          type: "success" as const,
          title: "Pickup Completed",
          message: "Your waste has been collected successfully! +50 eco points earned",
          priority: "high" as const,
          icon: <CheckCircle className="h-4 w-4" />,
        },
      },
    ]

    statusProgression.forEach((update, index) => {
      setTimeout(
        () => {
          setStatus((prev) => ({
            ...prev,
            status: update.status,
            estimatedArrival: update.estimatedArrival,
            currentLocation: update.currentLocation,
            lastUpdate: new Date(),
          }))

          addNotification(update.notification)
        },
        (index + 1) * 10000,
      ) // Update every 10 seconds
    })
  }, [addNotification, status.collectorName])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Live Pickup Status</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="space-y-4 mb-6">
        {statusSteps.map((step, index) => {
          const Icon = step.icon
          const isActive = index <= getCurrentStepIndex()
          const isCurrent = index === getCurrentStepIndex()

          return (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? isCurrent
                        ? "bg-blue-500 text-white animate-pulse"
                        : "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                {index < statusSteps.length - 1 && (
                  <div
                    className={`absolute top-8 left-4 w-0.5 h-6 transition-colors duration-300 ${
                      isActive && !isCurrent ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`font-medium transition-colors duration-300 ${
                    isActive ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
                {isCurrent && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-blue-600 mt-1">
                    In progress...
                  </motion.p>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Current Status Info */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Collector:</span>
          <span className="text-sm text-gray-900">{status.collectorName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">ETA:</span>
          <span className="text-sm text-gray-900">{status.estimatedArrival}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Location:</span>
          <span className="text-sm text-gray-900">{status.currentLocation}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Last Update:</span>
          <span className="text-sm text-gray-500">{status.lastUpdate.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  )
}
