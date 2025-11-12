import { useLanguage } from '../context/LanguageContext'

const DeveloperDocs = () => {
  const { t } = useLanguage()

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        {t('docs.title')}
      </h1>

      <div className="space-y-8">
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('docs.apis')}
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                GET /api/calls
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Retrieve all call logs from the database.
              </p>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Response:</p>
                <pre className="text-sm">
                  <code>{`{
  "success": true,
  "calls": [
    {
      "call_id": "abc123",
      "phone_number": "+919876543210",
      "status": "completed",
      "payment_status": "paid",
      "duration": 120,
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}`}</code>
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                POST /api/check_payment
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Verify customer payment status.
              </p>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Request:</p>
                <pre className="text-sm">
                  <code>{`{
  "customer_id": "12345",
  "phone_number": "+919876543210",
  "amount": 5000
}`}</code>
                </pre>
              </div>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Response:</p>
                <pre className="text-sm">
                  <code>{`{
  "success": true,
  "payment_status": "paid",
  "amount": 5000,
  "payment_date": "2024-01-10T08:00:00Z"
}`}</code>
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                POST /api/schedule_callback
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Schedule a callback for a customer.
              </p>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Request:</p>
                <pre className="text-sm">
                  <code>{`{
  "customer_id": "12345",
  "phone_number": "+919876543210",
  "callback_time": "2024-01-15T14:00:00Z",
  "reason": "Customer requested callback"
}`}</code>
                </pre>
              </div>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Response:</p>
                <pre className="text-sm">
                  <code>{`{
  "success": true,
  "callback_id": "cb_123",
  "scheduled_time": "2024-01-15T14:00:00Z",
  "message": "Callback scheduled successfully"
}`}</code>
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                POST /api/retell
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Webhook endpoint to receive events from Retell.ai.
              </p>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Request:</p>
                <pre className="text-sm">
                  <code>{`{
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
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            n8n Workflow Integration
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The backend forwards webhook calls to n8n for business automation. 
              Configure your n8n workflows to handle:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Payment verification workflows</li>
              <li>Callback scheduling automation</li>
              <li>Customer data synchronization</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              n8n Webhook URL: <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">https://your-n8n-instance.com/webhook/rapid-capital</code>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DeveloperDocs

