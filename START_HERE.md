# ✅ COMPLETE SETUP GUIDE

## 🎯 Current Status

✅ Python libraries installed  
✅ `.env` file created  
✅ Backend ready (works WITHOUT models in demo mode)  
✅ Frontend ready  

---

## ▶️ RUN LOCALLY NOW (2 Commands)

### Terminal 1 - Start Backend:
```powershell
cd D:\TerraQuant\backend
python app.py
```

**Expected output:**
```
⚠ emission_model.pkl not found (using demo mode)
⚠ risk_model.pkl not found (using demo mode)
⚠ fraud_model.pkl not found (using demo mode)

TerraQuant AI - The Global Operating System for the Carbon Economy
Backend running at http://127.0.0.1:8000
```

### Terminal 2 - Start Frontend:
```powershell
cd D:\TerraQuant\frontend
npm start
```

**Browser opens:** http://localhost:3000

**✅ WEBSITE IS LIVE LOCALLY!**

---

## 🌐 GET PUBLIC LIVE LINK (Free - Takes 10 Minutes)

### Quick Option: Use ngrok (Fastest - 2 minutes)

1. **Download ngrok**: https://ngrok.com/download
2. **Expose backend**:
```powershell
ngrok http 8000
```
3. You get a public URL like: `https://abc123.ngrok.io`
4. Update frontend API URL in `frontend/src/api/api.js`:
```javascript
baseURL: 'https://abc123.ngrok.io',
```
5. Restart frontend
6. **Share the frontend URL**: http://localhost:3000

**Limitation**: ngrok free URL changes on restart, backend must stay running

---

### Permanent Option: Deploy to Render + Vercel (10 minutes)

#### Step 1: Push to GitHub

```powershell
cd D:\TerraQuant

# Initialize git
git init
git add .
git commit -m "TerraQuant AI platform"

# Create new repo on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/terraquant.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy Backend to Render.com

1. Go to https://render.com/signup
2. Sign up with GitHub (free)
3. Click **"New +"** → **"Web Service"**
4. Select your `terraquant` repository
5. **Settings**:
   - Name: `terraquant-backend`
   - Root Directory: `backend`
   - Runtime: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app:app --host 0.0.0.0 --port $PORT`
6. Click **"Create Web Service"**
7. Wait 3-5 minutes
8. **Copy your backend URL**: `https://terraquant-backend.onrender.com`

#### Step 3: Update Frontend API URL

Edit `D:\TerraQuant\frontend\src\api\api.js`:

```javascript
const api = axios.create({
  baseURL: 'https://terraquant-backend.onrender.com',  // ← Your Render URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

Commit and push:
```powershell
git add .
git commit -m "Update API URL"
git push
```

#### Step 4: Deploy Frontend to Vercel

1. Go to https://vercel.com/signup
2. Sign up with GitHub (free)
3. Click **"Add New Project"**
4. Import your `terraquant` repository
5. **Settings**:
   - Framework: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Click **"Deploy"**
7. Wait 2 minutes
8. **You get a LIVE URL**: `https://terraquant.vercel.app`

**✅ SHARE THIS LINK WITH ANYONE!**

---

## 📋 Summary

### Local Development:
```
Frontend: http://localhost:3000
Backend:  http://127.0.0.1:8000
```

### Live Deployment:
```
Frontend: https://terraquant.vercel.app
Backend:  https://terraquant-backend.onrender.com
API Docs: https://terraquant-backend.onrender.com/docs
```

---

## 🔑 API Key (OPTIONAL)

**Where**: `D:\TerraQuant\.env` (already created)

**To add Groq API key:**
1. Get free key from: https://console.groq.com
2. Edit `.env`:
```env
EXPO_PUBLIC_GROQ_API_KEY=gsk_test_key_fake_example
EXPO_PUBLIC_GROQ_MODEL=openai/gpt-oss-20b
```
3. Restart backend

**Is it required?**
- ✅ YES - Required for AI Copilot to work
- ✅ Groq provides free API access with rate limits
- ✅ Has fallback responses if API fails temporarily

---

## 🤖 ML Models (When Ready)

**Where**: `D:\TerraQuant\backend\models\`

**Files needed (exact names):**
```
emission_model.pkl
risk_model.pkl
fraud_model.pkl
```

**What happens without them?**
- ✅ Site loads and works
- ✅ Dashboard, Map, Leaderboard, Marketplace work
- ⚠️ Predictions use demo/mock data
- ⚠️ Backend shows warnings (not errors)

**To add models:**
1. Copy your 3 `.pkl` files to `backend/models/`
2. Restart backend
3. Backend will show: "✓ Loaded emission_model.pkl"
4. Now predictions use YOUR real models!

---

## ✅ What Works RIGHT NOW (Without Models)

✅ Dashboard with charts  
✅ Carbon Map  
✅ Leaderboard  
✅ Marketplace (buy carbon credits)  
✅ AI Copilot (fallback responses)  
✅ Optimize strategies  
✅ Real-time monitor  
✅ All UI and navigation  

⚠️ Predictions (work in demo mode)  
⚠️ Fraud detection (demo mode)  
⚠️ Climate risk (demo mode)  

---

## 🚀 Quick Reference

**Run locally:**
```powershell
# Terminal 1
cd D:\TerraQuant\backend
python app.py

# Terminal 2
cd D:\TerraQuant\frontend  
npm start
```

**Deploy for free:**
1. Push to GitHub
2. Backend → Render.com
3. Frontend → Vercel.com
4. Get live link: `https://terraquant.vercel.app`

**Add models:**
1. Copy 3 `.pkl` files to `backend/models/`
2. Restart backend
3. Predictions now use real ML!

---

**Your platform is READY TO RUN! 🎉**

**Start with local testing, then deploy for a live link!**
