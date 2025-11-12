import express from 'express'
import axios from 'axios'
import Callback from '../models/Callback.js'

const router = express.Router()

// GET /api/callbacks - Fetch all callback logs
router.get('/callbacks', async (req, res) => {
  try {
    const callbacks = await Callback.find().sort({ created_at: -1 }).limit(100)
    res.json({
      success: true,
      callbacks
    })
  } catch (error) {
    console.error('Error fetching callbacks:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch callbacks'
    })
  }
})

// POST /api/check_payment - Verify customer payment status
router.post('/check_payment', async (req, res) => {
  try {
    const { customer_id, phone_number, amount } = req.body

    // Forward to n8n webhook if configured
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL
    if (n8nWebhookUrl) {
      try {
        await axios.post(`${n8nWebhookUrl}/check_payment`, {
          customer_id,
          phone_number,
          amount,
          timestamp: new Date().toISOString()
        })
      } catch (n8nError) {
        console.error('n8n webhook error:', n8nError.message)
        // Continue even if n8n fails
      }
    }

    // Mock payment verification (replace with actual payment system integration)
    // In production, this would query your payment database
    const mockPaymentStatus = {
      success: true,
      payment_status: Math.random() > 0.5 ? 'paid' : 'unpaid',
      amount: amount || 0,
      payment_date: new Date().toISOString()
    }

    res.json(mockPaymentStatus)
  } catch (error) {
    console.error('Error checking payment:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to check payment status'
    })
  }
})

// POST /api/schedule_callback - Schedule a callback for a customer
router.post('/schedule_callback', async (req, res) => {
  try {
    const { customer_id, phone_number, callback_time, reason } = req.body

    if (!customer_id || !phone_number || !callback_time) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: customer_id, phone_number, callback_time'
      })
    }

    // Create callback record
    const callback = new Callback({
      callback_id: `cb_${Date.now()}`,
      customer_id,
      phone_number,
      scheduled_time: new Date(callback_time),
      reason: reason || 'Customer requested callback',
      status: 'scheduled'
    })

    await callback.save()

    // Forward to n8n webhook if configured
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL
    if (n8nWebhookUrl) {
      try {
        await axios.post(`${n8nWebhookUrl}/schedule_callback`, {
          callback_id: callback.callback_id,
          customer_id,
          phone_number,
          scheduled_time: callback_time,
          reason: callback.reason
        })
      } catch (n8nError) {
        console.error('n8n webhook error:', n8nError.message)
        // Continue even if n8n fails
      }
    }

    res.json({
      success: true,
      callback_id: callback.callback_id,
      scheduled_time: callback.scheduled_time,
      message: 'Callback scheduled successfully'
    })
  } catch (error) {
    console.error('Error scheduling callback:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to schedule callback'
    })
  }
})

// POST /api/trigger-n8n - Manually trigger n8n webhook for testing
router.post('/trigger-n8n', async (req, res) => {
  try {
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL
    if (!n8nWebhookUrl) {
      return res.status(400).json({
        success: false,
        error: 'N8N_WEBHOOK_URL not configured'
      })
    }

    const response = await axios.post(n8nWebhookUrl, {
      action: 'test',
      timestamp: new Date().toISOString(),
      ...req.body
    })

    res.json({
      success: true,
      message: 'n8n webhook triggered successfully',
      response: response.data
    })
  } catch (error) {
    console.error('Error triggering n8n webhook:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to trigger n8n webhook',
      details: error.message
    })
  }
})

export default router

