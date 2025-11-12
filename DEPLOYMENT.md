# Deployment Guide

This guide provides step-by-step instructions for deploying the Rapid Capital platform to production.

## Prerequisites

- GitHub account
- Vercel account (for frontend)
- Render or Railway account (for backend)
- MongoDB Atlas account (or self-hosted MongoDB)
- Retell.ai account
- n8n instance (optional)

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. Ensure all environment variables are configured
2. Update `frontend/vite.config.js` if needed for production API URL

### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI**

```bash
cd frontend
npm install -g vercel
vercel login
vercel
```

Follow the prompts:
- Set project name: `rapid-capital-frontend`
- Override settings: No
- Set environment variables when prompted

**Option B: Using Vercel Dashboard**

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variables:
   - `VITE_API_URL`: Your backend URL (e.g., `https://rapid-capital-backend.onrender.com`)

6. Click "Deploy"

### Step 3: Update Backend CORS

After deployment, update your backend `.env`:
```
FRONTEND_URL=https://your-vercel-app.vercel.app
```

## Backend Deployment (Render)

### Step 1: Prepare Backend

1. Create `backend/.env` with all required variables
2. Test locally to ensure everything works

### Step 2: Deploy to Render

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `rapid-capital-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: Leave empty (Render will detect)

5. Add Environment Variables:
   ```
   PORT=10000
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   RETELL_API_KEY=your_retell_api_key
   RETELL_AGENT_ID=your_retell_agent_id
   RETELL_WEBHOOK_URL=https://rapid-capital-backend.onrender.com/api/retell
   N8N_WEBHOOK_URL=your_n8n_webhook_url
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

6. Click "Create Web Service"

### Step 3: Update Retell.ai Webhook

1. Go to Retell.ai dashboard
2. Update webhook URL to: `https://rapid-capital-backend.onrender.com/api/retell`

## Backend Deployment (Railway)

### Step 1: Prepare Backend

Same as Render preparation

### Step 2: Deploy to Railway

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Add a new service → "GitHub Repo"
6. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

7. Add Environment Variables (same as Render)

8. Railway will automatically deploy

## MongoDB Setup

### Option 1: MongoDB Atlas (Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist IP addresses (or use 0.0.0.0/0 for development)
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/rapid-capital?retryWrites=true&w=majority
   ```
6. Add to backend `.env` as `MONGODB_URI`

### Option 2: Self-Hosted MongoDB

1. Install MongoDB on your server
2. Configure connection string:
   ```
   mongodb://username:password@host:27017/rapid-capital
   ```

## Retell.ai Configuration

1. **Get API Credentials**
   - Sign up at https://retell.ai
   - Navigate to API Settings
   - Copy API Key and Agent ID

2. **Configure Webhook**
   - Go to Agent Settings
   - Set Webhook URL: `https://your-backend-url.com/api/retell`
   - Enable events: `call_started`, `call_ended`, `conversation_update`, `function_call`

3. **Set System Prompt**
   - Use the prompt from `backend/utils/retellConfig.js`
   - Configure TTS/STT settings as needed

## n8n Setup (Optional)

1. **Create n8n Instance**
   - Use n8n cloud or self-hosted
   - Create webhook workflows

2. **Configure Webhooks**
   - Payment verification webhook
   - Callback scheduling webhook
   - Retell event forwarding webhook

3. **Get Webhook URL**
   - Format: `https://your-n8n-instance.com/webhook/rapid-capital`
   - Add to backend `.env` as `N8N_WEBHOOK_URL`

## Post-Deployment Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and health check works
- [ ] MongoDB connected and working
- [ ] Retell.ai webhook configured
- [ ] n8n webhook configured (if using)
- [ ] CORS settings updated
- [ ] Environment variables set correctly
- [ ] Test API endpoints
- [ ] Test Live Test page
- [ ] Verify Admin Dashboard loads call logs

## Troubleshooting

### Frontend Not Loading
- Check Vercel deployment logs
- Verify build completed successfully
- Check environment variables

### Backend Not Responding
- Check Render/Railway logs
- Verify MongoDB connection
- Check PORT environment variable

### Webhook Not Receiving Events
- Verify webhook URL is publicly accessible
- Check Retell.ai dashboard configuration
- Review backend logs for incoming requests

### CORS Errors
- Update `FRONTEND_URL` in backend `.env`
- Check CORS configuration in `backend/server.js`

## Monitoring

### Vercel Analytics
- Enable in Vercel dashboard
- Monitor frontend performance

### Render/Railway Logs
- View real-time logs in dashboard
- Set up log aggregation if needed

### MongoDB Monitoring
- Use MongoDB Atlas monitoring
- Set up alerts for connection issues

## Security Considerations

1. **Environment Variables**
   - Never commit `.env` files
   - Use secure variable storage in hosting platforms

2. **API Keys**
   - Rotate keys regularly
   - Use different keys for dev/prod

3. **CORS**
   - Restrict to specific domains in production
   - Don't use wildcard (`*`) in production

4. **MongoDB**
   - Use strong passwords
   - Whitelist IP addresses
   - Enable authentication

## Scaling

### Frontend
- Vercel automatically scales
- Consider CDN for static assets

### Backend
- Render: Upgrade plan for more resources
- Railway: Auto-scaling available
- Consider load balancing for high traffic

### Database
- MongoDB Atlas: Upgrade cluster tier
- Consider read replicas for heavy read workloads

---

For issues, check the main README.md or open an issue on GitHub.

