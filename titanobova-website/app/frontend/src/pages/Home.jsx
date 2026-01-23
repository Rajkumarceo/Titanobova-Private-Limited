import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null)

  const services = [
    { icon: '🎯', title: 'Strategic Consulting', desc: 'Data-driven strategies for sustainable business growth' },
    { icon: '💻', title: 'Enterprise Technology', desc: 'Cutting-edge solutions for digital transformation' },
    { icon: '📊', title: 'Business Intelligence', desc: 'Advanced analytics and actionable insights' },
    { icon: '🚀', title: 'Digital Innovation', desc: 'Modern solutions for enterprise success' },
  ]

  const features = [
    { icon: '⭐', title: '500+', desc: 'Successful Projects Delivered Globally' },
    { icon: '🏆', title: 'Award Winning', desc: 'Industry-Leading Excellence & Recognition' },
    { icon: '🔒', title: 'Enterprise Security', desc: 'World-Class Data Protection Standards' },
    { icon: '⚡', title: 'Rapid Deployment', desc: 'Fast Implementation Without Compromise' },
  ]

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Chief Technology Officer',
      company: 'Fortune 500 Company',
      avatar: 'RK',
      bgColor: 'bg-blue-600',
      text: 'Titanobova transformed our entire enterprise strategy. Their expertise in digital transformation delivered measurable ROI and positioned us for sustainable growth in a competitive market.',
      rating: 5
    },
    {
      name: 'Sophia Roy',
      role: 'Business Development Head',
      company: 'Leading Tech Startup',
      avatar: 'SR',
      bgColor: 'bg-blue-500',
      text: 'Exceptional team with profound industry knowledge. Their comprehensive training programs and strategic guidance elevated our entire organization\'s capabilities and market positioning.',
      rating: 5
    },
    {
      name: 'Amit Mehra',
      role: 'Founder & CEO',
      company: 'Growth Tech Solutions',
      avatar: 'AM',
      bgColor: 'bg-blue-700',
      text: 'World-class professionals with real-world experience and deep domain expertise. The personalized approach, responsive support, and commitment to excellence made all the difference.',
      rating: 5
    }
  ]

  return (
    <div className="w-full bg-white">
      {/* Hero Section - Full Width */}
      <section className="w-full bg-gradient-to-br from-white via-blue-50 to-white py-16 md:py-20 lg:py-24 px-0">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-6 py-3 rounded-full mb-6">
                <span className="text-blue-600 font-semibold text-sm">✨ Titanobova Private Limited</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight text-gray-900">
                Transform Your <span className="text-blue-600">Enterprise</span>
              </h1>
              
              <p className="text-base md:text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Strategic consulting, innovative solutions, and professional training to drive your business forward.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center flex-wrap">
                <Link to="/courses" className="group relative px-10 py-4 rounded-lg font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-blue-600 group-hover:bg-blue-700"></div>
                  <span className="relative flex items-center justify-center gap-2">🎓 Explore Courses</span>
                </Link>
                <Link to="/services" className="group relative px-10 py-4 rounded-lg font-bold border-2 border-blue-600 text-blue-600 overflow-hidden transition-all duration-300 hover:scale-105 bg-white hover:bg-blue-50">
                  <span className="flex items-center justify-center gap-2">Discover Services →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Full Width */}
      <section className="w-full bg-white py-12 md:py-16 px-0 border-y border-blue-100">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6 md:gap-8">
              {[
                { number: '500+', label: 'Successful Global Projects' },
                { number: '10K+', label: 'Active Professionals Trained' },
                { number: '15+', label: 'Years of Industry Expertise' },
                { number: '24/7', label: 'Dedicated Client Support' }
              ].map((stat, idx) => (
                <div key={idx} className="group text-center p-6 rounded-lg transition-all duration-300 hover:bg-blue-50">
                  <div className="text-5xl md:text-6xl font-black text-blue-600 mb-3">
                    {stat.number}
                  </div>
                  <p className="text-gray-700 font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Full Width */}
      <section className="w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 md:py-20 px-0">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6">Our Services</h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">End-to-end solutions for enterprise growth and digital transformation</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group p-8 bg-white rounded-lg border border-blue-200 transition-all duration-300 hover:border-blue-600 hover:shadow-lg hover:bg-blue-50"
                >
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                  <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Learn more <span className="ml-2">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section - Full Width Dark Blue */}
      <section className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-20 px-0">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">Why Titanobova</h2>
              <p className="text-base md:text-lg text-blue-100 max-w-3xl mx-auto">Trusted by leading organizations globally</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="group text-center p-8 rounded-lg hover:bg-white/10 transition-all duration-300">
                  <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-200 transition-colors">{feature.title}</h3>
                  <p className="text-blue-100">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Full Width */}
      <section className="w-full bg-white py-16 md:py-20 px-0">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
                  Drive <span className="text-blue-600">Sustainable Growth</span> & Innovation
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Titanobova Private Limited combines deep industry expertise, strategic thinking, and innovative methodologies to deliver transformative business solutions that drive measurable results.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Our proven track record of 500+ successful global projects demonstrates our unwavering commitment to delivering exceptional value, sustainable competitive advantage, and long-term business success for our partners.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link to="/about" className="px-8 py-4 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300">
                    Learn More
                  </Link>
                  <Link to="/contact" className="px-8 py-4 rounded-lg font-bold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300">
                    Get in Touch
                  </Link>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-12 rounded-lg flex flex-col items-center justify-center h-96">
                <div className="text-7xl mb-6">🏆</div>
                <p className="text-2xl font-bold text-white text-center">Award-Winning Excellence</p>
                <p className="text-blue-100 mt-3 text-center">Industry-Recognized Leadership</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Full Width */}
      <section className="w-full bg-blue-50 py-16 md:py-20 px-0">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6">Success Stories from Industry Leaders</h2>
              <p className="text-xl text-gray-600">Discover how we've helped transform enterprises and achieve exceptional business outcomes</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="group p-10 rounded-lg bg-white border border-blue-200 hover:border-blue-600 hover:shadow-lg transition-all duration-300">
                  <div className="flex gap-1 mb-6 text-blue-600">
                    {'★'.repeat(testimonial.rating)}
                  </div>
                  <p className="text-gray-700 mb-8 italic leading-relaxed text-lg">{testimonial.text}</p>
                  <div className="flex items-center gap-4 border-t border-blue-100 pt-6">
                    <div className={`w-14 h-14 rounded-full ${testimonial.bgColor} text-white flex items-center justify-center font-bold text-lg`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-blue-600 font-semibold">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Full Width */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-20 px-0">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8">Begin Your Transformation</h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
              Join thousands of professionals and organizations that trust Titanobova Private Limited for their growth journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/courses" className="group relative px-12 py-5 rounded-lg font-bold text-blue-600 overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-white"></div>
                <span className="relative flex items-center justify-center gap-2">🚀 Start Your Journey</span>
              </Link>
              <Link to="/contact" className="px-12 py-5 rounded-lg font-bold border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA - Full Width */}
      <section className="w-full bg-white py-12 md:py-16 px-0 border-t border-blue-100">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Stay Connected</h3>
            <p className="text-gray-600 mb-8">Get exclusive updates, insights, and offers from Titanobova</p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="flex-1 px-6 py-4 rounded-lg border border-blue-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <button className="px-8 py-4 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
