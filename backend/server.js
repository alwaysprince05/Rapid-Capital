import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import callRoutes from './routes/calls.js'
import webhookRoutes from './routes/webhooks.js'
import retellRoutes from './routes/retell.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rapid-capital'

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB')
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message)
    console.warn('⚠️  Server will continue without database connection. Some features may not work.')
  })

// Routes
app.use('/api/calls', callRoutes)
app.use('/api', webhookRoutes)
app.use('/api/retell', retellRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})

