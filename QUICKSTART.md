# 🚀 Quick Start Guide

## Step 1: Add Your ML Models (REQUIRED)

Copy your 3 trained models to: **`D:\TerraQuant\backend\models\`**

Required files (exact names):
```
emission_model.pkl
risk_model.pkl
fraud_model.pkl
```

---

## Step 2: Install Backend Dependencies

```powershell
cd D:\TerraQuant

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install all Python packages
pip install fastapi uvicorn python-multipart python-dotenv pydantic scikit-learn numpy pandas groq Pillow
```

---

## Step 3: Install Frontend Dependencies

```powershell
cd D:\TerraQuant\frontend
npm install
```

---

## Step 4: Start Backend

```powershell
cd D:\TerraQuant\backend
python app.py
```

**Keep this terminal running!** You should see:
```
✓ Loaded emission_model.pkl (Random Forest Regressor)
✓ Loaded risk_model.pkl (Random Forest Classifier)
✓ Loaded fraud_model.pkl (Isolation Forest)

Backend running at http://127.0.0.1:8000
```

---

## Step 5: Start Frontend (New Terminal)

```powershell
cd D:\TerraQuant\frontend
npm start
```

Browser opens at: **http://localhost:3000**

---

## ✅ Done!

Your platform is running with YOUR trained ML models integrated.

---

## 🔄 Next Time (Quick Start)

```powershell
# Terminal 1 - Backend
cd D:\TerraQuant
.\venv\Scripts\Activate.ps1
cd backend
python app.py

# Terminal 2 - Frontend
cd D:\TerraQuant\frontend
npm start
```

Or just run: **`start.bat`**
