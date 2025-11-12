/**
 * Retell.ai Configuration Helper
 * 
 * This file contains example configuration for integrating with Retell.ai
 * Replace with your actual Retell.ai API credentials
 */

export const retellConfig = {
  // Retell.ai API Configuration
  apiKey: process.env.RETELL_API_KEY,
  apiUrl: 'https://api.retell.ai/v2',
  
  // Voice Agent Configuration
  agentConfig: {
    // TTS (Text-to-Speech) Settings
    tts: {
      voice: 'alloy', // Options: alloy, echo, fable, onyx, nova, shimmer
      model: 'gpt-4',
      language: 'hi-IN', // Hindi (India) or 'en-US' for English
      speed: 1.0
    },
    
    // STT (Speech-to-Text) Settings
    stt: {
      language: 'hi-IN',
      model: 'whisper-1',
      enable_voice_activity_detection: true
    },
    
    // LLM Settings
    llm: {
      model: 'gpt-4',
      temperature: 0.7,
      max_tokens: 500
    },
    
    // System Prompt
    systemPrompt: `You are Rapid Capital Voice Agent. Your role is to:
1. Greet customers politely in Hindi or English based on their preference
2. Verify customer's loan or payment status
3. Handle payment verification requests via webhook
4. Schedule callbacks when customers request "call later"
5. Handle edge cases:
   - If customer says "I already paid" → call check_payment webhook
   - If customer says "Call me later" → ask for time, then call schedule_callback
   - If no response after 2 retries → schedule callback automatically
   - If angry customer → apologize and offer escalation
6. Never hallucinate responses - always verify through webhooks when needed`,
    
    // Webhook Configuration
    webhook: {
      url: process.env.RETELL_WEBHOOK_URL || 'https://your-backend-url.com/api/retell',
      events: ['call_started', 'call_ended', 'conversation_update', 'function_call']
    },
    
    // Function Calls (for webhook triggers)
    functions: [
      {
        name: 'check_payment',
        description: 'Check if customer has made payment',
        parameters: {
          type: 'object',
          properties: {
            customer_id: { type: 'string' },
            phone_number: { type: 'string' },
            amount: { type: 'number' }
          },
          required: ['customer_id', 'phone_number']
        }
      },
      {
        name: 'schedule_callback',
        description: 'Schedule a callback for the customer',
        parameters: {
          type: 'object',
          properties: {
            customer_id: { type: 'string' },
            phone_number: { type: 'string' },
            callback_time: { type: 'string', format: 'date-time' },
            reason: { type: 'string' }
          },
          required: ['customer_id', 'phone_number', 'callback_time']
        }
      }
    ]
  }
}

/**
 * Example: Create a Retell.ai voice call
 * 
 * const axios = require('axios');
 * 
 * async function createRetellCall(phoneNumber) {
 *   const response = await axios.post(
 *     'https://api.retell.ai/v2/create-phone-call',
 *     {
 *       from_number: '+1234567890',
 *       to_number: phoneNumber,
 *       agent_id: process.env.RETELL_AGENT_ID,
 *       metadata: {
 *         customer_id: '12345'
 *       }
 *     },
 *     {
 *       headers: {
 *         'Authorization': `Bearer ${retellConfig.apiKey}`,
 *         'Content-Type': 'application/json'
 *       }
 *     }
 *   );
 *   return response.data;
 * }
 */

export default retellConfig

