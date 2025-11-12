# Push Code to GitHub - Step by Step

## Current Situation
- ✅ Code is committed locally (2 commits ready)
- ❌ Cannot push because authenticated as `alwaysprince05e` but repo is `alwaysprince05`

## Solution: Use Personal Access Token

### Step 1: Create Token
1. Open: https://github.com/settings/tokens
2. **IMPORTANT**: Make sure you're logged in as `alwaysprince05` (not alwaysprince05e)
3. Click "Generate new token" → "Generate new token (classic)"
4. Name: `RapidCapital`
5. Expiration: Choose your preference (90 days recommended)
6. **Select scopes**: Check `repo` (this gives full repository access)
7. Click "Generate token"
8. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)

### Step 2: Push Using Token
Run these commands:

```bash
cd /Users/princemaurya/Desktop/RapidCapital
git push -u origin main
```

When prompted:
- **Username**: `alwaysprince05`
- **Password**: Paste your token (NOT your GitHub password)

### Alternative: Use SSH (If you have SSH key set up)

If you have an SSH key added to `alwaysprince05` account:

```bash
cd /Users/princemaurya/Desktop/RapidCapital
git remote set-url origin git@github.com:alwaysprince05/Rapid-Capital.git
git push -u origin main
```

## Verify Push
After successful push, check:
https://github.com/alwaysprince05/Rapid-Capital

You should see all your files there!
