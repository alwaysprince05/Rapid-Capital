import express from 'express'
import mongoose from 'mongoose'
import Call from '../models/Call.js'
import axios from 'axios'

const router = express.Router()

// GET /api/calls - Fetch all call logs
router.get('/', async (req, res) => {
  try {
    const calls = await Call.find().sort({ created_at: -1 }).limit(100)
    res.json({
      success: true,
      calls
    })
  } catch (error) {
    console.error('Error fetching calls:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch calls'
    })
  }
})

// GET /api/calls/:callId - Get specific call details
router.get('/:callId', async (req, res) => {
  try {
    const call = await Call.findOne({ call_id: req.params.callId })
    if (!call) {
      return res.status(404).json({
        success: false,
        error: 'Call not found'
      })
    }
    res.json({
      success: true,
      call
    })
  } catch (error) {
    console.error('Error fetching call:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch call'
    })
  }
})

// POST /api/test-call - Simulate a test call
router.post('/test-call', async (req, res) => {
  try {
    const { phone_number } = req.body
    
    if (!phone_number) {
      return res.status(400).json({
        success: false,
        error: 'Phone number is required'
      })
    }

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.warn('MongoDB not connected, creating test call without saving to DB')
      // Return success even without DB for testing
      return res.json({
        success: true,
        call_id: `test_${Date.now()}`,
        message: 'Test call initiated (MongoDB not connected)',
        warning: 'Database not available - call not saved'
      })
    }
    
    const call = new Call({
      call_id: `test_${Date.now()}`,
      phone_number,
      status: 'completed',
      payment_status: 'paid',
      duration: 120,
      transcript: [
        {
          speaker: 'Agent',
          message: 'नमस्ते! मैं Rapid Capital का AI एजेंट हूं।',
          timestamp: new Date()
        }
      ]
    })

    await call.save()

    res.json({
      success: true,
      call_id: call.call_id,
      message: 'Test call initiated and saved to database'
    })
  } catch (error) {
    console.error('Error creating test call:', error)
    
    // If it's a MongoDB error, still return success for testing
    if (error.name === 'MongoServerError' || error.name === 'MongooseError') {
      return res.json({
        success: true,
        call_id: `test_${Date.now()}`,
        message: 'Test call initiated (database error - call not saved)',
        warning: error.message
      })
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to create test call',
      details: error.message
    })
  }
})

// POST /api/calls/create - Create a Retell.ai voice call
router.post('/create', async (req, res) => {
  try {
    const { phone_number, customer_id, from_number } = req.body

    if (!phone_number) {
      return res.status(400).json({
        success: false,
        error: 'Phone number is required'
      })
    }

    const retellApiKey = process.env.RETELL_API_KEY
    const retellAgentId = process.env.RETELL_AGENT_ID

    if (!retellApiKey || !retellAgentId) {
      return res.status(500).json({
        success: false,
        error: 'Retell.ai API key or Agent ID not configured'
      })
    }

    // Create call via Retell.ai API
    const retellResponse = await axios.post(
      'https://api.retell.ai/v2/create-phone-call',
      {
        from_number: from_number || process.env.RETELL_FROM_NUMBER || '+1234567890',
        to_number: phone_number,
        agent_id: retellAgentId,
        metadata: {
          customer_id: customer_id || '',
          source: 'rapid-capital-platform'
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${retellApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const retellCallId = retellResponse.data.call_id

    // Create call record in database
    const call = new Call({
      call_id: retellCallId,
      phone_number,
      status: 'initiated',
      payment_status: 'unknown',
      metadata: {
        customer_id: customer_id || '',
        language: 'hi',
        retry_count: 0
      }
    })

    await call.save()

    res.json({
      success: true,
      call_id: retellCallId,
      message: 'Call initiated successfully',
      retell_data: retellResponse.data
    })
  } catch (error) {
    console.error('Error creating Retell call:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create call',
      details: error.response?.data || error.message
    })
  }
})

export default router

