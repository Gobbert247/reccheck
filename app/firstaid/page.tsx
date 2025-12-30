// app/firstaid/page.tsx
"use client";

import Link from "next/link";

export default function FirstAidPage() {
  return (
    <div className="min-h-screen bg-[#070711] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-gradient-to-r from-violet-500/20 via-indigo-500/15 to-sky-500/10">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10 ring-1 ring-white/15 grid place-items-center">
              <span className="text-sm font-black">RC</span>
            </div>
            <div>
              <div className="text-sm font-semibold">RecCheck</div>
              <div className="text-xs text-white/60">Overdose First Aid</div>
            </div>
          </div>
          <Link
            href="/"
            className="text-sm text-white/80 hover:text-white underline underline-offset-4 decoration-white/20"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* Emergency Banner */}
        <section className="rounded-2xl border border-red-500/40 bg-red-500/10 p-5">
          <h1 className="text-lg font-bold text-red-100">
            🚨 CALL 000 IN AN EMERGENCY
          </h1>
          <p className="mt-2 text-sm text-red-100/80 leading-relaxed">
            If someone is unconscious, not breathing normally, having seizures,
            severe chest pain, or cannot be woken — call{" "}
            <span className="font-semibold text-red-100">000 immediately</span>.
          </p>
        </section>

        {/* Opioid Overdose */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">
            💊 Opioid Overdose (heroin, oxycodone, fentanyl)
          </h2>
          <ol className="mt-4 space-y-3 text-sm text-white/80 list-decimal list-inside">
            <li>Check for responsiveness and breathing.</li>
            <li>
              Call <strong>000</strong> if breathing is slow, irregular, or absent.
            </li>
            <li>Administer naloxone if available.</li>
            <li>
              Place in the <strong>recovery position</strong> if breathing.
            </li>
            <li>Stay with the person until help arrives.</li>
          </ol>
          <p className="mt-3 text-xs text-white/60">
            Naloxone is safe and legal in Australia — use it even if unsure.
          </p>
        </section>

        {/* Stimulant Overdose */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">
            ⚡ Stimulant Overdose (meth, cocaine, MDMA)
          </h2>
          <ol className="mt-4 space-y-3 text-sm text-white/80 list-decimal list-inside">
            <li>Move to a cool, quiet environment.</li>
            <li>Loosen tight clothing.</li>
            <li>Offer small sips of water if conscious.</li>
            <li>
              Call <strong>000</strong> for chest pain, overheating,
              confusion, or collapse.
            </li>
          </ol>
          <p className="mt-3 text-xs text-white/60">
            Do not give alcohol or more stimulants.
          </p>
        </section>

        {/* Depressants / Alcohol */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">
            🍺 Depressants & Alcohol (GHB, benzos, alcohol)
          </h2>
          <ol className="mt-4 space-y-3 text-sm text-white/80 list-decimal list-inside">
            <li>Check breathing regularly.</li>
            <li>Never leave the person alone.</li>
            <li>Place in recovery position if unconscious.</li>
            <li>
              Call <strong>000</strong> if breathing slows or stops.
            </li>
          </ol>
          <p className="mt-3 text-xs text-white/60">
            Mixing depressants greatly increases overdose risk.
          </p>
        </section>

        {/* Resources */}
        <section className="rounded-2xl border border-white/10 bg-black/30 p-6">
          <h2 className="text-sm font-semibold text-white/80">
            Trusted Australian resources
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href="https://www.healthdirect.gov.au/overdose"
                target="_blank"
                rel="noreferrer"
                className="underline text-sky-300"
              >
                Healthdirect – Overdose information
              </a>
            </li>
            <li>
              <a
                href="https://adf.org.au"
                target="_blank"
                rel="noreferrer"
                className="underline text-sky-300"
              >
                Alcohol and Drug Foundation
              </a>
            </li>
            <li>
              <a
                href="https://www.counsellingonline.org.au"
                target="_blank"
                rel="noreferrer"
                className="underline text-sky-300"
              >
                Counselling Online (24/7)
              </a>
            </li>
            <li className="text-white/80">
              National Alcohol & Drug Hotline:{" "}
              <strong>1800 250 015</strong>
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-white/10 text-xs text-white/60 leading-relaxed">
          <p>
            <strong className="text-white/80">Disclaimer:</strong> This information
            is educational only and does not replace medical advice. If someone
            is unwell or at risk, call <strong>000</strong>.
          </p>
        </footer>
      </main>
    </div>
  );
}
