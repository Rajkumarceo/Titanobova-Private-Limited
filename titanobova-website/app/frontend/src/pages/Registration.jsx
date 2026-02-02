import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Registration() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', password: '', confirmPassword: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setStatus({ ok: false, message: 'Passwords do not match!' })
      return
    }
    setLoading(true)
    try {
      await axios.post('http://localhost:8000/api/v1/enrollments/', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        password: form.password
      })
      setStatus({ ok: true, message: 'Registration successful! Redirecting to payment...' })
      setTimeout(() => window.location.href = '/payment', 2000)
      setForm({ name: '', email: '', phone: '', company: '', password: '', confirmPassword: '' })
    } catch (err) {
      setStatus({ ok: false, message: `Error: ${err?.response?.data?.message || 'Registration failed'}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Join Titanobova</h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Start your journey with us today. Register for premium enterprise solutions and strategic consulting.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-2xl">✓</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Expert Services</h3>
                  <p className="text-gray-600">Access to professional consulting and tech solutions</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">✓</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">24/7 Support</h3>
                  <p className="text-gray-600">Dedicated support team available round the clock</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">✓</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Secure Platform</h3>
                  <p className="text-gray-600">Enterprise-grade security for your business data</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                <input 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  required 
                  className="input"
                  placeholder="Your Full Name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                <input 
                  name="email" 
                  type="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  required 
                  className="input"
                  placeholder="your.email@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                <input 
                  name="phone" 
                  value={form.phone} 
                  onChange={handleChange} 
                  className="input"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Company</label>
                <input 
                  name="company" 
                  value={form.company} 
                  onChange={handleChange} 
                  className="input"
                  placeholder="Your Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Password *</label>
                <input 
                  name="password" 
                  type="password" 
                  value={form.password} 
                  onChange={handleChange} 
                  required 
                  className="input"
                  placeholder="Create a strong password"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password *</label>
                <input 
                  name="confirmPassword" 
                  type="password" 
                  value={form.confirmPassword} 
                  onChange={handleChange} 
                  required 
                  className="input"
                  placeholder="Confirm your password"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Registering...' : 'Create Account'}
              </button>

              {status && (
                <div className={`p-4 rounded ${status.ok ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {status.message}
                </div>
              )}

              <p className="text-center text-gray-600 text-sm">
                Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
