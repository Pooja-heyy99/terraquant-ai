import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calculator, 
  Map, 
  Trophy, 
  ShoppingCart, 
  MessageSquare,
  Zap,
  Shield,
  Upload,
  CloudRain,
  Activity,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Leaf,
  BookOpen
} from 'lucide-react';

const Sidebar = ({ collapsed, onToggleCollapse }) => {
  const [carbonPrice, setCarbonPrice] = useState(84.50);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCarbonPrice(prev => prev + (Math.random() - 0.5) * 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/emission-predictor', icon: Calculator, label: 'Emission Predictor' },
    { path: '/map', icon: Map, label: 'Carbon Map' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/marketplace', icon: ShoppingCart, label: 'Marketplace' },
    { path: '/copilot', icon: MessageSquare, label: 'AI Copilot' },
    { path: '/optimize', icon: Zap, label: 'Optimize' },
    { path: '/fraud-detector', icon: Shield, label: 'Fraud Detector' },
    { path: '/image-upload', icon: Upload, label: 'Image Analysis' },
    { path: '/climate-risk', icon: CloudRain, label: 'Climate Risk' },
    { path: '/realtime-monitor', icon: Activity, label: 'Real-time Monitor' },
    { path: '/forecast', icon: TrendingUp, label: 'Forecast' },
  ];

  return (
    <div 
      className={`sidebar-panel h-full transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold font-syne bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  TerraQuant AI
                </h1>
                <p className="text-xs text-gray-400">Global Carbon OS</p>
              </div>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Carbon Price Ticker */}
      <div className={`p-4 border-b border-white/10 ${collapsed ? 'hidden' : 'block'}`}>
        <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-lg p-3 border border-green-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Carbon Price</span>
            <span className={`text-xs ${carbonPrice > 84.5 ? 'text-green-400' : 'text-red-400'}`}>
              {carbonPrice > 84.5 ? '▲' : '▼'} {Math.abs(carbonPrice - 84.5).toFixed(2)}%
            </span>
          </div>
          <div className="mt-1">
            <span className="text-2xl font-bold font-syne text-green-400">
              ${carbonPrice.toFixed(2)}
            </span>
            <span className="text-xs text-gray-400 ml-1">/tCO₂</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-green-300 border border-green-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
              title={collapsed ? item.label : ''}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-green-400' : ''}`} />
              {!collapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {!collapsed && isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t border-white/10 space-y-3 ${collapsed ? 'hidden' : 'block'}`}>
        <Link
          to="/how-it-works"
          className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-cyan-300 text-sm font-semibold"
        >
          <BookOpen className="w-4 h-4" />
          How It Works
        </Link>
        <div className="text-xs text-gray-500 text-center pt-2 border-t border-white/10">
          <p>© 2026 TerraQuant AI</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
