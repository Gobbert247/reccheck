'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

type Alert = {
  title: string;
  date: string;
  region: string;
  link: string;
  source: string;
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('All');

  const regions = ['All', 'NSW', 'VIC', 'QLD'];

  useEffect(() => {
    fetch('/api/alerts')
      .then(res => res.json())
      .then(data => {
console.log('📦 Loaded alerts:', data);

        setAlerts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load alerts:', err);
        setLoading(false);
      });
  }, []);

  const filteredAlerts = selectedRegion === 'All'
    ? alerts
    : alerts.filter(alert => alert.region.includes(selectedRegion));

  return (
    <main className="relative bg-black text-white min-h-screen px-6 py-20 overflow-hidden">
      {/* 🔥 Smoky Background Layer */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <Image
          src="/images/smoke.jpg"
          alt="Background texture"
          layout="fill"
          objectFit="cover"
          className="blur-sm"
        />
      </div>

      {/* 🔲 Content */}
      <div className="relative z-10">
        <h1 className="text-5xl font-bold mb-12 text-center">Regional Alerts</h1>

        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {regions.map(region => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-2 rounded-full border text-sm transition ${
                selectedRegion === region
                  ? 'bg-white text-black border-white'
                  : 'border-white/30 text-white hover:border-white'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* 📋 List view of alerts */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-400">Loading alerts...</p>
          ) : (
            filteredAlerts.map(alert => (
              <div
                key={alert.title}
                className="bg-white/5 border border-white/10 p-4 rounded-xl"
              >
                <h2 className="text-xl font-semibold">{alert.title}</h2>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
