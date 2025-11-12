# Rapid Capital Knowledge & Voice Platform

A complete end-to-end web application for managing AI voice agent interactions, integrated with Retell.ai and n8n workflow automation.

## 🎯 Features

- **Knowledge Hub**: Comprehensive documentation for AI voice agent setup and configuration
- **Developer Documentation**: API references and integration guides
- **Live Testing**: Real-time voice call simulation and transcript viewing
- **Admin Dashboard**: Call logs, payment status tracking, and workflow management
- **Multi-language Support**: English and Hindi language toggle
- **Dark Mode**: Modern UI with dark mode support
- **Retell.ai Integration**: Voice agent powered by Retell.ai
- **n8n Automation**: Webhook integration for business process automation

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database (via Mongoose)
- **Retell.ai SDK** - Voice agent integration
- **n8n Webhooks** - Workflow automation

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Retell.ai account and API key
- n8n instance (optional, for workflow automation)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RapidCapital
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Configure environment variables**
   
   See `ENV_SETUP.md` for detailed instructions.
   
   Create `backend/.env` with:
   - MongoDB connection string
   - Retell.ai API key and agent ID
   - n8n webhook URL (optional)
   - Frontend URL for CORS
   
   Create `frontend/.env` with:
   - Backend API URL (`VITE_API_URL`)

4. **Start MongoDB** (if using local instance)
   ```bash
   mongod
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```
   This starts both frontend (port 3000) and backend (port 5000) concurrently.

   Or start them separately:
   ```bash
   # Terminal 1 - Frontend
   npm run dev:frontend

   # Terminal 2 - Backend
   npm run dev:backend
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001 (Note: Port 5000 is often used by AirPlay on macOS)
   - Health check: http://localhost:5001/health

## 🚀 Deployment

### Frontend (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy from frontend directory**
   ```bash
   cd frontend
   vercel
   ```

3. **Configure environment variables in Vercel dashboard**
   - Set `VITE_API_URL` to your backend URL

4. **Update Vercel configuration** (optional)
   Create `vercel.json` in frontend directory:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

### Backend (Render or Railway)

#### Using Render:

1. **Create a new Web Service**
   - Connect your GitHub repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`
   - Set environment: `Node`

2. **Configure environment variables**
   - Add all variables from `.env.example`
   - Set `NODE_ENV=production`
   - Update `RETELL_WEBHOOK_URL` to your Render backend URL

3. **Deploy**

#### Using Railway:

1. **Create a new project**
   - Connect your GitHub repository
   - Add a new service from your repo

2. **Configure settings**
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`

3. **Add environment variables**
   - Use Railway's environment variables section
   - Add all variables from `.env.example`

## 📡 API Endpoints

### Call Management
- `GET /api/calls` - Get all call logs
- `GET /api/calls/:callId` - Get specific call details
- `POST /api/calls/create` - Create a Retell.ai voice call
- `POST /api/calls/test-call` - Simulate a test call

### Webhooks
- `GET /api/callbacks` - Get all callback logs
- `POST /api/check_payment` - Verify customer payment status
- `POST /api/schedule_callback` - Schedule a callback
- `POST /api/trigger-n8n` - Manually trigger n8n webhook

### Retell.ai Integration
- `POST /api/retell` - Webhook endpoint for Retell.ai events

### Health Check
- `GET /health` - Server health status

## 🔧 Retell.ai Setup

1. **Create a Retell.ai account**
   - Sign up at https://retell.ai
   - Get your API key from the dashboard

2. **Create a Voice Agent**
   - Configure TTS, STT, and LLM settings
   - Set system prompt (see `backend/utils/retellConfig.js`)
   - Configure webhook URL: `https://your-backend-url.com/api/retell`

3. **Configure Functions**
   - Add `check_payment` function
   - Add `schedule_callback` function
   - See Knowledge Hub for prompt templates

4. **Test the Integration**
   - Use the Live Test page to simulate calls
   - Check Admin Dashboard for call logs

## 🔗 n8n Integration

1. **Set up n8n instance**
   - Use n8n cloud or self-hosted instance
   - Create webhook nodes for:
     - Payment verification
     - Callback scheduling
     - Retell event forwarding

2. **Configure webhook URL**
   - Add `N8N_WEBHOOK_URL` to backend `.env`
   - Format: `https://your-n8n-instance.com/webhook/rapid-capital`

3. **Test webhook**
   - Use Admin Dashboard "Test n8n Webhook" button
   - Check n8n execution logs

## 📁 Project Structure

```
RapidCapital/
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── context/       # Context providers (Language, Theme)
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── server.js            # Express server
│   └── package.json
├── .env.example             # Environment variables template
├── .gitignore
├── package.json             # Root package.json
└── README.md
```

## 🧪 Testing

### Manual Testing
1. Start the application
2. Navigate to Live Test page
3. Enter a phone number and start test call
4. View transcript in real-time
5. Check Admin Dashboard for call logs

### API Testing
Use tools like Postman or curl:

```bash
# Health check
curl http://localhost:5000/health

# Get calls
curl http://localhost:5000/api/calls

# Check payment
curl -X POST http://localhost:5000/api/check_payment \
  -H "Content-Type: application/json" \
  -d '{"customer_id":"123","phone_number":"+919876543210","amount":5000}'
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or Atlas connection string is correct
- Check firewall settings for cloud MongoDB

### Retell.ai Webhook Not Receiving Events
- Verify webhook URL is publicly accessible
- Check Retell.ai dashboard for webhook configuration
- Review backend logs for incoming requests

### n8n Integration Not Working
- Verify `N8N_WEBHOOK_URL` is set correctly
- Check n8n webhook node is active
- Review n8n execution logs

### Frontend Not Connecting to Backend
- Ensure backend is running on port 5000
- Check CORS configuration in `backend/server.js`
- Verify proxy settings in `frontend/vite.config.js`

## 📝 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ for Rapid Capital**

