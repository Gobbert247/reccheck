// app/support/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type CityKey =
  | "sydney"
  | "melbourne"
  | "brisbane"
  | "perth"
  | "adelaide"
  | "hobart"
  | "darwin"
  | "canberra";

type ServiceLink = { label: string; url: string; note?: string };

type City = {
  key: CityKey;
  name: string;
  state: string;
  x: number; // SVG percentage (0–100)
  y: number; // SVG percentage (0–100)
  services: ServiceLink[];
};

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
      <div className="max-w-5xl mx-auto px-4">
        <p className="leading-relaxed">
          <span className="font-semibold text-white/80">Disclaimer:</span> Links are provided for convenience. If you or
          someone else is in immediate danger or unwell right now:{" "}
          <span className="font-semibold text-white">call 000</span>.
        </p>
      </div>
    </footer>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-sm text-white/85 hover:text-white underline underline-offset-4 decoration-white/20"
    >
      {children}
    </a>
  );
}

const NATIONAL_SERVICES: ServiceLink[] = [
  { label: "Counselling Online (24/7 chat)", url: "https://counsellingonline.org.au" },
  {
    label: "National Alcohol & Drug Hotline: 1800 250 015",
    url: "https://www.healthdirect.gov.au/alcohol-and-drug-information-service-adis",
  },
  { label: "Path2Help referral tool", url: "https://path2help.com.au" },
];

const CITIES: City[] = [
  {
    key: "sydney",
    name: "Sydney",
    state: "NSW",
    x: 74,
    y: 55,
    services: [
      {
        label: "NSW ADIS (Alcohol & Drug Information Service)",
        url: "https://yourroom.health.nsw.gov.au/talk-to-someone/alcohol-and-drug-information-service-adis",
      },
      { label: "NUAA PeerLine", url: "https://nuaa.org.au/peerline/" },
    ],
  },
  {
    key: "melbourne",
    name: "Melbourne",
    state: "VIC",
    x: 70,
    y: 70,
    services: [
      { label: "DirectLine (Victoria AOD counselling & referral)", url: "https://www.directline.org.au" },
      { label: "Health.vic: Alcohol and other drugs support", url: "https://www.health.vic.gov.au/alcohol-and-other-drugs" },
    ],
  },
  {
    key: "brisbane",
    name: "Brisbane",
    state: "QLD",
    x: 78,
    y: 48,
    services: [
      { label: "ADIS QLD (Alcohol & Drug Information Service)", url: "https://adis.health.qld.gov.au" },
      { label: "Queensland Health AOD support", url: "https://www.qld.gov.au/health/staying-healthy/alcohol-drugs" },
    ],
  },
  {
    key: "perth",
    name: "Perth",
    state: "WA",
    x: 18,
    y: 62,
    services: [
      {
        label: "Alcohol and Drug Support Line (WA)",
        url: "https://www.mhc.wa.gov.au/getting-help/helplines/alcohol-and-drug-support-line/",
      },
      { label: "Healthdirect service finder", url: "https://www.healthdirect.gov.au/australian-health-services" },
    ],
  },
  {
    key: "adelaide",
    name: "Adelaide",
    state: "SA",
    x: 50,
    y: 66,
    services: [
      {
        label: "Alcohol & Drug Information Service (SA)",
        url: "https://www.sahealth.sa.gov.au/wps/wcm/connect/public+content/sa+health+internet/health+services/alcohol+and+drug+services/alcohol+and+drug+information+service+adis",
      },
      {
        label: "Drug and Alcohol Services South Australia (DASSA)",
        url: "https://www.sahealth.sa.gov.au/wps/wcm/connect/public+content/sa+health+internet/health+services/alcohol+and+drug+services",
      },
    ],
  },
  {
    key: "hobart",
    name: "Hobart",
    state: "TAS",
    x: 76,
    y: 86,
    services: [
      {
        label: "Alcohol and Drug Information Service (Tasmania)",
        url: "https://www.health.tas.gov.au/community-health/alcohol-and-drug-service",
      },
      { label: "Tasmanian Alcohol and Drug Service", url: "https://www.health.tas.gov.au" },
    ],
  },
  {
    key: "darwin",
    name: "Darwin",
    state: "NT",
    x: 56,
    y: 20,
    services: [
      { label: "NT Alcohol and Drug Information Service", url: "https://nt.gov.au/wellbeing/alcohol-and-drugs" },
      { label: "NT Health", url: "https://nt.gov.au/wellbeing" },
    ],
  },
  {
    key: "canberra",
    name: "Canberra",
    state: "ACT",
    x: 73,
    y: 66,
    services: [
      {
        label: "ACT Health: Alcohol and other drugs",
        url: "https://www.health.act.gov.au/services-and-programs/alcohol-and-other-drug-services",
      },
      { label: "Canberra Health Services", url: "https://www.canberrahealthservices.act.gov.au" },
    ],
  },
];

