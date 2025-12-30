// app/checker/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type RiskLevel = "HIGH" | "MODERATE" | "LOW";
type SubstanceKey =
  // Recreational
  | "mdma"
  | "cocaine"
  | "meth"
  | "heroin"
  | "fentanyl"
  | "ketamine"
  | "lsd"
  | "mushrooms"
  | "ghb"
  | "nitrous"
  | "alcohol"
  // Medicines/classes
  | "ssri"
  | "snri"
  | "maoi"
  | "benzos"
  | "opioids"
  | "tramadol"
  | "bupropion"
  | "lithium";

type Substance = {
  key: SubstanceKey;
  label: string;
  kind: "recreational" | "medicine";
  aliases: string[];
  helper?: string;
};

type Interaction = {
  a: SubstanceKey;
  b: SubstanceKey;
  risk: RiskLevel;
  title: string;
  why: string;
  advice: string[];
};

const BRAND = {
  name: "RecCheck",
  bg: "bg-[#070711]",
  topGradient: "bg-gradient-to-r from-violet-500/20 via-indigo-500/15 to-sky-500/10",
  card: "bg-white/5 border border-white/10 backdrop-blur",
  border: "border-white/10",
  dim: "text-white/70",
};

const SUBSTANCES: Substance[] = [
  { key: "mdma", label: "MDMA (ecstasy)", kind: "recreational", aliases: ["mdma", "ecstasy", "e", "pills", "molly", "mandy"] },
  { key: "cocaine", label: "Cocaine", kind: "recreational", aliases: ["cocaine", "coke", "charlie"] },
  { key: "meth", label: "Methamphetamine", kind: "recreational", aliases: ["meth", "ice", "crystal", "shards", "p", "methamphetamine"] },
  { key: "heroin", label: "Heroin", kind: "recreational", aliases: ["heroin", "smack", "h"] },
  { key: "fentanyl", label: "Fentanyl", kind: "recreational", aliases: ["fentanyl", "fent"] },
  { key: "ketamine", label: "Ketamine", kind: "recreational", aliases: ["ketamine", "k", "special k"] },
  { key: "lsd", label: "LSD", kind: "recreational", aliases: ["lsd", "acid", "tabs"] },
  { key: "mushrooms", label: "Psilocybin mushrooms", kind: "recreational", aliases: ["mushrooms", "shrooms", "psilocybin"] },
  { key: "ghb", label: "GHB / GBL", kind: "recreational", aliases: ["ghb", "gbl", "1,4", "g"] },
  { key: "nitrous", label: "Nitrous oxide", kind: "recreational", aliases: ["nitrous", "nangs", "nos", "whippets"] },
  { key: "alcohol", label: "Alcohol", kind: "recreational", aliases: ["alcohol", "beer", "wine", "spirits", "booze", "ethanol"] },

  { key: "ssri", label: "SSRIs (antidepressants)", kind: "medicine", aliases: ["ssri", "sertraline", "fluoxetine", "escitalopram", "citalopram", "paroxetine"] },
  { key: "snri", label: "SNRIs (antidepressants)", kind: "medicine", aliases: ["snri", "venlafaxine", "desvenlafaxine", "duloxetine"] },
  {
    key: "maoi",
    label: "MAOIs (incl. moclobemide)",
    kind: "medicine",
    aliases: ["maoi", "moclobemide", "phenelzine", "tranylcypromine", "parnate", "nardil"],
    helper: "Higher interaction risk with serotonergic and stimulant drugs.",
  },
  { key: "benzos", label: "Benzodiazepines (benzos)", kind: "medicine", aliases: ["benzodiazepine", "benzo", "diazepam", "valium", "alprazolam", "xanax", "clonazepam"] },
  { key: "opioids", label: "Opioids", kind: "medicine", aliases: ["opioid", "oxycodone", "morphine", "codeine", "hydromorphone", "methadone", "buprenorphine", "tapentadol"] },
  {
    key: "tramadol",
    label: "Tramadol",
    kind: "medicine",
    aliases: ["tramadol", "tramal", "zydol"],
    helper: "Opioid + serotonergic activity; seizure/serotonin-toxicity risk in some combos.",
  },
  { key: "bupropion", label: "Bupropion", kind: "medicine", aliases: ["bupropion", "zyban", "wellbutrin"] },
  {
    key: "lithium",
    label: "Lithium",
    kind: "medicine",
    aliases: ["lithium", "lithicarb", "priadel"],
    helper: "Overheating/dehydration can increase harm risk; watch for neuro symptoms.",
  },
];

