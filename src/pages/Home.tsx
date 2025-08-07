import type React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { Calendar, Truck, Recycle, ArrowRight } from 'lucide-react'

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Turn Your Waste into{' '}
                <span className="text-green-600">Blooming Fields</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We collect your food waste and turn it into powerful,
                eco-friendly pesticides that help communities grow.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to={isAuthenticated ? '/schedule-pickup' : '/register'}
                  className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors text-center"
                >
                  {isAuthenticated
                    ? 'Schedule Your First Pickup'
                    : 'Schedule Your First Pickup'}
                </Link>
                <Link
                  to="#how-it-works"
                  className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors text-center"
                >
                  Learn How It Works
                </Link>
              </div>

              {/* Process Flow */}
              <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl">🗑️</span>
                  </div>
                  <p className="text-sm text-gray-600">Food Waste</p>
                </div>
                <ArrowRight className="text-green-500 w-6 h-6" />
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <p className="text-sm text-gray-600">Processing</p>
                </div>
                <ArrowRight className="text-green-500 w-6 h-6" />
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <p className="text-sm text-gray-600">Eco Pesticide</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/tree5.png?height=500&width=600"
                alt="Waste Management Process"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to make a big environmental impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-gray-50">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Schedule Pickup</h3>
              <p className="text-gray-600">
                Book a convenient time for our collectors to pick up your food
                waste from your home or restaurant.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-green-50">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">We Collect</h3>
              <p className="text-gray-600">
                Our trained collectors arrive at your location and safely
                collect your organic waste materials.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-gray-50">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Recycle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Transform & Distribute
              </h3>
              <p className="text-gray-600">
                We convert waste into organic pesticides and distribute them to
                local farms and communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section id="impact" className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Community Impact</h2>
            <p className="text-xl opacity-90">
              Together, we're making a difference
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2,500kg</div>
              <div className="opacity-90">Total Waste Collected</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200L</div>
              <div className="opacity-90">Pesticide Produced</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">45</div>
              <div className="opacity-90">Partner NGOs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150</div>
              <div className="opacity-90">Areas Treated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="text-xl font-bold">BinToBloom</span>
              </div>
              <p className="text-gray-400">
                Innovative solutions for a greener tomorrow
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-gray-400 hover:text-white">
                  Home
                </Link>
                <Link
                  to="/#how-it-works"
                  className="block text-gray-400 hover:text-white"
                >
                  How It Works
                </Link>
                <Link
                  to="/register?role=collector"
                  className="block text-gray-400 hover:text-white"
                >
                  Join as Collector
                </Link>
                <Link
                  to="/#impact"
                  className="block text-gray-400 hover:text-white"
                >
                  Impact Dashboard
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white">
                  Contact Us
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  FAQ
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Help Center
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Sustainability Pledge</h3>
              <p className="text-gray-400 text-sm mb-4">
                Certified Carbon Neutral Operations
              </p>
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm text-center">
                🌱 Verified Carbon Neutral Operations
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} BinToBloom. All rights reserved.
              Making the world greener, one pickup at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
