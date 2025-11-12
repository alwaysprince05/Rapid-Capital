import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import axios from 'axios'
import { RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react'

const AdminDashboard = () => {
  const { t } = useLanguage()
  const [calls, setCalls] = useState([])
  const [loading, setLoading] = useState(true)
  const [triggeringWebhook, setTriggeringWebhook] = useState(false)

  useEffect(() => {
    fetchCalls()
  }, [])

  const fetchCalls = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/calls')
      setCalls(response.data.calls || [])
    } catch (error) {
      console.error('Error fetching calls:', error)
      // Mock data for demo
      setCalls([
        {
          _id: '1',
          call_id: 'call_123',
          phone_number: '+919876543210',
          status: 'completed',
          payment_status: 'paid',
          duration: 120,
          created_at: new Date().toISOString()
        },
        {
          _id: '2',
          call_id: 'call_456',
          phone_number: '+919876543211',
          status: 'completed',
          payment_status: 'unpaid',
          duration: 90,
          created_at: new Date(Date.now() - 3600000).toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const triggerN8nWebhook = async () => {
    try {
      setTriggeringWebhook(true)
      await axios.post('/api/trigger-n8n', {
        action: 'test',
        timestamp: new Date().toISOString()
      })
      alert('n8n webhook triggered successfully!')
    } catch (error) {
      console.error('Error triggering webhook:', error)
      alert('Failed to trigger webhook. Check backend connection.')
    } finally {
      setTriggeringWebhook(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'unpaid':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {t('admin.title')}
        </h1>
        <div className="flex gap-4">
          <button
            onClick={fetchCalls}
            disabled={loading}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={triggerN8nWebhook}
            disabled={triggeringWebhook}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {triggeringWebhook ? 'Triggering...' : 'Test n8n Webhook'}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Call ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Duration (s)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : calls.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No calls found
                  </td>
                </tr>
              ) : (
                calls.map((call) => (
                  <tr key={call._id || call.call_id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {call.call_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {call.phone_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        call.status === 'completed' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      }`}>
                        {call.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(call.payment_status)}
                        <span className="text-gray-900 dark:text-white capitalize">
                          {call.payment_status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {call.duration || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(call.created_at).toLocaleString()}
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

export default AdminDashboard

