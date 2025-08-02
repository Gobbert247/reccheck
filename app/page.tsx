'use client';

import Head from 'next/head';
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
    <>
      <Head>
        <title>RecCheck – Harm Reduction Without Judgement</title>
        <meta
          name="description"
          content="RecCheck is a harm minimisation tool focused on drug safety, interaction checking, and education."
        />
      </Head>

      <main className="bg-black text-white font-sans relative overflow-hidden">

        {/* 🌫️ Static Smoke Overlay (optional) */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-0">
          <Image
            src="/images/smoke1.png"
            alt="Static smoke overlay"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 🌬️ Left Side Rising Smoke – using smoke2.png */}
        <div className="fixed left-0 top-0 h-full w-[200px] z-10 pointer-events-none opacity-20">
          <img
            src="/images/smoke2.png"
            alt="Smoke effect"
            className="h-full w-full object-cover animate-fadeup"
          />
        </div>

        {/* 🔲 Noise Texture */}
        <div
          className="fixed inset-0 z-10 pointer-events-none"
          style={{
            backgroundImage: "url('/images/noise.svg')",
            backgroundRepeat: 'repeat',
            backgroundSize: '300px',
            opacity: 0.04,
          }}
        />

        {/* 🧠 Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative z-20">
          <div className="w-full text-center space-y-8">
            <Image
  src="/images/logo4.png"
  alt="RecCheck Logo"
  width={768}
  height={768}
  className="mx-auto w-1/2 h-auto"
  priority
/>


            <p className="text-xl text-gray-400 max-w-xl mx-auto">
              Drugs aren’t the problem. Misinformation is.
              RecCheck is a harm minimisation tool. We don’t promote drug use. We promote safety, education, and informed choices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

     
       {/* 📘 Disclaimer */}
<section className="bg-black text-white px-6 py-20 border-t border-white/10 relative z-20">
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
        <footer className="bg-black text-center text-sm text-gray-600 py-8 border-t border-white/10 relative z-20">
          <p>© 2025 RecCheck. Built with care, not judgement. Be safe out there.</p>
        </footer>
      </main>
    </>
  );
}

