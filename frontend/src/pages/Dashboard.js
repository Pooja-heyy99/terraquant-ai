import React, { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Zap,
  Target,
  Globe
} from 'lucide-react';
import api from '../api/api';

const Dashboard = () => {
  const [emissionValue, setEmissionValue] = useState(1247.32);
  const [alerts] = useState([
    { id: 1, type: 'warning', message: 'Scope 2 emissions increased by 12% this month', time: '2 hours ago' },
    { id: 2, type: 'success', message: 'Successfully reduced transportation emissions', time: '5 hours ago' },
    { id: 3, type: 'danger', message: 'High carbon intensity detected in facility A', time: '1 day ago' },
  ]);

  useEffect(() => {
    const fetchRealtimeEmission = async () => {
      try {
        const response = await api.get('/realtime-emission');
        if (typeof response.data?.emission === 'number') {
          setEmissionValue(response.data.emission);
        }
      } catch (error) {
        // Keep existing value if realtime endpoint is temporarily unavailable.
      }
    };

    fetchRealtimeEmission();
    const interval = setInterval(fetchRealtimeEmission, 2000);
    return () => clearInterval(interval);
  }, []);

  const emissionData = [
    { month: 'Jan', scope1: 400, scope2: 240, scope3: 180 },
    { month: 'Feb', scope1: 380, scope2: 260, scope3: 190 },
    { month: 'Mar', scope1: 420, scope2: 280, scope3: 200 },
    { month: 'Apr', scope1: 390, scope2: 250, scope3: 185 },
    { month: 'May', scope1: 410, scope2: 270, scope3: 195 },
    { month: 'Jun', scope1: 385, scope2: 245, scope3: 175 },
  ];

  const esgData = [
    { category: 'Environmental', value: 85 },
    { category: 'Social', value: 72 },
    { category: 'Governance', value: 90 },
    { category: 'Innovation', value: 78 },
    { category: 'Transparency', value: 88 },
  ];

  const stats = [
    {
      label: 'Total Emissions',
      value: '12,847 tCO₂e',
      change: '-8.2%',
      trend: 'down',
      icon: Activity,
      tone: 'green'
    },
    {
      label: 'Carbon Intensity',
      value: '0.45 tCO₂e/$M',
      change: '-12.5%',
      trend: 'down',
      icon: Target,
      tone: 'cyan'
    },
    {
      label: 'Offset Credits',
      value: '3,250 tCO₂',
      change: '+15.3%',
      trend: 'up',
      icon: Zap,
      tone: 'green'
    },
    {
      label: 'ESG Score',
      value: '82.6/100',
      change: '+5.1%',
      trend: 'up',
      icon: Globe,
      tone: 'cyan'
    },
  ];

  const toneClasses = {
    green: {
      iconBox: 'bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-400/35',
      icon: 'text-green-300'
    },
    cyan: {
      iconBox: 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-400/35',
      icon: 'text-cyan-300'
    }
  };

  const quickActions = [
    { title: 'Calculate Emissions', color: 'from-green-500 to-emerald-600', path: '/emission-predictor' },
    { title: 'View Map', color: 'from-cyan-500 to-blue-600', path: '/map' },
    { title: 'Buy Credits', color: 'from-purple-500 to-pink-600', path: '/marketplace' },
    { title: 'AI Copilot', color: 'from-orange-500 to-red-600', path: '/copilot' },
    { title: 'Optimize', color: 'from-indigo-500 to-purple-600', path: '/optimize' },
    { title: 'Forecast', color: 'from-teal-500 to-cyan-600', path: '/forecast' },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold font-syne tracking-tight bg-gradient-to-r from-green-300 to-cyan-300 bg-clip-text text-transparent">
            TerraQuant AI Dashboard
          </h1>
          <p className="text-slate-400 mt-2">The Global Operating System for the Carbon Economy</p>
        </div>
        <div className="glass-card px-6 py-3 border border-cyan-500/20">
          <p className="text-xs text-slate-400">Last Updated</p>
          <p className="text-sm text-white font-semibold mt-1">
            {new Date().toLocaleString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const tone = toneClasses[stat.tone];
          return (
            <div key={index} className="stat-card premium-stat-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tone.iconBox}`}>
                  <Icon className={`w-6 h-6 ${tone.icon}`} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                  stat.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Real-time Emission Ticker */}
      <div className="glass-card p-6 premium-highlight-panel">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-syne text-white mb-2">Real-time Emissions</h3>
            <p className="text-gray-400 text-sm">Live carbon emissions tracking</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold font-syne bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              {emissionValue.toFixed(2)}
            </div>
            <p className="text-gray-400 text-sm mt-1">tCO₂e/hour</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emission Trends */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-syne text-white mb-4">Emission Trends by Scope</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={emissionData}>
              <defs>
                <linearGradient id="colorScope1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorScope2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorScope3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#172439" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#091426', 
                  border: '1px solid rgba(34,211,238,0.2)',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Legend />
              <Area type="monotone" dataKey="scope1" stroke="#10b981" fillOpacity={1} fill="url(#colorScope1)" name="Scope 1" />
              <Area type="monotone" dataKey="scope2" stroke="#22d3ee" fillOpacity={1} fill="url(#colorScope2)" name="Scope 2" />
              <Area type="monotone" dataKey="scope3" stroke="#a855f7" fillOpacity={1} fill="url(#colorScope3)" name="Scope 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* ESG Performance */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-syne text-white mb-4">ESG Performance Radar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={esgData}>
              <PolarGrid stroke="#172439" />
              <PolarAngleAxis dataKey="category" stroke="#94a3b8" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" />
              <Radar name="Score" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#091426', 
                  border: '1px solid rgba(34,211,238,0.2)',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-syne text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Recent Alerts
          </h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'warning' 
                    ? 'bg-yellow-500/10 border-yellow-500' 
                    : alert.type === 'success' 
                    ? 'bg-green-500/10 border-green-500' 
                    : 'bg-red-500/10 border-red-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm text-white flex-1">{alert.message}</p>
                  {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-green-400 ml-2" />}
                </div>
                <p className="text-xs text-gray-400 mt-2">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-syne text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.path}
                className={`p-4 rounded-lg bg-gradient-to-br ${action.color} hover:scale-105 transition-transform cursor-pointer shadow-lg`}
              >
                <p className="text-white font-semibold text-sm">{action.title}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
