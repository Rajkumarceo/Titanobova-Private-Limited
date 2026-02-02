import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
  const [contacts, setContacts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      setError('No authentication. Please login as host first.')
      setLoading(false)
      return
    }

    axios.get('http://localhost:8000/api/v1/contacts/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setContacts(res.data.contacts)
        setLoading(false)
      })
      .catch(err => {
        setError(err?.response?.data?.message || 'Failed to load contacts')
        setLoading(false)
      })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-5xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage all contact submissions</p>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
        >
          Logout
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-4 mb-8 rounded-lg">
        <p className="text-yellow-900 text-sm">
          You are viewing all submitted contact messages. Only authenticated hosts can access this page.
        </p>
      </div>

      {loading && <div className="text-center py-12 text-gray-600">Loading contacts...</div>}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg mb-6">
          {error}
          <div className="mt-4">
            <button 
              onClick={() => navigate('/login')}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}

      {!error && !loading && (
        <>
          <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-700">
              <span className="font-semibold">Total Messages:</span> <span className="text-2xl text-yellow-600 font-bold">{contacts.length}</span>
            </p>
          </div>

          {contacts.length === 0 ? (
            <div className="bg-gray-50 p-16 rounded-lg text-center border border-gray-200">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-600 text-lg">No contact messages yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {contacts.map((contact) => (
                <div key={contact.id} className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">From</p>
                      <p className="text-lg font-semibold text-gray-900">{contact.name}</p>
                      <p className="text-sm text-yellow-600">{contact.email}</p>
                      {contact.phone && <p className="text-sm text-gray-600 mt-1">{contact.phone}</p>}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Subject</p>
                      <p className="font-semibold text-gray-900">{contact.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Received</p>
                      <p className="text-sm text-gray-700">
                        {new Date(contact.created_at).toLocaleDateString()} {new Date(contact.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Message</p>
                    <p className="text-gray-700 leading-relaxed">
                      {contact.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
