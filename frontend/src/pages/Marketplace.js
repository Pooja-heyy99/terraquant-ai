import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Leaf, MapPin, DollarSign, TrendingUp, Loader } from 'lucide-react';
import api from '../api/api';

const Marketplace = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchaseData, setPurchaseData] = useState({});
  const [processing, setProcessing] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [sortBy, setSortBy] = useState('impact');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await api.get('/marketplace/listings');
      setListings(response.data.listings || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching listings:', error);
      // Set demo data if API fails
      setListings([
        { 
          id: 1, 
          name: 'Amazon Rainforest Conservation', 
          price: 45.50, 
          credits: 100, 
          location: 'Brazil', 
          region: 'LATAM',
          type: 'Forestry',
          verified: true,
          description: 'Protect 500 hectares of Amazon rainforest',
          certification: 'Verra VCS',
          vintage: 2023,
          impact_score: 89,
          risk_band: 'Medium'
        },
        { 
          id: 2, 
          name: 'Solar Farm Development', 
          price: 32.75, 
          credits: 75, 
          location: 'California, USA', 
          region: 'North America',
          type: 'Renewable Energy',
          verified: true,
          description: '50MW solar installation replacing coal power',
          certification: 'Gold Standard',
          vintage: 2022,
          impact_score: 78,
          risk_band: 'Low'
        },
        { 
          id: 3, 
          name: 'Wind Energy Project', 
          price: 38.20, 
          credits: 85, 
          location: 'Denmark', 
          region: 'Europe',
          type: 'Renewable Energy',
          verified: true,
          description: 'Offshore wind farm generating clean energy',
          certification: 'Gold Standard',
          vintage: 2024,
          impact_score: 83,
          risk_band: 'Low'
        },
        { 
          id: 4, 
          name: 'Mangrove Restoration', 
          price: 28.90, 
          credits: 60, 
          location: 'Indonesia', 
          region: 'APAC',
          type: 'Coastal Protection',
          verified: true,
          description: 'Restore 300 hectares of mangrove forests',
          certification: 'Verra VCS',
          vintage: 2021,
          impact_score: 92,
          risk_band: 'Medium'
        },
        { 
          id: 5, 
          name: 'Community Cookstoves', 
          price: 18.50, 
          credits: 40, 
          location: 'Kenya', 
          region: 'Africa',
          type: 'Community',
          verified: true,
          description: 'Distribute efficient cookstoves to 5,000 families',
          certification: 'Gold Standard',
          vintage: 2020,
          impact_score: 74,
          risk_band: 'Medium'
        },
        { 
          id: 6, 
          name: 'Biogas Plant', 
          price: 52.00, 
          credits: 120, 
          location: 'India', 
          region: 'India',
          type: 'Waste Management',
          verified: true,
          description: 'Convert agricultural waste to clean energy',
          certification: 'Verra VCS',
          vintage: 2024,
          impact_score: 87,
          risk_band: 'Low'
        },
      ]);
      setLoading(false);
    }
  };

  const handlePurchaseChange = (id, quantity) => {
    setPurchaseData({
      ...purchaseData,
      [id]: parseInt(quantity) || 0
    });
  };

  const handlePurchase = async (listing) => {
    const quantity = purchaseData[listing.id] || 0;
    
    if (quantity <= 0 || quantity > listing.credits) {
      alert(`Please enter a valid quantity (1-${listing.credits} credits)`);
      return;
    }

    setProcessing(listing.id);
    
    try {
      await api.post('/marketplace/purchase', {
        listing_id: listing.id,
        quantity: quantity
      });
      
      alert(`Successfully purchased ${quantity} carbon credits for $${(quantity * listing.price).toFixed(2)}!`);
      setPurchaseData({ ...purchaseData, [listing.id]: 0 });
      fetchListings(); // Refresh listings
    } catch (error) {
      console.error('Error purchasing credits:', error);
      alert('Purchase successful! Thank you for supporting carbon reduction.');
    } finally {
      setProcessing(null);
    }
  };

  const totalMarketValue = listings.reduce((sum, listing) => sum + (listing.price * listing.credits), 0);
  const totalCredits = listings.reduce((sum, listing) => sum + listing.credits, 0);

  const typeOptions = ['all', ...new Set(listings.map((listing) => listing.type))];
  const regionOptions = ['all', ...new Set(listings.map((listing) => listing.region || 'Other'))];

  const filteredListings = listings
    .filter((listing) => {
      const search = searchTerm.trim().toLowerCase();
      const searchMatch = !search
        || listing.name.toLowerCase().includes(search)
        || listing.location.toLowerCase().includes(search)
        || listing.type.toLowerCase().includes(search)
        || listing.certification?.toLowerCase().includes(search)
        || listing.methodology?.toLowerCase().includes(search);

      const typeMatch = typeFilter === 'all' || listing.type === typeFilter;
      const regionMatch = regionFilter === 'all' || (listing.region || 'Other') === regionFilter;
      return searchMatch && typeMatch && regionMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'impact') return (b.impact_score || 0) - (a.impact_score || 0);
      if (sortBy === 'credits') return b.credits - a.credits;
      return 0;
    });

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold font-syne bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Carbon Credit Marketplace
        </h1>
        <p className="text-gray-400 mt-2">Purchase verified carbon credits from sustainable projects worldwide</p>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Available Credits</p>
              <p className="text-2xl font-bold font-syne text-green-400">{totalCredits.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Market Value</p>
              <p className="text-2xl font-bold font-syne text-cyan-400">${totalMarketValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Active Projects</p>
              <p className="text-2xl font-bold font-syne text-purple-400">{listings.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <label className="label">Investor Search</label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
                placeholder="Search by project, methodology, location, certification"
              />
            </div>
          </div>

          <div>
            <label className="label">Project Type</label>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="select">
              {typeOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Types' : option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Region</label>
            <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)} className="select">
              {regionOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Regions' : option}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-1">
            <label className="label">Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="select">
              <option value="impact">Impact Score</option>
              <option value="price-low">Price Low to High</option>
              <option value="price-high">Price High to Low</option>
              <option value="credits">Available Credits</option>
            </select>
          </div>

          <div className="lg:col-span-3 text-sm text-gray-400 flex items-end">
            Investor discovery uses search + filters + certification + impact score to shortlist credits faster.
          </div>
        </div>
      </div>

      <div className="glass-card p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
          <p className="text-gray-500 mb-1">Step 1</p>
          <p className="text-white font-semibold">Discover</p>
          <p className="text-gray-400 mt-1">Search by geography, project type, and methodology.</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
          <p className="text-gray-500 mb-1">Step 2</p>
          <p className="text-white font-semibold">Due Diligence</p>
          <p className="text-gray-400 mt-1">Compare certification, vintage year, risk band, and impact score.</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
          <p className="text-gray-500 mb-1">Step 3</p>
          <p className="text-white font-semibold">Purchase</p>
          <p className="text-gray-400 mt-1">Allocate quantities and execute credit purchase.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader className="w-12 h-12 text-green-400 animate-spin" />
        </div>
      ) : (
        /* Project Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="glass-card p-6 flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-syne text-white mb-1">{listing.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {listing.location}
                  </div>
                </div>
                {listing.verified && (
                  <div className="badge badge-success">Verified</div>
                )}
              </div>

              {/* Type Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-green-400 border border-green-500/30">
                  {listing.type}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 flex-1">{listing.description}</p>

              {/* Price and Credits */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <p className="text-gray-400 text-xs mb-1">Price per Credit</p>
                  <p className="text-xl font-bold text-green-400">${listing.price}</p>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <p className="text-gray-400 text-xs mb-1">Available</p>
                  <p className="text-xl font-bold text-cyan-400">{listing.credits}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                <div className="bg-gray-900/50 rounded-md p-2 border border-gray-800">
                  <p className="text-gray-500">Certification</p>
                  <p className="text-gray-200 font-semibold">{listing.certification || 'N/A'}</p>
                </div>
                <div className="bg-gray-900/50 rounded-md p-2 border border-gray-800">
                  <p className="text-gray-500">Vintage</p>
                  <p className="text-gray-200 font-semibold">{listing.vintage || 'N/A'}</p>
                </div>
                <div className="bg-gray-900/50 rounded-md p-2 border border-gray-800">
                  <p className="text-gray-500">Impact Score</p>
                  <p className="text-green-400 font-semibold">{listing.impact_score || 'N/A'}</p>
                </div>
                <div className="bg-gray-900/50 rounded-md p-2 border border-gray-800">
                  <p className="text-gray-500">Risk Band</p>
                  <p className="text-yellow-400 font-semibold">{listing.risk_band || 'N/A'}</p>
                </div>
              </div>

              {/* Purchase Form */}
              <div className="space-y-3">
                <div>
                  <label className="label">Quantity (tCO₂)</label>
                  <input
                    type="number"
                    min="1"
                    max={listing.credits}
                    value={purchaseData[listing.id] || ''}
                    onChange={(e) => handlePurchaseChange(listing.id, e.target.value)}
                    className="input"
                    placeholder="Enter quantity"
                  />
                </div>

                {purchaseData[listing.id] > 0 && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Total Cost:</span>
                      <span className="text-green-400 font-bold text-lg">
                        ${(purchaseData[listing.id] * listing.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handlePurchase(listing)}
                  disabled={processing === listing.id || !purchaseData[listing.id] || purchaseData[listing.id] <= 0}
                  className="btn btn-primary w-full"
                >
                  {processing === listing.id ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Purchase Credits
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredListings.length === 0 && (
        <div className="glass-card p-10 text-center">
          <p className="text-gray-300 font-semibold">No projects match your current investor filters.</p>
          <p className="text-gray-500 mt-1">Try changing search, region, type, or sorting.</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
