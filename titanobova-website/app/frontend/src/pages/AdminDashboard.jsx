import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('contacts') // 'contacts' or 'enrollments'

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      navigate('/founder-login')
      return
    }
    fetchData(token)
  }, [navigate])

  const fetchData = async (token) => {
    setLoading(true)
    setError(null)
    try {
      const [contactsRes, enrollmentsRes] = await Promise.all([
        axios.get('http://localhost:8000/api/v1/contacts/', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:8000/api/v1/enrollments/', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])
      setContacts(contactsRes.data.contacts)
      setEnrollments(enrollmentsRes.data.enrollments)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data')
      if (err.response?.status === 401) {
        localStorage.removeItem('authToken')
        navigate('/founder-login')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/founder-login')
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredEnrollments = enrollments.filter(enrollment =>
    enrollment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enrollment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (enrollment.course && enrollment.course.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Founder Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
            <div className="text-3xl font-bold text-blue-600">{contacts.length}</div>
            <p className="text-gray-600 mt-2">Contact Submissions</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
            <div className="text-3xl font-bold text-green-600">{enrollments.length}</div>
            <p className="text-gray-600 mt-2">Course Enrollments</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
            <div className="text-3xl font-bold text-purple-600">₹{enrollments.reduce((sum, e) => sum + (e.price || 0), 0).toLocaleString()}</div>
            <p className="text-gray-600 mt-2">Total Revenue</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-3 font-semibold transition ${
              activeTab === 'contacts'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Contact Submissions ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('enrollments')}
            className={`px-4 py-3 font-semibold transition ${
              activeTab === 'enrollments'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Course Enrollments ({enrollments.length})
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <input
            type="text"
            placeholder={activeTab === 'contacts' ? 'Search contacts by name or email...' : 'Search enrollments by name, email, or course...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Contacts Table */}
        {activeTab === 'contacts' && (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                Loading contacts...
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No contacts found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Subject</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{contact.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                            {contact.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{contact.phone || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{contact.subject || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <details>
                            <summary className="cursor-pointer text-blue-600 hover:underline">View</summary>
                            <div className="mt-2 p-3 bg-gray-100 rounded text-gray-700 text-xs max-w-xs">
                              {contact.message}
                            </div>
                          </details>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Enrollments Table */}
        {activeTab === 'enrollments' && (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                Loading enrollments...
              </div>
            ) : filteredEnrollments.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No enrollments found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Course</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Level</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{enrollment.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <a href={`mailto:${enrollment.email}`} className="text-blue-600 hover:underline">
                            {enrollment.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{enrollment.phone || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">{enrollment.course}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{enrollment.level || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-bold">₹{(enrollment.price || 0).toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(enrollment.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <details>
                            <summary className="cursor-pointer text-blue-600 hover:underline">View</summary>
                            <div className="mt-2 p-3 bg-gray-100 rounded text-gray-700 text-xs max-w-xs">
                              {enrollment.notes}
                            </div>
                          </details>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
