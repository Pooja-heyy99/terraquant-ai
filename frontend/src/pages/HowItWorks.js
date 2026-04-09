import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Map,
  Zap,
  MessageCircle,
  TrendingUp,
  Shield,
  Image,
  Droplets,
  Activity,
  Leaf,
  Users,
  Target,
  ChevronDown
} from 'lucide-react';

const HowItWorks = () => {
  const navigate = useNavigate();
  const [expandedFeature, setExpandedFeature] = useState(0);

  const features = [
    {
      icon: BarChart3,
      title: 'Emission Predictor',
      shortDesc: 'Calculate your carbon footprint',
      fullDesc: 'Enter your company\'s energy use, employee count, and revenue. TerraQuant instantly calculates your total carbon emissions across all operations. No complex spreadsheets needed!'
    },
    {
      icon: Map,
      title: 'Global Emissions Map',
      shortDesc: 'See where emissions happen',
      fullDesc: 'View your facilities and operations on a map. See which locations produce the most pollution. Helps you identify hotspots that need urgent attention.'
    },
    {
      icon: Zap,
      title: 'AI Copilot Chat',
      shortDesc: 'Get expert advice instantly',
      fullDesc: 'Ask our AI anything about carbon emissions, sustainability, or ESG. Get instant answers with actionable tips in simple language. Like having a sustainability expert in your pocket!'
    },
    {
      icon: TrendingUp,
      title: 'Optimize Emissions',
      shortDesc: 'Find the best reduction strategies',
      fullDesc: 'Tell us your budget and goals. Our AI recommends the most cost-effective ways to cut emissions. See savings and impact for each option.'
    },
    {
      icon: Shield,
      title: 'Fraud Detection',
      shortDesc: 'Verify your emissions claims',
      fullDesc: 'Spot fake or inflated emission reports. Keep everyone honest. Important for regulated industries and investors.'
    },
    {
      icon: Image,
      title: 'Satellite Image Analysis',
      shortDesc: 'Analyze photos and satellite images',
      fullDesc: 'Upload satellite photos or facility pictures. Our AI analyzes them to estimate emissions from land use, urban density, or industrial equipment.'
    },
    {
      icon: Droplets,
      title: 'Climate Risk Assessment',
      shortDesc: 'Check climate threats to your business',
      fullDesc: 'Find out if your facilities are at risk from flooding, heatwaves, storms, or droughts. Plan resilience before disaster strikes.'
    },
    {
      icon: Activity,
      title: 'Real-Time Monitoring',
      shortDesc: 'Watch emissions live',
      fullDesc: 'Track your emissions in real time. See daily, weekly, and monthly trends. Spot changes instantly. No waiting for quarterly reports!'
    },
    {
      icon: TrendingUp,
      title: 'Emission Forecast',
      shortDesc: 'Predict future emissions',
      fullDesc: 'Based on current trends, we forecast your emissions 1–5 years ahead. See the impact of growth or reduction initiatives before they happen.'
    },
    {
      icon: Leaf,
      title: 'Carbon Credit Marketplace',
      shortDesc: 'Buy verified carbon credits',
      fullDesc: 'Offset unavoidable emissions by buying verified credits from real projects like forests and renewable energy. All projects are certified by trusted standards.'
    },
    {
      icon: Users,
      title: 'Leaderboard',
      shortDesc: 'Compare your progress',
      fullDesc: 'See where your company ranks in sustainability. Compare with peers in your industry. Get inspired and stay competitive!'
    },
    {
      icon: Target,
      title: 'ESG Reporting',
      shortDesc: 'Prepare reports for regulators',
      fullDesc: 'Generate ESG (Environmental, Social, Governance) reports for investors and regulators. Formats for SASB, TCFD, and CDP frameworks.'
    }
  ];

  const scopes = [
    {
      name: 'Scope 1: Direct Emissions',
      icon: '🏭',
      description: 'Pollution from your own sources: company vehicles, factory smokestacks, delivery trucks.'
    },
    {
      name: 'Scope 2: Purchased Energy',
      icon: '⚡',
      description: 'Pollution from electricity, heat, and cooling you buy from utilities. Usually smaller than Scope 1.'
    },
    {
      name: 'Scope 3: Indirect Supply Chain',
      icon: '🔗',
      description: 'Pollution from suppliers, products, customer use, and waste. Often the largest source (70–90% of total!).'
    }
  ];

  const steps = [
    { number: 1, title: 'Sign Up', description: 'Create your account and tell us about your company.' },
    { number: 2, title: 'Enter Your Data', description: 'Provide energy usage, employee count, and location data.' },
    { number: 3, title: 'Get Your Baseline', description: 'TerraQuant calculates your current carbon footprint.' },
    { number: 4, title: 'Explore Features', description: 'Use maps, AI advisor, and optimization tools.' },
    { number: 5, title: 'Plan & Reduce', description: 'Set targets and execute reduction strategies.' },
    { number: 6, title: 'Report & Track', description: 'Generate reports and monitor progress over time.' }
  ];

  return (
    <div className="animate-fade-in space-y-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-950 via-dark-950 to-cyan-950 px-8 py-20 -mx-8 mb-0">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold font-syne mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Welcome to TerraQuant AI
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your complete carbon management platform. Measure. Reduce. Report. Succeed.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="btn btn-primary px-8 flex items-center gap-2"
            >
              Go to Dashboard <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/copilot')}
              className="px-8 py-3 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> Ask AI Advisor
            </button>
          </div>
        </div>
      </section>

      {/* What is Carbon? */}
      <section className="px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-syne text-white mb-4">What is Carbon Footprint?</h2>
          <p className="text-gray-300 text-lg mb-6">
            A <strong>carbon footprint</strong> is the total amount of greenhouse gas pollution your company creates.
            It comes from energy, transportation, manufacturing, and supply chains.
          </p>
          <p className="text-gray-300 text-lg mb-8">
            <strong>Why care?</strong> Emissions drive climate change, hurt your brand, attract regulations, and cost money.
            Companies that reduce emissions save costs, attract investors, and win customers.
          </p>

          {/* The 3 Scopes */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-syne text-white mb-6">The 3 Types of Emissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {scopes.map((scope, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="text-5xl mb-4">{scope.icon}</div>
                  <h4 className="text-lg font-bold text-green-400 mb-2">{scope.name}</h4>
                  <p className="text-gray-300">{scope.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="px-8 py-12 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-syne text-white mb-8 text-center">Get Started in 6 Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="glass-card p-6 text-center hover:scale-105 transition-transform">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                  {step.number}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold font-syne text-white mb-2">Features Explained</h2>
          <p className="text-gray-400 mb-8">Click any feature to learn more.</p>

          <div className="space-y-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              const isExpanded = expandedFeature === idx;

              return (
                <div
                  key={idx}
                  className="glass-card overflow-hidden hover:border-green-500/50 transition-all cursor-pointer"
                  onClick={() => setExpandedFeature(isExpanded ? -1 : idx)}
                >
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{feature.title}</h4>
                        <p className="text-sm text-gray-400">{feature.shortDesc}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>

                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-gray-800 mt-4 pt-4">
                      <p className="text-gray-300 leading-relaxed">{feature.fullDesc}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const path = feature.title.toLowerCase().replace(/\s+/g, '-');
                          const pathMap = {
                            'emission-predictor': '/emission-predictor',
                            'global-emissions-map': '/map',
                            'ai-copilot-chat': '/copilot',
                            'optimize-emissions': '/optimize',
                            'fraud-detection': '/fraud-detector',
                            'satellite-image-analysis': '/image-upload',
                            'climate-risk-assessment': '/climate-risk',
                            'real-time-monitoring': '/realtime-monitor',
                            'emission-forecast': '/forecast',
                            'carbon-credit-marketplace': '/marketplace',
                            'leaderboard': '/leaderboard',
                            'esg-reporting': '/'
                          };
                          navigate(pathMap[path] || '/');
                        }}
                        className="mt-4 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors"
                      >
                        Try It Now →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* User Interface Basics */}
      <section className="px-8 py-12 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-syne text-white mb-8">How to Navigate the Website</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-green-400 mb-4">Left Sidebar Menu</h3>
              <p className="text-gray-300 mb-4">
                The menu on the left side shows all features. Click any icon or name to jump to that page.
              </p>
              <div className="bg-gray-800/50 rounded p-4 text-sm text-gray-300">
                • <strong>Dashboard</strong> - See overview and key stats<br />
                • <strong>Emission Predictor</strong> - Calculate your carbon<br />
                • <strong>Map</strong> - View emissions by location<br />
                • <strong>Copilot</strong> - Chat with AI advisor<br />
                • <strong>More tools</strong> - Scroll to see additional features
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Voice Button</h3>
              <p className="text-gray-300 mb-4">
                Bottom right corner has a microphone. Click it to give voice commands!
              </p>
              <div className="bg-gray-800/50 rounded p-4 text-sm text-gray-300">
                Try saying:<br />
                • "Go to dashboard"<br />
                • "Calculate emissions"<br />
                • "Show me the map"<br />
                • "Open AI copilot"
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-green-400 mb-4">Cards & Charts</h3>
              <p className="text-gray-300 mb-4">
                Most pages show data as cards and charts. Hover over them to see details. They update in real time.
              </p>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Buttons & Actions</h3>
              <p className="text-gray-300 mb-4">
                Green buttons = main action. Gray buttons = secondary. Blue links point to more info.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-syne text-white mb-8">Quick Tips to Get Started</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-green-500 pl-6 py-4">
              <h4 className="font-bold text-green-400 mb-2">💡 Start with the Dashboard</h4>
              <p className="text-gray-300 text-sm">
                The dashboard shows your key metrics at a glance. Start here to understand your carbon footprint.
              </p>
            </div>

            <div className="border-l-4 border-cyan-500 pl-6 py-4">
              <h4 className="font-bold text-cyan-400 mb-2">🤖 Ask the AI Copilot</h4>
              <p className="text-gray-300 text-sm">
                Stuck? Ask the AI anything about carbon, sustainability, or how to use the platform.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-4">
              <h4 className="font-bold text-green-400 mb-2">📊 Use the Predictor</h4>
              <p className="text-gray-300 text-sm">
                Enter your company data once. TerraQuant calculates emissions automatically from then on.
              </p>
            </div>

            <div className="border-l-4 border-cyan-500 pl-6 py-4">
              <h4 className="font-bold text-cyan-400 mb-2">🎯 Get Optimization Tips</h4>
              <p className="text-gray-300 text-sm">
                Use the Optimize tool to find budget-friendly ways to cut emissions by 10–50%.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-4">
              <h4 className="font-bold text-green-400 mb-2">🌍 Check the Map</h4>
              <p className="text-gray-300 text-sm">
                See which of your facilities produce the most pollution. Prioritize high-impact sites.
              </p>
            </div>

            <div className="border-l-4 border-cyan-500 pl-6 py-4">
              <h4 className="font-bold text-cyan-400 mb-2">📈 Track Over Time</h4>
              <p className="text-gray-300 text-sm">
                Monitor real-time data and forecasts. Watch your progress as you implement changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-16 bg-gradient-to-r from-green-950 to-cyan-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-syne text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Start measuring your carbon footprint today. Together, we can build a sustainable future.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary px-10 py-3 text-lg flex items-center gap-2 mx-auto"
          >
            Go to Dashboard <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
