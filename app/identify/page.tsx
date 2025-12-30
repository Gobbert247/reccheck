"use client";

import { useState } from "react";
import Link from "next/link";

type Drug = {
  name: string;
  category: string;
  appearance: string;
  smell: string;
  taste: string;
  potencyTrend: string;
  avgPurity: string;
  identificationTips: string[];
  dosageInfo: {
    threshold: number;
    light: [number, number];
    common: [number, number];
    strong: [number, number];
    heavy: number;
    mgPerKg: {
      light: number;
      common: number;
      strong: number;
    };
  };
  effects: {
    light: string[];
    common: string[];
    strong: string[];
    heavy: string[];
  };
  duration: string;
  redosing: string;
};

const DRUGS: Drug[] = [
  {
    name: "MDMA (Ecstasy/Molly)",
    category: "Stimulant/Empathogen",
    appearance: "Pure MDMA is white/off-white crystalline powder or chunky crystals. Pills vary widely in colour, shape, and press quality. Tan/brown tint common. High-quality MDMA has distinct crystal shards.",
    smell: "Faint liquorice/aniseed smell (safrole precursor). Some batches smell slightly sweet or have no odour.",
    taste: "Intensely bitter, chemical taste. Often described as acrid. If it tastes sweet or has no taste, it may be adulterated.",
    potencyTrend: "↑ Increasing. Average pill dose rose from ~80mg (2010) to ~150-200mg+ (2025). Crystal MDMA purity often 80-90%.",
    avgPurity: "Pills: 150-250mg MDMA. Crystal: 80-90% purity common in Australia.",
    identificationTips: [
      "Crystals should be hard, not powdery (powder may be cut)",
      "Pills with no markings or uneven presses = higher risk",
      "Use reagent test: Marquis → Purple/Black, Mandelin → Blue/Black",
      "Champagne/tan colour in crystal form often indicates high purity",
      "Avoid super-hard pills (may contain PMA/PMMA)"
    ],
    dosageInfo: {
      threshold: 30,
      light: [40, 75],
      common: [75, 125],
      strong: [125, 180],
      heavy: 180,
      mgPerKg: {
        light: 0.8,
        common: 1.3,
        strong: 1.8
      }
    },
    effects: {
      light: ["Mood lift", "Slight empathy increase", "Mild stimulation", "Jaw tension beginning"],
      common: ["Strong euphoria", "Intense empathy and connection", "Increased energy", "Enhanced music appreciation", "Jaw clenching", "Pupil dilation"],
      strong: ["Overwhelming euphoria", "Profound emotional openness", "Difficulty speaking coherently", "Heavy jaw clenching", "Nystagmus (eye wiggling)", "Overheating risk"],
      heavy: ["Loss of magic/uncomfortable stimulation", "Severe overheating", "Confusion", "Anxiety/panic", "Significant neurotoxicity risk", "Serotonin syndrome risk"]
    },
    duration: "Peak: 2-3 hours. Total: 4-6 hours. Comedown: 1-2 days.",
    redosing: "Wait at least 2 hours. Max 1 redose at half original dose. More = diminishing returns + toxicity."
  },
  {
    name: "Cocaine",
    category: "Stimulant",
    appearance: "Pure cocaine is white, pearly, scale-like flakes or powder. Fishscale appearance = high purity. Most street coke is off-white or beige. Shiny/sparkling = good sign.",
    smell: "Faint chemical/petrol smell from processing. High-quality has almost no smell.",
    taste: "Bitter, numbing taste. Should numb gums/tongue quickly. Sweet taste = likely cut with sugar/inositol.",
    potencyTrend: "↑ Increasing. Average purity in Australia ~65-75% (2025), up from ~35% (2010).",
    avgPurity: "Street: 40-70%. High-quality: 75-90%+.",
    identificationTips: [
      "Fishscale texture = indicates high quality",
      "Should dissolve easily in water",
      "Rocks should be crushable (not rock-hard)",
      "Use reagent test: Marquis → Orange, Scott → Blue",
      "Beware levamisole (common cut, causes immune issues)"
    ],
    dosageInfo: {
      threshold: 10,
      light: [15, 30],
      common: [30, 60],
      strong: [60, 90],
      heavy: 90,
      mgPerKg: {
        light: 0.3,
        common: 0.7,
        strong: 1.2
      }
    },
    effects: {
      light: ["Mild euphoria", "Increased confidence", "Slight energy boost", "Talkativeness"],
      common: ["Strong euphoria", "High energy", "Increased focus", "Reduced appetite", "Dilated pupils", "Increased heart rate"],
      strong: ["Intense euphoria (short-lived)", "Restlessness", "Anxiety/paranoia may begin", "Jaw clenching", "Sweating", "Rapid heartbeat"],
      heavy: ["Severe anxiety/paranoia", "Chest pain", "Overheating", "Risk of stroke/heart attack", "Psychosis possible", "Compulsive redosing"]
    },
    duration: "Insufflated: 45-90 mins. Oral: 1-2 hours.",
    redosing: "Diminishing returns after 2-3 lines. Compulsive redosing common. High cardiotoxicity risk."
  },
  {
    name: "Ketamine",
    category: "Dissociative Anaesthetic",
    appearance: "Pharmaceutical: Clear liquid in vials. Street: White crystalline powder or larger crystal shards. S-ketamine (prescribed) = finer powder.",
    smell: "Slight chemical smell, sometimes described as cat urine (from improper synthesis). High-quality is nearly odourless.",
    taste: "Bitter, slightly metallic/chemical taste. Drip should be mild.",
    potencyTrend: "→ Stable. High purity ketamine (80-95%) readily available in Australia. S-isomer ketamine increasingly common.",
    avgPurity: "Usually 70-90% purity. Medical-grade diverted stock often 90%+.",
    identificationTips: [
      "Large crystal shards = likely high purity",
      "Fine powder easier to dose accurately",
      "Should not smell strongly of cat urine (sign of poor synthesis)",
      "Use reagent test: Mandelin → Orange, Morris → No reaction",
      "Test for 2-FDCK analogue (common)"
    ],
    dosageInfo: {
      threshold: 10,
      light: [20, 50],
      common: [50, 100],
      strong: [100, 175],
      heavy: 175,
      mgPerKg: {
        light: 0.4,
        common: 1.0,
        strong: 1.8
      }
    },
    effects: {
      light: ["Mild dissociation", "Slight wobbly feeling", "Visual changes", "Euphoria"],
      common: ["Moderate dissociation", "Impaired motor function", "Dreamlike state", "Closed-eye visuals", "Reduced pain perception"],
      strong: ["Strong dissociation", "Difficulty moving/speaking", "Out-of-body sensations", "Time distortion", "Nearing 'K-hole'"],
      heavy: ["Complete dissociation ('K-hole')", "Immobility", "Loss of external awareness", "Ego death possible", "Respiratory depression risk (rare)"]
    },
    duration: "Insufflated: 45-90 mins. Oral: 1-2 hours. IM: 1-2 hours.",
    redosing: "Wait 45-60 mins. Tolerance builds quickly. Bladder damage risk with regular use."
  },
  {
    name: "Cannabis (THC)",
    category: "Cannabinoid",
    appearance: "Flower: Green buds with orange hairs, covered in trichomes (crystals). High-quality is dense, sticky, fragrant. Concentrates: Shatter (glass-like), wax (soft), oil (liquid).",
    smell: "Distinctive herbal, skunky, or fruity aroma. Strong smell = likely high THC.",
    taste: "Earthy, herbal, sometimes fruity or diesel-like depending on strain.",
    potencyTrend: "↑ Strongly increasing. Average THC: 15-25% (modern strains). Some strains 30%+. Concentrates: 70-95% THC.",
    avgPurity: "Flower: 15-30% THC. Concentrates: 70-95% THC.",
    identificationTips: [
      "Dense, frosty buds = high quality",
      "Avoid PGR weed (rock-hard, few crystals, brown hairs)",
      "Mould = white fuzzy patches (do not smoke)",
      "Orange/red hairs common in mature bud",
      "Strong smell indicates proper curing"
    ],
    dosageInfo: {
      threshold: 2,
      light: [2, 5],
      common: [5, 15],
      strong: [15, 30],
      heavy: 30,
      mgPerKg: {
        light: 0.05,
        common: 0.15,
        strong: 0.3
      }
    },
    effects: {
      light: ["Mild euphoria", "Relaxation", "Slight perceptual changes", "Giggly mood"],
      common: ["Strong relaxation", "Enhanced sensory perception", "Altered time perception", "Increased appetite", "Red eyes", "Dry mouth"],
      strong: ["Intense body high", "Strong mental effects", "Possible anxiety/paranoia", "Couch-lock", "Difficulty concentrating"],
      heavy: ["Overwhelming high", "Severe anxiety/paranoia", "Possible dissociation", "Nausea/vomiting", "Tachycardia"]
    },
    duration: "Smoked: 2-4 hours. Edibles: 4-8 hours (delayed onset).",
    redosing: "Tolerance develops quickly. Wait 2-3 hours minimum."
  }
];

