'use client'

import type React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { logout } from '../store/slices/authSlice'
import { Bell, Menu, X } from 'lucide-react'
import NotificationDropdown from './NotificationDropdown'

const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const { unreadCount } = useAppSelector((state) => state.notifications)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold text-gray-800">
                BinToBloom
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/#how-it-works"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              How It Works
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register?role=collector"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Join as Collector
              </Link>
            )}
            <Link
              to="/about-us"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              About
            </Link>
            <Link
              to="/#impact"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Impact
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <NotificationDropdown
                      onClose={() => setShowNotifications(false)}
                    />
                  )}
                </div>

                {/* User Menu */}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Hi, {user?.name}</span>
                  <Link
                    to={
                      user?.role === 'COLLECTOR'
                        ? '/collector-dashboard'
                        : '/dashboard'
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/schedule-pickup"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Schedule Pickup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-green-600"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-600 hover:text-green-600">
                Home
              </Link>
              <Link
                to="/#how-it-works"
                className="text-gray-600 hover:text-green-600"
              >
                How It Works
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/register?role=collector"
                  className="text-gray-600 hover:text-green-600"
                >
                  Join as Collector
                </Link>
              )}
              <Link
                to="/#impact"
                className="text-gray-600 hover:text-green-600"
              >
                Impact
              </Link>

              {isAuthenticated ? (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <span className="text-gray-700">Hi, {user?.name}</span>
                  <Link
                    to={
                      user?.role === 'COLLECTOR'
                        ? '/collector-dashboard'
                        : '/dashboard'
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded-lg text-center"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Link to="/login" className="text-gray-600">
                    Login
                  </Link>
                  <Link
                    to="/schedule-pickup"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg text-center"
                  >
                    Schedule Pickup
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
