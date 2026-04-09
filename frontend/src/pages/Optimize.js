import React, { useState } from 'react';
import { Zap, DollarSign, Calendar, TrendingUp, Target, Loader } from 'lucide-react';
import api from '../api/api';

const Optimize = () => {
  const [loading, setLoading] = useState(false);
  const [strategies, setStrategies] = useState(null);
  const [formData, setFormData] = useState({
    current_emission: '',
    budget: '',
    industry: 'technology',
    target_reduction: ''
  });

  const industries = [
    'technology', 'manufacturing', 'retail', 'finance', 
    'healthcare', 'transportation', 'agriculture', 'energy'
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
      const response = await api.post('/optimize', {
        current_emission: parseFloat(formData.current_emission),
        budget: parseFloat(formData.budget),
        industry: formData.industry,
        target_reduction: parseFloat(formData.target_reduction)
      });

      setStrategies(response.data.strategies || generateDemoStrategies());
    } catch (error) {
      console.error('Error optimizing:', error);
      setStrategies(generateDemoStrategies());
    } finally {
      setLoading(false);
    }
  };

  const generateDemoStrategies = () => {
    return [
      {
        name: 'Energy Efficiency Upgrade',
        description: 'Replace old HVAC systems with high-efficiency models and install LED lighting throughout facilities',
        cost: parseFloat(formData.budget) * 0.25 || 50000,
        timeline: '6-9 months',
        roi: 185,
        emission_reduction: parseFloat(formData.current_emission) * 0.15 || 125,
        impact: 'High',
        difficulty: 'Medium'
      },
      {
        name: 'Renewable Energy Transition',
        description: 'Install solar panels on rooftops and sign PPA for wind energy to cover 60% of energy needs',
        cost: parseFloat(formData.budget) * 0.4 || 80000,
        timeline: '12-18 months',
        roi: 220,
        emission_reduction: parseFloat(formData.current_emission) * 0.32 || 267,
        impact: 'Very High',
        difficulty: 'High'
      },
      {
        name: 'Supply Chain Optimization',
        description: 'Partner with low-carbon suppliers and optimize logistics routes using AI-driven planning',
        cost: parseFloat(formData.budget) * 0.15 || 30000,
        timeline: '3-6 months',
        roi: 145,
        emission_reduction: parseFloat(formData.current_emission) * 0.12 || 100,
        impact: 'Medium',
        difficulty: 'Low'
      },
      {
        name: 'Carbon Offset Program',
        description: 'Purchase verified carbon credits from reforestation and renewable energy projects',
        cost: parseFloat(formData.budget) * 0.2 || 40000,
        timeline: '1-2 months',
        roi: 95,
        emission_reduction: parseFloat(formData.current_emission) * 0.25 || 208,
        impact: 'High',
        difficulty: 'Very Low'
      }
    ];
  };

  const getImpactColor = (impact) => {
    const colors = {
      'Very High': 'from-green-500 to-emerald-600',
      'High': 'from-cyan-500 to-blue-600',
      'Medium': 'from-yellow-500 to-orange-500',
      'Low': 'from-gray-500 to-gray-600'
    };
    return colors[impact] || colors['Medium'];
  };

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      'Very Low': 'badge-success',
      'Low': 'badge-info',
      'Medium': 'badge-warning',
      'High': 'badge-danger'
    };
    return badges[difficulty] || 'badge-info';
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold font-syne bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Emission Optimization
        </h1>
        <p className="text-gray-400 mt-2">AI-powered strategies to reduce your carbon footprint</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-cyan-500/20 flex items-center justify-center border border-green-500/30">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-xl font-syne text-white">Optimization Parameters</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Current Emissions (tCO₂e/year)</label>
                <input
                  type="number"
                  name="current_emission"
                  value={formData.current_emission}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g., 1000"
                  required
                  step="0.01"
                />
              </div>

              <div>
                <label className="label">Available Budget ($)</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g., 200000"
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
                <label className="label">Target Reduction (%)</label>
                <input
                  type="number"
                  name="target_reduction"
                  value={formData.target_reduction}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g., 30"
                  required
                  min="1"
                  max="100"
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Generate Strategies
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          {strategies ? (
            <div className="space-y-6">
              {/* Summary */}
              <div className="glass-card p-6">
                <h2 className="text-2xl font-syne text-white mb-4">Optimization Summary</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 p-4 rounded-lg border border-green-500/20">
                    <p className="text-gray-400 text-sm mb-1">Total Reduction Potential</p>
                    <p className="text-3xl font-bold font-syne text-green-400">
                      {strategies.reduce((sum, s) => sum + s.emission_reduction, 0).toFixed(0)}
                    </p>
                    <p className="text-gray-400 text-xs">tCO₂e/year</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 p-4 rounded-lg border border-cyan-500/20">
                    <p className="text-gray-400 text-sm mb-1">Average ROI</p>
                    <p className="text-3xl font-bold font-syne text-cyan-400">
                      {(strategies.reduce((sum, s) => sum + s.roi, 0) / strategies.length).toFixed(0)}%
                    </p>
                    <p className="text-gray-400 text-xs">Return on Investment</p>
                  </div>
                </div>
              </div>

              {/* Strategy Cards */}
              <div className="space-y-4">
                <h2 className="text-2xl font-syne text-white">Recommended Strategies</h2>
                
                {strategies.map((strategy, index) => (
                  <div key={index} className="glass-card p-6 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold font-syne text-white mb-2">{strategy.name}</h3>
                        <p className="text-gray-400 text-sm">{strategy.description}</p>
                      </div>
                      <div className={`badge ${getDifficultyBadge(strategy.difficulty)} ml-4`}>
                        {strategy.difficulty}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-900/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="w-4 h-4 text-yellow-400" />
                          <p className="text-xs text-gray-400">Cost</p>
                        </div>
                        <p className="text-lg font-bold text-white">${strategy.cost.toLocaleString()}</p>
                      </div>

                      <div className="bg-gray-900/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <p className="text-xs text-gray-400">Timeline</p>
                        </div>
                        <p className="text-lg font-bold text-white">{strategy.timeline}</p>
                      </div>

                      <div className="bg-gray-900/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <p className="text-xs text-gray-400">ROI</p>
                        </div>
                        <p className="text-lg font-bold text-green-400">{strategy.roi}%</p>
                      </div>

                      <div className="bg-gray-900/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="w-4 h-4 text-cyan-400" />
                          <p className="text-xs text-gray-400">Reduction</p>
                        </div>
                        <p className="text-lg font-bold text-cyan-400">{strategy.emission_reduction.toFixed(0)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Impact:</span>
                        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getImpactColor(strategy.impact)} text-white text-sm font-semibold`}>
                          {strategy.impact}
                        </div>
                      </div>
                      
                      <button className="btn btn-secondary text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 flex flex-col items-center justify-center text-center h-full">
              <Zap className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-syne text-gray-400 mb-2">No Strategies Yet</h3>
              <p className="text-gray-500 text-sm">
                Fill in the optimization parameters on the left and click "Generate Strategies" to get AI-powered recommendations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Optimize;
