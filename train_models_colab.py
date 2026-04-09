# ========================================
# GOOGLE COLAB - TRAIN ML MODELS FOR TERRAQUANT AI
# Copy this entire code into a Google Colab notebook
# ========================================

# Step 1: Install required libraries
!pip install scikit-learn pandas numpy

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier, IsolationForest
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, accuracy_score
import pickle
from google.colab import files

# ========================================
# MODEL 1: EMISSION PREDICTION (Random Forest Regressor)
# ========================================

print("=" * 60)
print("TRAINING EMISSION PREDICTION MODEL")
print("=" * 60)

# Create synthetic training data (replace with your real dataset)
np.random.seed(42)
n_samples = 5000

# Feature columns
df_emission = pd.DataFrame({
    'energy_use': np.random.uniform(100, 50000, n_samples),       # MWh/year
    'employees': np.random.randint(10, 10000, n_samples),         # Number of employees
    'revenue': np.random.uniform(1, 1000, n_samples),             # Million USD
    'transport_km': np.random.uniform(1000, 500000, n_samples),   # km/year
    'industry': np.random.randint(0, 8, n_samples),               # 0-7 (encoded)
    'country': np.random.randint(0, 10, n_samples)                # 0-9 (encoded)
})

# Target: Total emissions (tCO2e)
# Realistic formula: energy is main contributor + other factors
df_emission['total_emission'] = (
    df_emission['energy_use'] * 0.45 +          # Energy factor
    df_emission['employees'] * 0.8 +            # Employee factor
    df_emission['revenue'] * 12 +               # Revenue factor
    df_emission['transport_km'] * 0.002 +       # Transport factor
    np.random.normal(0, 500, n_samples)         # Random noise
)

# Split data
X = df_emission[['energy_use', 'employees', 'revenue', 'transport_km', 'industry', 'country']]
y = df_emission['total_emission']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
emission_model = RandomForestRegressor(
    n_estimators=100,
    max_depth=20,
    random_state=42,
    n_jobs=-1
)
emission_model.fit(X_train, y_train)

# Test accuracy
y_pred = emission_model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"✓ Model trained! MSE: {mse:.2f}")
print(f"  Features: {list(X.columns)}")
print(f"  Training samples: {len(X_train)}")

# Save model
with open("emission_model.pkl", "wb") as f:
    pickle.dump(emission_model, f, protocol=4)
print("✓ Saved: emission_model.pkl")

# ========================================
# MODEL 2: CLIMATE RISK PREDICTION (Random Forest Classifier)
# ========================================

print("\n" + "=" * 60)
print("TRAINING CLIMATE RISK MODEL")
print("=" * 60)

# Create risk dataset
df_risk = pd.DataFrame({
    'industry': np.random.randint(0, 8, n_samples),
    'assets_value': np.random.uniform(1, 5000, n_samples),        # Million USD
    'timeframe': np.random.randint(5, 30, n_samples),             # Years
    'location_length': np.random.randint(3, 20, n_samples)        # Location encoding
})

# Target: Risk level (0=Low, 1=Medium, 2=High, 3=Critical)
risk_score = (
    (df_risk['assets_value'] / 1000) +
    (df_risk['timeframe'] / 5) +
    (df_risk['location_length'] / 3)
)

df_risk['risk_level'] = pd.cut(
    risk_score,
    bins=[0, 5, 10, 15, 100],
    labels=[0, 1, 2, 3]  # Low, Medium, High, Critical
).astype(int)

# Split and train
X_risk = df_risk[['industry', 'assets_value', 'timeframe', 'location_length']]
y_risk = df_risk['risk_level']

X_train_r, X_test_r, y_train_r, y_test_r = train_test_split(X_risk, y_risk, test_size=0.2, random_state=42)

risk_model = RandomForestClassifier(
    n_estimators=100,
    max_depth=15,
    random_state=42,
    n_jobs=-1
)
risk_model.fit(X_train_r, y_train_r)

# Test accuracy
y_pred_r = risk_model.predict(X_test_r)
accuracy = accuracy_score(y_test_r, y_pred_r)
print(f"✓ Model trained! Accuracy: {accuracy:.2%}")
print(f"  Classes: Low(0), Medium(1), High(2), Critical(3)")

