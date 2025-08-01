'use client';

import Image from 'next/image';

const reagents = [
  {
    name: 'Marquis',
    use: 'Commonly used to detect MDMA, amphetamines, and opiates.',
    reactions: [
      { substance: 'MDMA', colour: 'Purple to black' },
      { substance: 'Amphetamine', colour: 'Orange to brown' },
      { substance: 'Methamphetamine', colour: 'Orange' },
      { substance: 'Heroin', colour: 'Purple' },
    ],
  },
  {
    name: 'Mecke',
    use: 'Often used for opiates and MDMA.',
    reactions: [
      { substance: 'Heroin', colour: 'Dark green to black' },
      { substance: 'Codeine', colour: 'Green' },
      { substance: 'MDMA', colour: 'Dark blue to black' },
    ],
  },
  {
    name: 'Mandelin',
    use: 'Useful for ketamine and MDMA detection.',
    reactions: [
      { substance: 'Ketamine', colour: 'Orange' },
      { substance: 'MDMA', colour: 'Purple to black' },
      { substance: 'PMMA', colour: 'Green to brown' },
    ],
  },
];

export default function TestKitInfo() {
  return (
    <main className="bg-black text-white min-h-screen px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center">Drug Test Kit Guide</h1>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
          This guide shows how reagent tests (like Marquis, Mecke, and Mandelin) respond to different substances. Always test a **small scraping**, use a **white ceramic plate**, and never rely on colour alone. Multiple reagents increase accuracy.
        </p>

        <div className="space-y-16">
          {reagents.map((kit, idx) => (
            <div key={idx} className="border border-white/10 rounded-xl p-6 bg-white/5 backdrop-blur">
              <h2 className="text-3xl font-semibold mb-2">{kit.name} Reagent</h2>
              <p className="text-gray-300 mb-4 italic">{kit.use}</p>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-400 text-sm border-b border-white/10">
                    <th className="py-2">Substance</th>
                    <th className="py-2">Expected Reaction Colour</th>
                  </tr>
                </thead>
                <tbody>
                  {kit.reactions.map((r, i) => (
                    <tr key={i} className="border-t border-white/5">
                      <td className="py-2 text-white">{r.substance}</td>
                      <td className="py-2 text-gray-200">{r.colour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="mt-20 text-sm text-gray-500 text-center">
          <p>Source: DanceSafe.org | Forensic Publications | Erowid reagent testing vault</p>
          <p>Note: Reagent tests are presumptive and not definitive. They can help screen substances, not identify them with certainty.</p>
        </div>
      </div>
    </main>
  );
}
