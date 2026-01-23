import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Enroll() {
  const location = useLocation()
  const navigate = useNavigate()
  const course = location.state?.course

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: 'beginner',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Redirect if no course selected
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-6">Please select a course from our courses page.</p>
          <button
            onClick={() => navigate('/courses')}
            className="btn-primary px-8 py-3"
          >
            Back to Courses
          </button>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const enrollmentData = {
        ...formData,
        courseTitle: course.title,
        coursePrice: course.price,
        courseDuration: course.duration,
        courseLevel: course.level,
        enrollmentDate: new Date().toISOString(),
      }

      const response = await axios.post('http://localhost:4000/api/enrollments', enrollmentData)
      
      if (response.status === 201 || response.status === 200) {
        setSuccess(true)
        // Store enrollment in localStorage for quick access
        const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]')
        enrollments.push(enrollmentData)
        localStorage.setItem('enrollments', JSON.stringify(enrollments))
        
        // Store current enrollment for payment page
        localStorage.setItem('currentEnrollment', JSON.stringify({
          ...enrollmentData,
          enrollmentId: response.data.id
        }))
        
        setTimeout(() => {
          navigate('/payment', { state: { 
            enrollment: enrollmentData,
            enrollmentId: response.data.id,
            amount: course.price
          }})
        }, 2000)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Enrollment failed. Please try again.')
      console.error('Enrollment error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <section>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Enroll Now</h1>
        <p className="text-xl text-gray-600">Complete your enrollment for this amazing course</p>
      </section>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Course Summary */}
        <div className="md:col-span-1">
          <div className="card p-8 sticky top-24 h-fit">
            <div className="text-5xl mb-4">{course.icon}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h2>
            
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold text-gray-900">{course.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Level</p>
                <p className="font-semibold text-gray-900">{course.level}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="font-bold text-2xl text-blue-600">₹{course.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Topics Covered:</p>
              <ul className="space-y-2">
                {course.topics.map((topic, idx) => (
                  <li key={idx} className="flex items-start text-gray-600 text-sm">
                    <span className="text-blue-600 mr-2 font-bold mt-0.5">✓</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => navigate('/courses')}
              className="w-full mt-8 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              View More Courses
            </button>
          </div>
        </div>

        {/* Enrollment Form */}
        <div className="md:col-span-2">
          <div className="card p-8">
            {success ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✓</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Enrollment Confirmed!</h2>
                <p className="text-gray-600 mb-2">Thank you for enrolling in {course.title}.</p>
                <p className="text-xl font-bold text-blue-600 mb-6">Amount: ₹{course.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Proceeding to payment page...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Your Experience Level *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enrolling...' : `Complete Enrollment - ₹${course.price.toLocaleString()}`}
                </button>

                <p className="text-sm text-gray-600 text-center">
                  By enrolling, you agree to our terms and conditions.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="bg-blue-50 rounded-lg p-12 border border-blue-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What You'll Get</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="font-bold text-gray-900 mb-2">Course Materials</h3>
            <p className="text-sm text-gray-600">Access comprehensive course resources and documentation</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">👨‍🏫</div>
            <h3 className="font-bold text-gray-900 mb-2">Expert Support</h3>
            <p className="text-sm text-gray-600">Get guidance from experienced instructors</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="font-bold text-gray-900 mb-2">Certification</h3>
            <p className="text-sm text-gray-600">Earn a recognized certificate upon completion</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="font-bold text-gray-900 mb-2">Career Support</h3>
            <p className="text-sm text-gray-600">Job assistance and career guidance included</p>
          </div>
        </div>
      </section>
    </div>
  )
}
