import React from 'react'

export default function About() {
  const values = [
    { icon: '⭐', title: 'Excellence', desc: 'Pursuing perfection in every deliverable.' },
    { icon: '🤝', title: 'Integrity', desc: 'Transparency and honesty guide all partnerships.' },
    { icon: '💡', title: 'Innovation', desc: 'Embracing creativity and continuous improvement.' },
    { icon: '📈', title: 'Impact', desc: 'Success measured by value created for clients.' },
  ]

  const team = [
    { icon: '👨‍💼', name: 'Rajkumar', role: 'Founder & CEO', desc: 'Visionary leader with expertise in digital transformation.' },
    { icon: '🎯', name: 'Team', role: 'Strategy', desc: 'Strategic architects driving innovation.' },
    { icon: '💻', name: 'Experts', role: 'Technical', desc: 'World-class solution developers.' },
    { icon: '🛟', name: 'Support', role: 'Success', desc: 'Available 24/7 for your needs.' },
  ]

  return (
    <div className="space-y-20">
      {/* Premium Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white rounded-2xl px-12 md:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-blue-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold mb-6">Our Story</div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Transforming Businesses <span className="text-blue-300">Since 2009</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            With 15+ years of expertise, Titanobova has partnered with 500+ enterprises worldwide to deliver transformative solutions that drive real business impact and sustainable growth.
          </p>
        </div>
      </section>

      {/* Company Story - Enhanced */}
      <section className="grid md:grid-cols-2 gap-12 items-center py-12">
        <div>
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-6">Titanobova Journey</div>
          <h2 className="text-5xl font-bold mb-8 text-gray-900 leading-tight">Our Story of Innovation & Excellence</h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              Founded in 2009, Titanobova emerged from a vision to revolutionize how businesses approach digital transformation. Our founders, driven by passion and expertise, assembled a team committed to solving complex challenges.
            </p>
            <p>
              What began as a boutique consulting firm has blossomed into a comprehensive solutions provider, recognized for our meticulous attention to detail and unwavering commitment to client success. Every project we undertake reflects our core philosophy: strategic thinking paired with flawless execution.
            </p>
            <p>
              Through consistent innovation, industry-leading expertise, and genuine partnership with our clients, we've built a legacy of transforming challenges into opportunities and visions into reality.
            </p>
          </div>
          <div className="mt-8 flex gap-4 flex-wrap">
            <div className="px-8 py-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">500+</p>
              <p className="text-gray-600">Successful Projects</p>
            </div>
            <div className="px-8 py-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">10K+</p>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div className="px-8 py-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">15+</p>
              <p className="text-gray-600">Years Expertise</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 h-full rounded-2xl flex items-center justify-center shadow-2xl p-12">
          <div className="text-center text-white">
            <div className="text-8xl mb-6">👑</div>
            <p className="text-3xl font-bold">Enterprise Excellence</p>
            <p className="text-blue-100 mt-4 text-lg">Trusted by Industry Leaders</p>
            <div className="mt-8 text-sm text-blue-200">
              <p>Fortune 500 Companies</p>
              <p>Global Enterprises</p>
              <p>Industry Innovators</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Premium */}
      <section className="grid md:grid-cols-2 gap-12 py-12">
        <div className="card p-12 border-l-4 border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="text-6xl mb-6">🎯</div>
          <h3 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            To empower businesses worldwide with innovative, scalable, and sustainable solutions that drive exponential growth and create lasting competitive advantage.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-2xl">✓</span>
              <span className="text-gray-600">Deliver transformative solutions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-2xl">✓</span>
              <span className="text-gray-600">Enable sustainable growth</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-2xl">✓</span>
              <span className="text-gray-600">Create lasting partnerships</span>
            </li>
          </ul>
        </div>

        <div className="card p-12 border-l-4 border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="text-6xl mb-6">🌟</div>
          <h3 className="text-4xl font-bold text-gray-900 mb-6">Our Vision</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            To be the most trusted, innovative, and impactful solutions partner globally, recognized for transforming businesses and creating positive societal impact.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-purple-600 text-2xl">✓</span>
              <span className="text-gray-600">Innovation-driven approach</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 text-2xl">✓</span>
              <span className="text-gray-600">Global excellence standards</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 text-2xl">✓</span>
              <span className="text-gray-600">Positive impact everywhere</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Core Values - Enhanced */}
      <section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">The principles that guide every decision and shape our culture</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => (
            <div key={idx} className="card p-8 hover:shadow-xl transition transform hover:-translate-y-2 border-t-4 border-blue-600">
              <div className="text-6xl mb-6">{value.icon}</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h4>
              <p className="text-gray-600 leading-relaxed text-base">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team - Premium */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Leadership Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Visionary leaders with 15+ years of industry expertise dedicated to your success</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="card p-8 text-center hover:shadow-xl transition bg-white">
              <div className="text-7xl mb-4">{member.icon}</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h4>
              <p className="text-blue-600 font-bold text-lg mb-4">{member.role}</p>
              <p className="text-gray-600 leading-relaxed">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Titanobova - Enhanced */}
      <section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Why Choose Titanobova</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">We deliver results that matter, partnerships that last, and value that transforms</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: '🏆', 
              title: 'Proven Track Record', 
              desc: 'Hundreds of successful projects with measurable outcomes and 98% client satisfaction rate.' 
            },
            { 
              icon: '👥', 
              title: 'Expert Team', 
              desc: 'Industry veterans with 15+ years of combined expertise across all sectors and technologies.' 
            },
            { 
              icon: '💬', 
              title: 'Customer Focused', 
              desc: 'Responsive 24/7 support with dedicated account managers and guaranteed response times.' 
            },
            { 
              icon: '🚀', 
              title: 'Innovation First', 
              desc: 'Cutting-edge technologies and forward-thinking strategies that keep you ahead of competition.' 
            },
            { 
              icon: '⚡', 
              title: 'Rapid Delivery', 
              desc: 'Efficient processes ensuring fast results without compromising on quality or details.' 
            },
            { 
              icon: '🔒', 
              title: 'Security & Compliance', 
              desc: 'Enterprise-grade security standards with ISO certifications and full regulatory compliance.' 
            },
          ].map((item, idx) => (
            <div key={idx} className="card p-8 hover:shadow-2xl transition hover:border-blue-300">
              <div className="text-5xl mb-6">{item.icon}</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Impact */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Global Impact</h2>
          <p className="text-blue-100 text-lg">Making a difference across borders and industries</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-5xl font-bold mb-2">50+</p>
            <p className="text-blue-100">Countries Served</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold mb-2">500+</p>
            <p className="text-blue-100">Enterprise Clients</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold mb-2">10K+</p>
            <p className="text-blue-100">Professionals Trained</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold mb-2">$5B+</p>
            <p className="text-blue-100">Value Created</p>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="card p-8 text-center">
            <div className="text-5xl mb-4">🥇</div>
            <p className="font-bold text-gray-900">Best Consulting Firm</p>
            <p className="text-gray-500 text-sm mt-2">2023</p>
          </div>
          <div className="card p-8 text-center">
            <div className="text-5xl mb-4">⭐</div>
            <p className="font-bold text-gray-900">Innovation Excellence</p>
            <p className="text-gray-500 text-sm mt-2">2022</p>
          </div>
          <div className="card p-8 text-center">
            <div className="text-5xl mb-4">🏅</div>
            <p className="font-bold text-gray-900">Customer Choice</p>
            <p className="text-gray-500 text-sm mt-2">2021</p>
          </div>
          <div className="card p-8 text-center">
            <div className="text-5xl mb-4">👑</div>
            <p className="font-bold text-gray-900">Industry Leader</p>
            <p className="text-gray-500 text-sm mt-2">2020</p>
          </div>
        </div>
      </section>
    </div>
  )
}