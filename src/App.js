import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { DollarSign, Home, GraduationCap, Heart, Shield, TrendingUp, AlertTriangle, Twitter, Share2, Copy, MessageCircle } from 'lucide-react';

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
    if (incomeRatio > 10) setMedievalRole("MEGA LORD (Still a wagecuck tho)");
    else if (incomeRatio > 3) setMedievalRole("Petty Noble (Middle Manager Energy)");
    else if (incomeRatio > 1.5) setMedievalRole("Merchant (Hustle Culture Victim)");
    else if (incomeRatio > 0.8) setMedievalRole("Freeman (Barely Surviving)");
    else setMedievalRole("ACTUAL FUCKING SERF");

    setShowResults(true);
  };

  const getIndexColor = (index) => {
    if (index < 30) return "text-green-600";
    if (index < 50) return "text-yellow-600";
    if (index < 70) return "text-orange-600";
    return "text-red-600";
  };

  const getIndexDescription = (index) => {
    if (index < 30) return "Still have a chance. Don't fuck it up.";
    if (index < 50) return "Getting bent over slowly. Lube optional.";
    if (index < 70) return "PROPER FUCKED - Welcome to serfdom";
    return "MAXIMUM RETARDATION - You're livestock now";
  };

  const shareToTwitter = () => {
    const text = `My Feudalism Index is ${feudalismIndex}%\nI'm a ${medievalRole.toUpperCase()}\n${getIndexDescription(feudalismIndex)}\n\nCheck if you're a fucking serf:`;
    const url = 'http://localhost:3000';
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToReddit = () => {
    const title = `I'm ${feudalismIndex}% feudalized - Turns out I'm a ${medievalRole}`;
    const url = 'http://localhost:3000';
    window.open(`https://reddit.com/submit?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const copyToClipboard = () => {
    const text = `FEUDALISM INDEX: ${feudalismIndex}%\nMY ROLE: ${medievalRole.toUpperCase()}\nSTATUS: ${getIndexDescription(feudalismIndex)}\n\nCheck yours: http://localhost:3000`;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard! Now go spread the truth.');
  };

  const shareGeneric = () => {
    if (navigator.share) {
      navigator.share({
        title: 'FEUDALISM INDEX',
        text: `I'm ${feudalismIndex}% feudalized. I'm literally a ${medievalRole}. ${getIndexDescription(feudalismIndex)}`,
        url: 'http://localhost:3000'
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="bg-black/30 backdrop-blur-sm border-b border-purple-500/30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            FEUDALISM INDEX: ARE YOU A FUCKING SERF?
          </h1>
          <p className="text-purple-200 mt-2">Stop overthinking. Check if you're getting cucked by neo-lords. Throw shit at the wall.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-purple-500/30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Shield className="mr-3 text-purple-400" />
            CALCULATE YOUR SERFDOM LEVEL
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">WHERE YOU GETTING FUCKED?</label>
              <select 
                value={selectedState} 
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-3 bg-black/30 border border-purple-500/50 rounded-lg text-white focus:ring-2 focus:ring-purple-400"
              >
                <option value="">Pick your plantation...</option>
                {Object.keys(stateData).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">HOW MUCH YOU MAKING (BEFORE THEY ROB YOU)</label>
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
                  <h3 className="text-lg font-semibold mb-2">RETARDATION LEVEL</h3>
                  <div className={`text-6xl font-bold ${getIndexColor(feudalismIndex)}`}>
                    {feudalismIndex}%
                  </div>
                  <p className="text-sm text-purple-200 mt-2">{getIndexDescription(feudalismIndex)}</p>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">YOU ARE A:</h3>
                  <div className="text-2xl font-bold text-yellow-400 mb-2">
                    {medievalRole.toUpperCase()}
                  </div>
                  <p className="text-sm text-purple-200">
                    NGMI? Probably. Fuck it, we ball.
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-green-500/30 pt-6">
                <h3 className="text-center text-sm font-bold mb-3 text-green-400">SPREAD THE TRUTH</h3>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={shareToTwitter}
                    className="px-4 py-2 bg-black border-2 border-green-500 text-green-400 font-bold hover:bg-green-500 hover:text-black flex items-center gap-2"
                    title="Share on Twitter"
                  >
                    <Twitter size={20} />
                    TWEET IT
                  </button>
                  <button
                    onClick={shareToReddit}
                    className="px-4 py-2 bg-black border-2 border-orange-500 text-orange-400 font-bold hover:bg-orange-500 hover:text-black flex items-center gap-2"
                    title="Share on Reddit"
                  >
                    <MessageCircle size={20} />
                    REDDIT
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-black border-2 border-yellow-500 text-yellow-400 font-bold hover:bg-yellow-500 hover:text-black flex items-center gap-2"
                    title="Copy to Clipboard"
                  >
                    <Copy size={20} />
                    COPY
                  </button>
                  <button
                    onClick={shareGeneric}
                    className="px-4 py-2 bg-black border-2 border-purple-500 text-purple-400 font-bold hover:bg-purple-500 hover:text-black flex items-center gap-2"
                    title="Share"
                  >
                    <Share2 size={20} />
                    SHARE
                  </button>
                </div>
                <p className="text-center text-xs text-gray-500 mt-3">
                  Rage bait or truth bomb? Who gives a fuck. Share it.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-purple-500/30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <TrendingUp className="mr-3 text-purple-400" />
            HOW WE GOT CUCKED: A TIMELINE
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
              <span className="font-semibold">FUCK ZONE ALERT:</span>
            </div>
            <p className="text-sm mt-1">
              Above 0.45? Society's about to shit itself. We passed that 30 years ago. YOLO.
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-purple-500/30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Shield className="mr-3 text-purple-400" />
            SAME SHIT, DIFFERENT CENTURY
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
            { icon: DollarSign, title: "WEALTH RAPE", value: "40%", subtitle: "1% owns everything. GG." },
            { icon: Home, title: "RENT SLAVERY", value: "50%+", subtitle: "Half your shit gone to landlords" },
            { icon: GraduationCap, title: "MOBILITY", value: "LMAO", subtitle: "Born poor? Die poor." },
            { icon: Heart, title: "HEALTHCARE", value: "FUCKED", subtitle: "Got money? Live. Don't? RIP." }
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
          <h2 className="text-3xl font-bold mb-4">STOP THINKING. START DOING.</h2>
          <p className="text-xl mb-6 text-purple-100">
            Fuck the system. Fuck the rules. Fuck your fear. DO A 360 AND MOONWALK AWAY.
          </p>
          <p className="text-sm text-purple-200 mt-4">
            Analysis paralysis is for pussies. Throw shit at the wall. See what sticks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeudalismApp;