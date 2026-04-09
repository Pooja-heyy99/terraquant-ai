import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { Map as MapIcon, Filter, Loader } from 'lucide-react';
import api from '../api/api';
import 'leaflet/dist/leaflet.css';

const INDIA_CENTER = [22.9734, 78.6569];
const GLOBAL_CENTER = [20, 0];

const MapViewportController = ({ scope }) => {
  const map = useMap();

  useEffect(() => {
    if (scope === 'india') {
      map.setView(INDIA_CENTER, 5, { animate: true });
    } else {
      map.setView(GLOBAL_CENTER, 2, { animate: true });
    }
  }, [scope, map]);

  return null;
};

const MapPage = () => {
  const [mapData, setMapData] = useState([]);
  const [riskZones, setRiskZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedScope, setSelectedScope] = useState('global');

  useEffect(() => {
    fetchMapData();
    fetchRiskZones();
  }, []);

  const fetchMapData = async () => {
    try {
      const response = await api.get('/map-data');
      setMapData(response.data.locations || []);
    } catch (error) {
      console.error('Error fetching map data:', error);
      // Set demo data if API fails
      setMapData([
        { lat: 28.6139, lng: 77.2090, emission: 1320, name: 'Delhi Operations Hub', risk: 'high', country: 'India' },
        { lat: 19.0760, lng: 72.8777, emission: 1185, name: 'Mumbai Logistics Cluster', risk: 'medium', country: 'India' },
        { lat: 12.9716, lng: 77.5946, emission: 940, name: 'Bengaluru Tech Campus', risk: 'low', country: 'India' },
        { lat: 13.0827, lng: 80.2707, emission: 1240, name: 'Chennai Manufacturing Unit', risk: 'high', country: 'India' },
        { lat: 37.7749, lng: -122.4194, emission: 1100, name: 'San Francisco HQ', risk: 'medium', country: 'USA' },
        { lat: 51.5074, lng: -0.1278, emission: 950, name: 'London Office', risk: 'low', country: 'UK' },
      ]);
    }
  };

  const fetchRiskZones = async () => {
    try {
      const response = await api.get('/climate-risk-zones');
      setRiskZones(response.data.zones || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching risk zones:', error);
      // Set demo data if API fails
      setRiskZones([
        { lat: 28.6139, lng: 77.2090, risk: 'critical', name: 'Delhi Heat Stress Belt', country: 'India' },
        { lat: 19.0760, lng: 72.8777, risk: 'high', name: 'Mumbai Coastal Flood Zone', country: 'India' },
        { lat: 13.0827, lng: 80.2707, risk: 'high', name: 'Chennai Cyclone Exposure Zone', country: 'India' },
        { lat: 34.0522, lng: -118.2437, risk: 'medium', name: 'Los Angeles Area', country: 'USA' },
      ]);
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    const colors = {
      low: '#10b981',
      medium: '#fbbf24',
      high: '#f97316',
      critical: '#ef4444'
    };
    return colors[risk] || '#94a3b8';
  };

  const getCircleRadius = (emission) => {
    return Math.max(10, Math.min(emission / 50, 40));
  };

  const inScope = (item) => {
    if (selectedScope === 'global') return true;
    return item.country === 'India' || item.location === 'India' || item.name?.toLowerCase().includes('india');
  };

  const hasValidCoordinates = (item) => (
    Number.isFinite(item?.lat)
    && Number.isFinite(item?.lng)
    && item.lat >= -90
    && item.lat <= 90
    && item.lng >= -180
    && item.lng <= 180
  );

  const filteredData = mapData.filter((item) => {
    const filterPass = selectedFilter === 'all' ? true : item.risk === selectedFilter;
    return filterPass && inScope(item) && hasValidCoordinates(item);
  });

  const filteredRiskZones = riskZones.filter((zone) => inScope(zone) && hasValidCoordinates(zone));

  const totalEmission = filteredData.reduce((sum, loc) => sum + (loc.emission || 0), 0);
  const averageEmission = filteredData.length ? (totalEmission / filteredData.length).toFixed(0) : '0';

  const filters = [
    { label: 'All', value: 'all', color: 'from-gray-500 to-gray-600' },
    { label: 'Low Risk', value: 'low', color: 'from-green-500 to-emerald-600' },
    { label: 'Medium Risk', value: 'medium', color: 'from-yellow-500 to-orange-500' },
    { label: 'High Risk', value: 'high', color: 'from-orange-500 to-red-500' },
    { label: 'Critical', value: 'critical', color: 'from-red-500 to-red-700' },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold font-syne tracking-tight bg-gradient-to-r from-green-300 to-cyan-300 bg-clip-text text-transparent">
            Global Carbon Map
          </h1>
          <p className="text-slate-400 mt-2">Global emissions monitoring and climate risk zones</p>
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="stat-card premium-stat-card">
          <p className="stat-label">Tracked Locations</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="stat-value">{filteredData.length}</p>
            <MapIcon className="w-8 h-8 text-cyan-300" />
          </div>
        </div>

        <div className="stat-card premium-stat-card">
          <p className="stat-label">Risk Zones</p>
          <p className="stat-value mt-2">{filteredRiskZones.length}</p>
          <p className="text-xs text-slate-400 mt-1">Climate exposure hotspots</p>
        </div>

        <div className="stat-card premium-stat-card">
          <p className="stat-label">Total Emissions</p>
          <p className="stat-value mt-2">{(totalEmission / 1000).toFixed(2)}k</p>
          <p className="text-xs text-slate-400 mt-1">tCO₂e aggregate</p>
        </div>

        <div className="stat-card premium-stat-card">
          <p className="stat-label">Average Emission</p>
          <p className="stat-value mt-2">{averageEmission}</p>
          <p className="text-xs text-slate-400 mt-1">tCO₂e per location</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-slate-400 text-sm font-semibold">View:</span>
            <button
              onClick={() => setSelectedScope('global')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                selectedScope === 'global'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105'
                  : 'bg-slate-900/70 text-slate-400 border border-white/10 hover:bg-slate-800/80'
              }`}
            >
              Global
            </button>
            <button
              onClick={() => setSelectedScope('india')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                selectedScope === 'india'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg scale-105'
                  : 'bg-slate-900/70 text-slate-400 border border-white/10 hover:bg-slate-800/80'
              }`}
            >
              India Focus
            </button>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
          <Filter className="w-5 h-5 text-slate-400" />
          <span className="text-slate-400 text-sm font-semibold">Filter by Risk:</span>
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                selectedFilter === filter.value
                  ? `bg-gradient-to-r ${filter.color} text-white shadow-lg scale-105`
                  : 'bg-slate-900/70 text-slate-400 border border-white/10 hover:bg-slate-800/80'
              }`}
            >
              {filter.label}
            </button>
          ))}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="glass-card p-6">
        {loading ? (
          <div className="flex items-center justify-center h-[600px]">
            <Loader className="w-12 h-12 text-green-400 animate-spin" />
          </div>
        ) : (
          <div className="premium-map-shell rounded-xl overflow-hidden border border-cyan-500/20" style={{ height: '600px' }}>
            <MapContainer
              center={GLOBAL_CENTER}
              zoom={2}
              style={{ height: '100%', width: '100%' }}
              className="z-0 premium-leaflet-map"
            >
              <MapViewportController scope={selectedScope} />

              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              
              {/* Emission Markers */}
              {filteredData.map((location, index) => (
                <CircleMarker
                  key={`emission-${index}`}
                  center={[location.lat, location.lng]}
                  radius={getCircleRadius(location.emission)}
                  fillColor={getRiskColor(location.risk)}
                  color="#fff"
                  weight={2}
                  opacity={0.8}
                  fillOpacity={0.6}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-sm mb-1">{location.name}</h3>
                      <p className="text-xs text-gray-600 mb-1">
                        Emissions: <span className="font-semibold">{location.emission} tCO₂e</span>
                      </p>
                      <p className="text-xs">
                        Risk Level: 
                        <span 
                          className="ml-1 px-2 py-0.5 rounded-full text-white font-semibold"
                          style={{ backgroundColor: getRiskColor(location.risk) }}
                        >
                          {location.risk.toUpperCase()}
                        </span>
                      </p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}

              {/* Risk Zone Markers */}
              {filteredRiskZones.map((zone, index) => (
                <CircleMarker
                  key={`risk-${index}`}
                  center={[zone.lat, zone.lng]}
                  radius={30}
                  fillColor={getRiskColor(zone.risk)}
                  color={getRiskColor(zone.risk)}
                  weight={2}
                  opacity={0.3}
                  fillOpacity={0.1}
                  dashArray="5, 5"
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-sm mb-1">{zone.name}</h3>
                      <p className="text-xs">
                        Climate Risk: 
                        <span 
                          className="ml-1 px-2 py-0.5 rounded-full text-white font-semibold"
                          style={{ backgroundColor: getRiskColor(zone.risk) }}
                        >
                          {zone.risk.toUpperCase()}
                        </span>
                      </p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-syne text-white mb-4">Emission Intensity Legend</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500"></div>
              <span className="text-slate-300">Low Risk (&lt; 800 tCO₂e)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
              <span className="text-slate-300">Medium Risk (800-1200 tCO₂e)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-500"></div>
              <span className="text-slate-300">High Risk (1200-1600 tCO₂e)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500"></div>
              <span className="text-slate-300">Critical (&gt; 1600 tCO₂e)</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-syne text-white mb-4">Map Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Locations</span>
              <span className="text-white font-bold">{filteredData.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Climate Risk Zones</span>
              <span className="text-white font-bold">{filteredRiskZones.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Emissions</span>
              <span className="text-green-400 font-bold">
                {totalEmission.toLocaleString()} tCO₂e
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Average Emission</span>
              <span className="text-cyan-400 font-bold">
                {averageEmission} tCO₂e
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
