import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import axios from 'axios'
import { Phone, PhoneOff } from 'lucide-react'

const LiveTest = () => {
  const { t } = useLanguage()
  const [isCalling, setIsCalling] = useState(false)
  const [transcript, setTranscript] = useState([])
  const [phoneNumber, setPhoneNumber] = useState('')

  const startTestCall = async () => {
    if (!phoneNumber) {
      alert('Please enter a phone number')
      return
    }

    setIsCalling(true)
    setTranscript([])

    try {
      // Try to create a real Retell.ai call first
      try {
        const response = await axios.post('/api/calls/create', {
          phone_number: phoneNumber
        })

        if (response.data.success) {
          // Real call created, start polling for transcript
          const callId = response.data.call_id
          setTranscript([{
            speaker: 'System',
            message: `Call initiated with ID: ${callId}. Waiting for conversation...`,
            timestamp: new Date()
          }])

          // Poll for call updates
          let lastTranscriptLength = 0
          const pollInterval = setInterval(async () => {
            try {
              const callResponse = await axios.get(`/api/calls/${callId}`)
              if (callResponse.data.success && callResponse.data.call) {
                const call = callResponse.data.call
                if (call.transcript && call.transcript.length > lastTranscriptLength) {
                  setTranscript(call.transcript)
                  lastTranscriptLength = call.transcript.length
                }
                if (call.status === 'completed' || call.status === 'failed') {
                  clearInterval(pollInterval)
                  setIsCalling(false)
                }
              }
            } catch (err) {
              console.error('Error polling call status:', err)
            }
          }, 2000)

          // Stop polling after 5 minutes
          setTimeout(() => {
            clearInterval(pollInterval)
            setIsCalling(false)
          }, 300000)
        }
      } catch (retellError) {
        // Fallback to test call if Retell.ai is not configured
        console.log('Retell.ai not configured, using test call:', retellError)
        
        try {
          const response = await axios.post('/api/calls/test-call', {
            phone_number: phoneNumber
          })

          if (response.data.success) {
            // Simulate conversation transcript
            const mockTranscript = [
              { speaker: 'Agent', message: 'नमस्ते! मैं Rapid Capital का AI एजेंट हूं। आपकी कैसे मदद कर सकता हूं?', timestamp: new Date() },
              { speaker: 'Customer', message: 'मैं अपने पेमेंट की स्थिति जानना चाहता हूं।', timestamp: new Date() },
              { speaker: 'Agent', message: 'जी, मैं आपकी पेमेंट स्थिति चेक कर रहा हूं...', timestamp: new Date() },
              { speaker: 'System', message: 'Payment status: Paid', timestamp: new Date() },
              { speaker: 'Agent', message: 'आपका पेमेंट सफलतापूर्वक प्राप्त हो गया है। धन्यवाद!', timestamp: new Date() }
            ]

            // Animate transcript
            for (let i = 0; i < mockTranscript.length; i++) {
              setTimeout(() => {
                setTranscript(prev => [...prev, mockTranscript[i]])
              }, i * 2000)
            }

            setTimeout(() => {
              setIsCalling(false)
            }, mockTranscript.length * 2000)
          }
        } catch (testCallError) {
          console.error('Test call error:', testCallError)
          alert('Test call failed: ' + (testCallError.response?.data?.error || testCallError.message))
          setIsCalling(false)
        }
      }
    } catch (error) {
      console.error('Test call error:', error)
      setIsCalling(false)
      alert('Test call failed. Please check backend connection.')
    }
  }

  const stopCall = () => {
    setIsCalling(false)
    setTranscript([])
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        {t('test.title')}
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+919876543210"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={isCalling}
          />
        </div>

        <div className="flex gap-4">
          {!isCalling ? (
            <button
              onClick={startTestCall}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {t('test.startCall')}
            </button>
          ) : (
            <button
              onClick={stopCall}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              <PhoneOff className="w-5 h-5" />
              End Call
            </button>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {t('test.transcript')}
        </h2>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {transcript.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No conversation yet. Start a test call to see the transcript.
            </p>
          ) : (
            transcript.map((entry, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  entry.speaker === 'Agent'
                    ? 'bg-blue-100 dark:bg-blue-900 ml-8'
                    : entry.speaker === 'Customer'
                    ? 'bg-green-100 dark:bg-green-900 mr-8'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {entry.speaker}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {entry.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{entry.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default LiveTest

