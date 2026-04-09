# 🔬 GOOGLE COLAB GUIDE - TRAIN YOUR MODELS

## 📝 Step-by-Step Instructions

### Step 1: Open Google Colab

1. Go to: https://colab.research.google.com
2. Click **"New Notebook"**
3. You'll see a blank notebook

### Step 2: Copy the Training Code

1. Open the file: `D:\TerraQuant\train_models_colab.py`
2. **Copy ALL the code** (Ctrl+A, Ctrl+C)
3. Paste into the Colab notebook cell

### Step 3: Run the Code

1. Click the **Play button** ▶️ (or press Ctrl+Enter)
2. Wait 2-3 minutes for:
   - Libraries to install
   - Data generation
   - Model training
   - Download prompts

### Step 4: Download Your Models

Three files will download automatically:
- ✅ `emission_model.pkl`
- ✅ `risk_model.pkl`
- ✅ `fraud_model.pkl`

They go to your **Downloads** folder.

### Step 5: Copy Models to TerraQuant

```powershell
# Copy from Downloads to TerraQuant
copy "C:\Users\YOUR_USERNAME\Downloads\emission_model.pkl" "D:\TerraQuant\backend\models\"
copy "C:\Users\YOUR_USERNAME\Downloads\risk_model.pkl" "D:\TerraQuant\backend\models\"
copy "C:\Users\YOUR_USERNAME\Downloads\fraud_model.pkl" "D:\TerraQuant\backend\models\"
```

Or just drag-and-drop the 3 files to `D:\TerraQuant\backend\models\`

### Step 6: Restart Backend

In your backend terminal:
```powershell
# Stop: Press CTRL + C

# Start:
python app.py
```

You should see:
```
✓ Loaded emission_model.pkl (Random Forest Regressor)
✓ Loaded risk_model.pkl (Random Forest Classifier)
✓ Loaded fraud_model.pkl (Isolation Forest)
```

**✅ DONE! Your real ML models are now integrated!**

---

## 🎓 Using Your Own Dataset

If you have **your own CSV data**, modify the Colab code:

```python
# Instead of synthetic data, load your CSV
from google.colab import files

# Upload CSV
uploaded = files.upload()

# Load your data
import pandas as pd
df = pd.read_csv('your_data.csv')

# Your CSV should have columns:
# - energy_use
# - employees
# - revenue
# - transport_km
# - industry (as text, will be encoded)
# - country (as text, will be encoded)
# - total_emission (target variable)

# Encode categorical variables
from sklearn.preprocessing import LabelEncoder

le_industry = LabelEncoder()
le_country = LabelEncoder()

df['industry_encoded'] = le_industry.fit_transform(df['industry'])
df['country_encoded'] = le_country.fit_transform(df['country'])

# Then use df for training
X = df[['energy_use', 'employees', 'revenue', 'transport_km', 'industry_encoded', 'country_encoded']]
y = df['total_emission']

# Rest of the code stays the same...
```

---

## 📊 Colab Tips

### Save Your Work
```python
# At the end of your notebook, save to Google Drive
from google.colab import drive
drive.mount('/content/drive')

# Copy models to Drive
!cp *.pkl /content/drive/MyDrive/
```

### Check Model Size
```python
import os
print(f"emission_model.pkl: {os.path.getsize('emission_model.pkl')/1024:.0f} KB")
print(f"risk_model.pkl: {os.path.getsize('risk_model.pkl')/1024:.0f} KB")
print(f"fraud_model.pkl: {os.path.getsize('fraud_model.pkl')/1024:.0f} KB")
```

### Test Before Download
```python
# Load and test
with open('emission_model.pkl', 'rb') as f:
    test_model = pickle.load(f)
    
# Make a prediction
test_input = [[5000, 200, 50, 10000, 0, 0]]
prediction = test_model.predict(test_input)
print(f"Test prediction: {prediction[0]:.2f} tCO2e")
```

---

## ⚠️ Common Issues

**Issue**: "No module named 'sklearn'"
**Fix**: Run `!pip install scikit-learn` in a cell first

**Issue**: Downloads not starting
**Fix**: Click the folder icon 📁 on left, right-click files, select "Download"

**Issue**: Models too large (>100MB)
**Fix**: Reduce `n_estimators` to 50 or `max_depth` to 10

**Issue**: Out of memory
**Fix**: Reduce `n_samples` to 1000

---

## 🎯 What Each Model Does

### emission_model.pkl
- **Input**: energy, employees, revenue, transport, industry, country
- **Output**: Total emissions in tCO2e
- **Algorithm**: Random Forest Regressor
- **Used in**: Emission Predictor page

### risk_model.pkl
- **Input**: industry, assets, timeframe, location
- **Output**: Risk level (0-3)
- **Algorithm**: Random Forest Classifier
- **Used in**: Climate Risk page

### fraud_model.pkl
- **Input**: emission value, company size, industry, doc length
- **Output**: Fraud detection (-1=fraud, 1=normal)
- **Algorithm**: Isolation Forest
- **Used in**: Fraud Detector page

---

## ✅ Quick Checklist

- [ ] Open Google Colab
- [ ] Copy code from `train_models_colab.py`
- [ ] Run the cell (▶️)
- [ ] Wait for downloads (3 files)
- [ ] Copy .pkl files to `D:\TerraQuant\backend\models\`
- [ ] Restart backend (CTRL+C, then `python app.py`)
- [ ] Check backend logs for "✓ Loaded" messages
- [ ] Test predictions on website

---

**🎉 Your ML models are ready for TerraQuant AI!**
