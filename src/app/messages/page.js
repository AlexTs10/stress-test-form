'use client'
import { useState, useEffect } from 'react'

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState('')

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages')
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const handleClearAll = async () => {
    if (!confirm('Are you sure you want to delete all messages?')) return

    try {
      const response = await fetch('/api/messages/clear', {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setMessages([])
        setStatus('All messages deleted successfully')
      } else {
        setStatus('Error deleting messages')
      }
    } catch (error) {
      console.error('Error:', error)
      setStatus('Error deleting messages')
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Messages</h1>
          <button
            onClick={handleClearAll}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Clear All Messages
          </button>
        </div>

        {status && (
          <div className="mb-4 p-4 rounded-md bg-gray-100 dark:bg-gray-800">
            {status}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Message</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-4 px-4 text-center">
                    No messages found
                  </td>
                </tr>
              ) : (
                messages.map((message) => (
                  <tr key={message.id} className="border-b dark:border-gray-700">
                    <td className="py-3 px-4">{message.id}</td>
                    <td className="py-3 px-4">{message.name}</td>
                    <td className="py-3 px-4">{message.email}</td>
                    <td className="py-3 px-4">{message.message}</td>
                    <td className="py-3 px-4">
                      {new Date(message.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 