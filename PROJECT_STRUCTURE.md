# Project Structure

```
RapidCapital/
├── frontend/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   └── Navbar.jsx      # Navigation bar with language/dark mode toggle
│   │   ├── context/            # React Context providers
│   │   │   ├── LanguageContext.jsx  # English/Hindi language toggle
│   │   │   └── ThemeContext.jsx      # Dark mode toggle
│   │   ├── pages/              # Page components
│   │   │   ├── Homepage.jsx    # Landing page with feature overview
│   │   │   ├── KnowledgeHub.jsx     # Retell.ai setup guides and prompts
│   │   │   ├── DeveloperDocs.jsx    # API documentation
│   │   │   ├── LiveTest.jsx    # Real-time call testing interface
│   │   │   └── AdminDashboard.jsx    # Call logs and management
│   │   ├── App.jsx             # Main app component with routing
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global styles and Tailwind imports
│   ├── public/                 # Static assets
│   ├── index.html              # HTML template
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.js          # Vite configuration with API proxy
│   ├── tailwind.config.js      # TailwindCSS configuration
│   ├── postcss.config.js       # PostCSS configuration
│   └── vercel.json             # Vercel deployment configuration
│
├── backend/                    # Node.js + Express backend
│   ├── models/                 # MongoDB Mongoose models
│   │   ├── Call.js             # Call log schema
│   │   └── Callback.js         # Callback scheduling schema
│   ├── routes/                 # Express API routes
│   │   ├── calls.js            # Call management endpoints
│   │   ├── retell.js           # Retell.ai webhook handler
│   │   └── webhooks.js         # Payment and callback webhooks
│   ├── utils/                  # Utility functions
│   │   └── retellConfig.js     # Retell.ai configuration helper
│   ├── server.js               # Express server setup
│   ├── package.json            # Backend dependencies
│   └── railway.json            # Railway deployment configuration
│
├── .gitignore                  # Git ignore rules
├── package.json                # Root package.json with scripts
├── README.md                   # Main documentation
├── ENV_SETUP.md                # Environment variables guide
├── PROJECT_STRUCTURE.md        # This file
├── DEPLOYMENT.md               # Deployment instructions
└── QUICK_START.md             # Quick start guide
```

## Key Files Explained

### Frontend

- **App.jsx**: Main React component that sets up routing and context providers
- **Navbar.jsx**: Navigation component with language toggle (EN/HI) and dark mode switch
- **Homepage.jsx**: Landing page showcasing platform features
- **KnowledgeHub.jsx**: Documentation for Retell.ai setup, TTS/STT/LLM configuration, and prompt templates
- **DeveloperDocs.jsx**: API endpoint documentation with example payloads
- **LiveTest.jsx**: Interface for testing voice calls with real-time transcript display
- **AdminDashboard.jsx**: Admin interface for viewing call logs, payment status, and triggering n8n webhooks

### Backend

- **server.js**: Express server with MongoDB connection, CORS configuration, and route mounting
- **models/Call.js**: MongoDB schema for call logs (status, payment_status, transcript, metadata)
- **models/Callback.js**: MongoDB schema for scheduled callbacks
- **routes/calls.js**: 
  - `GET /api/calls` - Fetch all calls
  - `GET /api/calls/:callId` - Get specific call
  - `POST /api/calls/create` - Create Retell.ai call
  - `POST /api/calls/test-call` - Simulate test call
- **routes/retell.js**: Webhook handler for Retell.ai events (call_started, call_ended, conversation_update, function_call)
- **routes/webhooks.js**:
  - `GET /api/callbacks` - Fetch callbacks
  - `POST /api/check_payment` - Payment verification
  - `POST /api/schedule_callback` - Schedule callback
  - `POST /api/trigger-n8n` - Test n8n webhook
- **utils/retellConfig.js**: Retell.ai configuration helper with system prompts and function definitions

## Data Flow

1. **Call Initiation**: Frontend → `POST /api/calls/create` → Retell.ai API → Call created
2. **Webhook Events**: Retell.ai → `POST /api/retell` → MongoDB (save/update call) → n8n (optional forwarding)
3. **Payment Check**: Retell.ai function call → `POST /api/check_payment` → n8n → Response to Retell.ai
4. **Callback Scheduling**: Retell.ai function call → `POST /api/schedule_callback` → MongoDB → n8n
5. **Admin View**: Frontend → `GET /api/calls` → MongoDB → Display in AdminDashboard

## Technology Stack

### Frontend
- React 18
- Vite (build tool)
- TailwindCSS (styling)
- React Router (routing)
- Axios (HTTP client)
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Axios (HTTP client for Retell.ai and n8n)
- dotenv (environment variables)

### Integrations
- Retell.ai (voice agent)
- n8n (workflow automation)
- MongoDB Atlas or local MongoDB
