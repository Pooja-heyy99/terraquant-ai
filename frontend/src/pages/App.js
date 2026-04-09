import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import VoiceButton from '../components/VoiceButton';
import HowItWorks from './HowItWorks';
import Dashboard from './Dashboard';
import EmissionPredictor from './EmissionPredictor';
import MapPage from './MapPage';
import Leaderboard from './Leaderboard';
import Marketplace from './Marketplace';
import Copilot from './Copilot';
import Optimize from './Optimize';
import { 
  FraudDetector, 
  ImageUpload, 
  ClimateRisk, 
  RealtimeMonitor, 
  Forecast 
} from './OtherPages';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Router>
      <Routes>
        {/* How It Works - no sidebar */}
        <Route path="/how-it-works" element={<HowItWorks />} />
        
        {/* All other pages with sidebar */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-dark-950 p-2 md:p-3">
              <div className="app-frame flex min-h-[calc(100vh-1rem)] overflow-hidden md:min-h-[calc(100vh-1.5rem)]">
                <Sidebar
                  collapsed={sidebarCollapsed}
                  onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
                />

                <main className="flex-1 overflow-y-auto">
                  <div className="p-4 md:p-7 min-h-full">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/emission-predictor" element={<EmissionPredictor />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/copilot" element={<Copilot />} />
                    <Route path="/optimize" element={<Optimize />} />
                    <Route path="/fraud-detector" element={<FraudDetector />} />
                    <Route path="/image-upload" element={<ImageUpload />} />
                    <Route path="/climate-risk" element={<ClimateRisk />} />
                    <Route path="/realtime-monitor" element={<RealtimeMonitor />} />
                    <Route path="/forecast" element={<Forecast />} />
                  </Routes>
                </div>
                </main>

                <VoiceButton />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
