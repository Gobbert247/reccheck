// app/firstaid/page.tsx
"use client";

import React from "react";
import Link from "next/link";

const BRAND = {
  name: "RecCheck",
  gradient: "bg-gradient-to-r from-violet-500/20 via-indigo-500/15 to-sky-500/10",
  border: "border-white/10",
  card: "bg-white/5 border border-white/10 backdrop-blur",
  textDim: "text-white/70",
};

function FooterDisclaimer() {
  return (
    <footer className="mt-10 border-t border-white/10 py-8 text-sm text-white/65">
      <div className="max-w-4xl mx-auto px-4">
        <p className="leading-relaxed">
          <span className="font-semibold text-white/80">Disclaimer:</span> This page provides general harm-reduction
          information for Australia and does not replace emergency services or clinical advice. If you think someone is
          in danger: <span className="font-semibold text-white">call 000</span>.
        </p>
      </div>
    </footer>
  );
}

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-3 space-y-2">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-3">
          <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-white/10 ring-1 ring-white/15 grid place-items-center text-xs font-bold text-white/80">
            {i + 1}
          </div>
          <div className="text-sm text-white/75 leading-relaxed">{s}</div>
        </li>
      ))}
    </ol>
  );
}

function ResourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
    >
      {label} <span className="text-white/50">↗</span>
    </a>
  );
}

export default function FirstAidPage() {
  return (
    <div className="min-h-screen bg-[#070711] text-white">
      <header className={`border-b ${BRAND.border} ${BRAND.gradient}`}>
        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10 ring-1 ring-white/15 grid place-items-center">
              <span className="text-sm font-black tracking-tight">RC</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-white/90">{BRAND.name}</div>
              <div className="text-xs text-white/60">Overdose first aid</div>
            </div>
          </div>
          <Link
            href="/"
            className="text-sm text-white/80 hover:text-white underline underline-offset-4 decoration-white/20"
          >
            ← Back to homepage
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Emergency banner */}
        <section className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-red-100">CALL 000 IN AN EMERGENCY</h1>
              <p className="mt-1 text-sm text-red-100/80 leading-relaxed">
                If someone is hard to wake, has slow/irregular breathing, seizures, chest pain, severe overheating,
                confusion, or turns blue — call <span className="font-semibold">000</span> now.
              </p>
            </div>
            <div className="rounded-xl bg-black/20 ring-1 ring-red-500/25 px-4 py-3 text-sm text-red-100/90">
              Stay with them. Don’t let them “sleep it off”.
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section className={`${BRAND.card} rounded-2xl p-5 sm:p-6 mt-6`}>
          <h2 className="text-lg font-semibold">Quick actions (any overdose)</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-white/75">
            <li>Check responsiveness: call their name, gentle shake, sternal rub if trained.</li>
            <li>Check breathing: look/listen/feel for 10 seconds. If not breathing normally, call 000.</li>
            <li>Put in recovery position if unconscious but breathing.</li>
            <li>If not breathing normally and you’re trained: start CPR; use an AED if available.</li>
            <li>Stay with them until help arrives.</li>
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            <ResourceLink href="https://www.healthdirect.gov.au" label="Healthdirect" />
            <ResourceLink href="https://adf.org.au" label="Alcohol and Drug Foundation" />
            <a
              href="tel:1800250015"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              National Alcohol &amp; Drug Hotline: <span className="font-semibold text-white">1800 250 015</span>
            </a>
          </div>
        </section>

        {/* Opioid overdose */}
        <section className={`${BRAND.card} rounded-2xl p-5 sm:p-6 mt-6`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">OPIOID OVERDOSE</h2>
              <p className={`mt-1 ${BRAND.textDim} text-sm leading-relaxed`}>
                Includes heroin, fentanyl, oxycodone, morphine, methadone, buprenorphine, and other opioids.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 bg-sky-