const INTERACTIONS: Interaction[] = [
  // HIGH
  {
    a: "opioids",
    b: "benzos",
    risk: "HIGH",
    title: "Opioids + benzos",
    why: "Additive sedation and breathing suppression can cause fatal overdose.",
    advice: [
      "Avoid combining. If opioids are involved: carry naloxone and don’t use alone.",
      "Hard to wake, slow/irregular breathing, blue lips → call 000 immediately.",
    ],
  },
  {
    a: "mdma",
    b: "maoi",
    risk: "HIGH",
    title: "MDMA + MAOIs",
    why: "High risk of serotonin toxicity and dangerous blood pressure effects.",
    advice: [
      "Avoid combining.",
      "Agitation, overheating, confusion, rigid muscles → call 000 urgently.",
    ],
  },
  {
    a: "alcohol",
    b: "opioids",
    risk: "HIGH",
    title: "Alcohol + opioids",
    why: "Combined sedation and respiratory depression increases overdose risk.",
    advice: ["Avoid combining.", "If very drowsy or breathing slows → call 000."],
  },
  {
    a: "alcohol",
    b: "benzos",
    risk: "HIGH",
    title: "Alcohol + benzos",
    why: "Additive sedation can lead to coma, aspiration, and breathing failure.",
    advice: ["Avoid combining.", "If unresponsive: recovery position + call 000."],
  },
  {
    a: "ghb",
    b: "alcohol",
    risk: "HIGH",
    title: "GHB/GBL + alcohol",
    why: "Unpredictable sedation and loss of consciousness; choking/aspiration risk.",
    advice: ["Avoid combining.", "If unconscious: recovery position + call 000."],
  },

  // MODERATE (key: alcohol + stimulants)
  {
    a: "alcohol",
    b: "cocaine",
    risk: "MODERATE",
    title: "Alcohol + cocaine",
    why: "Increases cardiovascular strain and can drive binge patterns and risky redosing.",
    advice: ["Avoid binges and mixing if you have heart risk.", "Chest pain, collapse, severe headache → call 000."],
  },
  {
    a: "alcohol",
    b: "meth",
    risk: "MODERATE",
    title: "Alcohol + methamphetamine",
    why: "Can mask intoxication and increase redosing; added strain on heart and body temperature.",
    advice: ["Keep doses low and pace; cool down and hydrate.", "Seek help early for overheating/confusion."],
  },
  {
    a: "alcohol",
    b: "mdma",
    risk: "MODERATE",
    title: "Alcohol + MDMA",
    why: "Dehydration/overheating risk + impaired judgement; added strain on the heart.",
    advice: ["Keep alcohol low, take cooling breaks.", "Sip water regularly (don’t overdo); consider electrolytes."],
  },
  {
    a: "ketamine",
    b: "alcohol",
    risk: "MODERATE",
    title: "Ketamine + alcohol",
    why: "More sedation, vomiting/aspiration risk, blackouts and injuries.",
    advice: ["Avoid mixing or keep doses very low.", "If drowsy: place in recovery position."],
  },
  {
    a: "nitrous",
    b: "alcohol",
    risk: "MODERATE",
    title: "Nitrous + alcohol",
    why: "Increases falls/accidents and vomiting risk; can worsen low oxygen.",
    advice: ["Sit down, use fresh air, take long breaks between hits.", "Avoid if very intoxicated."],
  },
  {
    a: "tramadol",
    b: "ssri",
    risk: "HIGH",
    title: "Tramadol + SSRIs",
    why: "Increased risk of serotonin toxicity and seizures.",
    advice: ["Avoid combining unless medically supervised.", "Seizure, severe agitation, fever → call 000."],
  },
  {
    a: "tramadol",
    b: "snri",
    risk: "HIGH",
    title: "Tramadol + SNRIs",
    why: "Increased risk of serotonin toxicity and seizures.",
    advice: ["Avoid combining unless medically supervised.", "Seizure, severe agitation, fever → call 000."],
  },

  // LOW (examples)
  {
    a: "lsd",
    b: "ssri",
    risk: "LOW",
    title: "LSD + SSRIs",
    why: "Effects may be blunted; evidence is limited and experiences vary.",
    advice: ["Go slow and avoid mixing multiple substances.", "Have a sober buddy and calm setting."],
  },
  {
    a: "mushrooms",
    b: "ssri",
    risk: "LOW",
    title: "Mushrooms + SSRIs",
    why: "Effects may be reduced; evidence is limited and individual response varies.",
    advice: ["Avoid re-dosing to chase effects.", "Prioritise setting, support, and hydration."],
  },
];

