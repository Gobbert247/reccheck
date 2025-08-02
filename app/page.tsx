'use client';

import Image from 'next/image';
import Link from 'next/link';

const sections = [
  {
    title: 'Drug Interaction Checker',
    desc: 'Instantly cross-check combinations for potential risks.',
    image: '/images/interactions.png',
    href: '/checker',
  },
  {
    title: 'Regional Alerts',
    desc: 'See contaminated or dangerous batches near you.',
    image: '/images/alertmapplaceholder.png',
    href: '/alerts',
  },
  {
    title: 'Overdose First Aid',
    desc: 'Immediate steps to help someone in trouble.',
    image: '/images/firstaid.png',
    href: '/firstaid',
  },
  {
    title: 'Substance Safety',
    desc: 'Understand safe use, set/setting, and what’s real.',
    image: '/images/ss.png',
    href: '/psychedelics',
  },
  {
    title: 'Addiction Counselling',
    desc: 'Non-judgemental help with treatment options.',
    image: '/images/IMG-20250801-WA0011.jpg',
    href: '/support',
  },
  {
    title: 'Buy Drug Test Kits',
    desc: 'Order trusted test kits, discreet and legal.',
    image: '/images/recchecktestkit.png',
    href: '/testkits',
  },
  {
    title: 'Community & Events',
    desc: 'Festivals, harm reduction booths, safe party tools.',
    image: '/images/harm.png',
    href: '/events',
  },
];

export default function Home() {
  return (
    <main className="bg-black text-white font-sans relative overflow-hidden">

      {/* 🌫️ Static Smokey Background Image */}
      <div className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none opacity-10">
        <Image
          src="/images/smokeybg.png"
          alt="Smokey texture"
          fill
          className="object-cover blur-sm grayscale"
          priority
        />
      </div>

      {/* 📶 Noise Texture Overlay */}
      <div
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        style={{
          backgroundImage: "url('/images/noise.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '300px',
          opacity: 0.2,
        }}
      />

      {/* 🧠 Hero Section */}
      <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 py-24 relative z-10">
        <div className="lg:w-1/2 text-center lg:text-left space-y-8">
          <Image
            src="/images/logo2.png"
            alt="RecCheck Logo"
            width={360}
            height={140}
            className="mx-auto lg:mx-0"
            priority
          />
          <p className="text-xl text-gray-400 max-w-xl mx-auto lg:mx-0">
            Smart safety tools for people who use drugs. Built without judgement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/simulator"
              className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
            >
              Try the Simulator
            </Link>
            <Link
              href="#features"
              className="border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
            >
              View Features
            </Link>
          </div>
        </div>
      </section>

      {/* 🧱 Feature Tiles */}
      <section id="features" className="relative z-10 px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {sections.map((section, idx) => (
            <Link href={section.href} key={idx}>
              <div
                className="relative group h-[60vh] rounded-xl overflow-hidden shadow-lg cursor-pointer"
                style={{
                  backgroundImage: `url(${section.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity group-hover:opacity-90" />
                <div className="relative z-10 p-6 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 m-4 transition-transform group-hover:scale-[1.03]">
                  <h2 className="text-3xl font-semibold mb-2 tracking-tight">
                    {section.title}
                  </h2>
                  <p className="text-lg text-gray-300 leading-snug">
                    {section.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 📘 Disclaimer */}
      <section className="bg-black text-white px-6 py-20 border-t border-white/10 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Educational Disclaimer</h2>
          <p className="mb-2 text-gray-400">
            RecCheck is a harm minimisation tool built for <strong>educational purposes</strong> only. We do <strong>not</strong> promote or encourage substance use.
          </p>
          <p className="text-gray-500">
            Always consult a licensed medical professional. Nothing on this site constitutes medical advice.
          </p>
        </div>
      </section>

      {/* 🔚 Footer */}
      <footer className="bg-black text-center text-sm text-gray-600 py-8 border-t border-white/10 relative z-10">
        <p>© 2025 RecCheck. Built with care, not judgement. Be safe out there.</p>
      </footer>
    </main>
  );
}
