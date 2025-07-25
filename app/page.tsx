"use client"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Truck, FlaskRoundIcon as Flask, Award, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

type LeaderboardEntry = {
  userId?: number
  fullName: string
  ecoPoints: number
}

export default function Home() {
  const [globalImpact, setGlobalImpact] = useState({
    totalWasteCollected: 2500,
    totalPesticideProduced: 1200,
    totalPartnerNgos: 45,
    totalAcresTreated: 150,
  })

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { fullName: "Sarah M.", ecoPoints: 1250 },
    { fullName: "Mike R.", ecoPoints: 980 },
    { fullName: "You", ecoPoints: 750 },
  ])

  const router = useRouter()

  // Refs for scroll animations
  const howItWorksRef = useRef(null)
  const impactRef = useRef(null)
  const joinRef = useRef(null)
  const ecoPointsRef = useRef(null)
  const communityImpactRef = useRef(null)

  // Check if sections are in view
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.3 })
  const impactInView = useInView(impactRef, { once: true, amount: 0.3 })
  const joinInView = useInView(joinRef, { once: true, amount: 0.3 })
  const ecoPointsInView = useInView(ecoPointsRef, { once: true, amount: 0.3 })
  const communityImpactInView = useInView(communityImpactRef, { once: true, amount: 0.3 })

  // Scroll animations for hero section
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  useEffect(() => {
    // Fetch global impact data
    fetch("/api/impact/global")
      .then((res) => res.json())
      .then((data) => setGlobalImpact(data))
      .catch((err) => console.error("Error fetching global impact:", err))

    // Fetch leaderboard data
    fetch("/api/leaderboard?limit=3")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLeaderboard(
            data.map((d: any) => ({
              fullName: d.fullName ?? d.username ?? "Anonymous",
              ecoPoints: d.ecoPoints ?? 0,
            })),
          )
        } else {
          console.warn("Unexpected leaderboard payload:", data)
          setLeaderboard([])
        }
      })
      .catch((err) => console.error("Error fetching leaderboard:", err))
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95"
      >
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 transform hover:scale-105 transition-transform duration-200">
            <div className="bg-green-100 p-2 rounded-full shadow-md">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-xl font-semibold text-green-600 drop-shadow-sm">BinToBloom</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#"
              className="text-gray-700 hover:text-green-600 transition-colors duration-200 hover:drop-shadow-sm"
            >
              Home
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-700 hover:text-green-600 transition-colors duration-200 hover:drop-shadow-sm"
            >
              How It Works
            </Link>
            <Link
              href="#join"
              className="text-gray-700 hover:text-green-600 transition-colors duration-200 hover:drop-shadow-sm"
            >
              Join as Collector
            </Link>
            <Link
              href="#impact"
              className="text-gray-700 hover:text-green-600 transition-colors duration-200 hover:drop-shadow-sm"
            >
              Impact
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-green-600 transition-colors duration-200 hover:drop-shadow-sm"
            >
              About Us
            </Link>
            <Link
              href="/login"
              className="text-gray-700 hover:text-green-600 transition-colors duration-200 hover:drop-shadow-sm"
            >
              Login
            </Link>
          </nav>
          <Button
            className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:-translate-y-0.5"
            onClick={() => router.push("/schedule")}
          >
            Schedule Pickup
          </Button>
        </div>
      </motion.header>

      <main className="flex-grow">
        {/* Hero Section with animations */}
        <motion.section
          style={{ opacity: heroOpacity, y: heroY }}
          className="bg-gradient-to-br from-green-50 via-green-25 to-emerald-50 py-16 relative overflow-hidden"
        >
          {/* Background decorative elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-20 right-20 w-32 h-32 bg-emerald-200 rounded-full opacity-20"
          ></motion.div>

          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 drop-shadow-lg">
                Turn Your Waste <br />
                into <span className="text-green-600 drop-shadow-md">Blooming Fields</span>
              </h1>
              <p className="mt-6 text-gray-600 max-w-md drop-shadow-sm">
                We collect your food waste and turn it into powerful, eco-friendly pesticides that help communities
                grow.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="mt-8 bg-green-600 hover:bg-green-700 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                  onClick={() => router.push("/schedule")}
                >
                  Schedule Your First Pickup
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center items-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="flex flex-col items-center transform hover:scale-110 transition-transform duration-300"
              >
                <div className="bg-gray-200 p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image src="/placeholder.svg?height=40&width=40" alt="Food Waste" width={40} height={40} />
                </div>
                <p className="text-xs mt-2 text-center drop-shadow-sm">Food Waste</p>
              </motion.div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <ArrowRight className="h-6 w-6 text-green-600 drop-shadow-md" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="flex flex-col items-center transform hover:scale-110 transition-transform duration-300"
              >
                <div className="bg-green-100 p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image src="/placeholder.svg?height=40&width=40" alt="Processing" width={40} height={40} />
                </div>
                <p className="text-xs mt-2 text-center drop-shadow-sm">Processing</p>
              </motion.div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              >
                <ArrowRight className="h-6 w-6 text-green-600 drop-shadow-md" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="flex flex-col items-center transform hover:scale-110 transition-transform duration-300"
              >
                <div className="bg-green-200 p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image src="/placeholder.svg?height=40&width=40" alt="Organic Pesticide" width={40} height={40} />
                </div>
                <p className="text-xs mt-2 text-center drop-shadow-sm">Organic Pesticide</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works Section with animations */}
        <section id="how-it-works" ref={howItWorksRef} className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center text-gray-800 drop-shadow-md">How It Works</h2>
              <p className="text-center text-gray-600 mt-4 mb-12 drop-shadow-sm">
                Simple steps to make a big environmental impact
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-50 p-8 rounded-lg text-center shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="mx-auto bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <Calendar className="h-6 w-6 text-white drop-shadow-sm" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 drop-shadow-sm">Schedule Pickup</h3>
                <p className="text-gray-600">
                  Book a convenient time for our collectors to pick up your food waste from your home or restaurant.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gray-50 p-8 rounded-lg text-center shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-gray-100 md:mt-4"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="mx-auto bg-green-400 w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <Truck className="h-6 w-6 text-white drop-shadow-sm" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 drop-shadow-sm">We Collect</h3>
                <p className="text-gray-600">
                  Our trained collectors arrive at your location and safely collect your organic waste materials.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gray-50 p-8 rounded-lg text-center shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="mx-auto bg-amber-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <Flask className="h-6 w-6 text-white drop-shadow-sm" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 drop-shadow-sm">Transform & Distribute</h3>
                <p className="text-gray-600">
                  We convert waste into organic pesticides and distribute them to local farms and communities.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Track Your Impact with animations */}
        <section id="impact" ref={impactRef} className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={impactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center text-gray-800 drop-shadow-md">Track Your Impact</h2>
              <p className="text-center text-gray-600 mt-4 mb-12 drop-shadow-sm">
                See the real difference you're making
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={impactInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
              >
                <motion.div whileHover={{ y: -5 }} className="mb-2">
                  <Image src="/placeholder.svg?height=40&width=40" alt="Waste Diverted" width={40} height={40} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={impactInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-2xl font-bold drop-shadow-sm"
                >
                  15kg
                </motion.div>
                <div className="text-sm text-gray-500">Waste Diverted</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={impactInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
              >
                <motion.div whileHover={{ y: -5 }} className="mb-2">
                  <Image src="/placeholder.svg?height=40&width=40" alt="CO2 Saved" width={40} height={40} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={impactInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-2xl font-bold drop-shadow-sm"
                >
                  4.2kg
                </motion.div>
                <div className="text-sm text-gray-500">CO2 Saved</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={impactInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
              >
                <motion.div whileHover={{ y: -5 }} className="mb-2">
                  <Image src="/placeholder.svg?height=40&width=40" alt="Acres Restored" width={40} height={40} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={impactInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-2xl font-bold drop-shadow-sm"
                >
                  2
                </motion.div>
                <div className="text-sm text-gray-500">Acres Restored</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={impactInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="mb-2"
                >
                  <Award className="h-10 w-10 text-amber-500 drop-shadow-md" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={impactInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-2xl font-bold drop-shadow-sm"
                >
                  Zero Waste
                </motion.div>
                <div className="text-sm text-gray-500">Hero Badge</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Join Our Community with animations */}
        <section id="join" ref={joinRef} className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={joinInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center text-gray-800 drop-shadow-md">Join Our Community</h2>
              <p className="text-center text-gray-600 mt-4 mb-12 drop-shadow-sm">
                Multiple ways to contribute to a sustainable future
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={joinInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg flex flex-col items-center text-center shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-green-200"
              >
                <div className="mb-4 text-green-600 bg-white p-3 rounded-full shadow-lg">
                  <Image src="/placeholder.svg?height=40&width=40" alt="Household" width={40} height={40} />
                </div>
                <h3 className="font-semibold mb-2 drop-shadow-sm">Household</h3>
                <p className="text-sm text-gray-600 mb-4">Donate your food waste and track your environmental impact</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="mt-auto border-green-600 text-green-600 hover:bg-green-50 bg-transparent shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={() => alert("Registration coming soon!")}
                  >
                    Join as Donor
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={joinInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg flex flex-col items-center text-center shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-blue-200"
              >
                <div className="mb-4 text-blue-600 bg-white p-3 rounded-full shadow-lg">
                  <Image src="/placeholder.svg?height=40&width=40" alt="Restaurant" width={40} height={40} />
                </div>
                <h3 className="font-semibold mb-2 drop-shadow-sm">Restaurant</h3>
                <p className="text-sm text-gray-600 mb-4">Schedule commercial pickups for your food waste</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="mt-auto bg-blue-600 text-white hover:bg-blue-700 border-0 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={() => router.push("/schedule")}
                  >
                    Schedule Pickup
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={joinInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg flex flex-col items-center text-center shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-amber-200"
              >
                <div className="mb-4 text-amber-600 bg-white p-3 rounded-full shadow-lg">
                  <Image src="/placeholder.svg?height=40&width=40" alt="Collector" width={40} height={40} />
                </div>
                <h3 className="font-semibold mb-2 drop-shadow-sm">Collector</h3>
                <p className="text-sm text-gray-600 mb-4">Earn money by collecting waste in your neighborhood</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="mt-auto bg-amber-600 text-white hover:bg-amber-700 border-0 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={() => alert("Collector registration coming soon!")}
                  >
                    Start Collecting
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={joinInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg flex flex-col items-center text-center shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-purple-200"
              >
                <div className="mb-4 text-purple-600 bg-white p-3 rounded-full shadow-lg">
                  <Image src="/placeholder.svg?height=40&width=40" alt="NGO" width={40} height={40} />
                </div>
                <h3 className="font-semibold mb-2 drop-shadow-sm">NGO</h3>
                <p className="text-sm text-gray-600 mb-4">Partner with us to distribute organic pesticides</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="mt-auto bg-purple-600 text-white hover:bg-purple-700 border-0 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={() => alert("NGO partnership program coming soon!")}
                  >
                    Partner With Us
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Eco-Points & Badges with animations */}
        <section ref={ecoPointsRef} className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ecoPointsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center text-gray-800 drop-shadow-md">Earn Eco-Points & Badges</h2>
              <p className="text-center text-gray-600 mt-4 mb-12 drop-shadow-sm">
                Get rewarded for your environmental contributions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={ecoPointsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <h3 className="font-semibold mb-4 drop-shadow-sm">Your Progress</h3>
                <div className="mb-2 flex justify-between items-center">
                  <span className="text-sm">Eco Points</span>
                  <span className="text-xs text-gray-500">750/1000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6 shadow-inner">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={ecoPointsInView ? { width: "75%" } : { width: "0%" }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full shadow-sm"
                  ></motion.div>
                </div>
                <p className="text-xs text-gray-500">250 points to next reward!</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={ecoPointsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <h3 className="font-semibold mb-4 drop-shadow-sm">Your Badges</h3>
                <div className="flex justify-center gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={ecoPointsInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="flex flex-col items-center transform hover:scale-110 transition-transform duration-200"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <Award className="h-10 w-10 text-yellow-500 drop-shadow-lg" />
                    </motion.div>
                    <span className="text-xs mt-1">Waste Champion</span>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={ecoPointsInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="flex flex-col items-center transform hover:scale-110 transition-transform duration-200"
                  >
                    <motion.div
                      animate={{ rotate: [0, -10, 0, 10, 0] }}
                      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                    >
                      <Award className="h-10 w-10 text-purple-500 drop-shadow-lg" />
                    </motion.div>
                    <span className="text-xs mt-1">Regular Contributor</span>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={ecoPointsInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className="flex flex-col items-center opacity-40"
                  >
                    <Award className="h-10 w-10 text-gray-400" />
                    <span className="text-xs mt-1">Coming Soon</span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={ecoPointsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <h3 className="font-semibold mb-4 drop-shadow-sm">Leaderboard</h3>
                <div className="space-y-4">
                  {leaderboard.map((user, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={ecoPointsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                        {index + 1}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 shadow-md"></div>
                      <div>
                        <div className="text-sm font-medium drop-shadow-sm">{user.fullName}</div>
                        <div className="text-xs text-gray-500">{user.ecoPoints} pts</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Community Impact with animations */}
        <section
          ref={communityImpactRef}
          className="py-16 bg-gradient-to-br from-green-600 via-green-700 to-emerald-700 text-white relative overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-600/20 to-transparent"></div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full"
          ></motion.div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={communityImpactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center mb-2 drop-shadow-lg">Our Community Impact</h2>
              <p className="text-center mb-12 text-green-100 drop-shadow-md">Together, we're making a difference</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={communityImpactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-white/20"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={communityImpactInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-4xl font-bold mb-2 drop-shadow-lg"
                >
                  {globalImpact.totalWasteCollected}kg
                </motion.div>
                <div className="text-sm text-green-100">Total Waste Collected</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={communityImpactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-white/20"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={communityImpactInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-4xl font-bold mb-2 drop-shadow-lg"
                >
                  {globalImpact.totalPesticideProduced}L
                </motion.div>
                <div className="text-sm text-green-100">Pesticide Produced</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={communityImpactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-white/20"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={communityImpactInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="text-4xl font-bold mb-2 drop-shadow-lg"
                >
                  {globalImpact.totalPartnerNgos}
                </motion.div>
                <div className="text-sm text-green-100">Partner NGOs</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={communityImpactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-white/20"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={communityImpactInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="text-4xl font-bold mb-2 drop-shadow-lg"
                >
                  {globalImpact.totalAcresTreated}
                </motion.div>
                <div className="text-sm text-green-100">Acres Treated</div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with animations */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 shadow-2xl"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 mb-4 transform hover:scale-105 transition-transform duration-200"
              >
                <div className="bg-green-600 p-2 rounded-full shadow-lg">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-green-500 drop-shadow-md">BinToBloom</span>
              </motion.div>
              <p className="text-gray-400 text-sm mb-4 drop-shadow-sm">
                Innovative solutions for sustainable solutions for a greener tomorrow
              </p>
              <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-200 p-2 rounded-full hover:bg-white/10"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, rotate: -5 }}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-200 p-2 rounded-full hover:bg-white/10"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-200 p-2 rounded-full hover:bg-white/10"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 drop-shadow-md">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <motion.li whileHover={{ x: 5 }}>
                  <Link href="#" className="hover:text-green-500 transition-colors duration-200 hover:drop-shadow-sm">
                    How It Works
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <Link href="#" className="hover:text-green-500 transition-colors duration-200 hover:drop-shadow-sm">
                    Join as Collector
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <Link href="#" className="hover:text-green-500 transition-colors duration-200 hover:drop-shadow-sm">
                    Impact Dashboard
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <Link href="#" className="hover:text-green-500 transition-colors duration-200 hover:drop-shadow-sm">
                    Blog
                  </Link>
                </motion.li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 drop-shadow-md">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <motion.li whileHover={{ x: 5 }}>
                  <Link href="#" className="hover:text-green-500 transition-colors duration-200 hover:drop-shadow-sm">
                    Contact Us
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <Link href="#" className="hover:text-green-500 transition-colors duration-200 hover:drop-shadow-sm">
                    Help Center
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <Link href="#" className="hover:text-green-500 transition-colors duration-200 hover:drop-shadow-sm">
                    Privacy Policy
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <Link href="#" className="hover:text-green-500 transition-colors duration-200 hover:drop-shadow-sm">
                    Terms of Service
                  </Link>
                </motion.li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 drop-shadow-md">Sustainability Pledge</h3>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 mb-2">
                <div className="bg-green-800 p-2 rounded shadow-lg">
                  <Leaf className="h-5 w-5 text-green-400" />
                </div>
                <span className="text-sm text-gray-400">Certified Carbon Neutral Operations</span>
              </motion.div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-6 text-sm text-gray-400 text-center drop-shadow-sm">
            © 2024 BinToBloom. All rights reserved. Making the world greener, one pickup at a time.
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
