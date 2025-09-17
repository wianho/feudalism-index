import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { DollarSign, Home, GraduationCap, Heart, Shield, TrendingUp, AlertTriangle } from 'lucide-react';

const FeudalismApp = () => {
  const [selectedState, setSelectedState] = useState('');
  const [income, setIncome] = useState(50000);
  const [feudalismIndex, setFeudalismIndex] = useState(0);
  const [medievalRole, setMedievalRole] = useState('');
  const [showResults, setShowResults] = useState(false);

  const stateData = {
    'California': { gini: 0.49, housingCost: 120, publicAccess: 65, socialMobility: 42, medianIncome: 75000 },
    'Florida': { gini: 0.48, housingCost: 95, publicAccess: 45, socialMobility: 38, medianIncome: 55000 },
    'Texas': { gini: 0.47, housingCost: 85, publicAccess: 55, socialMobility: 44, medianIncome: 60000 },
    'New York': { gini: 0.51, housingCost: 140, publicAccess: 70, socialMobility: 36, medianIncome: 70000 },
    'Wyoming': { gini: 0.41, housingCost: 65, publicAccess: 85, socialMobility: 52, medianIncome: 65000 }
  };

  const inequalityTrend = [
    { year: 1970, gini: 0.35, label: "Post-War Era" },
    { year: 1980, gini: 0.40, label: "Reagan Era" },
    { year: 1990, gini: 0.43, label: "Financialization" },
    { year: 2000, gini: 0.46, label: "Tech Boom" },
    { year: 2010, gini: 0.47, label: "Financial Crisis" },
    { year: 2024, gini: 0.49, label: "Current" }
  ];

  const medievalComparison = [
    { category: "Lords/Billionaires", wealth: 60 },
    { category: "Nobles/Upper Class", wealth: 30 },
    { category: "Merchants/Middle Class", wealth: 8 },
    { category: "Peasants/Working Class", wealth: 2 }
  ];

  useEffect(() => {
    if (selectedState && income) {
      calculateFeudalismIndex();
    }
  }, [selectedState, income]);

  const calculateFeudalismIndex = () => {
    const data = stateData[selectedState];
    if (!data) return;

    const giniScore = (data.gini - 0.25) * 100;
    const housingScore = Math.min(data.housingCost, 100);
    const accessScore = 100 - data.publicAccess;
    const mobilityScore = 100 - data.socialMobility;
    
    const index = Math.round((giniScore + housingScore + accessScore + mobilityScore) / 4);
    setFeudalismIndex(Math.min(index, 100));

    const incomeRatio = income / data.medianIncome;
    if (incomeRatio > 10) setMedievalRole("Lord of the Manor");
    else if (incomeRatio > 3) setMedievalRole("Noble/Knight");
    else if (incomeRatio > 1.5) setMedievalRole("Merchant/Artisan");
    else if (incomeRatio > 0.8) setMedievalRole("Freeman/Yeoman");
    else setMedievalRole("Peasant/Serf");

    setShowResults(true);
  };

  const getIndexColor = (index) => {
    if (index < 30) return "text-green-600";
    if (index < 50) return "text-yellow-600";
    if (index < 70) return "text-orange-600";
    return "text-red-600";
  };

  const getIndexDescription = (index) => {
    if (index < 30) return "Relatively Equal Society";
    if (index < 50) return "Moderate Inequality";
    if (index < 70) return "High Inequality - Feudal Tendencies";
    return "Extreme Inequality - Neo-Feudalism";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="bg-black/30 backdrop-blur-sm border-b border-purple-500/30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Modern Feudalism Index
          </h1>
          <p className="text-purple-200 mt-2">How feudal is your area? Discover where you'd stand in medieval times vs. today.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-purple-500/30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Shield className="mr-3 text-purple-400" />
            Calculate Your Feudalism Index
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select Your State</label>
              <select 
                value={selectedState} 
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-3 bg-black/30 border border-purple-500/50 rounded-lg text-white focus:ring-2 focus:ring-purple-400"
              >
                <option value="">Choose a state...</option>
                {Object.keys(stateData).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Your Annual Income</label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full p-3 bg-black/30 border border-purple-500/50 rounded-lg text-white focus:ring-2 focus:ring-purple-400"
                placeholder="50000"
              />
            </div>
          </div>

          {showResults && (
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg border border-purple-400/30">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Feudalism Index</h3>
                  <div className={`text-6xl font-bold ${getIndexColor(feudalismIndex)}`}>
                    {feudalismIndex}
                  </div>
                  <p className="text-sm text-purple-200 mt-2">{getIndexDescription(feudalismIndex)}</p>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Your Medieval Role</h3>
                  <div className="text-2xl font-bold text-yellow-400 mb-2">
                    {medievalRole}
                  </div>
                  <p className="text-sm text-purple-200">
                    Based on your income relative to your state's median
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-purple-500/30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <TrendingUp className="mr-3 text-purple-400" />
            The Return to Feudalism: Inequality Over Time
          </h2>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={inequalityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#8B5CF6" opacity={0.3} />
              <XAxis dataKey="year" stroke="#E5E7EB" />
              <YAxis stroke="#E5E7EB" domain={[0.3, 0.55]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid #8B5CF6',
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="gini" 
                stroke="#8B5CF6" 
                fill="#8B5CF6" 
                fillOpacity={0.3}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
          
          <div className="mt-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="text-red-400 mr-2" />
              <span className="font-semibold">Danger Zone:</span>
            </div>
            <p className="text-sm mt-1">
              Gini coefficients above 0.45 historically correlate with social instability. The US crossed this threshold in the 1990s.
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-purple-500/30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Shield className="mr-3 text-purple-400" />
            Then vs. Now: Social Structure Comparison
          </h2>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={medievalComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#8B5CF6" opacity={0.3} />
              <XAxis dataKey="category" stroke="#E5E7EB" />
              <YAxis stroke="#E5E7EB" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid #8B5CF6',
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Bar dataKey="wealth" fill="#8B5CF6" name="% of Total Wealth" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: DollarSign, title: "Wealth Gap", value: "40%", subtitle: "Top 1% owns 40% of wealth" },
            { icon: Home, title: "Housing Crisis", value: "30%+", subtitle: "Income spent on housing" },
            { icon: GraduationCap, title: "Social Mobility", value: "36%", subtitle: "Chance to reach middle class" },
            { icon: Heart, title: "Healthcare Access", value: "Limited", subtitle: "By wealth/employment" }
          ].map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <item.icon className="text-purple-400 mb-3" size={32} />
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-2xl font-bold text-yellow-400">{item.value}</p>
              <p className="text-sm text-purple-200 mt-1">{item.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-xl p-8 text-center border border-purple-400/30">
          <h2 className="text-3xl font-bold mb-4">Break the Cycle</h2>
          <p className="text-xl mb-6 text-purple-100">
            Understanding these patterns is the first step toward meaningful change.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeudalismApp;