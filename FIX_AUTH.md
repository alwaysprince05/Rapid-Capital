# Fix GitHub Authentication

## Issue
You're logged in as `alwaysprince05e` but need to push to `alwaysprince05`'s repository.

## Solution Options

### Option 1: Switch GitHub CLI Account (Recommended)

1. **Logout from current account**:
   ```bash
   gh auth logout
   ```

2. **Login with correct account**:
   ```bash
   gh auth login
   ```
   - Select: GitHub.com
   - Select: HTTPS
   - Authenticate: Login with a web browser
   - Follow the prompts to authenticate as `alwaysprince05`

3. **Push again**:
   ```bash
   cd /Users/princemaurya/Desktop/RapidCapital
   git push -u origin main
   ```

### Option 2: Use Personal Access Token

1. **Create a token for `alwaysprince05`**:
   - Go to: https://github.com/settings/tokens
   - Make sure you're logged in as `alwaysprince05` (not alwaysprince05e)
   - Click "Generate new token (classic)"
   - Name: "RapidCapital"
   - Scopes: Check `repo`
   - Generate and copy the token

2. **Push with token**:
   ```bash
   cd /Users/princemaurya/Desktop/RapidCapital
   git push -u origin main
   ```
   - Username: `alwaysprince05`
   - Password: `[paste your token]`

### Option 3: If You Own Both Accounts

If `alwaysprince05e` has access to `alwaysprince05`'s repositories, you can:

1. **Add the repository as a collaborator** or
2. **Transfer the repository** to `alwaysprince05e`, or
3. **Fork the repository** to `alwaysprince05e` and push there

## Quick Command Sequence

```bash
# Logout from current account
gh auth logout

# Login with correct account (alwaysprince05)
gh auth login

# Push
cd /Users/princemaurya/Desktop/RapidCapital
git push -u origin main
```

