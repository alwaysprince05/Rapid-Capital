# Environment Variables Setup Guide

This document explains how to configure environment variables for the Rapid Capital platform.

## Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/rapid-capital
# For MongoDB Atlas, use: mongodb+srv://username:password@cluster.mongodb.net/rapid-capital

# Server Configuration
PORT=5001
# Note: Port 5000 is often used by Apple AirPlay on macOS, so we use 5001 by default
NODE_ENV=development

# Retell.ai Configuration
RETELL_API_KEY=your_retell_api_key_here
RETELL_AGENT_ID=your_retell_agent_id_here
RETELL_WEBHOOK_URL=https://your-backend-url.com/api/retell
RETELL_FROM_NUMBER=+1234567890  # Optional: Your Retell.ai phone number

# n8n Webhook Configuration (Optional)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/rapid-capital

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Getting Retell.ai Credentials

1. Sign up at [https://retell.ai](https://retell.ai)
2. Navigate to your dashboard
3. Get your API key from Settings → API Keys
4. Create a voice agent and copy the Agent ID
5. Configure the webhook URL in your agent settings: `https://your-backend-url.com/api/retell`

### MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Install MongoDB locally
# macOS: brew install mongodb-community
# Ubuntu: sudo apt-get install mongodb
# Windows: Download from mongodb.com

# Start MongoDB
mongod
```

**Option 2: MongoDB Atlas (Cloud)**
1. Sign up at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string from "Connect" → "Connect your application"
4. Replace `<password>` with your database password
5. Use the connection string as `MONGODB_URI`

## Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:5001

# For production, use your deployed backend URL
# VITE_API_URL=https://your-backend-url.com
```

## Production Environment Variables

### Vercel (Frontend)

Add these environment variables in Vercel dashboard:

- `VITE_API_URL` - Your backend API URL (e.g., `https://rapid-capital-backend.onrender.com`)

### Render/Railway (Backend)

Add all backend environment variables from the `.env` example above, making sure to:

1. Update `MONGODB_URI` to your production MongoDB connection string
2. Set `NODE_ENV=production`
3. Update `RETELL_WEBHOOK_URL` to your production backend URL
4. Update `FRONTEND_URL` to your production frontend URL (for CORS)

## Security Notes

- **Never commit `.env` files to version control**
- Use different API keys for development and production
- Rotate API keys regularly
- Keep your MongoDB connection strings secure
- Use environment variable management tools in production (e.g., Vercel/Render dashboards)
