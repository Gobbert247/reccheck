'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

import { alerts } from '@/data/alerts';

export default function AlertsPage() {
  const [selectedRegion, setSelectedRegion] = useState('All');

  const filteredAlerts = selectedRegion === 'All'
    ? alerts
    : alerts.filter(alert => alert.region.includes(selectedRegion));

  const regions = ['All', 'NSW', 'VIC', 'QLD'];

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

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center">Regional Alerts</h1>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-8">
          Live alerts of contaminated or unexpected substances reported through verified health networks and community reports. Stay aware. Stay safer.
        </p>

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

        <Map markers={filteredAlerts.map(alert => ({
          title: alert.title,
          position: alert.coordinates,
        }))} />

        <div className="grid md:grid-cols-2 gap-10 mt-12">
          {filteredAlerts.map((alert, idx) => (
            <Link href={alert.href} key={idx}>
              <div className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-white/20 shadow-xl cursor-pointer">
                <Image
                  src={alert.image}
                  alt={alert.title}
                  width={800}
                  height={400}
                  className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300 ease-out"
                />
                <div className="p-6 bg-black/80 backdrop-blur-md absolute bottom-0 w-full">
                  <h2 className="text-xl font-semibold mb-1 text-white">{alert.title}</h2>
                  <p className="text-sm text-gray-400">{alert.region} • {alert.date} • Source: {alert.source}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
