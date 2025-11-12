# Quick Deployment Steps for Vercel

## ✅ Code is Ready on GitHub

All changes have been pushed to: https://github.com/alwaysprince05/Rapid-Capital

## 🚀 Deploy to Vercel

### Step 1: Import Project
1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import from GitHub: `alwaysprince05/Rapid-Capital`
4. Click **"Import"**

### Step 2: Configure Project Settings
Vercel should auto-detect the configuration, but verify:

- **Framework Preset**: Vite (auto-detected)
- **Root Directory**: `./` (root)
- **Build Command**: `cd frontend && npm install && npm run build` (from vercel.json)
- **Output Directory**: `frontend/dist` (from vercel.json)
- **Install Command**: `cd frontend && npm install` (from vercel.json)

### Step 3: Add Environment Variables
1. In project settings, go to **Environment Variables**
2. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: Your backend URL (e.g., `https://rapid-capital-backend.onrender.com`)
   - **Environment**: Production, Preview, Development (select all)

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (usually 1-2 minutes)
3. Your app will be live at: `https://rapid-capital-*.vercel.app`

## 📋 What Was Configured

### Root `vercel.json`
- Builds from `frontend/` directory
- Outputs to `frontend/dist`
- Configures SPA routing with rewrites
- Framework: Vite

### `.vercelignore`
- Excludes `backend/` directory (not needed for frontend build)
- Excludes node_modules and other unnecessary files

### Removed
- `frontend/vercel.json` (removed to avoid conflicts)

## 🔍 Verify Deployment

After deployment, check:
1. ✅ Homepage loads
2. ✅ All routes work (Knowledge Hub, Docs, Live Test, Admin)
3. ✅ Dark mode toggle works
4. ✅ Language toggle works
5. ✅ API calls work (if backend is deployed)

## 🐛 Troubleshooting

If build fails:
1. Check build logs in Vercel dashboard
2. Verify `VITE_API_URL` is set
3. Ensure all dependencies are in `frontend/package.json`
4. Check for any TypeScript or build errors

## 📝 Next Steps

1. **Deploy Backend** (Render/Railway):
   - See `DEPLOYMENT.md` for backend deployment
   - Update `VITE_API_URL` in Vercel with backend URL

2. **Configure Retell.ai**:
   - Add API keys to backend environment variables
   - Update webhook URL in Retell.ai dashboard

3. **Set up MongoDB**:
   - Use MongoDB Atlas or local instance
   - Add connection string to backend environment

