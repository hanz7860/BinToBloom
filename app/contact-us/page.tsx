'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Leaf,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Users,
  Truck,
  Send,
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

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactReason: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  useEffect(() => {
    setMounted(true)
  }, [])

  const contactReasons = [
    {
      title: 'Schedule Pickup',
      description: 'Book a waste collection appointment',
      icon: Truck,
      color: 'bg-green-100 text-green-700',
      value: 'pickup',
    },
    {
      title: 'General Inquiry',
      description: 'Ask questions about our services',
      icon: MessageSquare,
      color: 'bg-blue-100 text-blue-700',
      value: 'inquiry',
    },
    {
      title: 'Partnership',
      description: 'Explore collaboration opportunities',
      icon: Users,
      color: 'bg-purple-100 text-purple-700',
      value: 'partnership',
    },
  ]

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'bintobloom@gmail.com',
      description: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '8924339434',
      description: 'Mon-Fri, 9AM-6PM',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'CDAC Acts, Mansarovar, Panchawati, Maharashtra 411008',
      description: 'Our sustainability hub',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri: 9AM-6PM',
      description: 'Weekend pickups available',
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSubmitStatus('success')
    setIsSubmitting(false)

    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        contactReason: '',
      })
      setSubmitStatus('idle')
    }, 3000)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (!mounted) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Mail className="w-4 h-4" />
            Get In Touch
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Contact
            <span className="text-green-600 block">BinToBloom</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about our sustainable waste management solutions?
            We're here to help you make a positive environmental impact.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20"></div>
      </section>

      {/* Contact Reasons */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Contact Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactReasons.map((reason) => {
              const IconComponent = reason.icon
              return (
                <Card
                  key={reason.value}
                  className={`group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2 cursor-pointer ${
                    formData.contactReason === reason.value
                      ? 'ring-2 ring-green-500'
                      : ''
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      contactReason: reason.value,
                    }))
                  }
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 ${reason.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600">{reason.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Send us a message
                </h3>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-medium">
                      Thank you! Your message has been sent successfully.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Get in touch
                </h3>
                <p className="text-gray-600 mb-8">
                  We're here to help you with any questions about our
                  sustainable waste management services. Reach out through any
                  of these channels.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon
                  return (
                    <Card
                      key={index}
                      className="border-0 bg-white/80 backdrop-blur-sm"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {info.title}
                            </h4>
                            <p className="text-gray-900 font-medium mb-1">
                              {info.details}
                            </p>
                            <p className="text-sm text-gray-600">
                              {info.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of others making a positive environmental impact with
            BinToBloom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-50"
            >
              <Link href="/about-us">Learn About Us</Link>
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
