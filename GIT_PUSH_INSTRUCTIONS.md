# Git Push Instructions

## Authentication Issue

GitHub no longer accepts passwords for authentication. You need to use one of these methods:

## Option 1: Use Personal Access Token (Recommended)

1. **Create a Personal Access Token**:
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Give it a name (e.g., "RapidCapital")
   - Select scopes: `repo` (full control of private repositories)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

2. **Push using the token**:
   ```bash
   cd /Users/princemaurya/Desktop/RapidCapital
   git push -u origin main
   ```
   - When prompted for username: enter `alwaysprince05`
   - When prompted for password: **paste your token** (not your GitHub password)

## Option 2: Use SSH (More Secure)

1. **Check if you have SSH keys**:
   ```bash
   ls -al ~/.ssh
   ```

2. **Generate SSH key if needed**:
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   # Press Enter to accept default location
   # Optionally set a passphrase
   ```

3. **Add SSH key to GitHub**:
   ```bash
   # Copy your public key
   cat ~/.ssh/id_ed25519.pub
   # Copy the output
   ```
   - Go to GitHub → Settings → SSH and GPG keys
   - Click "New SSH key"
   - Paste your public key
   - Click "Add SSH key"

4. **Change remote to SSH**:
   ```bash
   cd /Users/princemaurya/Desktop/RapidCapital
   git remote set-url origin git@github.com:alwaysprince05/Rapid-Capital.git
   git push -u origin main
   ```

## Option 3: Use GitHub CLI

1. **Install GitHub CLI** (if not installed):
   ```bash
   brew install gh
   ```

2. **Authenticate**:
   ```bash
   gh auth login
   # Follow the prompts
   ```

3. **Push**:
   ```bash
   cd /Users/princemaurya/Desktop/RapidCapital
   git push -u origin main
   ```

## Quick Fix (Personal Access Token - Easiest)

If you want the quickest solution:

1. Create token at: https://github.com/settings/tokens
2. Run:
   ```bash
   cd /Users/princemaurya/Desktop/RapidCapital
   git push -u origin main
   ```
3. Username: `alwaysprince05`
4. Password: `[paste your token here]`

## Verify Push

After successful push, check:
- https://github.com/alwaysprince05/Rapid-Capital

Your code should be visible there!

