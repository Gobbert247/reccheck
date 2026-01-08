// app/events/page.tsx
import Link from "next/link";

// Simplified events data for quick deployment
const EVENTS = [
  {
    id: "nsw-field-day-2026",
    state: "NSW",
    city: "Sydney",
    name: "Field Day",
    type: "Pill testing / Drug checking",
    startDate: "2026-01-01",
    venue: "The Domain",
    notes: "Listed by NSW Health as part of the NSW drug checking trial.",
    sourceName: "NSW Health",
    sourceUrl: "https://www.health.nsw.gov.au/aod/programs/Pages/drug-checking-trial.aspx",
  },
  {
    id: "vic-dangerous-goods-2026",
    state: "VIC",
    city: "Melbourne",
    name: "Dangerous Goods Entertainment 6XXL",
    type: "Pill testing / Drug checking",
    startDate: "2026-01-24",
    notes: "Listed on Victoria Health pill testing trial page.",
    sourceName: "Victoria Health",
    sourceUrl: "https://www.health.vic.gov.au/alcohol-and-drugs/pill-testing",
  },
  {
    id: "act-cantest",
    state: "ACT",
    city: "Canberra",
    name: "CanTEST (fixed-site drug checking)",
    type: "Service",
    notes: "Fixed-site drug checking service (Canberra). Check official hours before attending.",
    sourceName: "ACT Government",
    sourceUrl: "https://www.act.gov.au/health/drugs-alcohol-smoking-and-vaping/drug-checking",
  },
  {
    id: "nsw-dancewize",
    state: "NSW",
    city: "Various",
    name: "DanceWize NSW (festival harm reduction)",
    type: "Peer harm reduction",
    notes: "See official calendar for upcoming events.",
    sourceName: "DanceWize NSW",
    sourceUrl: "https://www.dancewizensw.org.au/event-calendar",
  },
];

export default function EventsPage() {
  const groupedByState = EVENTS.reduce((acc, event) => {
    if (!acc[event.state]) acc[event.state] = [];
    acc[event.state].push(event);
    return acc;
  }, {} as Record<string, typeof EVENTS>);

  return (
    <main className="rc-texture min-h-screen px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight">Community & Events</h1>
        <p className="mt-2 max-w-2xl text-zinc-300">
          Find harm reduction services, peer support at events, and drug checking info.
        </p>

        <div className="mt-8 grid gap-6">
          {Object.entries(groupedByState).map(([state, events]) => (
            <div key={state} className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <h2 className="text-xl font-semibold">{state}</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {events.map((e) => (
                  <div key={e.id} className="rounded-xl border border-white/10 bg-black/35 p-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                        {e.type}
                      </span>
                      <span className="text-xs text-zinc-400">{e.city}</span>
                    </div>
                    <h3 className="mt-2 text-base font-semibold">{e.name}</h3>
                    {e.startDate && (
                      <p className="mt-1 text-sm text-zinc-300">
                        {e.startDate} {e.venue && ` · ${e.venue}`}
                      </p>
                    )}
                    {e.notes && <p className="mt-2 text-sm text-zinc-300">{e.notes}</p>}
                    <p className="mt-3 text-sm">
                      <a
                        href={e.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-zinc-200 underline decoration-white/30 hover:decoration-white/70"
                      >
                        Source: {e.sourceName}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-black/25 p-5 text-sm text-zinc-300">
          <h3 className="font-semibold text-zinc-200">Want this to auto-update?</h3>
          <p className="mt-1">
            Next step: ingest official calendars on a schedule and raise a PR for review before
            publishing.
          </p>
        </div>
      </div>
    </main>
  );
}
