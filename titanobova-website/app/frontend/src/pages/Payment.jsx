import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getApiUrl } from '../services/apiConfig'

export default function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  const enrollment = location.state?.enrollment
  const amount = location.state?.amount
  const enrollmentId = location.state?.enrollmentId

  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    billingEmail: '',
    billingPhone: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!enrollment && !localStorage.getItem('currentEnrollment')) {
      setTimeout(() => navigate('/courses'), 2000)
    }
  }, [enrollment, navigate])

  const currentEnrollment = enrollment || JSON.parse(localStorage.getItem('currentEnrollment') || '{}')
  const courseAmount = amount || currentEnrollment.course_price || currentEnrollment.coursePrice

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const formatCardNumber = (value) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim()
      .substring(0, 19)
  }

  const handleCardNumberChange = (e) => {
    const value = formatCardNumber(e.target.value)
    setFormData(prev => ({
      ...prev,
      cardNumber: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate card details
    if (!formData.cardName || !formData.cardNumber || !formData.cardExpiry || !formData.cardCVV) {
      setError('Please fill in all card details')
      setLoading(false)
      return
    }

    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Card number must be 16 digits')
      setLoading(false)
      return
    }

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Save payment record
      const paymentData = {
        enrollmentId,
        amount: courseAmount,
        courseName: currentEnrollment.course_title || currentEnrollment.courseTitle,
        studentName: (currentEnrollment.first_name && currentEnrollment.last_name) ? `${currentEnrollment.first_name} ${currentEnrollment.last_name}` : (currentEnrollment.name || 'Student'),
        studentEmail: currentEnrollment.email || formData.billingEmail,
        cardLast4: formData.cardNumber.slice(-4),
        paymentDate: new Date().toISOString(),
        status: 'completed'
      }

      // Mark registration as paid in backend
      if (enrollmentId) {
        try {
          const token = localStorage.getItem('authToken')
          await axios.post(
            `${getApiUrl()}/payments/`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          )
        } catch (err) {
          console.log('Note: Could not mark payment in admin (may require auth)')
        }
      }

      // Store payment record
      const payments = JSON.parse(localStorage.getItem('payments') || '[]')
      payments.push(paymentData)
      localStorage.setItem('payments', JSON.stringify(payments))

      setSuccess(true)

      // Clear enrollment data
      localStorage.removeItem('currentEnrollment')

      setTimeout(() => {
        navigate('/payment-success', { 
          state: { 
            enrollment: currentEnrollment,
            amount: courseAmount
          }
        })
      }, 2000)
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!currentEnrollment || !courseAmount) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Active Enrollment</h1>
          <p className="text-gray-600 mb-6">Redirecting you back to courses...</p>
          <button
            onClick={() => navigate('/courses')}
            className="btn-primary px-8 py-3"
          >
            Go to Courses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <section>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Complete Payment</h1>
        <p className="text-xl text-gray-600">Secure payment for your course enrollment</p>
      </section>

      {/* Payment Container */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="card p-8 sticky top-24 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>
            
            {/* Course Details */}
            <div className="space-y-4 mb-8 pb-8 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">{currentEnrollment.courseTitle}</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Course Duration:</span>
                  <span className="font-medium text-gray-900">{currentEnrollment.courseDuration || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium text-gray-900">{currentEnrollment.courseLevel || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Student Info */}
            <div className="space-y-4 mb-8 pb-8 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 text-sm uppercase">Student Details</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">{currentEnrollment.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium text-gray-900 break-all">{currentEnrollment.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">{currentEnrollment.phone}</p>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Course Fee</span>
                <span>₹{courseAmount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Taxes & Fees</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between text-gray-900 text-xl font-bold pt-3">
                <span>Total Amount</span>
                <span className="text-blue-600">₹{courseAmount?.toLocaleString()}</span>
              </div>
            </div>

            {/* Security & Benefits */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl mt-1">🔒</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Secure Payment</p>
                  <p className="text-gray-600 text-xs">256-bit SSL encrypted</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-600 text-xl mt-1">✓</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Instant Access</p>
                  <p className="text-gray-600 text-xs">Get course access immediately</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl mt-1">📧</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Confirmation Email</p>
                  <p className="text-gray-600 text-xs">Receipt sent to your email</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="md:col-span-2">
          <div className="card p-8">
            {success ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✓</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Processing</h2>
                <p className="text-gray-600 mb-4">Your payment is being processed...</p>
                <p className="text-sm text-gray-500">Redirecting to confirmation page...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    maxLength="19"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter 16-digit card number</p>
                </div>

                {/* Expiry & CVV */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                      maxLength="5"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cardCVV"
                      value={formData.cardCVV}
                      onChange={handleChange}
                      placeholder="123"
                      required
                      maxLength="4"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>

                {/* Billing Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Billing Email *
                  </label>
                  <input
                    type="email"
                    name="billingEmail"
                    value={formData.billingEmail || currentEnrollment.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                {/* Billing Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Billing Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    name="billingPhone"
                    value={formData.billingPhone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                {/* Terms */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Payment Terms</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>✓ Secure SSL encrypted payment</li>
                    <li>✓ No hidden charges or fees</li>
                    <li>✓ Instant course access after payment</li>
                    <li>✓ Receipt sent to your email</li>
                    <li>✓ 30-day money back guarantee (if applicable)</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing Payment...' : `Pay ₹${courseAmount?.toLocaleString()}`}
                </button>

                <p className="text-center text-gray-600 text-sm">
                  <button
                    type="button"
                    onClick={() => navigate('/courses')}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Cancel and go back to courses
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-gray-50 rounded-lg p-12 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Payment FAQ</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Is my payment secure?</h3>
            <p className="text-gray-600">Yes! We use 256-bit SSL encryption to protect your payment information. Your credit card details are never stored on our servers.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">When do I get course access?</h3>
            <p className="text-gray-600">You'll get instant access to the course materials immediately after successful payment. Check your email for login credentials.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">What payment methods are accepted?</h3>
            <p className="text-gray-600">We accept all major credit cards (Visa, Mastercard, American Express) and digital wallets.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Can I get a refund?</h3>
            <p className="text-gray-600">Yes, we offer a 30-day money-back guarantee if you're not satisfied with the course.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