# Save model
with open("risk_model.pkl", "wb") as f:
    pickle.dump(risk_model, f, protocol=4)
print("✓ Saved: risk_model.pkl")

# ========================================
# MODEL 3: FRAUD DETECTION (Isolation Forest)
# ========================================

print("\n" + "=" * 60)
print("TRAINING FRAUD DETECTION MODEL")
print("=" * 60)

# Create fraud dataset
df_fraud = pd.DataFrame({
    'emission_value': np.random.uniform(100, 50000, n_samples),
    'company_size': np.random.randint(0, 3, n_samples),       # 0=small, 1=medium, 2=large
    'industry': np.random.randint(0, 8, n_samples),
    'doc_length': np.random.randint(0, 200, n_samples)
})

# Add some anomalies (fraudulent reports)
n_anomalies = int(n_samples * 0.1)  # 10% anomalies
anomaly_indices = np.random.choice(n_samples, n_anomalies, replace=False)
df_fraud.loc[anomaly_indices, 'emission_value'] = np.random.uniform(1, 50, n_anomalies)  # Suspiciously low
df_fraud.loc[anomaly_indices, 'doc_length'] = np.random.randint(0, 20, n_anomalies)      # Few docs

# Train Isolation Forest (unsupervised)
X_fraud = df_fraud[['emission_value', 'company_size', 'industry', 'doc_length']]

fraud_model = IsolationForest(
    n_estimators=100,
    contamination=0.1,  # 10% expected anomalies
    random_state=42,
    n_jobs=-1
)
fraud_model.fit(X_fraud)

# Test predictions (-1 = anomaly/fraud, 1 = normal)
predictions = fraud_model.predict(X_fraud)
n_fraud_detected = (predictions == -1).sum()
print(f"✓ Model trained!")
print(f"  Detected {n_fraud_detected} anomalies out of {n_samples} samples")

# Save model
with open("fraud_model.pkl", "wb") as f:
    pickle.dump(fraud_model, f, protocol=4)
print("✓ Saved: fraud_model.pkl")

# ========================================
# DOWNLOAD ALL MODELS
# ========================================

print("\n" + "=" * 60)
print("DOWNLOADING MODELS")
print("=" * 60)

# Download all 3 files
files.download('emission_model.pkl')
files.download('risk_model.pkl')
files.download('fraud_model.pkl')

print("\n✅ ALL MODELS TRAINED AND DOWNLOADED!")
print("\n📁 Next steps:")
print("1. Copy the 3 .pkl files to: D:\\TerraQuant\\backend\\models\\")
print("2. Restart your backend server")
print("3. Models will load automatically!")

# ========================================
# BONUS: TEST YOUR MODELS
# ========================================

print("\n" + "=" * 60)
print("TESTING MODELS")
print("=" * 60)

# Test emission model
test_features = np.array([[5000, 200, 50, 10000, 0, 0]])  # Example input
test_prediction = emission_model.predict(test_features)[0]
print(f"\n📊 Emission Prediction Test:")
print(f"   Input: energy=5000, employees=200, revenue=50M")
print(f"   Predicted Emission: {test_prediction:.2f} tCO2e")

# Test risk model
test_risk = np.array([[2, 1000, 10, 8]])  # Example input
risk_prediction = risk_model.predict(test_risk)[0]
risk_levels = {0: "Low", 1: "Medium", 2: "High", 3: "Critical"}
print(f"\n⚠️ Risk Prediction Test:")
print(f"   Predicted Risk: {risk_levels[risk_prediction]}")

# Test fraud model
test_fraud = np.array([[1000, 1, 2, 50]])  # Example input
fraud_prediction = fraud_model.predict(test_fraud)[0]
fraud_verdict = "NORMAL" if fraud_prediction == 1 else "ANOMALY DETECTED"
print(f"\n🔍 Fraud Detection Test:")
print(f"   Verdict: {fraud_verdict}")

print("\n" + "=" * 60)
print("🎉 COMPLETE! Models ready for TerraQuant AI")
print("=" * 60)
