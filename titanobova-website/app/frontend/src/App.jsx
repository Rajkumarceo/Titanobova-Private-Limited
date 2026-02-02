import React, { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Logo from './components/Logo'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Courses from './pages/Courses'
import Enroll from './pages/Enroll'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Admin from './pages/Admin'
import FounderLogin from './pages/FounderLogin'
import AdminDashboard from './pages/AdminDashboard'
import Registration from './pages/Registration'
import Payment from './pages/Payment'
import PaymentSuccess from './pages/PaymentSuccess'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="hover:opacity-80 transition">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-semibold transition ${isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Home
            </Link>
            <Link to="/about" className={`text-sm font-semibold transition ${isActive('/about') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              About
            </Link>
            <Link to="/services" className={`text-sm font-semibold transition ${isActive('/services') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Services
            </Link>
            <Link to="/courses" className={`text-sm font-semibold transition ${isActive('/courses') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Courses
            </Link>
            <Link to="/contact" className={`text-sm font-semibold transition ${isActive('/contact') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Contact
            </Link>
            <a href="http://localhost:8000/admin/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-purple-600 border-2 border-purple-600 px-4 py-2 rounded hover:bg-purple-50 transition">
              <span>👨‍💼 Admin</span>
            </a>
            <Link to="/login" className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition">
              Login
            </Link>
            <Link to="/register" className="text-sm font-semibold text-blue-600 border-2 border-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition">
              Register
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white px-6 py-4 space-y-2 border-t border-gray-200">
            <Link to="/" className="block text-sm font-semibold text-gray-900 hover:text-blue-600 py-2 transition">Home</Link>
            <Link to="/about" className="block text-sm font-semibold text-gray-900 hover:text-blue-600 py-2 transition">About</Link>
            <Link to="/services" className="block text-sm font-semibold text-gray-900 hover:text-blue-600 py-2 transition">Services</Link>
            <Link to="/contact" className="block text-sm font-semibold text-gray-900 hover:text-blue-600 py-2 transition">Contact</Link>
            <a href="http://localhost:8000/admin/" target="_blank" rel="noopener noreferrer" className="block text-sm font-semibold text-purple-600 border-2 border-purple-600 px-4 py-2 rounded text-center hover:bg-purple-50 transition mt-2">👨‍💼 Admin</a>
            <Link to="/login" className="block text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-center transition mt-2">Login</Link>
            <Link to="/register" className="block text-sm font-semibold text-blue-600 border-2 border-blue-600 px-4 py-2 rounded text-center hover:bg-blue-50 transition mt-2">Register</Link>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/founder-login" element={<FounderLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-16 mb-12">
            <div>
              <Logo />
              <p className="text-gray-600 leading-relaxed text-sm mt-4">Premium enterprise solutions and strategic consulting for businesses worldwide.</p>
            </div>
            <div>
              <h4 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-wide">Navigation</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/" className="text-gray-600 hover:text-blue-600 transition font-medium">Home</Link></li>
                <li><Link to="/about" className="text-gray-600 hover:text-blue-600 transition font-medium">About</Link></li>
                <li><Link to="/services" className="text-gray-600 hover:text-blue-600 transition font-medium">Services</Link></li>
                <li><Link to="/courses" className="text-gray-600 hover:text-blue-600 transition font-medium">Courses</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 transition font-medium">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-wide">Contact</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="font-medium">📧 info@titanobova.com</li>
                <li className="font-medium">📞 +1 (555) 123-4567</li>
                <li className="font-medium">🕐 Mon-Fri 9AM-6PM EST</li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-wide">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition text-lg">f</a>
                <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition text-lg">in</a>
                <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition text-lg">𝕏</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} Titanobova Pvt Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
