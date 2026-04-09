import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, TrendingUp, Loader, BadgeCheck, AlertTriangle, Database, ExternalLink } from 'lucide-react';
import api from '../api/api';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [summary, setSummary] = useState({ total: 0, verified: 0, unverified: 0, source: 'demo fallback' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get('/leaderboard');
      setLeaderboardData(response.data.leaderboard || []);
      setSummary(response.data.summary || { total: 0, verified: 0, unverified: 0, source: 'demo fallback' });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // Demo fallback if API fails
      setLeaderboardData([
        { rank: 1, company: 'GreenTech Corp', score: 95.8, reduction: 32.5, industry: 'Technology', verified: false, verification_status: 'unverified', source_name: 'Demo dataset', source_url: '' },
        { rank: 2, company: 'EcoSolutions Ltd', score: 92.3, reduction: 28.7, industry: 'Manufacturing', verified: false, verification_status: 'unverified', source_name: 'Demo dataset', source_url: '' },
        { rank: 3, company: 'Carbon Zero Inc', score: 89.5, reduction: 25.3, industry: 'Energy', verified: false, verification_status: 'unverified', source_name: 'Demo dataset', source_url: '' },
        { rank: 4, company: 'Sustainable Ventures', score: 86.1, reduction: 22.8, industry: 'Retail', verified: false, verification_status: 'unverified', source_name: 'Demo dataset', source_url: '' },
        { rank: 5, company: 'Clean Energy Co', score: 84.7, reduction: 20.5, industry: 'Transportation', verified: false, verification_status: 'unverified', source_name: 'Demo dataset', source_url: '' },
        { rank: 6, company: 'Earth First Global', score: 82.3, reduction: 18.9, industry: 'Finance', verified: false, verification_status: 'unverified', source_name: 'Demo dataset', source_url: '' },
        { rank: 7, company: 'Green Horizon', score: 79.8, reduction: 16.4, industry: 'Healthcare', verified: false, verification_status: 'unverified', source_name: 'Demo dataset', source_url: '' },
        { rank: 8, company: 'EcoTech Systems', score: 77.2, reduction: 14.7, industry: 'Technology', verified: false, verification_status: 'unverified', source_name: 'Demo dataset', source_url: '' },
        { rank: 9, company: 'Net Zero Partners', score: 74.5, reduction: 12.3, industry: 'Manufacturing', verified: false, verification_status: 'unverified', source_name: 'Demo dataset', source_url: '' },
        { rank: 10, company: 'Climate Champions', score: 71.9, reduction: 10.8, industry: 'Agriculture', verified: false, verification_status: 'unverified', source_name: 'Demo dataset', source_url: '' },
      ]);
      setSummary({ total: 10, verified: 0, unverified: 10, source: 'demo fallback' });
      setLoading(false);
    }
  };

  const getVerificationBadge = (entry) => {
    if (entry.verified || entry.verification_status === 'verified') {
      return {
        label: 'Verified',
        className: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
        icon: BadgeCheck,
      };
    }

    return {
      label: 'Unverified',
      className: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
      icon: AlertTriangle,
    };
  };

  const getPodiumColor = (rank) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-gray-300 to-gray-500';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    return 'from-gray-700 to-gray-900';
  };

  const getPodiumIcon = (rank) => {
    if (rank === 1) return Trophy;
    if (rank === 2) return Medal;
    if (rank === 3) return Award;
    return null;
  };

  const topThree = leaderboardData.slice(0, 3);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold font-syne bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Sustainability Leaderboard
        </h1>
        <p className="text-gray-400 mt-2">Top performers in carbon reduction and ESG excellence</p>
        <p className="text-gray-500 text-sm mt-2 max-w-3xl">
          This leaderboard sorts verified records ahead of unverified records. Connect it to audited ESG,
          emissions, or investment data to rank real companies, projects, or portfolios.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gray-900/60 border border-gray-700 text-gray-300">
            <Database className="w-4 h-4 text-cyan-400" />
            Source: {summary.source}
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gray-900/60 border border-gray-700 text-gray-300">
            <BadgeCheck className="w-4 h-4 text-emerald-400" />
            Verified: {summary.verified}
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gray-900/60 border border-gray-700 text-gray-300">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Unverified: {summary.unverified}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader className="w-12 h-12 text-green-400 animate-spin" />
        </div>
      ) : (
        <>
          {/* Podium - Top 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {topThree.map((entry) => {
              const Icon = getPodiumIcon(entry.rank);
              return (
                <div
                  key={entry.rank}
                  className={`glass-card p-6 text-center transform transition-all hover:scale-105 ${
                    entry.rank === 1 ? 'md:order-2 md:-mt-8' : entry.rank === 2 ? 'md:order-1' : 'md:order-3'
                  }`}
                >
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${getPodiumColor(entry.rank)} flex items-center justify-center shadow-2xl mb-4`}>
                    {Icon && <Icon className="w-10 h-10 text-white" />}
                  </div>
                  
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                    entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                    entry.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    #{entry.rank} Place
                  </div>
                  
                  <h3 className="text-xl font-bold font-syne text-white mb-2">{entry.company}</h3>
                  <p className="text-gray-400 text-sm mb-4">{entry.industry}</p>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    {(() => {
                      const badge = getVerificationBadge(entry);
                      const Icon = badge.icon;
                      return (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${badge.className}`}>
                          <Icon className="w-3.5 h-3.5" />
                          {badge.label}
                        </span>
                      );
                    })()}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Score</span>
                      <span className="text-green-400 font-bold text-lg">{entry.score}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Reduction</span>
                      <span className="text-cyan-400 font-semibold">{entry.reduction}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full Leaderboard Table */}
          <div className="glass-card p-6">
            <h2 className="text-2xl font-syne text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-400" />
              Complete Rankings
            </h2>
            
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Company</th>
                    <th>Industry</th>
                    <th>Status</th>
                    <th>Source</th>
                    <th>Score</th>
                    <th>CO₂ Reduction</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((entry) => (
                    <tr key={entry.rank}>
                      <td>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          entry.rank <= 3 ? 'bg-gradient-to-br ' + getPodiumColor(entry.rank) + ' text-white' : 'bg-gray-800 text-gray-400'
                        }`}>
                          {entry.rank}
                        </div>
                      </td>
                      <td className="font-semibold text-white">{entry.company}</td>
                      <td className="text-gray-400">{entry.industry}</td>
                      <td>
                        {(() => {
                          const badge = getVerificationBadge(entry);
                          const Icon = badge.icon;
                          return (
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${badge.className}`}>
                              <Icon className="w-3.5 h-3.5" />
                              {badge.label}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="text-gray-400 text-sm">
                        <div className="flex items-center gap-2">
                          <span>{entry.source_name || 'Demo dataset'}</span>
                          {entry.source_url ? (
                            <a href={entry.source_url} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : null}
                        </div>
                      </td>
                      <td>
                        <span className="text-green-400 font-bold text-lg">{entry.score}</span>
                        <span className="text-gray-500 text-sm">/100</span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-cyan-400" />
                          <span className="text-cyan-400 font-semibold">{entry.reduction}%</span>
                        </div>
                      </td>
                      <td>
                        <div className="w-full max-w-[200px]">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${entry.score}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <p className="text-gray-400 text-sm mb-1">Average Score</p>
              <p className="text-3xl font-bold font-syne text-green-400">
                {(leaderboardData.reduce((sum, entry) => sum + entry.score, 0) / leaderboardData.length).toFixed(1)}
              </p>
            </div>
            
            <div className="glass-card p-6">
              <p className="text-gray-400 text-sm mb-1">Avg. Reduction</p>
              <p className="text-3xl font-bold font-syne text-cyan-400">
                {(leaderboardData.reduce((sum, entry) => sum + entry.reduction, 0) / leaderboardData.length).toFixed(1)}%
              </p>
            </div>
            
            <div className="glass-card p-6">
              <p className="text-gray-400 text-sm mb-1">Total Companies</p>
              <p className="text-3xl font-bold font-syne bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                {leaderboardData.length}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