function pairKey(a: SubstanceKey, b: SubstanceKey) {
  return a < b ? `${a}::${b}` : `${b}::${a}`;
}

const INTERACTION_MAP: Record<string, Interaction> = Object.fromEntries(
  INTERACTIONS.map((i) => [pairKey(i.a, i.b), i])
);

function riskRank(r: RiskLevel) {
  if (r === "HIGH") return 3;
  if (r === "MODERATE") return 2;
  return 1;
}

function RiskBadge({ risk }: { risk: RiskLevel }) {
  const cls =
    risk === "HIGH"
      ? "bg-red-500/15 text-red-200 ring-red-500/30"
      : risk === "MODERATE"
      ? "bg-amber-500/15 text-amber-200 ring-amber-500/30"
      : "bg-white/10 text-white/70 ring-white/20";
  const label = risk === "HIGH" ? "HIGH RISK" : risk === "MODERATE" ? "MODERATE RISK" : "LOW / LIMITED EVIDENCE";
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${cls}`}>{label}</span>;
}

function Tag({ children, onRemove }: { children: React.ReactNode; onRemove?: () => void }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white ring-1 ring-white/15">
      {children}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full p-1 text-white/70 hover:text-white hover:bg-white/10"
          aria-label="Remove"
          title="Remove"
        >
          ✕
        </button>
      ) : null}
    </span>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10 py-8 text-sm text-white/65">
      <div className="max-w-4xl mx-auto px-4">
        <p className="leading-relaxed">
          <span className="font-semibold text-white/80">Disclaimer:</span> RecCheck provides general harm-reduction
          information for Australia. It is not medical advice. Drug contents and strength can vary. If someone is
          unwell, overheating, has chest pain, has a seizure, or is hard to wake:{" "}
          <span className="font-semibold text-white">call 000</span>.
        </p>
        <p className="mt-3 text-white/50">
          MVP: interactions are hardcoded for early testing and will be expanded and clinically reviewed.
        </p>
      </div>
    </footer>
  );
}

export default function CheckerPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SubstanceKey[]>([]);
  const [result, setResult] = useState<{
    overall: RiskLevel;
    matched: Array<Interaction & { pairLabel: string }>;
    unknownPairs: string[];
  } | null>(null);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SUBSTANCES.filter((s) => {
      if (selectedSet.has(s.key)) return false;
      const hay = [s.label.toLowerCase(), ...s.aliases.map((a) => a.toLowerCase())];
      return hay.some((h) => h.includes(q));
    }).slice(0, 8);
  }, [query, selectedSet]);

  function addSubstance(k: SubstanceKey) {
    setSelected((prev) => (prev.includes(k) ? prev : [...prev, k]));
    setQuery("");
    setResult(null);
  }

  function removeSubstance(k: SubstanceKey) {
    setSelected((prev) => prev.filter((x) => x !== k));
    setResult(null);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions[0]) addSubstance(suggestions[0].key);
    }
    if (e.key === "Backspace" && query.length === 0 && selected.length > 0) {
      removeSubstance(selected[selected.length - 1]);
    }
  }

  function compute() {
    if (selected.length < 2) {
      setResult(null);
      return;
    }

    const matched: Array<Interaction & { pairLabel: string }> = [];
    const unknownPairs: string[] = [];
    let overall: RiskLevel = "LOW";

    for (let i = 0; i < selected.length; i++) {
      for (let j = i + 1; j < selected.length; j++) {
        const a = selected[i];
        const b = selected[j];

        const aLabel = SUBSTANCES.find((s) => s.key === a)?.label ?? a;
        const bLabel = SUBSTANCES.find((s) => s.key === b)?.label ?? b;
        const label = `${aLabel} + ${bLabel}`;

        const hit = INTERACTION_MAP[pairKey(a, b)];
        if (hit) {
          matched.push({ ...hit, pairLabel: label });
          if (riskRank(hit.risk) > riskRank(overall)) overall = hit.risk;
        } else {
          unknownPairs.push(label);
        }
      }
    }

    setResult({
      overall,
      matched: matched.sort((x, y) => riskRank(y.risk) - riskRank(x.risk)),
      unknownPairs,
    });
  }

  const canCheck = selected.length >= 2;

  return (
    <div className={`min-h-screen ${BRAND.bg} text-white`}>
      <header className={`border-b ${BRAND.border} ${BRAND.topGradient}`}>
        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10 ring-1 ring-white/15 grid place-items-center">
              <span className="text-sm font-black tracking-tight">RC</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-white/90">{BRAND.name}</div>
              <div className="text-xs text-white/60">Drug interaction checker</div>
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
        <section className={`${BRAND.card} rounded-2xl p-5 sm:p-6`}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Interaction checker (MVP)</h1>
              <p className={`mt-1 ${BRAND.dim} text-sm leading-relaxed`}>
                Add medicines and/or recreational drugs. This MVP flags common high-risk combinations using a hardcoded
                matrix. If something isn’t listed, treat it as <span className="text-white/80 font-semibold">LOW / unknown</span>{" "}
                and be conservative.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelected([]);
                  setQuery("");
                  setResult(null);
                }}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Clear
              </button>
              <button
                type="button"
                disabled={!canCheck}
                onClick={compute}
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                  canCheck
                    ? "bg-violet-500/20 ring-1 ring-violet-400/40 hover:bg-violet-500/25"
                    : "bg-white/5 ring-1 ring-white/10 text-white/40 cursor-not-allowed"
                }`}
              >
                Check
              </button>
            </div>
          </div>

          {/* Tag input */}
          <div className="mt-5">
            <label className="text-sm font-semibold text-white/85">Substances</label>

            <div className="mt-2 rounded-2xl border border-white/10 bg-black/30 p-3">
              <div className="flex flex-wrap gap-2">
                {selected.map((k) => {
                  const s = SUBSTANCES.find((x) => x.key === k);
                  return (
                    <Tag key={k} onRemove={() => removeSubstance(k)}>
                      <span className="font-medium">{s?.label ?? k}</span>
                      <span className="text-xs text-white/55">{s?.kind}</span>
                    </Tag>
                  );
                })}

                <div className="flex-1 min-w-[220px]">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Type to search (e.g., MDMA, benzos, MAOI, alcohol)"
                    className="w-full bg-transparent px-2 py-2 text-sm text-white placeholder:text-white/35 outline-none"
                    aria-label="Search substances"
                  />
                </div>
              </div>

              {suggestions.length > 0 && (
                <div className="mt-3 rounded-xl border border-white/10 bg-[#0b0b18] p-2">
                  <div className="text-xs text-white/60 px-2 py-1">Suggestions</div>
                  <div className="grid gap-1">
                    {suggestions.map((s) => (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => addSubstance(s.key)}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-white/5"
                      >
                        <div className="min-w-0">
                          <div className="text-sm text-white/90 truncate">{s.label}</div>
                          {s.helper ? <div className="text-xs text-white/50 truncate">{s.helper}</div> : null}
                        </div>
                        <span className="text-xs text-white/50">{s.kind}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs text-white/50">Quick add:</span>
                {["mdma", "cocaine", "meth", "ketamine", "ghb", "alcohol", "ssri", "benzos", "opioids", "maoi"].map((k) => {
                  const key = k as SubstanceKey;
                  const label = SUBSTANCES.find((s) => s.key === key)?.label ?? key;
                  const disabled = selectedSet.has(key);
                  return (
                    <button
                      key={k}
                      type="button"
                      disabled={disabled}
                      onClick={() => addSubstance(key)}
                      className={`rounded-full px-3 py-1 text-xs ring-1 ${
                        disabled
                          ? "bg-white/5 text-white/30 ring-white/10 cursor-not-allowed"
                          : "bg-white/5 text-white/75 ring-white/15 hover:bg-white/10"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="mt-3 text-xs text-white/50 leading-relaxed">
              Tip: press <span className="text-white/70 font-semibold">Enter</span> to add the top suggestion. Backspace
              removes the last tag when the input is empty.
            </p>
          </div>
        </section>

        {/* Results */}
        <section className="mt-6">
          <div className={`${BRAND.card} rounded-2xl p-5 sm:p-6`}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Result</h2>
              {result ? <RiskBadge risk={result.overall} /> : <RiskBadge risk="LOW" />}
            </div>

            {!result ? (
              <div className="mt-4 text-sm text-white/65 leading-relaxed">
                Add at least two substances and press <span className="text-white/80 font-semibold">Check</span>.
                <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-white/80 font-semibold">Australian harm-reduction basics</div>
                  <ul className="mt-2 list-disc pl-5 space-y-1 text-white/65">
                    <li>Start low and go slow. Avoid early re-dosing.</li>
                    <li>Avoid mixing depressants (alcohol, benzos, opioids, GHB).</li>
                    <li>Don’t use alone. If opioids might be involved, have naloxone available.</li>
                    <li>Overheating is a red flag (especially stimulants/MDMA). Cool down and seek help early.</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                {result.matched.length > 0 ? (
                  <div className="space-y-3">
                    {result.matched.map((x, idx) => (
                      <div key={`${x.title}-${idx}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div>
                            <div className="text-sm font-semibold text-white/90">{x.pairLabel}</div>
                            <div className="text-xs text-white/55 mt-0.5">{x.title}</div>
                          </div>
                          <RiskBadge risk={x.risk} />
                        </div>

                        <div className="mt-3 text-sm text-white/70 leading-relaxed">
                          <span className="text-white/85 font-semibold">Why it matters:</span> {x.why}
                        </div>

                        <div className="mt-3">
                          <div className="text-xs text-white/60 font-semibold">Harm reduction</div>
                          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-white/70">
                            {x.advice.map((a, i) => (
                              <li key={i}>{a}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                    No known matches in the MVP matrix for the combinations you entered.
                    <div className="mt-2 text-white/60">
                      That does <span className="text-white/80 font-semibold">not</span> mean “safe” — it means “not yet
                      covered”. Treat as <span className="text-white/80 font-semibold">LOW</span> and be conservative.
                    </div>
                  </div>
                )}

                {result.unknownPairs.length > 0 && (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold text-white/85">Not covered (LOW / unknown)</div>
                    <p className="mt-1 text-sm text-white/65 leading-relaxed">
                      These pairs aren’t in the hardcoded list yet. Harms can stack quickly — especially with alcohol,
                      benzos, opioids, or GHB.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {result.unknownPairs.slice(0, 12).map((p) => (
                        <Tag key={p}>{p}</Tag>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-5 rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">
                  <div className="text-sm font-semibold text-white/90">If you’re going to mix anyway</div>
                  <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-white/75">
                    <li>Change one thing at a time (don’t add a third substance “to fix” a feeling).</li>
                    <li>Use tiny test doses and wait longer than you think before deciding to re-dose.</li>
                    <li>Emergency triggers: unresponsive, seizure, chest pain, severe overheating → call 000.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
