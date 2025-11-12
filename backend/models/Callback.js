import mongoose from 'mongoose'

const callbackSchema = new mongoose.Schema({
  callback_id: {
    type: String,
    required: true,
    unique: true
  },
  customer_id: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  scheduled_time: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'missed'],
    default: 'scheduled'
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

callbackSchema.pre('save', function(next) {
  this.updated_at = Date.now()
  next()
})

export default mongoose.model('Callback', callbackSchema)

