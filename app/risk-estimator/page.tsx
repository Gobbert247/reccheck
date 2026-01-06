'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function RiskEstimator() {
  const [weight, setWeight] = useState('');
  const [dose, setDose] = useState('');
  const [substance, setSubstance] = useState('mdma');
  const [showResult, setShowResult] = useState(false);
  const [riskLevel, setRiskLevel] = useState('');

  const substances = {
    mdma: { name: 'MDMA', lowThreshold: 1.5, highThreshold: 2.5, unit: 'mg/kg' },
    meth: { name: 'Methamphetamine', lowThreshold: 0.5, highThreshold: 1.5, unit: 'mg/kg' },
    cocaine: { name: 'Cocaine', lowThreshold: 1.0, highThreshold: 2.0, unit: 'mg/kg' }
  };

  const calculateRisk = () => {
    const w = parseFloat(weight);
    const d = parseFloat(dose);
    if (!w || !d) return;
    
    const mgPerKg = d / w;
    const sub = substances[substance];
    
    let risk = '';
    let color = '';
    
    if (mgPerKg < sub.lowThreshold) {
      risk = 'Lower Risk';
      color = 'bg-green-500';
    } else if (mgPerKg < sub.highThreshold) {
      risk = 'Moderate Risk';
      color = 'bg-yellow-500';
    } else {
      risk = 'Higher Risk';
      color = 'bg-red-500';
    }
    
    setRiskLevel(risk);
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-2xl font-bold text-purple-600">RecCheck</Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Recreational Substance Risk Estimator</h1>
            <p className="text-red-600 font-semibold mb-4">⚠️ IMPORTANT: This tool is for harm reduction information ONLY</p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-sm text-gray-700">This calculator provides toxicity risk estimates based on dose-to-weight ratios. It is NOT medical advice and does NOT recommend dosing. Always prioritize safety and seek professional medical help if needed.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Substance</label>
              <select value={substance} onChange={(e) => setSubstance(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                <option value="mdma">MDMA</option>
                <option value="meth">Methamphetamine</option>
                <option value="cocaine">Cocaine</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Body Weight (kg)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="e.g., 70" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dose Amount (mg)</label>
              <input type="number" value={dose} onChange={(e) => setDose(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="e.g., 100" />            </div>

            <button onClick={calculateRisk} className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">Calculate Risk</button>
            </div>          

          {showResult && (
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Risk Assessment: {riskLevel}</h2>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div className={`h-4 rounded-full ${
                  riskLevel === 'Lower Risk' ? 'bg-green-500 w-1/3' :
                  riskLevel === 'Moderate Risk' ? 'bg-yellow-500 w-2/3' :
                  'bg-red-500 w-full'
                }`}></div>
              </div>
              <p className="text-gray-700">Dose-to-weight ratio: {(parseFloat(dose) / parseFloat(weight)).toFixed(2)} mg/kg</p>
            </div>
          )}

          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold mb-3">Learn More</h3>
            <p className="text-sm text-gray-600 mb-2">This tool uses dose-to-weight ratios from harm reduction literature to estimate toxicity risk levels.</p>
            <p className="text-sm text-gray-600"><strong>Methodology:</strong> Risk thresholds are based on reported safe and dangerous doses per kilogram of body weight from toxicology research and harm reduction resources.</p>
            <p className="text-sm text-gray-600 mt-2"><strong>Remember:</strong> This information is for safety awareness, not to encourage substance use. Purity varies, individual responses differ, and combining substances increases risk significantly.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
