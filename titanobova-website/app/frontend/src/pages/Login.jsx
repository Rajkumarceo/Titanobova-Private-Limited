import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await axios.post('http://localhost:8000/api/v1/auth/token/', form)
      // Store token under unified key used by Founder login and dashboard
      localStorage.setItem('authToken', res.data.access)
      navigate('/admin')
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-5xl font-bold text-gray-900 mb-6">Secure Portal</h1>
      <p className="text-xl text-gray-600 mb-16">Authorized hosts only. Please log in to access your dashboard.</p>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Info Section */}
        <div>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Host Access Portal</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                This portal is restricted to authorized hosts. Enter your credentials to access the admin dashboard and manage contact submissions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Your login credentials are securely verified on the server, and a JWT token is issued for this session.
              </p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-gray-900 mb-2">Security Features:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2"><span className="text-yellow-600">✓</span> JWT token authentication</li>
                <li className="flex items-center gap-2"><span className="text-yellow-600">✓</span> Secure credential verification</li>
                <li className="flex items-center gap-2"><span className="text-yellow-600">✓</span> Session-based access control</li>
                <li className="flex items-center gap-2"><span className="text-yellow-600">✓</span> CORS protected endpoints</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Username</label>
              <input 
                name="username" 
                value={form.username} 
                onChange={handleChange} 
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
              <input 
                name="password" 
                type="password" 
                value={form.password} 
                onChange={handleChange} 
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