export default function SubstanceSafetyPage() {
  const [selectedDrug, setSelectedDrug] = useState<Drug>(DRUGS[0]);
  const [weight, setWeight] = useState<number>(70);
  const [dosageLevel, setDosageLevel] = useState<'light' | 'common' | 'strong'>('common');
  
  const calculateDose = () => {
    const mgPerKg = selectedDrug.dosageInfo.mgPerKg[dosageLevel];
    const calculatedDose = (mgPerKg * weight).toFixed(1);
    return parseFloat(calculatedDose);
  };
  
  const doseRangeText = () => {
    const [min, max] = selectedDrug.dosageInfo[dosageLevel] as [number, number];
    return `${min}-${max}mg`;
  };

  return (
    <div className="min-h-screen bg-[#070711] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-gradient-to-r from-violet-500/20 via-indigo-500/15 to-sky-500/10 sticky top-0 z-40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Substance Safety & Identification</h1>
            <Link href="/" className="text-sm underline hover:text-sky-400 transition">
              ← Home
            </Link>
          </div>
        </div>
      </header>

      {/* Warning Banner */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="rounded-xl border-2 border-red-500/40 bg-red-500/10 p-5">
          <h2 className="text-xl font-bold text-red-400 mb-2">⚠️ CRITICAL SAFETY INFORMATION</h2>
          <p className="text-sm leading-relaxed">
            This information is for <strong>harm reduction only</strong>. It does not encourage drug use. 
            All illicit drugs carry risks. <strong>Always test your substances</strong> with reagent kits. 
            Dosage information is approximate and varies by purity, tolerance, and individual physiology. 
            <strong className="block mt-2">IF IN DOUBT, START WITH A LOWER DOSE.</strong>
          </p>
        </div>
      </div>

      {/* Drug Selector */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {DRUGS.map((drug) => (
            <button
              key={drug.name}
              onClick={() => setSelectedDrug(drug)}
              className={`p-4 rounded-xl text-left transition ${
                selectedDrug.name === drug.name
                  ? 'bg-gradient-to-r from-violet-500/30 to-indigo-500/30 border-2 border-indigo-400/50'
                  : 'bg-white/5 border border-white/10 hover:bg-white/8'
              }`}
            >
              <h3 className="font-bold text-lg">{drug.name}</h3>
              <p className="text-xs text-white/60 mt-1">{drug.category}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Identification */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Identification Card */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span>🔍</span> How to Identify {selectedDrug.name}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-indigo-300 mb-1">Appearance</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{selectedDrug.appearance}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-indigo-300 mb-1">Smell</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{selectedDrug.smell}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-indigo-300 mb-1">Taste</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{selectedDrug.taste}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-indigo-300 mb-1">Potency Trend (2025)</h3>
                  <p className="text-sm text-white/80 leading-relaxed font-mono">{selectedDrug.potencyTrend}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-indigo-300 mb-1">Average Purity</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{selectedDrug.avgPurity}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-indigo-300 mb-2">Quality Indicators</h3>
                  <ul className="space-y-2">
                    {selectedDrug.identificationTips.map((tip, i) => (
                      <li key={i} className="flex gap-2 text-sm text-white/80">
                        <span className="text-green-400 flex-shrink-0">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Effects by Dose */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span>🎯</span> Effects by Dose Level
              </h2>
              
              <div className="space-y-6">
                {(['light', 'common', 'strong', 'heavy'] as const).map((level) => {
                  const range = level === 'heavy' 
                    ? `${selectedDrug.dosageInfo.heavy}mg+`
                    : `${selectedDrug.dosageInfo[level][0]}-${selectedDrug.dosageInfo[level][1]}mg`;
                  const color = level === 'light' ? 'emerald' : level === 'common' ? 'blue' : level === 'strong' ? 'amber' : 'red';
                  
                  return (
                    <div key={level} className="border-l-4 pl-4" style={{borderColor: `rgb(var(--${color}-500))`}}>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg capitalize">{level} Dose</h3>
                        <span className={`text-sm font-mono px-3 py-1 rounded-full bg-${color}-500/20 text-${color}-300`}>
                          {range}
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {selectedDrug.effects[level].map((effect, i) => (
                          <li key={i} className="text-sm text-white/75 flex gap-2">
                            <span className="text-white/40">•</span>
                            <span>{effect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Duration & Redosing */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">⏱️ Duration & Redosing</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-indigo-300 mb-1">Duration</h3>
                  <p className="text-sm text-white/80">{selectedDrug.duration}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-300 mb-1">Redosing Advice</h3>
                  <p className="text-sm text-white/80">{selectedDrug.redosing}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Dosage Calculator */}
          <div className="space-y-6">
            
            {/* Dosage Calculator */}
            <div className="bg-gradient-to-br from-violet-500/15 to-indigo-500/15 border-2 border-violet-400/30 rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span>🧮</span> Dosage Calculator
              </h2>
              
              <div className="space-y-5">
                {/* Body Weight */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Your Body Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value) || 70)}
                    min="40"
                    max="150"
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-lg font-mono focus:border-violet-400 focus:outline-none"
                  />
                  <p className="text-xs text-white/50 mt-1">Average adult: 60-80kg</p>
                </div>
                
                {/* Desired Intensity */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Desired Intensity</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['light', 'common', 'strong'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setDosageLevel(level)}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                          dosageLevel === level
                            ? 'bg-violet-500 text-white'
                            : 'bg-white/10 hover:bg-white/15'
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Calculation Result */}
                <div className="bg-black/40 border border-violet-400/40 rounded-lg p-5">
                  <p className="text-sm text-white/70 mb-1">Recommended dose for {weight}kg person:</p>
                  <p className="text-4xl font-bold text-violet-300 mb-2">{calculateDose()}mg</p>
                  <p className="text-xs text-white/60">Typical {dosageLevel} dose range: {doseRangeText()}</p>
                  <p className="text-xs text-white/60 mt-2">Based on {selectedDrug.dosageInfo.mgPerKg[dosageLevel]}mg per kg</p>
                </div>
                
                {/* Safety Warning */}
                <div className="bg-red-500/15 border border-red-400/30 rounded-lg p-4">
                  <p className="text-xs text-red-200 leading-relaxed">
                    <strong>Always start low:</strong> Purity varies. If trying a new batch, start with 50-70% of your usual dose.
                  </p>
                </div>
                
                {/* Example Conversions */}
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="font-semibold text-sm mb-3">Common Measures</h3>
                  <div className="space-y-2 text-xs">
                    {selectedDrug.name.includes('MDMA') && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-white/60">Small pile (matchhead):</span>
                          <span className="font-mono">~50mg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Standard capsule:</span>
                          <span className="font-mono">~100mg</span>
                        </div>
                      </>
                    )}
                    {selectedDrug.name.includes('Cocaine') && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-white/60">Thin line:</span>
                          <span className="font-mono">~25mg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Fat line:</span>
                          <span className="font-mono">~60mg</span>
                        </div>
                      </>
                    )}
                    {selectedDrug.name.includes('Ketamine') && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-white/60">Small bump:</span>
                          <span className="font-mono">~20mg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Key bump:</span>
                          <span className="font-mono">~30-50mg</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testing Reminder */}
            <div className="bg-amber-500/15 border border-amber-400/30 rounded-xl p-5">
              <h3 className="font-bold text-amber-300 mb-2">🧪 Always Test Your Substances</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Reagent test kits are available online and at some pharmacies. They can detect common adulterants like fentanyl, 
                PMA/PMMA, and cathinones. Testing takes 2 minutes and can save your life.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Disclaimer */}
      <footer className="border-t border-white/10 bg-white/5 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-white/60">
            RecCheck provides harm reduction information only. We do not encourage illegal drug use. 
            All dosage information is approximate and for educational purposes. 
            Always consult medical professionals and use drug testing services where available.
          </p>
        </div>
      </footer>
    </div>
  );
}
