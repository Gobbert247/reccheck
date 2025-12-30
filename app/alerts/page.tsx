// app/alerts/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type StateTerritory = "ALL" | "NSW" | "VIC" | "QLD" | "WA" | "SA" | "TAS" | "ACT" | "NT";
type DrugType = "ALL" | "OPIOIDS" | "STIMULANTS" | "MDMA_PILLS" | "BENZOS" | "UNKNOWN";

type Alert = {
  id: string;
  title: string;
  state: Exclude<StateTerritory, "ALL">;
  location: string; // city/region
  dateISO: string; // YYYY-MM-DD
  drugType: Exclude<DrugType, "ALL">;
  summary: string;
  advice: string[];
  sourceName: string;
  sourceUrl: string;
  tags: string[];
};

const BRAND = {
  name: "RecCheck",
  gradient:
    "bg-gradient-to-r from-violet-500/20 via-indigo-500/15 to-sky-500/10",
  border: "border-white/10",
  card: "bg-white/5 border border-white/10 backdrop-blur",
  textDim: "text-white/70",
};

function FooterDisclaimer() {
  return (
    <footer className="mt-10 border-t border-white/10 py-8 text-sm text-white/65">
      <div className="max-w-5xl mx-auto px-4">
        <p className="leading-relaxed">
          <span className="font-semibold text-white/80">Disclaimer:</span>{" "}
          Alerts are provided for harm-reduction awareness in Australia. Drug
          markets change quickly and contents can vary between batches. If
          someone is unwell, confused, overheating, having chest pain, has a
          seizure, or is hard to wake:{" "}
          <span className="font-semibold text-white">call 000</span>.
        </p>
        <p className="mt-3 text-white/50">
          MVP note: these are seeded example alerts for layout/testing. We’ll
          replace with live sources (The Know, NUAA, state health, etc.).
        </p>
      </div>
    </footer>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs text-white/75 ring-1 ring-white/15">
      {children}
    </span>
  );
}

function stateLabel(s: StateTerritory) {
  if (s === "ALL") return "All states";
  return s;
}

function drugLabel(d: DrugType) {
  switch (d) {
    case "ALL":
      return "All drug types";
    case "OPIOIDS":
      return "Opioids";
    case "STIMULANTS":
      return "Stimulants";
    case "MDMA_PILLS":
      return "MDMA / Pills";
    case "BENZOS":
      return "Benzodiazepines";
    case "UNKNOWN":
      return "Unknown / Mixed";
  }
}

function drugBadgeClass(d: Alert["drugType"]) {
  switch (d) {
    case "OPIOIDS":
      return "bg-red-500/15 text-red-200 ring-red-500/25";
    case "STIMULANTS":
      return "bg-amber-500/15 text-amber-200 ring-amber-500/25";
    case "MDMA_PILLS":
      return "bg-violet-500/15 text-violet-200 ring-violet-500/25";
    case "BENZOS":
      return "bg-sky-500/15 text-sky-200 ring-sky-500/25";
    default:
      return "bg-white/10 text-white/70 ring-white/20";
  }
}

function fmtDateAU(dateISO: string) {
  // Expect YYYY-MM-DD
  const [y, m, d] = dateISO.split("-").map((x) => parseInt(x, 10));
  if (!y || !m || !d) return dateISO;
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Australia/Sydney",
  });
}

