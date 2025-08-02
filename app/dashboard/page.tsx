"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Leaf, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { UserAuthStatus } from "@/components/user-auth-status"

export default function DashboardPage() {
  const [userImpact, setUserImpact] = useState({
    totalWasteCollected: 15,
    totalCo2Saved: 4.2,
    ecoPoints: 750,
    totalPickups: 8,
    leaderboardRank: 3,
  })

  return (
    <div className="min-h-screen bg-gray-50">
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
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-green-600 font-medium hover:drop-shadow-sm">
              Dashboard
            </Link>
            <Link
              href="/schedule"
              className="text-gray-700 hover:text-green-600 transition-colors duration-200 hover:drop-shadow-sm"
            >
              Schedule Pickup
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-green-600 transition-colors duration-200 hover:drop-shadow-sm"
            >
              About Us
            </Link>
            <UserAuthStatus />
          </nav>
        </div>
      </motion.header>

      <main className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Your Impact Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your environmental contributions and progress</p>
        </motion.div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-gray-100"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Waste Collected</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userImpact.totalWasteCollected}kg</div>
                <p className="text-xs text-muted-foreground">+2.1kg from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-gray-100"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CO2 Saved</CardTitle>
                <Leaf className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userImpact.totalCo2Saved}kg</div>
                <p className="text-xs text-muted-foreground">+1.2kg from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-gray-100"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Eco Points</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userImpact.ecoPoints}</div>
                <p className="text-xs text-muted-foreground">Rank #{userImpact.leaderboardRank} globally</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-gray-100"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pickups</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userImpact.totalPickups}</div>
                <p className="text-xs text-muted-foreground">2 more to next badge</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-gray-100"
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/schedule">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button className="w-full bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-200">
                      Schedule New Pickup
                    </Button>
                  </motion.div>
                </Link>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    View Pickup History
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" className="w-full bg-transparent">
                    Invite Friends
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-gray-100"
          >
            <Card>
              <CardHeader>
                <CardTitle>Your Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className="flex flex-col items-center"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <Award className="h-12 w-12 text-yellow-500" />
                    </motion.div>
                    <span className="text-xs mt-1">Waste Champion</span>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    className="flex flex-col items-center"
                  >
                    <motion.div
                      animate={{ rotate: [0, -10, 0, 10, 0] }}
                      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                    >
                      <Award className="h-12 w-12 text-purple-500" />
                    </motion.div>
                    <span className="text-xs mt-1">Regular Contributor</span>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    className="flex flex-col items-center opacity-40"
                  >
                    <Award className="h-12 w-12 text-gray-400" />
                    <span className="text-xs mt-1">Coming Soon</span>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
