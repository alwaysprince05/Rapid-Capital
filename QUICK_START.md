# Quick Start Guide

Get the Rapid Capital platform running in 5 minutes!

## Prerequisites Check

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB running (local or Atlas connection string)

## Step 1: Install Dependencies

```bash
cd RapidCapital
npm run install:all
```

This installs dependencies for root, frontend, and backend.

## Step 2: Configure Environment

1. Create `backend/.env` file (see `ENV_SETUP.md` for template)
2. Add at minimum:
   ```env
   MONGODB_URI=mongodb://localhost:27017/rapid-capital
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

## Step 3: Start MongoDB

**If using local MongoDB:**
```bash
mongod
```

**If using MongoDB Atlas:**
- Get connection string from Atlas dashboard
- Update `MONGODB_URI` in `backend/.env`

## Step 4: Start Development Servers

```bash
npm run dev
```

This starts:
- Frontend on http://localhost:3000
- Backend on http://localhost:5000

## Step 5: Access the Application

Open your browser to: **http://localhost:3000**

You should see:
- ✅ Homepage with feature cards
- ✅ Navigation bar with language/dark mode toggles
- ✅ All pages accessible

## Testing the Application

### 1. Test Frontend Pages
- Navigate through all pages using the navbar
- Toggle language (English ↔ Hindi)
- Toggle dark mode
- Check responsive design (resize browser)

### 2. Test Backend API
```bash
# Health check
curl http://localhost:5000/health

# Get calls (should return empty array initially)
curl http://localhost:5000/api/calls
```

### 3. Test Live Test Page
1. Go to http://localhost:3000/test
2. Enter a phone number
3. Click "Start Test Call"
4. Watch the transcript appear

### 4. Test Admin Dashboard
1. Go to http://localhost:3000/admin
2. View call logs (may be empty initially)
3. Click "Refresh" to reload

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Error
- Check MongoDB is running: `mongosh` or `mongo`
- Verify connection string in `.env`
- Check firewall settings for Atlas

### Frontend Not Loading
- Check backend is running on port 5000
- Check browser console for errors
- Verify `vite.config.js` proxy settings

### Backend Not Starting
- Check `.env` file exists in `backend/` directory
- Verify all required environment variables
- Check MongoDB connection

## Next Steps

1. **Add Retell.ai Integration:**
   - Get API key from Retell.ai
   - Add to `backend/.env`
   - Configure webhook URL

2. **Add n8n Integration:**
   - Set up n8n instance
   - Add webhook URL to `backend/.env`

3. **Deploy to Production:**
   - See `DEPLOYMENT.md` for detailed instructions
   - Deploy frontend to Vercel
   - Deploy backend to Render/Railway

## Development Tips

- Use browser DevTools to inspect API calls
- Check backend console for logs
- Use MongoDB Compass to view database
- Enable React DevTools for component debugging

## Common Commands

```bash
# Start both servers
npm run dev

# Start only frontend
npm run dev:frontend

# Start only backend
npm run dev:backend

# Build frontend for production
npm run build

# Install all dependencies
npm run install:all
```

---

**Need help?** Check `README.md` for detailed documentation.

