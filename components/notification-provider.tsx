"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bell, CheckCircle, Truck, Star, Clock } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "info" | "warning" | "error"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  icon?: React.ReactNode
  priority: "low" | "medium" | "high"
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  removeNotification: (id: string) => void
  clearAll: () => void
  unreadCount: number
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showToast, setShowToast] = useState<Notification | null>(null)

  const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Show toast for high priority notifications
    if (notification.priority === "high") {
      setShowToast(newNotification)
      setTimeout(() => setShowToast(null), 5000)
    }

    // Play notification sound (optional)
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(notification.title, {
          body: notification.message,
          icon: "/favicon.ico",
        })
      }
    }
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  // Request notification permission on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission()
      }
    }
  }, [])

  // Simulate real-time notifications for demo
  useEffect(() => {
    const simulateNotifications = () => {
      const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : {}

      if (!user.type) return

      const notifications = {
        donor: [
          {
            type: "info" as const,
            title: "Collector Assigned",
            message: "John Collector has been assigned to your pickup",
            priority: "medium" as const,
            icon: <Truck className="h-4 w-4" />,
          },
          {
            type: "success" as const,
            title: "Collector En Route",
            message: "Your collector is on the way! ETA: 15 minutes",
            priority: "high" as const,
            icon: <Clock className="h-4 w-4" />,
          },
          {
            type: "success" as const,
            title: "Pickup Completed",
            message: "Your waste has been collected successfully. +50 eco points earned!",
            priority: "high" as const,
            icon: <CheckCircle className="h-4 w-4" />,
          },
        ],
        collector: [
          {
            type: "info" as const,
            title: "New Pickup Assigned",
            message: "You have a new pickup at 123 Green St, EcoCity",
            priority: "high" as const,
            icon: <Bell className="h-4 w-4" />,
          },
          {
            type: "success" as const,
            title: "Payment Processed",
            message: "$15.50 has been added to your account",
            priority: "medium" as const,
            icon: <CheckCircle className="h-4 w-4" />,
          },
          {
            type: "info" as const,
            title: "New Rating Received",
            message: "You received a 5-star rating from Sarah Miller",
            priority: "low" as const,
            icon: <Star className="h-4 w-4" />,
          },
        ],
      }

      const userNotifications = notifications[user.type as keyof typeof notifications] || []

      userNotifications.forEach((notif, index) => {
        setTimeout(
          () => {
            addNotification(notif)
          },
          (index + 1) * 8000,
        ) // Stagger notifications every 8 seconds
      })
    }

    const timer = setTimeout(simulateNotifications, 3000) // Start after 3 seconds
    return () => clearTimeout(timer)
  }, [addNotification])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        removeNotification,
        clearAll,
        unreadCount,
      }}
    >
      {children}

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.3 }}
            className="fixed top-4 right-4 z-50 max-w-sm"
          >
            <div
              className={`rounded-lg shadow-2xl border-l-4 p-4 bg-white ${
                showToast.type === "success"
                  ? "border-green-500"
                  : showToast.type === "info"
                    ? "border-blue-500"
                    : showToast.type === "warning"
                      ? "border-yellow-500"
                      : "border-red-500"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 ${
                    showToast.type === "success"
                      ? "text-green-600"
                      : showToast.type === "info"
                        ? "text-blue-600"
                        : showToast.type === "warning"
                          ? "text-yellow-600"
                          : "text-red-600"
                  }`}
                >
                  {showToast.icon || <Bell className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{showToast.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{showToast.message}</p>
                </div>
                <button onClick={() => setShowToast(null)} className="flex-shrink-0 text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
