# ▶️ Run Locally (Right Now - No Models Needed Yet)

## Step 1: Start Backend

```powershell
cd D:\TerraQuant\backend
python app.py
```

**You'll see errors about missing .pkl files - THAT'S OK!**

The site will still load, just predictions won't work until you add models.

---

## Step 2: Start Frontend (New Terminal)

```powershell
cd D:\TerraQuant\frontend
npm start
```

**Browser opens at http://localhost:3000** ✅

---

## What Works Without Models:

✅ Dashboard (mock data)  
✅ Map  
✅ Leaderboard  
✅ Marketplace  
✅ AI Copilot (has fallback responses)  
✅ All UI and navigation  

❌ Emission Predictor (needs emission_model.pkl)  
❌ Fraud Detector (needs fraud_model.pkl)  
❌ Climate Risk (needs risk_model.pkl)  

---

## API Key (Optional)

**Location**: `D:\TerraQuant\.env`

1. Copy template:
```powershell
cd D:\TerraQuant
copy .env.example .env
```

2. Edit `.env` file:
```env
EXPO_PUBLIC_GROQ_API_KEY=gsk_test_key_fake_example
EXPO_PUBLIC_GROQ_MODEL=openai/gpt-oss-20b
```

**Where to get it**: https://console.groq.com

**Is it required?** 
- ✅ YES for AI Copilot to work properly
- ❌ NO for deployment
- ✅ Only needed for AI Copilot (has fallback responses without it)

---

## Add Your ML Models (When Ready)

Just copy 3 files to: **`D:\TerraQuant\backend\models\`**

```
emission_model.pkl
risk_model.pkl  
fraud_model.pkl
```

Then restart backend - predictions will work!

---

## 🌐 Get Live Link (Free Deployment)

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for step-by-step guide to deploy on:

- **Render.com** (backend) - FREE
- **Vercel** (frontend) - FREE

**Result**: Public URL like `https://terraquant.vercel.app`

---

## Current Status

Your dependencies are installed! ✅

**To run locally now:**
```powershell
# Terminal 1 - Backend
cd D:\TerraQuant\backend
python app.py

# Terminal 2 - Frontend  
cd D:\TerraQuant\frontend
npm start
```

The site will load even without models or API key!
