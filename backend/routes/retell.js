import express from 'express'
import Call from '../models/Call.js'
import axios from 'axios'

const router = express.Router()

// POST /api/retell - Webhook endpoint for Retell.ai events
router.post('/', async (req, res) => {
  try {
    const { event, call_id, timestamp, data } = req.body

    console.log(`Retell.ai webhook received: ${event} for call ${call_id}`)

    // Handle different Retell.ai events
    switch (event) {
      case 'call_started':
        await handleCallStarted(call_id, data)
        break
      case 'call_ended':
        await handleCallEnded(call_id, data)
        break
      case 'conversation_update':
        await handleConversationUpdate(call_id, data)
        break
      case 'function_call':
        await handleFunctionCall(call_id, data)
        break
      default:
        console.log(`Unhandled event type: ${event}`)
    }

    // Forward to n8n if configured
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL
    if (n8nWebhookUrl) {
      try {
        await axios.post(`${n8nWebhookUrl}/retell`, req.body)
      } catch (n8nError) {
        console.error('n8n webhook error:', n8nError.message)
      }
    }

    res.json({ success: true, message: 'Webhook processed' })
  } catch (error) {
    console.error('Error processing Retell webhook:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to process webhook'
    })
  }
})

// Handle call started event
async function handleCallStarted(call_id, data) {
  try {
    const call = new Call({
      call_id,
      phone_number: data.phone_number || data.from_number || 'unknown',
      status: 'in-progress',
      metadata: {
        customer_id: data.customer_id || '',
        language: data.language || 'hi',
        direction: data.direction || 'inbound'
      }
    })
    await call.save()
  } catch (error) {
    // Call might already exist, update it instead
    await Call.findOneAndUpdate(
      { call_id },
      {
        status: 'in-progress',
        updated_at: new Date()
      }
    )
  }
}

// Handle call ended event
async function handleCallEnded(call_id, data) {
  try {
    await Call.findOneAndUpdate(
      { call_id },
      {
        status: 'completed',
        duration: data.duration || 0,
        updated_at: new Date()
      }
    )
  } catch (error) {
    console.error('Error updating call end:', error)
  }
}

// Handle conversation update (transcript updates)
async function handleConversationUpdate(call_id, data) {
  try {
    if (data.transcript) {
      const transcriptEntry = {
        speaker: data.speaker || 'Unknown',
        message: data.transcript,
        timestamp: new Date()
      }

      await Call.findOneAndUpdate(
        { call_id },
        {
          $push: { transcript: transcriptEntry },
          updated_at: new Date()
        }
      )
    }
  } catch (error) {
    console.error('Error updating conversation:', error)
  }
}

// Handle function calls (webhook triggers from Retell)
async function handleFunctionCall(call_id, data) {
  try {
    const { function_name, parameters } = data

    if (function_name === 'check_payment') {
      // Call payment verification
      const paymentResult = await verifyPayment(parameters)
      
      // Update call with payment status
      await Call.findOneAndUpdate(
        { call_id },
        {
          payment_status: paymentResult.payment_status,
          updated_at: new Date()
        }
      )
    } else if (function_name === 'schedule_callback') {
      // Schedule callback logic is handled in webhooks route
      console.log('Callback scheduling requested:', parameters)
    }
  } catch (error) {
    console.error('Error handling function call:', error)
  }
}

// Helper function to verify payment
async function verifyPayment(parameters) {
  // This would integrate with your actual payment system
  // For now, return mock data
  return {
    payment_status: Math.random() > 0.5 ? 'paid' : 'unpaid',
    amount: parameters.amount || 0
  }
}

export default router

