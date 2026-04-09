# ⏹️ HOW TO STOP SERVERS

## Stop Backend (Python)

**Method 1: In the backend terminal**
```
Press: CTRL + C
```
Wait for "Application shutdown complete" message.

**Method 2: Force stop**
```powershell
# Find Python processes
Get-Process python | Stop-Process -Force
```

---

## Stop Frontend (React)

**Method 1: In the frontend terminal**
```
Press: CTRL + C
```
Then type: `Y` and press Enter

**Method 2: Force stop**
```powershell
# Find Node processes
Get-Process node | Stop-Process -Force
```

---

# ▶️ HOW TO START SERVERS

## Start Backend

**Terminal 1:**
```powershell
cd D:\TerraQuant

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Start backend
cd backend
python app.py
```

**You should see:**
```
🌍 TerraQuant AI
The Global Operating System for the Carbon Economy
...
INFO: Uvicorn running on http://127.0.0.1:8000
```

✅ **Keep this terminal open!**

---

## Start Frontend

**Terminal 2 (NEW terminal):**
```powershell
cd D:\TerraQuant\frontend

# Start frontend
npm start
```

**You should see:**
```
Compiled successfully!
...
Local: http://localhost:3000
```

Browser opens automatically at http://localhost:3000

✅ **Keep this terminal open too!**

---

# 🔄 RESTART BOTH (After Adding New Models)

## Quick Method

**1. Stop both** (CTRL+C in both terminals)

**2. Start backend:**
```powershell
cd D:\TerraQuant\backend
python app.py
```

**3. Start frontend:**
```powershell
cd D:\TerraQuant\frontend
npm start
```

---

## After Adding .pkl Models

**1. Copy your 3 .pkl files to:**
```
D:\TerraQuant\backend\models\
```

**2. Stop backend** (CTRL+C)

**3. Restart backend:**
```powershell
python app.py
```

**You should now see:**
```
✓ Loaded emission_model.pkl (Random Forest Regressor)
✓ Loaded risk_model.pkl (Random Forest Classifier)  
✓ Loaded fraud_model.pkl (Isolation Forest)
```

**4. Frontend doesn't need restart** - it will automatically use the new models!

---

# 📋 Quick Commands Reference

```powershell
# === STOP ===
# Terminal 1 (Backend): CTRL + C
# Terminal 2 (Frontend): CTRL + C, then Y

# === START ===

# Terminal 1 - Backend
cd D:\TerraQuant
.\venv\Scripts\Activate.ps1
cd backend
python app.py

# Terminal 2 - Frontend
cd D:\TerraQuant\frontend
npm start

# === CHECK IF RUNNING ===

# Backend
curl http://127.0.0.1:8000

# Frontend
# Open browser: http://localhost:3000
```

---

# 🎯 Common Scenarios

## Scenario 1: Just added new .pkl models
```powershell
# Stop backend (CTRL+C)
# Restart backend
python app.py
# Frontend stays running - no restart needed
```

## Scenario 2: Changed backend code
```powershell
# Server auto-reloads (no restart needed)
# If it doesn't, CTRL+C and restart
```

## Scenario 3: Changed frontend code
```powershell
# Frontend auto-reloads (no restart needed)
# Browser will refresh automatically
```

## Scenario 4: Computer restart / next day
```powershell
# Start both servers again using the commands above
```

---

# ✅ Status Check

**Backend running?** Go to http://127.0.0.1:8000 - should show JSON

**Frontend running?** Go to http://localhost:3000 - should show website

**Both connected?** Test emission predictor - should calculate results

---

# 🚨 Troubleshooting

**Port already in use:**
```powershell
# Find and kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F

# Or just restart computer
```

**Can't stop with CTRL+C:**
```powershell
# Force kill all Python
Get-Process python | Stop-Process -Force

# Force kill all Node
Get-Process node | Stop-Process -Force
```
