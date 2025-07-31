'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 font-mono">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-6xl font-extrabold mb-4 tracking-tight">RecCheck is Live</h1>
          <p className="text-xl text-gray-300 max-w-xl mx-auto">
            This is the alpha test page. We're building something powerful, protective, and people-first.
          </p>
        </header>

        {/* Banner Image */}
        <div className="rounded-xl overflow-hidden shadow-xl mb-16">
          <Image
            src="/images/generated.png"
            alt="Ambulance light through lens"
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Educational Disclaimer */}
        <section className="border-t border-gray-700 pt-8 mt-12">
          <h2 className="text-3xl font-semibold mb-4">Educational Disclaimer</h2>
          <p className="mb-2 text-gray-300">
            RecCheck is a harm minimisation tool designed strictly for <strong>educational purposes</strong>. We do <strong>not</strong> promote or encourage the use of illicit drugs.
          </p>
          <p className="text-gray-400">
            Always consult a licensed medical professional. This content is not medical advice.
          </p>
        </section>

        {/* Feature Tiles */}
        <section id="features" className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            {
              title: 'Drug Interaction Checker',
              desc: 'Instantly cross-check combinations for potential risk.',
              alt: 'Drug test kit',
              img: '/images/interaction.png',
            },
            {
              title: 'Regional Alerts',
              desc: 'Stay updated with local alerts on contaminated or high-risk batches.',
              alt: 'Rainy ambulance view',
              img: '/images/alert.png',
            },
            {
              title: 'Evidence-Based Info',
              desc: 'Learn from trusted, up-to-date sources tailored for real people.',
              alt: 'Evidence-based info visual',
              img: '/images/education.png',
            },
          ].map((tile, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden"
            >
              <Image
                src={tile.img}
                width={800}
                height={400}
                alt={tile.alt}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{tile.title}</h3>
                <p className="text-sm text-gray-400">{tile.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <div className="mt-20 text-center">
          <a
            href="#features"
            className="bg-white text-black font-semibold px-8 py-4 rounded-lg hover:bg-gray-200 transition"
          >
            Explore Features →
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-center text-sm text-gray-600">
          <p>© 2025 RecCheck. Built for education. Not for promotion. Be safe out there.</p>
        </footer>
      </div>
    </main>
  );
}