// Seeded realistic-ish alerts for MVP layout/testing
const SEEDED_ALERTS: Alert[] = [
  {
    id: "a1",
    title: "Nitazene-type opioids suspected in counterfeit oxycodone tablets",
    state: "NSW",
    location: "Sydney (Inner West)",
    dateISO: "2025-12-18",
    drugType: "OPIOIDS",
    summary:
      "Reports of ‘Oxy’ tablets causing unusually rapid sedation and overdose-like effects. Counterfeit pills may contain potent nitazene-type opioids.",
    advice: [
      "Avoid using tablets sold as oxycodone unless sourced via prescription.",
      "If using: do a tiny test dose, don’t use alone, and have naloxone available.",
      "Call 000 if someone is hard to wake, breathing slows, or lips turn blue.",
    ],
    sourceName: "The Know (seed)",
    sourceUrl: "https://example.com/the-know/nitazenes-sydney",
    tags: ["counterfeit", "oxycodone", "nitazenes", "naloxone"],
  },
  {
    id: "a2",
    title: "High-strength ‘white’ heroin linked to multiple overdoses",
    state: "VIC",
    location: "Melbourne (CBD/Inner North)",
    dateISO: "2025-12-10",
    drugType: "OPIOIDS",
    summary:
      "Community reports of unusually strong heroin, with several people requiring naloxone. Potency may vary widely between bags.",
    advice: [
      "Start with a much smaller dose than usual and wait longer before re-dosing.",
      "Avoid mixing with alcohol, benzos, or GHB.",
      "Carry naloxone and don’t use alone.",
    ],
    sourceName: "NUAA (seed)",
    sourceUrl: "https://example.com/nuaa/melbourne-heroin-strong",
    tags: ["heroin", "overdose", "naloxone"],
  },
  {
    id: "a3",
    title: "MDMA pills reported as ‘double-strength’ — overheating risk",
    state: "QLD",
    location: "Brisbane / Gold Coast",
    dateISO: "2025-12-21",
    drugType: "MDMA_PILLS",
    summary:
      "Pills sold as MDMA linked to intense stimulation and overheating in warm venues. Reports suggest higher-than-expected dose per pill.",
    advice: [
      "Take half (or less) and wait 2+ hours before considering more.",
      "Cool down regularly, sip water, and consider electrolytes (don’t overdrink).",
      "Seek urgent help for confusion, collapse, or severe overheating.",
    ],
    sourceName: "State Health (seed)",
    sourceUrl: "https://example.com/qld-health/mdma-pill-strength",
    tags: ["mdma", "pills", "heat", "festival"],
  },
  {
    id: "a4",
    title: "Cocaine linked to chest pain presentations — possible adulterants",
    state: "WA",
    location: "Perth (Northbridge)",
    dateISO: "2025-12-05",
    drugType: "STIMULANTS",
    summary:
      "Multiple reports of chest pain and severe anxiety after using cocaine. Adulterants may increase cardiovascular strain.",
    advice: [
      "Avoid mixing with alcohol or other stimulants.",
      "Stop immediately if chest pain, fainting, or severe headache occurs — call 000.",
      "If you can, use drug checking where available and avoid re-dosing.",
    ],
    sourceName: "The Know (seed)",
    sourceUrl: "https://example.com/the-know/perth-cocaine-alert",
    tags: ["cocaine", "adulterants", "chest pain"],
  },
  {
    id: "a5",
    title: "Etizolam/benzo-like tablets sold as ‘Xanax’ causing blackouts",
    state: "SA",
    location: "Adelaide (CBD)",
    dateISO: "2025-11-29",
    drugType: "BENZOS",
    summary:
      "Tablets sold as alprazolam (‘Xanax’) linked to prolonged sedation, memory loss, and blackouts. Contents may be stronger/longer-acting than expected.",
    advice: [
      "Avoid combining with alcohol, opioids, or GHB — overdose risk rises fast.",
      "If someone is very drowsy, vomiting, or hard to wake: recovery position and call 000.",
      "Consider avoiding pressed pills; contents are unpredictable.",
    ],
    sourceName: "State Health (seed)",
    sourceUrl: "https://example.com/sa-health/benzo-pressed-pill",
    tags: ["benzos", "pressed pills", "blackout"],
  },
  {
    id: "a6",
    title: "Unknown ‘party powder’ causing confusion and agitation",
    state: "TAS",
    location: "Hobart",
    dateISO: "2025-12-14",
    drugType: "UNKNOWN",
    summary:
      "Reports of a powder sold as ‘party mix’ producing rapid confusion, agitation, and vomiting. Substance identity unclear (possible mixed stimulants/dissociatives).",
    advice: [
      "Avoid unknown mixes. If you use: tiny test dose and don’t combine with alcohol/other drugs.",
      "Move to a cool, calm space; hydrate slowly.",
      "Call 000 for severe confusion, overheating, seizures, or breathing issues.",
    ],
    sourceName: "The Know (seed)",
    sourceUrl: "https://example.com/the-know/hobart-unknown-powder",
    tags: ["unknown", "mix", "agitation"],
  },
  {
    id: "a7",
    title: "Methamphetamine ‘ice’ linked to prolonged overstimulation",
    state: "ACT",
    location: "Canberra",
    dateISO: "2025-12-08",
    drugType: "STIMULANTS",
    summary:
      "Reports of ‘ice’ causing unusually long-lasting stimulation (12+ hours), severe jaw clenching, and paranoia. Potency may be higher than expected.",
    advice: [
      "Avoid re-dosing early. Eat small snacks, hydrate, and take cooling breaks.",
      "If severe paranoia, chest pain, collapse, or overheating: call 000.",
      "Avoid mixing with alcohol or other stimulants.",
    ],
    sourceName: "Peer network (seed)",
    sourceUrl: "https://example.com/peer/act-ice-alert",
    tags: ["meth", "overstimulation", "paranoia"],
  },
  {
    id: "a8",
    title: "Fentanyl contamination concern in street opioids — carry naloxone",
    state: "NT",
    location: "Darwin",
    dateISO: "2025-12-02",
    drugType: "OPIOIDS",
    summary:
      "Community concern about fentanyl or other high-potency opioids in street supply. Small dose changes can lead to overdose.",
    advice: [
      "Use a tiny test dose and avoid using alone.",
      "Keep naloxone nearby and ensure someone knows how to use it.",
      "Avoid mixing with benzos, alcohol, or GHB.",
    ],
    sourceName: "NUAA / partners (seed)",
    sourceUrl: "https://example.com/nuaa/darwin-opioid-alert",
    tags: ["fentanyl", "opioids", "naloxone"],
  },
  {
    id: "a9",
    title: "GHB/GBL overdoses reported after dose stacking",
    state: "NSW",
    location: "Newcastle / Hunter",
    dateISO: "2025-12-23",
    drugType: "UNKNOWN",
    summary:
      "Several ambulance callouts linked to repeated dosing (‘topping up’) of GHB/GBL. Effects can come on suddenly and vary between batches.",
    advice: [
      "Measure doses carefully and avoid re-dosing for at least 2 hours.",
      "Do not mix with alcohol or benzos.",
      "If someone won’t wake or is vomiting: recovery position and call 000.",
    ],
    sourceName: "The Know (seed)",
    sourceUrl: "https://example.com/the-know/hunter-ghb",
    tags: ["ghb", "dose stacking", "overdose"],
  },
  {
    id: "a10",
    title: "Nitrous oxide: increased injuries from standing use / falls",
    state: "VIC",
    location: "Geelong",
    dateISO: "2025-12-16",
    drugType: "UNKNOWN",
    summary:
      "Reports of injuries linked to using nangs while standing or walking. Brief oxygen drop can cause fainting and falls.",
    advice: [
      "Sit down, use in fresh air, and take long breaks between hits.",
      "Never use with a bag/mask and avoid mixing with heavy alcohol.",
      "Seek help if someone collapses or has breathing issues.",
    ],
    sourceName: "State Health (seed)",
    sourceUrl: "https://example.com/vic-health/nitrous-injuries",
    tags: ["nitrous", "injury", "hypoxia"],
  },
];