function CityMarker({
  x,
  y,
  active,
  onClick,
  label,
}: {
  x: number;
  y: number;
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <g
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      aria-label={`Select ${label}`}
      className="cursor-pointer outline-none"
      transform={`translate(${x} ${y})`}
    >
      <circle
        r="10"
        className={active ? "fill-violet-400/35" : "fill-white/10"}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
      />
      <circle r="4" className={active ? "fill-violet-200" : "fill-white/60"} />
    </g>
  );
}

export default function SupportPage() {
  const [selected, setSelected] = useState<CityKey>("sydney");
  const selectedCity = useMemo(() => CITIES.find((c) => c.key === selected)!, [selected]);

  return (
    <div className="min-h-screen bg-[#070711] text-white">
      <header className={`border-b ${BRAND.border} ${BRAND.gradient}`}>
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10 ring-1 ring-white/15 grid place-items-center">
              <span className="text-sm font-black tracking-tight">RC</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-white/90">{BRAND.name}</div>
              <div className="text-xs text-white/60">Support services</div>
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

      <main className="max-w-5xl mx-auto px-4 py-8">
        <section className={`${BRAND.card} rounded-2xl p-5 sm:p-6`}>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Addiction counselling & support</h1>
          <p className={`mt-1 ${BRAND.textDim} text-sm leading-relaxed`}>
            Start with national services, then choose your nearest capital city for local phone lines and referrals.
            All links open in a new tab.
          </p>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
            <div className="text-sm font-semibold text-white/85">National services</div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {NATIONAL_SERVICES.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
                >
                  <div className="text-sm font-semibold text-white/90">{s.label}</div>
                  <div className="mt-1 text-xs text-white/55">Open ↗</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className={`${BRAND.card} rounded-2xl p-5 sm:p-6`}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Choose a city</h2>
              <div className="text-xs text-white/55">Tap a marker</div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
              <svg viewBox="0 0 100 100" className="w-full h-auto" aria-label="Australia map">
                <rect x="0" y="0" width="100" height="100" fill="transparent" />
                <path
                  d="M20 28 C28 18,45 16,58 20 C68 22,78 26,84 34 C90 42,88 52,84 60 C80 68,72 74,66 78 C58 82,48 84,38 82 C30 80,24 74,20 66 C16 58,14 48,16 40 C17 35,18 32,20 28 Z"
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                />
                <path
                  d="M74 86 C78 84,82 86,82 90 C82 94,78 96,74 94 C72 92,72 88,74 86 Z"
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                />
                {CITIES.map((c) => (
                  <CityMarker
                    key={c.key}
                    x={c.x}
                    y={c.y}
                    active={c.key === selected}
                    label={`${c.name}, ${c.state}`}
                    onClick={() => setSelected(c.key)}
                  />
                ))}
              </svg>

              <div className="mt-3 text-xs text-white/55">
                Selected:{" "}
                <span className="text-white/80 font-semibold">
                  {selectedCity.name} ({selectedCity.state})
                </span>
              </div>
            </div>

            <div className="mt-4 text-sm text-white/65 leading-relaxed">
              If you’re not sure where to start, use{" "}
              <ExternalLink href="https://path2help.com.au">Path2Help</ExternalLink> to find services near you.
            </div>
          </div>

          <div className={`${BRAND.card} rounded-2xl p-5 sm:p-6`}>
            <h2 className="text-lg font-semibold">
              {selectedCity.name} ({selectedCity.state}) services
            </h2>
            <p className={`mt-1 ${BRAND.textDim} text-sm leading-relaxed`}>
              These services can provide counselling, information, and referrals. If you feel unsafe right now: call 000.
            </p>

            <div className="mt-4 space-y-3">
              {selectedCity.services.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="text-sm font-semibold text-white/90">{s.label}</div>
                  <div className="mt-2">
                    <ExternalLink href={s.url}>Open website ↗</ExternalLink>
                  </div>
                  {s.note ? <div className="mt-2 text-xs text-white/55">{s.note}</div> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${BRAND.card} rounded-2xl p-5 sm:p-6 mt-6`}>
          <h2 className="text-lg font-semibold">Capital city quick links</h2>
          <p className={`mt-1 ${BRAND.textDim} text-sm leading-relaxed`}>
            Prefer a list view? These are the same links as the map.
          </p>

          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr className="text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-white/70">City</th>
                  <th className="px-4 py-3 text-xs font-semibold text-white/70">Services</th>
                </tr>
              </thead>
              <tbody>
                {CITIES.map((c) => (
                  <tr key={c.key} className="border-t border-white/10">
                    <td className="px-4 py-3 align-top">
                      <button
                        type="button"
                        onClick={() => setSelected(c.key)}
                        className={`text-left hover:underline underline-offset-4 decoration-white/20 ${
                          c.key === selected ? "text-white font-semibold" : "text-white/80"
                        }`}
                      >
                        {c.name} <span className="text-white/50">({c.state})</span>
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-2">
                        {c.services.map((s) => (
                          <a
                            key={s.label}
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-white/80 hover:text-white underline underline-offset-4 decoration-white/20"
                          >
                            {s.label} ↗
                          </a>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <FooterDisclaimer />
      </main>
    </div>
  );
}
