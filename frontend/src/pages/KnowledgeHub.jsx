import { useLanguage } from '../context/LanguageContext'

const KnowledgeHub = () => {
  const { t } = useLanguage()

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        {t('knowledge.title')}
      </h1>

      <div className="space-y-8">
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('knowledge.overview')}
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Rapid Capital AI Voice Agent is powered by Retell.ai, providing 
              intelligent voice interactions for customer support. The agent can:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Handle customer inquiries in Hindi and English</li>
              <li>Verify payment status through webhook integration</li>
              <li>Schedule callbacks based on customer requests</li>
              <li>Handle edge cases like angry customers or no response scenarios</li>
            </ul>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('knowledge.setup')}
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Step 1: Configure TTS (Text-to-Speech)
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Set up Retell.ai TTS settings for natural voice output:
            </p>
            <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code>{`{
  "voice": "alloy",
  "model": "gpt-4",
  "language": "hi-IN",
  "speed": 1.0
}`}</code>
            </pre>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              Step 2: Configure STT (Speech-to-Text)
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Enable accurate speech recognition:
            </p>
            <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code>{`{
  "language": "hi-IN",
  "model": "whisper-1",
  "enable_voice_activity_detection": true
}`}</code>
            </pre>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              Step 3: Configure LLM
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Set up the language model for intelligent responses:
            </p>
            <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code>{`{
  "model": "gpt-4",
  "temperature": 0.7,
  "max_tokens": 500
}`}</code>
            </pre>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('knowledge.prompts')}
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              System Prompt
            </h3>
            <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm">
              <code>{`You are Rapid Capital Voice Agent. Your role is to:
1. Greet customers politely in Hindi or English based on their preference
2. Verify customer's loan or payment status
3. Handle payment verification requests via webhook
4. Schedule callbacks when customers request "call later"
5. Handle edge cases:
   - If customer says "I already paid" → call check_payment webhook
   - If customer says "Call me later" → ask for time, then call schedule_callback
   - If no response after 2 retries → schedule callback automatically
   - If angry customer → apologize and offer escalation
6. Never hallucinate responses - always verify through webhooks when needed`}</code>
            </pre>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('knowledge.webhooks')}
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Check Payment Webhook
            </h3>
            <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm">
              <code>{`POST /api/check_payment
Content-Type: application/json

{
  "customer_id": "12345",
  "phone_number": "+919876543210",
  "amount": 5000
}`}</code>
            </pre>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              Schedule Callback Webhook
            </h3>
            <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm">
              <code>{`POST /api/schedule_callback
Content-Type: application/json

{
  "customer_id": "12345",
  "phone_number": "+919876543210",
  "callback_time": "2024-01-15T14:00:00Z",
  "reason": "Customer requested callback"
}`}</code>
            </pre>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              Retell.ai Webhook Event
            </h3>
            <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm">
              <code>{`POST /api/retell
Content-Type: application/json

{
  "event": "call_started",
  "call_id": "abc123",
  "timestamp": "2024-01-15T10:00:00Z",
  "data": {
    "phone_number": "+919876543210",
    "direction": "inbound"
  }
}`}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  )
}

export default KnowledgeHub

