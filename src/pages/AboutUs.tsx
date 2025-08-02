'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Leaf, Heart, Lightbulb, Target, Users } from 'lucide-react'

export default function AboutUs() {
  const teamMembers = [
    {
      name: 'Harsh Dubey',
      avatar: './avatars/harsh.jpg?height=100&width=100',
      passion: 'Innovation',
      icon: Lightbulb,
      color: 'bg-emerald-100 text-emerald-700',
      quote: 'Turning ideas into sustainable solutions',
    },
    {
      name: 'Hanzala Khan',
      avatar: './avatars/hanzala.jpg?height=120&width=120',
      passion: 'Community',
      icon: Users,
      color: 'bg-green-100 text-green-700',
      quote: 'Building bridges for a greener tomorrow',
    },
    {
      name: 'Fardeen Quadri',
      avatar: './avatars/fardeen.jpg?height=120&width=120',
      passion: 'Impact',
      icon: Target,
      color: 'bg-teal-100 text-teal-700',
      quote: 'Measuring success through environmental change',
    },
    {
      name: 'Aniket Soni',
      avatar: './avatars/aniket.jpg?height=120&width=120',
      passion: 'Growth',
      icon: Leaf,
      color: 'bg-lime-100 text-lime-700',
      quote: 'Nurturing sustainable growth in every project',
    },
    {
      name: 'Maroti',
      avatar: './avatars/maroti.png?height=120&width=120',
      passion: 'Purpose',
      icon: Heart,
      color: 'bg-emerald-100 text-emerald-700',
      quote: 'Driven by purpose, powered by passion',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" />
            Meet Our Team
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            The Minds Behind
            <span className="text-green-600 block">BinToBloom</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're a passionate team of innovators, dreamers, and changemakers
            united by a single mission: transforming waste into opportunities
            for a sustainable future.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20"></div>
      </section>

      {/* Team Members Grid */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => {
              const IconComponent = member.icon
              return (
                <Card
                  key={member.name}
                  className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2"
                >
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-green-100 group-hover:ring-green-200 transition-all duration-300">
                        <img
                          src={member.avatar || '/placeholder.svg'}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div
                        className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full ${member.color} flex items-center justify-center shadow-lg`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>

                    <Badge
                      variant="secondary"
                      className={`${member.color} border-0 mb-4`}
                    >
                      {member.passion}
                    </Badge>

                    <p className="text-gray-600 italic text-sm leading-relaxed">
                      "{member.quote}"
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Our Story
          </h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="text-xl leading-relaxed mb-6">
              Born from a shared vision of environmental transformation, our
              team came together with diverse backgrounds but a unified purpose:
              to turn the world's waste problem into blooming opportunities.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Each of us brings unique perspectives and skills to the table, but
              we're all driven by the same belief that innovation and
              sustainability can go hand in hand. Together, we're not just
              building a platform – we're cultivating a movement.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Sustainability First
              </h3>
              <p className="text-gray-600">
                Every decision we make is filtered through the lens of
                environmental impact and long-term sustainability.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Community Impact
              </h3>
              <p className="text-gray-600">
                We believe in the power of collective action and building
                solutions that benefit entire communities.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Innovation
              </h3>
              <p className="text-gray-600">
                We're constantly pushing boundaries and finding creative
                solutions to complex environmental challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Ready to be part of the change? Let's work together to turn waste
            into blooming opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
