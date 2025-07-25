"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, User, Truck } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Demo credentials
const DEMO_USERS = {
  donor: {
    username: "demo_donor",
    password: "donor123",
    type: "donor",
    name: "Sarah Miller",
    email: "sarah@example.com",
  },
  collector: {
    username: "demo_collector",
    password: "collector123",
    type: "collector",
    name: "John Collector",
    email: "john@example.com",
  },
}

export default function LoginPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"donor" | "collector">("donor")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      const demoUser = DEMO_USERS[userType]

      if (formData.username === demoUser.username && formData.password === demoUser.password) {
        // Store user data in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...demoUser,
            id: userType === "donor" ? 1 : 2,
          }),
        )

        setMessage("Login successful! Redirecting...")
        setTimeout(() => {
          router.push(userType === "donor" ? "/donor-dashboard" : "/collector-dashboard")
        }, 1000)
      } else {
        setMessage("Invalid credentials. Please try the demo credentials.")
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const fillDemoCredentials = () => {
    const demoUser = DEMO_USERS[userType]
    setFormData({
      username: demoUser.username,
      password: demoUser.password,
    })
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95"
      >
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 transform hover:scale-105 transition-transform duration-200"
          >
            <div className="bg-green-100 p-2 rounded-full shadow-md">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-xl font-semibold text-green-600 drop-shadow-sm">BinToBloom</span>
          </Link>
          <Link
            href="/register"
            className="text-green-600 hover:text-green-700 transition-colors duration-200 hover:drop-shadow-sm"
          >
            Don't have an account? Register
          </Link>
        </div>
      </motion.header>

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl hover:shadow-3xl transition-shadow duration-300 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Welcome Back</CardTitle>
              <p className="text-center text-gray-600">Sign in to your BinToBloom account</p>
            </CardHeader>
            <CardContent>
              {/* User Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Login as:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setUserType("donor")}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                      userType === "donor"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <User className="h-4 w-4" />
                    Donor
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("collector")}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                      userType === "collector"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Truck className="h-4 w-4" />
                    Collector
                  </button>
                </div>
              </div>

              {/* Demo Credentials Info */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium mb-2">Demo Credentials:</p>
                <div className="text-xs text-gray-600">
                  <p>
                    <strong>Username:</strong> {DEMO_USERS[userType].username}
                  </p>
                  <p>
                    <strong>Password:</strong> {DEMO_USERS[userType].password}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="mt-2 text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                >
                  Fill Demo Credentials
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder={`Enter ${userType} username`}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder={`Enter ${userType} password`}
                  />
                </div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 ${
                      userType === "donor" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isSubmitting ? "Signing In..." : `Sign In as ${userType === "donor" ? "Donor" : "Collector"}`}
                  </Button>
                </motion.div>

                {message && (
                  <div
                    className={`text-center text-sm ${
                      message.includes("successful") ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {message}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
