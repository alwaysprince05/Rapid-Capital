import mongoose from 'mongoose'

const callSchema = new mongoose.Schema({
  call_id: {
    type: String,
    required: true,
    unique: true
  },
  phone_number: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['initiated', 'ringing', 'in-progress', 'completed', 'failed'],
    default: 'initiated'
  },
  payment_status: {
    type: String,
    enum: ['paid', 'unpaid', 'pending', 'unknown'],
    default: 'unknown'
  },
  duration: {
    type: Number,
    default: 0
  },
  transcript: [{
    speaker: String,
    message: String,
    timestamp: Date
  }],
  metadata: {
    customer_id: String,
    language: String,
    retry_count: { type: Number, default: 0 }
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

callSchema.pre('save', function(next) {
  this.updated_at = Date.now()
  next()
})

export default mongoose.model('Call', callSchema)

