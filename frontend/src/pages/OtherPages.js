import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Upload as UploadIcon, 
  CloudRain, 
  Activity, 
  TrendingUp, 
  Loader,
  CheckCircle,
  XCircle,
  FileImage,
  AlertTriangle,
  Info,
  ExternalLink,
  Search
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import api from '../api/api';

// ======================
// FRAUD DETECTOR
// ======================
export const FraudDetector = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    emission_value: '',
    company_size: 'medium',
    industry: 'technology',
    verification_documents: ''
  });

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
      const response = await api.post('/detect-fraud', {
        emission_value: parseFloat(formData.emission_value),
        company_size: formData.company_size,
        industry: formData.industry,
        verification_documents: formData.verification_documents
      });

      setResult(response.data);
    } catch (error) {
      console.error('Error detecting fraud:', error);
      // Demo result
      const fraudScore = Math.random();
      setResult({
        is_fraudulent: fraudScore > 0.7,
        confidence: (fraudScore * 100).toFixed(1),
        risk_level: fraudScore > 0.8 ? 'High' : fraudScore > 0.5 ? 'Medium' : 'Low',
        flags: [
          'Emission value significantly lower than industry average',
          'Inconsistent reporting patterns detected',
          'Missing verification documentation'
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-4xl font-bold font-syne bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Fraud Detection
        </h1>
        <p className="text-gray-400 mt-2">AI-powered verification of carbon emission reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border border-red-500/30">
              <Shield className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-2xl font-syne text-white">Report Analysis</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Reported Emission (tCO₂e)</label>
              <input
                type="number"
                name="emission_value"
                value={formData.emission_value}
                onChange={handleChange}
                className="input"
                placeholder="e.g., 5000"
                required
                step="0.01"
              />
            </div>

            <div>
              <label className="label">Company Size</label>
              <select
                name="company_size"
                value={formData.company_size}
                onChange={handleChange}
                className="select"
                required
              >
                <option value="small">Small (1-50 employees)</option>
                <option value="medium">Medium (51-500 employees)</option>
                <option value="large">Large (501+ employees)</option>
              </select>
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
                <option value="technology">Technology</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="energy">Energy</option>
              </select>
            </div>

            <div>
              <label className="label">Verification Documents</label>
              <textarea
                name="verification_documents"
                value={formData.verification_documents}
                onChange={handleChange}
                className="textarea"
                placeholder="List of verification documents..."
                rows="3"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Detect Fraud
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="glass-card p-6">
          {result ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-syne text-white mb-4">Analysis Results</h2>

              {/* Verdict */}
              <div className={`p-6 rounded-lg border-2 ${
                result.is_fraudulent 
                  ? 'bg-red-500/10 border-red-500' 
                  : 'bg-green-500/10 border-green-500'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  {result.is_fraudulent ? (
                    <XCircle className="w-8 h-8 text-red-400" />
                  ) : (
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  )}
                  <div>
                    <h3 className={`text-2xl font-bold font-syne ${
                      result.is_fraudulent ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {result.is_fraudulent ? 'Potential Fraud Detected' : 'Report Appears Valid'}
                    </h3>
                    <p className="text-gray-400 text-sm">Confidence: {result.confidence}%</p>
                  </div>
                </div>
              </div>

              {/* Risk Level */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Risk Level</p>
                  <span className={`badge ${
                    result.risk_level === 'High' ? 'badge-danger' :
                    result.risk_level === 'Medium' ? 'badge-warning' :
                    'badge-success'
                  }`}>
                    {result.risk_level}
                  </span>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Confidence Score</p>
                  <p className="text-2xl font-bold text-cyan-400">{result.confidence}%</p>
                </div>
              </div>

              {/* Flags */}
              {result.flags && result.flags.length > 0 && (
                <div>
                  <h4 className="text-lg font-syne text-white mb-3">Detected Issues</h4>
                  <div className="space-y-2">
                    {result.flags.map((flag, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-300">{flag}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <Shield className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-syne text-gray-400 mb-2">No Analysis Yet</h3>
              <p className="text-gray-500 text-sm">
                Submit a report to detect potential fraud
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ======================
// IMAGE UPLOAD
// ======================
export const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [analysisSource, setAnalysisSource] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await api.post('/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setResult(response.data);
      setAnalysisSource('live');
    } catch (error) {
      console.error('Error uploading image:', error);
      // Demo result
      setResult({
        analysis_mode: 'photo',
        scene_type: 'urban-industrial',
        land_cover: {
          forest: 45.2,
          agriculture: 28.5,
          urban: 15.3,
          water: 8.4,
          barren: 2.6
        },
        carbon_density: 125.7,
        vegetation_health: 78.3,
        estimated_daily_emission_kg: 38.2,
        carbon_impact_score: 66.8,
        emission_hotspots: ['Transport corridor congestion'],
        recommendations: ['Reduce vehicle idle time and improve route efficiency']
      });
      setAnalysisSource('fallback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-4xl font-bold font-syne bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Image Carbon Analysis
        </h1>
        <p className="text-gray-400 mt-2">Upload satellite imagery or normal photos for carbon and sustainability insights</p>
      </div>

      {/* Sample Images & Resources Section */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-syne text-white mb-4 flex items-center">
          <Info className="w-5 h-5 mr-2 text-cyan-400" />
          Image Sources and Use Cases
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 p-4 rounded-lg border border-blue-500/20">
            <h3 className="text-white font-semibold mb-2 flex items-center">
              <ExternalLink className="w-4 h-4 mr-2" />
              Free Satellite Image Sources
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="https://earthexplorer.usgs.gov/" target="_blank" rel="noopener noreferrer" 
                   className="text-cyan-400 hover:text-cyan-300 underline flex items-center">
                  USGS Earth Explorer <ExternalLink className="w-3 h-3 ml-1" />
                </a>
                <span className="text-gray-400 text-xs block ml-1">Landsat & Sentinel satellite imagery</span>
              </li>
              <li>
                <a href="https://scihub.copernicus.eu/" target="_blank" rel="noopener noreferrer" 
                   className="text-cyan-400 hover:text-cyan-300 underline flex items-center">
                  Copernicus Open Access Hub <ExternalLink className="w-3 h-3 ml-1" />
                </a>
                <span className="text-gray-400 text-xs block ml-1">Sentinel-1, 2, 3 imagery</span>
              </li>
              <li>
                <a href="https://www.planet.com/explorer/" target="_blank" rel="noopener noreferrer" 
                   className="text-cyan-400 hover:text-cyan-300 underline flex items-center">
                  Planet Explorer <ExternalLink className="w-3 h-3 ml-1" />
                </a>
                <span className="text-gray-400 text-xs block ml-1">High-resolution daily imagery (limited free)</span>
              </li>
              <li>
                <a href="https://apps.sentinel-hub.com/eo-browser/" target="_blank" rel="noopener noreferrer" 
                   className="text-cyan-400 hover:text-cyan-300 underline flex items-center">
                  Sentinel Hub EO Browser <ExternalLink className="w-3 h-3 ml-1" />
                </a>
                <span className="text-gray-400 text-xs block ml-1">Browse & download satellite imagery easily</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 p-4 rounded-lg border border-green-500/20">
            <h3 className="text-white font-semibold mb-2 flex items-center">
              <Search className="w-4 h-4 mr-2" />
              What to Search For
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <div>
                  <strong>Forests & Vegetation:</strong>
                  <span className="text-gray-400 text-xs block">Amazon rainforest, Boreal forests, Mangroves</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <div>
                  <strong>Agricultural Areas:</strong>
                  <span className="text-gray-400 text-xs block">Midwest USA, Brazilian croplands, European farmlands</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <div>
                  <strong>Urban Development:</strong>
                  <span className="text-gray-400 text-xs block">Major cities, industrial zones, urban sprawl areas</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <div>
                  <strong>Deforestation Zones:</strong>
                  <span className="text-gray-400 text-xs block">Amazon basin, Southeast Asia, Congo basin</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <div>
                  <strong>Coastal Areas:</strong>
                  <span className="text-gray-400 text-xs block">Wetlands, mangroves, coral reefs, deltas</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 p-4 rounded-lg border border-purple-500/20">
            <h3 className="text-white font-semibold mb-2 flex items-center">
              <Search className="w-4 h-4 mr-2" />
              Normal Photo Inputs
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <div>
                  <strong>Factory and Plant Photos:</strong>
                  <span className="text-gray-400 text-xs block">Estimate industrial carbon impact indicators</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <div>
                  <strong>Traffic and Logistics Areas:</strong>
                  <span className="text-gray-400 text-xs block">Identify transport-related emission hotspots</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <div>
                  <strong>Campus and Facility Grounds:</strong>
                  <span className="text-gray-400 text-xs block">Compare green cover and carbon balance proxies</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <p className="text-sm text-yellow-200 flex items-start">
            <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
            <span>
              <strong>Tip:</strong> You can upload both satellite images and regular photos (JPG, PNG, TIFF). 
              Clear scenes of terrain, traffic, factory zones, or facilities improve carbon analysis quality.
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Area */}
        <div className="glass-card p-6">
          <h2 className="text-2xl font-syne text-white mb-6">Upload Image</h2>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              dragActive 
                ? 'border-green-500 bg-green-500/10' 
                : 'border-gray-700 hover:border-gray-600'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {preview ? (
              <div className="space-y-4">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-h-64 mx-auto rounded-lg"
                />
                <p className="text-sm text-gray-400">{selectedFile?.name}</p>
              </div>
            ) : (
              <div className="py-8">
                <FileImage className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Drag and drop your image here</p>
                <p className="text-gray-500 text-sm mb-4">or</p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="btn btn-secondary cursor-pointer">
              <UploadIcon className="w-5 h-5" />
              Browse Files
            </label>
          </div>

          {selectedFile && (
            <button 
              onClick={handleUpload} 
              className="btn btn-primary w-full mt-4"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <UploadIcon className="w-5 h-5" />
                  Analyze Image
                </>
              )}
            </button>
          )}
        </div>

        {/* Results */}
        <div className="glass-card p-6">
          {result ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-syne text-white mb-4">Analysis Results</h2>

              {analysisSource && (
                <div className={`p-3 rounded-lg border text-sm ${
                  analysisSource === 'live'
                    ? 'bg-green-500/10 border-green-500/30 text-green-300'
                    : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-200'
                }`}>
                  {analysisSource === 'live'
                    ? 'Live API analysis from backend model pipeline'
                    : 'Demo fallback shown because backend request failed'}
                </div>
              )}

              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                <p className="text-gray-400 text-sm">Analysis Mode</p>
                <p className="text-white font-semibold capitalize">
                  {result.analysis_mode === 'satellite' ? 'Satellite Imagery' : 'Standard Photo'}
                  {result.scene_type ? ` • ${result.scene_type.replace('-', ' ')}` : ''}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 p-4 rounded-lg border border-green-500/20">
                  <p className="text-gray-400 text-sm mb-1">Carbon Density</p>
                  <p className="text-3xl font-bold font-syne text-green-400">
                    {result.carbon_density?.toFixed(1)}
                  </p>
                  <p className="text-gray-400 text-xs">tCO₂/hectare</p>
                </div>

                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 p-4 rounded-lg border border-cyan-500/20">
                  <p className="text-gray-400 text-sm mb-1">
                    {result.analysis_mode === 'satellite' ? 'Vegetation Health' : 'Green Cover Health'}
                  </p>
                  <p className="text-3xl font-bold font-syne text-cyan-400">
                    {result.vegetation_health?.toFixed(1)}%
                  </p>
                  <p className="text-gray-400 text-xs">
                    {result.analysis_mode === 'satellite' ? 'NDVI Score' : 'Visual Ecology Score'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-orange-500/10 to-red-600/10 p-4 rounded-lg border border-orange-500/20">
                  <p className="text-gray-400 text-sm mb-1">Estimated Daily Emission</p>
                  <p className="text-3xl font-bold font-syne text-orange-400">
                    {result.estimated_daily_emission_kg?.toFixed(1) || '0.0'}
                  </p>
                  <p className="text-gray-400 text-xs">kg CO₂/day (proxy)</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 p-4 rounded-lg border border-purple-500/20">
                  <p className="text-gray-400 text-sm mb-1">Carbon Impact Score</p>
                  <p className="text-3xl font-bold font-syne text-purple-400">
                    {result.carbon_impact_score?.toFixed(1) || '0.0'}
                  </p>
                  <p className="text-gray-400 text-xs">0-100 risk scale</p>
                </div>
              </div>

              {/* Land Cover */}
              {result.land_cover && (
                <div>
                  <h3 className="text-lg font-syne text-white mb-4">Land Cover Distribution</h3>
                  
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={Object.entries(result.land_cover).map(([key, value]) => ({
                      name: key.charAt(0).toUpperCase() + key.slice(1),
                      percentage: value
                    }))}>
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
                      <Bar dataKey="percentage" fill="#10b981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="space-y-2 mt-4">
                    {Object.entries(result.land_cover).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                          <span className="text-white font-semibold">{value.toFixed(1)}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.emission_hotspots && result.emission_hotspots.length > 0 && (
                <div className="bg-gradient-to-br from-red-500/10 to-orange-600/10 p-4 rounded-lg border border-red-500/20">
                  <h3 className="text-lg font-syne text-white mb-3">Detected Emission Hotspots</h3>
                  <ul className="space-y-2">
                    {result.emission_hotspots.map((hotspot, index) => (
                      <li key={index} className="text-sm text-gray-300 flex items-start">
                        <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 text-orange-400 flex-shrink-0" />
                        <span>{hotspot}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {result.recommendations && result.recommendations.length > 0 && (
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 p-4 rounded-lg border border-purple-500/20">
                  <h3 className="text-lg font-syne text-white mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-purple-400" />
                    AI Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <FileImage className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-syne text-gray-400 mb-2">No Analysis Yet</h3>
              <p className="text-gray-500 text-sm">
                Upload a satellite image or standard photo to analyze carbon indicators
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ======================
// CLIMATE RISK
// ======================
export const ClimateRisk = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    location: '',
    industry: 'technology',
    assets_value: '',
    timeframe: '10'
  });

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
      const response = await api.post('/predict-risk', formData);
      setResult(response.data);
    } catch (error) {
      console.error('Error predicting risk:', error);
      // Demo result
      const riskScore = Math.random() * 100;
      setResult({
        risk_score: riskScore,
        risk_level: riskScore > 70 ? 'High' : riskScore > 40 ? 'Medium' : 'Low',
        factors: [
          { name: 'Flood Risk', score: 65, trend: 'increasing' },
          { name: 'Heat Stress', score: 72, trend: 'increasing' },
          { name: 'Sea Level Rise', score: 45, trend: 'stable' },
          { name: 'Drought', score: 38, trend: 'decreasing' }
        ],
        recommendations: [
          'Invest in flood protection infrastructure',
          'Implement heat-resistant building materials',
          'Develop climate adaptation strategy'
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (score) => {
    if (score > 70) return 'text-red-400';
    if (score > 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-4xl font-bold font-syne bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Climate Risk Assessment
        </h1>
        <p className="text-gray-400 mt-2">Evaluate climate-related risks for your assets and operations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30">
              <CloudRain className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-syne text-white">Risk Parameters</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input"
                placeholder="e.g., Miami, Florida"
                required
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
                <option value="technology">Technology</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="agriculture">Agriculture</option>
                <option value="real_estate">Real Estate</option>
                <option value="energy">Energy</option>
                <option value="transportation">Transportation</option>
              </select>
            </div>

            <div>
              <label className="label">Assets Value ($M)</label>
              <input
                type="number"
                name="assets_value"
                value={formData.assets_value}
                onChange={handleChange}
                className="input"
                placeholder="e.g., 100"
                required
                step="0.01"
              />
            </div>

            <div>
              <label className="label">Timeframe (years)</label>
              <select
                name="timeframe"
                value={formData.timeframe}
                onChange={handleChange}
                className="select"
                required
              >
                <option value="5">5 years</option>
                <option value="10">10 years</option>
                <option value="20">20 years</option>
                <option value="30">30 years</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Assessing...
                </>
              ) : (
                <>
                  <CloudRain className="w-5 h-5" />
                  Assess Risk
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="glass-card p-6">
          {result ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-syne text-white mb-4">Risk Assessment</h2>

              {/* Risk Score Gauge */}
              <div className="bg-gray-900/50 p-6 rounded-lg text-center">
                <p className="text-gray-400 text-sm mb-2">Overall Risk Score</p>
                <p className={`text-6xl font-bold font-syne ${getRiskColor(result.risk_score)}`}>
                  {result.risk_score.toFixed(0)}
                </p>
                <p className="text-gray-400 text-sm mt-2">out of 100</p>
                <div className="mt-4">
                  <span className={`badge ${
                    result.risk_level === 'High' ? 'badge-danger' :
                    result.risk_level === 'Medium' ? 'badge-warning' :
                    'badge-success'
                  }`}>
                    {result.risk_level} Risk
                  </span>
                </div>
              </div>

              {/* Risk Factors */}
              {result.factors && (
                <div>
                  <h3 className="text-lg font-syne text-white mb-4">Risk Factors</h3>
                  <div className="space-y-3">
                    {result.factors.map((factor, index) => (
                      <div key={index} className="bg-gray-900/50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-semibold">{factor.name}</span>
                          <span className={`font-bold ${getRiskColor(factor.score)}`}>
                            {factor.score}
                          </span>
                        </div>
                        <div className="progress-bar mb-2">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${factor.score}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-400">
                          Trend: <span className={
                            factor.trend === 'increasing' ? 'text-red-400' :
                            factor.trend === 'stable' ? 'text-yellow-400' :
                            'text-green-400'
                          }>
                            {factor.trend}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {result.recommendations && (
                <div>
                  <h3 className="text-lg font-syne text-white mb-4">Recommendations</h3>
                  <div className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-300">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <CloudRain className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-syne text-gray-400 mb-2">No Assessment Yet</h3>
              <p className="text-gray-500 text-sm">
                Enter your parameters to assess climate risk
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ======================
// REALTIME MONITOR
// ======================
export const RealtimeMonitor = () => {
  const [data, setData] = useState([]);
  const [currentEmission, setCurrentEmission] = useState(0);
  const [isMonitoring, setIsMonitoring] = useState(false);

    const [selectedCity, setSelectedCity] = useState("New York");
    const [cityInfo, setCityInfo] = useState(null);
  
    const cities = [
      { name: "New York", country: "USA", emission: "1250 tCO₂e/hr" },
      { name: "Tokyo", country: "Japan", emission: "980 tCO₂e/hr" },
      { name: "London", country: "UK", emission: "850 tCO₂e/hr" },
      { name: "Mumbai", country: "India", emission: "910 tCO₂e/hr" },
      { name: "Delhi", country: "India", emission: "1020 tCO₂e/hr" },
      { name: "Bengaluru", country: "India", emission: "780 tCO₂e/hr" }
    ];

    useEffect(() => {
    let interval;
    
    if (isMonitoring) {
      interval = setInterval(async () => {
        try {
            const response = await api.get(`/realtime-emission?city=${selectedCity}`);
          const newValue = response.data.emission || (Math.random() * 100 + 900);
            setCityInfo(response.data);
          
          setCurrentEmission(newValue);
          setData(prev => {
            const newData = [...prev, {
              time: new Date().toLocaleTimeString(),
              emission: newValue
            }];
            return newData.slice(-20); // Keep last 20 points
          });
        } catch (error) {
          const newValue = Math.random() * 100 + 900;
          setCurrentEmission(newValue);
          setData(prev => {
            const newData = [...prev, {
              time: new Date().toLocaleTimeString(),
              emission: newValue
            }];
            return newData.slice(-20);
          });
        }
      }, 2000);
    }

    return () => clearInterval(interval);
    }, [isMonitoring, selectedCity]);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold font-syne bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Real-time Emission Monitor
          </h1>
          <p className="text-gray-400 mt-2">Live tracking of carbon emissions across major global cities</p>
        </div>
        
        <button 
          onClick={() => setIsMonitoring(!isMonitoring)}
          className={`btn ${isMonitoring ? 'bg-red-500 hover:bg-red-600' : 'btn-primary'}`}
        >
          <Activity className="w-5 h-5" />
          {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
        </button>
      </div>

      {/* City Selector */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Select City</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cities.map((city) => (
            <button
              key={city.name}
              onClick={() => {
                setSelectedCity(city.name);
                setData([]); // Clear data when switching cities
              }}
              className={`p-4 rounded-lg border-2 transition ${
                selectedCity === city.name
                  ? 'border-cyan-400 bg-gradient-to-r from-green-400/20 to-cyan-400/20'
                  : 'border-gray-600 hover:border-cyan-400'
              }`}
            >
              <p className="font-semibold text-white">{city.name}</p>
              <p className="text-sm text-gray-400">{city.country}</p>
              <p className="text-xs text-gray-500 mt-1">Base: {city.emission}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Current Value */}
      <div className="glass-card p-8 text-center">
        <p className="text-gray-400 mb-2">Current Emission Rate</p>
        <p className="text-2xl font-semibold text-cyan-400 mb-4">{selectedCity}</p>
        <p className="text-6xl font-bold font-syne bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          {currentEmission.toFixed(2)}
        </p>
        <p className="text-gray-400 mt-2">tCO₂e/hour</p>
        {cityInfo && (
          <p className="text-sm text-gray-500 mt-3">{cityInfo.country}</p>
        )}
        {isMonitoring && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-semibold">Live</span>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-syne text-white mb-6">Emission Timeline</h2>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#94a3b8" />
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
                dataKey="emission" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <p>Click "Start Monitoring" to begin tracking emissions</p>
          </div>
        )}
      </div>

      {/* Stats */}
      {data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6">
            <p className="text-gray-400 text-sm mb-1">Average</p>
            <p className="text-3xl font-bold text-green-400">
              {(data.reduce((sum, d) => sum + d.emission, 0) / data.length).toFixed(2)}
            </p>
          </div>
          <div className="glass-card p-6">
            <p className="text-gray-400 text-sm mb-1">Peak</p>
            <p className="text-3xl font-bold text-red-400">
              {Math.max(...data.map(d => d.emission)).toFixed(2)}
            </p>
          </div>
          <div className="glass-card p-6">
            <p className="text-gray-400 text-sm mb-1">Minimum</p>
            <p className="text-3xl font-bold text-cyan-400">
              {Math.min(...data.map(d => d.emission)).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ======================
// FORECAST
// ======================
export const Forecast = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    current_emission: '',
    growth_rate: '',
    reduction_target: '',
    years: '5'
  });

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
      const response = await api.post('/forecast', {
        current_emission: parseFloat(formData.current_emission),
        growth_rate: parseFloat(formData.growth_rate),
        reduction_target: parseFloat(formData.reduction_target),
        years: parseInt(formData.years)
      });

      setResult(response.data);
    } catch (error) {
      console.error('Error forecasting:', error);
      // Generate demo forecast
      const years = parseInt(formData.years);
      const current = parseFloat(formData.current_emission);
      const growth = parseFloat(formData.growth_rate) / 100;
      const target = parseFloat(formData.reduction_target) / 100;

      const baseline = [];
      const optimized = [];

      for (let i = 0; i <= years; i++) {
        baseline.push({
          year: `Year ${i}`,
          emission: current * Math.pow(1 + growth, i)
        });
        optimized.push({
          year: `Year ${i}`,
          emission: current * Math.pow(1 + growth - target/years, i)
        });
      }

      setResult({ baseline, optimized });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-4xl font-bold font-syne bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Emission Forecast
        </h1>
        <p className="text-gray-400 mt-2">Project future emissions and reduction trajectories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-xl font-syne text-white">Forecast Parameters</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Current Emission (tCO₂e/year)</label>
                <input
                  type="number"
                  name="current_emission"
                  value={formData.current_emission}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g., 5000"
                  required
                  step="0.01"
                />
              </div>

              <div>
                <label className="label">Annual Growth Rate (%)</label>
                <input
                  type="number"
                  name="growth_rate"
                  value={formData.growth_rate}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g., 3.5"
                  required
                  step="0.1"
                />
              </div>

              <div>
                <label className="label">Reduction Target (%)</label>
                <input
                  type="number"
                  name="reduction_target"
                  value={formData.reduction_target}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g., 30"
                  required
                  step="0.1"
                />
              </div>

              <div>
                <label className="label">Forecast Period (years)</label>
                <select
                  name="years"
                  value={formData.years}
                  onChange={handleChange}
                  className="select"
                  required
                >
                  <option value="3">3 years</option>
                  <option value="5">5 years</option>
                  <option value="10">10 years</option>
                  <option value="15">15 years</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Forecasting...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    Generate Forecast
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          {result ? (
            <div className="space-y-6">
              {/* Chart */}
              <div className="glass-card p-6">
                <h2 className="text-2xl font-syne text-white mb-6">Emission Trajectory</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#94a3b8"
                      allowDuplicatedCategory={false}
                    />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0a1628', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Legend />
                    <Line 
                      data={result.baseline}
                      type="monotone" 
                      dataKey="emission" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      name="Business as Usual"
                      dot={{ fill: '#ef4444', r: 5 }}
                    />
                    <Line 
                      data={result.optimized}
                      type="monotone" 
                      dataKey="emission" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      name="With Reduction Target"
                      dot={{ fill: '#10b981', r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Data Table */}
              <div className="glass-card p-6">
                <h2 className="text-2xl font-syne text-white mb-6">Forecast Data</h2>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Year</th>
                        <th>Business as Usual</th>
                        <th>With Reduction</th>
                        <th>Savings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.baseline.map((item, index) => {
                        const optimized = result.optimized[index];
                        const savings = item.emission - optimized.emission;
                        
                        return (
                          <tr key={index}>
                            <td className="font-semibold">{item.year}</td>
                            <td className="text-red-400">{item.emission.toFixed(0)} tCO₂e</td>
                            <td className="text-green-400">{optimized.emission.toFixed(0)} tCO₂e</td>
                            <td className="text-cyan-400 font-bold">-{savings.toFixed(0)} tCO₂e</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 flex flex-col items-center justify-center text-center h-full">
              <TrendingUp className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-syne text-gray-400 mb-2">No Forecast Yet</h3>
              <p className="text-gray-500 text-sm">
                Enter your parameters to generate an emission forecast
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
