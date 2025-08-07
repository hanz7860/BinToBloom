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
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Truck,
  Recycle,
  Users,
  DollarSign,
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

export default function FAQPage() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openItems, setOpenItems] = useState<number[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  const categories = [
    {
      id: 'all',
      name: 'All Questions',
      icon: HelpCircle,
      color: 'bg-gray-100 text-gray-700',
    },
    {
      id: 'pickup',
      name: 'Pickup Service',
      icon: Truck,
      color: 'bg-green-100 text-green-700',
    },
    {
      id: 'process',
      name: 'Our Process',
      icon: Recycle,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'partnership',
      name: 'Partnerships',
      icon: Users,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'pricing',
      name: 'Pricing',
      icon: DollarSign,
      color: 'bg-yellow-100 text-yellow-700',
    },
  ]

  const faqs = [
    {
      id: 1,
      category: 'pickup',
      question: 'How do I schedule a waste pickup?',
      answer:
        'You can schedule a pickup through our website, mobile app, or by calling our customer service. Simply select your preferred date and time, and our team will collect your organic waste from your specified location.',
    },
    {
      id: 2,
      category: 'pickup',
      question: 'What types of waste do you collect?',
      answer:
        'We collect organic food waste including fruit and vegetable scraps, coffee grounds, eggshells, and other biodegradable kitchen waste. We do not collect meat, dairy, or non-organic materials.',
    },
    {
      id: 3,
      category: 'process',
      question: 'How do you turn waste into pesticides?',
      answer:
        'Our proprietary process involves composting organic waste under controlled conditions, then extracting beneficial compounds that act as natural pesticides. This creates eco-friendly alternatives to chemical pesticides.',
    },
    {
      id: 4,
      category: 'process',
      question: 'How long does the transformation process take?',
      answer:
        'The complete process from waste collection to finished eco-pesticide takes approximately 4-6 weeks, including composting, extraction, testing, and quality assurance phases.',
    },
    {
      id: 5,
      category: 'partnership',
      question: 'Can restaurants partner with BinToBloom?',
      answer:
        'We work with restaurants, cafes, and food service businesses to collect their organic waste. We offer flexible pickup schedules and volume-based pricing for commercial partners.',
    },
    {
      id: 6,
      category: 'partnership',
      question: 'Do you work with farms and agricultural businesses?',
      answer:
        'Yes, we partner with farms both as waste sources and as customers for our eco-pesticides. We create a circular economy where agricultural waste becomes beneficial products for farming.',
    },
    {
      id: 7,
      category: 'pricing',
      question: 'Is there a cost for waste pickup?',
      answer:
        'For households, our basic pickup service is free for up to 10kg per month. Commercial partners have volume-based pricing. We believe in making sustainable waste management accessible to everyone.',
    },
    {
      id: 8,
      category: 'pricing',
      question: 'How much do your eco-pesticides cost?',
      answer:
        'Our eco-pesticides are competitively priced with traditional alternatives. Bulk discounts are available for farms and large-scale agricultural operations. Contact us for detailed pricing.',
    },
    {
      id: 9,
      category: 'process',
      question: 'Are your pesticides safe for organic farming?',
      answer:
        "Yes, our pesticides are certified organic and safe for use in organic farming. They're made entirely from natural, composted organic matter without any synthetic chemicals.",
    },
    {
      id: 10,
      category: 'pickup',
      question: 'What areas do you serve?',
      answer:
        'We currently serve major metropolitan areas and are expanding rapidly. Check our website or contact us to see if we serve your area, or to request service expansion to your location.',
    },
  ]

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
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
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How Can We
            <span className="text-green-600 block">Help You?</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Find answers to common questions about our sustainable waste
            management services and eco-friendly solutions.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for answers..."
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

      {/* Categories */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? 'default' : 'outline'
                  }
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'hover:bg-green-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.name}
                </Button>
              )
            })}
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFAQs.length === 0 ? (
              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or browse different categories.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredFAQs.map((faq) => (
                <Card
                  key={faq.id}
                  className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      {openItems.includes(faq.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {openItems.includes(faq.id) && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Still Need Help?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Can't find what you're looking for? Our support team is here to help
            you with any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/help">Visit Help Center</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our mission to transform waste into sustainable solutions for a
            greener future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-50"
            >
              <Link href="/">Get Started Today</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
            >
              <Link href="/about-us">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
