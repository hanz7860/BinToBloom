'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Leaf,
  ArrowLeft,
  Search,
  BookOpen,
  Video,
  FileText,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  ArrowRight,
  Download,
  Play,
} from 'lucide-react'

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center animate-pulse">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-green-200 rounded-full animate-spin border-t-green-600"></div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading BinToBloom
          </h2>
          <p className="text-gray-600">
            Preparing your sustainable experience...
          </p>
        </div>
      </div>
    </div>
  )
}

export default function HelpPage() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const helpCategories = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using BinToBloom services',
      icon: BookOpen,
      color: 'bg-green-100 text-green-700',
      articles: 12,
      href: '#getting-started',
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides and demonstrations',
      icon: Video,
      color: 'bg-blue-100 text-blue-700',
      articles: 8,
      href: '#tutorials',
    },
    {
      title: 'Documentation',
      description: 'Detailed guides and technical information',
      icon: FileText,
      color: 'bg-purple-100 text-purple-700',
      articles: 15,
      href: '#documentation',
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users and get answers',
      icon: MessageCircle,
      color: 'bg-orange-100 text-orange-700',
      articles: 45,
      href: '#community',
    },
  ]

  const quickActions = [
    {
      title: 'Schedule Your First Pickup',
      description: 'Get started with waste collection in 3 easy steps',
      icon: CheckCircle,
      color: 'bg-green-500',
      time: '5 min read',
    },
    {
      title: 'Understanding Our Process',
      description: 'Learn how we transform waste into eco-pesticides',
      icon: Leaf,
      color: 'bg-emerald-500',
      time: '8 min read',
    },
    {
      title: 'Partnership Opportunities',
      description: 'Explore ways to collaborate with BinToBloom',
      icon: MessageCircle,
      color: 'bg-blue-500',
      time: '6 min read',
    },
  ]

  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      color: 'bg-green-100 text-green-700',
      availability: 'Available 24/7',
      action: 'Start Chat',
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      icon: Phone,
      color: 'bg-blue-100 text-blue-700',
      availability: 'Mon-Fri, 9AM-6PM',
      action: 'Call Now',
    },
    {
      title: 'Email Support',
      description: 'Send us detailed questions or feedback',
      icon: Mail,
      color: 'bg-purple-100 text-purple-700',
      availability: 'Response within 24hrs',
      action: 'Send Email',
    },
  ]

  const resources = [
    {
      title: 'BinToBloom User Guide',
      description: 'Complete guide to using our platform',
      type: 'PDF',
      size: '2.4 MB',
      downloads: '1.2k',
    },
    {
      title: 'Sustainability Impact Report',
      description: 'Our environmental impact and achievements',
      type: 'PDF',
      size: '1.8 MB',
      downloads: '856',
    },
    {
      title: 'Partnership Guidelines',
      description: 'Information for potential business partners',
      type: 'PDF',
      size: '1.1 MB',
      downloads: '432',
    },
  ]

  if (!mounted) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Help Center
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How Can We
            <span className="text-green-600 block">Help You Today?</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Find guides, tutorials, and resources to make the most of your
            BinToBloom experience.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-green-500 rounded-xl"
            />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20"></div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Popular Help Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2 cursor-pointer"
                >
                  <CardContent className="p-8">
                    <div
                      className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mb-4`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{action.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {action.time}
                      </Badge>
                      <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2 cursor-pointer"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700"
                    >
                      {category.articles} articles
                    </Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Get Personal Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon
              return (
                <Card
                  key={index}
                  className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    <p className="text-sm text-gray-500 mb-6">
                      {option.availability}
                    </p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Download Resources
          </h2>
          <div className="space-y-4">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600">{resource.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>{resource.type}</span>
                          <span>•</span>
                          <span>{resource.size}</span>
                          <span>•</span>
                          <span>{resource.downloads} downloads</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Still Need Help?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our support team is here to help you succeed with BinToBloom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-50"
            >
              <Link href="/contact-us">Contact Support</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
            >
              <Link href="/faq">View FAQ</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
