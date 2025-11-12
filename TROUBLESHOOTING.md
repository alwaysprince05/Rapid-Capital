# Troubleshooting Guide

## Common Issues and Solutions

### 1. Port 5000 Already in Use (macOS)

**Error**: `EADDRINUSE: address already in use :::5000`

**Cause**: On macOS, port 5000 is often used by Apple's AirPlay service.

**Solution**: The application now defaults to port 5001. If you need to use a different port:

1. Update `backend/server.js` or set `PORT` environment variable:
   ```bash
   PORT=5001 npm run dev:backend
   ```

2. Update `frontend/vite.config.js` proxy target to match:
   ```js
   proxy: {
     '/api': {
       target: 'http://localhost:5001',  // Match your backend port
       changeOrigin: true
     }
   }
   ```

### 2. Test Call Failed

**Symptoms**: 
- "Test call failed" alert in browser
- No transcript appears
- Backend connection errors

**Solutions**:

1. **Check if backend is running**:
   ```bash
   curl http://localhost:5001/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. **Check backend logs** for errors:
   - MongoDB connection errors
   - Route not found errors
   - Port conflicts

3. **Verify MongoDB connection**:
   - If MongoDB is not running, the test call will still work but won't save to database
   - Check MongoDB: `mongosh` or `mongo` command
   - For MongoDB Atlas, verify connection string in `.env`

4. **Check browser console** for CORS or network errors

5. **Verify proxy configuration** in `frontend/vite.config.js` matches backend port

### 3. MongoDB Connection Errors

**Error**: `❌ MongoDB connection error: ...`

**Solutions**:

1. **Local MongoDB**:
   ```bash
   # Start MongoDB
   mongod
   # or on macOS with Homebrew
   brew services start mongodb-community
   ```

2. **MongoDB Atlas**:
   - Verify connection string in `backend/.env`
   - Check IP whitelist in Atlas dashboard
   - Verify username/password

3. **The app will continue without MongoDB** - test calls will work but won't be saved

### 4. CORS Errors

**Error**: `Access to XMLHttpRequest ... has been blocked by CORS policy`

**Solution**: 
- Verify `FRONTEND_URL` in `backend/.env` matches your frontend URL
- Default is `http://localhost:3000`
- For production, update to your deployed frontend URL

### 5. Retell.ai Integration Not Working

**Error**: `Retell.ai API key or Agent ID not configured`

**Solutions**:

1. **Add credentials to `backend/.env`**:
   ```env
   RETELL_API_KEY=your_api_key_here
   RETELL_AGENT_ID=your_agent_id_here
   ```

2. **The app will fallback to test calls** if Retell.ai is not configured

3. **Verify webhook URL** in Retell.ai dashboard:
   - Should be: `https://your-backend-url.com/api/retell`
   - For local testing, use ngrok or similar tunnel

### 6. Frontend Not Connecting to Backend

**Symptoms**: 
- API calls fail
- Network errors in browser console

**Solutions**:

1. **Check backend is running** on correct port (default: 5001)

2. **Verify proxy in `vite.config.js`**:
   ```js
   proxy: {
     '/api': {
       target: 'http://localhost:5001',  // Must match backend port
       changeOrigin: true
     }
   }
   ```

3. **Restart Vite dev server** after changing proxy config:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev:frontend
   ```

4. **Check `VITE_API_URL`** in `frontend/.env` (for production builds)

### 7. Module Import Errors

**Error**: `Cannot find module` or `require is not defined`

**Cause**: Mixing CommonJS (`require`) and ES modules (`import`)

**Solution**: 
- All files use ES modules (`import/export`)
- If you see `require()`, replace with `import`

### 8. Terminal Errors

**Common terminal errors**:

1. **Port already in use**:
   ```bash
   # Find process using port
   lsof -i :5001
   # Kill process
   kill -9 <PID>
   ```

2. **Node version issues**:
   ```bash
   # Check Node version (need 18+)
   node --version
   # Update if needed
   nvm install 18
   nvm use 18
   ```

3. **Permission errors**:
   ```bash
   # Fix npm permissions
   sudo chown -R $(whoami) ~/.npm
   ```

### 9. Build Errors

**Frontend build fails**:

```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Backend build fails**:

```bash
# Clear cache and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install
```

### 10. Environment Variables Not Loading

**Symptoms**: `undefined` values for environment variables

**Solutions**:

1. **Verify `.env` file exists** in correct directory:
   - `backend/.env` for backend
   - `frontend/.env` for frontend

2. **Restart server** after changing `.env`:
   - Backend: Restart Node.js server
   - Frontend: Restart Vite dev server

3. **Check variable names**:
   - Backend: `process.env.VARIABLE_NAME`
   - Frontend: `import.meta.env.VITE_VARIABLE_NAME` (must start with `VITE_`)

## Getting Help

1. Check backend terminal logs for errors
2. Check browser console (F12) for frontend errors
3. Verify all environment variables are set
4. Ensure MongoDB is running (if using local)
5. Check network tab in browser DevTools for API call details

## Quick Health Checks

```bash
# Backend health
curl http://localhost:5001/health

# Test API endpoint
curl -X POST http://localhost:5001/api/calls/test-call \
  -H "Content-Type: application/json" \
  -d '{"phone_number":"+919876543210"}'

# Check MongoDB connection (if local)
mongosh rapid-capital
```

