// app/events/events-data.ts

export type EventItem = {
  id: string;
  state: "NSW" | "VIC" | "ACT" | "QLD" | "SA" | "WA" | "TAS" | "NT";
  city: string;
  name: string;
  type: "Pill testing / Drug checking" | "Peer harm reduction" | "Training / Lecture" | "Service";
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  venue?: string;
  notes?: string;
  sourceName: string;
  sourceUrl: string;
  verified: boolean; // enforce verified-only display for pill testing claims
};

export const EVENTS: EventItem[] = [
  // NSW drug checking trial (use NSW Health page as the canonical reference)
  {
    id: "nsw-field-day-2026",
    state: "NSW",
    city: "Sydney",
    name: "Field Day",
    type: "Pill testing / Drug checking",
    startDate: "2026-01-01",
    venue: "The Domain",
    notes: "Listed by NSW Health as part of the NSW drug checking trial.",
    sourceName: "NSW Health – Drug checking trial",
    sourceUrl: "https://www.health.nsw.gov.au/aod/programs/Pages/drug-checking-trial.aspx",
    verified: true,
  },
  {
    id: "nsw-lost-paradise-2025",
    state: "NSW",
    city: "Glenworth Valley",
    name: "Lost Paradise",
    type: "Pill testing / Drug checking",
    startDate: "2025-12-28",
    endDate: "2026-01-01",
    notes: "Listed by NSW Health as part of the NSW drug checking trial.",
    sourceName: "NSW Health – Drug checking trial",
    sourceUrl: "https://www.health.nsw.gov.au/aod/programs/Pages/drug-checking-trial.aspx",
    verified: true,
  },

  // VIC pill testing trial (Victorian Govt page)
  {
    id: "vic-dangerous-goods-6xxl-2026",
    state: "VIC",
    city: "Melbourne",
    name: "Dangerous Goods Entertainment 6XXL",
    type: "Pill testing / Drug checking",
    startDate: "2026-01-24",
    notes: "Listed on Victoria Health pill testing trial page.",
    sourceName: "Victoria Health – Pill testing",
    sourceUrl: "https://www.health.vic.gov.au/alcohol-and-drugs/pill-testing",
    verified: true,
  },
  {
    id: "vic-pride-street-party-2026",
    state: "VIC",
    city: "Melbourne",
    name: "Victoria's Pride Street Party",
    type: "Pill testing / Drug checking",
    startDate: "2026-02-08",
    notes: "Listed on Victoria Health pill testing trial page.",
    sourceName: "Victoria Health – Pill testing",
    sourceUrl: "https://www.health.vic.gov.au/alcohol-and-drugs/pill-testing",
    verified: true,
  },

  // ACT fixed-site service
  {
    id: "act-cantest-fixed-site",
    state: "ACT",
    city: "Canberra",
    name: "CanTEST (fixed-site drug checking)",
    type: "Service",
    notes: "Fixed-site drug checking service (Canberra). Check official hours before attending.",
    sourceName: "ACT Government – Drug checking",
    sourceUrl: "https://www.act.gov.au/health/drugs-alcohol-smoking-and-vaping/drug-checking",
    verified: true,
  },

  // Peer harm reduction (DanceWize NSW – official site)
  {
    id: "nsw-dancewize-calendar",
    state: "NSW",
    city: "Various",
    name: "DanceWize NSW (festival harm reduction presence)",
    type: "Peer harm reduction",
    notes: "See official calendar for upcoming events.",
    sourceName: "DanceWize NSW – Event calendar",
    sourceUrl: "https://www.dancewizensw.org.au/event-calendar",
    verified: true,
  },
];