export default function AlertsPage() {
  const [stateFilter, setStateFilter] = useState<StateTerritory>("ALL");
  const [drugFilter, setDrugFilter] = useState<DrugType>("ALL");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return SEEDED_ALERTS
      .filter((a) => (stateFilter === "ALL" ? true : a.state === stateFilter))
      .filter((a) => (drugFilter === "ALL" ? true : a.drugType === drugFilter))
      .filter((a) => {
        if (!q) return true;
        const hay = [
          a.title,
          a.location,
          a.state,
          a.summary,
          a.sourceName,
          ...a.tags,
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      })
      .sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));
  }, [stateFilter, drugFilter, search]);

  return (
    <div className="min-h-screen bg-[#070711] text-white">
      {/* Top bar */}
      <header className={`border-b ${BRAND.border} ${BRAND.gradient}`}>
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10 ring-1 ring-white/15 grid place-items-center">
              <span className="text-sm font-black tracking-tight">RC</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-white/90">
                {BRAND.name}
              </div>
              <div className="text-xs text-white/60">Regional alerts (MVP)</div>
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
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                Regional alerts
              </h1>
              <p className={`mt-1 ${BRAND.textDim} text-sm leading-relaxed`}>
                Filter by state/territory and drug type. Use these alerts to
                inform safer choices (test doses, avoid mixing depressants, don’t
                use alone, carry naloxone where opioids might be involved).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="flex-1 sm:flex-none">
                <label className="block text-xs text-white/55 mb-1">
                  State/territory
                </label>
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value as StateTerritory)}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-violet-400/30"
                >
                  {(["ALL", "NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"] as StateTerritory[]).map(
                    (s) => (
                      <option key={s} value={s}>
                        {stateLabel(s)}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="flex-1 sm:flex-none">
                <label className="block text-xs text-white/55 mb-1">
                  Drug type
                </label>
                <select
                  value={drugFilter}
                  onChange={(e) => setDrugFilter(e.target.value as DrugType)}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-violet-400/30"
                >
                  {(
                    ["ALL", "OPIOIDS", "STIMULANTS", "MDMA_PILLS", "BENZOS", "UNKNOWN"] as DrugType[]
                  ).map((d) => (
                    <option key={d} value={d}>
                      {drugLabel(d)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-xs text-white/55 mb-1">Search</label>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search alerts (e.g., nitazene, Sydney, MDMA)"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-violet-400/30"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-white/55">
            <Pill>
              Showing <span className="ml-1 text-white/80 font-semibold">{filtered.length}</span>{" "}
              alerts
            </Pill>
            <Pill>{stateLabel(stateFilter)}</Pill>
            <Pill>{drugLabel(drugFilter)}</Pill>
            {search.trim() ? <Pill>Query: “{search.trim()}”</Pill> : null}

            <button
              type="button"
              onClick={() => {
                setStateFilter("ALL");
                setDrugFilter("ALL");
                setSearch("");
              }}
              className="ml-auto rounded-full bg-white/5 px-3 py-1 text-xs text-white/70 ring-1 ring-white/15 hover:bg-white/10"
            >
              Reset filters
            </button>
          </div>
        </section>

        {/* Grid */}
        <section className="mt-6">
          {filtered.length === 0 ? (
            <div className={`${BRAND.card} rounded-2xl p-6 text-sm text-white/70`}>
              No alerts match your filters. Try widening your search or selecting “All”.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a) => (
                <article key={a.id} className="rounded-2xl border border-white/10 bg-black/25 p-4 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold text-white/90 leading-snug">
                      {a.title}
                    </h3>
                    <span
                      className={`shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${drugBadgeClass(
                        a.drugType
                      )}`}
                    >
                      {drugLabel(a.drugType as DrugType)}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/55">
                    <Pill>{a.state}</Pill>
                    <Pill>{a.location}</Pill>
                    <Pill>{fmtDateAU(a.dateISO)}</Pill>
                  </div>

                  <p className="mt-3 text-sm text-white/70 leading-relaxed">
                    {a.summary}
                  </p>

                  <div className="mt-4">
                    <div className="text-xs text-white/60 font-semibold">
                      Harm reduction advice
                    </div>
                    <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-white/75">
                      {a.advice.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {a.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/60 ring-1 ring-white/10"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-white/45">
                      Source: <span className="text-white/60">{a.sourceName}</span>
                    </span>
                    <a
                      href={a.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-white/75 hover:text-white underline underline-offset-4 decoration-white/20"
                    >
                      Open source ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <FooterDisclaimer />
      </main>
    </div>
  );
}
