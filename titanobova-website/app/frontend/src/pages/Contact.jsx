import React, { useState } from 'react'
import axios from 'axios'
import { getApiUrl } from '../services/apiConfig'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const apiUrl = getApiUrl()
      await axios.post(`${apiUrl}/contacts/`, form)
      setStatus({ ok: true, message: 'Message sent successfully! We will get back to you soon.' })
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setStatus(null), 5000)
    } catch (err) {
      setStatus({ ok: false, message: `Error: ${err?.response?.data?.message || 'Failed to send message'}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-20">
      {/* Premium Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white rounded-2xl px-12 md:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-blue-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold mb-6">Contact Us</div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Get In Touch With <span className="text-blue-300">Titanobova</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            We'd love to hear from you. Reach out via email, phone, or our contact form and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form - Enhanced */}
          <div className="card p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Full Name *</label>
                <input 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  required 
                  className="input border-2 border-gray-200 focus:border-blue-500"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Email *</label>
                <input 
                  name="email" 
                  type="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  required 
                  className="input border-2 border-gray-200 focus:border-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Phone</label>
                <input 
                  name="phone" 
                  value={form.phone} 
                  onChange={handleChange} 
                  className="input border-2 border-gray-200 focus:border-blue-500"
                  placeholder="+91 82706 91757"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Subject *</label>
                <input 
                  name="subject" 
                  value={form.subject} 
                  onChange={handleChange} 
                  required
                  className="input border-2 border-gray-200 focus:border-blue-500"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Message *</label>
                <textarea 
                  name="message" 
                  value={form.message} 
                  onChange={handleChange} 
                  required 
                  className="input h-32 resize-none border-2 border-gray-200 focus:border-blue-500"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 text-lg py-3 font-bold"
              >
                {loading ? '⏳ Sending...' : '✉️ Send Message'}
              </button>

              {status && (
                <div className={`p-4 rounded-lg animate-fade-in ${status.ok ? 'bg-green-50 text-green-700 border-2 border-green-200' : 'bg-red-50 text-red-700 border-2 border-red-200'}`}>
                  <p className="font-semibold">{status.ok ? '✅' : '❌'} {status.message}</p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info - Enhanced */}
          <div className="space-y-6">
            <div className="card p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-600 hover:shadow-lg transition">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Location</h3>
              <p className="text-gray-700 leading-relaxed text-base font-semibold">
                Titanobova Pvt Limited<br/>
                <span className="text-gray-600">Business Hub, Tech District</span><br/>
                <span className="text-gray-600">Pune, Maharashtra, India</span>
              </p>
            </div>

            <div className="card p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-600 hover:shadow-lg transition">
              <div className="text-5xl mb-4">📧</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Addresses</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Main Inquiry:</p>
                  <a href="mailto:titanobova@gmail.com" className="text-blue-600 hover:text-blue-700 font-bold text-lg transition hover:underline">titanobova@gmail.com</a>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Support:</p>
                  <a href="mailto:rajkumarfounder@gmail.com" className="text-blue-600 hover:text-blue-700 font-bold text-lg transition hover:underline">rajkumarfounder@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="card p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-600 hover:shadow-lg transition">
              <div className="text-5xl mb-4">📞</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Phone Numbers</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Primary:</p>
                  <a href="tel:+918270691757" className="text-blue-600 hover:text-blue-700 font-bold text-lg transition hover:underline">+91 8270 691 757</a>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Secondary:</p>
                  <a href="tel:+918526677999" className="text-blue-600 hover:text-blue-700 font-bold text-lg transition hover:underline">+91 8526 677 999</a>
                </div>
              </div>
            </div>

            <div className="card p-8 bg-gradient-to-br from-orange-50 to-red-50 border-l-4 border-orange-600 hover:shadow-lg transition">
              <div className="text-5xl mb-4">🕐</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-700 font-semibold">
                <p><span className="font-bold">Monday - Friday:</span><br/>9:00 AM - 6:00 PM IST</p>
                <p><span className="font-bold">Saturday:</span><br/>10:00 AM - 4:00 PM IST</p>
                <p className="text-blue-600">24/7 Emergency Support Available</p>
              </div>
            </div>

            <div className="card p-8 bg-gradient-to-br from-cyan-50 to-blue-50 border-l-4 border-cyan-600">
              <div className="text-5xl mb-4">🌐</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h3>
              <div className="flex gap-4">
                <a href="#" className="flex items-center justify-center w-14 h-14 bg-blue-100 border-2 border-blue-200 rounded-full hover:border-blue-400 hover:bg-blue-200 transition text-xl font-bold text-blue-600 hover:scale-110">f</a>
                <a href="#" className="flex items-center justify-center w-14 h-14 bg-blue-100 border-2 border-blue-200 rounded-full hover:border-blue-400 hover:bg-blue-200 transition text-lg font-bold text-blue-600 hover:scale-110">in</a>
                <a href="#" className="flex items-center justify-center w-14 h-14 bg-blue-100 border-2 border-blue-200 rounded-full hover:border-blue-400 hover:bg-blue-200 transition text-lg font-bold text-blue-600 hover:scale-110">𝕏</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Find quick answers to common inquiries</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg border-l-4 border-blue-600">
            <h4 className="text-lg font-bold text-gray-900 mb-3">📧 What's the response time?</h4>
            <p className="text-gray-600">We aim to respond to all inquiries within 24 hours during business hours. Urgent matters are handled immediately.</p>
          </div>
          <div className="bg-white p-8 rounded-lg border-l-4 border-blue-600">
            <h4 className="text-lg font-bold text-gray-900 mb-3">🛡️ Are my details secure?</h4>
            <p className="text-gray-600">Yes, we use SSL encryption and comply with data protection regulations. Your information is never shared.</p>
          </div>
          <div className="bg-white p-8 rounded-lg border-l-4 border-blue-600">
            <h4 className="text-lg font-bold text-gray-900 mb-3">🎓 Can I schedule a consultation?</h4>
            <p className="text-gray-600">Absolutely! Use our contact form or call directly. We offer free initial consultations for all service inquiries.</p>
          </div>
          <div className="bg-white p-8 rounded-lg border-l-4 border-blue-600">
            <h4 className="text-lg font-bold text-gray-900 mb-3">💳 What payment methods do you accept?</h4>
            <p className="text-gray-600">We accept all major payment methods including credit cards, bank transfers, and digital wallets.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl text-center px-8">
        <h2 className="text-4xl font-bold mb-6">Ready to Work Together?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">Choose your preferred method of contact and let's discuss how we can help transform your business.</p>
      </section>
    </div>
  )
}
