'use client';

import Image from 'next/image';
import Link from 'next/link';

const sections = [
  {
    title: 'Drug Interaction Checker',
    desc: 'Instantly cross-check combinations for potential risks.',
    image: '/images/molecule.jpg',
    href: '/checker',
  },
  {
    title: 'Regional Alerts',
    desc: 'See contaminated or dangerous batches near you.',
    image: '/images/alert.png',
    href: '/alerts',
  },
  {
    title: 'Overdose First Aid',
    desc: 'Immediate steps to help someone in trouble.',
    image: '/images/overdose.jpg',
    href: '/firstaid',
  },
  {
    title: 'Psychedelic Safety',
    desc: 'Understand safe use, set/setting, and what’s real.',
    image: '/images/mushrooms.jpg',
    href: '/psychedelics',
  },
  {
    title: 'Addiction Counselling',
    desc: 'Non-judgemental help with treatment options.',
    image: '/images/crying.jpg',
    href: '/support',
  },
  {
    title: 'Buy Drug Test Kits',
    desc: 'Order trusted test kits, discreet and legal.',
    image: '/images/vials.jpg',
    href: '/testkits',
  },
  {
    title: 'Community & Events',
    desc: 'Festivals, harm reduction booths, safe party tools.',
    image: '/images/smoke.jpg',
    href: '/events',
  },
];

export default function Home() {
  return (
    <main className="bg-black text-white">
      {/* Header */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6 bg-black">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight">RecCheck is Live</h1>
        <p className="text-xl text-gray-300 max-w-xl mb-8">
          A harm minimisation app made by people who get it. Designed to educate, protect and connect.
        </p>
        <Link
          href="#features"
          className="bg-white text-black font-semibold px-8 py-4 rounded-lg hover:bg-gray-200 transition"
        >
          Explore Features →
        </Link>
      </section>

      {/* Feature Sections */}
      <div id="features">
        {sections.map((section, idx) => (
          <Link href={section.href} key={idx}>
            <div
              className="relative h-screen flex items-center justify-center text-center cursor-pointer group"
              style={{
                backgroundImage: `url(${section.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="bg-black bg-opacity-60 backdrop-blur-sm p-8 rounded-xl shadow-xl max-w-xl transition group-hover:scale-105">
                <h2 className="text-4xl font-bold tracking-tight mb-4">{section.title}</h2>
                <p className="text-lg text-gray-300">{section.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Disclaimer */}
      <section className="bg-black text-white px-6 py-20 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Educational Disclaimer</h2>
          <p className="mb-2 text-gray-300">
            RecCheck is a harm minimisation tool designed strictly for <strong>educational purposes</strong>. We do <strong>not</strong> promote or encourage the use of illicit drugs.
          </p>
          <p className="text-gray-400">
            Always consult a licensed medical professional. This content is not medical advice.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-center text-sm text-gray-600 py-8 border-t border-gray-800">
        <p>© 2025 RecCheck. Built for education. Not for promotion. Be safe out there.</p>
      </footer>
    </main>
  );
}
