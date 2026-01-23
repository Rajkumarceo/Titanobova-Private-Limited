import React from 'react'

export default function Services() {
  const servicesList = [
    {
      icon: '🎯',
      title: 'Business Consulting',
      desc: 'Strategic guidance to optimize operations and drive growth',
      features: ['Strategic planning', 'Market analysis', 'Growth optimization', 'Performance benchmarking']
    },
    {
      icon: '💻',
      title: 'Technical Solutions',
      desc: 'Cutting-edge technology and infrastructure',
      features: ['System architecture', 'Cloud integration', 'Infrastructure setup', 'Tech excellence']
    },
    {
      icon: '📊',
      title: 'Corporate Services',
      desc: 'Governance and organizational transformation',
      features: ['Corporate governance', 'Compliance management', 'Process improvement', 'Change management']
    },
    {
      icon: '🚀',
      title: 'Digital Innovation',
      desc: 'Digital transformation and tech integration',
      features: ['Web development', 'Cloud services', 'Data analytics', 'Digital strategy']
    },
    {
      icon: '📚',
      title: 'Training & Development',
      desc: 'Customized training programs for your team',
      features: ['Staff training', 'Skill development', 'Leadership programs', 'Certification courses']
    },
    {
      icon: '⚙️',
      title: 'Process Optimization',
      desc: 'Streamline operations and improve efficiency',
      features: ['Workflow optimization', 'Cost reduction', 'Quality improvement', 'Automation']
    },
  ]

  return (
    <div className="space-y-20">
      {/* Premium Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white rounded-2xl px-12 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-blue-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold mb-6">Professional Services</div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Enterprise Solutions That <span className="text-blue-300">Drive Results</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Comprehensive, tailored solutions designed to accelerate growth, optimize operations, and deliver measurable business impact across all verticals.
          </p>
        </div>
      </section>

      {/* Services Grid - Enhanced */}
      <section className="py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Service Offerings</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Proven methodologies delivered by industry experts</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => (
            <div key={idx} className="card p-8 hover:shadow-2xl hover:border-blue-300 transition transform hover:-translate-y-2">
              <div className="text-7xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">{service.desc}</p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest text-blue-600">What's Included:</h4>
                <ul className="space-y-3">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center text-gray-700">
                      <span className="text-blue-600 mr-3 font-bold text-xl">✓</span> 
                      <span className="font-semibold">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-2">
                  Learn More <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Service Excellence Metrics</h2>
          <p className="text-gray-300 text-lg">Proven results across all service lines</p>
        </div>
        <div className="grid md:grid-cols-5 gap-8">
          <div className="text-center">
            <p className="text-5xl font-bold text-blue-400 mb-2">98%</p>
            <p className="text-gray-300">Client Satisfaction</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-green-400 mb-2">500+</p>
            <p className="text-gray-300">Completed Projects</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-purple-400 mb-2">10K+</p>
            <p className="text-gray-300">Professionals Trained</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-orange-400 mb-2">$5B+</p>
            <p className="text-gray-300">Value Delivered</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-pink-400 mb-2">24/7</p>
            <p className="text-gray-300">Support Available</p>
          </div>
        </div>
      </section>

      {/* Service Delivery Process - Enhanced */}
      <section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Proven Service Delivery Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">A systematic approach ensuring consistent excellence and measurable outcomes</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {[
            { 
              step: 1, 
              icon: '📋', 
              title: 'Discovery & Assessment', 
              desc: 'Deep dive analysis of your challenges, goals, and requirements',
              details: ['Stakeholder interviews', 'Market analysis', 'Current state assessment', 'Opportunity mapping']
            },
            { 
              step: 2, 
              icon: '🎨', 
              title: 'Strategic Planning', 
              desc: 'Develop comprehensive strategy aligned with your vision',
              details: ['Roadmap creation', 'Resource allocation', 'Timeline definition', 'Risk assessment']
            },
            { 
              step: 3, 
              icon: '⚡', 
              title: 'Implementation', 
              desc: 'Execute with precision and continuous monitoring',
              details: ['Execution phase', 'Quality assurance', 'Progress tracking', 'Stakeholder updates']
            },
            { 
              step: 4, 
              icon: '📈', 
              title: 'Optimization & Support', 
              desc: 'Ongoing excellence and continuous improvement',
              details: ['Performance monitoring', 'Optimization', 'Knowledge transfer', 'Long-term support']
            },
          ].map((item, idx) => (
            <div key={idx} className="card p-8 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-6">
                <div className="text-6xl">{item.icon}</div>
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center">
                  {item.step}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-6">{item.desc}</p>
              <ul className="space-y-2">
                {item.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-center text-gray-700 text-sm">
                    <span className="text-blue-600 mr-2">•</span> {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Why Our Services - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-16">
        <h2 className="text-5xl font-bold mb-4 text-center text-gray-900">Why Choose Our Services?</h2>
        <p className="text-xl text-gray-600 mb-16 text-center max-w-3xl mx-auto">We combine expertise, innovation, and commitment to deliver results that transform businesses</p>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-6xl mb-6">⭐</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Team</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Decades of combined industry experience. Our team brings proven expertise and deep knowledge across sectors.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">15+ years average experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Certified professionals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Industry certifications</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-6xl mb-6">✅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Assured</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Rigorous quality standards and continuous improvement. We measure success by your business outcomes.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">ISO certifications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Compliance standards</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Quality audits</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-6xl mb-6">💎</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Value</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Competitive pricing with exceptional value. Maximum ROI and tangible business results.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Flexible pricing models</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Transparent costs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Maximum ROI guarantee</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Real results from real clients across industries</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card p-8 border-l-4 border-blue-600">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Tech Startup</h3>
            <p className="text-gray-600 mb-4">Infrastructure modernization resulting in 60% cost reduction</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-blue-600">-60%</span>
              <span className="text-gray-500">Cost Savings</span>
            </div>
          </div>
          <div className="card p-8 border-l-4 border-green-600">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise Corp</h3>
            <p className="text-gray-600 mb-4">Digital transformation enabling 3x process efficiency</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-green-600">3x</span>
              <span className="text-gray-500">Efficiency Gain</span>
            </div>
          </div>
          <div className="card p-8 border-l-4 border-purple-600">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Financial Services</h3>
            <p className="text-gray-600 mb-4">Team training program resulting in 45% productivity increase</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-purple-600">+45%</span>
              <span className="text-gray-500">Productivity</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl text-center px-8">
        <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
        <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
          Let our experts design a customized solution for your specific challenges and opportunities.
        </p>
        <div className="flex gap-6 justify-center flex-wrap">
          <button className="bg-white text-blue-600 px-12 py-4 rounded-lg font-bold hover:bg-gray-100 transition transform hover:scale-105">
            Schedule Consultation
          </button>
          <button className="border-2 border-white text-white px-12 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition">
            Request Proposal
          </button>
        </div>
      </section>
    </div>
  )
}