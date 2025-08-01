// /components/DrugPanel.tsx
'use client';

import React from 'react';

const drugs = [
  { name: 'Alcohol', effect: 'wobble' },
  { name: 'Ketamine', effect: 'collapse' },
  { name: 'Cocaine', effect: 'jitter' },
  { name: 'MDMA', effect: 'energized' },
  { name: 'LSD', effect: 'pupil_dilate' },
];

export default function DrugPanel({ onDrop }: { onDrop: (effect: string) => void }) {
  return (
    <div className="p-4 bg-black border border-white/10 rounded-xl w-72 text-white space-y-4">
      <h2 className="text-xl font-bold">Drugs</h2>
      {drugs.map((drug) => (
        <button
          key={drug.name}
          onClick={() => onDrop(drug.effect)}
          className="w-full text-left px-4 py-2 bg-white/10 hover:bg-white/20 rounded"
        >
          {drug.name}
        </button>
      ))}
    </div>
  );
}
