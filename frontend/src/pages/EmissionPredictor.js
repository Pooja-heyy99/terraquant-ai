import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Calculator, TrendingUp, Loader } from 'lucide-react';
import api from '../api/api';

const EmissionPredictor = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    energy_use: '',
    employees: '',
    revenue: '',
    transport_km: '',
    industry: 'technology',
    country: 'USA'
  });

  const industries = [
    'technology', 'manufacturing', 'retail', 'finance', 
    'healthcare', 'transportation', 'agriculture', 'energy'
  ];

  const countries = [
    'USA', 'UK', 'Germany', 'France', 'China', 'India', 
    'Japan', 'Canada', 'Australia', 'Brazil'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.post('/predict-emission', {
        energy_use: parseFloat(formData.energy_use),
        employees: parseInt(formData.employees),
        revenue: parseFloat(formData.revenue),
        transport_km: parseFloat(formData.transport_km),
        industry: formData.industry,
        country: formData.country
      });
      
      setResult(response.data);
    } catch (error) {
      console.error('Error predicting emission:', error);
      alert('Error calculating emissions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateForecastData = (baseValue) => {
    const data = [];
    for (let i = 0; i < 5; i++) {
      data.push({
        year: `Year ${i + 1}`,
        emissions: baseValue * (1 + (Math.random() - 0.3) * 0.2)
      });
    }
    return data;
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold font-syne bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Emission Predictor
        </h1>
        <p className="text-gray-400 mt-2">Calculate your carbon footprint with AI-powered predictions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-cyan-500/20 flex items-center justify-center border border-green-500/30">
              <Calculator className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-2xl font-syne text-white">Input Parameters</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Energy Usage (MWh/year)</label>
              <input
                type="number"
                name="energy_use"
                value={formData.energy_use}
                onChange={handleChange}
                className="input"
                placeholder="e.g., 5000"
                required
                step="0.01"
              />
            </div>

            <div>
              <label className="label">Number of Employees</label>
              <input
                type="number"
                name="employees"
                value={formData.employees}
                onChange={handleChange}
                className="input"
                placeholder="e.g., 250"
                required
              />
            </div>

            <div>
              <label className="label">Annual Revenue ($M)</label>
              <input
                type="number"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                className="input"
                placeholder="e.g., 50"
                required
                step="0.01"
              />
            </div>

            <div>
              <label className="label">Transportation (km/year)</label>
              <input
                type="number"
                name="transport_km"
                value={formData.transport_km}
                onChange={handleChange}
                className="input"
                placeholder="e.g., 100000"
                required
                step="0.01"
              />
            </div>

            <div>
              <label className="label">Industry</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="select"
                required
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry.charAt(0).toUpperCase() + industry.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="select"
                required
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="w-5 h-5" />
                  Calculate Emissions
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Display */}
        <div className="space-y-6">
          {result ? (
            <>
              {/* Summary Card */}
              <div className="glass-card p-6">
                <h2 className="text-2xl font-syne text-white mb-6">Prediction Results</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 p-4 rounded-lg border border-green-500/20">
                    <p className="text-gray-400 text-sm">Total Emissions</p>
                    <p className="text-3xl font-bold font-syne text-green-400 mt-1">
                      {result.total_emission?.toFixed(2) || '0.00'}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">tCO₂e/year</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 p-4 rounded-lg border border-cyan-500/20">
                    <p className="text-gray-400 text-sm">Carbon Intensity</p>
                    <p className="text-3xl font-bold font-syne text-cyan-400 mt-1">
                      {result.intensity?.toFixed(2) || '0.00'}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">tCO₂e/$M</p>
                  </div>
                </div>

                {/* Scope Breakdown */}
                {result.scope_breakdown && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-syne text-white">Scope Breakdown</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Scope 1 (Direct)</span>
                        <span className="text-green-400 font-semibold">
                          {result.scope_breakdown.scope1?.toFixed(2) || '0.00'} tCO₂e
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${(result.scope_breakdown.scope1 / result.total_emission) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Scope 2 (Indirect Energy)</span>
                        <span className="text-cyan-400 font-semibold">
                          {result.scope_breakdown.scope2?.toFixed(2) || '0.00'} tCO₂e
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${(result.scope_breakdown.scope2 / result.total_emission) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Scope 3 (Value Chain)</span>
                        <span className="text-purple-400 font-semibold">
                          {result.scope_breakdown.scope3?.toFixed(2) || '0.00'} tCO₂e
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${(result.scope_breakdown.scope3 / result.total_emission) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Scope Breakdown Chart */}
              {result.scope_breakdown && (
                <div className="glass-card p-6">
                  <h3 className="text-xl font-syne text-white mb-4">Emission Breakdown</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={[
                      { name: 'Scope 1', value: result.scope_breakdown.scope1 || 0 },
                      { name: 'Scope 2', value: result.scope_breakdown.scope2 || 0 },
                      { name: 'Scope 3', value: result.scope_breakdown.scope3 || 0 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0a1628', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          color: '#fff'
                        }} 
                      />
                      <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* 5-Year Forecast */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-xl font-syne text-white">5-Year Forecast</h3>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={generateForecastData(result.total_emission)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="year" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0a1628', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="emissions" 
                      stroke="#22d3ee" 
                      strokeWidth={3}
                      dot={{ fill: '#22d3ee', r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <div className="glass-card p-12 flex flex-col items-center justify-center text-center h-full">
              <Calculator className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-syne text-gray-400 mb-2">No Results Yet</h3>
              <p className="text-gray-500 text-sm">
                Fill in the form on the left and click "Calculate Emissions" to see your carbon footprint prediction.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmissionPredictor;
