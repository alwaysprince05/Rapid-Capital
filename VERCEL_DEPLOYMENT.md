# Vercel Deployment Guide

## Option 1: Configure Root Directory in Vercel (Recommended)

1. Go to your Vercel project settings
2. Navigate to **Settings** → **General**
3. Under **Root Directory**, set it to: `frontend`
4. Save changes
5. Redeploy

This tells Vercel to treat the `frontend/` directory as the project root.

## Option 2: Use Root vercel.json (Current Setup)

The root `vercel.json` is configured to:
- Install all dependencies (root + frontend)
- Build from the frontend directory
- Output to `frontend/dist`

If the build is still failing, check:

### Common Issues:

1. **Build Command Error**
   - Make sure `npm run build` in root package.json runs `cd frontend && npm run build`
   - ✅ This is already configured correctly

2. **Missing Dependencies**
   - The `installCommand` runs `npm run install:all` which installs all dependencies
   - ✅ This is already configured correctly

3. **Environment Variables**
   - Add `VITE_API_URL` in Vercel project settings
   - Go to **Settings** → **Environment Variables**
   - Add: `VITE_API_URL` = your backend URL (e.g., `https://your-backend.onrender.com`)

### Build Log Analysis

From your build log:
```
Running "npm run build"
> rapid-capital-platform@1.0.0 build
> cd frontend && npm run build
> rapid-capital-frontend@1.0.0 build
```

This looks correct! The build should complete successfully. If it's hanging or failing, check:

1. **Check full build logs** in Vercel dashboard for any errors
2. **Verify all dependencies** are in package.json
3. **Check for TypeScript errors** (if any .ts files)
4. **Verify TailwindCSS** is configured correctly

### Quick Fix

If build is still failing, try this in Vercel project settings:

1. **Root Directory**: Set to `frontend`
2. **Build Command**: Leave empty (auto-detect) or set to `npm run build`
3. **Output Directory**: `dist`
4. **Install Command**: Leave empty (auto-detect) or set to `npm install`

Then remove the root `vercel.json` and use the one in `frontend/vercel.json` instead.

## Verify Deployment

After successful deployment:
1. Check your Vercel URL
2. Test all pages:
   - Homepage
   - Knowledge Hub
   - Developer Docs
   - Live Test
   - Admin Dashboard
3. Check browser console for any errors
4. Verify API calls work (if backend is deployed)

