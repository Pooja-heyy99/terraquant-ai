# 🚀 Free Deployment Guide

## 🎯 Quick Overview

**Backend** → Deploy to **Render.com** (Free)  
**Frontend** → Deploy to **Vercel** or **Netlify** (Free)  
**Result** → Live website with public URL

---

## Part 1: Deploy Backend (Render.com)

### Step 1: Prepare Backend for Deployment

Create `Procfile` in backend folder:

```bash
cd D:\TerraQuant\backend
```

Create file `Procfile` (no extension) with this content:
```
web: uvicorn app:app --host 0.0.0.0 --port $PORT
```

### Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (free)
3. Click **"New +"** → **"Web Service"**

### Step 3: Deploy Backend

1. **Connect GitHub**: Push your code to GitHub first, or use "Deploy from Git URL"
2. **Settings**:
   - **Name**: `terraquant-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free`

3. **Environment Variables** (click "Add Environment Variable"):
   ```
   EXPO_PUBLIC_GROQ_API_KEY = gsk_test_key_fake_example (required for AI Copilot)
   EXPO_PUBLIC_GROQ_MODEL = openai/gpt-oss-20b
   PYTHON_VERSION = 3.11.0
   ```

4. Click **"Create Web Service"**

5. Wait 3-5 minutes for deployment

6. You'll get a URL like: `https://terraquant-backend.onrender.com`

### Step 4: Upload ML Models to Render

**Option A: GitHub (Recommended if models < 100MB)**
- Add models to `backend/models/` folder
- Push to GitHub
- Render auto-deploys

**Option B: Manual Upload (if models > 100MB)**
- Use Render Disk or external storage (AWS S3 free tier)

---

## Part 2: Deploy Frontend (Vercel)

### Step 1: Prepare Frontend

Update API URL in `frontend/src/api/api.js`:

```javascript
const api = axios.create({
  baseURL: 'https://terraquant-backend.onrender.com',  // ← Your Render URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Step 2: Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub (free)
3. Click **"Add New Project"**

### Step 3: Deploy Frontend

1. **Import Git Repository**:
   - Connect your GitHub repo
   - Select `TerraQuant` repository

2. **Project Settings**:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

3. Click **"Deploy"**

4. Wait 2-3 minutes

5. You'll get a URL like: `https://terraquant.vercel.app`

---

## Part 3: Alternative - Deploy Frontend to Netlify

### Step 1: Update API URL (same as above)

### Step 2: Deploy to Netlify

1. Go to https://netlify.com
2. Sign up with GitHub (free)
3. Click **"Add new site"** → **"Import an existing project"**

4. **Settings**:
   - **Repository**: Select your GitHub repo
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`

5. Click **"Deploy site"**

6. You'll get a URL like: `https://terraquant.netlify.app`

---

## 🎯 Without ML Models (Quick Demo)

If you want to deploy NOW without models:

### Backend Changes

Comment out model loading in `backend/ai_services.py`:

```python
def load_models():
    """Load all ML models from .pkl files"""
    models = {}
    
    # COMMENT OUT FOR DEMO:
    # with open(EMISSION_MODEL_PATH, "rb") as f:
    #     models["emission"] = pickle.load(f)
    
    # Use dummy models instead:
    models["emission"] = None
    models["risk"] = None
    models["fraud"] = None
    
    print("⚠ Running in DEMO mode (no models loaded)")
    return models
```

Then update prediction functions to return demo data:

```python
def predict_emission(data):
    """Predict carbon emissions"""
    
    if models["emission"] is None:
        # Demo mode - return dummy data
        return {
            "total_emission": 1234.56,
            "scope_breakdown": {
                "scope1": 456.78,
                "scope2": 345.67,
                "scope3": 432.11
            },
            "model_used": "DEMO MODE (add your .pkl files to use real predictions)"
        }
    
    # Real prediction code...
```

This way your site works immediately with demo data!

---

## 🆓 Free Tier Limits

### Render.com (Backend)
- ✅ 750 hours/month (always on)
- ✅ 100GB bandwidth
- ⚠️ Sleeps after 15 min inactivity (wakes on request)
- ✅ Custom domain support

### Vercel (Frontend)
- ✅ Unlimited bandwidth
- ✅ 100GB per month
- ✅ Auto SSL certificate
- ✅ Custom domain support

### Netlify (Frontend Alternative)
- ✅ 100GB bandwidth
- ✅ 300 build minutes/month
- ✅ Auto SSL certificate
- ✅ Custom domain support

---

## 📋 Complete Deployment Checklist

### Before Deployment:

- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Add .pkl models to `backend/models/` (or use demo mode)
- [ ] Get Groq API key (required for AI Copilot)
- [ ] Update frontend API URL to Render backend URL

### Backend (Render):

- [ ] Create Render account
- [ ] Create new Web Service
- [ ] Connect GitHub repo
- [ ] Set root directory to `backend`
- [ ] Add environment variables
- [ ] Deploy and get URL

### Frontend (Vercel/Netlify):

- [ ] Update `frontend/src/api/api.js` with backend URL
- [ ] Create Vercel/Netlify account
- [ ] Import GitHub repo
- [ ] Set root directory to `frontend`
- [ ] Deploy and get URL

### After Deployment:

- [ ] Test website at your Vercel/Netlify URL
- [ ] Check if API calls work
- [ ] Test emission predictor
- [ ] Share live link!

---

## 🌐 Your Live Links

After deployment, you'll have:

```
Frontend: https://terraquant.vercel.app
Backend:  https://terraquant-backend.onrender.com
API Docs: https://terraquant-backend.onrender.com/docs
```

Share the frontend link with anyone! 🎉

---

## 🔧 Quick Deploy Commands

### Push to GitHub:

```bash
cd D:\TerraQuant

# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit - TerraQuant AI"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/terraquant.git
git push -u origin main
```

### Build Frontend Locally (Test):

```bash
cd frontend
npm run build
```

If this works, deployment will work!

---

## ⚡ Fastest Way to Deploy (5 minutes)

1. **Push to GitHub** (2 min)
2. **Deploy backend to Render** (2 min)
3. **Deploy frontend to Vercel** (1 min)
4. **Done!** ✅

---

## 🐛 Common Issues

**Issue**: Backend shows "Application failed to respond"  
**Fix**: Check Render logs, ensure `Procfile` is correct

**Issue**: Frontend can't connect to backend  
**Fix**: Update API URL in `frontend/src/api/api.js`

**Issue**: CORS errors  
**Fix**: Backend `app.py` already has CORS enabled for all origins

**Issue**: "Model file not found"  
**Fix**: Either upload models to Render or use demo mode

---

## 💡 Pro Tips

1. **Free Custom Domain**: Both Vercel and Netlify support free custom domains
2. **Auto Deploy**: Push to GitHub → Auto redeploys to Render/Vercel
3. **Environment Variables**: Never commit API keys to GitHub
4. **Model Size**: Keep models < 100MB for GitHub, use S3 for larger models
5. **Cold Starts**: Render free tier sleeps after 15 min - first request takes 30s to wake

---

**Your platform will be LIVE and FREE! 🚀**
