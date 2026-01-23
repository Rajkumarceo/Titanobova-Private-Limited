import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function PaymentSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const enrollment = location.state?.enrollment
  const amount = location.state?.amount

  useEffect(() => {
    if (!enrollment && !localStorage.getItem('currentEnrollment')) {
      setTimeout(() => navigate('/courses'), 3000)
    }
  }, [enrollment, navigate])

  const currentEnrollment = enrollment || JSON.parse(localStorage.getItem('currentEnrollment') || '{}')
  const courseAmount = amount || currentEnrollment.coursePrice

  return (
    <div className="space-y-12">
      {/* Success Section */}
      <section className="text-center py-20">
        <div className="text-7xl mb-8 animate-bounce">✓</div>
        <h1 className="text-5xl md:text-6xl font-bold text-green-600 mb-6">Payment Successful!</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Your payment has been processed successfully. Your course enrollment is now active and you have immediate access to all course materials.
        </p>
      </section>

      {/* Confirmation Details */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Course Access */}
        <div className="card p-8 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Course Access Activated</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Course Name</p>
              <p className="text-lg font-bold text-gray-900">{currentEnrollment.courseTitle}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Student Name</p>
              <p className="text-lg font-bold text-gray-900">{currentEnrollment.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Email Address</p>
              <p className="text-lg font-bold text-gray-900">{currentEnrollment.email}</p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
              <p className="text-2xl font-bold text-green-600">₹{courseAmount?.toLocaleString()}</p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Course Duration</p>
              <p className="text-lg font-bold text-gray-900">{currentEnrollment.courseDuration}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Level</p>
              <p className="text-lg font-bold text-gray-900">{currentEnrollment.courseLevel}</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="card p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 What's Next?</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">1</div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Check Your Email</h3>
                <p className="text-gray-600 text-sm mt-1">A confirmation email with course access details has been sent to your registered email address.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">2</div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Login to Course Portal</h3>
                <p className="text-gray-600 text-sm mt-1">Use your registered credentials to access the course materials, videos, and resources immediately.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">3</div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Start Learning</h3>
                <p className="text-gray-600 text-sm mt-1">Begin with the course introduction and follow the curriculum at your own pace.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">4</div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Get Support</h3>
                <p className="text-gray-600 text-sm mt-1">If you have any questions, contact our support team available 24/7.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Preview */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-8">What You Get Access To</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🎓</div>
            <h3 className="font-bold mb-2">Complete Modules</h3>
            <p className="text-blue-100 text-sm">All course modules and lessons</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎥</div>
            <h3 className="font-bold mb-2">Video Content</h3>
            <p className="text-blue-100 text-sm">High-quality instructional videos</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="font-bold mb-2">Resources</h3>
            <p className="text-blue-100 text-sm">Downloadable course materials</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="font-bold mb-2">Certificate</h3>
            <p className="text-blue-100 text-sm">Certificate upon completion</p>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-gray-50 rounded-lg p-12 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Need Help?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 mb-3">support@titanobova.com</p>
            <p className="text-sm text-gray-600">Response within 24 hours</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="font-bold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-3">Available on our platform</p>
            <p className="text-sm text-gray-600">Monday - Friday, 9AM - 6PM</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="font-bold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-3">+91-XXXX-XXXX-XXX</p>
            <p className="text-sm text-gray-600">24/7 Customer Support</p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="flex flex-col md:flex-row gap-6 justify-center items-center">
        <button
          onClick={() => navigate('/courses')}
          className="btn-primary px-10 py-4 text-lg"
        >
          Explore More Courses
        </button>
        <button
          onClick={() => navigate('/')}
          className="btn-secondary px-10 py-4 text-lg"
        >
          Return to Home
        </button>
      </section>

      {/* Receipt Download */}
      <section className="text-center py-8 border-t border-gray-200">
        <p className="text-gray-600 mb-4">A detailed payment receipt has been sent to your email</p>
        <button className="text-blue-600 hover:text-blue-700 font-semibold">
          ⬇️ Download Receipt
        </button>
      </section>
    </div>
  )
}
